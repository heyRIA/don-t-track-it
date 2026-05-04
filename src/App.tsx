import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  User, 
  Home as HomeIcon, 
  BicepsFlexed, 
  PlusCircle, 
  History as HistoryIcon, 
  UserCircle,
  ChevronLeft,
  Play,
  Dumbbell,
  IterationCcw,
  Footprints,
  Zap,
  Trash2,
  Calendar,
  CheckCircle2,
  Edit2,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { Screen, MuscleCategory, Exercise, Session, SetEntry } from './types';
import { MUSCLE_CATEGORIES, EXERCISES, HISTORY } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<MuscleCategory | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const navigateTo = (screen: Screen, params?: { category?: MuscleCategory; exercise?: Exercise }) => {
    if (params?.category) setSelectedCategory(params.category);
    if (params?.exercise) setSelectedExercise(params.exercise);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Dashboard onNavigate={navigateTo} />;
      case 'muscles':
        return <MusclesGrid onNavigate={navigateTo} />;
      case 'category-detail':
        return <CategoryDetail category={selectedCategory!} onNavigate={navigateTo} />;
      case 'exercise-log':
        return <ExerciseLog exercise={selectedExercise!} onNavigate={navigateTo} />;
      case 'history':
        return <LogHistory exercise={selectedExercise!} onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-outline z-50 flex items-center justify-between px-4">
        <button className="text-lime hover:opacity-80 p-2">
          <Menu size={24} />
        </button>
        <h1 className="text-lime font-black italic tracking-tighter text-xl uppercase">IRONTRACK</h1>
        <button className="text-lime hover:opacity-80 p-2">
          <UserCircle size={28} />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-spacing-container max-w-lg mx-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen + (selectedCategory?.id || '') + (selectedExercise?.id || '')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-zinc-900 border-t border-outline z-50 flex justify-around items-center px-2 pb-2">
        <NavButton 
          active={currentScreen === 'home'} 
          icon={<HomeIcon size={24} />} 
          label="Home" 
          onClick={() => navigateTo('home')} 
        />
        <NavButton 
          active={currentScreen === 'muscles' || currentScreen === 'category-detail'} 
          icon={<Dumbbell size={24} />} 
          label="Muscles" 
          onClick={() => navigateTo('muscles')} 
        />
        <NavButton 
          active={currentScreen === 'log' || currentScreen === 'exercise-log'} 
          icon={<PlusCircle size={32} className="text-lime" />} 
          label="Log" 
          onClick={() => {/* Handle quick log */}}
          isCenter
        />
        <NavButton 
          active={currentScreen === 'history'} 
          icon={<HistoryIcon size={24} />} 
          label="History" 
          onClick={() => navigateTo('history')} 
        />
        <NavButton 
          active={currentScreen === 'profile'} 
          icon={<User size={24} />} 
          label="Profile" 
          onClick={() => navigateTo('profile')} 
        />
      </nav>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function Dashboard({ onNavigate }: { onNavigate: any }) {
  return (
    <div className="space-y-spacing-section">
      <section>
        <h2 className="text-3xl">Welcome Back, <span className="text-lime">Athlete</span></h2>
        <p className="text-zinc-500 font-medium pt-1">Ready to destroy some PRs today?</p>
      </section>

      <section className="bento-card flex items-center justify-between gap-4">
        <div className="glow-accent"></div>
        <div className="flex gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">STREAK</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">5</span>
              <span className="text-lime text-sm font-bold">Days</span>
            </div>
          </div>
          <div className="w-px bg-outline h-10 self-center"></div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">WORKOUTS</p>
            <span className="text-3xl font-black text-white">142</span>
          </div>
        </div>
        <button className="bg-lime text-black px-4 py-3 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-transform active:scale-95 shadow-[0_0_15px_rgba(195,244,0,0.3)]">
          <Play size={18} fill="currentColor" />
          QUICK START
        </button>
      </section>

      <section>
        <h3 className="text-xl mb-4">Target Areas</h3>
        <div className="grid grid-cols-2 gap-3">
          {MUSCLE_CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} onClick={() => onNavigate('category-detail', { category: cat })} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ category, onClick }: { key?: string; category: MuscleCategory; onClick: () => void }) {
  const Icon = category.name === 'Back' ? IterationCcw : category.name === 'Legs' ? Footprints : category.name === 'Shoulders' ? User : category.name === 'Arms' ? BicepsFlexed : category.name === 'Core' ? Zap : Dumbbell;
  
  return (
    <button 
      onClick={onClick}
      className={`bento-card h-32 flex flex-col justify-between text-left group hover:bg-zinc-800 transition-colors active:scale-[0.98] ${category.isDue ? 'border-lime/30' : ''}`}
    >
      <div className="flex justify-between items-start">
        <Icon size={24} className={`${category.isDue ? 'text-lime' : 'text-zinc-500'} group-hover:text-lime transition-colors`} />
        <span className={`text-[10px] font-bold px-2 py-1 rounded bg-zinc-900 border border-outline ${category.isDue ? 'text-lime' : 'text-zinc-500'}`}>
          {category.lastTrained}
        </span>
      </div>
      <span className="text-xl font-bold">{category.name}</span>
      {category.isDue && <div className="absolute top-1 right-1 w-2 h-2 bg-lime rounded-full shadow-[0_0_8px_rgba(195,244,0,0.8)]"></div>}
    </button>
  );
}

function MusclesGrid({ onNavigate }: { onNavigate: any }) {
  return (
    <div className="space-y-spacing-section">
       <div className="flex items-center gap-4 mb-4">
        <button onClick={() => onNavigate('home')} className="p-2 bg-surface-high rounded-full border border-outline active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl uppercase italic tracking-tighter">MUSCLE GROUPS</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {MUSCLE_CATEGORIES.map(cat => (
          <CategoryCard key={cat.id} category={cat} onClick={() => onNavigate('category-detail', { category: cat })} />
        ))}
      </div>
    </div>
  );
}

function CategoryDetail({ category, onNavigate }: { category: MuscleCategory; onNavigate: any }) {
  const exercises = EXERCISES.filter(ex => ex.category === category.id.toLowerCase());

  return (
    <div className="space-y-spacing-section">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => onNavigate('home')} className="p-2 bg-surface-high rounded-full border border-outline active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl uppercase italic tracking-tighter">{category.name}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exercises.map(ex => (
          <div key={ex.id} className="bento-card group">
            {ex.id === 'bench-press' && <div className="glow-accent"></div>}
            <div className="flex justify-between items-start mb-4">
               <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 border border-outline rounded">{category.name}</span>
                <h3 className="text-xl mt-2">{ex.name}</h3>
               </div>
               <button 
                onClick={() => onNavigate('history', { exercise: ex })}
                className="text-zinc-600 hover:text-lime transition-colors"
               >
                 <HistoryIcon size={24} />
               </button>
            </div>
            <div className="pt-4 border-t border-outline flex justify-between items-end">
               <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">PERSONAL RECORD</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">{ex.personalRecord.weight}</span>
                    <span className="text-zinc-500 text-sm">{ex.personalRecord.unit}</span>
                  </div>
               </div>
               <button 
                onClick={() => onNavigate('exercise-log', { exercise: ex })}
                className="bg-zinc-800 hover:bg-zinc-700 border border-outline text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-all active:scale-95"
               >
                 <PlusCircle size={14} />
                 LOG
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 right-4 z-40">
        <button className="bg-lime text-black h-14 px-6 rounded-full font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-all">
          <PlusCircle size={20} fill="currentColor" className="text-black" />
          LOG NEW
        </button>
      </div>
    </div>
  );
}

function ExerciseLog({ exercise, onNavigate }: { exercise: Exercise; onNavigate: any }) {
  const [sets, setSets] = useState<SetEntry[]>([
    { id: '1', weight: 100, reps: 8 },
    { id: '2', weight: 100, reps: 8 },
  ]);

  const addSet = () => {
    const newSet: SetEntry = {
      id: (sets.length + 1).toString(),
      weight: 100,
      reps: 8,
    };
    setSets([...sets, newSet]);
  };

  const removeSet = (id: string) => {
    setSets(sets.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-spacing-section">
       <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">{exercise.name}</h2>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 py-1 border border-outline rounded-full">
            {exercise.category}
          </span>
        </div>
        <p className="text-zinc-500">Log your current session details.</p>
      </section>

      <section className="bento-card space-y-4">
        <div className="flex items-center gap-2 text-zinc-500">
          <HistoryIcon size={18} />
          <h3 className="text-lg text-white">Previous Session</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 mb-1">BEST SET</p>
            <p className="text-2xl font-black text-white">100<span className="text-sm font-normal text-zinc-500 ml-1">kg</span></p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 mb-1">REPS</p>
            <p className="text-2xl font-black text-white">8</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 mb-1">TOTAL SETS</p>
            <p className="text-2xl font-black text-white">4</p>
          </div>
        </div>
        <p className="text-zinc-500 italic text-sm pt-2">
          "Felt strong on the 3rd set. Aim for 105kg next time." - Oct 24, 2023
        </p>
      </section>

      <section className="bento-card space-y-4">
        <div className="flex items-center gap-2 text-lime">
          <Dumbbell size={18} />
          <h3 className="text-lg text-white">Current Set</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Weight (KG)</label>
            <input 
              type="number" 
              defaultValue={100} 
              className="w-full bg-zinc-950 border border-outline rounded-lg h-14 text-center text-2xl font-black text-white focus:border-lime outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase">Reps</label>
            <input 
              type="number" 
              defaultValue={8} 
              className="w-full bg-zinc-950 border border-outline rounded-lg h-14 text-center text-2xl font-black text-white focus:border-lime outline-none" 
            />
          </div>
        </div>
        <button 
          onClick={addSet}
          className="btn-primary h-14 mt-2"
        >
          <PlusCircle size={20} />
          Add Set
        </button>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg">Logged Sets</h3>
        <div className="space-y-2">
          {sets.map(set => (
            <div key={set.id} className="bento-card flex items-center justify-between py-3">
              <div className="glow-accent"></div>
              <div className="flex items-center gap-6 pl-2">
                <span className="text-lg font-bold text-zinc-500 w-4">{set.id}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{set.weight}</span>
                  <span className="text-sm text-zinc-500">kg</span>
                </div>
                <span className="text-zinc-500">×</span>
                <span className="text-2xl font-black text-white">{set.reps}</span>
              </div>
              <button onClick={() => removeSet(set.id)} className="text-zinc-600 hover:text-red-500 p-2">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <label className="text-[10px] font-bold text-zinc-500 uppercase">Session Notes</label>
        <textarea 
          placeholder="How did it feel?"
          className="w-full bg-surface-high border border-outline rounded-lg p-3 h-24 text-white focus:border-lime outline-none resize-none"
        ></textarea>
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase pt-2">
          <Calendar size={12} />
          OCT 26, 2023
        </div>
      </section>

      <button className="w-full bg-lime text-black h-16 rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(195,244,0,0.3)] active:scale-95 transition-all">
        <CheckCircle2 size={24} />
        Finish & Save
      </button>
    </div>
  );
}

function LogHistory({ exercise, onNavigate }: { exercise: Exercise; onNavigate: any }) {
  return (
    <div className="space-y-spacing-section">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => onNavigate('category-detail', { category: MUSCLE_CATEGORIES.find(c => c.id === exercise.category) })} className="p-2 bg-surface-high rounded-full border border-outline active:scale-90 transition-transform">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl">{exercise.name}</h2>
      </div>
      <p className="text-zinc-500 -mt-4 mb-4">Exercise History & Progress</p>

      <section className="bento-card">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl">1RM Trend</h3>
            <p className="text-xs text-zinc-500">Last 10 entries</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-lime drop-shadow-[0_0_10px_rgba(195,244,0,0.4)]">225</span>
            <p className="text-[10px] font-bold text-zinc-500 uppercase">LBS MAX</p>
          </div>
        </div>
        
        {/* Simple Chart SVG Component */}
        <div className="h-40 w-full relative flex items-end">
          <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 border-l border-outline pl-1 pointer-events-none text-[8px] font-mono text-zinc-700">
             <span>230</span>
             <span>210</span>
             <span>190</span>
             <span>170</span>
          </div>
          <svg className="w-full h-full ml-4" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path 
              d="M 5 80 L 15 75 L 25 70 L 35 75 L 45 65 L 55 60 L 65 50 L 75 45 L 85 30 L 95 25" 
              fill="none" 
              stroke="#c3f400" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke" 
             />
             <circle cx="5" cy="80" r="2" fill="#121212" stroke="#c3f400" strokeWidth="1" />
             <circle cx="15" cy="75" r="2" fill="#121212" stroke="#c3f400" strokeWidth="1" />
             <circle cx="95" cy="25" r="3" fill="#c3f400" className="drop-shadow-[0_0_8px_rgba(195,244,0,0.8)]" />
          </svg>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl">Log History</h3>
        <div className="space-y-3">
          {HISTORY.map((session, i) => (
            <div key={session.id} className="bento-card p-0 overflow-hidden">
              {i === 0 && <div className="glow-accent"></div>}
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      {i === 0 ? 'Today' : i === 1 ? '3 Days Ago' : '1 Week Ago'}
                    </p>
                    <p className="text-xl font-black text-white">{session.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-zinc-800 rounded border border-outline text-zinc-400 hover:text-white transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 bg-zinc-800 rounded border border-outline text-zinc-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-outline flex justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Volume</p>
                    <p className="text-lg font-black text-white">{session.totalVolume.toLocaleString()} lbs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Best Set</p>
                    <p className="text-lg font-black text-lime">225 x 5</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-surface-high border border-outline h-12 rounded-lg font-bold text-zinc-400 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
          Load More History
          <ChevronDown size={18} />
        </button>
      </section>
    </div>
  );
}

function NavButton({ icon, label, active, onClick, isCenter }: { icon: any; label: string; active: boolean; onClick: () => void; isCenter?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`nav-btn ${active ? 'nav-btn-active' : ''} ${isCenter ? 'relative -top-4 w-16 h-16 bg-zinc-900 rounded-full border border-outline shadow-lg' : 'w-16 h-16'}`}
    >
      {icon}
      {!isCenter && <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{label}</span>}
    </button>
  );
}
