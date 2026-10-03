// ===== extra11.js : 김티비 • 최해솔 (평범한 고1) =====

const NEW21=['hs_bell','hs_run','hs_bread','hs_paper','hs_grade','hs_chalk','hs_tap','hs_slam','hs_grow'];
NEW21.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='hs_chalk'||n=='hs_tap'||n=='hs_paper'?6:3)});
Object.assign(SLB,{hs_bell:'최해솔 · 학교 종',hs_run:'최해솔 · 전력질주',hs_bread:'최해솔 · 빵 먹기',hs_paper:'최해솔 · 시험지 날리기',hs_grade:'최해솔 · 빨간펜 채점',hs_chalk:'최해솔 · 분필 던지기',hs_tap:'최해솔 · 분필 맞음',hs_slam:'최해솔 · 출석부 쾅',hs_grow:'최해솔 · 성장'});
const HSSK=[
  {n:'매점 런',w:.3,cd:8,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>hsRun(o,t)},
  {n:'중간고사',w:.35,cd:8,c:(o,t)=>!t.hid&&dist(o,t)<600,f:(o,t)=>hsExam(o,t)},
  {n:'자습 시간',w:.7,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>hsUlt(o,t)}];
const HSI=DEF.findIndex(d=>d.name=='김티비');
DEF.push({name:'김티비 • 최해솔',gl:'솔',k:'hsol',vof:HSI,r:26,sp:212,col:'#4fd1a5',hi:'#dcfff1',dk:'#063a2a',alt:{col:'#ff9a3c',hi:'#ffe6cc',dk:'#3a1e04'},alt2:{col:'#8a7bff',hi:'#e6e2ff',dk:'#1c1450'},sk:HSSK});
INFO['김티비 • 최해솔']={st:[7,7,7,7,7,9],p:'성장기 · 특별한 건 없지만 12초마다 조금씩 큼 (피해 · 속도 +5%, 최대 5번)',
  sk:[['3×2 + 회복','종이 울리면 매점까지 전력질주 · 가는 길에 부딪힌 상대를 두 번 들이받고 빵 먹고 체력 회복'],['2~7 ×4','시험지 네 장을 날림 · 맞으면 빨간펜으로 채점 · 점수가 낮을수록 아픔 (0점이면 7)'],['1.2×12+7','경기장이 교실이 됨 · 칠판에서 분필이 쏟아지고 마지막에 출석부로 내리침']]};

// ---------- 패시브 : 성장기 ----------
const _updHS=update;update=function(dt){_updHS(dt);if(!F||phase!='play')return;F.forEach(f=>{if(f.d.k!='hsol'||f.dead)return;f.hgT=(f.hgT||0)+dt;if(f.hgT>=12&&(f.hg||0)<5){f.hgT=0;f.hg=(f.hg||0)+1;f.sp=f.d.sp*(1+.05*f.hg);SFXa('hs_grow');ft(f.x,f.y-f.r-34,'성장 +'+f.hg,'#4fd1a5',22);ring(f.x,f.y,f.r,f.r+40,'#4fd1a5',4,.4);
  for(let i=0;i<10;i++)Pt.push({x:f.x+rnd(-f.r,f.r),y:f.y+f.r,vx:0,vy:rnd(-160,-90),l:.6,m:.6,gl:1,sh:5,col:'#a8ffd8',r:1.8,fr:.2})}})};
const _hurtHS=hurt;hurt=function(t,n,o){if(o&&o.d&&o.d.k=='hsol'&&o.hg&&t!=o&&n>0){const a=[...arguments];a[1]=Math.round(n*(1+.05*o.hg)*10)/10;return _hurtHS.apply(this,a)}return _hurtHS.apply(this,arguments)};

