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
    revenue: "",
    receptionist: "",
    missedCalls: "",
    bottleneck: "",
    commitment: "",
    whyPartner: "",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Calculate fit score
    let score = 0;
    if (["1m-2m", "2m-plus"].includes(formData.revenue)) score += 3;
    else if (["500k-1m"].includes(formData.revenue)) score += 2;
    
    if (["30-plus", "16-30"].includes(formData.missedCalls)) score += 2;
    else if (["6-15"].includes(formData.missedCalls)) score += 1;
    
    if (formData.bottleneck.length > 100) score += 2;
    if (formData.whyPartner.length > 100) score += 2;
    if (formData.commitment === "yes-committed") score += 2;

    const applicationData = {
      ...formData,
      fitScore: score,
      submittedAt: new Date().toISOString(),
      source: "website",
    };

    try {
      // Submit to webhook (will notify Discord + save to database)
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
                Thanks for applying to the Co-Founder Program.
              </p>
              <p className="text-muted-foreground mb-6">
                We review applications within 24 hours. If you're a fit, we'll send you a link to schedule your discovery call.
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
            Co-Founder Program
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Apply to Co-Found the Future of Contractor AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Not a pilot. Not a beta. A partnership.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              🔥 7 of 10 spots remaining
            </Badge>
          </div>
        </div>

        {/* Qualification Card */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle>Who This Is For</CardTitle>
            <CardDescription>Before applying, make sure you qualify:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "HVAC, plumbing, electrical, or roofing doing $500K+ revenue",
                "Willing to trust Piper as your first line of phone defense",
                "Have a receptionist now (or had one recently)",
                "Track your numbers (close rate, ticket average)",
                "Owner makes decisions — no gatekeepers",
                "Investing in growth, not survival",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>The Application</CardTitle>
            <CardDescription>
              Takes 5 minutes. Honest answers — we're selecting partners, not just filling spots.
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
                  <Label htmlFor="ownerName">Owner Name *</Label>
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

              {/* Revenue */}
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue *</Label>
                <p className="text-xs text-muted-foreground">Honest answer. This helps us understand if we're a fit.</p>
                <Select
                  required
                  value={formData.revenue}
                  onValueChange={(value) => setFormData({ ...formData, revenue: value ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-250k">Under $250K</SelectItem>
                    <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                    <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                    <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                    <SelectItem value="2m-plus">$2M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Receptionist Setup */}
              <div className="space-y-2">
                <Label htmlFor="receptionist">Who currently answers your phones? *</Label>
                <Select
                  required
                  value={formData.receptionist}
                  onValueChange={(value) => setFormData({ ...formData, receptionist: value ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me-owner">I do (owner)</SelectItem>
                    <SelectItem value="office-manager">Office manager</SelectItem>
                    <SelectItem value="receptionist">Dedicated receptionist</SelectItem>
                    <SelectItem value="answering-service">Answering service</SelectItem>
                    <SelectItem value="voicemail">Voicemail / Miss most calls</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                    <SelectItem value="dont-know">I don't track this</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bottleneck */}
              <div className="space-y-2">
                <Label htmlFor="bottleneck">What's your #1 bottleneck to growth right now? *</Label>
                <Textarea
                  id="bottleneck"
                  required
                  placeholder="Be specific. Is it answering calls? Scheduling? Follow-up? Something else?"
                  value={formData.bottleneck}
                  onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              {/* Commitment */}
              <div className="space-y-2">
                <Label htmlFor="commitment">If this works, can you commit $10K/year by Day 30? *</Label>
                <Select
                  required
                  value={formData.commitment}
                  onValueChange={(value) => setFormData({ ...formData, commitment: value ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes-committed">Yes, I'm committed if results prove out</SelectItem>
                    <SelectItem value="need-more-info">I need to understand the metrics first</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Why Partner */}
              <div className="space-y-2">
                <Label htmlFor="whyPartner">Why partner with us vs. just buying a product? *</Label>
                <Textarea
                  id="whyPartner"
                  required
                  placeholder="What does 'partnership' mean to you? Why commit vs. going month-to-month?"
                  value={formData.whyPartner}
                  onChange={(e) => setFormData({ ...formData, whyPartner: e.target.value })}
                  className="min-h-[100px]"
                />
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
                    Submitting...
                  </>
                ) : (
                  "Submit Application →"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You'll hear back within 24 hours. If it's a fit, we'll schedule a 15-minute discovery call.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
