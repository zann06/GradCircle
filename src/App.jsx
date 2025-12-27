import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import FaridImg from './assets/member/farid.png';


import Photo1 from './assets/archive/a1.png';
import Photo2 from './assets/archive/a2.png';
import Photo3 from './assets/archive/a3.png';
import Photo4 from './assets/archive/a4.png';
import { 
  Gamepad2, 
  ChevronDown, 
  Monitor, 
  Terminal, 
  Code2,
  FileCode,
  Search,
  Settings,
  GraduationCap,
  Coffee,
  Plane,
  History,
  User,
  Play,
  Sparkles,
  Zap,
  ShieldCheck,
  FolderOpen,
  Camera,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileJson,
  Cpu,
  Command,
  ChevronRightSquare,
  FileText,
  Activity,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Lock,
  Unlock,
  ShieldAlert,
  UserCircle,
  Clock,
  Database,
  Cpu as CpuIcon
} from 'lucide-react';

// --- Gaya Global ---
const styles = `
  html { scroll-behavior: smooth; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
  .code-font { font-family: 'Fira Code', 'JetBrains Mono', monospace; }
  body { background-color: #050505; color: white; overflow-x: hidden; }
  .text-glow { text-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
  
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .scanline {
    width: 100%;
    height: 100px;
    z-index: 10;
    background: linear-gradient(0deg, transparent 0%, rgba(34, 211, 238, 0.05) 50%, transparent 100%);
    opacity: 0.1;
    position: absolute;
    animation: scanline 8s linear infinite;
    pointer-events: none;
  }
`;

/**
 * Komponen Jam Realtime untuk Sidebar/Navbar
 */
const SystemClock = ({ showLabel = true, className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`font-mono text-[10px] tracking-widest text-cyan-500 bg-cyan-500/5 border border-cyan-500/20 px-3 py-1.5 rounded-md flex items-center gap-2 shadow-[0_0_10px_rgba(6,182,212,0.1)] ${className}`}>
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
      {showLabel && <span className="opacity-50 text-zinc-500">SYS_TIME:</span>}
      {time.toLocaleTimeString('en-GB')}
    </div>
  );
};

/**
 * FEATURE: Security Lock System
 */
