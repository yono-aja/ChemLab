import React, { useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, FlaskConical, Info } from 'lucide-react';

const CATEGORIES = {
  nonmetal:   { label: 'Nonlogam', color: '#7dd3fc', desc: 'Umumnya tidak menghantarkan listrik dan panas dengan baik. Cenderung menerima atau berbagi elektron saat berikatan.' },
  noble:      { label: 'Gas mulia', color: '#c4b5fd', desc: 'Berada di golongan 18 dengan kulit elektron terluar yang terisi penuh, sehingga sangat stabil dan sulit bereaksi.' },
  alkali:     { label: 'Logam alkali', color: '#f87171', desc: 'Logam golongan 1 yang sangat reaktif. Mudah melepaskan satu elektron terluar.' },
  alkaline:   { label: 'Alkali tanah', color: '#fdba74', desc: 'Logam golongan 2 yang reaktif. Cenderung melepaskan dua elektron terluar.' },
  metalloid:  { label: 'Metaloid', color: '#6ee7b7', desc: 'Memiliki sifat di antara logam dan nonlogam. Banyak dimanfaatkan sebagai semikonduktor.' },
  halogen:    { label: 'Halogen', color: '#bef264', desc: 'Golongan 17 yang sangat reaktif. Mudah menerima satu elektron untuk membentuk ion negatif.' },
  post:       { label: 'Logam pasca-transisi', color: '#2dd4bf', desc: 'Logam yang terletak setelah deret logam transisi. Umumnya lebih lunak dan memiliki titik leleh lebih rendah.' },
  transition: { label: 'Logam transisi', color: '#fbbf24', desc: 'Logam di blok d. Umumnya memiliki beberapa bilangan oksidasi dan sering membentuk senyawa berwarna.' },
  lanthanoid: { label: 'Lantanida', color: '#fb923c', desc: 'Seri unsur blok f setelah lantanum. Banyak digunakan dalam magnet, katalis, dan layar.' },
  actinoid:   { label: 'Aktinida', color: '#f472b6', desc: 'Seri unsur blok f setelah aktinium. Sebagian bersifat radioaktif.' },
};

