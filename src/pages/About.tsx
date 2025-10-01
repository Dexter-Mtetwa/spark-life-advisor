import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Brain, Target, Zap, Shield } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 animate-bounce-subtle">
            <Brain className="w-12 h-12 text-primary animate-wiggle" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-up">
            How Our AI Guide Works
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Advanced personality analysis powered by AI to help you discover your ideal career path
            and maximize your potential
          </p>
        </div>

        {/* Main Explanation */}
        <Card className="p-8 shadow-elegant">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Understanding Your Unique Path</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our AI-powered guidance system combines proven personality assessment methodologies
              with advanced machine learning to provide you with personalized career recommendations
              and actionable life strategies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you choose to take our interactive quiz or describe yourself in your own
              words, our AI analyzes your responses to identify your unique personality traits,
              strengths, and preferences.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-glow hover:-translate-y-2 transition-all duration-300 animate-slide-in-left group cursor-pointer">
            <div className="space-y-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit group-hover:animate-bounce-subtle">
                <Sparkles className="w-6 h-6 text-primary group-hover:animate-spin-slow" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Personality Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Our AI uses advanced natural language processing and personality prediction models
                to understand your unique traits, preferences, and behavioral patterns.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-glow hover:-translate-y-2 transition-all duration-300 animate-slide-in-right group cursor-pointer">
            <div className="space-y-4">
              <div className="p-3 bg-accent/10 rounded-full w-fit group-hover:animate-bounce-subtle">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Career Matching</h3>
              <p className="text-muted-foreground text-sm">
                We match your personality profile with career paths that align with your strengths,
                providing specific reasons why each career suits you.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-glow hover:-translate-y-2 transition-all duration-300 animate-slide-in-left group cursor-pointer" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-4">
              <div className="p-3 bg-primary/10 rounded-full w-fit group-hover:animate-bounce-subtle">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Actionable Guidance</h3>
              <p className="text-muted-foreground text-sm">
                Get daily and weekly action plans tailored to your personality and goals, helping
                you maximize your potential and achieve your aspirations.
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-glow hover:-translate-y-2 transition-all duration-300 animate-slide-in-right group cursor-pointer" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-4">
              <div className="p-3 bg-accent/10 rounded-full w-fit group-hover:animate-bounce-subtle">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Privacy & Trust</h3>
              <p className="text-muted-foreground text-sm">
                Your responses and results are confidential. We use your input solely to provide
                personalized guidance and never share your information.
              </p>
            </div>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="p-6 bg-muted/50">
          <div className="space-y-3">
            <h3 className="font-semibold">Important Note</h3>
            <p className="text-sm text-muted-foreground">
              This AI-powered guidance is designed to provide insights and suggestions based on
              personality analysis. While our recommendations are data-driven and personalized, they
              should be viewed as guidance rather than strict prescriptions. Your career path is
              ultimately shaped by your choices, experiences, and unique circumstances.
            </p>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-2xl font-bold">Ready to Discover Your Path?</h2>
          <p className="text-muted-foreground">
            Join thousands who've found clarity and direction through AI-powered guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up">
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow hover:scale-110 transition-all group"
            >
              <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin-slow" />
              Start Your Journey
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" size="lg" className="hover:scale-105 transition-transform">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
