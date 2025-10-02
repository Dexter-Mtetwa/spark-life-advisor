import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type QuizQuestion = {
  id: number;
  question: string;
  options: Array<{ value: string; label: string }>;
};

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [freeText, setFreeText] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('generate-quiz');
      
      if (error) throw error;
      
      if (data?.questions) {
        setQuestions(data.questions);
      } else {
        throw new Error("Invalid quiz data received");
      }
    } catch (error) {
      console.error("Error loading questions:", error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalQuestions = questions.length + 1;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleQuizAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(questions.length);
    } else {
      await analyzeResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const analyzeResults = async () => {
    try {
      setAnalyzing(true);
      const { data, error } = await supabase.functions.invoke('analyze-results', {
        body: { answers, freeText }
      });

      if (error) throw error;

      navigate("/results", { state: { analysisData: data } });
    } catch (error) {
      console.error("Error analyzing results:", error);
      toast({
        title: "Error",
        description: "Failed to analyze your results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-12 shadow-elegant animate-scale-in">
          <div className="text-center space-y-6">
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
            <h2 className="text-2xl font-bold">Generating Your Personalized Quiz...</h2>
            <p className="text-muted-foreground">Using AI to create the perfect questions for you</p>
          </div>
        </Card>
      </div>
    );
  }

  if (currentQuestion === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
        <Card className="max-w-3xl w-full p-8 md:p-12 shadow-elegant animate-slide-in-right hover:shadow-glow transition-all">
          <div className="space-y-6">
            <div className="space-y-4 animate-slide-in-left">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  size="sm"
                  className="hover:scale-105 transition-transform"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <span>
                  Final Question: Tell us about yourself
                </span>
              </div>
              <Progress value={progress} className="h-2 animate-fade-in" />
            </div>

            <div className="text-center space-y-3 animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Describe Yourself Freely
              </h1>
              <p className="text-muted-foreground">
                Share your interests, hobbies, motivations, dreams, and what makes you unique
              </p>
            </div>

            <Textarea
              placeholder="I love solving problems and working with people. I'm passionate about technology and creative projects. In my free time, I enjoy reading, hiking, and learning new skills. My dream is to..."
              className="min-h-[300px] text-base resize-none animate-fade-in transition-all focus:shadow-glow"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
            />

            <div className="flex justify-end animate-slide-in-left">
              <Button
                onClick={handleNext}
                disabled={!freeText.trim() || analyzing}
                size="lg"
                className="bg-gradient-to-r from-accent to-accent-glow hover:shadow-accent-glow hover:scale-110 transition-all group"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Analyzing Your Personality...
                  </>
                ) : (
                  <>
                    Generate My Results
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:animate-bounce-subtle" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full p-8 md:p-12 shadow-elegant animate-fade-in hover:shadow-glow transition-all">
        <div className="space-y-8">
          <div className="space-y-4 animate-slide-in-left">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="sm"
                className="hover:scale-105 transition-transform"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Home
              </Button>
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2 animate-fade-in" />
          </div>

          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {currentQ.question}
            </h2>

            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleQuizAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option, idx) => (
                <div key={option.value} className="animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <Label
                    htmlFor={`${currentQ.id}-${option.value}`}
                    className={`flex items-start space-x-3 p-6 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      answers[currentQuestion] === option.value
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${currentQ.id}-${option.value}`}
                    />
                    <span className="text-base">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between pt-4 animate-slide-in-right">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentQuestion === 0}
              className="hover:scale-105 transition-transform"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow hover:scale-110 transition-all group"
            >
              Next
              <ArrowRight className="ml-2 w-4 h-4 group-hover:animate-bounce-subtle" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
