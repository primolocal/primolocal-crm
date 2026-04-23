"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Star, Check } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Piper Answers 24/7",
    description: "Intelligent call handling that books appointments",
    bullets: [
      "Answers every call in 3 rings",
      "Books directly into your calendar",
      "Forwards emergencies immediately",
      "Texts confirmations instantly",
    ],
    note: "Built on enterprise-grade voice infrastructure with custom intake per partner — your zip codes, your pricing, your CRM fields. Not a generic template.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: MapPin,
    title: "Dominate Local Search",
    description: "Google Business Profile that ranks above competitors",
    bullets: [
      "Category optimization",
      "30+ professional photos",
      "Keyword-rich description",
      "Monthly posting strategy",
    ],
    color: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    icon: Star,
    title: "Build Your 5-Star Wall",
    description: "Automatic review generation from happy customers",
    bullets: [
      "Post-job SMS requests",
      "4-5 stars → Google review",
      "1-3 stars → Private alert",
      "Auto-response to new reviews",
    ],
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50" id="partnership">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-[2px] text-orange-500 mb-4">
            The Complete System
          </p>
          <h2 className="text-3xl sm:text-[40px] font-bold text-navy leading-tight mb-4">
            Three Systems. One Partnership. Zero Missed Revenue.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Not piecemeal tools. Everything working together.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-10">
                <div className={`flex items-center justify-center w-20 h-20 rounded-full ${feature.color} mb-6`}>
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-semibold text-navy mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-3 mb-6">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>
                {feature.note && (
                  <p className="text-xs text-muted-foreground leading-relaxed border-t pt-4">
                    {feature.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
