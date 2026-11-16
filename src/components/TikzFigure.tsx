import React from 'react';

export type TikzDiagramType =
  | 'number_line_intersection'
  | 'number_line_minus2_4'
  | 'set_difference_venn'
  | 'venn_diagram_40'
  | 'venn_diagram_100'
  | 'venn_diagram_50_10b'
  | 'bpt_halfplane_2x_y_4'
  | 'feasible_region_quad'
  | 'feasible_region_aircon'
  | 'feasible_region_coffee_cocoa'
  | 'trig_unit_circle_supp'
  | 'triangle_60deg'
  | 'triangle_sin_circumcircle'
  | 'triangle_obtuse_cos'
  | 'triangle_heron'
  | 'river_triangulation'
  | 'lighthouse_coast'
  | 'parabola_vertex_2_1'
  | 'broken_tree_storm'
  | 'feasible_region_aloe_asparagus'
  | 'venn_diagram_70_tourists'
  | 'number_line_3_6'
  | 'triangle_cos_inscribed_d2'
  | 'mountain_building_observation'
  | 'pyramid_sabcd_mn'
  | 'pyramid_sabcd_mnp'
  | 'tetrahedron_abcd_g1g2'
  | 'pyramid_sabcd_sa_perp'
  | 'pyramid_sabc_sa_perp'
  | 'prism_abca1b1c1'
  | 'cube_abcd_a1b1c1d1'
  | 'pyramid_sabcd_so'
  | 'pyramid_sabcd_ef_intersect'
  | 'tetrahedron_abcd_ij_bc'
  | 'tetrahedron_abcd_ag_centroid'
  | 'pyramid_sabcd_sx_parallel'
  | 'tetrahedron_abcd_mnpq'
  | 'pyramid_sabcd_trapezoid'
  | 'box_abcd_ab1d1_bc1d'
  | 'prism_abc_mnp'
  | 'thales_three_parallel_planes'
  | 'parallel_projection_plane'
  | 'space_two_planes_intersect'
  | 'custom';

interface TikzFigureProps {
  type?: TikzDiagramType | string;
  tikzCode?: string;
  caption?: string;
  className?: string;
}

const MATH_SERIF = '"Times New Roman", Times, "KaTeX_Main", "Computer Modern Serif", Georgia, serif';

/**
 * Bộ dịch trực tiếp khối mã \begin{tikzpicture} ... \end{tikzpicture} tùy chỉnh sang hình vẽ vector SVG chuẩn TikZ
 */
