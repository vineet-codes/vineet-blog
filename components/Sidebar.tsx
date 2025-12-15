import React, { useRef, useState } from 'react';
import { CONTACT, PROFILE_IMAGE } from '../constants';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const { theme, mode } = useTheme();
  
  // Mouse tracking for image effect
  const [mousePos, setMousePos] = useState({ x: 128, y: 160 });
  const [isHovering, setIsHovering] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'writing', label: 'Writing' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'publications', label: 'Publications' },
  ];

  // Render Image with Swiss Parallax Effect
  const renderProfileImage = () => {
    const centerX = 128; // Approximate visual center
    const centerY = 160; 
    
    // Movement deltas
    const moveX = mousePos.x - centerX;
    const moveY = mousePos.y - centerY;

    return (
      <div className="absolute top-0 left-0 w-64 h-80 hidden lg:block pointer-events-none z-10">
        
        {/* LAYER 1: THEME COLOR BLOCK (Shadow/Parallax) */}
        <div 
           className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
           style={{ 
             transform: `translate(${moveX * 1.2}px, ${moveY * 1.2}px)`,
             backgroundColor: theme.hex
           }}
        />

        {/* LAYER 2: MAIN IMAGE */}
        <div 
           className="absolute inset-0 w-full h-full transition-transform duration-150 ease-out"
           style={{ transform: `translate(${moveX}px, ${moveY}px)` }}
        >
          <div className={`w-full h-full ${mode.bg}`}>
             <img 
               src={PROFILE_IMAGE} 
               className={`w-full h-full object-cover transition-all duration-500
                 ${isHovering 
                    ? 'grayscale-0 contrast-125 brightness-110' 
                    : 'grayscale contrast-100 brightness-100'
                  }
               `}
               alt=""
             />
          </div>
        </div>
      </div>
    );
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={headerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`animate-[fadeIn_0.25s_ease-out] lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[35%] lg:border-r ${mode.border} z-40 ${mode.bg} lg:bg-transparent relative overflow-hidden flex flex-col justify-between group transition-colors duration-500`}
    >
      {/* Dynamic Profile Image */}
      {renderProfileImage()}

      <div className="p-8 lg:p-12 xl:p-16 relative z-20 flex-1 flex flex-col justify-center lg:justify-start pointer-events-none">
        <div className="mb-12 lg:mb-24 relative pointer-events-auto">
          {/* Massive Typography */}
          <h1 className={`text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] font-black tracking-tighter uppercase select-none flex flex-col items-start cursor-default ${mode.text}`}>
            <span>Vineet</span>
            <span>Singh</span>
          </h1>
          {/* Devanagari name - subtle hover reveal */}
          <span 
            className={`font-devanagari text-lg md:text-xl font-light tracking-wide mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${mode.textMuted}`}
          >
            विनीत सिंह
          </span>
          <div className={`mt-8 border-t-4 pt-6 inline-block ${theme.classes.border}`}>
            <p className={`text-xl md:text-2xl font-mono tracking-widest uppercase ${theme.classes.text}`}>
              Product Builder
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block mb-auto relative z-20 pointer-events-auto">
          <ul className="space-y-2 font-mono text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block py-2 border-b border-transparent hover:pl-4 transition-all duration-300 ${theme.classes.hoverBorder} ${
                    activeSection === link.id ? theme.classes.activeNav : `${mode.textMuted} hover:${mode.text}`
                  }`}
                >
                  {String(navLinks.indexOf(link) + 1).padStart(2, '0')} // {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile/Tablet Profile Image Fallback */}
        <div className="lg:hidden mb-8 pointer-events-auto">
          <img src={PROFILE_IMAGE} className="w-full h-96 object-cover contrast-125" alt="Vineet Singh" />
        </div>

        <div className={`text-xs font-mono uppercase tracking-widest ${mode.textMuted} flex flex-col gap-2 relative z-20 pointer-events-auto`}>
          {/* <a href={`mailto:${CONTACT.email}`} className={`transition-colors ${theme.classes.hoverText}`}>
            MAIL: {CONTACT.email}
          </a> */}
          <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer" className={`transition-colors ${theme.classes.hoverText}`}>
            LINKEDIN
          </a>
          <span>LOC: {CONTACT.location}</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

