import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Header container with title and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            </div>
            {/* Action buttons container */}
            {actions && (
              <div className="flex justify-center sm:justify-end items-center shrink-0">
                {actions}
              </div>
            )}
          </div>
          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 text-center sm:text-left">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
