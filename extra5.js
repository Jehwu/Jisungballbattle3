// ===== extra5.js : 흉악범 • 킬러 (청부업자 · 쌍권총) =====

const NEW15=['jw_shot','jw_rack','jw_coin','jw_throw','jw_mark','jw_ult','jw_kata','jw_final','jw_casing'];
NEW15.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='jw_shot'||n=='jw_kata'||n=='jw_casing'?6:3)});
Object.assign(SLB,{jw_shot:'킬러 · 소음기 총성',jw_rack:'킬러 · 장전',jw_coin:'킬러 · 금화 튕기기',jw_throw:'킬러 · 메치기',jw_mark:'킬러 · 계약 표식',jw_ult:'킬러 · 궁 시작',jw_kata:'킬러 · 건카타 연사',jw_final:'킬러 · 마지막 한 발',jw_casing:'킬러 · 탄피'});
const JWSK=[
  {n:'건-푸',w:.3,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>jwFu(o,t)},
  {n:'금화 · 청부 계약',w:.35,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>jwCoin(o,t)},
  {n:'콘티넨탈 · 처형',w:.6,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>jwUlt(o,t)}];
DEF.push({name:'흉악범 • 킬러',gl:'킬',k:'wick',vof:5,r:25,sp:228,col:'#d4af37',hi:'#fff4d0',dk:'#141414',alt:{col:'#e0245e',hi:'#ffd6e2',dk:'#2a0610'},alt2:{col:'#6fa8ff',hi:'#e2eeff',dk:'#0a1830'},sk:JWSK});
INFO['흉악범 • 킬러']={st:[9,6,8,8,5,10],p:'방탄 슈트 · 받는 피해 10% 감소',
  sk:[['3+2.5×2','순식간에 파고들어 업어치기로 바닥에 메친 뒤 쌍권총 두 발 · 메쳐지면 잠깐 기절'],['3 + 1.5×4','금화를 튕겨 청부 계약 · 4초 동안 표식이 붙고 레이저 조준선을 따라 소음기 총알이 계속 날아감'],['1×16+8','어두운 클럽 조명 속 건카타 · 상대 주위를 순간이동하며 여덟 번 쏘고, 마지막은 슬로모션 한 발 (쌍권총이라 한 번에 두 발씩)']]};

// ---------- 패시브 : 방탄 슈트 ----------
const _hurtJW=hurt;hurt=function(t,n){if(t&&t.d&&t.d.k=='wick'&&n>0){const a=[...arguments];a[1]=Math.round(n*.9*10)/10;return _hurtJW.apply(this,a)}return _hurtJW.apply(this,arguments)};

// ---------- 그림 : 소음기 권총 ----------
function jwGun(s,fl){g.save();g.scale(s,s);g.lineJoin='round';
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-8,3,40,4);
  // 손잡이
  g.fillStyle='#1b1b1f';g.strokeStyle='#000';g.lineWidth=1;g.beginPath();g.moveTo(-7,0);g.lineTo(-2,0);g.lineTo(-4,10);g.lineTo(-10,10);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#3a3a42';g.beginPath();g.moveTo(-8,3);g.lineTo(-4,3);g.moveTo(-8.5,6);g.lineTo(-4.5,6);g.stroke();
  // 슬라이드
  const sg=g.createLinearGradient(0,-4,0,2);sg.addColorStop(0,'#6a6d78');sg.addColorStop(.4,'#2a2c33');sg.addColorStop(1,'#111216');g.fillStyle=sg;g.fillRect(-9,-4,20,6);g.strokeStyle='#000';g.strokeRect(-9,-4,20,6);
  g.strokeStyle='#4a4d58';for(let i=0;i<4;i++){g.beginPath();g.moveTo(-7+i*1.6,-3.5);g.lineTo(-7+i*1.6,1.5);g.stroke()}
  g.fillStyle='#d4af37';g.fillRect(4,-4.6,2,1);
  // 소음기
  const cg=g.createLinearGradient(0,-3,0,3);cg.addColorStop(0,'#5a5d66');cg.addColorStop(.5,'#25272d');cg.addColorStop(1,'#0c0d10');g.fillStyle=cg;g.fillRect(11,-3.2,15,5.4);g.strokeRect(11,-3.2,15,5.4);
  g.strokeStyle='rgba(255,255,255,.12)';g.beginPath();g.moveTo(12,-2.4);g.lineTo(25,-2.4);g.stroke();
  if(fl>0){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',30,-.5,18*fl,.9);g.fillStyle='rgba(255,240,200,'+fl+')';g.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8,r=i%2?3:9*fl;g.lineTo(30+Math.cos(a)*r,-.5+Math.sin(a)*r*.6)}g.closePath();g.fill();g.restore()}
  g.restore()}
