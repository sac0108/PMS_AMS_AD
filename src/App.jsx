import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, ChevronRight,
  CircleDollarSign, Command, Cpu, Gauge, Globe2, Hexagon, Layers3, Mic, Network,
  Orbit, Play, Radio, Search, ShieldCheck, Sparkles, Target, TrendingUp, TriangleAlert,
  Users, X, Zap
} from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const health = [
  { label: 'Portfolio health', value: 91, delta: '+3.2%', color: '#65f6d1', icon: Target },
  { label: 'Delivery confidence', value: 87, delta: '+5.8%', color: '#67b8ff', icon: TrendingUp },
  { label: 'Budget health', value: 94, delta: '$42M unlocked', color: '#b99cff', icon: CircleDollarSign },
  { label: 'Capacity health', value: 82, delta: '14 roles at risk', color: '#ffca80', icon: Users },
];

const trend = [
  { m: 'JAN', delivery: 68, value: 59 }, { m: 'FEB', delivery: 71, value: 64 },
  { m: 'MAR', delivery: 69, value: 68 }, { m: 'APR', delivery: 76, value: 70 },
  { m: 'MAY', delivery: 78, value: 77 }, { m: 'JUN', delivery: 83, value: 81 },
  { m: 'JUL', delivery: 87, value: 85 }, { m: 'AUG', delivery: 91, value: 89 },
];

const programs = [
  { name: 'Project Helios', type: 'AI Platform', progress: 78, investment: '$184M', confidence: 92, status: 'On track', tone: 'cyan' },
  { name: 'Project Atlas', type: 'Cloud Modernization', progress: 61, investment: '$126M', confidence: 74, status: 'At risk', tone: 'amber' },
  { name: 'Project Nova', type: 'Customer Experience', progress: 84, investment: '$98M', confidence: 89, status: 'On track', tone: 'purple' },
];

const agents = [
  { name: 'Chief Program', task: 'Synthesizing executive narrative', icon: BrainCircuit, color: '#67b8ff', pct: 96 },
  { name: 'Portfolio', task: 'Rebalancing $2.4B investment', icon: Layers3, color: '#b99cff', pct: 91 },
  { name: 'Delivery', task: 'Monitoring 438 milestones', icon: Activity, color: '#65f6d1', pct: 94 },
  { name: 'Risk', task: 'Running 10k simulations', icon: ShieldCheck, color: '#ff8c7c', pct: 88 },
  { name: 'Resource', task: 'Optimizing 512 engineers', icon: Users, color: '#ffca80', pct: 90 },
  { name: 'Stakeholder', task: 'Analyzing alignment signals', icon: Network, color: '#dc9cff', pct: 86 },
];

const navItems = [
  ['command', Command, 'Command center'], ['portfolio', Layers3, 'Portfolio intelligence'],
  ['resources', Users, 'Resource intelligence'], ['delivery', Activity, 'Delivery command'],
  ['raid', TriangleAlert, 'Autonomous RAID'], ['agents', Bot, 'Agent control'],
];

function Ring({ value, color, size = 56 }) {
  return <div className="ring" style={{ '--value': `${value * 3.6}deg`, '--ring': color, width: size, height: size }}><span>{value}</span></div>;
}

function MetricCard({ item, index }) {
  const Icon = item.icon;
  return <article className="metric-card fade-up" style={{ '--delay': `${index * 70}ms` }}>
    <div className="metric-head"><span className="metric-icon" style={{ color: item.color }}><Icon size={16} /></span><span className="live-label"><i /> LIVE</span></div>
    <div className="metric-body"><Ring value={item.value} color={item.color} /><div><p>{item.label}</p><strong>{item.value}<small>/100</small></strong><span className="positive">↗ {item.delta}</span></div></div>
  </article>;
}

function MiniNetwork() {
  const nodes = [{x:50,y:53,r:10,c:'#67b8ff'}, {x:23,y:29,r:5,c:'#65f6d1'}, {x:78,y:25,r:6,c:'#b99cff'}, {x:83,y:69,r:5,c:'#ffca80'}, {x:20,y:78,r:4,c:'#ff8c7c'}, {x:50,y:13,r:4,c:'#65f6d1'}, {x:52,y:90,r:4,c:'#b99cff'}];
  return <svg className="mini-network" viewBox="0 0 100 100" aria-label="Enterprise digital twin network">
    <defs><filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    {nodes.slice(1).map((n,i)=><line key={i} x1="50" y1="53" x2={n.x} y2={n.y} />)}
    {nodes.map((n,i)=><g key={i}><circle className="node-pulse" cx={n.x} cy={n.y} r={n.r+3} style={{animationDelay:`${i*.3}s`}}/><circle cx={n.x} cy={n.y} r={n.r} fill={n.c} filter="url(#glow)"/></g>)}
  </svg>;
}

