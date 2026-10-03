// ===== extra3.js : 김가은 • 피카소 =====

// ---------- 등록 ----------
const NEW13=['pc_pencil','pc_trap','pc_color','pc_shape','pc_cube','pc_canvas','pc_brush','pc_sign','pc_splash'];
NEW13.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='pc_shape'||n=='pc_brush'?4:3)});
Object.assign(SLB,{pc_pencil:'피카소 · 연필 스케치',pc_trap:'피카소 · 스케치 감옥 닫힘',pc_color:'피카소 · 채색 폭발',pc_shape:'피카소 · 도형 던지기',pc_cube:'피카소 · 큐비즘',pc_canvas:'피카소 · 캔버스 펼치기',pc_brush:'피카소 · 붓질',pc_sign:'피카소 · 서명',pc_splash:'피카소 · 물감 폭발'});
const PCSK=[
  {n:'스케치 감옥',w:.4,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<520,f:(o,t)=>pcCage(o,t)},
  {n:'큐비즘',w:.35,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>pcCube(o,t)},
  {n:'걸작 · 캔버스',w:.7,ult:1,f:(o,t)=>pcUlt(o,t)}];
DEF.push({name:'김가은 • 피카소',gl:'피',k:'pica',vof:4,r:26,sp:212,col:'#ff5a5f',hi:'#ffe3e0',dk:'#4a0d12',alt:{col:'#3a7bff',hi:'#dfe8ff',dk:'#0a1f4a'},alt2:{col:'#ffc83a',hi:'#fff3cf',dk:'#4a3300'},sk:PCSK});
INFO['김가은 • 피카소']={st:[7,5,7,9,9,9],p:'영감 · 스킬을 3번 맞힐 때마다 궁 게이지 +12',
  sk:[['1×4+10 + 가둠','연필로 상대 주위에 동그라미를 스케치 · 2초 동안 그 안에 갇히고, 빗금이 다 차면 물감이 터짐'],['3×3 + 큐비즘','빨간 세모 · 파란 네모 · 노란 동그라미를 던짐 · 두 개 이상 맞으면 몸이 조각조각 큐비즘이 되어 2.4초 동안 제멋대로 움직이고 스킬을 못 씀'],['6×4 + 6','경기장이 캔버스가 되고 거대한 붓이 상대를 따라 네 번 붓질 · 마지막에 서명하면 물감 위에 있던 적은 한 번 더 터짐']]};
const PCC={r:['#d62839','#ef6b78','#8f1020'],b:['#1d4ed8','#5d86f0','#0f2a80'],y:['#f2a900','#ffd060','#a86f00'],k:['#16161a','#4a4a55','#000000']};

// 영감 : 3번 맞힐 때마다 궁 게이지
function pcHit(o,e,n,x,y,slow,heavy){hurt(e,n,o,x,y,slow,heavy);o.insp=(o.insp||0)+1;if(o.insp%3==0&&!o.dead){o.ug=Math.min(100,(o.ug||0)+12);ring(o.x,o.y,o.r,o.r+40,'#ffd060',4,.35);
  for(let i=0;i<8;i++){const a=rnd(0,TAU);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*120,vy:Math.sin(a)*120,l:.5,m:.5,sh:6,col:['#d62839','#1d4ed8','#f2a900'][i%3],r:rnd(2,3.5),fr:.1})}}}

// ---------- 공통 그림 ----------
function pcPencil(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(-36,8,40,5,0,0,TAU);g.fill();
  g.fillStyle='#2a2a30';g.beginPath();g.moveTo(0,0);g.lineTo(-6,-2);g.lineTo(-6,2);g.closePath();g.fill();
  g.fillStyle='#ecc9a0';g.beginPath();g.moveTo(-5,-1.8);g.lineTo(-16,-6);g.lineTo(-16,6);g.lineTo(-5,1.8);g.closePath();g.fill();g.strokeStyle='#5a3a1a';g.lineWidth=1;g.stroke();
  const bg=g.createLinearGradient(0,-6,0,6);bg.addColorStop(0,'#ffe680');bg.addColorStop(.33,'#ffcc22');bg.addColorStop(.34,'#f2b400');bg.addColorStop(.66,'#f2b400');bg.addColorStop(.67,'#d99a00');bg.addColorStop(1,'#b37c00');
  g.fillStyle=bg;g.fillRect(-62,-6,46,12);g.strokeStyle='#5a3a00';g.lineWidth=1.2;g.strokeRect(-62,-6,46,12);
  const fg=g.createLinearGradient(0,-6,0,6);fg.addColorStop(0,'#f4f4f8');fg.addColorStop(.5,'#9aa0ad');fg.addColorStop(1,'#d8dbe2');g.fillStyle=fg;g.fillRect(-70,-6.3,8,12.6);g.strokeRect(-70,-6.3,8,12.6);
  g.fillStyle='#ff8fa3';g.beginPath();g.moveTo(-70,-6);g.lineTo(-78,-6);g.quadraticCurveTo(-82,0,-78,6);g.lineTo(-70,6);g.closePath();g.fill();g.stroke();g.restore()}
