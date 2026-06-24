import { useState, useMemo } from 'react';
import { beefCuts, porkCuts } from './data/meatData';
import { MeatDiagram } from './components/MeatDiagram';
import { CutDetail } from './components/CutDetail';
import { SearchBar } from './components/SearchBar';
import { UsageTabs } from './components/UsageTabs';
import { Flame, ShieldAlert } from 'lucide-react';
import './App.css';

function App() {
  const [meatType, setMeatType] = useState<'beef' | 'pork'>('beef');
  const [selectedCutId, setSelectedCutId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Handle switching between beef and pork
  const handleMeatTypeChange = (type: 'beef' | 'pork') => {
    setMeatType(type);
    setSelectedCutId(null);
  };

  // Get current cuts array
  const currentCuts = useMemo(() => {
    return meatType === 'beef' ? beefCuts : porkCuts;
  }, [meatType]);

  // Filtering logic
  const filteredCuts = useMemo(() => {
    return currentCuts.filter((cut) => {
      // 1. Search Query filter
      const matchesSearch = () => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          cut.name.toLowerCase().includes(q) ||
          cut.englishName.toLowerCase().includes(q) ||
          cut.description.toLowerCase().includes(q) ||
          cut.subcuts.some((sub) => sub.toLowerCase().includes(q)) ||
          cut.cookingUses.some((use) => use.toLowerCase().includes(q))
        );
      };

      // 2. Category filter
      const matchesCategory = () => {
        if (selectedCategory === 'all') return true;
        return cut.usageCategories.includes(selectedCategory);
      };

      return matchesSearch() && matchesCategory();
    });
  }, [currentCuts, searchQuery, selectedCategory]);

  // Determine highlighted cuts
  const highlightedCutIds = useMemo(() => {
    const isFilteringActive = searchQuery !== '' || selectedCategory !== 'all';
    return isFilteringActive ? filteredCuts.map((c) => c.id) : [];
  }, [filteredCuts, searchQuery, selectedCategory]);

  // Selected Cut detail
  const selectedCut = useMemo(() => {
    if (!selectedCutId) return null;
    return currentCuts.find((c) => c.id === selectedCutId) || null;
  }, [selectedCutId, currentCuts]);

  // Handler for when a user clicks a cut
  const handleSelectCut = (id: string) => {
    setSelectedCutId(id);
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo-section">
          <Flame className="logo-icon" size={28} fill="currentColor" />
          <h1 className="app-title">고기 부위 도감 (Meat Guide)</h1>
        </div>
        <p className="app-subtitle">부위별 상세 정보, 구매 가이드 및 요리 팁</p>
      </header>

      <main className="app-main">
        {/* LEFT COLUMN (ON DESKTOP) / MAIN STACK */}
        <div className="diagram-container">
          
          {/* BEEF/PORK TOGGLE */}
          <div className="toggle-container">
            <button
              className={`toggle-btn ${meatType === 'beef' ? 'active beef' : ''}`}
              onClick={() => handleMeatTypeChange('beef')}
            >
              🐂 소고기 (Beef)
            </button>
            <button
              className={`toggle-btn ${meatType === 'pork' ? 'active pork' : ''}`}
              onClick={() => handleMeatTypeChange('pork')}
            >
              🐖 돼지고기 (Pork)
            </button>
          </div>

          {/* SEARCH BAR */}
          <SearchBar
            query={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setSelectedCutId(null); // Clear selected details on typing to focus on results
            }}
            resultCount={filteredCuts.length}
          />

          {/* USAGE TABS */}
          <UsageTabs
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedCutId(null); // Clear selected details when category changes
            }}
          />

          {/* INTERACTIVE DIAGRAM */}
          <MeatDiagram
            type={meatType}
            selectedCutId={selectedCutId}
            onSelectCut={handleSelectCut}
            highlightedCutIds={highlightedCutIds}
          />

          {/* LIST OF FILTERED CUTS (Accessibility & alternate navigation) */}
          <div className="info-section">
            <h3 className="section-title">
              <span className="bullet-point"></span>
              {meatType === 'beef' ? '소고기' : '돼지고기'} 부위 목록
            </h3>
            <div className="badge-container" style={{ marginTop: '8px' }}>
              {filteredCuts.length > 0 ? (
                filteredCuts.map((cut) => {
                  const isSelected = selectedCutId === cut.id;
                  const isHighlighted = highlightedCutIds.includes(cut.id);
                  let className = 'subcut-badge clickable-region';
                  if (isSelected) className += ' active-selected';
                  else if (highlightedCutIds.length > 0 && isHighlighted) className += ' active-highlighted';
                  
                  return (
                    <button
                      key={cut.id}
                      className={className}
                      onClick={() => handleSelectCut(cut.id)}
                      style={{
                        cursor: 'pointer',
                        border: isSelected ? '1px solid var(--color-selected)' : '1px solid var(--color-border)',
                        background: isSelected 
                          ? 'var(--color-selected)' 
                          : isHighlighted 
                            ? 'rgba(255, 211, 42, 0.15)' 
                            : 'rgba(255, 255, 255, 0.03)',
                        color: isSelected 
                          ? '#ffffff' 
                          : isHighlighted 
                            ? 'var(--color-highlighted)' 
                            : 'var(--text-primary)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: isSelected || isHighlighted ? 'bold' : 'normal',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {cut.name}
                    </button>
                  );
                })
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 0' }}>
                  <ShieldAlert size={16} />
                  <span>검색 또는 필터 조건에 부합하는 부위가 없습니다.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (ON DESKTOP) / DETAILS CARD */}
        <CutDetail
          cut={selectedCut}
          onClose={() => setSelectedCutId(null)}
        />
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>© 2026 Meat Guide Mobile. Designed with Korean UI & Capacitor.</p>
        <p>
          Android Build Tool powered by GitHub Actions. 
          <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">Repository</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
