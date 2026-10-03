// ===== extra12.js : 김가은 • 어쩌라고 =====

const NEW22=['ez_say','ez_shield','ez_reflect','ez_letter','ez_bounce','ez_msg','ez_stamp','ez_ult'];
NEW22.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='ez_bounce'||n=='ez_msg'?6:3)});
Object.assign(SLB,{ez_say:'어쩌라고 · "어쩌라고" 뿅',ez_shield:'어쩌라고 · 무시 방패',ez_reflect:'어쩌라고 · 튕겨내기',ez_letter:'어쩌라고 · 글자 던지기',ez_bounce:'어쩌라고 · 글자 튕김',ez_msg:'어쩌라고 · 메시지 알림',ez_stamp:'어쩌라고 · 대왕 도장',ez_ult:'어쩌라고 · 궁 시작'});
const EZSK=[
  {n:'어쩌라고 방패',w:.2,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<420,f:(o,t)=>ezShield(o,t)},
  {n:'어·쩌·라·고',w:.3,cd:7,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>ezLetters(o,t)},
  {n:'무한 어쩌라고',w:.6,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>ezUlt(o,t)}];
const EZI=DEF.findIndex(d=>d.name=='김가은');
DEF.push({name:'김가은 • 어쩌라고',gl:'어',k:'ezr',vof:EZI,r:26,sp:208,col:'#ff7ac8',hi:'#ffe6f4',dk:'#4a0a2e',alt:{col:'#7ad0ff',hi:'#e2f6ff',dk:'#0a2e4a'},alt2:{col:'#c8ff5a',hi:'#f2ffd8',dk:'#2a4a0a'},sk:EZSK});
INFO['김가은 • 어쩌라고']={st:[7,8,6,8,7,9],p:'무관심 · 둔화 · 기절 · 공포 같은 상태이상이 절반만 걸림 (어쩌라고)',
  sk:[['반사 + 7','1.2초 동안 "어쩌라고" 말풍선 방패 · 날아오는 공격은 상대한테 튕겨 보내고, 받은 피해는 무시한 뒤 그만큼 되돌려 줌'],['3.5×4','"어" "쩌" "라" "고" 네 글자를 던짐 · 글자가 벽과 상대에 통통 튕기며 계속 때림'],['2.2×8+11','화면이 채팅방이 되고 상대가 보내는 메시지마다 "어쩌라고"로 받아침 · 마지막에 대왕 "어쩌라고" 도장 쾅']]};

// ---------- 패시브 : 무관심 (상태이상 절반) ----------
const _updEZ=update;update=function(dt){const pre=F?F.filter(f=>f.d.k=='ezr'&&!f.dead).map(f=>[f,f.slow,f.stn,f.fear||0]):[];_updEZ(dt);
  pre.forEach(([f,s0,t0,fe0])=>{if(f.slow>s0+.01)f.slow=s0+(f.slow-s0)*.5;if(f.stn>t0+.01)f.stn=t0+(f.stn-t0)*.5;if((f.fear||0)>fe0+.01)f.fear=fe0+(f.fear-fe0)*.5})};

// ---------- 그림 : 말풍선 + 글자 ----------
function ezBubble(x,y,txt,s,al,col,tail){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;g.font='900 22px "Black Han Sans",'+FB;const w=g.measureText(txt).width+28,h=40;
  g.fillStyle='rgba(0,0,0,.3)';ezRR(-w/2+3,-h/2+4,w,h,14);g.fill();g.fillStyle='#ffffff';g.strokeStyle=col||'#ff7ac8';g.lineWidth=3;ezRR(-w/2,-h/2,w,h,14);g.fill();g.stroke();
  if(tail!==0){g.beginPath();g.moveTo(-6,h/2-1);g.lineTo(-14,h/2+12);g.lineTo(6,h/2-1);g.closePath();g.fill();g.stroke();g.fillRect(-7,h/2-4,14,5)}
  g.fillStyle='#1a1020';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,1);g.restore()}
function ezRR(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
function ezGlyph(ch,s,rot,col){g.save();g.rotate(rot);g.scale(s,s);g.font='900 30px "Black Han Sans",'+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';glow(col,0,0,26,.55);g.restore();g.lineWidth=8;g.strokeStyle='#2a0a1e';g.strokeText(ch,0,0);const gr=g.createLinearGradient(0,-14,0,14);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,col);g.fillStyle=gr;g.fillText(ch,0,0);g.restore()}

// ---------- 아이콘 (네온 말풍선 + 어쩌) ----------
EMB.ezr=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.5)*.06);
  neon(D,1.8,()=>{ezRR(-17,-14,34,22,8);g.moveTo(-6,8);g.lineTo(-10,16);g.lineTo(2,8)});
  g.fillStyle=D.hi;g.font='900 11px "Black Han Sans",'+FB;g.textAlign='center';g.textBaseline='middle';g.fillText('ㅇㅉ',0,-3);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-3,14,.45);g.restore()};

