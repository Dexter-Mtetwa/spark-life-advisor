import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "At social gatherings, you prefer to:",
    options: [
      { value: "E", label: "Meet new people and engage in group conversations" },
      { value: "I", label: "Have deep conversations with a few close friends" },
    ],
  },
  {
    id: 2,
    question: "When making decisions, you rely more on:",
    options: [
      { value: "T", label: "Logic and objective analysis" },
      { value: "F", label: "Personal values and how it affects people" },
    ],
  },
  {
    id: 3,
    question: "You prefer to:",
    options: [
      { value: "J", label: "Plan things in advance and stick to the plan" },
      { value: "P", label: "Keep your options open and adapt as you go" },
    ],
  },
  {
    id: 4,
    question: "When learning something new, you focus on:",
    options: [
      { value: "S", label: "Practical applications and concrete details" },
      { value: "N", label: "Theories, patterns, and future possibilities" },
    ],
  },
  {
    id: 5,
    question: "Your ideal work environment is:",
    options: [
      { value: "E", label: "Collaborative with lots of team interaction" },
      { value: "I", label: "Quiet with time for focused, independent work" },
    ],
  },
  {
    id: 6,
    question: "When faced with a problem, you:",
    options: [
      { value: "T", label: "Analyze it systematically and look for logical solutions" },
      { value: "F", label: "Consider how it impacts people and seek harmony" },
    ],
  },
  {
    id: 7,
    question: "You feel more energized when:",
    options: [
      { value: "S", label: "Dealing with real, tangible tasks and present-moment challenges" },
      { value: "N", label: "Exploring abstract ideas and imagining future scenarios" },
    ],
  },
  {
    id: 8,
    question: "Your typical approach to projects is:",
    options: [
      { value: "J", label: "Make a detailed plan and work steadily toward completion" },
      { value: "P", label: "Start spontaneously and figure things out as you go" },
    ],
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"choice" | "quiz" | "freetext">("choice");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [freeText, setFreeText] = useState("");

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleQuizAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate MBTI type from answers
      const mbtiType = calculateMBTI();
      navigate("/results", { state: { mbtiType, mode: "quiz" } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFreeTextSubmit = () => {
    if (freeText.trim()) {
      navigate("/results", { state: { freeText, mode: "freetext" } });
    }
  };

  const calculateMBTI = () => {
    const traits = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    Object.values(answers).forEach((answer) => {
      traits[answer as keyof typeof traits]++;
    });

    const mbti = [
      traits.E >= traits.I ? "E" : "I",
      traits.S >= traits.N ? "S" : "N",
      traits.T >= traits.F ? "T" : "F",
      traits.J >= traits.P ? "J" : "P",
    ].join("");

    return mbti;
  };

  if (mode === "choice") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 md:p-12 shadow-elegant animate-fade-in">
          <div className="text-center space-y-6">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let's Discover Your Path
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose how you'd like to share yourself with our AI guide
            </p>

            <div className="space-y-4 pt-8">
              <Button
                onClick={() => setMode("quiz")}
                className="w-full h-20 text-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all"
                size="lg"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Take Interactive Quiz
              </Button>

              <Button
                onClick={() => setMode("freetext")}
                variant="outline"
                className="w-full h-20 text-lg border-2 hover:border-accent hover:text-accent transition-all"
                size="lg"
              >
                <ArrowRight className="mr-2 w-5 h-5" />
                Describe Yourself Freely
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Both paths lead to personalized insights ✨
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (mode === "freetext") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
        <Card className="max-w-3xl w-full p-8 md:p-12 shadow-elegant animate-fade-in">
          <div className="space-y-6">
            <Button
              onClick={() => setMode("choice")}
              variant="ghost"
              size="sm"
              className="mb-4"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>

            <div className="text-center space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Tell Us About Yourself
              </h1>
              <p className="text-muted-foreground">
                Share your interests, hobbies, motivations, and what makes you unique
              </p>
            </div>

            <Textarea
              placeholder="I love solving problems and working with people. I'm passionate about technology and creative projects. In my free time, I enjoy..."
              className="min-h-[300px] text-base resize-none"
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
            />

            <div className="flex justify-end">
              <Button
                onClick={handleFreeTextSubmit}
                disabled={!freeText.trim()}
                size="lg"
                className="bg-gradient-to-r from-accent to-accent-glow hover:shadow-accent-glow transition-all"
              >
                Generate My Path
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz mode
  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
      <Card className="max-w-3xl w-full p-8 md:p-12 shadow-elegant animate-fade-in">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Button
                onClick={() => setMode("choice")}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <span>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {currentQ.question}
            </h2>

            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleQuizAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div key={option.value}>
                  <Label
                    htmlFor={`${currentQ.id}-${option.value}`}
                    className={`flex items-start space-x-3 p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[currentQuestion] === option.value
                        ? "border-primary bg-primary/5"
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

          <div className="flex justify-between pt-4">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all"
            >
              {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
