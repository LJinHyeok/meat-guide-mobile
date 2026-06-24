import React from 'react';

interface MeatDiagramProps {
  type: 'beef' | 'pork';
  selectedCutId: string | null;
  onSelectCut: (id: string) => void;
  highlightedCutIds: string[];
}

export const MeatDiagram: React.FC<MeatDiagramProps> = ({
  type,
  selectedCutId,
  onSelectCut,
  highlightedCutIds,
}) => {
  const isBeef = type === 'beef';

  // Helper to determine path color class/styles
  const getPathStyles = (cutId: string) => {
    const isSelected = selectedCutId === cutId;
    const isHighlighted = highlightedCutIds.includes(cutId);
    const hasHighlightActive = highlightedCutIds.length > 0;

    if (isSelected) {
      return {
        fill: 'var(--color-selected, #ff4757)',
        filter: 'drop-shadow(0 0 8px rgba(255, 71, 87, 0.6))',
        opacity: 1,
        stroke: '#ffffff',
        strokeWidth: 2,
      };
    }

    if (hasHighlightActive) {
      if (isHighlighted) {
        return {
          fill: 'var(--color-highlighted, #eccc68)',
          filter: 'drop-shadow(0 0 6px rgba(236, 204, 104, 0.4))',
          opacity: 0.95,
          stroke: 'rgba(255, 255, 255, 0.4)',
          strokeWidth: 1.5,
        };
      } else {
        return {
          fill: 'var(--color-dimmed, #2f3542)',
          opacity: 0.25,
          stroke: 'rgba(255, 255, 255, 0.1)',
          strokeWidth: 1,
        };
      }
    }

    return {
      fill: 'var(--color-default, #57606f)',
      opacity: 0.75,
      stroke: 'rgba(255, 255, 255, 0.3)',
      strokeWidth: 1.5,
    };
  };

  return (
    <div className="diagram-container">
      <div className="diagram-card">
        <svg
          viewBox="0 0 600 360"
          className="meat-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS FOR GRADIENTS AND FILTERS */}
          <defs>
            <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-highlight" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {isBeef ? (
            /* ==================== COW (BEEF) DIAGRAM ==================== */
            <g className="beef-group">
              {/* Decorative Cow Head (Non-clickable) */}
              <path
                d="M 30,130 L 70,110 L 90,130 L 95,170 L 60,190 L 40,180 Z"
                fill="#2f3542"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M 80,115 L 75,90 L 85,95 Z"
                fill="#1e222b"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                opacity="0.6"
              />
              {/* Ears */}
              <path
                d="M 92,130 L 105,140 Z"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
              />

              {/* 목심 (Chuck) */}
              <path
                d="M 95,170 L 90,130 L 140,90 L 190,100 L 180,180 L 140,210 Z"
                style={getPathStyles('beef-moksim')}
                onClick={() => onSelectCut('beef-moksim')}
                className="clickable-region"
              />
              
              {/* 등심 (Loin) */}
              <path
                d="M 193,98 L 330,95 L 330,155 L 183,177 Z"
                style={getPathStyles('beef-deungsim')}
                onClick={() => onSelectCut('beef-deungsim')}
                className="clickable-region"
              />

              {/* 채끝 (Striploin) */}
              <path
                d="M 333,95 L 430,98 L 430,140 L 333,155 Z"
                style={getPathStyles('beef-chaekkeut')}
                onClick={() => onSelectCut('beef-chaekkeut')}
                className="clickable-region"
              />

              {/* 안심 (Tenderloin) */}
              <path
                d="M 335,160 L 420,145 L 415,175 L 345,185 Z"
                style={getPathStyles('beef-ansim')}
                onClick={() => onSelectCut('beef-ansim')}
                className="clickable-region"
              />

              {/* 갈비 (Rib) */}
              <path
                d="M 183,182 L 330,160 L 330,230 L 210,240 Z"
                style={getPathStyles('beef-galbi')}
                onClick={() => onSelectCut('beef-galbi')}
                className="clickable-region"
              />

              {/* 앞다리 (Blade/Shoulder) */}
              <path
                d="M 140,215 L 180,185 L 207,240 L 160,280 L 145,260 Z"
                style={getPathStyles('beef-apdari')}
                onClick={() => onSelectCut('beef-apdari')}
                className="clickable-region"
              />

              {/* 양지 (Brisket/Flank) */}
              <path
                d="M 213,243 L 330,233 L 420,220 L 410,270 L 260,285 L 163,283 Z"
                style={getPathStyles('beef-yangji')}
                onClick={() => onSelectCut('beef-yangji')}
                className="clickable-region"
              />

              {/* 우둔 (Rump) */}
              <path
                d="M 433,98 L 515,115 L 530,180 L 450,180 L 433,143 Z"
                style={getPathStyles('beef-udun')}
                onClick={() => onSelectCut('beef-udun')}
                className="clickable-region"
              />

              {/* 설도 (Round) */}
              <path
                d="M 448,183 L 530,183 L 510,280 L 423,267 L 418,223 Z"
                style={getPathStyles('beef-seoldo')}
                onClick={() => onSelectCut('beef-seoldo')}
                className="clickable-region"
              />

              {/* 사태 (Shanks) */}
              {/* Front Shank */}
              <path
                d="M 160,283 L 190,283 L 180,340 L 155,340 Z"
                style={getPathStyles('beef-satae')}
                onClick={() => onSelectCut('beef-satae')}
                className="clickable-region"
              />
              {/* Rear Shank */}
              <path
                d="M 450,278 L 485,278 L 475,340 L 445,340 Z"
                style={getPathStyles('beef-satae')}
                onClick={() => onSelectCut('beef-satae')}
                className="clickable-region"
              />

              {/* Labels Group */}
              <g className="labels-group" pointerEvents="none">
                <text x="135" y="150" className="label-text">목심</text>
                <text x="255" y="140" className="label-text">등심</text>
                <text x="380" y="125" className="label-text">채끝</text>
                <text x="380" y="172" className="label-text small">안심</text>
                <text x="260" y="200" className="label-text">갈비</text>
                <text x="170" y="235" className="label-text">앞다리</text>
                <text x="310" y="260" className="label-text">양지</text>
                <text x="480" y="140" className="label-text">우둔</text>
                <text x="475" y="230" className="label-text">설도</text>
                <text x="172" y="315" className="label-text small">사태</text>
                <text x="465" y="315" className="label-text small">사태</text>
              </g>
            </g>
          ) : (
            /* ==================== PIG (PORK) DIAGRAM ==================== */
            <g className="pork-group">
              {/* Decorative Pig Head (Non-clickable) */}
              <path
                d="M 25,160 L 60,130 L 85,130 L 105,170 L 105,210 L 75,225 L 45,220 L 25,185 Z"
                fill="#2f3542"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M 80,130 L 70,105 L 85,115 Z"
                fill="#1e222b"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1"
                opacity="0.6"
              />

              {/* 목살 (Collar) */}
              <path
                d="M 108,170 L 108,130 L 170,120 L 175,190 L 130,215 Z"
                style={getPathStyles('pork-moksal')}
                onClick={() => onSelectCut('pork-moksal')}
                className="clickable-region"
              />

              {/* 항정살 (Jowl) */}
              <path
                d="M 108,212 L 130,218 L 150,240 L 95,240 Z"
                style={getPathStyles('pork-hangjeong')}
                onClick={() => onSelectCut('pork-hangjeong')}
                className="clickable-region"
              />

              {/* 가브리살 (Back lip / Cheek) */}
              <path
                d="M 165,115 L 210,115 L 205,135 L 170,135 Z"
                style={getPathStyles('pork-gabeuri')}
                onClick={() => onSelectCut('pork-gabeuri')}
                className="clickable-region"
              />

              {/* 등심 (Loin) */}
              <path
                d="M 173,118 L 360,118 L 360,175 L 178,188 Z"
                style={getPathStyles('pork-deungsim')}
                onClick={() => onSelectCut('pork-deungsim')}
                className="clickable-region"
              />

              {/* 안심 (Tenderloin) */}
              <path
                d="M 310,180 L 370,180 L 365,205 L 320,205 Z"
                style={getPathStyles('pork-ansim')}
                onClick={() => onSelectCut('pork-ansim')}
                className="clickable-region"
              />

              {/* 갈비 (Ribs) */}
              <path
                d="M 178,192 L 250,192 L 250,240 L 178,240 Z"
                style={getPathStyles('pork-galbi')}
                onClick={() => onSelectCut('pork-galbi')}
                className="clickable-region"
              />

              {/* 삼겹살 (Pork Belly) */}
              <path
                d="M 253,192 L 360,192 L 360,255 L 253,255 Z M 178,243 L 250,243 L 250,270 L 178,270 Z"
                style={getPathStyles('pork-samgyeop')}
                onClick={() => onSelectCut('pork-samgyeop')}
                className="clickable-region"
              />

              {/* 앞다리 (Picnic Shoulder) */}
              <path
                d="M 133,218 L 173,192 L 173,260 L 125,275 L 120,250 Z"
                style={getPathStyles('pork-apdari')}
                onClick={() => onSelectCut('pork-apdari')}
                className="clickable-region"
              />

              {/* 뒷다리 (Ham) */}
              <path
                d="M 363,118 L 450,135 L 460,240 L 363,255 Z"
                style={getPathStyles('pork-dwdari')}
                onClick={() => onSelectCut('pork-dwdari')}
                className="clickable-region"
              />

              {/* 사태 (Shank) */}
              {/* Front Shank */}
              <path
                d="M 125,278 L 150,278 L 145,330 L 125,330 Z"
                style={getPathStyles('pork-satae')}
                onClick={() => onSelectCut('pork-satae')}
                className="clickable-region"
              />
              {/* Rear Shank */}
              <path
                d="M 390,258 L 420,258 L 415,330 L 390,330 Z"
                style={getPathStyles('pork-satae')}
                onClick={() => onSelectCut('pork-satae')}
                className="clickable-region"
              />

              {/* Labels Group */}
              <g className="labels-group" pointerEvents="none">
                <text x="140" y="160" className="label-text">목살</text>
                <text x="122" y="233" className="label-text small">항정</text>
                <text x="188" y="128" className="label-text extra-small">가브리</text>
                <text x="260" y="150" className="label-text">등심</text>
                <text x="340" y="195" className="label-text small">안심</text>
                <text x="214" y="218" className="label-text small">갈비</text>
                <text x="300" y="225" className="label-text">삼겹살</text>
                <text x="148" y="245" className="label-text small">앞다리</text>
                <text x="410" y="185" className="label-text">뒷다리</text>
                <text x="137" y="305" className="label-text extra-small">사태</text>
                <text x="402" y="305" className="label-text extra-small">사태</text>
              </g>
            </g>
          )}
        </svg>
      </div>
      <div className="diagram-legend">
        <span className="legend-item"><span className="legend-dot default"></span>일반</span>
        <span className="legend-item"><span className="legend-dot selected"></span>선택됨</span>
        {highlightedCutIds.length > 0 && (
          <span className="legend-item"><span className="legend-dot highlighted"></span>매칭 (용도/검색)</span>
        )}
      </div>
    </div>
  );
};
