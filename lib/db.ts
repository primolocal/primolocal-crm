import { getSupabase } from "./supabase";
import type { Contact, Deal, Task, Activity, CalendarEvent } from "./types";

// Dual-mode: if Supabase is not configured, fall back to localStorage
const isSupabaseReady = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

const STORAGE_KEY = "primo-crm-data";

function getLocalData() {
  if (typeof window === "undefined") {
    return { contacts: [], deals: [], tasks: [], activities: [], events: [] };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { contacts: [], deals: [], tasks: [], activities: [], events: [] };
}

function setLocalData(data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export const db = {
  contacts: {
    getAll: async () => {
      if (!isSupabaseReady) return getLocalData().contacts;
      const { data } = await getSupabase().from("contacts").select("*").order("created_at", { ascending: false });
      return (data || []).map(mapContact);
    },
    getById: async (id: string) => {
      if (!isSupabaseReady) return getLocalData().contacts.find((c: Contact) => c.id === id);
      const { data } = await getSupabase().from("contacts").select("*").eq("id", id).single();
      return data ? mapContact(data) : null;
    },
    create: async (contact: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const newContact: Contact = { ...contact, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        data.contacts.push(newContact);
        setLocalData(data);
        return newContact;
      }
      const { data } = await getSupabase().from("contacts").insert([{
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        industry: contact.industry,
        city: contact.city,
        state: contact.state,
        tags: contact.tags,
        notes: contact.notes,
        source: contact.source,
      }]).select().single();
      return data ? mapContact(data) : null;
    },
    update: async (id: string, updates: Partial<Contact>) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const idx = data.contacts.findIndex((c: Contact) => c.id === id);
        if (idx === -1) return null;
        data.contacts[idx] = { ...data.contacts[idx], ...updates, updatedAt: new Date().toISOString() };
        setLocalData(data);
        return data.contacts[idx];
      }
      const { data } = await getSupabase().from("contacts").update(updates).eq("id", id).select().single();
      return data ? mapContact(data) : null;
    },
    delete: async (id: string) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        data.contacts = data.contacts.filter((c: Contact) => c.id !== id);
        setLocalData(data);
        return;
      }
      await getSupabase().from("contacts").delete().eq("id", id);
    },
  },
  deals: {
    getAll: async () => {
      if (!isSupabaseReady) return getLocalData().deals;
      const { data } = await getSupabase().from("deals").select("*").order("created_at", { ascending: false });
      return (data || []).map(mapDeal);
    },
    getById: async (id: string) => {
      if (!isSupabaseReady) return getLocalData().deals.find((d: Deal) => d.id === id);
      const { data } = await getSupabase().from("deals").select("*").eq("id", id).single();
      return data ? mapDeal(data) : null;
    },
    create: async (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const newDeal: Deal = { ...deal, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        data.deals.push(newDeal);
        setLocalData(data);
        return newDeal;
      }
      const { data } = await getSupabase().from("deals").insert([{
        contact_id: deal.contactId,
        title: deal.title,
        value: deal.value,
        stage: deal.stage,
        priority: deal.priority,
        source: deal.source,
      }]).select().single();
      return data ? mapDeal(data) : null;
    },
    update: async (id: string, updates: Partial<Deal>) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const idx = data.deals.findIndex((d: Deal) => d.id === id);
        if (idx === -1) return null;
        data.deals[idx] = { ...data.deals[idx], ...updates, updatedAt: new Date().toISOString() };
        setLocalData(data);
        return data.deals[idx];
      }
      const { data } = await getSupabase().from("deals").update(updates).eq("id", id).select().single();
      return data ? mapDeal(data) : null;
    },
    delete: async (id: string) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        data.deals = data.deals.filter((d: Deal) => d.id !== id);
        setLocalData(data);
        return;
      }
      await getSupabase().from("deals").delete().eq("id", id);
    },
  },
  tasks: {
    getAll: async () => {
      if (!isSupabaseReady) return getLocalData().tasks;
      const { data } = await getSupabase().from("tasks").select("*").order("created_at", { ascending: false });
      return (data || []).map(mapTask);
    },
    getById: async (id: string) => {
      if (!isSupabaseReady) return getLocalData().tasks.find((t: Task) => t.id === id);
      const { data } = await getSupabase().from("tasks").select("*").eq("id", id).single();
      return data ? mapTask(data) : null;
    },
    create: async (task: Omit<Task, "id" | "createdAt">) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const newTask: Task = { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
        data.tasks.push(newTask);
        setLocalData(data);
        return newTask;
      }
      const { data } = await getSupabase().from("tasks").insert([{
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.dueDate,
        contact_id: task.contactId,
        deal_id: task.dealId,
      }]).select().single();
      return data ? mapTask(data) : null;
    },
    update: async (id: string, updates: Partial<Task>) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const idx = data.tasks.findIndex((t: Task) => t.id === id);
        if (idx === -1) return null;
        data.tasks[idx] = { ...data.tasks[idx], ...updates };
        setLocalData(data);
        return data.tasks[idx];
      }
      const dbUpdates: any = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate;
      if (updates.contactId !== undefined) dbUpdates.contact_id = updates.contactId;
      if (updates.dealId !== undefined) dbUpdates.deal_id = updates.dealId;
      const { data } = await getSupabase().from("tasks").update(dbUpdates).eq("id", id).select().single();
      return data ? mapTask(data) : null;
    },
    delete: async (id: string) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        data.tasks = data.tasks.filter((t: Task) => t.id !== id);
        setLocalData(data);
        return;
      }
      await getSupabase().from("tasks").delete().eq("id", id);
    },
  },
  activities: {
    getAll: async () => {
      if (!isSupabaseReady) return getLocalData().activities;
      const { data } = await getSupabase().from("activities").select("*").order("created_at", { ascending: false });
      return (data || []).map(mapActivity);
    },
    create: async (activity: Omit<Activity, "id" | "createdAt">) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const newActivity: Activity = { ...activity, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
        data.activities.push(newActivity);
        setLocalData(data);
        return newActivity;
      }
      const { data } = await getSupabase().from("activities").insert([{
        type: activity.type,
        contact_id: activity.contactId,
        deal_id: activity.dealId,
        content: activity.content,
      }]).select().single();
      return data ? mapActivity(data) : null;
    },
  },
  events: {
    getAll: async () => {
      if (!isSupabaseReady) return getLocalData().events;
      const { data } = await getSupabase().from("events").select("*").order("start_time", { ascending: true });
      return (data || []).map(mapEvent);
    },
    create: async (event: Omit<CalendarEvent, "id">) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        const newEvent: CalendarEvent = { ...event, id: crypto.randomUUID() };
        data.events.push(newEvent);
        setLocalData(data);
        return newEvent;
      }
      const { data } = await getSupabase().from("events").insert([{
        title: event.title,
        description: event.description,
        start_time: event.startTime,
        end_time: event.endTime,
        contact_id: event.contactId,
        deal_id: event.dealId,
        type: event.type,
      }]).select().single();
      return data ? mapEvent(data) : null;
    },
    delete: async (id: string) => {
      if (!isSupabaseReady) {
        const data = getLocalData();
        data.events = data.events.filter((e: CalendarEvent) => e.id !== id);
        setLocalData(data);
        return;
      }
      await getSupabase().from("events").delete().eq("id", id);
    },
  },
};

// Mappers: snake_case (Supabase) → camelCase (app)
function mapContact(row: any): Contact {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    industry: row.industry,
    city: row.city,
    state: row.state,
    tags: row.tags || [],
    notes: row.notes,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapDeal(row: any): Deal {
  return {
    id: row.id,
    contactId: row.contact_id,
    title: row.title,
    value: row.value,
    stage: row.stage,
    priority: row.priority,
    source: row.source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapTask(row: any): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    dueDate: row.due_date,
    contactId: row.contact_id,
    dealId: row.deal_id,
    createdAt: row.created_at,
  };
}

function mapActivity(row: any): Activity {
  return {
    id: row.id,
    type: row.type,
    contactId: row.contact_id,
    dealId: row.deal_id,
    content: row.content,
    createdAt: row.created_at,
  };
}

function mapEvent(row: any): CalendarEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    startTime: row.start_time,
    endTime: row.end_time,
    contactId: row.contact_id,
    dealId: row.deal_id,
    type: row.type,
  };
}
