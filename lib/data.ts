import type { Contact, Deal, Task, Activity, CalendarEvent } from "./types";

const STORAGE_KEY = "primo-crm-data";

interface CRMData {
  contacts: Contact[];
  deals: Deal[];
  tasks: Task[];
  activities: Activity[];
  events: CalendarEvent[];
}

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function getData(): CRMData {
  if (typeof window === "undefined") {
    return { contacts: [], deals: [], tasks: [], activities: [], events: [] };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw) as CRMData;
}

function setData(data: CRMData) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

function seedData(): CRMData {
  const now = new Date().toISOString();
  const contacts: Contact[] = [
    {
      id: generateId(),
      name: "Mike Johnson",
      email: "mike@coolairhvac.com",
      phone: "(713) 555-0101",
      company: "Cool Air HVAC",
      industry: "HVAC",
      city: "Houston",
      state: "TX",
      tags: ["founder", "pilot"],
      notes: "5-truck operation. Met at Houston Home Show. Very interested in Piper.",
      source: "cold_email",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: "Sarah Chen",
      email: "sarah@texascool.com",
      phone: "(281) 555-0202",
      company: "Texas Cool Services",
      industry: "HVAC",
      city: "Houston",
      state: "TX",
      tags: ["demo_booked"],
      notes: "3 trucks. Replied to email #2. Demo scheduled for Thursday.",
      source: "cold_email",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: "David Rodriguez",
      email: "dave@fastfixhvac.com",
      phone: "(832) 555-0303",
      company: "Fast Fix HVAC",
      industry: "HVAC",
      city: "Houston",
      state: "TX",
      tags: ["lead"],
      notes: "8-truck operation. High potential. Needs follow-up call.",
      source: "apollo",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: "Jennifer Walsh",
      email: "jen@walshplumbing.com",
      phone: "(713) 555-0404",
      company: "Walsh Plumbing",
      industry: "Plumbing",
      city: "Houston",
      state: "TX",
      tags: ["contacted"],
      notes: "Plumbing — potential pivot vertical. Not ready yet but interested.",
      source: "referral",
      createdAt: now,
      updatedAt: now,
    },
  ];

  const deals: Deal[] = [
    {
      id: generateId(),
      contactId: contacts[0].id,
      title: "Cool Air HVAC — Founder Deal",
      value: 10000,
      stage: "founder",
      priority: "high",
      source: "cold_email",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      contactId: contacts[1].id,
      title: "Texas Cool — Demo to Founder",
      value: 10000,
      stage: "demo_booked",
      priority: "high",
      source: "cold_email",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      contactId: contacts[2].id,
      title: "Fast Fix HVAC — Outreach",
      value: 10000,
      stage: "lead",
      priority: "medium",
      source: "apollo",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      contactId: contacts[3].id,
      title: "Walsh Plumbing — Vertical Test",
      value: 10000,
      stage: "contacted",
      priority: "low",
      source: "referral",
      createdAt: now,
      updatedAt: now,
    },
  ];

  const tasks: Task[] = [
    {
      id: generateId(),
      title: "Send Day 30 report to Mike Johnson",
      description: "Compile calls answered, appointments booked, reviews generated",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      contactId: contacts[0].id,
      dealId: deals[0].id,
      createdAt: now,
    },
    {
      id: generateId(),
      title: "Prepare demo deck for Sarah Chen",
      description: "HVAC-specific demo with Houston references",
      status: "in_progress",
      priority: "high",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      contactId: contacts[1].id,
      dealId: deals[1].id,
      createdAt: now,
    },
    {
      id: generateId(),
      title: "Follow up call with David Rodriguez",
      description: "Check interest level, book demo",
      status: "todo",
      priority: "medium",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      contactId: contacts[2].id,
      dealId: deals[2].id,
      createdAt: now,
    },
  ];

  const activities: Activity[] = [
    {
      id: generateId(),
      type: "email",
      contactId: contacts[0].id,
      dealId: deals[0].id,
      content: "Sent founders agreement. Mike signed same day.",
      createdAt: now,
    },
    {
      id: generateId(),
      type: "call",
      contactId: contacts[1].id,
      dealId: deals[1].id,
      content: "Discovery call. Sarah confirmed demo for Thursday 10am.",
      createdAt: now,
    },
    {
      id: generateId(),
      type: "note",
      contactId: contacts[2].id,
      dealId: deals[2].id,
      content: "Left voicemail. No reply yet. Try again Wed.",
      createdAt: now,
    },
  ];

  const events: CalendarEvent[] = [
    {
      id: generateId(),
      title: "Demo — Sarah Chen (Texas Cool)",
      description: "HVAC-specific demo with Houston references",
      startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(),
      contactId: contacts[1].id,
      dealId: deals[1].id,
      type: "demo",
    },
    {
      id: generateId(),
      title: "Day 30 Conversion — Mike Johnson",
      description: "Present 30-day data, collect payment, close founder annual",
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000).toISOString(),
      contactId: contacts[0].id,
      dealId: deals[0].id,
      type: "day_30_conversion",
    },
  ];

  return { contacts, deals, tasks, activities, events };
}

