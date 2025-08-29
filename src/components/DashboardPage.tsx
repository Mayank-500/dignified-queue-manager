import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Brain,
  Zap,
  Eye,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Target,
  Timer
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardPageProps {
  language: string;
}

const DashboardPage = ({ language }: DashboardPageProps) => {
  const [realTimeData, setRealTimeData] = useState({
    activeTokens: 24,
    avgWaitTime: 18,
    servedToday: 142,
    efficiency: 94,
    aiPrediction: "Low traffic expected",
    queueHealth: "Excellent",
    nextRush: "2:30 PM",
    estimatedCompletion: "4:15 PM"
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeTokens: Math.max(10, prev.activeTokens + Math.floor(Math.random() * 6) - 3),
        avgWaitTime: Math.max(5, prev.avgWaitTime + Math.floor(Math.random() * 4) - 2),
        servedToday: prev.servedToday + Math.floor(Math.random() * 2),
        efficiency: Math.min(99, Math.max(85, prev.efficiency + Math.floor(Math.random() * 3) - 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    en: {
      overview: "AI-Powered Dashboard",
      activeTokens: "Active Tokens",
      avgWaitTime: "Avg Wait Time",
      servedToday: "Served Today", 
      efficiency: "Queue Efficiency",
      minutes: "minutes",
      tokens: "tokens",
      excellent: "Excellent",
      good: "Good",
      moderate: "Moderate",
      aiInsights: "AI Queue Intelligence",
      prediction: "Smart Prediction",
      queueHealth: "Queue Health",
      nextRush: "Next Rush Hour",
      completion: "Est. Completion",
      liveData: "Live Data",
      autoOptimize: "Auto-Optimize Queue",
      refreshing: "Refreshing...",
      peakEfficiency: "Peak Efficiency Achieved",
      smartAlert: "AI Alert: Consider adding counter 3 for optimal flow"
    },
    hi: {
      overview: "AI-संचालित डैशबोर्ड",
      activeTokens: "सक्रिय टोकन",
      avgWaitTime: "औसत प्रतीक्षा समय",
      servedToday: "आज सेवा की गई",
      efficiency: "क्यू दक्षता",
      minutes: "मिनट",
      tokens: "टोकन",
      excellent: "उत्कृष्ट",
      good: "अच्छी",
      moderate: "मध्यम",
      aiInsights: "AI क्यू इंटेलिजेंस",
      prediction: "स्मार्ट भविष्यवाणी",
      queueHealth: "क्यू स्वास्थ्य",
      nextRush: "अगला रश आवर",
      completion: "अनुमानित समाप्ति",
      liveData: "लाइव डेटा",
      autoOptimize: "ऑटो-ऑप्टिमाइज़ क्यू",
      refreshing: "रिफ्रेश कर रहे हैं...",
      peakEfficiency: "चरम दक्षता प्राप्त",
      smartAlert: "AI अलर्ट: इष्टतम प्रवाह के लिए काउंटर 3 जोड़ने पर विचार करें"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 95) return { text: t.excellent, color: "bg-success/10 text-success" };
    if (efficiency >= 85) return { text: t.good, color: "bg-teal/10 text-teal" };
    return { text: t.moderate, color: "bg-warning/10 text-warning" };
  };

  const badge = getEfficiencyBadge(realTimeData.efficiency);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t.overview}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">{t.liveData}</span>
            </div>
            <span className="text-xs text-muted-foreground">• Last updated just now</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t.autoOptimize}
        </Button>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.activeTokens}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{realTimeData.activeTokens}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last hour
            </p>
            <Progress value={75} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.avgWaitTime}
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{realTimeData.avgWaitTime}</div>
            <p className="text-xs text-muted-foreground">
              {t.minutes}
            </p>
            <Progress value={65} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.servedToday}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{realTimeData.servedToday}</div>
            <p className="text-xs text-muted-foreground">
              {t.tokens}
            </p>
            <Progress value={85} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-teal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.efficiency}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-teal">{realTimeData.efficiency}%</div>
              <Badge className={badge.color}>{badge.text}</Badge>
            </div>
            <Progress value={realTimeData.efficiency} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* AI Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              {t.aiInsights}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-success" />
                <span className="font-medium text-success">{t.peakEfficiency}</span>
              </div>
              <Badge variant="outline" className="text-success border-success/30">AI</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gradient-subtle rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{t.prediction}</span>
                </div>
                <p className="text-xs text-muted-foreground">{realTimeData.aiPrediction}</p>
              </div>
              
              <div className="p-3 bg-gradient-subtle rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-teal" />
                  <span className="text-sm font-medium">{t.queueHealth}</span>
                </div>
                <p className="text-xs text-muted-foreground">{realTimeData.queueHealth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Smart Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-warning" />
                  <span className="text-sm">{t.nextRush}</span>
                </div>
                <span className="text-sm font-medium">{realTimeData.nextRush}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">{t.completion}</span>
                </div>
                <span className="text-sm font-medium">{realTimeData.estimatedCompletion}</span>
              </div>
            </div>
            
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-xs text-primary">{t.smartAlert}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;