// ===== game4.js : 새 캐릭터(곤지암병은 · 해버지) + 전체 연출 업그레이드 =====
const HZX={},HZD={},HZP={},FXD={},BUL={},TRL={},EMB={};
// 고유 사운드 : 파일이 있을 때만 재생 (다른 캐릭터 소리로 대신 틀지 않음)
function SFXa(n){const p=AUD[n];if(p&&p.ok)SFX(n)}

// ---------- 공통 그리기 ----------
function pent(x,y,r,a){g.beginPath();for(let i=0;i<5;i++){const b=a+i*TAU/5;i?g.lineTo(x+Math.cos(b)*r,y+Math.sin(b)*r):g.moveTo(x+Math.cos(b)*r,y+Math.sin(b)*r)}g.closePath();g.fill()}
function socBall(r){
  const s=r/17;g.fillStyle='#f6f7fb';g.beginPath();g.arc(0,0,r,0,TAU);g.fill();
  g.save();g.beginPath();g.arc(0,0,r,0,TAU);g.clip();g.fillStyle='#16181f';g.strokeStyle='#16181f';g.lineWidth=1.3*s;
  pent(0,0,6.2*s,-Math.PI/2);
  for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5;g.beginPath();g.moveTo(Math.cos(a)*6*s,Math.sin(a)*6*s);g.lineTo(Math.cos(a)*11.5*s,Math.sin(a)*11.5*s);g.stroke();pent(Math.cos(a)*16.5*s,Math.sin(a)*16.5*s,5.6*s,a+Math.PI);
    const b=a+TAU/10;g.beginPath();g.moveTo(Math.cos(a)*11.5*s,Math.sin(a)*11.5*s);g.lineTo(Math.cos(b)*14*s,Math.sin(b)*14*s);g.lineTo(Math.cos(a+TAU/5)*11.5*s,Math.sin(a+TAU/5)*11.5*s);g.stroke()}
  const sh=g.createRadialGradient(-r*.4,-r*.45,r*.1,0,0,r*1.05);sh.addColorStop(0,'rgba(255,255,255,.35)');sh.addColorStop(.6,'rgba(0,0,0,0)');sh.addColorStop(1,'rgba(0,0,0,.45)');g.fillStyle=sh;g.fillRect(-r,-r,r*2,r*2);
  g.restore();g.strokeStyle='#0b0d12';g.lineWidth=1.4*s;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();
}
function confetti(D,n){for(let i=0;i<n;i++)Pt.push({x:rnd(0,A),y:rnd(-140,-10),vx:rnd(-50,50),vy:rnd(80,240),l:rnd(1.5,2.5),m:2.5,sh:2,col:[D.col,D.hi,'#ffffff',D.dk][i%4],r:rnd(4,7),rot:rnd(0,TAU),vr:rnd(-10,10),gy:90,fr:.6})}
const goalPos=s=>[[A/2,0],[A,A/2],[A/2,A],[0,A/2]][s];

// ---------- 엠블럼 ----------
EMB.gold=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*4)*.05);
  const ear=(cx,a0,a1)=>{g.moveTo(cx+Math.cos(a0)*5.5,-13+Math.sin(a0)*5.5);g.arc(cx,-13,5.5,a0,a1)};
  neon(D,2.1,()=>{g.beginPath();g.moveTo(17,1);g.ellipse(0,1,17,15,0,0,TAU);ear(-12,Math.PI*.72,Math.PI*2.02);ear(12,Math.PI*.98,Math.PI*2.28);
    g.moveTo(-15,6);g.quadraticCurveTo(-11,12,-5,10);g.moveTo(15,6);g.quadraticCurveTo(11,12,5,10);
    g.moveTo(-2.2,4);g.lineTo(0,6);g.lineTo(2.2,4);g.moveTo(0,6);g.quadraticCurveTo(-1.5,9,-3.5,8);g.moveTo(0,6);g.quadraticCurveTo(1.5,9,3.5,8);
    g.moveTo(-14,3);g.lineTo(-22,1);g.moveTo(-14,6);g.lineTo(-22,7);g.moveTo(14,3);g.lineTo(22,1);g.moveTo(14,6);g.lineTo(22,7)});
  g.fillStyle=D.hi;g.beginPath();g.arc(-6.5,-2,2.4,0,TAU);g.arc(6.5,-2,2.4,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow(D.col,-6.5,-2,6,.8);glow(D.col,6.5,-2,6,.8);g.restore()};
EMB.horror=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2.3)*.06);if(Math.sin(clock*13)*Math.sin(clock*3.1)>.82){g.translate(rnd(-2,2),0);g.globalAlpha=.7}
  neon(D,2.1,()=>{g.beginPath();g.moveTo(17,1);g.ellipse(0,1,17,15,0,0,TAU);g.moveTo(-12+Math.cos(Math.PI*.72)*5.5,-13+Math.sin(Math.PI*.72)*5.5);g.arc(-12,-13,5.5,Math.PI*.72,Math.PI*2.02);
    g.moveTo(12+Math.cos(Math.PI*.98)*5.5,-13+Math.sin(Math.PI*.98)*5.5);g.arc(12,-13,5.5,Math.PI*.98,Math.PI*1.5);
    g.moveTo(-3.2,-1.5);g.arc(-6.5,-1.5,3.3,0,TAU);g.moveTo(9.8,-1.5);g.arc(6.5,-1.5,3.3,0,TAU);
    g.moveTo(-7,7);g.lineTo(7,7);for(let i=-2;i<=2;i++){g.moveTo(i*3,5);g.lineTo(i*3,9)}
    g.moveTo(-6.5,2);g.lineTo(-7,9);g.moveTo(8,-14);g.lineTo(4,-8);g.lineTo(7,-4)});
  g.save();g.globalCompositeOperation='lighter';const fl=.5+.5*Math.sin(clock*7);glow(D.col,-6.5,-1.5,5,.9*fl);glow(D.col,6.5,-1.5,5,.9*fl);g.restore();
  g.fillStyle=D.hi;g.beginPath();g.arc(-6.5,-1.5,1,0,TAU);g.arc(6.5,-1.5,1,0,TAU);g.fill();g.globalAlpha=1};
EMB.soccer=(f,D)=>{
  neon(D,2,()=>{g.beginPath();g.moveTo(17,0);g.arc(0,0,17,0,TAU);for(let i=0;i<5;i++){const a=-Math.PI/2+i*TAU/5,b=a+TAU/5,c=Math.cos,s=Math.sin;
    g.moveTo(c(a)*6.5,s(a)*6.5);g.lineTo(c(b)*6.5,s(b)*6.5);g.moveTo(c(a)*6.5,s(a)*6.5);g.lineTo(c(a)*11.5,s(a)*11.5);g.lineTo(c(a-.45)*17,s(a-.45)*17);g.moveTo(c(a)*11.5,s(a)*11.5);g.lineTo(c(a+.45)*17,s(a+.45)*17)}});
  g.fillStyle=D.hi;g.globalAlpha=.85;pent(0,0,4.2,-Math.PI/2);g.globalAlpha=1;
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,10,.6);g.restore()};

// ---------- 곤지암병은 ----------
// 1) 빈 휠체어 : 혼자 굴러와 들이받음
function hWheel(o,t){const a=ang(o,t);HZ.push({k:'wheel',o,tg:t,t:0,x:clamp(o.x+Math.cos(a)*(o.r+22),20,A-20),y:clamp(o.y+Math.sin(a)*(o.r+22),20,A-20),a,v:110,rl:0,done:0});SFXa('h_wheel')}
HZX.wheel=(h,dt,EN)=>{
  if(h.done)return h.t<h.dt2+.6;
  const e=h.tg&&!h.tg.dead?h.tg:tgt(h.o);
  if(e&&e!=h.o&&!e.hid){let da=ang(h,e)-h.a;da=Math.atan2(Math.sin(da),Math.cos(da));h.a+=clamp(da,-1.7*dt,1.7*dt)}
  h.v=Math.min(340,h.v+280*dt);h.x+=Math.cos(h.a)*h.v*dt;h.y+=Math.sin(h.a)*h.v*dt;h.rl+=h.v*dt;
  if(h.x<18||h.x>A-18){h.a=Math.PI-h.a;h.x=clamp(h.x,18,A-18)}if(h.y<18||h.y>A-18){h.a=-h.a;h.y=clamp(h.y,18,A-18)}
  emit(14,dt,()=>dustP(h.x-Math.cos(h.a)*14,h.y+10,24));
  for(const e2 of EN){if(e2.hid||e2.jump)continue;if(Math.hypot(e2.x-h.x,e2.y-h.y)<e2.r+20){hurt(e2,12,h.o,e2.x,e2.y,0,1);e2.dx=Math.cos(h.a);e2.dy=Math.sin(h.a);e2.stn=Math.max(e2.stn,.35);e2.cast=null;
    h.done=1;h.dt2=h.t;shake=Math.max(shake,10);for(let i=0;i<10;i++)cubeP(h.x,h.y,rnd(0,TAU),rnd(80,220),['#7d8a86','#4b5552','#a9b5b1'][i%3]);break}}
  if(h.t>2.8&&!h.done){h.done=1;h.dt2=h.t}
  return true;
};
HZD.wheel=h=>{
  const D=h.o.d,fa=h.done?clamp(1-(h.t-h.dt2)/.6,0,1):Math.min(1,h.t/.2),sd=Math.cos(h.a)<0?-1:1,tip=h.done?Math.min(1,(h.t-h.dt2)/.25)*1.3:0;
  g.save();g.globalAlpha=fa;g.fillStyle='#0006';g.beginPath();g.ellipse(h.x,h.y+24,32,8,0,0,TAU);g.fill();
  g.translate(h.x,h.y);g.scale(sd*1.5,1.5);g.rotate(tip+Math.sin(h.t*18)*.03);
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-6,46,.3);g.restore();
  const M='#c3cfcb',K='#0b1310';g.lineCap='round';g.lineJoin='round';
  const L=(w,c,f)=>{g.lineWidth=w;g.strokeStyle=c;g.beginPath();f();g.stroke()};
  const frame=()=>{g.moveTo(-10,-30);g.lineTo(-6,-4);g.lineTo(14,-4);g.lineTo(18,8);g.moveTo(-6,-4);g.lineTo(-2,6);g.moveTo(-12,-30);g.lineTo(-18,-30)};
  L(6,K,frame);L(3,M,frame);
  const sp=h.rl/14;
  [[-2,6,14],[17,12,5]].forEach(([x,y,r],i)=>{g.save();g.translate(x,y);L(i?5:6,K,()=>g.arc(0,0,r,0,TAU));L(i?2.5:3,M,()=>g.arc(0,0,r,0,TAU));
    if(!i){g.rotate(sp);L(1.2,'#8e9b97',()=>{for(let k=0;k<6;k++){const a=k*TAU/6;g.moveTo(0,0);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}})}g.restore()});
  g.fillStyle='#3a1f1c';g.fillRect(-8,-9,22,5);g.fillStyle='#6b2a2a';g.globalAlpha=fa*.6;g.beginPath();g.ellipse(2,-7,4,1.6,0,0,TAU);g.fill();
  g.restore();g.globalAlpha=1;
};
// 2) 저주 표식 : 발밑에 표식이 따라붙고 시간이 다 되면 터짐
function hCurse(o,t){HZ.push({k:'curse',o,tg:t,t:0,dur:2.4,done:0});SFXa('h_curse');ft(t.x,t.y-t.r-36,'저주','#9fe6c8',24)}
HZX.curse=(h,dt)=>{
  const e=h.tg;if(!e||e.dead)return false;
  if(!h.done){emit(12,dt,()=>{const a=rnd(0,TAU),r=e.r+rnd(14,30);Pt.push({x:e.x+Math.cos(a)*r,y:e.y+Math.sin(a)*r,vx:0,vy:-rnd(20,50),l:.6,m:.6,gl:1,sh:6,col:h.o.d.col,r:rnd(1.2,2.2),fr:.5})});
    if(h.t>=h.dur){h.done=1;if(!e.hid&&!e.jump){hurt(e,14,h.o,e.x,e.y,0,1);e.slow=1.2;e.cast=null}SFXa('h_burst');shake=Math.max(shake,12);ring(e.x,e.y,8,130,h.o.d.col,10,.5);ring(e.x,e.y,8,90,'#ffffff',4,.35);
      for(let i=0;i<24;i++){const a=rnd(0,TAU),v=rnd(80,260),l=rnd(.4,.8);Pt.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:3,col:'#0d1512',r:rnd(8,14),gr:20,a0:.6,fr:.3})}}}
  return !h.done||h.t<h.dur+.35;
};
HZD.curse=h=>{
  const e=h.tg;if(!e||e.dead||e.hid)return;const D=h.o.d,u=clamp(h.t/h.dur,0,1),R=e.r+46-26*u,fa=h.done?clamp(1-(h.t-h.dur)/.35,0,1):Math.min(1,h.t/.25);
  g.save();g.translate(e.x,e.y);g.globalAlpha=fa;
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,R*1.5,.18+.25*u);g.restore();
  g.lineCap='round';g.strokeStyle=D.col;g.lineWidth=2.5;g.beginPath();g.arc(0,0,R,0,TAU);g.stroke();
  g.save();g.rotate(h.t*1.8);g.lineWidth=1.5;g.strokeStyle=D.hi;g.beginPath();g.arc(0,0,R-7,0,TAU);g.stroke();
  for(let i=0;i<12;i++){g.rotate(TAU/12);g.beginPath();g.moveTo(R-7,0);g.lineTo(R+1,0);if(i%3==0){g.moveTo(R-14,-3);g.lineTo(R-10,0);g.lineTo(R-14,3)}g.stroke()}g.restore();
  g.save();g.rotate(-h.t*2.6);g.strokeStyle=D.col;g.lineWidth=2;g.beginPath();for(let i=0;i<4;i++){const a=i*TAU/4;i?g.lineTo(Math.cos(a)*R*.55,Math.sin(a)*R*.55):g.moveTo(Math.cos(a)*R*.55,Math.sin(a)*R*.55)}g.closePath();g.stroke();g.restore();
  if(!h.done){const n=Math.ceil(h.dur-h.t),q=1-(h.dur-h.t)%1;g.font=(26+q*6)+'px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#000';g.globalAlpha=fa*(.6+.4*Math.sin(clock*12));g.strokeText(n,0,-e.r-34);g.fillStyle=D.hi;g.fillText(n,0,-e.r-34)}
  g.restore();g.globalAlpha=1;
};
// 3) ULT 정전 병동 : 형광등이 칸마다 꺼졌다 켜짐 · 꺼진 칸에 서 있으면 피해 · 마지막에 전등 전부 깨짐
function hWard(o,t){HZ.push({k:'ward',o,t:0,dur:4.4,nx:.3,dk:[],warn:[],wt:0,tk:0,fin:0});SFXa('h_ult')}
HZX.ward=(h,dt,EN)=>{
  h.nx-=dt;if(h.nx<=0&&h.t<h.dur-.9){h.nx=.8;h.warn=[];for(let i=0;i<100;i++)if(Math.random()<.5)h.warn.push(i);h.wt=0;SFXa('h_flicker')}
  if(h.warn.length){h.wt+=dt;if(h.wt>=.32){h.dk=h.warn;h.warn=[]}}
  h.tk+=dt;if(h.tk>=.3&&!h.fin){h.tk=0;EN.forEach(e=>{if(e.hid||e.jump)return;const c=Math.floor(clamp(e.x,0,A-1)/60)+Math.floor(clamp(e.y,0,A-1)/60)*10;if(h.dk.includes(c))hurt(e,3,h.o,e.x,e.y,0,0)})}
  if(h.t>=h.dur-.6&&!h.fin){h.fin=1;h.warn=[];h.dk=[...Array(100).keys()];SFXa('h_glass');shake=20;hs=.1;FX.push({k:'frost',l:.15,m:.15,c:'#e9fff6'});
    for(let i=0;i<46;i++)shardP(rnd(20,A-20),rnd(20,A-20),rnd(-60,60),rnd(-200,-60),rnd(2,4.5));
    EN.forEach(e=>{if(e.hid)return;hurt(e,12,h.o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.4);e.cast=null})}
  return h.t<h.dur;
};
HZD.ward=h=>{
  const a=Math.min(1,h.t/.3)*clamp((h.dur-h.t)/.35,0,1),D=h.o.d;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalAlpha=a*.35;g.fillStyle='#06140f';g.fillRect(0,0,A,A);
  for(let i=0;i<100;i++){const x=(i%10)*60,y=Math.floor(i/10)*60,dk=h.dk.includes(i),wn=h.warn.includes(i);
    if(dk){g.globalAlpha=a*(.8+.08*Math.sin(clock*30+i));g.fillStyle='#010302';g.fillRect(x,y,60,60)}
    else{g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a*(wn?(Math.sin(clock*55+i)>0?.22:.02):.1);g.fillStyle='#d8fff0';g.fillRect(x+3,y+3,54,54);g.globalAlpha=a*(wn?.5:.8);g.fillStyle='#effff8';g.fillRect(x+14,y+6,32,3);g.restore()}}
  g.globalAlpha=a*.25;g.strokeStyle=D.col;g.lineWidth=1;for(let i=1;i<10;i++){g.beginPath();g.moveTo(i*60,0);g.lineTo(i*60,A);g.moveTo(0,i*60);g.lineTo(A,i*60);g.stroke()}
  g.restore();g.globalAlpha=1;
};
HZP.ward=h=>{
  const a=Math.min(1,h.t/.3)*clamp((h.dur-h.t)/.35,0,1);
  g.save();g.globalAlpha=a*(.6+.25*Math.sin(clock*5));g.font='22px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='#000';g.strokeText('정전 병동',A/2,A-28);g.fillStyle=h.o.d.hi;g.fillText('정전 병동',A/2,A-28);g.restore();
  const vg=g.createRadialGradient(A/2,A/2,A*.25,A/2,A/2,A*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,14,9,'+(.7*a)+')');g.fillStyle=vg;g.fillRect(0,0,A,A);
};