export const db = {
  contacts: {
    getAll: () => getData().contacts,
    getById: (id: string) => getData().contacts.find((c) => c.id === id),
    create: (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
      const data = getData();
      const newContact: Contact = { ...contact, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      data.contacts.push(newContact);
      setData(data);
      return newContact;
    },
    update: (id: string, updates: Partial<Contact>) => {
      const data = getData();
      const idx = data.contacts.findIndex((c) => c.id === id);
      if (idx === -1) return null;
      data.contacts[idx] = { ...data.contacts[idx], ...updates, updatedAt: new Date().toISOString() };
      setData(data);
      return data.contacts[idx];
    },
    delete: (id: string) => {
      const data = getData();
      data.contacts = data.contacts.filter((c) => c.id !== id);
      setData(data);
    },
  },
  deals: {
    getAll: () => getData().deals,
    getById: (id: string) => getData().deals.find((d) => d.id === id),
    create: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => {
      const data = getData();
      const newDeal: Deal = { ...deal, id: generateId(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      data.deals.push(newDeal);
      setData(data);
      return newDeal;
    },
    update: (id: string, updates: Partial<Deal>) => {
      const data = getData();
      const idx = data.deals.findIndex((d) => d.id === id);
      if (idx === -1) return null;
      data.deals[idx] = { ...data.deals[idx], ...updates, updatedAt: new Date().toISOString() };
      setData(data);
      return data.deals[idx];
    },
    delete: (id: string) => {
      const data = getData();
      data.deals = data.deals.filter((d) => d.id !== id);
      setData(data);
    },
  },
  tasks: {
    getAll: () => getData().tasks,
    getById: (id: string) => getData().tasks.find((t) => t.id === id),
    create: (task: Omit<Task, "id" | "createdAt">) => {
      const data = getData();
      const newTask: Task = { ...task, id: generateId(), createdAt: new Date().toISOString() };
      data.tasks.push(newTask);
      setData(data);
      return newTask;
    },
    update: (id: string, updates: Partial<Task>) => {
      const data = getData();
      const idx = data.tasks.findIndex((t) => t.id === id);
      if (idx === -1) return null;
      data.tasks[idx] = { ...data.tasks[idx], ...updates };
      setData(data);
      return data.tasks[idx];
    },
    delete: (id: string) => {
      const data = getData();
      data.tasks = data.tasks.filter((t) => t.id !== id);
      setData(data);
    },
  },
  activities: {
    getAll: () => getData().activities,
    create: (activity: Omit<Activity, "id" | "createdAt">) => {
      const data = getData();
      const newActivity: Activity = { ...activity, id: generateId(), createdAt: new Date().toISOString() };
      data.activities.push(newActivity);
      setData(data);
      return newActivity;
    },
  },
  events: {
    getAll: () => getData().events,
    create: (event: Omit<CalendarEvent, "id">) => {
      const data = getData();
      const newEvent: CalendarEvent = { ...event, id: generateId() };
      data.events.push(newEvent);
      setData(data);
      return newEvent;
    },
    delete: (id: string) => {
      const data = getData();
      data.events = data.events.filter((e) => e.id !== id);
      setData(data);
    },
  },
};

export function exportToCSV(contacts: Contact[]): string {
  const headers = ["Name", "Email", "Phone", "Company", "Industry", "City", "State", "Tags", "Notes", "Source", "Created"];
  const rows = contacts.map((c) => [
    c.name, c.email, c.phone, c.company, c.industry, c.city, c.state, c.tags.join(";"), c.notes, c.source, c.createdAt,
  ]);
  const escape = (v: unknown) => String(v).replace(/"/g, '""');
  return [headers.join(","), ...rows.map((r) => r.map((v) => '"' + escape(v) + '"').join(","))].join("\n");
}

export function importFromCSV(csv: string): Omit<Contact, "id" | "createdAt" | "updatedAt">[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const get = (name: string) => values[headers.indexOf(name)] || "";
    return {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      company: get("company"),
      industry: get("industry"),
      city: get("city"),
      state: get("state"),
      tags: get("tags") ? get("tags").split(";") : [],
      notes: get("notes"),
      source: get("source") || "csv_import",
    };
  });
}
