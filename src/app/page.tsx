 "use client";

import { useEffect, useState } from "react";
import {
  BookOpen, Brain, ChartNoAxesCombined, ChevronRight, CircleHelp,
  Clock3, Flame, FolderOpen, GraduationCap, House, Plus, Search,
  Settings, Sparkles, Target, Trophy, Zap, Code2, Timer, Layers,
  RotateCcw, Lightbulb, Network, ClipboardCheck, Type, Check
} from "lucide-react";

type PageKey = "Inicio" | "Mi biblioteca" | "Asignaturas" | "Estudiar con IA" | "Laboratorio" | "Mi progreso" | "Logros" | "Métodos de estudio" | "Configuración";
type TextSize = "small" | "medium" | "large";

const subjects = [
  { name: "Bases de Datos", detail: "6 unidades · 12 materiales", progress: 72, color: "lilac", icon: "database" },
  { name: "Programación", detail: "4 unidades · 8 materiales", progress: 48, color: "peach", icon: "code" },
  { name: "Matemáticas", detail: "5 unidades · 10 materiales", progress: 35, color: "blue", icon: "math" }
];

const activities = [
  { title: "Repaso de PL/SQL", meta: "Bases de Datos · 10 preguntas", score: "8/10", tone: "lilac" },
  { title: "Flashcards: funciones", meta: "Programación · 15 tarjetas", score: "En curso", tone: "mint" },
  { title: "Simulacro de unidad 2", meta: "Bases de Datos · 20 preguntas", score: "Pendiente", tone: "peach" }
];

const navItems: { label: PageKey; icon: typeof House }[] = [
  { label: "Inicio", icon: House },
  { label: "Mi biblioteca", icon: FolderOpen },
  { label: "Asignaturas", icon: BookOpen },
  { label: "Estudiar con IA", icon: Brain },
  { label: "Laboratorio", icon: Code2 },
  { label: "Mi progreso", icon: ChartNoAxesCombined },
  { label: "Logros", icon: Trophy },
  { label: "Métodos de estudio", icon: Lightbulb },
];

const methods = [
  { title: "Pomodoro", description: "Alterna bloques de concentración con descansos breves.", detail: "Ideal para empezar una tarea y mantener el foco.", icon: Timer, tone: "lilac", duration: "25 min + 5 min" },
  { title: "Flashcards", description: "Practica recordar conceptos con tarjetas de pregunta y respuesta.", detail: "Útil para definiciones, fórmulas y vocabulario.", icon: Layers, tone: "peach", duration: "5–15 min" },
  { title: "Repetición espaciada", description: "Vuelve a repasar cada concepto en intervalos progresivos.", detail: "Ayuda a consolidar lo aprendido a largo plazo.", icon: RotateCcw, tone: "blue", duration: "A tu ritmo" },
  { title: "Active Recall", description: "Cierra tus apuntes e intenta recuperar la información de memoria.", detail: "Después compara tu respuesta con el material.", icon: Brain, tone: "mint", duration: "10–20 min" },
  { title: "Método Feynman", description: "Explica el tema con palabras sencillas, como si enseñaras a otra persona.", detail: "Detecta vacíos en tu comprensión.", icon: Lightbulb, tone: "peach", duration: "15–30 min" },
  { title: "Mapas conceptuales", description: "Relaciona conceptos y organiza visualmente sus conexiones.", detail: "Especialmente útil para temas extensos.", icon: Network, tone: "lilac", duration: "20–30 min" },
  { title: "Práctica de ejercicios", description: "Aprende resolviendo problemas y revisando tus errores.", detail: "Convierte la teoría en habilidades aplicables.", icon: Code2, tone: "blue", duration: "20–40 min" },
  { title: "Simulacros", description: "Responde una evaluación de práctica en condiciones similares a una prueba.", detail: "Permite medir tu preparación.", icon: ClipboardCheck, tone: "mint", duration: "Según evaluación" },
];

function Brand() {
  return <div className="brand"><div className="brand-mark"><GraduationCap size={22} /></div><span>studia</span><span className="brand-dot">.</span></div>;
}

function AppButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  return <button type="button" className={className} onClick={onClick}>{children}</button>;
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>("Inicio");
  const [textSize, setTextSize] = useState<TextSize>("medium");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("studia-text-size");
      if (stored === "small" || stored === "medium" || stored === "large") setTextSize(stored);
    } catch { /* La app sigue funcionando si el almacenamiento está bloqueado. */ }
  }, []);

  function changeTextSize(size: TextSize) {
    setTextSize(size);
    setSaved(false);
    try {
      window.localStorage.setItem("studia-text-size", size);
      setSaved(true);
    } catch { setSaved(false); }
  }

  const shellClass = `app-shell text-${textSize}`;

  function Sidebar() {
    return <aside className="sidebar">
      <Brand />
      <div className="side-label">MENÚ PRINCIPAL</div>
      <nav className="side-nav">{navItems.map(({label, icon: Icon}) =>
        <button type="button" key={label} className={`nav-link ${activePage === label ? "active" : ""}`} onClick={() => setActivePage(label)}>
          <Icon size={18}/><span>{label}</span>{activePage === label && <span className="active-dot"/>}
        </button>
      )}</nav>
      <div className="sidebar-bottom">
        <div className="mini-goal"><div className="goal-icon"><Target size={18}/></div><strong>Meta semanal</strong><p>¡Vas por buen camino!</p><div className="progress-track"><span style={{width:"68%"}}/></div><small>4 de 6 horas</small></div>
        <button type="button" className={`nav-link ${activePage === "Configuración" ? "active" : ""}`} onClick={() => setActivePage("Configuración")}><Settings size={18}/><span>Configuración</span></button>
        <div className="profile-mini"><div className="avatar">A</div><div><strong>Estudiante</strong><small>Explorador nivel 4</small></div><ChevronRight size={16}/></div>
      </div>
    </aside>;
  }

  function BottomNav() {
    const items: {label: PageKey; short: string; icon: typeof House}[] = [
      {label:"Inicio",short:"Inicio",icon:House},
      {label:"Mi biblioteca",short:"Biblioteca",icon:FolderOpen},
      {label:"Métodos de estudio",short:"Métodos",icon:Lightbulb},
      {label:"Mi progreso",short:"Progreso",icon:ChartNoAxesCombined},
      {label:"Configuración",short:"Perfil",icon:Settings}
    ];
    return <nav className="bottom-nav">{items.map(({label,short,icon:Icon})=><button type="button" key={label} className={activePage===label?"bottom-active":""} onClick={()=>setActivePage(label)}><Icon size={20}/><span>{short}</span></button>)}</nav>;
  }

  function SettingsPage() {
    const options: {value: TextSize; label: string; sample: string}[] = [
      {value:"small",label:"Small",sample:"Texto compacto"},
      {value:"medium",label:"Medium",sample:"Tamaño recomendado"},
      {value:"large",label:"Large",sample:"Texto más grande"}
    ];
    return <section className="inner-page">
      <div className="eyebrow"><Settings size={15}/> PERSONALIZA TU ESPACIO</div>
      <h1>Configuración</h1>
      <p className="page-intro">Ajusta STUDIA para que estudiar sea más cómodo.</p>
      <article className="settings-card">
        <div className="settings-title"><span className="settings-icon"><Type size={19}/></span><div><h2>Apariencia y lectura</h2><p>Elige el tamaño del texto de la interfaz.</p></div></div>
        <div className="preference-options">{options.map(option=><button type="button" key={option.value} aria-pressed={textSize===option.value} className={`preference-option ${textSize===option.value?"selected":""}`} onClick={()=>changeTextSize(option.value)}><span className={`sample sample-${option.value}`}>Aa</span><strong>{option.label}</strong><small>{option.sample}</small>{textSize===option.value&&<span className="option-check"><Check size={14}/></span>}</button>)}</div>
        <p className="settings-note">{saved ? "Preferencia guardada en este navegador." : "La selección se guarda en este navegador cuando el almacenamiento está disponible."}</p>
      </article>
      <article className="privacy-note"><div className="privacy-symbol">🔒</div><div><h3>Tu privacidad importa</h3><p>Esta preferencia solo guarda el tamaño de texto en tu navegador. Esta versión todavía no solicita datos personales ni tiene cuentas conectadas.</p></div></article>
    </section>;
  }

  function MethodsPage() {
    return <section className="inner-page">
      <div className="eyebrow"><Lightbulb size={15}/> APRENDE A TU MANERA</div>
      <h1>Métodos de estudio</h1>
      <p className="page-intro">Prueba distintas estrategias y descubre cuál te ayuda a aprender mejor.</p>
      <div className="methods-grid">{methods.map(({title,description,detail,icon:Icon,tone,duration})=><article className="method-card" key={title}><div className={`method-icon ${tone}`}><Icon size={21}/></div><div className="method-time">{duration}</div><h2>{title}</h2><p>{description}</p><small>{detail}</small><button type="button" className="method-action" onClick={()=>setActivePage("Estudiar con IA")}>Probar método <ChevronRight size={15}/></button></article>)}</div>
    </section>;
  }

  function PlaceholderPage({title}: {title: PageKey}) {
    const descriptions: Partial<Record<PageKey,string>> = {
      "Mi biblioteca":"Aquí organizaremos tus apuntes, documentos y materiales de estudio.",
      "Asignaturas":"Aquí podrás crear asignaturas, unidades y organizar tus materiales.",
      "Estudiar con IA":"Aquí podrás generar preguntas, explicaciones y prácticas a partir de tus materiales.",
      "Laboratorio":"Aquí podrás practicar programación, completar código y analizar errores.",
      "Mi progreso":"Aquí podrás revisar tus sesiones, resultados y evolución.",
      "Logros":"Aquí encontrarás tus metas, insignias y recompensas."
    };
    return <section className="inner-page placeholder-page"><div className="eyebrow"><Sparkles size={15}/> TU ESPACIO DE APRENDIZAJE</div><h1>{title}</h1><p className="page-intro">{descriptions[title] ?? "Estamos preparando este espacio."}</p><div className="coming-card"><div className="coming-icon"><GraduationCap size={25}/></div><h2>Esta sección está en construcción</h2><p>La iremos habilitando por etapas, cuidando que tus materiales y datos permanezcan privados.</p><button type="button" className="primary-action" onClick={()=>setActivePage("Métodos de estudio")}>Explorar métodos de estudio <ChevronRight size={16}/></button></div></section>;
  }

  function Dashboard() {
    return <>
      <section className="welcome-row">
        <div><div className="eyebrow"><Sparkles size={15}/> TU ESPACIO DE APRENDIZAJE</div><h1>¡Hola! Qué bueno<br className="mobile-break"/> verte por aquí <span className="wave">✦</span></h1><p>Un pequeño paso hoy es un gran avance mañana.</p></div>
        <div className="date-pill"><Clock3 size={15}/> Tu progreso empieza aquí</div>
      </section>
      <section className="stats-grid">
        <div className="stat-card stat-lilac"><div className="stat-top"><span>Experiencia total</span><span className="stat-icon"><Zap size={18}/></span></div><div className="stat-number">1.250 <small>XP</small></div><div className="stat-foot">✨ 250 XP para el siguiente nivel</div></div>
        <div className="stat-card stat-peach"><div className="stat-top"><span>Racha de estudio</span><span className="stat-icon"><Flame size={18}/></span></div><div className="stat-number">7 <small>días</small></div><div className="stat-foot">¡Sigue así! Estás creando un hábito</div></div>
        <div className="stat-card stat-blue"><div className="stat-top"><span>Tiempo estudiado</span><span className="stat-icon"><Clock3 size={18}/></span></div><div className="stat-number">12.5 <small>horas</small></div><div className="stat-foot">Esta semana llevas un buen ritmo</div></div>
        <div className="stat-card stat-mint"><div className="stat-top"><span>Actividades listas</span><span className="stat-icon"><Trophy size={18}/></span></div><div className="stat-number">18 <small>logradas</small></div><div className="stat-foot">Cada práctica cuenta 💚</div></div>
      </section>
      <section className="content-grid">
        <div className="primary-column">
          <div className="section-heading"><div><span className="section-kicker">SIGUE APRENDIENDO</span><h2>Mis asignaturas</h2></div><button type="button" className="text-link" onClick={()=>setActivePage("Asignaturas")}>Ver todas <ChevronRight size={16}/></button></div>
          <div className="subject-grid">{subjects.map((s)=><article className={`subject-card ${s.color}`} key={s.name}><div className="subject-icon">{s.icon==="code"?<Code2/>:s.icon==="math"?<ChartNoAxesCombined/>:<BookOpen/>}</div><div className="subject-menu">•••</div><h3>{s.name}</h3><p>{s.detail}</p><div className="subject-progress-label"><span>Tu progreso</span><strong>{s.progress}%</strong></div><div className="progress-track"><span style={{width:`${s.progress}%`}}/></div><button type="button" className="continue-link" onClick={()=>setActivePage("Asignaturas")}>Continuar <ChevronRight size={15}/></button></article>)}
            <button type="button" className="add-subject" onClick={()=>setActivePage("Asignaturas")}><span><Plus size={22}/></span><strong>Agregar asignatura</strong><small>Organiza un nuevo tema</small></button>
          </div>
          <div className="section-heading activity-heading"><div><span className="section-kicker">TU ACTIVIDAD</span><h2>Retoma donde quedaste</h2></div><button type="button" className="text-link" onClick={()=>setActivePage("Mi progreso")}>Historial <ChevronRight size={16}/></button></div>
          <div className="activity-list">{activities.map((a)=><div className="activity-row" key={a.title}><div className={`activity-icon ${a.tone}`}><BookOpen size={19}/></div><div className="activity-info"><strong>{a.title}</strong><small>{a.meta}</small></div><span className="activity-score">{a.score}</span><ChevronRight className="activity-arrow" size={17}/></div>)}</div>
        </div>
        <aside className="right-column">
          <div className="level-card"><div className="level-spark">✦</div><span className="section-kicker">TU CAMINO DE APRENDIZAJE</span><h3>¡Vas genial!</h3><p>Estás construyendo tu propio ritmo de estudio.</p><div className="level-row"><span>Nivel 4 · Explorador</span><strong>75%</strong></div><div className="level-track"><span/></div><small>750 / 1.000 XP para nivel 5</small><div className="level-decoration">✧</div></div>
          <div className="quick-card"><div className="quick-heading"><div><span className="section-kicker">EMPIEZA AHORA</span><h3>¿Qué estudiamos?</h3></div><div className="quick-spark"><Sparkles size={19}/></div></div>
            <button type="button" className="quick-action" onClick={()=>setActivePage("Estudiar con IA")}><span className="quick-icon lilac"><Brain size={19}/></span><span><strong>Crear práctica con IA</strong><small>Preguntas a tu medida</small></span><ChevronRight size={17}/></button>
            <button type="button" className="quick-action" onClick={()=>setActivePage("Métodos de estudio")}><span className="quick-icon peach"><Zap size={19}/></span><span><strong>Explorar métodos de estudio</strong><small>Encuentra tu estrategia</small></span><ChevronRight size={17}/></button>
            <button type="button" className="quick-action" onClick={()=>setActivePage("Laboratorio")}><span className="quick-icon blue"><Code2 size={19}/></span><span><strong>Practicar código</strong><small>Entrena resolviendo retos</small></span><ChevronRight size={17}/></button></div>
          <div className="tip-card"><div className="tip-icon">💡</div><div><strong>Un consejo para ti</strong><p>Estudiar en sesiones cortas y constantes puede ayudarte a recordar mejor.</p></div></div>
        </aside>
      </section>
      <footer className="footer">Hecho para aprender a tu ritmo <span>✦</span> STUDIA © 2026</footer>
    </>;
  }

  return <div className={shellClass}>
    <Sidebar />
    <main className="main-content">
      <header className="topbar">
        <div className="mobile-brand"><Brand /></div>
        <div className="breadcrumb">Mi espacio <ChevronRight size={14}/> <strong>{activePage}</strong></div>
        <div className="top-actions"><button type="button" className="icon-button" aria-label="Buscar" onClick={()=>setActivePage("Mi biblioteca")}><Search size={19}/></button><button type="button" className="icon-button help-button" aria-label="Ayuda" onClick={()=>setActivePage("Métodos de estudio")}><CircleHelp size={19}/></button><button type="button" className="avatar top-avatar" aria-label="Configuración" onClick={()=>setActivePage("Configuración")}>A</button></div>
      </header>
      <div className="page-wrap">
        {activePage === "Inicio" ? <Dashboard/> : activePage === "Configuración" ? <SettingsPage/> : activePage === "Métodos de estudio" ? <MethodsPage/> : <PlaceholderPage title={activePage}/>}
      </div>
    </main>
    <BottomNav />
  </div>;
}