// ---------- 그림 ----------
function hsBread(s){g.save();g.scale(s,s);const bg=g.createLinearGradient(0,-8,0,8);bg.addColorStop(0,'#e0a050');bg.addColorStop(1,'#a8641c');g.fillStyle=bg;g.strokeStyle='#5a3008';g.lineWidth=1.2;
  g.beginPath();g.moveTo(-11,6);g.lineTo(-11,-2);g.quadraticCurveTo(-11,-9,-5,-9);g.quadraticCurveTo(0,-12,5,-9);g.quadraticCurveTo(11,-9,11,-2);g.lineTo(11,6);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff3d0';g.beginPath();g.moveTo(-8,5);g.lineTo(-8,-1);g.quadraticCurveTo(-8,-6,-3,-6);g.quadraticCurveTo(0,-8,3,-6);g.quadraticCurveTo(8,-6,8,-1);g.lineTo(8,5);g.closePath();g.fill();g.restore()}
function hsPaper(s,score,rot){g.save();g.rotate(rot||0);g.scale(s,s);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-11,-13,24,30);g.fillStyle='#fbfaf4';g.fillRect(-13,-16,26,32);g.strokeStyle='#c8c3b0';g.lineWidth=.8;g.strokeRect(-13,-16,26,32);
  g.strokeStyle='rgba(60,90,160,.45)';for(let y=-8;y<14;y+=4){g.beginPath();g.moveTo(-10,y);g.lineTo(10,y);g.stroke()}g.fillStyle='#3a4a6a';g.font='700 5px '+FB;g.textAlign='left';g.fillText('중간고사',-10,-11);
  if(score!=null){g.strokeStyle='#e8202c';g.lineWidth=1.6;g.beginPath();g.arc(4,3,8,0,TAU);g.stroke();g.fillStyle='#e8202c';g.font='900 9px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(score,4,3)}g.restore()}
function hsChalk(s,a){g.save();g.rotate(a);g.scale(s,s);g.fillStyle='#f6f6ee';g.fillRect(-7,-2,14,4);g.fillStyle='#d8d8cc';g.fillRect(4,-2,3,4);g.restore()}
function hsClass(a){g.save();g.globalAlpha=a;const fg=g.createLinearGradient(0,0,0,A);fg.addColorStop(0,'#b8895a');fg.addColorStop(1,'#8a5e36');g.fillStyle=fg;g.fillRect(0,0,A,A);
  g.strokeStyle='rgba(60,30,10,.25)';g.lineWidth=1;for(let y=0;y<A;y+=30){g.beginPath();g.moveTo(0,y);g.lineTo(A,y);g.stroke();for(let x=((y/30)%2)*60;x<A;x+=120){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+30);g.stroke()}}
  // 칠판
  g.fillStyle='#5a3a1c';g.fillRect(40,6,A-80,92);const bg=g.createLinearGradient(0,12,0,92);bg.addColorStop(0,'#2e5a3e');bg.addColorStop(1,'#1e4430');g.fillStyle=bg;g.fillRect(48,12,A-96,78);
  g.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<6;i++)g.fillRect(60+i*80,20+(i%3)*14,50,3);g.font='700 22px '+FB;g.fillStyle='rgba(250,250,240,.9)';g.textAlign='center';g.textBaseline='middle';g.fillText('자습',A/2,40);g.font='700 14px '+FB;g.fillText('떠들면 이름 적음',A/2,68);
  g.fillStyle='#d8d8cc';g.fillRect(A/2-60,90,120,5);
  // 책상
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=80+c*135,y=200+r*130;g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x-30,y-14,64,32);g.fillStyle='#c9a06a';g.fillRect(x-32,y-18,64,30);g.strokeStyle='#7a5a2a';g.lineWidth=1.5;g.strokeRect(x-32,y-18,64,30);g.fillStyle='#6a6e78';g.fillRect(x-22,y+14,44,10)}
  const v=g.createRadialGradient(A/2,A/2,A*.35,A/2,A/2,A*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.35)');g.fillStyle=v;g.fillRect(0,0,A,A);g.restore()}

