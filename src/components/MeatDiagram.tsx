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
        fill: isBeef ? 'url(#grad-beef-selected)' : 'url(#grad-pork-selected)',
        filter: 'url(#shadow-selected)',
        opacity: 1,
        stroke: '#ffffff',
        strokeWidth: 2.5,
      };
    }

    if (hasHighlightActive) {
      if (isHighlighted) {
        return {
          fill: 'url(#grad-highlight)',
          filter: 'url(#shadow-highlight)',
          opacity: 1,
          stroke: '#ffffff',
          strokeWidth: 2,
        };
      } else {
        return {
          fill: 'url(#grad-dimmed)',
          opacity: 0.45,
          stroke: 'rgba(70, 70, 80, 0.18)',
          strokeWidth: 1.25,
        };
      }
    }

    return {
      fill: isBeef ? 'url(#grad-beef-default)' : 'url(#grad-pork-default)',
      opacity: 0.9,
      stroke: 'rgba(70, 70, 80, 0.24)',
      strokeWidth: 1.9,
    };
  };

  // Label Chip component inside SVG
  const LabelChip: React.FC<{
    x: number;
    y: number;
    text: string;
    size?: 'small' | 'normal';
  }> = ({ x, y, text, size = 'normal' }) => {
    const isSmall = size === 'small';
    const width = text.length * (isSmall ? 11 : 13) + 18;
    const height = isSmall ? 20 : 24;
    return (
      <g transform={`translate(${x - width / 2}, ${y - height / 2})`} className="label-chip">
        <rect
          width={width}
          height={height}
          rx={height / 2}
          ry={height / 2}
          fill="#ffffff"
          stroke="rgba(29, 29, 31, 0.16)"
          strokeWidth={1.2}
          filter="drop-shadow(0 2px 5px rgba(0,0,0,0.12))"
          className="label-chip-bg"
        />
        <text
          x={width / 2}
          y={height / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={isSmall ? 11 : 13}
          fontWeight="700"
          fill="#1d1d1f"
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <div className="diagram-container">
      <div className="diagram-card">
        <svg
          viewBox="0 0 600 360"
          className="meat-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for Beef */}
            <linearGradient id="grad-beef-default" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f4ecec" />
            </linearGradient>
            <linearGradient id="grad-beef-selected" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5e62" />
              <stop offset="100%" stopColor="#ff2a3a" />
            </linearGradient>

            {/* Gradients for Pork */}
            <linearGradient id="grad-pork-default" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fcf2f4" />
            </linearGradient>
            <linearGradient id="grad-pork-selected" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff85a2" />
              <stop offset="100%" stopColor="#ff3366" />
            </linearGradient>

            {/* Highlight / Match Gradient */}
            <linearGradient id="grad-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe680" />
              <stop offset="100%" stopColor="#ffb300" />
            </linearGradient>

            {/* Dimmed Gradient */}
            <linearGradient id="grad-dimmed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2f2f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e5e5ea" stopOpacity="0.5" />
            </linearGradient>

            {/* Soft Shadow Filters */}
            <filter id="shadow-selected" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#ff2a3a" floodOpacity="0.3" />
            </filter>
            <filter id="shadow-highlight" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#ffb300" floodOpacity="0.25" />
            </filter>
          </defs>

          {isBeef ? (
            /* ==================== COW (BEEF) DIAGRAM ==================== */
            <g className="beef-group">
              {/* Cow Background Silhouette */}
              <path
                d="M 100,115
                   C 88,115 78,110 68,110
                   C 50,110 40,122 36,138
                   C 32,154 35,174 45,182
                   C 55,190 72,190 92,176
                   C 102,190 112,205 128,215
                   C 131,230 129,255 133,280
                   L 150,342 L 175,342 L 183,282
                   C 210,288 240,290 270,288
                   C 320,286 380,278 435,266
                   L 450,342 L 475,342 L 488,272
                   C 505,255 512,220 510,185
                   C 515,180 518,170 520,155
                   C 522,130 510,115 485,115
                   C 460,108 430,102 410,98
                   C 370,95 300,92 180,98
                   C 150,98 120,103 100,115 Z"
                fill="#f2f2f7"
                stroke="#e5e5ea"
                strokeWidth="2.5"
              />

              {/* Cow Horns */}
              <path d="M 85,90 C 80,75 72,68 62,65 Q 60,65 62,68 C 70,72 78,82 82,90 Z" fill="#8e8e93" />
              <path d="M 98,90 C 103,75 111,68 121,65 Q 123,65 121,68 C 113,72 105,82 101,90 Z" fill="#8e8e93" />

              {/* Cow Ears */}
              <path d="M 72,112 C 60,115 52,122 55,128 C 58,134 68,130 75,122 Z" fill="#e5e5ea" stroke="#d1d1d6" strokeWidth="1" />
              <path d="M 111,112 C 123,115 131,122 128,128 C 125,134 115,130 108,122 Z" fill="#e5e5ea" stroke="#d1d1d6" strokeWidth="1" />

              {/* Cow Eye */}
              <path d="M 60,140 Q 65,145 70,140" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Cow Muzzle/Snout */}
              <ellipse cx="50" cy="160" rx="12" ry="8" fill="#e5e5ea" stroke="#d1d1d6" strokeWidth="1" />
              <circle cx="48" cy="158" r="1.5" fill="#8e8e93" />
              <circle cx="52" cy="162" r="1.5" fill="#8e8e93" />

              {/* Cow Tail */}
              <path d="M 510,135 Q 535,145 530,185 Q 525,210 528,215" fill="none" stroke="#8e8e93" strokeWidth="3" strokeLinecap="round" />
              <path d="M 528,215 C 525,220 531,230 533,230 C 535,230 531,220 528,215" fill="#1d1d1f" />

              {/* === MEAT CUTS (BEEF) === */}

              {/* 목심 (Chuck) */}
              <path
                d="M 100,175 C 95,145 105,125 135,95 C 160,95 185,98 185,98 C 185,98 185,140 178,180 C 178,180 155,198 140,208 C 120,212 105,195 100,175 Z"
                style={getPathStyles('beef-moksim')}
                onClick={() => onSelectCut('beef-moksim')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-moksim');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="목심"
              />

              {/* 등심 (Loin) */}
              <path
                d="M 187,98 C 240,93 285,92 330,92 C 330,92 332,120 330,155 C 330,155 260,165 180,180 C 180,180 187,140 187,98 Z"
                style={getPathStyles('beef-deungsim')}
                onClick={() => onSelectCut('beef-deungsim')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-deungsim');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="등심"
              />

              {/* 채끝 (Striploin) */}
              <path
                d="M 333,92 C 365,92 395,95 430,98 C 430,98 430,120 427,140 C 400,147 365,152 333,155 L 333,92 Z"
                style={getPathStyles('beef-chaekkeut')}
                onClick={() => onSelectCut('beef-chaekkeut')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-chaekkeut');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="채끝"
              />

              {/* 안심 (Tenderloin) */}
              <path
                d="M 333,158 C 360,152 390,145 422,143 C 425,147 420,165 415,175 C 385,182 355,185 333,185 C 330,175 330,165 333,158 Z"
                style={getPathStyles('beef-ansim')}
                onClick={() => onSelectCut('beef-ansim')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-ansim');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="안심"
              />

              {/* 갈비 (Rib) */}
              <path
                d="M 178,183 C 245,168 285,158 327,158 C 327,158 327,195 327,230 C 290,235 240,240 210,242 L 178,183 Z"
                style={getPathStyles('beef-galbi')}
                onClick={() => onSelectCut('beef-galbi')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-galbi');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="갈비"
              />

              {/* 앞다리 (Blade/Shoulder) */}
              <path
                d="M 137,211 C 150,201 168,190 175,183 L 207,242 C 195,250 175,268 160,280 C 145,265 137,235 137,211 Z"
                style={getPathStyles('beef-apdari')}
                onClick={() => onSelectCut('beef-apdari')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-apdari');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="앞다리"
              />

              {/* 양지 (Brisket/Flank) */}
              <path
                d="M 213,244 C 250,242 290,237 327,232 C 360,228 395,222 418,220 C 418,220 412,250 408,268 C 360,278 300,283 258,283 C 210,283 170,281 162,280 L 213,244 Z"
                style={getPathStyles('beef-yangji')}
                onClick={() => onSelectCut('beef-yangji')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-yangji');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="양지"
              />

              {/* 우둔 (Rump) */}
              <path
                d="M 433,98 C 465,104 495,110 515,115 C 522,125 528,155 530,180 C 500,180 465,178 430,175 C 430,155 430,120 433,98 Z"
                style={getPathStyles('beef-udun')}
                onClick={() => onSelectCut('beef-udun')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-udun');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="우둔"
              />

              {/* 설도 (Round) */}
              <path
                d="M 428,177 C 460,180 495,182 528,182 C 525,200 515,250 508,272 C 480,268 450,258 423,242 C 418,230 422,200 428,177 Z"
                style={getPathStyles('beef-seoldo')}
                onClick={() => onSelectCut('beef-seoldo')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-seoldo');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="설도"
              />

              {/* 사태 (Shanks) */}
              {/* Front Shank */}
              <path
                d="M 160,282 C 170,282 188,280 188,280 L 178,340 C 178,340 165,340 155,340 C 150,320 155,300 160,282 Z"
                style={getPathStyles('beef-satae')}
                onClick={() => onSelectCut('beef-satae')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-satae');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="사태 (앞다리 부위)"
              />
              {/* Rear Shank */}
              <path
                d="M 445,260 C 470,268 485,272 485,272 L 475,340 C 475,340 460,340 450,340 C 442,320 440,285 445,260 Z"
                style={getPathStyles('beef-satae')}
                onClick={() => onSelectCut('beef-satae')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('beef-satae');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="사태 (뒷다리 부위)"
              />

              {/* Label Chips Group */}
              <g className="labels-group" pointerEvents="none">
                <LabelChip x={140} y={150} text="목심" />
                <LabelChip x={255} y={135} text="등심" />
                <LabelChip x={380} y={120} text="채끝" />
                <LabelChip x={375} y={166} text="안심" size="small" />
                <LabelChip x={260} y={198} text="갈비" />
                <LabelChip x={170} y={232} text="앞다리" />
                <LabelChip x={300} y={258} text="양지" />
                <LabelChip x={480} y={138} text="우둔" />
                <LabelChip x={475} y={225} text="설도" />
                <LabelChip x={172} y={312} text="사태" size="small" />
                <LabelChip x={465} y={312} text="사태" size="small" />
              </g>
            </g>
          ) : (
            /* ==================== PIG (PORK) DIAGRAM ==================== */
            <g className="pork-group">
              {/* Pig Background Silhouette */}
              <path
                d="M 110,130
                   C 95,130 85,135 75,135
                   C 60,135 45,145 35,165
                   C 25,180 25,195 35,205
                   C 45,215 65,220 80,215
                   C 95,225 110,230 120,235
                   C 123,245 120,265 125,278
                   L 125,330 L 150,330 L 160,278
                   C 190,282 230,285 270,282
                   C 320,280 360,272 390,258
                   L 390,330 L 415,330 L 420,258
                   C 440,250 460,235 465,210
                   C 470,185 465,150 450,135
                   C 425,120 380,118 360,118
                   C 300,118 200,120 110,130 Z"
                fill="#fdf2f4"
                stroke="#ffdee5"
                strokeWidth="2.5"
              />

              {/* Pig Floppy Ears */}
              <path d="M 82,125 C 72,108 92,102 96,115 C 100,128 90,135 82,125 Z" fill="#ffccd5" stroke="#ffb3c1" strokeWidth="1" />
              <path d="M 102,125 C 112,108 92,102 88,115 C 84,128 94,135 102,125 Z" fill="#ffccd5" stroke="#ffb3c1" strokeWidth="1" />

              {/* Pig Eye */}
              <path d="M 58,165 Q 63,169 68,165" fill="none" stroke="#48484a" strokeWidth="2.5" strokeLinecap="round" />

              {/* Pig Snout / Muzzle */}
              <ellipse cx="38" cy="185" rx="8" ry="12" fill="#ffccd5" stroke="#ffb3c1" strokeWidth="1.5" />
              <circle cx="36" cy="180" r="1.5" fill="#48484a" />
              <circle cx="36" cy="188" r="1.5" fill="#48484a" />

              {/* Pig Curly Tail */}
              <path d="M 450,135 C 465,128 475,122 470,132 C 465,142 455,132 470,145 Q 480,150 475,160" fill="none" stroke="#ffccd5" strokeWidth="3" strokeLinecap="round" />

              {/* === MEAT CUTS (PORK) === */}

              {/* 목살 (Collar) */}
              <path
                d="M 110,130 C 110,130 135,123 170,120 C 172,135 175,170 175,190 C 175,190 145,205 130,215 C 120,205 110,185 110,170 C 110,150 110,130 110,130 Z"
                style={getPathStyles('pork-moksal')}
                onClick={() => onSelectCut('pork-moksal')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-moksal');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="목살"
              />

              {/* 항정살 (Jowl) */}
              <path
                d="M 110,212 C 120,210 130,215 130,215 L 150,240 C 135,243 115,245 95,240 C 95,240 102,225 110,212 Z"
                style={getPathStyles('pork-hangjeong')}
                onClick={() => onSelectCut('pork-hangjeong')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-hangjeong');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="항정살"
              />

              {/* 가브리살 (Back lip / Cheek) */}
              <path
                d="M 170,120 C 170,120 185,115 210,115 C 215,115 218,125 215,135 C 200,135 185,135 170,135 L 170,120 Z"
                style={getPathStyles('pork-gabeuri')}
                onClick={() => onSelectCut('pork-gabeuri')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-gabeuri');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="가브리살"
              />

              {/* 등심 (Loin) */}
              <path
                d="M 170,137 C 170,137 185,137 215,137 C 215,137 280,118 360,118 L 360,175 C 360,175 280,182 178,188 L 170,137 Z"
                style={getPathStyles('pork-deungsim')}
                onClick={() => onSelectCut('pork-deungsim')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-deungsim');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="등심"
              />

              {/* 안심 (Tenderloin) */}
              <path
                d="M 310,180 L 360,180 C 360,180 365,205 350,205 C 330,205 320,200 310,180 Z"
                style={getPathStyles('pork-ansim')}
                onClick={() => onSelectCut('pork-ansim')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-ansim');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="안심"
              />

              {/* 갈비 (Ribs) */}
              <path
                d="M 178,190 L 250,190 L 250,240 C 230,240 200,240 178,240 L 178,190 Z"
                style={getPathStyles('pork-galbi')}
                onClick={() => onSelectCut('pork-galbi')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-galbi');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="갈비"
              />

              {/* 삼겹살 (Pork Belly) */}
              <path
                d="M 250,190 L 360,190 L 360,255 C 320,258 280,258 250,255 Z M 178,242 L 250,242 L 250,270 C 210,270 190,270 178,270 Z"
                style={getPathStyles('pork-samgyeop')}
                onClick={() => onSelectCut('pork-samgyeop')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-samgyeop');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="삼겹살"
              />

              {/* 앞다리 (Picnic Shoulder) */}
              <path
                d="M 130,215 L 178,190 L 178,260 C 160,268 140,272 125,275 C 120,260 125,235 130,215 Z"
                style={getPathStyles('pork-apdari')}
                onClick={() => onSelectCut('pork-apdari')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-apdari');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="앞다리"
              />

              {/* 뒷다리 (Ham) */}
              <path
                d="M 360,118 C 390,118 425,120 450,135 C 460,150 460,225 450,240 C 420,248 390,255 360,255 L 360,118 Z"
                style={getPathStyles('pork-dwdari')}
                onClick={() => onSelectCut('pork-dwdari')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-dwdari');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="뒷다리"
              />

              {/* 사태 (Shank) */}
              {/* Front Shank */}
              <path
                d="M 125,275 C 135,275 160,275 160,278 L 150,330 L 125,330 Z"
                style={getPathStyles('pork-satae')}
                onClick={() => onSelectCut('pork-satae')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-satae');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="사태 (앞다리 부위)"
              />
              {/* Rear Shank */}
              <path
                d="M 390,258 C 405,258 420,258 420,258 L 415,330 L 390,330 Z"
                style={getPathStyles('pork-satae')}
                onClick={() => onSelectCut('pork-satae')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCut('pork-satae');
                  }
                }}
                className="clickable-region"
                role="button"
                tabIndex={0}
                aria-label="사태 (뒷다리 부위)"
              />

              {/* Label Chips Group */}
              <g className="labels-group" pointerEvents="none">
                <LabelChip x={140} y={155} text="목살" />
                <LabelChip x={122} y={230} text="항정" size="small" />
                <LabelChip x={192} y={125} text="가브리" size="small" />
                <LabelChip x={265} y={150} text="등심" />
                <LabelChip x={338} y={193} text="안심" size="small" />
                <LabelChip x={214} y={215} text="갈비" size="small" />
                <LabelChip x={300} y={222} text="삼겹살" />
                <LabelChip x={152} y={248} text="앞다리" size="small" />
                <LabelChip x={410} y={185} text="뒷다리" />
                <LabelChip x={137} y={302} text="사태" size="small" />
                <LabelChip x={402} y={302} text="사태" size="small" />
              </g>
            </g>
          )}
        </svg>
      </div>
      <div className="diagram-legend">
        <span className="legend-item"><span className="legend-dot default"></span>일반 부위</span>
        <span className="legend-item">
          <span className={`legend-dot selected ${isBeef ? 'beef' : 'pork'}`}></span>선택됨
        </span>
        {highlightedCutIds.length > 0 && (
          <span className="legend-item"><span className="legend-dot highlighted"></span>검색/용도 매칭</span>
        )}
      </div>
    </div>
  );
};
