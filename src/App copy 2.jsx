import React, { useMemo, useState } from 'react';
import { Atom, FlaskConical, Search, RotateCcw, Plus, X, Sparkles, Beaker, BookOpen, History, ChevronRight, Info } from 'lucide-react';
import PeriodicTable from './PeriodicTable';
import './periodic-table.css';

const ELEMENTS = [
  { n:1,s:'H',name:'Hidrogen',mass:'1.008',type:'nonmetal',color:'#7dd3fc' },
  { n:2,s:'He',name:'Helium',mass:'4.003',type:'noble',color:'#c4b5fd' },
  { n:3,s:'Li',name:'Litium',mass:'6.94',type:'alkali',color:'#fda4af' },
  { n:4,s:'Be',name:'Berilium',mass:'9.012',type:'alkaline',color:'#fdba74' },
  { n:5,s:'B',name:'Boron',mass:'10.81',type:'metalloid',color:'#fcd34d' },
  { n:6,s:'C',name:'Karbon',mass:'12.011',type:'nonmetal',color:'#a3e635' },
  { n:7,s:'N',name:'Nitrogen',mass:'14.007',type:'nonmetal',color:'#93c5fd' },
  { n:8,s:'O',name:'Oksigen',mass:'15.999',type:'nonmetal',color:'#fb7185' },
  { n:9,s:'F',name:'Fluorin',mass:'18.998',type:'halogen',color:'#86efac' },
  { n:10,s:'Ne',name:'Neon',mass:'20.180',type:'noble',color:'#c4b5fd' },
  { n:11,s:'Na',name:'Natrium',mass:'22.990',type:'alkali',color:'#fda4af' },
  { n:12,s:'Mg',name:'Magnesium',mass:'24.305',type:'alkaline',color:'#fdba74' },
  { n:13,s:'Al',name:'Aluminium',mass:'26.982',type:'post',color:'#fcd34d' },
  { n:14,s:'Si',name:'Silikon',mass:'28.085',type:'metalloid',color:'#a3e635' },
  { n:15,s:'P',name:'Fosfor',mass:'30.974',type:'nonmetal',color:'#93c5fd' },
  { n:16,s:'S',name:'Sulfur',mass:'32.06',type:'nonmetal',color:'#fb7185' },
  { n:17,s:'Cl',name:'Klor',mass:'35.45',type:'halogen',color:'#86efac' },
  { n:18,s:'Ar',name:'Argon',mass:'39.948',type:'noble',color:'#c4b5fd' },
  { n:19,s:'K',name:'Kalium',mass:'39.098',type:'alkali',color:'#fda4af' },
  { n:20,s:'Ca',name:'Kalsium',mass:'40.078',type:'alkaline',color:'#fdba74' },
  { n:26,s:'Fe',name:'Besi',mass:'55.845',type:'transition',color:'#fcd34d' },
  { n:29,s:'Cu',name:'Tembaga',mass:'63.546',type:'transition',color:'#fda4af' },
  { n:30,s:'Zn',name:'Seng',mass:'65.38',type:'transition',color:'#fdba74' },
  { n:47,s:'Ag',name:'Perak',mass:'107.868',type:'transition',color:'#cbd5e1' },
  { n:79,s:'Au',name:'Emas',mass:'196.967',type:'transition',color:'#fbbf24' },
];

const REACTIONS = [
  { key:'H+O', ingredients:['H','O'], formula:'H₂O', name:'Air', equation:'2H₂ + O₂ → 2H₂O', desc:'Air tersusun dari dua atom hidrogen dan satu atom oksigen pada setiap molekul.', state:'Cair (pada suhu ruang)', color:'#38bdf8', type:'Pembentukan senyawa' },
  { key:'Na+Cl', ingredients:['Na','Cl'], formula:'NaCl', name:'Natrium klorida', equation:'2Na + Cl₂ → 2NaCl', desc:'Natrium dan klor membentuk senyawa ionik yang dikenal sebagai garam dapur.', state:'Padat', color:'#e2e8f0', type:'Senyawa ionik' },
  { key:'C+O', ingredients:['C','O'], formula:'CO₂', name:'Karbon dioksida', equation:'C + O₂ → CO₂', desc:'Karbon bereaksi dengan oksigen menghasilkan karbon dioksida.', state:'Gas', color:'#94a3b8', type:'Oksida nonlogam' },
  { key:'N+H', ingredients:['N','H'], formula:'NH₃', name:'Amonia', equation:'N₂ + 3H₂ ⇌ 2NH₃', desc:'Amonia merupakan senyawa yang mengandung nitrogen dan hidrogen.', state:'Gas', color:'#a78bfa', type:'Senyawa kovalen' },
  { key:'Mg+O', ingredients:['Mg','O'], formula:'MgO', name:'Magnesium oksida', equation:'2Mg + O₂ → 2MgO', desc:'Magnesium oksida terbentuk dari magnesium dan oksigen.', state:'Padat', color:'#f8fafc', type:'Oksida logam' },
  { key:'Fe+O', ingredients:['Fe','O'], formula:'Fe₂O₃', name:'Besi(III) oksida', equation:'4Fe + 3O₂ → 2Fe₂O₃', desc:'Besi dapat membentuk oksida; proses korosi pada kondisi nyata melibatkan air dan faktor lingkungan.', state:'Padat', color:'#c08457', type:'Oksida logam' },
  { key:'Cu+O', ingredients:['Cu','O'], formula:'CuO', name:'Tembaga(II) oksida', equation:'2Cu + O₂ → 2CuO', desc:'Tembaga dapat membentuk oksida tembaga ketika bereaksi dengan oksigen.', state:'Padat', color:'#334155', type:'Oksida logam' },
  { key:'Ca+O', ingredients:['Ca','O'], formula:'CaO', name:'Kalsium oksida', equation:'2Ca + O₂ → 2CaO', desc:'Kalsium oksida dikenal juga sebagai kapur tohor.', state:'Padat', color:'#f1f5f9', type:'Oksida logam' },
];

