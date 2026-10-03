// ===== extra6.js : 김지우 (새 캐릭터 · 저택 괴물 술래잡기) =====

const NEW16=['oni_door','oni_scare','oni_growl','oni_closet','oni_burst','oni_ult','oni_step','oni_heart','oni_grab'];
NEW16.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='oni_step'||n=='oni_heart'?4:3)});
Object.assign(SLB,{oni_door:'김지우 · 문 삐걱 쾅',oni_scare:'김지우 · 깜짝 놀래키기',oni_growl:'김지우 · 괴물 으르렁',oni_closet:'김지우 · 옷장 덜컹',oni_burst:'김지우 · 옷장 박차기',oni_ult:'김지우 · 추격 시작',oni_step:'김지우 · 괴물 발소리',oni_heart:'김지우 · 심장 소리',oni_grab:'김지우 · 붙잡기'});
const ONSK=[
  {n:'문 너머',w:.4,cd:8,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<600,f:(o,t)=>onDoor(o,t)},
  {n:'옷장 속',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>onCloset(o,t)},
  {n:'끝없는 추격',w:.8,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>onUlt(o,t)}];
DEF.push({name:'김지우',gl:'지',k:'oni',r:27,sp:206,col:'#4d6bff',hi:'#dce3ff',dk:'#0a1040',alt:{col:'#ff3b4a',hi:'#ffd8dc',dk:'#3a0408'},alt2:{col:'#2ee6c5',hi:'#d8fff7',dk:'#053a30'},sk:ONSK});
INFO['김지우']={st:[8,7,6,6,7,10],p:'공포 · 체력 50 이하인 적에게 주는 피해 15% 증가',
  sk:[['10 + 공포','상대 옆에 낡은 저택 문이 생기고, 문이 열리면 어둠 속에서 괴물이 튀어나와 낚아챔 · 맞으면 1.3초 동안 겁먹고 도망다님'],['10 + 묶음','내 자리 옷장에 숨었다가 상대 뒤에 생긴 옷장을 박차고 나와 붙잡음 · 숨어 있는 동안은 안 맞음'],['9×(잡힐 때마다)','불이 꺼지고 거대한 괴물로 변해 4.5초 동안 끝까지 쫓아감 · 잡힐 때마다 물어뜯음']]};

// ---------- 패시브 : 공포 ----------
const _hurtON=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='oni'&&t&&t!=o&&t.hp<50&&n>0){const a=[...arguments];a[1]=Math.round(n*1.15*10)/10;return _hurtON.apply(this,a)}return _hurtON.apply(this,arguments)};

// ---------- 공포 상태 : 괴물 반대쪽으로 도망 ----------
function onFear(e,x,y,d){e.fear=Math.max(e.fear||0,d);e.fx=x;e.fy=y;e.cast=null}
const _updON=update;update=function(dt){_updON(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD||CIN)return;
  F.forEach(f=>{if(!(f.fear>0)||f.dead)return;f.fear-=dt;f.gcd=Math.max(f.gcd,.2);if(f.cast&&!f.cast.s.ult)f.cast=null;const a=Math.atan2(f.y-f.fy,f.x-f.fx)+Math.sin(clock*9+f.i)*.5;f.dx=Math.cos(a);f.dy=Math.sin(a);
    if(Math.random()<dt*6)Pt.push({x:f.x+rnd(-f.r,f.r),y:f.y-f.r,vx:rnd(-30,30),vy:rnd(-80,-40),l:.5,m:.5,sh:13,col:'#9fd6ff',r:3,rot:Math.PI/2,gy:300})})};
const _lowON=lowHP;lowHP=function(f){_lowON(f);if(f.fear>0&&!f.dead&&!f.hid){const a=Math.min(1,f.fear/.3);g.save();g.translate(f.x+rnd(-1.5,1.5),f.y);g.globalAlpha=a;g.strokeStyle='#bfe0ff';g.lineWidth=2;g.lineCap='round';
  for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(k*9-3,-f.r-10);g.lineTo(k*9+1,-f.r-18);g.lineTo(k*9-2,-f.r-24);g.stroke()}g.restore()}};

// ---------- 괴물 이미지 (직접 넣은 그림) ----------
// images 폴더에 oni_idle (가만히) / oni_arms (팔 벌림) 그림을 넣으면 그걸 씀 (png · webp · jpg 다 됨)
// 흰 배경은 자동으로 지움 · 그림이 없으면 기본 괴물 그림을 씀
const ONI={idle:null,arms:null};
function oniLoad(key,names){if(!names.length)return;const im=new Image();im.onload=()=>{try{ONI[key]=oniCut(im)}catch(e){ONI[key]=im}};im.onerror=()=>oniLoad(key,names.slice(1));im.src=names[0]}
function oniCut(im){const W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);const D=x.getImageData(0,0,W,H),p=D.data;
  const br=i=>{const r=p[i],g2=p[i+1],b=p[i+2];return Math.min(r,g2,b)>205&&Math.max(r,g2,b)-Math.min(r,g2,b)<40};
  const seen=new Uint8Array(W*H),q=[];for(let i=0;i<W;i++){q.push(i,(H-1)*W+i)}for(let j=0;j<H;j++){q.push(j*W,j*W+W-1)}
  while(q.length){const k=q.pop();if(seen[k])continue;seen[k]=1;const i=k*4;if(p[i+3]<20||br(i)){p[i+3]=0;const X=k%W,Y=(k/W)|0;if(X>0)q.push(k-1);if(X<W-1)q.push(k+1);if(Y>0)q.push(k-W);if(Y<H-1)q.push(k+W)}}
  // 테두리 부드럽게
  for(let k=0;k<W*H;k++){const i=k*4;if(!p[i+3])continue;const X=k%W,Y=(k/W)|0;let n=0;if(X>0&&!p[i-1])n++;if(X<W-1&&!p[i+7])n++;if(Y>0&&!p[i-W*4+3])n++;if(Y<H-1&&!p[i+W*4+3])n++;if(n&&Math.min(p[i],p[i+1],p[i+2])>170)p[i+3]=120}
  x.putImageData(D,0,0);let x0=W,y0=H,x1=0,y1=0;for(let Y=0;Y<H;Y++)for(let X=0;X<W;X++)if(p[(Y*W+X)*4+3]>20){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
  if(x1<=x0||y1<=y0)return c;const o=document.createElement('canvas');o.width=x1-x0+1;o.height=y1-y0+1;o.getContext('2d').drawImage(c,x0,y0,o.width,o.height,0,0,o.width,o.height);return o}
['idle','arms'].forEach(k=>{const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+'oni_'+k+'.'+e)));oniLoad(k,L)});
function oniImg(s,ph,al,arm){s=Math.max(.02,s);const im=arm>.5&&ONI.arms?ONI.arms:(ONI.idle||ONI.arms);if(!im)return false;const H=118*s,W=H*im.width/im.height,bob=Math.abs(Math.sin(ph))*5*s;
  g.save();g.globalAlpha=al==null?1:al;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,46*s,W*.38,9*s,0,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow('#5a3cff',0,46*s-H*.5,H*.55,.18*(al==null?1:al));g.restore();
  g.translate(0,46*s-bob);g.rotate(Math.sin(ph)*.05);g.drawImage(im,-W/2,-H,W,H);g.restore();return true}