// 양손 권총 (o 기준, 조준 방향 a)
function jwDual(o,a,fl1,fl2,s){[-1,1].forEach((sd,k)=>{const px=o.x+Math.cos(a)*(o.r*.55)-Math.sin(a)*sd*o.r*.75,py=o.y+Math.sin(a)*(o.r*.55)+Math.cos(a)*sd*o.r*.75;g.save();g.translate(px,py);g.rotate(a+sd*.05);if(Math.cos(a)<0)g.scale(1,-1);jwGun((s||1)*1.3,k?fl2:fl1);g.restore()})}
function jwMuzzle(o,a,sd){return[o.x+Math.cos(a)*(o.r*.55+39)-Math.sin(a)*sd*o.r*.75,o.y+Math.sin(a)*(o.r*.55+39)+Math.cos(a)*sd*o.r*.75]}
function jwCasing(x,y,a){const pa=a+Math.PI/2+rnd(-.4,.4),v=rnd(90,170);Pt.push({x,y,vx:Math.cos(pa)*v,vy:Math.sin(pa)*v-70,l:.7,m:.7,sh:2,col:'#e2b04a',r:2.6,rot:rnd(0,TAU),vr:rnd(-24,24),gy:460,fr:.3})}
function jwShot(o,e,sd,dmg,list){const a=Math.atan2(e.y-o.y,e.x-o.x),[mx,my]=jwMuzzle(o,a,sd);list.push({x1:mx,y1:my,x2:e.x+rnd(-4,4),y2:e.y+rnd(-4,4),t:0});
  jwCasing(o.x,o.y,a);for(let i=0;i<4;i++){const aa=a+rnd(-.3,.3),v=rnd(80,220),l=rnd(.05,.1);Pt.push({x:mx,y:my,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v,l,m:l,gl:1,sh:4,pal:PAL.fire,r:rnd(5,9)})}
  if(dmg){hurt(e,dmg,o,e.x,e.y,0,0);for(let i=0;i<6;i++){const aa=a+Math.PI+rnd(-.8,.8),v=rnd(80,240),l=rnd(.15,.3);Pt.push({x:e.x,y:e.y,vx:-Math.cos(aa)*v*-1,vy:-Math.sin(aa)*v*-1,l,m:l,gl:1,sh:5,col:'#ffcf6a',r:1.6,fr:.1})}}}
function jwTracers(list,dt){list.forEach(q=>q.t+=dt);return list.filter(q=>q.t<.1)}
function jwDrawTr(list){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';list.forEach(q=>{const a=1-q.t/.1;g.strokeStyle='rgba(255,220,150,'+(.8*a)+')';g.lineWidth=3;g.beginPath();g.moveTo(q.x1,q.y1);g.lineTo(q.x2,q.y2);g.stroke();g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=1.2;g.stroke()});g.restore()}

// ---------- 아이콘 (네온 쌍권총 + 금화) ----------
EMB.wick=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  const gun=()=>{g.moveTo(-12,-3);g.lineTo(4,-3);g.lineTo(4,-2);g.lineTo(16,-2);g.lineTo(16,2);g.lineTo(4,2);g.lineTo(2,2);g.lineTo(-3,2);g.lineTo(-6,11);g.lineTo(-11,11);g.lineTo(-8,2);g.lineTo(-12,2);g.closePath()};
  [[-1,.75],[1,-.75]].forEach(([sd,r])=>{g.save();g.rotate(r);g.scale(sd,1);neon(D,1.6,()=>{g.beginPath();gun()});g.restore()});
  neon({col:'#ffcf6a',hi:'#fff4d0'},1.4,()=>{g.beginPath();g.arc(0,13,4.5,0,TAU)});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};

// ---------- 1) 건-푸 : 파고들어 메치고 두 발 ----------
function jwFu(o,t){HZ.push({k:'jwfu',o,tg:t,t:0,sx:o.x,sy:o.y,tr:[],trs:[],ph:0});SFXa('jw_rack')}
HZX.jwfu=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;h.trs=jwTracers(h.trs,dt);
  const D0=.2,T0=.24,T1=.56;
  if(h.t<D0){const u=h.t/D0,ue=1-Math.pow(1-u,3),a=Math.atan2(e.y-h.sy,e.x-h.sx),d=Math.hypot(e.x-h.sx,e.y-h.sy)-o.r-e.r-4;o.x=clamp(h.sx+Math.cos(a)*d*ue,o.r,A-o.r);o.y=clamp(h.sy+Math.sin(a)*d*ue,o.r,A-o.r);h.tr.push({x:o.x,y:o.y,t:h.t})}
  else if(h.ph==0){h.ph=1;SFXa('jw_throw');h.pa=Math.atan2(e.y-o.y,e.x-o.x);h.cx=o.x;h.cy=o.y;e.stn=Math.max(e.stn,.9);e.cast=null}
  if(h.ph==1){o.x=h.cx;o.y=h.cy;const u=clamp((h.t-T0)/(T1-T0),0,1),ue=u*u,R=o.r+e.r+4,an=h.pa+Math.PI*ue;e.x=clamp(h.cx+Math.cos(an)*R,e.r,A-e.r);e.y=clamp(h.cy+Math.sin(an)*R,e.r,A-e.r);e.sq=.6;e.sa=an;
    if(u>=1){h.ph=2;hurt(e,3,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.45);shake=Math.max(shake,12);hs=.08;ring(e.x,e.y,8,80,'#ffffff',6,.35);spark(e.x,e.y,'dust',16,240);FX.push({k:'crack',x:e.x,y:e.y,r:40,l:1.4,m:1.4});h.st=h.t}}
  if(h.ph>=2){o.x=h.cx;o.y=h.cy;const a=Math.atan2(e.y-o.y,e.x-o.x);h.aim=a;
    if(h.ph==2&&h.t>=h.st+.12){h.ph=3;SFXa('jw_shot');jwShot(o,e,-1,2.5,h.trs);h.f1=.08}
    if(h.ph==3&&h.t>=h.st+.26){h.ph=4;SFXa('jw_shot');jwShot(o,e,1,2.5,h.trs);h.f2=.08;SFXa('jw_casing')}}
  h.f1=Math.max(0,(h.f1||0)-dt);h.f2=Math.max(0,(h.f2||0)-dt);h.tr=h.tr.filter(q=>h.t-q.t<.3);
  return h.ph<4||h.t<h.st+.6};
HZD.jwfu=h=>{const o=h.o;h.tr.forEach(q=>{const a=1-(h.t-q.t)/.3;g.save();g.globalAlpha=a*.35;g.drawImage(ICON(o.d,52),q.x-o.r*1.1,q.y-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()})};
HZP.jwfu=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const a=h.aim!=null?h.aim:Math.atan2(e.y-o.y,e.x-o.x);jwDrawTr(h.trs);jwDual(o,a,h.f1/.08,h.f2/.08,1.05)};

// ---------- 2) 금화 · 청부 계약 ----------
function jwCoin(o,t){HZ.push({k:'jwcoin',o,tg:t,t:0,sx:o.x,sy:o.y-o.r,ph:0,trs:[],nx:0,n:0});SFXa('jw_coin')}
HZX.jwcoin=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead)return false;if(!e||e.dead){if(h.ph==0){e=tgt(o);h.tg=e;if(!e)return false}else return h.t<h.mt+.3}h.trs=jwTracers(h.trs,dt);
  const FT=.45,MD=4;
  if(h.ph==0){const u=clamp(h.t/FT,0,1);h.x=h.sx+(e.x-h.sx)*u;h.y=h.sy+(e.y-e.r-h.sy)*u-Math.sin(Math.PI*u)*120;
    if(u>=1){h.ph=1;h.mt=h.t;if(!e.hid&&!e.jump){hurt(e,3,o,e.x,e.y,0,0);SFXa('jw_mark');ring(e.x,e.y,6,70,'#d4af37',5,.4);for(let i=0;i<10;i++){const a=rnd(0,TAU);Pt.push({x:e.x,y:e.y-e.r,vx:Math.cos(a)*140,vy:Math.sin(a)*140,l:.4,m:.4,gl:1,sh:8,col:'#ffcf6a',r:2.5,rot:a})}}else{h.ph=2}}}
  if(h.ph==1){if(h.t>h.mt+MD||e.hid)return false;h.aim=Math.atan2(e.y-o.y,e.x-o.x);
    if(h.t>=h.mt+.5+h.n*.8&&h.n<4){h.n++;const sd=h.n%2?-1:1;SFXa('jw_shot');jwShot(o,e,sd,1.5,h.trs);h['f'+(sd<0?1:2)]=.08;if(h.n%2==0)SFXa('jw_casing')}}
  h.f1=Math.max(0,(h.f1||0)-dt);h.f2=Math.max(0,(h.f2||0)-dt);
  return h.ph!=2};
HZP.jwcoin=h=>{const o=h.o,e=h.tg;
  if(h.ph==0){const sp=Math.cos(h.t*30);g.save();g.translate(h.x,h.y);g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',0,0,18,.7);g.restore();g.scale(Math.max(.15,Math.abs(sp)),1);
    const cg=g.createRadialGradient(-2,-2,1,0,0,7);cg.addColorStop(0,'#fff4d0');cg.addColorStop(.6,'#d4af37');cg.addColorStop(1,'#7a5a10');g.fillStyle=cg;g.beginPath();g.arc(0,0,7,0,TAU);g.fill();g.strokeStyle='#5a4008';g.lineWidth=1.2;g.stroke();g.strokeStyle='#fff4d0';g.lineWidth=.8;g.beginPath();g.arc(0,0,4.5,0,TAU);g.stroke();g.restore();
    if(!o.dead)jwDual(o,Math.atan2(h.y-o.y,h.x-o.x),0,0,1);return}
  if(h.ph==1&&e&&!e.dead&&!o.dead){const q=h.t-h.mt,a=Math.min(1,q/.2)*clamp((4-q)/.3,0,1);
    // 레이저 조준선
    const [mx,my]=jwMuzzle(o,h.aim,h.n%2?1:-1);g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,40,60,'+(.35+.25*Math.sin(clock*20))*a+')';g.lineWidth=1.4;g.beginPath();g.moveTo(mx,my);g.lineTo(e.x,e.y);g.stroke();glow('#ff3040',e.x,e.y,10,.8*a);g.restore();
    jwDrawTr(h.trs);jwDual(o,h.aim,h.f1/.08,h.f2/.08,1);
    // 표식 (회전하는 조준경 + 금화)
    g.save();g.translate(e.x,e.y);g.rotate(q*1.5);g.globalAlpha=a;g.strokeStyle='#ff3040';g.lineWidth=2;const R=e.r+12+3*Math.sin(clock*8);g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();
    for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.moveTo(R-6,0);g.lineTo(R+8,0);g.stroke()}g.restore();
    g.save();g.translate(e.x,e.y-e.r-22);g.globalAlpha=a;g.scale(Math.cos(clock*3),1);g.fillStyle='#d4af37';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.strokeStyle='#fff4d0';g.lineWidth=1;g.stroke();g.restore()}};