function pcBrush(x,y,a,col,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(-60,14,62,7,0,0,TAU);g.fill();
  g.fillStyle=col;g.beginPath();g.moveTo(2,0);g.quadraticCurveTo(-6,-10,-24,-9);g.lineTo(-24,9);g.quadraticCurveTo(-6,10,2,0);g.fill();
  g.fillStyle='#e9d3a8';g.beginPath();g.moveTo(-14,-9.4);g.lineTo(-26,-9);g.lineTo(-26,9);g.lineTo(-14,9.4);g.quadraticCurveTo(-18,0,-14,-9.4);g.fill();
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=.8;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-26,k*2.4);g.quadraticCurveTo(-12,k*2.6,0,k*.4);g.stroke()}
  const fg=g.createLinearGradient(0,-9,0,9);fg.addColorStop(0,'#ffffff');fg.addColorStop(.45,'#a7adb8');fg.addColorStop(1,'#e2e5ea');g.fillStyle=fg;g.beginPath();g.moveTo(-26,-9);g.lineTo(-42,-6);g.lineTo(-42,6);g.lineTo(-26,9);g.closePath();g.fill();g.strokeStyle='#4a4e57';g.lineWidth=1.2;g.stroke();
  const hg=g.createLinearGradient(0,-6,0,6);hg.addColorStop(0,'#d06a3a');hg.addColorStop(.5,'#8a2f12');hg.addColorStop(1,'#4a1406');g.fillStyle=hg;g.beginPath();g.moveTo(-42,-5.5);g.lineTo(-118,-3.2);g.quadraticCurveTo(-124,0,-118,3.2);g.lineTo(-42,5.5);g.closePath();g.fill();g.strokeStyle='#2a0a02';g.stroke();
  g.strokeStyle='rgba(255,220,190,.5)';g.lineWidth=1.4;g.beginPath();g.moveTo(-46,-3);g.lineTo(-114,-1.6);g.stroke();g.restore()}
function pcShape(kind,s,rot){g.save();g.rotate(rot);g.scale(s,s);g.lineJoin='round';g.lineWidth=3;g.strokeStyle='#111';
  g.beginPath();if(kind==0){g.moveTo(0,-15);g.lineTo(14,11);g.lineTo(-14,11);g.closePath()}else if(kind==1){g.rect(-12,-12,24,24)}else g.arc(0,0,13,0,TAU);
  g.fillStyle=kind==0?'#d62839':kind==1?'#1d4ed8':'#f2a900';g.fill();g.stroke();
  g.save();g.clip();g.fillStyle='rgba(255,255,255,.28)';g.beginPath();g.moveTo(-20,-20);g.lineTo(6,-20);g.lineTo(-20,6);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1.2;for(let k=-20;k<20;k+=5){g.beginPath();g.moveTo(k,20);g.lineTo(k+14,6);g.stroke()}g.restore();g.restore()}
// 흔들리는 스케치 선 (점들)
function pcWob(cx,cy,R,seed,pass,u){const P=[],n=48,lim=Math.floor(n*u);for(let i=0;i<=lim;i++){const th=i/n*TAU*1.04+seed+pass*.4,r=R*(1+.035*Math.sin(th*3+seed*5+pass)+.02*Math.sin(th*7+pass*2))+pass*2.5-2.5;P.push([cx+Math.cos(th)*r,cy+Math.sin(th)*r])}return P}
function pcLine(P,col,w,al){if(P.length<2)return;g.save();g.globalAlpha=al;g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore()}

