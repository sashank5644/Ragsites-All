'use client';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  description?: string;
}

export default function ChartCard({ title, children, description }: ChartCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}
