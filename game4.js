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
