// ===== extra9.js : 김민채 • 김민재 (괴물 수비수) =====

const NEW19=['kj_whistle','kj_slide','kj_bump','kj_block','kj_kick','kj_crowd','kj_flag','kj_mark'];
NEW19.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='kj_block'||n=='kj_bump'?5:3)});
Object.assign(SLB,{kj_whistle:'김민재 · 휘슬',kj_slide:'김민재 · 슬라이딩',kj_bump:'김민재 · 몸싸움',kj_block:'김민재 · 차단',kj_kick:'김민재 · 클리어링 킥',kj_crowd:'김민재 · 관중 함성',kj_flag:'김민재 · 오프사이드 깃발',kj_mark:'김민재 · 마크 시작'});
const KJSK=[
  {n:'철벽 마크',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<420,f:(o,t)=>kjMark(o,t)},
  {n:'인터셉트 · 클리어링',w:.25,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>kjBlock(o,t)},
  {n:'오프사이드 트랩',w:.8,ult:1,f:(o,t)=>kjUlt(o,t)}];
const KJI=DEF.findIndex(d=>d.name=='김민채');
DEF.push({name:'김민채 • 김민재',gl:'재',k:'kmj',heavy:1,vof:KJI,r:32,sp:190,col:'#2f6bff',hi:'#dfe8ff',dk:'#081a4a',alt:{col:'#e8323c',hi:'#ffdcdc',dk:'#4a080c'},alt2:{col:'#f2c94c',hi:'#fff3cf',dk:'#3a2a04'},sk:KJSK});
INFO['김민채 • 김민재']={st:[7,10,5,6,8,9],p:'수비수 · 받는 피해 감소 + 시작 2.5초 동안 아무것도 안 통함 (킥오프 철벽)',
  sk:[['2.2×5','상대를 찰거머리처럼 따라붙어 3초 동안 마크 · 상대는 느려지고 계속 몸싸움에 밀림'],['4+1×차단','1.2초 동안 주변으로 날아오는 공격을 전부 끊어냄 (받는 피해 절반) · 끝나면 공을 상대한테 걷어참 · 많이 막을수록 셈'],['7×3','경기장이 축구장이 되고 수비 라인을 끌어올려 상대를 밀어냄 · 오프사이드 깃발이 올라가면 멈춘 상대에게 슬라이딩 태클 세 번']]};

// ---------- 패시브 : 킥오프 철벽 ----------
const _hurtKJ=hurt;hurt=function(t){if(t&&t.d&&t.d.k=='kmj'&&(t.kjInv>0||t.kjHalf>0)){if(t.kjInv>0){if(Math.random()<.3)ft(t.x,t.y-t.r-24,'철벽','#dfe8ff',18);return}const a=[...arguments];a[1]=Math.round(a[1]*.5*10)/10;return _hurtKJ.apply(this,a)}return _hurtKJ.apply(this,arguments)};
const _updKJ=update;update=function(dt){_updKJ(dt);if(!F)return;F.forEach(f=>{if(f.d.k!='kmj'||f.dead)return;if(f.kjInv==null&&phase=='play')f.kjInv=2.5;if(phase=='play'&&f.kjInv>0)f.kjInv-=dt;if(f.kjHalf>0)f.kjHalf-=dt})};
const _initKJ=init;init=function(){const r=_initKJ.apply(this,arguments);if(F)F.forEach(f=>{f.kjInv=null});return r};

