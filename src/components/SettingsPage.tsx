import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Brain, 
  Shield, 
  Globe, 
  Palette, 
  Volume2, 
  Bell, 
  Clock, 
  Users, 
  Zap,
  Save,
  RefreshCw,
  Database,
  Wifi,
  Lock,
  Eye,
  Languages,
  Accessibility,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

interface SettingsPageProps {
  language: string;
}

const SettingsPage = ({ language }: SettingsPageProps) => {
  const [aiSettings, setAiSettings] = useState({
    autoOptimization: true,
    predictiveAnalytics: true,
    smartNotifications: true,
    voiceAnnouncements: true,
    queueBalancing: true,
    capacityPrediction: true
  });

  const [systemSettings, setSystemSettings] = useState({
    multiLanguage: true,
    accessibility: true,
    darkMode: false,
    autoRefresh: true,
    soundEnabled: true,
    mobileNotifications: true
  });

  const translations = {
    en: {
      title: "AI Settings & Configuration",
      overview: "Customize your queue management system with advanced AI features",
      aiIntelligence: "AI Intelligence",
      systemPreferences: "System Preferences",
      security: "Security & Privacy",
      integrations: "Integrations",
      autoOptimization: "Auto Queue Optimization",
      autoOptimizationDesc: "Let AI automatically balance queues for maximum efficiency",
      predictiveAnalytics: "Predictive Analytics",
      predictiveAnalyticsDesc: "AI forecasts peak hours and wait times",
      smartNotifications: "Smart Notifications", 
      smartNotificationsDesc: "Intelligent alerts based on queue patterns",
      voiceAnnouncements: "Voice Announcements",
      voiceAnnouncementsDesc: "AI-powered multilingual announcements",
      queueBalancing: "Dynamic Queue Balancing",
      queueBalancingDesc: "Automatically distribute load across counters",
      capacityPrediction: "Capacity Prediction",
      capacityPredictionDesc: "Predict and prevent overcrowding",
      multiLanguage: "Multi-Language Support",
      multiLanguageDesc: "Enable Hindi, English, and regional languages",
      accessibility: "Accessibility Features",
      accessibilityDesc: "Enhanced support for elderly and disabled users",
      darkMode: "Dark Mode",
      darkModeDesc: "Easier on the eyes during long shifts",
      autoRefresh: "Auto Data Refresh",
      autoRefreshDesc: "Keep information updated in real-time",
      soundEnabled: "Sound Notifications",
      soundEnabledDesc: "Audio alerts for important events",
      mobileNotifications: "Mobile Push Notifications",
      mobileNotificationsDesc: "Send updates to staff mobile devices",
      dataEncryption: "Data Encryption",
      backupFrequency: "Backup Frequency",
      accessControl: "Access Control",
      apiIntegrations: "API Integrations",
      saveChanges: "Save Changes",
      resetDefaults: "Reset to Defaults",
      aiPerformance: "AI Performance",
      excellent: "Excellent",
      systemHealth: "System Health",
      optimal: "Optimal",
      activeSessions: "Active Sessions",
      uptime: "System Uptime",
      lastOptimization: "Last AI Optimization",
      nextScheduled: "Next Scheduled",
      enabled: "Enabled",
      disabled: "Disabled",
      high: "High",
      daily: "Daily",
      restricted: "Restricted",
      connected: "Connected"
    },
    hi: {
      title: "AI सेटिंग्स और कॉन्फ़िगरेशन",
      overview: "उन्नत AI फीचर्स के साथ अपने क्यू मैनेजमेंट सिस्टम को कस्टमाइज़ करें",
      aiIntelligence: "AI इंटेलिजेंस",
      systemPreferences: "सिस्टम प्राथमिकताएं",
      security: "सुरक्षा और गोपनीयता",
      integrations: "इंटीग्रेशन",
      autoOptimization: "ऑटो क्यू ऑप्टिमाइज़ेशन",
      autoOptimizationDesc: "अधिकतम दक्षता के लिए AI को स्वचालित रूप से क्यू संतुलित करने दें",
      predictiveAnalytics: "प्रेडिक्टिव एनालिटिक्स",
      predictiveAnalyticsDesc: "AI पीक आवर्स और प्रतीक्षा समय का पूर्वानुमान लगाता है",
      smartNotifications: "स्मार्ट नोटिफिकेशन",
      smartNotificationsDesc: "क्यू पैटर्न के आधार पर बुद्धिमान अलर्ट",
      voiceAnnouncements: "वॉयस घोषणाएं",
      voiceAnnouncementsDesc: "AI-संचालित बहुभाषी घोषणाएं",
      queueBalancing: "डायनामिक क्यू बैलेंसिंग",
      queueBalancingDesc: "काउंटर्स में लोड को स्वचालित रूप से वितरित करें",
      capacityPrediction: "क्षमता भविष्यवाणी",
      capacityPredictionDesc: "भीड़भाड़ का पूर्वानुमान लगाएं और रोकें",
      multiLanguage: "बहु-भाषा समर्थन",
      multiLanguageDesc: "हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं को सक्षम करें",
      accessibility: "पहुंच सुविधाएं",
      accessibilityDesc: "बुजुर्गों और विकलांग उपयोगकर्ताओं के लिए बेहतर समर्थन",
      darkMode: "डार्क मोड",
      darkModeDesc: "लंबी शिफ्ट के दौरान आंखों पर आसान",
      autoRefresh: "ऑटो डेटा रिफ्रेश",
      autoRefreshDesc: "रियल-टाइम में जानकारी को अपडेट रखें",
      soundEnabled: "साउंड नोटिफिकेशन",
      soundEnabledDesc: "महत्वपूर्ण घटनाओं के लिए ऑडियो अलर्ट",
      mobileNotifications: "मोबाइल पुश नोटिफिकेशन",
      mobileNotificationsDesc: "स्टाफ मोबाइल डिवाइस पर अपडेट भेजें",
      dataEncryption: "डेटा एन्क्रिप्शन",
      backupFrequency: "बैकअप फ्रीक्वेंसी",
      accessControl: "एक्सेस कंट्रोल",
      apiIntegrations: "API इंटीग्रेशन",
      saveChanges: "परिवर्तन सहेजें",
      resetDefaults: "डिफ़ॉल्ट रीसेट करें",
      aiPerformance: "AI प्रदर्शन",
      excellent: "उत्कृष्ट",
      systemHealth: "सिस्टम स्वास्थ्य",
      optimal: "इष्टतम",
      activeSessions: "सक्रिय सत्र",
      uptime: "सिस्टम अपटाइम",
      lastOptimization: "अंतिम AI ऑप्टिमाइज़ेशन",
      nextScheduled: "अगला निर्धारित",
      enabled: "सक्षम",
      disabled: "अक्षम",
      high: "उच्च",
      daily: "दैनिक",
      restricted: "प्रतिबंधित", 
      connected: "कनेक्टेड"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleAISettingChange = (setting: keyof typeof aiSettings) => {
    setAiSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSystemSettingChange = (setting: keyof typeof systemSettings) => {
    setSystemSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.overview}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t.resetDefaults}
          </Button>
          <Button className="bg-gradient-primary">
            <Save className="h-4 w-4 mr-2" />
            {t.saveChanges}
          </Button>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-soft border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.aiPerformance}
            </CardTitle>
            <Brain className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">98%</div>
            <Badge className="bg-success/10 text-success mt-1">{t.excellent}</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-teal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.systemHealth}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal">100%</div>
            <Badge className="bg-teal/10 text-teal mt-1">{t.optimal}</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.activeSessions}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">users online</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.uptime}
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">99.8%</div>
            <p className="text-xs text-muted-foreground">30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Intelligence Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {t.aiIntelligence}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">{t.autoOptimization}</Label>
                    <Badge className="bg-primary/10 text-primary">
                      <Zap className="h-3 w-3 mr-1" />
                      Smart
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.autoOptimizationDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.autoOptimization}
                  onCheckedChange={() => handleAISettingChange('autoOptimization')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{t.predictiveAnalytics}</Label>
                  <p className="text-xs text-muted-foreground">{t.predictiveAnalyticsDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.predictiveAnalytics}
                  onCheckedChange={() => handleAISettingChange('predictiveAnalytics')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{t.smartNotifications}</Label>
                  <p className="text-xs text-muted-foreground">{t.smartNotificationsDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.smartNotifications}
                  onCheckedChange={() => handleAISettingChange('smartNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{t.voiceAnnouncements}</Label>
                  <p className="text-xs text-muted-foreground">{t.voiceAnnouncementsDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.voiceAnnouncements}
                  onCheckedChange={() => handleAISettingChange('voiceAnnouncements')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{t.queueBalancing}</Label>
                  <p className="text-xs text-muted-foreground">{t.queueBalancingDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.queueBalancing}
                  onCheckedChange={() => handleAISettingChange('queueBalancing')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">{t.capacityPrediction}</Label>
                  <p className="text-xs text-muted-foreground">{t.capacityPredictionDesc}</p>
                </div>
                <Switch
                  checked={aiSettings.capacityPrediction}
                  onCheckedChange={() => handleAISettingChange('capacityPrediction')}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t.lastOptimization}:</span>
                <span className="font-medium">2 min ago</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">{t.nextScheduled}:</span>
                <span className="font-medium">In 28 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              {t.systemPreferences}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.multiLanguage}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.multiLanguageDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.multiLanguage}
                  onCheckedChange={() => handleSystemSettingChange('multiLanguage')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Accessibility className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.accessibility}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.accessibilityDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.accessibility}
                  onCheckedChange={() => handleSystemSettingChange('accessibility')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.darkMode}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.darkModeDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.darkMode}
                  onCheckedChange={() => handleSystemSettingChange('darkMode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.autoRefresh}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.autoRefreshDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.autoRefresh}
                  onCheckedChange={() => handleSystemSettingChange('autoRefresh')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.soundEnabled}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.soundEnabledDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.soundEnabled}
                  onCheckedChange={() => handleSystemSettingChange('soundEnabled')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t.mobileNotifications}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.mobileNotificationsDesc}</p>
                </div>
                <Switch
                  checked={systemSettings.mobileNotifications}
                  onCheckedChange={() => handleSystemSettingChange('mobileNotifications')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t.security}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.dataEncryption}</span>
              </div>
              <Badge className="bg-success/10 text-success">{t.enabled}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.backupFrequency}</span>
              </div>
              <Badge className="bg-teal/10 text-teal">{t.daily}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.accessControl}</span>
              </div>
              <Badge className="bg-warning/10 text-warning">{t.restricted}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              {t.integrations}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{t.apiIntegrations}</span>
              </div>
              <Badge className="bg-success/10 text-success">{t.connected}</Badge>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm">API Endpoint</Label>
              <Input value="https://api.silentqueue.com/v1" readOnly />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm">Webhook URL</Label>
              <Input value="https://your-domain.com/webhook" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;