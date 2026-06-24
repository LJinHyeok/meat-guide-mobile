import React from 'react';
import { ChefHat, Flame, Soup, UtensilsCrossed, Scroll, FlameKindling } from 'lucide-react';

interface UsageTabsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: '전체 보기', icon: ChefHat },
  { id: 'grill', name: '구이 & 스테이크', icon: Flame },
  { id: 'soup', name: '국 & 탕 & 찌개', icon: Soup },
  { id: 'stirfry', name: '불고기 & 볶음', icon: UtensilsCrossed },
  { id: 'braise', name: '갈비찜 & 조림', icon: FlameKindling },
  { id: 'raw', name: '육회용 부위', icon: Scroll },
];

export const UsageTabs: React.FC<UsageTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="usage-tabs-container">
      <h3 className="tabs-title">요리 용도별 맞춤 부위 찾기</h3>
      <div className="tabs-list scrollbar-hidden">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <Icon size={16} className="tab-icon" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
