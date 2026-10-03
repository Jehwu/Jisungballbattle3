// ===== game7.js : 김민채 • 게이모드 =====
const NEW7=['bl_throw','bl_charm','bl_string','bl_link','bl_ult','bl_page','bl_end'];
NEW7.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{bl_throw:'게이모드 · BL 영업 던지기',bl_charm:'게이모드 · 입덕 (두근)',bl_string:'게이모드 · 빨간 실',bl_link:'게이모드 · 커플링 성립',bl_ult:'게이모드 · 정주행 시작',bl_page:'게이모드 · 다음 화',bl_end:'게이모드 · 완결'});

DEF.push({name:'김민채 • 게이모드',gl:'덕',k:'bl',heavy:1,vof:0,r:34,sp:165,col:'#ff6fd0',hi:'#ffe0f5',dk:'#4a0f3a',alt:{col:'#a98bff',hi:'#efe6ff',dk:'#24104a'},alt2:{col:'#5ec8ff',hi:'#dcf4ff',dk:'#08324a'},sk:[
  {n:'BL 영업',w:.6,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>blThrow(o,t)},
  {n:'커플링 성립',w:.6,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>blLink(o,t)},
  {n:'밤샘 정주행',w:1.8,ult:1,f:(o,t)=>blBinge(o,t)}]});
INFO['김민채 • 게이모드']={st:[6,9,3,8,7,8],p:'덕질 에너지 · 받는 피해 25% 감소',sk:[['8+입덕','BL 웹툰을 던져 영업 · 맞으면 입덕해서 민채 쪽으로 끌려오고 잠깐 스킬을 못 씀'],['9','빨간 실로 운명의 상대와 엮음 · 서로 끌려가 부딪히면 쾅 · 1대1이면 최애 팻말로 끌려감'],['1.5×8+6','꽃배경이 펼쳐지고 한 화씩 넘길 때마다 하트 발사 · 완결 나면 큰 하트 폭발 + 체력 회복']]};

// ---------- 아이콘 : 하트 눈 돼지 (네온) ----------
function heartAt(x,y,s){g.save();g.translate(x,y);g.scale(s,s);heartPath();g.restore()}
EMB.bl=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,2.2,()=>{g.beginPath();g.moveTo(-15,-8);g.lineTo(-19,-20);g.lineTo(-8,-14);g.moveTo(15,-8);g.lineTo(19,-20);g.lineTo(8,-14);g.moveTo(9,6);g.ellipse(0,6,9,6.5,0,0,TAU);g.moveTo(-8,11);g.quadraticCurveTo(-14,10,-15,2);g.moveTo(8,11);g.quadraticCurveTo(14,10,15,2)});
  g.fillStyle=D.hi;g.beginPath();g.ellipse(-3.3,6,1.6,2.4,0,0,TAU);g.ellipse(3.3,6,1.6,2.4,0,0,TAU);g.fill();
  const b=1+.12*Math.sin(clock*8);g.fillStyle=D.col;heartAt(-7.5,-1.5,.42*b);g.fill();heartAt(7.5,-1.5,.42*b);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow(D.col,-7.5,-2,7,.9);glow(D.col,7.5,-2,7,.9);g.restore();
  g.fillStyle='rgba(255,140,200,.4)';g.beginPath();g.ellipse(-14,4,3,1.8,0,0,TAU);g.fill();g.beginPath();g.ellipse(14,4,3,1.8,0,0,TAU);g.fill()};

// ---------- 공통 그림 ----------
function blBook(D,s){g.save();g.scale(s,s);g.lineJoin='round';g.fillStyle='#fff7fb';g.strokeStyle='#2a0f22';g.lineWidth=1.8;
  g.beginPath();g.moveTo(0,-9);g.quadraticCurveTo(-7,-12,-14,-9);g.lineTo(-14,10);g.quadraticCurveTo(-7,7,0,10);g.quadraticCurveTo(7,7,14,10);g.lineTo(14,-9);g.quadraticCurveTo(7,-12,0,-9);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(0,-9);g.lineTo(0,10);g.stroke();g.fillStyle=D.col;heartAt(-7,0,.38);g.fill();heartAt(7,0,.38);g.fill();g.restore()}
function sparkleBG(a,t,D){g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalAlpha=a*.55;const gr=g.createLinearGradient(0,0,0,A);gr.addColorStop(0,'rgba(255,190,230,.35)');gr.addColorStop(1,'rgba(200,170,255,.25)');g.fillStyle=gr;g.fillRect(0,0,A,A);
  g.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const x=(i*131+40)%A,y=((i*77+t*40*(1+i%3))%(A+80))-40,r=10+(i%5)*6;g.globalAlpha=a*(.12+.1*Math.sin(t*3+i));g.fillStyle=i%3?'#ffd6ee':'#ffffff';g.beginPath();g.arc(x,y,r,0,TAU);g.fill()}
  g.globalAlpha=a*.8;for(let i=0;i<14;i++){const x=(i*173+90)%A,y=(i*97+t*30)%A,s=3+(i%3)*2+Math.sin(t*6+i)*1.5;g.fillStyle='#ffffff';g.save();g.translate(x,y);g.beginPath();g.moveTo(0,-s*2);g.quadraticCurveTo(0,0,s*2,0);g.quadraticCurveTo(0,0,0,s*2);g.quadraticCurveTo(0,0,-s*2,0);g.quadraticCurveTo(0,0,0,-s*2);g.fill();g.restore()}
  g.restore()}

// ---------- 1) BL 영업 ----------
function blThrow(o,t){const d=dist(o,t)/520,a=Math.atan2(t.y+t.dy*t.sp*d-o.y,t.x+t.dx*t.sp*d-o.x);HZ.push({k:'blbook',o,t:0,x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,done:0});SFXa('bl_throw')}
HZX.blbook=(h,dt,EN)=>{
  if(h.done){const e=h.e;if(e&&!e.dead&&!e.hid&&h.t-h.dt<1){const a=ang(e,h.o);e.dx=Math.cos(a);e.dy=Math.sin(a)}return h.t<h.dt+1.1}
  h.x+=Math.cos(h.a)*520*dt;h.y+=Math.sin(h.a)*520*dt;emit(14,dt,()=>heartP(h.x,h.y,rnd(-20,20),rnd(-40,-10),rnd(3,5),h.o.d.col));
  for(const e of EN){if(e.hid||e.jump)continue;if(Math.hypot(e.x-h.x,e.y-h.y)<e.r+14){h.done=1;h.dt=h.t;h.e=e;hurt(e,8,h.o,e.x,e.y,0,0);e.cast=null;e.gcd=Math.max(e.gcd,.6);SFXa('bl_charm');ft(e.x,e.y-e.r-34,'영업 당함!',h.o.d.col,26);spark(e.x,e.y,'heart',16,220);return true}}
  if(h.x<-20||h.x>A+20||h.y<-20||h.y>A+20)return false;return h.t<2;
};
HZD.blbook=h=>{if(!h.done){g.save();g.translate(h.x,h.y);g.rotate(Math.sin(h.t*14)*.3);g.save();g.globalCompositeOperation='lighter';glow(h.o.d.col,0,0,26,.5);g.restore();blBook(h.o.d,1.2);g.restore();return}
  const e=h.e,o=h.o;if(!e||e.dead)return;const q=h.t-h.dt;
  const fa=clamp(1-(q-.8)/.3,0,1);g.save();g.globalAlpha=fa;for(let i=0;i<3;i++){const an=clock*4+i*TAU/3;g.fillStyle=o.d.col;heartAt(e.x+Math.cos(an)*(e.r+10),e.y-e.r*.3+Math.sin(an)*6,.5+.1*Math.sin(clock*10+i));g.fill()}g.restore()};

// ---------- 2) 커플링 성립 ----------
function blLink(o,t){const EN=F.filter(x=>x!=o&&!x.dead&&!x.hid),a=t,b=EN.filter(x=>x!=t).sort((p,q)=>dist(t,p)-dist(t,q))[0];
  let sx,sy;if(!b){const an=Math.atan2(A/2-t.y,A/2-t.x)+rnd(-.6,.6);sx=clamp(t.x+Math.cos(an)*210,50,A-50);sy=clamp(t.y+Math.sin(an)*210,50,A-50)}
  HZ.push({k:'bllink',o,a,b:b||null,sx,sy,t:0,done:0});SFXa('bl_string');ft(t.x,t.y-t.r-34,'운명의 상대?!','#ff8ad8',24)}