// ---------- 아이콘 (네온 큐비즘 얼굴) ----------
EMB.pica=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);
  neon(D,1.7,()=>{g.beginPath();g.moveTo(-2,-19);g.bezierCurveTo(-16,-18,-19,-4,-14,6);g.lineTo(-17,11);g.lineTo(-11,12);g.bezierCurveTo(-11,18,-4,20,2,18);
    g.moveTo(-2,-19);g.lineTo(-2,18);
    g.moveTo(-12,-6);g.quadraticCurveTo(-8,-10,-4,-6);g.quadraticCurveTo(-8,-3,-12,-6);
    g.moveTo(3,-12);g.lineTo(16,-12);g.lineTo(16,-1);g.lineTo(3,-1);
    g.moveTo(-2,2);g.lineTo(6,9);g.lineTo(-2,9);g.moveTo(3,14);g.lineTo(11,14)});
  neon({col:'#3a7bff',hi:'#dfe8ff'},1.5,()=>{g.beginPath();g.arc(9.5,-6.5,2.6,0,TAU)});
  neon({col:'#ffc83a',hi:'#fff3cf'},1.4,()=>{g.beginPath();g.arc(-8,-6,1.4,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};

// ---------- 1) 스케치 감옥 ----------
function pcCage(o,t){HZ.push({k:'pccage',o,tg:t,t:0,cx:t.x,cy:t.y,R:84,seed:rnd(0,TAU),in:[],px:o.x,py:o.y,cl:0,hatch:[]});SFXa('pc_pencil')}
HZX.pccage=(h,dt,EN)=>{const o=h.o,e=h.tg,D0=.18,D1=.62,TR=2.2;
  if(!h.cl&&e&&!e.dead){h.cx+=(e.x-h.cx)*Math.min(1,dt*10);h.cy+=(e.y-h.cy)*Math.min(1,dt*10);h.cx=clamp(h.cx,h.R*.6,A-h.R*.6);h.cy=clamp(h.cy,h.R*.6,A-h.R*.6)}
  if(!h.cl&&h.t>=D1){h.cl=1;h.ct=h.t;SFXa('pc_trap');h.in=EN.filter(x=>!x.hid&&!x.jump&&Math.hypot(x.x-h.cx,x.y-h.cy)<h.R+x.r*.6);ring(h.cx,h.cy,h.R,h.R+20,'#f4f1ea',3,.3);
    h.in.forEach(x=>{const d=Math.hypot(x.x-h.cx,x.y-h.cy),m=h.R-x.r-2;if(d>m){const a=Math.atan2(x.y-h.cy,x.x-h.cx);x.x=h.cx+Math.cos(a)*m;x.y=h.cy+Math.sin(a)*m}})}
  if(h.cl&&!h.boom){h.in=h.in.filter(x=>!x.dead);h.in.forEach(x=>{const m=Math.max(4,h.R-x.r-2),d=Math.hypot(x.x-h.cx,x.y-h.cy);if(d>m){const a=Math.atan2(x.y-h.cy,x.x-h.cx);x.x=h.cx+Math.cos(a)*m;x.y=h.cy+Math.sin(a)*m;
      const nx=Math.cos(a),ny=Math.sin(a),dot=x.dx*nx+x.dy*ny;if(dot>0){x.dx-=2*dot*nx;x.dy-=2*dot*ny}x.sq=1;x.sa=a;if(Math.random()<.3)spark(x.x+nx*x.r,x.y+ny*x.r,'dust',3,80)}x.dash=0;x.slide=0});
    h.tk=(h.tk||0)+dt;if(h.tk>=.5){h.tk-=.5;h.in.forEach(x=>{if(!x.dead)hurt(x,1,o,x.x,x.y,0,0)})}
    // 빗금
    const pr=clamp((h.t-h.ct)/TR,0,1),want=Math.floor(pr*26);while(h.hatch.length<want){const k=h.hatch.length,cross=k>=13,off=((k%13)/13-.5)*2*h.R*.95+rnd(-4,4);h.hatch.push({off,cross,t:h.t,w:rnd(.9,1.6)});if(k%3==0)SFXa('pc_pencil')}
    if(h.t>=h.ct+TR){h.boom=1;h.bt=h.t;SFXa('pc_color');shake=Math.max(shake,12);
      EN.forEach(x=>{if(!x.hid&&!x.jump&&Math.hypot(x.x-h.cx,x.y-h.cy)<h.R+x.r)pcHit(o,x,10,x.x,x.y,0,1)});
      for(let i=0;i<40;i++){const a=rnd(0,TAU),v=rnd(80,330),l=rnd(.5,.9);Pt.push({x:h.cx+Math.cos(a)*rnd(0,h.R*.6),y:h.cy+Math.sin(a)*rnd(0,h.R*.6),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:['#d62839','#1d4ed8','#f2a900','#ffffff'][i%4],r:rnd(3,7),fr:.05})}
      h.blobs=Array.from({length:9},(_,i)=>({x:rnd(-.6,.6)*h.R,y:rnd(-.6,.6)*h.R,r:rnd(.3,.55)*h.R,c:['#d62839','#1d4ed8','#f2a900'][i%3]}))}}
  if(o.dead&&!h.cl)return false;
  return !h.boom||h.t<h.bt+.7};
HZD.pccage=h=>{const D0=.18,D1=.62,fa=h.boom?clamp(1-(h.t-h.bt)/.7,0,1):1;
  if(h.boom){g.save();g.translate(h.cx,h.cy);const s=back(clamp((h.t-h.bt)/.15,0,1));g.beginPath();g.arc(0,0,h.R,0,TAU);g.clip();g.globalAlpha=fa*.85;h.blobs.forEach(b=>{g.fillStyle=b.c;g.beginPath();g.arc(b.x,b.y,Math.max(0,b.r*s),0,TAU);g.fill()});g.restore()}
  if(h.cl&&!h.boom){g.save();g.translate(h.cx,h.cy);g.beginPath();g.arc(0,0,h.R-2,0,TAU);g.clip();g.fillStyle='rgba(244,241,234,.06)';g.fillRect(-h.R,-h.R,h.R*2,h.R*2);
    h.hatch.forEach(q=>{const a=clamp((h.t-q.t)/.06,0,1);g.save();g.rotate(q.cross?-.8:.8);g.strokeStyle='#f4f1ea';g.globalAlpha=.42;g.lineWidth=q.w;g.beginPath();g.moveTo(q.off,-h.R);g.lineTo(q.off,-h.R+2*h.R*a);g.stroke();g.restore()});g.restore()}
  // 스케치 동그라미 (세 번 덧그림)
  const u=clamp((h.t-D0)/(D1-D0),0,1);for(let p=0;p<3;p++){const up=clamp(u*1.25-p*.12,0,1);if(up<=0)continue;const P=pcWob(h.cx,h.cy,h.R,h.seed,p,up);pcLine(P,p==1?h.o.d.col:'#f4f1ea',p==1?2.4:1.6,fa*(p==1?.9:.7))}
  if(h.cl){const pulse=.5+.5*Math.sin(clock*10);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fa*.25*pulse;g.strokeStyle=h.o.d.col;g.lineWidth=6;g.beginPath();g.arc(h.cx,h.cy,h.R,0,TAU);g.stroke();g.restore()}};
HZP.pccage=h=>{const o=h.o,D0=.18,D1=.62;let x,y,a;
  if(h.t<D0){const u=h.t/D0;x=o.x+(h.cx+Math.cos(h.seed-.4)*h.R-o.x)*u;y=o.y+(h.cy+Math.sin(h.seed-.4)*h.R-o.y)*u-Math.sin(u*Math.PI)*40;a=-.9}
  else if(h.t<D1+.08){const u=clamp((h.t-D0)/(D1-D0),0,1),th=u*TAU*1.04+h.seed;x=h.cx+Math.cos(th)*h.R;y=h.cy+Math.sin(th)*h.R;a=-1.1+Math.sin(clock*30)*.08}
  else if(h.cl&&!h.boom){const pr=clamp((h.t-h.ct)/2.2,0,1),last=h.hatch[h.hatch.length-1];if(!last)return;const k=Math.sin(clock*26);x=h.cx+(last.cross?-1:1)*last.off*.7+k*10;y=h.cy-k*h.R*.5;a=-1.1}
  else return;pcPencil(x,y,a,.8,1);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',x,y,8,.6);g.restore()};

// ---------- 2) 큐비즘 : 세모 · 네모 · 동그라미 ----------
function pcCube(o,t){const a0=ang(o,t);HZ.push({k:'pccube',o,tg:t,t:0,hits:0,sh:[0,1,2].map(i=>({kind:i,x:o.x,y:o.y,a:a0+(i-1)*1,v:520,dl:i*.09,live:1,on:0,tr:[],rot:rnd(0,TAU)}))});SFXa('pc_shape')}
HZX.pccube=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}let alive=0;
  h.sh.forEach(s=>{if(!s.live)return;alive++;if(h.t<s.dl)return;if(!s.on){s.on=1;s.x=o.x;s.y=o.y;if(s.kind)SFXa('pc_shape')}
    if(e){let da=Math.atan2(e.y-s.y,e.x-s.x)-s.a;da=Math.atan2(Math.sin(da),Math.cos(da));s.a+=clamp(da,-5.5*dt,5.5*dt)}s.v+=500*dt;
    s.x+=Math.cos(s.a)*s.v*dt;s.y+=Math.sin(s.a)*s.v*dt;s.rot+=dt*9;s.tr.push([s.x,s.y]);if(s.tr.length>10)s.tr.shift();
    if(s.x<-30||s.x>A+30||s.y<-30||s.y>A+30||h.t>2.2){s.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-s.x,x.y-s.y)<x.r+12);
    if(hit){s.live=0;pcHit(o,hit,3,s.x,s.y,0,0);const c=s.kind==0?'#d62839':s.kind==1?'#1d4ed8':'#f2a900';for(let i=0;i<12;i++){const a=rnd(0,TAU),v=rnd(60,200),l=rnd(.3,.6);Pt.push({x:s.x,y:s.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:2,col:c,r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-9,9),fr:.1})}
      hit.cubN=(hit.cubN||0)+1;hit.cubW=h;if(hit.cubN>=2&&hit.cubH!=h){hit.cubH=h;pcCubism(hit)}}});
  return alive>0||h.t<.3};
HZP.pccube=h=>{h.sh.forEach(s=>{if(!s.live||!s.on)return;g.save();g.strokeStyle='rgba(244,241,234,.55)';g.lineWidth=1.4;g.setLineDash([3,4]);if(s.tr.length>1){g.beginPath();s.tr.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()}g.setLineDash([]);
  g.translate(s.x,s.y);g.globalCompositeOperation='lighter';glow(s.kind==0?'#ff6b78':s.kind==1?'#5d86f0':'#ffd060',0,0,26,.5);g.globalCompositeOperation='source-over';pcShape(s.kind,1.35,s.rot);g.restore()})};
function pcCubism(e){e.cub=2.4;e.cubT=0;SFXa('pc_cube');const base=rnd(0,TAU),ang4=[0,1,2,3].map(i=>base+i*TAU/4+rnd(-.45,.45)).sort((a,b)=>a-b);
  e.cubS={cx:rnd(-5,5),cy:rnd(-5,5),an:ang4,off:ang4.map(()=>({d:rnd(7,14),r:rnd(-.18,.18),j:rnd(0,TAU)})),cols:['#d62839','#1d4ed8','#f2a900','#16161a'].sort(()=>Math.random()-.5)};
  ring(e.x,e.y,e.r,e.r+60,'#f4f1ea',4,.4);shake=Math.max(shake,8);hs=.05;
  for(let i=0;i<14;i++){const a=rnd(0,TAU),v=rnd(100,260);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5,m:.5,sh:2,col:['#d62839','#1d4ed8','#f2a900','#f4f1ea'][i%4],r:rnd(3,7),rot:rnd(0,TAU),vr:rnd(-10,10),fr:.1})}}
// 큐비즘 : 제멋대로 움직임
const _updPC=update;update=function(dt){_updPC(dt);if(!F||(phase!='play'&&phase!='demo'))return;
  F.forEach(f=>{if(!(f.cub>0)||f.dead)return;if(TSTOP||MAD||CIN)return;f.cub-=dt;f.cubT-=dt;f.gcd=Math.max(f.gcd,.25);if(f.cast&&!f.cast.s.ult)f.cast=null;if(f.cubT<=0&&f.stn<=0&&f.frz<=0){f.cubT=rnd(.18,.3);let a;do{a=rnd(0,TAU)}while(Math.abs(Math.cos(a))<.25||Math.abs(Math.sin(a))<.25);f.dx=Math.cos(a);f.dy=Math.sin(a)}
    if(f.cub<=0){f.cubN=0;f.cubS=null;ring(f.x,f.y,f.r,f.r+30,'#f4f1ea',3,.3)}});
  F.forEach(f=>{if(f.cubN&&!(f.cub>0)&&f.cubW&&!HZ.includes(f.cubW)){f.cubN=0;f.cubW=null}})};
// 큐비즘 : 몸이 조각조각
const _ballPC=ball;ball=function(f,t){if(!(f.cub>0)||!f.cubS||f.dead||f.hid)return _ballPC(f,t);
  const S=f.cubS,R=f.r*1.9,n=S.an.length,amp=Math.min(1,f.cub/.3)*Math.min(1,(2.4-f.cub)/.15+.2);
  for(let i=0;i<n;i++){const a0=S.an[i],a1=i<n-1?S.an[i+1]:S.an[0]+TAU,mid=(a0+a1)/2,O=S.off[i],j=Math.sin(clock*7+O.j)*2,dx=Math.cos(mid)*(O.d+j)*amp,dy=Math.sin(mid)*(O.d+j)*amp;
    g.save();g.translate(f.x+dx,f.y+dy);g.rotate(O.r*amp);g.translate(-f.x,-f.y);
    g.beginPath();g.moveTo(f.x+S.cx,f.y+S.cy);for(let k=0;k<=8;k++){const a=a0+(a1-a0)*k/8;g.lineTo(f.x+S.cx+Math.cos(a)*R,f.y+S.cy+Math.sin(a)*R)}g.closePath();g.save();g.clip();_ballPC(f,t);
    g.globalAlpha=.3;g.fillStyle=S.cols[i];g.beginPath();g.arc(f.x,f.y,f.r,0,TAU);g.fill();g.restore();
    g.strokeStyle='#111';g.globalAlpha=.9;g.lineWidth=2.6;g.beginPath();g.moveTo(f.x+S.cx,f.y+S.cy);g.lineTo(f.x+S.cx+Math.cos(a0)*f.r*1.15,f.y+S.cy+Math.sin(a0)*f.r*1.15);g.stroke();
    g.strokeStyle='#f4f1ea';g.globalAlpha=.6;g.lineWidth=1;g.stroke();g.restore()}
  // 엉뚱한 자리에 눈 하나 더
  g.save();g.translate(f.x+Math.cos(S.an[1])*f.r*.45,f.y+Math.sin(S.an[1])*f.r*.45);g.rotate(S.an[0]);g.globalAlpha=amp;g.fillStyle='#f4f1ea';g.strokeStyle='#111';g.lineWidth=1.8;g.beginPath();g.moveTo(-8,0);g.quadraticCurveTo(0,-7,8,0);g.quadraticCurveTo(0,7,-8,0);g.fill();g.stroke();g.fillStyle='#111';g.beginPath();g.arc(1,0,2.6,0,TAU);g.fill();g.restore()};