// ---------- 그림 ----------
function kjBall(r,rot){g.save();g.rotate(rot||0);socBall(r);g.restore()}
function kjPitch(a){g.save();g.globalAlpha=a;for(let i=0;i<10;i++){g.fillStyle=i%2?'#2f8a3a':'#3a9a44';g.fillRect(i*A/10,0,A/10,A)}
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=4;g.strokeRect(14,14,A-28,A-28);g.beginPath();g.moveTo(A/2,14);g.lineTo(A/2,A-14);g.stroke();g.beginPath();g.arc(A/2,A/2,70,0,TAU);g.stroke();
  [14,A-14].forEach((x,k)=>{const sd=k?-1:1;g.strokeRect(k?x-90:x,A/2-130,90,260);g.strokeRect(k?x-34:x,A/2-60,34,120);g.beginPath();g.arc(x+sd*64,A/2,46,sd>0?-1.0:Math.PI-1.0+0,sd>0?1.0:Math.PI+1.0);g.stroke()});
  const v=g.createRadialGradient(A/2,A/2,A*.3,A/2,A/2,A*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');g.fillStyle=v;g.fillRect(0,0,A,A);g.restore()}
function kjFlag(x,y,up,al){g.save();g.translate(x,y);g.globalAlpha=al;g.strokeStyle='#e8e8e8';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(0,20);g.lineTo(0,-30);g.stroke();
  g.rotate(-(1-up)*1.2);const w=Math.sin(clock*14)*3;g.fillStyle='#ffd23a';g.beginPath();g.moveTo(0,-30);g.lineTo(22,-28+w);g.lineTo(22,-14+w);g.lineTo(0,-16);g.closePath();g.fill();g.fillStyle='#e8323c';g.beginPath();g.moveTo(0,-30);g.lineTo(11,-29+w*.5);g.lineTo(11,-15+w*.5);g.lineTo(0,-16);g.closePath();g.fill();g.restore()}
function kjTurf(x,y,a,n){for(let i=0;i<n;i++){const aa=a+Math.PI+rnd(-.6,.6),v=rnd(80,220),l=rnd(.4,.8);Pt.push({x,y,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v-60,l,m:l,sh:13,col:['#3fae4a','#2b8a3a','#7dd56f','#6a4a2a'][i%4],r:rnd(2,3.5),rot:rnd(0,TAU),vr:rnd(-10,10),gy:300,fr:.4})}}

// ---------- 아이콘 (네온 방패 + 축구공) ----------
EMB.kmj=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(0,-20);g.lineTo(16,-13);g.lineTo(14,4);g.quadraticCurveTo(10,15,0,20);g.quadraticCurveTo(-10,15,-14,4);g.lineTo(-16,-13);g.closePath()});
  neon({col:'#ffffff',hi:'#ffffff'},1.3,()=>{g.beginPath();g.arc(0,0,7,0,TAU);g.moveTo(0,-3);g.lineTo(3,-1);g.lineTo(2,3);g.lineTo(-2,3);g.lineTo(-3,-1);g.closePath()});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.4);g.restore()};
const _lowKJ=lowHP;lowHP=function(f){_lowKJ(f);if(f.d.k=='kmj'&&f.kjInv>0&&!f.dead&&!f.hid&&phase=='play'){g.save();g.translate(f.x,f.y);g.globalAlpha=Math.min(1,f.kjInv);g.strokeStyle='#dfe8ff';g.lineWidth=3;g.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6+clock;g.lineTo(Math.cos(a)*(f.r+10),Math.sin(a)*(f.r+10))}g.closePath();g.stroke();g.globalCompositeOperation='lighter';glow('#9fc0ff',0,0,f.r*2,.3);g.restore()}};

// ---------- 1) 철벽 마크 ----------
function kjMark(o,t){HZ.push({k:'kjmark',o,tg:t,t:0,n:0,side:Math.random()<.5?1:-1,fp:[]});SFXa('kj_mark')}
HZX.kjmark=(h,dt)=>{const o=h.o,e=h.tg;if(o.dead||!e||e.dead||e.hid)return false;const D=3;if(h.t>D)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;
  // 상대 옆에 딱 붙어서 따라감
  const ea=Math.atan2(e.dy,e.dx)+h.side*Math.PI/2,tx=clamp(e.x+Math.cos(ea)*(o.r+e.r+4),o.r,A-o.r),ty=clamp(e.y+Math.sin(ea)*(o.r+e.r+4),o.r,A-o.r);o.x+=(tx-o.x)*Math.min(1,dt*9);o.y+=(ty-o.y)*Math.min(1,dt*9);
  e.slow=Math.max(e.slow,.3);if(Math.random()<dt*8)h.fp.push({x:o.x+rnd(-6,6),y:o.y+o.r*.8,t:h.t});h.fp=h.fp.filter(q=>h.t-q.t<.8);
  if(h.t>=.35+h.n*.55&&h.n<5){h.n++;const a=ang(o,e);hurt(e,2.2,o,e.x,e.y,0,0);SFXa('kj_bump');safePush(e,a,24);e.sq=1;e.sa=a;e.cast=null;ring((o.x+e.x)/2,(o.y+e.y)/2,4,40,'#dfe8ff',4,.25);kjTurf(e.x,e.y,a+Math.PI,4)}
  return true};
HZD.kjmark=h=>{h.fp.forEach(q=>{const a=1-(h.t-q.t)/.8;g.save();g.globalAlpha=a*.5;g.fillStyle='#0a1a3a';g.beginPath();g.ellipse(q.x,q.y,4,2.4,0,0,TAU);g.fill();g.restore()})};
HZP.kjmark=h=>{const o=h.o,e=h.tg;if(!e||e.dead||o.dead||h.t>3)return;const a=Math.min(1,h.t/.2)*clamp((3-h.t)/.3,0,1);g.save();g.globalAlpha=a;
  g.strokeStyle='#2f6bff';g.lineWidth=3;g.setLineDash([2,6]);g.lineCap='round';g.beginPath();g.moveTo(o.x,o.y);g.lineTo(e.x,e.y);g.stroke();g.setLineDash([]);
  g.translate(e.x,e.y);g.rotate(clock*2);g.strokeStyle='#dfe8ff';g.lineWidth=2.5;const R=e.r+10;for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.arc(0,0,R,-.35,.35);g.stroke()}g.restore()};