// ---------- 해버지 ----------
function fKick(o,t){const d=dist(o,t)/700,a=Math.atan2(t.y+t.dy*t.sp*d-o.y,t.x+t.dx*t.sp*d-o.x),sx=o.x+Math.cos(a)*o.r,sy=o.y+Math.sin(a)*o.r;
  B.push({x:sx,y:sy,vx:Math.cos(a)*700,vy:Math.sin(a)*700,a,o,dmg:12,k:'fball',slow:0,r:11,age:0,D:o.d,bnc:2});SFXa('kick');FX.push({k:'kick',x:sx,y:sy,a,c:o.d.hi,l:.25,m:.25})}
function bounceB(q){let b=0;if(q.x<q.r){q.x=q.r;q.vx=Math.abs(q.vx);b=1}if(q.x>A-q.r){q.x=A-q.r;q.vx=-Math.abs(q.vx);b=1}if(q.y<q.r){q.y=q.r;q.vy=Math.abs(q.vy);b=1}if(q.y>A-q.r){q.y=A-q.r;q.vy=-Math.abs(q.vy);b=1}
  if(b){q.bnc--;q.a=Math.atan2(q.vy,q.vx);spark(q.x,q.y,'dust',5,140);ring(q.x,q.y,4,40,'#ffffff',4,.3);shake=Math.max(shake,3);SFXa('juggle');wallFlash(q.x,q.y,q.D.col)}}
TRL.fball=(q,dt)=>{emit(40,dt,()=>{const l=rnd(.15,.3);Pt.push({x:q.x+rnd(-5,5),y:q.y+rnd(-5,5),vx:-q.vx*.15,vy:-q.vy*.15,l,m:l,gl:1,sh:5,col:Math.random()<.5?'#ffffff':q.D.hi,r:2,fr:.1})})};
BUL.fball=q=>{g.save();g.rotate(q.a);g.globalCompositeOperation='lighter';g.scale(2.4,.7);glow(q.D.col,-10,0,22,.55);g.restore();
  for(let i=3;i>0;i--){g.globalAlpha=.12*(4-i);g.fillStyle='#ffffff';g.beginPath();g.arc(-Math.cos(q.a)*i*9,-Math.sin(q.a)*i*9,q.r,0,TAU);g.fill()}g.globalAlpha=1;
  g.rotate(q.age*22);socBall(q.r)};