// ---------- 아이콘 (네온 가방 + 교복 넥타이) ----------
EMB.hsol=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.7,()=>{g.beginPath();g.rect(-13,-8,26,24);g.moveTo(-7,-8);g.quadraticCurveTo(-7,-17,0,-17);g.quadraticCurveTo(7,-17,7,-8);g.moveTo(-13,2);g.lineTo(13,2);g.rect(-4,2,8,6)});
  neon({col:'#ff5a5a',hi:'#ffd8d8'},1.3,()=>{g.beginPath();g.moveTo(0,-4);g.lineTo(-2,0);g.lineTo(0,10);g.lineTo(2,0);g.closePath()});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,15,.4);g.restore()};

// ---------- 1) 매점 런 ----------
function hsRun(o,t){HZ.push({k:'hsrun',o,tg:t,t:0,ph:0,hit:0,tr:[],a:ang(o,t)});SFXa('hs_bell')}
HZX.hsrun=(h,dt,EN)=>{const o=h.o;if(o.dead)return false;o.gcd=Math.max(o.gcd,.3);o.cast=null;const V=640;
  if(h.t<.45){return true}
  if(!h.rs){h.rs=1;SFXa('hs_run')}
  const e=h.tg;if(h.hit<2&&e&&!e.dead){let da=ang(o,e)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-5*dt,5*dt)}
  o.x+=Math.cos(h.a)*V*dt;o.y+=Math.sin(h.a)*V*dt;if(o.x<o.r||o.x>A-o.r){h.a=Math.PI-h.a}if(o.y<o.r||o.y>A-o.r){h.a=-h.a}o.x=clamp(o.x,o.r,A-o.r);o.y=clamp(o.y,o.r,A-o.r);o.dx=Math.cos(h.a);o.dy=Math.sin(h.a);
  h.tr.push({x:o.x,y:o.y,t:h.t});h.tr=h.tr.filter(q=>h.t-q.t<.25);emit(30,dt,()=>dustP(o.x,o.y+o.r*.7,rnd(30,70)));
  h.cd=(h.cd||0)-dt;const hit=EN.find(x=>!x.hid&&!x.jump&&dist(o,x)<o.r+x.r+6);if(hit&&h.cd<=0&&h.hit<2){h.hit++;h.cd=.25;hurt(hit,3,o,hit.x,hit.y,0,1);safePush(hit,h.a,46);hit.stn=Math.max(hit.stn,.3);hit.cast=null;shake=Math.max(shake,9);FX.push({k:'burst',x:hit.x,y:hit.y,c:'#dcfff1',a:rnd(0,1),l:.25,m:.25});h.a+=rnd(-.8,.8)}
  if(h.t>=1.25&&!h.ate){h.ate=1;h.et=h.t;SFXa('hs_bread');const hv=Math.min(5,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-14,'+'+hv,'#7bff8a',22)}for(let i=0;i<8;i++)Pt.push({x:o.x,y:o.y-10,vx:rnd(-80,80),vy:rnd(-120,-40),l:.6,m:.6,sh:2,col:'#e8b060',r:rnd(1.5,3),rot:rnd(0,TAU),vr:rnd(-10,10),gy:300,fr:.5})}
  return !h.ate||h.t<h.et+.6};