// ---------- 그림 : 푸른 그림자 도깨비 (오리지널) ----------
function onMon(s,ph,al,face,arm){if(oniImg(s,ph,al,arm))return;g.save();g.scale(s,s);g.globalAlpha=al==null?1:al;const sw=Math.sin(ph),sw2=Math.sin(ph+Math.PI);
  g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,46,34,9,0,0,TAU);g.fill();
  // 다리 (가늘고 짧게)
  g.strokeStyle='#060818';g.lineWidth=7;g.lineCap='round';[[-9,sw],[9,sw2]].forEach(([x,w])=>{g.beginPath();g.moveTo(x,24);g.lineTo(x+w*6,36);g.lineTo(x+w*9,46);g.stroke()});
  // 긴 팔
  const armP=(sd,w)=>{const sx=sd*20,sy=-6,ex=sd*(30+(arm||0)*14)+w*8,ey=34-(arm||0)*30;return[sx,sy,sd*34,8+w*4,ex,ey]};
  [[-1,sw2],[1,sw]].forEach(([sd,w])=>{const [sx,sy,cx,cy,ex,ey]=armP(sd,w);g.strokeStyle='#060818';g.lineWidth=8;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo(cx,cy,ex,ey);g.stroke();g.strokeStyle='#2a3a9a';g.lineWidth=2;g.stroke();
    // 손톱
    g.strokeStyle='#e8ecf6';g.lineWidth=2.2;for(let k=-1;k<=1;k++){const a=Math.atan2(ey-cy,ex-cx)+k*.45;g.beginPath();g.moveTo(ex,ey);g.quadraticCurveTo(ex+Math.cos(a)*7,ey+Math.sin(a)*7,ex+Math.cos(a+.5*sd)*12,ey+Math.sin(a+.5*sd)*12);g.stroke()}});
  // 몸 (구부정 · 연기처럼 해진 밑단)
  const bg=g.createLinearGradient(0,-40,0,30);bg.addColorStop(0,'#1d2a6a');bg.addColorStop(.6,'#0d1438');bg.addColorStop(1,'#05060f');g.fillStyle=bg;
  g.beginPath();g.moveTo(-22,-14);g.quadraticCurveTo(-28,8,-20,26);for(let k=0;k<=8;k++){const x=-20+k*5,y=26+(k%2?6:0)+Math.sin(clock*8+k)*2;g.lineTo(x,y)}g.quadraticCurveTo(28,8,22,-14);g.quadraticCurveTo(0,-26,-22,-14);g.fill();
  g.strokeStyle='#4d6bff';g.globalAlpha=(al==null?1:al)*.7;g.lineWidth=1.6;g.stroke();g.globalAlpha=al==null?1:al;
  // 머리
  g.save();g.translate(0,-30);const hg=g.createRadialGradient(-6,-8,2,0,0,22);hg.addColorStop(0,'#2b3b8e');hg.addColorStop(1,'#080b22');g.fillStyle=hg;g.beginPath();g.ellipse(0,0,19,17,0,0,TAU);g.fill();g.strokeStyle='#4d6bff';g.lineWidth=1.5;g.stroke();
  // 뿔
  [-1,1].forEach(sd=>{g.fillStyle='#d9d2c0';g.strokeStyle='#3a3226';g.lineWidth=1.2;g.beginPath();g.moveTo(sd*9,-12);g.quadraticCurveTo(sd*20,-24,sd*15,-34);g.quadraticCurveTo(sd*13,-22,sd*3,-14);g.closePath();g.fill();g.stroke();g.fillStyle='#3a3226';g.beginPath();g.moveTo(sd*15,-34);g.lineTo(sd*16.5,-28);g.lineTo(sd*13,-29);g.closePath();g.fill()});
  // 눈 (빛나는 가는 눈)
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#7fa8ff',sd*7,-3,10,.9);g.fillStyle='#ffffff';g.beginPath();g.moveTo(sd*2,-2);g.quadraticCurveTo(sd*7,-7,sd*13,-5);g.quadraticCurveTo(sd*7,-1,sd*2,-2);g.fill()});g.restore();
  // 입 (톱니 이빨 미소)
  const op=face?4+face*6:3;g.fillStyle='#3a0610';g.beginPath();g.moveTo(-12,5);g.quadraticCurveTo(0,10+op,12,5);g.quadraticCurveTo(0,8,-12,5);g.fill();
  g.fillStyle='#f4f0e6';for(let k=0;k<7;k++){const x=-10+k*3.3,y=5.5+Math.sin((k+.5)/7*Math.PI)*2;g.beginPath();g.moveTo(x,y);g.lineTo(x+1.6,y+3+op*.4);g.lineTo(x+3.2,y);g.fill()}
  g.restore();g.restore()}
// 저택 문
function onDoorArt(open,s,dark){g.save();g.scale(s,s);
  g.fillStyle='rgba(0,0,0,.45)';g.fillRect(-26,38,56,8);
  g.fillStyle='#2a1a10';g.fillRect(-28,-50,56,92);g.strokeStyle='#120a05';g.lineWidth=2;g.strokeRect(-28,-50,56,92);
  g.fillStyle='#000';g.fillRect(-22,-44,44,84);
  if(dark){g.save();g.beginPath();g.rect(-22,-44,44,84);g.clip();g.globalCompositeOperation='lighter';glow('#3a4fff',0,-6,40,.25*dark);g.restore()}
  // 문짝 (열리면 좁아짐)
  const w=44*Math.max(.06,Math.cos(open*1.35));const dg=g.createLinearGradient(-22,0,-22+w,0);dg.addColorStop(0,'#6a4426');dg.addColorStop(1,'#3e2614');g.fillStyle=dg;g.fillRect(-22,-44,w,84);g.strokeStyle='#1c1008';g.lineWidth=1.5;g.strokeRect(-22,-44,w,84);
  if(w>12){g.strokeStyle='rgba(0,0,0,.4)';g.strokeRect(-22+w*.15,-38,w*.7,34);g.strokeRect(-22+w*.15,0,w*.7,34);g.fillStyle='#d4af37';g.beginPath();g.arc(-22+w*.85,2,2.6,0,TAU);g.fill()}
  g.restore()}
