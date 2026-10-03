// ===== extra4.js : 기존 스킬 퀄리티 업그레이드 (권루티비 · 트릭 카드 · 풀오토 사격 · 중거리 슛) =====

const NEW14=['kr_charge','kr_stamp'];
NEW14.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',3)});
Object.assign(SLB,{kr_charge:'권루티비 · L 모으기',kr_stamp:'권루티비 · L 도장 쾅'});

// ======================================================================
// 권루티비
// ======================================================================
// 네온 손 : 검지 + 엄지로 L
function krHand(D,s,al){g.save();g.scale(s,s);g.globalAlpha=al;
  neon(D,2.4,()=>{g.beginPath();g.moveTo(-7,24);g.lineTo(-11,6);g.lineTo(-11,-20);g.quadraticCurveTo(-11,-26,-6.5,-26);g.quadraticCurveTo(-2,-26,-2,-20);g.lineTo(-2,-3);
    g.quadraticCurveTo(2,-7,5,-3);g.quadraticCurveTo(8,-6,10,-1);g.lineTo(21,-1);g.quadraticCurveTo(26,-1,26,4);g.quadraticCurveTo(26,9,21,9);g.lineTo(9,9);g.lineTo(8,24);
    g.moveTo(-2,4);g.lineTo(5,4);g.moveTo(-1,12);g.lineTo(6,12)});
  g.restore()}
// 두꺼운 네온 L (빛나는 판)
function krL3(D,s,flip,al){g.save();g.scale(s*flip,s);g.globalAlpha=al;g.lineJoin='round';
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,46,.55);glow('#ffffff',0,0,18,.4);g.restore();
  const P=()=>{g.beginPath();g.moveTo(-13,-20);g.lineTo(-2,-20);g.lineTo(-2,5);g.lineTo(15,5);g.lineTo(15,16);g.lineTo(-13,16);g.closePath()};
  g.save();g.translate(3,4);P();g.fillStyle='rgba(0,0,0,.35)';g.fill();g.restore();
  P();const gr=g.createLinearGradient(-13,-20,15,16);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,D.hi);gr.addColorStop(1,D.col);g.fillStyle=gr;g.fill();
  g.lineWidth=3.2;g.strokeStyle=D.dk;g.stroke();g.lineWidth=1.4;g.strokeStyle='#ffffff';g.stroke();
  g.fillStyle='rgba(255,255,255,.55)';g.fillRect(-11,-18,3,30);g.restore()}

// ---------- 1) L을 가져가 ----------
krL=function(o,t){const got=(o.dlog||[]).filter(q=>clock-q[0]<4).reduce((s,q)=>s+q[1],0);o.dlog=[];const dmg=Math.round(clamp(6+got*.6,6,18)),hv=Math.round(Math.min(8,got*.35));
  const n=Math.min(12,2+Math.ceil(got/2));
  HZ.push({k:'krl',o,tg:t,t:0,dmg,hv,got,ph:0,tr:[],orbs:Array.from({length:n},(_,i)=>({a:i*TAU/n+rnd(-.3,.3),r:rnd(60,95),dl:i*.02}))});SFXa('kr_L');SFXa('kr_charge');
  ft(o.x,o.y-o.r-92,got>0?'내 L 가져가 ('+Math.round(got)+')':'L 가져가!',o.d.hi,22)};
