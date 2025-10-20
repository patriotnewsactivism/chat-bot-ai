import React from 'react';
import { Card } from "@/components/ui/card";

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-background to-primary/5 rounded-xl">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 text-primary-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Card>
  );
};

export default TemplateCard;