const SecurityLock = ({ members }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('IDLE'); 
  const [activeProfile, setActiveProfile] = useState(null);
  const [logs, setLogs] = useState(['SYSTEM_READY', 'AWAITING_CREDENTIALS...']);

  const addLog = (msg) => setLogs(prev => [...prev.slice(-3), `> ${msg}`]);

  const handleValidation = (e) => {
    e.preventDefault();
    if (!input) return;

    setStatus('SCANNING');
    addLog(`DECRYPTING_REQUEST: ${input.toUpperCase()}...`);

    setTimeout(() => {
      const match = members.find(m => m.name.toLowerCase() === input.trim().toLowerCase());

      if (match) {
        setStatus('GRANTED');
        setActiveProfile(match);
        addLog(`ACCESS_GRANTED: ID_MATCHED`);
      } else {
        setStatus('DENIED');
        addLog(`ERR: IDENTITY_NOT_FOUND`);
        setTimeout(() => {
          setStatus('IDLE');
          setInput('');
        }, 2000);
      }
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col">
      {status !== 'GRANTED' ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-4">
          <motion.div 
            animate={status === 'DENIED' ? { x: [-10, 10, -10, 10, 0] } : {}}
            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center ${status === 'DENIED' ? 'border-red-500 bg-red-500/10' : 'border-zinc-800 bg-zinc-900/50'}`}
          >
            {status === 'DENIED' ? <ShieldAlert className="text-red-500" size={32} /> : <Lock className="text-zinc-600" size={32} />}
          </motion.div>
          
          <div className="text-center">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-white mb-2">Member Authentication</h3>
            <form onSubmit={handleValidation} className="space-y-4">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="INPUT_MEMBER_NAME"
                className={`bg-black border ${status === 'DENIED' ? 'border-red-900 text-red-500' : 'border-zinc-800 text-emerald-500'} rounded-lg px-4 py-3 text-center focus:outline-none focus:border-emerald-500 transition-all uppercase tracking-widest text-[10px] w-64`}
              />
              <button type="submit" className="hidden">Execute</button>
            </form>
          </div>

          <div className="w-full max-w-xs bg-black/50 border border-zinc-900 rounded p-3 font-mono text-[9px]">
            {logs.map((log, i) => (
              <div key={i} className={`mb-1 ${log.includes('GRANTED') ? 'text-emerald-500' : log.includes('ERR') ? 'text-red-500' : 'text-zinc-600'}`}>{log}</div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
              <UserCircle size={60} className="text-emerald-500/40" />
            </div>
            <div>
              <div className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-1">Decrypted_Profile</div>
              <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">{activeProfile.name}</h4>
              <div className="text-zinc-500 text-xs font-mono">{activeProfile.role}</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass p-4 rounded-xl border-l-2 border-emerald-500">
               <div className="text-[9px] text-zinc-500 uppercase mb-2 flex items-center gap-2"><Cpu size={12}/> Profile_Summary</div>
               <p className="text-sm text-zinc-300 italic leading-relaxed">"{activeProfile.quote}"</p>
            </div>
            <button 
              onClick={() => { setStatus('IDLE'); setInput(''); setActiveProfile(null); }}
              className="text-[9px] text-zinc-600 hover:text-white flex items-center gap-2 uppercase font-bold tracking-widest mt-4"
            >
              <Command size={10} /> Logout_Session
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center">
      <div className="text-xl font-black tracking-tighter text-white uppercase flex items-baseline">
        GRAD<span className="text-cyan-400">CIRCLE</span>
        <span className="text-gray-600 font-mono font-medium text-[9px] ml-1.5 opacity-70">v4.0.8</span>
      </div>
    </div>
    <div className="hidden md:flex items-center space-x-10">
      <div className="flex space-x-10 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
        {['About', 'Members', 'Experience', 'Journey'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-all duration-300 relative group">
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
          </a>
        ))}
      </div>
      <SystemClock />
    </div>
  </nav>
);

const MemberCard = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="relative group shrink-0 w-[280px] md:w-[320px] snap-center"
  >
    <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden h-[440px] transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="h-10 bg-[#161b22] px-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-2">
          <FileJson size={14} className="text-yellow-500" />
          <span className="text-[10px] font-mono text-gray-400 lowercase">{member.name}.json</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-red-500/40 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-yellow-500/40 transition-colors" />
          <div className="w-2 h-2 rounded-full bg-white/5 group-hover:bg-green-500/40 transition-colors" />
        </div>
      </div>

      <div className="p-6 font-mono text-[11px] leading-relaxed relative h-full">
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10" />
          <img 
            src={member.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
            alt={member.name}
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
          />
          <div className="absolute bottom-10 left-6 z-20">
             <div className="text-cyan-400 text-[9px] mb-1 uppercase tracking-[0.3em] font-black opacity-80 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
               Entity_Initialized
             </div>
             <div className="text-white text-2xl font-black uppercase tracking-tighter">{member.name}</div>
          </div>
        </div>

        <div className="space-y-1.5 text-gray-400">
          <p>{"{"}</p>
          <p className="pl-4">"<span className="text-cyan-400">id</span>": <span className="text-yellow-400">"0x{index + 1}"</span>,</p>
          <p className="pl-4">"<span className="text-cyan-400">name</span>": <span className="text-green-400">"{member.name}"</span>,</p>
          <p className="pl-4">"<span className="text-cyan-400">role</span>": <span className="text-green-400">"{member.role}"</span>,</p>
          <p className="pl-4">"<span className="text-cyan-400">traits</span>": [</p>
          <p className="pl-8">"<span className="text-purple-400">loyal</span>",</p>
          <p className="pl-8">"<span className="text-purple-400">innovative</span>"</p>
          <p className="pl-4">],</p>
          <p className="pl-4">"<span className="text-cyan-400">motto</span>": <span className="text-gray-500 italic">"{member.quote}"</span></p>
          <p>{"}"}</p>
        </div>
        
        <div className="mt-12 w-full h-32 rounded-lg border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center group-hover:opacity-0 transition-opacity">
           <Cpu size={24} className="text-white/10 mb-2" />
           <div className="text-[8px] text-gray-700 uppercase tracking-[0.4em]">Node_Identity_V{index+1}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [activeMode, setActiveMode] = useState('study');
  const [aboutState, setAboutState] = useState('idle');
  const [activeFile, setActiveFile] = useState('grad_cli.sh');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState([]);
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);
  const smoothY = useSpring(yRange, { stiffness: 100, damping: 30 });

  const scrollMembers = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setExecutionLogs([]);
    setAboutState('idle');

    const logs = [
      "Initializing Grad Circle Vision Protocol...",
      "Syncing with Lampung nodes...",
      "Loading Manifesto.json...",
      "Status: SOLIDARITY_LEVEL at 100%",
      "Sequence execution successful."
    ];

    for (let log of logs) {
      await new Promise(r => setTimeout(r, 600));
      setExecutionLogs(prev => [...prev, log]);
    }

    await new Promise(r => setTimeout(r, 400));
    setIsExecuting(false);
    setAboutState('showing_output');
  };

  const members = [
    { name: "Farid", role: "Bismillah Front-End Developer", quote: "Nasgor goreng nomor 1", img: FaridImg},
    { name: "Ridho", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Adit", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
    { name: "Hafidz", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
    { name: "Richard", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" },
    { name: "Syahrul", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop" },
    { name: "Syahid", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop" },
    { name: "Syehab", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop" },
    { name: "Aryo", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop" },
    { name: "Fayas", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?w=400&h=400&fit=crop" },
    { name: "Faiz", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop" },
    { name: "Asep", role: "Role", quote: "Quote", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&fit=crop" },
  ];

  const archivePhotos = {
    study: [
      { url: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D", caption: "Sesi Coding Malam" },
      { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80", caption: "Brainstorming Kelompok" },
      { url: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=800&q=80", caption: "Workspace GradCircle" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", caption: "Review Kurikulum" },
      
    ],
    play: [
      { url: Photo1, caption: "Pantai Lampung – Healing" },
      { url: Photo2, caption: "Momen Makan Bersama" },
      { url: Photo3, caption: "Gaming Night Out" },
      { url: Photo4, caption: "Trip Mangrove Weekend" },
    ]
  };

  const journeySteps = [
    { id: '01', year: "Year 1", title: "init_project", desc: "Pertemuan pertama di kelas TPB. 12 baris kode mentah mulai dikompilasi." },
    { id: '02', year: "Year 2", title: "npm_install_bond", desc: "Dependencies solidaritas terinstal. Rutinitas bermain dan belajar menjadi core memory." },
    { id: '03', year: "Year 3", title: "production_grind", desc: "Fase optimasi akademik. Magang, riset, dan bug-bug kehidupan mulai kami selesaikan." },
    { id: '04', year: "Year 4", title: "final_deploy", desc: "Tahap deployment akhir. Wisuda bareng adalah goal utama dari arsitektur THE GRAD CIRCLE." },
  ];

  const experienceContent = {
    study: [
        { icon: <Monitor size={24}/>, title: "Lab Environment", desc: "Eksperimen kode dan kolaborasi di lingkungan virtual." },
        { icon: <Terminal size={24}/>, title: "Shell Productivity", desc: "Otomatisasi tugas-tugas akademik menggunakan skrip kustom." },
        { icon: <GraduationCap size={24}/>, title: "Academic Goal", desc: "Fokus utama: Memastikan semua node melakukan deployment kelulusan." }
    ],
    play: [
        { icon: <Gamepad2 size={24}/>, title: "Gaming.sys", desc: "Mabar Mobile Legends dan game seru lainnya bersama tim." },
        { icon: <Coffee size={24}/>, title: "Brain Dump", desc: "Nongkrong santai untuk membuang beban stres akademik." },
        { icon: <Plane size={24}/>, title: "Remote Work", desc: "Eksplorasi tempat baru agar inspirasi tetap terjaga." }
    ]
  };

  const files = [
    { name: 'grad_cli.sh', icon: Terminal, color: 'text-cyan-400' },
    { name: 'security.lock', icon: ShieldCheck, color: 'text-yellow-500' },
    { name: 'manifesto.json', icon: FileJson, color: 'text-yellow-500' },
    { name: 'mission.log', icon: FileText, color: 'text-purple-500' },
    { name: 'identity.sys', icon: Activity, color: 'text-green-500' },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <style>{styles}</style>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <motion.section 
        style={{ y: smoothY, opacity: opacityRange, scale: scaleRange }}
        className="relative h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <div className="scanline" />
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center space-x-2 px-5 py-2 glass rounded-full mb-8">
            <Code2 size={12} className="text-cyan-400" />
            <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-cyan-400">System.Initialize(12_Nodes)</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase mb-8 relative text-glow">
            <motion.span initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="block">THE GRAD</motion.span>
            <motion.span initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-600">CIRCLE</motion.span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-gray-500 font-mono text-[10px] md:text-xs tracking-[0.25em] max-w-2xl mx-auto leading-relaxed uppercase">
            Membangun masa depan melalui baris kode dan solidaritas tanpa batas. 
            <br className="hidden md:block"/> // Kelulusan adalah fungsi utama yang sedang kami jalankan.
          </motion.p>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5 }} 
          className="absolute bottom-10 flex flex-col items-center opacity-30 z-20"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.section>

      {/* --- BAGIAN ABOUT --- */}
      <section id="about" className="py-32 px-6 relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <SectionHeading title="About.config" subtitle="Core_Architecture" />
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end mr-4">
                <span className="text-[8px] font-mono text-gray-700 tracking-[0.2em] uppercase mb-1">Local_Node_Clock</span>
                <SystemClock showLabel={false} className="bg-transparent border-white/5 shadow-none p-0 px-1 text-white/40" />
              </div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden lg:block">
                Host_Status: <span className="text-green-500">Online</span> | Secure_Connection: <span className="text-cyan-500">Established</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative bg-[#1a1c1e] p-1.5 md:p-3 rounded-[2rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-t-[1.8rem]" />
            
            <div className="flex bg-[#0d1117] rounded-[1.4rem] overflow-hidden min-h-[650px] border border-black shadow-inner">
              
              <div className="hidden md:flex flex-col w-64 bg-[#0d1117] border-r border-white/5 pt-6">
                <div className="px-6 mb-8 flex items-center justify-between opacity-40">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Explorer</span>
                  <Settings size={14} />
                </div>

                <div className="px-6 mb-8">
                  <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                    <div className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
                       <Clock size={10} /> Up_Time: 99.9%
                    </div>
                    <SystemClock showLabel={false} className="w-full justify-center bg-cyan-500/5 py-3 border-cyan-500/10" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="px-6 py-2 flex items-center gap-3 text-cyan-400/80 bg-white/5 border-l-2 border-cyan-500">
                    <FolderOpen size={14} />
                    <span className="text-[11px] font-mono">grad_circle/</span>
                  </div>
                  {files.map((file) => (
                    <div 
                      key={file.name}
                      onClick={() => !isExecuting && setActiveFile(file.name)}
                      className={`pl-12 py-2.5 flex items-center gap-3 transition-all cursor-pointer border-r-2 ${activeFile === file.name ? 'bg-white/[0.04] text-white border-cyan-500' : 'text-gray-500 hover:text-gray-300 border-transparent'} ${isExecuting ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      <file.icon size={14} className={file.color} />
                      <span className="text-[11px] font-mono">{file.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                   <div className="flex items-center gap-3 opacity-30 group cursor-default">
                      <Database size={14} />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase tracking-widest">Memory_Pool</span>
                        <div className="w-24 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                          <motion.div animate={{ width: ['20%', '80%', '20%'] }} transition={{ duration: 10, repeat: Infinity }} className="h-full bg-cyan-500" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col relative overflow-hidden">
                <div className="h-12 bg-[#161b22] border-b border-black flex items-center px-4 overflow-x-auto no-scrollbar">
                  {files.map((file) => (
                    <div 
                      key={file.name}
                      onClick={() => !isExecuting && setActiveFile(file.name)}
                      className={`flex items-center gap-2 h-full px-4 border-r border-black shrink-0 cursor-pointer transition-colors ${activeFile === file.name ? 'bg-[#0d1117] text-white' : 'bg-transparent text-gray-600 hover:bg-white/[0.02]'} ${isExecuting ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      <file.icon size={12} className={file.color} />
                      <span className="text-[10px] font-mono lowercase">{file.name}</span>
                    </div>
                  ))}
                </div>

                <div className="p-8 font-mono text-[13px] leading-relaxed relative flex-1 overflow-y-auto no-scrollbar">
                  <AnimatePresence mode="wait">
                    {activeFile === 'grad_cli.sh' && (
                      <motion.div 
                        key="cli"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-3 mb-6 text-gray-600">
                           <Command size={14} />
                           <span>System Terminal — Status: {isExecuting ? 'Executing...' : 'Active'}</span>
                        </div>
                        
                        {!isExecuting && aboutState === 'idle' && (
                          <div>
                            <span className="text-cyan-500">guest@gradcircle</span>
                            <span className="mx-2 text-white/40">:</span>
                            <span className="text-purple-400">~</span>
                            <span className="ml-2 text-white/50">$</span>
                            <span className="ml-3 text-white font-bold">sh execute_vision.sh</span>
                            <div className="mt-8">
                               <button 
                                 onClick={handleExecute}
                                 className="px-6 py-2 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                               >
                                 <Play size={14} /> Run Script
                               </button>
                            </div>
                          </div>
                        )}

                        {(isExecuting || executionLogs.length > 0) && (
                          <div className="space-y-2">
                             {executionLogs.map((log, i) => (
                               <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex items-center gap-3 text-[11px]">
                                 <CheckCircle2 size={12} className="text-green-500" />
                                 <span className="text-gray-400">{log}</span>
                               </motion.div>
                             ))}
                             {isExecuting && (
                               <div className="flex items-center gap-3 text-cyan-400 animate-pulse text-[11px]">
                                 <Loader2 size={12} className="animate-spin" />
                                 <span>Processing...</span>
                               </div>
                             )}
                          </div>
                        )}

                        {aboutState === 'showing_output' && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-8 space-y-12"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="glass p-8 rounded-3xl border border-cyan-500/20 relative group hover:border-cyan-500/50 transition-all">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                  <Monitor size={80} />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                    <Sparkles size={16} />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Primary_Mission</span>
                                </div>
                                <h3 className="text-2xl font-black text-white leading-tight mb-4 italic">"Membangun ekosistem yang berkelanjutan melalui <span className="text-cyan-400">kolaborasi cerdas</span>"</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                  Arsitektur sosial kami berfokus pada integrasi skill individu untuk menciptakan hasil kolektif yang berdampak besar.
                                </p>
                              </div>

                              <div className="glass p-8 rounded-3xl border border-purple-500/20 relative group hover:border-purple-500/50 transition-all">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                                  <History size={80} />
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    <ShieldCheck size={16} />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">The_Main_Rule</span>
                                </div>
                                <h3 className="text-2xl font-black text-white leading-tight mb-4 italic">"Saling suport satu sama lain, lulus <span className="text-purple-400">tepat waktu</span>"</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                  Tidak ada satu node pun yang ditinggalkan. Sinkronisasi akademik adalah prioritas tertinggi.
                                </p>
                              </div>
                            </div>
                            <button onClick={() => {setAboutState('idle'); setExecutionLogs([]);}} className="text-[10px] text-gray-600 hover:text-white underline">Reset Terminal</button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
    
                    {activeFile === 'security.lock' && (
                      <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                        <SecurityLock members={members} />
                      </motion.div>
                    )}

                    {activeFile === 'manifesto.json' && (
                      <motion.div 
                        key="manifesto"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 text-gray-400"
                      >
                        <p>{"{"}</p>
                        <p className="pl-4">"<span className="text-cyan-400">group_name</span>": <span className="text-green-400">"The Grad Circle"</span>,</p>
                        <p className="pl-4">"<span className="text-cyan-400">version</span>": <span className="text-yellow-400">"4.0.0"</span>,</p>
                        <p className="pl-4">"<span className="text-cyan-400">philosophy</span>": <span className="text-green-400">"Code together, Graduate together"</span>,</p>
                        <p className="pl-4">"<span className="text-cyan-400">core_values</span>": [</p>
                        <p className="pl-8">"Loyalty",</p>
                        <p className="pl-8">"Creativity",</p>
                        <p className="pl-8">"Resilience"</p>
                        <p className="pl-4">],</p>
                        <p className="pl-4">"<span className="text-cyan-400">established</span>": <span className="text-yellow-400">2024</span></p>
                        <p>{"}"}</p>
                      </motion.div>
                    )}

                    {activeFile === 'mission.log' && (
                       <motion.div 
                        key="mission"
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="space-y-6"
                       >
                         {[
                           { t: '2024-09', msg: 'System Bootstrapping: 12 nodes discovered and connected.' },
                           { t: '2025-12', msg: 'Heavy Stress Testing: Academic pressure managed via collaborative debugging.' },
                           { t: '2026-06', msg: 'Module Expansion: New project repositories established.' },
                           { t: '2027-Q4', msg: 'Deployment Target: Final Graduation Sequence initialized.' }
                         ].map((entry, idx) => (
                           <div key={idx} className="flex gap-6 group">
                              <span className="text-cyan-500 font-bold shrink-0">{entry.t}</span>
                              <span className="text-gray-400 group-hover:text-white transition-colors">{entry.msg}</span>
                           </div>
                         ))}
                       </motion.div>
                    )}

                    {activeFile === 'identity.sys' && (
                      <motion.div 
                        key="identity"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12"
                      >
                        <div className="relative w-48 h-48 mb-8">
                           <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-500/20" 
                           />
                           <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                              <CpuIcon size={48} className="text-cyan-400 animate-pulse" />
                           </div>
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Node_Collective_V4</h4>
                        <p className="text-gray-500 text-xs text-center max-w-sm">Status: High Efficiency. All members synchronized.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-8 bg-[#007acc] flex items-center justify-between px-4 text-white text-[9px] font-bold">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <ChevronRightSquare size={10} />
                      <span>main*</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>UTF-8</span>
                    <span>{activeFile.split('.').pop()?.toUpperCase() || 'PLAINTEXT'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- BAGIAN MEMBERS --- */}
      <section id="members" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <SectionHeading title="Entities" subtitle="Global_Variables" />
           <div className="flex space-x-3">
              <button onClick={() => scrollMembers('left')} className="p-3 glass rounded-xl text-gray-400 hover:text-cyan-400 transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={() => scrollMembers('right')} className="p-3 glass rounded-xl text-gray-400 hover:text-cyan-400 transition-colors"><ChevronRight size={20}/></button>
           </div>
        </div>
        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto pb-12 px-6 md:px-20 hide-scrollbar snap-x snap-mandatory"
        >
          {members.map((m, i) => <MemberCard key={i} member={m} index={i} />)}
        </div>
      </section>

      {/* --- BAGIAN EXPERIENCE (DYNAMIC GALLERY) --- */}
      <section id="experience" className="py-32 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <SectionHeading title="Runtime" subtitle="Env_Toggle" />
          <div className="inline-flex glass p-1.5 rounded-2xl font-mono relative overflow-hidden mt-8">
             <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-cyan-500/10 rounded-xl transition-all duration-500 ease-out ${activeMode === 'study' ? 'left-1.5' : 'left-[50%]'}`} />
             <button onClick={() => setActiveMode('study')} className={`relative z-10 px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${activeMode === 'study' ? 'text-cyan-400' : 'text-gray-500'}`}>Study_Mode</button>
             <button onClick={() => setActiveMode('play')} className={`relative z-10 px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${activeMode === 'play' ? 'text-cyan-400' : 'text-gray-500'}`}>Play_Mode</button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
           <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <AnimatePresence mode="wait">
                 <motion.div 
                    key={activeMode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                 >
                    {experienceContent[activeMode].map((item, i) => (
                       <div key={i} className="glass p-8 rounded-3xl border-l-4 border-cyan-500/30 hover:border-cyan-500 transition-all group">
                          <div className="flex items-center space-x-4 mb-4">
                             <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                             <h4 className="text-xl font-black uppercase tracking-tight">{item.title}</h4>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                    ))}
                 </motion.div>
              </AnimatePresence>
           </div>

           <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl">
                 <div className="h-12 bg-[#161b22] px-6 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center space-x-3">
                       <Camera size={16} className="text-cyan-500" />
                       <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                         Archive_{activeMode.toUpperCase()}_v1.0.4
                       </span>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-red-500/40" />
                       <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                       <div className="w-2 h-2 rounded-full bg-green-500/40" />
                    </div>
                 </div>
                 
                 <div className="p-1 grid grid-cols-2 gap-1 relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="col-span-2 grid grid-cols-2 gap-1"
                      >
                        {archivePhotos[activeMode].map((photo, idx) => (
                          <div key={idx} className="relative group overflow-hidden aspect-video">
                            <img 
                              src={photo.url} 
                              alt={photo.caption} 
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                               <p className="text-[10px] font-mono uppercase tracking-widest text-center">{photo.caption}</p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- BAGIAN JOURNEY --- */}
      <section id="journey" className="py-32 relative px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Commit_Logs" subtitle="Timeline_History" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent md:-translate-x-1/2" />
            <div className="space-y-24">
              {journeySteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-black border border-cyan-500 z-10 md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <div className="font-mono text-cyan-500 text-[9px] tracking-widest mb-2 uppercase">[{step.year}]</div>
                      <h3 className="text-xl font-black text-white uppercase mb-3">git commit -m "{step.title}"</h3>
                      <div className="glass p-5 rounded-2xl text-left border-l-2 border-cyan-500/50">
                        <p className="text-gray-400 text-xs leading-relaxed font-light italic">"{step.desc}"</p>
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 bg-[#030303] text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-2xl font-black text-white tracking-tighter uppercase mb-2">GRAD<span className="text-cyan-500">CIRCLE</span><span className="text-gray-700">.sh</span></div>
          <p className="text-[8px] text-gray-600 font-mono tracking-[0.4em] uppercase mb-12">System successfully deployed since freshman_year.</p>
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-8 opacity-20 text-[8px] font-mono tracking-[0.5em] uppercase">
              <span>© 2025 THE_GRAD_CIRCLE_COLLECTIVE</span>
              <span>Runtime: 24/7 // ID_Lampung</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-6 h-px bg-cyan-500/50" />
        <span className="text-cyan-500 text-[9px] font-mono tracking-[0.5em] uppercase font-bold">{subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{title}</h2>
    </div>
  );
}