import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Monitor, 
  Tv, 
  Smartphone, 
  Volume2, 
  VolumeX,
  Wifi,
  WifiOff,
  Settings,
  Eye,
  Languages,
  Palette,
  Zap,
  Brain,
  RefreshCw,
  Play,
  Pause,
  Edit
} from "lucide-react";
import { useState } from "react";

interface DisplaysPageProps {
  language: string;
}

const DisplaysPage = ({ language }: DisplaysPageProps) => {
  const [displays, setDisplays] = useState([
    {
      id: 1,
      name: "Main Display",
      type: "tv",
      status: "active",
      connected: true,
      audio: true,
      currentContent: "Queue Status",
      nextUpdate: "30s",
      aiOptimized: true
    },
    {
      id: 2,
      name: "Counter 1 Display", 
      type: "monitor",
      status: "active",
      connected: true,
      audio: false,
      currentContent: "Token #A045",
      nextUpdate: "Live",
      aiOptimized: true
    },
    {
      id: 3,
      name: "Mobile View",
      type: "smartphone",
      status: "preview",
      connected: true,
      audio: false,
      currentContent: "QR Code",
      nextUpdate: "5m",
      aiOptimized: false
    },
    {
      id: 4,
      name: "Waiting Area TV",
      type: "tv",
      status: "offline",
      connected: false,
      audio: true,
      currentContent: "Offline",
      nextUpdate: "--",
      aiOptimized: false
    }
  ]);

  const translations = {
    en: {
      title: "Smart Display Management",
      overview: "Intelligent displays powered by automation for optimal user experience",
      totalDisplays: "Total Displays",
      activeDisplays: "Active Displays", 
      smartContent: "Auto-Generated Content",
      autoAnnouncements: "Auto Announcements",
      displays: "displays",
      active: "Active",
      previewMode: "Preview",
      offline: "Offline",
      connected: "Connected",
      disconnected: "Disconnected",
      audio: "Audio",
      aiOptimized: "Smart Optimized",
      currentContent: "Current Content",
      nextUpdate: "Next Update",
      actions: "Actions",
      edit: "Edit",
      preview: "Preview",
      refresh: "Refresh",
      globalSettings: "Global Display Settings",
      language: "Display Language",
      theme: "Display Theme",
      autoRefresh: "Auto Refresh",
      smartAnnouncements: "Smart Announcements",
      contentOptimization: "Digital Content Optimization",
      accessibility: "Accessibility Mode",
      minutes: "minutes",
      seconds: "seconds",
      live: "Live"
    },
    hi: {
      title: "स्मार्ट डिस्प्ले प्रबंधन",
      overview: "इष्टतम उपयोगकर्ता अनुभव के लिए स्वचालन द्वारा संचालित स्मार्ट डिस्प्ले",
      totalDisplays: "कुल डिस्प्ले",
      activeDisplays: "सक्रिय डिस्प्ले",
      smartContent: "ऑटो-जनरेटेड सामग्री",
      autoAnnouncements: "ऑटो घोषणाएं",
      displays: "डिस्प्ले",
      active: "सक्रिय",
      previewMode: "पूर्वावलोकन",
      offline: "ऑफलाइन",
      connected: "कनेक्टेड",
      disconnected: "डिस्कनेक्टेड",
      audio: "ऑडियो",
      aiOptimized: "स्मार्ट अनुकूलित",
      currentContent: "वर्तमान सामग्री",
      nextUpdate: "अगला अपडेट",
      actions: "कार्य",
      edit: "संपादित करें",
      preview: "पूर्वावलोकन",
      refresh: "रिफ्रेश",
      globalSettings: "ग्लोबल डिस्प्ले सेटिंग्स",
      language: "डिस्प्ले भाषा",
      theme: "डिस्प्ले थीम",
      autoRefresh: "ऑटो रिफ्रेश",
      smartAnnouncements: "स्मार्ट घोषणाएं",
      contentOptimization: "डिजिटल सामग्री अनुकूलन",
      accessibility: "पहुंच मोड",
      minutes: "मिनट",
      seconds: "सेकंड",
      live: "लाइव"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getDisplayIcon = (type: string) => {
    switch (type) {
      case 'tv': return Tv;
      case 'smartphone': return Smartphone;
      default: return Monitor;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/30';
      case 'preview': return 'bg-warning/10 text-warning border-warning/30';
      case 'offline': return 'bg-destructive/10 text-destructive border-destructive/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  const toggleAudio = (id: number) => {
    setDisplays(prev => prev.map(display => 
      display.id === id ? { ...display, audio: !display.audio } : display
    ));
  };

  const toggleAIOptimization = (id: number) => {
    setDisplays(prev => prev.map(display => 
      display.id === id ? { ...display, aiOptimized: !display.aiOptimized } : display
    ));
  };

  const activeCount = displays.filter(d => d.status === 'active').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.overview}</p>
        </div>
        <Button className="gap-2 bg-primary">
          <Zap className="h-4 w-4" />
          Smart Auto-Optimize
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.totalDisplays}
            </CardTitle>
            <Monitor className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{displays.length}</div>
            <p className="text-xs text-muted-foreground">{t.displays}</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.activeDisplays}
            </CardTitle>
            <Eye className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{activeCount}</div>
            <p className="text-xs text-muted-foreground">{t.active.toLowerCase()}</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-teal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.smartContent}
            </CardTitle>
            <Brain className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal">85%</div>
            <p className="text-xs text-muted-foreground">Smart optimized</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.autoAnnouncements}
            </CardTitle>
            <Volume2 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-xs text-muted-foreground">today</p>
          </CardContent>
        </Card>
      </div>

      {/* Displays Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displays.map((display) => {
          const DisplayIcon = getDisplayIcon(display.type);
          
          return (
            <Card key={display.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DisplayIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{display.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getStatusColor(display.status)}>
                          {display.status === 'preview' ? t.previewMode : t[display.status as keyof typeof t] || display.status}
                        </Badge>
                        {display.aiOptimized && (
                          <Badge className="bg-teal/10 text-teal border-teal/30">
                            <Brain className="h-3 w-3 mr-1" />
                            Smart
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {display.connected ? (
                      <Wifi className="h-4 w-4 text-success" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t.currentContent}:</span>
                    <p className="font-medium">{display.currentContent}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t.nextUpdate}:</span>
                    <p className="font-medium">{display.nextUpdate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`audio-${display.id}`} className="text-sm">
                        {t.audio}
                      </label>
                      <Switch
                        id={`audio-${display.id}`}
                        checked={display.audio}
                        onCheckedChange={() => toggleAudio(display.id)}
                        disabled={!display.connected}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label htmlFor={`ai-${display.id}`} className="text-sm">
                        Smart
                      </label>
                      <Switch
                        id={`ai-${display.id}`}
                        checked={display.aiOptimized}
                        onCheckedChange={() => toggleAIOptimization(display.id)}
                        disabled={!display.connected}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={!display.connected}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={!display.connected}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={!display.connected}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Settings */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            {t.globalSettings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.language}</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.theme}</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.autoRefresh}</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.smartAnnouncements}</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.contentOptimization}</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.accessibility}</span>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplaysPage;