// ===== extra8.js : 공병은 • 토타디 (카메라 · 스피커 · 변기 소환) =====

const NEW18=['tt_summon','tt_charge','tt_beam','tt_spk','tt_bass','tt_drop','tt_crash','tt_flush','tt_vortex','tt_geyser'];
NEW18.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='tt_bass'||n=='tt_drop'||n=='tt_crash'?4:3)});
Object.assign(SLB,{tt_summon:'토타디 · 소환',tt_charge:'토타디 · 카메라 충전',tt_beam:'토타디 · 카메라 빔',tt_spk:'토타디 · 스피커 켜짐',tt_bass:'토타디 · 베이스 충격파',tt_drop:'토타디 · 변기 낙하',tt_crash:'토타디 · 변기 착지',tt_flush:'토타디 · 물 내림',tt_vortex:'토타디 · 거대 소용돌이',tt_geyser:'토타디 · 물기둥 폭발'});
const TTSK=[
  {n:'카메라 빔',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<620,f:(o,t)=>ttCam(o,t)},
  {n:'스피커 쇼크웨이브',w:.3,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<360,f:(o,t)=>ttSpk(o,t)},
  {n:'변기 대침공',w:.8,ult:1,f:(o,t)=>ttUlt(o,t)}];
const TTI0=DEF.findIndex(d=>d.name=='공병은');
DEF.push({name:'공병은 • 토타디',gl:'토',k:'ttd',vof:TTI0,r:25,sp:224,col:'#3fc8ff',hi:'#dff6ff',dk:'#06283a',alt:{col:'#ff9a2a',hi:'#ffead0',dk:'#3a1e02'},alt2:{col:'#9aff4a',hi:'#eaffd8',dk:'#18380a'},sk:TTSK});
INFO['공병은 • 토타디']={st:[8,5,7,9,9,9],p:'구독자 · 소환물이 적을 맞힐 때마다 궁 게이지가 더 빨리 참',
  sk:[['1.9×7','삼각대 카메라를 소환 · 렌즈에 빛을 모은 뒤 상대를 따라가며 굵은 빔을 쏨'],['4.8×3','거대한 스피커를 소환 · 쿵! 쿵! 쿵! 베이스 충격파 세 번이 퍼지며 밀쳐냄'],['5+α+8+α+8','하늘에서 변기 네 개가 떨어져 물을 내리며 빨아들이고 · 마지막에 거대한 변기가 내려와 모두 빨아들인 뒤 물기둥 폭발']]};

// ---------- 소환물 그림 (images 폴더 그림 우선 · 없으면 기본 그림) ----------
// images/tt_camera · tt_speaker · tt_toilet (png · webp · jpg)
const TTI={camera:null,speaker:null,toilet:null};
function ttLoad(key,names){if(!names.length)return;const im=new Image();im.onload=()=>{try{TTI[key]=typeof oniCut=='function'?oniCut(im):im}catch(e){TTI[key]=im}};im.onerror=()=>ttLoad(key,names.slice(1));im.src=names[0]}
['camera','speaker','toilet'].forEach(k=>{const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+'tt_'+k+'.'+e)));ttLoad(k,L)});
function ttImg(k,s,al){const im=TTI[k];if(!im)return false;const H=(k=='toilet'?80:104)*s,W=H*im.width/im.height;g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,40*s,W*.4,8*s,0,0,TAU);g.fill();g.drawImage(im,-W/2,40*s-H,W,H);g.restore();return true}
// 삼각대 캠코더
function ttCamArt(s,glw,al){if(ttImg('camera',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;g.lineCap='round';
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,40,24,6,0,0,TAU);g.fill();
  [[-17,40],[17,40],[2,38]].forEach(([x,y])=>{g.strokeStyle='#14161c';g.lineWidth=4;g.beginPath();g.moveTo(0,-2);g.lineTo(x,y);g.stroke();g.strokeStyle='#5a606e';g.lineWidth=1.4;g.stroke()});
  g.fillStyle='#1c1f26';g.fillRect(-4,-8,8,8);
  const bg=g.createLinearGradient(0,-32,0,-6);bg.addColorStop(0,'#4a4f5c');bg.addColorStop(.5,'#22252d');bg.addColorStop(1,'#101217');g.fillStyle=bg;g.strokeStyle='#05060a';g.lineWidth=1.6;g.beginPath();g.roundRect?g.roundRect(-20,-32,36,26,4):g.rect(-20,-32,36,26);g.fill();g.stroke();
  g.fillStyle='#2a2e38';g.fillRect(-12,-38,20,5);g.strokeRect(-12,-38,20,5);
  const lg=g.createLinearGradient(0,-28,0,-10);lg.addColorStop(0,'#5a606e');lg.addColorStop(.5,'#1a1c22');lg.addColorStop(1,'#33373f');g.fillStyle=lg;g.fillRect(16,-28,16,18);g.strokeRect(16,-28,16,18);g.strokeStyle='#6a707e';g.lineWidth=1;[20,25].forEach(x=>{g.beginPath();g.moveTo(x,-28);g.lineTo(x,-10);g.stroke()});
  g.fillStyle='#0a0c12';g.beginPath();g.ellipse(33,-19,4,10,0,0,TAU);g.fill();const rg=g.createRadialGradient(33,-22,1,33,-19,9);rg.addColorStop(0,'#bfe8ff');rg.addColorStop(.4,'#2a6aff');rg.addColorStop(1,'#060a1a');g.fillStyle=rg;g.beginPath();g.ellipse(33,-19,3,8,0,0,TAU);g.fill();
  if(glw>0){g.save();g.globalCompositeOperation='lighter';glow('#7fd8ff',34,-19,10+glw*26,.9*glw);glow('#ffffff',34,-19,4+glw*8,glw);g.restore()}
  g.fillStyle=Math.floor(clock*3)%2?'#ff2a3a':'#5a0a10';g.beginPath();g.arc(-15,-27,2.2,0,TAU);g.fill();
  g.fillStyle='#0d1a2a';g.fillRect(-28,-28,7,14);g.strokeStyle='#05060a';g.strokeRect(-28,-28,7,14);g.fillStyle='rgba(120,200,255,.5)';g.fillRect(-27,-27,5,12);g.restore()}
// 스피커 (우퍼 두 개)
function ttSpkArt(s,pump,al,led){if(ttImg('speaker',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,40,28,7,0,0,TAU);g.fill();
  const bg=g.createLinearGradient(-22,0,22,0);bg.addColorStop(0,'#24262c');bg.addColorStop(.5,'#16171c');bg.addColorStop(1,'#0a0b0e');g.fillStyle=bg;g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.roundRect?g.roundRect(-22,-54,44,94,5):g.rect(-22,-54,44,94);g.fill();g.stroke();
  g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=1;for(let y=-50;y<38;y+=4){g.beginPath();g.moveTo(-20,y);g.lineTo(20,y);g.stroke()}
  [[-24,13],[10,16]].forEach(([y,R],k)=>{const p=1+pump*(k?.22:.15);g.fillStyle='#08090b';g.beginPath();g.arc(0,y,R+3,0,TAU);g.fill();g.strokeStyle='#3a3d46';g.lineWidth=2;g.stroke();
    const cg=g.createRadialGradient(-R*.3,y-R*.3,1,0,y,R*p);cg.addColorStop(0,'#5a5e68');cg.addColorStop(.6,'#22242a');cg.addColorStop(1,'#0e0f12');g.fillStyle=cg;g.beginPath();g.arc(0,y,R*p,0,TAU);g.fill();
    g.strokeStyle='rgba(255,255,255,.1)';g.beginPath();g.arc(0,y,R*p*.7,0,TAU);g.stroke();g.fillStyle='#2e3038';g.beginPath();g.arc(0,y,R*.32*p,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.18)';g.beginPath();g.arc(-2,y-2,R*.12,0,TAU);g.fill()});
  g.fillStyle='#0c0d10';g.beginPath();g.arc(0,-45,4,0,TAU);g.fill();g.strokeStyle='#4a4e58';g.lineWidth=1;g.stroke();
  const lc=led||'#3fc8ff';g.save();g.globalCompositeOperation='lighter';g.fillStyle=lc;g.globalAlpha=(al==null?1:al)*(.5+pump*.5);g.fillRect(-18,32,36,3);glow(lc,0,33,30,.3+pump*.4);g.restore();g.restore()}
// 변기
function ttToiletArt(s,swirl,al){if(ttImg('toilet',s,al))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,36,26,7,0,0,TAU);g.fill();
  const P=(c0,c1,y0,y1)=>{const gr=g.createLinearGradient(-24,y0,24,y1);gr.addColorStop(0,c0);gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,c1);return gr};
  g.strokeStyle='#8a94a6';g.lineWidth=1.6;
  g.fillStyle=P('#dfe6f0','#b8c2d2',-40,-14);g.beginPath();g.roundRect?g.roundRect(-20,-42,40,26,4):g.rect(-20,-42,40,26);g.fill();g.stroke();g.fillStyle='#c8d0dc';g.fillRect(-21,-45,42,5);g.strokeRect(-21,-45,42,5);g.fillStyle='#b8c2d2';g.beginPath();g.arc(12,-34,3,0,TAU);g.fill();g.stroke();
  g.fillStyle=P('#d8e0ea','#aab4c4',14,36);g.beginPath();g.moveTo(-12,14);g.lineTo(12,14);g.lineTo(9,36);g.lineTo(-9,36);g.closePath();g.fill();g.stroke();
  g.fillStyle=P('#e8eef6','#b0bacb',-8,24);g.beginPath();g.ellipse(0,4,24,16,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#f4f7fb';g.beginPath();g.ellipse(0,3,20,12.5,0,0,TAU);g.fill();g.strokeStyle='#c0c8d6';g.stroke();
  const wg=g.createRadialGradient(0,4,1,0,4,15);wg.addColorStop(0,'#1a5aa8');wg.addColorStop(1,'#7fd0ff');g.fillStyle=wg;g.beginPath();g.ellipse(0,4,14,8,0,0,TAU);g.fill();
  if(swirl){g.save();g.beginPath();g.ellipse(0,4,14,8,0,0,TAU);g.clip();g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1.5;for(let k=0;k<3;k++){g.beginPath();for(let i=0;i<=20;i++){const r=14-i*.6,a=k*TAU/3+clock*swirl*8+i*.35;i?g.lineTo(Math.cos(a)*r,4+Math.sin(a)*r*.57):g.moveTo(Math.cos(a)*r,4+Math.sin(a)*r*.57)}g.stroke()}g.restore()}
  g.restore()}
function ttBeamIn(x,y,u){if(u>=1)return;g.save();g.globalCompositeOperation='lighter';const w=24*(1-u);const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba(63,200,255,0)');gr.addColorStop(.5,'rgba(220,250,255,'+(1-u)+')');gr.addColorStop(1,'rgba(63,200,255,0)');g.fillStyle=gr;g.fillRect(x-w,-300,w*2,y+300+20);glow('#7fd8ff',x,y,60*(1-u),.6);g.restore()}
function ttHit(o,e,n,heavy){n=Math.round(n*1.2*10)/10;hurt(e,n,o,e.x,e.y,0,heavy?1:0);if(!o.dead)o.ug=Math.min(100,(o.ug||0)+n*.6)}

// ---------- 아이콘 (네온 캠코더 + 음파) ----------
EMB.ttd=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.7,()=>{g.beginPath();g.rect(-15,-8,18,14);g.moveTo(3,-5);g.lineTo(12,-9);g.lineTo(12,9);g.lineTo(3,5);g.moveTo(-10,-8);g.lineTo(-10,-12);g.lineTo(-2,-12);g.lineTo(-2,-8);
    g.moveTo(-8,10);g.lineTo(-13,19);g.moveTo(-6,10);g.lineTo(-1,19)});
  neon({col:'#ffffff',hi:'#dff6ff'},1.3,()=>{g.beginPath();g.arc(14,0,8,-.6,.6);g.moveTo(14+Math.cos(-.6)*13,Math.sin(-.6)*13);g.arc(14,0,13,-.6,.6)});
  g.save();g.globalCompositeOperation='lighter';glow('#ff2a3a',-11,-4,5,.9);g.restore()};

// ---------- 1) 카메라 빔 ----------
function ttCam(o,t){const a=ang(o,t),sd=Math.random()<.5?1:-1,x=clamp(o.x-Math.sin(a)*sd*48,30,A-30),y=clamp(o.y+Math.cos(a)*sd*48,50,A-40);HZ.push({k:'ttcam',o,tg:t,t:0,x,y,a:Math.atan2(t.y-(y-25),t.x-x),tk:0,hit:null});SFXa('tt_summon')}
HZX.ttcam=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const C0=.25,F0=.75,F1=1.45,lx=h.x+Math.cos(h.a)*40,ly=h.y-25+Math.sin(h.a)*12;h.lx=lx;h.ly=ly;
  if(h.t>=C0&&!h.cs){h.cs=1;SFXa('tt_charge')}if(h.t>=F0&&!h.fs){h.fs=1;SFXa('tt_beam');shake=Math.max(shake,6)}
  if(e&&h.t<F1){let da=Math.atan2(e.y-ly,e.x-lx)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-(h.t<F0?5:1.7)*dt,(h.t<F0?5:1.7)*dt)}
  if(h.t>=F0&&h.t<F1){// 빔이 맞는 지점
    let L=900,hit=null;EN.forEach(x=>{if(x.hid||x.jump)return;const px=x.x-lx,py=x.y-ly,along=px*Math.cos(h.a)+py*Math.sin(h.a),perp=Math.abs(-px*Math.sin(h.a)+py*Math.cos(h.a));if(along>0&&perp<16+x.r&&along<L){L=along;hit=x}});
    const ex=lx+Math.cos(h.a)*L,ey=ly+Math.sin(h.a)*L;h.L=L;h.hit=hit;h.tk-=dt;if(h.tk<=0){h.tk=.1;if(hit)ttHit(o,hit,1.6,0)}
    emit(80,dt,()=>{const a=h.a+Math.PI+rnd(-1,1),v=rnd(80,260),l=rnd(.15,.35);Pt.push({x:Math.min(A,Math.max(0,ex)),y:Math.min(A,Math.max(0,ey)),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:Math.random()<.5?'#ffffff':'#7fd8ff',r:1.8,fr:.1})})}
  return h.t<F1+.4};
HZD.ttcam=h=>{const fa=clamp((1.85-h.t)/.35,0,1),s=back(clamp(h.t/.25,0,1)),dir=Math.cos(h.a)<0?-1:1,glw=h.t<.25?0:h.t<.75?(h.t-.25)/.5:h.t<1.45?1:clamp(1-(h.t-1.45)/.2,0,1);
  g.save();g.translate(h.x,h.y);g.scale(dir,1);ttCamArt(1.3*s,glw,fa);g.restore();ttBeamIn(h.x,h.y,h.t/.3)};
HZP.ttcam=h=>{const F0=.75,F1=1.45;
  if(h.t>=.25&&h.t<F0){const u=(h.t-.25)/.5;g.save();g.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const r=(1-((u*2+k/3)%1))*46;g.strokeStyle='rgba(127,216,255,'+(.7*u)+')';g.lineWidth=2;g.beginPath();g.arc(h.lx,h.ly,r,0,TAU);g.stroke()}g.restore()}
  if(h.t>=F0&&h.t<F1+.15){const a=h.t<F1?Math.min(1,(h.t-F0)/.06):clamp(1-(h.t-F1)/.15,0,1),L=h.L||900,w=(12+3*Math.sin(clock*40))*a;g.save();g.translate(h.lx,h.ly);g.rotate(h.a);g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(0,-w*2.2,0,w*2.2);gr.addColorStop(0,'rgba(40,140,255,0)');gr.addColorStop(.3,'rgba(63,200,255,.55)');gr.addColorStop(.5,'rgba(255,255,255,.95)');gr.addColorStop(.7,'rgba(63,200,255,.55)');gr.addColorStop(1,'rgba(40,140,255,0)');
    g.fillStyle=gr;g.fillRect(0,-w*2.2,L,w*4.4);g.fillStyle='rgba(255,255,255,'+a+')';g.fillRect(0,-w*.25,L,w*.5);
    g.strokeStyle='rgba(200,240,255,'+(.5*a)+')';g.lineWidth=1.2;for(let k=0;k<6;k++){const x0=((clock*900+k*140)%L);g.beginPath();g.moveTo(x0,-w*1.6);g.lineTo(x0+30,-w*1.6);g.moveTo(x0+60,w*1.6);g.lineTo(x0+90,w*1.6);g.stroke()}
    glow('#ffffff',0,0,22*a,.9);glow('#7fd8ff',L,0,40*a,.8);for(let k=0;k<3;k++){g.strokeStyle='rgba(127,216,255,'+(.6*a)+')';g.lineWidth=2;g.beginPath();g.ellipse(L,0,(10+((clock*80+k*12)%36))*.5,10+((clock*80+k*12)%36),0,0,TAU);g.stroke()}g.restore()}};

// ---------- 2) 스피커 쇼크웨이브 ----------
function ttSpk(o,t){const a=ang(o,t),x=clamp(o.x+Math.cos(a)*44,30,A-30),y=clamp(o.y+Math.sin(a)*44,60,A-40);HZ.push({k:'ttspk',o,tg:t,t:0,x,y,w:[],n:0,pump:0});SFXa('tt_summon');SFXa('tt_spk')}
HZX.ttspk=(h,dt,EN)=>{const o=h.o,P=[.45,.85,1.25];h.pump=Math.max(0,h.pump-dt*4);
  if(h.n<3&&h.t>=P[h.n]){h.n++;h.pump=1;h.w.push({t0:h.t,hit:new Set()});SFXa('tt_bass');shake=Math.max(shake,10);hs=.03}
  h.w.forEach(W=>{const r=(h.t-W.t0)*720;if(r>300)return;EN.forEach(e=>{if(W.hit.has(e)||e.hid||e.jump)return;const d=Math.hypot(e.x-h.x,e.y-(h.y-5));if(Math.abs(d-r)<26+e.r&&d<300){W.hit.add(e);ttHit(o,e,4,0);const a=Math.atan2(e.y-h.y,e.x-h.x);e.x=clamp(e.x+Math.cos(a)*55,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*55,e.r,A-e.r);e.slow=Math.max(e.slow,.8);e.sq=1;e.sa=a}})});
  return h.t<1.9};
HZD.ttspk=h=>{const fa=clamp((1.9-h.t)/.35,0,1),s=back(clamp(h.t/.25,0,1)),led=['#3fc8ff','#ff4a8a','#ffd84a'][Math.max(0,h.n-1)%3];
  h.w.forEach(W=>{const q=h.t-W.t0,r=q*720;if(r>320)return;const a=clamp(1-r/320,0,1);g.save();g.translate(h.x,h.y-5);g.globalCompositeOperation='lighter';
    const gr=g.createRadialGradient(0,0,Math.max(0,r-30),0,0,r+8);gr.addColorStop(0,'rgba(63,200,255,0)');gr.addColorStop(.7,'rgba(63,200,255,'+(.35*a)+')');gr.addColorStop(1,'rgba(255,255,255,'+(.6*a)+')');g.fillStyle=gr;g.beginPath();g.arc(0,0,r+8,0,TAU);g.fill();
    g.strokeStyle='rgba(255,255,255,'+(.8*a)+')';g.lineWidth=3;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();g.strokeStyle=led;g.globalAlpha=a*.6;g.lineWidth=6;g.beginPath();g.arc(0,0,Math.max(0,r-16),0,TAU);g.stroke();g.restore()});
  g.save();g.translate(h.x,h.y);g.scale(1+h.pump*.06,1-h.pump*.04);ttSpkArt(1.25*s,h.pump,fa,led);g.restore();ttBeamIn(h.x,h.y,h.t/.3)};

// ---------- 3) ULT 변기 대침공 ----------
function ttUlt(o,t){const EN=F.filter(x=>x!=o&&!x.dead);const T=[];for(let i=0;i<4;i++){const e=EN[i%Math.max(1,EN.length)]||t,a=i*TAU/4+rnd(-.4,.4),R=rnd(55,95);T.push({x:clamp(e.x+Math.cos(a)*R,40,A-40),y:clamp(e.y+Math.sin(a)*R,60,A-40),t0:.25+i*.2,st:0,hit:0})}
  HZ.push({k:'ttult',o,t:0,T,G:null,tk:0});SFXa('tt_summon')}
HZX.ttult=(h,dt,EN)=>{const o=h.o;h.tk-=dt;const tick=h.tk<=0;if(tick)h.tk=.15;
  h.T.forEach(q=>{const k=h.t-q.t0;if(k<0)return;if(!q.st){q.st=1;SFXa('tt_drop')}
    if(q.st==1&&k>=.38){q.st=2;q.lt=h.t;SFXa('tt_crash');shake=Math.max(shake,10);ring(q.x,q.y+20,6,80,'#dff6ff',6,.35);for(let i=0;i<10;i++)Pt.push({x:q.x,y:q.y,vx:rnd(-220,220),vy:rnd(-280,-60),l:rnd(.5,.9),m:.9,sh:2,col:i%2?'#ffffff':'#c8d0dc',r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),gy:520,fr:.4});
      for(let i=0;i<14;i++){const a=rnd(0,TAU),v=rnd(80,240),l=rnd(.4,.7);Pt.push({x:q.x,y:q.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,l,m:l,sh:6,col:i%2?'#7fd0ff':'#ffffff',r:rnd(2,4),gy:400,fr:.3})}
      EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-q.x,e.y-q.y)<65+e.r)ttHit(o,e,4,1)});if(!h.fl){h.fl=1;SFXa('tt_flush')}}
    if(q.st==2&&h.t<q.lt+1.1){EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-q.x,e.y-q.y);if(d<125&&d>4){const a=Math.atan2(q.y-e.y,q.x-e.x),tg=a+Math.PI/2;e.x+=(Math.cos(a)*150+Math.cos(tg)*90)*dt;e.y+=(Math.sin(a)*150+Math.sin(tg)*90)*dt;e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);if(tick)ttHit(o,e,.6,0)}})}});
  // 거대 변기
  if(!h.G&&h.t>=1.9){const L=EN.filter(x=>!x.hid);const cx=L.length?L.reduce((s,e)=>s+e.x,0)/L.length:A/2,cy=L.length?L.reduce((s,e)=>s+e.y,0)/L.length:A/2;h.G={x:clamp(cx,90,A-90),y:clamp(cy,110,A-80),t0:h.t,st:0};SFXa('tt_drop')}
  const G=h.G;if(G){const k=h.t-G.t0;
    if(G.st==0&&k>=.45){G.st=1;SFXa('tt_crash');SFXa('tt_vortex');shake=Math.max(shake,22);hs=.1;ring(G.x,G.y+30,10,150,'#dff6ff',10,.5);EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-G.x,e.y-G.y)<110+e.r)ttHit(o,e,7,1)})}
    if(G.st==1&&k<2.0){EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-G.x,e.y-G.y);if(d<270&&d>6){const a=Math.atan2(G.y-e.y,G.x-e.x),tg=a+Math.PI/2;e.x+=(Math.cos(a)*210+Math.cos(tg)*120)*dt;e.y+=(Math.sin(a)*210+Math.sin(tg)*120)*dt;e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);e.slow=Math.max(e.slow,.3);if(tick)ttHit(o,e,.7,0)}});if(Math.random()<dt*20)shake=Math.max(shake,5)}
    if(G.st==1&&k>=2.0){G.st=2;SFXa('tt_geyser');shake=Math.max(shake,26);hs=.12;FX.push({k:'frost',l:.12,m:.12,c:'#dff6ff'});ring(G.x,G.y,10,200,'#7fd0ff',12,.6);
      EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-G.x,e.y-G.y)<170+e.r){ttHit(o,e,7,1);const a=Math.atan2(e.y-G.y,e.x-G.x);e.flyA=a;e.flyT=.3;e.flyV=900}});
      for(let i=0;i<50;i++){const a=rnd(0,TAU),v=rnd(120,420),l=rnd(.6,1.1);Pt.push({x:G.x,y:G.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-200,l,m:l,sh:6,col:['#7fd0ff','#ffffff','#3fa8ff'][i%3],r:rnd(2.5,5),gy:500,fr:.4})}}
    if(G.st==2&&k>2.6)return false}
  return h.t<6};
