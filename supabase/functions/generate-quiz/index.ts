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
            content: `You are an expert MBTI psychologist. Generate exactly 12 nuanced MBTI quiz questions that are NOT obvious and test the four dimensions (E/I, S/N, T/F, J/P) with strategic ordering. Each question should have two options that genuinely appeal to different personality types.

Return ONLY a valid JSON object with this exact structure:
{
  "questions": [
    {
      "id": 1,
      "question": "question text",
      "options": [
        { "value": "E" or "I" or "S" or "N" or "T" or "F" or "J" or "P", "label": "option text" },
        { "value": "opposite dimension letter", "label": "option text" }
      ]
    }
  ]
}

Make questions sophisticated, non-obvious, and ensure they test actual personality preferences, not stereotypes. Mix up the order of dimensions - don't group all E/I questions together.`
          },
          {
            role: "user",
            content: "Generate 12 MBTI quiz questions"
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate quiz questions" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response from the AI
    let questions;
    try {
      questions = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid response format from AI");
    }

    return new Response(JSON.stringify(questions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-quiz:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