HZD.hsrun=h=>{const o=h.o;h.tr.forEach(q=>{const a=1-(h.t-q.t)/.25;g.save();g.globalAlpha=a*.35;g.drawImage(ICON(o.d,52),q.x-o.r,q.y-o.r,o.r*2,o.r*2);g.restore()})};
HZP.hsrun=h=>{const o=h.o;if(o.dead)return;
  if(h.t<.45){const u=h.t/.45;g.save();g.translate(o.x,o.y-o.r-30);g.rotate(Math.sin(clock*40)*.3);g.fillStyle='#d4af37';g.strokeStyle='#5a4008';g.lineWidth=1.5;g.beginPath();g.moveTo(-9,6);g.quadraticCurveTo(-9,-10,0,-11);g.quadraticCurveTo(9,-10,9,6);g.closePath();g.fill();g.stroke();g.fillStyle='#5a4008';g.beginPath();g.arc(0,8,2.5,0,TAU);g.fill();g.restore();
    g.save();g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;for(let k=0;k<2;k++){const r=14+((u*2+k*.5)%1)*20;g.beginPath();g.arc(o.x,o.y-o.r-30,r,-2.4,-.7);g.stroke()}g.restore();return}
  if(!h.ate){g.save();g.translate(o.x+Math.cos(h.a)*o.r*.8,o.y+Math.sin(h.a)*o.r*.8-6);g.rotate(h.a*.2);hsBread(.9);g.restore();
    g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('매점!!',o.x,o.y-o.r-22);g.fillStyle='#dcfff1';g.fillText('매점!!',o.x,o.y-o.r-22);g.restore()}};

// ---------- 2) 중간고사 ----------
function hsExam(o,t){const a0=ang(o,t);HZ.push({k:'hsexam',o,tg:t,t:0,pp:[0,1,2,3].map(i=>({x:o.x,y:o.y,a:a0+(i-1.5)*.35,v:430,dl:i*.08,on:0,live:1,rot:rnd(0,TAU)})),gr:[]});SFXa('hs_paper')}
HZX.hsexam=(h,dt,EN)=>{const o=h.o;let e=h.tg;if(!e||e.dead)e=tgt(o);let alive=0;
  h.pp.forEach(p=>{if(!p.live)return;alive++;if(h.t<p.dl)return;if(!p.on){p.on=1;p.x=o.x;p.y=o.y;if(p.dl)SFXa('hs_paper')}
    if(e){let da=Math.atan2(e.y-p.y,e.x-p.x)-p.a;da=Math.atan2(Math.sin(da),Math.cos(da));p.a+=clamp(da,-3.2*dt,3.2*dt)}p.x+=Math.cos(p.a)*p.v*dt;p.y+=Math.sin(p.a)*p.v*dt+Math.sin(h.t*12+p.dl*20)*40*dt;p.rot+=dt*7;
    if(p.x<-30||p.x>A+30||p.y<-30||p.y>A+30||h.t>2.4){p.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-p.x,x.y-p.y)<x.r+12);if(hit){p.live=0;const sc=[0,12,37,58,64,81,95,100][Math.floor(rnd(0,8))],dmg=Math.round((2+5*(1-sc/100))*10)/10;hurt(hit,dmg,o,hit.x,hit.y,0,sc<20);SFXa('hs_grade');h.gr.push({x:hit.x,y:hit.y,e:hit,sc,t:h.t});
      if(sc==100)ft(hit.x,hit.y-hit.r-50,'만점?!','#ffd23a',22);else if(sc==0)ft(hit.x,hit.y-hit.r-50,'빵점 ㅋㅋ','#ff5a5a',24)}});
  return alive>0||h.gr.some(q=>h.t-q.t<1)};
HZP.hsexam=h=>{h.pp.forEach(p=>{if(!p.live||!p.on)return;g.save();g.translate(p.x,p.y);hsPaper(1.15,null,p.rot);g.restore()});
  h.gr.forEach(q=>{const k=h.t-q.t;if(k>1)return;const x=q.e&&!q.e.dead?q.e.x:q.x,y=(q.e&&!q.e.dead?q.e.y:q.y)-36,a=clamp((1-k)/.3,0,1),s=k<.12?1.8-.8*k/.12:1;g.save();g.translate(x+16,y);g.globalAlpha=a;g.scale(s,s);g.rotate(-.15);
    g.strokeStyle='#e8202c';g.lineWidth=3;g.beginPath();g.ellipse(0,0,24,16,0,0,TAU*Math.min(1,k/.15));g.stroke();g.font='900 18px '+FB;g.fillStyle='#e8202c';g.textAlign='center';g.textBaseline='middle';g.fillText(q.sc+'점',0,1);
    if(q.sc<40){g.beginPath();g.moveTo(-22,12);g.lineTo(-30,18);g.stroke()}g.restore()})};