function ttVortex(x,y,R,a,sp){g.save();g.translate(x,y);g.scale(1,.55);g.globalAlpha=a;const gr=g.createRadialGradient(0,0,4,0,0,R);gr.addColorStop(0,'rgba(10,40,90,.85)');gr.addColorStop(.5,'rgba(40,140,230,.5)');gr.addColorStop(1,'rgba(120,210,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();
  g.lineCap='round';for(let k=0;k<5;k++){g.strokeStyle=k%2?'rgba(255,255,255,.75)':'rgba(140,220,255,.8)';g.lineWidth=2.5;g.beginPath();for(let i=0;i<=30;i++){const r=R*(1-i/32),an=k*TAU/5+clock*sp+i*.28;i?g.lineTo(Math.cos(an)*r,Math.sin(an)*r):g.moveTo(Math.cos(an)*r,Math.sin(an)*r)}g.stroke()}
  g.setLineDash([6,8]);g.lineDashOffset=-clock*80;g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;g.beginPath();g.arc(0,0,R*.95,0,TAU);g.stroke();g.setLineDash([]);g.restore()}
HZD.ttult=h=>{h.T.forEach(q=>{if(q.st==2){const k=h.t-q.lt,a=clamp(Math.min(k/.15,(1.3-k)/.3),0,1);if(a>0)ttVortex(q.x,q.y+12,125,a*.9,5)}});
  const G=h.G;if(G&&G.st>=1){const k=h.t-G.t0,a=G.st==1?Math.min(1,(k-.45)/.2):clamp(1-(k-2)/.5,0,1);if(a>0)ttVortex(G.x,G.y+24,270,a,3.5+k)}
  if(G&&G.st==0){const u=clamp((h.t-G.t0)/.45,0,1);g.save();g.globalAlpha=.3+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(G.x,G.y+30,60+50*u,(60+50*u)*.35,0,0,TAU);g.fill();g.restore()}
  h.T.forEach(q=>{if(q.st==1){const u=clamp((h.t-q.t0)/.38,0,1);g.save();g.globalAlpha=.25+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(q.x,q.y+22,14+20*u,(14+20*u)*.35,0,0,TAU);g.fill();g.restore()}})};
HZP.ttult=h=>{h.T.forEach(q=>{if(!q.st)return;let y=q.y,al=1,sw=0;if(q.st==1){const u=clamp((h.t-q.t0)/.38,0,1);y=q.y-(1-u*u)*420}else{const k=h.t-q.lt;sw=1;al=clamp((1.4-k)/.3,0,1);if(al<=0)return}g.save();g.translate(q.x,y);g.rotate(q.st==1?Math.sin(h.t*20)*.2:0);ttToiletArt(.75,sw,al);g.restore()});
  const G=h.G;if(G){const k=h.t-G.t0;let y=G.y,al=1;if(G.st==0){const u=clamp(k/.45,0,1);y=G.y-(1-u*u)*520}if(G.st==2){al=clamp(1-(k-2)/.3,0,1)}if(al>0){g.save();g.translate(G.x,y);g.rotate(G.st==1?Math.sin(clock*30)*.02:0);ttToiletArt(2.1,G.st==1?2:0,al);g.restore()}
    if(G.st==2&&k<2.6){const u=(k-2)/.6,hh=380*Math.sin(Math.PI*Math.min(1,u*1.4)),w=46*(1-u*.4);g.save();g.globalAlpha=clamp(1-u,0,1);const gr=g.createLinearGradient(G.x-w,0,G.x+w,0);gr.addColorStop(0,'rgba(120,210,255,0)');gr.addColorStop(.3,'rgba(150,220,255,.85)');gr.addColorStop(.5,'rgba(255,255,255,.95)');gr.addColorStop(.7,'rgba(150,220,255,.85)');gr.addColorStop(1,'rgba(120,210,255,0)');
      g.fillStyle=gr;g.fillRect(G.x-w,G.y-hh,w*2,hh);g.fillStyle='rgba(255,255,255,.9)';g.beginPath();g.ellipse(G.x,G.y-hh,w*1.4,16,0,0,TAU);g.fill();g.restore()}}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
