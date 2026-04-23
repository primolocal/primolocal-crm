"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PhoneMissed, SearchX } from "lucide-react";

const problems = [
  {
    icon: PhoneMissed,
    stat: "15/week average",
    title: "Missed Calls",
    description: "While you're on jobs, your competitors answer",
  },
  {
    icon: SearchX,
    stat: "Page 2-3 of Google",
    title: "Invisible Online",
    description: "Customers can't find you when they need you most",
  },
];

export function Problem() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange-500 mb-4">
            The Cost of Silence
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight">
            Every Missed Call Is Money Walking Away
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {problems.map((problem) => (
            <Card
              key={problem.title}
              className="border rounded-xl p-8 hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-navy/10 mb-6">
                  <problem.icon className="h-6 w-6 text-navy" />
                </div>
                <p className="text-2xl font-bold text-navy mb-2">{problem.stat}</p>
                <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
