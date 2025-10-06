"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

interface ExpandableCardProps {
  title: string;
  description: string;
  image?: string;
  imagePlaceholder?: ReactNode;
  tags?: string[];
  actions?: ReactNode;
  imageHeight?: string;
  className?: string;
}

export default function ExpandableCard({
  title,
  description,
  image,
  imagePlaceholder,
  tags,
  actions,
  imageHeight = "h-48",
  className = "",
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on action buttons
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) {
      return;
    }
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Card */}
      <div
        className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${className}`}
        onClick={handleCardClick}
      >
        <div className={`${imageHeight} relative`}>
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {imagePlaceholder}
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {actions && <div onClick={(e) => e.stopPropagation()}>{actions}</div>}
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Expanded Image */}
            <div className="relative h-96">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-t-xl">
                  {imagePlaceholder}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                {description}
              </p>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {actions && <div onClick={(e) => e.stopPropagation()}>{actions}</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
