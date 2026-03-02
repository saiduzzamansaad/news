const languages = [
      { code: 'ar', name: 'Arabic' },
      { code: 'de', name: 'German' },
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'he', name: 'Hebrew' },
      { code: 'it', name: 'Italian' },
      { code: 'nl', name: 'Dutch' },
      { code: 'no', name: 'Norwegian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'sv', name: 'Swedish' },
      { code: 'ud', name: 'Urdu' },
      { code: 'zh', name: 'Chinese' },
    ]
    
    const LanguageSelector = ({ selected, onChange }) => {
      return (
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm bg-white"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>{lang.name}</option>
          ))}
        </select>
      )
    }
    
    export default LanguageSelector