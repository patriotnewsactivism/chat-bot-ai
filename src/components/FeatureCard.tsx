import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient = false }) => {
  return (
    <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${gradient ? 'bg-gradient-to-br from-primary to-primary-glow' : 'bg-white border border-border'}`}>
      <div className="mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;