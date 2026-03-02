import { Languages, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'ar', name: 'AR' },
  { code: 'de', name: 'GER' },
  { code: 'en', name: 'ENG' },
  { code: 'es', name: 'ESP' },
  { code: 'fr', name: 'FRA' },
  { code: 'he', name: 'HEB' },
  { code: 'it', name: 'ITA' },
  { code: 'nl', name: 'NLD' },
  { code: 'no', name: 'NOR' },
  { code: 'pt', name: 'POR' },
  { code: 'ru', name: 'RUS' },
  { code: 'sv', name: 'SWE' },
  { code: 'zh', name: 'CHN' },
];

const LanguageSelector = ({ selected, onChange }) => {
  return (
    <div className="relative group flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm transition-all hover:border-blue-200">
      
      {/* 1. KINETIC ICON */}
      <Languages size={14} className="text-blue-600 transition-transform group-hover:scale-110" />
      
      {/* 2. MICRO-LABEL */}
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-2">
        Lang
      </span>

      {/* 3. REFINED DATA SELECT */}
      <div className="relative flex items-center">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent pr-5 text-[10px] font-black uppercase tracking-tighter text-slate-900 cursor-pointer focus:outline-none"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="text-sm font-medium">
              {lang.name}
            </option>
          ))}
        </select>
        
        {/* 4. CUSTOM CHEVRON */}
        <ChevronDown 
          size={12} 
          className="absolute right-0 text-slate-400 pointer-events-none transition-transform group-hover:translate-y-0.5" 
        />
      </div>

      {/* Subtle Refraction Glow */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
    </div>
  );
};

export default LanguageSelector;