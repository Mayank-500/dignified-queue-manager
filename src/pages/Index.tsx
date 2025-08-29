import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const Index = () => {
  const [language, setLanguage] = useState("en");

  return <AdminLayout language={language} setLanguage={setLanguage} />;
};

export default Index;