function fTank(o,t){o.dash=1.5;o.hit=0;const a=ang(o,t);o.dx=Math.cos(a);o.dy=Math.sin(a);HZ.push({k:'tank',o,t:0,tg:t,hit:0});SFXa('whistle');ft(o.x,o.y-o.r-30,'산소탱크!',o.d.hi,24)}
HZX.tank=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead)return false;
  if(o.dash>0&&!o.hit&&e&&!e.dead&&!e.hid){const cur=Math.atan2(o.dy,o.dx);let da=ang(o,e)-cur;da=Math.atan2(Math.sin(da),Math.cos(da));const na=cur+clamp(da,-3.4*dt,3.4*dt);o.dx=Math.cos(na);o.dy=Math.sin(na);
    emit(45,dt,()=>Pt.push({x:o.x+rnd(-10,10),y:o.y+o.r*.6,vx:-o.dx*rnd(60,140)+rnd(-40,40),vy:-o.dy*rnd(60,140)-rnd(20,60),l:rnd(.4,.7),m:.7,sh:13,col:['#3fae4a','#2b8a3a','#7dd56f'][Math.floor(rnd(0,3))],r:rnd(2,3.5),rot:rnd(0,TAU),vr:rnd(-10,10),gy:200,fr:.4}))}
  if(o.hit&&!h.hit){h.hit=1;const v=F.filter(x=>x!=o&&!x.dead).sort((p,q)=>dist(o,p)-dist(o,q))[0];
    if(v&&dist(o,v)<o.r+v.r+24){hurt(v,4,o,v.x,v.y,0,0);v.stn=Math.max(v.stn,.5);v.cast=null;ft(v.x,v.y-v.r-34,'태클!','#ffffff',28);SFXa('tackle');FX.push({k:'burst',x:v.x,y:v.y,c:o.d.hi,a:0,l:.3,m:.3});
      for(let i=0;i<16;i++)Pt.push({x:v.x,y:v.y,vx:rnd(-200,200),vy:rnd(-260,-40),l:rnd(.5,.9),m:.9,sh:13,col:['#3fae4a','#2b8a3a','#7dd56f'][i%3],r:rnd(2.5,4),rot:rnd(0,TAU),vr:rnd(-12,12),gy:420,fr:.4})}}
  return o.dash>0||h.t<.2;
};
function fGoal(o,t){const dx=t.x-o.x,dy=t.y-o.y,side=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0);HZ.push({k:'goal',o,tg:t,t:0,side,fired:0,hit:0,bx:o.x,by:o.y});SFXa('whistle')}
HZX.goal=(h,dt)=>{
  const o=h.o;if(o.dead)return false;let e=h.tg;if(!e||e.dead){e=h.tg=tgt(o)}const G=goalPos(h.side);
  if(h.t<1){o.gcd=Math.max(o.gcd,.5);if(Math.floor(h.t*3.3)!=Math.floor((h.t-dt)*3.3))SFXa('juggle')}
  else if(!h.fired){h.fired=1;h.ft=h.t;h.sx=o.x;h.sy=o.y-30;const ex=e?e.x:G[0],ey=e?e.y:G[1],a=Math.atan2(ey-h.sy,ex-h.sx),sd=Math.random()<.5?1:-1;
    h.cx=(h.sx+ex)/2+Math.cos(a+Math.PI/2)*sd*170;h.cy=(h.sy+ey)/2+Math.sin(a+Math.PI/2)*sd*170;SFXa('kick');shake=Math.max(shake,10);FX.push({k:'burst',x:h.sx,y:h.sy,c:o.d.hi,a:0,l:.3,m:.3});ring(h.sx,h.sy,6,90,'#ffffff',6,.35)}
  if(h.fired&&!h.hit){const u=clamp((h.t-h.ft)/.5,0,1),ok=e&&!e.dead,ex=ok?e.x:G[0],ey=ok?e.y:G[1],v=1-u;h.bx=v*v*h.sx+2*v*u*h.cx+u*u*ex;h.by=v*v*h.sy+2*v*u*h.cy+u*u*ey;
    emit(150,dt,()=>fireP(h.bx+rnd(-6,6),h.by+rnd(-6,6),rnd(-40,40),rnd(-40,40),rnd(8,14),rnd(.25,.45),['#ffffff',o.d.hi,o.d.col,o.d.dk]));
    if(u>=1){h.hit=1;h.ht=h.t;if(ok&&!e.hid&&!e.jump){hurt(e,24,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.5);e.cast=null;h.push=e;h.pa=Math.atan2(G[1]-e.y,G[0]-e.x)}
      SFXa('goal');shake=22;hs=.12;FX.push({k:'goaltxt',l:1.5,m:1.5,c:o.d.col,h:o.d.hi});FX.push({k:'frost',l:.2,m:.2,c:'#ffffff'});confetti(o.d,110)}}
  if(h.push&&!h.push.dead&&h.t<h.ht+.4){const p=h.push;p.x=clamp(p.x+Math.cos(h.pa)*700*dt,p.r,A-p.r);p.y=clamp(p.y+Math.sin(h.pa)*700*dt,p.r,A-p.r);emit(30,dt,()=>dustP(p.x,p.y,40))}
  return !h.hit||h.t<h.ht+1.3;
};
HZD.goal=h=>{
  const a=Math.min(1,h.t/.3)*(h.hit?clamp((h.ht+1.3-h.t)/.4,0,1):1),[gx,gy]=goalPos(h.side),rot=[0,Math.PI/2,Math.PI,-Math.PI/2][h.side];
  g.save();g.translate(gx,gy);g.rotate(rot);g.globalAlpha=a;const W2=90,Dp=46;
  g.fillStyle='rgba(255,255,255,.07)';g.fillRect(-W2,0,W2*2,Dp);
  g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1;for(let x=-W2;x<=W2;x+=12){g.beginPath();g.moveTo(x,0);g.lineTo(x,Dp);g.stroke()}for(let y=0;y<=Dp;y+=12){g.beginPath();g.moveTo(-W2,y);g.lineTo(W2,y);g.stroke()}
  g.strokeStyle='#0b0d12';g.lineWidth=9;g.beginPath();g.moveTo(-W2,0);g.lineTo(-W2,Dp);g.lineTo(W2,Dp);g.lineTo(W2,0);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=5;g.stroke();
  g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;g.beginPath();g.arc(0,Dp,70,0,Math.PI);g.stroke();
  if(h.hit){g.save();g.globalCompositeOperation='lighter';glow(h.o.d.col,0,Dp/2,160,.4*a);g.restore()}
  g.restore();g.globalAlpha=1;
};
HZP.goal=h=>{
  const o=h.o;if(h.hit)return;let x,y,s=1;
  if(!h.fired){x=o.x;y=o.y-o.r-16-Math.abs(Math.sin(h.t*Math.PI*3.3))*34;s=.8}else{x=h.bx;y=h.by;s=1.15}
  g.save();g.fillStyle='#0006';g.beginPath();g.ellipse(h.fired?x:o.x,h.fired?y+14:o.y+o.r*.2,9,4,0,0,TAU);g.fill();
  g.translate(x,y);if(h.fired){g.save();g.globalCompositeOperation='lighter';glow(o.d.col,0,0,46,.7);glow('#ffffff',0,0,18,.9);g.restore()}g.rotate(h.t*(h.fired?26:6));socBall(13*s);g.restore();
  if(!h.fired){g.save();g.globalAlpha=.85;g.font='16px '+FD;g.textAlign='center';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#000';const tx=['하나','둘','셋'][Math.min(2,Math.floor(h.t*3))];g.strokeText(tx,o.x,o.y-o.r-64);g.fillStyle=o.d.hi;g.fillText(tx,o.x,o.y-o.r-64);g.restore()}
};
FXD.kick=x=>{const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=5*(1-p)+1;g.lineCap='round';g.beginPath();g.arc(0,0,14+p*30,-1.2,1.2);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=2;g.beginPath();g.arc(0,0,8+p*22,-1,1);g.stroke();g.restore()};
FXD.goaltxt=x=>{const p=1-x.l/x.m,s=back(clamp(p/.16,0,1)),a=clamp(x.l/.35,0,1);g.save();g.translate(A/2,A/2-40);g.rotate(-.08);g.scale(s,s);g.globalAlpha=a;
  g.save();g.globalCompositeOperation='lighter';glow(x.c,0,0,260,.35);g.restore();
  g.font='112px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=18;g.strokeStyle='#0b0d12';g.strokeText('GOAL!',0,0);
  const gr=g.createLinearGradient(0,-50,0,50);gr.addColorStop(0,'#ffffff');gr.addColorStop(.55,x.h);gr.addColorStop(1,x.c);g.fillStyle=gr;g.fillText('GOAL!',0,0);
  g.font='22px '+FD;g.lineWidth=6;g.strokeText('해버지 슈퍼골',0,74);g.fillStyle='#ffffff';g.fillText('해버지 슈퍼골',0,74);g.restore()};

// ---------- 전체 연출 업그레이드 ----------
function dmgT(t,n,heavy){const big=n>=10,mid=n>2,col=n>=15?'#ff4d4d':big?'#ffb02e':mid?'#ffffff':'#c4cad6';
  T.push({x:t.x+rnd(-12,12),y:t.y-t.r-6,vx:rnd(-80,80),vy:-rnd(190,260)*(big?1.12:1),txt:String(Math.round(n*10)/10),col,size:n>=15?40:big?32:mid?24:16,l:1,dm:1,big})}
function drawDmg(x){const age=1-x.l,pp=age<.1?1+1.1*(1-age/.1):1;g.save();g.translate(x.x,x.y);g.scale(pp,pp);g.globalAlpha=Math.min(1,x.l*2.4);
  g.font=x.size+'px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
  if(x.big){g.save();g.globalCompositeOperation='lighter';glow(x.col,0,0,x.size*1.4,.4*x.l);g.restore()}
  g.lineWidth=x.big?8:5;g.strokeStyle='#0b0d12';g.strokeText(x.txt,0,0);
  if(x.big){const gr=g.createLinearGradient(0,-x.size/2,0,x.size/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,x.col);gr.addColorStop(1,x.col);g.fillStyle=gr}else g.fillStyle=x.col;
  g.fillText(x.txt,0,0);g.restore()}
FXD.imp=x=>{const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.globalAlpha=(1-p)*.55;
  for(let i=0;i<28;i++){const a=i*TAU/28+((i*7)%5)*.05,r0=95+((i*13)%7)*16+p*50,w=.016+((i*3)%4)*.007;g.fillStyle=i%3?'#ffffff':x.c;g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a-w)*760,Math.sin(a-w)*760);g.lineTo(Math.cos(a+w)*760,Math.sin(a+w)*760);g.closePath();g.fill()}
  g.restore()};
FXD.kofl=x=>{const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';glow('#ffffff',x.x,x.y,40+p*220,(1-p)*.9);glow(x.c,x.x,x.y,60+p*300,(1-p)*.6);
  g.strokeStyle='#ffffff';g.globalAlpha=1-p;g.lineCap='round';for(let i=0;i<16;i++){const a=i*TAU/16,r0=30+p*160,r1=r0+40*(1-p);g.lineWidth=3*(1-p)+1;g.beginPath();g.moveTo(x.x+Math.cos(a)*r0,x.y+Math.sin(a)*r0);g.lineTo(x.x+Math.cos(a)*r1,x.y+Math.sin(a)*r1);g.stroke()}g.restore()};
function shatter(t){const C=[t.d.col,t.d.hi,t.d.dk,'#1a1d26'];for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(120,420),l=rnd(1.2,2);Pt.push({x:t.x+Math.cos(a)*t.r*.5,y:t.y+Math.sin(a)*t.r*.5,z:rnd(0,20),vz:rnd(220,520),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,r:rnd(4,9),rot:rnd(0,TAU),vr:rnd(-14,14),col:C[i%4],fr:.45})}FX.push({k:'kofl',x:t.x,y:t.y,c:t.d.col,l:.55,m:.55})}
function lowHP(f){if(f.dead||f.hid||f.ghost||f.hp>25||f.dummy||phase=='menu')return;const p=.5+.5*Math.sin(clock*9);
  g.save();g.globalCompositeOperation='lighter';glow('#ff2a2a',f.x,f.y,f.r*2.4,.16+.16*p);g.restore();
  g.save();g.strokeStyle='#ff3b3b';g.globalAlpha=.3+.4*p;g.lineWidth=2;g.beginPath();g.arc(f.x,f.y,f.r+5+p*3,0,TAU);g.stroke();g.restore();}
function afterImg(f){if(f.dead||f.hid||f.ghost){f.ah=[];return}f.ah=f.ah||[];const L=f.ah[f.ah.length-1],v=L?Math.hypot(f.x-L[0],f.y-L[1])/Math.max(LDT,.001):0;f.ah.push([f.x,f.y]);if(f.ah.length>6)f.ah.shift();
  if(v<330||phase=='cd')return;const k2=clamp((v-330)/500,0,1);g.save();for(let i=0;i<f.ah.length-1;i++){const [x,y]=f.ah[i],q=(i+1)/f.ah.length;g.globalAlpha=.17*q*k2;g.fillStyle=f.d.col;g.beginPath();g.arc(x,y,f.r*(.7+.3*q),0,TAU);g.fill()}g.restore();g.globalAlpha=1}
let WL=[];
function wallFlash(x,y,c){if(phase!='play'&&phase!='demo')return;const v=x<=20||x>=A-20;WL.push({x:v?(x<A/2?0:A):x,y:v?y:(y<A/2?0:A),v,c,l:.5});if(WL.length>24)WL.shift()}
function wallHit(f){wallFlash(f.x<=f.r+1?0:f.x>=A-f.r-1?A:f.x,f.y<=f.r+1?0:f.y>=A-f.r-1?A:f.y,f.d.col)}
function drawWalls(){if(!WL.length)return;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  WL=WL.filter(w=>{w.l-=LDT;if(w.l<=0)return false;const a=w.l/.5,L=60+(1-a)*60;
    g.globalAlpha=a;g.strokeStyle=w.c;g.lineWidth=7;g.beginPath();if(w.v){g.moveTo(w.x,w.y-L);g.lineTo(w.x,w.y+L)}else{g.moveTo(w.x-L,w.y);g.lineTo(w.x+L,w.y)}g.stroke();
    g.strokeStyle='#ffffff';g.lineWidth=2.5;g.globalAlpha=a*.9;g.beginPath();if(w.v){g.moveTo(w.x,w.y-L*.5);g.lineTo(w.x,w.y+L*.5)}else{g.moveTo(w.x-L*.5,w.y);g.lineTo(w.x+L*.5,w.y)}g.stroke();
    glow(w.c,w.x,w.y,50,.6*a);return true});
  g.restore();g.globalAlpha=1}
function floorFX(){
  g.save();g.globalCompositeOperation='lighter';
  F.forEach(f=>{if(f.dead||f.hid||f.ghost)return;const i=Math.floor(f.x/75),j=Math.floor(f.y/75);g.globalAlpha=.07;g.fillStyle=f.d.col;g.fillRect(i*75+2,j*75+2,71,71);g.globalAlpha=.035;g.fillRect(i*75-73,j*75+2,71,71);g.fillRect(i*75+77,j*75+2,71,71);g.fillRect(i*75+2,j*75-73,71,71);g.fillRect(i*75+2,j*75+77,71,71)});
  const sw=((clock*.16)%1.6)-.3;g.globalAlpha=.045;const gr=g.createLinearGradient(sw*A-120,0,sw*A+120,A*.4);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(190,210,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,A,A);
  g.restore();g.globalAlpha=1}
function winTick(dt){if(!win)return;if(endT-dt<1.25&&endT>=1.25&&!win.dead){confetti(win.d,90);ring(win.x,win.y,10,180,win.d.hi,8,.6)}}
function winFX(){if(!win||win.dead||endT<1)return;const a=clamp((endT-1)/.5,0,1);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.14*a;const gr=g.createLinearGradient(0,-40,0,win.y+40);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(1,win.d.hi);g.fillStyle=gr;
  g.beginPath();g.moveTo(win.x-36,-40);g.lineTo(win.x+36,-40);g.lineTo(win.x+win.r*2.6,win.y+win.r);g.lineTo(win.x-win.r*2.6,win.y+win.r);g.closePath();g.fill();
  g.globalAlpha=1;glow(win.d.col,win.x,win.y,win.r*3.4,.32*a);
  g.fillStyle=win.d.hi;for(let i=0;i<5;i++){const an=clock*1.6+i*TAU/5,x=win.x+Math.cos(an)*(win.r+20),y=win.y+Math.sin(an)*(win.r+20)*.55,r=2.4+Math.sin(clock*6+i);g.globalAlpha=a;g.save();g.translate(x,y);g.beginPath();g.moveTo(0,-r*2);g.quadraticCurveTo(0,0,r*2,0);g.quadraticCurveTo(0,0,0,r*2);g.quadraticCurveTo(0,0,-r*2,0);g.quadraticCurveTo(0,0,0,-r*2);g.fill();g.restore()}
  g.restore();g.globalAlpha=1}

// ---------- 시작 (모든 파일을 불러온 뒤 실행) ----------
mkMenu();mkDict();goHome();loadSnd();
requestAnimationFrame(t=>{last=t;loop(t)});
// ===== game5.js : 김티비 • 똥먹방 / 김가은 • 웹툰마스터 =====
// 이 파일은 game4.js 다음에 불러옴 (캐릭터 추가 + 아이콘 새로 그림)

// ---------- 사운드 등록 (sounds 폴더에 파일 있으면 그걸, 없으면 sfxgen.js가 만들어 줌) ----------
const NEW5=['tv_throw','tv_splat','tv_neigh','tv_gallop','tv_chomp','tv_live','wm_panel','wm_punch','wm_tierup','wm_gem','wm_ult','wm_crash'];
NEW5.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{tv_throw:'똥먹방 · 똥 던지기',tv_splat:'똥먹방 · 똥 철퍽',tv_neigh:'똥먹방 · 말 울음',tv_gallop:'똥먹방 · 말발굽',tv_chomp:'똥먹방 · 냠냠',tv_live:'똥먹방 · 방송 시작',
  wm_panel:'웹툰마스터 · 컷 낙하',wm_punch:'웹툰마스터 · 급 펀치',wm_tierup:'웹툰마스터 · 등급 상승',wm_gem:'웹툰마스터 · 보석',wm_ult:'웹툰마스터 · 궁 시작',wm_crash:'웹툰마스터 · 마스터피스 낙하'});

// ---------- 캐릭터 ----------
DEF.push(
{name:'김티비 • 똥먹방',gl:'똥',k:'poop',vof:3,r:26,sp:205,col:'#d08a3a',hi:'#ffe1b3',dk:'#3b2309',alt:{col:'#ff6fa8',hi:'#ffd6e7',dk:'#4a0f2a'},alt2:{col:'#5ad1ff',hi:'#d9f6ff',dk:'#08324a'},sk:[
  {n:'똥 투척',w:.6,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>tvThrow(o,t)},
  {n:'말 타고 돌진',w:.6,cd:10,c:(o,t)=>!t.hid,f:(o,t)=>tvHorse(o,t)},
  {n:'똥먹방 LIVE',w:1.8,ult:1,f:(o,t)=>tvLive(o,t)}]},
{name:'김가은 • 웹툰마스터',gl:'웹',k:'master',vof:4,r:26,sp:205,col:'#9b6bff',hi:'#f0e6ff',dk:'#22104a',alt:{col:'#2fd6a8',hi:'#d6fff3',dk:'#063d30'},alt2:{col:'#ffb02e',hi:'#fff0c8',dk:'#4a2c00'},sk:[
  {n:'컷 낙하',w:.6,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>wmPanel(o,t)},
  {n:'급 펀치',w:.6,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>wmPunch(o,t)},
  {n:'마스터피스',w:1.8,ult:1,f:(o,t)=>wmUlt(o,t)}]});
INFO['김티비 • 똥먹방']={st:[6,6,7,8,7,7],p:'말이랑 똥을 너무 좋아함 · 궁 쓰면 똥 먹고 체력 회복',sk:[['11+냄새','똥을 던져 철퍽 · 맞으면 둔화 · 떨어진 자리에 냄새 구역이 남음'],['15','말을 불러 일직선으로 돌진 · 부딪히면 옆으로 튕겨나감'],['6×5','똥먹방 라이브 · 똥을 먹고 체력 회복한 뒤 말 떼가 우르르 몰려옴']]};
INFO['김가은 • 웹툰마스터']={st:[7,5,6,7,7,8],p:'열람 등급 · 피해를 줄수록 브론즈 → 마스터피스로 등급이 오름 · 등급마다 피해 +6%',sk:[['10','하늘에서 만화 컷이 떨어져 쾅'],['8~20','급 판정 주먹 · 일반인급 → 흑골급 → 종건급 → 김갑룡급 · 등급이 높을수록 높은 급이 잘 나옴'],['2×8+8','등급 2단계 상승 · 보석 비가 쏟아지고 마지막에 마스터피스 보석이 떨어짐']]};

// ---------- 아이콘 (네온 선) ----------
EMB.poop=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*4)*.06);
  neon(D,2,()=>{g.beginPath();g.moveTo(-17,10);g.quadraticCurveTo(-19,1,-11,1);g.lineTo(11,1);g.quadraticCurveTo(19,1,17,10);g.quadraticCurveTo(0,16,-17,10);
    g.moveTo(-11,1);g.quadraticCurveTo(-14,-7,-6,-7);g.lineTo(6,-7);g.quadraticCurveTo(14,-7,11,1);
    g.moveTo(-6,-7);g.quadraticCurveTo(-7,-14,0,-14);g.quadraticCurveTo(4,-17,2,-21);g.quadraticCurveTo(9,-16,6,-7);
    g.moveTo(-4,8);g.quadraticCurveTo(0,11,4,8);
    g.moveTo(-20,-6);g.quadraticCurveTo(-23,-10,-20,-14);g.quadraticCurveTo(-17,-18,-20,-22);g.moveTo(20,-6);g.quadraticCurveTo(23,-10,20,-14);g.quadraticCurveTo(17,-18,20,-22)});
  g.fillStyle=D.hi;g.beginPath();g.arc(-5,4.5,1.9,0,TAU);g.arc(5,4.5,1.9,0,TAU);g.fill()};
EMB.master=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,2,()=>{g.beginPath();g.moveTo(-12,-5);g.lineTo(-14,-18);g.lineTo(-6,-11);g.lineTo(0,-20);g.lineTo(6,-11);g.lineTo(14,-18);g.lineTo(12,-5);g.closePath();
    g.moveTo(0,-1);g.lineTo(8,8);g.lineTo(0,20);g.lineTo(-8,8);g.closePath();g.moveTo(0,10);g.lineTo(0,20)});
  g.fillStyle=D.hi;[[0,8,2.2],[0,-20,1.8],[-14,-18,1.6],[14,-18,1.6]].forEach(([x,y,r])=>{g.beginPath();g.arc(x,y,r,0,TAU);g.fill()});
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-12,12,.6);g.restore()};

// ================= 김티비 • 똥먹방 =================
function poopShape(s){g.save();g.scale(s,s);g.lineJoin='round';g.fillStyle='#6b3d16';g.strokeStyle='#241104';g.lineWidth=2;
  [[0,6,18,7],[0,-3,13,6],[0,-10,8,5]].forEach(([x,y,w,h])=>{g.beginPath();g.ellipse(x,y,w,h,0,0,TAU);g.fill();g.stroke()});
  g.beginPath();g.moveTo(-4,-13);g.quadraticCurveTo(0,-24,5,-17);g.quadraticCurveTo(3,-13,-4,-13);g.fill();g.stroke();
  g.fillStyle='rgba(255,215,160,.35)';[[0,6,18,7],[0,-3,13,6],[0,-10,8,5]].forEach(([x,y,w,h])=>{g.beginPath();g.ellipse(x-w*.35,y-h*.35,w*.33,h*.3,0,0,TAU);g.fill()});
  g.fillStyle='#fff';g.beginPath();g.arc(-5,5,2.6,0,TAU);g.arc(5,5,2.6,0,TAU);g.fill();g.fillStyle='#241104';g.beginPath();g.arc(-4.5,5.5,1.2,0,TAU);g.arc(5.5,5.5,1.2,0,TAU);g.fill();
  g.restore()}
function tvThrow(o,t){HZ.push({k:'tvpoop',o,t:0,x0:o.x,y0:o.y,x:clamp(t.x+t.dx*t.sp*.7,30,A-30),y:clamp(t.y+t.dy*t.sp*.7,30,A-30),fl:.7,done:0,life:4,tk:0});SFXa('tv_throw')}
HZX.tvpoop=(h,dt,EN)=>{
  if(h.t<h.fl)return true;
  if(!h.done){h.done=1;SFXa('tv_splat');shake=Math.max(shake,8);
    for(let i=0;i<20;i++){const a=rnd(0,TAU),v=rnd(60,240),l=rnd(.4,.8);Pt.push({x:h.x,y:h.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,l,m:l,sh:6,col:i%3?'#6b3d16':'#8a5526',r:rnd(2,5),gy:420,fr:.3})}
    EN.forEach(e=>{if(e.hid||e.jump)return;if(Math.hypot(e.x-h.x,e.y-h.y)<52+e.r*.4){hurt(e,11,h.o,e.x,e.y,0,1);e.slow=Math.max(e.slow,1);ft(e.x,e.y-e.r-30,'으악 냄새!','#c8d36a',24)}})}
  h.tk+=dt;if(h.tk>=.6){h.tk=0;EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<56){hurt(e,3,h.o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.7)}})}
  return h.t<h.fl+h.life;
};
HZD.tvpoop=h=>{
  const u=clamp(h.t/h.fl,0,1);
  if(u<1){const x=h.x0+(h.x-h.x0)*u,y=h.y0+(h.y-h.y0)*u,z=Math.sin(Math.PI*u)*110;
    g.save();g.globalAlpha=.25+.4*u;g.strokeStyle='#c8873a';g.lineWidth=2;g.setLineDash([6,6]);g.lineDashOffset=-clock*30;g.beginPath();g.arc(h.x,h.y,52,0,TAU);g.stroke();g.setLineDash([]);
    g.globalAlpha=.35;g.fillStyle='#000';g.beginPath();g.ellipse(x,y+6,14*(1-z/260),5,0,0,TAU);g.fill();g.globalAlpha=1;g.translate(x,y-z);g.rotate(h.t*9);poopShape(1);g.restore();return}
  const fa=clamp((h.fl+h.life-h.t)/.5,0,1),q=h.t-h.fl;
  g.save();g.globalAlpha=fa;g.translate(h.x,h.y);
  g.fillStyle='rgba(92,52,18,.75)';g.beginPath();for(let i=0;i<9;i++){const a=i*TAU/9,r=40+((i*37)%11)*1.5;g.moveTo(Math.cos(a)*r+9,Math.sin(a)*r*.55);g.arc(Math.cos(a)*r,Math.sin(a)*r*.55,9,0,TAU)}g.ellipse(0,0,42,24,0,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow('#8fbf3a',0,-10,70,.18);g.restore();
  g.strokeStyle='rgba(170,210,80,.65)';g.lineWidth=2.5;g.lineCap='round';for(let i=-1;i<=1;i++){const x=i*18,yy=-((q*30+i*14)%40)-14;g.beginPath();g.moveTo(x,yy);g.quadraticCurveTo(x+6,yy-6,x,yy-12);g.quadraticCurveTo(x-6,yy-18,x,yy-24);g.stroke()}
  const s=back(clamp(q/.2,0,1));g.translate(0,-6);poopShape(1.2*s);
  g.restore();g.globalAlpha=1;
};
function horseArt(ph,saddle){
  g.lineJoin='round';g.lineCap='round';const K='#1e1208',B='#9a6232',M='#2b1a0c';
  const leg=(x,o)=>{g.save();g.translate(x,6);g.rotate(Math.sin(ph+o)*.65);g.strokeStyle=K;g.lineWidth=7;g.beginPath();g.moveTo(0,0);g.lineTo(0,18);g.stroke();g.strokeStyle=B;g.lineWidth=4;g.stroke();g.fillStyle=K;g.fillRect(-3,17,6,4);g.restore()};
  leg(-18,0);leg(16,Math.PI*.6);
  g.strokeStyle=M;g.lineWidth=5;g.beginPath();g.moveTo(-26,-6);g.quadraticCurveTo(-42,-6+Math.sin(ph*2)*5,-38,10);g.stroke();
  g.fillStyle=B;g.strokeStyle=K;g.lineWidth=2.5;g.beginPath();g.ellipse(0,-2,28,13,0,0,TAU);g.fill();g.stroke();
  g.beginPath();g.moveTo(15,-10);g.lineTo(27,-31);g.lineTo(40,-31);g.lineTo(45,-22);g.lineTo(37,-18);g.lineTo(25,-2);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(28,-31);g.lineTo(30,-38);g.lineTo(33,-31);g.fill();g.stroke();
  g.strokeStyle=M;g.lineWidth=4.5;g.beginPath();g.moveTo(28,-31);g.quadraticCurveTo(17,-25+Math.sin(ph*2)*2,13,-11);g.stroke();
  g.fillStyle=K;g.beginPath();g.arc(36,-26,1.7,0,TAU);g.arc(43,-20,1,0,TAU);g.fill();
  leg(-12,Math.PI);leg(20,Math.PI*1.6);
  if(saddle){g.fillStyle=saddle;g.strokeStyle=K;g.lineWidth=2;g.beginPath();g.ellipse(-2,-13,10,4.5,0,0,TAU);g.fill();g.stroke()}
}
function laneStart(px,py,a){let k0=0;const c=Math.cos(a),s=Math.sin(a);while(k0<1000){const x=px-c*k0,y=py-s*k0;if(x<-50||x>A+50||y<-50||y>A+50)break;k0+=10}return[px-c*k0,py-s*k0]}
function mkHorse(px,py,a,tel,dmg){const[sx,sy]=laneStart(px,py,a);return{sx,sy,a,t:0,tel,dmg,hs:[],x:sx,y:sy,gal:0}}
function horseStep(q,o,dt,EN,snd){
  q.t+=dt;if(q.t<q.tel)return true;if(!q.gal){q.gal=1;if(snd)SFXa('tv_gallop')}
  const d=(q.t-q.tel)*900;q.x=q.sx+Math.cos(q.a)*d;q.y=q.sy+Math.sin(q.a)*d;
  if(q.x>-20&&q.x<A+20&&q.y>-20&&q.y<A+20){emit(50,dt,()=>dustP(q.x,q.y+16,50));if(Math.random()<dt*20)shake=Math.max(shake,4)}
  EN.forEach(e=>{if(q.hs.includes(e)||e.hid||e.jump)return;if(Math.hypot(e.x-q.x,e.y-q.y)<e.r+42){q.hs.push(e);hurt(e,q.dmg,o,e.x,e.y,0,1);
    const sd=Math.sign((e.x-q.x)*-Math.sin(q.a)+(e.y-q.y)*Math.cos(q.a))||1,pa=q.a+sd*Math.PI/2;e.dx=Math.cos(pa);e.dy=Math.sin(pa);e.x=clamp(e.x+Math.cos(pa)*40,e.r,A-e.r);e.y=clamp(e.y+Math.sin(pa)*40,e.r,A-e.r);e.stn=Math.max(e.stn,.3);
    ft(e.x,e.y-e.r-30,'히히힝!','#ffe1b3',24)}});
  return d<1600;
}
function drawHorseLane(q,D){
  if(q.t<q.tel){const u=q.t/q.tel;g.save();g.translate(q.sx,q.sy);g.rotate(q.a);g.globalAlpha=.12+.25*u;g.fillStyle=D.col;g.fillRect(0,-32,1500,64);
    g.globalAlpha=.6*u+.2;g.strokeStyle=D.hi;g.lineWidth=2;g.setLineDash([12,10]);g.lineDashOffset=-clock*80;g.strokeRect(0,-32,1500,64);g.setLineDash([]);
    g.lineWidth=3;for(let i=0;i<10;i++){const x=((i*110+clock*400)%1100);g.beginPath();g.moveTo(x,-12);g.lineTo(x+12,0);g.lineTo(x,12);g.stroke()}g.restore();return}
  const sd=Math.cos(q.a)<0?-1:1;g.save();g.translate(q.x,q.y);g.fillStyle='#0006';g.beginPath();g.ellipse(0,26,36,8,0,0,TAU);g.fill();
  g.rotate(Math.atan2(Math.sin(q.a),Math.abs(Math.cos(q.a)))*sd*.35);g.scale(sd*1.25,1.25);horseArt(q.t*28,D.col);g.restore();
}
function tvHorse(o,t){const L=.55+dist(o,t)/900+.25,px=clamp(t.x+t.dx*t.sp*L,t.r,A-t.r),py=clamp(t.y+t.dy*t.sp*L,t.r,A-t.r);HZ.push({k:'tvhorse',o,q:mkHorse(px,py,Math.atan2(py-o.y,px-o.x),.55,15)});SFXa('tv_neigh')}
HZX.tvhorse=(h,dt,EN)=>horseStep(h.q,h.o,dt,EN,1);
HZD.tvhorse=h=>drawHorseLane(h.q,h.o.d);
const CHAT5=['ㅋㅋㅋㅋㅋ','진짜 먹네','실화냐','먹방 레전드','말 언제 나옴?','구독 박고 감','역겨워 ㅋㅋ','방장 미쳤다','후원 1000원 : 한 입 더','오늘도 똥이네','말 사랑해','이게 방송이냐'];
function tvLive(o,t){HZ.push({k:'tvlive',o,t:0,b:0,n:0,hs:[],chat:[],ct:0,view:1200});SFXa('tv_live')}
HZX.tvlive=(h,dt,EN)=>{
  const o=h.o;if(o.dead)return false;
  if(h.b<3&&h.t>=.35+h.b*.5){h.b++;const hv=Math.min(3,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x+18,o.y-o.r-10,'+'+hv,'#7bff8a',24)}ft(o.x+rnd(-20,20),o.y-o.r-38,'냠!',o.d.hi,28);o.sq=1;o.sa=Math.PI/2;SFXa('tv_chomp')}
  if(h.n<5&&h.t>=1.9+h.n*.35&&EN.length){const e=EN[h.n%EN.length];h.hs.push(mkHorse(e.x+e.dx*e.sp*.45,e.y+e.dy*e.sp*.45,rnd(0,TAU),.4,6));h.n++}
  h.hs=h.hs.filter((q,i)=>horseStep(q,o,dt,EN,i==0&&q.t<.5));
  h.ct-=dt;h.view+=dt*rnd(800,2400);if(h.ct<=0&&h.t<3.9){h.ct=.28;h.chat.push({txt:CHAT5[Math.floor(rnd(0,CHAT5.length))],t:0});if(h.chat.length>7)h.chat.shift()}h.chat.forEach(c=>c.t+=dt);
  return h.t<4.4;
};
HZD.tvlive=h=>{h.hs.forEach(q=>drawHorseLane(q,h.o.d));
  const o=h.o;if(h.b<3||h.t<1.8){const p=(h.t*2)%1;g.save();g.translate(o.x+o.r*.6,o.y-o.r*.2-Math.sin(p*Math.PI)*8);poopShape(.55);g.restore()}};
