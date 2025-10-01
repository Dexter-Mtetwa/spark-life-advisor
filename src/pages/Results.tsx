import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Briefcase,
  Target,
  Download,
  Share2,
  RefreshCw,
  MessageCircle,
  TrendingUp,
  Zap,
  Heart,
  Brain,
} from "lucide-react";

const mbtiDescriptions: Record<string, { name: string; description: string }> = {
  INTJ: {
    name: "The Mastermind",
    description: "Strategic thinkers with a plan for everything. You're innovative and independent.",
  },
  INTP: {
    name: "The Architect",
    description: "Innovative inventors with an unquenchable thirst for knowledge.",
  },
  ENTJ: {
    name: "The Commander",
    description: "Bold, imaginative leaders who find ways to achieve their goals.",
  },
  ENTP: {
    name: "The Debater",
    description: "Smart, curious thinkers who love intellectual challenges.",
  },
  INFJ: {
    name: "The Advocate",
    description: "Inspiring idealists with principles and values that guide them.",
  },
  INFP: {
    name: "The Mediator",
    description: "Poetic, kind souls always searching for deeper meaning.",
  },
  ENFJ: {
    name: "The Protagonist",
    description: "Charismatic leaders who inspire others to achieve great things.",
  },
  ENFP: {
    name: "The Campaigner",
    description: "Enthusiastic, creative free spirits with infectious energy.",
  },
  ISTJ: {
    name: "The Logistician",
    description: "Practical, fact-minded individuals with reliable integrity.",
  },
  ISFJ: {
    name: "The Defender",
    description: "Dedicated protectors always ready to defend loved ones.",
  },
  ESTJ: {
    name: "The Executive",
    description: "Excellent administrators who manage things and people efficiently.",
  },
  ESFJ: {
    name: "The Consul",
    description: "Caring, social people eager to help others.",
  },
  ISTP: {
    name: "The Virtuoso",
    description: "Bold, practical experimenters and masters of tools.",
  },
  ISFP: {
    name: "The Adventurer",
    description: "Flexible, charming artists ready to explore new experiences.",
  },
  ESTP: {
    name: "The Entrepreneur",
    description: "Smart, energetic risk-takers who live on the edge.",
  },
  ESFP: {
    name: "The Entertainer",
    description: "Spontaneous, enthusiastic performers who love life.",
  },
};