HZX.krl=(h,dt)=>{const o=h.o;let e=h.tg;const T0=.38,T1=.78;
  if(h.ph==2)return h.t<h.dt+1.5;if(o.dead)return false;if(!e||e.dead){e=tgt(o);h.tg=e;if(!e)return false}
  const hx=o.x,hy=o.y-o.r-30;
  if(h.ph==0){h.x=hx;h.y=hy;if(h.t>=T0){h.ph=1;h.sx=hx;h.sy=hy;SFXa('kr_pass');ring(hx,hy,6,50,o.d.col,4,.3)}}
  if(h.ph==1){const u=clamp((h.t-T0)/(T1-T0),0,1),ue=u*u*(3-2*u);h.x=h.sx+(e.x-h.sx)*ue;h.y=h.sy+(e.y-e.r-6-h.sy)*ue-Math.sin(Math.PI*u)*110;
    h.tr.push([h.x,h.y]);if(h.tr.length>14)h.tr.shift();
    emit(50,dt,()=>{const l=rnd(.25,.5);Pt.push({x:h.x+rnd(-8,8),y:h.y+rnd(-8,8),vx:rnd(-40,40),vy:rnd(-40,40),l,m:l,gl:1,sh:8,col:Math.random()<.5?'#ffffff':o.d.hi,r:rnd(1.5,3),rot:rnd(0,TAU)})});
    if(u>=1){h.ph=2;h.dt=h.t;if(!e.hid&&!e.jump){hurt(e,h.dmg,o,e.x,e.y,0,h.dmg>=12);e.slow=Math.max(e.slow,1);ft(e.x,e.y-e.r-70,'L 받음 ㅋㅋ','#ffffff',24);h.st=e}
      SFXa('kr_stamp');shake=Math.max(shake,h.dmg>=12?14:9);ring(e.x,e.y-e.r-8,8,90,o.d.col,8,.4);ring(e.x,e.y-e.r-8,8,60,'#ffffff',3,.3);
      for(let i=0;i<16;i++){const a=rnd(0,TAU),v=rnd(90,260),l=rnd(.4,.8);Pt.push({x:e.x,y:e.y-e.r,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,l,m:l,sh:6,col:i%3?o.d.col:'#ffffff',r:rnd(2.5,5),gy:400,fr:.3})}
      if(h.hv>0&&!o.dead){o.hp=Math.min(100,o.hp+h.hv);ft(o.x,o.y-o.r-12,'+'+h.hv,'#7bff8a',22)}}}
  return true};
HZP.krl=h=>{const o=h.o,D=o.d,T0=.38;
  if(h.ph==0&&!o.dead){const u=clamp(h.t/.18,0,1),s=back(u);
    // 이마에 L 손 + 모여드는 L 조각들
    g.save();g.translate(o.x+o.r*.95,o.y-o.r*.4);g.rotate(-.3+Math.sin(clock*18)*.05);krHand(D,1.15*s,1);g.restore();
    h.orbs.forEach(b=>{const q=clamp((h.t-b.dl)/(T0-.05-b.dl),0,1);if(q>=1)return;const r=b.r*(1-q*q),a=b.a+q*4,x=h.x+Math.cos(a)*r,y=h.y+Math.sin(a)*r;
      g.save();g.globalCompositeOperation='lighter';glow('#ff4a5a',x,y,14,.7*(1-q*.5));glow('#ffffff',x,y,5,.9);g.restore()});
    const s2=clamp((h.t-.12)/.26,0,1);if(s2>0){g.save();g.translate(h.x,h.y);g.rotate(Math.sin(clock*10)*.1);krL3(D,(.6+Math.min(1,h.got/20)*.5)*back(s2),1,1);g.restore()}}
  if(h.ph==1){
    // 네온 꼬리
    if(h.tr.length>1){g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=1;i<h.tr.length;i++){const u=i/h.tr.length;g.strokeStyle=D.col;g.globalAlpha=u*.55;g.lineWidth=2+u*16;g.beginPath();g.moveTo(h.tr[i-1][0],h.tr[i-1][1]);g.lineTo(h.tr[i][0],h.tr[i][1]);g.stroke();g.strokeStyle='#ffffff';g.globalAlpha=u*.7;g.lineWidth=1+u*4;g.stroke()}g.restore()}
    const sp=Math.cos((h.t-T0)*22);g.save();g.translate(h.x,h.y);g.rotate(Math.sin(h.t*9)*.3);krL3(D,1+Math.min(1,h.got/20)*.5,Math.abs(sp)<.12?.12*Math.sign(sp||1):sp,1);g.restore()}
  if(h.ph==2){const e=h.st;if(!e||e.dead||e.hid)return;const q=h.t-h.dt,a=clamp((1.5-q)/.35,0,1),s=q<.12?2.2-1.2*(q/.12):1+.06*Math.sin(q*14)*Math.exp(-q*3);
    g.save();g.translate(e.x,e.y-e.r-18+Math.sin(clock*5)*1.5);g.rotate(-.12+Math.sin(clock*3)*.06);g.globalAlpha=a;
    // 도장 테두리
    g.strokeStyle=D.col;g.lineWidth=3;g.globalAlpha=a*.85;g.beginPath();g.arc(0,0,26*s,0,TAU);g.stroke();g.setLineDash([3,5]);g.lineWidth=1.5;g.beginPath();g.arc(0,0,21*s,0,TAU);g.stroke();g.setLineDash([]);
    g.font='700 7px '+FB;g.fillStyle=D.hi;g.textAlign='center';g.textBaseline='middle';for(let i=0;i<8;i++){const an=i*TAU/8+q*.6;g.save();g.rotate(an);g.translate(0,-23.5*s);g.fillText('L',0,0);g.restore()}
    krL3(D,.72*s,1,a);g.restore()}};

