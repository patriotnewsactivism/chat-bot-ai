import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  ctaText,
  isPopular = false
}) => {
  return (
    <Card className={`relative rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${isPopular ? 'border-primary border-2' : 'border-border'}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold text-primary">{price}<span className="text-base font-normal text-muted-foreground">/month</span></CardDescription>
      </CardHeader>
      <CardContent className="p-0 mb-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-primary mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-0">
        <Button className={`w-full ${isPopular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}>
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;