// ===== extra13.js : 김건우 • 제트 (바람 · 칼날) =====

const NEW23=['jt_dash','jt_up','jt_smoke','jt_ult','jt_throw','jt_hit','jt_fan','jt_slash'];
NEW23.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='jt_throw'||n=='jt_hit'?6:3)});
Object.assign(SLB,{jt_dash:'제트 · 순풍 대시',jt_up:'제트 · 상승 기류',jt_smoke:'제트 · 구름 폭발',jt_ult:'제트 · 칼날 폭풍 소환',jt_throw:'제트 · 단검 투척',jt_hit:'제트 · 단검 적중',jt_fan:'제트 · 부채꼴 투척',jt_slash:'제트 · 바람 베기'});
const JTSK=[
  {n:'순풍',w:.15,cd:5,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>jtDash(o,t)},
  {n:'상승 기류 · 구름 폭발',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>jtCloud(o,t)},
  {n:'칼날 폭풍',w:.5,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>jtUlt(o,t)}];
const JTI=DEF.findIndex(d=>d.name=='김건우');
DEF.push({name:'김건우 • 제트',gl:'제',k:'jett',vof:JTI,r:23,sp:255,col:'#7fe3ff',hi:'#effcff',dk:'#06303e',alt:{col:'#b8a8ff',hi:'#f0ecff',dk:'#1e1450'},alt2:{col:'#ffffff',hi:'#ffffff',dk:'#2a3440'},sk:JTSK});
INFO['김건우 • 제트']={st:[8,5,10,9,6,9],p:'표류 · 스킬을 쓰면 잠깐 바람을 타고 떠올라 0.35초 동안 맞지 않음',
  sk:[['7','바람을 타고 순식간에 상대를 꿰뚫고 지나감 · 지나가며 바람 칼로 벰'],['5 + 연막','위로 솟구친 뒤 구름 폭탄 두 개를 던짐 · 구름 안의 상대는 느려지고 스킬을 못 씀'],['7×5 + α','단검 다섯 자루를 띄워 하나씩 던짐 · 체력 35 이하면 두 배 · 남은 단검은 마지막에 부채꼴로 한꺼번에']]};

// ---------- 패시브 : 표류 ----------
function jtDrift(o){o.jtInv=.35;for(let i=0;i<10;i++){const a=rnd(0,TAU);Pt.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,vx:Math.cos(a)*60,vy:Math.sin(a)*60-40,l:.45,m:.45,sh:3,col:'#e8fbff',r:rnd(5,9),gr:14,a0:.5,fr:.3})}}
const _hurtJT=hurt;hurt=function(t){if(t&&t.jtInv>0)return;return _hurtJT.apply(this,arguments)};
const _updJT=update;update=function(dt){_updJT(dt);if(F)F.forEach(f=>{if(f.jtInv>0)f.jtInv-=dt})};
const _lowJT=lowHP;lowHP=function(f){_lowJT(f);if(f.d.k=='jett'&&!f.dead&&!f.hid&&phase!='menu'){g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(200,245,255,'+(f.jtInv>0?.8:.25)+')';g.lineWidth=1.6;g.lineCap='round';
  for(let k=0;k<3;k++){const a=clock*(4+k)+k*2.1,r=f.r+4+k*3;g.beginPath();g.arc(0,0,r,a,a+1.1);g.stroke()}g.restore()}};

// ---------- 그림 : 쿠나이 ----------
function jtKunai(s,glw){g.save();g.scale(s,s);if(glw){g.save();g.globalCompositeOperation='lighter';g.save();g.scale(2.6,.6);glow('#7fe3ff',-4,0,14,.8*glw);g.restore();g.restore()}
  const bg=g.createLinearGradient(0,-4,0,4);bg.addColorStop(0,'#ffffff');bg.addColorStop(.5,'#b8d8e8');bg.addColorStop(1,'#5a7a8a');g.fillStyle=bg;g.strokeStyle='#0e2a36';g.lineWidth=1;
  g.beginPath();g.moveTo(16,0);g.lineTo(2,-4.5);g.lineTo(-1,0);g.lineTo(2,4.5);g.closePath();g.fill();g.stroke();
  g.fillStyle='#14222a';g.fillRect(-12,-1.6,12,3.2);g.strokeStyle='#7fe3ff';g.lineWidth=.8;for(let x=-11;x<0;x+=3){g.beginPath();g.moveTo(x,-1.6);g.lineTo(x+1.5,1.6);g.stroke()}
  g.strokeStyle='#cfefff';g.lineWidth=1.4;g.beginPath();g.arc(-14.5,0,2.6,0,TAU);g.stroke();g.restore()}
function jtWind(x1,y1,x2,y2,a){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';const n=Math.hypot(x2-x1,y2-y1)||1,nx=-(y2-y1)/n,ny=(x2-x1)/n;
  for(let k=-2;k<=2;k++){g.strokeStyle='rgba(200,245,255,'+(a*(.5-Math.abs(k)*.1))+')';g.lineWidth=k?1.5:3;g.beginPath();g.moveTo(x1+nx*k*7,y1+ny*k*7);g.quadraticCurveTo((x1+x2)/2+nx*k*12,(y1+y2)/2+ny*k*12,x2+nx*k*4,y2+ny*k*4);g.stroke()}g.restore()}

// ---------- 아이콘 (네온 쿠나이 셋 + 바람) ----------
EMB.jett=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  [-.5,0,.5].forEach(r=>{g.save();g.rotate(-Math.PI/2+r);neon(D,1.5,()=>{g.beginPath();g.moveTo(20,0);g.lineTo(9,-3.5);g.lineTo(7,0);g.lineTo(9,3.5);g.closePath();g.moveTo(7,0);g.lineTo(-4,0);g.moveTo(-6.5,0);g.arc(-6.5,0,2,0,TAU)});g.restore()});
  neon({col:'#ffffff',hi:'#e8fbff'},1.2,()=>{g.beginPath();g.moveTo(-14,12);g.quadraticCurveTo(0,6,14,12);g.moveTo(-10,17);g.quadraticCurveTo(2,12,12,17)})};

// ---------- 1) 순풍 ----------
function jtDash(o,t){const a=ang(o,t),d=dist(o,t)+o.r+t.r+50;HZ.push({k:'jtdash',o,tg:t,t:0,sx:o.x,sy:o.y,ex:clamp(o.x+Math.cos(a)*d,o.r,A-o.r),ey:clamp(o.y+Math.sin(a)*d,o.r,A-o.r),a,hit:0});SFXa('jt_dash');jtDrift(o)}
HZX.jtdash=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const D=.16,u=Math.min(1,h.t/D),ue=1-Math.pow(1-u,3);
  if(u<1){o.x=h.sx+(h.ex-h.sx)*ue;o.y=h.sy+(h.ey-h.sy)*ue;o.gcd=Math.max(o.gcd,.3);EN.forEach(e=>{if(h.hit||e.hid||e.jump)return;if(segD(e.x,e.y,h.sx,h.sy,o.x,o.y)<e.r+o.r){h.hit=1;h.hx=e.x;h.hy=e.y;hurt(e,7,o,e.x,e.y,0,0);SFXa('jt_slash');e.slow=Math.max(e.slow,.6);FX.push({k:'burst',x:e.x,y:e.y,c:'#effcff',a:rnd(0,1),l:.25,m:.25})}})}
  else if(!h.end){h.end=1;h.et=h.t;o.dx=Math.cos(h.a+Math.PI*.8);o.dy=Math.sin(h.a+Math.PI*.8);for(let i=0;i<12;i++){const a=h.a+Math.PI+rnd(-.6,.6);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*rnd(80,200),vy:Math.sin(a)*rnd(80,200),l:.4,m:.4,sh:3,col:'#e8fbff',r:rnd(5,9),gr:14,a0:.5,fr:.3})}}
  return !h.end||h.t<h.et+.45};
HZP.jtdash=h=>{const o=h.o,fa=h.end?clamp(1-(h.t-h.et)/.45,0,1):1;jtWind(h.sx,h.sy,h.end?h.ex:o.x,h.end?h.ey:o.y,fa);
  for(let k=1;k<5;k++){const u=Math.max(0,Math.min(1,h.t/.16)-k*.18),x=h.sx+(h.ex-h.sx)*u,y=h.sy+(h.ey-h.sy)*u;g.save();g.globalAlpha=fa*(.35-k*.06);g.drawImage(ICON(o.d,52),x-o.r,y-o.r,o.r*2,o.r*2);g.restore()}
  if(h.hit&&h.hx!=null){const q=h.t;g.save();g.translate(h.hx,h.hy);g.rotate(h.a+.9);g.globalCompositeOperation='lighter';g.globalAlpha=clamp(1-(q-.1)/.3,0,1);g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(-34,0);g.lineTo(34,0);g.stroke();g.strokeStyle='#7fe3ff';g.lineWidth=7;g.globalAlpha*=.5;g.stroke();g.restore()}};

// ---------- 2) 상승 기류 · 구름 폭발 ----------
function jtCloud(o,t){HZ.push({k:'jtcl',o,tg:t,t:0,cl:[],bm:[],x:o.x,y:o.y});SFXa('jt_up');jtDrift(o);o.onc=1;o.hid=1}
HZX.jtcl=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}const UP=.55;
  if(h.t<UP){o.x=h.x;o.y=h.y;o.gcd=Math.max(o.gcd,.3);if(h.t>.15&&h.bm.length<2&&h.t>=.15+h.bm.length*.15){const e=h.tg&&!h.tg.dead?h.tg:tgt(o);if(e){const tx=clamp(e.x+e.dx*e.sp*.35+rnd(-20,20)*h.bm.length,40,A-40),ty=clamp(e.y+e.dy*e.sp*.35+(h.bm.length?40:-10),40,A-40);h.bm.push({sx:o.x,sy:o.y-70,tx,ty,t0:h.t,done:0});SFXa('jt_throw')}}}
  else if(!h.land){h.land=1;o.onc=0;o.hid=0}
  h.bm.forEach(b=>{if(!b.done&&h.t-b.t0>=.35){b.done=1;SFXa('jt_smoke');h.cl.push({x:b.tx,y:b.ty,t0:h.t,hit:0});EN.forEach(e=>{if(!e.hid&&Math.hypot(e.x-b.tx,e.y-b.ty)<90+e.r&&!e.jtc){e.jtc=1;hurt(e,5,o,e.x,e.y,0,0);setTimeout(()=>{e.jtc=0},300)}})}});
  h.cl.forEach(c=>{const k=h.t-c.t0;if(k<2.6)EN.forEach(e=>{if(e.hid)return;if(Math.hypot(e.x-c.x,e.y-c.y)<78){e.slow=Math.max(e.slow,.4);e.gcd=Math.max(e.gcd,.3);if(e.cast&&!e.cast.s.ult)e.cast=null}})});
  return h.t<UP+.1||h.cl.some(c=>h.t-c.t0<2.9)||h.bm.some(b=>!b.done)};
HZD.jtcl=h=>{h.cl.forEach(c=>{const k=h.t-c.t0,a=clamp(k/.2,0,1)*clamp((2.9-k)/.5,0,1);if(a<=0)return;g.save();g.translate(c.x,c.y);g.globalAlpha=a;for(let i=0;i<9;i++){const an=i*TAU/9+k*.3,r=40+Math.sin(k*2+i)*6;const gr=g.createRadialGradient(Math.cos(an)*r*.6,Math.sin(an)*r*.6,4,Math.cos(an)*r*.6,Math.sin(an)*r*.6,46);gr.addColorStop(0,'rgba(235,250,255,.85)');gr.addColorStop(1,'rgba(160,220,240,0)');g.fillStyle=gr;g.beginPath();g.arc(Math.cos(an)*r*.6,Math.sin(an)*r*.6,46,0,TAU);g.fill()}
  g.fillStyle='rgba(210,240,250,.55)';g.beginPath();g.arc(0,0,58,0,TAU);g.fill();g.restore()})};
HZP.jtcl=h=>{const o=h.o,UP=.55;
  if(h.t<UP&&!o.dead){const u=h.t/UP,z=Math.sin(Math.PI*u)*90;g.save();g.globalAlpha=.4;g.fillStyle='#000';g.beginPath();g.ellipse(h.x,h.y+o.r*.8,o.r*(1-z/200),o.r*.35*(1-z/200),0,0,TAU);g.fill();g.restore();
    g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){g.strokeStyle='rgba(200,245,255,.6)';g.lineWidth=2;g.beginPath();g.ellipse(h.x,h.y+o.r*.6-k*14*u,o.r+10+k*6,(o.r+10+k*6)*.3,0,0,TAU);g.stroke()}g.restore();
    g.save();g.translate(h.x,h.y-z);g.scale(1+z/300,1+z/300);g.drawImage(ICON(o.d,52),-o.r*1.1,-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()}
  h.bm.forEach(b=>{if(b.done)return;const u=clamp((h.t-b.t0)/.35,0,1),x=b.sx+(b.tx-b.sx)*u,y=b.sy+(b.ty-b.sy)*u-Math.sin(u*Math.PI)*60;g.save();g.translate(x,y);g.globalCompositeOperation='lighter';glow('#e8fbff',0,0,16,.9);g.fillStyle='#ffffff';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.restore()})};

// ---------- 3) ULT 칼날 폭풍 ----------
function jtUlt(o,t){HZ.push({k:'jtult',o,t:0,kn:[0,1,2,3,4].map(i=>({i,st:0,gust:Array.from({length:6},()=>({a:rnd(0,TAU),r:rnd(70,120),w:rnd(.6,1.2)}))})),n:0,fl:[],wv:[]});SFXa('jt_ult');jtDrift(o)}
// 주변을 둥둥 떠다니는 자리 (천천히 돌면서 위아래로 출렁)
function jtOrb(h,o,i){const a=h.t*1.6+i*TAU/5,R=o.r+44+Math.sin(h.t*3+i)*7;return[o.x+Math.cos(a)*R,o.y+Math.sin(a)*R*.85+Math.sin(h.t*4+i*1.7)*5,a]}
HZX.jtult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const T0=.95,TS=.4,FAN=T0+4*TS+.25;
  h.kn.forEach(k=>{if(!k.formed&&h.t>=.12+k.i*.11+.35){k.formed=1;SFXa('jt_slash');const p=jtOrb(h,o,k.i);ring(p[0],p[1],4,30,'#cfefff',3,.3)}});
  const left=h.kn.filter(k=>!k.st&&k.formed);
  if(h.n<4&&h.t>=T0+h.n*TS&&left.length&&EN.length){const e=EN.filter(x=>!x.hid).sort((p,q)=>dist(o,p)-dist(o,q))[0];if(e){const k=left[0];k.st=1;h.n++;const p=jtOrb(h,o,k.i);h.fl.push({x:p[0],y:p[1],tg:e,v:420,a:p[2]+Math.PI/2,hit:0,tr:[],t:0});SFXa('jt_throw')}}
  if(h.t>=FAN&&!h.fan){h.fan=1;h.fanT=h.t;SFXa('jt_fan');const e=EN.filter(x=>!x.hid).sort((p,q)=>dist(o,p)-dist(o,q))[0];const rest=h.kn.filter(k=>!k.st);const base=e?Math.atan2(e.y-o.y,e.x-o.x):0;
    h.wv.push({x:o.x,y:o.y,a:base,t:h.t});rest.forEach((k,j)=>{k.st=1;const p=jtOrb(h,o,k.i),a=base+(j-(rest.length-1)/2)*.22;h.fl.push({x:p[0],y:p[1],tg:null,v:1300,a,hit:0,tr:[],t:.2})})}
  h.fl.forEach(f=>{if(f.hit){f.ht+=dt;return}f.t+=dt;f.v=Math.min(1500,f.v+3600*dt);if(f.tg&&!f.tg.dead){let da=Math.atan2(f.tg.y-f.y,f.tg.x-f.x)-f.a;da=Math.atan2(Math.sin(da),Math.cos(da));f.a+=clamp(da,-(f.t<.12?14:9)*dt,(f.t<.12?14:9)*dt)}
    f.x+=Math.cos(f.a)*f.v*dt;f.y+=Math.sin(f.a)*f.v*dt;f.tr.push([f.x,f.y]);if(f.tr.length>12)f.tr.shift();
    if(f.x<-30||f.x>A+30||f.y<-30||f.y>A+30){f.hit=1;f.ht=9;return}const e=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-f.x,x.y-f.y)<x.r+9);
    if(e){f.hit=1;f.ht=0;f.hx=e.x;f.hy=e.y;const hd=e.hp<=35;hurt(e,hd?13:7,o,e.x,e.y,0,hd);SFXa('jt_hit');if(hd)ft(e.x,e.y-e.r-40,'치명타!','#7fe3ff',22);e.x=clamp(e.x+Math.cos(f.a)*16,e.r,A-e.r);e.y=clamp(e.y+Math.sin(f.a)*16,e.r,A-e.r);shake=Math.max(shake,hd?12:6);
      for(let i=0;i<10;i++){const a=f.a+rnd(-1.2,1.2);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*rnd(120,300),vy:Math.sin(a)*rnd(120,300),l:.35,m:.35,gl:1,sh:5,col:i%2?'#ffffff':'#7fe3ff',r:1.6,fr:.1})}}});
  return !h.fan||h.fl.some(f=>!f.hit||f.ht<.4)||h.t<FAN+.4};
HZD.jtult=h=>{const o=h.o;if(o.dead)return;const a=Math.min(1,h.t/.3)*(h.fan?clamp(1-(h.t-h.fanT)/.6,0,1):1);
  // 발밑 바람 소용돌이
  g.save();g.translate(o.x,o.y+o.r*.5);g.scale(1,.4);g.globalCompositeOperation='lighter';g.lineCap='round';for(let k=0;k<4;k++){g.strokeStyle='rgba(180,240,255,'+(.35*a)+')';g.lineWidth=2;const r=o.r+20+k*12,s=h.t*(3+k)+k;g.beginPath();g.arc(0,0,r,s,s+2.2);g.stroke()}g.restore()};
HZP.jtult=h=>{const o=h.o;if(o.dead)return;
  h.kn.forEach(k=>{if(k.st)return;const [x,y,a]=jtOrb(h,o,k.i),t0=.12+k.i*.11,fm=clamp((h.t-t0)/.35,0,1);
    // 바람이 모여서 단검이 생김
    if(fm<1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';k.gust.forEach(q=>{const r=q.r*(1-fm),aa=q.a+fm*5*q.w;const px=x+Math.cos(aa)*r,py=y+Math.sin(aa)*r;g.strokeStyle='rgba(200,245,255,'+(.8*fm)+')';g.lineWidth=2;g.beginPath();g.arc(x,y,Math.max(1,r),aa-.5,aa);g.stroke();glow('#bff4ff',px,py,6,.7*fm)});glow('#ffffff',x,y,6+fm*14,fm);g.restore()}
    if(fm>.6){const s=(fm-.6)/.4;g.save();g.translate(x,y);g.rotate(a+Math.PI/2);g.globalCompositeOperation='lighter';glow('#7fe3ff',0,0,30,.55*s);g.globalCompositeOperation='source-over';jtKunai(2.1*back(s),1);g.restore()}});
  h.wv.forEach(w=>{const q=h.t-w.t;if(q>.5)return;g.save();g.translate(w.x,w.y);g.rotate(w.a);g.globalCompositeOperation='lighter';g.globalAlpha=1-q/.5;g.strokeStyle='#dff8ff';g.lineWidth=4;g.beginPath();g.arc(0,0,30+q*300,-.6,.6);g.stroke();g.lineWidth=2;g.beginPath();g.arc(0,0,20+q*240,-.5,.5);g.stroke();g.restore()});
  h.fl.forEach(f=>{
    if(f.tr.length>1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=1;i<f.tr.length;i++){const u=i/f.tr.length;g.strokeStyle='rgba(127,227,255,'+(u*.6)*(f.hit?Math.max(0,1-f.ht/.25):1)+')';g.lineWidth=1+u*7;g.beginPath();g.moveTo(f.tr[i-1][0],f.tr[i-1][1]);g.lineTo(f.tr[i][0],f.tr[i][1]);g.stroke();
      if(i%3==0){const [px,py]=f.tr[i],aa=f.a+Math.PI/2;g.strokeStyle='rgba(255,255,255,'+(u*.5)+')';g.lineWidth=1.2;g.beginPath();g.moveTo(px+Math.cos(aa)*6*u,py+Math.sin(aa)*6*u);g.lineTo(px-Math.cos(aa)*6*u,py-Math.sin(aa)*6*u);g.stroke()}}g.restore()}
    if(!f.hit){g.save();g.translate(f.x,f.y);g.rotate(f.a);g.globalCompositeOperation='lighter';g.save();g.scale(3,.5);glow('#7fe3ff',-6,0,14,.8);g.restore();g.globalCompositeOperation='source-over';jtKunai(2.2,1);g.restore()}
    else if(f.ht<.35&&f.hx!=null){const q=f.ht/.35;g.save();g.translate(f.hx,f.hy);g.globalCompositeOperation='lighter';g.globalAlpha=1-q;g.strokeStyle='#ffffff';g.lineWidth=3;[0,1.2,-1.2].forEach(d=>{g.save();g.rotate(f.a+d*.5+Math.PI/2);g.beginPath();g.moveTo(-26-q*20,0);g.lineTo(26+q*20,0);g.stroke();g.restore()});g.strokeStyle='#7fe3ff';g.lineWidth=2;g.beginPath();g.arc(0,0,10+q*34,0,TAU);g.stroke();g.restore()}})};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ---------- 세기 보정 (어쩌라고 · 제트) ----------
const DMGK={ezr:1.22,jett:1.2,terr:1.12};const _hurtK=hurt;hurt=function(t,n,o){if(o&&o.d&&DMGK[o.d.k]&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*DMGK[o.d.k]*10)/10;return _hurtK.apply(this,a)}return _hurtK.apply(this,arguments)};
