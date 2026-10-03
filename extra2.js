// ===== extra2.js : 김건우 • 원숭이왕 (제천대성) =====

// ---------- 등록 ----------
const NEW12=['wk_cloud','wk_swoop','wk_hit','wk_hair','wk_clone','wk_strike','wk_ult','wk_grow','wk_spin','wk_gold'];
NEW12.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='wk_strike'||n=='wk_hit'?5:3)});
Object.assign(SLB,{wk_cloud:'원숭이왕 · 근두운 소환',wk_swoop:'원숭이왕 · 구름 돌진',wk_hit:'원숭이왕 · 여의봉 타격',wk_hair:'원숭이왕 · 털 불기',wk_clone:'원숭이왕 · 분신 등장',wk_strike:'원숭이왕 · 분신 공격',wk_ult:'원숭이왕 · 궁 (징)',wk_grow:'원숭이왕 · 여의봉 거대화',wk_spin:'원숭이왕 · 여의봉 회전',wk_gold:'원숭이왕 · 금강불괴'});
const WKSK=[
  {n:'근두운',w:.35,cd:7,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>wkCloud(o,t)},
  {n:'분신술',w:.45,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>wkClone(o,t)},
  {n:'여의봉 · 천지개벽',w:.6,ult:1,f:(o,t)=>wkUlt(o,t)}];
DEF.push({name:'김건우 • 원숭이왕',gl:'왕',k:'wk',vof:6,r:23,sp:245,col:'#ffb02e',hi:'#fff0c4',dk:'#5a1f00',alt:{col:'#ff4a3a',hi:'#ffe0d8',dk:'#4a0a04'},alt2:{col:'#3fdba0',hi:'#dcfff0',dk:'#063a26'},sk:WKSK});
INFO['김건우 • 원숭이왕']={st:[8,5,10,7,8,10],p:'금강불괴 · 체력 30 이하가 되면 한 번, 2.5초 동안 금빛 몸이 되어 받는 피해 절반',
  sk:[['4×3','근두운을 타고 상대를 세 번 휘감아 지나가며 여의봉으로 후려침 · 맞으면 느려짐'],['2.4×5','털을 뽑아 불면 분신 다섯이 상대를 둘러싸고 빙글빙글 돌다가 차례로 덮침'],['6×4','여의봉을 땅에 꽂아 하늘 끝까지 늘린 뒤 두 바퀴 휘두름 · 경기장 전체를 쓸어버림']]};