// ---------- 2) 인터셉트 · 클리어링 ----------
function kjBlock(o,t){HZ.push({k:'kjblk',o,tg:t,t:0,n:0,cut:[],ball:null});o.kjHalf=1.25;SFXa('kj_whistle')}
HZX.kjblk=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;const D=1.2,R=150;
  if(h.t<D){o.gcd=Math.max(o.gcd,.3);
    // 날아오는 공격 끊기
    const before=B.length;B=B.filter(q=>{if(q.o==o||Math.hypot(q.x-o.x,q.y-o.y)>R)return true;h.n++;h.cut.push({x:q.x,y:q.y,t:h.t});SFXa('kj_block');spark(q.x,q.y,'dust',6,160);return false});
    EN.forEach(e=>{if(e.hid)return;const d=dist(o,e);if(d<o.r+e.r+20&&!e.kjb){e.kjb=1;const a=ang(o,e);e.x=clamp(e.x+Math.cos(a)*50,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*50,e.r,A-e.r);e.cast=null;SFXa('kj_bump');setTimeout(()=>{e.kjb=0},400)}})}
  else if(!h.ball){let e=h.tg;if(!e||e.dead)e=tgt(o);if(!e)return false;const a=ang(o,e);h.ball={x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,v:900,tg:e,t:0,dmg:4+Math.min(8,h.n)};SFXa('kj_kick');kjTurf(o.x,o.y,a,8);ring(o.x,o.y,o.r,o.r+40,'#ffffff',4,.3)}
  if(h.ball){const b=h.ball;b.t+=dt;const e=b.tg;if(e&&!e.dead){let da=Math.atan2(e.y-b.y,e.x-b.x)-b.a;da=Math.atan2(Math.sin(da),Math.cos(da));b.a+=clamp(da,-4*dt,4*dt)}b.x+=Math.cos(b.a)*b.v*dt;b.y+=Math.sin(b.a)*b.v*dt;
    emit(60,dt,()=>{const l=rnd(.15,.3);Pt.push({x:b.x,y:b.y,vx:-Math.cos(b.a)*80+rnd(-30,30),vy:-Math.sin(b.a)*80+rnd(-30,30),l,m:l,gl:1,sh:5,col:'#ffffff',r:2,fr:.1})});
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-b.x,x.y-b.y)<x.r+12);if(hit){hurt(hit,b.dmg,o,hit.x,hit.y,0,b.dmg>=9);hit.stn=Math.max(hit.stn,.3);hit.flyA=b.a;hit.flyT=.18;hit.flyV=700;shake=Math.max(shake,10);ring(hit.x,hit.y,6,70,'#ffffff',5,.35);return false}
    if(b.x<-20||b.x>A+20||b.y<-20||b.y>A+20||b.t>1.2)return false}
  return true};
