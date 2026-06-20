"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Shield, Bell, LogOut, Monitor, Smartphone } from "lucide-react";
import { BasePageCenter, LeftAsideLayout } from "@/components/base";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "security", label: "Security & Password", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function AccountSettingsPage() {
  const [active, setActive] = useState("personal");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BasePageCenter>
      <LeftAsideLayout
        aside={
          <nav className="flex flex-col gap-1 sticky top-24">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left w-full transition-colors",
                  active === id
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                {label}
              </button>
            ))}

            <div className="mt-8">
              <Separator className="mb-4" />
              <button className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive transition-colors w-full">
                <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </nav>
        }
      >
        <section id="personal" className="mb-14">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-headline text-2xl font-semibold text-primary">
                Personal Information
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Update your photo and personal details here.
              </p>
            </div>
            <Button size="sm">Save Changes</Button>
          </div>

          <div className="mb-8">
            <div className="w-24 h-28 rounded-md overflow-hidden border border-secondary mb-2">
              <Image
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=240&fit=crop&crop=face"
                alt="Profile photo"
                width={96}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
            <button className="text-xs text-primary underline underline-offset-2 hover:text-tertiary transition-colors">
              Change Photo
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-5">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </Label>
              <Input defaultValue="Ana Wijaya" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input defaultValue="ana.wijaya@estetika.com" type="email" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number
              </Label>
              <Input defaultValue="+62 872-3456-7890" type="tel" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </Label>
              <Input defaultValue="Jakarta, Indonesia" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Bio / Craft Preference
            </Label>
            <Textarea
              defaultValue="Enthusiast of Javanese textile traditions and contemporary minimalist architecture. Always seeking pieces with a story."
              rows={3}
            />
          </div>
        </section>

        <section id="security">
          <div className="mb-4">
            <h2 className="font-headline text-2xl font-semibold text-primary">
              Security
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account credentials and security settings.
            </p>
          </div>
          <Separator className="mb-6" />

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-primary mb-3">
                Recent Activity
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-secondary/60 bg-card">
                  <Monitor
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      MacBook Pro · Jakarta
                    </p>
                    <p className="text-xs font-medium text-green-600">
                      Active Now
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-secondary/60 bg-card">
                  <Smartphone
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      iPhone 15 · Ubud
                    </p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current Password
                </Label>
                <Input type="password" defaultValue="password" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    New Password
                  </Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Confirm New Password
                  </Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <Button variant="outline" className="self-start">
                Update Password
              </Button>
            </div>
          </div>
        </section>
      </LeftAsideLayout>
    </BasePageCenter>
  );
}