HZP.tvlive=h=>{
  const a=Math.min(1,h.t/.25)*clamp((4.4-h.t)/.35,0,1);g.save();g.globalAlpha=a;
  g.fillStyle='#ff2d4a';g.fillRect(14,14,58,24);g.fillStyle='#fff';g.font='15px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillText('LIVE',43,27);
  g.fillStyle='rgba(0,0,0,.55)';g.fillRect(76,14,104,24);g.fillStyle='#fff';g.font='13px '+FD;g.fillText('👁 '+Math.floor(h.view).toLocaleString(),128,27);
  g.font='14px '+FD;g.textAlign='left';g.fillStyle='#ffe1b3';g.fillText(h.o.d.name.split(' •')[0]+'의 똥먹방',16,54);
  h.chat.forEach((c,i)=>{const y=A-40-(h.chat.length-1-i)*30,ca=Math.min(1,c.t/.15);g.globalAlpha=a*ca*.9;g.fillStyle='rgba(10,10,14,.7)';const w=c.txt.length*13+20;g.fillRect(A-w-14,y-12,w,24);g.globalAlpha=a*ca;g.fillStyle=i%2?'#ffe1b3':'#ffffff';g.font='700 13px '+FB;g.textAlign='right';g.fillText(c.txt,A-24,y+1)});
  g.restore();
};

// ================= 김가은 • 웹툰마스터 =================
const TIERS=[['브론즈','#ff8a4c','#ffd8c2'],['실버','#b9c7d6','#ffffff'],['골드','#ffcc33','#fff4c2'],['플래티넘','#3fd3ff','#dcf7ff'],['다이아','#a78bfa','#f1eaff'],['에메랄드','#2fd66b','#d8ffe5'],['마스터피스','#ff5fd2','#ffe3f7']],TH=[15,32,52,75,100,130];
const wmM=o=>1+.06*(o.tier||0);
function wmUp(o){FX.push({k:'tierup',o,tier:o.tier,l:1.7,m:1.7});SFXa('wm_tierup');ring(o.x,o.y,o.r,o.r+70,TIERS[o.tier][1],6,.5);for(let i=0;i<14;i++){const a=rnd(0,TAU);sparkP(o.x,o.y,Math.cos(a)*160,Math.sin(a)*160,TIERS[o.tier][1],rnd(2,4))}}
function wmGain(o,n){if((o.tier||0)>=6||n<=0)return;o.views=(o.views||0)+n;while((o.tier||0)<6&&o.views>=TH[o.tier||0]){o.tier=(o.tier||0)+1;wmUp(o)}}
function wmHit(o,e,n,x,y,heavy){const h0=e.hp;hurt(e,Math.round(n*wmM(o)),o,x,y,0,heavy);wmGain(o,h0-e.hp)}
function gemPath(t){g.beginPath();const st=(n,r1,r2)=>{for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,r=i%2?r2:r1;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath()},P=pts=>{pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath()};
  if(t==0)P([[0,-13],[13,0],[0,13],[-13,0]]);else if(t==1)P([[0,-16],[9,0],[0,16],[-9,0]]);else if(t==2)st(4,16,6);else if(t==3)st(5,16,7);else if(t==4)st(6,16,8.5);
  else if(t==5)P([[-6,-14],[6,-14],[13,-6],[13,6],[6,14],[-6,14],[-13,6],[-13,-6]]);else st(8,17,10)}
function gem(t,s){const[,c,h]=TIERS[t];g.save();g.scale(s,s);g.save();g.globalCompositeOperation='lighter';glow(c,0,0,28,.45);g.restore();
  gemPath(t);const gr=g.createLinearGradient(-12,-15,12,15);gr.addColorStop(0,h);gr.addColorStop(.55,c);gr.addColorStop(1,c);g.fillStyle=gr;g.fill();g.lineJoin='round';g.lineWidth=1.6;g.strokeStyle='rgba(0,0,0,.5)';g.stroke();
  g.save();gemPath(t);g.clip();g.fillStyle='rgba(255,255,255,.38)';g.beginPath();g.moveTo(0,0);g.lineTo(-22,-22);g.lineTo(22,-22);g.closePath();g.fill();g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.moveTo(0,0);g.lineTo(22,22);g.lineTo(-22,22);g.closePath();g.fill();
  if(t==6){const rg=g.createLinearGradient(-17,0,17,0);['#ff5fd2','#ffcc33','#2fd66b','#3fd3ff','#a78bfa'].forEach((cc,i)=>rg.addColorStop(i/4,cc));g.globalAlpha*=.5;g.fillStyle=rg;g.fillRect(-20,-20,40,40)}g.restore();
  g.restore()}
// 등급 배지 (공 위에 항상 표시)
const _lowHP5=lowHP;lowHP=function(f){_lowHP5(f);if(f.d.k=='master'&&!f.dead&&!f.hid&&phase!='menu'){g.save();g.translate(f.x+f.r*.8,f.y-f.r-8+Math.sin(clock*3)*2);gem(f.tier||0,.7);g.restore()}};
FXD.tierup=x=>{const p=1-x.l/x.m,a=clamp(p/.12,0,1)*clamp(x.l/.3,0,1),yy=-60+back(clamp(p/.2,0,1))*96,T0=TIERS[x.tier],w=330,hh=86;
  g.save();g.globalAlpha=a;g.translate(A/2,yy);g.fillStyle='rgba(14,16,24,.94)';g.beginPath();g.moveTo(-w/2+14,-hh/2);g.lineTo(w/2,-hh/2);g.lineTo(w/2-14,hh/2);g.lineTo(-w/2,hh/2);g.closePath();g.fill();g.strokeStyle=T0[1];g.lineWidth=2.5;g.stroke();
  g.save();g.translate(-w/2+50,0);g.rotate(Math.sin(clock*3)*.1);gem(x.tier,1.5+.15*Math.sin(clock*6));g.restore();
  g.textAlign='left';g.textBaseline='middle';g.font='700 15px '+FB;g.fillStyle='#d6dae4';g.fillText(x.o.d.name.split(' •')[0]+'님',-w/2+92,-16);
  g.font='700 19px '+FB;g.fillStyle=T0[1];const tw=g.measureText(T0[0]).width;g.fillText(T0[0],-w/2+92,12);g.fillStyle='#ffffff';g.fillText(' 등급을 획득했어요!',-w/2+92+tw,12);
  g.restore()};
