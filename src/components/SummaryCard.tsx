import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  subValue?: string;
  valueColor?: string;
  subValueColor?: string;
  highlight?: string;
  highlightColor?: string;
}

export default function SummaryCard({ 
  title, 
  value, 
  subValue, 
  valueColor = "text-gray-900", 
  subValueColor = "text-gray-400",
  highlight,
  highlightColor
}: SummaryCardProps) {
  
  const renderValue = () => {
    if (!highlight) return <span className={valueColor}>{value}</span>;
    
    const parts = value.split(highlight);
    return (
      <span className={valueColor}>
        {parts[0]}
        <span className={highlightColor}>{highlight}</span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 group hover:shadow-md transition-all">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">
          {renderValue()}
        </div>
        {subValue && (
          <div className={`text-xs px-2 py-0.5 rounded font-medium ${subValueColor}`}>
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}