const SUBSHELLS = [
  ['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10],
  ['4p', 6], ['5s', 2], ['4d', 10], ['5p', 6], ['6s', 2], ['4f', 14], ['5d', 10],
  ['6p', 6], ['7s', 2], ['5f', 14], ['6d', 10], ['7p', 6],
];

const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const toSup = (num) => String(num).split('').map((d) => SUP[d] || d).join('');

// Posisi (kolom = golongan, baris = periode) pada grid 18 kolom.
// Baris 9 dan 10 untuk seri lantanida dan aktinida.
function getPosition(n) {
  if (n <= 2) return { row: 1, col: n === 1 ? 1 : 18 };
  if (n <= 10) return { row: 2, col: n <= 4 ? n - 2 : n + 8 };
  if (n <= 18) return { row: 3, col: n <= 12 ? n - 10 : n };
  if (n <= 36) return { row: 4, col: n - 18 };
  if (n <= 54) return { row: 5, col: n - 36 };
  if (n <= 56) return { row: 6, col: n - 54 };
  if (n <= 71) return { row: 9, col: n - 54 };
  if (n <= 86) return { row: 6, col: n - 68 };
  if (n <= 88) return { row: 7, col: n - 86 };
  if (n <= 103) return { row: 10, col: n - 86 };
  return { row: 7, col: n - 100 };
}

// Konfigurasi dasar menurut aturan Aufbau (tanpa menangani pengecualian seperti Cr dan Cu).
function buildConfig(z) {
  let left = z;
  const parts = [];
  for (const [name, cap] of SUBSHELLS) {
    if (left <= 0) break;
    const k = Math.min(cap, left);
    parts.push(`${name}${toSup(k)}`);
    left -= k;
  }
  return parts.join(' ');
}

function getDetails(e) {
  const pos = getPosition(e.n);
  const isF = pos.row >= 9;
  const period = isF ? (e.type === 'lanthanoid' ? 6 : 7) : pos.row;
  const group = isF ? (e.type === 'lanthanoid' ? 'Seri lantanida' : 'Seri aktinida') : pos.col;
  return {
    ...e,
    pos,
    cat: CATEGORIES[e.type],
    period,
    group,
    protons: e.n,
    electrons: e.n,
    neutrons: Math.round(Number(e.mass)) - e.n,
    config: buildConfig(e.n),
  };
}

export default function PeriodicTable({ elements, onAddToLab }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [activeZ, setActiveZ] = useState(1);

  const byZ = useMemo(() => Object.fromEntries(elements.map((e) => [e.n, e])), [elements]);

  const matches = (e) => {
    const q = query.trim().toLowerCase();
    const okQuery = !q
      || e.name.toLowerCase().includes(q)
      || e.s.toLowerCase().includes(q)
      || String(e.n) === q;
    const okCategory = category === 'all' || e.type === category;
    return okQuery && okCategory;
  };

  const matchCount = elements.filter(matches).length;
  const active = byZ[activeZ] ? getDetails(byZ[activeZ]) : null;
  const prevEl = byZ[activeZ - 1];
  const nextEl = byZ[activeZ + 1];

  return (
    <div className="pt-wrap">
      <section className="pt-card pt-hero">
        <div>
          <div className="pt-kicker">MATERI BELAJAR</div>
          <h2>Tabel Periodik Unsur</h2>
          <p>Klik unsur untuk melihat informasinya. Gunakan pencarian atau filter kategori untuk menyorot kelompok tertentu.</p>
        </div>
        <span className="pt-count">{matchCount} / {elements.length} unsur</span>
      </section>

      <section className="pt-toolbar">
        <div className="pt-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, simbol, atau nomor atom…"
          />
        </div>
        <div className="pt-chips">
          <button className={`pt-chip ${category === 'all' ? 'is-on' : ''}`} onClick={() => setCategory('all')}>
            Semua
          </button>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              className={`pt-chip ${category === key ? 'is-on' : ''}`}
              onClick={() => setCategory(key)}
              style={{ '--c': cat.color }}
            >
              <i /> {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="pt-card pt-board">
        <div className="pt-scroll">
          <div className="pt-grid">
            {elements.map((e) => {
              const pos = getPosition(e.n);
              return (
                <button
                  key={e.n}
                  className={`pt-tile ${activeZ === e.n ? 'is-active' : ''} ${matches(e) ? '' : 'is-dim'}`}
                  style={{ gridColumn: pos.col, gridRow: pos.row, '--c': CATEGORIES[e.type].color }}
                  onClick={() => setActiveZ(e.n)}
                  title={`${e.name} (${e.s}), nomor atom ${e.n}`}
                >
                  <span className="pt-z">{e.n}</span>
                  <b>{e.s}</b>
                  <span className="pt-name">{e.name}</span>
                </button>
              );
            })}

            <div className="pt-placeholder" style={{ gridColumn: 3, gridRow: 6 }}>57–71</div>
            <div className="pt-placeholder" style={{ gridColumn: 3, gridRow: 7 }}>89–103</div>
          </div>
        </div>
      </section>

      {active && (
        <section className="pt-card pt-detail">
          <div className="pt-detail-nav">
            <button onClick={() => prevEl && setActiveZ(prevEl.n)} disabled={!prevEl}>
              <ChevronLeft size={16} /> Sebelumnya
            </button>
            <span>Unsur {active.n} dari {elements.length}</span>
            <button onClick={() => nextEl && setActiveZ(nextEl.n)} disabled={!nextEl}>
              Berikutnya <ChevronRight size={16} />
            </button>
          </div>

          <div className="pt-detail-body">
            <div className="pt-big" style={{ '--c': active.cat.color }}>
              <span className="pt-big-z">{active.n}</span>
              <strong>{active.s}</strong>
              <span className="pt-big-name">{active.name}</span>
              <small>{active.mass} u</small>
            </div>

            <div className="pt-facts">
              <div className="pt-kicker" style={{ color: active.cat.color }}>{active.cat.label}</div>
              <h3>{active.name}</h3>
              <p className="pt-cat-desc">{active.cat.desc}</p>

              <div className="pt-props">
                <div className="pt-prop"><span>Nomor atom</span><strong>{active.n}</strong></div>
                <div className="pt-prop"><span>Massa atom</span><strong>{active.mass} u</strong></div>
                <div className="pt-prop"><span>Proton</span><strong>{active.protons}</strong></div>
                <div className="pt-prop"><span>Elektron</span><strong>{active.electrons}</strong></div>
                <div className="pt-prop"><span>Neutron (perkiraan)</span><strong>{active.neutrons}</strong></div>
                <div className="pt-prop"><span>Golongan</span><strong>{active.group}</strong></div>
                <div className="pt-prop"><span>Periode</span><strong>{active.period}</strong></div>
                <div className="pt-prop"><span>Simbol</span><strong>{active.s}</strong></div>
              </div>

              <div className="pt-config">
                <span>Konfigurasi elektron (dasar)</span>
                <code>{active.config}</code>
              </div>

              {onAddToLab && (
                <button className="pt-add" onClick={() => onAddToLab(active.s)}>
                  <FlaskConical size={16} /> Gunakan di tabung reaksi
                </button>
              )}
            </div>
          </div>

          <div className="pt-note">
            <Info size={15} />
            <span>
              Proton dan elektron berlaku untuk atom netral. Neutron dihitung dari pembulatan massa atom,
              sehingga hanya perkiraan. Konfigurasi elektron mengikuti aturan Aufbau dan belum memuat
              pengecualian, misalnya pada Cr dan Cu.
            </span>
          </div>
        </section>
      )}
    </div>
  );
}