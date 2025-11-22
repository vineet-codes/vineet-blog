import React from 'react';

interface SectionProps {
  title?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, id, className = "", children }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Title (Sticky on desktop) */}
        <div className="md:col-span-4 lg:col-span-3">
          {title && (
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 sticky top-24">
              {title}
            </h2>
          )}
        </div>
        
        {/* Right Column: Content */}
        <div className="md:col-span-8 lg:col-span-9">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;