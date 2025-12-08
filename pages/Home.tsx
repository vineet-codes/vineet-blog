import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import Section from '../components/Section';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../types';
import { EXPERIENCE, EDUCATION, PUBLICATIONS, CERTIFICATIONS, SUMMARY } from '../constants';

interface HomeProps {
  posts: BlogPost[];
  loadingPosts: boolean;
}

const Home: React.FC<HomeProps> = ({ posts, loadingPosts }) => {
  const { mode, theme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('');
  const navigate = useNavigate();

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [posts]);

  return (
    <>
      <Sidebar activeSection={activeSection} />
      
      {/* RIGHT COLUMN */}
      <main className={`lg:ml-[35%] lg:w-[65%] ${mode.bg} relative z-0 min-h-screen transition-all duration-500`}>
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <Section id="about" className={`pt-16 lg:pt-32 px-6 md:px-16 border-b ${mode.border}`}>
             <div className={`prose prose-xl md:prose-2xl ${mode.prose} max-w-4xl`}>
               <p className={`${mode.textSub} font-light leading-relaxed indent-12`}>
                 <span className={`font-bold text-6xl float-left mr-4 mt-[-10px] font-mono ${theme.classes.text}`}>/</span>
                 {SUMMARY}
               </p>
             </div>
          </Section>

          <section id="writing" className={`border-b ${mode.border}`}>
            <div className="px-6 md:px-16 py-12 md:py-20">
              <div className={`flex items-end justify-between mb-12 border-b-4 ${mode.borderStrong} pb-4`}>
                <h2 className={`text-4xl md:text-6xl font-black ${mode.text} uppercase tracking-tight`}>Log</h2>
                <Link to="/index" className={`font-mono text-xs uppercase tracking-widest mb-2 hover:underline ${theme.classes.text}`}>Index [View All]</Link>
              </div>
              <div className="flex flex-col">
                {loadingPosts ? <div className={`h-20 ${mode.quoteBg} animate-pulse w-full`}></div> : posts.slice(0, 3).map((post) => (
                    <div key={post.slug} onClick={() => navigate(`/blog/${post.slug}`, { state: { from: 'home' } })} className={`group cursor-pointer border-b ${mode.border} transition-all duration-200 py-6 px-4 -mx-4 ${mode.cardHover} ${theme.classes.hoverBorder}`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline transition-transform duration-200 group-hover:translate-x-2">
                        <div className={`md:col-span-2 font-mono text-xs ${mode.textMuted} uppercase tracking-widest ${theme.classes.groupHoverTextLight}`}>{post.date}</div>
                        <div className="md:col-span-8">
                          <h3 className={`text-xl md:text-2xl font-bold ${mode.text} group-hover:text-current leading-tight truncate`}>{post.title}</h3>
                          <p className={`${mode.textMuted} text-sm mt-2 line-clamp-1 md:hidden ${theme.classes.groupHoverTextLighter}`}>{post.summary}</p>
                        </div>
                        <div className="hidden md:col-span-2 md:flex justify-end gap-2 flex-wrap">
                           {post.tags.slice(0,1).map(tag => (<span key={tag} className={`font-mono text-[10px] border ${mode.border} group-hover:border-current group-hover:text-current px-2 py-1 rounded-none uppercase ${mode.textMuted}`}>{tag}</span>))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <Section id="experience" title="Experience" className={`px-6 md:px-16 border-b ${mode.border}`}>
            <div className={`space-y-0 divide-y ${mode.border}`}>
              {EXPERIENCE.map((job, index) => (
                <div key={index} className="py-12 group first:pt-0">
                  <div className="flex flex-col md:flex-row md:justify-between mb-6">
                    <h3 className={`text-3xl font-bold ${mode.text} transition-colors ${theme.classes.groupHoverText}`}>{job.role}</h3>
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start mt-2 md:mt-0 gap-4 md:gap-1">
                      {job.logo && <img src={job.logo} alt={`${job.company} logo`} className={`h-8 md:h-12 w-auto object-contain ${mode.logoFilter} transition-all duration-300 mb-2`} />}
                      <div className="text-right">
                        <span className={`block text-lg font-medium ${mode.text}`}>{job.company}</span>
                        <span className={`block font-mono text-xs ${mode.textMuted} uppercase tracking-widest`}>{job.period}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-1 hidden md:block"><div className={`w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity ${theme.classes.bg}`}></div></div>
                    <div className="md:col-span-11"><ul className="space-y-3">{job.description.map((desc, i) => (<li key={i} className={`${mode.textSub} font-light leading-relaxed`}>{desc}</li>))}</ul></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div id="education" className={`p-6 md:p-16 border-b md:border-b-0 md:border-r ${mode.border}`}>
               <h2 className={`text-xs font-mono uppercase tracking-widest ${mode.textMuted} mb-12`}>Education</h2>
               <div className="space-y-12">
                {EDUCATION.map((edu, index) => (
                  <div key={index}>
                    <h3 className={`text-lg font-bold ${mode.text} leading-tight`}>{edu.institution}</h3>
                    <p className={`${mode.textMuted} font-light`}>{edu.degree}</p>
                  </div>
                ))}
                <div className={`pt-8 border-t ${mode.border}`}>
                  <h4 className={`text-sm font-bold ${mode.text} mb-4 uppercase tracking-wide`}>Certifications</h4>
                  <ul className="space-y-2">
                    {CERTIFICATIONS.map((cert, i) => (<li key={i} className={`text-sm ${mode.textSub} font-mono flex gap-2`}><span className={theme.classes.text}>+</span> {cert.name}</li>))}
                  </ul>
                </div>
               </div>
            </div>
            <div id="publications" className="p-6 md:p-16">
              <h2 className={`text-xs font-mono uppercase tracking-widest ${mode.textMuted} mb-12`}>Publications</h2>
              <ul className="space-y-8">
                {PUBLICATIONS.map((pub, index) => (
                  <li key={index} className="group">
                     <span className={`block font-mono text-xs mb-2 ${theme.classes.text}`}>REF_{String(index + 1).padStart(3, '0')}</span>
                     <p className={`${mode.textSub} transition-colors leading-relaxed font-medium ${theme.classes.groupHoverText}`}>{pub.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className={`p-12 border-t ${mode.border} ${mode.footerBg}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <p className={`text-xs font-mono ${mode.textMuted} uppercase`}>© {new Date().getFullYear()} Vineet Singh</p>
               <p className={`text-xs font-mono ${mode.textMuted} uppercase`}>Dublin, IE</p>
            </div>
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Home;

