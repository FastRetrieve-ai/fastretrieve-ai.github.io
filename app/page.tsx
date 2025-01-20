"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Cpu,
  FileText,
  Image as ImageIcon,
  Lock,
  Shield,
  Zap,
  MessageCircle,
  X,
  Moon,
  Sun,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { TabSection } from "../components/TabSection";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/lib/config";
import { toast } from "sonner";
import { WavyBackground } from "../components/WavyBackground";

const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const headerOffset = 80; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const NewsletterForm = ({
  isNewsletterLoading,
  setIsNewsletterLoading,
}: {
  isNewsletterLoading: boolean;
  setIsNewsletterLoading: (loading: boolean) => void;
}) => {
  const handleNewsletterSubmit = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (isNewsletterLoading) return;
    setIsNewsletterLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append(
        "message",
        "I'm an interested visitor. I want to get updates from you guys.",
      );

      const response = await fetch(
        `https://formspree.io/f/${config.formspree.newsletterEndpoint}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        toast.success("Successfully subscribed!", {
          description:
            "You'll receive updates from FastRetrieve.AI in your inbox.",
        });
        // Reset the input
        // @ts-expect-error - Component has implicit any type
        window.newsletterInput.value = "";
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error("Failed to subscribe", {
          description: data.error || "Please try again later.",
        });
      }
    } catch {
      toast.error("Failed to subscribe", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        name="email"
        placeholder="What's your work email?"
        className="flex-grow focus-visible:ring-primary border-primary/20"
        required
        disabled={isNewsletterLoading}
        ref={(input) => {
          if (input) {
            // @ts-expect-error - Component has implicit any type
            window.newsletterInput = input;
          }
        }}
      />
      <Button
        onClick={() => {
          // @ts-expect-error - Component has implicit any type
          const email = window.newsletterInput?.value;
          handleNewsletterSubmit(email);
        }}
        className="whitespace-nowrap bg-primary hover:bg-primary/90 text-white shadow-sm shadow-primary/20"
        disabled={isNewsletterLoading}
      >
        {isNewsletterLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </div>
  );
};

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        `https://formspree.io/f/${config.formspree.chatEndpoint}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent!", {
          description: "We'll get back to you as soon as possible.",
        });
        setIsSubmitted(true);
        setTimeout(() => {
          setIsChatOpen(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast.error("Failed to send message", {
          description: data.error || "Please try again later.",
        });
      }
    } catch {
      toast.error("Failed to send message", {
        description: "Please check your connection and try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 border-b border-primary/10">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link
            className="flex items-center justify-center mr-4 sm:mr-6 shrink-0"
            href="#"
          >
            <Zap className="h-6 w-6 text-primary" />
            <span className="sr-only">FastRetrieve.AI</span>
          </Link>
          <div className="flex-1 flex items-center justify-center max-w-screen-lg mx-auto">
            <div className="w-full max-w-[min(700px,calc(100vw-32px))] px-4">
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsTabMenuOpen(!isTabMenuOpen)}
                  className="relative z-50"
                >
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </div>
              <div className="hidden md:block">
                <TabSection />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            <nav className="flex items-center gap-1 sm:gap-2 md:gap-4 whitespace-nowrap">
              <button
                onClick={() => scrollToSection("features")}
                className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors duration-300 hover:scale-105 shrink-0"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors shrink-0"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors shrink-0"
              >
                Contact
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="shrink-0"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </Button>
            </nav>
          </div>
        </div>

        {/* Mobile Tab Menu */}
        {isTabMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-950">
            <div className="pt-20 px-4 py-2 space-y-4">
              <div className="flex flex-col space-y-2">
                <TabSection />
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full">
          <WavyBackground
            className="container px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
            containerClassName="h-[400px]"
            colors={["#38bdf8", "#818cf8", "#c084fc"]}
            waveWidth={12}
            backgroundFill="transparent"
            blur={2}
            speed="slow"
            waveOpacity={0.25}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                  FastRetrieve.AI
                </h1>
                <p className="mx-auto max-w-[700px] text-primary/80 text-lg sm:text-xl md:text-2xl">
                  Precise and Trustworthy, Tailored for You
                </p>
              </div>
            </div>
          </WavyBackground>
        </section>
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-primary/10"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              Our Core Services
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <Cpu className="w-8 h-8 mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Customizable AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  Tailor your AI agent with memory (RAG), local or cloud-based,
                  keeping collective insights accessible within your team and
                  freeing them for strategic work.
                </CardContent>
              </Card>
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <FileText className="w-8 h-8 mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Document Extraction
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  Parse data from order forms, contracts, and other documents to
                  create a comprehensive, single source of truth for your
                  organization.
                </CardContent>
              </Card>
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <ImageIcon className="w-8 h-8 mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Multimodal Ingestion
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  Digest your graphs, presentations, and video data to produce
                  insights on customer profiles, team progress, and competitor
                  research.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <Lock className="w-8 h-8 mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Stay in Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  All AI features are 100% opt-in. You&apos;re in charge of
                  when, where, and how you use them, ensuring complete control
                  over your data and processes.
                </CardContent>
              </Card>
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <Shield className="w-8 h-8 mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Full Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300">
                  Our AI features are clearly marked within the product, so you
                  always know when you&apos;re using AI, maintaining trust and
                  clarity in your workflow.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              How FastRetrieve.AI Solves Your Problems
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Streamlined Workflows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Automate repetitive tasks with AI agents
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Reduce manual data entry and processing
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Improve decision-making with AI-driven insights
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="group border-[0.5px] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 ease-out">
                <CardHeader>
                  <CardTitle className="text-primary/90 group-hover:text-primary transition-colors duration-300">
                    Enhanced Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Centralize knowledge with AI-powered document extraction
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Share insights across teams with multimodal ingestion
                    </li>
                    <li className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      Maintain data integrity and security with opt-in AI
                      features
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-transparent"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                  Ready to Transform Your Workflow?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary/70 md:text-xl">
                  Get in touch with us to learn how FastRetrieve.AI can
                  revolutionize your industry-specific processes.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                  onClick={() => setIsChatOpen(true)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="flex flex-col items-start space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Zap className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      FastRetrieve.AI
                    </h3>
                    <p className="text-sm text-primary/70">
                      When knowledge flows, innovation grows.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary/60">
                  <MapPin className="h-4 w-4" />
                  <span>Based in Taipei, TAIWAN</span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-bold text-primary">
                  Get the latest in your inbox
                </h3>
                <NewsletterForm
                  isNewsletterLoading={isNewsletterLoading}
                  setIsNewsletterLoading={setIsNewsletterLoading}
                />
                <p className="text-xs text-primary/60">
                  By subscribing, you agree to receive updates from
                  FastRetrieve.AI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-primary/10 relative z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <p className="text-xs text-primary/60">
          © 2025 FastRetrieve.AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs text-primary/60 hover:text-primary hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs text-primary/60 hover:text-primary hover:underline underline-offset-4"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>

      {/* Floating Chat Button and Card */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 z-50">
        {isChatOpen ? (
          <Card className="w-[300px] sm:w-[380px] shadow-lg border-primary/10 bg-gray-950 text-white mb-4">
            <CardHeader className="flex flex-row items-center space-x-4 pb-6">
              <div className="bg-primary/10 p-2 rounded-full">
                <Zap className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-lg">FastRetrieve.AI</CardTitle>
                <CardDescription className="text-gray-400">
                  fastretrieve.ai@gmail.com
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-800 ml-auto"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {!isSubmitted && (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      Hi, how can I help you today?
                    </div>
                  </div>
                </div>
              )}
              {isSubmitted ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      Hi, how can I help you today?
                    </div>
                  </div>
                  <div className="flex items-start justify-end space-x-2">
                    <div className="bg-primary rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                      {localStorage.getItem("lastMessage") || "Your message"}
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      Message received! We&apos;ll get back to you ASAP
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    const formData = new FormData(e.target as HTMLFormElement);
                    const message = formData.get("message");
                    if (typeof window !== "undefined") {
                      localStorage.setItem("lastMessage", message as string);
                    }
                    handleSubmit(e);
                  }}
                  className="space-y-4"
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="bg-gray-800 border-gray-700 focus-visible:ring-primary text-white placeholder:text-gray-500"
                  />
                  <div className="flex items-end gap-2">
                    <Textarea
                      name="message"
                      placeholder="Type your message..."
                      required
                      className="bg-gray-800 border-gray-700 focus-visible:ring-primary text-white placeholder:text-gray-500 min-h-[80px]"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-primary hover:bg-primary/90 h-10 w-10"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        ) : (
          <Button
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 hover:scale-110 transition-all duration-300"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