function App() {
  const [active, setActive] = useState('command');
  const [clock, setClock] = useState(new Date());
  const [scenario, setScenario] = useState(0);
  const [briefing, setBriefing] = useState(false);
  const [copilot, setCopilot] = useState(false);
  const [command, setCommand] = useState('');
  const [toast, setToast] = useState('');
  const scenarioData = useMemo(() => scenario === 0 ? { value: '$2.4B', confidence: '94%', risk: 'Low', note: 'Baseline portfolio is optimized for balanced growth.' } : scenario === 1 ? { value: '$2.1B', confidence: '81%', risk: 'Elevated', note: '15% budget compression delays Atlas by 7 weeks.' } : { value: '$2.7B', confidence: '87%', risk: 'Moderate', note: 'Helios expansion adds $310M projected value.' }, [scenario]);

  useEffect(() => { const t = setInterval(() => setClock(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3000); return () => clearTimeout(t); }, [toast]);

  const runCommand = () => {
    if (!command.trim()) return;
    setToast(`PIOS agents are analyzing: “${command}”`); setCommand(''); setCopilot(false);
  };

  return <div className="app-shell">
    <div className="ambient"><i/><i/><i/></div>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Hexagon/><BrainCircuit size={18}/></div><div><strong>PIOS</strong><span>PROGRAM INTELLIGENCE OS</span></div></div>
      <div className="nav-label">CORE SYSTEMS</div>
      <nav>{navItems.map(([id, Icon, label]) => <button key={id} className={active === id ? 'active' : ''} onClick={() => {setActive(id); setToast(`${label} intelligence synchronized`);}}><Icon size={17}/><span>{label}</span>{active===id && <i/>}</button>)}</nav>
      <div className="nav-label">INTELLIGENCE LAYER</div>
      <nav>
        <button onClick={()=>setToast('Digital twin synchronized: 4,821 nodes')}><Orbit size={17}/><span>Enterprise twin</span><b>LIVE</b></button>
        <button onClick={()=>setToast('PMBOK knowledge graph opened')}><BriefcaseBusiness size={17}/><span>PMBOK intelligence</span></button>
        <button onClick={()=>setToast('Stakeholder signals recalculated')}><Network size={17}/><span>Stakeholders</span></button>
      </nav>
      <div className="system-card"><div><span><Radio size={13}/> SYSTEM STATUS</span><strong>All systems nominal</strong></div><div className="system-grid"><span><b>99.99%</b>UPTIME</span><span><b>48ms</b>LATENCY</span></div></div>
      <div className="profile"><div className="avatar">AK<span/></div><div><strong>Alex Kim</strong><span>Senior Technical Program Manager</span></div><ChevronRight size={15}/></div>
    </aside>

    <main>
      <header>
        <div className="mobile-brand">PIOS</div>
        <button className="search" onClick={()=>setCopilot(true)}><Search size={15}/><span>Ask PIOS anything...</span><kbd>⌘ K</kbd></button>
        <div className="header-right"><span className="sync"><i/> ENTERPRISE SYNCED</span><span className="utc">UTC {clock.toISOString().slice(11,19)}</span><button className="icon-button"><Globe2 size={17}/></button><button className="icon-button"><Gauge size={17}/></button></div>
      </header>

      <section className="content">
        <div className="hero-row fade-up">
          <div><div className="eyebrow"><Sparkles size={14}/> AI COMMAND CENTER <span>•</span> GLOBAL PORTFOLIO</div><h1>Good morning, Alex.</h1><p>Your enterprise is operating at <b>91% strategic efficiency.</b> Three decisions need your judgment.</p></div>
          <div className="hero-actions"><button className="secondary" onClick={()=>setBriefing(true)}><Play size={15} fill="currentColor"/> Present portfolio</button><button className="primary" onClick={()=>setBriefing(true)}><Mic size={16}/> Start AI briefing</button></div>
        </div>

        <div className="metrics">{health.map((m,i)=><MetricCard key={m.label} item={m} index={i}/>)}</div>

        <div className="dashboard-grid">
          <section className="panel intelligence fade-up">
            <div className="panel-title"><div><span className="icon-cyan"><BrainCircuit size={17}/></span><div><h2>Executive intelligence</h2><p>CHIEF PROGRAM AGENT • UPDATED 12s AGO</p></div></div><button>VIEW ALL <ChevronRight size={13}/></button></div>
            <div className="intelligence-body">
              <div className="narrative">
                <span className="priority">PRIORITY INSIGHT</span>
                <h3>Rebalance Atlas capacity to protect <em>$42M</em> in portfolio value.</h3>
                <p>Cloud architecture constraints are creating a 7-week delivery exposure. Moving 6 specialists from Nova after its August gate preserves both critical paths.</p>
                <div className="explain-grid"><span><small>WHY NOW</small><b>Constraint peaks in 18 days</b></span><span><small>EXPECTED IMPACT</small><b>+11% delivery confidence</b></span><span><small>AI CONFIDENCE</small><b>94% · 10k simulations</b></span></div>
                <div className="recommend-actions"><button className="primary small" onClick={()=>setToast('Recommendation approved. Resource Agent is executing the rebalance.')}><Zap size={14}/> Approve action</button><button className="secondary small" onClick={()=>setScenario(1)}>Explore alternatives</button><span>Risk: <b>Low</b></span></div>
              </div>
              <div className="twin"><div className="twin-label"><span><i/> DIGITAL TWIN</span><b>4,821 nodes</b></div><MiniNetwork/><div className="twin-stats"><span><b>56</b>Programs</span><span><b>512</b>People</span><span><b>128</b>Risks</span></div></div>
            </div>
          </section>

          <section className="panel confidence fade-up">
            <div className="panel-title"><div><span className="icon-purple"><Gauge size={17}/></span><div><h2>Executive confidence</h2><p>PREDICTIVE OUTLOOK</p></div></div><span className="positive">↗ 6.4%</span></div>
            <div className="confidence-score"><Ring value={91} color="#b99cff" size={104}/><div><strong>91.4</strong><span>HIGH CONFIDENCE</span><p>12 signals improving</p></div></div>
            <div className="confidence-bars"><span><label>Strategic alignment <b>96%</b></label><i><u style={{width:'96%'}}/></i></span><span><label>Outcome certainty <b>89%</b></label><i><u style={{width:'89%'}}/></i></span><span><label>Stakeholder trust <b>87%</b></label><i><u style={{width:'87%'}}/></i></span></div>
          </section>

          <section className="panel trajectory fade-up">
            <div className="panel-title"><div><span className="icon-cyan"><TrendingUp size={17}/></span><div><h2>Portfolio trajectory</h2><p>VALUE REALIZATION VS DELIVERY</p></div></div><div className="legend"><span><i className="c1"/>Delivery</span><span><i className="c2"/>Value</span></div></div>
            <div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend}><defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#67b8ff" stopOpacity=".34"/><stop offset="1" stopColor="#67b8ff" stopOpacity="0"/></linearGradient><linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b99cff" stopOpacity=".25"/><stop offset="1" stopColor="#b99cff" stopOpacity="0"/></linearGradient></defs><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:'#60728b',fontSize:9}}/><Tooltip contentStyle={{background:'#101a2b',border:'1px solid #29405f',borderRadius:10,fontSize:11}}/><Area type="monotone" dataKey="delivery" stroke="#67b8ff" strokeWidth={2} fill="url(#d)"/><Area type="monotone" dataKey="value" stroke="#b99cff" strokeWidth={2} fill="url(#v)"/></AreaChart></ResponsiveContainer></div>
          </section>

          <section className="panel programs fade-up">
            <div className="panel-title"><div><span className="icon-green"><Layers3 size={17}/></span><div><h2>Priority programs</h2><p>$408M ACTIVE INVESTMENT</p></div></div><button>PORTFOLIO <ChevronRight size={13}/></button></div>
            <div className="program-list">{programs.map(p=><button key={p.name} onClick={()=>setToast(`${p.name} digital twin loaded`)}><span className={`program-glyph ${p.tone}`}><Cpu size={16}/></span><span className="program-name"><b>{p.name}</b><small>{p.type}</small></span><span className="progress"><i><u style={{width:`${p.progress}%`}}/></i><small>{p.progress}% complete</small></span><span className="investment"><b>{p.investment}</b><small>Investment</small></span><span className={`status ${p.tone}`}><i/>{p.status}</span><span className="program-confidence"><Ring value={p.confidence} color={p.tone==='amber'?'#ffca80':p.tone==='purple'?'#b99cff':'#65f6d1'} size={38}/></span><ChevronRight size={14}/></button>)}</div>
          </section>

          <section className="panel agents fade-up">
            <div className="panel-title"><div><span className="icon-purple"><Bot size={17}/></span><div><h2>Autonomous agent network</h2><p>9 AGENTS • 1,247 ACTIONS TODAY</p></div></div><span className="agent-status"><i/> OPERATING</span></div>
            <div className="agent-list">{agents.map(({name,task,icon:Icon,color,pct})=><div key={name}><span className="agent-icon" style={{color}}><Icon size={15}/><i/></span><span><b>{name} Agent</b><small>{task}</small></span><em>{pct}%</em></div>)}</div>
          </section>

          <section className="panel simulator fade-up">
            <div className="panel-title"><div><span className="icon-amber"><Orbit size={17}/></span><div><h2>Scenario simulator</h2><p>REAL-TIME ENTERPRISE IMPACT</p></div></div></div>
            <div className="scenario-tabs"><button className={scenario===0?'active':''} onClick={()=>setScenario(0)}>Baseline</button><button className={scenario===1?'active':''} onClick={()=>setScenario(1)}>Budget −15%</button><button className={scenario===2?'active':''} onClick={()=>setScenario(2)}>Expand Helios</button></div>
            <div className="scenario-output"><div><small>PROJECTED VALUE</small><strong>{scenarioData.value}</strong></div><div><small>CONFIDENCE</small><strong>{scenarioData.confidence}</strong></div><div><small>RISK</small><strong>{scenarioData.risk}</strong></div></div><p className="scenario-note"><Sparkles size={13}/>{scenarioData.note}</p>
          </section>
        </div>

        <div className="footer-strip"><span><i/> PIOS Neural Core v4.8</span><span>All systems explainable & auditable</span><span>Last enterprise sync: just now</span><button onClick={()=>setCopilot(true)}><Sparkles size={13}/> Ask PIOS</button></div>
      </section>
    </main>

    {briefing && <div className="modal cinematic"><button className="modal-close" onClick={()=>setBriefing(false)}><X/></button><div className="scanline"/><div className="briefing-orb"><div/><BrainCircuit/></div><span className="eyebrow"><Radio size={13}/> EXECUTIVE BRIEFING • LIVE</span><h2>Your portfolio is creating<br/><em>$2.4 billion</em> in projected value.</h2><p>Delivery confidence has risen 6.4% this quarter. One strategic intervention protects $42 million and accelerates the Atlas critical path.</p><div className="briefing-stats"><span><b>56</b>PROGRAMS</span><span><b>91%</b>HEALTH</span><span><b>94%</b>AI CONFIDENCE</span></div><button className="primary" onClick={()=>{setBriefing(false);setToast('Boardroom narrative exported successfully')}}>Generate CEO summary <ArrowRight size={15}/></button></div>}

    {copilot && <div className="modal copilot" onClick={()=>setCopilot(false)}><div className="copilot-box" onClick={e=>e.stopPropagation()}><div><span><BrainCircuit size={18}/> PIOS COMMAND</span><kbd>ESC</kbd></div><h2>What strategic outcome can I help you drive?</h2><div className="command-input"><Sparkles size={18}/><input autoFocus value={command} onChange={e=>setCommand(e.target.value)} onKeyDown={e=>e.key==='Enter'&&runCommand()} placeholder="Ask about portfolio, resources, risks, or scenarios..."/><button onClick={runCommand}><ArrowRight/></button></div><div className="suggestions"><button onClick={()=>setCommand('Show risks to Q4 strategic outcomes')}>Show risks to Q4 outcomes</button><button onClick={()=>setCommand('Simulate a 15% budget reduction')}>Simulate budget reduction</button><button onClick={()=>setCommand('Create an executive narrative')}>Create executive narrative</button></div></div></div>}
    {toast && <div className="toast"><Sparkles size={15}/>{toast}</div>}
  </div>;
}

export default App;
