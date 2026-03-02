const SortDropdown = ({ value, onChange }) => {
      return (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="publishedAt">Date (newest)</option>
          <option value="relevancy">Relevancy</option>
          <option value="popularity">Popularity</option>
        </select>
      )
    }
    
    export default SortDropdown