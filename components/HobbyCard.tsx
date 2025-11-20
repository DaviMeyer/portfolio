import { Dumbbell, Mountain, Gamepad2, Music } from 'lucide-react';

const iconMap = {
  sport: Dumbbell,
  hiking: Mountain,
  gaming: Gamepad2,
  music: Music,
};

interface HobbyCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function HobbyCard({ title, description, icon }: HobbyCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
        {Icon && <Icon className="text-blue-600 dark:text-blue-400" size={24} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