// ---------- 3) ULT 걸작 · 캔버스 ----------
function pcPaper(){if(pcPaper.c&&pcPaper.A==A)return pcPaper.c;const c=document.createElement('canvas');c.width=c.height=A;const x=c.getContext('2d');x.fillStyle='#f1e7d2';x.fillRect(0,0,A,A);
  for(let i=0;i<5000;i++){x.fillStyle=Math.random()<.5?'rgba(120,90,40,.06)':'rgba(255,255,255,.12)';x.fillRect(Math.random()*A,Math.random()*A,1.5,1.5)}
  x.strokeStyle='rgba(110,80,30,.07)';x.lineWidth=1;for(let i=0;i<500;i++){const px=Math.random()*A,py=Math.random()*A,a=Math.random()*TAU,l=4+Math.random()*12;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+Math.cos(a+.5)*l*.5,py+Math.sin(a+.5)*l*.5,px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
  x.strokeStyle='rgba(120,90,40,.035)';for(let k=0;k<A;k+=4){x.beginPath();x.moveTo(k,0);x.lineTo(k,A);x.stroke();x.beginPath();x.moveTo(0,k);x.lineTo(A,k);x.stroke()}
  const v=x.createRadialGradient(A/2,A/2,A*.3,A/2,A/2,A*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(90,60,20,.28)');x.fillStyle=v;x.fillRect(0,0,A,A);pcPaper.c=c;pcPaper.A=A;return c}
function pcUlt(o,t){HZ.push({k:'pcult',o,t:0,st:[],n:0,sig:0});SFXa('pc_canvas');shake=Math.max(shake,8)}
const PC_ST=[.45,1.0,1.55,2.1],PC_DUR=.42,PC_COL=['r','b','y','k'];
function pcCurve(S,u){const v=1-u;return[v*v*S.P0[0]+2*v*u*S.C[0]+u*u*S.P1[0],v*v*S.P0[1]+2*v*u*S.C[1]+u*u*S.P1[1]]}
HZX.pcult=(h,dt,EN)=>{const o=h.o;if(o.dead&&!h.boom)return false;
  if(h.n<PC_ST.length&&h.t>=PC_ST[h.n]&&EN.length){const e=EN[h.n%EN.length],px=clamp(e.x+e.dx*e.sp*.18,30,A-30),py=clamp(e.y+e.dy*e.sp*.18,30,A-30),a=rnd(0,TAU),L=A*.75,dx=Math.cos(a),dy=Math.sin(a),bow=rnd(-90,90);
    const P0=[px-dx*L,py-dy*L],P1=[px+dx*L,py+dy*L],C=[2*px-(P0[0]+P1[0])/2-dy*bow,2*py-(P0[1]+P1[1])/2+dx*bow];
    // 지나가는 곡선이 상대를 꼭 지나도록 보정
    const S={P0,P1,C,t0:h.t,col:PCC[PC_COL[h.n%4]],w:46,hit:new Set(),br:Array.from({length:12},(_,i)=>({o:(i/11-.5)*40+rnd(-2,2),c:Math.random()<.5?1:2,w:rnd(1.2,3.4),a:rnd(.35,.8),cut:rnd(.75,1)})),pts:[]};
    const m=pcCurve(S,.5);S.P0=[P0[0]+(px-m[0]),P0[1]+(py-m[1])];S.P1=[P1[0]+(px-m[0]),P1[1]+(py-m[1])];S.C=[C[0]+(px-m[0]),C[1]+(py-m[1])];
    h.st.push(S);h.n++;SFXa('pc_brush')}
  h.st.forEach(S=>{const u=clamp((h.t-S.t0)/PC_DUR,0,1),ue=u<.5?2*u*u:1-2*(1-u)*(1-u);S.u=ue;const nP=Math.max(2,Math.floor(ue*60));S.pts=[];for(let i=0;i<=nP;i++)S.pts.push(pcCurve(S,ue*i/nP));
    const hd=S.pts[S.pts.length-1],pv=S.pts[Math.max(0,S.pts.length-3)];S.hx=hd[0];S.hy=hd[1];S.ha=Math.atan2(hd[1]-pv[1],hd[0]-pv[0]);
    if(u<1){EN.forEach(e=>{if(S.hit.has(e)||e.hid||e.jump)return;if(Math.hypot(e.x-S.hx,e.y-S.hy)<S.w*.6+e.r){S.hit.add(e);pcHit(o,e,6,e.x,e.y,0,1);e.x=clamp(e.x+Math.cos(S.ha)*34,e.r,A-e.r);e.y=clamp(e.y+Math.sin(S.ha)*34,e.r,A-e.r);
      for(let i=0;i<14;i++){const a=S.ha+rnd(-1,1),v=rnd(120,320),l=rnd(.4,.8);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:S.col[i%3],r:rnd(3,7),fr:.06})}}})}
    else if(Math.random()<dt*6){const p=S.pts[Math.floor(rnd(0,S.pts.length))];if(p&&p[0]>0&&p[0]<A&&p[1]>0&&p[1]<A)S.dr=(S.dr||[]).concat([{x:p[0]+rnd(-S.w*.3,S.w*.3),y:p[1],t:h.t,l:rnd(14,34)}])}});
  const SG=2.65;if(h.t>=SG&&!h.sig){h.sig=1;SFXa('pc_sign')}
  if(h.t>=SG+.42&&!h.boom){h.boom=1;h.bt=h.t;SFXa('pc_splash');shake=Math.max(shake,16);FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});
    EN.forEach(e=>{if(e.hid||e.jump)return;const on=h.st.some(S=>{for(let i=1;i<S.pts.length;i++)if(segD(e.x,e.y,S.pts[i-1][0],S.pts[i-1][1],S.pts[i][0],S.pts[i][1])<S.w*.5+e.r)return true;return false});if(on)pcHit(o,e,6,e.x,e.y,0,1)});
    h.st.forEach(S=>{for(let k=0;k<12;k++){const p=S.pts[Math.floor(rnd(0,S.pts.length))];if(!p)continue;const a=rnd(0,TAU),v=rnd(80,300),l=rnd(.5,.9);Pt.push({x:p[0],y:p[1],vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:6,col:S.col[k%3],r:rnd(3,8),fr:.05})}})}
  return !h.boom||h.t<h.bt+.6};