HZX.bllink=(h,dt,EN)=>{
  const a=h.a,b=h.b;if(!a||a.dead)return false;if(b&&b.dead){h.b=null;h.sx=b.x;h.sy=b.y}
  if(!h.done){const bx=h.b?h.b.x:h.sx,by=h.b?h.b.y:h.sy,d=Math.hypot(bx-a.x,by-a.y),u=Math.min(1,h.t/.35),pull=(220+h.t*420)*u*dt;
    if(h.t>.35&&!a.hid&&!a.jump){const an=Math.atan2(by-a.y,bx-a.x);a.x=clamp(a.x+Math.cos(an)*pull,a.r,A-a.r);a.y=clamp(a.y+Math.sin(an)*pull,a.r,A-a.r);
      if(h.b&&!h.b.hid&&!h.b.jump){h.b.x=clamp(h.b.x-Math.cos(an)*pull,h.b.r,A-h.b.r);h.b.y=clamp(h.b.y-Math.sin(an)*pull,h.b.r,A-h.b.r);}}
    const rr=a.r+(h.b?h.b.r:22);if(h.t>.35&&d<rr+4||h.t>2.2){h.done=1;h.dt=h.t;const mx=(a.x+bx)/2,my=(a.y+by)/2;SFXa('bl_link');shake=Math.max(shake,12);hs=.06;
      [a,h.b].forEach(e=>{if(e&&!e.dead&&!e.hid){hurt(e,9,h.o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.3);e.cast=null}});
      ft(mx,my-46,'♡ 커플링 성립 ♡','#ff8ad8',30);for(let i=0;i<22;i++){const an=rnd(0,TAU),v=rnd(80,260);heartP(mx,my,Math.cos(an)*v,Math.sin(an)*v-60,rnd(4,8),['#ff6fd0','#ffb3e6','#ffffff'][i%3])}ring(mx,my,8,110,'#ff8ad8',8,.5)}}
  return !h.done||h.t<h.dt+.9;
};
HZD.bllink=h=>{
  const a=h.a;if(!a||a.dead)return;const D=h.o.d,bx=h.b?h.b.x:h.sx,by=h.b?h.b.y:h.sy,fa=h.done?clamp(1-(h.t-h.dt)/.6,0,1):Math.min(1,h.t/.2);
  if(!h.b){const s=h.done?1+(h.t-h.dt)*.3:back(clamp(h.t/.3,0,1));g.save();g.globalAlpha=fa;g.translate(bx,by);g.scale(s,s);g.fillStyle='#0006';g.beginPath();g.ellipse(0,26,18,5,0,0,TAU);g.fill();
    g.fillStyle='#8a6a4a';g.fillRect(-2,0,4,26);g.fillStyle='#fff7fb';g.strokeStyle='#2a0f22';g.lineWidth=2;g.beginPath();g.rect(-24,-30,48,32);g.fill();g.stroke();
    g.fillStyle=D.col;heartAt(-11,-14,.7);g.fill();g.font='700 12px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText('최애',10,-14);g.restore()}
  if(h.done)return;g.save();g.globalAlpha=fa;g.lineCap='round';const mx=(a.x+bx)/2,my=(a.y+by)/2+Math.sin(clock*8)*10;
  g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ff3b6e';g.globalAlpha=fa*.5;g.lineWidth=7;g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(mx,my,bx,by);g.stroke();g.restore();
  g.strokeStyle='#ff2d5a';g.lineWidth=2.5;g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(mx,my,bx,by);g.stroke();
  for(let i=1;i<4;i++){const u=i/4,v=1-u,x=v*v*a.x+2*v*u*mx+u*u*bx,y=v*v*a.y+2*v*u*my+u*u*by;g.fillStyle='#ff6fa0';heartAt(x,y,.45+.1*Math.sin(clock*9+i));g.fill()}
  g.restore()};

// ---------- 3) ULT 밤샘 정주행 ----------
function blBinge(o,t){HZ.push({k:'blbinge',o,t:0,ep:0,fin:0,shots:[]});SFXa('bl_ult')}
HZX.blbinge=(h,dt,EN)=>{
  const o=h.o;if(o.dead)return false;
  if(h.ep<8&&h.t>=.5+h.ep*.4&&EN.length){h.ep++;SFXa('bl_page');const e=EN[h.ep%EN.length];if(e&&!e.hid)h.shots.push({x:o.x,y:o.y-o.r,e,t:0,done:0})}
  h.shots.forEach(q=>{q.t+=dt;if(q.done)return;const e=q.e;if(e.dead||e.hid){q.done=1;return}const a=Math.atan2(e.y-q.y,e.x-q.x),v=520+q.t*400;q.x+=Math.cos(a)*v*dt;q.y+=Math.sin(a)*v*dt;q.a=a;
    if(Math.hypot(e.x-q.x,e.y-q.y)<e.r+10){q.done=1;hurt(e,1.5,o,e.x,e.y,0,0);spark(e.x,e.y,'heart',8,180)}});
  if(h.t>=4&&!h.fin){h.fin=1;SFXa('bl_end');shake=20;hs=.1;FX.push({k:'frost',l:.2,m:.2,c:'#ffd6ee'});const hv=Math.min(6,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-12,'+'+hv,'#7bff8a',26)}
    EN.forEach(e=>{if(e.hid)return;hurt(e,6,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.3);e.cast=null;for(let i=0;i<14;i++){const an=rnd(0,TAU),v=rnd(80,260);heartP(e.x,e.y,Math.cos(an)*v,Math.sin(an)*v-60,rnd(4,8),['#ff6fd0','#ffb3e6','#ffffff'][i%3])}});FX.push({k:'blend',l:1.3,m:1.3,c:o.d.col})}
  return h.t<4.9;
};
HZD.blbinge=h=>{const a=Math.min(1,h.t/.4)*clamp((4.9-h.t)/.5,0,1);sparkleBG(a,h.t,h.o.d)};
HZP.blbinge=h=>{
  const o=h.o,a=Math.min(1,h.t/.4)*clamp((4.9-h.t)/.5,0,1);
  if(!h.fin&&!o.dead){g.save();g.translate(o.x,o.y-o.r-26+Math.sin(clock*3)*2);g.rotate(-.12);g.fillStyle='#1a1d26';g.strokeStyle='#0b0d12';g.lineWidth=2;g.beginPath();g.rect(-11,-18,22,36);g.fill();g.stroke();
    g.fillStyle='#ffe0f5';g.fillRect(-9,-15,18,28);g.fillStyle=o.d.col;heartAt(0,-2,.5+.08*Math.sin(clock*10));g.fill();g.save();g.globalCompositeOperation='lighter';glow(o.d.col,0,0,30,.5);g.restore();g.restore()}
  h.shots.forEach(q=>{if(q.done)return;g.save();g.translate(q.x,q.y);g.rotate((q.a||0)+Math.PI/2);g.save();g.globalCompositeOperation='lighter';glow(o.d.col,0,0,22,.7);g.restore();g.fillStyle='#ff6fd0';g.strokeStyle='#fff';g.lineWidth=1.5;g.scale(.9,.9);heartPath();g.fill();g.stroke();g.restore()});
  g.save();g.globalAlpha=a;g.fillStyle='rgba(40,10,32,.75)';g.fillRect(A-150,14,136,40);g.strokeStyle=o.d.col;g.lineWidth=1.5;g.strokeRect(A-150,14,136,40);
  g.font='12px '+FB;g.textAlign='left';g.textBaseline='middle';g.fillStyle='#ffd6ee';g.fillText('밤샘 정주행',A-140,26);g.font='700 16px '+FB;g.fillStyle='#ffffff';g.fillText(h.fin?'완결!':(h.ep||1)+'화 보는 중',A-140,43);g.restore()};
FXD.blend=x=>{const p=1-x.l/x.m,s=back(clamp(p/.15,0,1)),a=clamp(x.l/.35,0,1);g.save();g.translate(A/2,A/2-30);g.scale(s,s);g.globalAlpha=a;
  g.save();g.globalCompositeOperation='lighter';glow(x.c,0,0,220,.4);g.restore();g.save();g.scale(4.5,4.5);heartPath();g.fillStyle='#ff6fd0';g.fill();g.lineWidth=1;g.strokeStyle='#ffffff';g.stroke();g.restore();
  g.font='44px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#2a0f22';g.strokeText('완결',0,-12);g.fillStyle='#ffffff';g.fillText('완결',0,-12);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ===== game8.js : 김티비 • 권루티비 =====
const NEW8=['kr_L','kr_side','kr_cross','kr_selfie','kr_pass','kr_beat','kr_swap','kr_tear','kr_shutter'];
NEW8.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{kr_L:'권루티비 · "L을 가져가"',kr_side:'권루티비 · "측면 대 측면"',kr_cross:'권루티비 · "크리스 크로스"',kr_selfie:'권루티비 · "셀카"',kr_pass:'권루티비 · L 넘기기',kr_beat:'권루티비 · 춤 비트',kr_swap:'권루티비 · 자리 바꾸기',kr_tear:'권루티비 · 사진 찢기',kr_shutter:'권루티비 · 찰칵'});
// 목소리 4개 : sounds 폴더에 같은 이름 mp3가 있으면 그걸, 없으면 krclips.js에 들어있는 걸 사용
(function krc(k){if(!window.KRCLIP){if(k<60)setTimeout(()=>krc(k+1),500);return}Object.keys(KRCLIP).forEach(n=>{if(AUD[n]&&AUD[n].ok)return;AUD[n]=new SoundPool(KRCLIP[n],2)})})(0);

DEF.push({name:'김티비 • 권루티비',gl:'L',k:'krl',vof:3,r:26,sp:210,col:'#5ce06a',hi:'#e2ffe6',dk:'#0b3a14',alt:{col:'#3f8cff',hi:'#dbe8ff',dk:'#0a1f4a'},alt2:{col:'#ff5c8a',hi:'#ffd8e3',dk:'#4a0a1f'},sk:[
  {n:'L을 가져가',w:.5,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>krL(o,t)},
  {n:'측면 대 측면',w:.5,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>krSide(o,t)},
  {n:'크리스 크로스 셀카',w:1.8,ult:1,f:(o,t)=>krUlt(o,t)}]});
INFO['김티비 • 권루티비']={st:[7,6,8,7,6,8],p:'L을 가져가 챌린지 장인 · 맞을수록 넘길 L이 쌓임',sk:[['6~18','최근 4초 동안 받은 피해를 L로 뭉쳐서 상대한테 떠넘김 · 많이 맞았을수록 세지고 체력도 조금 회복'],['3×4','상대를 붙잡고 측면 대 측면 춤을 강제로 같이 춤 · 춤추는 동안 상대는 아무것도 못 함'],['4×3+12','크리스 크로스로 상대와 자리를 세 번 맞바꾸고 · 셀카로 사진 속에 가둔 뒤 사진을 찢음']]};

