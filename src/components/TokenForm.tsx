import { useState } from "react";
import { Plus, Clock5, Minus, Hash, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface TokenFormProps {
  language: string;
  onAddToken: (token: any) => void;
}

const TokenForm = ({ language, onAddToken }: TokenFormProps) => {
  const [tokenId, setTokenId] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [waitingTime, setWaitingTime] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const translations = {
    en: {
      addNewToken: "Add New Token",
      newTokenHi: "नया टोकन जोड़ें",
      tokenId: "Token ID",
      tokenIdPlaceholder: "e.g., A001, B052",
      tokenIdHi: "टोकन आईडी",
      tableNumber: "Table Number",
      tableNumberHi: "टेबल नंबर", 
      selectTable: "Select table number",
      estimatedWaitTime: "Estimated Waiting Time",
      waitTimeHi: "अनुमानित प्रतीक्षा समय",
      minutes: "minutes",
      minutesHi: "मिनट",
      addToken: "Add Token",
      addTokenHi: "टोकन जोड़ें",
      addDelay: "+5 min",
      quickActions: "Quick Actions",
      quickActionsHi: "त्वरित कार्य",
      tokenAdded: "✅ Token added successfully. Thank you for your patience.",
      delayAdded: "⏳ Delay added: +5 min. Users have been notified.",
      enterTokenId: "⚠️ Please enter a unique Token ID.",
      selectTableNum: "⚠️ Please select a table number."
    },
    hi: {
      addNewToken: "नया टोकन जोड़ें",
      newTokenHi: "Add New Token",
      tokenId: "टोकन आईडी",
      tokenIdPlaceholder: "जैसे, A001, B052",
      tokenIdHi: "Token ID",
      tableNumber: "टेबल नंबर",
      tableNumberHi: "Table Number",
      selectTable: "टेबल नंबर चुनें",
      estimatedWaitTime: "अनुमानित प्रतीक्षा समय",
      waitTimeHi: "Estimated Waiting Time",
      minutes: "मिनट",
      minutesHi: "minutes",
      addToken: "टोकन जोड़ें",
      addTokenHi: "Add Token",
      addDelay: "+५ मिनट",
      quickActions: "त्वरित कार्य",
      quickActionsHi: "Quick Actions",
      tokenAdded: "✅ टोकन सफलतापूर्वक जोड़ा गया। आपके धैर्य के लिए धन्यवाद।",
      delayAdded: "⏳ देरी जोड़ी गई: +५ मिनट। उपयोगकर्ताओं को सूचित किया गया है।",
      enterTokenId: "⚠️ कृपया एक अनूठी टोकन आईडी दर्ज करें।",
      selectTableNum: "⚠️ कृपया एक टेबल नंबर चुनें।"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tokenId.trim()) {
      toast({
        description: t.enterTokenId,
        variant: "destructive",
      });
      return;
    }

    if (!tableNumber) {
      toast({
        description: t.selectTableNum,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newToken = {
        id: tokenId.toUpperCase(),
        table: parseInt(tableNumber),
        waitTime: waitingTime,
        status: "waiting" as const,
        createdAt: new Date(),
        eta: new Date(Date.now() + waitingTime * 60000)
      };

      onAddToken(newToken);

      toast({
        description: t.tokenAdded,
      });

      // Reset form
      setTokenId("");
      setTableNumber("");
      setWaitingTime(15);
    } catch (error) {
      toast({
        description: "⚠️ Failed to add token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDelay = () => {
    toast({
      description: t.delayAdded,
      action: (
        <Button variant="ghost" size="sm">
          Undo
        </Button>
      ),
    });
  };

  const adjustWaitTime = (delta: number) => {
    setWaitingTime(Math.max(0, waitingTime + delta));
  };

  return (
    <Card className="shadow-medium border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="w-5 h-5 text-primary" />
          <div className="flex flex-col">
            <span>{t.addNewToken}</span>
            {language === "en" && (
              <span className="text-sm text-muted-foreground font-normal">{t.newTokenHi}</span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Token ID */}
          <div className="space-y-2">
            <Label htmlFor="tokenId" className="text-sm font-medium flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{t.tokenId}</span>
                {language === "en" && (
                  <span className="text-xs text-muted-foreground font-normal">{t.tokenIdHi}</span>
                )}
              </div>
            </Label>
            <Input
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder={t.tokenIdPlaceholder}
              className="text-lg h-12 bg-background"
              maxLength={10}
            />
          </div>

          {/* Table Number */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{t.tableNumber}</span>
                {language === "en" && (
                  <span className="text-xs text-muted-foreground font-normal">{t.tableNumberHi}</span>
                )}
              </div>
            </Label>
            <Select value={tableNumber} onValueChange={setTableNumber}>
              <SelectTrigger className="h-12 bg-background text-lg">
                <SelectValue placeholder={t.selectTable} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    Table {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Waiting Time */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock5 className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{t.estimatedWaitTime}</span>
                {language === "en" && (
                  <span className="text-xs text-muted-foreground font-normal">{t.waitTimeHi}</span>
                )}
              </div>
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustWaitTime(-5)}
                className="h-12 px-4"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-primary">{waitingTime}</div>
                <div className="text-xs text-muted-foreground">
                  {t.minutes} / {language === "en" ? t.minutesHi : t.minutesHi}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => adjustWaitTime(5)}
                className="h-12 px-4"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium bg-primary hover:opacity-90 transition-all duration-200"
            disabled={isSubmitting}
          >
            <Plus className="w-5 h-5 mr-2" />
            <div className="flex flex-col items-start leading-tight">
              <span>{t.addToken}</span>
              {language === "en" && (
                <span className="text-xs opacity-80">{t.addTokenHi}</span>
              )}
            </div>
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <Label className="text-sm font-medium mb-3 flex items-center gap-2">
            <div className="flex flex-col">
              <span>{t.quickActions}</span>
              {language === "en" && (
                <span className="text-xs text-muted-foreground font-normal">{t.quickActionsHi}</span>
              )}
            </div>
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1 h-10 bg-teal/10 text-teal hover:bg-teal/20"
              onClick={handleQuickDelay}
            >
              <Clock5 className="w-4 h-4 mr-2" />
              {t.addDelay}
            </Button>
            <Button
              type="button"
              variant="secondary" 
              className="flex-1 h-10 bg-warning/10 text-warning-foreground hover:bg-warning/20"
              onClick={() => handleQuickDelay()}
            >
              <Clock5 className="w-4 h-4 mr-2" />
              +10 min
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenForm;