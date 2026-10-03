// ===== extra7.js : 김지우 • 때리는형태 (붉은 분노 괴물) =====

const NEW17=['rg_roar','rg_charge','rg_wall','rg_grab','rg_slam','rg_leap','rg_land','rg_rage'];
NEW17.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='rg_slam'||n=='rg_land'?4:3)});
Object.assign(SLB,{rg_roar:'때리는형태 · 분노의 포효',rg_charge:'때리는형태 · 돌진',rg_wall:'때리는형태 · 벽에 쾅',rg_grab:'때리는형태 · 낚아채기',rg_slam:'때리는형태 · 패대기',rg_leap:'때리는형태 · 도약',rg_land:'때리는형태 · 착지 충격',rg_rage:'때리는형태 · 광폭화'});
const RGSK=[
  {n:'벽꿍 돌진',w:.35,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<480,f:(o,t)=>rgCharge(o,t)},
  {n:'패대기',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<230,f:(o,t)=>rgSlam(o,t)},
  {n:'광폭화 · 대지 분쇄',w:.8,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>rgUlt(o,t)}];
const RGI=DEF.findIndex(d=>d.k=='oni');
DEF.push({name:'김지우 • 때리는형태',gl:'분',k:'rage',vof:RGI,r:29,sp:200,col:'#ff2a2a',hi:'#ffd0c8',dk:'#3a0404',alt:{col:'#ff8a1c',hi:'#ffe6c8',dk:'#3a1a02'},alt2:{col:'#c42aff',hi:'#f2d8ff',dk:'#2a0640'},sk:RGSK});
INFO['김지우 • 때리는형태']={st:[10,7,5,4,7,10],p:'분노 · 잃은 체력이 많을수록 더 세게 때림 (최대 피해 40% 증가)',
  sk:[['6~12','상대에게 돌진해서 붙잡은 채 끝까지 밀고 가 벽에 처박음 · 멀리 끌고 갈수록 더 아픔'],['3.5×2+6','상대를 붙잡아 들어 올린 뒤 좌우로 바닥에 세 번 패대기치고 던져버림'],['7×2+10','거대해진 붉은 괴물이 상대에게 세 번 뛰어올라 내리찍음 · 착지할 때마다 땅이 갈라지고 충격파']]};

// ---------- 패시브 : 분노 ----------
const _hurtRG=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='rage'&&t&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*(1+Math.max(0,100-o.hp)/250)*10)/10;return _hurtRG.apply(this,a)}return _hurtRG.apply(this,arguments)};

// ---------- 붉은 괴물 그림 (images 폴더 그림을 붉게 · 없으면 기본 괴물을 붉게) ----------
const RGC={};
function rgRed(key){if(RGC[key])return RGC[key];const im=typeof ONI!='undefined'&&ONI[key];if(!im)return null;try{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
  const D=x.getImageData(0,0,c.width,c.height),p=D.data;for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const L=.3*p[i]+.59*p[i+1]+.11*p[i+2],k=Math.pow(L/255,1.15)*255;
    p[i]=Math.min(255,k*1.45+28);p[i+1]=Math.max(0,Math.min(255,k*.42-12));p[i+2]=Math.max(0,Math.min(255,k*.34-12))}x.putImageData(D,0,0);RGC[key]=c;return c}catch(e){return null}}
function rgMon(s,ph,al,arm){s=Math.max(.02,s);const im=(arm>.5?rgRed('arms'):null)||rgRed('idle')||rgRed('arms');
  if(im){const H=118*s,W=H*im.width/im.height,bob=Math.abs(Math.sin(ph))*5*s;g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,46*s,W*.42,10*s,0,0,TAU);g.fill();
    g.save();g.globalCompositeOperation='lighter';glow('#ff2a10',0,46*s-H*.5,H*.6,.28*(al==null?1:al));g.restore();g.translate(0,46*s-bob);g.rotate(Math.sin(ph)*.06);g.drawImage(im,-W/2,-H,W,H);g.restore();return}
  g.save();try{g.filter='hue-rotate(135deg) saturate(1.8) brightness(1.15)'}catch(e){}onMon(s,ph,al,1,arm);g.restore()}