// ---------- 아이콘 : L 손가락 (네온) ----------
EMB.krl=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*5)*.08);
  neon(D,2.2,()=>{g.beginPath();g.moveTo(-10,-20);g.quadraticCurveTo(-10,-23,-6,-23);g.quadraticCurveTo(-2,-23,-2,-20);g.lineTo(-2,0);g.lineTo(13,0);g.quadraticCurveTo(17,0,17,4);g.quadraticCurveTo(17,8,13,8);g.lineTo(-4,8);
    g.quadraticCurveTo(-14,8,-14,0);g.lineTo(-14,-6);g.quadraticCurveTo(-14,-10,-10,-10);g.closePath();g.moveTo(-10,-10);g.lineTo(-10,-20);g.moveTo(-7,14);g.quadraticCurveTo(0,19,7,14)});
  g.fillStyle=D.hi;g.font='700 9px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillText('L',8,-12);g.save();g.globalCompositeOperation='lighter';glow(D.col,8,-12,10,.6);g.restore()};

// ---------- 받은 피해 기록 (L 넘기기용) ----------
const _hurt8=hurt;hurt=function(t,n,o){const h0=t.hp;_hurt8.apply(this,arguments);const d=h0-t.hp;if(d>0&&t.d&&t.d.k=='krl'){t.dlog=(t.dlog||[]).filter(q=>clock-q[0]<4);t.dlog.push([clock,d])}};
function bigL(s,D){g.save();g.scale(s,s);g.lineJoin='round';g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,34,.6);g.restore();
  g.beginPath();g.moveTo(-12,-18);g.lineTo(-3,-18);g.lineTo(-3,6);g.lineTo(13,6);g.lineTo(13,15);g.lineTo(-12,15);g.closePath();g.fillStyle=D.hi;g.fill();g.lineWidth=3;g.strokeStyle=D.dk;g.stroke();
  g.strokeStyle=D.col;g.lineWidth=1.5;g.stroke();g.restore()}

// ---------- 1) L을 가져가 : 내가 최근에 받은 피해(L)를 상대한테 떠넘김 ----------
function krL(o,t){const got=(o.dlog||[]).filter(q=>clock-q[0]<4).reduce((s,q)=>s+q[1],0);o.dlog=[];const dmg=Math.round(clamp(6+got*.6,6,18)),hv=Math.round(Math.min(8,got*.35));
  HZ.push({k:'krl',o,tg:t,t:0,x:o.x,y:o.y-o.r-20,dmg,hv,got,done:0});SFXa('kr_L');SFXa('kr_pass');ft(o.x,o.y-o.r-40,got>0?'내 L 가져가 ('+Math.round(got)+')':'L 가져가!',o.d.hi,22)}
HZX.krl=(h,dt)=>{
  const o=h.o,e=h.tg;if(h.done)return h.t<h.dt+1.4;if(!e||e.dead)return false;
  const u=clamp((h.t-.15)/.45,0,1),sx=o.x,sy=o.y-o.r-20;h.x=sx+(e.x-sx)*u;h.y=sy+(e.y-sy)*u-Math.sin(Math.PI*u)*90;
  if(u>=1){h.done=1;h.dt=h.t;if(!e.hid&&!e.jump){hurt(e,h.dmg,o,e.x,e.y,0,h.dmg>=12);e.slow=Math.max(e.slow,1);ft(e.x,e.y-e.r-54,'L 받음 ㅋㅋ','#ffffff',24)}
    if(h.hv>0&&!o.dead){o.hp=Math.min(100,o.hp+h.hv);ft(o.x,o.y-o.r-12,'+'+h.hv,'#7bff8a',22)}SFXa('kr_tear')}
  return true;
};
HZP.krl=h=>{const e=h.tg;if(!h.done){g.save();g.translate(h.x,h.y);g.rotate(Math.sin(h.t*12)*.4);bigL(1.1+Math.min(1,h.got/20)*.6,h.o.d);g.restore();return}
  if(!e||e.dead||e.hid)return;const q=h.t-h.dt,s=back(clamp(q/.15,0,1)),a=clamp((1.4-q)/.3,0,1);g.save();g.globalAlpha=a;g.translate(e.x,e.y-e.r-14+Math.sin(clock*6)*2);g.rotate(Math.sin(clock*4)*.15);bigL(.8*s,h.o.d);g.restore()};

// ---------- 2) 측면 대 측면 : 상대를 강제로 같이 춤추게 만듦 ----------
function krSide(o,t){HZ.push({k:'krdance',o,tg:t,t:0,n:0,bx:t.x,by:t.y,ox:o.x,oy:o.y,a:ang(o,t)});SFXa('kr_side')}
HZX.krdance=(h,dt)=>{
  const o=h.o,e=h.tg;if(!e||e.dead||o.dead)return false;const D=1.7;
  if(h.t<D&&!e.hid){const sw=Math.sin(h.t*Math.PI*2*1.1)*42,px=-Math.sin(h.a),py=Math.cos(h.a);e.stn=Math.max(e.stn,.1);e.cast=null;
    e.x=clamp(h.bx+px*sw,e.r,A-e.r);e.y=clamp(h.by+py*sw,e.r,A-e.r);o.x=clamp(h.ox+px*sw,o.r,A-o.r);o.y=clamp(h.oy+py*sw,o.r,A-o.r);
    if(h.n<4&&h.t>=.35+h.n*.4){h.n++;hurt(e,3,o,e.x,e.y,0,0);SFXa('kr_beat');ring(e.x,e.y,6,50,o.d.col,4,.3);ring(o.x,o.y,6,50,o.d.col,4,.3);
      for(let i=0;i<3;i++)Pt.push({x:rnd(o.x-30,o.x+30),y:o.y-20,vx:rnd(-20,20),vy:-70,l:.9,m:.9,sh:9,col:i%2?o.d.hi:'#ffffff',r:20,txt:Math.random()<.5?'♪':'♫'})}}
  return h.t<D+.2;
};
HZP.krdance=h=>{const e=h.tg,o=h.o;if(!e||e.dead||h.t>1.7)return;const a=Math.min(1,h.t/.2);g.save();g.globalAlpha=a;g.strokeStyle=o.d.col;g.lineWidth=2;g.setLineDash([4,6]);g.lineDashOffset=-clock*40;g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);
  g.font='18px '+FD;g.textAlign='center';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#000';const tx=Math.floor(h.t*2.2)%2?'대 측면!':'측면!';g.strokeText(tx,o.x,o.y-o.r-30);g.fillStyle=o.d.hi;g.fillText(tx,o.x,o.y-o.r-30);g.strokeText('따라해!',e.x,e.y-e.r-30);g.fillStyle='#ffffff';g.fillText('따라해!',e.x,e.y-e.r-30);g.restore()};

// ---------- 3) ULT 크리스 크로스 셀카 : 자리를 세 번 맞바꾸고, 셀카로 가둔 뒤 사진을 찢음 ----------
function krUlt(o,t){HZ.push({k:'krult',o,tg:t,t:0,sw:0,ph:0,lines:[]});SFXa('kr_cross')}
HZX.krult=(h,dt)=>{
  const o=h.o;let e=h.tg;if(!e||e.dead)e=h.tg=tgt(o);if(o.dead||!e||e==o)return false;
  if(h.sw<3&&h.t>=.25+h.sw*.38&&!e.hid&&!e.jump){h.sw++;const ax=o.x,ay=o.y;h.lines.push({x1:ax,y1:ay,x2:e.x,y2:e.y,t:h.t});FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.4,m:.4});FX.push({k:'ghost',x:e.x,y:e.y,r:e.r,c:e.d.col,l:.4,m:.4});
    o.x=e.x;o.y=e.y;e.x=ax;e.y=ay;hurt(e,4,o,e.x,e.y,0,0);e.stn=Math.max(e.stn,.25);SFXa('kr_swap');shake=Math.max(shake,8);ft((o.x+e.x)/2,(o.y+e.y)/2-30,'크리스 크로스!',o.d.hi,20)}
  if(h.ph==0&&h.t>=1.45){h.ph=1;SFXa('kr_selfie')}
  if(h.ph==1&&h.t>=1.95){h.ph=2;h.ft=h.t;SFXa('kr_shutter');FX.push({k:'krflash',l:.25,m:.25});if(!e.hid){e.stn=Math.max(e.stn,.9);e.cast=null;h.px=e.x;h.py=e.y;h.pe=e}}
  if(h.ph==2&&h.pe&&!h.pe.dead&&h.t<h.ft+.85){h.pe.x=h.px;h.pe.y=h.py}
  if(h.ph==2&&h.t>=h.ft+.85){h.ph=3;SFXa('kr_tear');shake=Math.max(shake,14);hs=.08;const p=h.pe;if(p&&!p.dead&&!p.hid){hurt(p,12,o,p.x,p.y,0,1);ft(p.x,p.y-p.r-40,'사진 찢음!','#ffffff',26);
    for(let i=0;i<18;i++){const a=rnd(0,TAU),v=rnd(100,280),l=rnd(.6,1);Pt.push({x:p.x,y:p.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,l,m:l,sh:2,col:i%3?'#ffffff':'#e8e2d4',r:rnd(5,9),rot:rnd(0,TAU),vr:rnd(-10,10),gy:300,fr:.5})}}}
  return h.ph<3||h.t<h.ft+1.3;
};
HZD.krult=h=>{const D=h.o.d;h.lines.forEach(L=>{const q=h.t-L.t,a=clamp(1-q/.6,0,1);if(a<=0)return;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a;g.lineCap='round';
  [[D.col,14*a+2],['#ffffff',4*a+1]].forEach(([c,w])=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(L.x1,L.y1);g.lineTo(L.x2,L.y2);g.stroke()});
  const mx=(L.x1+L.x2)/2,my=(L.y1+L.y2)/2;g.lineWidth=5*a+1;g.strokeStyle=D.hi;g.beginPath();g.moveTo(mx-18,my-18);g.lineTo(mx+18,my+18);g.moveTo(mx+18,my-18);g.lineTo(mx-18,my+18);g.stroke();g.restore()})};
HZP.krult=h=>{const o=h.o;
  if(h.ph==1&&!o.dead){const u=clamp((h.t-1.45)/.25,0,1);g.save();g.translate(o.x+30,o.y-o.r-34);g.scale(u,u);g.rotate(-.15);g.fillStyle='#1a1d26';g.strokeStyle='#0b0d12';g.lineWidth=2;g.beginPath();g.rect(-14,-22,28,44);g.fill();g.stroke();
    g.fillStyle='#2a2f3a';g.beginPath();g.arc(-6,-14,4,0,TAU);g.fill();g.fillStyle=o.d.hi;g.beginPath();g.arc(-6,-14,2,0,TAU);g.fill();g.restore();
    g.save();g.globalAlpha=u;g.font='18px '+FD;g.textAlign='center';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#000';g.strokeText('셀카~',o.x,o.y-o.r-74);g.fillStyle=o.d.hi;g.fillText('셀카~',o.x,o.y-o.r-74);g.restore()}
  if(h.ph==2&&h.pe&&!h.pe.dead){const p=h.pe,q=h.t-h.ft,s=back(clamp(q/.15,0,1));g.save();g.translate(p.x,p.y+8);g.rotate(-.08);g.scale(s,s);
    g.fillStyle='rgba(255,255,255,.18)';g.fillRect(-46,-50,92,92);g.strokeStyle='#ffffff';g.lineWidth=7;g.strokeRect(-46,-50,92,92);g.fillStyle='#ffffff';g.fillRect(-49,40,98,24);
    g.font='13px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#1a1d26';g.fillText('찰칵!',0,52);g.restore()}};
FXD.krflash=x=>{const p=1-x.l/x.m;g.save();g.globalAlpha=1-p;g.fillStyle='#ffffff';g.fillRect(-300,-300,A+600,A+600);g.restore()};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ===== game9.js : 공병은 • 챌린저 =====
const NEW9=['ch_hook','ch_pull','ch_spin','ch_flash','ch_holy','ch_sword','ch_dodge'];
NEW9.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{ch_hook:'챌린저 · 갈고리 던지기',ch_pull:'챌린저 · 끌어오기',ch_spin:'챌린저 · 회오리 베기',ch_flash:'챌린저 · 점멸',ch_holy:'챌린저 · 성검 강림',ch_sword:'챌린저 · 성검 내리꽂기',ch_dodge:'챌린저 · 무빙 회피'});

DEF.push({name:'공병은 • 챌린저',gl:'챌',k:'chal',vof:1,r:26,sp:220,col:'#4fb4ff',hi:'#ffe9a8',dk:'#0a2a4a',alt:{col:'#b07bff',hi:'#f0e3ff',dk:'#24104a'},alt2:{col:'#ff5a4e',hi:'#ffe0c8',dk:'#4a0d08'},sk:[
  {n:'갈고리 그랩',w:.55,cd:7,ind:1,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>chHook(o,t)},
  {n:'회오리 베기',w:.4,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>chSpin(o,t)},
  {n:'점멸 · 심판의 검',w:1.8,ult:1,f:(o,t)=>chUlt(o,t)}]});
INFO['공병은 • 챌린저']={st:[8,6,8,8,6,9],p:'챌린저 무빙 · 15% 확률로 공격을 피함',sk:[['8+3 에어본','긴 사슬 갈고리를 던져 맞으면 내 앞까지 끌고 와서 띄움'],['2×7','검을 들고 빙글빙글 돌면서 상대를 쫓아가 계속 벰'],['14+잃은 체력','점멸로 붙은 뒤 하늘에서 거대한 검이 떨어짐 · 상대 체력이 적을수록 더 아픔 (처형)']]};

// ---------- 패시브 : 챌린저 무빙 (15% 회피) ----------
const _hurt9=hurt;hurt=function(t,n,o,x,y){if(t&&t.d&&t.d.k=='chal'&&!t.dead&&n>0&&Math.random()<.15&&phase!='demo'){ft(t.x+rnd(-10,10),t.y-t.r-26,'무빙!','#ffe9a8',22);FX.push({k:'ghost',x:t.x,y:t.y,r:t.r,c:t.d.col,l:.3,m:.3});SFXa('ch_dodge');return}return _hurt9.apply(this,arguments)};

// ---------- 아이콘 : 월계관 + 검 (네온) ----------
EMB.chal=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.04);
  neon(D,2,()=>{g.beginPath();g.moveTo(0,-21);g.lineTo(3,-15);g.lineTo(3,8);g.lineTo(0,12);g.lineTo(-3,8);g.lineTo(-3,-15);g.closePath();g.moveTo(-8,8);g.lineTo(8,8);g.moveTo(0,12);g.lineTo(0,18);
    [-1,1].forEach(s=>{g.moveTo(s*6,18);g.quadraticCurveTo(s*19,14,s*18,-4);for(let i=0;i<4;i++){const y=14-i*6,x=s*(9+i*2.6);g.moveTo(x,y);g.quadraticCurveTo(x+s*6,y-2,x+s*5,y-7)}})});
  g.fillStyle=D.hi;g.beginPath();g.arc(0,18,2,0,TAU);g.fill();g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-6,12,.6);g.restore()};

// ---------- 1) 갈고리 그랩 ----------
function chHook(o,t){const d=dist(o,t)/900,a=Math.atan2(t.y+t.dy*t.sp*d-o.y,t.x+t.dx*t.sp*d-o.x);HZ.push({k:'chhook',o,tg:t,t:0,a,len:0,st:0,e:null,hx:o.x,hy:o.y});SFXa('ch_hook')}
HZX.chhook=(h,dt,EN)=>{
  const o=h.o;if(o.dead){if(h.e)h.e.airU=null;return false}
  if(h.st==0){const T2=h.tg&&!h.tg.dead&&!h.tg.hid?h.tg:null;if(T2){let da=Math.atan2(T2.y-h.hy,T2.x-h.hx)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-3*dt,3*dt)}
    h.hx+=Math.cos(h.a)*950*dt;h.hy+=Math.sin(h.a)*950*dt;h.len=Math.hypot(h.hx-o.x,h.hy-o.y);
    for(const e of EN){if(e.hid||e.jump)continue;if(Math.hypot(e.x-h.hx,e.y-h.hy)<e.r+24){h.st=1;h.e=e;hurt(e,8,o,e.x,e.y,0,1);SFXa('ch_pull');ft(e.x,e.y-e.r-30,'잡았다!',o.d.hi,24);break}}
    if(h.len>620||h.hx<-20||h.hx>A+20||h.hy<-20||h.hy>A+20)h.st=2}
  else if(h.st==1){const e=h.e;if(!e||e.dead){h.st=2;return true}const a=ang(o,e),tx=o.x+Math.cos(a)*(o.r+e.r+10),ty=o.y+Math.sin(a)*(o.r+e.r+10),k2=Math.min(1,dt*10);e.x=clamp(e.x+(tx-e.x)*k2,e.r,A-e.r);e.y=clamp(e.y+(ty-e.y)*k2,e.r,A-e.r);e.stn=Math.max(e.stn,.2);h.hx=e.x;h.hy=e.y;
    if(dist(o,e)<o.r+e.r+16){h.st=3;h.at=h.t;h.ax=e.x;h.ay=e.y;e.stn=Math.max(e.stn,.85);e.cast=null;e.airU=0;ft(e.x,e.y-e.r-60,'에어본!','#ffffff',28);shake=Math.max(shake,8);for(let i=0;i<10;i++)dustP(e.x,e.y+e.r*.6,rnd(60,140))}}
  else if(h.st==2){const k=Math.max(0,h.len-1300*dt),u=h.len>0?k/h.len:0;h.hx=o.x+(h.hx-o.x)*u;h.hy=o.y+(h.hy-o.y)*u;h.len=k;if(h.len<=1)return false}
  else{const e=h.e,q=h.t-h.at,u=clamp(q/.8,0,1);if(e&&!e.dead){e.x=h.ax;e.y=h.ay;e.airU=u<1?u:null;
      if(u>=1&&!h.land){h.land=1;hurt(e,3,o,e.x,e.y,0,0);ring(e.x,e.y,6,70,'#cfd5e2',6,.35);for(let i=0;i<12;i++)dustP(e.x,e.y+e.r*.6,rnd(60,160));shake=Math.max(shake,7);ft(e.x,e.y-e.r-30,'쿵!','#cfd5e2',20)}}
    return q<1}
  return true;
};
HZD.chhook=h=>{const o=h.o,D=o.d;if(h.st==3)return;const hx=h.hx,hy=h.hy,n=Math.max(1,Math.floor(h.len/14));g.save();g.lineCap='round';
  for(let i=0;i<n;i++){const u=i/n,x=o.x+(hx-o.x)*u,y=o.y+(hy-o.y)*u;g.strokeStyle=i%2?'#8a93a6':'#c9d1de';g.lineWidth=3;g.beginPath();g.ellipse(x,y,5,3,h.a+(i%2?Math.PI/2:0),0,TAU);g.stroke()}
  g.translate(hx,hy);g.rotate(Math.atan2(hy-o.y,hx-o.x));g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,26,.6);g.restore();g.strokeStyle='#e8edf5';g.lineWidth=3.5;g.beginPath();g.moveTo(-4,0);g.lineTo(8,0);g.moveTo(8,0);g.quadraticCurveTo(15,-2,13,-11);g.moveTo(8,0);g.quadraticCurveTo(15,2,13,11);g.stroke();g.restore()};
