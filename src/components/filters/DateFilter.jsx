import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

const DateFilter = ({ onDateChange }) => {
  const [period, setPeriod] = useState('24h')

  const handleChange = (e) => {
    const value = e.target.value
    setPeriod(value)
    const now = new Date()
    let from = new Date()
    
    if (value === '24h') from.setHours(now.getHours() - 24)
    else if (value === 'week') from.setDate(now.getDate() - 7)
    else if (value === 'month') from.setMonth(now.getMonth() - 1)
    else if (value === 'all') from = null
    
    onDateChange(from ? from.toISOString().split('T')[0] : null)
  }

  return (
    <div className="relative group flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm transition-all hover:border-blue-200">
      
      {/* 1. KINETIC ICON */}
      <CalendarDays size={14} className="text-blue-600 transition-transform group-hover:scale-110" />
      
      {/* 2. MICRO-LABEL */}
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-2">
        Period
      </span>

      {/* 3. TEMPORAL SELECT TERMINAL */}
      <div className="relative flex items-center">
        <select
          value={period}
          onChange={handleChange}
          className="appearance-none bg-transparent pr-5 text-[10px] font-black uppercase tracking-tighter text-slate-900 cursor-pointer focus:outline-none"
        >
          <option value="24h">24 Hours</option>
          <option value="week">7 Days</option>
          <option value="month">30 Days</option>
          <option value="all">Unlimited</option>
        </select>
        
        {/* 4. CUSTOM CHEVRON */}
        <ChevronDown 
          size={12} 
          className="absolute right-0 text-slate-400 pointer-events-none transition-transform group-hover:translate-y-0.5" 
        />
      </div>

      {/* Internal Glass Highlight */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
    </div>
  )
}

export default DateFilter