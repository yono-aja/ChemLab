import React, { useMemo, useState } from 'react';
import {
  Atom, FlaskConical, Search, RotateCcw, X, Sparkles,
  Beaker, Table2, History, Info, CheckCircle2, Play,
  Trash2, Lightbulb, GraduationCap, ChevronDown, Pipette
} from 'lucide-react';
import PeriodicTable from './PeriodicTable';
import './periodic-table.css';
import './chemlab-theme.css';

const ELEMENTS = [
  { n:1,s:'H',name:'Hidrogen',mass:'1.008',type:'nonmetal',color:'#1d6fe8' },
  { n:2,s:'He',name:'Helium',mass:'4.003',type:'noble',color:'#7c3aed' },
  { n:3,s:'Li',name:'Litium',mass:'6.94',type:'alkali',color:'#16a34a' },
  { n:4,s:'Be',name:'Berilium',mass:'9.012',type:'alkaline',color:'#d97706' },
  { n:5,s:'B',name:'Boron',mass:'10.81',type:'metalloid',color:'#0d9488' },
  { n:6,s:'C',name:'Karbon',mass:'12.011',type:'nonmetal',color:'#334155' },
  { n:7,s:'N',name:'Nitrogen',mass:'14.007',type:'nonmetal',color:'#1e40af' },
  { n:8,s:'O',name:'Oksigen',mass:'15.999',type:'nonmetal',color:'#991b1b' },
  { n:9,s:'F',name:'Fluorin',mass:'18.998',type:'halogen',color:'#15803d' },
  { n:10,s:'Ne',name:'Neon',mass:'20.180',type:'noble',color:'#6d28d9' },
  { n:11,s:'Na',name:'Natrium',mass:'22.990',type:'alkali',color:'#0284c7' },
  { n:12,s:'Mg',name:'Magnesium',mass:'24.305',type:'alkaline',color:'#16a34a' },
  { n:13,s:'Al',name:'Aluminium',mass:'26.982',type:'post',color:'#475569' },
  { n:14,s:'Si',name:'Silikon',mass:'28.085',type:'metalloid',color:'#0f766e' },
  { n:15,s:'P',name:'Fosfor',mass:'30.974',type:'nonmetal',color:'#b45309' },
  { n:16,s:'S',name:'Sulfur',mass:'32.06',type:'nonmetal',color:'#ca8a04' },
  { n:17,s:'Cl',name:'Klorin',mass:'35.45',type:'halogen',color:'#059669' },
  { n:18,s:'Ar',name:'Argon',mass:'39.948',type:'noble',color:'#7e22ce' },
  { n:19,s:'K',name:'Kalium',mass:'39.098',type:'alkali',color:'#2563eb' },
  { n:20,s:'Ca',name:'Kalsium',mass:'40.078',type:'alkaline',color:'#ea580c' },
  { n:26,s:'Fe',name:'Besi',mass:'55.845',type:'transition',color:'#d97706' },
  { n:29,s:'Cu',name:'Tembaga',mass:'63.546',type:'transition',color:'#9333ea' },
  { n:30,s:'Zn',name:'Seng',mass:'65.38',type:'transition',color:'#64748b' },
  { n:47,s:'Ag',name:'Perak',mass:'107.868',type:'transition',color:'#94a3b8' },
  { n:79,s:'Au',name:'Emas',mass:'196.967',type:'transition',color:'#eab308' },
];

