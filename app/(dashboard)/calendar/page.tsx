"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { CalendarEvent, Contact, Deal } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, CalendarDays } from "lucide-react";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [open, setOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    contactId: "",
    dealId: "",
    type: "demo" as CalendarEvent["type"],
  });

  useEffect(() => {
    async function load() {
      const [e, c, d] = await Promise.all([db.events.getAll(), db.contacts.getAll(), db.deals.getAll()]);
      setEvents(e);
      setContacts(c);
      setDeals(d);
      setLoading(false);
    }
    load();
  }, []);

  const refresh = async () => setEvents(await db.events.getAll());

  const handleCreate = async () => {
    await db.events.create({
      ...form,
      contactId: form.contactId || undefined,
      dealId: form.dealId || undefined,
    });
    await refresh();
    setOpen(false);
    setForm({ title: "", description: "", startTime: "", endTime: "", contactId: "", dealId: "", type: "demo" });
  };

  const handleDelete = async (id: string) => {
    await db.events.delete(id);
    await refresh();
  };

  const contactMap = Object.fromEntries(contacts.map((c) => [c.id, c]));

  const typeColors: Record<string, string> = {
    demo: "bg-blue-500",
    day_30_conversion: "bg-green-500",
    follow_up: "bg-yellow-500",
    onboarding: "bg-purple-500",
    other: "bg-gray-500",
  };

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  if (loading) return <div className="text-muted-foreground">Loading calendar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">{events.length} events scheduled</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button><Plus className="mr-2 h-4 w-4" />Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Event</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2"><Label>Start</Label><Input type="datetime-local" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} /></div>
                <div className="grid gap-2"><Label>End</Label><Input type="datetime-local" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} /></div>
              </div>
              <div className="grid gap-2"><Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as CalendarEvent["type"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["demo", "day_30_conversion", "follow_up", "onboarding", "other"].map((t) => (
                      <SelectItem key={t} value={t}>{t.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2"><Label>Contact</Label>
                <Select value={form.contactId} onValueChange={(v) => setForm({ ...form, contactId: v ?? "" })}>
                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>{contacts.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreate} className="w-full">Create Event</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Week of {format(weekStart, "MMM d, yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayEvents = events.filter((e) => isSameDay(new Date(e.startTime), day));
              return (
                <div key={day.toISOString()} className="min-h-[120px] rounded-lg border p-2">
                  <div className="mb-2 text-center">
                    <p className="text-xs font-medium text-muted-foreground">{format(day, "EEE")}</p>
                    <p className={`text-lg font-bold ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>{format(day, "d")}</p>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <div key={e.id} className="group relative rounded-md bg-muted p-1.5 text-[10px]">
                        <div className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${typeColors[e.type] || "bg-gray-500"}`} />
                        <p className="truncate pl-2 font-medium">{e.title}</p>
                        <p className="truncate pl-2 text-muted-foreground">{format(new Date(e.startTime), "h:mm a")}</p>
                        <button
                          className="absolute right-1 top-1 opacity-0 group-hover:opacity-100"
                          onClick={() => handleDelete(e.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