// ---------- 공통 그림 ----------
// 상서로운 구름 (祥雲)
function wkCloudArt(x,y,s,al,col){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';glow(col||'#ffcf6a',0,0,46,.35);g.restore();
  const P=[[-26,4,12],[-12,-4,15],[6,-6,16],[22,2,12],[-2,6,14],[14,8,10],[-18,9,9]];
  g.fillStyle='#ffffff';g.strokeStyle='#e8a93a';g.lineWidth=2.4;
  P.forEach(([px,py,r])=>{g.beginPath();g.arc(px,py,r+2.2,0,TAU);g.stroke()});
  P.forEach(([px,py,r])=>{const gr=g.createRadialGradient(px-r*.3,py-r*.4,r*.1,px,py,r);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#ffe3b0');g.fillStyle=gr;g.beginPath();g.arc(px,py,r,0,TAU);g.fill()});
  // 소용돌이 무늬
  g.strokeStyle='#e8a93a';g.lineWidth=2;g.lineCap='round';[[-13,-3,1],[8,-5,-1],[20,3,1]].forEach(([cx,cy,d])=>{g.beginPath();for(let k=0;k<=22;k++){const a=k*.42*d,r=1+k*.33;k?g.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):g.moveTo(cx,cy)}g.stroke()});
  g.restore()}
// 여의봉 (가운데 = 0, 양끝 = ±L)
function wkStaff(x,y,a,L,w,al){g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=al*.55;g.strokeStyle='#ffcf6a';g.lineWidth=w*2.6;g.lineCap='round';g.beginPath();g.moveTo(-L,0);g.lineTo(L,0);g.stroke();g.restore();
  const bg=g.createLinearGradient(0,-w/2,0,w/2);bg.addColorStop(0,'#fff2c2');bg.addColorStop(.35,'#d79a2a');bg.addColorStop(.7,'#7a4a10');bg.addColorStop(1,'#3a2004');
  g.fillStyle=bg;g.strokeStyle='#1e1002';g.lineWidth=Math.max(1.2,w*.12);g.fillRect(-L,-w/2,L*2,w);g.strokeRect(-L,-w/2,L*2,w);
  // 금테 (양 끝 붉은 금고)
  const cap=Math.max(w*1.9,Math.min(34,L*.18));[-1,1].forEach(sd=>{const x0=sd>0?L-cap:-L,cg=g.createLinearGradient(0,-w*.62,0,w*.62);cg.addColorStop(0,'#ffd0c0');cg.addColorStop(.4,'#e0251a');cg.addColorStop(1,'#5a0804');
    g.fillStyle=cg;g.fillRect(x0,-w*.62,cap,w*1.24);g.strokeRect(x0,-w*.62,cap,w*1.24);g.fillStyle='#ffd66b';[.18,.82].forEach(u=>g.fillRect(x0+cap*u-w*.14,-w*.66,w*.28,w*1.32))});
  // 새김 무늬
  if(L>60){g.strokeStyle='rgba(255,236,170,.55)';g.lineWidth=Math.max(1,w*.1);const st=Math.max(18,w*3);for(let px=-L+cap+st;px<L-cap-st/2;px+=st){g.beginPath();g.moveTo(px,-w*.3);g.lineTo(px+st*.3,w*.3);g.stroke()}}
  g.restore()}
// 작은 분신
function wkMini(o,x,y,s,a,al){const sz=40*s;g.save();g.globalAlpha=al;g.save();g.globalCompositeOperation='lighter';glow(o.d.col,x,y,sz*1.2,.35);g.restore();
  g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al;wkStaffMini(sz);g.restore();
  g.globalAlpha=al;g.drawImage(ICON(o.d,52),x-sz/2,y-sz/2,sz,sz);g.restore()}
function wkStaffMini(sz){g.strokeStyle='#3a2004';g.lineWidth=4.5;g.lineCap='round';g.beginPath();g.moveTo(-sz*.2,sz*.35);g.lineTo(sz*1.05,-sz*.15);g.stroke();g.strokeStyle='#e8b23a';g.lineWidth=2.6;g.stroke();g.fillStyle='#e0251a';g.beginPath();g.arc(sz*1.05,-sz*.15,3,0,TAU);g.fill()}
function wkPuff(x,y,n,s){for(let i=0;i<n;i++){const a=rnd(0,TAU),v=rnd(30,120)*s,l=rnd(.45,.8);Pt.push({x:x+Math.cos(a)*6,y:y+Math.sin(a)*6,vx:Math.cos(a)*v,vy:Math.sin(a)*v-20,l,m:l,sh:3,col:i%3?'#ffffff':'#ffe2a8',r:rnd(9,16)*s,gr:28*s,a0:.75,fr:.12})}
  for(let i=0;i<6;i++){const a=rnd(0,TAU),v=rnd(80,200);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.35,m:.35,gl:1,sh:8,col:'#ffd66b',r:rnd(2,3.5),rot:a})}}

// ---------- 아이콘 (네온) ----------
EMB.wk=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.06);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(-17,-2);g.bezierCurveTo(-17,-16,17,-16,17,-2);
    g.moveTo(-17,-2);g.bezierCurveTo(-21,2,-23,8,-18,11);g.bezierCurveTo(-14,13,-12,9,-15,7);
    g.moveTo(17,-2);g.bezierCurveTo(21,2,23,8,18,11);g.bezierCurveTo(14,13,12,9,15,7);
    g.moveTo(-6,4);g.lineTo(-2,8);g.moveTo(6,4);g.lineTo(2,8);
    g.moveTo(-9,16);g.bezierCurveTo(-4,12,4,12,9,16)});
  neon({col:'#ff4a3a',hi:'#ffd6cc'},1.6,()=>{g.beginPath();g.arc(0,-10,3,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-6,16,.45);g.restore()};

// ---------- 패시브 : 금강불괴 ----------
const _updWK=update;update=function(dt){_updWK(dt);if(!F||(phase!='play'&&phase!='demo'))return;
  F.forEach(f=>{if(f.d.k!='wk'||f.dead)return;if(f.gold>0)f.gold-=dt;
    if(!f.gb&&f.hp<=30&&phase=='play'){f.gb=1;f.gold=2.5;SFXa('wk_gold');ring(f.x,f.y,f.r,f.r+90,'#ffd66b',8,.5);ring(f.x,f.y,f.r,f.r+150,'#fff0c4',3,.7);shake=Math.max(shake,8);
      for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(120,320),l=rnd(.4,.8);Pt.push({x:f.x,y:f.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:8,col:'#ffd66b',r:rnd(2,4),rot:a})}}})};
const _hurtWK=hurt;hurt=function(t,n){if(t&&t.d&&t.d.k=='wk'&&t.gold>0){const a=[...arguments];a[1]=Math.round(n*.5*10)/10;return _hurtWK.apply(this,a)}return _hurtWK.apply(this,arguments)};
const _lowWK=lowHP;lowHP=function(f){_lowWK(f);if(f.d.k=='wk'&&f.gold>0&&!f.dead&&!f.hid){const a=Math.min(1,f.gold/.4);g.save();g.translate(f.x,f.y);g.globalCompositeOperation='lighter';glow('#ffd66b',0,0,f.r*2.6,.45*a);
  g.strokeStyle='#fff0c4';g.globalAlpha=.8*a;g.lineWidth=2;for(let k=0;k<3;k++){const r=f.r+4+((clock*30+k*7)%14);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke()}g.restore()}};

// ---------- 1) 근두운 : 구름 타고 세 번 휘감아 치기 ----------
function wkCloud(o,t){HZ.push({k:'wkcloud',o,tg:t,t:0,i:-1,N:3,D:.32,tr:[],sx:o.x,sy:o.y,side:Math.random()<.5?1:-1});SFXa('wk_cloud');wkPuff(o.x,o.y+o.r*.6,10,1)}
function wkBez(a,c,b,u){const v=1-u;return[v*v*a[0]+2*v*u*c[0]+u*u*b[0],v*v*a[1]+2*v*u*c[1]+u*u*b[1]]}
HZX.wkcloud=(h,dt)=>{const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(!e)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;
  const ti=Math.floor(h.t/h.D);
  if(ti>=h.N){if(!h.end){h.end=1;wkPuff(o.x,o.y+o.r*.5,8,1);o.dx=Math.cos(rnd(0,TAU));o.dy=Math.sin(rnd(0,TAU))}return h.t<h.N*h.D+.5}
  if(ti!=h.i){h.i=ti;h.hit=0;const S=[o.x,o.y],ia=Math.atan2(e.y-S[1],e.x-S[0])+h.side*(.55+rnd(0,.25)),R=150+rnd(0,30);
    const E=[clamp(e.x+Math.cos(ia)*R,o.r,A-o.r),clamp(e.y+Math.sin(ia)*R,o.r,A-o.r)];h.S=S;h.E=E;h.C=[2*e.x-(S[0]+E[0])/2,2*e.y-(S[1]+E[1])/2];h.side*=-1;SFXa('wk_swoop')}
  // 상대가 움직이면 곡선이 따라감
  h.C=[h.C[0]+(2*e.x-(h.S[0]+h.E[0])/2-h.C[0])*Math.min(1,dt*8),h.C[1]+(2*e.y-(h.S[1]+h.E[1])/2-h.C[1])*Math.min(1,dt*8)];
  const u0=(h.t-ti*h.D)/h.D,u=u0<.5?2*u0*u0:1-2*(1-u0)*(1-u0),[px,py]=wkBez(h.S,h.C,h.E,u),px0=o.x,py0=o.y;
  o.x=clamp(px,o.r,A-o.r);o.y=clamp(py,o.r,A-o.r);const va=Math.atan2(o.y-py0,o.x-px0);h.va=va;o.dx=Math.cos(va);o.dy=Math.sin(va);o.rot+=dt*14;
  h.tr.push({x:o.x,y:o.y+o.r*.55,t:h.t});h.tr=h.tr.filter(q=>h.t-q.t<.55);
  if(Math.random()<dt*40)Pt.push({x:o.x+rnd(-14,14),y:o.y+o.r*.6+rnd(-4,6),vx:-o.dx*60+rnd(-20,20),vy:-o.dy*60+rnd(-10,10),l:.5,m:.5,sh:3,col:'#ffffff',r:rnd(8,13),gr:16,a0:.55,fr:.2});
  if(!h.hit&&!e.hid&&!e.jump&&dist(o,e)<o.r+e.r+10){h.hit=1;const a=va;hurt(e,4,o,(o.x+e.x)/2,(o.y+e.y)/2,1,0);SFXa('wk_hit');e.slow=Math.max(e.slow,1);
    e.x=clamp(e.x+Math.cos(a)*22,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*22,e.r,A-e.r);e.sq=1;e.sa=a;ring(e.x,e.y,8,70,'#ffd66b',6,.3);FX.push({k:'burst',x:e.x,y:e.y,c:'#fff0c4',a:rnd(0,1),l:.25,m:.25});
    h.sw={a,t:h.t,x:e.x,y:e.y};shake=Math.max(shake,7);hs=.04}
  return true};
HZD.wkcloud=h=>{const o=h.o;if(o.dead)return;
  h.tr.forEach((q,k)=>{if(k%2)return;const p=(h.t-q.t)/.55;g.save();g.globalAlpha=(1-p)*.42;g.strokeStyle='#ffcf6a';g.lineWidth=1.6;g.fillStyle='#ffffff';[[-6,2,.8],[0,-2,1],[6,2,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(q.x+dx*(1+p),q.y+dy,(4+p*7)*r,0,TAU);g.stroke()});[[-6,2,.8],[0,-2,1],[6,2,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(q.x+dx*(1+p),q.y+dy,(4+p*7)*r,0,TAU);g.fill()});g.restore()});
  if(!h.end||h.t<h.N*h.D+.15){const s=h.end?clamp(1-(h.t-h.N*h.D)/.15,0,1):Math.min(1,h.t/.12);wkCloudArt(o.x,o.y+o.r*.95,1.25*s,s,o.d.col)}};
HZP.wkcloud=h=>{const o=h.o;if(o.dead||h.end)return;
  // 여의봉 휘두르기
  const sw=h.sw&&h.t-h.sw.t<.18?(h.t-h.sw.t)/.18:-1,ba=(h.va||0)+(sw>=0?-1.6+3.2*sw:-.9);
  if(sw>=0){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';g.globalAlpha=(1-sw)*.7;const gr=g.createRadialGradient(0,0,10,0,0,64);gr.addColorStop(0,'rgba(255,214,107,0)');gr.addColorStop(1,'rgba(255,214,107,.9)');g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.arc(0,0,64,ba-1.4,ba);g.closePath();g.fill();g.restore()}
  wkStaff(o.x+Math.cos(ba)*40,o.y+Math.sin(ba)*40,ba,40,6.5,1)};

// ---------- 2) 분신술 : 털 → 분신 다섯 ----------
function wkClone(o,t){const n=5,a0=rnd(0,TAU);HZ.push({k:'wkclone',o,tg:t,t:0,cx:t.x,cy:t.y,R:110,rot:a0,cl:Array.from({length:n},(_,i)=>({a:i*TAU/n,st:0,hx:o.x,hy:o.y,dash:-1,done:0,hit:0}))});SFXa('wk_hair');
  for(let i=0;i<8;i++){const a=rnd(-2.6,-.5),v=rnd(60,140);Pt.push({x:o.x,y:o.y-o.r*.6,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5,m:.5,gl:1,sh:5,col:'#ffd66b',r:1.4})}}
HZX.wkclone=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead)return false;if(!e||e.dead){e=tgt(o);h.tg=e;if(!e)return false}
  h.cx+=(e.x-h.cx)*Math.min(1,dt*6);h.cy+=(e.y-h.cy)*Math.min(1,dt*6);
  const T1=.38,T2=1.15;h.rot+=dt*(h.t<T2?3.4:1.5);const R=h.t<T2?h.R-20*clamp((h.t-T1)/(T2-T1),0,1):h.R-20;
  h.cl.forEach((c,i)=>{c.x=clamp(h.cx+Math.cos(h.rot+c.a)*R,14,A-14);c.y=clamp(h.cy+Math.sin(h.rot+c.a)*R,14,A-14);
    if(!c.st&&h.t>=T1+i*.03){c.st=1;wkPuff(c.x,c.y,7,.8);if(i==0)SFXa('wk_clone')}
    const ds=T2+i*.15;
    if(c.dash<0&&h.t>=ds){c.dash=0;c.sx=c.x;c.sy=c.y;const a=Math.atan2(e.y-c.y,e.x-c.x);c.da=a;c.ex=clamp(e.x+Math.cos(a)*90,14,A-14);c.ey=clamp(e.y+Math.sin(a)*90,14,A-14)}
    if(c.dash>=0&&!c.done){c.dash+=dt/.17;const u=Math.min(1,c.dash),ex=c.ex,ey=c.ey;c.dx2=c.sx+(ex-c.sx)*u;c.dy2=c.sy+(ey-c.sy)*u;
      if(!c.hit&&u>.4&&!e.hid&&!e.jump&&Math.hypot(e.x-c.dx2,e.y-c.dy2)<e.r+22){c.hit=1;hurt(e,2.4,o,e.x,e.y,0,0);SFXa('wk_strike');e.stn=Math.max(e.stn,.12);e.x=clamp(e.x+Math.cos(c.da)*10,e.r,A-e.r);e.y=clamp(e.y+Math.sin(c.da)*10,e.r,A-e.r);FX.push({k:'burst',x:e.x,y:e.y,c:'#fff0c4',a:rnd(0,1),l:.22,m:.22});ring(e.x,e.y,6,46,'#ffd66b',4,.25)}
      if(u>=1){c.done=1;wkPuff(c.dx2,c.dy2,6,.7)}}});
  return h.t<T2+h.cl.length*.15+.5};
HZD.wkclone=h=>{const T1=.38;if(h.t<1.4){const a=clamp(h.t/.3,0,1)*clamp((1.4-h.t)/.3,0,1);g.save();g.translate(h.cx,h.cy);g.strokeStyle='#ffd66b';g.globalAlpha=a*.35;g.lineWidth=2;g.setLineDash([4,10]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,h.R-10,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};
HZP.wkclone=h=>{const o=h.o,T1=.38;
  // 털이 날아감
  if(h.t<T1){const u=h.t/T1;h.cl.forEach(c=>{const x=o.x+(c.x-o.x)*u,y=o.y-o.r+(c.y-o.y+o.r)*u-Math.sin(u*Math.PI)*50;g.save();g.translate(x,y);g.rotate(u*12+c.a);g.strokeStyle='#ffd66b';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(-6,0);g.quadraticCurveTo(0,-4,6,0);g.stroke();g.globalCompositeOperation='lighter';glow('#ffd66b',0,0,10,.6);g.restore()})}
  h.cl.forEach((c,i)=>{if(!c.st||c.done)return;const age=h.t-T1-i*.03,s=back(clamp(age/.2,0,1));
    if(c.dash>=0){const u=Math.min(1,c.dash);for(let k=1;k<5;k++){const uu=Math.max(0,u-k*.08);wkMini(o,c.sx+(c.ex-c.sx)*uu,c.sy+(c.ey-c.sy)*uu,1,c.da,.25-k*.05)}wkMini(o,c.dx2,c.dy2,1.05,c.da,1)}
    else{const a=Math.atan2(h.cy-c.y,h.cx-c.x);wkMini(o,c.x,c.y+Math.sin(clock*8+i)*3,s,a,1)}})};

// ---------- 3) ULT 여의봉 · 천지개벽 ----------
function wkUlt(o,t){HZ.push({k:'wkult',o,t:0,x:o.x,y:o.y,a:-Math.PI/2,L:20,prev:[],hit:new Map(),rp:new Map(),sg:0});SFXa('wk_ult');shake=Math.max(shake,16);
  FX.push({k:'crack',x:o.x,y:o.y,r:80,l:3.4,m:3.4});for(let i=0;i<14;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(80,220))}
HZX.wkult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.x=h.x;o.y=h.y;o.gcd=Math.max(o.gcd,.5);o.cast=null;
  const G0=.15,G1=.75,S0=.8,S1=2.9,LM=A*.98;
  if(h.t>=G0&&!h.gs){h.gs=1;SFXa('wk_grow')}
  if(h.t>=S0&&!h.ss){h.ss=1;SFXa('wk_spin')}
  const gu=clamp((h.t-G0)/(G1-G0),0,1);h.L=h.t<S1+.1?20+(LM-20)*(1-Math.pow(1-gu,3)):LM*clamp(1-(h.t-S1-.1)/.25,0,1);
  const su=clamp((h.t-S0)/(S1-S0),0,1),ea=su*su*(3-2*su),a=-Math.PI/2+ea*TAU*2;
  h.prev.unshift(a);if(h.prev.length>10)h.prev.pop();
  if(h.t<G1)if(Math.random()<dt*30)shake=Math.max(shake,5);
  // 맞았는지 : 봉(양쪽)이 적의 방향을 지나갈 때
  EN.forEach(e=>{if(e.hid||e.jump)return;const d=dist(o,e);if(d>h.L+e.r)return;let rel=Math.atan2(e.y-o.y,e.x-o.x)-a;rel=Math.atan2(Math.sin(rel*1),Math.cos(rel*1));let r2=rel>Math.PI/2?rel-Math.PI:rel<-Math.PI/2?rel+Math.PI:rel;
    const pr=h.hit.get(e),wid=Math.atan2(e.r+8,Math.max(d,1)),p2=h.rp.get(e);h.rp.set(e,r2);
    const cross=p2!=null&&Math.sign(p2)!=Math.sign(r2)&&Math.abs(p2)<.9&&Math.abs(r2)<.9;
    if(su>0&&su<1&&(Math.abs(r2)<wid||cross)&&(!pr||h.t-pr>.3)){h.hit.set(e,h.t);const out=Math.atan2(e.y-o.y,e.x-o.x),tg=a+Math.PI/2;hurt(e,6,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.25);SFXa('wk_hit');
      const kx=Math.cos(out)*30+Math.cos(tg)*40,ky=Math.sin(out)*30+Math.sin(tg)*40;e.x=clamp(e.x+kx,e.r,A-e.r);e.y=clamp(e.y+ky,e.r,A-e.r);ring(e.x,e.y,8,90,'#ffd66b',8,.35);for(let i=0;i<10;i++)rockP(e.x,e.y,rnd(0,TAU),rnd(80,200))}});
  // 끝부분이 땅을 긁음
  if(su>0&&su<1)emit(50,dt,()=>{const rr=rnd(60,Math.min(h.L,A*.7)),sd=Math.random()<.5?1:-1,px=o.x+Math.cos(a)*rr*sd,py=o.y+Math.sin(a)*rr*sd;if(px>0&&px<A&&py>0&&py<A){dustP(px,py,rnd(30,90));if(Math.random()<.4)Pt.push({x:px,y:py,vx:rnd(-90,90),vy:rnd(-90,90),l:.3,m:.3,gl:1,sh:5,col:'#ffd66b',r:1.6,fr:.1})}});
  if(h.t>=S1&&!h.fin){h.fin=1;shake=Math.max(shake,20);ring(o.x,o.y,10,240,'#ffd66b',14,.6);ring(o.x,o.y,10,160,'#fff0c4',6,.5);wkPuff(o.x,o.y,14,1.3)}
  h.a=a;return h.t<S1+.6};
HZD.wkult=h=>{const o=h.o,a=Math.min(1,h.t/.2)*clamp((h.t-2.95)/-.5+1,0,1);g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';glow('#ffb02e',0,0,120,.5*a);glow('#fff0c4',0,0,60,.4*a);
  g.globalAlpha=.35*a;g.strokeStyle='#ffd66b';g.lineWidth=3;for(let k=0;k<2;k++){const r=40+((clock*90+k*40)%80);g.beginPath();g.arc(0,0,r,0,TAU);g.stroke()}g.restore()};
HZP.wkult=h=>{const o=h.o;if(o.dead)return;const fa=clamp((2.9+.6-h.t)/.3,0,1);
  // 휘두른 자리 금빛 잔상
  if(h.prev.length>1){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';for(let k=1;k<h.prev.length;k++){let a1=h.prev[k-1],a0=h.prev[k];if(Math.abs(a1-a0)<.002)continue;g.globalAlpha=fa*(.55-k*.05);
    [0,Math.PI].forEach(off=>{const gr=g.createRadialGradient(0,0,20,0,0,h.L);gr.addColorStop(0,'rgba(255,214,107,0)');gr.addColorStop(.4,'rgba(255,214,107,.6)');gr.addColorStop(1,'rgba(255,240,196,.2)');g.fillStyle=gr;g.beginPath();g.moveTo(0,0);g.arc(0,0,h.L,Math.min(a0,a1)+off,Math.max(a0,a1)+off);g.closePath();g.fill()})}g.restore()}
  wkStaff(o.x,o.y,h.a,h.L,h.L>200?16:8,fa);
  // 손잡이 부분 빛
  g.save();g.globalCompositeOperation='lighter';glow('#fff0c4',o.x,o.y,40,.6*fa);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