// ---------- 2) 측면 대 측면 : 디스코 무대 ----------
const KRC=['#5ce06a','#3f8cff','#ff5c8a','#ffd84a','#b48cff'];
HZD.krdance=h=>{const e=h.tg,o=h.o;if(!e||e.dead||o.dead||h.t>1.9)return;const D=1.7,fa=Math.min(1,h.t/.2)*clamp((1.9-h.t)/.25,0,1),bt=Math.floor(Math.max(0,h.t-.35)/.4),bp=h.t<.35?0:1-((h.t-.35)%.4)/.4;
  const cx=(h.bx+h.ox)/2,cy=(h.by+h.oy)/2,L=Math.hypot(h.bx-h.ox,h.by-h.oy)+150,W=150,ts=25;
  g.save();g.translate(cx,cy);g.rotate(h.a);g.globalAlpha=fa;
  g.fillStyle='rgba(10,8,20,.6)';g.fillRect(-L/2-6,-W/2-6,L+12,W+12);
  g.beginPath();g.rect(-L/2,-W/2,L,W);g.save();g.clip();
  for(let i=0;i*ts<L;i++)for(let j=0;j*ts<W;j++){const c=KRC[(i*2+j+bt)%KRC.length],on=((i+j+bt)%3==0);g.fillStyle=c;g.globalAlpha=fa*(on?.25+.45*bp:.08);g.fillRect(-L/2+i*ts+1.5,-W/2+j*ts+1.5,ts-3,ts-3)}
  g.restore();g.globalAlpha=fa;g.lineWidth=3;g.strokeStyle=o.d.col;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fa*.5;g.lineWidth=9;g.strokeRect(-L/2,-W/2,L,W);g.restore();g.strokeRect(-L/2,-W/2,L,W);g.restore();
  // 조명
  g.save();g.globalCompositeOperation='lighter';[[0,o],[A,e]].forEach(([sx,f],k)=>{const sw=Math.sin(clock*2.4+k*2)*30,tx=f.x+sw,ty=f.y,a0=Math.atan2(ty+20,tx-sx),gr=g.createLinearGradient(sx,-20,tx,ty);gr.addColorStop(0,'rgba(255,255,255,.0)');gr.addColorStop(1,KRC[(bt+k*2)%5]+'55');
    g.fillStyle=gr;g.globalAlpha=fa*(.6+.4*bp);g.beginPath();g.moveTo(sx,-20);g.lineTo(tx-Math.sin(a0)*55,ty+Math.cos(a0)*55);g.lineTo(tx+Math.sin(a0)*55,ty-Math.cos(a0)*55);g.closePath();g.fill();glow(KRC[(bt+k*2)%5],tx,ty+8,70,.35*fa)});g.restore()};
function krBubble(x,y,txt,col,s,al){g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha=al;g.font='700 17px '+FB;const w=g.measureText(txt).width+22;
  g.fillStyle='#ffffff';g.strokeStyle=col;g.lineWidth=3;g.lineJoin='round';g.beginPath();g.moveTo(-w/2+10,-15);g.lineTo(w/2-10,-15);g.quadraticCurveTo(w/2,-15,w/2,-5);g.lineTo(w/2,3);g.quadraticCurveTo(w/2,13,w/2-10,13);g.lineTo(6,13);g.lineTo(0,21);g.lineTo(-4,13);g.lineTo(-w/2+10,13);g.quadraticCurveTo(-w/2,13,-w/2,3);g.lineTo(-w/2,-5);g.quadraticCurveTo(-w/2,-15,-w/2+10,-15);g.fill();g.stroke();
  g.fillStyle='#14161d';g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,-1);g.restore()}
