import { useState } from "react";

const TEAL="#00A0A6", RED="#A10019", BROWN="#592D00";
const G=`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');`;
const M={fontFamily:"'Montserrat',sans-serif"};
const TF={fontFamily:"'Conthrax','Montserrat',sans-serif",letterSpacing:2};
const BG={
  background:"radial-gradient(ellipse at 25% 15%, #00c8cf 0%, #00A0A6 45%, #007a7f 100%)",
  minHeight:"100vh", color:"#fff", ...M, backgroundAttachment:"fixed"
};
const card=(extra={})=>({
  background:"rgba(0,0,0,0.35)",
  backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
  border:"1px solid rgba(255,255,255,0.18)",
  borderRadius:12,
  boxShadow:"0 4px 28px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
  ...extra
});

const sections=[
  {id:"awareness",title:"Digital Awareness",accent:TEAL,
   questions:[
     {q:"I know what information about me is publicly available online.",options:["Never thought about it","I have a general idea","I've checked once or twice","I regularly monitor this"]},
     {q:"I understand what an IP address is and how it identifies my device.",options:["Not at all","Heard of it but unsure","I understand the basics","I understand it well"]},
     {q:"I know how my SIM card links my phone to my identity.",options:["Not at all","Vaguely","Somewhat","Yes, clearly"]},
     {q:"I understand how URLs and websites track my activity.",options:["Not at all","I've heard of cookies","Somewhat","Yes, clearly"]},
   ]},
  {id:"security",title:"Digital Security",accent:RED,
   questions:[
     {q:"I use unique, strong passwords for my most important accounts.",options:["I use the same password everywhere","Occasionally","For most accounts","Always, with a password manager"]},
     {q:"I know which of my accounts use my real name and personal information.",options:["No idea","I have a rough idea","I know most of them","I have a full list"]},
     {q:"I am aware of how companies use my data to generate revenue.",options:["Not at all","I've heard about it","Somewhat aware","Very aware"]},
     {q:"I have taken steps to limit my digital exposure online.",options:["Never","Rarely","Sometimes","Consistently"]},
   ]},
  {id:"presence",title:"Digital Presence",accent:BROWN,
   questions:[
     {q:"My online profiles (LinkedIn, social media, etc.) accurately represent who I am.",options:["I don't have profiles","They're outdated","Somewhat accurate","Fully updated & intentional"]},
     {q:"I have a personal bio or mission statement I feel confident sharing.",options:["Not at all","A rough draft","Something basic","Yes, polished & ready"]},
     {q:"I have a resume or CV that reflects my current skills and experience.",options:["Not at all","It's outdated","Fairly current","Fully updated"]},
     {q:"I am intentional about what I post and share online.",options:["I post without thinking","Sometimes","Mostly","Always"]},
   ]},
  {id:"ownership",title:"Digital Ownership",accent:TEAL,
   questions:[
     {q:"I have or have explored using a digital wallet.",options:["Never heard of it","I've heard of it","I've looked into it","I actively use one"]},
     {q:"I understand the concept of owning and controlling my digital identity.",options:["Not at all","Somewhat","Fairly well","Very well"]},
     {q:"I have a strategy for how I present myself professionally online.",options:["No strategy","Thinking about it","A basic strategy","A clear, active strategy"]},
     {q:"I feel confident that my digital presence represents my goals and values.",options:["Not at all","Somewhat","Mostly","Completely"]},
   ]},
];

const levels=[
  {label:"Level 01 — Newcomer",range:[0,24],tag:"ENTRY",color:RED,desc:"You're at the starting line. This series is designed exactly for where you are — you'll build a strong technical foundation from the ground up."},
  {label:"Level 02 — Explorer",range:[25,49],tag:"DEVELOPING",color:BROWN,desc:"You have surface-level awareness but gaps worth closing. You'll leave this series with a much clearer picture of your footprint and how to own it."},
  {label:"Level 03 — Builder",range:[50,74],tag:"PROFICIENT",color:TEAL,desc:"Solid foundation in place. Focus now on becoming more intentional and strategic — precision is your next edge."},
  {label:"Level 04 — Architect",range:[75,100],tag:"ADVANCED",color:TEAL,desc:"You're ahead of the curve. Use this series to formalize, future-proof, and maximize the leverage of your personal digital profile."},
];

const actionSteps={
  awareness:["Google yourself — review your first 3 pages of results","Study how IP addresses and URLs work (Week 1 & 2)","Set a monthly reminder to audit your digital footprint"],
  security:["Set up a password manager (e.g. Bitwarden or 1Password)","Catalog every account that holds your personal data","Tighten privacy settings on your top 3 platforms"],
  presence:["Update your LinkedIn profile with a current photo and bio","Draft a 3-sentence personal bio as a starting point","Refresh your resume with your most recent experience"],
  ownership:["Explore digital wallets — MetaMask covered in Week 3","Write your personal mission statement (Week 3 activity)","Define what owning your digital identity means for your goals"],
};

const PBar=({v,color=TEAL})=>(
  <div style={{background:"rgba(0,0,0,0.35)",borderRadius:3,height:6}}>
    <div style={{background:color,height:6,borderRadius:3,width:`${v}%`,
      boxShadow:`0 0 10px ${color}, 0 0 20px ${color}88`,transition:"width 1s ease"}}/>
  </div>
);

export default function App(){
  const [answers,setAnswers]=useState({});
  const [step,setStep]=useState("intro");
  const [si,setSi]=useState(0);
  const totalQ=sections.reduce((a,s)=>a+s.questions.length,0);
  const answered=Object.keys(answers).length;
  const setAns=(k,v)=>setAnswers(p=>({...p,[k]:v}));
  const secOk=(i)=>sections[i].questions.every((_,qi)=>answers[`${i}-${qi}`]!==undefined);
  const calcScore=()=>{let t=0;sections.forEach((s,i)=>s.questions.forEach((_,qi)=>{t+=(answers[`${i}-${qi}`]??0);}));return Math.round((t/(totalQ*3))*100);};
  const secScore=(i)=>{let t=0;sections[i].questions.forEach((_,qi)=>{t+=(answers[`${i}-${qi}`]??0);});return Math.round((t/(sections[i].questions.length*3))*100);};
  const getLevel=(s)=>levels.find(l=>s>=l.range[0]&&s<=l.range[1])||levels[0];
  const weak=()=>sections.map((s,i)=>({...s,score:secScore(i)})).filter(s=>s.score<50).map(s=>s.id);

  if(step==="intro") return(
    <div style={BG}><style>{G}</style>
    <div style={{maxWidth:580,margin:"0 auto",padding:"52px 24px",textAlign:"center"}}>
      {/* badge */}
      <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,0,0,0.3)",border:`1px solid ${TEAL}`,borderRadius:20,padding:"6px 18px",marginBottom:28,boxShadow:`0 0 16px ${TEAL}66`}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:TEAL,boxShadow:`0 0 10px ${TEAL}`}}/>
        <span style={{...M,fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#fff",fontWeight:700}}>Tech Tuesdays · Week 1 · MicroBiz</span>
      </div>
      {/* logo hex */}
      <svg width="88" height="88" viewBox="0 0 88 88" style={{display:"block",margin:"0 auto 20px",filter:`drop-shadow(0 0 12px ${TEAL})`}}>
        <polygon points="44,4 80,24 80,64 44,84 8,64 8,24" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)"/>
        <polygon points="44,18 70,32 70,56 44,70 18,56 18,32" stroke={RED} strokeWidth="1.5" fill={`${RED}18`}/>
        <polygon points="44,32 60,41 60,55 44,62 28,55 28,41" stroke={BROWN} strokeWidth="1.5" fill={`${BROWN}28`}/>
      </svg>
      <h1 style={{...TF,fontSize:"clamp(26px,5vw,42px)",fontWeight:800,margin:"0 0 8px",color:"#fff",textShadow:`0 0 24px ${TEAL}88`}}>Digital Identity</h1>
      <div style={{...M,fontSize:13,color:"rgba(255,255,255,0.9)",letterSpacing:3,textTransform:"uppercase",marginBottom:10,fontWeight:700}}>Self-Assessment</div>
      {/* tri-color divider */}
      <div style={{display:"flex",width:80,height:3,margin:"0 auto 28px",borderRadius:2,overflow:"hidden"}}>
        <div style={{flex:1,background:TEAL,boxShadow:`0 0 8px ${TEAL}`}}/>
        <div style={{flex:1,background:RED,boxShadow:`0 0 8px ${RED}`}}/>
        <div style={{flex:1,background:BROWN,boxShadow:`0 0 8px ${BROWN}`}}/>
      </div>
      <p style={{...M,color:"rgba(255,255,255,0.88)",fontSize:14,lineHeight:1.8,maxWidth:440,margin:"0 auto 36px",fontWeight:500}}>Evaluate your digital identity across four critical dimensions. Receive a scored report and prioritized action steps to guide your journey.</p>
      {/* module cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:32}}>
        {sections.map((s,i)=>(
          <div key={s.id} style={{...card({borderLeft:`3px solid ${s.accent}`,boxShadow:`0 0 18px ${s.accent}44, inset 0 1px 0 rgba(255,255,255,0.1)`}),padding:"14px 16px",textAlign:"left"}}>
            <div style={{...M,fontSize:10,color:s.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:4,fontWeight:700,textShadow:`0 0 8px ${s.accent}`}}>Module {String(i+1).padStart(2,"0")}</div>
            <div style={{...M,fontSize:13,color:"#fff",fontWeight:700}}>{s.title}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:20,fontSize:12,color:"rgba(255,255,255,0.7)",marginBottom:32,...M,fontWeight:500,flexWrap:"wrap"}}>
        <span>◈ 16 questions</span><span>◈ ~5 minutes</span><span>◈ Scored report</span>
      </div>
      <button onClick={()=>setStep("quiz")} style={{...M,background:"rgba(0,0,0,0.35)",border:`2px solid ${TEAL}`,color:"#fff",borderRadius:8,padding:"14px 44px",fontSize:13,fontWeight:800,cursor:"pointer",letterSpacing:2,textTransform:"uppercase",boxShadow:`0 0 24px ${TEAL}88`}}>
        Initialize Assessment →
      </button>
    </div></div>
  );

  if(step==="quiz"){
    const sec=sections[si];
    const pct=Math.round((answered/totalQ)*100);
    return(
      <div style={BG}><style>{G}</style>
      <div style={{maxWidth:700,margin:"0 auto",padding:"28px 20px"}}>
        {/* progress */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{...M,fontSize:12,color:"rgba(255,255,255,0.8)",fontWeight:600}}>Module {si+1} of {sections.length}</span>
          <span style={{...M,fontSize:12,color:"rgba(255,255,255,0.65)",fontWeight:500}}>{answered}/{totalQ} · {pct}%</span>
        </div>
        <div style={{background:"rgba(0,0,0,0.3)",borderRadius:3,height:5,marginBottom:26}}>
          <div style={{background:TEAL,height:5,width:`${pct}%`,borderRadius:3,boxShadow:`0 0 12px ${TEAL}`,transition:"width 0.4s"}}/>
        </div>
        {/* section header */}
        <div style={{...card({borderLeft:`4px solid ${sec.accent}`,boxShadow:`0 0 20px ${sec.accent}44`}),padding:"16px 20px",marginBottom:22}}>
          <div style={{...M,fontSize:10,color:sec.accent,letterSpacing:3,textTransform:"uppercase",marginBottom:4,fontWeight:700,textShadow:`0 0 8px ${sec.accent}`}}>Module {String(si+1).padStart(2,"0")}</div>
          <div style={{...TF,fontSize:20,fontWeight:700,color:"#fff"}}>{sec.title}</div>
        </div>
        {/* questions */}
        {sec.questions.map((item,qi)=>{
          const key=`${si}-${qi}`;const sel=answers[key];
          return(
            <div key={key} style={{...card({border:`1px solid ${sel!==undefined?sec.accent+"55":"rgba(255,255,255,0.14)"}`,boxShadow:sel!==undefined?`0 0 16px ${sec.accent}33`:"0 4px 20px rgba(0,0,0,0.25)"}),padding:20,marginBottom:14,transition:"all 0.2s"}}>
              <p style={{...M,color:"#fff",fontSize:14,margin:"0 0 14px",lineHeight:1.65,fontWeight:600}}>
                <span style={{color:sec.accent,fontWeight:700,marginRight:8,textShadow:`0 0 8px ${sec.accent}`}}>[{String(qi+1).padStart(2,"0")}]</span>{item.q}
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {item.options.map((opt,oi)=>{
                  const on=sel===oi;
                  return(
                    <button key={oi} onClick={()=>setAns(key,oi)} style={{...M,background:on?`${sec.accent}22`:"rgba(0,0,0,0.2)",border:`1.5px solid ${on?sec.accent:"rgba(255,255,255,0.15)"}`,borderRadius:7,padding:"10px 12px",color:on?"#fff":"rgba(255,255,255,0.72)",fontSize:12,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8,fontWeight:on?700:500,boxShadow:on?`0 0 14px ${sec.accent}55`:"none",transition:"all 0.15s"}}>
                      <span style={{color:on?sec.accent:"rgba(255,255,255,0.3)",flexShrink:0,textShadow:on?`0 0 8px ${sec.accent}`:"none"}}>{on?"▶":"○"}</span>{opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:22}}>
          {si>0?<button onClick={()=>setSi(s=>s-1)} style={{...M,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.3)",color:"rgba(255,255,255,0.8)",borderRadius:7,padding:"11px 24px",fontSize:12,cursor:"pointer",letterSpacing:1,fontWeight:600}}>← BACK</button>:<div/>}
          {si<sections.length-1
            ?<button onClick={()=>setSi(s=>s+1)} disabled={!secOk(si)} style={{...M,background:secOk(si)?`${sec.accent}22`:"rgba(0,0,0,0.15)",border:`2px solid ${secOk(si)?sec.accent:"rgba(255,255,255,0.15)"}`,color:secOk(si)?"#fff":"rgba(255,255,255,0.3)",borderRadius:7,padding:"11px 28px",fontSize:12,fontWeight:800,cursor:secOk(si)?"pointer":"not-allowed",letterSpacing:2,boxShadow:secOk(si)?`0 0 18px ${sec.accent}66`:"none"}}>NEXT MODULE →</button>
            :<button onClick={()=>setStep("results")} disabled={!secOk(si)} style={{...M,background:secOk(si)?`${TEAL}22`:"rgba(0,0,0,0.15)",border:`2px solid ${secOk(si)?TEAL:"rgba(255,255,255,0.15)"}`,color:secOk(si)?"#fff":"rgba(255,255,255,0.3)",borderRadius:7,padding:"11px 28px",fontSize:12,fontWeight:800,cursor:secOk(si)?"pointer":"not-allowed",letterSpacing:2,boxShadow:secOk(si)?`0 0 18px ${TEAL}66`:"none"}}>RUN ANALYSIS →</button>}
        </div>
      </div></div>
    );
  }

  const score=calcScore();const level=getLevel(score);const wk=weak();
  return(
    <div style={BG}><style>{G}</style>
    <div style={{maxWidth:700,margin:"0 auto",padding:"40px 20px"}}>
      {/* score card */}
      <div style={{...card({boxShadow:`0 0 32px ${level.color}55, 0 4px 32px rgba(0,0,0,0.4)`}),padding:28,marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,display:"flex"}}>
          <div style={{flex:1,background:TEAL,boxShadow:`0 0 8px ${TEAL}`}}/>
          <div style={{flex:1,background:RED,boxShadow:`0 0 8px ${RED}`}}/>
          <div style={{flex:1,background:BROWN,boxShadow:`0 0 8px ${BROWN}`}}/>
        </div>
        <div style={{...M,fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:3,textTransform:"uppercase",marginBottom:12,fontWeight:700,paddingTop:4}}>◈ Identity Assessment Report · MicroBiz</div>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{...TF,fontSize:26,fontWeight:800,color:"#fff",marginBottom:8,textShadow:`0 0 20px ${level.color}`}}>{level.label}</div>
            <div style={{...M,display:"inline-block",background:`${level.color}22`,border:`1.5px solid ${level.color}`,borderRadius:4,padding:"4px 12px",fontSize:11,color:"#fff",letterSpacing:3,fontWeight:800,boxShadow:`0 0 12px ${level.color}66`}}>{level.tag}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{...M,fontSize:62,fontWeight:900,color:"#fff",lineHeight:1,textShadow:`0 0 32px ${TEAL}, 0 0 64px ${level.color}`}}>{score}</div>
            <div style={{...M,fontSize:12,color:"rgba(255,255,255,0.6)",letterSpacing:1,fontWeight:600}}>/ 100 SCORE</div>
          </div>
        </div>
        <p style={{...M,color:"rgba(255,255,255,0.9)",fontSize:14,lineHeight:1.7,marginTop:16,marginBottom:0,fontWeight:500}}>{level.desc}</p>
      </div>
      {/* breakdown */}
      <div style={{...card(),padding:24,marginBottom:18}}>
        <div style={{...M,fontSize:11,color:"rgba(255,255,255,0.65)",letterSpacing:3,textTransform:"uppercase",marginBottom:18,fontWeight:700}}>◈ Dimensional Breakdown</div>
        {sections.map((s,i)=>{const ss=secScore(i);return(
          <div key={s.id} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{...M,fontSize:13,color:"#fff",fontWeight:700}}><span style={{color:s.accent,marginRight:8,textShadow:`0 0 8px ${s.accent}`}}>▸</span>{s.title}</span>
              <span style={{...M,fontSize:13,fontWeight:800,color:s.accent,textShadow:`0 0 8px ${s.accent}`}}>{ss}%</span>
            </div>
            <PBar v={ss} color={s.accent}/>
          </div>
        );})}
      </div>
      {/* action steps */}
      <div style={{...card(),padding:24,marginBottom:22}}>
        <div style={{...M,fontSize:11,color:"rgba(255,255,255,0.65)",letterSpacing:3,textTransform:"uppercase",marginBottom:18,fontWeight:700}}>◈ Priority Action Steps</div>
        {(wk.length>0?wk:sections.map(s=>s.id)).slice(0,2).map(id=>{
          const sec=sections.find(s=>s.id===id);
          return(
            <div key={id} style={{marginBottom:20}}>
              <div style={{...M,fontSize:12,color:sec.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:10,fontWeight:800,borderBottom:`1px solid ${sec.accent}44`,paddingBottom:6,textShadow:`0 0 8px ${sec.accent}`}}>▸ {sec.title}</div>
              {actionSteps[id].map((a,i)=>(
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:9}}>
                  <span style={{...M,color:sec.accent,fontSize:12,marginTop:2,flexShrink:0,fontWeight:700,textShadow:`0 0 6px ${sec.accent}`}}>[{String(i+1).padStart(2,"0")}]</span>
                  <span style={{...M,fontSize:13,color:"rgba(255,255,255,0.92)",lineHeight:1.65,fontWeight:500}}>{a}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>{setAnswers({});setSi(0);setStep("intro");}} style={{...M,background:`${BROWN}22`,border:`1.5px solid ${BROWN}`,color:"rgba(255,255,255,0.88)",borderRadius:7,padding:"12px 24px",fontSize:12,cursor:"pointer",letterSpacing:2,fontWeight:700,boxShadow:`0 0 12px ${BROWN}66`}}>↺ RETAKE</button>
        <button style={{...M,background:`${RED}22`,border:`2px solid ${RED}`,color:"#fff",borderRadius:7,padding:"12px 32px",fontSize:12,fontWeight:800,cursor:"pointer",letterSpacing:2,boxShadow:`0 0 20px ${RED}88`}}>JOIN TECH TUESDAYS →</button>
      </div>
      <div style={{textAlign:"center",marginTop:16,...M,fontSize:11,color:"rgba(255,255,255,0.4)",letterSpacing:2,fontWeight:500}}>MICROBIZ · DIGITAL IDENTITY SERIES</div>
    </div></div>
  );
}