// ---------- 1) 어쩌라고 방패 ----------
function ezShield(o,t){HZ.push({k:'ezsh',o,tg:t,t:0,soak:0,n:0,pops:[]});o.ezsh=1;SFXa('ez_shield');SFXa('ez_say')}
const _hurtEZ=hurt;hurt=function(t,n,o){if(t&&t.ezsh&&n>0&&o&&o!=t){const h=HZ.find(q=>q.k=='ezsh'&&q.o==t);if(h){h.soak+=n;h.pops.push({t:h.t,a:rnd(-.5,.5)});SFXa('ez_reflect');return}}return _hurtEZ.apply(this,arguments)};
HZX.ezsh=(h,dt,EN)=>{const o=h.o;if(o.dead){o.ezsh=0;return false}const D=1.2,R=o.r+46;
  if(h.t<D){B.forEach(q=>{if(q.o==o||q.ezr)return;if(Math.hypot(q.x-o.x,q.y-o.y)<R+q.r){const e=q.o&&!q.o.dead?q.o:tgt(o);const a=e?Math.atan2(e.y-q.y,e.x-q.x):Math.atan2(q.y-o.y,q.x-o.x);const sp=Math.hypot(q.vx,q.vy)*1.2;q.vx=Math.cos(a)*sp;q.vy=Math.sin(a)*sp;q.a=a;q.o=o;q.ezr=1;h.n++;SFXa('ez_reflect');ring(q.x,q.y,4,30,'#ff7ac8',3,.25);h.pops.push({t:h.t,a:rnd(-.5,.5)})}})}
  else if(!h.done){h.done=1;o.ezsh=0;let e=h.tg;if(!e||e.dead)e=tgt(o);if(e&&!e.hid){const dmg=Math.round(Math.min(16,7+h.soak*1.5)*10)/10;h.sx=o.x;h.sy=o.y-o.r-30;h.fl={e,dmg,t:h.t}}}
  if(h.fl){const q=h.t-h.fl.t,u=Math.min(1,q/.3);h.bx=h.sx+(h.fl.e.x-h.sx)*u;h.by=h.sy+(h.fl.e.y-h.sy)*u-Math.sin(u*Math.PI)*60;if(u>=1&&!h.hit){h.hit=1;const e=h.fl.e;if(!e.dead){hurt(e,h.fl.dmg,o,e.x,e.y,0,h.fl.dmg>=9);SFXa('ez_stamp');shake=Math.max(shake,8);ring(e.x,e.y,6,70,'#ff7ac8',6,.35)}}if(h.hit&&q>.7)return false}
  return true};
HZP.ezsh=h=>{const o=h.o;if(o.dead)return;const D=1.2;
  if(h.t<D){const s=back(clamp(h.t/.15,0,1)),R=o.r+46;g.save();g.translate(o.x,o.y);g.globalAlpha=clamp((D-h.t)/.15,0,1);g.strokeStyle='#ff7ac8';g.lineWidth=3;g.setLineDash([10,6]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,R*s,0,TAU);g.stroke();g.setLineDash([]);
    g.fillStyle='rgba(255,122,200,.10)';g.beginPath();g.arc(0,0,R*s,0,TAU);g.fill();g.restore();ezBubble(o.x,o.y-o.r-32+Math.sin(clock*8)*2,'어쩌라고',s,1,'#ff7ac8');
    h.pops.forEach(p=>{const k=h.t-p.t;if(k>.5)return;g.save();g.translate(o.x+Math.sin(p.a)*40,o.y-30-k*60);g.globalAlpha=1-k/.5;g.font='700 14px '+FB;g.fillStyle='#ffe6f4';g.textAlign='center';g.fillText('무시',0,0);g.restore()})}
  if(h.fl&&!h.hit){g.save();g.translate(h.bx,h.by);g.rotate(Math.sin(h.t*20)*.2);ezBubble(0,0,'어쩌라고',1.1,1,'#ff7ac8',0);g.restore()}};

// ---------- 2) 어·쩌·라·고 ----------
function ezLetters(o,t){const a0=ang(o,t);HZ.push({k:'ezlet',o,tg:t,t:0,L:['어','쩌','라','고'].map((ch,i)=>({ch,x:o.x,y:o.y,a:a0+(i-1.5)*.32,v:520,dl:i*.07,on:0,b:0,rot:0,cd:0,hits:0,live:1}))});SFXa('ez_letter')}
HZX.ezlet=(h,dt,EN)=>{const o=h.o;let alive=0;
  h.L.forEach(l=>{if(!l.live)return;alive++;if(h.t<l.dl)return;if(!l.on){l.on=1;l.x=o.x;l.y=o.y}l.cd-=dt;l.x+=Math.cos(l.a)*l.v*dt;l.y+=Math.sin(l.a)*l.v*dt;l.rot+=dt*8;
    let bn=0;if(l.x<14||l.x>A-14){l.a=Math.PI-l.a;l.x=clamp(l.x,14,A-14);bn=1}if(l.y<14||l.y>A-14){l.a=-l.a;l.y=clamp(l.y,14,A-14);bn=1}if(bn){l.b++;SFXa('ez_bounce');spark(l.x,l.y,'dust',4,100);if(l.b>4){l.live=0;return}}
    const e=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-l.x,x.y-l.y)<x.r+14);if(e&&l.cd<=0){l.cd=.35;l.hits++;hurt(e,3.5,o,l.x,l.y,0,0);SFXa('ez_bounce');const n=Math.atan2(l.y-e.y,l.x-e.x);l.a=2*n-l.a+Math.PI;l.x=e.x+Math.cos(n)*(e.r+16);l.y=e.y+Math.sin(n)*(e.r+16);if(l.hits>=3)l.live=0}
    if(h.t>3)l.live=0});
  return alive>0};