const REACTIONS = [
  { key:'Na+Cl', ingredients:['Na','Cl'], formula:'NaCl', name:'Natrium klorida', equation:'2Na + Cl₂ → 2NaCl', desc:'Natrium bereaksi dengan klorin membentuk garam dapur.', state:'Padat (Kristal)', color:'#38bdf8', type:'Senyawa ionik' },
  { key:'H+O', ingredients:['H','O'], formula:'H₂O', name:'Air', equation:'2H₂ + O₂ → 2H₂O', desc:'Air tersusun dari dua atom hidrogen dan satu atom oksigen pada setiap molekul.', state:'Cair (pada suhu ruang)', color:'#0ea5e9', type:'Pembentukan senyawa' },
  { key:'C+O', ingredients:['C','O'], formula:'CO₂', name:'Karbon dioksida', equation:'C + O₂ → CO₂', desc:'Karbon bereaksi dengan oksigen menghasilkan karbon dioksida.', state:'Gas', color:'#94a3b8', type:'Oksida nonlogam' },
  { key:'N+H', ingredients:['N','H'], formula:'NH₃', name:'Amonia', equation:'N₂ + 3H₂ ⇌ 2NH₃', desc:'Amonia merupakan senyawa yang mengandung nitrogen dan hidrogen.', state:'Gas', color:'#a78bfa', type:'Senyawa kovalen' },
  { key:'Mg+O', ingredients:['Mg','O'], formula:'MgO', name:'Magnesium oksida', equation:'2Mg + O₂ → 2MgO', desc:'Magnesium oksida terbentuk dari magnesium dan oksigen.', state:'Padat', color:'#f8fafc', type:'Oksida logam' },
  { key:'Fe+O', ingredients:['Fe','O'], formula:'Fe₂O₃', name:'Besi(III) oksida', equation:'4Fe + 3O₂ → 2Fe₂O₃', desc:'Besi dapat membentuk oksida; proses korosi pada kondisi nyata melibatkan air dan faktor lingkungan.', state:'Padat', color:'#d97706', type:'Oksida logam' },
  { key:'Cu+O', ingredients:['Cu','O'], formula:'CuO', name:'Tembaga(II) oksida', equation:'2Cu + O₂ → 2CuO', desc:'Tembaga dapat membentuk oksida tembaga ketika bereaksi dengan oksigen.', state:'Padat', color:'#475569', type:'Oksida logam' },
  { key:'Ca+O', ingredients:['Ca','O'], formula:'CaO', name:'Kalsium oksida', equation:'2Ca + O₂ → 2CaO', desc:'Kalsium oksida dikenal juga sebagai kapur tohor.', state:'Padat', color:'#f1f5f9', type:'Oksida logam' },
];

