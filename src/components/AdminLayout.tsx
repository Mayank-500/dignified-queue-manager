import { useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Ticket, 
  Monitor, 
  Settings, 
  Menu, 
  Search, 
  Globe, 
  User,
  Wifi,
  WifiOff,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import TokensPage from "./TokensPage";
import DashboardPage from "./DashboardPage";
import DisplaysPage from "./DisplaysPage";
import SettingsPage from "./SettingsPage";

interface AdminLayoutProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const AdminLayout = ({ language, setLanguage }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const location = useLocation();

  const translations = {
    en: {
      silentQueue: "Silent Queue",
      adminTokens: "Admin · Tokens",
      dashboard: "Dashboard",
      tokens: "Tokens", 
      displays: "Displays",
      settings: "Settings",
      search: "Search tokens...",
      lastUpdated: "Last updated",
      live: "Live",
      offline: "You're offline. Changes will sync automatically.",
      admin: "Admin"
    },
    hi: {
      silentQueue: "साइलेंट क्यू",
      adminTokens: "एडमिन · टोकन",
      dashboard: "डैशबोर्ड", 
      tokens: "टोकन",
      displays: "डिस्प्ले",
      settings: "सेटिंग्स",
      search: "टोकन खोजें...",
      lastUpdated: "अंतिम अपडेट",
      live: "लाइव",
      offline: "आप ऑफ़लाइन हैं। परिवर्तन स्वचालित रूप से सिंक होंगे।",
      admin: "एडमिन"
    }
  };

  const t = translations[language as keyof typeof translations];

  const navigationItems = [
    { 
      path: "/dashboard", 
      label: t.dashboard, 
      icon: LayoutDashboard, 
      labelHi: translations.hi.dashboard 
    },
    { 
      path: "/", 
      label: t.tokens, 
      icon: Ticket, 
      labelHi: translations.hi.tokens 
    },
    { 
      path: "/displays", 
      label: t.displays, 
      icon: Monitor, 
      labelHi: translations.hi.displays 
    },
    { 
      path: "/settings", 
      label: t.settings, 
      icon: Settings, 
      labelHi: translations.hi.settings 
    }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        {/* Logo & Brand */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              SQ
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-foreground">{t.silentQueue}</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-3 space-y-1">
            {navigationItems.map(({ path, label, icon: Icon, labelHi }) => (
              <NavLink
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(path)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <div className="flex flex-col">
                    <span>{label}</span>
                    {language === "en" && labelHi && (
                      <span className="text-xs opacity-60">{labelHi}</span>
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full justify-start"
          >
            <Menu className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">
              {t.adminTokens}
            </h1>
            {isOnline ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>{t.lastUpdated} 12:02 · {t.live}</span>
              </div>
            ) : (
              <Badge variant="secondary" className="bg-warning text-warning-foreground">
                <WifiOff className="w-3 h-3 mr-1" />
                {t.offline}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t.search}
                className="pl-9 w-80 bg-background"
              />
            </div>

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase font-medium">
                    {language}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "bg-accent" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage("hi")}
                  className={language === "hi" ? "bg-accent" : ""}
                >
                  हिन्दी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t.admin}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t.settings}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage language={language} />} />
            <Route path="/" element={<TokensPage language={language} />} />
            <Route path="/displays" element={<DisplaysPage language={language} />} />
            <Route path="/settings" element={<SettingsPage language={language} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;