HZP.krdance=h=>{const e=h.tg,o=h.o;if(!e||e.dead||o.dead||h.t>1.7)return;const fa=Math.min(1,h.t/.2),bt=Math.floor(Math.max(0,h.t-.35)/.4),bq=h.t<.35?1:((h.t-.35)%.4)/.4;
  // 춤 리본
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(let k=0;k<2;k++){g.strokeStyle=k?'#ffffff':o.d.col;g.globalAlpha=fa*(k?.8:.45);g.lineWidth=k?2:7;g.beginPath();for(let i=0;i<=24;i++){const u=i/24,x=o.x+(e.x-o.x)*u,y=o.y+(e.y-o.y)*u,nx=-(e.y-o.y),ny=e.x-o.x,nl=Math.hypot(nx,ny)||1,w=Math.sin(u*Math.PI*3+clock*10)*10*Math.sin(u*Math.PI);i?g.lineTo(x+nx/nl*w,y+ny/nl*w):g.moveTo(x,y)}g.stroke()}g.restore();
  // 이퀄라이저
  [o,e].forEach((f,k)=>{g.save();g.translate(f.x,f.y+f.r+10);for(let i=0;i<5;i++){const hh=6+Math.abs(Math.sin(clock*12+i*1.7+k))*16*(1-bq*.5);g.fillStyle=KRC[(i+bt)%5];g.globalAlpha=fa*.9;g.fillRect(-15+i*6.5,-hh,5,hh)}g.restore()});
  // 구령 말풍선
  if(h.t>.3){const who=bt%2,f=who?e:o,txt=who?'대 측면!':'측면!',s=back(clamp(bq/.25,0,1));krBubble(f.x,f.y-f.r-38,txt,o.d.col,s,fa)}};

// ---------- 3) ULT 크리스 크로스 셀카 ----------
const _krultX=HZX.krult;HZX.krult=(h,dt,EN,t)=>{const n0=h.lines.length,r=_krultX(h,dt,EN,t);if(h.lines.length>n0){const L=h.lines[h.lines.length-1];L.de=h.tg&&h.tg.d;L.side=n0%2?1:-1}
  if(h.ph==3&&!h.tear&&h.px!=null){h.tear={t:h.t,x:h.px,y:h.py,d:h.pe&&h.pe.d}}return r};
HZD.krult=h=>{const D=h.o.d;h.lines.forEach(L=>{const q=h.t-L.t,a=clamp(1-q/.65,0,1);if(a<=0)return;const mx=(L.x1+L.x2)/2,my=(L.y1+L.y2)/2,nx=-(L.y2-L.y1),ny=L.x2-L.x1,nl=Math.hypot(nx,ny)||1,b=Math.min(90,nl*.3);
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';
  [[1,D,L.x1,L.y1,L.x2,L.y2],[-1,L.de||D,L.x2,L.y2,L.x1,L.y1]].forEach(([sd,DD,x1,y1,x2,y2])=>{const cx=mx+nx/nl*b*sd,cy=my+ny/nl*b*sd;
    [[DD.col,16*a+2,.5],['#ffffff',4*a+1,.9]].forEach(([c,w,al])=>{g.strokeStyle=c;g.globalAlpha=a*al;g.lineWidth=w;g.beginPath();g.moveTo(x1,y1);g.quadraticCurveTo(cx,cy,x2,y2);g.stroke()});
    g.globalCompositeOperation='source-over';for(let k=1;k<4;k++){const u=k/4,v=1-u,x=v*v*x1+2*v*u*cx+u*u*x2,y=v*v*y1+2*v*u*cy+u*u*y2,sz=40;g.globalAlpha=a*(.25+u*.25);g.drawImage(ICON(DD,52),x-sz/2,y-sz/2,sz,sz)}g.globalCompositeOperation='lighter'});
  g.globalAlpha=a;g.translate(mx,my);g.rotate(q*6);const s=1+q*.8;g.lineWidth=6*a+1;g.strokeStyle=D.hi;g.beginPath();g.moveTo(-20*s,-20*s);g.lineTo(20*s,20*s);g.moveTo(20*s,-20*s);g.lineTo(-20*s,20*s);g.stroke();glow(D.col,0,0,40*s,.5*a);g.restore()})};