// 옷장
function onClosetArt(s,shake,open){g.save();g.scale(s,s);g.translate(Math.sin(clock*60)*shake*2,0);g.rotate(Math.sin(clock*45)*shake*.03);
  g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(0,40,30,7,0,0,TAU);g.fill();
  g.fillStyle='#4a2e18';g.fillRect(-26,-46,52,86);g.strokeStyle='#1a0e06';g.lineWidth=2;g.strokeRect(-26,-46,52,86);g.fillStyle='#5e3c20';g.fillRect(-28,-50,56,7);g.strokeRect(-28,-50,56,7);
  const ow=open||0;[-1,1].forEach(sd=>{const w=22*Math.max(.1,1-ow);g.fillStyle='#6a4426';g.fillRect(sd<0?-23:23-w,-41,w,76);g.strokeStyle='#1a0e06';g.lineWidth=1.4;g.strokeRect(sd<0?-23:23-w,-41,w,76);
    if(w>10){g.strokeStyle='rgba(0,0,0,.35)';for(let k=0;k<4;k++){g.beginPath();g.moveTo(sd<0?-21:23-w+2,-30+k*8);g.lineTo(sd<0?-23+w-2:21,-30+k*8);g.stroke()}g.fillStyle='#d4af37';g.beginPath();g.arc(sd*3,2,2,0,TAU);g.fill()}});
  if(ow>0){g.fillStyle='#000';g.fillRect(-23+22*(1-ow),-41,44*ow*.95,76)}
  g.restore()}

// ---------- 아이콘 (네온 : 뿔 + 빛나는 눈 + 톱니 미소) ----------
EMB.oni=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*1.7)*.05);
  neon(D,1.7,()=>{g.beginPath();[-1,1].forEach(sd=>{g.moveTo(sd*7,-10);g.quadraticCurveTo(sd*16,-18,sd*12,-24);g.quadraticCurveTo(sd*10,-15,sd*2,-12)});
    g.moveTo(-12,6);g.quadraticCurveTo(0,14,12,6);for(let k=0;k<5;k++){const x=-9+k*4.5;g.moveTo(x,8.5+Math.sin((k+.5)/5*Math.PI)*2);g.lineTo(x+2.2,12.5);g.lineTo(x+4.4,9+Math.sin((k+1)/5*Math.PI)*2)}});
  g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#9fc0ff',sd*7,-2,9,.9);g.fillStyle='#ffffff';g.beginPath();g.moveTo(sd*2,-1);g.quadraticCurveTo(sd*7,-6,sd*12,-4);g.quadraticCurveTo(sd*7,0,sd*2,-1);g.fill()});g.restore()};

// ---------- 1) 문 너머 : 문이 열리면 괴물이 튀어나옴 ----------
function onDoor(o,t){const a=Math.atan2(t.y-o.y,t.x-o.x)+(Math.random()<.5?1:-1)*1.2,x=clamp(t.x+Math.cos(a)*70,40,A-40),y=clamp(t.y+Math.sin(a)*70,60,A-50);HZ.push({k:'ondoor',o,tg:t,t:0,x,y,hit:0});SFXa('oni_door')}
HZX.ondoor=(h,dt)=>{const o=h.o,e=h.tg;if(!e||e.dead)return h.t<1.6&&h.hit;
  if(!h.hit&&h.t<.6){if(h.da==null)h.da=Math.atan2(h.y-e.y,h.x-e.x);const tx=clamp(e.x+Math.cos(h.da)*70,40,A-40),ty=clamp(e.y+Math.sin(h.da)*70,60,A-50);h.x+=(tx-h.x)*Math.min(1,dt*6);h.y+=(ty-h.y)*Math.min(1,dt*6)}
  if(!h.hit&&h.t>=.75){h.hit=1;h.ht=h.t;SFXa('oni_scare');shake=Math.max(shake,16);hs=.08;FX.push({k:'onred',l:.3,m:.3});
    if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<210){hurt(e,10,o,e.x,e.y,0,1);onFear(e,h.x,h.y,1.3);e.x=clamp(e.x+(e.x-h.x)*.25,e.r,A-e.r);e.y=clamp(e.y+(e.y-h.y)*.25,e.r,A-e.r);
      for(let i=0;i<4;i++){const a=Math.atan2(e.y-h.y,e.x-h.x)+(i-1.5)*.25;FX.push({k:'onclaw',x:e.x,y:e.y,a,l:.35,m:.35})}}}
  return h.t<1.7};
