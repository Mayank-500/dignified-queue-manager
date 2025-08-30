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
  Phone,
  MessageSquare,
  Download,
  Filter,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Target,
  Timer,
  Calendar,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardPageProps {
  language: string;
}

const DashboardPage = ({ language }: DashboardPageProps) => {
  const [statisticsData, setStatisticsData] = useState({
    totalQueues: 5,
    avgWaitTime: 18,
    peakHours: "2:30 PM - 4:30 PM",
    satisfaction: 4.3,
    todayServed: 142,
    weeklyGrowth: 12
  });

  const [customerData, setCustomerData] = useState([
    { id: 1, phone: "+91 9876543210", time: "09:15 AM", purpose: "Account Opening", status: "Completed", queue: "Queue A" },
    { id: 2, phone: "+91 8765432109", time: "09:32 AM", purpose: "Loan Inquiry", status: "In Progress", queue: "Queue B" },
    { id: 3, phone: "+91 7654321098", time: "10:05 AM", purpose: "Document Verification", status: "Waiting", queue: "Queue A" },
    { id: 4, phone: "+91 6543210987", time: "10:18 AM", purpose: "Balance Inquiry", status: "Completed", queue: "Queue C" },
    { id: 5, phone: "+91 5432109876", time: "11:22 AM", purpose: "Card Issues", status: "Waiting", queue: "Queue B" }
  ]);

  const [filterPurpose, setFilterPurpose] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [smsMessage, setSmsMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setStatisticsData(prev => ({
        ...prev,
        avgWaitTime: Math.max(5, prev.avgWaitTime + Math.floor(Math.random() * 4) - 2),
        todayServed: prev.todayServed + Math.floor(Math.random() * 2),
        satisfaction: Math.max(3.0, Math.min(5.0, prev.satisfaction + (Math.random() - 0.5) * 0.2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    en: {
      overview: "Queue Management Dashboard",
      unifiedStats: "Unified Statistics Panel",
      keyMetrics: "Key Metrics & Analytics",
      customerLog: "Customer Data Log",
      followUp: "Follow-up & Re-Engagement",
      totalQueues: "Total Queues",
      avgWaitTime: "Avg Wait Time",
      peakHours: "Peak Hours",
      satisfaction: "Satisfaction",
      todayServed: "Served Today",
      weeklyGrowth: "Weekly Growth",
      minutes: "minutes",
      customers: "customers",
      rating: "rating",
      percent: "%",
      excellent: "Excellent",
      good: "Good",
      moderate: "Moderate",
      liveData: "Live Data",
      refresh: "Refresh Data",
      exportData: "Export Data",
      sendSMS: "Send SMS",
      filterBy: "Filter by",
      searchPhone: "Search by phone...",
      phone: "Phone Number",
      time: "Time",
      purpose: "Purpose",
      status: "Status",
      queue: "Queue",
      actions: "Actions",
      completed: "Completed",
      inProgress: "In Progress",
      waiting: "Waiting",
      selectAll: "Select All",
      smsPlaceholder: "Type your follow-up message here...",
      sendToSelected: "Send to Selected",
      allPurposes: "All Purposes",
      allStatuses: "All Statuses"
    },
    hi: {
      overview: "क्यू प्रबंधन डैशबोर्ड",
      unifiedStats: "एकीकृत सांख्यिकी पैनल",
      keyMetrics: "मुख्य मेट्रिक्स और एनालिटिक्स",
      customerLog: "ग्राहक डेटा लॉग",
      followUp: "फॉलो-अप और पुन: सम्पर्क",
      totalQueues: "कुल क्यू",
      avgWaitTime: "औसत प्रतीक्षा समय",
      peakHours: "पीक आवर्स",
      satisfaction: "संतुष्टि",
      todayServed: "आज सेवा की गई",
      weeklyGrowth: "साप्ताहिक वृद्धि",
      minutes: "मिनट",
      customers: "ग्राहक",
      rating: "रेटिंग",
      percent: "%",
      excellent: "उत्कृष्ट",
      good: "अच्छी",
      moderate: "मध्यम",
      liveData: "लाइव डेटा",
      refresh: "डेटा रिफ्रेश करें",
      exportData: "डेटा एक्सपोर्ट करें",
      sendSMS: "SMS भेजें",
      filterBy: "फिल्टर करें",
      searchPhone: "फोन से खोजें...",
      phone: "फोन नंबर",
      time: "समय",
      purpose: "उद्देश्य",
      status: "स्थिति",
      queue: "क्यू",
      actions: "कार्य",
      completed: "पूर्ण",
      inProgress: "प्रगति में",
      waiting: "प्रतीक्षा",
      selectAll: "सभी चुनें",
      smsPlaceholder: "यहाँ अपना फॉलो-अप संदेश टाइप करें...",
      sendToSelected: "चयनित को भेजें",
      allPurposes: "सभी उद्देश्य",
      allStatuses: "सभी स्थितियां"
    }
  };

  const t = translations[language as keyof typeof translations];

  const getSatisfactionBadge = (rating: number) => {
    if (rating >= 4.5) return { text: t.excellent, color: "bg-success/10 text-success" };
    if (rating >= 3.5) return { text: t.good, color: "bg-teal/10 text-teal" };
    return { text: t.moderate, color: "bg-warning/10 text-warning" };
  };

  const satisfactionBadge = getSatisfactionBadge(statisticsData.satisfaction);

  const filteredCustomers = customerData.filter(customer => {
    const matchesPhone = customer.phone.toLowerCase().includes(searchPhone.toLowerCase());
    const matchesPurpose = filterPurpose === "" || customer.purpose === filterPurpose;
    const matchesStatus = filterStatus === "" || customer.status === filterStatus;
    return matchesPhone && matchesPurpose && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomers(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSendSMS = () => {
    if (selectedCustomers.length > 0 && smsMessage.trim()) {
      // SMS sending logic would go here
      alert(`SMS sent to ${selectedCustomers.length} customers: "${smsMessage}"`);
      setSelectedCustomers([]);
      setSmsMessage("");
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredCustomers, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customer-data.json';
    link.click();
  };

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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            {t.exportData}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t.refresh}
          </Button>
        </div>
      </div>
      
      {/* Unified Statistics Panel */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t.unifiedStats}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{t.totalQueues}</span>
              </div>
              <div className="text-2xl font-bold text-primary">{statisticsData.totalQueues}</div>
              <Progress value={80} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">{t.avgWaitTime}</span>
              </div>
              <div className="text-2xl font-bold text-warning">{statisticsData.avgWaitTime} {t.minutes}</div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal" />
                <span className="text-sm font-medium">{t.peakHours}</span>
              </div>
              <div className="text-lg font-bold text-teal">{statisticsData.peakHours}</div>
              <div className="text-xs text-muted-foreground">Highest traffic period</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-soft border-l-4 border-l-success">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.satisfaction}
            </CardTitle>
            <Star className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-success">{statisticsData.satisfaction.toFixed(1)}</div>
              <Badge className={satisfactionBadge.color}>{satisfactionBadge.text}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{t.rating}</p>
            <Progress value={statisticsData.satisfaction * 20} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.todayServed}
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{statisticsData.todayServed}</div>
            <p className="text-xs text-muted-foreground">{t.customers}</p>
            <Progress value={75} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-teal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.weeklyGrowth}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal">+{statisticsData.weeklyGrowth}{t.percent}</div>
            <p className="text-xs text-muted-foreground">vs last week</p>
            <Progress value={statisticsData.weeklyGrowth * 5} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Customer Data Log */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            {t.customerLog}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={t.searchPhone}
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={filterPurpose} onValueChange={setFilterPurpose}>
              <SelectTrigger className="sm:max-w-xs">
                <SelectValue placeholder={t.allPurposes} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.allPurposes}</SelectItem>
                <SelectItem value="Account Opening">Account Opening</SelectItem>
                <SelectItem value="Loan Inquiry">Loan Inquiry</SelectItem>
                <SelectItem value="Document Verification">Document Verification</SelectItem>
                <SelectItem value="Balance Inquiry">Balance Inquiry</SelectItem>
                <SelectItem value="Card Issues">Card Issues</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="sm:max-w-xs">
                <SelectValue placeholder={t.allStatuses} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.allStatuses}</SelectItem>
                <SelectItem value="Completed">{t.completed}</SelectItem>
                <SelectItem value="In Progress">{t.inProgress}</SelectItem>
                <SelectItem value="Waiting">{t.waiting}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead>{t.phone}</TableHead>
                  <TableHead>{t.time}</TableHead>
                  <TableHead>{t.purpose}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.queue}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <input 
                        type="checkbox" 
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{customer.phone}</TableCell>
                    <TableCell>{customer.time}</TableCell>
                    <TableCell>{customer.purpose}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          customer.status === 'Completed' ? 'bg-success/10 text-success' :
                          customer.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                          'bg-warning/10 text-warning'
                        }
                      >
                        {customer.status === 'Completed' ? t.completed :
                         customer.status === 'In Progress' ? t.inProgress :
                         t.waiting}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.queue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Follow-up & Re-Engagement */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            {t.followUp}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                SMS Message ({selectedCustomers.length} customers selected)
              </label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                placeholder={t.smsPlaceholder}
                className="w-full p-3 border border-border rounded-lg resize-none h-24"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSendSMS}
                disabled={selectedCustomers.length === 0 || !smsMessage.trim()}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {t.sendToSelected} ({selectedCustomers.length})
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule SMS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;