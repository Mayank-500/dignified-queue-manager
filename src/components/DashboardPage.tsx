import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Activity
} from "lucide-react";

interface DashboardPageProps {
  language: string;
}

const DashboardPage = ({ language }: DashboardPageProps) => {
  const translations = {
    en: {
      overview: "Dashboard Overview",
      activeTokens: "Active Tokens",
      avgWaitTime: "Avg Wait Time",
      servedToday: "Served Today", 
      pendingTokens: "Pending Tokens",
      minutes: "minutes",
      tokens: "tokens",
      efficiency: "Queue Efficiency",
      good: "Good"
    },
    hi: {
      overview: "डैशबोर्ड अवलोकन",
      activeTokens: "सक्रिय टोकन",
      avgWaitTime: "औसत प्रतीक्षा समय",
      servedToday: "आज सेवा की गई",
      pendingTokens: "लंबित टोकन",
      minutes: "मिनट",
      tokens: "टोकन",
      efficiency: "क्यू दक्षता",
      good: "अच्छी"
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">{t.overview}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.activeTokens}
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">
              +2 from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.avgWaitTime}
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">18</div>
            <p className="text-xs text-muted-foreground">
              {t.minutes}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.servedToday}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">142</div>
            <p className="text-xs text-muted-foreground">
              {t.tokens}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.efficiency}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-teal">94%</div>
              <Badge className="bg-teal/10 text-teal">{t.good}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;