const ONO=['콰광!','쾅!','퍽!','콰직!','두둥!'];
function wmPanel(o,t){HZ.push({k:'wmpanel',o,t:0,x:clamp(t.x+t.dx*t.sp*.55,70,A-70),y:clamp(t.y+t.dy*t.sp*.55,55,A-55),dl:.55,done:0,tx:ONO[Math.floor(rnd(0,ONO.length))]})}
HZX.wmpanel=(h,dt,EN)=>{
  if(h.t<h.dl)return true;
  if(!h.done){h.done=1;SFXa('wm_panel');shake=Math.max(shake,11);hs=.05;
    EN.forEach(e=>{if(e.hid||e.jump)return;if(Math.abs(e.x-h.x)<60+e.r*.4&&Math.abs(e.y-h.y)<45+e.r*.4){wmHit(h.o,e,10,e.x,e.y,1);e.stn=Math.max(e.stn,.25)}});
    for(let i=0;i<12;i++)cubeP(h.x,h.y,rnd(0,TAU),rnd(80,220),['#ffffff','#111111',h.o.d.col][i%3])}
  return h.t<h.dl+.75;
};
function panelArt(D,w,hh,t){g.fillStyle='#fbf8ef';g.fillRect(-w/2,-hh/2,w,hh);
  g.save();g.beginPath();g.rect(-w/2,-hh/2,w,hh);g.clip();g.fillStyle=D.col;g.globalAlpha*=.5;for(let x=-w/2;x<w/2;x+=9)for(let y=-hh/2;y<hh/2;y+=9){const r=Math.max(0,3.4-Math.hypot(x,y)/22);if(r>0){g.beginPath();g.arc(x+(y/9%2)*4.5,y,r,0,TAU);g.fill()}}
  g.globalAlpha/=.5;g.strokeStyle='#111';g.lineWidth=1.5;for(let k=0;k<16;k++){const a=k*TAU/16+t;g.beginPath();g.moveTo(Math.cos(a)*30,Math.sin(a)*30);g.lineTo(Math.cos(a)*90,Math.sin(a)*90);g.stroke()}g.restore();
  g.lineWidth=6;g.strokeStyle='#111';g.strokeRect(-w/2,-hh/2,w,hh)}
HZD.wmpanel=h=>{const D=h.o.d;
  if(h.t<h.dl){const u=h.t/h.dl,q=u*u;g.save();g.translate(h.x,h.y);g.globalAlpha=.25+.45*u;g.fillStyle='#000';g.fillRect(-60*(.5+.5*q),-45*(.5+.5*q),120*(.5+.5*q),90*(.5+.5*q));
    g.globalAlpha=.8;g.strokeStyle=D.col;g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.strokeRect(-60,-45,120,90);g.setLineDash([]);g.restore();
    g.save();g.translate(h.x,h.y-(1-q)*480);g.rotate((1-q)*.5);g.scale(1+(1-q)*.4,1+(1-q)*.4);panelArt(D,120,90,0);g.restore();return}
  const q=h.t-h.dl,fa=clamp((h.dl+.75-h.t)/.3,0,1);g.save();g.globalAlpha=fa;g.translate(h.x,h.y);g.scale(1+.06*Math.max(0,.15-q)/.15,1);panelArt(D,120,90,q*.5);g.restore();g.globalAlpha=1};
HZP.wmpanel=h=>{if(h.t<h.dl)return;const q=h.t-h.dl,s=back(clamp(q/.15,0,1)),fa=clamp((h.dl+.75-h.t)/.3,0,1);g.save();g.globalAlpha=fa;g.translate(h.x,h.y-50);g.rotate(-.15);g.scale(s,s);
  g.font='48px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#111';g.strokeText(h.tx,0,0);g.fillStyle='#fff';g.lineWidth=5;g.strokeStyle=h.o.d.col;g.strokeText(h.tx,0,0);g.fillText(h.tx,0,0);g.restore()};
const GRD=[['일반인급',8,'#c9cfdb'],['흑골급',11,'#8a90a0'],['종건급',15,'#ffcc33'],['김갑룡급',20,'#ff3b5c']];
function wmPunch(o,t){const r=Math.random()+(o.tier||0)*.05,gi=r<.4?0:r<.7?1:r<.9?2:3;HZ.push({k:'wmfist',o,tg:t,t:0,gi,x:o.x,y:o.y,done:0});SFXa('wm_punch');
  ft(o.x,o.y-o.r-40,GRD[gi][0]+'!',GRD[gi][2],gi==3?36:26)}
HZX.wmfist=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead)return false;
  if(!h.done){const u=clamp(h.t/.22,0,1),ex=e&&!e.dead?e.x:h.x,ey=e&&!e.dead?e.y:h.y;h.x=o.x+(ex-o.x)*u;h.y=o.y+(ey-o.y)*u;h.a=Math.atan2(ey-o.y,ex-o.x);
    if(u>=1){h.done=1;h.dt=h.t;if(e&&!e.dead&&!e.hid&&!e.jump){wmHit(o,e,GRD[h.gi][1],e.x,e.y,h.gi>=1);e.dx=Math.cos(h.a);e.dy=Math.sin(h.a);e.x=clamp(e.x+Math.cos(h.a)*(20+h.gi*14),e.r,A-e.r);e.y=clamp(e.y+Math.sin(h.a)*(20+h.gi*14),e.r,A-e.r);e.stn=Math.max(e.stn,.2+h.gi*.1)}
      FX.push({k:'burst',x:h.x,y:h.y,c:GRD[h.gi][2],a:0,l:.3,m:.3});shake=Math.max(shake,6+h.gi*5);if(h.gi==3){FX.push({k:'frost',l:.18,m:.18,c:'#ffd0d8'});ft(h.x,h.y-60,'김갑룡급!!','#ff3b5c',44)}}}
  return !h.done||h.t<h.dt+.3;
};
HZD.wmfist=h=>{const D=h.o.d,sc=1.6+h.gi*.3,fa=h.done?clamp(1-(h.t-h.dt)/.3,0,1):1;g.save();g.globalAlpha=fa;g.translate(h.x,h.y);g.rotate(h.a||0);
  g.save();g.globalCompositeOperation='lighter';glow(GRD[h.gi][2],0,0,40*sc,.5);g.restore();
  g.strokeStyle='#fff';g.lineWidth=2;g.lineCap='round';for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(-16*sc,i*5*sc/2);g.lineTo(-(40+Math.abs(i)*8)*sc,i*5*sc/2);g.stroke()}
  g.scale(sc,sc);g.fillStyle=D.col;g.strokeStyle='#0b0d12';g.lineWidth=2.5;g.beginPath();g.moveTo(-9,-9);g.lineTo(5,-9);g.quadraticCurveTo(9,-9,9,-5);g.lineTo(9,5);g.quadraticCurveTo(9,9,5,9);g.lineTo(-9,9);g.closePath();g.fill();g.stroke();
  g.lineWidth=1.5;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(4,i*5);g.lineTo(9,i*5);g.stroke()}g.fillStyle='rgba(255,255,255,.35)';g.fillRect(-7,-7,10,3);g.restore();g.globalAlpha=1};
function wmUlt(o,t){HZ.push({k:'wmult',o,t:0,n:0,gems:[],fin:0,up:0});SFXa('wm_ult')}
HZX.wmult=(h,dt,EN)=>{
  const o=h.o;if(o.dead)return false;
  if(!h.up&&h.t>=.2){h.up=1;for(let i=0;i<2;i++)if((o.tier||0)<6){o.tier=(o.tier||0)+1;o.views=Math.max(o.views||0,TH[o.tier-1])}wmUp(o)}
  if(h.n<8&&h.t>=.5+h.n*.22&&EN.length){const e=EN[h.n%EN.length];h.gems.push({e,ox:rnd(-22,22),oy:rnd(-22,22),x:e.x,y:e.y,t:0,done:0,tier:o.tier||0});h.n++}
  h.gems.forEach(q=>{q.t+=dt;if(q.t<.3&&!q.e.dead){q.x=clamp(q.e.x+q.ox,20,A-20);q.y=clamp(q.e.y+q.oy,20,A-20)}
    if(!q.done&&q.t>=.45){q.done=1;SFXa('wm_gem');ring(q.x,q.y,4,50,TIERS[q.tier][1],5,.35);for(let i=0;i<8;i++){const a=rnd(0,TAU);sparkP(q.x,q.y,Math.cos(a)*150,Math.sin(a)*150,TIERS[q.tier][2],rnd(2,3.5))}
      EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-q.x,e.y-q.y)<40+e.r*.5)wmHit(o,e,2,e.x,e.y,0)})}});
  if(!h.fin&&h.t>=2.5){h.fin=1;h.ft=h.t;h.tg=tgt(o)}
  if(h.fin==1){const e=h.tg;if(e&&!e.dead&&h.t<h.ft+.35){h.fx=e.x;h.fy=e.y}else if(h.fx==null){h.fx=A/2;h.fy=A/2}
    if(h.t>=h.ft+.55){h.fin=2;SFXa('wm_crash');shake=22;hs=.12;FX.push({k:'frost',l:.2,m:.2,c:'#ffe3f7'});ring(h.fx,h.fy,10,190,'#ff5fd2',12,.6);ring(h.fx,h.fy,10,130,'#ffffff',6,.4);
      for(let i=0;i<40;i++)shardP(h.fx,h.fy,rnd(-320,320),rnd(-380,60),rnd(2,5));EN.forEach(e=>{if(!e.hid&&Math.hypot(e.x-h.fx,e.y-h.fy)<105+e.r)wmHit(o,e,8,e.x,e.y,1)});ft(clamp(h.fx,150,A-150),Math.max(60,h.fy-70),'MASTERPIECE','#ff5fd2',32)}}
  return h.fin<2||h.t<h.ft+1.4;
};
HZD.wmult=h=>{
  h.gems.forEach(q=>{if(q.done)return;const u=clamp(q.t/.45,0,1);g.save();g.globalAlpha=.3+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(q.x,q.y+4,12*u+4,5*u+2,0,0,TAU);g.fill();g.strokeStyle=TIERS[q.tier][1];g.lineWidth=2;g.beginPath();g.arc(q.x,q.y,40,0,TAU);g.stroke();g.restore()});
  if(h.fin==1){const u=clamp((h.t-h.ft)/.55,0,1);g.save();g.translate(h.fx,h.fy);g.globalAlpha=.3+.5*u;g.strokeStyle='#ff5fd2';g.lineWidth=3;g.setLineDash([12,8]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,105,0,TAU);g.stroke();g.setLineDash([]);g.fillStyle='rgba(0,0,0,.4)';g.beginPath();g.ellipse(0,6,40*u+8,16*u+4,0,0,TAU);g.fill();g.restore()}
};
HZP.wmult=h=>{
  const a=Math.min(1,h.t/.3)*(h.fin==2?clamp((h.ft+1.4-h.t)/.4,0,1):1),cur=h.o.tier||0;
  g.save();g.globalAlpha=a*.92;g.fillStyle='rgba(12,14,22,.8)';g.fillRect(10,60,118,7*30+14);
  TIERS.forEach((T0,i)=>{const y=74+(6-i)*30,on=i==cur;g.save();g.translate(28,y+6);gem(i,on?.62:.5);g.restore();g.font=(on?'700 14px ':'12px ')+FB;g.textAlign='left';g.textBaseline='middle';g.fillStyle=on?T0[1]:'#7c8396';g.fillText(T0[0],46,y+6);if(on){g.strokeStyle=T0[1];g.lineWidth=1.5;g.strokeRect(14,y-8,108,28)}});
  g.restore();
  h.gems.forEach(q=>{if(q.done)return;const u=clamp(q.t/.45,0,1);g.save();g.translate(q.x,q.y-(1-u*u)*420);g.rotate(q.t*6);gem(q.tier,1.1);g.restore()});
  if(h.fin==1){const u=clamp((h.t-h.ft)/.55,0,1);g.save();g.translate(h.fx,h.fy-(1-u*u)*520);g.rotate(Math.sin(h.t*4)*.2);gem(6,3.2);g.restore()}
};

// ---------- 아이콘 다시 그리기 (새 캐릭터 포함) ----------
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
// ===== game6.js : 김건우 • 레디언트 / 흉악범 • 절도범 =====
const NEW6=['rd_flick','rd_head','rd_flash','rd_dash','rd_plant','rd_beep','rd_boom','th_snatch','th_coin','th_hook','th_steal','th_ult','th_cash'];
NEW6.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{rd_flick:'레디언트 · 플릭샷 총소리',rd_head:'레디언트 · 헤드샷 띵',rd_flash:'레디언트 · 섬광탄',rd_dash:'레디언트 · 대시',rd_plant:'레디언트 · 스파이크 설치',rd_beep:'레디언트 · 스파이크 삑삑',rd_boom:'레디언트 · 스파이크 폭발',
  th_snatch:'절도범 · 소매치기',th_coin:'절도범 · 동전',th_hook:'절도범 · 갈고리 던지기',th_steal:'절도범 · 스킬 강탈',th_ult:'절도범 · 한탕 시작',th_cash:'절도범 · 한탕 성공'});

