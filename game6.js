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
