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
            content: `You are a world-renowned MBTI psychologist with 20+ years of experience. Generate exactly 12 deeply nuanced MBTI questions that are:

1. SUBTLE & NON-OBVIOUS: Avoid clichés like "do you like parties?" or "are you organized?". Use scenario-based questions that reveal underlying cognitive preferences through realistic situations.

2. STRATEGICALLY ORDERED: Mix dimensions thoughtfully (don't group all E/I together). Start with easier behavioral questions, progress to deeper cognitive preference questions. Pattern: E/I → N/S → T/F → J/P → E/I → T/F → N/S → J/P → repeat varied.

3. GENUINELY DISCRIMINATING: Each option should authentically appeal to its type - not "good vs bad" but "different cognitive styles". Options should be equally attractive but reveal different processing modes.

4. REAL-WORLD CONTEXT: Frame questions in work scenarios, decision-making moments, problem-solving situations, interpersonal conflicts, or learning contexts.

Return ONLY valid JSON (no markdown):
{
  "questions": [
    {
      "id": 1,
      "question": "specific scenario-based question",
      "options": [
        { "value": "E/I/S/N/T/F/J/P", "label": "detailed response showing cognitive preference" },
        { "value": "opposite", "label": "equally compelling alternative showing different cognitive style" }
      ]
    }
  ]
}

Examples of good vs bad:
❌ "Do you prefer being alone?" 
✅ "After resolving a major team conflict, you naturally tend to..."
❌ "Are you organized?"
✅ "When starting a new project with an unclear deadline, you prefer to..."`
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
    let content = data.choices[0].message.content;
    
    // Strip markdown code blocks if present
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
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