// ---------- 3) ULT 자습 시간 ----------
function hsUlt(o,t){HZ.push({k:'hsult',o,t:0,n:0,ch:[],sl:0,tg:t});SFXa('hs_bell')}
HZX.hsult=(h,dt,EN)=>{const o=h.o;const C0=.7,CS=.13,N=12;
  if(h.n<N&&h.t>=C0+h.n*CS&&EN.length){const e=EN[h.n%EN.length];if(!e.hid){const sx=rnd(80,A-80),sy=95,a=Math.atan2(e.y-sy,e.x-sx);h.ch.push({x:sx,y:sy,a,v:780,live:1,rot:0});SFXa('hs_chalk')}h.n++}
  h.ch.forEach(c=>{if(!c.live)return;c.x+=Math.cos(c.a)*c.v*dt;c.y+=Math.sin(c.a)*c.v*dt;c.rot+=dt*20;if(c.x<-20||c.x>A+20||c.y>A+20){c.live=0;return}
    const hit=EN.find(x=>!x.hid&&!x.jump&&Math.hypot(x.x-c.x,x.y-c.y)<x.r+8);if(hit){c.live=0;hurt(hit,1.2,o,c.x,c.y,0,0);SFXa('hs_tap');for(let i=0;i<6;i++)Pt.push({x:c.x,y:c.y,vx:rnd(-90,90),vy:rnd(-90,90),l:.4,m:.4,sh:3,col:'#f6f6ee',r:rnd(4,7),gr:12,a0:.6,fr:.2});hit.slow=Math.max(hit.slow,.4)}});
  const S0=C0+N*CS+.4;
  if(h.t>=S0&&!h.sl){h.sl=1;const L=EN.filter(x=>!x.hid);h.st=L.sort((p,q)=>p.hp-q.hp)[0];if(h.st){h.sx=h.st.x;h.sy=h.st.y}}
  if(h.sl&&!h.slm&&h.t>=S0+.4){h.slm=1;SFXa('hs_slam');shake=Math.max(shake,18);hs=.1;const e=h.st;if(e&&!e.dead&&!e.hid&&!e.jump){hurt(e,7,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.6);ring(e.x,e.y,8,90,'#ffffff',8,.4);FX.push({k:'crack',x:e.x,y:e.y,r:50,l:1.5,m:1.5});ft(e.x,e.y-e.r-44,'떠들면 이름 적는다','#ffffff',22)}}
  return !h.slm||h.t<S0+1.1};
HZD.hsult=h=>{const S0=.7+12*.13+.4,a=Math.min(1,h.t/.4)*(h.slm?clamp(1-(h.t-S0-.6)/.5,0,1):1);hsClass(a*.9)};
HZP.hsult=h=>{h.ch.forEach(c=>{if(!c.live)return;g.save();g.translate(c.x,c.y);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,10,.5);g.restore();hsChalk(2,c.rot);g.restore()});
  if(h.sl&&h.st&&!h.st.dead){const S0=.7+12*.13+.4,k=h.t-S0,e=h.st;if(k<.9){const u=clamp(k/.4,0,1),y=e.y-30-(1-u*u)*160,al=clamp((.9-k)/.3,0,1);g.save();g.translate(e.x,y);g.rotate(-.2+u*.2);g.globalAlpha=al;
    g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-26,-14,56,36);g.fillStyle='#1c3a6a';g.fillRect(-28,-18,56,36);g.strokeStyle='#0a1a3a';g.lineWidth=2;g.strokeRect(-28,-18,56,36);g.fillStyle='#e8e2c8';g.fillRect(-24,-14,4,28);g.font='700 10px '+FB;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText('출석부',4,0);g.restore()}}};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