function rgSteam(x,y,n){for(let i=0;i<n;i++){const l=rnd(.4,.8);Pt.push({x:x+rnd(-18,18),y:y+rnd(-30,10),vx:rnd(-20,20),vy:rnd(-90,-40),l,m:l,sh:3,col:i%2?'#ff3a2a':'#5a0a06',r:rnd(6,11),gr:16,a0:.45,fr:.3})}}
function rgDebris(x,y,n,v){for(let i=0;i<n;i++)rockP(x,y,rnd(0,TAU),rnd(v*.4,v));for(let i=0;i<n/2;i++)dustP(x,y,rnd(40,120))}
// 붉은 균열 (착지 · 벽)
FXD.rgcrater=x=>{const p=1-x.l/x.m,a=clamp(x.l/.6,0,1);g.save();g.translate(x.x,x.y);g.globalAlpha=a;g.fillStyle='rgba(20,4,2,.55)';g.beginPath();g.ellipse(0,0,x.r*.55,x.r*.4,0,0,TAU);g.fill();
  g.lineCap='round';(x.cr||(x.cr=Array.from({length:9},(_,i)=>({a:i*TAU/9+rnd(-.25,.25),l:rnd(.6,1.1)})))).forEach(c=>{let px=0,py=0;g.beginPath();g.moveTo(0,0);for(let k=1;k<=4;k++){const aa=c.a+((k*37)%5-2)*.12;px=Math.cos(aa)*x.r*c.l*k/4;py=Math.sin(aa)*x.r*c.l*k/4*.75;g.lineTo(px,py)}
    g.strokeStyle='#0a0202';g.lineWidth=5;g.stroke();g.save();g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,'+Math.floor(90+80*(1-p))+',30,'+(.9*(1-p*.7))+')';g.lineWidth=2;g.stroke();g.restore()});g.restore()};
FXD.rgwall=x=>{const a=clamp(x.l/.5,0,1);g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalAlpha=a;g.lineCap='round';for(let i=0;i<7;i++){const aa=(i-3)*.32+Math.PI;g.strokeStyle='#0a0202';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(aa)*x.r*(.6+(i%3)*.2),Math.sin(aa)*x.r*(.6+(i%3)*.2));g.stroke()}
  g.save();g.globalCompositeOperation='lighter';glow('#ff3a10',0,0,x.r*.8,.5*a);g.restore();g.restore()};

// ---------- 아이콘 (네온 : 화난 눈 + 이 악문 입 + 핏줄) ----------
EMB.rage=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*9)*.05);
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-15,-12);g.lineTo(-4,-6);g.moveTo(15,-12);g.lineTo(4,-6);g.moveTo(-12,6);g.lineTo(12,6);g.lineTo(12,13);g.lineTo(-12,13);g.closePath();for(let k=-8;k<=8;k+=4){g.moveTo(k,6);g.lineTo(k,13)}
    g.moveTo(-17,-20);g.lineTo(-13,-16);g.lineTo(-16,-13);g.moveTo(15,-21);g.lineTo(18,-17)});
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#ffb0a0',sd*8,-4,7,.9);g.fillStyle='#ffffff';g.beginPath();g.arc(sd*8,-3,2,0,TAU);g.fill()});g.restore()};
const _lowRG=lowHP;lowHP=function(f){_lowRG(f);if(f.d.k=='rage'&&!f.dead&&!f.hid&&phase!='menu'&&Math.random()<.25)rgSteam(f.x,f.y-f.r*.5,1)};