function formatNow() {
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const d = String(now.getDate()).padStart(2, '0');
  const m = months[now.getMonth()];
  const y = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${d} ${m} ${y}, ${hh}:${mm}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('simulasi');
  const [selected, setSelected] = useState(['Na', 'Cl']);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(REACTIONS[0]);
  const [history, setHistory] = useState([
    {
      id: 1,
      time: formatNow(),
      ingredients: ['Na', 'Cl'],
      formula: 'NaCl',
      name: 'Natrium klorida',
      success: true,
    }
  ]);
  const [message, setMessage] = useState('Pilih minimal 2 unsur untuk melihat hasil reaksi.');
  const [running, setRunning] = useState(false);

  const filtered = useMemo(() => ELEMENTS.filter(e => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return e.name.toLowerCase().includes(q) || e.s.toLowerCase().includes(q) || String(e.n).includes(q);
  }), [search]);

  const findReaction = (symbols) =>
    REACTIONS.find(r => r.ingredients.length === symbols.length && r.ingredients.every(s => symbols.includes(s)));

  const toggleElement = (symbol) => {
    if (selected.includes(symbol)) {
      setSelected(prev => prev.filter(s => s !== symbol));
      setMessage(`${symbol} dikeluarkan dari area pencampuran.`);
      return;
    }
    if (selected.length >= 3) {
      setMessage('Maksimal 3 unsur dalam satu simulasi. Hapus unsur terlebih dahulu.');
      return;
    }
    setSelected(prev => [...prev, symbol]);
    setMessage(`${symbol} dipilih untuk dicampurkan.`);
  };

  const handleAddFromPeriodic = (symbol) => {
    if (!selected.includes(symbol) && selected.length < 3) {
      setSelected(prev => [...prev, symbol]);
    }
    setActiveTab('simulasi');
  };

  const removeElement = (symbol) => {
    setSelected(prev => prev.filter(s => s !== symbol));
  };

  const simulate = () => {
    if (selected.length < 2) {
      setMessage('Pilih minimal 2 unsur untuk melihat hasil reaksi.');
      return;
    }
    setRunning(true);
    setMessage('Mensimulasikan reaksi kimia...');
    window.setTimeout(() => {
      const found = findReaction(selected);
      const outcome = found || {
        name: 'Belum tersedia di database',
        formula: '?',
        equation: selected.join(' + ') + ' → ?',
        desc: 'Kombinasi unsur ini belum memiliki data reaksi di database ChemLab.',
        state: 'Tidak diketahui',
        color: '#64748b',
        type: 'Tidak bereaksi / Belum dikurasi',
        unknown: true,
      };
      setResult(outcome);
      setHistory(prev => [
        {
          id: Date.now(),
          time: formatNow(),
          ingredients: [...selected],
          formula: found ? found.formula : '—',
          name: found ? found.name : 'Tidak tersedia',
          success: Boolean(found),
        },
        ...prev,
      ].slice(0, 8));
      setMessage(found ? 'Reaksi berhasil disimulasikan!' : 'Data reaksi belum tersedia di database.');
      setRunning(false);
    }, 550);
  };

  const clearHistory = () => setHistory([]);

  const getEl = (sym) => ELEMENTS.find(e => e.s === sym) || { s: sym, name: sym, color: '#3b82f6' };

  return (
    <div className="cl-app">
      {/* TOP NAVIGATION BAR */}
      <header className="cl-navbar">
        <div className="cl-brand" onClick={() => setActiveTab('simulasi')}>
          <div className="cl-brand-icon">
            <Atom size={28} strokeWidth={1.8} />
          </div>
          <span className="cl-brand-name">ChemLab</span>
        </div>

        <nav className="cl-nav-tabs">
          <button
            className={`cl-nav-btn ${activeTab === 'simulasi' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulasi')}
          >
            <FlaskConical size={17} />
            <span>Laboratorium</span>
          </button>
          <button
            className={`cl-nav-btn ${activeTab === 'periodic' ? 'active' : ''}`}
            onClick={() => setActiveTab('periodic')}
          >
            <Table2 size={17} />
            <span>Tabel Periodik</span>
          </button>
          <button
            className={`cl-nav-btn ${activeTab === 'riwayat' ? 'active' : ''}`}
            onClick={() => setActiveTab('riwayat')}
          >
            <History size={17} />
            <span>Riwayat</span>
          </button>
        </nav>

        <div className="cl-mode-badge">
          <GraduationCap size={17} />
          <span>Mode Belajar</span>
          <ChevronDown size={15} />
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="cl-hero">
        <div className="cl-hero-left">
          <div className="cl-hero-flask">
            <FlaskConical size={34} />
          </div>
          <div>
            <h1>{activeTab === 'periodic' ? 'Tabel Periodik Unsur' : 'Laboratorium Reaksi'}</h1>
            <p>
              {activeTab === 'periodic'
                ? 'Jelajahi sifat, nomor atom, dan konfigurasi elektron setiap unsur.'
                : 'Pilih unsur, campurkan, lalu amati hasil reaksinya.'}
            </p>
          </div>
        </div>

        {/* Dekorasi Atom & Molekul */}
        <div className="cl-hero-art" aria-hidden="true">
          <div className="cl-glow-atom">
            <Atom size={92} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="cl-container">
        {activeTab === 'periodic' ? (
          <PeriodicTable elements={ELEMENTS} onAddToLab={handleAddFromPeriodic} />
        ) : (
          <>
            {/* 3 KOLOM WORKSPACE */}
            <div className="cl-grid-3">
              {/* KOLOM 1: PILIH UNSUR */}
              <section className="cl-card">
                <div className="cl-card-head">
                  <Atom size={20} className="cl-icon-cyan" />
                  <h2>Pilih Unsur</h2>
                </div>

                <div className="cl-search">
                  <Search size={16} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari unsur..."
                  />
                  {search && (
                    <button className="cl-clear-search" onClick={() => setSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="cl-el-grid">
                  {filtered.map((el) => {
                    const isSelected = selected.includes(el.s);
                    return (
                      <button
                        key={el.s}
                        className={`cl-el-tile ${isSelected ? 'selected' : ''}`}
                        style={{ '--tile-bg': el.color }}
                        onClick={() => toggleElement(el.s)}
                        title={`${el.name} (${el.s})`}
                      >
                        {isSelected && (
                          <span className="cl-check-badge">
                            ✓
                          </span>
                        )}
                        <span className="cl-el-num">{el.n}</span>
                        <strong className="cl-el-sym">{el.s}</strong>
                      </button>
                    );
                  })}
                </div>

                <div className="cl-tip-box">
                  <Lightbulb size={18} className="cl-tip-icon" />
                  <span>{message}</span>
                </div>
              </section>

              {/* KOLOM 2: AREA PENCAMPURAN */}
              <section className="cl-card cl-mix-card">
                <div className="cl-card-head">
                  <Pipette size={20} className="cl-icon-cyan" />
                  <h2>Area Pencampuran</h2>
                </div>

                {/* Unsur Terpilih Pills */}
                <div className="cl-selected-row">
                  {selected.length === 0 ? (
                    <div className="cl-empty-pill">Belum ada unsur dipilih</div>
                  ) : (
                    selected.map((sym, idx) => {
                      const info = getEl(sym);
                      return (
                        <React.Fragment key={sym}>
                          {idx > 0 && <span className="cl-plus">+</span>}
                          <div className="cl-pill" style={{ '--pill-bg': info.color }}>
                            <button
                              className="cl-pill-remove"
                              onClick={() => removeElement(sym)}
                              title={`Hapus ${sym}`}
                            >
                              <X size={11} />
                            </button>
                            <strong>{info.s}</strong>
                            <span>({info.name})</span>
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}
                </div>

                {/* Tabung Reaksi Glowing */}
                <div className={`cl-tube-stage ${running ? 'shaking' : ''}`}>
                  <div className="cl-tube-glass">
                    <div
                      className="cl-tube-fluid"
                      style={{
                        height: selected.length ? `${Math.min(35 + selected.length * 18, 75)}%` : '0%',
                      }}
                    >
                      <span className="cl-bubble b1" />
                      <span className="cl-bubble b2" />
                      <span className="cl-bubble b3" />
                      <span className="cl-bubble b4" />
                    </div>
                    <div className="cl-tube-shine" />
                  </div>
                  <div className="cl-tube-ring ring-outer" />
                  <div className="cl-tube-ring ring-inner" />
                </div>

                <button
                  className="cl-sim-btn"
                  onClick={simulate}
                  disabled={running || selected.length < 2}
                >
                  <Play size={17} fill="currentColor" />
                  <span>{running ? 'Mensimulasikan...' : 'Simulasikan Reaksi'}</span>
                </button>
              </section>

              {/* KOLOM 3: HASIL REAKSI */}
              <section className={`cl-card cl-result-card ${result && !result.unknown ? 'has-success' : ''}`}>
                <div className="cl-card-head">
                  <CheckCircle2 size={20} className="cl-icon-green" />
                  <h2>Hasil Reaksi</h2>
                </div>

                {result ? (
                  <>
                    <div className="cl-eq-box">
                      {result.equation.includes('→') ? (
                        <>
                          <span>{result.equation.split('→')[0]}</span>
                          <span className="cl-eq-arrow">→</span>
                          <span>{result.equation.split('→')[1]}</span>
                        </>
                      ) : (
                        <span>{result.equation}</span>
                      )}
                    </div>

                    <div className="cl-product-showcase">
                      <div
                        className="cl-crystal-orb"
                        style={{ '--orb-color': result.color || '#38bdf8' }}
                      >
                        <Sparkles size={28} className="cl-sparkle-icon" />
                        <span className="cl-orb-formula">{result.formula}</span>
                      </div>
                      <h3 className="cl-product-title">{result.name}</h3>

                      <div className={`cl-status-pill ${result.unknown ? 'warn' : 'ok'}`}>
                        <CheckCircle2 size={15} />
                        <span>{result.unknown ? 'Belum tersedia' : 'Reaksi berhasil'}</span>
                      </div>
                    </div>

                    <div className="cl-desc-box">
                      <Info size={18} className="cl-info-icon" />
                      <p>{result.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="cl-result-empty">
                    <Beaker size={42} />
                    <p>Pilih minimal 2 unsur lalu klik <b>Simulasikan Reaksi</b>.</p>
                  </div>
                )}
              </section>
            </div>

            {/* PANEL BAWAH: RIWAYAT PERCOBAAN */}
            <section className="cl-card cl-history-card">
              <div className="cl-history-head">
                <div className="cl-card-head" style={{ marginBottom: 0 }}>
                  <History size={20} className="cl-icon-cyan" />
                  <h2>Riwayat Percobaan</h2>
                </div>
                <button className="cl-reset-btn" onClick={clearHistory}>
                  <Trash2 size={15} />
                  <span>Reset</span>
                </button>
              </div>

              <div className="cl-table-wrap">
                <table className="cl-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Tanggal</th>
                      <th>Unsur yang Dicampur</th>
                      <th>Hasil</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="cl-empty-row">
                          Belum ada riwayat percobaan.
                        </td>
                      </tr>
                    ) : (
                      history.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{idx + 1}</td>
                          <td>{item.time}</td>
                          <td>
                            <div className="cl-hist-mix">
                              {item.ingredients.map((sym, i) => (
                                <React.Fragment key={sym}>
                                  {i > 0 && <span className="cl-hist-op">+</span>}
                                  <span
                                    className="cl-mini-badge"
                                    style={{ background: getEl(sym).color }}
                                  >
                                    {sym}
                                  </span>
                                </React.Fragment>
                              ))}
                              <span className="cl-hist-op">→</span>
                              <span className="cl-mini-badge result">
                                {item.formula}
                              </span>
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <span className={`cl-ket ${item.success ? 'ok' : 'fail'}`}>
                              <CheckCircle2 size={15} />
                              {item.success ? 'Berhasil' : 'Tidak tersedia'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}