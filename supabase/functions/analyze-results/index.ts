import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, freeText } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert MBTI psychologist and career counselor. Analyze the quiz answers and free-text description to provide:
1. Accurate MBTI type (4 letters)
2. Personality trait scores (0-100 for Creativity, Social Energy, Analytical Mind, Risk Appetite)
3. Top 5 career suggestions with specific reasons based on their personality
4. 5 daily actionable tips tailored to their personality and goals
5. Personalized motivational message

Return ONLY valid JSON with this structure:
{
  "mbtiType": "XXXX",
  "personalityName": "The [Name]",
  "description": "brief description",
  "traits": [
    { "name": "Creativity", "score": 0-100 },
    { "name": "Social Energy", "score": 0-100 },
    { "name": "Analytical Mind", "score": 0-100 },
    { "name": "Risk Appetite", "score": 0-100 }
  ],
  "careers": [
    { "title": "Career Title", "reason": "why this fits them", "icon": "emoji" }
  ],
  "dailyTips": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"],
  "motivation": "personalized motivational quote"
}`
          },
          {
            role: "user",
            content: `Quiz answers: ${JSON.stringify(answers)}\n\nFree-text self-description: ${freeText || "Not provided"}\n\nAnalyze this person's personality and provide comprehensive results.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to analyze results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Strip markdown code blocks if present
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    // Parse the JSON response from the AI
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid response format from AI");
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-results:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