DEF.push(
{name:'김건우 • 레디언트',gl:'레',k:'radiant',vof:6,master:1,r:23,sp:245,col:'#ffd84a',hi:'#fff6c8',dk:'#3d2e00',alt:{col:'#3fe0d0',hi:'#d8fffb',dk:'#06403a'},alt2:{col:'#ff4f6a',hi:'#ffd6dd',dk:'#4a0812'},sk:[
  {n:'플릭샷',w:.35,cd:4.5,c:(o,t)=>!t.hid,f:(o,t)=>rdFlick(o,t)},
  {n:'섬광 진입',w:.5,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<520,f:(o,t)=>rdFlash(o,t)},
  {n:'스파이크 설치',w:1.8,ult:1,f:(o,t)=>rdSpike(o,t)}]},
{name:'흉악범 • 절도범',gl:'도',k:'thief',vof:5,r:25,sp:230,col:'#6ee39a',hi:'#e2ffe9',dk:'#0a3a1e',alt:{col:'#b48cff',hi:'#efe6ff',dk:'#24104a'},alt2:{col:'#ffc94a',hi:'#fff1c8',dk:'#4a3300'},sk:[
  {n:'소매치기',w:.4,cd:6,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<460,f:(o,t)=>thPick(o,t)},
  {n:'쿨타임 강탈',w:.5,cd:10,c:(o,t)=>!t.hid,f:(o,t)=>thHook(o,t)},
  {n:'대도의 한탕',w:1.8,ult:1,f:(o,t)=>thHeist(o,t)}]});
INFO['김건우 • 레디언트']={st:[8,4,10,9,4,8],p:'레디언트 에임 · 니케 스승 (김티비 상대로 피해 25% 증가)',sk:[['7 / 15','순식간에 조준해서 한 발 · 헤드샷이면 15'],['4+10','섬광탄으로 눈을 멀게 하고 바로 돌진 · 섬광 맞으면 스킬 못 씀'],['3×5+25','적들 한가운데 스파이크를 박고 지키면서 사격 · 4초 뒤 큰 폭발']]};
INFO['흉악범 • 절도범']={st:[6,5,9,7,5,9],p:'손버릇 · 훔친 만큼 내가 강해짐',sk:[['7+궁 게이지','상대를 스치며 지갑 슬쩍 · 상대 궁 게이지 12를 훔쳐옴'],['7+쿨 강탈','갈고리 손을 던져 맞히면 상대 스킬 하나의 쿨타임을 처음으로 되돌리고 내 쿨타임은 줄어듦'],['4.5×6','모습을 감추고 상대를 여섯 번 털어감 · 털 때마다 체력 1 회복']]};

// ---------- 아이콘 ----------
EMB.radiant=(f,D)=>{g.rotate(-f.rot*.5+clock*.6);
  neon(D,2,()=>{g.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8,r0=12,r1=i%2?17:22;g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1)}
    g.moveTo(8,0);g.arc(0,0,8,0,TAU)});
  g.rotate(-clock*.6);g.strokeStyle=D.hi;g.lineWidth=1.6;g.beginPath();g.moveTo(-5,0);g.lineTo(-2,0);g.moveTo(2,0);g.lineTo(5,0);g.moveTo(0,-5);g.lineTo(0,-2);g.moveTo(0,2);g.lineTo(0,5);g.stroke();
  g.fillStyle=D.hi;g.beginPath();g.arc(0,0,1.3,0,TAU);g.fill();g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,16,.6);g.restore()};
EMB.thief=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*4)*.05);
  neon(D,2,()=>{g.beginPath();g.moveTo(-21,-5);g.quadraticCurveTo(-13,-14,0,-8);g.quadraticCurveTo(13,-14,21,-5);g.lineTo(16,5);g.quadraticCurveTo(6,8,0,3);g.quadraticCurveTo(-6,8,-16,5);g.closePath();
    g.moveTo(-4,-3);g.ellipse(-9,-2,5,3.4,0,0,TAU);g.moveTo(14,-2);g.ellipse(9,-2,5,3.4,0,0,TAU);
    g.moveTo(-22,-4);g.lineTo(-25,4);g.moveTo(22,-4);g.lineTo(25,4);
    g.moveTo(6,15);g.arc(0,15,6,0,TAU);g.moveTo(0,11);g.lineTo(0,19)});
  g.fillStyle=D.hi;[[-9,-2],[9,-2]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,1.4,0,TAU);g.fill()})};

// ================= 김건우 • 레디언트 =================
FXD.rdx=x=>{const p=1-x.l/x.m,r=40-26*Math.min(1,p*3);g.save();g.translate(x.x,x.y);g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=2.5;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();
  for(let i=0;i<4;i++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(r-6,0);g.lineTo(r+10,0);g.stroke()}g.fillStyle=x.c;g.beginPath();g.arc(0,0,2.5,0,TAU);g.fill();g.restore()};
function rdFlash(o,t){HZ.push({k:'rdflash',o,tg:t,t:0,x0:o.x,y0:o.y,x:clamp(t.x+t.dx*t.sp*.45,20,A-20),y:clamp(t.y+t.dy*t.sp*.45,20,A-20),fl:.45,done:0,bl:[]});SFXa('rd_dash')}
HZX.rdflash=(h,dt,EN)=>{
  const o=h.o;if(h.t<h.fl)return true;
  if(!h.done){h.done=1;SFXa('rd_flash');FX.push({k:'rdpop',x:h.x,y:h.y,l:.6,m:.6});shake=Math.max(shake,8);
    EN.forEach(e=>{if(e.hid||e.jump)return;if(Math.hypot(e.x-h.x,e.y-h.y)<170){hurt(e,4,o,e.x,e.y,0,0);e.gcd=Math.max(e.gcd,1.4);e.cast=null;e.slow=Math.max(e.slow,1.2);h.bl.push(e);ft(e.x,e.y-e.r-30,'섬광!','#ffffff',24)}});
    const e=h.tg&&!h.tg.dead?h.tg:tgt(o);if(e&&!o.dead){const a=ang(o,e);o.dx=Math.cos(a);o.dy=Math.sin(a);o.dash=.55;o.hit=0;SFXa('rd_dash')}}
  return h.t<h.fl+1.4;
};
HZD.rdflash=h=>{if(h.t<h.fl){const u=h.t/h.fl,x=h.x0+(h.x-h.x0)*u,y=h.y0+(h.y-h.y0)*u,z=Math.sin(Math.PI*u)*80;g.save();g.globalAlpha=.4;g.fillStyle='#000';g.beginPath();g.ellipse(x,y+5,7,3,0,0,TAU);g.fill();g.globalAlpha=1;
  g.translate(x,y-z);g.rotate(h.t*14);g.fillStyle='#d5dbe4';g.strokeStyle='#1a1d26';g.lineWidth=1.5;g.fillRect(-5,-7,10,14);g.strokeRect(-5,-7,10,14);g.fillStyle=h.o.d.col;g.fillRect(-5,-2,10,3);g.restore()}};
HZP.rdflash=h=>{if(!h.done)return;const q=h.t-h.fl;h.bl.forEach(e=>{if(e.dead||q>1.4)return;const a=clamp((1.4-q)/.4,0,1);g.save();g.globalCompositeOperation='lighter';glow('#ffffff',e.x,e.y,e.r*2.2,.55*a);g.restore();
  g.save();g.globalAlpha=a;g.strokeStyle='#ffffff';g.lineWidth=2;for(let i=0;i<3;i++){const an=clock*5+i*TAU/3;g.beginPath();g.arc(e.x+Math.cos(an)*(e.r+8),e.y-e.r*.4+Math.sin(an)*5,3,0,TAU);g.stroke()}g.restore()})};
