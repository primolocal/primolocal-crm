"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import type { Deal, Contact, PipelineStage } from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign } from "lucide-react";

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    contactId: "",
    title: "",
    value: "10000",
    stage: "lead" as PipelineStage,
    priority: "medium" as "low" | "medium" | "high",
    source: "cold_email",
  });

  useEffect(() => {
    async function load() {
      const [d, c] = await Promise.all([db.deals.getAll(), db.contacts.getAll()]);
      setDeals(d);
      setContacts(c);
      setLoading(false);
    }
    load();
  }, []);

  const refresh = async () => setDeals(await db.deals.getAll());

  const handleDrop = async (stage: PipelineStage) => {
    if (!draggingId) return;
    await db.deals.update(draggingId, { stage });
    await refresh();
    setDraggingId(null);
  };

  const handleCreate = async () => {
    await db.deals.create({
      contactId: form.contactId,
      title: form.title,
      value: Number(form.value),
      stage: form.stage,
      priority: form.priority,
      source: form.source,
    });
    await refresh();
    setOpen(false);
    setForm({ contactId: "", title: "", value: "10000", stage: "lead", priority: "medium", source: "cold_email" });
  };

  const contactMap = Object.fromEntries(contacts.map((c) => [c.id, c]));

  if (loading) return <div className="text-muted-foreground">Loading pipeline...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pipeline</h1>
          <p className="text-muted-foreground">Drag and drop deals between stages.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" />Add Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Deal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Contact</Label>
                <Select value={form.contactId} onValueChange={(v) => setForm({ ...form, contactId: v ?? "" })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name} — {c.company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Cool Air HVAC — Founder Deal" />
              </div>
              <div className="grid gap-2">
                <Label>Value ($)</Label>
                <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Stage</Label>
                <Select value={form.stage} onValueChange={(v) => setForm({ ...form, stage: v as PipelineStage })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PIPELINE_STAGES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as "low" | "medium" | "high" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["low", "medium", "high"].map((p) => (
                      <SelectItem key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreate} className="w-full">Create Deal</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.value);
          const total = stageDeals.reduce((sum, d) => sum + d.value, 0);
          return (
            <div
              key={stage.value}
              className="flex min-w-[260px] flex-1 flex-col gap-3"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(stage.value)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                  <span className="text-sm font-semibold">{stage.label}</span>
                </div>
                <Badge variant="secondary">{stageDeals.length}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">${total.toLocaleString()} total</p>

              <div className="flex flex-col gap-2">
                {stageDeals.map((deal) => {
                  const contact = contactMap[deal.contactId];
                  return (
                    <Card
                      key={deal.id}
                      draggable
                      onDragStart={() => setDraggingId(deal.id)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">{deal.title}</p>
                        <p className="text-xs text-muted-foreground">{contact?.name || "Unknown"}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <DollarSign className="h-3 w-3" />
                            {deal.value.toLocaleString()}
                          </div>
                          <Badge
                            variant={deal.priority === "high" ? "destructive" : deal.priority === "medium" ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {deal.priority}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
