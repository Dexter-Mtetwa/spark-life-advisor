import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Brain, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-medium">AI-Powered Career Guidance</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Discover Your{" "}
                <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                  Ideal Career
                </span>{" "}
                & Life Path
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Let our AI analyze your unique personality and guide you toward careers that match
                your strengths, passions, and potential.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate("/quiz")}
                  size="lg"
                  className="text-lg h-14 px-8 bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all animate-glow-pulse"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Start Your Journey
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  variant="outline"
                  size="lg"
                  className="text-lg h-14 px-8 border-2 hover:border-accent hover:text-accent transition-all"
                >
                  Learn How It Works
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-3xl opacity-20 animate-glow-pulse" />
              <img
                src={heroImage}
                alt="AI Career Guidance Visualization"
                className="relative rounded-3xl shadow-elegant w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose AI Guidance?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combining cutting-edge AI with proven personality science to illuminate your perfect
            path
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-card shadow-elegant hover:shadow-glow transition-all animate-fade-in">
            <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Deep Personality Insights</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your responses to reveal your unique personality traits, strengths,
              and working style preferences.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card shadow-elegant hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="p-4 bg-accent/10 rounded-full w-fit mb-6">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Career Matches</h3>
            <p className="text-muted-foreground">
              Get tailored career suggestions that align with who you are, not just what skills you
              have.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card shadow-elegant hover:shadow-glow transition-all animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Actionable Daily Plans</h3>
            <p className="text-muted-foreground">
              Receive practical tips and daily actions to help you progress toward your ideal career
              path.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-glow to-accent p-12 md:p-16 text-center shadow-elegant">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI0IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
          <div className="relative space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Unlock Your Potential?
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              Join thousands who've discovered their ideal career path through AI-powered guidance
            </p>
            <Button
              onClick={() => navigate("/quiz")}
              size="lg"
              variant="secondary"
              className="text-lg h-14 px-8 bg-background text-foreground hover:bg-secondary transition-all shadow-elegant"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Begin Your Discovery
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
