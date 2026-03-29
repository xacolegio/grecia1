import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  RefreshCcw,
  Check,
  X,
  Volume2,
  VolumeX,
  Star,
} from 'lucide-react';

/* ============================================================
   ADAPTACIONES TEA IMPLEMENTADAS
   ──────────────────────────────
   1. Estructura visual predecible: sidebar siempre visible con
      indicador de "dónde estoy" claro.
   2. Paleta de colores suaves/apagados, sin blanco puro ni negro.
   3. Tipografía grande (≥18 px), interlineado amplio.
   4. Iconos + texto en TODOS los botones (nunca solo icono).
   5. Botones con área táctil mínima de 48 px.
   6. Indicador de progreso numérico y visual en el quiz.
   7. Feedback inmediato, claro y sin urgencia temporal.
   8. Lenguaje sencillo, frases cortas, sin figuras retóricas.
   9. Panel de lectura asistida (texto a voz) y control de tamaño
      de fuente.
   10. Menú de "pausa" / zona de calma.
   11. Respeto de prefers-reduced-motion.
   12. Foco de teclado muy visible para navegación accesible.
   13. Sin animaciones automáticas no controladas.
   14. Sin tiempo límite en ninguna interacción.
   15. Migas de pan / "¿Dónde estoy?" constante.
   ============================================================ */

// ─── TIPOS ───────────────────────────────────────────────────
type TabId = 'inicio' | 'geografia' | 'sociedad' | 'economia' | 'cultura' | 'juegos' | 'calma';

interface Seccion {
  subtitulo: string;
  emoji: string;
  puntos: string[];
}

interface Tema {
  id: TabId;
  titulo: string;
  emoji: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  colorHeading: string;
  contenido: Seccion[];
}

// ─── DATOS ───────────────────────────────────────────────────
const temas: Record<string, Tema> = {
  geografia: {
    id: 'geografia',
    titulo: 'Geografía y Clima',
    emoji: '🗺️',
    colorBg: 'bg-sky-50',
    colorBorder: 'border-sky-300',
    colorText: 'text-sky-900',
    colorHeading: 'text-sky-700',
    contenido: [
      {
        subtitulo: '¿Dónde está Grecia?',
        emoji: '📍',
        puntos: [
          'Grecia está en el sur de Europa.',
          'Está rodeada por el mar Mediterráneo.',
          'Tiene muchísimas montañas.',
          'Tiene más de 100 islas.',
        ],
      },
      {
        subtitulo: '¿Cómo viajaban los griegos?',
        emoji: '⛵',
        puntos: [
          'Las montañas hacían muy difícil viajar por tierra.',
          'Por eso los griegos viajaban en barco por el mar.',
          'Eran muy buenos navegantes.',
          'Fundaron ciudades nuevas lejos de Grecia. Las llamaban colonias.',
        ],
      },
    ],
  },
  sociedad: {
    id: 'sociedad',
    titulo: 'Las Ciudades (Polis)',
    emoji: '🏛️',
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-300',
    colorText: 'text-emerald-900',
    colorHeading: 'text-emerald-700',
    contenido: [
      {
        subtitulo: 'Atenas y Esparta',
        emoji: '🏙️',
        puntos: [
          'Las ciudades griegas eran independientes.',
          'Cada ciudad tenía su propio gobierno.',
          'Cada ciudad tenía su propio ejército y su propia moneda.',
          'Las dos ciudades más importantes eran Atenas y Esparta.',
        ],
      },
      {
        subtitulo: 'ATENAS – La Democracia',
        emoji: '🗳️',
        puntos: [
          'En Atenas, los ciudadanos votaban para elegir a sus gobernantes.',
          'Eso se llama democracia.',
          'Pero las mujeres, los extranjeros y los esclavos NO podían votar.',
        ],
      },
      {
        subtitulo: 'ESPARTA – Los Militares',
        emoji: '⚔️',
        puntos: [
          'En Esparta, los militares mandaban y todos los demás obedecían.',
          'El general más famoso de Esparta se llamaba Leónidas.',
        ],
      },
    ],
  },
  economia: {
    id: 'economia',
    titulo: 'Trabajo y Comercio',
    emoji: '⚗️',
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-300',
    colorText: 'text-amber-900',
    colorHeading: 'text-amber-700',
    contenido: [
      {
        subtitulo: '¿En qué trabajaban los griegos?',
        emoji: '👨‍🌾',
        puntos: [
          'Agricultores: cultivaban uvas (vid) y aceitunas (olivo).',
          'Artesanos: fabricaban tejidos, zapatos y herramientas.',
          'También fabricaban armas y vasijas de cerámica.',
        ],
      },
      {
        subtitulo: 'El comercio en barcos',
        emoji: '🚢',
        puntos: [
          'Los comerciantes viajaban en barco hasta las colonias.',
          'Vendían: vino, aceite de oliva y cerámica.',
          'Compraban: trigo para comer y metal para hacer armas.',
        ],
      },
    ],
  },
  cultura: {
    id: 'cultura',
    titulo: 'Arte, Dioses y Cultura',
    emoji: '🎭',
    colorBg: 'bg-violet-50',
    colorBorder: 'border-violet-300',
    colorText: 'text-violet-900',
    colorHeading: 'text-violet-700',
    contenido: [
      {
        subtitulo: 'La Religión',
        emoji: '⚡',
        puntos: [
          'Los griegos creían en muchos dioses. Eso se llama politeísmo.',
          'Los dioses se parecían a los humanos.',
          'Zeus y Hera eran los dioses más importantes.',
          'Atenea: diosa de la sabiduría.',
          'Poseidón: dios del mar.',
          'Apolo: dios de las artes.',
          'Ares: dios de la guerra.',
        ],
      },
      {
        subtitulo: 'Los Edificios',
        emoji: '🏛️',
        puntos: [
          'Los griegos buscaban el orden, el equilibrio y la belleza.',
          'Construyeron templos rectangulares con columnas.',
          'Construyeron teatros para ver obras de teatro.',
          'Construyeron estadios para los Juegos Olímpicos.',
        ],
      },
      {
        subtitulo: 'El Arte',
        emoji: '🏺',
        puntos: [
          'Las esculturas mostraban cuerpos humanos muy perfectos.',
          'Pintaban vasijas de cerámica con escenas de la vida diaria.',
          'En las vasijas se puede ver cómo vivían, qué comían y qué ropa usaban.',
        ],
      },
    ],
  },
};

