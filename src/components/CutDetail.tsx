import React from 'react';
import type { MeatCut } from '../data/meatData';
import { Sparkles, ShoppingBag, Layers, MapPin, ChefHat, Info } from 'lucide-react';

interface CutDetailProps {
  cut: MeatCut | null;
  onClose: () => void;
}

export const CutDetail: React.FC<CutDetailProps> = ({ cut, onClose }) => {
  if (!cut) {
    return (
      <div className="detail-empty">
        <Info size={28} className="empty-icon" />
        <p>부위를 클릭하거나 검색하여 상세 정보를 확인해 보세요.</p>
      </div>
    );
  }

  return (
    <div className="detail-card animate-slide-up">
      <div className="detail-header">
        <div>
          <span className={`meat-badge ${cut.type}`}>
            {cut.type === 'beef' ? '소고기 (Beef)' : '돼지고기 (Pork)'}
          </span>
          <h2 className="detail-title">
            {cut.name} <span className="english-name">{cut.englishName}</span>
          </h2>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="닫기">
          &times;
        </button>
      </div>

      <div className="detail-body">
        <p className="detail-description">{cut.description}</p>

        <div className="detail-grid">
          {/* 1. 좋은 고기 고르는 법 (Buying Cues) */}
          <div className="info-section">
            <h3 className="section-title">
              <ShoppingBag size={18} className="section-icon color-buy" />
              좋은 고기 고르는 법 (구매 팁)
            </h3>
            <ul className="info-list">
              {cut.buyingCues.map((cue, idx) => (
                <li key={idx}>{cue}</li>
              ))}
            </ul>
          </div>

          {/* 2. 세부 부위 / 명칭 (Subcuts) */}
          <div className="info-section">
            <h3 className="section-title">
              <Layers size={18} className="section-icon color-sub" />
              세부 부위 및 다른 이름
            </h3>
            <div className="badge-container">
              {cut.subcuts.map((sub, idx) => (
                <span key={idx} className="subcut-badge">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* 3. 선호 부위 (Preferred part) */}
          <div className="info-section">
            <h3 className="section-title">
              <MapPin size={18} className="section-icon color-pin" />
              추천 맛있는 부위 위치
            </h3>
            <p className="section-text">{cut.preferredPart}</p>
          </div>

          {/* 4. 요리 용도 (Cooking Uses) */}
          <div className="info-section">
            <h3 className="section-title">
              <ChefHat size={18} className="section-icon color-chef" />
              추천 요리 용도
            </h3>
            <div className="badge-container">
              {cut.cookingUses.map((use, idx) => (
                <span key={idx} className="use-badge">
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* 5. 조리 및 보관 팁 (Tips) */}
          <div className="info-section full-width">
            <h3 className="section-title">
              <Sparkles size={18} className="section-icon color-tips" />
              조리 및 보관 꿀팁
            </h3>
            <ul className="info-list check-list">
              {cut.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