// 에어본 : 공을 실제로 위로 띄워서 그림
const _ball9=ball;ball=function(f,t){if(f.airU==null||f.dead){_ball9(f,t);return}const u=f.airU,z=Math.sin(Math.PI*u)*80,s=1+z/260;
  g.save();g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(f.x,f.y+f.r*.6,f.r*(1-z/200),f.r*.35*(1-z/200),0,0,TAU);g.fill();g.restore();
  g.save();g.translate(f.x,f.y-z);g.scale(s,s);g.rotate(u*TAU*.6);g.translate(-f.x,-f.y);_ball9(f,t);g.restore();
  if(z>10){g.save();g.globalAlpha=.6;g.strokeStyle='#ffffff';g.lineWidth=2;g.lineCap='round';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(f.x+i*12,f.y-z+f.r+6);g.lineTo(f.x+i*12,f.y-z+f.r+6+z*.35);g.stroke()}g.restore()}};

// ---------- 2) 회오리 베기 ----------
function chSpin(o,t){HZ.push({k:'chspin',o,tg:t,t:0,tk:0,dur:1.5});SFXa('ch_spin')}
HZX.chspin=(h,dt,EN)=>{
  const o=h.o;if(o.dead)return false;const e=h.tg&&!h.tg.dead?h.tg:tgt(o);
  if(e&&!e.hid){const a=ang(o,e),d=dist(o,e);if(d>o.r+e.r+10){o.x=clamp(o.x+Math.cos(a)*400*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*400*dt,o.r,A-o.r)}}
  o.gcd=Math.max(o.gcd,.2);h.tk-=dt;if(h.tk<=0){h.tk=.2;EN.forEach(q=>{if(!q.hid&&!q.jump&&dist(o,q)<o.r+q.r+55){hurt(q,2,o,q.x,q.y,0,0);spark(q.x,q.y,'gold',4,160)}})}
  emit(30,dt,()=>{const a=rnd(0,TAU);sparkP(o.x+Math.cos(a)*(o.r+30),o.y+Math.sin(a)*(o.r+30),-Math.sin(a)*160,Math.cos(a)*160,o.d.hi,rnd(1.5,2.5))});
  return h.t<h.dur;
};
HZD.chspin=h=>{const o=h.o,D=o.d;if(o.dead)return;const R=o.r+38,an=h.t*22;g.save();g.translate(o.x,o.y);g.save();g.globalCompositeOperation='lighter';g.strokeStyle=D.col;g.globalAlpha=.45;g.lineWidth=16;g.lineCap='round';g.beginPath();g.arc(0,0,R,an,an+4.2);g.stroke();g.strokeStyle='#ffffff';g.globalAlpha=.8;g.lineWidth=3;g.beginPath();g.arc(0,0,R,an+3,an+4.2);g.stroke();g.restore();
  g.rotate(an+4.2);g.translate(R,0);g.rotate(Math.PI/2);g.fillStyle='#e8edf5';g.strokeStyle='#1a1d26';g.lineWidth=1.5;g.beginPath();g.moveTo(0,-26);g.lineTo(4,-20);g.lineTo(4,4);g.lineTo(-4,4);g.lineTo(-4,-20);g.closePath();g.fill();g.stroke();g.fillStyle=D.hi;g.fillRect(-9,4,18,4);g.fillStyle='#5a3a1e';g.fillRect(-2,8,4,9);g.restore()};

// ---------- 3) ULT 점멸 · 심판의 검 ----------
const IMP=1.25;
function chUlt(o,t){HZ.push({k:'chult',o,tg:t,t:0,ph:0});SFXa('ch_flash')}
HZX.chult=(h,dt,EN)=>{
  const o=h.o;let e=h.tg;if(!e||e.dead)e=h.tg=tgt(o);if(o.dead||!e||e==o)return false;
  if(h.ph==0){h.ph=1;const a=ang(e,o),fx=o.x,fy=o.y;o.x=clamp(e.x+Math.cos(a)*(e.r+o.r+40),o.r,A-o.r);o.y=clamp(e.y+Math.sin(a)*(e.r+o.r+40),o.r,A-o.r);FX.push({k:'chblink',x:fx,y:fy,x2:o.x,y2:o.y,c:o.d.col,l:.4,m:.4});ft(o.x,o.y-o.r-30,'점멸!',o.d.hi,24)}
  if(h.ph==1&&!h.hs){h.hs=1;SFXa('ch_holy')}
  if(h.ph==1&&h.t<IMP-.25&&!e.hid){h.mx=e.x;h.my=e.y}
  if(h.ph==1){emit(40,dt,()=>{if(h.mx==null)return;const a=rnd(0,TAU),r=rnd(10,80);Pt.push({x:h.mx+Math.cos(a)*r,y:h.my+Math.sin(a)*r*.5,vx:0,vy:-rnd(60,160),l:rnd(.5,.9),m:.9,gl:1,sh:6,col:Math.random()<.5?'#fff3c4':'#ffffff',r:rnd(1.2,2.4),fr:.6})});if(h.t>IMP-.4&&Math.random()<dt*20)shake=Math.max(shake,3)}
  if(h.ph==1&&h.t>=IMP){h.ph=2;h.ft=h.t;SFXa('ch_sword');shake=30;hs=.18;SLOW=Math.max(SLOW,.35);zk=1.6;zx=h.mx;zy=h.my;FX.push({k:'frost',l:.3,m:.3,c:'#fffbe8'});FX.push({k:'holyhit',x:h.mx,y:h.my,l:1.1,m:1.1,c:o.d.col,h:o.d.hi});FX.push({k:'crack',x:h.mx,y:h.my,r:130,l:3.5,m:3.5});
    for(let i=0;i<30;i++)rockP(h.mx,h.my,rnd(0,TAU),rnd(120,380));for(let i=0;i<40;i++){const a=rnd(0,TAU),v=rnd(150,480),l=rnd(.5,1);Pt.push({x:h.mx,y:h.my,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.6-80,l,m:l,gl:1,sh:5,col:i%2?'#fff3c4':'#ffffff',r:2.4,fr:.15})}
    EN.forEach(q=>{if(q.hid||q.jump)return;if(Math.hypot(q.x-h.mx,q.y-h.my)<85+q.r){const dmg=Math.round(14+(100-q.hp)*.25);hurt(q,dmg,o,q.x,q.y,0,1);q.stn=Math.max(q.stn,.5);const a=Math.atan2(q.y-h.my,q.x-h.mx);q.dx=Math.cos(a);q.dy=Math.sin(a);if(q.dead)ft(q.x,q.y-q.r-50,'처형!','#ffe9a8',42)}})}
  return h.ph<2||h.t<h.ft+1.6;
};
function holySword(D,s,glowA){g.save();g.scale(s,s);g.lineJoin='round';g.lineCap='round';
  g.save();g.globalCompositeOperation='lighter';glow('#fff3c4',0,-40,70,.55*glowA);glow(D.col,0,-40,46,.4*glowA);g.restore();
  const bl=g.createLinearGradient(-8,0,8,0);bl.addColorStop(0,'#8a97ad');bl.addColorStop(.45,'#ffffff');bl.addColorStop(.55,'#dfe6f2');bl.addColorStop(1,'#7c889e');
  g.beginPath();g.moveTo(0,4);g.lineTo(8,-8);g.lineTo(7,-70);g.lineTo(0,-78);g.lineTo(-7,-70);g.lineTo(-8,-8);g.closePath();g.fillStyle=bl;g.fill();g.strokeStyle='#2a2440';g.lineWidth=1.6;g.stroke();
  g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ffe9a8';g.lineWidth=2;g.globalAlpha=.6+.4*glowA;g.beginPath();g.moveTo(0,-4);g.lineTo(0,-70);g.stroke();g.lineWidth=1;g.strokeStyle='#ffffff';g.beginPath();g.moveTo(7.5,-10);g.lineTo(6.6,-69);g.moveTo(-7.5,-10);g.lineTo(-6.6,-69);g.stroke();g.restore();
  for(let i=0;i<3;i++){g.fillStyle='rgba(255,233,168,.9)';g.beginPath();g.arc(0,-22-i*14,1.6,0,TAU);g.fill()}
  const gd=g.createLinearGradient(0,-90,0,-76);gd.addColorStop(0,'#fff3c4');gd.addColorStop(1,'#c9962e');g.fillStyle=gd;g.strokeStyle='#4a3410';g.lineWidth=1.4;
  [-1,1].forEach(sd=>{g.beginPath();g.moveTo(0,-80);g.quadraticCurveTo(sd*14,-78,sd*22,-86);g.quadraticCurveTo(sd*30,-92,sd*34,-90);g.quadraticCurveTo(sd*28,-84,sd*30,-80);g.quadraticCurveTo(sd*22,-80,sd*24,-76);g.quadraticCurveTo(sd*12,-74,0,-74);g.closePath();g.fill();g.stroke()});
  g.fillStyle=D.col;g.beginPath();g.moveTo(0,-84);g.lineTo(5,-78);g.lineTo(0,-72);g.lineTo(-5,-78);g.closePath();g.fill();g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-78,10,glowA);g.restore();
  g.fillStyle='#3a2a5a';g.fillRect(-3,-102,6,22);g.strokeStyle='#c9962e';g.lineWidth=1.2;for(let y=-100;y<-82;y+=4){g.beginPath();g.moveTo(-3,y);g.lineTo(3,y+3);g.stroke()}
  g.fillStyle=gd;g.beginPath();g.arc(0,-106,5,0,TAU);g.fill();g.stroke();g.fillStyle=D.hi;g.beginPath();g.arc(0,-106,2,0,TAU);g.fill();
  g.restore()}
