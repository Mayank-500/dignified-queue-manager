import { useState } from "react";
import { Search, Filter, MoreHorizontal, Edit, Trash2, Clock } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import StatusBadge, { type TokenStatus } from "./StatusBadge";
import TokenForm from "./TokenForm";

interface Token {
  id: string;
  table: number;
  waitTime: number;
  status: TokenStatus;
  createdAt: Date;
  eta: Date;
}

interface TokensPageProps {
  language: string;
}

const TokensPage = ({ language }: TokensPageProps) => {
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
      searchTokens: "Search tokens..."
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
      searchTokens: "टोकन खोजें..."
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
      <div className="w-96 border-r border-border bg-card/50 p-6">
        <TokenForm language={language} onAddToken={handleAddToken} />
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