HZD.ondoor=h=>{const fa=clamp((1.7-h.t)/.35,0,1),s=back(clamp(h.t/.22,0,1)),op=clamp((h.t-.35)/.3,0,1);g.save();g.translate(h.x,h.y);g.globalAlpha=fa;onDoorArt(op,s*.95,op);
  // 어둠 속 눈
  if(op>.3&&!h.hit){g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>{glow('#9fc0ff',sd*7,-14,8,(op-.3)*1.3)});g.restore()}g.restore()};
HZP.ondoor=h=>{if(!h.hit)return;const e=h.tg,q=h.t-h.ht,fa=clamp((1-q)/.35,0,1);if(q>1)return;
  const tx=e&&!e.dead?e.x:h.x,ty=e&&!e.dead?e.y:h.y,u=Math.min(1,q/.1),x=h.x+(tx-h.x)*.55*u,y=h.y-6+(ty-h.y)*.55*u,s=(.9+.9*back(Math.min(1,q/.12)))*(1-Math.max(0,q-.5)*.6);
  g.save();g.translate(x,y);g.rotate(Math.atan2(ty-h.y,tx-h.x)*.15);onMon(s,clock*10,fa,1,1);g.restore()};
FXD.onred=x=>{const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.35;g.fillStyle='#ff1030';g.fillRect(-300,-300,A+600,A+600);g.restore()};
FXD.onclaw=x=>{const p=1-x.l/x.m,a=1-p;g.save();g.translate(x.x,x.y);g.rotate(x.a+Math.PI/2);g.globalCompositeOperation='lighter';g.strokeStyle='rgba(180,200,255,'+a+')';g.lineWidth=3*a+1;g.lineCap='round';
  g.beginPath();g.moveTo(-6,-30*Math.min(1,p*4));g.quadraticCurveTo(4,0,-6,30*Math.min(1,p*4));g.stroke();g.restore()};

// ---------- 2) 옷장 속 : 숨었다가 상대 뒤 옷장에서 튀어나옴 ----------
function onCloset(o,t){const a=Math.atan2(t.y-o.y,t.x-o.x),x2=clamp(t.x+Math.cos(a)*72,40,A-40),y2=clamp(t.y+Math.sin(a)*72,60,A-50);
  HZ.push({k:'oncloset',o,tg:t,t:0,x1:o.x,y1:o.y,x2,y2,ph:0});SFXa('oni_closet');o.hid=1;o.onc=1;wkPuffDark(o.x,o.y)}
function wkPuffDark(x,y){for(let i=0;i<10;i++){const a=rnd(0,TAU),v=rnd(30,90),l=rnd(.4,.7);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:3,col:'#10142e',r:rnd(10,16),gr:20,a0:.6,fr:.2})}}
HZX.oncloset=(h,dt)=>{const o=h.o;let e=h.tg;if(o.dead){o.hid=0;o.onc=0;return false}o.gcd=Math.max(o.gcd,.3);o.cast=null;
  if(h.ph==0){o.hid=1;o.x=h.x1;o.y=h.y1;if(e&&!e.dead&&h.t<.75){const a=Math.atan2(e.y-h.y1,e.x-h.x1),tx=clamp(e.x+Math.cos(a)*72,40,A-40),ty=clamp(e.y+Math.sin(a)*72,60,A-50);h.x2+=(tx-h.x2)*Math.min(1,dt*5);h.y2+=(ty-h.y2)*Math.min(1,dt*5)}
    if(h.t>=.55&&!h.k2){h.k2=1;SFXa('oni_closet')}
    if(h.t>=1.05){h.ph=1;h.bt=h.t;o.hid=0;o.onc=0;o.x=h.x2;o.y=h.y2+8;SFXa('oni_burst');shake=Math.max(shake,14);hs=.07;for(let i=0;i<14;i++)Pt.push({x:h.x2+rnd(-20,20),y:h.y2+rnd(-30,20),vx:rnd(-220,220),vy:rnd(-260,-40),l:rnd(.5,.8),m:.8,sh:2,col:['#6a4426','#4a2e18','#8a5a30'][i%3],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),gy:500,fr:.4});
      if(e&&!e.dead&&!e.hid&&!e.jump&&Math.hypot(e.x-h.x2,e.y-h.y2)<150){hurt(e,10,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.6);e.cast=null;SFXa('oni_grab');h.gr=e;ring(e.x,e.y,8,70,'#4d6bff',6,.35)}}}
  if(h.ph==1&&h.gr&&!h.gr.dead&&h.t<h.bt+.5){const e2=h.gr,a=Math.atan2(o.y-e2.y,o.x-e2.x);e2.x=clamp(e2.x+Math.cos(a)*60*dt,e2.r,A-e2.r);e2.y=clamp(e2.y+Math.sin(a)*60*dt,e2.r,A-e2.r)}
  return h.ph==0||h.t<h.bt+.8};
