import { Globe2, ChevronDown } from 'lucide-react';

const countries = [
  { code: 'us', name: 'USA' },
  { code: 'gb', name: 'UK' },
  { code: 'ca', name: 'CAN' },
  { code: 'au', name: 'AUS' },
  { code: 'in', name: 'IND' },
]

const CountrySelector = ({ selected, onChange }) => {
  return (
    <div className="relative group flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm transition-all hover:border-blue-200">
      {/* 1. KINETIC ICON */}
      <Globe2 size={14} className="text-blue-600 transition-transform group-hover:rotate-12" />
      
      {/* 2. MICRO-LABEL */}
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-2">
        Region
      </span>

      {/* 3. REFINED SELECT (No Border/Background) */}
      <div className="relative flex items-center">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent pr-5 text-[10px] font-black uppercase tracking-tighter text-slate-900 cursor-pointer focus:outline-none"
        >
          {countries.map(c => (
            <option key={c.code} value={c.code} className="text-sm font-medium">
              {c.name}
            </option>
          ))}
        </select>
        
        {/* 4. CUSTOM DROPDOWN ARROW */}
        <ChevronDown 
          size={12} 
          className="absolute right-0 text-slate-400 pointer-events-none transition-transform group-hover:translate-y-0.5" 
        />
      </div>

      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
    </div>
  )
}

export default CountrySelector