function krPhone(D,al){g.save();g.globalAlpha=al;g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(4,40,22,6,0,0,TAU);g.fill();
  g.fillStyle='#14161d';g.strokeStyle='#5a6070';g.lineWidth=2;g.beginPath();g.roundRect?g.roundRect(-20,-36,40,72,8):g.rect(-20,-36,40,72);g.fill();g.stroke();
  const sg=g.createLinearGradient(0,-31,0,31);sg.addColorStop(0,'#2a3a4a');sg.addColorStop(1,'#0d1218');g.fillStyle=sg;g.fillRect(-17,-31,34,62);
  g.fillStyle=D.col;g.globalAlpha=al*.9;g.beginPath();g.arc(0,22,6,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=1.5;g.beginPath();g.arc(0,22,8,0,TAU);g.stroke();
  g.fillStyle='#ff3b4a';g.beginPath();g.arc(-11,-26,2,0,TAU);g.fill();g.fillStyle='#ffffff';g.font='700 6px '+FB;g.textAlign='left';g.fillText('REC',-8,-24);
  g.globalAlpha=al;g.fillStyle='#000';g.fillRect(-6,-35,12,3);g.restore()}
HZP.krult=h=>{const o=h.o,D=o.d,e=h.pe||h.tg;
  if(h.ph==1&&!o.dead&&e&&!e.dead){const u=clamp((h.t-1.45)/.2,0,1),s=back(u);
    g.save();g.translate(o.x+34,o.y-o.r-36);g.rotate(-.15+Math.sin(clock*4)*.04);g.scale(s,s);krPhone(D,1);g.restore();
    // 뷰파인더
    const q=clamp((h.t-1.45)/.45,0,1),R=120-62*(1-Math.pow(1-q,3));g.save();g.translate(e.x,e.y);g.globalAlpha=u;g.strokeStyle='#ffffff';g.lineWidth=3;g.lineCap='round';
    [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy])=>{g.beginPath();g.moveTo(sx*R,sy*R*.8);g.lineTo(sx*R,sy*(R*.8-16));g.moveTo(sx*R,sy*R*.8);g.lineTo(sx*(R-16),sy*R*.8);g.stroke()});
    g.lineWidth=1;g.globalAlpha=u*.35;g.beginPath();[-1,1].forEach(k=>{g.moveTo(k*R/3,-R*.8);g.lineTo(k*R/3,R*.8);g.moveTo(-R,k*R*.8/3);g.lineTo(R,k*R*.8/3)});g.stroke();
    g.globalAlpha=u;g.strokeStyle=q>.85?'#7bff8a':'#ffd84a';g.lineWidth=2;g.strokeRect(-e.r-6,-e.r-6,e.r*2+12,e.r*2+12);
    const cd=3-Math.floor(q*3);if(q<1){g.font='900 34px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineWidth=6;g.strokeStyle='#000';g.strokeText(cd,0,-R*.8-24);g.fillStyle='#ffffff';g.fillText(cd,0,-R*.8-24)}
    if(Math.floor(clock*4)%2){g.fillStyle='#ff3b4a';g.beginPath();g.arc(-R+10,-R*.8+12,4,0,TAU);g.fill();g.font='700 10px '+FB;g.fillStyle='#ffffff';g.textAlign='left';g.fillText('REC',-R+18,-R*.8+12)}
    g.restore()}
  // 폴라로이드
  if(h.ph==2&&h.pe&&!h.pe.dead){const p=h.pe,q=h.t-h.ft,s=back(clamp(q/.15,0,1)),dev=clamp(q/.6,0,1);g.save();g.translate(h.px,h.py+10);g.rotate(-.08);g.scale(s,s);krPolaroid(p.d,D,dev,0,0);g.restore()}
  if(h.tear){const q=h.t-h.tear.t;if(q<1.3){const a=clamp((1.3-q)/.4,0,1);[-1,1].forEach(sd=>{g.save();g.translate(h.tear.x+sd*(q*120),h.tear.y+10+q*q*260-q*60);g.rotate(-.08+sd*q*1.8);g.globalAlpha=a;
      g.beginPath();krTearPath(sd);g.clip();krPolaroid(h.tear.d,D,1,sd,1);g.restore()})}}};