function runeCircle(R,u,D,rot){g.save();g.rotate(rot);g.strokeStyle='#ffe9a8';g.lineWidth=2.5;g.globalAlpha*=.9;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();g.lineWidth=1.4;g.beginPath();g.arc(0,0,R-12,0,TAU);g.stroke();
  for(let i=0;i<16;i++){g.save();g.rotate(i*TAU/16);g.beginPath();g.moveTo(R-12,0);g.lineTo(R,0);g.stroke();if(i%2==0){g.beginPath();g.moveTo(R-8,-3);g.lineTo(R-4,0);g.lineTo(R-8,3);g.stroke()}g.restore()}
  g.rotate(-rot*2.2);g.strokeStyle=D.col;g.lineWidth=2;g.beginPath();for(let i=0;i<4;i++){const a=i*TAU/4;g.lineTo(Math.cos(a)*(R-20),Math.sin(a)*(R-20))}g.closePath();g.stroke();g.beginPath();for(let i=0;i<4;i++){const a=i*TAU/4+Math.PI/4;g.lineTo(Math.cos(a)*(R-20),Math.sin(a)*(R-20))}g.closePath();g.stroke();
  g.restore()}
HZD.chult=h=>{const D=h.o.d;
  if(h.ph==1&&h.mx!=null){const u=clamp((h.t-.05)/(IMP-.05),0,1),R=Math.max(24,85*back(clamp(u/.3,0,1)));g.save();g.translate(h.mx,h.my);g.scale(1,.55);g.globalAlpha=.35+.55*u;runeCircle(R,u,D,h.t*1.4);g.restore();
    g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.12+.25*u;const gr=g.createLinearGradient(0,h.my-600,0,h.my);gr.addColorStop(0,'rgba(255,243,196,0)');gr.addColorStop(1,'rgba(255,243,196,1)');g.fillStyle=gr;const w=28+40*u;g.fillRect(h.mx-w,h.my-600,w*2,600);g.restore()}
  if(h.ph==2){const q=h.t-h.ft,a=clamp(1-(q-.6)/1,0,1);g.save();g.translate(h.mx,h.my);g.scale(1,.55);g.globalAlpha=a*.8;runeCircle(85+q*40,1,D,h.t*.6);g.restore()}};
HZP.chult=h=>{const D=h.o.d;
  if(h.ph==1&&h.mx!=null){const u=clamp((h.t-.1)/(IMP-.1),0,1),q=Math.pow(u,3),y=h.my-(1-q)*620;
    if(u>.7){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(u-.7)/.3*.6;g.fillStyle='#fff3c4';g.fillRect(h.mx-10,y-220,20,220);g.restore()}
    g.save();g.translate(h.mx,y+10);holySword(D,2.6,.6+.4*Math.sin(clock*8));g.restore()}
  if(h.ph==2){const q=h.t-h.ft,a=clamp(1-(q-.7)/.9,0,1),sink=Math.min(1,q/.08);g.save();g.globalAlpha=a;g.translate(h.mx,h.my+10+18*sink);holySword(D,2.6,a);g.restore();
    if(q>.7)emit(60,LDT,()=>Pt.push({x:h.mx+rnd(-14,14),y:h.my-rnd(0,240),vx:rnd(-20,20),vy:-rnd(40,120),l:.8,m:.8,gl:1,sh:6,col:'#fff3c4',r:rnd(1.2,2.6),fr:.5}))}};
FXD.holyhit=x=>{const p=1-x.l/x.m,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';
  if(p<.12){g.globalAlpha=1-p/.12;g.fillStyle='#fffbe8';g.fillRect(-300,-300,A+600,A+600);g.globalAlpha=1}
  glow('#ffffff',x.x,x.y,60+e*200,(1-p));glow('#fff3c4',x.x,x.y,90+e*320,(1-p)*.7);
  for(let k=0;k<3;k++){const pk=clamp(p*1.6-k*.18,0,1);if(pk<=0||pk>=1)continue;g.strokeStyle=k==1?x.c:'#ffe9a8';g.globalAlpha=1-pk;g.lineWidth=14*(1-pk)+2;g.beginPath();g.ellipse(x.x,x.y,40+pk*300,(40+pk*300)*.55,0,0,TAU);g.stroke()}
  g.globalAlpha=(1-p)*.8;g.fillStyle='#fff3c4';const w=50*(1-p)+6;g.fillRect(x.x-w,x.y-700,w*2,700);
  g.translate(x.x,x.y);for(let i=0;i<20;i++){const a=i*TAU/20+.1,L=200+((i*37)%5)*40;g.globalAlpha=(1-p)*.5;g.fillStyle=i%2?'#ffffff':'#ffe9a8';g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a-.03)*L*e,Math.sin(a-.03)*L*e*.6);g.lineTo(Math.cos(a+.03)*L*e,Math.sin(a+.03)*L*e*.6);g.closePath();g.fill()}
  g.restore()};