HZP.ezlet=h=>{h.L.forEach(l=>{if(!l.live||!l.on)return;g.save();g.translate(l.x,l.y);ezGlyph(l.ch,1.15,Math.sin(l.rot)*.3,'#ff7ac8');g.restore()})};

// ---------- 3) ULT 무한 어쩌라고 ----------
const EZ_M=['아파…','그만해','진짜 아프다고','너 왜 그래','제발','엄마…','신고할거야','ㅠㅠ'];
function ezUlt(o,t){HZ.push({k:'ezult',o,tg:t,t:0,n:0,msgs:[]});SFXa('ez_ult')}
HZX.ezult=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}const M0=.55,MS=.3,N=8;
  if(h.n<N&&h.t>=M0+h.n*MS){const i=h.n++;h.msgs.push({who:1,txt:EZ_M[i%EZ_M.length],t:h.t});SFXa('ez_msg');h.msgs.push({who:0,txt:'어쩌라고',t:h.t+.14,hit:0})}
  h.msgs.forEach(m=>{if(m.who==0&&!m.hit&&h.t>=m.t){m.hit=1;SFXa('ez_say');if(e&&!e.dead&&!e.hid)hurt(e,2.2,o,e.x,e.y,0,0)}});
  const S0=M0+N*MS+.35;if(h.t>=S0&&!h.st){h.st=1;h.stt=h.t;SFXa('ez_stamp');shake=Math.max(shake,20);hs=.12;FX.push({k:'frost',l:.12,m:.12,c:'#ffe6f4'});if(e&&!e.dead&&!e.hid){hurt(e,11,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5)}}
  return !h.st||h.t<h.stt+1};
HZD.ezult=h=>{const fa=Math.min(1,h.t/.35)*(h.st?clamp(1-(h.t-h.stt-.5)/.5,0,1):1);g.save();g.globalAlpha=fa*.92;g.fillStyle='#b7c9d9';g.fillRect(0,0,A,A);g.fillStyle='#a6b8c8';g.fillRect(0,0,A,46);
  g.globalAlpha=fa;g.font='700 16px '+FB;g.fillStyle='#1a2030';g.textAlign='center';g.textBaseline='middle';g.fillText('‹   상대   (1)',A/2,24);g.restore()};
HZP.ezult=h=>{const fa=Math.min(1,h.t/.35)*(h.st?clamp(1-(h.t-h.stt-.5)/.5,0,1):1);if(fa<=0)return;const shown=h.msgs.filter(m=>h.t>=m.t),base=A-70;
  g.save();g.globalAlpha=fa;shown.slice().reverse().forEach((m,k)=>{const y=base-k*48;if(y<60)return;const age=h.t-m.t,s=back(clamp(age/.18,0,1));g.font='700 17px '+FB;const w=g.measureText(m.txt).width+26;
    const x=m.who?30:A-30-w;g.save();g.translate(x+(m.who?0:w),y);g.scale(s,s);g.translate(-(m.who?0:w),0);g.fillStyle=m.who?'#ffffff':'#ffe14a';ezRR(0,-17,w,34,12);g.fill();g.fillStyle='#1a1a20';g.textAlign='left';g.textBaseline='middle';g.fillText(m.txt,13,1);
    if(!m.who){g.font='600 10px '+FB;g.fillStyle='#7a6a10';g.textAlign='right';g.fillText('1',-4,10)}g.restore()});g.restore();
  if(h.st){const q=h.t-h.stt,s=q<.12?3-2*(q/.12):1,e=h.tg,x=e&&!e.dead?e.x:A/2,y=e&&!e.dead?e.y:A/2;g.save();g.translate(x,y);g.scale(s,s);g.rotate(-.15);g.globalAlpha=clamp((1-q)/.3,0,1);
    g.strokeStyle='#e8202c';g.lineWidth=6;ezRR(-110,-38,220,76,10);g.stroke();g.lineWidth=2;ezRR(-100,-30,200,60,8);g.stroke();g.font='900 46px "Black Han Sans",'+FB;g.fillStyle='#e8202c';g.textAlign='center';g.textBaseline='middle';g.fillText('어쩌라고',0,3);g.restore()}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