function krTearPath(sd){const P=[[0,-66],[5,-50],[-4,-38],[6,-22],[-3,-8],[5,6],[-5,20],[4,34],[-3,48],[3,66]];g.moveTo(P[0][0],P[0][1]);P.forEach(([x,y])=>g.lineTo(x,y));g.lineTo(sd*90,66);g.lineTo(sd*90,-66);g.closePath()}
function krPolaroid(pd,D,dev,sd,torn){g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-52,-58,110,132);
  g.fillStyle='#fbfaf6';g.fillRect(-55,-62,110,130);g.strokeStyle='#d8d3c6';g.lineWidth=1;g.strokeRect(-55,-62,110,130);
  // 사진 칸 (현상되는 중)
  g.save();g.beginPath();g.rect(-47,-54,94,94);g.clip();g.fillStyle='rgba(28,26,30,'+(.9*dev)+')';g.fillRect(-47,-54,94,94);
  g.globalAlpha=.25*dev;g.fillStyle=D.col;g.fillRect(-47,-54,94,94);g.globalAlpha=1;
  if(pd){g.globalAlpha=.25+.75*dev;g.drawImage(ICON(pd,52),-30,-37,60,60);g.globalAlpha=1;g.fillStyle='rgba(150,100,50,.18)';g.fillRect(-47,-54,94,94)}
  g.fillStyle='rgba(255,236,190,'+(.85*(1-dev))+')';g.fillRect(-47,-54,94,94);
  // 낙서 (L 표시 · ㅋㅋ)
  if(dev>.5){const a=(dev-.5)*2;g.globalAlpha=a;g.strokeStyle=D.col;g.lineWidth=3.5;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(-10,-40);g.lineTo(-10,-22);g.lineTo(2,-22);g.stroke();
    g.font='700 14px '+FB;g.fillStyle='#ffd84a';g.textAlign='left';g.fillText('ㅋㅋ',14,-34);g.strokeStyle='#ff5c8a';g.lineWidth=2.5;g.beginPath();g.arc(-30,24,9,0,TAU);g.stroke()}
  g.restore();g.font='700 11px '+FB;g.fillStyle='#3a3a44';g.textAlign='center';g.textBaseline='middle';g.fillText('권루티비 ♥ 셀카',0,54)}
FXD.krflash=x=>{const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.95;g.fillStyle='#ffffff';g.fillRect(-300,-300,A+600,A+600);g.restore()};

// ======================================================================
// 흉악범 : 트릭 카드 (진짜 트럼프 카드처럼 뒤집히며 날아감)
// ======================================================================
const SUIT=['♥','♦','♠','♣'],RANK=['A','K','Q','J'];
BUL.card=q=>{const D=q.D;if(q.su==null){q.su=Math.floor(rnd(0,4));q.rk=Math.floor(rnd(0,4))}
  g.rotate(q.a+Math.PI/2+Math.sin(q.age*6)*.25);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.55);g.restore();
  const fl=Math.cos(q.age*20),sx=Math.max(.08,Math.abs(fl));g.scale(sx*1.15,1.15);
  g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-9,-12,20,28);
  g.beginPath();g.roundRect?g.roundRect(-10,-14,20,28,3):g.rect(-10,-14,20,28);
  if(fl>0){g.fillStyle='#fffdf8';g.fill();g.strokeStyle='#1a0a10';g.lineWidth=1.2;g.stroke();const red=q.su<2;g.fillStyle=red?'#d81b3a':'#14161d';
    g.font='700 7px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(RANK[q.rk],-6,-9);g.save();g.translate(6,9);g.rotate(Math.PI);g.fillText(RANK[q.rk],0,0);g.restore();g.font='14px '+FB;g.fillText(SUIT[q.su],0,1)}
  else{g.fillStyle='#8a0f2a';g.fill();g.strokeStyle='#ffd27a';g.lineWidth=1.4;g.stroke();g.save();g.clip();g.strokeStyle='rgba(255,210,122,.45)';g.lineWidth=1;for(let k=-28;k<28;k+=5){g.beginPath();g.moveTo(k,-14);g.lineTo(k+28,14);g.moveTo(k,14);g.lineTo(k+28,-14);g.stroke()}g.restore();g.strokeStyle='#ffd27a';g.strokeRect(-7,-11,14,22)}};
TRL.card=(q,dt)=>{emit(16,dt,()=>petalP(q.x,q.y,rnd(-30,30),rnd(-30,30)));emit(30,dt,()=>{const l=rnd(.2,.4);Pt.push({x:q.x+rnd(-4,4),y:q.y+rnd(-4,4),vx:-q.vx*.1+rnd(-20,20),vy:-q.vy*.1+rnd(-20,20),l,m:l,gl:1,sh:8,col:Math.random()<.5?'#ffd27a':'#ffffff',r:rnd(1.2,2.4),rot:rnd(0,TAU)})})};