HZD.oncloset=h=>{const fa=h.ph==1?clamp(1-(h.t-h.bt)/.8,0,1):1;
  // 내 옷장
  {const s=h.ph==0?back(clamp(h.t/.2,0,1)):clamp(1-(h.t-h.bt)/.25,0,1);if(s>0){g.save();g.translate(h.x1,h.y1-8);g.globalAlpha=fa;onClosetArt(.82*s,h.ph==0&&h.t>.25?.6+.4*Math.sin(h.t*20):0,0);g.restore()}}
  // 상대 뒤 옷장
  {const s=back(clamp((h.t-.25)/.25,0,1)),op=h.ph==1?clamp((h.t-h.bt)/.08,0,1):0;if(s>0){g.save();g.translate(h.x2,h.y2-8);g.globalAlpha=fa;onClosetArt(.82*s,h.ph==0&&h.t>.6?.5+.5*Math.sin(h.t*30):0,op);
    if(h.ph==0&&h.t>.6){g.save();g.globalCompositeOperation='lighter';[-1,1].forEach(sd=>glow('#9fc0ff',sd*5,-10,6,.6+.4*Math.sin(clock*12)));g.restore()}g.restore()}}};
HZP.oncloset=h=>{if(h.ph!=1)return;const q=h.t-h.bt;if(q>.55)return;const o=h.o,e=h.gr,fa=clamp((.55-q)/.2,0,1),tx=e&&!e.dead?e.x:h.x2,ty=e&&!e.dead?e.y:h.y2;
  g.save();g.translate(h.x2+(tx-h.x2)*.3,h.y2-14+(ty-h.y2)*.3);onMon(.75+.35*back(Math.min(1,q/.12)),clock*12,fa,1,1);g.restore()};
// 숨은 동안 안 맞음 (hid 상태)
const _ballON=ball;ball=function(f,t){if(f.onc)return;return _ballON(f,t)};