FXD.rdpop=x=>{const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';glow('#ffffff',x.x,x.y,60+p*260,(1-p)*.95);glow('#fff6c8',x.x,x.y,40+p*120,(1-p));g.restore();if(p<.25){g.save();g.globalAlpha=(.25-p)*2.4;g.fillStyle='#fff';g.fillRect(-300,-300,A+600,A+600);g.restore()}};
function rdShot(o,t,dn,dh){const a=ang(o,t),hit=!t.hid&&!t.jump&&Math.random()<.88,head=hit&&Math.random()<.45,ex=hit?t.x:o.x+Math.cos(a+rnd(-.12,.12))*900,ey=hit?t.y:o.y+Math.sin(a+rnd(-.12,.12))*900;
  FX.push({k:'muz',x:o.x+Math.cos(a)*(o.r+6),y:o.y+Math.sin(a)*(o.r+6),a,l:.08,m:.08});FX.push({k:'trc',x:o.x,y:o.y,x2:ex,y2:ey,c:o.d.col,l:.2,m:.2});FX.push({k:'rdx',x:t.x,y:t.y,c:o.d.col,l:.35,m:.35});SFXa('rd_flick');shake=Math.max(shake,5);
  if(hit){hurt(t,head?dh:dn,o,t.x,t.y,0,head);if(head){SFXa('rd_head');ft(t.x,t.y-t.r-44,'HEADSHOT','#ff4655',dh>10?30:22);FX.push({k:'burst',x:t.x,y:t.y,c:'#ff4655',a:0,l:.3,m:.3})}}else ft(t.x,t.y-t.r-30,'MISS','#9aa0ad',20)}
function rdFlick(o,t){rdShot(o,t,7,15)}
// ULT 스파이크 설치 : 적들 한가운데 스파이크를 박고, 터질 때까지 지키며 사격 · 카운트가 끝나면 큰 폭발
function rdSpike(o,t){const EN=F.filter(x=>x!=o&&!x.dead);let x=A/2,y=A/2;if(EN.length){x=EN.reduce((s,e)=>s+e.x,0)/EN.length;y=EN.reduce((s,e)=>s+e.y,0)/EN.length}
  HZ.push({k:'rdspike',o,t:0,x:clamp(x,90,A-90),y:clamp(y,90,A-90),dur:4.2,nb:.3,boom:0,sh:0,R:230,fl:0});SFXa('rd_plant');FX.push({k:'rdban',txt:'SPIKE PLANTED',c:o.d.col,l:1.5,m:1.5})}
HZX.rdspike=(h,dt,EN)=>{
  const o=h.o;
  if(!h.boom){const left=h.dur-h.t;h.nb-=dt;if(h.nb<=0){h.nb=Math.max(.1,left*.2);SFXa('rd_beep');h.fl=1}h.fl=Math.max(0,h.fl-dt*7);
    if(!o.dead&&h.sh<5&&h.t>=.7+h.sh*.6){const e=tgt(o);if(e&&e!=o&&!e.hid){h.sh++;rdShot(o,e,3,7)}}
    if(h.t>=h.dur){h.boom=1;h.bt=h.t;SFXa('rd_boom');shake=26;hs=.14;FX.push({k:'rdboom',x:h.x,y:h.y,R:h.R,c:o.d.col,l:.9,m:.9});FX.push({k:'frost',l:.25,m:.25,c:'#ffffff'});FX.push({k:'scorch',x:h.x,y:h.y,r:90,l:4,m:4,c:o.d.col});
      for(let i=0;i<30;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(120,380));
      EN.forEach(e=>{if(e.hid)return;if(Math.hypot(e.x-h.x,e.y-h.y)<h.R+e.r){hurt(e,25,o,e.x,e.y,0,1);const a=Math.atan2(e.y-h.y,e.x-h.x);e.dx=Math.cos(a);e.dy=Math.sin(a);e.x=clamp(e.x+e.dx*40,e.r,A-e.r);e.y=clamp(e.y+e.dy*40,e.r,A-e.r);e.stn=Math.max(e.stn,.4)}});
      FX.push({k:'rdban',txt:'DETONATED',c:'#ff4655',l:1.3,m:1.3})}}
  return !h.boom||h.t<h.bt+.6;
};
HZD.rdspike=h=>{
  if(h.boom)return;const D=h.o.d,u=clamp(h.t/h.dur,0,1),left=h.dur-h.t,warn=left<1.2,pc=warn&&Math.sin(clock*40)>0?'#ff4655':D.col;
  g.save();g.translate(h.x,h.y);
  g.globalAlpha=.08+.1*u+(warn?.08:0);g.fillStyle=pc;g.beginPath();g.arc(0,0,h.R,0,TAU);g.fill();
  g.globalAlpha=.6;g.strokeStyle=pc;g.lineWidth=2.5;g.setLineDash([14,10]);g.lineDashOffset=-clock*(warn?120:40);g.beginPath();g.arc(0,0,h.R,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.9;g.lineWidth=5;g.lineCap='round';g.beginPath();g.arc(0,0,46,-Math.PI/2,-Math.PI/2+TAU*(1-u));g.stroke();
  g.globalAlpha=.25*h.fl;g.lineWidth=3;g.beginPath();g.arc(0,0,46+h.fl*0+(1-h.fl)*60,0,TAU);g.stroke();
  g.globalAlpha=1;g.save();g.globalCompositeOperation='lighter';glow(pc,0,-10,40+30*h.fl,.4+.5*h.fl);g.restore();
  g.fillStyle='#0006';g.beginPath();g.ellipse(0,8,22,7,0,0,TAU);g.fill();
  g.lineJoin='round';g.fillStyle='#2a2e38';g.strokeStyle='#0b0d12';g.lineWidth=2;poly([[-18,4],[-9,10],[9,10],[18,4],[9,-2],[-9,-2]]);g.fill();g.stroke();
  const bg=g.createLinearGradient(-10,0,10,0);bg.addColorStop(0,'#3a3f4c');bg.addColorStop(.5,'#8a91a3');bg.addColorStop(1,'#3a3f4c');g.fillStyle=bg;g.fillRect(-9,-34,18,36);g.strokeRect(-9,-34,18,36);
  g.fillStyle='#2a2e38';poly([[-11,-34],[11,-34],[6,-42],[-6,-42]]);g.fill();g.stroke();
  g.fillStyle=pc;g.globalAlpha=.5+.5*h.fl;g.fillRect(-2,-31,4,30);[-26,-18,-10].forEach(y=>{g.fillRect(-7,y,14,2)});g.globalAlpha=1;
  g.fillStyle=pc;g.beginPath();g.arc(0,-44,2.5+1.5*h.fl,0,TAU);g.fill();
  g.font='16px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#000';const tx=left.toFixed(1);g.strokeText(tx,0,30);g.fillStyle=warn?'#ff4655':'#ffffff';g.fillText(tx,0,30);
  g.restore();
};
FXD.rdboom=x=>{const p=1-x.l/x.m,e=1-Math.pow(1-p,3);g.save();g.globalCompositeOperation='lighter';
  const r=x.R*1.1*e+10,gr=g.createRadialGradient(x.x,x.y,0,x.x,x.y,r);gr.addColorStop(0,'rgba(255,255,255,'+(1-p)+')');gr.addColorStop(.6,'rgba(255,240,200,'+(.5*(1-p))+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.beginPath();g.arc(x.x,x.y,r,0,TAU);g.fill();
  g.strokeStyle=x.c;g.globalAlpha=1-p;g.lineWidth=18*(1-p)+2;g.beginPath();g.arc(x.x,x.y,r,0,TAU);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=5*(1-p)+1;g.beginPath();g.arc(x.x,x.y,r*.8,0,TAU);g.stroke();
  glow('#ffffff',x.x,x.y,80*(1-p)+20,1-p);g.restore()};
FXD.rdban=x=>{const p=1-x.l/x.m,a=clamp(p/.08,0,1)*clamp(x.l/.3,0,1),w=300,sl=(1-back(clamp(p/.18,0,1)))*-60;g.save();g.globalAlpha=a;g.translate(A/2,70+sl);
  g.fillStyle='rgba(10,12,18,.88)';g.fillRect(-w/2,-22,w,44);g.fillStyle=x.c;g.fillRect(-w/2,-22,6,44);g.fillRect(w/2-6,-22,6,44);g.fillRect(-w/2,20,w*Math.min(1,p*2),2);
  g.font='24px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#ffffff';g.fillText(x.txt,0,1);g.restore()};

// ================= 흉악범 • 절도범 =================
function coins(x,y,n){for(let i=0;i<n;i++){const a=rnd(0,TAU),v=rnd(80,260),l=rnd(.6,1.1);Pt.push({x,y,z:rnd(0,10),vz:rnd(200,420),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,cube:1,r:rnd(2.5,4),rot:rnd(0,TAU),vr:rnd(-12,12),col:i%3?'#ffcc33':'#ffe68a',fr:.5})}}
function thPick(o,t){const a=ang(o,t);HZ.push({k:'thpick',o,tg:t,t:0,x0:o.x,y0:o.y,a,done:0,dur:.28});SFXa('th_snatch')}
HZX.thpick=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead)return false;const u=clamp(h.t/h.dur,0,1);
  if(u<1&&e&&!e.dead){const ex=e.x+Math.cos(h.a)*(e.r+o.r+34),ey=e.y+Math.sin(h.a)*(e.r+o.r+34);o.x=clamp(h.x0+(ex-h.x0)*u,o.r,A-o.r);o.y=clamp(h.y0+(ey-h.y0)*u,o.r,A-o.r);emit(60,dt,()=>Pt.push({x:o.x,y:o.y,vx:0,vy:0,l:.25,m:.25,sh:6,col:o.d.col,r:o.r*.6,a0:.3}))}
  if(!h.done&&u>=.55&&e&&!e.dead){h.done=1;if(!e.hid&&!e.jump){hurt(e,7,o,e.x,e.y,0,0);const st=Math.min(12,e.ug||0);e.ug=(e.ug||0)-st;o.ug=Math.min(100,(o.ug||0)+st);
      ft(e.x,e.y-e.r-30,'슥!',o.d.hi,28);if(st>0)ft(e.x+20,e.y-e.r-6,'궁 -'+Math.round(st),'#ff9aa8',18);coins(e.x,e.y,8);SFXa('th_coin');FX.push({k:'wallet',x:e.x,y:e.y,o,l:.6,m:.6})}}
  if(u>=1){o.dx=Math.cos(h.a);o.dy=Math.sin(h.a);return false}return true;
};
FXD.wallet=x=>{const p=1-x.l/x.m,o=x.o,X=x.x+(o.x-x.x)*p*p,Y=x.y+(o.y-x.y)*p*p-Math.sin(p*Math.PI)*60;g.save();g.translate(X,Y);g.rotate(p*8);g.scale(1-p*.4,1-p*.4);
  g.fillStyle='#6b3d1e';g.strokeStyle='#1a0e05';g.lineWidth=2;g.fillRect(-11,-8,22,16);g.strokeRect(-11,-8,22,16);g.fillStyle='#8a5a2e';g.fillRect(-11,-8,22,6);g.fillStyle='#ffcc33';g.beginPath();g.arc(7,0,2.4,0,TAU);g.fill();g.restore()};
function thHook(o,t){HZ.push({k:'thhook',o,tg:t,t:0,x:o.x,y:o.y,st:0,done:0});SFXa('th_hook')}
HZX.thhook=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead)return false;
  if(h.st==0){const u=clamp(h.t/.32,0,1),ex=e&&!e.dead?e.x:h.x,ey=e&&!e.dead?e.y:h.y;h.x=o.x+(ex-o.x)*u;h.y=o.y+(ey-o.y)*u;
    if(u>=1){h.st=1;h.t2=h.t;if(e&&!e.dead&&!e.hid&&!e.jump){h.ok=1;hurt(e,7,o,e.x,e.y,0,0);e.cast=null;{const bs=e.d.sk.map((s2,j)=>j).filter(j=>!e.d.sk[j].ult),j=bs[Math.floor(rnd(0,bs.length))];e.cds[j]=Math.max(e.cds[j],e.d.sk[j].cd||0)}o.cds=o.cds.map((c,j)=>o.d.sk[j].ult?c:Math.max(0,c-1.5));
      ft(e.x,e.y-e.r-34,'스킬 도둑맞음!','#ff9aa8',24);SFXa('th_steal');ring(e.x,e.y,6,60,o.d.col,5,.35)}}}
  else{const u=clamp((h.t-h.t2)/.3,0,1);if(h.sx==null){h.sx=h.x;h.sy=h.y}h.x=h.sx+(o.x-h.sx)*u;h.y=h.sy+(o.y-h.sy)*u;if(u>=1)return false}
  return true;
};
HZD.thhook=h=>{const o=h.o,D=o.d;g.save();g.lineCap='round';g.strokeStyle='#2a1a0c';g.lineWidth=4;g.beginPath();g.moveTo(o.x,o.y);g.quadraticCurveTo((o.x+h.x)/2,(o.y+h.y)/2+18,h.x,h.y);g.stroke();g.strokeStyle='#c9a36a';g.lineWidth=2;g.stroke();
  const a=Math.atan2(h.y-o.y,h.x-o.x);g.translate(h.x,h.y);g.rotate(a);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,26,.5);g.restore();
  g.fillStyle=D.col;g.strokeStyle='#0b0d12';g.lineWidth=2;g.beginPath();g.ellipse(0,0,8,7,0,0,TAU);g.fill();g.stroke();
  for(let i=-2;i<=2;i++){g.save();g.rotate(i*.32*(h.st?0.4:1));g.beginPath();g.moveTo(6,0);g.lineTo(15,0);g.lineWidth=4.5;g.strokeStyle='#0b0d12';g.stroke();g.lineWidth=2.5;g.strokeStyle=D.col;g.stroke();g.restore()}
  if(h.st&&h.ok){g.rotate(-a);g.fillStyle='#ffffff';g.strokeStyle='#0b0d12';g.lineWidth=1.5;g.fillRect(-7,-18,14,10);g.strokeRect(-7,-18,14,10);g.fillStyle=D.col;g.fillRect(-4,-15,8,4)}
  g.restore()};
function thHeist(o,t){HZ.push({k:'thheist',o,t:0,n:0,won:0,dur:3.1,end:0});o.hid=1;o.heist=1;FX.push({k:'smoke6',x:o.x,y:o.y,l:.7,m:.7});SFXa('th_ult')}
HZX.thheist=(h,dt,EN)=>{
  const o=h.o;if(o.dead){o.hid=0;o.heist=0;return false}
  if(h.t<h.dur){o.hid=1;o.gcd=Math.max(o.gcd,.4);
    if(h.n<6&&h.t>=.4+h.n*.45&&EN.length){const e=EN[h.n%EN.length];h.n++;if(!e.hid&&!e.jump){const a=rnd(0,TAU);FX.push({k:'smoke6',x:e.x+Math.cos(a)*(e.r+14),y:e.y+Math.sin(a)*(e.r+14),l:.5,m:.5});FX.push({k:'slash',x:e.x,y:e.y,a:a+Math.PI/2,c:o.d.col,l:.25,m:.25});
      hurt(e,4.5,o,e.x,e.y,0,0);const hv=Math.min(1,100-o.hp);if(hv>0)o.hp+=hv;h.won+=rnd(180,420)*1000;coins(e.x,e.y,6);ft(e.x,e.y-e.r-30,'털림!','#ffcc33',24);SFXa('th_coin');FX.push({k:'wallet',x:e.x,y:e.y,o,l:.5,m:.5})}}}
  else if(!h.end){h.end=1;o.hid=0;o.heist=0;FX.push({k:'smoke6',x:o.x,y:o.y,l:.7,m:.7});coins(o.x,o.y,22);ft(o.x,o.y-o.r-40,'털었다!',o.d.hi,34);SFXa('th_cash');ring(o.x,o.y,10,120,'#ffcc33',8,.5)}
  return h.t<h.dur+1;
};
HZP.thheist=h=>{const a=Math.min(1,h.t/.3)*clamp((h.dur+1-h.t)/.4,0,1);g.save();g.globalAlpha=a;g.fillStyle='rgba(0,0,0,.6)';g.fillRect(14,14,210,46);g.strokeStyle='#ffcc33';g.lineWidth=1.5;g.strokeRect(14,14,210,46);
  g.font='12px '+FD;g.textAlign='left';g.textBaseline='middle';g.fillStyle='#9aa0ad';g.fillText('대도의 한탕 · 털어간 금액',24,28);g.font='18px '+FD;g.fillStyle='#ffcc33';g.fillText('₩ '+Math.floor(h.won).toLocaleString(),24,47);g.restore();
  if(h.t<h.dur){const o=h.o;g.save();g.globalAlpha=.18+.08*Math.sin(clock*8);g.strokeStyle=o.d.col;g.lineWidth=2;g.setLineDash([3,6]);g.beginPath();g.arc(o.x,o.y,o.r,0,TAU);g.stroke();g.restore()}};
FXD.smoke6=x=>{const p=1-x.l/x.m;g.save();for(let i=0;i<6;i++){const a=i*TAU/6+x.x,r=8+p*30;g.globalAlpha=(1-p)*.7;g.drawImage(spr('#4a5060',1),x.x+Math.cos(a)*r-22,x.y+Math.sin(a)*r-22,44,44)}g.restore()};
// 경기가 끝나면 숨어 있던 절도범을 다시 보이게
const _winTick6=winTick;winTick=function(dt){F.forEach(f=>{if(f.heist){f.hid=0;f.heist=0}});_winTick6(dt)};



// 그리기 함수가 없는 효과가 왼쪽 위 모서리에 엉뚱하게 그려지던 버그 수정
const _drawHZ6=drawHZ;drawHZ=function(h){if(HZD[h.k]){HZD[h.k](h);return}if(HZX[h.k])return;_drawHZ6(h)};

// ---------- 캐릭터 선택 화면 '+N' 배지 갱신 + 아이콘 다시 그리기 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