function renderCustomTikzToSvg(rawCode: string): React.ReactNode {
  const coords = new Map<string, { x: number; y: number }>();

  // Tìm scale nếu có
  const scaleMatch = rawCode.match(/scale\s*=\s*([\d\.]+)/);
  const userScale = scaleMatch ? parseFloat(scaleMatch[1]) || 1 : 1;

  // Tiền xử lý mở rộng vòng lặp \foreach \p/\pos in {S/above, A/left, ...} ...;
  let expandedCode = rawCode
    .replace(/\\begin\{scope\}(?:\[[^\]]*\])?/g, '')
    .replace(/\\end\{scope\}/g, '')
    .replace(
      /\\foreach\s+\\([A-Za-z0-9_]+)\s*\/\s*\\([A-Za-z0-9_]+)\s+in\s*\{([^}]+)\}\s*([^;]+);/g,
      (_, var1, var2, listStr, body) => {
        const pairs = listStr.split(',').map((s: string) => s.trim()).filter(Boolean);
        return (
          pairs
            .map((pair: string) => {
              const [v1, v2] = pair.split('/').map((s: string) => s.trim());
              return body
                .replace(new RegExp(`\\\\${var1}\\b`, 'g'), v1 || '')
                .replace(new RegExp(`\\\\${var2}\\b`, 'g'), v2 || 'above');
            })
            .join('; ') + ';'
        );
      }
    );

  // Mở rộng vòng lặp đơn \foreach \p in {A, B, C} ...;
  expandedCode = expandedCode.replace(
    /\\foreach\s+\\([A-Za-z0-9_]+)\s+in\s*\{([^}]+)\}\s*([^;]+);/g,
    (_, var1, listStr, body) => {
      const items = listStr.split(',').map((s: string) => s.trim()).filter(Boolean);
      return (
        items
          .map((item: string) => body.replace(new RegExp(`\\\\${var1}\\b`, 'g'), item))
          .join('; ') + ';'
      );
    }
  );

  // 1. Đọc các điểm \coordinate (A) at (x, y);
  const coordRegex = /\\coordinate\s*\(\s*([A-Za-z0-9_']+)\s*\)\s*at\s*\(\s*([^\),]+)\s*,\s*([^\)]+)\s*\)/g;
  let cm;
  const evalNum = (expr: string): number => {
    const clean = expr
      .replace(/[{}]/g, '')
      .replace(/cos\(\s*60\s*\)/g, '0.5')
      .replace(/sin\(\s*60\s*\)/g, '0.866')
      .replace(/cos\(\s*30\s*\)/g, '0.866')
      .replace(/sin\(\s*30\s*\)/g, '0.5')
      .replace(/cos\(\s*45\s*\)/g, '0.707')
      .replace(/sin\(\s*45\s*\)/g, '0.707')
      .replace(/sqrt\(\s*3\s*\)/g, '1.732')
      .replace(/sqrt\(\s*2\s*\)/g, '1.414')
      .replace(/pi/gi, '3.1416')
      .trim();
    if (clean.includes('*')) {
      const parts = clean.split('*').map((p) => parseFloat(p.trim()));
      if (parts.every((n) => !isNaN(n))) {
        return parts.reduce((a, b) => a * b, 1);
      }
    }
    const v = parseFloat(clean);
    return isNaN(v) ? 0 : v;
  };

  while ((cm = coordRegex.exec(expandedCode)) !== null) {
    coords.set(cm[1], { x: evalNum(cm[2]), y: evalNum(cm[3]) });
  }

  const resolvePoint = (ptStr: string): { x: number; y: number } | null => {
    const clean = ptStr.trim();
    if (coords.has(clean)) {
      return coords.get(clean)!;
    }
    const m = clean.match(/^\(\s*([^\),]+)\s*,\s*([^\)]+)\s*\)$/);
    if (m) {
      return { x: evalNum(m[1]), y: evalNum(m[2]) };
    }
    const named = clean.match(/^\(\s*([A-Za-z0-9_']+)\s*\)$/);
    if (named && coords.has(named[1])) {
      return coords.get(named[1])!;
    }
    return null;
  };

  // Thu thập tất cả tọa độ để tự động căn khung viewBox
  const allPoints: { x: number; y: number }[] = [];
  coords.forEach((pt) => allPoints.push(pt));
  const rawPairRegex = /\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g;
  let pm;
  while ((pm = rawPairRegex.exec(expandedCode)) !== null) {
    allPoints.push({ x: parseFloat(pm[1]), y: parseFloat(pm[2]) });
  }

  const rawMinX = allPoints.length > 0 ? Math.min(...allPoints.map((p) => p.x)) : -3;
  const rawMaxX = allPoints.length > 0 ? Math.max(...allPoints.map((p) => p.x)) : 4;
  const rawMinY = allPoints.length > 0 ? Math.min(...allPoints.map((p) => p.y)) : -2;
  const rawMaxY = allPoints.length > 0 ? Math.max(...allPoints.map((p) => p.y)) : 3.5;

  const minX = rawMinX - 0.85;
  const maxX = rawMaxX + 0.9;
  const minY = rawMinY - 0.85;
  const maxY = rawMaxY + 0.85;

  const widthUnits = Math.max(maxX - minX, 3.2);
  const heightUnits = Math.max(maxY - minY, 2.4);
  const svgW = 420;
  const svgH = Math.min(310, Math.max(235, Math.round((svgW * heightUnits) / widthUnits)));

  const unitPx = Math.min((svgW - 56) / widthUnits, (svgH - 44) / heightUnits);
  const usedW = widthUnits * unitPx;
  const usedH = heightUnits * unitPx;
  const offsetX = (svgW - usedW) / 2;
  const offsetY = (svgH - usedH) / 2;
  const toSvgX = (x: number) => offsetX + (x - minX) * unitPx;
  const toSvgY = (y: number) => svgH - offsetY - (y - minY) * unitPx;

  const cleanLatexLabel = (raw: string): string => {
    return raw
      .replace(/__SEMI__/g, ';')
      .replace(/^\$|\$$/g, '')
      .replace(/\\mathbb\{R\}/g, 'ℝ')
      .replace(/\\mathbb\{Z\}/g, 'ℤ')
      .replace(/\\mathbb\{N\}/g, 'ℕ')
      .replace(/\\mathbb\{Q\}/g, 'ℚ')
      .replace(/\\cap/g, '∩')
      .replace(/\\cup/g, '∪')
      .replace(/\\subset/g, '⊂')
      .replace(/\\in/g, '∈')
      .replace(/\\setminus/g, '∖')
      .replace(/\\infty/g, '∞')
      .replace(/\\le/g, '≤')
      .replace(/\\ge/g, '≥')
      .replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈')
      .replace(/\\perp/g, '⊥')
      .replace(/\\parallel/g, '∥')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ')
      .replace(/\\varphi|\\phi/g, 'φ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\omega/g, 'ω')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\Omega/g, 'Ω')
      .replace(/\\pi/g, 'π')
      .replace(/\\log_a/g, 'logₐ')
      .replace(/\\log_b/g, 'log_b')
      .replace(/\\log_2/g, 'log₂')
      .replace(/\\log/g, 'log')
      .replace(/\\ln/g, 'ln')
      .replace(/\\sin/g, 'sin')
      .replace(/\\cos/g, 'cos')
      .replace(/\\tan/g, 'tan')
      .replace(/\\cot/g, 'cot')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
      .replace(/\^\\circ/g, '°')
      .replace(/\^\{?2\}?/g, '²')
      .replace(/\^\{?3\}?/g, '³')
      .replace(/\^\{?x\}?/g, 'ˣ')
      .replace(/_\{?0\}?/g, '₀')
      .replace(/_\{?1\}?/g, '₁')
      .replace(/_\{?2\}?/g, '₂')
      .replace(/_\{?3\}?/g, '₃')
      .replace(/_\{?4\}?/g, '₄')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/[{}]/g, '')
      .trim();
  };

  const elements: React.ReactNode[] = [];
  // Bảo vệ dấu ; bên trong cặp ngoặc nhọn {...} (ví dụ {$M_0(1;1)$}) trước khi tách lệnh theo ;
  const safeExpanded = expandedCode
    .replace(/%.*$/gm, '')
    .replace(/\\begin\{tikzpicture\}(?:\[[^\]]*\])?/g, '')
    .replace(/\\end\{tikzpicture\}/g, '')
    .replace(/\{([^{}]*)\}/g, (m) => m.replace(/;/g, '__SEMI__'));

  const statements = safeExpanded.split(';');

  statements.forEach((stmt, idx) => {
    const line = stmt.trim();
    if (!line || /^\\clip\b/.test(line) || /^\\coordinate\b/.test(line)) return;

    const isDashed = /dashed/.test(line);
    const isDotted = /dotted/.test(line);
    const hasArrowEnd = /->/.test(line);
    const hasArrowBoth = /<->/.test(line);
    const isVeryThick = /very\s+thick/.test(line);

    let strokeColor = '#0f172a';
    if (/cyan|sky|blue|teal/.test(line)) strokeColor = '#0369a1';
    else if (/emerald|green/.test(line)) strokeColor = '#047857';
    else if (/amber|orange/.test(line)) strokeColor = '#b45309';
    else if (/rose|red|crimson/.test(line)) strokeColor = '#be123c';
    else if (/purple|violet/.test(line)) strokeColor = '#7e22ce';
    else if (/gray|slate/.test(line)) strokeColor = '#64748b';

    // 1. \draw hoặc \filldraw hình tròn: \draw[...] (x,y) circle (r);
    const circleMatch = line.match(
      /\\(?:draw|filldraw|fill)(?:\[[^\]]*\])?\s*(\([^\)]+\))\s*circle\s*\(\s*([\d\.]+)\s*(?:cm|pt)?\s*\)/
    );
    if (circleMatch) {
      const center = resolvePoint(circleMatch[1]);
      const rawR = parseFloat(circleMatch[2]) || 1;
      const isPt = /pt\s*\)/.test(circleMatch[0]);
      if (center) {
        const rPx = isPt ? Math.max(3, rawR * 1.15) : rawR * unitPx * (userScale > 0.2 ? 1 : userScale);
        elements.push(
          <circle
            key={`c-${idx}`}
            cx={toSvgX(center.x)}
            cy={toSvgY(center.y)}
            r={rPx}
            fill={isPt ? strokeColor : /^\\fill/.test(line) ? `${strokeColor}22` : 'none'}
            stroke={strokeColor}
            strokeWidth={isPt ? 1.5 : 1.8}
            strokeDasharray={isDashed ? '5 3' : isDotted ? '2 2' : undefined}
          />
        );
      }
    }

    // 1b. Cung tròn \draw[...] (x,y) arc (startDeg:endDeg:r);
    const arcMatch = line.match(
      /\\draw(?:\[[^\]]*\])?\s*(\([^\)]+\))\s*arc\s*\(\s*(-?[\d\.]+)\s*:\s*(-?[\d\.]+)\s*:\s*([\d\.]+)\s*(?:cm)?\s*\)/
    );
    if (arcMatch) {
      const startPt = resolvePoint(arcMatch[1]);
      const startDeg = parseFloat(arcMatch[2]) || 0;
      const endDeg = parseFloat(arcMatch[3]) || 0;
      const rVal = parseFloat(arcMatch[4]) || 0.5;
      if (startPt) {
        const startRad = (startDeg * Math.PI) / 180;
        const endRad = (endDeg * Math.PI) / 180;
        const cx = startPt.x - rVal * Math.cos(startRad);
        const cy = startPt.y - rVal * Math.sin(startRad);
        const arcPts: string[] = [];
        const arcSteps = 24;
        for (let s = 0; s <= arcSteps; s++) {
          const ang = startRad + ((endRad - startRad) * s) / arcSteps;
          const px = cx + rVal * Math.cos(ang);
          const py = cy + rVal * Math.sin(ang);
          arcPts.push(`${toSvgX(px)},${toSvgY(py)}`);
        }
        elements.push(
          <polyline
            key={`arc-${idx}`}
            points={arcPts.join(' ')}
            fill="none"
            stroke={strokeColor}
            strokeWidth={isVeryThick ? 2.2 : 1.6}
            strokeDasharray={isDashed ? '5 3' : undefined}
            markerEnd={hasArrowEnd ? 'url(#tikz-arrow)' : undefined}
          />
        );
      }
    }

    // 2. \draw hoặc \fill hình chữ nhật: (x1,y1) rectangle (x2,y2)
    const rectMatch = line.match(
      /\\(?:draw|fill|filldraw)(?:\[[^\]]*\])?\s*(\([^\)]+\))\s*rectangle\s*(\([^\)]+\))/
    );
    if (rectMatch) {
      const p1 = resolvePoint(rectMatch[1]);
      const p2 = resolvePoint(rectMatch[2]);
      if (p1 && p2) {
        const x = Math.min(toSvgX(p1.x), toSvgX(p2.x));
        const y = Math.min(toSvgY(p1.y), toSvgY(p2.y));
        const w = Math.abs(toSvgX(p2.x) - toSvgX(p1.x));
        const h = Math.abs(toSvgY(p2.y) - toSvgY(p1.y));
        const isHatched = /pattern\s*=/.test(line);
        elements.push(
          <rect
            key={`rect-${idx}`}
            x={x}
            y={y}
            width={w}
            height={h}
            fill={isHatched ? 'url(#tikz-hatch-ne)' : /^\\fill/.test(line) ? '#e0f2fe' : 'none'}
            stroke={/^\\fill\[/.test(line) && !/draw=/.test(line) ? 'none' : strokeColor}
            strokeWidth={1.5}
          />
        );
      }
    }

    // 2b. Đồ thị hàm số \draw[domain=a:b] plot (\x, {expr})
    if (line.includes('plot') && /\\draw/.test(line)) {
      const domainMatch = line.match(/domain\s*=\s*(-?[\d\.]+)\s*:\s*(-?[\d\.]+)/);
      const plotExprMatch = line.match(/plot\s*\(\s*\\x\s*,\s*\{([^\}]+)\}\s*\)/);
      if (plotExprMatch) {
        const xStart = domainMatch ? parseFloat(domainMatch[1]) : -3.14;
        const xEnd = domainMatch ? parseFloat(domainMatch[2]) : 3.14;
        const expr = plotExprMatch[1];
        const samplePts: string[] = [];
        let lastCoord: { x: number; y: number } | null = null;
        const steps = 64;
        for (let s = 0; s <= steps; s++) {
          const xVal = xStart + ((xEnd - xStart) * s) / steps;
          let yVal = 0;
          try {
            const jsExpr = expr
              .replace(/\\x\b/g, `(${xVal})`)
              .replace(/\^/g, '**')
              .replace(/pow\s*\(/g, 'Math.pow(')
              .replace(/ln\s*\(/g, 'Math.log(')
              .replace(/exp\s*\(/g, 'Math.exp(')
              .replace(/sqrt\s*\(/g, 'Math.sqrt(')
              .replace(/abs\s*\(/g, 'Math.abs(')
              .replace(/sin\s*\(([^)]+)\)\s*r\)/g, 'Math.sin($1)')
              .replace(/cos\s*\(([^)]+)\)\s*r\)/g, 'Math.cos($1)')
              .replace(/sin\s*\(/g, 'Math.sin(')
              .replace(/cos\s*\(/g, 'Math.cos(')
              .replace(/tan\s*\(/g, 'Math.tan(');
            yVal = Number(Function(`"use strict"; return (${jsExpr});`)());
          } catch {
            yVal = 0;
          }
          if (!isNaN(yVal) && isFinite(yVal)) {
            samplePts.push(`${toSvgX(xVal)},${toSvgY(yVal)}`);
            lastCoord = { x: xVal, y: yVal };
          }
        }
        if (samplePts.length >= 2) {
          elements.push(
            <polyline
              key={`plot-${idx}`}
              points={samplePts.join(' ')}
              fill="none"
              stroke={strokeColor}
              strokeWidth={2.2}
            />
          );
        }
        // Nhãn ở cuối đồ thị plot (...) node[pos] {label}
        const plotNodeMatch = line.match(/plot\s*\(\s*\\x\s*,\s*\{[^\}]+\}\s*\)\s*node(?:\[([^\]]*)\])?\s*\{([\s\S]*?)\}/);
        if (plotNodeMatch && lastCoord) {
          const opts = plotNodeMatch[1] || '';
          const label = cleanLatexLabel(plotNodeMatch[2]);
          if (label) {
            let dx = 0;
            let dy = -6;
            if (/above/.test(opts)) dy = -9;
            if (/below/.test(opts)) dy = 14;
            if (/left/.test(opts)) dx = -18;
            if (/right/.test(opts)) dx = 22;
            elements.push(
              <text
                key={`plot-node-${idx}`}
                x={toSvgX(lastCoord.x) + dx}
                y={toSvgY(lastCoord.y) + dy}
                fill={strokeColor}
                fontFamily={MATH_SERIF}
                fontSize="14"
                fontStyle="italic"
                fontWeight="bold"
                textAnchor="middle"
              >
                {label}
              </text>
            );
          }
        }
      }
    }

    // 3. Đường gấp khúc / đoạn thẳng / đa giác: hỗ trợ nhiều chuỗi tách rời trong cùng 1 lệnh \draw (ví dụ: (S)--(A) (A)--(B) (A)--(D))
    if (line.includes('--') && /\\(?:draw|fill|filldraw)/.test(line)) {
      const chainRegex =
        /(?:\(\s*(?:[A-Za-z0-9_']+|[^\(\)]+)\s*\)\s*(?:node(?:\[[^\]]*\])?\s*\{[^}]*\}\s*)?--\s*)+(?:\(\s*(?:[A-Za-z0-9_']+|[^\(\)]+)\s*\)|cycle)/g;
      const chains = line.match(chainRegex) || [line];

      chains.forEach((chainStr, cIdx) => {
        const ptMatches = [
          ...chainStr.matchAll(/\(\s*[A-Za-z0-9_']+\s*\)|\(\s*-?[\d\.]+\s*,\s*-?[\d\.]+\s*\)/g),
        ];
        const pts = ptMatches.map((m) => resolvePoint(m[0])).filter(Boolean) as {
          x: number;
          y: number;
        }[];
        const isClosed = /--\s*cycle/.test(chainStr);

        if (pts.length >= 2) {
          const pointsAttr = pts.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ');
          if (isClosed || /^\\fill(?!draw)/.test(line)) {
            elements.push(
              <polygon
                key={`poly-${idx}-${cIdx}`}
                points={pointsAttr}
                fill={/^\\fill/.test(line) || /fill=/.test(line) ? 'rgba(14, 165, 233, 0.16)' : 'none'}
                stroke={strokeColor}
                strokeWidth={isVeryThick ? 2.4 : 1.8}
                strokeDasharray={isDashed ? '5 3' : undefined}
              />
            );
          } else {
            elements.push(
              <polyline
                key={`line-${idx}-${cIdx}`}
                points={pointsAttr}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isVeryThick ? 2.5 : 1.8}
                strokeDasharray={isDashed ? '5 3' : isDotted ? '2 2' : undefined}
                markerEnd={hasArrowEnd || hasArrowBoth ? 'url(#tikz-arrow)' : undefined}
                markerStart={hasArrowBoth ? 'url(#tikz-arrow-start)' : undefined}
              />
            );
          }
        }
      });
    }

    // 4. Các nhãn \node hoặc node[...] at (x,y) {label}
    const nodeAtMatches = [
      ...line.matchAll(/node(?:\[([^\]]*)\])?\s*at\s*(\([^\)]+\))\s*\{([\s\S]*?)\}/g),
    ];
    nodeAtMatches.forEach((nm, nIdx) => {
      const opts = nm[1] || '';
      const pt = resolvePoint(nm[2]);
      const label = cleanLatexLabel(nm[3]);
      if (pt && label) {
        let dx = 0;
        let dy = 5;
        if (/above/.test(opts)) dy = -9;
        if (/below/.test(opts)) dy = 16;
        if (/left/.test(opts)) dx = -13;
        if (/right/.test(opts)) dx = 13;
        elements.push(
          <text
            key={`node-at-${idx}-${nIdx}`}
            x={toSvgX(pt.x) + dx}
            y={toSvgY(pt.y) + dy}
            fill={strokeColor}
            fontFamily={MATH_SERIF}
            fontSize="15"
            fontStyle={/^[A-Za-z][0-9'₁₂₃]*$/.test(label) ? 'italic' : 'normal'}
            fontWeight="bold"
            textAnchor="middle"
          >
            {label}
          </text>
        );
      }
    });

    // Nhãn ở cuối đoạn thẳng hoặc tại điểm: ... (x,y) circle(...) node[right] {label}
    const trailingNodeMatches = [
      ...line.matchAll(
        /(\(\s*[A-Za-z0-9_']+\s*\)|\(\s*-?[\d\.]+\s*,\s*-?[\d\.]+\s*\))\s*(?:circle\s*\([^\)]+\)\s*)?node(?:\[([^\]]*)\])?\s*\{([\s\S]*?)\}/g
      ),
    ];
    trailingNodeMatches.forEach((tm, tIdx) => {
      const pt = resolvePoint(tm[1]);
      const opts = tm[2] || '';
      const label = cleanLatexLabel(tm[3]);
      if (pt && label) {
        let dx = 0;
        let dy = 5;
        if (/above/.test(opts)) dy = -9;
        if (/below/.test(opts)) dy = 16;
        if (/left/.test(opts)) dx = -13;
        if (/right/.test(opts)) dx = 13;
        elements.push(
          <text
            key={`trail-${idx}-${tIdx}`}
            x={toSvgX(pt.x) + dx}
            y={toSvgY(pt.y) + dy}
            fill={strokeColor}
            fontFamily={MATH_SERIF}
            fontSize="15"
            fontStyle={/^[A-Za-z][0-9'₁₂₃]*$/.test(label) ? 'italic' : 'normal'}
            fontWeight="bold"
            textAnchor="middle"
          >
            {label}
          </text>
        );
      }
    });
  });

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-lg mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
    >
      <defs>
        <marker
          id="tikz-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
        </marker>
        <marker
          id="tikz-arrow-start"
          viewBox="0 0 10 10"
          refX="2"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 10 1.5 L 1 5 L 10 8.5 L 8 5 z" fill="#0f172a" />
        </marker>
        <pattern id="tikz-hatch-ne" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" strokeWidth="1.2" />
        </pattern>
      </defs>
      {elements}
    </svg>
  );
}

export const TikzFigure: React.FC<TikzFigureProps> = ({
  type,
  tikzCode,
  className = '',
}) => {

  // Chuẩn mã TikZ tương ứng cho từng hình vẽ toán học (ẩn kết quả bằng dấu ?)
  const getTikzCode = (diagramType?: TikzDiagramType | string): string => {
    if (tikzCode && tikzCode.trim()) {
      return tikzCode.trim();
    }

    switch (diagramType) {
      case 'number_line_intersection':
        return `% TikZ: Biểu diễn giao của hai tập hợp A = [-2; 3] và B = (1; +\\infty)
\\begin{tikzpicture}[>=stealth, scale=1.1]
  % Trục số thực
  \\draw[->, thick] (-3.5,0) -- (4.5,0) node[below] {$\\mathbb{R}$};
  \\fill[pattern=north east lines, pattern color=gray!60] (-3.3,-0.18) rectangle (1,0.18);
  \\fill[pattern=north east lines, pattern color=gray!60] (3,-0.18) rectangle (4.2,0.18);
  \\draw (-2, 0.08) -- (-2, -0.08) node[below=4pt] {$-2$};
  \\draw (1, 0.08) -- (1, -0.08) node[below=4pt] {$?$};
  \\draw (3, 0.08) -- (3, -0.08) node[below=4pt] {$?$};
  \\draw[very thick, blue!80!black] (1, 0) -- (3, 0) node[midway, above=5pt] {$A \\cap B = ?$};
\\end{tikzpicture}`;

      case 'set_difference_venn':
        return `% TikZ: Biểu đồ Ven minh họa hiệu hai tập hợp A \\setminus B = ?
\\begin{tikzpicture}[scale=1.0]
  % Miền A \\setminus B tô gạch chéo
  \\begin{scope}
    \\clip (-0.85, 0) circle (1.4cm);
    \\fill[pattern=north east lines, pattern color=blue!50] (-2.5,-1.6) rectangle (2.5,1.6);
    \\fill[white] (0.85, 0) circle (1.4cm);
  \\end{scope}
  \\draw[thick] (-0.85, 0) circle (1.4cm);
  \\draw[thick] (0.85, 0) circle (1.4cm);
  \\node[above] at (-1.2, 1.4) {$A$};
  \\node[above] at (1.2, 1.4) {$B$};
  \\node[font=\\bfseries, red!80!black] at (-1.35, 0) {$A \\setminus B = ?$};
  \\node at (0, 0) {$?$};
  \\node at (1.35, 0) {$?$};
\\end{tikzpicture}`;

      case 'venn_diagram_40':
        return `% TikZ: Biểu đồ Ven 40 học sinh (CLB Bóng đá A và Cầu lông B)
\\begin{tikzpicture}[scale=1.0]
  \\draw[thick, rounded corners=4pt] (-3.4,-2.0) rectangle (3.4,2.0);
  \\node[anchor=north west] at (-3.2, 1.85) {$n(U) = 40$};
  \\draw[thick, fill=blue!8] (-0.85, -0.05) circle (1.4cm);
  \\draw[thick, fill=teal!8] (0.85, -0.05) circle (1.4cm);
  \\draw[thick] (-0.85, -0.05) circle (1.4cm);
  \\node at (-1.5, 1.45) {Bóng đá $A$ ($25$)};
  \\node at (1.5, 1.45) {Cầu lông $B$ ($18$)};
  \\node[font=\\bfseries] at (-1.35, -0.05) {$?$};
  \\node[font=\\bfseries] at (0, -0.05) {$8$};
  \\node[font=\\bfseries] at (1.35, -0.05) {$?$};
  \\node at (2.4, -1.55) {Ngoài: $?$};
\\end{tikzpicture}`;

      case 'venn_diagram_100':
        return `% TikZ: Biểu đồ Ven 100 học sinh (Toán n(A)=65, Văn n(B)=55)
\\begin{tikzpicture}[scale=1.0]
  \\draw[thick, rounded corners=4pt] (-3.4,-2.0) rectangle (3.4,2.0);
  \\node[anchor=north west] at (-3.2, 1.85) {$n(A \\cup B) = 100$};
  \\draw[thick, fill=blue!8] (-0.85, -0.05) circle (1.4cm);
  \\draw[thick, fill=teal!8] (0.85, -0.05) circle (1.4cm);
  \\draw[thick] (-0.85, -0.05) circle (1.4cm);
  \\node at (-1.5, 1.45) {Toán $n(A) = 65$};
  \\node at (1.5, 1.45) {Văn $n(B) = 55$};
  \\node at (-1.35, -0.05) {$?$};
  \\node[font=\\bfseries, red!80!black] at (0, -0.05) {$A \\cap B = ?$};
  \\node at (1.35, -0.05) {$?$};
\\end{tikzpicture}`;

      case 'bpt_halfplane_2x_y_4':
        return `% TikZ: Miền nghiệm của bất phương trình 2x - y + 4 >= 0
\\begin{tikzpicture}[>=stealth, scale=0.65]
  \\draw[->, thick] (-3.5,0) -- (3.2,0) node[below] {$x$};
  \\draw[->, thick] (0,-1.5) -- (0,5.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  % Đường thẳng d: 2x - y + 4 = 0 qua (-2,0) và (0,4)
  \\fill[pattern=north east lines, pattern color=gray!45] (-3.2,-1.2) -- (-3.2,5.2) -- (0.6,5.2) -- (-2.6,-1.2) -- cycle;
  \\draw[thick, blue!80!black] (-2.6,-1.2) -- (0.6,5.2) node[right] {$2x - y + 4 = 0$};
  \\filldraw (-2,0) circle (2pt) node[below right] {$-2$};
  \\filldraw (0,4) circle (2pt) node[right] {$4$};
  \\node[red!80!black, font=\\bfseries] at (1.3, 2.2) {$M(x; y) = ?$};
\\end{tikzpicture}`;

      case 'feasible_region_quad':
        return `% TikZ: Miền nghiệm tứ giác OABC của hệ BPT trên Oxy
\\begin{tikzpicture}[>=stealth, scale=0.85]
  \\draw[->, thick] (-1.0,0) -- (5.0,0) node[below] {$x$};
  \\draw[->, thick] (0,-0.8) -- (0,4.6) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\fill[blue!15] (0,0) -- (0,1) -- (1,3) -- (4,0) -- cycle;
  \\draw[thick] (-0.4, 4.4) -- (4.4, -0.4) node[above right] {$x+y=4$};
  \\draw[thick] (-0.7, -0.4) -- (1.7, 4.4) node[right] {$2x-y=-1$};
  \\draw[dashed] (1,0) node[below] {$?$} -- (1,3) -- (0,3) node[left] {$?$};
  \\filldraw (0,0) circle (1.8pt);
  \\filldraw (0,1) circle (1.8pt) node[left] {$A$};
  \\filldraw[red!80!black] (1,3) circle (2pt) node[above right] {$B(?; ?)$};
  \\filldraw (4,0) circle (1.8pt) node[below] {$C$};
\\end{tikzpicture}`;

      case 'feasible_region_aircon':
        return `% TikZ: Miền nghiệm bài toán tối ưu x + y <= 100, 2x + y <= 120
\\begin{tikzpicture}[>=stealth, scale=0.036]
  \\draw[->, thick] (-15,0) -- (125,0) node[below] {$x$};
  \\draw[->, thick] (0,-15) -- (0,132) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\fill[blue!15] (0,0) -- (0,100) -- (20,80) -- (60,0) -- cycle;
  \\draw[thick, blue!80!black] (-8, 108) -- (108, -8) node[above right] {$x+y=100$};
  \\draw[thick, teal!80!black] (-4, 128) -- (64, -8) node[right] {$2x+y=120$};
  \\draw[dashed] (20,0) node[below] {$?$} -- (20,80) -- (0,80) node[left] {$?$};
  \\filldraw (0,0) circle (45pt);
  \\filldraw (0,100) circle (45pt) node[left] {$A$};
  \\filldraw[red!80!black] (20,80) circle (55pt) node[above right] {$B(?; ?)$};
  \\filldraw (60,0) circle (45pt) node[below] {$C$};
  \\filldraw (100,0) circle (35pt) node[below] {$100$};
  \\filldraw (0,120) circle (35pt) node[left] {$120$};
\\end{tikzpicture}`;

      case 'trig_unit_circle_supp':
        return `% TikZ: Nửa đường tròn đơn vị biểu diễn hai góc bù nhau alpha và 180^o - alpha
\\begin{tikzpicture}[>=stealth, scale=1.8]
  \\draw[->, thick] (-1.35,0) -- (1.35,0) node[below] {$x$};
  \\draw[->, thick] (0,-0.2) -- (0,1.35) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[thick] (1,0) arc (0:180:1);
  \\coordinate (M) at ({cos(50)}, {sin(50)});
  \\coordinate (N) at ({-cos(50)}, {sin(50)});
  \\draw[thick, blue!80!black] (0,0) -- (M) node[above right] {$M$};
  \\draw[thick, red!75!black] (0,0) -- (N) node[above left] {$M'(?; ?)$};
  \\draw[dashed] (N) -- (M);
  \\draw[dashed] (M) -- ({cos(50)},0) node[below] {$\\cos\\alpha$};
  \\draw[dashed] (N) -- ({-cos(50)},0) node[below] {$?$};
  \\draw (0.28,0) arc (0:50:0.28) node[right=2pt, above=1pt] {$\\alpha$};
  \\draw (0.42,0) arc (0:130:0.42);
  \\node at (-0.18, 0.52) {$180^\\circ-\\alpha$};
\\end{tikzpicture}`;

      case 'triangle_60deg':
        return `% TikZ: Tam giác ABC có b = 5, c = 8 và góc A = 60 độ
\\begin{tikzpicture}[scale=0.55]
  \\coordinate (A) at (0, 0);
  \\coordinate (B) at (8, 0);
  \\coordinate (C) at ({5*cos(60)}, {5*sin(60)});
  \\draw[thick, fill=blue!5] (A) -- (B) node[midway, below] {$c = 8$}
    -- (C) node[midway, above right] {$a = ?$}
    -- cycle node[midway, above left] {$b = 5$};
  \\draw (0.9, 0) arc (0:60:0.9);
  \\node at (1.35, 0.5) {$60^\\circ$};
  \\filldraw (A) circle (2.2pt) node[below left] {$A$};
  \\filldraw (B) circle (2.2pt) node[below right] {$B$};
  \\filldraw (C) circle (2.2pt) node[above] {$C$};
\\end{tikzpicture}`;

      case 'triangle_sin_circumcircle':
        return `% TikZ: Tam giác ABC nội tiếp đường tròn (O; R) với a = 6, góc A = 30 độ
\\begin{tikzpicture}[scale=0.38]
  \\coordinate (O) at (0,0);
  \\draw[thick] (O) circle (6cm);
  \\coordinate (A) at (90:6);
  \\coordinate (B) at (210:6);
  \\coordinate (C) at (330:6);
  \\draw[thick, fill=blue!5] (A) -- (B) -- (C) -- cycle;
  \\draw[dashed, red!75!black] (O) -- (B) node[midway, above left] {$R = ?$};
  \\draw[dashed, red!75!black] (O) -- (C) node[midway, above right] {$R = ?$};
  \\filldraw (O) circle (3pt) node[above] {$O$};
  \\filldraw (A) circle (3pt) node[above] {$A$};
  \\filldraw (B) circle (3pt) node[below left] {$B$};
  \\filldraw (C) circle (3pt) node[below right] {$C$};
  \\node[below] at (0, -3) {$a = BC = 6$};
  \\node[below] at (0, 4.4) {$30^\\circ$};
\\end{tikzpicture}`;

      case 'triangle_obtuse_cos':
        return `% TikZ: Tam giác ABC với b = 3, c = 5, cos A = -1/15 (góc A tù)
\\begin{tikzpicture}[scale=0.65]
  \\coordinate (A) at (0, 0);
  \\coordinate (B) at (5, 0);
  \\coordinate (C) at (-0.2, 2.99);
  \\draw[thick, fill=blue!5] (A) -- (B) node[midway, below] {$c = 5$}
    -- (C) node[midway, above right] {$a = ?$}
    -- cycle node[midway, left] {$b = 3$};
  \\draw (0.7, 0) arc (0:94:0.7);
  \\filldraw (A) circle (2pt) node[below left] {$A$};
  \\filldraw (B) circle (2pt) node[below right] {$B$};
  \\filldraw (C) circle (2pt) node[above] {$C$};
\\end{tikzpicture}`;

      case 'triangle_heron':
        return `% TikZ: Tam giác ABC với 3 cạnh a = 7, b = 8, c = 5
\\begin{tikzpicture}[scale=0.52]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (5,0);
  \\coordinate (C) at (4, 6.93);
  \\draw[thick, fill=blue!5] (A) -- (B) node[midway, below] {$c = 5$}
    -- (C) node[midway, right] {$a = 7$}
    -- cycle node[midway, above left] {$b = 8$};
  \\node[red!80!black, font=\\bfseries] at (2.8, 2.3) {$S = ?$};
  \\filldraw (A) circle (2.2pt) node[below left] {$A$};
  \\filldraw (B) circle (2.2pt) node[below right] {$B$};
  \\filldraw (C) circle (2.2pt) node[above] {$C$};
\\end{tikzpicture}`;

      case 'river_triangulation':
        return `% TikZ: Bài toán đo khoảng cách AB qua hai bờ sông (AC = 60m, góc A = 75^o, góc C = 60^o)
\\begin{tikzpicture}[scale=0.07]
  % Hai bờ sông song song
  \\fill[cyan!12] (-12, 22) rectangle (82, 58);
  \\draw[dashed, blue!60] (-12, 22) -- (82, 22);
  \\draw[dashed, blue!60] (-12, 58) -- (82, 58);
  \\coordinate (C) at (0, 0);
  \\coordinate (A) at (60, 0);
  \\coordinate (B) at (36.8, 63.7);
  \\draw[thick] (C) -- (A) node[midway, below] {$AC = 60\\text{ m}$};
  \\draw[dashed] (C) -- (B);
  \\draw[thick, blue!80!black] (A) -- (B) node[midway, right] {$AB = ?$};
  \\draw (9,0) arc (0:60:9) node[right=4pt, above=2pt] {$60^\\circ$};
  \\draw (51,0) arc (180:105:9) node[left=4pt, above=2pt] {$75^\\circ$};
  \\filldraw (C) circle (14pt) node[below left] {$C$};
  \\filldraw (A) circle (14pt) node[below right] {$A$};
  \\filldraw (B) circle (14pt) node[above] {$B$};
\\end{tikzpicture}`;

      case 'parabola_vertex_2_1':
        return `% TikZ: Đồ thị Parabol (P): y = -x^2 + 4x - 3 có đỉnh I(?; ?)
\\begin{tikzpicture}[>=stealth, scale=0.8]
  \\draw[->, thick] (-0.8,0) -- (4.6,0) node[below] {$x$};
  \\draw[->, thick] (0,-3.4) -- (0,2.2) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\draw[dashed, gray] (2,-3.2) -- (2,1.8);
  \\draw[dashed] (2,0) node[below] {$?$} -- (2,1) -- (0,1) node[left] {$?$};
  \\draw[thick, blue!80!black, domain=-0.1:4.1, samples=60] plot (\\x, {-(\\x)^2 + 4*(\\x) - 3});
  \\filldraw[red!80!black] (2,1) circle (2pt) node[above right] {$I(?; ?)$};
  \\filldraw (1,0) circle (1.8pt) node[below left] {$1$};
  \\filldraw (3,0) circle (1.8pt) node[below right] {$3$};
  \\filldraw (0,-3) circle (1.8pt) node[left] {$-3$};
\\end{tikzpicture}`;

      case 'number_line_minus2_4':
        return `% TikZ: Biểu diễn tập hợp A \\cap B = ? trên trục số (Đề 01 - Phần IV Câu 1)
\\begin{tikzpicture}[>=stealth, scale=0.9]
  \\draw[->, thick] (-4.5,0) -- (6.2,0);
  \\fill[pattern=north east lines, pattern color=gray!65] (-4.3,-0.2) rectangle (-2,0.2);
  \\fill[pattern=north east lines, pattern color=gray!65] (4,-0.2) rectangle (5.8,0.2);
  \\draw[very thick, blue!80!black] (-2,0) -- (4,0) node[midway, above=6pt] {$A \\cap B = ?$};
  \\node[font=\\bfseries, scale=1.2] at (-2,0) {$($};
  \\node[font=\\bfseries, scale=1.2] at (4,0) {$]$};
  \\node[below=6pt] at (-2,0) {$?$};
  \\node[below=6pt] at (4,0) {$?$};
\\end{tikzpicture}`;

      case 'lighthouse_coast':
        return `% TikZ: Bài toán quan sát ngọn hải đăng từ hai vị trí A, B dọc bờ biển (Đề 01 - Phần IV Câu 4)
\\begin{tikzpicture}[>=stealth, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (3.2,0);
  \\coordinate (H) at (4.4,0);
  \\coordinate (C) at (4.4, 4.4);
  % Đường thẳng bờ biển và các tia ngắm
  \\draw[thick] (-0.6,0) -- (5.5,0);
  \\draw[thick] (A) -- (C);
  \\draw[thick] (B) -- (C);
  \\draw[dashed, thick, blue!80!black] (C) -- (H) node[midway, right] {$CH = ?$};
  % Ký hiệu vuông góc tại H
  \\draw (4.15,0) -- (4.15,0.25) -- (4.4,0.25);
  % Cung góc 45 độ tại A và 75 độ tại B
  \\draw (0.65,0) arc (0:45:0.65);
  \\node at (0.95, 0.32) {$45^\\circ$};
  \\draw (3.75,0) arc (0:75:0.55);
  \\node at (3.92, 0.42) {$75^\\circ$};
  % Độ dài AB = 30 m
  \\draw[<->, dashed] (0,-0.45) -- (3.2,-0.45) node[midway, fill=white, inner sep=2pt] {$30\\text{ m}$};
  % Nhãn các đỉnh
  \\filldraw (A) circle (1.5pt) node[above left] {$A$};
  \\filldraw (B) circle (1.5pt) node[above left] {$B$};
  \\filldraw (H) circle (1.5pt) node[below] {$H$};
  \\filldraw (C) circle (1.8pt) node[above] {$C$ (Ngọn hải đăng)};
\\end{tikzpicture}`;

      case 'feasible_region_coffee_cocoa':
        return `% TikZ: Miền nghiệm bài toán trồng cà phê và ca cao: x + y <= 8, 2x + 3y <= 18 (Đề 01 - Phần III Câu 3)
\\begin{tikzpicture}[>=stealth, scale=0.45]
  \\draw[->, thick] (-1.2,0) -- (10.5,0) node[below] {$x$};
  \\draw[->, thick] (0,-1.2) -- (0,9.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\fill[blue!15] (0,0) -- (8,0) -- (6,2) -- (0,6) -- cycle;
  \\draw[thick, blue!80!black] (-0.5, 8.5) -- (8.5, -0.5) node[above right] {$x+y=8$};
  \\draw[thick, teal!80!black] (-0.6, 6.4) -- (9.3, -0.2) node[right] {$2x+3y=18$};
  \\draw[dashed] (6,0) node[below] {$m = ?$} -- (6,2) -- (0,2) node[left] {$n = ?$};
  \\filldraw (0,0) circle (3pt);
  \\filldraw (8,0) circle (3.5pt) node[below] {$A$};
  \\filldraw[red!80!black] (6,2) circle (4pt) node[above right] {$B(m; n) = (?; ?)$};
  \\filldraw (0,6) circle (3.5pt) node[left] {$C$};
\\end{tikzpicture}`;

      case 'venn_diagram_50_10b':
        return `% TikZ: Biểu đồ Ven lớp 11B (50 học sinh: 32 CLB Tiếng Anh, 25 CLB Tin học, 7 không đăng ký)
\\begin{tikzpicture}[scale=1.0]
  \\draw[thick, rounded corners=4pt] (-3.4,-2.0) rectangle (3.4,2.0);
  \\node[anchor=north west] at (-3.2, 1.85) {$n(U) = 50$};
  \\draw[thick, fill=blue!8] (-0.85, -0.05) circle (1.4cm);
  \\draw[thick, fill=teal!8] (0.85, -0.05) circle (1.4cm);
  \\draw[thick] (-0.85, -0.05) circle (1.4cm);
  \\node at (-1.5, 1.45) {Tiếng Anh $A$ ($32$)};
  \\node at (1.5, 1.45) {Tin học $B$ ($25$)};
  \\node at (-1.35, -0.05) {$?$};
  \\node[font=\\bfseries, red!80!black] at (0, -0.05) {$A \\cap B = ?$};
  \\node at (1.35, -0.05) {$?$};
  \\node at (2.3, -1.55) {Ngoài: $7$};
\\end{tikzpicture}`;

      case 'broken_tree_storm':
        return `% TikZ: Bài toán cây bị gãy trong cơn bão (Đề 02 - Phần II Câu 2)
\\begin{tikzpicture}[>=stealth, scale=0.85]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (6,0);
  \\coordinate (C) at (0.89, 3.58);
  % Vẽ tam giác ABC
  \\draw[thick] (A) -- (B) -- (C) -- cycle;
  % Cung góc tại A (76 độ) và tại B (35 độ)
  \\draw (0.65,0) arc (0:76:0.65);
  \\node at (0.85, 0.42) {$76^\\circ$};
  \\draw (4.95,0) arc (180:145:1.05);
  \\node at (4.65, 0.35) {$35^\\circ$};
  % Nhãn các đỉnh và cạnh
  \\node[below left] at (A) {$A$};
  \\node[below right] at (B) {$B$};
  \\node[above] at (C) {$C$};
  \\node[below] at (3,0) {$6\\text{ m}$};
  \\node[left, red!80!black] at (0.4, 1.85) {$AC = ?$};
\\end{tikzpicture}`;

      case 'feasible_region_aloe_asparagus':
        return `% TikZ: Miền nghiệm bài toán trồng nha đam và măng tây: x + y <= 10, x + 3y <= 15 (Đề 02 - Phần III Câu 3)
\\begin{tikzpicture}[>=stealth, scale=0.38]
  \\draw[->, thick] (-1.5,0) -- (16.5,0) node[below] {$x$};
  \\draw[->, thick] (0,-1.5) -- (0,11.5) node[left] {$y$};
  \\node[below left] at (0,0) {$O$};
  \\fill[blue!15] (0,0) -- (10,0) -- (7.5,2.5) -- (0,5) -- cycle;
  \\draw[thick, blue!80!black] (-0.5, 10.5) -- (10.5, -0.5) node[above right] {$x+y=10$};
  \\draw[thick, teal!80!black] (-0.9, 5.3) -- (15.3, -0.1) node[above right] {$x+3y=15$};
  \\draw[dashed] (7.5,0) node[below] {$?$} -- (7.5,2.5) -- (0,2.5) node[left] {$?$};
  \\filldraw (0,0) circle (3.5pt);
  \\filldraw (10,0) circle (4pt) node[below] {$A$};
  \\filldraw[red!80!black] (7.5,2.5) circle (4.5pt) node[above right] {$B(?; ?),\\ F_{\\max} = ?$};
  \\filldraw (0,5) circle (4pt) node[left] {$C$};
\\end{tikzpicture}`;

      case 'venn_diagram_70_tourists':
        return `% TikZ: Biểu đồ Ven khảo sát 70 khách du lịch (45 Nha Trang, 38 Đà Lạt, 8 chưa đến cả hai nơi)
\\begin{tikzpicture}[scale=1.0]
  \\draw[thick, rounded corners=4pt] (-3.4,-2.0) rectangle (3.4,2.0);
  \\node[anchor=north west] at (-3.2, 1.85) {$n(U) = 70$};
  \\draw[thick, fill=blue!8] (-0.85, -0.05) circle (1.4cm);
  \\draw[thick, fill=teal!8] (0.85, -0.05) circle (1.4cm);
  \\draw[thick] (-0.85, -0.05) circle (1.4cm);
  \\node at (-1.5, 1.45) {Nha Trang $A$ ($45$)};
  \\node at (1.5, 1.45) {Đà Lạt $B$ ($38$)};
  \\node at (-1.35, -0.05) {$?$};
  \\node[font=\\bfseries, red!80!black] at (0, -0.05) {$A \\cap B = ?$};
  \\node at (1.35, -0.05) {$?$};
  \\node at (2.3, -1.55) {Ngoài: $8$};
\\end{tikzpicture}`;

      case 'number_line_3_6':
        return `% TikZ: Biểu diễn tập hợp A \\cap B = ? trên trục số (Đề 02 - Phần IV Câu 1)
\\begin{tikzpicture}[>=stealth, scale=0.9]
  \\draw[->, thick] (-3.5,0) -- (7.5,0);
  \\fill[pattern=north east lines, pattern color=gray!65] (-3.3,-0.2) rectangle (1.5,0.2);
  \\fill[pattern=north east lines, pattern color=gray!65] (4.5,-0.2) rectangle (7.1,0.2);
  \\draw[very thick, blue!80!black] (1.5,0) -- (4.5,0) node[midway, above=6pt] {$A \\cap B = ?$};
  \\node[font=\\bfseries, scale=1.2] at (1.5,0) {$($};
  \\node[font=\\bfseries, scale=1.2] at (4.5,0) {$]$};
  \\node[below=6pt] at (1.5,0) {$?$};
  \\node[below=6pt] at (4.5,0) {$?$};
\\end{tikzpicture}`;

      case 'triangle_cos_inscribed_d2':
        return `% TikZ: Tam giác ABC có b = 6 cm, c = 8 cm, góc A = 60 độ, tìm cạnh a = ? và bán kính nội tiếp r = ? (Đề 02 - Phần IV Câu 3)
\\begin{tikzpicture}[>=stealth, scale=0.65]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (8,0);
  \\coordinate (C) at (3, 5.196);
  \\coordinate (I) at (3.42, 1.97);
  \\draw[thick] (A) -- (B) -- (C) -- cycle;
  \\draw[dashed, blue!80!black] (I) circle (1.97cm);
  \\draw[dashed, red!80!black] (I) -- (3.42, 0) node[midway, right] {$r = ?$};
  \\filldraw (I) circle (2pt) node[above left] {$I$};
  \\draw (0.95,0) arc (0:60:0.95);
  \\node at (1.35, 0.45) {$60^\\circ$};
  \\node[below left] at (A) {$A$};
  \\node[below right] at (B) {$B$};
  \\node[above] at (C) {$C$};
  \\node[below] at (4,0) {$c = 8\\text{ cm}$};
  \\node[above left] at (1.5, 2.6) {$b = 6\\text{ cm}$};
  \\node[above right, red!80!black] at (5.5, 2.6) {$a = ?$};
\\end{tikzpicture}`;

      case 'mountain_building_observation':
        return `% TikZ: Quan sát đỉnh núi nhân tạo CD từ hai vị trí A, B của tòa nhà cao 46 m (Đề 02 - Phần IV Câu 4)
\\begin{tikzpicture}[>=stealth, scale=0.85]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (0,2.2);
  \\coordinate (D) at (4.8,0);
  \\coordinate (E) at (4.8,2.2);
  \\coordinate (C) at (4.8,3.8);
  % Tòa nhà AB, ngọn núi CD và mặt đất AD
  \\draw[thick] (A) -- (D) -- (C);
  \\draw[thick] (A) -- (B);
  % Phương nằm ngang BE tại sân thượng
  \\draw[thick] (B) -- (E);
  % Các tia ngắm AC và BC
  \\draw[thick] (A) -- (C);
  \\draw[thick] (B) -- (C);
  % Cung góc 35 độ tại A và 15 độ tại B
  \\draw (0.75,0) arc (0:38:0.75);
  \\node at (1.15, 0.28) {$35^\\circ$};
  \\draw[dashed] (0.85,2.2) arc (0:18:0.85);
  \\node at (1.2, 2.42) {$15^\\circ$};
  % Nhãn các đỉnh và chiều cao
  \\node[below left] at (A) {$A$};
  \\node[left] at (B) {$B$};
  \\node[above] at (C) {$C$};
  \\node[below right] at (D) {$D$};
  \\node[right] at (E) {$E$};
  \\node[left] at (0, 1.1) {$46\\text{ m}$};
  \\node[right, red!80!black] at (4.9, 3.0) {$CD = ?$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_mn':
        return `% TikZ: Hình chóp S.ABCD có đáy là hình bình hành tâm O, M và N là trung điểm SA, SC
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.5,-1.4);
  \\coordinate (C) at (2.5,-1.4);
  \\coordinate (B) at (4.0,0);
  \\coordinate (O) at (1.25,-0.7);
  \\coordinate (S) at (1.1,3.1);
  \\coordinate (M) at (0.55,1.55);
  \\coordinate (N) at (1.8,0.85);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D) (S)--(O);
  \\draw[dashed, very thick, blue!80!black] (M)--(N);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  \\foreach \\p/\\pos in {S/above, A/above left, B/right, C/below right, D/below left, O/below, M/left, N/right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_mnp':
        return `% TikZ: Hình chóp S.ABCD đáy hình bình hành tâm O, M, N, P là trung điểm SA, SB, SD
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.5,-1.4);
  \\coordinate (C) at (2.5,-1.4);
  \\coordinate (B) at (4.0,0);
  \\coordinate (O) at (1.25,-0.7);
  \\coordinate (S) at (1.1,3.1);
  \\coordinate (M) at (0.55,1.55);
  \\coordinate (N) at (2.55,1.55);
  \\coordinate (P) at (-0.2,0.85);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D) (M)--(O);
  \\draw[dashed, very thick, blue!80!black] (M)--(N) (M)--(P);
  \\draw[very thick, blue!80!black] (N)--(P);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  \\foreach \\p/\\pos in {S/above, A/above left, B/right, C/below right, D/below left, O/below, M/left, N/above right, P/left}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'tetrahedron_abcd_g1g2':
        return `% TikZ: Tứ diện ABCD với G_1, G_2 là trọng tâm tam giác ABC và ABD
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.05]
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.8,-1.5);
  \\coordinate (D) at (4.2,0);
  \\coordinate (A) at (1.7,3.1);
  \\coordinate (M) at (0.9,-0.75);
  \\coordinate (N) at (2.1,0);
  \\coordinate (G1) at (1.17,0.53);
  \\coordinate (G2) at (1.97,1.03);
  \\draw[dashed, thick] (B)--(D) (A)--(N) (M)--(N);
  \\draw[dashed, very thick, red!80!black] (G1)--(G2);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D) (A)--(M);
  \\foreach \\p/\\pos in {A/above, B/left, C/below, D/right, M/below left, N/below}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
  \\filldraw[red!80!black] (G1) circle (1.8pt) node[left] {$G_1$};
  \\filldraw[red!80!black] (G2) circle (1.8pt) node[above right] {$G_2$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_sa_perp':
        return `% TikZ: Hình chóp S.ABCD có đáy ABCD là hình vuông và SA vuông góc với (ABCD)
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.4,-1.3);
  \\coordinate (C) at (2.4,-1.3);
  \\coordinate (B) at (3.8,0);
  \\coordinate (S) at (0,3.1);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  % Ký hiệu góc vuông tại A
  \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
  \\draw (0,0.28) -- (-0.22,0.08) -- (-0.22,-0.2);
  \\foreach \\p/\\pos in {S/above, A/above right, B/right, C/below right, D/below left}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'pyramid_sabc_sa_perp':
        return `% TikZ: Hình chóp S.ABC có SA vuông góc với đáy (ABC), M là trung điểm BC
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.5,-1.5);
  \\coordinate (C) at (4.0,0);
  \\coordinate (S) at (0,3.0);
  \\coordinate (M) at (2.75,-0.75);
  \\draw[dashed, thick] (A)--(C) (A)--(M);
  \\draw[thick] (S)--(A) (S)--(B) (S)--(C) (A)--(B) (B)--(C) (S)--(M);
  \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
  \\foreach \\p/\\pos in {S/above, A/left, B/below, C/right, M/below right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'prism_abca1b1c1':
        return `% TikZ: Hình lăng trụ đứng ABC.A'B'C' có đáy ABC vuông cân tại A
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.5,-1.2);
  \\coordinate (C) at (3.8,0);
  \\coordinate (A1) at (0,3.0);
  \\coordinate (B1) at (1.5,1.8);
  \\coordinate (C1) at (3.8,3.0);
  \\draw[dashed, thick] (A)--(C);
  \\draw[thick] (A)--(B) (B)--(C) (A)--(A1) (B)--(B1) (C)--(C1) (A1)--(B1) (B1)--(C1) (A1)--(C1);
  \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
  \\filldraw (A) circle (1.6pt) node[left] {$A$};
  \\filldraw (B) circle (1.6pt) node[below] {$B$};
  \\filldraw (C) circle (1.6pt) node[right] {$C$};
  \\filldraw (A1) circle (1.6pt) node[left] {$A'$};
  \\filldraw (B1) circle (1.6pt) node[below] {$B'$};
  \\filldraw (C1) circle (1.6pt) node[right] {$C'$};
\\end{tikzpicture}`;

      case 'cube_abcd_a1b1c1d1':
        return `% TikZ: Hình lập phương ABCD.A'B'C'D' và mặt phẳng (A'BD)
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.3,-1.1);
  \\coordinate (C) at (2.2,-1.1);
  \\coordinate (B) at (3.5,0);
  \\coordinate (A1) at (0,3.0);
  \\coordinate (D1) at (-1.3,1.9);
  \\coordinate (C1) at (2.2,1.9);
  \\coordinate (B1) at (3.5,3.0);
  \\fill[blue!10, opacity=0.7] (A1)--(B)--(D)--cycle;
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(A1);
  \\draw[dashed, very thick, blue!80!black] (A1)--(B) (A1)--(D) (B)--(D);
  \\draw[thick] (D)--(C) (C)--(B) (D)--(D1) (C)--(C1) (B)--(B1) (A1)--(B1) (B1)--(C1) (C1)--(D1) (D1)--(A1);
  \\filldraw (A) circle (1.6pt) node[above right] {$A$};
  \\filldraw (B) circle (1.6pt) node[right] {$B$};
  \\filldraw (C) circle (1.6pt) node[below right] {$C$};
  \\filldraw (D) circle (1.6pt) node[below left] {$D$};
  \\filldraw (A1) circle (1.6pt) node[above left] {$A'$};
  \\filldraw (B1) circle (1.6pt) node[above right] {$B'$};
  \\filldraw (C1) circle (1.6pt) node[right] {$C'$};
  \\filldraw (D1) circle (1.6pt) node[left] {$D'$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_so':
        return `% TikZ: Hình chóp S.ABCD đáy hình bình hành tâm O, giao tuyến (SAC) \\cap (SBD) = SO
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.5,-1.4);
  \\coordinate (C) at (2.5,-1.4);
  \\coordinate (B) at (4.0,0);
  \\coordinate (O) at (1.25,-0.7);
  \\coordinate (S) at (1.1,3.1);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D);
  \\draw[dashed, very thick, red!80!black] (S)--(O);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B);
  \\foreach \\p/\\pos in {S/above, A/above left, B/right, C/below right, D/below left, O/below}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_ef_intersect':
        return `% TikZ: Hình chóp S.ABCD đáy tứ giác lồi, O = AC \\cap BD, E = AB \\cap CD
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (3.2,0.2);
  \\coordinate (D) at (-1.1,-1.3);
  \\coordinate (C) at (1.8,-1.5);
  \\coordinate (E) at (4.8,0.3);
  \\coordinate (O) at (0.95,-0.62);
  \\coordinate (S) at (0.8,3.0);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (A)--(C) (B)--(D) (S)--(O) (B)--(E);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B) (C)--(E) (S)--(E);
  \\foreach \\p/\\pos in {S/above, A/above left, B/above, C/below, D/below left, O/below, E/right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'tetrahedron_abcd_ij_bc':
        return `% TikZ: Tứ diện ABCD với cát tuyến MN cắt đường thẳng cạnh đáy tại K
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.6,-1.5);
  \\coordinate (D) at (3.8,0);
  \\coordinate (A) at (1.4,3.0);
  \\coordinate (M) at (0.7,1.5);
  \\coordinate (N) at (1.5,0.4);
  \\coordinate (K) at (2.2,-1.1);
  \\draw[dashed, thick] (B)--(D);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D) (M)--(K) (C)--(K);
  \\foreach \\p/\\pos in {A/above, B/left, C/below, D/right, M/left, N/above right, K/below right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'tetrahedron_abcd_ag_centroid':
        return `% TikZ: Tứ diện ABCD với M trung điểm AB, N trung điểm CD và trọng tâm G của tam giác BCD
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.8,-1.5);
  \\coordinate (D) at (4.2,0);
  \\coordinate (A) at (1.6,3.1);
  \\coordinate (M) at (0.8,1.55);
  \\coordinate (N) at (3.0,-0.75);
  \\coordinate (G) at (2.0,-0.5);
  \\draw[dashed, thick] (B)--(D) (B)--(N) (M)--(N) (A)--(G);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D) (A)--(N);
  \\foreach \\p/\\pos in {A/above, B/left, C/below, D/right, M/left, N/below right, G/below}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_sx_parallel':
        return `% TikZ: Hình chóp S.ABCD đáy hình bình hành, M, N trung điểm SA, SB và giao tuyến Sx // AB // CD
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.5,-1.4);
  \\coordinate (C) at (2.5,-1.4);
  \\coordinate (B) at (4.0,0);
  \\coordinate (S) at (1.1,3.1);
  \\coordinate (M) at (0.55,1.55);
  \\coordinate (N) at (2.55,1.55);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(D) (M)--(N) (M)--(D);
  \\draw[thick, red!80!black] (-0.8,3.1)--(3.2,3.1) node[right] {$x$};
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (D)--(C) (C)--(B) (N)--(C);
  \\foreach \\p/\\pos in {S/above, A/above left, B/right, C/below right, D/below left, M/left, N/above right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'tetrahedron_abcd_mnpq':
        return `% TikZ: Tứ diện ABCD và thiết diện hình bình hành MNPQ song song với hai cạnh đối
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.05]
  \\coordinate (B) at (0,0);
  \\coordinate (C) at (1.8,-1.5);
  \\coordinate (D) at (4.2,0);
  \\coordinate (A) at (1.6,3.1);
  \\coordinate (M) at (0.8,1.55);
  \\coordinate (N) at (0.9,-0.75);
  \\coordinate (P) at (3.0,-0.75);
  \\coordinate (Q) at (2.9,1.55);
  \\fill[blue!12, opacity=0.75] (M)--(N)--(P)--(Q)--cycle;
  \\draw[dashed, thick] (B)--(D);
  \\draw[dashed, very thick, blue!80!black] (M)--(Q) (N)--(P);
  \\draw[very thick, blue!80!black] (M)--(N) (P)--(Q);
  \\draw[thick] (A)--(B) (A)--(C) (A)--(D) (B)--(C) (C)--(D);
  \\foreach \\p/\\pos in {A/above, B/left, C/below, D/right, M/left, N/below left, P/below right, Q/right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'pyramid_sabcd_trapezoid':
        return `% TikZ: Hình chóp S.ABCD có đáy ABCD là hình thang (AB // CD, đáy lớn AB)
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=1.0]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (4.2,0);
  \\coordinate (D) at (0.4,-1.4);
  \\coordinate (C) at (2.8,-1.4);
  \\coordinate (O) at (1.65,-0.88);
  \\coordinate (S) at (1.5,3.1);
  \\coordinate (M) at (0.75,1.55);
  \\coordinate (N) at (2.85,1.55);
  \\draw[dashed, thick] (S)--(A) (A)--(B) (A)--(C) (B)--(D) (M)--(N);
  \\draw[thick] (S)--(D) (S)--(C) (S)--(B) (A)--(D) (D)--(C) (C)--(B);
  \\foreach \\p/\\pos in {S/above, A/left, B/right, C/below right, D/below left, O/below, M/left, N/above right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'box_abcd_ab1d1_bc1d':
        return `% TikZ: Hình hộp ABCD.A'B'C'D' với hai mặt phẳng song song (AB'D') // (BC'D) và đường chéo AC'
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (D) at (-1.3,-1.1);
  \\coordinate (C) at (2.3,-1.1);
  \\coordinate (B) at (3.6,0);
  \\coordinate (A1) at (0.4,2.9);
  \\coordinate (D1) at (-0.9,1.8);
  \\coordinate (C1) at (2.7,1.8);
  \\coordinate (B1) at (4.0,2.9);
  \\fill[blue!10, opacity=0.65] (A)--(B1)--(D1)--cycle;
  \\fill[teal!10, opacity=0.65] (B)--(C1)--(D)--cycle;
  \\draw[dashed, thick] (A)--(B) (A)--(D) (A)--(A1) (B)--(D) (A)--(B1) (A)--(D1) (A)--(C1);
  \\draw[thick] (D)--(C) (C)--(B) (D)--(D1) (C)--(C1) (B)--(B1) (A1)--(B1) (B1)--(C1) (C1)--(D1) (D1)--(A1) (B1)--(D1) (B)--(C1) (D)--(C1);
  \\foreach \\p/\\pos in {A/above left, B/right, C/below right, D/below left, A1/above left, B1/above right, C1/right, D1/left}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
\\end{tikzpicture}`;

      case 'prism_abc_mnp':
        return `% TikZ: Hình lăng trụ tam giác ABC.A'B'C' với trung điểm M, N, P và trọng tâm G, G'
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\coordinate (A) at (0,0);
  \\coordinate (B) at (1.6,-1.3);
  \\coordinate (C) at (3.9,0);
  \\coordinate (A1) at (0.3,3.0);
  \\coordinate (B1) at (1.9,1.7);
  \\coordinate (C1) at (4.2,3.0);
  \\coordinate (M) at (0.15,1.5);
  \\coordinate (N) at (1.75,0.2);
  \\coordinate (P) at (4.05,1.5);
  \\fill[blue!10, opacity=0.65] (M)--(N)--(P)--cycle;
  \\draw[dashed, thick] (A)--(C) (M)--(P);
  \\draw[thick] (A)--(B) (B)--(C) (A)--(A1) (B)--(B1) (C)--(C1) (A1)--(B1) (B1)--(C1) (A1)--(C1) (M)--(N) (N)--(P);
  \\foreach \\p/\\pos in {A/left, B/below, C/right, M/left, N/below right, P/right}
    \\filldraw (\\p) circle (1.6pt) node[\\pos] {$\\p$};
  \\filldraw (A1) circle (1.6pt) node[left] {$A'$};
  \\filldraw (B1) circle (1.6pt) node[above] {$B'$};
  \\filldraw (C1) circle (1.6pt) node[right] {$C'$};
\\end{tikzpicture}`;

      case 'thales_three_parallel_planes':
        return `% TikZ: Định lí Thalès trong không gian: 3 mặt phẳng song song (P) // (Q) // (R) và 2 cát tuyến d_1, d_2
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.9]
  \\foreach \\y/\\name in {2.4/P, 0.8/Q, -1.0/R} {
    \\draw[thick, fill=blue!5, opacity=0.85] (-2.8,\\y) -- (1.8,\\y) -- (2.9,\\y+0.75) -- (-1.7,\\y+0.75) -- cycle;
    \\node at (-2.2,\\y+0.25) {$(\\name)$};
  }
  \\draw[thick, blue!80!black] (-0.9,3.2) -- (-0.2,-1.3) node[below] {$d_1$};
  \\draw[thick, red!80!black] (0.8,3.2) -- (1.7,-1.3) node[below] {$d_2$};
  \\filldraw (-0.75,2.75) circle (1.6pt) node[left] {$A$};
  \\filldraw (-0.52,1.15) circle (1.6pt) node[left] {$B$};
  \\filldraw (-0.25,-0.65) circle (1.6pt) node[left] {$C$};
  \\filldraw (0.95,2.75) circle (1.6pt) node[right] {$A'$};
  \\filldraw (1.25,1.15) circle (1.6pt) node[right] {$B'$};
  \\filldraw (1.58,-0.65) circle (1.6pt) node[right] {$C'$};
\\end{tikzpicture}`;

      case 'parallel_projection_plane':
        return `% TikZ: Phép chiếu song song lên mặt phẳng (P) theo phương chiếu l
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\draw[thick, fill=blue!6] (-2.6,-1.4) -- (2.8,-1.4) -- (4.0,0.2) -- (-1.4,0.2) -- cycle;
  \\node at (-1.9,-1.05) {$(P)$};
  \\draw[->, thick, red!80!black] (-2.0,2.5) -- (-1.3,0.7) node[midway, left] {$l$};
  \\coordinate (A) at (-0.6,2.3);
  \\coordinate (B) at (2.1,2.6);
  \\coordinate (M) at (0.75,2.45);
  \\coordinate (A1) at (0.1,-0.6);
  \\coordinate (B1) at (2.8,-0.3);
  \\coordinate (M1) at (1.45,-0.45);
  \\draw[very thick, blue!80!black] (A)--(B);
  \\draw[very thick, teal!80!black] (A1)--(B1);
  \\draw[dashed, thick] (A)--(A1) (M)--(M1) (B)--(B1);
  \\filldraw (A) circle (1.6pt) node[above left] {$A$};
  \\filldraw (M) circle (1.6pt) node[above] {$M$};
  \\filldraw (B) circle (1.6pt) node[above right] {$B$};
  \\filldraw (A1) circle (1.6pt) node[below left] {$A'$};
  \\filldraw (M1) circle (1.6pt) node[below] {$M'$};
  \\filldraw (B1) circle (1.6pt) node[below right] {$B'$};
\\end{tikzpicture}`;

      case 'space_two_planes_intersect':
        return `% TikZ: Hai mặt phẳng (P) và (Q) cắt nhau theo giao tuyến d và đường thẳng a // d
\\begin{tikzpicture}[>=stealth, line join=round, line cap=round, scale=0.95]
  \\draw[thick, fill=blue!6] (-2.4,-1.1) -- (2.4,-1.1) -- (3.4,0.3) -- (-1.4,0.3) -- cycle;
  \\draw[thick, fill=teal!8, opacity=0.8] (-0.8,-0.4) -- (1.8,-0.4) -- (1.8,2.1) -- (-0.8,2.1) -- cycle;
  \\draw[very thick, red!80!black] (-1.3,-0.4) -- (2.5,-0.4) node[right] {$d$};
  \\draw[very thick, blue!80!black] (-0.5,1.4) -- (1.5,1.4) node[right] {$a$};
  \\node at (-1.8,-0.8) {$(P)$};
  \\node at (-0.4,1.8) {$(Q)$};
\\end{tikzpicture}`;

      default:
        return '';
    }
  };

  // Render SVG hình vẽ trực quan chuẩn phong cách xuất bản LaTeX TikZ (nền giấy trắng kỹ thuật, font Times New Roman, ẩn đáp số bằng dấu ?)
  const renderSvgDiagram = () => {
    if (tikzCode && tikzCode.trim()) {
      return renderCustomTikzToSvg(tikzCode);
    }

    switch (type) {
      case 'number_line_intersection':
        return (
          <svg
            viewBox="0 0 520 115"
            className="w-full max-w-lg mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="nl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
              <pattern id="nl-hatch-ne" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#64748b" strokeWidth="1.2" />
              </pattern>
              <pattern id="nl-hatch-nw" width="7" height="7" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#94a3b8" strokeWidth="1.1" />
              </pattern>
            </defs>

            {/* Vùng gạch chéo bị loại */}
            <rect x="36" y="43" width="84" height="24" fill="url(#nl-hatch-ne)" />
            <rect x="370" y="43" width="95" height="24" fill="url(#nl-hatch-ne)" />
            <rect x="36" y="43" width="234" height="24" fill="url(#nl-hatch-nw)" />

            {/* Trục số thực R */}
            <line x1="30" y1="55" x2="480" y2="55" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#nl-arrow)" />
            <text x="492" y="60" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold">
              ℝ
            </text>

            {/* Phần giao lấy nghiệm tô đậm với dấu chấm hỏi ? */}
            <line x1="270" y1="55" x2="370" y2="55" stroke="#1d4ed8" strokeWidth="3.5" />

            {/* Vạch chia và dấu chấm hỏi tại biên nghiệm */}
            {[
              { val: '−2', x: 120, color: '#0f172a' },
              { val: '0', x: 220, color: '#0f172a' },
              { val: '?', x: 270, color: '#dc2626' },
              { val: '?', x: 370, color: '#dc2626' },
            ].map((item, idx) => (
              <g key={idx}>
                <line x1={item.x} y1="48" x2={item.x} y2="62" stroke="#0f172a" strokeWidth="1.5" />
                <text
                  x={item.x}
                  y="85"
                  fill={item.color}
                  fontFamily={MATH_SERIF}
                  fontSize="16"
                  fontWeight={item.val === '?' ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {item.val}
                </text>
              </g>
            ))}

            {/* Dấu ngoặc tại -2 và dấu ? tại miền giao */}
            <text x="120" y="61" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="22" fontWeight="bold" textAnchor="middle">
              [
            </text>

            {/* Nhãn chú thích */}
            <text x="320" y="30" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
          </svg>
        );

      case 'set_difference_venn':
        return (
          <svg
            viewBox="0 0 420 210"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <pattern id="venn-diff-hatch" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#2563eb" strokeWidth="1.2" opacity="0.55" />
              </pattern>
              <clipPath id="clip-circle-a">
                <circle cx="165" cy="110" r="72" />
              </clipPath>
            </defs>

            {/* Miền A \ B gạch chéo chuẩn TikZ */}
            <g clipPath="url(#clip-circle-a)">
              <rect x="80" y="30" width="170" height="160" fill="url(#venn-diff-hatch)" />
              <circle cx="255" cy="110" r="72" fill="#ffffff" />
            </g>

            {/* Hai đường tròn A và B */}
            <circle cx="165" cy="110" r="72" fill="none" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="255" cy="110" r="72" fill="none" stroke="#0f172a" strokeWidth="1.8" />

            {/* Tên tập hợp A, B */}
            <text x="125" y="30" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="17" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <text x="285" y="30" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="17" fontStyle="italic" fontWeight="bold">
              B
            </text>

            {/* Dấu chấm hỏi ? ở các miền thay vì hiện sẵn đáp án */}
            <rect x="104" y="96" width="60" height="26" rx="4" fill="#ffffff" fillOpacity="0.9" />
            <text x="134" y="115" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold" textAnchor="middle">
              A \ B = ?
            </text>

            <text x="210" y="115" fill="#475569" fontFamily={MATH_SERIF} fontSize="17" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="288" y="115" fill="#475569" fontFamily={MATH_SERIF} fontSize="17" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="210" y="198" fill="#334155" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              Miền gạch chéo biểu diễn hiệu A \ B = ?
            </text>
          </svg>
        );

      case 'venn_diagram_40':
        return (
          <svg
            viewBox="0 0 450 230"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Tập vũ trụ U = 40 */}
            <rect x="20" y="18" width="410" height="194" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <text x="34" y="42" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              n(U) = 40
            </text>

            {/* Hai tập hợp A (Bóng đá) và B (Cầu lông) */}
            <circle cx="175" cy="118" r="74" fill="#eff6ff" fillOpacity="0.7" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="275" cy="118" r="74" fill="#f0fdf4" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="175" cy="118" r="74" fill="none" stroke="#0f172a" strokeWidth="1.8" />

            <text x="140" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Bóng đá A (25)
            </text>
            <text x="310" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Cầu lông B (18)
            </text>

            <text x="135" y="122" fill="#1e3a8a" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="225" y="122" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              8
            </text>
            <text x="315" y="122" fill="#065f46" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="225" y="142" fill="#475569" fontFamily={MATH_SERIF} fontSize="12" fontStyle="italic" textAnchor="middle">
              A ∩ B
            </text>
            <text x="372" y="198" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              Ngoài: ?
            </text>
          </svg>
        );

      case 'venn_diagram_100':
        return (
          <svg
            viewBox="0 0 450 230"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <rect x="20" y="18" width="410" height="194" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <text x="34" y="42" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              n(A ∪ B) = 100
            </text>

            <circle cx="175" cy="118" r="74" fill="#eff6ff" fillOpacity="0.7" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="275" cy="118" r="74" fill="#f0fdf4" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="175" cy="118" r="74" fill="none" stroke="#0f172a" strokeWidth="1.8" />

            <text x="135" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Toán: n(A) = 65
            </text>
            <text x="315" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Ngữ văn: n(B) = 55
            </text>

            <text x="135" y="122" fill="#1e3a8a" fontFamily={MATH_SERIF} fontSize="18" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="225" y="122" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="17" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
            <text x="315" y="122" fill="#065f46" fontFamily={MATH_SERIF} fontSize="18" fontWeight="bold" textAnchor="middle">
              ?
            </text>
          </svg>
        );

      case 'bpt_halfplane_2x_y_4':
        return (
          <svg
            viewBox="0 0 380 280"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="bpt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
              <pattern id="bpt-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" strokeWidth="1.1" />
              </pattern>
            </defs>

            {/* Gốc tọa độ O(200, 210), 1 đơn vị = 35px */}
            {/* Nửa mặt phẳng bị gạch bỏ: 2x - y + 4 < 0 */}
            <polygon points="30,25 222,25 112,245 30,245" fill="url(#bpt-hatch)" />

            {/* Trục Ox, Oy */}
            <line x1="30" y1="210" x2="345" y2="210" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#bpt-arrow)" />
            <text x="352" y="224" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              x
            </text>
            <line x1="200" y1="255" x2="200" y2="22" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#bpt-arrow)" />
            <text x="184" y="28" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              y
            </text>
            <text x="186" y="226" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Đường thẳng d: 2x - y + 4 = 0 qua (-2,0)=(130,210) và (0,4)=(200,70) */}
            <line x1="112" y1="246" x2="222" y2="26" stroke="#1d4ed8" strokeWidth="2.2" />
            <text x="230" y="48" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              2x − y + 4 = 0
            </text>

            {/* Giao điểm với trục: (-2, 0) và (0, 4) */}
            <circle cx="130" cy="210" r="3" fill="#0f172a" />
            <text x="132" y="228" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              −2
            </text>
            <circle cx="200" cy="70" r="3" fill="#0f172a" />
            <text x="208" y="75" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              4
            </text>

            {/* Dấu chấm hỏi ? trong miền nghiệm thay vì vẽ sẵn điểm đáp án (1; 2) */}
            <text x="268" y="142" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              (x; y) = ?
            </text>
          </svg>
        );

      case 'feasible_region_quad':
        return (
          <svg
            viewBox="0 0 400 310"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="quad-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            {/* Gốc O(95, 245), 1 đơn vị = 48px */}
            <polygon
              points="95,245 95,197 143,101 287,245"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2"
            />

            {/* Trục tọa độ Ox, Oy */}
            <line x1="35" y1="245" x2="355" y2="245" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#quad-arrow)" />
            <text x="362" y="258" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              x
            </text>
            <line x1="95" y1="285" x2="95" y2="22" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#quad-arrow)" />
            <text x="78" y="28" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              y
            </text>
            <text x="78" y="262" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Đường d1: x + y = 4 */}
            <line x1="75" y1="33" x2="312" y2="270" stroke="#0f172a" strokeWidth="1.5" />
            <text x="235" y="135" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              x + y = 4
            </text>

            {/* Đường d2: 2x - y = -1 */}
            <line x1="59" y1="269" x2="175" y2="37" stroke="#0f172a" strokeWidth="1.5" />
            <text x="172" y="55" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              2x − y = −1
            </text>

            {/* Đường gióng nét đứt từ đỉnh B(?; ?) */}
            <line x1="143" y1="245" x2="143" y2="101" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="95" y1="101" x2="143" y2="101" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="143" y="262" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="82" y="105" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="end">
              ?
            </text>

            {/* Các đỉnh O, A, B, C */}
            <circle cx="95" cy="245" r="3" fill="#0f172a" />
            <circle cx="95" cy="197" r="3.2" fill="#1d4ed8" />
            <text x="85" y="198" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" textAnchor="end">
              A
            </text>

            <circle cx="143" cy="101" r="3.5" fill="#dc2626" />
            <text x="152" y="100" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              B(?; ?)
            </text>

            <circle cx="287" cy="245" r="3.2" fill="#1d4ed8" />
            <text x="287" y="264" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" textAnchor="middle">
              C
            </text>
          </svg>
        );

      case 'feasible_region_aircon':
        return (
          <svg
            viewBox="0 0 410 315"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="ac-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            <polygon
              points="80,255 80,75 116,111 188,255"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2"
            />

            {/* Trục tọa độ Ox, Oy */}
            <line x1="40" y1="255" x2="345" y2="255" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#ac-arrow)" />
            <text x="355" y="268" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              x
            </text>
            <line x1="80" y1="285" x2="80" y2="18" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#ac-arrow)" />
            <text x="64" y="25" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              y
            </text>
            <text x="65" y="272" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Đường d1: x + y = 100 */}
            <line x1="65" y1="60" x2="278" y2="273" stroke="#0f172a" strokeWidth="1.5" />
            <text x="232" y="185" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              x + y = 100
            </text>

            {/* Đường d2: 2x + y = 120 */}
            <line x1="72" y1="23" x2="198" y2="275" stroke="#0f172a" strokeWidth="1.5" />
            <text x="148" y="68" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              2x + y = 120
            </text>

            {/* Đường gióng nét đứt từ đỉnh B(?; ?) */}
            <line x1="116" y1="255" x2="116" y2="111" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="80" y1="111" x2="116" y2="111" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="116" y="272" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="72" y="115" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="end">
              ?
            </text>

            {/* Điểm mốc trên trục */}
            <circle cx="80" cy="39" r="2.5" fill="#0f172a" />
            <text x="72" y="43" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" textAnchor="end">
              120
            </text>
            <circle cx="260" cy="255" r="2.5" fill="#0f172a" />
            <text x="260" y="272" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" textAnchor="middle">
              100
            </text>

            {/* Các đỉnh miền nghiệm OABC */}
            <circle cx="80" cy="255" r="3" fill="#0f172a" />
            <circle cx="80" cy="75" r="3.2" fill="#1d4ed8" />
            <text x="72" y="78" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="end">
              A
            </text>

            <circle cx="116" cy="111" r="3.8" fill="#dc2626" />
            <text x="125" y="112" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              B(?; ?)
            </text>

            <circle cx="188" cy="255" r="3.2" fill="#1d4ed8" />
            <text x="188" y="272" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              C
            </text>
          </svg>
        );

      case 'trig_unit_circle_supp':
        return (
          <svg
            viewBox="0 0 400 225"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="trig-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            {/* Gốc O(200, 180), R = 120px */}
            <line x1="35" y1="180" x2="365" y2="180" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#trig-arrow)" />
            <text x="372" y="194" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              x
            </text>
            <line x1="200" y1="205" x2="200" y2="20" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#trig-arrow)" />
            <text x="184" y="28" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              y
            </text>
            <text x="186" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Nửa đường tròn đơn vị bán kính R = 1 */}
            <path d="M 320,180 A 120,120 0 0 0 80,180" fill="none" stroke="#0f172a" strokeWidth="1.8" />
            <text x="322" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13">
              1
            </text>
            <text x="72" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" textAnchor="end">
              −1
            </text>
            <text x="208" y="56" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13">
              1
            </text>

            {/* Điểm M ứng với góc alpha và M' ứng với 180 - alpha */}
            <line x1="123" y1="88" x2="277" y2="88" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="277" y1="88" x2="277" y2="180" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="123" y1="88" x2="123" y2="180" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />

            <line x1="200" y1="180" x2="277" y2="88" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="200" y1="180" x2="123" y2="88" stroke="#dc2626" strokeWidth="2" />

            {/* Cung góc alpha và 180 - alpha */}
            <path d="M 232,180 A 32,32 0 0 0 220,155" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="242" y="168" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              α
            </text>

            <path d="M 246,180 A 46,46 0 0 0 170,145" fill="none" stroke="#dc2626" strokeWidth="1.4" />
            <text x="165" y="132" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              180° − α
            </text>

            <circle cx="277" cy="88" r="3.2" fill="#1d4ed8" />
            <text x="286" y="84" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              M
            </text>
            <circle cx="123" cy="88" r="3.2" fill="#dc2626" />
            <text x="112" y="84" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold" textAnchor="end">
              M&apos;
            </text>

            <text x="277" y="196" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              cos α
            </text>
            <text x="123" y="196" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="212" y="84" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold">
              ?
            </text>
          </svg>
        );

      case 'triangle_60deg':
        return (
          <svg
            viewBox="0 0 380 225"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Tam giác ABC: A(55, 185), B(315, 185) [c=8], C(136, 44) [b=5, góc A = 60°] */}
            <polygon
              points="55,185 315,185 136,44"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Cung góc A = 60° */}
            <path d="M 93,185 A 38,38 0 0 0 74,152" fill="#dbeafe" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="1.6" />
            <text x="102" y="170" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold">
              60°
            </text>

            {/* Độ dài các cạnh */}
            <text x="185" y="206" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              c = 8
            </text>
            <text x="76" y="108" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              b = 5
            </text>
            <text x="242" y="108" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              a = ?
            </text>

            {/* Các đỉnh A, B, C */}
            <circle cx="55" cy="185" r="3" fill="#0f172a" />
            <text x="40" y="195" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <circle cx="315" cy="185" r="3" fill="#0f172a" />
            <text x="326" y="195" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              B
            </text>
            <circle cx="136" cy="44" r="3" fill="#0f172a" />
            <text x="136" y="32" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              C
            </text>
          </svg>
        );

      case 'triangle_sin_circumcircle':
        return (
          <svg
            viewBox="0 0 360 235"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Đường tròn ngoại tiếp tâm O(180, 120), R = 88px */}
            <circle cx="180" cy="120" r="88" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.6" />

            {/* Tam giác ABC nội tiếp: A(180, 32), B(104, 164), C(256, 164) */}
            <polygon
              points="180,32 104,164 256,164"
              fill="#eff6ff"
              fillOpacity="0.45"
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Cung góc A = 30° */}
            <path d="M 164,60 A 32,32 0 0 0 196,60" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="180" y="76" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontWeight="bold" textAnchor="middle">
              30°
            </text>

            {/* Bán kính R từ tâm O tới B và C */}
            <line x1="180" y1="120" x2="256" y2="164" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="180" cy="120" r="3" fill="#dc2626" />
            <text x="174" y="114" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              O
            </text>
            <text x="224" y="136" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              R = ?
            </text>

            {/* Cạnh a = 6 */}
            <text x="180" y="182" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              a = 6
            </text>

            {/* Đỉnh A, B, C */}
            <circle cx="180" cy="32" r="3" fill="#0f172a" />
            <text x="180" y="22" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A
            </text>
            <circle cx="104" cy="164" r="3" fill="#0f172a" />
            <text x="88" y="174" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              B
            </text>
            <circle cx="256" cy="164" r="3" fill="#0f172a" />
            <text x="266" y="174" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              C
            </text>
          </svg>
        );

      case 'triangle_obtuse_cos':
        return (
          <svg
            viewBox="0 0 380 220"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Tam giác ABC với góc A tù (cos A = -1/15): A(110, 180), B(320, 180) [c=5], C(98, 52) [b=3] */}
            <polygon
              points="110,180 320,180 98,52"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <path d="M 140,180 A 30,30 0 0 0 107,150" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="152" y="166" fill="#b45309" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              cos A = −1/15
            </text>

            <text x="215" y="202" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              c = 5
            </text>
            <text x="82" y="122" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="end">
              b = 3
            </text>
            <text x="225" y="106" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              a = ?
            </text>

            <circle cx="110" cy="180" r="3" fill="#0f172a" />
            <text x="95" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <circle cx="320" cy="180" r="3" fill="#0f172a" />
            <text x="330" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              B
            </text>
            <circle cx="98" cy="52" r="3" fill="#0f172a" />
            <text x="98" y="38" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              C
            </text>
          </svg>
        );

      case 'triangle_heron':
        return (
          <svg
            viewBox="0 0 380 230"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Tam giác ABC: A(55, 190), B(315, 190), C(215, 42) */}
            <polygon
              points="55,190 315,190 215,42"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="2"
            />
            <circle
              cx="190"
              cy="134"
              r="36"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="1.3"
              strokeDasharray="4 3"
            />
            <circle cx="190" cy="134" r="2.5" fill="#1d4ed8" />
            <text x="190" y="138" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              S = ?
            </text>

            <text x="185" y="210" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              c = 5
            </text>
            <text x="118" y="108" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              b = 8
            </text>
            <text x="280" y="108" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              a = 7
            </text>

            <circle cx="55" cy="190" r="3" fill="#0f172a" />
            <text x="40" y="202" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <circle cx="315" cy="190" r="3" fill="#0f172a" />
            <text x="326" y="202" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              B
            </text>
            <circle cx="215" cy="42" r="3" fill="#0f172a" />
            <text x="215" y="30" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              C
            </text>
          </svg>
        );

      case 'river_triangulation':
        return (
          <svg
            viewBox="0 0 420 250"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Dải sông giữa hai bờ */}
            <rect x="15" y="82" width="390" height="76" fill="#e0f2fe" />
            <line x1="15" y1="82" x2="405" y2="82" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="6 4" />
            <line x1="15" y1="158" x2="405" y2="158" stroke="#0284c7" strokeWidth="1.4" strokeDasharray="6 4" />
            <text x="36" y="124" fill="#0369a1" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              Khúc sông
            </text>

            {/* Tam giác đo đạc: C(75, 205), A(295, 205) [AC=60m], B(185, 42) */}
            <line x1="75" y1="205" x2="295" y2="205" stroke="#0f172a" strokeWidth="2.2" />
            <line x1="75" y1="205" x2="185" y2="42" stroke="#475569" strokeWidth="1.6" strokeDasharray="5 3" />
            <line x1="295" y1="205" x2="185" y2="42" stroke="#1d4ed8" strokeWidth="2.2" />

            {/* Cung góc C = 60° và góc A = 75° */}
            <path d="M 105,205 A 30,30 0 0 0 92,180" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            <text x="112" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" fontWeight="bold">
              60°
            </text>

            <path d="M 265,205 A 30,30 0 0 1 278,180" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            <text x="242" y="196" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13" fontWeight="bold">
              75°
            </text>

            <text x="185" y="226" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              AC = 60 m
            </text>
            <text x="256" y="122" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              AB = ?
            </text>

            <circle cx="75" cy="205" r="3.2" fill="#0f172a" />
            <text x="58" y="214" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              C
            </text>
            <circle cx="295" cy="205" r="3.2" fill="#0f172a" />
            <text x="306" y="214" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <circle cx="185" cy="42" r="3.5" fill="#1d4ed8" />
            <text x="185" y="28" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              B
            </text>
          </svg>
        );

      case 'parabola_vertex_2_1':
        return (
          <svg
            viewBox="0 0 380 260"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="para-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            <line x1="40" y1="100" x2="340" y2="100" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#para-arrow)" />
            <text x="348" y="114" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              x
            </text>
            <line x1="110" y1="245" x2="110" y2="18" stroke="#0f172a" strokeWidth="1.6" markerEnd="url(#para-arrow)" />
            <text x="94" y="26" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              y
            </text>
            <text x="96" y="116" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Trục đối xứng */}
            <line x1="194" y1="22" x2="194" y2="242" stroke="#64748b" strokeWidth="1.2" strokeDasharray="5 3" />
            <line x1="110" y1="58" x2="194" y2="58" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 3" />

            {/* Đường cong Parabol */}
            <path
              d="M 106,238 Q 194,-116 282,238"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2.2"
            />

            <circle cx="194" cy="58" r="3.5" fill="#dc2626" />
            <text x="204" y="52" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              I(?; ?)
            </text>
            <circle cx="152" cy="100" r="2.8" fill="#0f172a" />
            <text x="144" y="116" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13">
              1
            </text>
            <text x="198" y="116" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold">
              ?
            </text>
            <circle cx="236" cy="100" r="2.8" fill="#0f172a" />
            <text x="244" y="116" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13">
              3
            </text>
            <text x="96" y="62" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold">
              ?
            </text>
            <circle cx="110" cy="226" r="2.8" fill="#0f172a" />
            <text x="88" y="230" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="13">
              −3
            </text>
          </svg>
        );

      case 'number_line_minus2_4':
        return (
          <svg
            viewBox="0 0 520 115"
            className="w-full max-w-lg mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="nl24-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
              <pattern id="nl24-hatch" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#475569" strokeWidth="1.25" />
              </pattern>
            </defs>

            {/* Vùng gạch chéo ngoài tập hợp giao */}
            <rect x="36" y="42" width="129" height="26" fill="url(#nl24-hatch)" />
            <rect x="355" y="42" width="113" height="26" fill="url(#nl24-hatch)" />

            {/* Trục số thực */}
            <line x1="30" y1="55" x2="482" y2="55" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#nl24-arrow)" />

            {/* Đoạn nghiệm tô đậm */}
            <line x1="165" y1="55" x2="355" y2="55" stroke="#1d4ed8" strokeWidth="3.5" />

            {/* Dấu ngoặc tại hai đầu mút */}
            <text x="165" y="62" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="24" fontWeight="bold" textAnchor="middle">
              (
            </text>
            <text x="355" y="62" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="24" fontWeight="bold" textAnchor="middle">
              ]
            </text>

            {/* Dấu chấm hỏi ? tại hai đầu mút thay vì hiện sẵn -2 và 4 */}
            <text x="165" y="88" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="355" y="88" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="260" y="25" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
          </svg>
        );

      case 'lighthouse_coast':
        return (
          <svg
            viewBox="0 0 460 250"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="lh-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
              <marker id="lh-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 10 1.5 L 1 5 L 10 8.5 L 8 5 z" fill="#0f172a" />
              </marker>
            </defs>

            {/* Đường bờ biển nằm ngang: A(75, 185), B(255, 185), H(335, 185), C(335, 42) */}
            <line x1="25" y1="185" x2="430" y2="185" stroke="#0f172a" strokeWidth="1.9" />

            {/* Tia ngắm AC và BC */}
            <line x1="75" y1="185" x2="335" y2="42" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="255" y1="185" x2="335" y2="42" stroke="#0f172a" strokeWidth="1.8" />

            {/* Đường vuông góc CH nét đứt */}
            <line x1="335" y1="42" x2="335" y2="185" stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="5 4" />

            {/* Ký hiệu góc vuông tại H(335, 185) */}
            <polyline points="323,185 323,173 335,173" fill="none" stroke="#0f172a" strokeWidth="1.3" />

            {/* Cung góc 45° tại A(75, 185) */}
            <path d="M 122,185 A 47,47 0 0 0 112,165" fill="none" stroke="#0f172a" strokeWidth="1.4" />
            <text x="135" y="176" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              45°
            </text>

            {/* Cung góc 75° tại B(255, 185) */}
            <path d="M 290,185 A 35,35 0 0 0 272,155" fill="none" stroke="#0f172a" strokeWidth="1.4" />
            <text x="295" y="173" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              75°
            </text>

            {/* Gióng kích thước AB = 30 m phía dưới */}
            <line x1="75" y1="185" x2="75" y2="222" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="255" y1="185" x2="255" y2="222" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
            <line
              x1="78"
              y1="214"
              x2="252"
              y2="214"
              stroke="#0f172a"
              strokeWidth="1.3"
              strokeDasharray="4 3"
              markerStart="url(#lh-arrow-start)"
              markerEnd="url(#lh-arrow-end)"
            />
            <rect x="142" y="203" width="46" height="20" fill="#ffffff" />
            <text x="165" y="218" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              30 m
            </text>

            {/* Biểu tượng ngọn hải đăng tại đỉnh C(335, 42) */}
            <polygon points="329,42 341,42 338,22 332,22" fill="#dc2626" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="335" cy="18" r="4" fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />
            <line x1="322" y1="15" x2="313" y2="11" stroke="#f59e0b" strokeWidth="1.4" />
            <line x1="348" y1="15" x2="357" y2="11" stroke="#f59e0b" strokeWidth="1.4" />

            {/* Nhãn các điểm A, B, H, C */}
            <circle cx="75" cy="185" r="3" fill="#0f172a" />
            <text x="68" y="175" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>

            <circle cx="255" cy="185" r="3" fill="#0f172a" />
            <text x="242" y="175" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              B
            </text>

            <circle cx="335" cy="185" r="3" fill="#0f172a" />
            <text x="335" y="204" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              H
            </text>

            <circle cx="335" cy="42" r="3" fill="#1d4ed8" />
            <text x="352" y="42" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              C
            </text>
            <text x="346" y="118" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              CH = ?
            </text>
          </svg>
        );

      case 'feasible_region_coffee_cocoa':
        return (
          <svg
            viewBox="0 0 410 300"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="cc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            <polygon
              points="80,240 272,240 224,192 80,96"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2"
            />

            {/* Trục Ox, Oy */}
            <line x1="40" y1="240" x2="355" y2="240" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#cc-arrow)" />
            <text x="364" y="253" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              x
            </text>
            <line x1="80" y1="275" x2="80" y2="20" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#cc-arrow)" />
            <text x="64" y="28" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              y
            </text>
            <text x="64" y="256" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Đường d1: x + y = 8 */}
            <line x1="65" y1="33" x2="290" y2="258" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="155" y="95" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              x + y = 8
            </text>

            {/* Đường d2: 2x + 3y = 18 */}
            <line x1="62" y1="84" x2="314" y2="252" stroke="#0f766e" strokeWidth="1.5" />
            <text x="242" y="172" fill="#0f766e" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              2x + 3y = 18
            </text>

            {/* Đường gióng nét đứt từ đỉnh tối ưu B(m; n) = (?; ?) */}
            <line x1="224" y1="240" x2="224" y2="192" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="80" y1="192" x2="224" y2="192" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="224" y="258" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              m = ?
            </text>
            <text x="74" y="196" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" fontWeight="bold" textAnchor="end">
              n = ?
            </text>

            {/* Các đỉnh O, A, B, C */}
            <circle cx="80" cy="240" r="3" fill="#0f172a" />
            <circle cx="272" cy="240" r="3.2" fill="#1d4ed8" />
            <text x="272" y="258" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              A
            </text>

            <circle cx="224" cy="192" r="3.8" fill="#dc2626" />
            <text x="234" y="188" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              B(m; n) = (?; ?)
            </text>

            <circle cx="80" cy="96" r="3.2" fill="#1d4ed8" />
            <text x="72" y="99" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="end">
              C
            </text>
          </svg>
        );

      case 'venn_diagram_50_10b':
        return (
          <svg
            viewBox="0 0 450 230"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <rect x="20" y="18" width="410" height="194" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <text x="34" y="42" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              Lớp 11B: n(U) = 50
            </text>

            <circle cx="175" cy="118" r="74" fill="#eff6ff" fillOpacity="0.7" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="275" cy="118" r="74" fill="#f0fdf4" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="175" cy="118" r="74" fill="none" stroke="#0f172a" strokeWidth="1.8" />

            <text x="145" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              CLB Tiếng Anh (32)
            </text>
            <text x="310" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              CLB Tin học (25)
            </text>

            <text x="135" y="122" fill="#1e3a8a" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="225" y="118" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="22" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="315" y="122" fill="#065f46" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="225" y="142" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
            <text x="372" y="198" fill="#475569" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              Ngoài: 7
            </text>
          </svg>
        );

      case 'broken_tree_storm':
        return (
          <svg
            viewBox="0 0 380 235"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Đỉnh A(65, 195), B(325, 195), C(108, 25) */}
            <polygon
              points="65,195 325,195 108,25"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />

            {/* Cung góc 76° tại A */}
            <path
              d="M 93 195 A 28 28 0 0 0 72 168"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            <text x="95" y="182" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              76°
            </text>

            {/* Cung góc 35° tại B */}
            <path
              d="M 283 195 A 42 42 0 0 1 291 170"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            <text x="248" y="185" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              35°
            </text>

            {/* Nhãn các đỉnh A, B, C */}
            <text x="50" y="210" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              A
            </text>
            <text x="334" y="202" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              B
            </text>
            <text x="108" y="16" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" textAnchor="middle">
              C
            </text>

            {/* Độ dài AB = 6 m và các đại lượng cần tìm có dấu ? */}
            <text x="195" y="214" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" textAnchor="middle">
              6 m
            </text>
            <text x="64" y="108" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold" textAnchor="end">
              AC = ?
            </text>
          </svg>
        );

      case 'feasible_region_aloe_asparagus':
        return (
          <svg
            viewBox="0 0 420 290"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="aa-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
            </defs>

            {/* Gốc O(70, 235), 1 đơn vị = 18px: O(70,235), A(10,0)->(250,235), B(7.5,2.5)->(205,190), C(0,5)->(70,145) */}
            <polygon
              points="70,235 250,235 205,190 70,145"
              fill="#dbeafe"
              stroke="#1d4ed8"
              strokeWidth="2"
            />

            {/* Trục Ox, Oy */}
            <line x1="35" y1="235" x2="365" y2="235" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#aa-arrow)" />
            <text x="375" y="248" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              x
            </text>
            <line x1="70" y1="268" x2="70" y2="22" stroke="#0f172a" strokeWidth="1.7" markerEnd="url(#aa-arrow)" />
            <text x="54" y="30" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic">
              y
            </text>
            <text x="54" y="252" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic">
              O
            </text>

            {/* Đường d1: x + y = 10 */}
            <line x1="58" y1="43" x2="264" y2="249" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="135" y="102" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              x + y = 10
            </text>

            {/* Đường d2: x + 3y = 15 */}
            <line x1="52" y1="139" x2="349" y2="238" stroke="#0f766e" strokeWidth="1.5" />
            <text x="242" y="182" fill="#0f766e" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic">
              x + 3y = 15
            </text>

            {/* Đường gióng nét đứt từ đỉnh tối ưu B(?; ?) */}
            <line x1="205" y1="235" x2="205" y2="190" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <line x1="70" y1="190" x2="205" y2="190" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="205" y="254" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="62" y="194" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="end">
              ?
            </text>

            {/* Các đỉnh O, A, B, C */}
            <circle cx="70" cy="235" r="3" fill="#0f172a" />
            <circle cx="250" cy="235" r="3.2" fill="#1d4ed8" />
            <text x="250" y="254" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              A
            </text>

            <circle cx="205" cy="190" r="3.8" fill="#dc2626" />
            <text x="214" y="168" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              B(?; ?), F_max = ?
            </text>

            <circle cx="70" cy="145" r="3.2" fill="#1d4ed8" />
            <text x="60" y="148" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="end">
              C
            </text>
          </svg>
        );

      case 'venn_diagram_70_tourists':
        return (
          <svg
            viewBox="0 0 450 230"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <rect x="20" y="18" width="410" height="194" rx="6" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <text x="34" y="42" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              Khảo sát: n(U) = 70
            </text>

            <circle cx="175" cy="118" r="74" fill="#eff6ff" fillOpacity="0.7" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="275" cy="118" r="74" fill="#f0fdf4" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="175" cy="118" r="74" fill="none" stroke="#0f172a" strokeWidth="1.8" />

            <text x="145" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Nha Trang A (45)
            </text>
            <text x="310" y="36" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" fontWeight="bold" textAnchor="middle">
              Đà Lạt B (38)
            </text>

            <text x="135" y="122" fill="#1e3a8a" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="225" y="118" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="22" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="315" y="122" fill="#065f46" fontFamily={MATH_SERIF} fontSize="20" fontWeight="bold" textAnchor="middle">
              ?
            </text>

            <text x="225" y="142" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
            <text x="372" y="198" fill="#475569" fontFamily={MATH_SERIF} fontSize="13" fontStyle="italic" textAnchor="middle">
              Ngoài: 8
            </text>
          </svg>
        );

      case 'number_line_3_6':
        return (
          <svg
            viewBox="0 0 520 115"
            className="w-full max-w-lg mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="nl36-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#0f172a" />
              </marker>
              <pattern id="nl36-hatch" width="7" height="7" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#64748b" strokeWidth="1.2" />
              </pattern>
            </defs>

            {/* Vùng gạch chéo bị loại */}
            <rect x="36" y="43" width="184" height="24" fill="url(#nl36-hatch)" />
            <rect x="340" y="43" width="125" height="24" fill="url(#nl36-hatch)" />

            {/* Trục số thực R */}
            <line x1="30" y1="55" x2="480" y2="55" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#nl36-arrow)" />

            {/* Miền giao lấy nghiệm tô đậm */}
            <line x1="220" y1="55" x2="340" y2="55" stroke="#1d4ed8" strokeWidth="3.5" />

            {/* Dấu ngoặc ( và ] */}
            <text x="220" y="61" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="22" fontWeight="bold" textAnchor="middle">
              (
            </text>
            <text x="340" y="61" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="22" fontWeight="bold" textAnchor="middle">
              ]
            </text>

            {/* Nhãn ? tại hai đầu mút và trên miền giao */}
            <text x="220" y="86" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="340" y="86" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="16" fontWeight="bold" textAnchor="middle">
              ?
            </text>
            <text x="280" y="30" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              A ∩ B = ?
            </text>
          </svg>
        );

      case 'triangle_cos_inscribed_d2':
        return (
          <svg
            viewBox="0 0 380 230"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Tam giác ABC: A(65, 190), B(315, 190), C(158, 30) */}
            <polygon
              points="65,190 315,190 158,30"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />

            {/* Đường tròn nội tiếp tâm I(172, 130), bán kính r = 60px */}
            <circle
              cx="172"
              cy="130"
              r="60"
              fill="#eff6ff"
              fillOpacity="0.55"
              stroke="#1d4ed8"
              strokeWidth="1.5"
              strokeDasharray="5 3"
            />
            <line x1="172" y1="130" x2="172" y2="190" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="172" cy="130" r="2.8" fill="#1d4ed8" />
            <text x="164" y="124" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              I
            </text>
            <text x="180" y="164" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              r = ?
            </text>

            {/* Cung góc 60° tại A */}
            <path d="M 97 190 A 32 32 0 0 0 81 162" fill="none" stroke="#0f172a" strokeWidth="1.4" />
            <text x="102" y="178" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              60°
            </text>

            {/* Các đỉnh và độ dài cạnh */}
            <text x="48" y="204" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              A
            </text>
            <text x="324" y="204" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold">
              B
            </text>
            <text x="158" y="20" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="16" fontStyle="italic" fontWeight="bold" textAnchor="middle">
              C
            </text>

            <text x="190" y="212" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" textAnchor="middle">
              c = 8 cm
            </text>
            <text x="95" y="102" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" textAnchor="end">
              b = 6 cm
            </text>
            <text x="252" y="102" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              a = ?
            </text>
          </svg>
        );

      case 'mountain_building_observation':
        return (
          <svg
            viewBox="0 0 400 250"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(75, 210), B(75, 118), D(285, 210), E(285, 118), C(285, 32) */}
            {/* Tòa nhà AB, mặt đất AD, ngọn núi CD */}
            <line x1="75" y1="210" x2="285" y2="210" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="75" y1="210" x2="75" y2="118" stroke="#0f172a" strokeWidth="2" />
            <line x1="285" y1="210" x2="285" y2="32" stroke="#0f172a" strokeWidth="2" />

            {/* Đường nằm ngang BE */}
            <line x1="75" y1="118" x2="285" y2="118" stroke="#0f172a" strokeWidth="1.6" />

            {/* Hai tia ngắm AC và BC */}
            <line x1="75" y1="210" x2="285" y2="32" stroke="#0f172a" strokeWidth="1.7" />
            <line x1="75" y1="118" x2="285" y2="32" stroke="#0f172a" strokeWidth="1.7" />

            {/* Cung góc 35° tại A */}
            <path d="M 111 210 A 36 36 0 0 0 103 187" fill="none" stroke="#0f172a" strokeWidth="1.4" />
            <text x="116" y="203" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              35°
            </text>

            {/* Cung góc 15° nét đứt tại B (như hình gốc trang 6 PDF) */}
            <path
              d="M 115 118 A 40 40 0 0 0 112 103"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
            <text x="118" y="114" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14">
              15°
            </text>

            {/* Nhãn các đỉnh A, B, C, D, E */}
            <text x="64" y="226" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              A
            </text>
            <text x="58" y="122" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              B
            </text>
            <text x="285" y="22" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" textAnchor="middle">
              C
            </text>
            <text x="292" y="226" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              D
            </text>
            <text x="295" y="123" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic">
              E
            </text>

            {/* Chiều cao tòa nhà 46m và chiều cao ngọn núi CD = ? */}
            <text x="68" y="170" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="14" textAnchor="end">
              46m
            </text>
            <text x="298" y="78" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              CD = ?
            </text>
          </svg>
        );

      case 'pyramid_sabcd_mn':
        return (
          <svg
            viewBox="0 0 420 260"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(135,165), D(55,225), C(275,225), B(355,165), O(205,195), S(195,28), M(165,96.5), N(235,126.5) */}
            <polygon points="195,28 55,225 275,225 355,165" fill="#f8fafc" stroke="none" />
            {/* Nét đứt khuất */}
            <line x1="195" y1="28" x2="135" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="355" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="55" y2="225" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="275" y2="225" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            <line x1="55" y1="225" x2="355" y2="165" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            {/* Đường trung bình MN tô nổi bật */}
            <line x1="165" y1="96.5" x2="235" y2="126.5" stroke="#1d4ed8" strokeWidth="2.3" strokeDasharray="5 3" />
            {/* Nét liền nhìn thấy */}
            <line x1="195" y1="28" x2="55" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="225" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="225" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {/* Các đỉnh */}
            {[
              { x: 195, y: 28, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 135, y: 165, label: 'A', dx: -12, dy: -6, color: '#0f172a' },
              { x: 355, y: 165, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 275, y: 225, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 55, y: 225, label: 'D', dx: -14, dy: 12, color: '#0f172a' },
              { x: 205, y: 195, label: 'O', dx: 0, dy: 16, color: '#0f172a' },
              { x: 165, y: 96.5, label: 'M', dx: -14, dy: 3, color: '#1d4ed8' },
              { x: 235, y: 126.5, label: 'N', dx: 14, dy: -2, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="16"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_mnp':
        return (
          <svg
            viewBox="0 0 420 260"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(135,165), D(55,225), C(275,225), B(355,165), O(205,195), S(195,28), M(165,96.5), N(275,96.5), P(125,126.5) */}
            <polygon points="165,96.5 275,96.5 125,126.5" fill="#dbeafe" fillOpacity="0.65" />
            <line x1="195" y1="28" x2="135" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="355" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="55" y2="225" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="275" y2="225" stroke="#64748b" strokeWidth="1.3" strokeDasharray="4 4" />
            <line x1="55" y1="225" x2="355" y2="165" stroke="#64748b" strokeWidth="1.3" strokeDasharray="4 4" />
            <line x1="165" y1="96.5" x2="205" y2="195" stroke="#dc2626" strokeWidth="1.7" strokeDasharray="4 3" />
            {/* Mặt phẳng (MNP) */}
            <line x1="165" y1="96.5" x2="275" y2="96.5" stroke="#1d4ed8" strokeWidth="2.1" strokeDasharray="5 3" />
            <line x1="165" y1="96.5" x2="125" y2="126.5" stroke="#1d4ed8" strokeWidth="2.1" strokeDasharray="5 3" />
            <line x1="125" y1="126.5" x2="275" y2="96.5" stroke="#1d4ed8" strokeWidth="1.9" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="195" y1="28" x2="55" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="225" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="225" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 195, y: 28, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 135, y: 165, label: 'A', dx: -12, dy: -5, color: '#0f172a' },
              { x: 355, y: 165, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 275, y: 225, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 55, y: 225, label: 'D', dx: -14, dy: 12, color: '#0f172a' },
              { x: 205, y: 195, label: 'O', dx: 0, dy: 16, color: '#dc2626' },
              { x: 165, y: 96.5, label: 'M', dx: -13, dy: -3, color: '#1d4ed8' },
              { x: 275, y: 96.5, label: 'N', dx: 14, dy: -2, color: '#1d4ed8' },
              { x: 125, y: 126.5, label: 'P', dx: -14, dy: 3, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'tetrahedron_abcd_g1g2':
        return (
          <svg
            viewBox="0 0 400 255"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(185,26), B(55,175), C(175,230), D(345,175), M(115,202.5), N(200,175), G1(138,144), G2(195,125) */}
            <line x1="55" y1="175" x2="345" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="185" y1="26" x2="200" y2="175" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="115" y1="202.5" x2="200" y2="175" stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="4 3" />
            <line x1="138" y1="144" x2="195" y2="125" stroke="#dc2626" strokeWidth="2.4" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="185" y1="26" x2="55" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="185" y1="26" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="185" y1="26" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="175" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="230" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="185" y1="26" x2="115" y2="202.5" stroke="#1d4ed8" strokeWidth="1.6" />
            {[
              { x: 185, y: 26, label: 'A', dx: 0, dy: -8, color: '#0f172a' },
              { x: 55, y: 175, label: 'B', dx: -14, dy: 4, color: '#0f172a' },
              { x: 175, y: 230, label: 'C', dx: 0, dy: 16, color: '#0f172a' },
              { x: 345, y: 175, label: 'D', dx: 14, dy: 4, color: '#0f172a' },
              { x: 115, y: 202.5, label: 'M', dx: -12, dy: 13, color: '#1d4ed8' },
              { x: 200, y: 175, label: 'N', dx: 10, dy: 15, color: '#1d4ed8' },
              { x: 138, y: 144, label: 'G₁', dx: -16, dy: 2, color: '#dc2626' },
              { x: 195, y: 125, label: 'G₂', dx: 18, dy: 2, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_sa_perp':
        return (
          <svg
            viewBox="0 0 410 260"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(125,165), D(50,225), C(270,225), B(345,165), S(125,28) */}
            <line x1="125" y1="28" x2="125" y2="165" stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="5 4" />
            <line x1="125" y1="165" x2="345" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="125" y1="165" x2="50" y2="225" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="125" y1="165" x2="270" y2="225" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            <line x1="50" y1="225" x2="345" y2="165" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            {/* Ký hiệu góc vuông SA perp (ABCD) tại A */}
            <polyline points="125,151 139,151 139,165" fill="none" stroke="#1d4ed8" strokeWidth="1.3" />
            <polyline points="125,153 114,162 114,174" fill="none" stroke="#1d4ed8" strokeWidth="1.3" />
            {/* Cạnh nhìn thấy */}
            <line x1="125" y1="28" x2="50" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="125" y1="28" x2="270" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="125" y1="28" x2="345" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="50" y1="225" x2="270" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="270" y1="225" x2="345" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 125, y: 28, label: 'S', dx: 0, dy: -8 },
              { x: 125, y: 165, label: 'A', dx: 14, dy: -5 },
              { x: 345, y: 165, label: 'B', dx: 14, dy: 4 },
              { x: 270, y: 225, label: 'C', dx: 12, dy: 14 },
              { x: 50, y: 225, label: 'D', dx: -14, dy: 12 },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill="#0f172a" />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill="#0f172a"
                  fontFamily={MATH_SERIF}
                  fontSize="16"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabc_sa_perp':
        return (
          <svg
            viewBox="0 0 390 250"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(85,175), B(185,228), C(325,175), S(85,28), M(255,201.5) */}
            <line x1="85" y1="175" x2="325" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="85" y1="175" x2="255" y2="201.5" stroke="#1d4ed8" strokeWidth="1.7" strokeDasharray="5 3" />
            {/* Góc vuông tại A */}
            <polyline points="85,161 99,161 99,175" fill="none" stroke="#1d4ed8" strokeWidth="1.3" />
            {/* Cạnh nhìn thấy */}
            <line x1="85" y1="28" x2="85" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="85" y1="28" x2="185" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="85" y1="28" x2="325" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="85" y1="175" x2="185" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="185" y1="228" x2="325" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="85" y1="28" x2="255" y2="201.5" stroke="#1d4ed8" strokeWidth="1.8" />
            {[
              { x: 85, y: 28, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 85, y: 175, label: 'A', dx: -14, dy: 4, color: '#0f172a' },
              { x: 185, y: 228, label: 'B', dx: -4, dy: 16, color: '#0f172a' },
              { x: 325, y: 175, label: 'C', dx: 14, dy: 4, color: '#0f172a' },
              { x: 255, y: 201.5, label: 'M', dx: 12, dy: 14, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="16"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'prism_abca1b1c1':
        return (
          <svg
            viewBox="0 0 380 265"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(75,185), B(175,232), C(305,185), A'(75,45), B'(175,92), C'(305,45) */}
            <line x1="75" y1="185" x2="305" y2="185" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <polyline points="75,171 89,171 89,185" fill="none" stroke="#1d4ed8" strokeWidth="1.3" />
            {/* Cạnh nhìn thấy */}
            <line x1="75" y1="45" x2="75" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="92" x2="175" y2="232" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="305" y1="45" x2="305" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="75" y1="185" x2="175" y2="232" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="232" x2="305" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <polygon points="75,45 175,92 305,45" fill="#eff6ff" fillOpacity="0.6" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 75, y: 185, label: 'A', dx: -14, dy: 4 },
              { x: 175, y: 232, label: 'B', dx: 0, dy: 16 },
              { x: 305, y: 185, label: 'C', dx: 14, dy: 4 },
              { x: 75, y: 45, label: "A'", dx: -14, dy: 2 },
              { x: 175, y: 92, label: "B'", dx: 0, dy: 16 },
              { x: 305, y: 45, label: "C'", dx: 15, dy: 2 },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill="#0f172a" />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill="#0f172a"
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'cube_abcd_a1b1c1d1':
        return (
          <svg
            viewBox="0 0 410 265"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(135,175), D(65,228), C(255,228), B(325,175), A'(135,45), D'(65,98), C'(255,98), B'(325,45) */}
            <polygon points="135,45 325,175 65,228" fill="#dbeafe" fillOpacity="0.65" />
            <line x1="135" y1="45" x2="135" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="175" x2="325" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="175" x2="65" y2="228" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            {/* Mặt phẳng (A'BD) */}
            <line x1="135" y1="45" x2="325" y2="175" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="135" y1="45" x2="65" y2="228" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="65" y1="228" x2="325" y2="175" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
            {/* Các cạnh nhìn thấy */}
            <line x1="65" y1="228" x2="255" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="255" y1="228" x2="325" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="65" y1="98" x2="65" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="255" y1="98" x2="255" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="325" y1="45" x2="325" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <polygon points="135,45 325,45 255,98 65,98" fill="none" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 135, y: 175, label: 'A', dx: 12, dy: -5 },
              { x: 325, y: 175, label: 'B', dx: 14, dy: 4 },
              { x: 255, y: 228, label: 'C', dx: 12, dy: 14 },
              { x: 65, y: 228, label: 'D', dx: -14, dy: 12 },
              { x: 135, y: 45, label: "A'", dx: 0, dy: -8 },
              { x: 325, y: 45, label: "B'", dx: 14, dy: -4 },
              { x: 255, y: 98, label: "C'", dx: 14, dy: 8 },
              { x: 65, y: 98, label: "D'", dx: -15, dy: 4 },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill="#0f172a" />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill="#0f172a"
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_so':
        return (
          <svg
            viewBox="0 0 420 260"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(135,165), D(55,225), C(275,225), B(355,165), O(205,195), S(195,28) */}
            <polygon points="195,28 55,225 275,225 355,165" fill="#f8fafc" stroke="none" />
            {/* Cạnh khuất nét đứt chuẩn TikZ */}
            <line x1="195" y1="28" x2="135" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="355" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="55" y2="225" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="165" x2="275" y2="225" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="55" y1="225" x2="355" y2="165" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Giao tuyến SO = (SAC) \cap (SBD) */}
            <line x1="195" y1="28" x2="205" y2="195" stroke="#dc2626" strokeWidth="2.2" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy nét liền */}
            <line x1="195" y1="28" x2="55" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="225" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="225" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 195, y: 28, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 135, y: 165, label: 'A', dx: -12, dy: -6, color: '#0f172a' },
              { x: 355, y: 165, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 275, y: 225, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 55, y: 225, label: 'D', dx: -14, dy: 12, color: '#0f172a' },
              { x: 205, y: 195, label: 'O', dx: 0, dy: 17, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="16"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_ef_intersect':
        return (
          <svg
            viewBox="0 0 450 265"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(105,155), B(265,155), D(45,225), C(205,205), E = AB \cap CD = (385,155), O = AC \cap BD = (158,182), S(165,26) */}
            <polygon points="165,26 45,225 205,205 265,155" fill="#f8fafc" stroke="none" />
            {/* Cạnh khuất nét đứt */}
            <line x1="165" y1="26" x2="105" y2="155" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="105" y1="155" x2="265" y2="155" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="105" y1="155" x2="45" y2="225" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="105" y1="155" x2="205" y2="205" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            <line x1="45" y1="225" x2="265" y2="155" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 4" />
            <line x1="165" y1="26" x2="158" y2="182" stroke="#1d4ed8" strokeWidth="1.7" strokeDasharray="4 3" />
            {/* Kéo dài AB và CD cắt nhau tại E(385,155) */}
            <line x1="265" y1="155" x2="385" y2="155" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="205" y1="205" x2="385" y2="155" stroke="#0f172a" strokeWidth="1.6" />
            {/* Giao tuyến SE = (SAB) \cap (SCD) */}
            <line x1="165" y1="26" x2="385" y2="155" stroke="#dc2626" strokeWidth="2.1" />
            {/* Cạnh nhìn thấy */}
            <line x1="165" y1="26" x2="45" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="165" y1="26" x2="205" y2="205" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="165" y1="26" x2="265" y2="155" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="45" y1="225" x2="205" y2="205" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="205" y1="205" x2="265" y2="155" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 165, y: 26, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 105, y: 155, label: 'A', dx: -12, dy: -5, color: '#0f172a' },
              { x: 265, y: 155, label: 'B', dx: 4, dy: -8, color: '#0f172a' },
              { x: 205, y: 205, label: 'C', dx: 4, dy: 16, color: '#0f172a' },
              { x: 45, y: 225, label: 'D', dx: -13, dy: 10, color: '#0f172a' },
              { x: 158, y: 182, label: 'O', dx: -10, dy: 14, color: '#1d4ed8' },
              { x: 385, y: 155, label: 'E', dx: 14, dy: 5, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'tetrahedron_abcd_ij_bc':
        return (
          <svg
            viewBox="0 0 430 255"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(165,26), B(45,175), C(175,225), D(335,165), M(105,100.5) trên AB, N(171,145) trên AC, K(263,259 -> điều chỉnh C(165,210), K(255,232)) */}
            <polygon points="165,26 45,175 165,215 335,165" fill="#f8fafc" stroke="none" />
            {/* Cạnh khuất BD nét đứt */}
            <line x1="45" y1="175" x2="335" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="335" y1="165" x2="265" y2="248" stroke="#64748b" strokeWidth="1.4" strokeDasharray="4 3" />
            {/* Đường thẳng MN kéo dài cắt BC tại K(265,248) */}
            <line x1="165" y1="215" x2="265" y2="248" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="105" y1="100.5" x2="265" y2="248" stroke="#dc2626" strokeWidth="2" />
            {/* Các cạnh nhìn thấy của tứ diện */}
            <line x1="165" y1="26" x2="45" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="165" y1="26" x2="165" y2="215" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="165" y1="26" x2="335" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="45" y1="175" x2="165" y2="215" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="165" y1="215" x2="335" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 165, y: 26, label: 'A', dx: 0, dy: -8, color: '#0f172a' },
              { x: 45, y: 175, label: 'B', dx: -14, dy: 4, color: '#0f172a' },
              { x: 165, y: 215, label: 'C', dx: -8, dy: 16, color: '#0f172a' },
              { x: 335, y: 165, label: 'D', dx: 14, dy: 4, color: '#0f172a' },
              { x: 105, y: 100.5, label: 'M', dx: -14, dy: 0, color: '#1d4ed8' },
              { x: 165, y: 156, label: 'N', dx: 13, dy: -3, color: '#1d4ed8' },
              { x: 265, y: 248, label: 'K', dx: 14, dy: 2, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'tetrahedron_abcd_ag_centroid':
        return (
          <svg
            viewBox="0 0 410 255"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(175,26), B(50,175), C(175,230), D(345,175), M(112.5,100.5), N(260,202.5), G(190,193) */}
            <polygon points="175,26 50,175 175,230 345,175" fill="#f8fafc" stroke="none" />
            {/* Nét đứt khuất bên trong */}
            <line x1="50" y1="175" x2="345" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="50" y1="175" x2="260" y2="202.5" stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="5 3" />
            <line x1="112.5" y1="100.5" x2="260" y2="202.5" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="175" y1="26" x2="190" y2="193" stroke="#dc2626" strokeWidth="2.1" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="175" y1="26" x2="50" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="26" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="26" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="50" y1="175" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="230" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="26" x2="260" y2="202.5" stroke="#1d4ed8" strokeWidth="1.7" />
            {[
              { x: 175, y: 26, label: 'A', dx: 0, dy: -8, color: '#0f172a' },
              { x: 50, y: 175, label: 'B', dx: -14, dy: 4, color: '#0f172a' },
              { x: 175, y: 230, label: 'C', dx: 0, dy: 16, color: '#0f172a' },
              { x: 345, y: 175, label: 'D', dx: 14, dy: 4, color: '#0f172a' },
              { x: 112.5, y: 100.5, label: 'M', dx: -14, dy: 2, color: '#1d4ed8' },
              { x: 260, y: 202.5, label: 'N', dx: 12, dy: 14, color: '#1d4ed8' },
              { x: 190, y: 193, label: 'G', dx: 0, dy: 16, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_sx_parallel':
        return (
          <svg
            viewBox="0 0 420 265"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(135,170), D(55,230), C(275,230), B(355,170), S(195,38), M(165,104), N(275,104) */}
            <polygon points="165,104 275,104 275,230 55,230" fill="#dbeafe" fillOpacity="0.45" />
            {/* Nét đứt khuất */}
            <line x1="195" y1="38" x2="135" y2="170" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="170" x2="355" y2="170" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="135" y1="170" x2="55" y2="230" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="165" y1="104" x2="275" y2="104" stroke="#1d4ed8" strokeWidth="2.1" strokeDasharray="5 3" />
            <line x1="165" y1="104" x2="55" y2="230" stroke="#1d4ed8" strokeWidth="1.6" strokeDasharray="4 3" />
            {/* Giao tuyến Sx // AB // CD qua S */}
            <line x1="85" y1="38" x2="315" y2="38" stroke="#dc2626" strokeWidth="2.1" />
            <text x="326" y="42" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              x
            </text>
            {/* Cạnh nhìn thấy */}
            <line x1="195" y1="38" x2="55" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="38" x2="275" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="38" x2="355" y2="170" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="230" x2="275" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="230" x2="355" y2="170" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="104" x2="275" y2="230" stroke="#1d4ed8" strokeWidth="1.8" />
            {[
              { x: 195, y: 38, label: 'S', dx: 0, dy: -10, color: '#0f172a' },
              { x: 135, y: 170, label: 'A', dx: -12, dy: -5, color: '#0f172a' },
              { x: 355, y: 170, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 275, y: 230, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 55, y: 230, label: 'D', dx: -14, dy: 12, color: '#0f172a' },
              { x: 165, y: 104, label: 'M', dx: -14, dy: 0, color: '#1d4ed8' },
              { x: 275, y: 104, label: 'N', dx: 14, dy: 0, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'tetrahedron_abcd_mnpq':
        return (
          <svg
            viewBox="0 0 410 255"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(175,26), B(50,175), C(175,230), D(345,175), M(112.5,100.5), N(112.5,202.5), P(260,202.5), Q(260,100.5) */}
            <polygon points="112.5,100.5 112.5,202.5 260,202.5 260,100.5" fill="#dbeafe" fillOpacity="0.65" />
            {/* Cạnh khuất nét đứt */}
            <line x1="50" y1="175" x2="345" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="112.5" y1="100.5" x2="260" y2="100.5" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
            <line x1="112.5" y1="202.5" x2="260" y2="202.5" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="112.5" y1="100.5" x2="112.5" y2="202.5" stroke="#1d4ed8" strokeWidth="2.1" />
            <line x1="260" y1="100.5" x2="260" y2="202.5" stroke="#1d4ed8" strokeWidth="2.1" />
            <line x1="175" y1="26" x2="50" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="26" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="26" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="50" y1="175" x2="175" y2="230" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="175" y1="230" x2="345" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 175, y: 26, label: 'A', dx: 0, dy: -8, color: '#0f172a' },
              { x: 50, y: 175, label: 'B', dx: -14, dy: 4, color: '#0f172a' },
              { x: 175, y: 230, label: 'C', dx: 0, dy: 16, color: '#0f172a' },
              { x: 345, y: 175, label: 'D', dx: 14, dy: 4, color: '#0f172a' },
              { x: 112.5, y: 100.5, label: 'M', dx: -14, dy: 0, color: '#1d4ed8' },
              { x: 112.5, y: 202.5, label: 'N', dx: -12, dy: 14, color: '#1d4ed8' },
              { x: 260, y: 202.5, label: 'P', dx: 12, dy: 14, color: '#1d4ed8' },
              { x: 260, y: 100.5, label: 'Q', dx: 14, dy: 0, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'pyramid_sabcd_trapezoid':
        return (
          <svg
            viewBox="0 0 420 260"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(65,165), B(355,165), D(115,225), C(275,225), O(201,199), S(195,28), M(130,96.5), N(275,96.5) */}
            <polygon points="195,28 65,165 115,225 275,225 355,165" fill="#f8fafc" stroke="none" />
            {/* Cạnh khuất AB, AC, BD, MN nét đứt */}
            <line x1="65" y1="165" x2="355" y2="165" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="65" y1="165" x2="275" y2="225" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="355" y1="165" x2="115" y2="225" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="130" y1="96.5" x2="275" y2="96.5" stroke="#1d4ed8" strokeWidth="2.1" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="195" y1="28" x2="65" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="115" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="195" y1="28" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="65" y1="165" x2="115" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="115" y1="225" x2="275" y2="225" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="275" y1="225" x2="355" y2="165" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 195, y: 28, label: 'S', dx: 0, dy: -8, color: '#0f172a' },
              { x: 65, y: 165, label: 'A', dx: -14, dy: 4, color: '#0f172a' },
              { x: 355, y: 165, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 275, y: 225, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 115, y: 225, label: 'D', dx: -12, dy: 14, color: '#0f172a' },
              { x: 201, y: 199, label: 'O', dx: 0, dy: 16, color: '#dc2626' },
              { x: 130, y: 96.5, label: 'M', dx: -14, dy: 0, color: '#1d4ed8' },
              { x: 275, y: 96.5, label: 'N', dx: 14, dy: 0, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'box_abcd_ab1d1_bc1d':
        return (
          <svg
            viewBox="0 0 430 270"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(125,175), D(55,228), C(255,228), B(325,175), A'(145,45), D'(75,98), C'(275,98), B'(345,45) */}
            <polygon points="125,175 345,45 75,98" fill="#dbeafe" fillOpacity="0.55" />
            <polygon points="325,175 275,98 55,228" fill="#ccfbf1" fillOpacity="0.55" />
            {/* Cạnh khuất nét đứt */}
            <line x1="125" y1="175" x2="325" y2="175" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="125" y1="175" x2="55" y2="228" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="125" y1="175" x2="145" y2="45" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="125" y1="175" x2="345" y2="45" stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="5 3" />
            <line x1="125" y1="175" x2="75" y2="98" stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="5 3" />
            <line x1="55" y1="228" x2="325" y2="175" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="5 3" />
            {/* Đường chéo AC' */}
            <line x1="125" y1="175" x2="275" y2="98" stroke="#dc2626" strokeWidth="2.1" strokeDasharray="4 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="75" y1="98" x2="345" y2="45" stroke="#1d4ed8" strokeWidth="1.9" />
            <line x1="325" y1="175" x2="275" y2="98" stroke="#0d9488" strokeWidth="1.9" />
            <line x1="55" y1="228" x2="275" y2="98" stroke="#0d9488" strokeWidth="1.9" />
            <line x1="55" y1="228" x2="255" y2="228" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="255" y1="228" x2="325" y2="175" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="55" y1="228" x2="75" y2="98" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="255" y1="228" x2="275" y2="98" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="325" y1="175" x2="345" y2="45" stroke="#0f172a" strokeWidth="1.9" />
            <polygon points="145,45 345,45 275,98 75,98" fill="none" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 125, y: 175, label: 'A', dx: -12, dy: -4, color: '#0f172a' },
              { x: 325, y: 175, label: 'B', dx: 14, dy: 4, color: '#0f172a' },
              { x: 255, y: 228, label: 'C', dx: 12, dy: 14, color: '#0f172a' },
              { x: 55, y: 228, label: 'D', dx: -14, dy: 12, color: '#0f172a' },
              { x: 145, y: 45, label: "A'", dx: 0, dy: -8, color: '#0f172a' },
              { x: 345, y: 45, label: "B'", dx: 14, dy: -4, color: '#1d4ed8' },
              { x: 275, y: 98, label: "C'", dx: 15, dy: 6, color: '#0d9488' },
              { x: 75, y: 98, label: "D'", dx: -15, dy: 4, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'prism_abc_mnp':
        return (
          <svg
            viewBox="0 0 390 265"
            className="w-full max-w-sm mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* A(70,185), B(170,232), C(300,185), A'(85,45), B'(185,92), C'(315,45), M(77.5,115), N(177.5,162), P(307.5,115) */}
            <polygon points="77.5,115 177.5,162 307.5,115" fill="#dbeafe" fillOpacity="0.65" />
            <line x1="70" y1="185" x2="300" y2="185" stroke="#334155" strokeWidth="1.6" strokeDasharray="5 4" />
            <line x1="77.5" y1="115" x2="307.5" y2="115" stroke="#1d4ed8" strokeWidth="1.8" strokeDasharray="5 3" />
            {/* Cạnh nhìn thấy */}
            <line x1="77.5" y1="115" x2="177.5" y2="162" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="177.5" y1="162" x2="307.5" y2="115" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="85" y1="45" x2="70" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="185" y1="92" x2="170" y2="232" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="315" y1="45" x2="300" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="70" y1="185" x2="170" y2="232" stroke="#0f172a" strokeWidth="1.9" />
            <line x1="170" y1="232" x2="300" y2="185" stroke="#0f172a" strokeWidth="1.9" />
            <polygon points="85,45 185,92 315,45" fill="#eff6ff" fillOpacity="0.55" stroke="#0f172a" strokeWidth="1.9" />
            {[
              { x: 70, y: 185, label: 'A', dx: -14, dy: 4, color: '#0f172a' },
              { x: 170, y: 232, label: 'B', dx: 0, dy: 16, color: '#0f172a' },
              { x: 300, y: 185, label: 'C', dx: 14, dy: 4, color: '#0f172a' },
              { x: 85, y: 45, label: "A'", dx: -14, dy: 2, color: '#0f172a' },
              { x: 185, y: 92, label: "B'", dx: 0, dy: 16, color: '#0f172a' },
              { x: 315, y: 45, label: "C'", dx: 15, dy: 2, color: '#0f172a' },
              { x: 77.5, y: 115, label: 'M', dx: -14, dy: 3, color: '#1d4ed8' },
              { x: 177.5, y: 162, label: 'N', dx: 13, dy: 12, color: '#1d4ed8' },
              { x: 307.5, y: 115, label: 'P', dx: 14, dy: 3, color: '#1d4ed8' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'thales_three_parallel_planes':
        return (
          <svg
            viewBox="0 0 430 265"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Ba mặt phẳng song song (P), (Q), (R) */}
            {[
              { y: 65, label: '(P)' },
              { y: 145, label: '(Q)' },
              { y: 225, label: '(R)' },
            ].map((pl) => (
              <g key={pl.label}>
                <polygon
                  points={`45,${pl.y} 315,${pl.y} 375,${pl.y - 42} 105,${pl.y - 42}`}
                  fill="#eff6ff"
                  fillOpacity="0.65"
                  stroke="#0f172a"
                  strokeWidth="1.6"
                />
                <text
                  x="76"
                  y={pl.y - 8}
                  fill="#0f172a"
                  fontFamily={MATH_SERIF}
                  fontSize="14"
                  fontStyle="italic"
                  fontWeight="bold"
                >
                  {pl.label}
                </text>
              </g>
            ))}
            {/* Hai cát tuyến d_1 và d_2 */}
            <line x1="150" y1="15" x2="195" y2="245" stroke="#1d4ed8" strokeWidth="2.1" />
            <line x1="255" y1="15" x2="315" y2="245" stroke="#dc2626" strokeWidth="2.1" />
            <text x="198" y="256" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              d₁
            </text>
            <text x="318" y="256" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="14" fontStyle="italic" fontWeight="bold">
              d₂
            </text>
            {[
              { x: 156, y: 46, label: 'A', dx: -14, dy: -2, color: '#1d4ed8' },
              { x: 172, y: 126, label: 'B', dx: -14, dy: -2, color: '#1d4ed8' },
              { x: 187, y: 206, label: 'C', dx: -14, dy: -2, color: '#1d4ed8' },
              { x: 263, y: 46, label: "A'", dx: 16, dy: -2, color: '#dc2626' },
              { x: 284, y: 126, label: "B'", dx: 16, dy: -2, color: '#dc2626' },
              { x: 305, y: 206, label: "C'", dx: 16, dy: -2, color: '#dc2626' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3.2" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'parallel_projection_plane':
        return (
          <svg
            viewBox="0 0 430 245"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            <defs>
              <marker id="proj-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1.5 L 9 5 L 0 8.5 L 2 5 z" fill="#dc2626" />
              </marker>
            </defs>
            {/* Mặt phẳng chiếu (P) */}
            <polygon
              points="40,215 325,215 390,135 105,135"
              fill="#f0f9ff"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <text x="68" y="203" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              (P)
            </text>
            {/* Phương chiếu l */}
            <line x1="75" y1="32" x2="105" y2="112" stroke="#dc2626" strokeWidth="1.9" markerEnd="url(#proj-arrow)" />
            <text x="76" y="75" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              l
            </text>
            {/* Đoạn thẳng AB có điểm M ở trên và hình chiếu A'B' có M' ở dưới */}
            <line x1="145" y1="48" x2="305" y2="36" stroke="#1d4ed8" strokeWidth="2.4" />
            <line x1="185" y1="182" x2="345" y2="170" stroke="#0d9488" strokeWidth="2.4" />
            {/* Các tia chiếu song song nét đứt */}
            <line x1="145" y1="48" x2="185" y2="182" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="225" y1="42" x2="265" y2="176" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
            <line x1="305" y1="36" x2="345" y2="170" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
            {[
              { x: 145, y: 48, label: 'A', dx: -12, dy: -6, color: '#1d4ed8' },
              { x: 225, y: 42, label: 'M', dx: 0, dy: -10, color: '#1d4ed8' },
              { x: 305, y: 36, label: 'B', dx: 14, dy: -4, color: '#1d4ed8' },
              { x: 185, y: 182, label: "A'", dx: -14, dy: 14, color: '#0d9488' },
              { x: 265, y: 176, label: "M'", dx: 0, dy: 18, color: '#0d9488' },
              { x: 345, y: 170, label: "B'", dx: 14, dy: 12, color: '#0d9488' },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={pt.y} r="3.2" fill={pt.color} />
                <text
                  x={pt.x + pt.dx}
                  y={pt.y + pt.dy}
                  fill={pt.color}
                  fontFamily={MATH_SERIF}
                  fontSize="15"
                  fontStyle="italic"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
          </svg>
        );

      case 'space_two_planes_intersect':
        return (
          <svg
            viewBox="0 0 420 240"
            className="w-full max-w-md mx-auto h-auto select-none rounded-lg bg-white border border-slate-300 shadow-xs"
          >
            {/* Mặt phẳng nằm ngang (P) */}
            <polygon
              points="40,205 320,205 380,130 100,130"
              fill="#eff6ff"
              fillOpacity="0.7"
              stroke="#0f172a"
              strokeWidth="1.7"
            />
            {/* Mặt phẳng đứng nghiêng (Q) cắt (P) theo giao tuyến d */}
            <polygon
              points="130,170 305,170 325,38 150,38"
              fill="#f0fdf4"
              fillOpacity="0.82"
              stroke="#0f172a"
              strokeWidth="1.7"
            />
            {/* Giao tuyến d = (P) \cap (Q) */}
            <line x1="95" y1="170" x2="345" y2="170" stroke="#dc2626" strokeWidth="2.3" />
            <text x="355" y="174" fill="#dc2626" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              d
            </text>
            {/* Đường thẳng a // d */}
            <line x1="160" y1="88" x2="300" y2="88" stroke="#1d4ed8" strokeWidth="2.1" />
            <text x="310" y="92" fill="#1d4ed8" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              a
            </text>
            <text x="68" y="195" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              (P)
            </text>
            <text x="172" y="60" fill="#0f172a" fontFamily={MATH_SERIF} fontSize="15" fontStyle="italic" fontWeight="bold">
              (Q)
            </text>
          </svg>
        );

      default:
        if (tikzCode && tikzCode.trim()) {
          return renderCustomTikzToSvg(tikzCode);
        }
        return null;
    }
  };

  const renderedSvg = renderSvgDiagram();
  if (!renderedSvg) return null;

  return (
    <div className={`rounded-xl border border-sky-900/60 bg-[#060e20] p-3 sm:p-4 shadow-inner my-3 ${className}`}>
      <div className="flex justify-center items-center overflow-x-auto">
        {renderedSvg}
      </div>
    </div>
  );
};
