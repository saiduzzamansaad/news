import { useState } from 'react'

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
    <select value={period} onChange={handleChange} className="px-3 py-1 border rounded-md text-sm bg-white">
      <option value="24h">Last 24 hours</option>
      <option value="week">Last week</option>
      <option value="month">Last month</option>
      <option value="all">All time</option>
    </select>
  )
}

export default DateFilter