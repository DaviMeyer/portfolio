import { Github, Linkedin } from 'lucide-react';
import { socialLinks } from "@/lib/data";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
};

export default function SocialLinks() {
  return (
    <div className="flex space-x-4 pt-4">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={link.name}
          >
            {Icon && <Icon size={28} />}
          </a>
        );
      })}
    </div>
  );
}
