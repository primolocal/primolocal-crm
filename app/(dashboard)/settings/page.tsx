"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your CRM.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>Your company information used in emails and reports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Company Name</Label>
            <Input defaultValue="PrimoLocal LLC" />
          </div>
          <div className="grid gap-2">
            <Label>Your Name</Label>
            <Input defaultValue="Tommy Premeaux" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input defaultValue="(832) 743-2900" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input defaultValue="tommy@primolocal.com" />
            </div>
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Founders Plan Pricing</CardTitle>
          <CardDescription>Configure your pricing tiers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label>Founders Annual</Label>
              <Input defaultValue="10000" type="number" />
            </div>
            <div className="grid gap-2">
              <Label>Standard Annual</Label>
              <Input defaultValue="15000" type="number" />
            </div>
            <div className="grid gap-2">
              <Label>Monthly</Label>
              <Input defaultValue="1000" type="number" />
            </div>
          </div>
          <Button>Save Pricing</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect your tools.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Supabase</p>
              <p className="text-sm text-muted-foreground">Database and auth</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Twilio</p>
              <p className="text-sm text-muted-foreground">SMS and voice</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resend</p>
              <p className="text-sm text-muted-foreground">Email delivery</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reset All Data</p>
              <p className="text-sm text-muted-foreground">This will clear all contacts, deals, and tasks.</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => {
              if (confirm("Are you sure? This cannot be undone.")) {
                localStorage.removeItem("primo-crm-data");
                window.location.reload();
              }
            }}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
