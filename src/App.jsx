import React, { useMemo, useState } from 'react';
import {
  Atom, FlaskConical, Search, RotateCcw, X, Sparkles,
  Beaker, Table2, History, Info, CheckCircle2, Play,
  Trash2, Lightbulb, GraduationCap, ChevronDown, Pipette
} from 'lucide-react';
import PeriodicTable from './PeriodicTable';
import './periodic-table.css';
import './chemlab-theme.css';
export const ELEMENTS = [
  { n: 1, s: 'H', name: 'Hidrogen', mass: '1.008', type: 'nonmetal', color: '#1d6fe8' },
  { n: 2, s: 'He', name: 'Helium', mass: '4.003', type: 'noble', color: '#7c3aed' },
  { n: 3, s: 'Li', name: 'Litium', mass: '6.94', type: 'alkali', color: '#dc2626' },
  { n: 4, s: 'Be', name: 'Berilium', mass: '9.012', type: 'alkaline', color: '#d97706' },
  { n: 5, s: 'B', name: 'Boron', mass: '10.81', type: 'metalloid', color: '#0d9488' },
  { n: 6, s: 'C', name: 'Karbon', mass: '12.011', type: 'nonmetal', color: '#2563eb' },
  { n: 7, s: 'N', name: 'Nitrogen', mass: '14.007', type: 'nonmetal', color: '#1e40af' },
  { n: 8, s: 'O', name: 'Oksigen', mass: '15.999', type: 'nonmetal', color: '#0284c7' },
  { n: 9, s: 'F', name: 'Fluorin', mass: '18.998', type: 'halogen', color: '#16a34a' },
  { n: 10, s: 'Ne', name: 'Neon', mass: '20.180', type: 'noble', color: '#6d28d9' },
  { n: 11, s: 'Na', name: 'Natrium', mass: '22.990', type: 'alkali', color: '#e11d48' },
  { n: 12, s: 'Mg', name: 'Magnesium', mass: '24.305', type: 'alkaline', color: '#ea580c' },
  { n: 13, s: 'Al', name: 'Aluminium', mass: '26.982', type: 'post', color: '#0f766e' },
  { n: 14, s: 'Si', name: 'Silikon', mass: '28.085', type: 'metalloid', color: '#059669' },
  { n: 15, s: 'P', name: 'Fosfor', mass: '30.974', type: 'nonmetal', color: '#3b82f6' },
  { n: 16, s: 'S', name: 'Belerang', mass: '32.06', type: 'nonmetal', color: '#ca8a04' },
  { n: 17, s: 'Cl', name: 'Klorin', mass: '35.45', type: 'halogen', color: '#15803d' },
  { n: 18, s: 'Ar', name: 'Argon', mass: '39.948', type: 'noble', color: '#7e22ce' },
  { n: 19, s: 'K', name: 'Kalium', mass: '39.098', type: 'alkali', color: '#be123c' },
  { n: 20, s: 'Ca', name: 'Kalsium', mass: '40.078', type: 'alkaline', color: '#c2410c' },
  { n: 21, s: 'Sc', name: 'Skandium', mass: '44.956', type: 'transition', color: '#b45309' },
  { n: 22, s: 'Ti', name: 'Titanium', mass: '47.867', type: 'transition', color: '#d97706' },
  { n: 23, s: 'V', name: 'Vanadium', mass: '50.942', type: 'transition', color: '#b45309' },
  { n: 24, s: 'Cr', name: 'Kromium', mass: '51.996', type: 'transition', color: '#ca8a04' },
  { n: 25, s: 'Mn', name: 'Mangan', mass: '54.938', type: 'transition', color: '#a16207' },
  { n: 26, s: 'Fe', name: 'Besi', mass: '55.845', type: 'transition', color: '#d97706' },
  { n: 27, s: 'Co', name: 'Kobalt', mass: '58.933', type: 'transition', color: '#1d4ed8' },
  { n: 28, s: 'Ni', name: 'Nikel', mass: '58.693', type: 'transition', color: '#475569' },
  { n: 29, s: 'Cu', name: 'Tembaga', mass: '63.546', type: 'transition', color: '#b45309' },
  { n: 30, s: 'Zn', name: 'Seng', mass: '65.38', type: 'transition', color: '#64748b' },
  { n: 31, s: 'Ga', name: 'Galium', mass: '69.723', type: 'post', color: '#0d9488' },
  { n: 32, s: 'Ge', name: 'Germanium', mass: '72.630', type: 'metalloid', color: '#10b981' },
  { n: 33, s: 'As', name: 'Arsen', mass: '74.922', type: 'metalloid', color: '#059669' },
  { n: 34, s: 'Se', name: 'Selenium', mass: '78.971', type: 'nonmetal', color: '#2563eb' },
  { n: 35, s: 'Br', name: 'Bromin', mass: '79.904', type: 'halogen', color: '#991b1b' },
  { n: 36, s: 'Kr', name: 'Kripton', mass: '83.798', type: 'noble', color: '#6d28d9' },
  { n: 37, s: 'Rb', name: 'Rubidium', mass: '85.468', type: 'alkali', color: '#dc2626' },
  { n: 38, s: 'Sr', name: 'Stronsium', mass: '87.62', type: 'alkaline', color: '#ea580c' },
  { n: 39, s: 'Y', name: 'Itrium', mass: '88.906', type: 'transition', color: '#d97706' },
  { n: 40, s: 'Zr', name: 'Zirkonium', mass: '91.224', type: 'transition', color: '#b45309' },
  { n: 41, s: 'Nb', name: 'Niobium', mass: '92.906', type: 'transition', color: '#ca8a04' },
  { n: 42, s: 'Mo', name: 'Molibdenum', mass: '95.95', type: 'transition', color: '#a16207' },
  { n: 43, s: 'Tc', name: 'Teknesium', mass: '98', type: 'transition', color: '#d97706' },
  { n: 44, s: 'Ru', name: 'Rutenium', mass: '101.07', type: 'transition', color: '#b45309' },
  { n: 45, s: 'Rh', name: 'Rodium', mass: '102.91', type: 'transition', color: '#ca8a04' },
  { n: 46, s: 'Pd', name: 'Paladium', mass: '106.42', type: 'transition', color: '#475569' },
  { n: 47, s: 'Ag', name: 'Perak', mass: '107.868', type: 'transition', color: '#64748b' },
  { n: 48, s: 'Cd', name: 'Kadmium', mass: '112.41', type: 'transition', color: '#d97706' },
  { n: 49, s: 'In', name: 'Indium', mass: '114.82', type: 'post', color: '#0f766e' },
  { n: 50, s: 'Sn', name: 'Timah', mass: '118.71', type: 'post', color: '#0d9488' },
  { n: 51, s: 'Sb', name: 'Antimon', mass: '121.76', type: 'metalloid', color: '#059669' },
  { n: 52, s: 'Te', name: 'Telurium', mass: '127.60', type: 'metalloid', color: '#10b981' },
  { n: 53, s: 'I', name: 'Iodin', mass: '126.90', type: 'halogen', color: '#7e22ce' },
  { n: 54, s: 'Xe', name: 'Xenon', mass: '131.29', type: 'noble', color: '#6d28d9' },
  { n: 55, s: 'Cs', name: 'Sesium', mass: '132.91', type: 'alkali', color: '#dc2626' },
  { n: 56, s: 'Ba', name: 'Barium', mass: '137.33', type: 'alkaline', color: '#ea580c' },
  { n: 57, s: 'La', name: 'Lantanum', mass: '138.91', type: 'lanthanoid', color: '#ea580c' },
  { n: 58, s: 'Ce', name: 'Serium', mass: '140.12', type: 'lanthanoid', color: '#f97316' },
  { n: 59, s: 'Pr', name: 'Praseodimium', mass: '140.91', type: 'lanthanoid', color: '#ea580c' },
  { n: 60, s: 'Nd', name: 'Neodimium', mass: '144.24', type: 'lanthanoid', color: '#f97316' },
  { n: 61, s: 'Pm', name: 'Prometium', mass: '145', type: 'lanthanoid', color: '#ea580c' },
  { n: 62, s: 'Sm', name: 'Samarium', mass: '150.36', type: 'lanthanoid', color: '#f97316' },
  { n: 63, s: 'Eu', name: 'Europium', mass: '151.96', type: 'lanthanoid', color: '#ea580c' },
  { n: 64, s: 'Gd', name: 'Gadolinium', mass: '157.25', type: 'lanthanoid', color: '#f97316' },
  { n: 65, s: 'Tb', name: 'Terbium', mass: '158.93', type: 'lanthanoid', color: '#ea580c' },
  { n: 66, s: 'Dy', name: 'Disprosium', mass: '162.50', type: 'lanthanoid', color: '#f97316' },
  { n: 67, s: 'Ho', name: 'Holmium', mass: '164.93', type: 'lanthanoid', color: '#ea580c' },
  { n: 68, s: 'Er', name: 'Erbium', mass: '167.26', type: 'lanthanoid', color: '#f97316' },
  { n: 69, s: 'Tm', name: 'Tulium', mass: '168.93', type: 'lanthanoid', color: '#ea580c' },
  { n: 70, s: 'Yb', name: 'Iterbium', mass: '173.05', type: 'lanthanoid', color: '#f97316' },
  { n: 71, s: 'Lu', name: 'Lutesium', mass: '174.97', type: 'lanthanoid', color: '#ea580c' },
  { n: 72, s: 'Hf', name: 'Hafnium', mass: '178.49', type: 'transition', color: '#b45309' },
  { n: 73, s: 'Ta', name: 'Tantalum', mass: '180.95', type: 'transition', color: '#d97706' },
  { n: 74, s: 'W', name: 'Wolfram', mass: '183.84', type: 'transition', color: '#475569' },
  { n: 75, s: 'Re', name: 'Renium', mass: '186.21', type: 'transition', color: '#b45309' },
  { n: 76, s: 'Os', name: 'Osmium', mass: '190.23', type: 'transition', color: '#1e3a8a' },
  { n: 77, s: 'Ir', name: 'Iridium', mass: '192.22', type: 'transition', color: '#475569' },
  { n: 78, s: 'Pt', name: 'Platina', mass: '195.08', type: 'transition', color: '#64748b' },
  { n: 79, s: 'Au', name: 'Emas', mass: '196.97', type: 'transition', color: '#eab308' },
  { n: 80, s: 'Hg', name: 'Raksa', mass: '200.59', type: 'transition', color: '#64748b' },
  { n: 81, s: 'Tl', name: 'Talium', mass: '204.38', type: 'post', color: '#0f766e' },
  { n: 82, s: 'Pb', name: 'Timbal', mass: '207.2', type: 'post', color: '#334155' },
  { n: 83, s: 'Bi', name: 'Bismut', mass: '208.98', type: 'post', color: '#0d9488' },
  { n: 84, s: 'Po', name: 'Polonium', mass: '209', type: 'metalloid', color: '#059669' },
  { n: 85, s: 'At', name: 'Astatin', mass: '210', type: 'halogen', color: '#15803d' },
  { n: 86, s: 'Rn', name: 'Radon', mass: '222', type: 'noble', color: '#7c3aed' },
  { n: 87, s: 'Fr', name: 'Fransium', mass: '223', type: 'alkali', color: '#dc2626' },
  { n: 88, s: 'Ra', name: 'Radium', mass: '226', type: 'alkaline', color: '#ea580c' },
  { n: 89, s: 'Ac', name: 'Aktinium', mass: '227', type: 'actinoid', color: '#db2777' },
  { n: 90, s: 'Th', name: 'Torium', mass: '232.04', type: 'actinoid', color: '#ec4899' },
  { n: 91, s: 'Pa', name: 'Protaktinium', mass: '231.04', type: 'actinoid', color: '#db2777' },
  { n: 92, s: 'U', name: 'Uranium', mass: '238.03', type: 'actinoid', color: '#be185d' },
  { n: 93, s: 'Np', name: 'Neptunium', mass: '237', type: 'actinoid', color: '#db2777' },
  { n: 94, s: 'Pu', name: 'Plutonium', mass: '244', type: 'actinoid', color: '#be185d' },
  { n: 95, s: 'Am', name: 'Amerisium', mass: '243', type: 'actinoid', color: '#db2777' },
  { n: 96, s: 'Cm', name: 'Kurium', mass: '247', type: 'actinoid', color: '#ec4899' },
  { n: 97, s: 'Bk', name: 'Berkelium', mass: '247', type: 'actinoid', color: '#db2777' },
  { n: 98, s: 'Cf', name: 'Kalifornium', mass: '251', type: 'actinoid', color: '#ec4899' },
  { n: 99, s: 'Es', name: 'Einsteinium', mass: '252', type: 'actinoid', color: '#db2777' },
  { n: 100, s: 'Fm', name: 'Fermium', mass: '257', type: 'actinoid', color: '#ec4899' },
  { n: 101, s: 'Md', name: 'Mendelevium', mass: '258', type: 'actinoid', color: '#db2777' },
  { n: 102, s: 'No', name: 'Nobelium', mass: '259', type: 'actinoid', color: '#ec4899' },
  { n: 103, s: 'Lr', name: 'Lawrensium', mass: '266', type: 'actinoid', color: '#db2777' },
  { n: 104, s: 'Rf', name: 'Ruterfordium', mass: '267', type: 'transition', color: '#b45309' },
  { n: 105, s: 'Db', name: 'Dubnium', mass: '268', type: 'transition', color: '#d97706' },
  { n: 106, s: 'Sg', name: 'Seaborgium', mass: '269', type: 'transition', color: '#b45309' },
  { n: 107, s: 'Bh', name: 'Bohrium', mass: '270', type: 'transition', color: '#d97706' },
  { n: 108, s: 'Hs', name: 'Hasium', mass: '277', type: 'transition', color: '#b45309' },
  { n: 109, s: 'Mt', name: 'Meitnerium', mass: '278', type: 'transition', color: '#d97706' },
  { n: 110, s: 'Ds', name: 'Darmstadtium', mass: '281', type: 'transition', color: '#b45309' },
  { n: 111, s: 'Rg', name: 'Roentgenium', mass: '282', type: 'transition', color: '#d97706' },
  { n: 112, s: 'Cn', name: 'Kopernisium', mass: '285', type: 'transition', color: '#b45309' },
  { n: 113, s: 'Nh', name: 'Nihonium', mass: '286', type: 'post', color: '#0f766e' },
  { n: 114, s: 'Fl', name: 'Flerovium', mass: '289', type: 'post', color: '#0d9488' },
  { n: 115, s: 'Mc', name: 'Moskovium', mass: '290', type: 'post', color: '#0f766e' },
  { n: 116, s: 'Lv', name: 'Livermorium', mass: '293', type: 'post', color: '#0d9488' },
  { n: 117, s: 'Ts', name: 'Tenesin', mass: '294', type: 'halogen', color: '#15803d' },
  { n: 118, s: 'Og', name: 'Oganeson', mass: '294', type: 'noble', color: '#7c3aed' },
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