// ---------- 1) 벽꿍 돌진 ----------
function rgCharge(o,t){const a=ang(o,t);HZ.push({k:'rgch',o,tg:t,t:0,a,ph:0,gr:null,cx:0});SFXa('rg_charge');SFXa('rg_roar');o.onc=1;o.hid=1;rgSteam(o.x,o.y,8)}
HZX.rgch=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;const V=860;
  if(h.ph==0){const e=h.tg;if(e&&!e.dead&&h.t<.25){let da=ang(o,e)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-3*dt,3*dt)}
    const px=o.x,py=o.y;o.x=clamp(o.x+Math.cos(h.a)*V*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*V*dt,o.r,A-o.r);emit(40,dt,()=>dustP(o.x,o.y+o.r,rnd(30,80)));if(Math.random()<dt*20)shake=Math.max(shake,4);
    const hit=EN.find(x=>!x.hid&&!x.jump&&dist(o,x)<o.r+x.r+10);if(hit){h.ph=1;h.gr=hit;h.gt=h.t;h.sx=o.x;h.sy=o.y;SFXa('rg_grab');hurt(hit,2,o,hit.x,hit.y,0,0);hit.stn=Math.max(hit.stn,1);hit.cast=null}
    else if(h.t>.55||(o.x<=o.r+1||o.x>=A-o.r-1||o.y<=o.r+1||o.y>=A-o.r-1)&&h.t>.1){h.ph=3;h.et=h.t}}
  if(h.ph==1){const e=h.gr;if(!e||e.dead){h.ph=3;h.et=h.t}else{o.x=clamp(o.x+Math.cos(h.a)*V*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(h.a)*V*dt,o.r,A-o.r);e.x=o.x+Math.cos(h.a)*(o.r+e.r);e.y=o.y+Math.sin(h.a)*(o.r+e.r);e.stn=Math.max(e.stn,.3);
    emit(70,dt,()=>{Pt.push({x:e.x+rnd(-8,8),y:e.y+rnd(-8,8),vx:-Math.cos(h.a)*rnd(80,200)+rnd(-40,40),vy:-Math.sin(h.a)*rnd(80,200)+rnd(-40,40),l:.35,m:.35,gl:1,sh:5,col:'#ffb070',r:1.8,fr:.1})});emit(30,dt,()=>dustP(e.x,e.y,rnd(40,100)));
    const wall=e.x<=e.r+2||e.x>=A-e.r-2||e.y<=e.r+2||e.y>=A-e.r-2;if(wall||h.t-h.gt>.7){e.x=clamp(e.x,e.r,A-e.r);e.y=clamp(e.y,e.r,A-e.r);const dd=Math.hypot(o.x-h.sx,o.y-h.sy),dmg=Math.round(Math.min(10,4+dd/45));
      hurt(e,dmg,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.7);SFXa('rg_wall');shake=Math.max(shake,wall?22:14);hs=.12;FX.push({k:'rgwall',x:e.x+Math.cos(h.a)*e.r,y:e.y+Math.sin(h.a)*e.r,a:h.a,r:70,l:1.6,m:1.6});rgDebris(e.x,e.y,16,260);ring(e.x,e.y,8,100,'#ff3a2a',8,.4);if(wall&&typeof wallFlash=='function')wallFlash(e.x,e.y,'#ff3a2a');h.ph=3;h.et=h.t}}}
  if(h.ph==3){if(!h.rel){h.rel=1;o.onc=0;o.hid=0;o.dx=-Math.cos(h.a);o.dy=-Math.sin(h.a)}return h.t<h.et+.3}
  return true};
HZP.rgch=h=>{const o=h.o;if(h.ph==3||o.dead)return;const dir=Math.cos(h.a)<0?-1:1;
  for(let k=1;k<4;k++){g.save();g.globalAlpha=.18;g.translate(o.x-Math.cos(h.a)*k*22,o.y-Math.sin(h.a)*k*22-20);g.scale(dir,1);rgMon(.8,clock*16,.35,1);g.restore()}
  g.save();g.translate(o.x,o.y-20);g.scale(dir,1);g.rotate(.18);rgMon(.85,clock*18,1,1);g.restore()};

// ---------- 2) 패대기 ----------
function rgSlam(o,t){HZ.push({k:'rgslam',o,tg:t,t:0,ph:0,n:0,cx:o.x,cy:o.y});SFXa('rg_grab');o.onc=1;o.hid=1}
HZX.rgslam=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;o.x=h.cx;o.y=h.cy;
  const G=.18,S=.32;e.stn=Math.max(e.stn,.3);e.cast=null;
  if(h.t<G){const u=h.t/G,a=Math.atan2(e.y-h.cy,e.x-h.cx),R=o.r+e.r+6,d=Math.hypot(e.x-h.cx,e.y-h.cy);const nd=d+(R-d)*Math.min(1,u*1.5);e.x=h.cx+Math.cos(a)*nd;e.y=h.cy+Math.sin(a)*nd;h.a0=a}
  else if(h.n<3){const k=Math.floor((h.t-G)/S),u=((h.t-G)%S)/S,R=o.r+e.r+14,from=h.a0+(k%2?Math.PI:0),an=from+Math.PI*(u<.7?Math.pow(u/.7,2):1);e.x=clamp(h.cx+Math.cos(an)*R,e.r,A-e.r);e.y=clamp(h.cy+Math.sin(an)*R,e.r,A-e.r);
    if(u>=.7&&h.n<=k){h.n=k+1;const last=h.n==3;hurt(e,last?6:3.5,o,e.x,e.y,0,1);SFXa('rg_slam');shake=Math.max(shake,last?20:13);hs=last?.1:.06;FX.push({k:'rgcrater',x:e.x,y:e.y+4,r:last?70:52,l:1.8,m:1.8});rgDebris(e.x,e.y,12,220);ring(e.x,e.y,6,last?110:70,'#ff3a2a',6,.35);
      if(last){const a=Math.atan2(e.y-h.cy,e.x-h.cx);e.flyA=a;e.flyT=.35;e.flyV=900;e.stn=Math.max(e.stn,.6);h.et=h.t}}}
  if(h.n>=3&&h.t>h.et+.25){o.onc=0;o.hid=0;return false}return true};
