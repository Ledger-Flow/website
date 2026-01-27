"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BotIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateId } from "@/utils/generator";

const examplePrompts = [
  "Summarize my sales this month",
  "Which product is low on stock?",
  "Calculate my VAT for last month",
  "Show me my top customers",
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: ReactNode;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your LedgerFlow AI Assistant. I can help you with sales analysis, inventory insights, tax calculations, and more. What would you like to know about your business?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId("CHAT"),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: (
          <>
            I understand you want to know about &ldquo;
            <strong>{text.trim()}</strong>&rdquo;. Based on your business data,
            here are some insights... This is a simulated response. In a
            production environment, this would be powered by LedgerFlow&apos;s
            AI engine.
          </>
        ),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="h-full space-y-6">
      {/* Header */}
      <main>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <BotIcon className="size-8.5 text-yellow-500" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your business and get instant insights
        </p>
      </main>

      {/* Chat Container */}
      <Card className="flex h-[calc(100vh-200px)] flex-1 flex-col">
        {/* Messages */}
        <CardContent className="flex-1 space-y-4 overflow-y-auto px-4">
          {messages.length === 1 && (
            <div className="mt-8 space-y-3">
              <p className="text-muted-foreground mb-6 text-center">
                Try asking about:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    className="hover:border-primary hover:bg-primary/5 transition-300 cursor-pointer rounded-lg border px-3 py-2 text-left"
                  >
                    <p className="text-sm font-medium">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(`flex`, {
                "justify-end": message.role === "user",
                "justify-start": message.role === "assistant",
              })}
            >
              <div
                className={cn(`max-w-sm rounded-lg px-4 py-2 lg:max-w-lg`, {
                  "bg-primary text-primary-foreground rounded-br-none":
                    message.role === "user",
                  "bg-muted text-foreground rounded-bl-none":
                    message.role === "assistant",
                })}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-lg rounded-bl-none px-4 py-2">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="flex gap-2 border-t p-4 pb-0">
          <Input
            placeholder="Ask LedgerFlow AI…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleSendMessage(inputValue)
            }
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="gap-2"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </Card>
    </section>
  );
}