FXD.chblink=x=>{const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';[[x.x,x.y],[x.x2,x.y2]].forEach(([X,Y],i)=>{glow(i?'#ffffff':x.c,X,Y,30+p*60,(1-p)*.9)});g.strokeStyle=x.c;g.globalAlpha=(1-p)*.6;g.lineWidth=6*(1-p)+1;g.setLineDash([6,10]);g.beginPath();g.moveTo(x.x,x.y);g.lineTo(x.x2,x.y2);g.stroke();g.restore()};

const _winTick9=winTick;winTick=function(dt){F.forEach(f=>f.airU=null);_winTick9(dt)};
// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ===== game10.js : 스킬 퀄리티 업그레이드 (기존 스킬 그림/연출 교체) =====

// ================= 김민채 • 각성 : 지옥의 아가리 =================
const MAWT=1.15;
HZX.maw=(h,dt,EN)=>{
  const e=h.e,o=h.o;if(e.dead&&!h.done)return false;
  if(h.t<MAWT-.35&&!e.hid){h.x=e.x;h.y=e.y}
  if(h.t<MAWT){emit(40+h.t*80,dt,()=>{const a=rnd(0,TAU),r=rnd(10,95);fireP(h.x+Math.cos(a)*r,h.y+Math.sin(a)*r*.6,rnd(-20,20),rnd(-140,-60),rnd(5,10),rnd(.3,.6),PAL.magma)});
    emit(10,dt,()=>smokeP(h.x+rnd(-80,80),h.y+rnd(-30,30),rnd(10,16),rnd(.8,1.2)));if(Math.random()<dt*(6+h.t*20))shake=Math.max(shake,2+h.t*5)}
  if(!h.up&&h.t>=MAWT-.3){h.up=1;SFX('slam');shake=Math.max(shake,12);for(let i=0;i<20;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(100,300))}
  if(!h.done&&h.t>=MAWT){h.done=1;SFX('gulp');SFX('heavy');shake=26;hs=.16;SLOW=Math.max(SLOW,.3);zk=1.5;zx=h.x;zy=h.y;FX.push({k:'frost',l:.25,m:.25,c:'#ff3d0a'});FX.push({k:'mawbite',x:h.x,y:h.y,l:.7,m:.7});
    if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<95){hurt(e,17,o,e.x,e.y,0,1);e.stn=.7;e.burn=1.2;const hv=Math.min(4,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-10,'+'+Math.round(hv),'#ffd27a',24)}ft(e.x,e.y-e.r-70,'와작!!',o.d.hi,40)}
    for(let i=0;i<50;i++){const a=rnd(0,TAU),v=rnd(150,420);fireP(h.x,h.y,Math.cos(a)*v,Math.sin(a)*v*.6-100,rnd(10,22),rnd(.4,.9),PAL.magma)}
    for(let i=0;i<24;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(150,380));FX.push({k:'scorch',x:h.x,y:h.y,r:110,l:5,m:5,c:'#ff5a1f'})}
  if(h.done&&h.t<MAWT+.5&&Math.random()<dt*14)shake=Math.max(shake,5);
  return h.t<MAWT+1.25;
};
function hellJaw(sd,R,open,t){
  // sd=-1 위턱, 1 아래턱 · 정면에서 본 거대한 턱
  g.save();g.scale(1,sd);
  const W=R,H=R*.62,gap=R*.08+open*R*.55;g.translate(0,gap);
  // 턱 몸통
  g.beginPath();g.moveTo(-W,0);g.bezierCurveTo(-W*1.02,H*.7,-W*.55,H*1.15,0,H*1.2);g.bezierCurveTo(W*.55,H*1.15,W*1.02,H*.7,W,0);
  for(let i=8;i>=-8;i--){const x=i/8*W;g.lineTo(x,-((i&1)?R*.03:0))}g.closePath();
  const gr=g.createLinearGradient(0,0,0,H*1.2);gr.addColorStop(0,'#5a0d06');gr.addColorStop(.35,'#2a0603');gr.addColorStop(1,'#0b0201');g.fillStyle=gr;g.fill();
  g.lineWidth=4;g.strokeStyle='#050100';g.stroke();
  // 갑각 무늬 + 마그마 균열
  g.save();g.clip();g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=3;for(let i=0;i<5;i++){g.beginPath();g.ellipse(0,H*(.25+i*.22),W*(.95-i*.12),H*.18,0,0,Math.PI);g.stroke()}
  g.globalCompositeOperation='lighter';g.strokeStyle='#ff6a1c';g.lineWidth=2.2;g.globalAlpha=.6+.4*Math.sin(t*9);
  [[-.7,.2,-.45,.6,-.6,.95],[.6,.15,.4,.55,.55,.9],[-.15,.4,.05,.75,-.05,1.05]].forEach(([a,b,c,d,e2,f])=>{g.beginPath();g.moveTo(a*W,b*H);g.lineTo(c*W,d*H);g.lineTo(e2*W,f*H);g.stroke()});
  g.restore();
  // 잇몸
  g.beginPath();g.moveTo(-W*.92,R*.02);g.quadraticCurveTo(0,R*.16,W*.92,R*.02);g.lineTo(W*.92,-R*.01);g.lineTo(-W*.92,-R*.01);g.closePath();g.fillStyle='#8a1410';g.fill();
  // 이빨 (큰 송곳니 + 톱니)
  const N=11;for(let i=0;i<N;i++){const u=i/(N-1),x=(u-.5)*2*W*.88,big=i==1||i==N-2,mid=i==3||i==N-4,L=(big?R*.42:mid?R*.26:R*.17)*(1-Math.abs(u-.5)*.5),w=big?R*.075:R*.05;
    g.save();g.translate(x,R*.03);g.rotate((u-.5)*.25*-1);
    const tg=g.createLinearGradient(0,0,0,-L);tg.addColorStop(0,'#cdb894');tg.addColorStop(.5,'#fff6dd');tg.addColorStop(1,'#ffffff');
    g.beginPath();g.moveTo(-w,0);g.quadraticCurveTo(-w*.8,-L*.6,0,-L);g.quadraticCurveTo(w*.6,-L*.55,w,0);g.closePath();g.fillStyle=tg;g.fill();g.lineWidth=1.6;g.strokeStyle='#2a1a08';g.stroke();
    g.strokeStyle='rgba(120,20,10,.55)';g.lineWidth=1;g.beginPath();g.moveTo(w*.3,-L*.15);g.lineTo(w*.1,-L*.55);g.stroke();g.restore()}
  // 바깥 가시
  g.fillStyle='#120302';g.strokeStyle='#000';g.lineWidth=2;for(let i=0;i<4;i++){const x=(i<2?-1:1)*W*(.55+.18*(i%2)),y=H*(.7+.1*(i%2));g.beginPath();g.moveTo(x-8,y);g.lineTo(x+(x<0?-24:24),y+28);g.lineTo(x+8,y+4);g.closePath();g.fill();g.stroke()}
  g.restore();
}
function hellHead(R,open,t,lift){
  // 위턱 위쪽 머리 : 뿔 + 눈
  g.save();g.translate(0,-R*.08-open*R*.55-R*.62*.78);
  [-1,1].forEach(s=>{g.save();g.scale(s,1);g.beginPath();g.moveTo(R*.35,R*.1);g.bezierCurveTo(R*.75,-R*.05,R*1.05,-R*.45,R*.85,-R*.95);g.bezierCurveTo(R*.8,-R*.5,R*.62,-R*.25,R*.42,-R*.12);g.closePath();
    const hg=g.createLinearGradient(R*.4,0,R*.9,-R*.9);hg.addColorStop(0,'#2a0603');hg.addColorStop(1,'#d9c39a');g.fillStyle=hg;g.fill();g.lineWidth=3;g.strokeStyle='#050100';g.stroke();
    g.strokeStyle='rgba(0,0,0,.45)';g.lineWidth=2;for(let k=1;k<5;k++){const u=k/5;g.beginPath();g.moveTo(R*(.42+.4*u),-R*(.05+.6*u));g.lineTo(R*(.5+.4*u),R*(.05-.6*u));g.stroke()}g.restore()});
  [-1,1].forEach(s=>{const x=s*R*.32,y=R*.22,fl=.7+.3*Math.sin(t*14+s);g.save();g.globalCompositeOperation='lighter';glow('#ff2a00',x,y,R*.35,.9*fl);glow('#ffd27a',x,y,R*.14,fl);g.restore();
    g.fillStyle='#ffe9a0';g.beginPath();g.moveTo(x-s*R*.16,y-R*.04);g.quadraticCurveTo(x,y-R*.1,x+s*R*.14,y+R*.03);g.quadraticCurveTo(x,y+R*.06,x-s*R*.16,y-R*.04);g.fill();
    g.fillStyle='#200000';g.beginPath();g.ellipse(x,y-R*.01,R*.018,R*.05,0,0,TAU);g.fill()});
  g.restore();
}
HZD.maw=h=>{
  const t=h.t,R=120;
  // 1) 땅이 갈라지며 지옥문이 열림
  const u=clamp(t/MAWT,0,1),fade=h.done?clamp(1-(t-MAWT-.7)/.55,0,1):1;
  g.save();g.translate(h.x,h.y);g.globalAlpha=fade;
  g.save();g.scale(1,.55);const pr=R*(.3+.9*Math.min(1,u*1.3));
  const pg=g.createRadialGradient(0,0,0,0,0,pr*1.15);pg.addColorStop(0,'#ffe0a0');pg.addColorStop(.25,'#ff6a1c');pg.addColorStop(.6,'#7a1004');pg.addColorStop(1,'rgba(20,2,0,0)');
  g.fillStyle=pg;g.beginPath();for(let i=0;i<=24;i++){const a=i*TAU/24,r=pr*(1+.12*Math.sin(i*2.7+t*3));i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.fill();
  g.strokeStyle='#ff8a2c';g.lineWidth=3;g.lineCap='round';for(let i=0;i<12;i++){const a=i*TAU/12+.2,L=pr*(1.2+.5*((i*7)%3)/3)*Math.min(1,u*1.5);g.globalAlpha=fade*(.5+.5*Math.sin(t*10+i));g.beginPath();g.moveTo(Math.cos(a)*pr*.8,Math.sin(a)*pr*.8);g.lineTo(Math.cos(a+.08)*L*.75,Math.sin(a+.08)*L*.75);g.lineTo(Math.cos(a-.05)*L,Math.sin(a-.05)*L);g.stroke()}
  g.globalAlpha=fade;g.save();g.globalCompositeOperation='lighter';glow('#ff3d0a',0,0,pr*1.6,.45+.3*u);g.restore();
  g.restore();
  // 2) 아가리가 솟아오름
  if(t>MAWT-.32){const rise=back(clamp((t-(MAWT-.32))/.22,0,1)),sink=h.done?clamp((t-MAWT-.55)/.6,0,1):0,
      open=h.done?0:1-clamp((t-(MAWT-.12))/.12,0,1),
      chew=h.done&&t<MAWT+.5?Math.sin((t-MAWT)*40)*.03:0,sc=(.4+.6*rise)*(1-.5*sink);
    g.save();g.translate(0,-R*.55*rise+R*.9*sink);g.scale(sc,sc);g.globalAlpha=fade*(1-sink*.6);
    g.save();g.globalCompositeOperation='lighter';glow('#ff3d0a',0,0,R*1.5,.35);g.restore();
    if(!h.done){g.save();g.scale(1,.9);const tg=g.createRadialGradient(0,0,0,0,0,R*.7);tg.addColorStop(0,'#fff0b0');tg.addColorStop(.3,'#ff6a1c');tg.addColorStop(1,'#3a0602');g.fillStyle=tg;g.beginPath();g.ellipse(0,0,R*.86,R*(.1+open*.55),0,0,TAU);g.fill();g.restore()}
    hellJaw(1,R,open+chew,t);hellJaw(-1,R,open+chew,t);hellHead(R,open+chew,t);
    if(!h.done&&open>.3){g.strokeStyle='rgba(255,140,60,.6)';g.lineWidth=2;for(let i=-2;i<=2;i++){const x=i*R*.25;g.beginPath();g.moveTo(x,-R*.1-open*R*.4);g.quadraticCurveTo(x+6,0,x,R*.1+open*R*.4);g.stroke()}}
    g.restore()}
  g.restore();g.globalAlpha=1;
};
FXD.mawbite=x=>{const p=1-x.l/x.m,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';
  for(let k=0;k<2;k++){const pk=clamp(p*1.4-k*.2,0,1);if(pk<=0||pk>=1)continue;g.strokeStyle=k?'#ffd27a':'#ff3d0a';g.globalAlpha=1-pk;g.lineWidth=16*(1-pk)+2;g.beginPath();g.ellipse(x.x,x.y,30+pk*230,(30+pk*230)*.55,0,0,TAU);g.stroke()}
  glow('#ff3d0a',x.x,x.y,80+e*200,(1-p)*.9);glow('#fff0b0',x.x,x.y,40+e*60,(1-p));
  g.translate(x.x,x.y);for(let i=0;i<16;i++){const a=i*TAU/16,L=(140+((i*31)%4)*30)*e;g.globalAlpha=(1-p)*.55;g.fillStyle=i%2?'#ff8a2c':'#ffd27a';g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a-.04)*L,Math.sin(a-.04)*L*.55);g.lineTo(Math.cos(a+.04)*L,Math.sin(a+.04)*L*.55);g.closePath();g.fill()}
  g.restore()};

// ================= 김민채 • 각성 : 용암 분출 기둥 =================
FXD.pillar=x=>{const p=1-x.l/x.m,up=Math.min(1,p/.18),down=clamp((p-.55)/.45,0,1),hgt=300*back(up)*(1-down*.6),w=34*(1-down)+8;
  g.save();g.translate(x.x,x.y);
  g.globalAlpha=1-down;g.fillStyle='#1a0602';g.beginPath();g.ellipse(0,0,w*1.4,w*.55,0,0,TAU);g.fill();
  g.globalCompositeOperation='lighter';
  const cg=g.createLinearGradient(-w,0,w,0);cg.addColorStop(0,'rgba(255,61,10,0)');cg.addColorStop(.2,'rgba(255,90,31,.85)');cg.addColorStop(.5,'rgba(255,240,190,1)');cg.addColorStop(.8,'rgba(255,90,31,.85)');cg.addColorStop(1,'rgba(255,61,10,0)');
  g.fillStyle=cg;g.beginPath();g.moveTo(-w,0);for(let k=0;k<=10;k++){const y=-hgt*k/10;g.lineTo(-w*(1-.35*k/10)+Math.sin(clock*20+k)*4,y)}g.lineTo(w*.6,-hgt);for(let k=10;k>=0;k--){const y=-hgt*k/10;g.lineTo(w*(1-.35*k/10)+Math.sin(clock*20+k+2)*4,y)}g.closePath();g.fill();
  g.globalAlpha=(1-down);g.fillStyle='#fff0c0';for(let k=0;k<6;k++){const yy=-((clock*500+k*60)%hgt);g.beginPath();g.ellipse(Math.sin(k*2.3+clock*8)*w*.3,yy,w*.25,w*.4,0,0,TAU);g.fill()}
  g.globalAlpha=1-down;glow('#ff8a2c',0,-hgt,w*2.5,.9);glow('#ff3d0a',0,0,w*3,.7);
  g.restore()};