const careerSuggestions: Record<string, Array<{ title: string; reason: string; icon: string }>> = {
  INTJ: [
    { title: "Software Architect", reason: "Designing complex systems suits your strategic mind", icon: "💻" },
    { title: "Data Scientist", reason: "Perfect for analytical thinking and pattern recognition", icon: "📊" },
    { title: "Investment Analyst", reason: "Long-term strategic planning matches your vision", icon: "📈" },
    { title: "Research Scientist", reason: "Deep, independent work exploring new frontiers", icon: "🔬" },
    { title: "Strategic Consultant", reason: "Solving big-picture problems for organizations", icon: "🎯" },
  ],
  default: [
    { title: "Project Manager", reason: "Coordinating teams and achieving goals", icon: "📋" },
    { title: "Creative Director", reason: "Leading innovative campaigns and projects", icon: "🎨" },
    { title: "UX Designer", reason: "Creating meaningful user experiences", icon: "✨" },
    { title: "Marketing Strategist", reason: "Understanding people and crafting messages", icon: "📱" },
    { title: "Business Analyst", reason: "Bridging technology and business needs", icon: "💼" },
  ],
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mbtiType, freeText, mode } = location.state || {};

  if (!mbtiType && !freeText) {
    navigate("/quiz");
    return null;
  }

  const type = mbtiType || "INTJ";
  const profile = mbtiDescriptions[type] || mbtiDescriptions.INTJ;
  const careers = careerSuggestions[type] || careerSuggestions.default;

  const traits = [
    { name: "Creativity", score: 75, icon: <Sparkles className="w-4 h-4" /> },
    { name: "Social Energy", score: 60, icon: <Heart className="w-4 h-4" /> },
    { name: "Analytical Mind", score: 85, icon: <Brain className="w-4 h-4" /> },
    { name: "Risk Appetite", score: 70, icon: <Zap className="w-4 h-4" /> },
  ];

  const dailyTips = [
    "Start your morning by setting clear intentions for the day",
    "Take 10 minutes to learn something new in your field of interest",
    "Connect with someone who inspires you",
    "Practice a skill that aligns with your ideal career",
    "Reflect on one thing you're grateful for in your journey",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground animate-bounce-subtle hover:scale-110 transition-transform cursor-default">
            Your Personalized Path
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-fade-up">
            Discover Your Future
          </h1>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Based on your unique personality and aspirations
          </p>
        </div>

        {/* Personality Snapshot */}
        <Card className="p-8 shadow-elegant animate-slide-in-left hover:shadow-glow transition-all">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full animate-bounce-subtle">
                <Sparkles className="w-6 h-6 text-primary animate-spin-slow" />
              </div>
              <h2 className="text-2xl font-bold">Personality Snapshot</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border-2 border-primary/20">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Your Type</p>
                    <p className="text-5xl font-bold text-primary">{type}</p>
                    <p className="text-xl font-semibold">{profile.name}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{profile.description}</p>
              </div>

              <div className="flex-1 space-y-4">
                <p className="font-semibold">Your Key Traits</p>
                {traits.map((trait) => (
                  <div key={trait.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {trait.icon}
                        <span>{trait.name}</span>
                      </div>
                      <span className="font-semibold">{trait.score}%</span>
                    </div>
                    <Progress value={trait.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Career Suggestions */}
        <Card className="p-8 shadow-elegant animate-slide-in-right hover:shadow-glow transition-all">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-full animate-bounce-subtle">
                <Briefcase className="w-6 h-6 text-accent animate-wiggle" />
              </div>
              <h2 className="text-2xl font-bold">Top Career Paths for You</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {careers.map((career, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-glow hover:-translate-y-2 transition-all duration-300 cursor-pointer group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-3">
                    <div className="text-4xl group-hover:animate-bounce-subtle">{career.icon}</div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{career.reason}</p>
                    <Button variant="ghost" size="sm" className="w-full hover:scale-105 transition-transform">
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Self-Maximization Plan */}
        <Card className="p-8 shadow-elegant">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Your Daily Action Plan</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {dailyTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-secondary to-transparent rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-1">{tip}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border-2 border-accent/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">Daily Motivation</p>
                  <p className="text-muted-foreground italic">
                    "Success is not final, failure is not fatal: it is the courage to continue that
                    counts. Your unique strengths as {profile.name} position you perfectly for
                    greatness."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Actions */}
        <div className="grid md:grid-cols-4 gap-4 animate-fade-up">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:border-primary hover:text-primary hover:scale-110 hover:-translate-y-1 transition-all group"
          >
            <MessageCircle className="w-5 h-5 group-hover:animate-bounce-subtle" />
            <span className="text-sm">Ask AI</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:border-primary hover:text-primary hover:scale-110 hover:-translate-y-1 transition-all group"
            onClick={() => navigate("/quiz")}
          >
            <RefreshCw className="w-5 h-5 group-hover:animate-spin-slow" />
            <span className="text-sm">Retake Quiz</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:border-accent hover:text-accent hover:scale-110 hover:-translate-y-1 transition-all group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce-subtle" />
            <span className="text-sm">Download PDF</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:border-accent hover:text-accent hover:scale-110 hover:-translate-y-1 transition-all group"
          >
            <Share2 className="w-5 h-5 group-hover:animate-wiggle" />
            <span className="text-sm">Share Results</span>
          </Button>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Button onClick={() => navigate("/")} variant="ghost">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
