"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    missedCalls: "",
    avgJobValue: "",
    voicemailResult: "",
    timeline: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Calculate fit score based on pain
    let score = 0;
    if (["16-30", "30-plus"].includes(formData.missedCalls)) score += 3;
    else if (["6-15"].includes(formData.missedCalls)) score += 2;

    if (["3k-plus"].includes(formData.avgJobValue)) score += 2;
    else if (["1k-3k"].includes(formData.avgJobValue)) score += 1;

    if (formData.voicemailResult === "hang-up") score += 2;

    const applicationData = {
      ...formData,
      fitScore: score,
      submittedAt: new Date().toISOString(),
      source: "website",
    };

    try {
      const response = await fetch("/api/webhooks/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit. Please try again or text (832) 737-0525.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-500/20">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Application Received</h2>
              <p className="text-muted-foreground mb-2">
                We'll review your numbers and call you within 24 hours.
              </p>
              <p className="text-muted-foreground mb-6">
                If Piper can capture even half your missed calls, the math works. Let's find out.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Questions? Text or call:</p>
                <p className="text-xl font-bold text-primary">(832) 737-0525</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            60-Second Application
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Let's Run the Numbers
          </h1>
          <p className="text-xl text-muted-foreground">
            No pitch. Just math. We'll call you in 24 hours with what Piper could have captured.
          </p>
        </div>

        {/* The Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Business</CardTitle>
            <CardDescription>
              Takes 60 seconds. We use this to prep your numbers for the call.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Your Name *</Label>
                  <Input
                    id="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">The Numbers</h3>

                {/* Missed Calls */}
                <div className="space-y-2">
                  <Label htmlFor="missedCalls">How many calls did you miss last week? *</Label>
                  <Select
                    required
                    value={formData.missedCalls}
                    onValueChange={(value) => setFormData({ ...formData, missedCalls: value ?? "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Estimate..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">0-5</SelectItem>
                      <SelectItem value="6-15">6-15</SelectItem>
                      <SelectItem value="16-30">16-30</SelectItem>
                      <SelectItem value="30-plus">30+</SelectItem>
                      <SelectItem value="dont-know">I don't know — that's the problem</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Average Job Value */}
                <div className="space-y-2 mt-4">
                  <Label htmlFor="avgJobValue">What's your average ticket? *</Label>
                  <Select
                    required
                    value={formData.avgJobValue}
                    onValueChange={(value) => setFormData({ ...formData, avgJobValue: value ?? "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1k">$500 - $1,000</SelectItem>
                      <SelectItem value="1k-3k">$1,000 - $3,000</SelectItem>
                      <SelectItem value="3k-plus">$3,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Voicemail Result */}
                <div className="space-y-2 mt-4">
                  <Label htmlFor="voicemailResult">What happens when someone hits your voicemail? *</Label>
                  <Select
                    required
                    value={formData.voicemailResult}
                    onValueChange={(value) => setFormData({ ...formData, voicemailResult: value ?? "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hang-up">Most hang up and call the next guy</SelectItem>
                      <SelectItem value="leave-message">Some leave a message</SelectItem>
                      <SelectItem value="dont-know">I don't know — I don't check stats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline */}
                <div className="space-y-2 mt-4">
                  <Label htmlFor="timeline">If this works, when do you need it live? *</Label>
                  <Select
                    required
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value ?? "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP — bleeding money</SelectItem>
                      <SelectItem value="this-month">This month</SelectItem>
                      <SelectItem value="next-month">Next month</SelectItem>
                      <SelectItem value="just-looking">Just looking for now</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running the numbers...
                  </>
                ) : (
                  "Show Me the Math →"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll call within 24 hours with your missed-revenue estimate.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
