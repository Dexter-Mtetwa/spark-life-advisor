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
            content: `You are a world-renowned MBTI psychologist and career strategist. Perform DEEP psychological analysis:

ANALYSIS REQUIREMENTS:

1. AUTHENTIC MBTI TYPING: 
   - Count each dimension (E vs I, S vs N, T vs F, J vs P) from quiz answers
   - Cross-reference with free-text for cognitive patterns
   - Don't default to common types - be accurate to their actual answers
   - Consider cognitive function stack (Ni-Te-Fi-Se for INTJ, etc.)

2. TRAIT SCORING (must reflect their ACTUAL responses):
   - Creativity: based on N vs S answers + abstract thinking in free-text
   - Social Energy: based on E vs I answers + social mentions in free-text
   - Analytical Mind: based on T vs F answers + logical reasoning patterns
   - Risk Appetite: based on J vs P answers + spontaneity/planning in free-text
   - Scores should vary widely (avoid clustering around 50)

3. HYPER-SPECIFIC CAREER RECOMMENDATIONS:
   - Reference their EXACT free-text interests, skills, and dreams
   - Connect each career to specific quiz answer patterns they showed
   - Include mix of practical and aspirational careers
   - Explain HOW their cognitive functions suit each role
   - Use diverse, meaningful emojis

4. DETAILED ACTIONABLE PLAN:
   - Tips must be specific to their MBTI cognitive functions
   - Reference their stated goals from free-text
   - Include mix: 1 creative, 1 social, 1 analytical, 1 practical, 1 growth-oriented
   - Make each tip concrete with examples (not generic advice)

5. DEEPLY PERSONAL MOTIVATION:
   - Incorporate their own words/dreams from free-text
   - Speak to their core MBTI drives and values
   - Make it emotionally resonant and inspiring

Return ONLY valid JSON (no markdown):
{
  "mbtiType": "XXXX",
  "personalityName": "The [Authentic MBTI Name]",
  "description": "2-3 sentences about their cognitive style and core traits",
  "traits": [
    { "name": "Creativity", "score": 0-100 },
    { "name": "Social Energy", "score": 0-100 },
    { "name": "Analytical Mind", "score": 0-100 },
    { "name": "Risk Appetite", "score": 0-100 }
  ],
  "careers": [
    { "title": "Specific Career", "reason": "2-3 sentences connecting to their answers + interests + cognitive strengths", "icon": "emoji" }
  ],
  "dailyTips": ["Specific actionable tip with example", "...", "...", "...", "..."],
  "motivation": "Personal, inspiring message using their own aspirations"
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
