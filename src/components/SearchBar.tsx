import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (val: string) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onChange,
  resultCount,
}) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="부위 이름, 세부 명칭, 요리법 검색 (예: 삼겹살, 스테이크, 장조림)"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={() => onChange('')} aria-label="검색어 지우기">
            <X size={18} />
          </button>
        )}
      </div>
      {query && (
        <div className="search-results-badge animate-fade-in">
          검색 결과: <strong>{resultCount}</strong>개 부위 매칭됨
        </div>
      )}
    </div>
  );
};