const _gey10=drawGey;drawGey=function(h){h.sp.forEach(q=>{if(q.done)return;const u=clamp(h.t/q.dl,0,1);g.save();g.translate(q.x,q.y);g.scale(1,.55);
  g.fillStyle='rgba(20,4,0,'+(.3+.4*u)+')';g.beginPath();g.arc(0,0,46,0,TAU);g.fill();g.globalCompositeOperation='lighter';
  const rg=g.createRadialGradient(0,0,0,0,0,46*u);rg.addColorStop(0,'rgba(255,200,120,.8)');rg.addColorStop(1,'rgba(255,61,10,0)');g.fillStyle=rg;g.beginPath();g.arc(0,0,46,0,TAU);g.fill();
  g.strokeStyle='#ff8a2c';g.lineWidth=3;g.globalAlpha=.5+.5*u;for(let i=0;i<8;i++){const a=i*TAU/8+q.x;g.beginPath();g.moveTo(Math.cos(a)*10,Math.sin(a)*10);g.lineTo(Math.cos(a+.2)*30*u,Math.sin(a+.2)*30*u);g.lineTo(Math.cos(a)*46*u,Math.sin(a)*46*u);g.stroke()}
  g.restore();if(Math.random()<.3)fireP(q.x+rnd(-20,20),q.y+rnd(-8,8),0,rnd(-80,-30),rnd(4,8),.4,PAL.magma)})};

// ================= 김건우 : 몽키 레이드 =================
drawApe=function(h){
  if(h.t<0)return;const e=h.e,u=clamp(h.t/h.dur,0,1),x=h.sx+(e.x-h.sx)*u,y=h.sy+(e.y-h.sy)*u,z=Math.sin(Math.PI*u)*140,D=h.o.d,fade=u>=1?clamp(1-(h.t-h.dur)/.25,0,1):1,a=Math.atan2(e.y-h.sy,e.x-h.sx);
  g.save();g.globalAlpha=fade;g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(x,y+12,24*(1-z/300),9*(1-z/300),0,0,TAU);g.fill();
  if(u<1){g.save();g.globalAlpha=fade*.35;for(let k=1;k<4;k++){const uk=Math.max(0,u-k*.06),xk=h.sx+(e.x-h.sx)*uk,yk=h.sy+(e.y-h.sy)*uk-Math.sin(Math.PI*uk)*140;g.fillStyle=D.col;g.beginPath();g.arc(xk,yk,16-k*3,0,TAU);g.fill()}g.restore()}
  if(u>.7&&u<1){g.save();g.globalAlpha=(u-.7)/.3*.7;g.strokeStyle='#ff4655';g.lineWidth=2;g.beginPath();g.arc(e.x,e.y,e.r+14,0,TAU);g.stroke();g.restore()}
  g.translate(x,y-z);const sd=Math.cos(a)<0?-1:1;g.scale(sd*1.9,1.9);g.rotate(u<1?-.4+u*.8:0);g.lineJoin='round';g.lineCap='round';
  const fur=D.col,face=D.hi,K='#1a0e04';
  g.strokeStyle=fur;g.lineWidth=4;g.beginPath();g.moveTo(-10,8);g.quadraticCurveTo(-22,14,-20,2);g.quadraticCurveTo(-18,-8,-26,-6);g.stroke();
  g.lineWidth=5;g.beginPath();g.moveTo(6,4);g.lineTo(20,-10);g.moveTo(-4,6);g.lineTo(-14,-12);g.stroke();
  g.fillStyle=face;g.strokeStyle=K;g.lineWidth=1.6;[[20,-10],[-14,-12]].forEach(([px,py])=>{g.beginPath();g.arc(px,py,3.5,0,TAU);g.fill();g.stroke()});
  g.fillStyle=fur;g.beginPath();g.ellipse(0,8,9,8,0,0,TAU);g.fill();g.stroke();
  [-1,1].forEach(s=>{g.beginPath();g.arc(s*13,-4,5.5,0,TAU);g.fillStyle=fur;g.fill();g.stroke();g.beginPath();g.arc(s*13,-4,2.8,0,TAU);g.fillStyle=face;g.fill()});
  g.fillStyle=fur;g.beginPath();g.arc(0,-4,12,0,TAU);g.fill();g.stroke();
  g.fillStyle=face;g.beginPath();g.ellipse(-4,-5,4.5,5.5,0,0,TAU);g.ellipse(4,-5,4.5,5.5,0,0,TAU);g.ellipse(0,2,7.5,5,0,0,TAU);g.fill();
  g.fillStyle=K;g.beginPath();g.arc(-3.6,-5,1.7,0,TAU);g.arc(4.4,-5,1.7,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(-3.1,-5.6,.6,0,TAU);g.arc(4.9,-5.6,.6,0,TAU);g.fill();
  g.fillStyle='#5a1a10';g.beginPath();g.ellipse(0,3,4,2.6,0,0,Math.PI);g.fill();g.fillStyle='#fff';g.fillRect(-2.5,3,1.6,1.6);g.fillRect(.9,3,1.6,1.6);
  g.strokeStyle='#ff4655';g.lineWidth=2.5;g.beginPath();g.moveTo(-11,-10);g.quadraticCurveTo(0,-15,11,-10);g.stroke();g.fillStyle='#ff4655';g.beginPath();g.moveTo(11,-10);g.lineTo(17,-14);g.lineTo(15,-8);g.fill();
  g.restore();
};

// ================= 김건우 : 연막 원탭 =================
drawSmoke=function(h){
  const fa=Math.min(1,h.t/.25)*clamp((h.dur-h.t)/.4,0,1),R=h.r;
  g.save();g.globalAlpha=fa*.95;g.fillStyle='rgba(30,33,40,.55)';g.beginPath();g.ellipse(h.x,h.y+R*.15,R*1.05,R*.6,0,0,TAU);g.fill();
  for(let i=0;i<16;i++){const a=i*TAU/16+h.t*.35*(i%2?1:-1),rr=(i<8?R*.62:R*.34)*(1+.08*Math.sin(h.t*2+i)),r=R*(i<8?.42:.5)+Math.sin(h.t*1.5+i*1.3)*5,sh=i%3==0?'#8d93a1':i%3==1?'#6b7180':'#a8aebb';
    g.drawImage(spr(sh,1),h.x+Math.cos(a)*r-rr,h.y+Math.sin(a)*r*.8-rr-6,rr*2,rr*2)}
  g.globalAlpha=fa*.85;const cg=g.createRadialGradient(h.x-R*.2,h.y-R*.3,R*.1,h.x,h.y,R*.85);cg.addColorStop(0,'#b5bac6');cg.addColorStop(.6,'#7a8090');cg.addColorStop(1,'rgba(90,96,110,0)');g.fillStyle=cg;g.beginPath();g.arc(h.x,h.y,R*.85,0,TAU);g.fill();
  g.restore();
  if(!h.shot){const e=tgt(h.o);if(e&&!e.hid){const u=clamp(h.t/.7,0,1),o=h.o;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25+.65*u;g.strokeStyle='#ff4655';g.lineWidth=1+2*u;g.setLineDash([6,6]);g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);
    g.translate(e.x,e.y);const r=34-18*u;g.lineWidth=2;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();for(let i=0;i<4;i++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(r-6,0);g.lineTo(r+10,0);g.stroke()}g.fillStyle='#ff4655';g.beginPath();g.arc(0,0,2.5,0,TAU);g.fill();g.restore()}}
};

// ================= 김건우 : 바나나 트랩 =================
drawNana=function(h){
  const u=clamp(h.t/h.fl,0,1);let x=h.x,y=h.y,z=0;if(u<1){x=h.x0+(h.x-h.x0)*u;y=h.y0+(h.y-h.y0)*u;z=Math.sin(Math.PI*u)*110}
  g.save();g.globalAlpha=clamp((h.life-h.t)/.4,0,1);
  if(u>=1){g.save();g.globalAlpha*=.35+.25*Math.sin(clock*6);g.strokeStyle='#ffd43b';g.lineWidth=2;g.setLineDash([4,5]);g.beginPath();g.arc(x,y,26,0,TAU);g.stroke();g.restore()}
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(x,y+6,18*(1-z/240),6,0,0,TAU);g.fill();
  g.translate(x,y-z);g.rotate(u<1?h.t*12:.4);g.scale(1.7,1.7);g.lineJoin='round';
  for(let i=0;i<3;i++){g.save();g.rotate(i*TAU/3);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(10,-6,18,2);g.quadraticCurveTo(9,6,0,0);const bg=g.createLinearGradient(0,-4,0,4);bg.addColorStop(0,'#fff07a');bg.addColorStop(1,'#e0a800');g.fillStyle=bg;g.fill();g.strokeStyle='#5a4300';g.lineWidth=1.3;g.stroke();
    g.fillStyle='#5a4300';g.beginPath();g.arc(17,2,1.2,0,TAU);g.fill();g.restore()}
  g.fillStyle='#fffbe0';g.beginPath();g.arc(0,0,4.2,0,TAU);g.fill();g.strokeStyle='#5a4300';g.lineWidth=1;g.stroke();g.fillStyle='#6b4e00';g.fillRect(-1.5,-9,3,5);
  g.restore();
};
