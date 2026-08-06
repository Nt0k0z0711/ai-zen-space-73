import type { ReactNode } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar />
      <main className="flex-1 animate-fade-up px-5 py-8 sm:px-10 sm:py-12">
        <div className="mx-auto w-full max-w-[1000px]">
          <header className="hero-gradient rounded-[24px] p-8 sm:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-hero-foreground">{title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-hero-foreground/85">
              {description}
            </p>
          </header>
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