const quizPreguntas = [
  {
    pregunta: '¿El relieve de Grecia es montañoso y tiene muchas islas?',
    opciones: ['✅ Verdadero', '❌ Falso'],
    respuestaCorrecta: '✅ Verdadero',
    explicacion: 'Correcto. Grecia tiene muchas montañas, por eso era difícil viajar por tierra.',
    emoji: '🏔️',
  },
  {
    pregunta: '¿Los griegos eran muy malos navegantes?',
    opciones: ['✅ Verdadero', '❌ Falso'],
    respuestaCorrecta: '❌ Falso',
    explicacion: 'No. Eran muy buenos navegantes. Usaban barcos para comerciar por el mar Mediterráneo.',
    emoji: '⛵',
  },
  {
    pregunta: '¿En qué ciudad los ciudadanos votaban para elegir a sus gobernantes?',
    opciones: ['🏙️ En Esparta', '🏛️ En Atenas'],
    respuestaCorrecta: '🏛️ En Atenas',
    explicacion: 'Atenas inventó la democracia. En Esparta mandaban los militares.',
    emoji: '🗳️',
  },
  {
    pregunta: '¿Qué cultivaban principalmente los agricultores griegos?',
    opciones: ['🥔 Patatas y tomates', '🍇 Uvas y aceitunas'],
    respuestaCorrecta: '🍇 Uvas y aceitunas',
    explicacion: 'Con las uvas hacían vino y con las aceitunas hacían aceite de oliva.',
    emoji: '🫒',
  },
  {
    pregunta: '¿Qué cosas construían los arquitectos griegos?',
    opciones: ['🪵 Castillos de madera', '🏛️ Templos, teatros y estadios'],
    respuestaCorrecta: '🏛️ Templos, teatros y estadios',
    explicacion: 'Los griegos buscaban el orden y el equilibrio. Usaban columnas y formas rectangulares.',
    emoji: '🏛️',
  },
];

// ─── HOOK: SÍNTESIS DE VOZ ────────────────────────────────────
function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [available] = useState(() => typeof window !== 'undefined' && 'speechSynthesis' in window);

  const speak = useCallback(
    (text: string) => {
      if (!available) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'es-ES';
      utt.rate = 0.85;
      utt.pitch = 1.05;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      utt.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
    },
    [available]
  );

  const stop = useCallback(() => {
    if (!available) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [available]);

  return { speak, stop, speaking, available };
}