// ---------- 3) ULT 콘티넨탈 · 처형 (연출 : 다른 사람은 멈춤) ----------
function jwUlt(o,t){SFXa('jw_ult');const EN=F.filter(x=>x!=o&&!x.dead);
  CIN={o,e:t,t:0,n:0,N:8,trs:[],gh:[],fl:[0,0],fx:0,
  tick(dt){const o=this.o;let e=this.e;if(!e||e.dead){const EN=F.filter(x=>x!=o&&!x.dead);e=this.e=EN[0];if(!e)return this.t<(this.endT||(this.endT=this.t+.6))}o.gcd=Math.max(o.gcd,.5);this.trs=jwTracers(this.trs,dt);this.fl=this.fl.map(v=>Math.max(0,v-dt));this.fx=Math.max(0,this.fx-dt*4);
    const t=this.t,K0=.5,KS=.27;
    if(this.n<this.N&&t>=K0+this.n*KS){const EN=F.filter(x=>x!=o&&!x.dead);const tg=EN[this.n%EN.length]||e;this.n++;this.gh.push({x:o.x,y:o.y,t});
      const an=(this.n*2.4)+rnd(-.3,.3),R=tg.r+o.r+40+rnd(0,30);o.x=clamp(tg.x+Math.cos(an)*R,o.r,A-o.r);o.y=clamp(tg.y+Math.sin(an)*R,o.r,A-o.r);this.aim=Math.atan2(tg.y-o.y,tg.x-o.x);this.ct=tg;
      SFXa('jw_kata');jwShot(o,tg,-1,1,this.trs);jwShot(o,tg,1,1,this.trs);this.fl=[.09,.09];this.fx=1;hs=.05;shake=Math.max(shake,6);if(this.n%3==0)SFXa('jw_casing')}
    const F0=K0+this.N*KS+.15;
    if(t>=F0&&!this.ff){this.ff=1;const EN=F.filter(x=>x!=o&&!x.dead);const tg=this.ct&&!this.ct.dead?this.ct:EN[0];if(!tg)return false;this.ft=tg;this.gh.push({x:o.x,y:o.y,t});const an=Math.atan2(tg.y-A/2,tg.x-A/2)+Math.PI*.15,R=tg.r+o.r+70;
      o.x=clamp(tg.x+Math.cos(an)*R,o.r,A-o.r);o.y=clamp(tg.y+Math.sin(an)*R,o.r,A-o.r);this.aim=Math.atan2(tg.y-o.y,tg.x-o.x);SFXa('jw_final');this.bt=t}
    if(this.ff&&!this.hit&&t>=this.bt+.75){this.hit=1;const tg=this.ft;this.fl=[0,.12];if(tg&&!tg.dead){hurt(tg,8,o,tg.x,tg.y,0,1);FX.push({k:'frost',l:.18,m:.18,c:'#ffffff'});shake=22;hs=.14;ring(tg.x,tg.y,8,120,'#ffcf6a',8,.5);
      for(let i=0;i<18;i++){const a=this.aim+rnd(-.6,.6),v=rnd(120,360),l=rnd(.3,.6);Pt.push({x:tg.x,y:tg.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:i%2?'#ffcf6a':'#ffffff',r:1.8,fr:.1})}}}
    this.gh=this.gh.filter(q=>t-q.t<.35);
    if(this.hit&&t>this.bt+1.4)return false;return t<6},
  draw(){const o=this.o,t=this.t,inA=Math.min(1,t/.35),outA=this.hit?clamp(1-(t-this.bt-.9)/.5,0,1):1,a=inA*outA,slow=this.ff&&!this.hit;
    // 어두운 클럽 + 네온 조명
    g.save();g.globalAlpha=a*.82;g.fillStyle='#07050a';g.fillRect(-300,-300,A+600,A+600);g.globalCompositeOperation='lighter';
    const st=Math.floor(t*7)%2;[[0,0,'#ff1e4a'],[A,0,'#2a6bff'],[A/2,A,'#ff1e4a']].forEach(([lx,ly,c],k)=>{g.globalAlpha=a*(slow?.12:.18+.12*((st+k)%2));const gr=g.createRadialGradient(lx,ly,0,lx,ly,A*.9);gr.addColorStop(0,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,A,A)});
    // 총구 빛이 방을 밝힘
    if(this.fx>0){g.globalAlpha=a*this.fx*.35;const gr=g.createRadialGradient(o.x,o.y,0,o.x,o.y,260);gr.addColorStop(0,'#ffe6b0');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,A,A)}
    g.restore();
    // 네온 바닥 줄
    g.save();g.globalAlpha=a*.5;g.globalCompositeOperation='lighter';g.strokeStyle='#ff1e4a';g.lineWidth=2;for(let k=0;k<4;k++){const y=A*(.2+k*.2)+Math.sin(t*2+k)*6;g.beginPath();g.moveTo(0,y);g.lineTo(A,y);g.stroke()}g.restore();
    // 잔상
    this.gh.forEach(q=>{const p=(t-q.t)/.35;g.save();g.globalAlpha=a*(1-p)*.45;g.drawImage(ICON(o.d,52),q.x-o.r*1.1,q.y-o.r*1.1,o.r*2.2,o.r*2.2);g.restore()});
    F.forEach(f=>{if(!f.dead)ball(f,f==o?(this.ct||this.e):o)});
    jwDrawTr(this.trs);if(!o.dead&&this.aim!=null)jwDual(o,this.aim,this.fl[0]/.09,this.fl[1]/.12,1.1);
    // 마지막 한 발 : 슬로모션 총알
    if(slow&&this.ft){const u=clamp((t-this.bt-.15)/.6,0,1),[mx,my]=jwMuzzle(o,this.aim,1),tg=this.ft,bx=mx+(tg.x-mx)*u,by=my+(tg.y-my)*u;
      g.save();g.fillStyle='rgba(0,0,0,'+(.35*a)+')';g.fillRect(-300,-300,A+600,A+600);g.restore();if(!o.dead)jwDual(o,this.aim,0,u<.05?1:0,1.1);
      if(u>0){g.save();g.globalCompositeOperation='lighter';for(let k=0;k<5;k++){const v=u-k*.07;if(v<0)break;const rx=mx+(tg.x-mx)*v,ry=my+(tg.y-my)*v;g.strokeStyle='rgba(200,220,255,'+(.4-k*.07)+')';g.lineWidth=1.5;g.beginPath();g.ellipse(rx,ry,6+k*5,3+k*2.5,this.aim,0,TAU);g.stroke()}
        g.strokeStyle='rgba(255,230,180,.8)';g.lineWidth=2;g.beginPath();g.moveTo(mx,my);g.lineTo(bx,by);g.stroke();g.translate(bx,by);g.rotate(this.aim);glow('#ffcf6a',0,0,12,.9);g.fillStyle='#e2b04a';g.beginPath();g.ellipse(0,0,5,2.2,0,0,TAU);g.fill();g.restore()}}
    // 자막
    const sub=t<.5?'':!this.ff?'':this.hit?'계약 완료.':'…';if(sub)subtitle(sub,a)}};
  ft(o.x,o.y-o.r-40,'일이다.','#fff4d0',22)}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