// ---------- 3) ULT 끝없는 추격 ----------
function onUlt(o,t){HZ.push({k:'onult',o,t:0,x:o.x,y:o.y,v:120,tg:t,ph:0,cd:0,stp:0,hb:0,fa:0});SFXa('oni_ult');o.hid=1;o.onc=1;shake=Math.max(shake,12);wkPuffDark(o.x,o.y)}
HZX.onult=(h,dt,EN)=>{const o=h.o,D=4.5;if(o.dead){o.hid=0;o.onc=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;
  if(h.t<D){o.hid=1;o.onc=1;let e=h.tg;if(!e||e.dead||e.hid){e=EN.filter(x=>!x.hid).sort((p,q)=>Math.hypot(p.x-h.x,p.y-h.y)-Math.hypot(q.x-h.x,q.y-h.y))[0];h.tg=e}
    h.v=Math.min(340,120+h.t*70);h.cd-=dt;
    if(e&&h.t>.5){const a=Math.atan2(e.y-h.y,e.x-h.x);let da=a-(h.a||a);da=Math.atan2(Math.sin(da),Math.cos(da));h.a=(h.a||a)+clamp(da,-6*dt,6*dt);h.x=clamp(h.x+Math.cos(h.a)*h.v*dt,30,A-30);h.y=clamp(h.y+Math.sin(h.a)*h.v*dt,40,A-30);
      // 쫓기는 쪽은 겁먹고 도망
      EN.forEach(x=>{if(Math.hypot(x.x-h.x,x.y-h.y)<260)onFear(x,h.x,h.y,.25)});
      if(h.cd<=0&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<e.r+34){h.cd=.6;hurt(e,9,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.35);SFXa('oni_grab');shake=Math.max(shake,14);FX.push({k:'onred',l:.25,m:.25});
        const ka=Math.atan2(e.y-h.y,e.x-h.x);e.x=clamp(e.x+Math.cos(ka)*50,e.r,A-e.r);e.y=clamp(e.y+Math.sin(ka)*50,e.r,A-e.r);for(let i=0;i<3;i++)FX.push({k:'onclaw',x:e.x,y:e.y,a:ka+(i-1)*.3,l:.35,m:.35});h.bite=.25}}
    h.bite=Math.max(0,(h.bite||0)-dt);
    // 발소리 · 심장소리 (빨라짐)
    h.stp-=dt;if(h.t>.5&&h.stp<=0){h.stp=Math.max(.17,.42-h.t*.06);SFXa('oni_step');shake=Math.max(shake,3);dustP(h.x,h.y+40,60)}
    h.hb-=dt;if(h.hb<=0){h.hb=Math.max(.32,.7-h.t*.09);SFXa('oni_heart')}
    if(h.t>2&&!h.gw){h.gw=1;SFXa('oni_growl')}
    o.x=h.x;o.y=h.y;return true}
  if(!h.end){h.end=1;o.hid=0;o.onc=0;o.x=h.x;o.y=h.y;wkPuffDark(h.x,h.y);ring(h.x,h.y,8,90,'#4d6bff',6,.4)}
  return h.t<D+.5};
HZP.onult=h=>{const D=4.5,a=Math.min(1,h.t/.5)*clamp((D+.4-h.t)/.5,0,1),o=h.o;
  if(a>0){g.save();g.globalAlpha=a*.88;const EN=F.filter(x=>x!=o&&!x.dead&&!x.hid);
    // 어둠 (적 주변만 조금 보임)
    g.fillStyle='#03040b';g.beginPath();g.rect(-300,-300,A+600,A+600);EN.forEach(e=>{g.moveTo(e.x+70,e.y);g.arc(e.x,e.y,70,0,TAU,true)});g.fill('evenodd');
    g.globalAlpha=a;EN.forEach(e=>{const gr=g.createRadialGradient(e.x,e.y,40,e.x,e.y,90);gr.addColorStop(0,'rgba(3,4,11,0)');gr.addColorStop(.75,'rgba(3,4,11,.88)');gr.addColorStop(1,'rgba(3,4,11,.88)');g.fillStyle=gr;g.beginPath();g.arc(e.x,e.y,90,0,TAU);g.fill()});
    // 심장 박동 테두리
    const hbp=Math.max(0,Math.sin(h.t*Math.PI*2*(1.4+h.t*.3)))**8;g.strokeStyle='rgba(200,10,30,'+(.25+.35*hbp)*a+')';g.lineWidth=18+hbp*10;g.strokeRect(0,0,A,A);g.restore()}
  if(h.t<D){const s=1.25+.15*Math.min(1,h.t/.4),dir=Math.cos(h.a||0)<0?-1:1;g.save();g.translate(h.x,h.y);g.globalCompositeOperation='lighter';glow('#3a4fff',0,0,90,.35);g.restore();
    g.save();g.translate(h.x,h.y);g.scale(dir,1);g.rotate(Math.sin(clock*16)*.05);onMon(s*(h.t<.4?back(h.t/.4):1),clock*(6+h.v/30),1,h.bite>0?1:.2,h.bite>0?1:0);g.restore()}};

// ---------- 새 캐릭터 칸 추가 (메뉴) ----------
{const i=DEF.length-1,d=DEF[i],gr=$('#grid');if(gr&&!gr.querySelector('[data-i="'+i+'"]')){gr.insertAdjacentHTML('beforeend',`<button class="tile" data-i="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b><em class="b1">P1</em><em class="b2">P2</em><em class="b3">P3</em></button>`);
  const t=gr.querySelector('[data-i="'+i+'"]');t.addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL[ACT]=i;ACT=(ACT+1)%TSIZE;paintMenu();return}SEL[ACT]=i;ACT=(ACT+1)%MODE;initMenu()})}}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
document.querySelectorAll('#grid .tile').forEach(t=>paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50));