// ─── COMPONENTE RAÍZ ─────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [fontSize, setFontSize] = useState<'normal' | 'grande' | 'extragrande'>('normal');
  const { speak, stop, speaking, available: speechAvailable } = useSpeech();

  // Mapa de tamaños de fuente
  const fontClass =
    fontSize === 'normal'
      ? 'text-base'
      : fontSize === 'grande'
      ? 'text-xl'
      : 'text-2xl';

  const handleNav = (tab: TabId) => {
    stop();
    setActiveTab(tab);
    // Scroll al inicio del contenido principal en móvil
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on tab change (side-effect only)
  useEffect(() => {
    // no-op, kept for future extension
  }, [activeTab]);

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${fontClass}`}
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* ── BARRA LATERAL ── */}
      <Sidebar
        activeTab={activeTab}
        onNav={handleNav}
        fontSize={fontSize}
        setFontSize={setFontSize}
        speaking={speaking}
        speechAvailable={speechAvailable}
        onStopSpeech={stop}
      />

      {/* ── CONTENIDO PRINCIPAL ── */}
      <main
        id="main-content"
        className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {/* Miga de pan – ¿DÓNDE ESTOY? */}
        <BreadCrumb activeTab={activeTab} />

        <div className="max-w-3xl mx-auto">
          {activeTab === 'inicio' && <Inicio onNav={handleNav} />}
          {activeTab === 'juegos' && <Quiz speak={speak} stop={stop} />}
          {activeTab === 'calma' && <ZonaCalma />}
          {['geografia', 'sociedad', 'economia', 'cultura'].includes(activeTab) && (
            <TemaSection
              tema={temas[activeTab]}
              speak={speak}
              stop={stop}
              speaking={speaking}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── MIGA DE PAN ─────────────────────────────────────────────
function BreadCrumb({ activeTab }: { activeTab: TabId }) {
  const labels: Record<TabId, string> = {
    inicio: '🏠 Inicio',
    geografia: '🗺️ Geografía y Clima',
    sociedad: '🏛️ Las Ciudades',
    economia: '⚗️ Trabajo y Comercio',
    cultura: '🎭 Arte y Cultura',
    juegos: '🎯 Repaso Final',
    calma: '🌿 Zona de Calma',
  };

  return (
    <div
      className="mb-5 px-4 py-2 rounded-xl inline-flex items-center gap-2 text-sm font-bold"
      style={{
        backgroundColor: '#E8E2D8',
        color: 'var(--color-muted)',
        border: '2px solid var(--color-border)',
      }}
      aria-label="Estás en"
    >
      <span className="opacity-60">📌 Estás en:</span>
      <span style={{ color: 'var(--color-text)' }}>{labels[activeTab]}</span>
    </div>
  );
}

// ─── BARRA LATERAL ───────────────────────────────────────────
interface SidebarProps {
  activeTab: TabId;
  onNav: (tab: TabId) => void;
  fontSize: 'normal' | 'grande' | 'extragrande';
  setFontSize: (s: 'normal' | 'grande' | 'extragrande') => void;
  speaking: boolean;
  speechAvailable: boolean;
  onStopSpeech: () => void;
}

function Sidebar({
  activeTab,
  onNav,
  fontSize,
  setFontSize,
  speaking,
  speechAvailable,
  onStopSpeech,
}: SidebarProps) {
  return (
    <nav
      className="w-full md:w-72 flex-shrink-0 flex flex-col"
      style={{
        backgroundColor: '#FFFDF9',
        borderRight: '3px solid var(--color-border)',
      }}
      aria-label="Menú principal"
    >
      {/* Cabecera */}
      <div
        className="px-6 py-5 flex items-center gap-3"
        style={{ backgroundColor: '#3B6FA0', color: '#FFFFFF' }}
      >
        <span className="text-4xl" role="img" aria-label="templo griego">
          🏛️
        </span>
        <div>
          <h1 className="text-xl font-bold leading-tight">La Antigua Grecia</h1>
          <p className="text-sm opacity-80">Aprendo paso a paso</p>
        </div>
      </div>

      {/* Controles de accesibilidad */}
      <div
        className="px-4 py-3 flex flex-wrap items-center gap-2 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: '#F0ECE4' }}
      >
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
          Tamaño texto:
        </span>
        {(['normal', 'grande', 'extragrande'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFontSize(s)}
            aria-pressed={fontSize === s}
            className="px-3 py-1 rounded-lg font-bold transition-all"
            style={{
              fontSize: s === 'normal' ? '0.8rem' : s === 'grande' ? '0.95rem' : '1.1rem',
              backgroundColor: fontSize === s ? '#3B6FA0' : '#D9D3C8',
              color: fontSize === s ? '#FFFFFF' : '#2D2926',
              border: `2px solid ${fontSize === s ? '#3B6FA0' : 'transparent'}`,
            }}
          >
            {s === 'normal' ? 'A' : s === 'grande' ? 'AA' : 'AAA'}
          </button>
        ))}
        {speechAvailable && speaking && (
          <button
            onClick={onStopSpeech}
            className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-sm"
            style={{ backgroundColor: '#B85C1A', color: '#FFFFFF' }}
            aria-label="Detener lectura en voz alta"
          >
            <VolumeX className="w-4 h-4" />
            Parar
          </button>
        )}
      </div>

      {/* Navegación */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <SideLabel>Temas</SideLabel>

        <NavBtn active={activeTab === 'inicio'} onClick={() => onNav('inicio')} emoji="🏠" label="Inicio" />

        <SideLabel>Contenido</SideLabel>
        {Object.values(temas).map((t) => (
          <NavBtn
            key={t.id}
            active={activeTab === t.id}
            onClick={() => onNav(t.id)}
            emoji={t.emoji}
            label={t.titulo}
          />
        ))}

        <SideLabel>Actividades</SideLabel>
        <NavBtn
          active={activeTab === 'juegos'}
          onClick={() => onNav('juegos')}
          emoji="🎯"
          label="Repaso Final"
          highlight
        />

        <SideLabel>Mi espacio</SideLabel>
        <NavBtn
          active={activeTab === 'calma'}
          onClick={() => onNav('calma')}
          emoji="🌿"
          label="Zona de Calma"
          calm
        />
      </div>

      {/* Pie de barra lateral */}
      <div
        className="px-4 py-3 text-xs text-center"
        style={{ color: 'var(--color-muted)', borderTop: '2px solid var(--color-border)' }}
      >
        Puedes volver al menú en cualquier momento.
      </div>
    </nav>
  );
}

function SideLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-widest mt-4 mb-1 px-3"
      style={{ color: 'var(--color-muted)' }}
    >
      {children}
    </p>
  );
}

interface NavBtnProps {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  highlight?: boolean;
  calm?: boolean;
}

function NavBtn({ active, onClick, emoji, label, highlight, calm }: NavBtnProps) {
  const base = 'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-bold text-base';

  let style: React.CSSProperties = {};
  if (active) {
    style = {
      backgroundColor: '#DDE9F5',
      color: '#1A3D5C',
      border: '2px solid #3B6FA0',
      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.08)',
    };
  } else if (highlight) {
    style = {
      backgroundColor: '#D4EDE6',
      color: '#1A4A38',
      border: '2px solid transparent',
    };
  } else if (calm) {
    style = {
      backgroundColor: '#E8E2F8',
      color: '#3A2D6A',
      border: '2px solid transparent',
    };
  } else {
    style = {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      border: '2px solid transparent',
    };
  }

  return (
    <button
      onClick={onClick}
      className={base}
      style={style}
      aria-current={active ? 'page' : undefined}
    >
      <span className="text-2xl flex-shrink-0" aria-hidden>
        {emoji}
      </span>
      <span className="flex-1">{label}</span>
      {active && <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden />}
    </button>
  );
}

// ─── INICIO ──────────────────────────────────────────────────
function Inicio({ onNav }: { onNav: (tab: TabId) => void }) {
  return (
    <div className="tea-fade-in space-y-8">
      {/* Bienvenida */}
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          backgroundColor: '#FFFDF9',
          border: '3px solid #3B6FA0',
          borderTop: '8px solid #3B6FA0',
        }}
      >
        <div className="text-7xl mb-4" role="img" aria-label="templo con columnas">
          🏛️
        </div>
        <h2
          className="text-3xl font-bold mb-3"
          style={{ color: '#1A3D5C' }}
        >
          ¡Hola! Vamos a aprender sobre La Antigua Grecia
        </h2>
        <p
          className="text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: 'var(--color-muted)' }}
        >
          La información está dividida en partes pequeñas para que sea fácil de leer.
          Puedes elegir un tema pulsando un botón de abajo.
        </p>
      </div>

      {/* Instrucciones paso a paso */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: '#FFFDF9', border: '2px solid var(--color-border)' }}
      >
        <h3 className="font-bold text-xl mb-4" style={{ color: '#2D2926' }}>
          📋 ¿Cómo funciona esta aplicación?
        </h3>
        <ol className="space-y-3">
          {[
            ['1️⃣', 'Elige un tema en el menú de la izquierda.'],
            ['2️⃣', 'Lee la información con calma. No hay prisa.'],
            ['3️⃣', 'Pulsa el botón de sonido 🔊 para escuchar el texto.'],
            ['4️⃣', 'Cuando quieras, ve a "Repaso Final" 🎯 para practicar.'],
            ['5️⃣', 'Si necesitas un descanso, ve a "Zona de Calma" 🌿.'],
          ].map(([num, text]) => (
            <li key={num} className="flex items-start gap-3 text-base" style={{ color: '#2D2926' }}>
              <span className="text-2xl flex-shrink-0">{num}</span>
              <span className="leading-relaxed">{text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Tarjetas de temas */}
      <div>
        <h3 className="font-bold text-xl mb-4" style={{ color: '#2D2926' }}>
          📚 Elige un tema para empezar:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(temas).map((t) => (
            <button
              key={t.id}
              onClick={() => onNav(t.id)}
              className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all font-bold text-lg"
              style={{
                backgroundColor: '#FFFDF9',
                border: `3px solid var(--color-border)`,
                color: '#2D2926',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#3B6FA0';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#DDE9F5';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFDF9';
              }}
            >
              <span className="text-5xl flex-shrink-0" role="img" aria-hidden>
                {t.emoji}
              </span>
              <div>
                <div className="font-bold">{t.titulo}</div>
                <div className="text-sm font-normal mt-1" style={{ color: 'var(--color-muted)' }}>
                  {t.contenido.length} secciones
                </div>
              </div>
              <ArrowRight className="w-5 h-5 ml-auto flex-shrink-0 opacity-40" aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SECCIÓN TEMÁTICA ────────────────────────────────────────
interface TemaSectionProps {
  tema: Tema;
  speak: (t: string) => void;
  stop: () => void;
  speaking: boolean;
}

function TemaSection({ tema, speak, stop, speaking }: TemaSectionProps) {
  const [openSection, setOpenSection] = useState<number | null>(null);

  // Texto completo del tema para síntesis de voz
  const fullText = tema.contenido
    .map((s) => `${s.subtitulo}. ${s.puntos.join('. ')}`)
    .join('. ');

  const toggleSection = (idx: number) => {
    setOpenSection((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="tea-fade-in space-y-6">
      {/* Cabecera del tema */}
      <div
        className="rounded-2xl p-6 flex items-center gap-4"
        style={{
          backgroundColor: '#FFFDF9',
          border: `3px solid var(--color-border)`,
          borderLeft: `8px solid #3B6FA0`,
        }}
      >
        <span className="text-6xl flex-shrink-0" role="img" aria-hidden>
          {tema.emoji}
        </span>
        <div className="flex-1">
          <h2 className="text-2xl font-bold" style={{ color: '#1A3D5C' }}>
            {tema.titulo}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            {tema.contenido.length} secciones · Lee a tu ritmo
          </p>
        </div>
        {/* Botón leer todo en voz alta */}
        <button
          onClick={() => (speaking ? stop() : speak(fullText))}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all"
          style={{
            backgroundColor: speaking ? '#B85C1A' : '#3B6FA0',
            color: '#FFFFFF',
          }}
          aria-label={speaking ? 'Detener lectura' : 'Leer todo en voz alta'}
        >
          {speaking ? (
            <><VolumeX className="w-5 h-5" /> Parar</>
          ) : (
            <><Volume2 className="w-5 h-5" /> Escuchar</>
          )}
        </button>
      </div>

      {/* Secciones de contenido */}
      <div className="space-y-4">
        {tema.contenido.map((seccion, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#FFFDF9',
              border: '2px solid var(--color-border)',
            }}
          >
            {/* Botón para expandir/colapsar */}
            <button
              onClick={() => toggleSection(idx)}
              aria-expanded={openSection === idx}
              className="w-full flex items-center gap-4 px-6 py-4 text-left font-bold text-lg transition-all"
              style={{
                backgroundColor: openSection === idx ? '#DDE9F5' : 'transparent',
                color: '#1A3D5C',
              }}
            >
              <span className="text-3xl flex-shrink-0" aria-hidden>
                {seccion.emoji}
              </span>
              <span className="flex-1">{seccion.subtitulo}</span>
              <span
                className="flex-shrink-0 text-2xl transition-transform duration-200"
                style={{ transform: openSection === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden
              >
                ▾
              </span>
            </button>

            {/* Contenido expandido */}
            {openSection === idx && (
              <div className="px-6 pb-6 pt-2 tea-fade-in">
                {/* Botón leer esta sección */}
                <button
                  onClick={() => speak(`${seccion.subtitulo}. ${seccion.puntos.join('. ')}`)}
                  className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                  style={{ backgroundColor: '#DDE9F5', color: '#1A3D5C', border: '2px solid #3B6FA0' }}
                  aria-label="Leer esta sección en voz alta"
                >
                  <Volume2 className="w-4 h-4" aria-hidden />
                  Leer esta sección en voz alta
                </button>

                <ul className="space-y-3" role="list">
                  {seccion.puntos.map((punto, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 leading-relaxed"
                      style={{ color: '#2D2926' }}
                    >
                      <span
                        className="flex-shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: '#3B6FA0', minWidth: '1.5rem' }}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instrucción al pie */}
      <div
        className="rounded-xl px-5 py-3 flex items-center gap-3 text-sm"
        style={{ backgroundColor: '#F0ECE4', color: 'var(--color-muted)' }}
      >
        <span aria-hidden>💡</span>
        <span>Pulsa cada sección para ver la información. No hay prisa.</span>
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────
interface QuizProps {
  speak: (t: string) => void;
  stop: () => void;
}

function Quiz({ speak, stop }: QuizProps) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [_opcionElegida, setOpcionElegida] = useState<string | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const pregunta = quizPreguntas[preguntaActual];
  const totalPreguntas = quizPreguntas.length;

  const handleRespuesta = (respuesta: string) => {
    if (mostrarResultado) return; // evitar doble click
    const correcta = respuesta === pregunta.respuestaCorrecta;
    setEsCorrecto(correcta);
    setOpcionElegida(respuesta);
    setMostrarResultado(true);
    if (correcta) setPuntos((p) => p + 1);

    // Leer feedback
    setTimeout(() => {
      speak(correcta ? '¡Muy bien! Respuesta correcta.' : `No del todo. ${pregunta.explicacion}`);
    }, 200);
  };

  const siguientePregunta = () => {
    stop();
    setMostrarResultado(false);
    setOpcionElegida(null);
    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual((p) => p + 1);
    } else {
      setJuegoTerminado(true);
    }
  };

  const reiniciarJuego = () => {
    stop();
    setPreguntaActual(0);
    setMostrarResultado(false);
    setOpcionElegida(null);
    setPuntos(0);
    setJuegoTerminado(false);
  };

  // ── PANTALLA FINAL ──
  if (juegoTerminado) {
    const porcentaje = Math.round((puntos / totalPreguntas) * 100);
    const mensaje =
      porcentaje === 100
        ? '¡Perfecto! Has respondido todo bien. ¡Eres un experto en Grecia!'
        : porcentaje >= 60
        ? '¡Muy bien! Has aprendido muchas cosas sobre Grecia.'
        : 'Has completado el repaso. Puedes volver a los temas y leerlos de nuevo.';

    return (
      <div
        className="tea-fade-in rounded-2xl p-10 text-center"
        style={{
          backgroundColor: '#FFFDF9',
          border: '3px solid #2E7D62',
          borderTop: '8px solid #2E7D62',
        }}
      >
        <div className="text-8xl mb-6" role="img" aria-label="trofeo">
          🏆
        </div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#1A4A38' }}>
          ¡Has terminado el repaso!
        </h2>
        <p className="text-xl mb-2" style={{ color: 'var(--color-muted)' }}>
          Has contestado bien{' '}
          <strong style={{ color: '#1A4A38' }}>
            {puntos} de {totalPreguntas}
          </strong>{' '}
          preguntas.
        </p>

        {/* Estrellas visuales */}
        <div className="flex justify-center gap-2 my-5" aria-label={`${puntos} estrellas de ${totalPreguntas}`}>
          {Array.from({ length: totalPreguntas }).map((_, i) => (
            <Star
              key={i}
              className="w-10 h-10"
              fill={i < puntos ? '#F59E0B' : 'none'}
              style={{ color: i < puntos ? '#F59E0B' : '#D9D3C8' }}
            />
          ))}
        </div>

        <p className="text-lg mb-8 max-w-md mx-auto leading-relaxed" style={{ color: '#2D2926' }}>
          {mensaje}
        </p>

        <button
          onClick={reiniciarJuego}
          className="inline-flex items-center gap-3 font-bold text-xl px-8 py-4 rounded-xl transition-all"
          style={{ backgroundColor: '#3B6FA0', color: '#FFFFFF' }}
        >
          <RefreshCcw className="w-6 h-6" aria-hidden />
          Jugar otra vez
        </button>
      </div>
    );
  }

  // ── PREGUNTA ACTIVA ──
  return (
    <div className="tea-fade-in space-y-6 max-w-2xl mx-auto">
      {/* Cabecera con progreso */}
      <div
        className="rounded-2xl p-5"
        style={{
          backgroundColor: '#FFFDF9',
          border: '2px solid var(--color-border)',
        }}
      >
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#1A3D5C' }}>
            <span role="img" aria-hidden>🎯</span> Repaso Final
          </h2>
          <span
            className="font-bold text-base px-4 py-1 rounded-full"
            style={{ backgroundColor: '#DDE9F5', color: '#1A3D5C' }}
            aria-live="polite"
            aria-label={`Pregunta ${preguntaActual + 1} de ${totalPreguntas}`}
          >
            Pregunta {preguntaActual + 1} de {totalPreguntas}
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="relative h-5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E2D8' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((preguntaActual) / totalPreguntas) * 100}%`,
              backgroundColor: '#3B6FA0',
            }}
            role="progressbar"
            aria-valuenow={preguntaActual}
            aria-valuemin={0}
            aria-valuemax={totalPreguntas}
          />
        </div>
        {/* Pastillas indicadoras */}
        <div className="flex gap-2 mt-3 flex-wrap" aria-hidden>
          {quizPreguntas.map((_, idx) => (
            <div
              key={idx}
              className="h-3 rounded-full transition-all duration-300"
              style={{
                width: idx === preguntaActual ? '2.5rem' : '1.5rem',
                backgroundColor:
                  idx < preguntaActual
                    ? '#2E7D62'
                    : idx === preguntaActual
                    ? '#3B6FA0'
                    : '#D9D3C8',
              }}
            />
          ))}
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <div
        className="rounded-2xl p-8"
        style={{
          backgroundColor: '#FFFDF9',
          border: '3px solid var(--color-border)',
        }}
      >
        <div className="text-5xl text-center mb-4" role="img" aria-hidden>
          {pregunta.emoji}
        </div>
        <h3
          className="text-xl font-bold text-center leading-relaxed mb-8"
          style={{ color: '#2D2926' }}
        >
          {pregunta.pregunta}
        </h3>

        {/* Opciones de respuesta */}
        {!mostrarResultado ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pregunta.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => handleRespuesta(opcion)}
                className="py-5 px-5 rounded-2xl font-bold text-lg text-left transition-all"
                style={{
                  backgroundColor: '#DDE9F5',
                  color: '#1A3D5C',
                  border: '3px solid #3B6FA0',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#B7CDE8';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#DDE9F5';
                }}
                aria-label={`Opción ${i + 1}: ${opcion}`}
              >
                {opcion}
              </button>
            ))}
          </div>
        ) : (
          /* Feedback de respuesta */
          <div
            className="rounded-2xl p-6 tea-zoom-in"
            style={{
              backgroundColor: esCorrecto ? '#D4EDE6' : '#FDEBD8',
              border: `3px solid ${esCorrecto ? '#2E7D62' : '#B85C1A'}`,
            }}
          >
            {/* Icono y mensaje */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: esCorrecto ? '#2E7D62' : '#B85C1A' }}
              >
                {esCorrecto ? (
                  <Check className="w-8 h-8 text-white" aria-hidden />
                ) : (
                  <X className="w-8 h-8 text-white" aria-hidden />
                )}
              </div>
              <h4
                className="text-2xl font-bold"
                style={{ color: esCorrecto ? '#1A4A38' : '#6B2500' }}
              >
                {esCorrecto ? '¡Muy bien! ✅' : 'Vamos a repasar 🔄'}
              </h4>
            </div>

            {/* Respuesta correcta cuando falla */}
            {!esCorrecto && (
              <div
                className="mb-3 px-4 py-2 rounded-xl flex items-start gap-2 text-base font-bold"
                style={{ backgroundColor: '#FDEBD8', color: '#6B2500', border: '2px dashed #B85C1A' }}
              >
                <span aria-hidden>✅</span>
                <span>La respuesta correcta es: {pregunta.respuestaCorrecta}</span>
              </div>
            )}

            {/* Explicación */}
            <div
              className="rounded-xl px-4 py-3 text-base leading-relaxed"
              style={{ backgroundColor: '#FFFDF9', color: '#2D2926' }}
            >
              <span className="font-bold" aria-hidden>💬 </span>
              {pregunta.explicacion}
            </div>

            {/* Botón continuar */}
            <button
              onClick={siguientePregunta}
              className="mt-5 w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-all"
              style={{ backgroundColor: '#2D2926', color: '#FFFFFF' }}
              autoFocus
            >
              {preguntaActual < totalPreguntas - 1 ? (
                <>Siguiente pregunta <ArrowRight className="w-6 h-6" aria-hidden /></>
              ) : (
                <>Ver mis resultados <Star className="w-6 h-6" aria-hidden /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ZONA DE CALMA ────────────────────────────────────────────
function ZonaCalma() {
  const [respirando, setRespirando] = useState(false);
  const [fase, setFase] = useState<'inhala' | 'mantén' | 'exhala'>('inhala');
  const [ciclo, setCiclo] = useState(0);

  useEffect(() => {
    if (!respirando) return;

    const fases: { nombre: 'inhala' | 'mantén' | 'exhala'; duracion: number }[] = [
      { nombre: 'inhala', duracion: 4000 },
      { nombre: 'mantén', duracion: 4000 },
      { nombre: 'exhala', duracion: 6000 },
    ];

    let index = 0;
    setFase(fases[0].nombre);

    const avanzar = () => {
      index = (index + 1) % fases.length;
      setFase(fases[index].nombre);
      if (index === 0) setCiclo((c) => c + 1);
    };

    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(() => {
        avanzar();
        loop();
      }, fases[index].duracion);
    };
    loop();

    return () => clearTimeout(timer);
  }, [respirando]);

  const faseConfig = {
    inhala: { emoji: '🌬️', texto: 'Inhala despacio…', color: '#3B6FA0', scale: 'scale-125' },
    mantén: { emoji: '😌', texto: 'Mantén el aire…', color: '#6952A0', scale: 'scale-125' },
    exhala: { emoji: '🍃', texto: 'Exhala despacio…', color: '#2E7D62', scale: 'scale-100' },
  };

  const cfg = faseConfig[fase];

  return (
    <div className="tea-fade-in space-y-8 max-w-xl mx-auto">
      {/* Cabecera */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          backgroundColor: '#FFFDF9',
          border: '3px solid #6952A0',
          borderTop: '8px solid #6952A0',
        }}
      >
        <div className="text-6xl mb-3" role="img" aria-label="hoja">🌿</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#3A2D6A' }}>
          Zona de Calma
        </h2>
        <p className="text-base" style={{ color: 'var(--color-muted)' }}>
          Este es tu espacio de descanso. Puedes estar aquí el tiempo que necesites.
        </p>
      </div>

      {/* Ejercicio de respiración */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: '#FFFDF9', border: '2px solid var(--color-border)' }}
      >
        <h3 className="font-bold text-xl mb-5" style={{ color: '#2D2926' }}>
          🫁 Ejercicio de respiración
        </h3>

        {/* Círculo animado */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full flex items-center justify-center text-5xl transition-transform duration-[3000ms] ease-in-out ${
              respirando ? cfg.scale : 'scale-100'
            }`}
            style={{
              backgroundColor: respirando ? `${cfg.color}22` : '#E8E2D8',
              border: `4px solid ${respirando ? cfg.color : '#D9D3C8'}`,
            }}
            role="img"
            aria-label={respirando ? cfg.texto : 'círculo de respiración'}
          >
            {respirando ? cfg.emoji : '😊'}
          </div>
        </div>

        {respirando && (
          <div className="mb-3 tea-fade-in">
            <p className="text-xl font-bold mb-1" style={{ color: cfg.color }}>
              {cfg.texto}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              Ciclo {ciclo + 1}
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setRespirando((r) => !r);
            setCiclo(0);
            setFase('inhala');
          }}
          className="px-8 py-3 rounded-xl font-bold text-lg transition-all"
          style={{
            backgroundColor: respirando ? '#B85C1A' : '#6952A0',
            color: '#FFFFFF',
          }}
        >
          {respirando ? '⏹ Detener' : '▶ Empezar respiración'}
        </button>
      </div>

      {/* Mensajes tranquilizadores */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: '#FFFDF9', border: '2px solid var(--color-border)' }}
      >
        <h3 className="font-bold text-xl mb-4" style={{ color: '#2D2926' }}>
          🌟 Recuerda:
        </h3>
        <ul className="space-y-3">
          {[
            '✅ Puedes ir a tu ritmo. No hay prisa.',
            '✅ Puedes parar cuando quieras y continuar después.',
            '✅ No pasa nada si cometes un error. Es normal.',
            '✅ Puedes pedir ayuda cuando lo necesites.',
            '✅ Estás haciendo un trabajo genial.',
          ].map((msg, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base leading-relaxed"
              style={{ color: '#2D2926' }}
            >
              <span className="flex-1">{msg}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