function pcStroke(S,al){const P=S.pts,n=P.length;if(n<2)return;g.save();g.globalAlpha=al;g.lineCap='round';g.lineJoin='round';
  const W=i=>{const s=i/(n-1)*S.u;return S.w*(.5+.5*Math.sin(Math.PI*Math.min(1,s*1.6+.15)))*(s>.8?1-(s-.8)*1.6:1)};
  // 그림자 + 바탕색 (붓 압력에 따라 굵기 변화)
  g.strokeStyle='rgba(60,40,10,.12)';for(let i=1;i<n;i++){g.lineWidth=W(i)+4;g.beginPath();g.moveTo(P[i-1][0]+2,P[i-1][1]+3);g.lineTo(P[i][0]+2,P[i][1]+3);g.stroke()}
  g.strokeStyle=S.col[0];for(let i=1;i<n;i++){g.lineWidth=W(i);g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  // 붓 결 (밝은 결 · 어두운 결 · 마른 붓 틈)
  const nrm=i=>{const q=P[Math.min(n-1,i+1)],p0=P[Math.max(0,i-1)];return Math.atan2(q[1]-p0[1],q[0]-p0[0])+Math.PI/2};
  S.br.forEach((b,k)=>{const lim=Math.max(2,Math.floor(n*b.cut));g.strokeStyle=k%4==3?'#f1e7d2':S.col[b.c];g.globalAlpha=al*(k%4==3?.55:b.a);g.lineWidth=b.w;g.beginPath();let pen=0;
    for(let i=0;i<lim;i++){const p=P[i],a=nrm(i),off=b.o*W(i)/S.w,x=p[0]+Math.cos(a)*off,y=p[1]+Math.sin(a)*off,on=k%4!=3||i>n*.45;if(on&&pen)g.lineTo(x,y);else if(on){g.moveTo(x,y);pen=1}}g.stroke()});
  // 붓 끝 갈라짐
  if(S.u>=1){const p=P[n-1],a=nrm(n-1);g.globalAlpha=al*.8;g.strokeStyle=S.col[0];g.lineWidth=2;for(let k=-3;k<=3;k++){const ox=Math.cos(a)*k*5,oy=Math.sin(a)*k*5,ta=a-Math.PI/2;g.beginPath();g.moveTo(p[0]+ox,p[1]+oy);g.lineTo(p[0]+ox+Math.cos(ta)*(8+((k*37)%7)*2),p[1]+oy+Math.sin(ta)*(8+((k*37)%7)*2));g.stroke()}}
  // 흘러내림
  (S.dr||[]).forEach(d=>{g.globalAlpha=al*.9;g.strokeStyle=S.col[0];g.lineWidth=4;g.beginPath();g.moveTo(d.x,d.y);g.lineTo(d.x,d.y+d.l);g.stroke();g.fillStyle=S.col[0];g.beginPath();g.arc(d.x,d.y+d.l,3.4,0,TAU);g.fill()});
  g.restore()}
HZD.pcult=h=>{const fa=h.boom?clamp(1-(h.t-h.bt)/.6,0,1):Math.min(1,h.t/.35);g.save();g.globalAlpha=fa*.93;g.drawImage(pcPaper(),0,0,A,A);
  // 캔버스 테두리 (액자)
  g.globalAlpha=fa;g.strokeStyle='#8a5a1c';g.lineWidth=10;g.strokeRect(5,5,A-10,A-10);g.strokeStyle='#e6c27a';g.lineWidth=2;g.strokeRect(10,10,A-20,A-20);g.restore();
  h.st.forEach(S=>pcStroke(S,fa));
  // 서명
  const SG=2.65;if(h.t>SG){const u=clamp((h.t-SG)/.38,0,1),P=[];for(let i=0;i<=Math.floor(70*u);i++){const s=i/70,x=A-190+s*130+Math.cos(s*TAU*5.5)*9,y=A-58+Math.sin(s*TAU*5.5)*11*(1-s*.5)-s*10;P.push([x,y])}
    if(u>.85){const v=(u-.85)/.15;for(let i=0;i<=12*v;i++)P.push([A-200+i*14,A-36+Math.sin(i*.5)*2])}
    pcLine(P,'#16161a',3,fa);if(u>=1){g.save();g.globalAlpha=fa;g.font='italic 700 18px '+FB;g.fillStyle='#8f1020';g.textAlign='right';g.fillText('Gaeun',A-30,A-26);g.restore()}}};
HZP.pcult=h=>{if(h.boom)return;const o=h.o;let S=h.st.find(S=>S.u<1),x,y,a,col;
  if(S){x=S.hx;y=S.hy;a=S.ha+Math.PI+.5;col=S.col[0]}else{const SG=2.65;if(h.t>SG&&h.t<SG+.42){const u=(h.t-SG)/.38,s=Math.min(1,u);x=A-190+s*130+Math.cos(s*TAU*5.5)*9;y=A-58+Math.sin(s*TAU*5.5)*11*(1-s*.5)-s*10;pcPencil(x,y,-1.1,.8,1);return}
    const nx=h.st[h.st.length-1];if(!nx)return;x=nx.P1[0];y=nx.P1[1];return}
  // 붓 (붓끝이 그림 위치)
  pcBrush(x,y,a+Math.PI,col,1.1,1)};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