// ======================================================================
// 김티비 : 풀오토 사격 / 레디언트 : 총알 (총구 화염 · 탄피 · 밝은 예광탄)
// ======================================================================
function gunTr(q){const hs=q.k=='hs',c=hs?'#ff4655':q.D.col;g.rotate(q.a);
  g.save();g.globalCompositeOperation='lighter';g.save();g.scale(hs?5:3.2,.55);glow(c,-8,0,14,.9);g.restore();
  const gr=g.createLinearGradient(-46,0,8,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.7,hs?'rgba(255,120,130,.9)':'rgba(255,230,170,.9)');gr.addColorStop(1,'#ffffff');
  g.strokeStyle=gr;g.lineWidth=hs?4:3;g.lineCap='round';g.beginPath();g.moveTo(-46,0);g.lineTo(8,0);g.stroke();glow('#ffffff',6,0,7,1);g.restore()}
BUL.tracer=q=>gunTr(q);BUL.hs=q=>gunTr(q);
const gunTRL=(q,dt)=>{if(!q.mz){q.mz=1;const o=q.o,a=q.a,mx=q.x,my=q.y;
    for(let i=0;i<5;i++){const aa=a+rnd(-.35,.35),v=rnd(120,320),l=rnd(.06,.12);Pt.push({x:mx,y:my,vx:Math.cos(aa)*v,vy:Math.sin(aa)*v,l,m:l,gl:1,sh:4,pal:PAL.fire,r:rnd(6,11)})}
    Pt.push({x:mx,y:my,vx:0,vy:0,l:.07,m:.07,gl:1,sh:4,col:'#ffffff',r:16});
    if(o){const pa=a+Math.PI/2*(Math.random()<.5?1:-1),v=rnd(90,160);Pt.push({x:mx-Math.cos(a)*8,y:my-Math.sin(a)*8,vx:Math.cos(pa)*v,vy:Math.sin(pa)*v-60,l:.6,m:.6,sh:2,col:'#e2b04a',r:3,rot:rnd(0,TAU),vr:rnd(-20,20),gy:420,fr:.3})}}
  if(q.k=='hs')emit(40,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.15,m:.15,gl:1,sh:4,col:'#ff4655',r:rnd(5,8)}))};
TRL.tracer=gunTRL;TRL.hs=gunTRL;

// ======================================================================
// 해버지 : 중거리 슛 (불붙은 무회전 슛)
// ======================================================================
BUL.fball=q=>{const D=q.D,a=q.a;g.save();g.rotate(a);
  g.save();g.globalCompositeOperation='lighter';g.save();g.scale(3,.8);glow('#ff8a2c',-12,0,24,.6);g.restore();glow('#fff6d0',0,0,20,.7);g.restore();
  // 불꼬리
  const fl=Math.sin(q.age*40),L=95;const gr=g.createLinearGradient(-L,0,0,0);gr.addColorStop(0,'rgba(255,60,20,0)');gr.addColorStop(.5,'rgba(255,120,30,.7)');gr.addColorStop(1,'rgba(255,240,200,.95)');
  g.fillStyle=gr;g.beginPath();g.moveTo(4,-q.r*1.05);g.quadraticCurveTo(-L*.4,-q.r*1.4-fl*3,-L,fl*4);g.quadraticCurveTo(-L*.4,q.r*1.4+fl*3,4,q.r*1.05);g.closePath();g.fill();
  g.globalCompositeOperation='lighter';g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=2;[-.5,0,.5].forEach(k=>{g.beginPath();g.moveTo(-4,k*q.r);g.lineTo(-L*.75,k*q.r*1.6+fl*3);g.stroke()});g.restore();
  g.save();g.rotate(q.age*30);socBall(q.r*1.45);g.restore()};
TRL.fball=(q,dt)=>{emit(70,dt,()=>fireP(q.x-q.vx*.02+rnd(-5,5),q.y-q.vy*.02+rnd(-5,5),-q.vx*.12+rnd(-30,30),-q.vy*.12+rnd(-30,30),rnd(7,12),rnd(.2,.38)));
  emit(14,dt,()=>smokeP(q.x,q.y,rnd(5,9),rnd(.4,.7)));emit(30,dt,()=>{const l=rnd(.15,.3);Pt.push({x:q.x,y:q.y,vx:-q.vx*.2+rnd(-30,30),vy:-q.vy*.2+rnd(-30,30),l,m:l,gl:1,sh:5,col:'#ffffff',r:1.8,fr:.1})})};