HZP.rgslam=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const dir=e.x<o.x?-1:1;g.save();g.translate(o.x,o.y-18);g.scale(dir,1);g.rotate(Math.sin(clock*20)*.05);rgMon(.9,clock*10,1,1);g.restore();
  // 붙잡은 팔
  g.save();g.strokeStyle='#5a0a06';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(o.x,o.y-30);g.quadraticCurveTo((o.x+e.x)/2,(o.y+e.y)/2-40,e.x,e.y-4);g.stroke();g.strokeStyle='#ff4a3a';g.lineWidth=3;g.stroke();g.restore()};

// ---------- 3) ULT 광폭화 · 대지 분쇄 ----------
function rgUlt(o,t){HZ.push({k:'rgult',o,t:0,n:0,x:o.x,y:o.y,sx:o.x,sy:o.y,tx:o.x,ty:o.y,j0:.5});SFXa('rg_rage');SFXa('rg_roar');o.onc=1;o.hid=1;shake=Math.max(shake,14);rgSteam(o.x,o.y,20);ring(o.x,o.y,10,160,'#ff2a2a',10,.6)}
HZX.rgult=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;const JD=.62;
  if(h.n<3&&h.t>=h.j0){const k=h.t-h.j0;if(!h.air){h.air=1;const e=EN.filter(x=>!x.hid).sort((p,q)=>Math.hypot(p.x-h.x,p.y-h.y)-Math.hypot(q.x-h.x,q.y-h.y))[0];h.sx=h.x;h.sy=h.y;
      h.tx=e?clamp(e.x+e.dx*e.sp*.3,40,A-40):h.x;h.ty=e?clamp(e.y+e.dy*e.sp*.3,40,A-40):h.y;SFXa('rg_leap')}
    const u=Math.min(1,k/JD);h.x=h.sx+(h.tx-h.sx)*u;h.y=h.sy+(h.ty-h.sy)*u;h.z=Math.sin(Math.PI*u)*150;
    if(u>=1){h.air=0;h.z=0;h.n++;const last=h.n==3,R=last?175:125;SFXa('rg_land');shake=Math.max(shake,last?28:18);hs=last?.14:.08;FX.push({k:'rgcrater',x:h.x,y:h.y+30,r:R*.75,l:2.4,m:2.4});ring(h.x,h.y+30,10,R,'#ff2a2a',12,.5);ring(h.x,h.y+30,10,R*.7,'#ffb070',5,.4);rgDebris(h.x,h.y+30,24,340);rgSteam(h.x,h.y,10);
      EN.forEach(e=>{if(e.hid||e.jump)return;const d=Math.hypot(e.x-h.x,e.y-(h.y+30));if(d<R+e.r){hurt(e,last?10:7,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.35);const a=Math.atan2(e.y-h.y,e.x-h.x);e.flyA=a;e.flyT=.2;e.flyV=last?800:550}});h.j0=h.t+.28}}
  if(h.n>=3&&h.t>h.j0){o.x=clamp(h.x,o.r,A-o.r);o.y=clamp(h.y+20,o.r,A-o.r);o.onc=0;o.hid=0;return false}
  o.x=clamp(h.x,o.r,A-o.r);o.y=clamp(h.y+20,o.r,A-o.r);return true};
HZD.rgult=h=>{if(!h.air)return;const u=clamp((h.t-(h.j0||0))/.62,0,1);g.save();g.translate(h.tx,h.ty+30);g.globalAlpha=.25+.5*u;g.fillStyle='#000';g.beginPath();g.ellipse(0,0,40+70*u,(40+70*u)*.35,0,0,TAU);g.fill();
  g.strokeStyle='#ff2a2a';g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-clock*60;g.beginPath();g.ellipse(0,0,120,42,0,0,TAU);g.stroke();g.setLineDash([]);g.restore()};
HZP.rgult=h=>{const o=h.o;if(o.dead)return;const z=h.z||0,s=1.75+(h.t<.4?-.6*(1-h.t/.4):0)+z/600,dir=h.tx<h.sx?-1:1;
  g.save();g.translate(h.x,h.y-z);g.globalCompositeOperation='lighter';glow('#ff2a10',0,0,120,.35);g.restore();
  g.save();g.translate(h.x,h.y-z);g.scale(dir,1);rgMon(s,clock*(h.air?4:12),1,h.air?1:.2);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
