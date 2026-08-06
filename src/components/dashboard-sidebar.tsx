import { useState } from "react";
import {
  LayoutDashboard,
  Mail,
  Search,
  MessageSquare,
  CircleHelp,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";

const items = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Smart Email Generator", icon: Mail },
  { title: "AI Research Assistant", icon: Search },
  { title: "AI Chatbot", icon: MessageSquare },
  { title: "Help", icon: CircleHelp },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <aside
      className="sticky top-0 hidden h-screen shrink-0 border-r border-border bg-sidebar transition-[width] duration-300 ease-out md:block"
      style={{ width: collapsed ? 76 : 250 }}
    >
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-1 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            {!collapsed && (
              <span className="truncate text-sm font-semibold tracking-tight">Aurora AI</span>
            )}
          </div>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((c) => !c)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1">
          {items.map((item) => {
            const isActive = active === item.title;
            return (
              <button
                key={item.title}
                onClick={() => setActive(item.title)}
                title={item.title}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
