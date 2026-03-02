const countries = [
      { code: 'us', name: 'USA' },
      { code: 'gb', name: 'UK' },
      { code: 'ca', name: 'Canada' },
      { code: 'au', name: 'Australia' },
      { code: 'in', name: 'India' },
    ]
    
    const CountrySelector = ({ selected, onChange }) => {
      return (
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      )
    }
    
    export default CountrySelector