const EXAMPLES = [
  { label:'Air', formula:'H₂O', pair:['H','O'], tint:'#38bdf8' },
  { label:'Garam dapur', formula:'NaCl', pair:['Na','Cl'], tint:'#cbd5e1' },
  { label:'Karbon dioksida', formula:'CO₂', pair:['C','O'], tint:'#94a3b8' },
  { label:'Magnesium oksida', formula:'MgO', pair:['Mg','O'], tint:'#f8fafc' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('simulasi');
  const [selected, setSelected] = useState(['H','O']);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [result, setResult] = useState(REACTIONS[0]);
  const [history, setHistory] = useState([REACTIONS[0]]);
  const [message, setMessage] = useState('Pilih unsur lalu mulai simulasi.');
  const [running, setRunning] = useState(false);

  const filtered = useMemo(() => ELEMENTS.filter(e => {
    const q = search.toLowerCase();
    return (e.name.toLowerCase().includes(q) || e.s.toLowerCase().includes(q) || String(e.n).includes(q)) && (filter === 'all' || e.type === filter);
  }), [search, filter]);

  const findReaction = (symbols) => REACTIONS.find(r => r.ingredients.length === symbols.length && r.ingredients.every(s => symbols.includes(s)));
  const addElement = (symbol) => {
    if (selected.includes(symbol)) { setMessage(`${symbol} sudah ada di tabung.`); return; }
    if (selected.length >= 3) { setMessage('Maksimal 3 unsur dalam satu simulasi. Hapus unsur terlebih dahulu.'); return; }
    setSelected(prev => [...prev, symbol]); setMessage(`${symbol} ditambahkan ke tabung.`);
  };
  const handleAddFromPeriodic = (symbol) => {
    addElement(symbol);
    setActiveTab('simulasi');
  };
  const removeElement = (symbol) => setSelected(prev => prev.filter(s => s !== symbol));
  const reset = () => { setSelected([]); setResult(null); setRunning(false); setMessage('Tabung dikosongkan. Pilih unsur untuk memulai.'); };
  const simulate = () => {
    if (selected.length < 2) { setMessage('Pilih minimal dua unsur untuk simulasi.'); return; }
    setRunning(true); setMessage('Menganalisis kombinasi unsur…');
    window.setTimeout(() => {
      const found = findReaction(selected);
      setResult(found || { name:'Belum tersedia di database', formula:'—', equation:selected.join(' + ') + ' → ?', desc:'Kombinasi ini belum memiliki contoh reaksi dalam database pembelajaran ChemLab. Tidak semua unsur dapat langsung membentuk senyawa hanya dengan dicampurkan.', state:'Tidak dapat ditentukan', color:'#64748b', type:'Belum diketahui' });
      if (found) setHistory(prev => [found, ...prev.filter(x => x.key !== found.key)].slice(0,5));
      setMessage(found ? 'Simulasi selesai! Hasil ditemukan.' : 'Simulasi selesai, data reaksi belum tersedia.');
      setRunning(false);
    }, 650);
  };
  const chooseExample = (ex) => { setSelected(ex.pair); setResult(findReaction(ex.pair)); setMessage('Contoh kombinasi dipilih. Tekan Simulasikan untuk melihat hasil.'); };

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Atom size={24}/></div><div><b>ChemLab</b><span>VIRTUAL ELEMENTS</span></div></div>
      <div className="side-label">LABORATORIUM</div>
      <div
        className={activeTab === 'simulasi' ? 'side-active' : 'side-link'}
        onClick={() => setActiveTab('simulasi')}
        style={{ cursor: 'pointer' }}
      >
        <FlaskConical size={18}/><span>Simulasi Campuran</span>{activeTab === 'simulasi' && <span className="active-dot"/>}
      </div>
      <div
        className={activeTab === 'periodic' ? 'side-active' : 'side-link'}
        onClick={() => setActiveTab('periodic')}
        style={{ cursor: 'pointer' }}
      >
        <BookOpen size={18}/><span>Tabel Periodik</span>{activeTab === 'periodic' && <span className="active-dot"/>}
      </div>
      <div className="side-link"><History size={18}/><span>Riwayat</span></div>
      <div className="sidebar-bottom"><div className="safe-icon"><Info size={17}/></div><div><b>Mode edukasi</b><p>Simulasi berdasarkan contoh reaksi yang dikurasi.</p></div></div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <div className="crumb">
          Laboratorium <ChevronRight size={14}/> <strong>{activeTab === 'simulasi' ? 'Simulasi Campuran' : 'Tabel Periodik'}</strong>
        </div>
        <div className="top-pill"><span className="live-dot"/> SIMULATOR AKTIF</div>
      </header>

      {activeTab === 'periodic' ? (
        <PeriodicTable elements={ELEMENTS} onAddToLab={handleAddFromPeriodic} />
      ) : (
        <>
          <section className="intro"><div><div className="eyebrow"><Sparkles size={14}/> LAB KIMIA INTERAKTIF</div><h1>Jelajahi dunia<br/><em>unsur kimia.</em></h1><p>Gabungkan unsur, amati hasilnya, dan pelajari bagaimana materi<br className="desktop-break"/> dapat membentuk senyawa baru.</p></div><div className="hero-atom"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/><div className="atom-core">⚛</div><span className="electron e1"/><span className="electron e2"/><span className="electron e3"/></div></section>

          <div className="workspace">
            <section className="panel elements-panel"><div className="panel-head"><div><div className="panel-kicker">01 / PILIH BAHAN</div><h2>Tabel unsur</h2></div><span className="count-badge">{filtered.length} unsur</span></div>
              <div className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama atau simbol…"/><kbd>/</kbd></div>
              <div className="filter-row"><button className={filter==='all'?'filter active':'filter'} onClick={()=>setFilter('all')}>Semua</button><button className={filter==='nonmetal'?'filter active':'filter'} onClick={()=>setFilter('nonmetal')}>Nonlogam</button><button className={filter==='transition'?'filter active':'filter'} onClick={()=>setFilter('transition')}>Transisi</button><button className={filter==='alkali'?'filter active':'filter'} onClick={()=>setFilter('alkali')}>Alkali</button></div>
              <div className="element-grid">{filtered.map(e=><button key={e.s} className={`element-tile ${selected.includes(e.s)?'chosen':''}`} onClick={()=>addElement(e.s)} style={{'--element-color':e.color}} title={`Tambahkan ${e.name}`}><span className="atomic-number">{e.n}</span><b>{e.s}</b><span className="element-name">{e.name}</span></button>)}</div>
              <div className="elements-foot"><span><i className="legend-dot"/> Klik unsur untuk menambahkan</span><span>25 unsur ditampilkan</span></div>
            </section>

            <section className="panel experiment-panel"><div className="panel-head"><div><div className="panel-kicker">02 / AREA EKSPERIMEN</div><h2>Tabung reaksi</h2></div><button className="icon-button" onClick={reset} title="Kosongkan"><RotateCcw size={16}/></button></div>
              <div className="experiment-stage"><div className="stage-label">MIXING CHAMBER <span>● READY</span></div><div className={`tube-wrap ${running?'is-running':''}`}><div className="tube-cap"/><div className="tube"><div className="tube-liquid" style={{height:selected.length?`${Math.min(28+selected.length*16,78)}%`:'0%', background:result?.color || 'linear-gradient(135deg,#38bdf8,#8b5cf6)'}}>{selected.map((s,i)=><span key={s} className={`bubble b${i}`}/>)}</div><div className="tube-glare"/></div><div className="tube-base"/></div><div className="stage-caption">{selected.length?`${selected.length} unsur dipilih`:'Tabung masih kosong'}</div></div>
              <div className="selected-area"><div className="selected-title">UNSUR TERPILIH <span>{selected.length}/3</span></div><div className="selected-chips">{selected.length?selected.map(s=>{const e=ELEMENTS.find(x=>x.s===s);return <div className="selected-chip" key={s} style={{'--element-color':e.color}}><span>{s}</span><small>{e.name}</small><button onClick={()=>removeElement(s)} aria-label={`Hapus ${s}`}><X size={13}/></button></div>}):<div className="empty-selection">Pilih unsur dari tabel di sebelah kiri</div>}</div></div>
              <button className="simulate-button" onClick={simulate} disabled={running||selected.length<2}>{running?<><span className="spinner"/> Menjalankan simulasi…</>:<><FlaskConical size={17}/> Simulasikan campuran <span>→</span></>}</button>
              <div className="status-line"><span className={running?'status-pulse':''}/>{message}</div>
            </section>
          </div>

          <section className="result-panel panel"><div className="result-top"><div><div className="panel-kicker">03 / HASIL SIMULASI</div><h2>Produk reaksi</h2></div><div className="result-tag"><Sparkles size={14}/> HASIL EDUKASI</div></div>
            {result?<div className="result-content"><div className="product-visual" style={{'--product-color':result.color}}><div className="product-orb"><span>{result.formula}</span></div><div className="orb-shadow"/></div><div className="product-info"><div className="product-type">{result.type}</div><h3>{result.name}</h3><p>{result.desc}</p><div className="equation"><span>Persamaan reaksi</span><strong>{result.equation}</strong></div><div className="product-meta"><div><span>RUMUS KIMIA</span><b>{result.formula}</b></div><div><span>WUJUD UMUM</span><b>{result.state}</b></div></div></div></div>:<div className="result-empty"><div className="empty-graphic"><Beaker size={30}/><span>?</span></div><div><b>Belum ada hasil</b><p>Pilih minimal dua unsur, lalu jalankan simulasi untuk melihat senyawa yang mungkin terbentuk.</p></div></div>}
          </section>

          <section className="examples-section"><div className="examples-heading"><div><div className="panel-kicker">MULAI DARI CONTOH</div><h2>Kombinasi populer</h2></div><span>Pilih untuk mencoba</span></div><div className="example-grid">{EXAMPLES.map(ex=><button className="example-card" key={ex.formula} onClick={()=>chooseExample(ex)}><div className="example-symbols">{ex.pair.map(s=><span key={s} style={{'--element-color':ELEMENTS.find(e=>e.s===s)?.color}}>{s}</span>)}<i>+</i></div><div><b>{ex.label}</b><small>{ex.formula}</small></div><ChevronRight size={17}/></button>)}</div></section>
        </>
      )}

      <footer><span>CHEMLAB <b>•</b> SIMULASI KIMIA EDUKATIF</span><span>Hasil bukan panduan eksperimen nyata.</span></footer>
    </main>
  </div>;
}