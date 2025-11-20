import { Monitor, Database, Terminal } from 'lucide-react';

const iconMap = {
  monitor: Monitor,
  database: Database,
  terminal: Terminal,
};

interface SkillsCardProps {
  category: string;
  icon: string;
  items: string[];
}

export default function SkillsCard({ category, icon, items }: SkillsCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
          {Icon && <Icon className="text-blue-600 dark:text-blue-400" size={32} />}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          {category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
