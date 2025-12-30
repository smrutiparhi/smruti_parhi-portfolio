
import React from 'react';
import Layout from './components/Layout';
import AIChatWidget from './components/AIChatWidget';
import Toast, { ToastProps } from './components/Toast';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATES, CURRENTLY_LEARNING, TESTIMONIALS } from './constants';

const SectionHeader: React.FC<{ title: string; subtitle?: string; id?: string }> = ({ title, subtitle, id }) => (
  <div id={id} className="mb-12 md:mb-24 pt-20 md:pt-32 no-print">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-px w-8 md:w-12 bg-indigo-500"></div>
      <span className="text-indigo-500 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">{title}</span>
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-white tracking-tighter leading-[1.1] md:leading-[0.95]">
      {subtitle || title}
    </h2>
  </div>
);

const App: React.FC = () => {
  const [formStatus, setFormStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [stats, setStats] = React.useState({ projects: 0, experience: 0, skills: 0 });
  const [toast, setToast] = React.useState<Omit<ToastProps, 'onClose'> | null>(null);

  const showToast = (message: string, type: ToastProps['type']) => {
    setToast({ message, type });
  };

  // Stats Counter Animation
  React.useEffect(() => {
    const animateValue = (key: keyof typeof stats, end: number, duration: number) => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setStats(prev => ({ ...prev, [key]: end }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    };

    const timer = setTimeout(() => {
      animateValue('projects', PROJECTS.length, 1500);
      animateValue('experience', 2, 1500); // Years of experience
      animateValue('skills', SKILLS.reduce((acc, s) => acc + s.items.length, 0), 1500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadResume = () => {
    // Create a link element to download the PDF
    const link = document.createElement('a');
    link.href = '/Smruti Ranjan Parhi_Resume (1).pdf';
    link.download = 'Smruti_Ranjan_Parhi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloaded successfully!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/smrutiparhi81@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message')
        })
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        showToast('Message sent successfully!', 'success');
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        showToast('Failed to send message. Please try again.', 'error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      showToast('Failed to send message. Please try again.', 'error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <Layout>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-32 overflow-hidden no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-cyan-600/10 blur-[100px] md:blur-[150px] rounded-full"></div>
        
        {/* Animated Graphics on Right Side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block pointer-events-none">
          {/* Rotating Ring 1 */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-indigo-500/20 rounded-full animate-[spin_20s_linear_infinite]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full"></div>
          </div>
          
          {/* Rotating Ring 2 - Reverse */}
          <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full"></div>
          </div>
          
          {/* Floating Hexagon */}
          <div className="absolute top-1/2 right-1/4 w-32 h-32 animate-[bounce_3s_ease-in-out_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 animate-[spin_25s_linear_infinite]">
              <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="none" stroke="url(#gradient1)" strokeWidth="2"/>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#818cf8', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Floating Cube Wireframe */}
          <div className="absolute bottom-1/4 right-1/5 w-40 h-40 animate-[float_4s_ease-in-out_infinite]" style={{animationDelay: '1s'}}>
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 animate-[spin_30s_linear_infinite]">
              <path d="M20,35 L50,20 L80,35 L80,65 L50,80 L20,65 Z M50,20 L50,50 M20,35 L50,50 M80,35 L50,50 M50,50 L50,80" 
                    stroke="#818cf8" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          
          {/* Small Orbiting Dots */}
          <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-purple-500 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-2/3 w-2 h-2 bg-cyan-400 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]" style={{animationDelay: '0.5s'}}></div>
          
          {/* Large Rotating Triangle */}
          <div className="absolute bottom-1/3 right-1/2 w-28 h-28 animate-[spin_40s_linear_infinite_reverse]">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-25">
              <polygon points="50,10 90,80 10,80" fill="none" stroke="#06b6d4" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6 md:mb-8">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-xs uppercase tracking-widest">Available for Hire</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black font-outfit text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-8 md:mb-10 uppercase">
              Digital<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-slate-400">Architect.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
              <p className="text-slate-400 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-black">Smruti Ranjan Parhi</span>, crafting <span className="text-white">intelligent systems</span> and <span className="text-white">human-centric</span> experiences through high-performance code.
              </p>
              <div className="flex items-center gap-4 pb-2">
                <a href="#resume" className="h-14 md:h-16 px-6 md:px-8 bg-white rounded-full flex items-center justify-center text-black font-black text-[10px] md:text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300">
                  Get CV
                </a>
                <a href="#projects" className="h-14 w-14 md:h-16 md:w-16 glass rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-500 group">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-slate-950/50 border-y border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-600 mb-2 md:mb-4">
                {stats.projects}+
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-600 mb-2 md:mb-4">
                {stats.experience}+
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-600 mb-2 md:mb-4">
                {stats.skills}+
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-12 md:py-24 bg-slate-950 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeader title="Portfolio" subtitle="Selected Works" />
          
          <div className="grid gap-16 sm:gap-24 md:gap-40">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-20 items-center group`}>
                <div className="w-full md:w-3/5 relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] aspect-video glass group/image cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10 flex items-end p-6">
                    <span className="text-white font-bold text-sm uppercase tracking-wider">View Project →</span>
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover/image:scale-110" 
                  />
                </div>
                <div className="w-full md:w-2/5 text-center md:text-left">
                  <span className="text-indigo-500 font-bold text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-4 block">{project.type}</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-outfit text-white mb-4 md:mb-6 tracking-tighter uppercase">{project.title}</h3>
                  <p className="text-slate-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8 md:mb-10 justify-center md:justify-start">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-900 text-slate-500 rounded text-[9px] md:text-[10px] font-bold border border-slate-800 uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 text-[10px] md:text-xs tracking-widest uppercase">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 glass hover:bg-slate-800 text-white font-bold rounded-lg transition-all duration-300 text-[10px] md:text-xs tracking-widest uppercase">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills - Bento Grid */}
      <section id="skills" className="py-20 md:py-32 bg-slate-900/30 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeader title="Ecosystem" subtitle="Technical Stack" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-2 glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">Engineering</h3>
                <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Specializing in Java and modern web architectures with a focus on performance.</p>
              </div>
              <div className="space-y-3">
                {SKILLS[0].items.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">{skill}</span>
                      <span className="text-xs font-bold text-indigo-400">{SKILLS[0].proficiency?.[i]}%</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${SKILLS[0].proficiency?.[i]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between sm:col-span-1 md:col-span-2 hover:border-cyan-500/50 transition-colors group">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">Computing</h3>
                <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Deep foundation in algorithms, database management and OS architectures.</p>
              </div>
              <div className="space-y-3">
                {SKILLS[1].items.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">{skill}</span>
                      <span className="text-xs font-bold text-cyan-400">{SKILLS[1].proficiency?.[i]}%</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${SKILLS[1].proficiency?.[i]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] md:col-span-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 hover:border-white/20 transition-colors">
               <div className="max-w-md text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">Visual & Interaction</h3>
                  <p className="text-slate-400 text-sm md:text-base">Bridging the gap between engineering and aesthetics using modern design tools.</p>
               </div>
               <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end">
                {[...SKILLS[2].items].map((s, i) => (
                   <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-black rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </div>
            
            {/* Currently Learning */}
            <div className="md:col-span-4 glass p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-indigo-500/30 hover:border-indigo-500/60 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Currently Learning</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {CURRENTLY_LEARNING.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                      <svg className="h-5 w-5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Resume Section */}
      <section id="resume" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeader title="Credentials" subtitle="Full Resume" id="resume-section" />
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl resume-container p-6 sm:p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-8 md:pb-12 mb-8 md:mb-12 gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-outfit text-white uppercase tracking-tighter">{PERSONAL_INFO.name}</h1>
                <p className="text-indigo-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mt-2">{PERSONAL_INFO.title}</p>
              </div>
              <div className="flex flex-wrap gap-4 no-print">
                <button 
                  onClick={handleDownloadResume}
                  className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-black rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 hover:bg-indigo-400 transition-colors uppercase text-[10px] md:text-xs tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
              <div className="lg:col-span-2 space-y-12 md:space-y-16">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-4">
                    Experience
                    <div className="h-px flex-1 bg-slate-800"></div>
                  </h3>
                  <div className="space-y-8 md:space-y-10">
                    {EXPERIENCE.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 md:pl-8 border-l border-indigo-500/30">
                        <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-indigo-500 rounded-full"></div>
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                           <h4 className="text-lg md:text-xl font-bold text-white">{exp.role}</h4>
                           <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-indigo-400 font-bold text-xs md:text-sm mb-4 uppercase">{exp.company}</p>
                        <ul className="space-y-2 md:space-y-3">
                          {exp.points.map((p, i) => (
                            <li key={i} className="text-slate-400 text-xs md:text-sm leading-relaxed">{p}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-4">
                    Education
                    <div className="h-px flex-1 bg-slate-800"></div>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                    {EDUCATION.map((edu, idx) => (
                      <div key={idx} className="p-5 md:p-6 bg-slate-950/50 rounded-xl md:rounded-2xl border border-slate-800">
                        <span className="text-[9px] md:text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-2 block">{edu.period}</span>
                        <h4 className="text-base md:text-lg font-bold text-white mb-1">{edu.degree}</h4>
                        <p className="text-slate-400 text-xs md:text-sm mb-2">{edu.institution}</p>
                        {edu.grade && <span className="text-[10px] md:text-xs font-black text-white px-2 py-1 bg-slate-900 rounded border border-slate-700">{edu.grade}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-4">
                    Expertise
                    <div className="h-px flex-1 bg-slate-800"></div>
                  </h3>
                  <div className="space-y-6 md:space-y-8">
                    {SKILLS.map((skill, idx) => (
                      <div key={idx}>
                        <h4 className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 md:mb-4">{skill.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map((item, i) => (
                            <span key={i} className="text-[10px] md:text-[11px] font-bold text-white px-2 py-1 md:px-3 md:py-1.5 bg-slate-950 border border-slate-800 rounded-lg">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-4">
                    Certification
                    <div className="h-px flex-1 bg-slate-800"></div>
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {CERTIFICATES.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-1 w-1 md:h-1.5 md:w-1.5 bg-indigo-500 rounded-full"></div>
                        <span className="text-slate-300 text-xs md:text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-slate-950 no-print">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <SectionHeader title="Feedback" subtitle="What People Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="glass p-8 rounded-[2rem] hover:border-indigo-500/50 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50 group-hover:border-indigo-500 transition-colors"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 md:py-40 bg-indigo-600 relative overflow-hidden no-print">
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black font-outfit text-white tracking-tighter mb-8 md:mb-12 uppercase leading-[1.1] text-center">
              Start The<br />Future.
            </h2>
            
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-white font-bold text-sm mb-2 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-bold text-sm mb-2 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-white font-bold text-sm mb-2 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-white font-bold text-sm mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-8 py-4 md:px-12 md:py-6 bg-white text-indigo-600 font-black text-lg md:text-xl rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {formStatus === 'sending' ? 'SENDING...' : formStatus === 'success' ? '✓ MESSAGE SENT!' : formStatus === 'error' ? '✗ ERROR - TRY AGAIN' : 'SEND MESSAGE'}
              </button>
              
              {formStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                  <p className="text-green-400 font-bold text-sm">Thanks! I'll get back to you soon.</p>
                </div>
              )}
            </form>
         </div>
      </section>

      <AIChatWidget />
    </Layout>
  );
};

export default App;
