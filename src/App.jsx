import { useState } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a1414; }

.lesson-card {
  transition: border-color 0.25s, box-shadow 0.25s;
}
.lesson-card:hover {
  box-shadow: 0 4px 32px rgba(0,160,166,0.13);
}
.tab-btn {
  transition: background 0.18s, color 0.18s, border-color 0.18s;
  cursor: pointer;
}
.tab-btn:hover {
  background: rgba(0,160,166,0.12) !important;
}
.node-dot {
  transition: transform 0.2s;
}
.node-dot:hover {
  transform: scale(1.18);
}
.section-pill {
  transition: background 0.18s, border-color 0.18s, color 0.18s, box-shadow 0.18s;
  cursor: pointer;
}
.section-pill:hover {
  box-shadow: 0 0 12px rgba(0,160,166,0.22);
}
.section-pill.active {
  box-shadow: 0 0 16px rgba(0,160,166,0.28);
}
`;

const COLORS = {
  tealLight: "#00c8cf",
  teal:      "#00A0A6",
  tealDark:  "#007a7f",
  red:       "#A10019",
};

const DARK = {
  bg:       "#0a1414",
  surface:  "#0f1f1f",
  surface2: "#152828",
  border:   "rgba(0,160,166,0.22)",
  text:     "#e8f4f4",
  textSub:  "#9ababa",
  textMute: "#4a7a7a",
};

const OF = { fontFamily:"'Orbitron','Montserrat',sans-serif" };
const MF = { fontFamily:"'Montserrat',sans-serif" };

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <polygon points="40,8 64,21 40,34 16,21" fill={COLORS.teal} opacity="0.92"/>
      <polygon points="16,21 16,48 40,61 40,34" fill={COLORS.tealDark} opacity="0.95"/>
      <polygon points="64,21 64,48 40,61 40,34" fill={COLORS.teal} opacity="0.7"/>
      <polyline points="10,17 4,21 4,38 16,45" stroke={COLORS.red} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="70,17 76,21 76,38 64,45" stroke={COLORS.red} strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="28,61 28,68 40,74 52,68 52,61" stroke={COLORS.tealDark} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="40,8 64,21 40,34 16,21" stroke={COLORS.tealLight} strokeWidth="1.6" fill="none" opacity="0.7"/>
      <line x1="16" y1="21" x2="16" y2="48" stroke={COLORS.tealLight} strokeWidth="1.6" opacity="0.5"/>
      <line x1="64" y1="21" x2="64" y2="48" stroke={COLORS.tealLight} strokeWidth="1.6" opacity="0.5"/>
      <line x1="40" y1="34" x2="40" y2="61" stroke={COLORS.tealLight} strokeWidth="1.6" opacity="0.4"/>
      <polyline points="16,48 40,61 64,48" stroke={COLORS.tealLight} strokeWidth="1.6" fill="none" opacity="0.5"/>
      <circle cx="40" cy="8" r="2.8" fill={COLORS.red} opacity="0.9"/>
    </svg>
  );
}

function SectionRule({ label }) {
  return (
    <div style={{ ...MF, fontSize:10, fontWeight:700, letterSpacing:4, textTransform:"uppercase", color:COLORS.teal, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ height:1, width:20, background:COLORS.teal }} />
      {label}
      <div style={{ height:1, flex:1, background:`linear-gradient(90deg,${COLORS.teal},transparent)` }} />
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <div style={{
      ...MF, background:`${color}15`, border:`1.5px solid ${color}`,
      borderRadius:4, padding:"3px 10px", fontSize:9,
      color, letterSpacing:2, fontWeight:800, display:"inline-block"
    }}>{label}</div>
  );
}

function BlockLabel({ text, color }) {
  return (
    <div style={{ ...MF, fontSize:9, color, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>
      {text}
    </div>
  );
}

function PitfallItem({ text }) {
  return (
    <div style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
      <span style={{ color:COLORS.red, fontSize:13, lineHeight:"20px", flexShrink:0 }}>▸</span>
      <span style={{ ...MF, fontSize:13, color:DARK.textSub, lineHeight:1.7, fontWeight:500 }}>{text}</span>
    </div>
  );
}

function BestItem({ text }) {
  return (
    <div style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
      <span style={{ color:COLORS.tealLight, fontSize:13, lineHeight:"20px", flexShrink:0 }}>✓</span>
      <span style={{ ...MF, fontSize:13, color:DARK.textSub, lineHeight:1.7, fontWeight:500 }}>{text}</span>
    </div>
  );
}

function RoleChip({ role }) {
  return (
    <div style={{
      ...MF, background:DARK.surface2, border:`1px solid ${DARK.border}`,
      borderRadius:6, padding:"7px 13px", fontSize:11, color:DARK.textSub,
      fontWeight:600, letterSpacing:0.5
    }}>{role}</div>
  );
}

function SkillTag({ skill, accent }) {
  return (
    <div style={{
      ...MF, background:`${accent}10`, border:`1px solid ${accent}40`,
      borderRadius:20, padding:"4px 12px", fontSize:10, color:accent,
      fontWeight:700, letterSpacing:1
    }}>{skill}</div>
  );
}

// ─── MESH DIAGRAM ──────────────────────────────────────────────────────────────
function MeshDiagram({ activeId }) {
  const nodes = [
    { id:"governance",     label:"GOVERNANCE",    x:50,  y:12, c:COLORS.tealLight },
    { id:"stewardship",    label:"STEWARDSHIP",   x:85,  y:38, c:COLORS.teal },
    { id:"management",     label:"MANAGEMENT",    x:72,  y:78, c:COLORS.tealDark },
    { id:"administration", label:"ADMIN",         x:28,  y:78, c:COLORS.red },
    { id:"coordination",   label:"COORDINATION",  x:15,  y:38, c:COLORS.teal },
  ];

  const edges = [
    [0,1],[1,2],[2,3],[3,4],[4,0],
    [0,2],[0,3],[1,3],[1,4],[2,4],
  ];

  return (
    <svg viewBox="0 0 100 100" style={{ width:"100%", maxWidth:260, display:"block", margin:"0 auto" }}>
      {edges.map(([a,b],i) => {
        const na = nodes[a]; const nb = nodes[b];
        const isActive = activeId && (na.id === activeId || nb.id === activeId);
        return (
          <line key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={isActive ? COLORS.teal : "rgba(0,160,166,0.15)"}
            strokeWidth={isActive ? "0.6" : "0.3"}
          />
        );
      })}
      {nodes.map(n => {
        const isActive = n.id === activeId;
        return (
          <g key={n.id} className="node-dot">
            <circle cx={n.x} cy={n.y} r={isActive ? 5.5 : 3.5}
              fill={isActive ? n.c : `${n.c}40`}
              stroke={n.c} strokeWidth={isActive ? "1.2" : "0.6"}
            />
            {isActive && <circle cx={n.x} cy={n.y} r="8" fill="none" stroke={n.c} strokeWidth="0.4" opacity="0.5"/>}
            <text x={n.x} y={n.y - 7} textAnchor="middle"
              style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"4.5px", fontWeight:700, letterSpacing:"0.5px" }}
              fill={isActive ? n.c : "rgba(0,160,166,0.5)"}
            >{n.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── LESSON DATA ───────────────────────────────────────────────────────────────
const LESSONS = [
  {
    id: "governance",
    index: "01",
    title: "Governance",
    accentColor: COLORS.tealLight,
    badgeLabel: "SELF-AUTHORITY",
    definition: "Steering from within; direct authority over self.",
    expanded: "In a decentralized organization, governance is not a position held at the top of a pyramid — it is a distributed function exercised at every node. Each member, team, or entity operates with sovereign decision-making capacity within a clearly defined domain. The organization does not govern its members from above; rather, members govern their own conduct, commitments, and outputs according to shared principles. This requires that governance be encoded — not in titles, but in protocols, agreements, and transparent decision-rights that are accessible and enforceable by all participants. Without a center, governance must live in the structure itself.",
    pitfalls: [
      "Confusing autonomy with absence of accountability. Self-governance without transparent commitments produces drift and cover.",
      "Failing to encode decision boundaries. When no one defines what a node can decide alone versus collectively, every decision becomes a negotiation.",
      "Treating governance as a document rather than a practice. Founding charters and constitutions become artifacts unless repeatedly rehearsed through actual decisions.",
      "Allowing governance to calcify. Decentralized systems evolve; governance frameworks that do not adapt become obstacles rather than guides.",
    ],
    roles: [
      { role:"Protocol Architect", skills:["Systems design","Constitutional drafting","Conflict resolution frameworks"] },
      { role:"Domain Lead",        skills:["Scope definition","Consent-based decision-making","Boundary communication"] },
      { role:"Circle Facilitator", skills:["Sociocratic process","Meeting facilitation","Tension processing"] },
    ],
    bestPractices: [
      "Document decision rights explicitly — every domain should have a written record of what it can decide unilaterally, what requires consent, and what requires full ratification.",
      "Use consent, not consensus. Consensus can paralyze distributed systems; consent-based governance requires only the absence of paramount objection.",
      "Separate governance meetings from operations meetings. Mixing the two collapses the structures that keep self-organization functional.",
      "Review governance protocols on a defined cadence — quarterly at minimum — to reflect organizational growth and accumulated learning.",
    ],
  },
  {
    id: "stewardship",
    index: "02",
    title: "Stewardship",
    accentColor: COLORS.teal,
    badgeLabel: "CUSTODIAL CARE",
    definition: "Custodial care on behalf of another; responsibility without ownership.",
    expanded: "In a decentralized organization, no individual owns the commons — the brand, the treasury, the community, the mission. Stewards hold these on behalf of the collective and are accountable to it. Stewardship is the function that prevents decentralization from collapsing into fragmentation. A steward does not exploit the resources in their care, does not appropriate them for personal advantage, and does not neglect them because they feel no personal stake. The steward's authority is real — they have the power to act — but it is bounded by purpose. In distributed networks, stewardship is especially critical because there is no central body to police misuse; the steward's integrity is the safeguard.",
    pitfalls: [
      "Stewards gradually behaving as owners. When accountability mechanisms weaken, stewards drift into treating shared resources as personal assets.",
      "Stewardship without succession planning. Resources become dependent on one person; when that person exits, institutional knowledge and care collapse.",
      "Conflating stewardship with maintenance. True stewardship is active and developmental — not merely preserving what exists, but tending its growth on behalf of those it serves.",
      "Accepting stewardship without the authority to act. A steward without operational power is a caretaker without keys — responsible but incapable.",
    ],
    roles: [
      { role:"Treasury Steward",   skills:["Financial governance","Transparent reporting","Multi-sig accountability"] },
      { role:"Brand Custodian",    skills:["Brand standards enforcement","Community trust-building","Integrity monitoring"] },
      { role:"Mission Guardian",   skills:["Strategic alignment","Values articulation","Long-view planning"] },
    ],
    bestPractices: [
      "Publish stewardship mandates publicly — the scope of care, the limits of authority, and the reporting obligations attached to each steward role.",
      "Rotate stewards on defined terms. Long tenure without transition creates dependency and erodes the distributed nature of the organization.",
      "Separate operational access from ownership record. Stewards should hold signing authority, not title — and the distinction must be formalized.",
      "Build review rituals into stewardship: scheduled audits, community check-ins, and transparent logs of decisions made under stewardship authority.",
    ],
  },
  {
    id: "management",
    index: "03",
    title: "Management",
    accentColor: COLORS.tealDark,
    badgeLabel: "OPERATIONAL CONTROL",
    definition: "Operational control which directly impacts outcome.",
    expanded: "Management in a decentralized context is not the oversight of subordinates — it is the hands-on execution of work within a defined domain. The manager in a flat organization is, in many respects, closer to a craftsperson than to a supervisor: someone who directly touches the work, monitors its quality, and adjusts the method in real time. Without vertical authority to delegate accountability upward, management in distributed systems requires exceptionally high personal ownership. Outcomes cannot be blamed on approval chains or unclear mandates. The manager owns both the process and the result. This demands clarity on scope, resources, and success criteria before work begins — not after it fails.",
    pitfalls: [
      "Managing process rather than outcome. In decentralized environments, process obsession without results-focus produces activity without progress.",
      "Scope creep without renegotiation. When a manager begins touching adjacent domains without explicit agreement, they erode the boundaries that protect other nodes.",
      "Assuming shared context. Decentralized teams operate asynchronously; what one manager considers obvious background may be entirely absent for a collaborating node.",
      "Under-documenting decisions. Without a reporting hierarchy, institutional memory depends on explicit documentation — managers who do not record their reasoning create organizational debt.",
    ],
    roles: [
      { role:"Project Operator",  skills:["Scope management","Outcome tracking","Async communication"] },
      { role:"Pod Lead",          skills:["Resource allocation","Sprint facilitation","Dependency mapping"] },
      { role:"Delivery Manager",  skills:["Risk identification","Status transparency","Escalation protocols"] },
    ],
    bestPractices: [
      "Define the result before defining the process. In decentralized settings, the what must be non-negotiable; the how is the manager's domain to determine.",
      "Operate on written agreements. Verbal commitments dissolve in async environments; every scope, resource grant, and deadline must be recorded.",
      "Report outputs, not effort. Decentralized organizations cannot observe hours worked; the only meaningful currency is delivered outcomes.",
      "Build explicit handoff protocols. When a management function transfers to another node or person, the transition must include full context transfer — not just file access.",
    ],
  },
  {
    id: "administration",
    index: "04",
    title: "Administration",
    accentColor: COLORS.red,
    badgeLabel: "PROCESS EXECUTION",
    definition: "Service rendered through process execution.",
    expanded: "Administration is the connective tissue of the organization — the function that ensures that agreements become actions, that records are kept, that compliance is maintained, and that the organization's commitments to itself and to external parties are honored through systematic process. In decentralized organizations, administration often receives the least attention because it carries no prestige and produces no visible product. Yet without it, governance decisions never get implemented, stewardship records disappear, and management commitments become unenforceable. Administration is infrastructure: invisible when working well, catastrophic when absent. In a flat organization where there is no administrative department to absorb this work by default, every node must either develop administrative capacity or designate it deliberately.",
    pitfalls: [
      "Treating administration as overhead. In decentralized systems, administrative failure is an existential risk — not a minor inefficiency.",
      "Building administrative processes that only one person understands. Single-point dependencies in administration create brittle systems.",
      "Administering past the current state. Processes designed for an earlier version of the organization continue consuming resources and generating friction long after their relevance expires.",
      "Under-resourcing the administrative function. When no one is assigned explicitly, administrative tasks are distributed randomly — and executed inconsistently.",
    ],
    roles: [
      { role:"Operations Coordinator", skills:["Process documentation","System administration","Compliance tracking"] },
      { role:"Records Manager",        skills:["Information architecture","Retention policy","Audit preparation"] },
      { role:"Onboarding Architect",   skills:["Member intake design","Orientation facilitation","Access provisioning"] },
    ],
    bestPractices: [
      "Document every repeatable process. If a task is performed more than twice, it belongs in a written standard operating procedure with an assigned owner.",
      "Use tooling that is visible to all relevant parties. Administrative opacity is an organizational liability; shared dashboards and logs replace the surveillance function of hierarchy.",
      "Assign administrative ownership, not just access. Someone must be accountable for each administrative function — not merely capable of performing it.",
      "Audit administrative load regularly. As organizations scale, informal administrative work accumulates invisibly; periodic audits surface it before it becomes a systemic burden.",
    ],
  },
  {
    id: "coordination",
    index: "05",
    title: "Coordination",
    accentColor: COLORS.tealLight,
    badgeLabel: "LATERAL ALIGNMENT",
    definition: "Alignment of the parts towards shared order.",
    expanded: "Coordination is the function that makes decentralization viable. Without a command structure to impose alignment, distributed organizations depend on coordination mechanisms to ensure that autonomous nodes move in complementary rather than conflicting directions. Coordination is not consensus-building — it is the structural practice of making individual work legible to the whole, so that others can orient their own efforts accordingly. In a mesh of peers, coordination replaces the alignment function that hierarchy provides in vertical organizations. It operates through shared calendars, status protocols, cross-domain liaisons, and regular rhythm ceremonies — not through authority, but through transparency and mutual adjustment.",
    pitfalls: [
      "Confusing coordination with control. The coordinator's role is to make work visible and connected — not to direct it. Coordinators who begin issuing directives undermine the distributed structure.",
      "Over-coordinating. Excessive synchronization meetings, status rituals, and alignment ceremonies consume the autonomy they are meant to protect. Coordination overhead can exceed coordination value.",
      "Coordinating without shared definitions. When nodes use different terminology for the same concept, or the same terminology for different concepts, coordination produces false alignment.",
      "Neglecting informal coordination channels. Formal rituals capture only a portion of the alignment work; unacknowledged informal networks carry the rest — and when those networks fail, visible systems do not compensate.",
    ],
    roles: [
      { role:"Integration Lead",   skills:["Cross-domain translation","Dependency tracking","Rhythm design"] },
      { role:"Network Weaver",     skills:["Relationship mapping","Information routing","Trust cultivation"] },
      { role:"Liaison Officer",    skills:["Inter-node communication","Conflict mediation","Feedback synthesis"] },
    ],
    bestPractices: [
      "Establish a minimal, consistent rhythm of cross-domain check-ins. Frequency matters less than predictability; irregular coordination is worse than infrequent coordination.",
      "Use shared artifacts rather than shared meetings. Visible work-in-progress boards, public decision logs, and shared roadmaps coordinate passively — reducing the synchronous load.",
      "Name coordinators explicitly. In flat organizations, coordination is often assumed to happen organically; it rarely does. Designated coordinators with clear scope perform the function reliably.",
      "Measure coordination cost. Time spent in alignment activities is an organizational investment; when it exceeds the value of the alignment it produces, the coordination structure requires redesign.",
    ],
  },
];

const TABS = ["Definition", "In Practice", "Pitfalls", "Roles & Skills", "Best Practices"];

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const T = DARK;
  const lesson = LESSONS[activeSection];

  return (
    <div style={{ ...MF, background:T.bg, color:T.text, minHeight:"100vh" }}>
      <style>{G}</style>

      {/* TOPBAR */}
      <div style={{
        background:T.surface, borderBottom:`1px solid ${T.border}`,
        padding:"12px 20px", display:"flex", justifyContent:"space-between",
        alignItems:"center", position:"sticky", top:0, zIndex:50
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Logo size={34} />
          <div>
            <div style={{ ...OF, fontSize:13, fontWeight:700, color:COLORS.teal, letterSpacing:2, lineHeight:1 }}>MICROBIZ</div>
            <div style={{ ...MF, fontSize:8, color:T.textMute, letterSpacing:3, textTransform:"uppercase", marginTop:3 }}>Digital Business Solutions</div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
          <div style={{ ...MF, fontSize:9, color:T.textMute, fontWeight:700, letterSpacing:2 }}>MINI LESSON</div>
          <div style={{ ...OF, fontSize:9, color:COLORS.teal, fontWeight:600, letterSpacing:1 }}>DECENTRALIZED GOVERNANCE</div>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"24px 16px" }}>

        {/* HEADER */}
        <div style={{ marginBottom:28, paddingBottom:24, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ ...MF, fontSize:9, color:COLORS.teal, letterSpacing:4, textTransform:"uppercase", fontWeight:700, marginBottom:10 }}>
            Module · Organizational Architecture
          </div>
          <h1 style={{ ...OF, fontSize:"clamp(20px,5vw,32px)", fontWeight:800, color:T.text, letterSpacing:2, marginBottom:10, lineHeight:1.2 }}>
            Governance Without a Center
          </h1>
          <p style={{ ...MF, fontSize:13, color:T.textSub, lineHeight:1.8, fontWeight:500, maxWidth:520 }}>
            Five functions that replace the command hierarchy in a decentralized organization — each distinct in authority, accountability, and operational domain.
          </p>

          {/* MESH DIAGRAM */}
          <div style={{ marginTop:24, background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"20px 16px" }}>
            <div style={{ ...MF, fontSize:9, color:T.textMute, letterSpacing:3, textTransform:"uppercase", fontWeight:700, marginBottom:14, textAlign:"center" }}>
              Distributed Function Map — No Hierarchy
            </div>
            <MeshDiagram activeId={lesson.id} />
            <div style={{ ...MF, fontSize:10, color:T.textMute, textAlign:"center", marginTop:12, fontWeight:500, lineHeight:1.6 }}>
              Each node operates with sovereign authority within its domain.<br/>
              All edges carry equal weight — no apex, no subordination.
            </div>
          </div>
        </div>

        {/* SECTION SELECTOR */}
        <div style={{ marginBottom:24 }}>
          <SectionRule label="Select Function" />
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {LESSONS.map((l, i) => (
              <div
                key={l.id}
                className={`section-pill ${activeSection === i ? "active" : ""}`}
                onClick={() => { setActiveSection(i); setActiveTab(0); }}
                style={{
                  display:"flex", alignItems:"center", gap:14,
                  background: activeSection === i ? `${l.accentColor}12` : T.surface,
                  border: `1.5px solid ${activeSection === i ? l.accentColor : T.border}`,
                  borderRadius:10, padding:"12px 16px",
                }}
              >
                <div style={{ ...OF, fontSize:10, fontWeight:800, color: activeSection === i ? l.accentColor : T.textMute, width:22, flexShrink:0 }}>{l.index}</div>
                <div style={{ flex:1 }}>
                  <div style={{ ...OF, fontSize:12, fontWeight:700, color: activeSection === i ? l.accentColor : T.text, letterSpacing:1 }}>{l.title}</div>
                  <div style={{ ...MF, fontSize:11, color:T.textMute, marginTop:2, fontWeight:500 }}>{l.definition}</div>
                </div>
                <div style={{ color: activeSection === i ? l.accentColor : T.textMute, fontSize:14 }}>{activeSection === i ? "◆" : "▸"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LESSON PANEL */}
        <div className="lesson-card" style={{
          background:T.surface, border:`1px solid ${lesson.accentColor}`,
          borderRadius:14, overflow:"hidden", marginBottom:32
        }}>
          {/* PANEL HEADER */}
          <div style={{
            background:`${lesson.accentColor}10`,
            borderBottom:`1px solid ${lesson.accentColor}40`,
            padding:"16px 20px",
            display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12
          }}>
            <div>
              <div style={{ ...MF, fontSize:9, color:lesson.accentColor, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>
                Function {lesson.index}
              </div>
              <div style={{ ...OF, fontSize:20, fontWeight:800, color:T.text, letterSpacing:2, marginBottom:6 }}>{lesson.title}</div>
              <Badge label={lesson.badgeLabel} color={lesson.accentColor} />
            </div>
            <div style={{
              ...MF, background:`${lesson.accentColor}15`, border:`1.5px solid ${lesson.accentColor}40`,
              borderRadius:8, padding:"8px 12px", fontSize:11, color:lesson.accentColor,
              fontWeight:700, letterSpacing:1, textAlign:"center", flexShrink:0, minWidth:48
            }}>
              {lesson.index}<br/>
              <span style={{ fontSize:8, fontWeight:500, opacity:0.7 }}>of 05</span>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display:"flex", overflowX:"auto", borderBottom:`1px solid ${T.border}`, padding:"0 4px" }}>
            {TABS.map((tab, i) => (
              <button
                key={i}
                className="tab-btn"
                onClick={() => setActiveTab(i)}
                style={{
                  ...MF, background: activeTab === i ? `${lesson.accentColor}15` : "transparent",
                  border:"none", borderBottom: activeTab === i ? `2px solid ${lesson.accentColor}` : "2px solid transparent",
                  color: activeTab === i ? lesson.accentColor : T.textMute,
                  padding:"10px 14px", fontSize:10, fontWeight:700, letterSpacing:1.5,
                  textTransform:"uppercase", whiteSpace:"nowrap", flexShrink:0
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div style={{ padding:"20px" }}>

            {/* TAB 0: DEFINITION */}
            {activeTab === 0 && (
              <div>
                <BlockLabel text="Core Definition" color={lesson.accentColor} />
                <div style={{
                  ...OF, fontSize:15, fontWeight:700, color:T.text,
                  lineHeight:1.55, marginBottom:20, letterSpacing:0.5
                }}>
                  "{lesson.definition}"
                </div>
                <div style={{ height:1, background:`linear-gradient(90deg,${lesson.accentColor}40,transparent)`, marginBottom:20 }} />
                <BlockLabel text="Etymological Root" color={T.textMute} />
                <div style={{
                  background:T.surface2, border:`1px solid ${T.border}`,
                  borderLeft:`3px solid ${lesson.accentColor}`,
                  borderRadius:8, padding:"12px 16px"
                }}>
                  {lesson.id === "governance" && (
                    <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.8 }}>
                      From Greek <em style={{ color:lesson.accentColor }}>kybernan</em> — "to steer a ship." Plato first used it metaphorically for the direction of human affairs. The same root gives us <em style={{ color:lesson.accentColor }}>cybernetics</em>: the science of feedback and self-regulating systems. In a decentralized organization, the steering metaphor is precise — each node holds its own helm.
                    </p>
                  )}
                  {lesson.id === "stewardship" && (
                    <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.8 }}>
                      From Old English <em style={{ color:lesson.accentColor }}>stigweard</em> — "guardian of the hall." The hall belonged to the household, not to the steward. Care without ownership is the original meaning, and it remains the operative one. In decentralized systems, the commons requires this function by design.
                    </p>
                  )}
                  {lesson.id === "management" && (
                    <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.8 }}>
                      From Latin <em style={{ color:lesson.accentColor }}>manus</em> — "hand." Passed through Italian equestrian vocabulary: <em style={{ color:lesson.accentColor }}>maneggiare</em>, to handle a horse. Management is direct, physical contact with the work being directed. No proxy authority, no delegation buffer. The hands are on the reins.
                    </p>
                  )}
                  {lesson.id === "administration" && (
                    <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.8 }}>
                      From Latin <em style={{ color:lesson.accentColor }}>administrare</em> — "to serve toward." Built from <em style={{ color:lesson.accentColor }}>minister</em>, meaning "the lesser one who attends." Administration is positioned structurally below governance and stewardship — it is the function of faithful execution in service of the structure above it.
                    </p>
                  )}
                  {lesson.id === "coordination" && (
                    <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.8 }}>
                      From Latin <em style={{ color:lesson.accentColor }}>co-ordinare</em> — "to set in order together." The prefix <em style={{ color:lesson.accentColor }}>co-</em> is load-bearing: this is lateral ordering among equals, not vertical ordering by rank. The root <em style={{ color:lesson.accentColor }}>ordo</em> originally meant a row of threads in a loom — parts aligned to produce a unified fabric.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 1: IN PRACTICE */}
            {activeTab === 1 && (
              <div>
                <BlockLabel text="In a Decentralized Organization" color={lesson.accentColor} />
                <p style={{ ...MF, fontSize:13, color:T.textSub, lineHeight:1.85, fontWeight:500 }}>
                  {lesson.expanded}
                </p>
                <div style={{ marginTop:20, background:T.surface2, border:`1px solid ${T.border}`, borderLeft:`3px solid ${lesson.accentColor}`, borderRadius:8, padding:"12px 16px" }}>
                  <div style={{ ...MF, fontSize:9, color:lesson.accentColor, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Key Distinction</div>
                  <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.75 }}>
                    {lesson.id === "governance" && "In a hierarchy, governance sits at the top. In a decentralized system, governance is embedded at every level — the structure is not flattened governance, it is distributed governance. The difference is not cosmetic."}
                    {lesson.id === "stewardship" && "Ownership implies permanence and personal right. Stewardship implies term, accountability, and transfer. Decentralized organizations must formalize this distinction or watch stewards become owners by default."}
                    {lesson.id === "management" && "Hierarchy allows managers to offload accountability upward. Decentralization eliminates that escape. The distributed manager's accountability is total within their domain — and bounded precisely by it."}
                    {lesson.id === "administration" && "In vertical organizations, administration is a department. In distributed ones, it is a distributed responsibility with no natural home — which means it disappears unless explicitly assigned and resourced."}
                    {lesson.id === "coordination" && "Hierarchy coordinates through the chain of command. Decentralization coordinates through shared visibility. The mechanism is fundamentally different — and it fails in entirely different ways."}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: PITFALLS */}
            {activeTab === 2 && (
              <div>
                <BlockLabel text="Pitfalls and Lessons Learned" color={COLORS.red} />
                <div style={{ marginBottom:4 }}>
                  {lesson.pitfalls.map((p, i) => <PitfallItem key={i} text={p} />)}
                </div>
                <div style={{
                  marginTop:16, background:`${COLORS.red}0a`,
                  border:`1px solid ${COLORS.red}30`, borderRadius:8, padding:"12px 16px"
                }}>
                  <div style={{ ...MF, fontSize:9, color:COLORS.red, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Pattern to Watch</div>
                  <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.75 }}>
                    {lesson.id === "governance" && "The most common failure is not the absence of governance rules, but the absence of governance practice. Written protocols decay without repeated use. Organizations must rehearse governance deliberately."}
                    {lesson.id === "stewardship" && "The steward-to-owner drift is gradual and often invisible to the steward themselves. Prevention requires structural constraints — term limits, public reporting, multi-party sign-off — not personal integrity alone."}
                    {lesson.id === "management" && "The single most damaging pattern is the implicit assumption of shared context. Async, distributed teams operate from divergent information states by default. Explicit context transmission is a core management skill in this environment."}
                    {lesson.id === "administration" && "The most dangerous administrative failure is invisible debt: tasks that were never formally assigned, performed inconsistently, and undocumented — until a compliance event, audit, or transition makes the gap catastrophic."}
                    {lesson.id === "coordination" && "Over-coordination is as destructive as under-coordination. When alignment rituals consume more time than they preserve, participants route around them — and informal, untracked coordination replaces formal systems, with less visibility and more risk."}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: ROLES & SKILLS */}
            {activeTab === 3 && (
              <div>
                <BlockLabel text="Critical Roles" color={lesson.accentColor} />
                <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:24 }}>
                  {lesson.roles.map((r, i) => (
                    <div key={i} style={{
                      background:T.surface2, border:`1px solid ${T.border}`,
                      borderLeft:`3px solid ${lesson.accentColor}`,
                      borderRadius:8, padding:"14px 16px"
                    }}>
                      <div style={{ ...OF, fontSize:12, fontWeight:700, color:T.text, marginBottom:10, letterSpacing:0.5 }}>{r.role}</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {r.skills.map((s, j) => <SkillTag key={j} skill={s} accent={lesson.accentColor} />)}
                      </div>
                    </div>
                  ))}
                </div>
                <BlockLabel text="Core Competency Cluster" color={T.textMute} />
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {lesson.id === "governance" && ["Facilitation","Protocol Design","Conflict Resolution","Systems Thinking","Constitutional Reasoning"].map((s,i) => <RoleChip key={i} role={s} />)}
                  {lesson.id === "stewardship" && ["Fiduciary Responsibility","Long-horizon Thinking","Transparent Reporting","Asset Protection","Succession Design"].map((s,i) => <RoleChip key={i} role={s} />)}
                  {lesson.id === "management" && ["Scope Clarity","Outcome Ownership","Async Communication","Risk Identification","Documentation Practice"].map((s,i) => <RoleChip key={i} role={s} />)}
                  {lesson.id === "administration" && ["Process Architecture","Compliance Tracking","Information Management","System Administration","Onboarding Design"].map((s,i) => <RoleChip key={i} role={s} />)}
                  {lesson.id === "coordination" && ["Network Literacy","Cross-domain Translation","Rhythm Design","Dependency Mapping","Information Routing"].map((s,i) => <RoleChip key={i} role={s} />)}
                </div>
              </div>
            )}

            {/* TAB 4: BEST PRACTICES */}
            {activeTab === 4 && (
              <div>
                <BlockLabel text="Best Practices" color={COLORS.tealLight} />
                <div style={{ marginBottom:4 }}>
                  {lesson.bestPractices.map((b, i) => <BestItem key={i} text={b} />)}
                </div>
                <div style={{
                  marginTop:16, background:`${COLORS.tealLight}0a`,
                  border:`1px solid ${COLORS.tealLight}30`, borderRadius:8, padding:"12px 16px"
                }}>
                  <div style={{ ...MF, fontSize:9, color:COLORS.tealLight, letterSpacing:3, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Principle</div>
                  <p style={{ ...MF, fontSize:12, color:T.textSub, lineHeight:1.75 }}>
                    {lesson.id === "governance" && "The test of a governance system is not how it functions when everyone agrees — it is how it functions when they do not. Design for disagreement, not for harmony."}
                    {lesson.id === "stewardship" && "The test of a steward is not what they protect in plain sight — it is what they protect when no one is watching. Systems must be designed so that the answer is the same either way."}
                    {lesson.id === "management" && "The test of distributed management is not delivery under normal conditions — it is recovery when a node goes dark. Resilient management structures document enough to continue without their author."}
                    {lesson.id === "administration" && "The test of administrative health is whether a new member can understand how the organization works within their first week using documentation alone. If they cannot, administration has failed."}
                    {lesson.id === "coordination" && "The test of a coordination system is whether autonomous nodes can identify conflicts and dependencies without asking anyone. If visibility requires a meeting, the system is under-designed."}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* NAV FOOTER */}
          <div style={{
            borderTop:`1px solid ${T.border}`, padding:"12px 20px",
            display:"flex", justifyContent:"space-between", alignItems:"center"
          }}>
            <button
              onClick={() => { setActiveSection(s => Math.max(0, s-1)); setActiveTab(0); }}
              disabled={activeSection === 0}
              style={{
                ...MF, background:"transparent", border:`1px solid ${activeSection === 0 ? T.border : COLORS.teal}`,
                color: activeSection === 0 ? T.textMute : COLORS.teal,
                borderRadius:6, padding:"7px 16px", fontSize:11, fontWeight:700,
                cursor: activeSection === 0 ? "default" : "pointer", letterSpacing:1
              }}
            >← Prev</button>
            <div style={{ ...MF, fontSize:10, color:T.textMute, fontWeight:600, letterSpacing:2 }}>
              {activeSection + 1} / {LESSONS.length}
            </div>
            <button
              onClick={() => { setActiveSection(s => Math.min(LESSONS.length-1, s+1)); setActiveTab(0); }}
              disabled={activeSection === LESSONS.length - 1}
              style={{
                ...MF, background: activeSection === LESSONS.length-1 ? "transparent" : `${COLORS.teal}18`,
                border:`1px solid ${activeSection === LESSONS.length-1 ? T.border : COLORS.teal}`,
                color: activeSection === LESSONS.length-1 ? T.textMute : COLORS.teal,
                borderRadius:6, padding:"7px 16px", fontSize:11, fontWeight:700,
                cursor: activeSection === LESSONS.length-1 ? "default" : "pointer", letterSpacing:1
              }}
            >Next →</button>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:18, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo size={26} />
            <span style={{ ...OF, fontSize:11, fontWeight:700, color:COLORS.teal, letterSpacing:2 }}>MICROBIZ</span>
          </div>
          <div style={{ ...MF, fontSize:10, color:T.textMute, fontWeight:500, letterSpacing:1 }}>
            Decentralized Governance · Mini Lesson Series
          </div>
        </div>

      </div>
    </div>
  );
      }
