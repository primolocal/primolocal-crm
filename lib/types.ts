export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  city: string;
  state: string;
  tags: string[];
  notes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export type PipelineStage =
  | "lead"
  | "contacted"
  | "demo_booked"
  | "pilot"
  | "pay_what_worth"
  | "founder"
  | "live";

export const PIPELINE_STAGES: { value: PipelineStage; label: string; color: string }[] = [
  { value: "lead", label: "Lead", color: "bg-slate-500" },
  { value: "contacted", label: "Contacted", color: "bg-blue-500" },
  { value: "demo_booked", label: "Demo Booked", color: "bg-yellow-500" },
  { value: "pilot", label: "Pilot (Free Month)", color: "bg-purple-500" },
  { value: "pay_what_worth", label: "Pay What It's Worth", color: "bg-orange-500" },
  { value: "founder", label: "Founder ($10K)", color: "bg-green-500" },
  { value: "live", label: "Live Customer", color: "bg-emerald-600" },
];

export interface Deal {
  id: string;
  contactId: string;
  title: string;
  value: number;
  stage: PipelineStage;
  priority: "low" | "medium" | "high";
  source: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  contactId?: string;
  dealId?: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: "call" | "email" | "sms" | "note" | "meeting" | "demo" | "day_30";
  contactId: string;
  dealId?: string;
  content: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  contactId?: string;
  dealId?: string;
  type: "demo" | "day_30_conversion" | "follow_up" | "onboarding" | "other";
}

export interface Founder {
  id: string;
  contactId: string;
  dealId: string;
  startDate: string;
  day30Date: string;
  amountPaid: number;
  status: "active" | "converted" | "churned";
  testimonial: string;
  referrals: number;
}

export interface Review {
  id: string;
  contactId: string;
  rating: number;
  platform: "google" | "yelp" | "facebook" | "other";
  content: string;
  createdAt: string;
}

export interface GBPMetric {
  id: string;
  contactId: string;
  profileViews: number;
  searchAppearances: number;
  reviewsCount: number;
  photosCount: number;
  updatedAt: string;
}