HZD.kjblk=h=>{const o=h.o;if(o.dead||h.t>1.3)return;const a=Math.min(1,h.t/.12)*clamp((1.3-h.t)/.2,0,1),R=150;g.save();g.translate(o.x,o.y);g.globalAlpha=a;
  g.fillStyle='rgba(47,107,255,.10)';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.strokeStyle='rgba(223,232,255,.8)';g.lineWidth=2.5;g.setLineDash([10,7]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();g.setLineDash([]);
  g.strokeStyle='#2f6bff';g.lineWidth=5;g.globalAlpha=a*.7;for(let i=0;i<3;i++){const s=clock*2+i*TAU/3;g.beginPath();g.arc(0,0,R-8,s,s+.7);g.stroke()}g.restore()};
HZP.kjblk=h=>{h.cut.forEach(c=>{const q=h.t-c.t;if(q>.4)return;g.save();g.translate(c.x,c.y);g.globalAlpha=1-q/.4;g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';const s=10+q*40;g.beginPath();g.moveTo(-s,-s);g.lineTo(s,s);g.moveTo(s,-s);g.lineTo(-s,s);g.stroke();g.restore()});
  if(h.n&&h.t<1.2){const o=h.o;g.save();g.font='700 14px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('차단 '+h.n,o.x,o.y-o.r-30);g.fillStyle='#dfe8ff';g.fillText('차단 '+h.n,o.x,o.y-o.r-30);g.restore()}
  if(h.ball){const b=h.ball;g.save();g.translate(b.x,b.y);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,20,.6);g.restore();kjBall(10,b.t*30);g.restore()}};

// ---------- 3) ULT 오프사이드 트랩 ----------
function kjUlt(o,t){const EN=F.filter(x=>x!=o&&!x.dead);const ex=EN.length?EN.reduce((s,e)=>s+e.x,0)/EN.length:A/2,dir=ex>o.x?1:-1;
  HZ.push({k:'kjult',o,t:0,dir,lx:dir>0?Math.max(20,o.x):Math.min(A-20,o.x),ph:0,n:0,sl:null,stuck:[]});SFXa('kj_crowd');SFXa('kj_whistle')}
HZX.kjult=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.4);o.cast=null;const L0=.35,L1=1.5,FL=1.6;
  // 수비 라인 끌어올리기
  if(h.t>=L0&&h.t<L1){h.lx+=h.dir*380*dt;h.lx=clamp(h.lx,110,A-110);EN.forEach(e=>{if(e.hid||e.jump)return;if(h.dir>0?e.x<h.lx+e.r:e.x>h.lx-e.r){e.x=clamp(h.lx+h.dir*(e.r+2),e.r,A-e.r);e.cast=null}});o.x+=(h.lx-h.dir*40-o.x)*Math.min(1,dt*6)}
  if(h.t>=FL&&!h.fl){h.fl=1;SFXa('kj_flag');SFXa('kj_whistle');h.stuck=EN.filter(e=>!e.hid&&!e.jump);h.stuck.forEach(e=>{e.stn=Math.max(e.stn,1.9);e.cast=null});shake=Math.max(shake,8)}
  // 슬라이딩 태클 세 번
  if(h.fl&&h.n<3&&!h.sl&&h.t>=FL+.35+h.n*.5){const live=h.stuck.filter(e=>!e.dead);if(!live.length){h.n=3}else{const e=live[h.n%live.length],a=Math.atan2(e.y-o.y,e.x-o.x);h.sl={sx:o.x,sy:o.y,a,e,t:0,hit:0};h.n++;SFXa('kj_slide')}}
  if(h.sl){const s=h.sl;s.t+=dt;const u=Math.min(1,s.t/.32),d=Math.hypot(s.e.x-s.sx,s.e.y-s.sy)+60;o.x=clamp(s.sx+Math.cos(s.a)*d*u,o.r,A-o.r);o.y=clamp(s.sy+Math.sin(s.a)*d*u,o.r,A-o.r);o.sa=s.a;o.sq=.5;kjTurf(o.x,o.y+o.r*.6,s.a,2);
    if(!s.hit&&!s.e.dead&&dist(o,s.e)<o.r+s.e.r+8){s.hit=1;hurt(s.e,7,o,s.e.x,s.e.y,0,1);s.e.flyA=s.a-Math.PI/2*.3;s.e.flyT=.2;s.e.flyV=500;SFXa('kj_bump');shake=Math.max(shake,12);kjTurf(s.e.x,s.e.y,s.a,12)}if(u>=1)h.sl=null}
  if(h.n>=3&&!h.sl&&!h.end){h.end=1;h.et=h.t;SFXa('kj_crowd')}
  return !h.end||h.t<h.et+.6};
HZD.kjult=h=>{const a=Math.min(1,h.t/.35)*(h.end?clamp(1-(h.t-h.et)/.6,0,1):1);kjPitch(a*.85);
  g.save();g.globalAlpha=a;g.strokeStyle='#ffd23a';g.lineWidth=5;g.setLineDash([16,10]);g.lineDashOffset=-clock*80;g.beginPath();g.moveTo(h.lx,0);g.lineTo(h.lx,A);g.stroke();g.setLineDash([]);g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,210,58,.12)';g.fillRect(h.dir>0?0:h.lx,0,h.dir>0?h.lx:A-h.lx,A);g.restore()};
HZP.kjult=h=>{const a=Math.min(1,h.t/.35)*(h.end?clamp(1-(h.t-h.et)/.6,0,1):1);if(h.fl){const u=clamp((h.t-1.6)/.15,0,1);kjFlag(h.lx,34,u,a);kjFlag(h.lx,A-14,u,a);
    if(h.t<2.6){g.save();g.globalAlpha=a*clamp((2.6-h.t)/.3,0,1);const s=back(clamp((h.t-1.6)/.2,0,1));g.translate(A/2,A*.2);g.scale(s,s);g.font='900 40px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#0a1a3a';g.strokeText('오프사이드!',0,0);g.fillStyle='#ffd23a';g.fillText('오프사이드!',0,0);g.restore()}}
  if(h.sl){const o=h.o;g.save();g.translate(o.x,o.y);g.rotate(h.sl.a);g.globalAlpha=.5;g.fillStyle='#3a2a14';g.fillRect(-60,o.r*.5,60,6);g.restore()}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
