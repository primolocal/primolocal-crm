"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { Task, Contact, Deal } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
    contactId: "",
    dealId: "",
  });

  useEffect(() => {
    async function load() {
      const [t, c, d] = await Promise.all([db.tasks.getAll(), db.contacts.getAll(), db.deals.getAll()]);
      setTasks(t);
      setContacts(c);
      setDeals(d);
      setLoading(false);
    }
    load();
  }, []);

  const refresh = async () => setTasks(await db.tasks.getAll());

  const filtered = tasks.filter((t) => (filter === "all" ? true : t.status === filter));

  const handleCreate = async () => {
    await db.tasks.create({
      ...form,
      status: "todo",
      dueDate: form.dueDate || new Date(Date.now() + 86400000).toISOString(),
      contactId: form.contactId || undefined,
      dealId: form.dealId || undefined,
    });
    await refresh();
    setOpen(false);
    setForm({ title: "", description: "", priority: "medium", dueDate: "", contactId: "", dealId: "" });
  };

  const toggleStatus = async (task: Task) => {
    const next = task.status === "done" ? "todo" : task.status === "todo" ? "in_progress" : "done";
    await db.tasks.update(task.id, { status: next });
    await refresh();
  };

  const handleDelete = async (id: string) => {
    await db.tasks.delete(id);
    await refresh();
  };

  const contactMap = Object.fromEntries(contacts.map((c) => [c.id, c]));
  const dealMap = Object.fromEntries(deals.map((d) => [d.id, d]));

  if (loading) return <div className="text-muted-foreground">Loading tasks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">{tasks.filter((t) => t.status !== "done").length} open tasks</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button><Plus className="mr-2 h-4 w-4" />New Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as "low" | "medium" | "high" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["low", "medium", "high"].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-2"><Label>Due Date</Label><Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Contact</Label>
                <Select value={form.contactId} onValueChange={(v) => setForm({ ...form, contactId: v ?? "" })}>
                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>{contacts.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-2"><Label>Deal</Label>
                <Select value={form.dealId} onValueChange={(v) => setForm({ ...form, dealId: v ?? "" })}>
                  <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>{deals.map((d) => <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreate} className="w-full">Create Task</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        {(["all", "todo", "in_progress", "done"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}>
            {f === "all" ? "All" : f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((task) => (
          <Card key={task.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <Checkbox checked={task.status === "done"} onCheckedChange={() => toggleStatus(task)} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>{task.title}</p>
                <p className="text-xs text-muted-foreground">{task.description}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"} className="text-[10px]">{task.priority}</Badge>
                  {task.contactId && <span className="text-[10px] text-muted-foreground">{contactMap[task.contactId]?.name}</span>}
                  {task.dealId && <span className="text-[10px] text-muted-foreground">{dealMap[task.dealId]?.title}</span>}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Due {new Date(task.dueDate).toLocaleDateString()}</div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(task.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
