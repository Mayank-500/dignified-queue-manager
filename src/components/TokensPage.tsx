import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, Trash2, Clock, Plus, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import StatusBadge, { type TokenStatus } from "./StatusBadge";
import TokenForm from "./TokenForm";

interface Token {
  id: string;
  table: number;
  waitTime: number;
  status: TokenStatus;
  createdAt: Date;
  eta: Date;
  phone?: string;
}

interface TokensPageProps {
  language: string;
}

const TokensPage = ({ language }: TokensPageProps) => {
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "A001",
      table: 1,
      waitTime: 15,
      status: "serving",
      createdAt: new Date(Date.now() - 900000),
      eta: new Date()
    },
    {
      id: "A002", 
      table: 3,
      waitTime: 25,
      status: "waiting",
      createdAt: new Date(Date.now() - 600000),
      eta: new Date(Date.now() + 1200000)
    },
    {
      id: "B001",
      table: 2,
      waitTime: 20,
      status: "upcoming",
      createdAt: new Date(Date.now() - 300000),
      eta: new Date(Date.now() + 900000)
    },
    {
      id: "A003",
      table: 5,
      waitTime: 30,
      status: "delayed",
      createdAt: new Date(Date.now() - 1800000),
      eta: new Date(Date.now() + 600000)
    },
    {
      id: "C001",
      table: 4,
      waitTime: 18,
      status: "completed",
      createdAt: new Date(Date.now() - 2700000),
      eta: new Date(Date.now() - 300000)
    },
    {
      id: "B002",
      table: 6,
      waitTime: 22,
      status: "noshow",
      createdAt: new Date(Date.now() - 3600000),
      eta: new Date(Date.now() - 1800000)
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Manual assignment form state
  const [manualPhone, setManualPhone] = useState("");
  const [selectedQueue, setSelectedQueue] = useState("A");
  const [isAssigning, setIsAssigning] = useState(false);
  const [lastAssignmentTime, setLastAssignmentTime] = useState<Record<string, number>>({});

  const translations = {
    en: {
      showingTokens: "Showing 6 of 6 tokens",
      allStatuses: "All Statuses",
      tokenId: "Token ID",
      table: "Table",
      waitTime: "Wait Time", 
      status: "Status",
      eta: "ETA",
      actions: "Actions",
      now: "Now",
      edit: "Edit",
      delete: "Delete",
      addDelay: "Add Delay",
      searchTokens: "Search tokens...",
      manualAssign: "Manual Token Assign",
      phoneNumber: "Phone Number",
      phonePlaceholder: "+91 9876543210 or 9876543210",
      selectQueue: "Select Queue",
      assignToken: "Assign Token",
      cancel: "Cancel",
      tokenAssigned: "Token assigned successfully!",
      position: "Position",
      existingToken: "Phone number already has an active token.",
      reuseExisting: "Reuse Existing",
      createNew: "Create New",
      invalidPhone: "Please enter a valid phone number (+91 format or 10 digits)",
      rateLimited: "Please wait 1 minute before assigning another token to this number",
      assignmentError: "Failed to assign token. Please try again."
    },
    hi: {
      showingTokens: "6 में से 6 टोकन दिखा रहे हैं",
      allStatuses: "सभी स्थितियां",
      tokenId: "टोकन आईडी",
      table: "टेबल",
      waitTime: "प्रतीक्षा समय",
      status: "स्थिति",
      eta: "अनुमानित समय",
      actions: "कार्य",
      now: "अभी",
      edit: "संपादित करें",
      delete: "हटाएं",
      addDelay: "देरी जोड़ें",
      searchTokens: "टोकन खोजें...",
      manualAssign: "मैन्युअल टोकन असाइन",
      phoneNumber: "फोन नंबर",
      phonePlaceholder: "+91 9876543210 या 9876543210",
      selectQueue: "क्यू चुनें",
      assignToken: "टोकन असाइन करें",
      cancel: "रद्द करें",
      tokenAssigned: "टोकन सफलतापूर्वक असाइन किया गया!",
      position: "स्थिति",
      existingToken: "फोन नंबर का पहले से एक सक्रिय टोकन है।",
      reuseExisting: "मौजूदा का उपयोग करें",
      createNew: "नया बनाएं",
      invalidPhone: "कृपया एक वैध फोन नंबर दर्ज करें (+91 प्रारूप या 10 अंक)",
      rateLimited: "इस नंबर को दूसरा टोकन असाइन करने से पहले कृपया 1 मिनट प्रतीक्षा करें",
      assignmentError: "टोकन असाइन करने में विफल। कृपया पुनः प्रयास करें।"
    }
  };

  const t = translations[language as keyof typeof translations];

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || token.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddToken = (newToken: Omit<Token, 'createdAt' | 'eta'> & { createdAt: Date; eta: Date }) => {
    setTokens(prev => [newToken, ...prev]);
  };

  // Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all spaces and special characters except +
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Check for +91 format (13 digits total) or 10 digit format
    const indianMobile = /^(\+91|91)?[6-9]\d{9}$/;
    return indianMobile.test(cleaned);
  };

  // Normalize phone number to standard format
  const normalizePhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    if (cleaned.startsWith('+91')) {
      return cleaned;
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      return '+' + cleaned;
    } else if (cleaned.length === 10) {
      return '+91' + cleaned;
    }
    return cleaned;
  };

  // Generate next token ID for queue
  const generateNextTokenId = (queuePrefix: string): string => {
    const queueTokens = tokens.filter(t => t.id.startsWith(queuePrefix));
    const numbers = queueTokens.map(t => parseInt(t.id.substring(1)) || 0);
    const nextNumber = Math.max(0, ...numbers) + 1;
    return `${queuePrefix}${String(nextNumber).padStart(3, '0')}`;
  };

  // Calculate position in queue
  const calculateQueuePosition = (queuePrefix: string): number => {
    const activeTokens = tokens.filter(t => 
      t.id.startsWith(queuePrefix) && 
      (t.status === 'waiting' || t.status === 'upcoming')
    );
    return activeTokens.length + 1;
  };

  // Handle manual token assignment
  const handleManualAssignment = async () => {
    try {
      setIsAssigning(true);

      // Validate phone number
      if (!validatePhoneNumber(manualPhone)) {
        toast({
          variant: "destructive",
          title: "Invalid Phone Number",
          description: t.invalidPhone,
        });
        return;
      }

      const normalizedPhone = normalizePhoneNumber(manualPhone);

      // Check rate limiting (1 token per minute per number)
      const now = Date.now();
      const lastAssignment = lastAssignmentTime[normalizedPhone];
      if (lastAssignment && (now - lastAssignment) < 60000) { // 1 minute = 60000ms
        toast({
          variant: "destructive",
          title: "Rate Limited",
          description: t.rateLimited,
        });
        return;
      }

      // Check for existing active token
      const existingToken = tokens.find(t => 
        t.phone === normalizedPhone && 
        (t.status === 'waiting' || t.status === 'upcoming' || t.status === 'serving')
      );

      if (existingToken) {
        // Show warning about existing token
        const shouldCreateNew = window.confirm(
          `${t.existingToken}\n\n${t.reuseExisting} or ${t.createNew}?\n\nClick OK for ${t.createNew}, Cancel for ${t.reuseExisting}`
        );
        
        if (!shouldCreateNew) {
          // Reuse existing - just show info
          toast({
            title: "Existing Token",
            description: `Token #${existingToken.id} - ${t.position}: ${calculateQueuePosition(existingToken.id.charAt(0))}`,
          });
          return;
        }
      }

      // Generate new token
      const tokenId = generateNextTokenId(selectedQueue);
      const position = calculateQueuePosition(selectedQueue);
      const estimatedWaitTime = (position - 1) * 5; // 5 minutes per person estimate
      
      const newToken: Token = {
        id: tokenId,
        table: Math.floor(Math.random() * 6) + 1, // Random table 1-6
        waitTime: estimatedWaitTime,
        status: position === 1 ? "serving" : "waiting",
        phone: normalizedPhone,
        createdAt: new Date(),
        eta: new Date(Date.now() + estimatedWaitTime * 60000)
      };

      // Add token to list
      setTokens(prev => [newToken, ...prev]);

      // Update rate limiting
      setLastAssignmentTime(prev => ({
        ...prev,
        [normalizedPhone]: now
      }));

      // Success toast
      toast({
        title: t.tokenAssigned,
        description: `Token #${tokenId} - ${t.position}: ${position}`,
        duration: 5000,
      });

      // Log to admin analytics (simulated)
      console.log('Admin Analytics:', {
        action: 'manual_token_assignment',
        tokenId,
        phone: normalizedPhone,
        queue: selectedQueue,
        position,
        timestamp: new Date().toISOString(),
        assignedBy: 'admin_user'
      });

      // Send SMS if configured (simulated)
      console.log('SMS Notification:', {
        to: normalizedPhone,
        message: `Your token ${tokenId} has been assigned. Position: ${position}. Estimated wait: ${estimatedWaitTime} minutes.`,
        timestamp: new Date().toISOString()
      });

      // Clear form
      setManualPhone("");
      setSelectedQueue("A");

    } catch (error) {
      console.error('Manual assignment error:', error);
      toast({
        variant: "destructive",
        title: "Assignment Failed",
        description: t.assignmentError,
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (Math.abs(diffMins) < 1) return t.now;
    if (diffMins > 0) return `${diffMins} min`;
    return `${Math.abs(diffMins)} min ago`;
  };

  const formatETA = (date: Date) => {
    return date.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex h-full">
      {/* Form Panel - Left Side */}
      <div className="w-96 border-r border-border bg-card/50 p-6 space-y-6">
        <TokenForm language={language} onAddToken={handleAddToken} />
        
        {/* Manual Token Assignment */}
        <Card className="shadow-soft border-l-4 border-l-teal">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-teal" />
              <h3 className="text-lg font-semibold text-foreground">{t.manualAssign}</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="manual-phone" className="text-sm font-medium">
                {t.phoneNumber}
              </Label>
              <Input
                id="manual-phone"
                type="tel"
                value={manualPhone}
                onChange={(e) => setManualPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="queue-select" className="text-sm font-medium">
                {t.selectQueue}
              </Label>
              <Select value={selectedQueue} onValueChange={setSelectedQueue}>
                <SelectTrigger id="queue-select" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Queue A</SelectItem>
                  <SelectItem value="B">Queue B</SelectItem>
                  <SelectItem value="C">Queue C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleManualAssignment}
                disabled={isAssigning || !manualPhone.trim()}
                className="flex-1 bg-teal hover:bg-teal/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isAssigning ? "Assigning..." : t.assignToken}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setManualPhone("");
                  setSelectedQueue("A");
                }}
                disabled={isAssigning}
              >
                {t.cancel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Table - Right Side */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          {/* Header Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchTokens}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80 bg-background"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-background">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder={t.allStatuses} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allStatuses}</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="serving">Now Serving</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="noshow">No-show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Badge variant="secondary" className="text-muted-foreground">
              {t.showingTokens}
            </Badge>
          </div>

          {/* Token Table */}
          <Card className="shadow-soft">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/20">
                  <TableHead className="font-semibold text-foreground">{t.tokenId}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.table}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.waitTime}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.status}</TableHead>
                  <TableHead className="font-semibold text-foreground">{t.eta}</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTokens.map((token, index) => (
                  <TableRow 
                    key={token.id} 
                    className={`border-border hover:bg-accent/50 transition-colors ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    }`}
                  >
                    <TableCell className="font-bold text-primary">
                      #{token.id}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background">
                        Table {token.table}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{token.waitTime} min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={token.status} language={language} />
                    </TableCell>
                    <TableCell>
                      {token.status === "completed" || token.status === "noshow" ? (
                        <span className="text-muted-foreground">—</span>
                      ) : token.status === "serving" ? (
                        <Badge className="bg-success text-success-foreground">
                          {t.now}
                        </Badge>
                      ) : (
                        formatETA(token.eta)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            {t.edit}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Clock className="mr-2 h-4 w-4" />
                            {t.addDelay}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokensPage;