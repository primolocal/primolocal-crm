"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/db";
import { exportToCSV, importFromCSV } from "@/lib/data";
import type { Contact } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Upload, Download, Plus, Trash2 } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "HVAC",
    city: "Houston",
    state: "TX",
    tags: "",
    notes: "",
    source: "manual",
  });

  useEffect(() => {
    db.contacts.getAll().then((c) => { setContacts(c); setLoading(false); });
  }, []);

  const filtered = contacts.filter((c) =>
    [c.name, c.email, c.company, c.phone, c.city].some((f) =>
      f?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const refresh = async () => setContacts(await db.contacts.getAll());

  const validateContact = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (form.email && !EMAIL_REGEX.test(form.email)) errors.email = "Invalid email address";
    if (form.phone && !PHONE_REGEX.test(form.phone.replace(/\s/g, ""))) errors.phone = "Invalid phone number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateContact()) return;
    await db.contacts.create({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    await refresh();
    setOpen(false);
    setForm({ name: "", email: "", phone: "", company: "", industry: "HVAC", city: "Houston", state: "TX", tags: "", notes: "", source: "manual" });
    setFormErrors({});
  };

  const handleDelete = async (id: string) => {
    await db.contacts.delete(id);
    await refresh();
  };

  const handleExport = () => {
    const csv = exportToCSV(contacts);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "primo-contacts.csv";
    a.click();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const csv = reader.result as string;
      const imported = importFromCSV(csv);
      for (const c of imported) await db.contacts.create(c);
      await refresh();
    };
    reader.readAsText(file);
  };

  if (loading) return <div className="text-muted-foreground">Loading contacts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-muted-foreground">{contacts.length} total contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />Import
          </Button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleImport} />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogDescription>Add a new lead or prospect.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {[
                  { label: "Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Phone", key: "phone", type: "text" },
                  { label: "Company", key: "company", type: "text" },
                  { label: "Industry", key: "industry", type: "text" },
                  { label: "City", key: "city", type: "text" },
                  { label: "State", key: "state", type: "text" },
                  { label: "Tags (comma separated)", key: "tags", type: "text" },
                  { label: "Notes", key: "notes", type: "text" },
                ].map((field) => (
                  <div key={field.key} className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">{field.label}</Label>
                    <div className="col-span-3 space-y-1">
                      <Input
                        className={formErrors[field.key] ? "border-destructive" : ""}
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => {
                          setForm({ ...form, [field.key]: e.target.value });
                          if (formErrors[field.key]) {
                            setFormErrors((prev) => { const n = { ...prev }; delete n[field.key]; return n; });
                          }
                        }}
                      />
                      {formErrors[field.key] && (
                        <p className="text-xs text-destructive">{formErrors[field.key]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Create Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Name", "Company", "Industry", "City", "Phone", "Tags", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact) => (
                  <tr key={contact.id} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <span className="font-medium">{contact.name}</span>
                      <div className="text-xs text-muted-foreground">{contact.email}</div>
                    </td>
                    <td className="px-4 py-3">{contact.company}</td>
                    <td className="px-4 py-3">{contact.industry}</td>
                    <td className="px-4 py-3">{contact.city}, {contact.state}</td>
                    <td className="px-4 py-3">{contact.phone}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
