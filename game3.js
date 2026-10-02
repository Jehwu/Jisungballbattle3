function drawLock(h){
  if(h.fired)return;const e=h.e,u=clamp(h.t/h.ch,0,1),r=110-80*u,D=h.o.d;
  g.save();g.globalAlpha=.25+.4*u;g.strokeStyle=D.col;g.lineWidth=1.5;g.setLineDash([6,8]);g.lineDashOffset=-clock*60;g.beginPath();g.moveTo(h.o.x,h.o.y);g.lineTo(e.x,e.y);g.stroke();g.restore();
  g.save();g.translate(e.x,e.y);g.rotate(u*1.5);g.strokeStyle=u>.8&&Math.sin(clock*60)>0?'#ffffff':D.col;g.lineWidth=3;g.lineCap='square';
  for(let i=0;i<4;i++){g.save();g.rotate(i*Math.PI/2);g.beginPath();g.moveTo(r,-r*.4);g.lineTo(r,-r);g.lineTo(r*.4,-r);g.stroke();g.restore()}
  g.rotate(-u*1.5);g.globalAlpha=.75;g.lineWidth=1.5;g.beginPath();g.moveTo(-r-12,0);g.lineTo(-8,0);g.moveTo(8,0);g.lineTo(r+12,0);g.moveTo(0,-r-12);g.lineTo(0,-8);g.moveTo(0,8);g.lineTo(0,r+12);g.stroke();
  g.globalAlpha=1;g.font='13px '+FD;g.fillStyle=D.col;g.textAlign='left';g.textBaseline='middle';g.fillText(u>.8?'FIRE':'LOCK',r*.45+6,-r*.75);
  g.restore();
}
function drawInk(h){
  const D=h.o.d,dr=.45,n=h.pts.length-1,k2=Math.floor(Math.min(1,h.t/dr)*n),fade=clamp((1.5-h.t)/.5,0,1),P=h.pts;
  g.save();g.lineCap='round';g.lineJoin='round';
  if(h.on){g.save();g.globalCompositeOperation='lighter';g.strokeStyle=D.col;g.globalAlpha=fade*Math.max(0,1-(h.t-dr)/.4);g.lineWidth=36;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore()}
  g.globalAlpha=fade;
  for(let i=1;i<=k2;i++){const w=6+11*Math.sin(i/n*Math.PI);g.strokeStyle='#0c0c10';g.lineWidth=w+4;g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  for(let i=1;i<=k2;i++){const w=6+11*Math.sin(i/n*Math.PI);g.strokeStyle=D.col;g.lineWidth=w*.45;g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}
  if(!h.on&&k2>0){const [x,y]=P[k2],[x0,y0]=P[k2-1],a=Math.atan2(y-y0,x-x0);g.save();g.translate(x,y);g.rotate(a+Math.PI/2);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,20,.8);g.restore();
    poly([[0,6],[8,-14],[4,-30],[-4,-30],[-8,-14]]);g.fillStyle=D.hi;g.fill();g.strokeStyle='#0c0c10';g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(0,6);g.lineTo(0,-14);g.stroke();g.restore()}
  g.restore();g.globalAlpha=1;
}
function drawToon(h){
  const p=h.t,D=h.o.d,a=Math.min(1,p/.3)*clamp((2.2-p)/.3,0,1),PN=[[[0,0],[205,0],[185,A],[0,A]],[[205,0],[405,0],[425,A],[185,A]],[[405,0],[A,0],[A,A],[425,A]]],CX=[100,305,510],TX=['쾅!','퍽!','콰아앙!!'];
  g.save();g.globalAlpha=a;g.fillStyle='rgba(255,250,235,.08)';g.fillRect(0,0,A,A);
  for(let i=0;i<3;i++){const ht=.5+i*.5;if(p<ht)continue;const q=p-ht;
    g.save();poly(PN[i]);g.clip();
    g.globalAlpha=a*Math.max(0,.35-q*.2);g.fillStyle=D.col;for(let x=0;x<A;x+=18)for(let y=0;y<A;y+=18){const d=Math.hypot(x-CX[i],y-300);g.beginPath();g.arc(x+(y/18%2)*9,y,Math.max(0,7-d/60),0,TAU);g.fill()}
    g.globalAlpha=a*Math.max(0,1-q*1.2)*.6;g.strokeStyle='#0b0b0f';g.lineWidth=2;for(let k=0;k<28;k++){const an=k*TAU/28,r0=90+((k*37)%5)*14;g.beginPath();g.moveTo(CX[i]+Math.cos(an)*r0,300+Math.sin(an)*r0);g.lineTo(CX[i]+Math.cos(an)*480,300+Math.sin(an)*480);g.stroke()}
    g.restore();
    const sc=back(clamp(q/.15,0,1))*(i==2?1.25:1);g.save();g.globalAlpha=a*clamp((1.6-q)/.3,0,1);g.translate(CX[i],300+(i-1)*-60);g.rotate(-.15+i*.12);g.scale(sc,sc);g.font=(i==2?78:84)+'px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=14;g.strokeStyle='#0b0b0f';g.strokeText(TX[i],0,0);g.fillStyle=i==2?'#ffffff':D.hi;g.fillText(TX[i],0,0);g.restore();
  }
  g.lineWidth=12;g.strokeStyle='#f5f2e8';g.beginPath();g.moveTo(205,-10);g.lineTo(185,A+10);g.moveTo(405,-10);g.lineTo(425,A+10);g.stroke();
  g.lineWidth=3;g.strokeStyle='#0b0b0f';[[-7,1],[7,1]].forEach(([o2])=>{g.beginPath();g.moveTo(205+o2,-10);g.lineTo(185+o2,A+10);g.moveTo(405+o2,-10);g.lineTo(425+o2,A+10);g.stroke()});
  g.lineWidth=8;g.strokeStyle='#0b0b0f';g.strokeRect(4,4,A-8,A-8);
  g.restore();
}
function drawChair(){
  g.lineJoin='round';g.strokeStyle='#2a1a0c';g.lineWidth=2.5;
  g.fillStyle='#5a3a1e';[[-11,-11],[11,-11],[-11,11],[11,11]].forEach(([x,y])=>g.fillRect(x-3,y-3,6,6));
  g.fillStyle='#b07a44';g.fillRect(-12,-12,24,24);g.strokeRect(-12,-12,24,24);
  g.fillStyle='#7a4e28';g.fillRect(-12,-17,24,6);g.strokeRect(-12,-17,24,6);
  g.strokeStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(-9,-5);g.lineTo(9,-5);g.moveTo(-9,2);g.lineTo(9,2);g.stroke();
}
function chatBubble(txt,col){
  const w=Math.max(34,txt.length*13+16),h2=24;
  g.fillStyle='#ffffff';g.strokeStyle=col;g.lineWidth=2.5;g.lineJoin='round';
  g.beginPath();g.moveTo(-w/2+6,-h2/2);g.lineTo(w/2-6,-h2/2);g.quadraticCurveTo(w/2,-h2/2,w/2,-h2/2+6);g.lineTo(w/2,h2/2-6);g.quadraticCurveTo(w/2,h2/2,w/2-6,h2/2);g.lineTo(-w/2+16,h2/2);g.lineTo(-w/2+6,h2/2+8);g.lineTo(-w/2+8,h2/2);g.lineTo(-w/2+6,h2/2);g.quadraticCurveTo(-w/2,h2/2,-w/2,h2/2-6);g.lineTo(-w/2,-h2/2+6);g.quadraticCurveTo(-w/2,-h2/2,-w/2+6,-h2/2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.font='700 13px '+FB;g.fillText(txt,0,1);
}
function drawWall(h){
  const D=h.o.d,pos=h.pos,M=['ㅋㅋㅋㅋㅋ','도배 ㄱㄱ','GG','??','레전드','ㄹㅇㅋㅋ','캬','방장 ㅎㅇ','와'];
  g.save();
  const gr2=h.ax?g.createLinearGradient(pos-60,0,pos+60,0):g.createLinearGradient(0,pos-60,0,pos+60);gr2.addColorStop(0,D.col+'00');gr2.addColorStop(.5,D.col+'55');gr2.addColorStop(1,D.col+'00');
  g.fillStyle=gr2;if(h.ax)g.fillRect(pos-60,0,120,A);else g.fillRect(0,pos-60,A,120);
  g.strokeStyle=D.hi;g.globalAlpha=.6;g.lineWidth=3;
  for(let q=0;q<8;q++){const al=((q*80+h.t*500)%A),bk=-h.sg*40;g.beginPath();if(h.ax){g.moveTo(pos+bk,al);g.lineTo(pos+bk*2.4,al)}else{g.moveTo(al,pos+bk);g.lineTo(al,pos+bk*2.4)}g.stroke()}
  g.globalAlpha=1;
  for(let q=0;q<10;q++){const al=q*62+((h.t*70)%62)-20,jt=Math.sin(q*2.3+h.t*6)*14;g.save();if(h.ax)g.translate(pos+jt,al);else g.translate(al,pos+jt);g.scale(.95,.95);chatBubble(M[(q*7+Math.floor(h.t*3))%M.length],D.col);g.restore()}
  g.restore();
}
function drawNana(h){
  const u=clamp(h.t/h.fl,0,1);let x=h.x,y=h.y,z=0;if(u<1){x=h.x0+(h.x-h.x0)*u;y=h.y0+(h.y-h.y0)*u;z=Math.sin(Math.PI*u)*80}
  g.save();g.globalAlpha=clamp((h.life-h.t)/.4,0,1);
  if(u>=1){g.strokeStyle='#ffd43b';g.globalAlpha*=.35+.2*Math.sin(clock*6);g.lineWidth=2;g.beginPath();g.arc(x,y,20,0,TAU);g.stroke();g.globalAlpha=clamp((h.life-h.t)/.4,0,1)}
  g.fillStyle='#0006';g.beginPath();g.ellipse(x,y+4,12,5,0,0,TAU);g.fill();
  g.translate(x,y-z);g.rotate(u<1?h.t*12:.4);g.lineJoin='round';
  for(let i=0;i<3;i++){g.save();g.rotate(i*TAU/3);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(10,-5,17,2);g.quadraticCurveTo(8,5,0,0);g.fillStyle='#ffd43b';g.fill();g.strokeStyle='#5a4300';g.lineWidth=1.6;g.stroke();g.restore()}
  g.fillStyle='#fff3b0';g.beginPath();g.arc(0,0,4,0,TAU);g.fill();g.fillStyle='#5a4300';g.fillRect(-1.5,-8,3,5);
  g.restore();
}
function drawSmoke(h){
  const fa=Math.min(1,h.t/.25)*clamp((h.dur-h.t)/.4,0,1);
  g.save();g.globalAlpha=fa*.9;
  for(let i=0;i<7;i++){const a=i*TAU/7+h.t*.4,r=i?h.r*.45:0,rr=h.r*(i?.62:.8);g.drawImage(spr('#6b7180',1),h.x+Math.cos(a)*r-rr,h.y+Math.sin(a)*r-rr,rr*2,rr*2)}
  g.globalAlpha=fa*.75;g.fillStyle='#4a4f5a';g.beginPath();g.arc(h.x,h.y,h.r*.78,0,TAU);g.fill();
  g.globalAlpha=fa*.35;g.strokeStyle=h.o.d.col;g.lineWidth=2;g.beginPath();g.arc(h.x,h.y,h.r,0,TAU);g.stroke();
  g.restore();
  if(!h.shot){const e=tgt(h.o);if(e){const u=clamp(h.t/.7,0,1);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.25+.6*u;g.strokeStyle='#ff4655';g.lineWidth=1+2*u;g.beginPath();g.moveTo(h.o.x,h.o.y);g.lineTo(e.x,e.y);g.stroke();glow('#ff4655',e.x,e.y,14+10*u,.8*u);g.restore()}}
}
function drawApe(h){
  if(h.t<0)return;const e=h.e,u=clamp(h.t/h.dur,0,1),x=h.sx+(e.x-h.sx)*u,y=h.sy+(e.y-h.sy)*u,z=Math.sin(Math.PI*u)*90,D=h.o.d,fade=u>=1?clamp(1-(h.t-h.dur)/.25,0,1):1;
  g.save();g.globalAlpha=fade;g.fillStyle='#0005';g.beginPath();g.ellipse(x,y+10,14*(1-z/200),6*(1-z/200),0,0,TAU);g.fill();
  g.translate(x,y-z);g.rotate(Math.sin(h.t*20)*.3);g.lineJoin='round';
  g.strokeStyle=D.col;g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(-12,6);g.lineTo(-23,-9);g.moveTo(12,6);g.lineTo(23,-9);g.stroke();
  g.fillStyle=D.col;g.strokeStyle='#1a0e04';g.lineWidth=2;[-1,1].forEach(sd=>{g.beginPath();g.arc(sd*15,-2,6,0,TAU);g.fill();g.stroke()});
  g.beginPath();g.arc(0,0,15,0,TAU);g.fill();g.stroke();
  g.fillStyle=D.hi;g.beginPath();g.ellipse(-4,-2,5,6,0,0,TAU);g.ellipse(4,-2,5,6,0,0,TAU);g.ellipse(0,5,8,6,0,0,TAU);g.fill();
  g.fillStyle='#1a0e04';g.beginPath();g.arc(-4,-2,1.8,0,TAU);g.arc(4,-2,1.8,0,TAU);g.fill();g.lineWidth=1.5;g.beginPath();g.arc(0,5,3,.2,Math.PI-.2);g.stroke();
  g.restore();
}
function drawGear(f){
  if(f.dead||f.hid)return;const D=f.d;
  if(f.swing){
    const S2=f.swing,u=clamp(S2.t/.34,0,1),e=1-Math.pow(1-u,2),a=S2.a-1.9+3.8*e,R2=f.r+44;
    g.save();g.translate(f.x,f.y);
    g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=D.hi;g.globalAlpha=.6*(1-u*.5);g.lineWidth=18;g.beginPath();g.arc(0,0,R2,S2.a-1.9,a);g.stroke();g.globalAlpha=1;g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();g.arc(0,0,R2+8,Math.max(S2.a-1.9,a-.8),a);g.stroke();g.restore();
    g.rotate(a);g.translate(R2,0);g.rotate(Math.PI/2);g.scale(1.6,1.6);drawChair();g.restore();
  }
  if(f.br>0&&f.bk=='gas'){g.save();g.translate(f.x,f.y);g.rotate(f.ba);g.lineJoin='round';g.fillStyle='#d63031';g.strokeStyle='#3a0b0b';g.lineWidth=2;g.fillRect(f.r-8,-8,18,16);g.strokeRect(f.r-8,-8,18,16);g.fillStyle='#2a2a2a';g.fillRect(f.r+10,-3,11,6);g.fillStyle='#ffffff';g.fillRect(f.r-4,-8,4,16);g.restore()}
}
function drawDecoy(h){
  const u=clamp(h.t/h.dur,0,1);g.save();g.translate(h.x,h.y);g.rotate(clock*3);g.globalAlpha=.85;for(let i=0;i<6;i++){g.rotate(TAU/6);g.fillStyle=i%2?'#e0245e':'#b0103a';g.beginPath();g.ellipse(14+8*u,0,9,5,0,0,TAU);g.fill()}g.restore();g.save();g.globalCompositeOperation='lighter';glow(h.o.d.col,h.x,h.y,30+40*u,.5+.4*u);g.restore();g.save();
  g.globalAlpha=.8;g.strokeStyle=h.o.d.col;g.lineWidth=2;g.setLineDash([4,4]);g.lineDashOffset=-clock*30;g.beginPath();g.arc(h.x,h.y,32,0,TAU);g.stroke();g.restore();
}
function drawGey(h){
  h.sp.forEach(q=>{if(q.done)return;const u=clamp(h.t/q.dl,0,1);g.save();g.translate(q.x,q.y);g.strokeStyle='#ff8a2c';g.globalAlpha=.5+.4*u;g.lineWidth=2.5;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,46,0,TAU);g.stroke();g.setLineDash([]);g.globalAlpha=.25*u;g.fillStyle='#ff5a1f';g.beginPath();g.arc(0,0,46*u,0,TAU);g.fill();g.restore()});
}
function drawPool(h){
  const fa=Math.min(1,h.t/.2)*clamp((h.dur-h.t)/.5,0,1);g.save();g.globalAlpha=fa;g.translate(h.x,h.y);
  g.fillStyle='#1a0602';g.beginPath();for(let i=0;i<=16;i++){const a=i*TAU/16,r=h.r*(1+.08*Math.sin(i*2.7+h.t*2));i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r*.75):g.moveTo(Math.cos(a)*r,Math.sin(a)*r*.75)}g.closePath();g.fill();
  const gr=g.createRadialGradient(0,0,4,0,0,h.r);gr.addColorStop(0,'#ffd27a');gr.addColorStop(.5,'#ff5a1f');gr.addColorStop(1,'#5a1204');g.save();g.scale(1,.75);g.fillStyle=gr;g.beginPath();g.arc(0,0,h.r*.82,0,TAU);g.fill();g.restore();
  g.strokeStyle='#ffe2a0';g.lineWidth=1.5;for(let k=0;k<6;k++){const bx=Math.cos(k*1.7)*h.r*.5,by=Math.sin(k*2.3)*h.r*.32,br=3+3*Math.abs(Math.sin(h.t*3+k));g.beginPath();g.arc(bx,by,br,0,TAU);g.stroke()}
  g.globalCompositeOperation='lighter';glow('#ff8a2c',0,0,h.r*1.1,.35*fa);g.restore();
}
function drawMaw(h){
  const t=h.t;g.save();g.translate(h.x,h.y);const u=clamp(t/.7,0,1);
  g.save();g.globalCompositeOperation='lighter';glow('#ff5a1f',0,0,70+50*u,.35+.3*u);g.restore();
  g.strokeStyle='#ffb347';g.lineWidth=3;g.lineCap='round';for(let i=0;i<10;i++){const a=i*TAU/10+.3;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a)*90*u,Math.sin(a)*60*u);g.stroke()}
  if(t>.7){const v=clamp((t-.7)/.25,0,1),sink=clamp((t-1.2)/.4,0,1);g.globalAlpha=1-sink;g.scale(1-.3*sink,1-.3*sink);
    [-1,1].forEach(sd=>{g.save();g.translate(0,sd*(70*(1-v)+8));g.lineJoin='round';
      g.beginPath();g.moveTo(-85,0);g.quadraticCurveTo(0,sd*95,85,0);g.closePath();const jg=g.createLinearGradient(0,0,0,sd*90);jg.addColorStop(0,'#3a0c04');jg.addColorStop(1,'#120302');g.fillStyle=jg;g.fill();g.strokeStyle='#ff5a1f';g.lineWidth=3;g.stroke();
      g.fillStyle='#ffd27a';for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*22-8,0);g.lineTo(k*22,-sd*16);g.lineTo(k*22+8,0);g.closePath();g.fill()}
      g.restore()})}
  g.restore();
}
function drawLeap(f){
  if(!f.lp||f.dead)return;const L=f.lp,D=f.d;if(L.t<.35)return;
  const u=clamp((L.t-.35)/1.15,0,1);g.save();g.translate(f.x,f.y);g.globalAlpha=.35+.4*u;g.fillStyle='#000';g.beginPath();g.ellipse(0,f.r*.4,f.r*(.5+.9*u),f.r*.45*(.5+.9*u),0,0,TAU);g.fill();
  g.strokeStyle=D.col;g.lineWidth=3;g.setLineDash([10,8]);g.lineDashOffset=-clock*60;g.globalAlpha=.8;g.beginPath();g.arc(0,0,105,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.15+.2*u;g.fillStyle=D.col;g.beginPath();g.arc(0,0,105*u,0,TAU);g.fill();g.restore();
  if(L.t>=1.25){const v=clamp((L.t-1.25)/.25,0,1),yy=f.y-(1-v*v)*520,sz=f.r*3.2;g.save();g.globalCompositeOperation='lighter';glow('#ff8a2c',f.x,yy,f.r*3,.9);g.restore();g.drawImage(ICON(D,84),f.x-sz/2,yy-sz/2,sz,sz)}
}
function drawHZ(h){
  if(h.k=='gey'){drawGey(h);return}
  if(h.k=='pool'){drawPool(h);return}
  if(h.k=='maw'){drawMaw(h);return}
  if(h.k=='decoy'){drawDecoy(h);return}
  if(h.k=='smoke')return;
  if(h.k=='wall'){drawWall(h);return}
  if(h.k=='nana'){drawNana(h);return}
  if(h.k=='ape'){drawApe(h);return}
  if(h.k=='toon')return;
  if(h.k=='lock'){drawLock(h);return}
  if(h.k=='ink'){drawInk(h);return}
  if(h.k=='kb'){drawKB(h);return}
  if(h.k=='brick'){drawBrick(h);return}
  if(h.k=='blaster'){drawBlaster(h);return}
  if(h.k=='quake'){drawQuake(h);return}
  if(h.k=='floor'){drawFloor(h);return}
  if(h.k=='dragon'){drawDragon(h);return}
  const D=h.o.d;
  if(h.k=='nova'){
    const rr=h.t*620;
    g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
    g.fillStyle=D.hi+'26';g.beginPath();g.arc(h.x,h.y,rr,0,TAU);g.fill();
    g.lineWidth=16;g.strokeStyle=D.hi;g.beginPath();g.arc(h.x,h.y,rr,0,TAU);g.stroke();
    g.lineWidth=7;g.strokeStyle=D.col;g.beginPath();g.arc(h.x,h.y,Math.max(1,rr-14),0,TAU);g.stroke();
    g.fillStyle=D.hi;
    for(let i=0;i<56;i++){const a=i*TAU/56,hh=14+12*Math.abs(Math.sin(i*2.7));g.save();g.translate(h.x+Math.cos(a)*(rr+8),h.y+Math.sin(a)*(rr+8));g.rotate(a);g.beginPath();g.moveTo(hh,0);g.lineTo(0,-7);g.lineTo(0,7);g.closePath();g.fill();g.restore()}
    g.restore();return;
  }
  const p=h.t/h.dl;
  g.save();g.translate(h.x,h.y);
  g.fillStyle=D.col+'33';g.beginPath();g.arc(0,0,h.r,0,TAU);g.fill();
  g.strokeStyle=D.hi;g.lineWidth=3;g.setLineDash([12,8]);g.lineDashOffset=-clock*50;g.beginPath();g.arc(0,0,h.r,0,TAU);g.stroke();g.setLineDash([]);
  g.fillStyle=D.col+'88';g.beginPath();g.arc(0,0,h.r*p,0,TAU);g.fill();
  g.restore();
  if(h.v)return;const q=p*p,fl=Math.sin(h.t*40);
  g.save();g.translate(h.x+(1-q)*180,h.y-(1-q)*480);g.rotate(Math.atan2(480,-180));
  g.save();g.globalCompositeOperation='lighter';glow('#ff6a1c',0,0,70,.7);glow('#ffd36b',0,0,34,.9);g.restore();
  g.fillStyle=D.dk;flame(2.6,fl);g.fillStyle=D.col;flame(2.2,-fl);g.fillStyle=D.hi;flame(1.5,fl);g.fillStyle='#fff3c4';flame(.8,-fl);
  poly([[16,0],[9,-11],[-3,-13],[-12,-5],[-10,8],[2,13],[12,9]]);g.fillStyle='#2a1a14';g.fill();g.lineWidth=3;g.strokeStyle='#120a08';g.stroke();
  g.strokeStyle='#ffb347';g.lineWidth=2;g.beginPath();g.moveTo(-6,-6);g.lineTo(2,0);g.lineTo(-2,7);g.moveTo(2,0);g.lineTo(10,-3);g.stroke();
  g.restore();
}
function intro(){
  const p=clamp((4.4-tm)/1.4,0,1),e=1-Math.pow(1-Math.min(1,p*2.2),3),out=clamp((p-.86)/.14,0,1),n=F.length,cw=A/n,sl=70,m=(1-e)+out;
  F.forEach((f,i)=>{
    const D=f.d,tx=cw*(i+.5),mid=n==3&&i==1;
    g.save();g.translate(mid?0:(i<n/2?-1:1)*m*A*1.1,mid?-m*A:0);
    const x0=i*cw,x1=(i+1)*cw;
    g.beginPath();g.moveTo(i?x0+sl/2:-300,110);g.lineTo(i<n-1?x1+sl/2:A+300,110);g.lineTo(i<n-1?x1-sl/2:A+300,A-110);g.lineTo(i?x0-sl/2:-300,A-110);g.closePath();
    const pg=g.createLinearGradient(0,110,0,A-110);pg.addColorStop(0,D.col);pg.addColorStop(1,D.dk);g.fillStyle=pg;g.fill();g.lineWidth=6;g.strokeStyle='#07080c';g.stroke();
    g.save();g.clip();g.globalAlpha=.12;g.fillStyle='#ffffff';g.font='900 '+Math.round(cw*1.3)+'px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillText(D.gl,tx,A*.5);
    g.globalAlpha=.08;for(let q=0;q<10;q++){const x=((q*70+p*240+800)%(A+160))-80;g.beginPath();g.moveTo(x,110);g.lineTo(x+24,110);g.lineTo(x-30,A-110);g.lineTo(x-54,A-110);g.fill()}
    g.restore();
    const isz=n==3?96:120;g.drawImage(ICON(D,isz),tx-isz/2,A*.5-isz-30,isz,isz);
    g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=10;g.strokeStyle='#07080c';
    g.font=(n==3?34:52)+'px '+FD;g.strokeText(D.name,tx,A*.5+18);g.fillStyle='#fff';g.fillText(D.name,tx,A*.5+18);
    g.font=(n==3?12:15)+'px '+FD;g.lineWidth=5;g.strokeText('ULT · '+D.sk[2].n,tx,A*.5+56);g.fillStyle=D.hi;g.fillText('ULT · '+D.sk[2].n,tx,A*.5+56);
    g.restore();
  });
  if(p>.5){
    const q=clamp((p-.5)/.2,0,1);
    g.save();g.translate(A/2,A/2+(n==3?150:0));g.rotate(-.12);const sc=3.2-2.2*back(q);g.scale(sc,sc);g.globalAlpha=clamp(q*3,0,1)*(1-out);
    g.font='92px '+FD;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';
    g.lineWidth=16;g.strokeStyle='#07080c';g.strokeText('VS',0,0);g.fillStyle='#ffcf3f';g.fillText('VS',0,0);
    g.restore();
  }
}
function rnameEn(r){const n=TOUR.N>>r;return n==2?'GRAND FINAL':n==4?'SEMIFINAL':n==8?'QUARTERFINAL':'ROUND OF 16'}
function rname(r){const n=TOUR.N>>r;return n==2?'결승':n==4?'4강':n+'강'}
function tourIntro(){
  const T0=TM0-tm,len=TM0-3,p=clamp(T0/len,0,1),fin=TOURM.final,e1=1-Math.pow(1-clamp(T0/.6,0,1),3),out=clamp((p-.9)/.1,0,1);
  g.save();g.fillStyle='rgba(4,3,2,'+(.88*Math.min(1,T0*3)*(1-out))+')';g.fillRect(-300,-300,A+600,A+600);
  if(fin){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const a=Math.sin(clock*.8+i)*.5;g.globalAlpha=.09*(1-out);g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(A*(.1+i*.2),-100);g.lineTo(A/2+Math.sin(a)*320-70,A+60);g.lineTo(A/2+Math.sin(a)*320+70,A+60);g.closePath();g.fill()}g.restore()}
  g.globalAlpha=clamp(T0*2,0,1)*(1-out);g.textAlign='center';g.textBaseline='middle';
  const ty=A*.15;g.font='700 '+(fin?46:28)+'px Cinzel,serif';g.fillStyle=goldG(ty-26,ty+26);g.fillText(rnameEn(TOURM.r),A/2,ty);
  g.font='15px '+FD;g.fillStyle='#b8954a';g.fillText(rname(TOURM.r)+(fin?'':' · '+(TOURM.m+1)+'경기'),A/2,ty+(fin?38:28));
  g.strokeStyle='#d4af37';g.lineWidth=1.5;g.beginPath();g.moveTo(A/2-190*e1,ty+(fin?56:46));g.lineTo(A/2+190*e1,ty+(fin?56:46));g.stroke();
  [[F[0],-1],[F[1],1]].forEach(([f,sd])=>{const D=f.d,cx=A/2+sd*150+sd*(1-e1)*420+sd*out*420,cy=A*.56;g.save();g.translate(cx,cy);
    poly([[-105,-130],[105,-130],[105,110],[85,130],[-105,130]]);const cg=g.createLinearGradient(0,-130,0,130);cg.addColorStop(0,'#17120a');cg.addColorStop(1,'#060504');g.fillStyle=cg;g.fill();g.strokeStyle=goldG(-130,130);g.lineWidth=2.5;g.stroke();
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-30,110,.35);g.restore();
    g.drawImage(ICON(D,130),-65,-112,130,130);
    g.font='24px '+FD;g.fillStyle='#ffffff';g.fillText(D.name,0,48);g.font='12px '+FD;g.fillStyle='#d4af37';g.fillText('ULT · '+D.sk[2].n,0,80);
    g.restore()});
  if(T0>.5){const q=back(clamp((T0-.5)/.3,0,1));g.save();g.translate(A/2,A*.56);g.scale(q,q);g.font='700 '+(fin?64:52)+'px Cinzel,serif';g.fillStyle='#000';g.fillText('VS',3,4);g.fillStyle=goldG(-32,32);g.fillText('VS',0,0);g.restore()}
  g.restore();
}
function tourCount(){
  const n=Math.ceil(tm),u=n-tm,fin=TOURM.final,e=1-Math.pow(1-clamp(u*4,0,1),3);
  g.save();g.fillStyle='#000';g.fillRect(-300,-300,A+600,342);g.fillRect(-300,A-42,A+600,342);g.fillStyle='#d4af37';g.fillRect(0,42,A,1.5);g.fillRect(0,A-43.5,A,1.5);
  g.font='12px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#b8954a';g.fillText(rnameEn(TOURM.r)+'   ·   '+F[0].d.name+'  vs  '+F[1].d.name,A/2,21);
  g.translate(A/2,A/2);
  if(fin){g.save();g.globalCompositeOperation='lighter';glow('#f2c94c',0,0,260,.25*(1-u));g.restore()}
  g.strokeStyle='#2a200a';g.lineWidth=10;g.beginPath();g.arc(0,0,130,0,TAU);g.stroke();
  g.strokeStyle=goldG(-130,130);g.lineWidth=6;g.beginPath();g.arc(0,0,130,-Math.PI/2,-Math.PI/2+TAU*(1-u));g.stroke();
  for(let i=0;i<60;i++){g.save();g.rotate(i*TAU/60+clock*.15);g.fillStyle=i%5?'#5a4614':'#d4af37';g.fillRect(-1,-152,2,i%5?6:12);g.restore()}
  if(fin){g.save();g.rotate(-clock*.3);g.strokeStyle='rgba(212,175,55,.45)';g.lineWidth=1.5;g.setLineDash([3,9]);g.beginPath();g.arc(0,0,175,0,TAU);g.stroke();g.restore()}
  const sc=(1+(1-e)*.8)*(fin?1.15:1);g.globalAlpha=1-clamp((u-.85)/.15,0,1);g.scale(sc,sc);
  g.font='700 150px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(n,6,8);g.fillStyle=goldG(-70,70);g.fillText(n,0,0);
  g.restore();
}
function count(){
  const n=Math.ceil(tm),u=n-tm,c=['#fff','#ff5a4a','#ffd24a','#f2f4f8'][n]||'#fff',e=1-Math.pow(1-clamp(u*4,0,1),3);
  g.save();g.translate(A/2,A/2);g.strokeStyle=c;g.lineCap='round';
  g.lineWidth=10;g.globalAlpha=.9;g.beginPath();g.arc(0,0,130,-Math.PI/2,-Math.PI/2+TAU*(1-u));g.stroke();
  g.lineWidth=4;g.globalAlpha=(1-u)*.8;g.beginPath();g.arc(0,0,80+u*320,0,TAU);g.stroke();
  g.fillStyle=c;
  for(let i=0;i<12;i++){g.save();g.rotate(i*TAU/12+u*2);g.globalAlpha=1-u;g.fillRect(150+u*50,-3,22,6);g.restore()}
  g.restore();
  big(n,1-clamp((u-.82)/.18,0,1),(1+(1-e)*1.4)*(1+u*.12),c);
}
function fightTxt(){
  const e=.9-fight,q=back(clamp(e*5,0,1)),a=clamp(fight*4,0,1);
  g.save();g.globalAlpha=a*.9;g.fillStyle='#ffd24a';
  g.fillRect(-300,A/2-86*(1-e*.6),A+600,6);g.fillRect(-300,A/2+80*(1-e*.6),A+600,6);
  g.restore();
  big('FIGHT!',a,1.7-.7*q,'#ffd24a');
}
function banner(){
  if(bn&&bn.ult){ultTitle();return}
  if(!bn)return;
  const w=220,h=40,y=36,inT=Math.min(1,bn.t/.22),out=bn.t>1.2?(bn.t-1.2)/.3:0;
  const sl=(1-(1-Math.pow(1-inT,3)))+out;
  const x0=bn.side?A-w+sl*w:-sl*w;
  g.save();
  g.beginPath();g.moveTo(x0+16,y);g.lineTo(x0+w,y);g.lineTo(x0+w-16,y+h);g.lineTo(x0,y+h);g.closePath();
  g.fillStyle=bn.d.col;g.fill();g.lineWidth=4;g.strokeStyle='#0b0d12';g.stroke();
  g.fillStyle=bn.d.hi;g.fillRect(x0+(bn.side?10:0),y+h+3,w-10,4);
  g.font='24px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineWidth=5;g.strokeStyle='#0b0d12';g.strokeText(bn.txt,x0+w/2,y+h/2+1);g.fillStyle='#fff';g.fillText(bn.txt,x0+w/2,y+h/2+1);
  g.restore();
}

function big(txt,alpha,sc,col){
  g.save();g.globalAlpha=alpha;g.translate(A/2,A/2);g.transform(1,0,-.18,1,0,0);g.scale(sc,sc);
  g.font='130px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineJoin='round';g.lineWidth=16;g.strokeStyle='#0b0d12';g.strokeText(txt,0,0);g.fillStyle=col;g.fillText(txt,0,0);
  g.restore();
}

function draw(){
  g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
  if(phase=='menu'){drawMenu();return}
  if(phase=='tour'||phase=='champ'){drawTourBG();return}
  const sx=(Math.random()-.5)*shake,sy=(Math.random()-.5)*shake;
  g.save();g.translate(ox+sx,oy+sy);g.scale(k,k);g.beginPath();g.rect(-16,-16,A+32,A+32);g.clip();
  if(zk>.01){const zz=1+.07*zk;g.translate(zx,zy);g.scale(zz,zz);g.translate(-zx,-zy)}
  g.save();g.translate(A/2,A/2);g.scale(cz,cz);g.translate(-(A/2+(cfx-A/2)*(cz-1)/.3*.5),-(A/2+(cfy-A/2)*(cz-1)/.3*.5));
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
  g.drawImage(floor(),0,0,A,A);
  if(TOURM){g.fillStyle='rgba(8,6,2,.45)';g.fillRect(0,0,A,A);g.strokeStyle='rgba(212,175,55,.3)';g.lineWidth=2;g.beginPath();g.arc(A/2,A/2,92,0,TAU);g.stroke();g.font='700 20px Cinzel,serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='rgba(212,175,55,.2)';g.fillText(TOURM.final?'GRAND FINAL':'JS CHAMPIONS',A/2,A/2)}
  g.restore();

  AM.forEach(m=>{g.globalAlpha=.1+.08*Math.sin(clock*2+m.p);g.fillStyle=F[m.c].d.hi;g.beginPath();g.arc(m.x,m.y,m.r,0,TAU);g.fill()});g.globalAlpha=1;
  FX.forEach(x=>GROUND(x.k)&&drawFX(x));
  if(cine>.02){g.fillStyle='rgba(6,8,14,'+.6*cine+')';g.fillRect(-300,-300,A+600,A+600)}
  if(phase!='cd'||tm<2.3){g.save();g.globalCompositeOperation='lighter';F.forEach(f=>{if(!f.dead)glow(f.d.col,f.x,f.y+6,f.r*4.2,.28)});B.forEach(q=>glow(q.D.col,q.x,q.y,60,.22));g.restore();g.globalAlpha=1}
  F.forEach(f=>{if(f.jump){const j=f.jump,u=Math.min(1,j.t/j.dur);g.save();g.translate(j.tx,j.ty);g.strokeStyle=f.d.col;g.globalAlpha=.5+.4*u;g.lineWidth=4;g.setLineDash([12,8]);g.lineDashOffset=-clock*60;g.beginPath();g.arc(0,0,95,0,TAU);g.stroke();g.setLineDash([]);g.fillStyle=f.d.col+'33';g.beginPath();g.arc(0,0,95*u,0,TAU);g.fill();g.restore()}});g.globalAlpha=1;
  HZ.forEach(drawHZ);B.forEach(bullet);
  F.forEach(f=>ball(f,tgt(f)||f));F.forEach(frozen);F.forEach(drawGulp);F.forEach(drawGear);F.forEach(drawLeap);
  FX.forEach(x=>!GROUND(x.k)&&drawFX(x));
  drawParticles();
  HZ.forEach(h=>{if(h.k=='smoke')drawSmoke(h)});
  HZ.forEach(h=>{if(h.k=='toon')drawToon(h)});
  if(TSTOP)drawStop();
  if(MAD)drawMad();
  T.forEach(x=>{
    const pp=1+.7*Math.max(0,(x.l-.85)/.15);
    g.save();g.translate(x.x,x.y);g.scale(pp,pp);g.globalAlpha=Math.min(1,x.l*1.6);
    g.font=`${x.size}px ${FD}`;g.textAlign='center';
    g.lineWidth=5;g.lineJoin='round';g.strokeStyle='#0b0d12';g.strokeText(x.txt,0,0);
    g.fillStyle=x.col;g.fillText(x.txt,0,0);g.restore();
  });
  banner();

  if(phase=='cd'){if(TOURM){tm>3?tourIntro():tourCount()}else{tm>3?intro():count()}}
  else if(fight>0)fightTxt();
  if(phase=='end'&&endT>.1&&endT<1.9)big('K.O.',clamp((1.9-endT)*3,0,1),.4+.9*back(clamp((endT-.1)/.3,0,1)),'#ff5a4a');

  g.restore();
  const vg=g.createRadialGradient(A/2,A/2,A*.35,A/2,A/2,A*.78);vg.addColorStop(0,'#0000');vg.addColorStop(1,'#000a');g.fillStyle=vg;g.fillRect(0,0,A,A);
  if(cine>.02){g.fillStyle='#0b0d12';const bh=44*cine;g.fillRect(0,0,A,bh);g.fillRect(0,A-bh,A,bh)}
  g.lineWidth=14;g.strokeStyle=TOURM?'#2a200a':'#454b5a';g.strokeRect(-7,-7,A+14,A+14);
  g.lineWidth=3;g.strokeStyle=TOURM?'#d4af37':'#7b8294';g.strokeRect(-1,-1,A+2,A+2);
  g.fillStyle=TOURM?'#f2c94c':'#9aa1b3';
  [[-7,-7],[A+7,-7],[-7,A+7],[A+7,A+7]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,6,0,TAU);g.fill();g.strokeStyle='#12151c';g.lineWidth=2;g.stroke()});
  g.restore();
}

function drawGulp(f){
  const G=f.gulp;if(!G||f.dead)return;const tg=G.tg,a=ang(f,tg);
  if(G.st==0){
    const op=Math.min(1,G.t/.25),R=f.r*1.65,o=1.05*op;
    g.save();g.translate(f.x,f.y);g.rotate(a);
    g.save();g.globalCompositeOperation='lighter';glow(f.d.col,f.r,0,100,.45*op);g.restore();
    g.fillStyle='#2a0716';g.beginPath();g.moveTo(0,0);g.arc(0,0,R,-o,o);g.closePath();g.fill();g.lineWidth=4;g.strokeStyle=f.d.dk;g.stroke();
    g.fillStyle='#ffffff';for(const sd of[-1,1])for(let i=0;i<4;i++){g.save();g.rotate(sd*o*(1-i/4.5));g.beginPath();g.moveTo(R,-4);g.lineTo(R-10,0);g.lineTo(R,4);g.fill();g.restore()}
    g.fillStyle='#ff5f8f';g.beginPath();g.ellipse(R*.55,0,R*.35,R*.17,0,0,TAU);g.fill();
    g.restore();
  }else{
    g.save();g.globalAlpha=.55;g.fillStyle=tg.d.col;g.beginPath();g.arc(f.x+Math.cos(clock*7)*f.r*.55,f.y+Math.sin(clock*7)*f.r*.4,tg.r*.45,0,TAU);g.fill();g.restore();
  }
}
function drawP(p){
  const q=Math.max(0,p.l/p.m),a=(p.a0||1)*Math.min(1,q*1.5);
  if(p.sh==4){const pal=p.pal,c=pal?pal[Math.min(pal.length-1,Math.floor((1-q)*pal.length))]:p.col;g.globalAlpha=a;g.drawImage(spr(c),p.x-p.r,p.y-p.r,p.r*2,p.r*2);return}
  if(p.sh==3){g.globalAlpha=a;g.drawImage(spr(p.col,1),p.x-p.r,p.y-p.r,p.r*2,p.r*2);return}
  if(p.sh==5){g.globalAlpha=a;g.strokeStyle=p.col;g.lineWidth=p.r;g.lineCap='round';g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-p.vx*.035,p.y-p.vy*.035);g.stroke();return}
  if(p.sh==10){
    g.globalAlpha=Math.min(1,q*3);g.fillStyle='#00000055';g.beginPath();g.ellipse(p.x,p.y+2,p.r,p.r*.5,0,0,TAU);g.fill();
    g.save();g.translate(p.x,p.y-p.z);g.rotate(p.rot);const r=p.r;
    if(p.cube)poly([[-r,-r],[r,-r],[r,r],[-r,r]]);else poly([[r,0],[r*.3,-r*.9],[-r*.8,-r*.5],[-r*.7,r*.6],[r*.2,r*.8]]);g.fillStyle=p.col;g.fill();g.strokeStyle='#0b0d12';g.lineWidth=1.5;g.stroke();
    poly([[r,0],[r*.3,-r*.9],[-r*.2,-r*.2]]);g.fillStyle='#ffffff26';g.fill();g.restore();return;
  }
  if(p.sh==7){g.save();g.translate(p.x,p.y);g.rotate((p.rot||0)*.2);g.scale(p.r/10,p.r/10);g.globalAlpha=a;heartPath();g.fillStyle=p.col;g.fill();g.restore();return}
  if(p.sh==8){g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=a;g.fillStyle=p.col;const r=p.r;g.beginPath();g.moveTo(0,-r*2);g.quadraticCurveTo(0,0,r*2,0);g.quadraticCurveTo(0,0,0,r*2);g.quadraticCurveTo(0,0,-r*2,0);g.quadraticCurveTo(0,0,0,-r*2);g.fill();g.restore();return}
  if(p.sh==9){g.globalAlpha=a;g.font=Math.round(p.r)+'px '+FB;g.textAlign='center';g.textBaseline='middle';g.fillStyle=p.col;g.fillText(p.txt,p.x,p.y);return}
  if(p.sh==13){g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=a;g.fillStyle=p.col;g.beginPath();g.ellipse(0,0,p.r,p.r*.55,0,0,TAU);g.fill();g.fillStyle='rgba(0,0,0,.18)';g.beginPath();g.ellipse(p.r*.3,0,p.r*.5,p.r*.25,0,0,TAU);g.fill();g.restore();return}
  if(p.sh==12){g.globalAlpha=a;g.fillStyle=p.col;const r=p.r;g.fillRect(p.x-r/3,p.y-r,r*2/3,r*2);g.fillRect(p.x-r,p.y-r/3,r*2,r*2/3);return}
  if(p.sh==6){g.globalAlpha=a;g.fillStyle=p.col;g.beginPath();g.arc(p.x,p.y,p.r,0,TAU);g.fill();return}
  g.save();g.translate(p.x,p.y);g.rotate(p.rot||0);g.globalAlpha=q;g.fillStyle=p.col;
  if(p.sh==1){g.beginPath();g.moveTo(p.r*1.8,0);g.lineTo(-p.r*.6,-p.r*.8);g.lineTo(-p.r,0);g.lineTo(-p.r*.6,p.r*.8);g.closePath();g.fill();g.strokeStyle='#ffffffaa';g.lineWidth=1;g.beginPath();g.moveTo(p.r*1.8,0);g.lineTo(-p.r*.6,-p.r*.8);g.stroke()}
  else if(p.sh==2)g.fillRect(-p.r/2,-p.r/2,p.r,p.r);
  else{g.beginPath();g.arc(0,0,p.r*Math.max(.3,q),0,TAU);g.fill()}
  g.restore();
}
function drawParticles(){
  for(const p of Pt)if(!p.gl)drawP(p);
  g.save();g.globalCompositeOperation='lighter';for(const p of Pt)if(p.gl)drawP(p);g.restore();
  g.globalAlpha=1;
}
function drawTourBG(){
  g.fillStyle='#060504';g.fillRect(0,0,W,H);
  g.save();g.globalCompositeOperation='lighter';glow('#d4af37',W/2,-H*.1,Math.max(W,H)*.85,.16);
  for(let i=0;i<4;i++){const a=Math.sin(clock*.4+i*1.7)*.35,x0=W*(.15+i*.23);g.globalAlpha=.045;g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(x0,-20);g.lineTo(x0+Math.sin(a)*H-90,H);g.lineTo(x0+Math.sin(a)*H+90,H);g.closePath();g.fill()}
  g.restore();
  if(MP.length<60)MP.push({x:rnd(0,W),y:H+10,v:rnd(10,40),r:rnd(.8,2.2),ph:rnd(0,TAU)});
  g.fillStyle='#f2c94c';MP=MP.filter(q=>{q.y-=q.v*LDT;q.x+=Math.sin(clock+q.ph)*.3;g.globalAlpha=Math.max(0,.3+.3*Math.sin(clock*3+q.ph));g.beginPath();g.arc(q.x,q.y,q.r,0,TAU);g.fill();return q.y>-10});g.globalAlpha=1;
  if(phase=='champ')drawChamp();
  const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.7)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
function drawChamp(){
  const c=TOUR&&TOUR.rounds[TOUR.r][0];if(!c)return;const s=Math.min(W,H*.8)*.36,cx=W/2,cy=H*.36;
  g.save();g.translate(cx,cy);g.rotate(clock*.15);g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){g.rotate(TAU/16);g.globalAlpha=.06;g.fillStyle='#ffe9a3';g.beginPath();g.moveTo(0,0);g.lineTo(Math.max(W,H),-60);g.lineTo(Math.max(W,H),60);g.closePath();g.fill()}g.restore();
  g.save();g.translate(cx,cy);const gg=goldG(-s,s*.9);g.lineJoin='round';g.lineCap='round';
  [-1,1].forEach(sd=>{g.beginPath();g.moveTo(sd*s*.5,-s*.66);g.bezierCurveTo(sd*s*1.02,-s*.72,sd*s*1.02,-s*.12,sd*s*.3,-s*.02);g.lineWidth=s*.11;g.strokeStyle='#5a4210';g.stroke();g.lineWidth=s*.075;g.strokeStyle=gg;g.stroke()});
  g.fillStyle=gg;g.strokeStyle='#5a4210';g.lineWidth=3;
  g.beginPath();g.moveTo(-s*.62,-s*.75);g.lineTo(s*.62,-s*.75);g.quadraticCurveTo(s*.6,s*.05,0,s*.18);g.quadraticCurveTo(-s*.6,s*.05,-s*.62,-s*.75);g.closePath();g.fill();g.stroke();
  g.beginPath();g.ellipse(0,-s*.75,s*.62,s*.07,0,0,TAU);g.fillStyle='#8a6a1c';g.fill();g.stroke();
  g.fillStyle=gg;g.fillRect(-s*.08,s*.15,s*.16,s*.32);g.fillRect(-s*.32,s*.47,s*.64,s*.1);g.fillRect(-s*.42,s*.57,s*.84,s*.14);g.strokeStyle='#5a4210';g.lineWidth=2;g.strokeRect(-s*.42,s*.57,s*.84,s*.14);
  g.globalAlpha=.35;g.fillStyle='#ffffff';g.beginPath();g.ellipse(-s*.3,-s*.4,s*.06,s*.28,.15,0,TAU);g.fill();g.globalAlpha=1;
  const isz=s*.62;g.drawImage(ICON(DEF[c.c],Math.round(isz)),-isz/2,-s*.7,isz,isz);
  g.restore();
  if(CF.length<120)CF.push({x:rnd(0,W),y:-10,vy:rnd(40,110),vx:rnd(-20,20),r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-6,6),c:['#f2c94c','#ffe9a3','#ffffff','#b8860b'][Math.floor(rnd(0,4))]});
  CF=CF.filter(q=>{q.y+=q.vy*LDT;q.x+=q.vx*LDT+Math.sin(clock*2+q.rot)*.4;q.rot+=q.vr*LDT;g.save();g.translate(q.x,q.y);g.rotate(q.rot);g.fillStyle=q.c;g.fillRect(-q.r/2,-q.r,q.r,q.r*2);g.restore();return q.y<H+20});
}
function drawMenu(){
  g.fillStyle='#07080c';g.fillRect(0,0,W,H);
  const n=F.length;g.save();g.globalCompositeOperation='lighter';
  F.forEach((f,i)=>glow(f.d.col,W*(n==3?[.1,.5,.9][i]:[.08,.92][i]),H*.32,Math.max(W,H)*.5,.17));g.restore();
  const hz=H*.62;g.save();g.strokeStyle='#ffcf3f';g.lineWidth=1;
  for(let i=-14;i<=14;i++){g.globalAlpha=.07;g.beginPath();g.moveTo(W/2+i*16,hz);g.lineTo(W/2+i*W*.2,H);g.stroke()}
  const sp=(clock*.35)%1;for(let j=0;j<12;j++){const u=(j+sp)/12,y=hz+(H-hz)*u*u;g.globalAlpha=.12*u+.015;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.restore();
  g.save();g.globalCompositeOperation='lighter';const hg=g.createLinearGradient(0,hz-50,0,hz+6);hg.addColorStop(0,'rgba(255,207,63,0)');hg.addColorStop(1,'rgba(255,207,63,.16)');g.fillStyle=hg;g.fillRect(0,hz-50,W,56);
  for(let i=0;i<4;i++){const x=((clock*40+i*W*.37)%(W*1.6))-W*.3;g.globalAlpha=.03;g.fillStyle='#fff';g.beginPath();g.moveTo(x,0);g.lineTo(x+60,0);g.lineTo(x-140,H);g.lineTo(x-200,H);g.fill()}
  g.restore();
  if(MP.length<26)MP.push({x:rnd(0,W),y:H+20,v:rnd(15,45),r:rnd(1,2.2),ph:rnd(0,TAU)});
  g.fillStyle='#ffffff';MP=MP.filter(q=>{q.y-=q.v*LDT;q.x+=Math.sin(clock+q.ph)*.3;g.globalAlpha=.2;g.beginPath();g.arc(q.x,q.y,q.r,0,TAU);g.fill();return q.y>-10});
  g.globalAlpha=1;const vg=g.createRadialGradient(W/2,H/2,Math.min(W,H)*.3,W/2,H/2,Math.max(W,H)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.65)');g.fillStyle=vg;g.fillRect(0,0,W,H);
}
function loop(t){
  const dt=Math.min(.033,(t-last)/1000||0);last=t;LDT=dt;
  if(!PAUSE)update(dt);draw();requestAnimationFrame(loop);
}
function paintMenu(){
  [0,1,2].forEach(sd=>{
    const d=pickD(sd),el=document.querySelector('.slot[data-s="'+sd+'"]');if(!el)return;
    el.classList.toggle('on',ACT==sd);el.style.setProperty('--c',d.col);el.style.setProperty('--h',d.hi);
    el.querySelector('b').textContent=d.name;paintIc(el.querySelector('.ic'),d,60);
    el.querySelector('ul').innerHTML=d.sk.map(k=>`<li class="${k.ult?'u':''}">${k.ult?'ULT · ':''}${k.n}</li>`).join('');
  });
  document.querySelectorAll('.tile').forEach(t=>{const i=+t.dataset.i;[0,1,2].forEach(q=>t.classList.toggle('p'+(q+1),q<MODE&&baseOf(SEL[q])==i));t.classList.toggle('act',baseOf(SEL[ACT])==i)});
  {const cur=MENU_T?(fillT(),TSEL[ACT]):SEL[ACT],vs=VARS(cur);
    $('#vrow').innerHTML=vs.length>1?vs.map(v=>`<button data-v="${v}" class="${v==cur?'on':''}" style="--h:${DEF[v].hi}">${v==baseOf(cur)?'기본':(DEF[v].name.split('•')[1]||DEF[v].name).trim()}</button>`).join(''):'';
    document.querySelectorAll('#vrow button').forEach(b=>b.addEventListener('click',()=>{SFX('click');const v=+b.dataset.v;if(MENU_T){TSEL[ACT]=v;paintMenu()}else{SEL[ACT]=v;initMenu()}}))}
  $('#hint').textContent=MENU_T?'SLOT '+(ACT+1)+' 선택 중':'P'+(ACT+1)+' 선택 중';
  if(MENU_T){fillT();$('#tslots').innerHTML=TSEL.slice(0,TSIZE).map((c,i)=>`<button class="ts${i==ACT?' on':''}" data-t="${i}"><canvas data-c="${c}"></canvas><i>${i+1}</i></button>`).join('');
    document.querySelectorAll('.ts').forEach(b=>{paintIc(b.querySelector('canvas'),DEF[+b.querySelector('canvas').dataset.c],26);b.addEventListener('click',()=>{SFX('click');ACT=+b.dataset.t;paintMenu()})});
    document.querySelectorAll('.tile').forEach(t=>{t.classList.toggle('act',baseOf(TSEL[ACT])==+t.dataset.i);[1,2,3].forEach(q=>t.classList.remove('p'+q))})}
}
function initMenu(){TOURM=null;if(MENU_T)MODE=2;init();phase='menu';tm=0;document.body.classList.add('m');const M=$('#menu');scr('menu');$('#demo').classList.remove('on');M.classList.toggle('m3',MODE==3&&!MENU_T);M.classList.toggle('mt',!!MENU_T);$('#msg').className='';$('#bracket').classList.remove('on');$('#champ').classList.remove('on');paintMenu()}
function scr(id){if(id!='set'&&PREVB){PREVB=0}['hub','modes','dict','dinfo','set'].forEach(x=>$('#'+x).classList.toggle('on',x==id));$('#menu').classList.toggle('on',id=='menu')}
function goHome(){TOURM=null;DEMO=null;init();phase='menu';tm=0;document.body.classList.add('m');$('#msg').className='';$('#bracket').classList.remove('on');$('#champ').classList.remove('on');$('#demo').classList.remove('on');scr('hub')}
function drawHex(el,st,D){
  el.width=440;el.height=400;const c=el.getContext('2d');c.setTransform(2,0,0,2,0,0);c.clearRect(0,0,220,200);const cx=110,cy=102,R=68,L=['공격','생존','속도','사거리','범위','궁극기'];
  for(let k=1;k<=5;k++){c.beginPath();for(let i=0;i<6;i++){const a=-Math.PI/2+i*TAU/6,r=R*k/5;i?c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}c.closePath();c.strokeStyle=k==5?'#3a3f4c':'#22262f';c.lineWidth=1;c.stroke()}
  for(let i=0;i<6;i++){const a=-Math.PI/2+i*TAU/6;c.strokeStyle='#22262f';c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);c.stroke();c.fillStyle='#aab1c3';c.font='700 11px "Noto Sans KR",sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(L[i]+' '+st[i],cx+Math.cos(a)*(R+24),cy+Math.sin(a)*(R+14))}
  c.beginPath();st.forEach((v,i)=>{const a=-Math.PI/2+i*TAU/6,r=R*v/10;i?c.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):c.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)});c.closePath();c.fillStyle=D.col+'59';c.fill();c.strokeStyle=D.hi;c.lineWidth=2;c.stroke();
  st.forEach((v,i)=>{const a=-Math.PI/2+i*TAU/6,r=R*v/10;c.fillStyle=D.hi;c.beginPath();c.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2.6,0,TAU);c.fill()});
}
function mkDict(){
  $('#dgrid').innerHTML=DEF.map((d,i)=>`<button class="tile" data-d="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b></button>`).join('');
  document.querySelectorAll('#dgrid .tile').forEach(t=>{paintIc(t.querySelector('.ic'),DEF[+t.dataset.d],50);t.addEventListener('click',()=>{audioOn();SFX('click');openInfo(+t.dataset.d)})});
}
function openInfo(i){
  DI=i;const d=DEF[i],I=INFO[d.name]||{st:[5,5,5,5,5,5],sk:[]};$('#dname').textContent=d.name;paintIc($('#dic'),d,104);drawHex($('#dhex'),I.st,d);
  $('#dsk').innerHTML=(I.p?`<div class="dsk np"><i>P</i><div><b>패시브</b><small>${I.p}</small></div><em></em></div>`:'')+d.sk.map((s,j)=>`<button class="dsk${s.ult?' u':''}" data-j="${j}"><i>${s.ult?'ULT':j+1}</i><div><b>${s.n}</b><small>${(I.sk[j]||[])[1]||''}</small></div><em>${(I.sk[j]||[])[0]||''} DMG<br>${s.ult?'게이지':s.cd+'s'}</em></button>`).join('');
  document.querySelectorAll('#dsk button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');startDemo(DI,+b.dataset.j)}));scr('dinfo');
}
function startDemo(i,j){
  DEMO={i,j,t:0,next:.6};MODE=2;SEL=[i,0,SEL[2]||0];init();
  const dm=F[1];dm.d={name:'허수아비',gl:'허',k:'dummy',r:26,sp:110,col:'#8a8f9c',hi:'#d5d9e2',dk:'#2a2d36',sk:DEF[0].sk};dm.r=26;dm.sp=110;dm.dummy=1;
  F[0].x=170;F[0].y=300;dm.x=430;dm.y=300;phase='demo';tm=0;fight=0;document.body.classList.add('m');scr('none');$('#demo').classList.add('on');
  const s=DEF[i].sk[j];$('#demot').textContent=DEF[i].name+(s.ult?' · ULT':' · SKILL '+(j+1));$('#demon').textContent=s.n;$('#demod').textContent=((INFO[DEF[i].name]||{sk:[]}).sk[j]||[])[1]||'';
}
function demoTick(dt){
  const D2=DEMO,f=F[0],dm=F[1];D2.t+=dt;F.forEach(x=>{x.ug=0;x.dead=0;if(x.hp<45)x.hp=100});dm.gcd=99;dm.cast=null;dm.lp=null;
  const busy=f.cast||TSTOP||MAD||f.gulp||f.jump||f.lp||f.rush>0||f.swing||f.auto>0;
  if(!f.cast)f.gcd=99;
  if(D2.t>=D2.next&&!busy){const s=f.d.sk[D2.j];f.cast={j:D2.j,t:0,s};bn={txt:s.n,d:f.d,side:0,t:0,ult:s.ult};SFX(s.ult?'ult':'cast');D2.next=D2.t+(s.ult?7.5:3.8)}
}
function endDemo(){DEMO=null;TSTOP=null;MAD=null;$('#demo').classList.remove('on');init();HZ=[];B=[];phase='menu';document.body.classList.add('m');scr('dinfo')}
function fillT(){while(TSEL.length<16)TSEL.push(Math.floor(Math.random()*DEF.length))}
function startTour(){
  fillT();const N=TSIZE,tot={},seen={},ent=TSEL.slice(0,N).map((c,i)=>({c,id:i}));ent.forEach(e=>tot[e.c]=(tot[e.c]||0)+1);
  ent.forEach(e=>{seen[e.c]=(seen[e.c]||0)+1;e.lab=DEF[e.c].name+(tot[e.c]>1?' '+String.fromCharCode(64+seen[e.c]):'')});
  const rounds=[ent];for(let n=N/2;n>=1;n/=2)rounds.push(Array(n).fill(null));TOUR={N,rounds,r:0,m:0};showBracket();
}
function showBracket(){
  phase='tour';TOURM=null;MP=[];document.body.classList.add('m');$('#menu').classList.remove('on');$('#msg').className='';$('#champ').classList.remove('on');$('#bracket').classList.add('on');
  const R=TOUR.rounds.length-1;$('#brounds').innerHTML=TOUR.rounds.slice(0,R).map((_,r)=>`<span class="${r==TOUR.r?'on':r<TOUR.r?'done':''}">${rname(r)}</span>`).join('');
  const cur=TOUR.rounds[TOUR.r],nx=TOUR.rounds[TOUR.r+1],fin=cur.length==2;$('#bsub').textContent=fin?'GRAND FINAL':rnameEn(TOUR.r)+' · MATCH '+(TOUR.m+1);
  let h='';for(let m=0;m<cur.length/2;m++){const a=cur[2*m],b=cur[2*m+1],w=nx[m];h+=`<div class="bm${m==TOUR.m?' cur':''}"><span class="no">${m+1}</span><div class="be${w?(w==a?' win':' lose'):''}"><canvas data-c="${a.c}"></canvas><b>${a.lab}</b></div><span class="v">VS</span><div class="be r${w?(w==b?' win':' lose'):''}"><canvas data-c="${b.c}"></canvas><b>${b.lab}</b></div></div>`}
  $('#bmatches').innerHTML=h;document.querySelectorAll('#bmatches canvas').forEach(c=>paintIc(c,DEF[+c.dataset.c],30));
  $('#bnext').textContent=fin?'GRAND FINAL':'NEXT MATCH';const el=document.querySelector('.bm.cur');if(el&&el.scrollIntoView)el.scrollIntoView({block:'center'});
}
function startMatch(){
  const cur=TOUR.rounds[TOUR.r],a=cur[2*TOUR.m],b=cur[2*TOUR.m+1],fin=cur.length==2;
  TOURM={a,b,final:fin,r:TOUR.r,m:TOUR.m};MODE=2;SEL=[a.c,b.c,SEL[2]||0];
  $('#bracket').classList.remove('on');document.body.classList.remove('m');
  init();F[0].d=Object.assign({},F[0].d,{name:a.lab});F[1].d=Object.assign({},F[1].d,{name:b.lab});buildHUD();TM0=fin?6.4:5.2;tm=TM0;
}
function showChamp(){phase='champ';TOURM=null;CF=[];MP=[];$('#msg').className='';document.body.classList.add('m');$('#champ').classList.add('on');$('#cname').textContent=TOUR.rounds[TOUR.r][0].lab;SFX('ko')}
function mkMenu(){
  $('#grid').innerHTML=DEF.map((d,i)=>{if(d.vof!=null)return '';const vc=DEF.filter(x=>x.vof===i).length;return `<button class="tile" data-i="${i}" style="--c:${d.col};--h:${d.hi}"><canvas class="ic"></canvas><b>${d.name}</b><em class="b1">P1</em><em class="b2">P2</em><em class="b3">P3</em>${vc?'<em class="vb">+'+vc+'</em>':''}</button>`}).join('');
  document.querySelectorAll('.tile').forEach(t=>{paintIc(t.querySelector('.ic'),DEF[+t.dataset.i],50);t.addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL[ACT]=+t.dataset.i;ACT=(ACT+1)%TSIZE;paintMenu();return}SEL[ACT]=+t.dataset.i;ACT=(ACT+1)%MODE;initMenu()})});
  document.querySelectorAll('#tsize button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');TSIZE=+b.dataset.t;document.querySelectorAll('#tsize button').forEach(x=>x.classList.toggle('on',x==b));if(ACT>=TSIZE)ACT=0;paintMenu()}));
  document.querySelectorAll('.slot').forEach(sl=>sl.addEventListener('click',()=>{audioOn();SFX('click');ACT=+sl.dataset.s;paintMenu()}));
  document.querySelectorAll('#mode button').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');MENU_T=b.dataset.m=='T'?1:0;MODE=MENU_T?2:+b.dataset.m;ACT=0;document.querySelectorAll('#mode button').forEach(x=>x.classList.toggle('on',x==b));if(ACT>=MODE)ACT=0;initMenu()}));
}
$('#start').addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){startTour();return}document.body.classList.remove('m');$('#menu').classList.remove('on');init()});
$('#rand').addEventListener('click',()=>{audioOn();SFX('click');if(MENU_T){TSEL=TSEL.map(()=>Math.floor(Math.random()*DEF.length));paintMenu();return}SEL=SEL.map(()=>Math.floor(Math.random()*DEF.length));initMenu()});
$('#go').addEventListener('click',()=>{SFX('click');init()});
addEventListener('pointerdown',audioOn);
$('#snd').addEventListener('click',()=>{audioOn();MUTE^=1;$('#snd').textContent=MUTE?'🔇':'🔊';if(MUTE)stopBGM();else playBGM(BGMn||'bgm_menu',1)});
$('#home').addEventListener('click',initMenu);
const inMatch=()=>phase=='cd'||phase=='play'||phase=='end';
$('#bexit').addEventListener('click',()=>{if(!inMatch())return;audioOn();SFX('click');PAUSE=1;$('#cfms').textContent=TOURM?'이 경기는 무효가 되고 대진표로 돌아가요':'메인 메뉴로 돌아가요';$('#cfm').classList.add('on')});
$('#cno').addEventListener('click',()=>{SFX('click');PAUSE=0;$('#cfm').classList.remove('on')});
$('#cyes').addEventListener('click',()=>{SFX('click');PAUSE=0;$('#cfm').classList.remove('on');TSTOP=null;MAD=null;if(TOURM&&TOUR){TOURM=null;showBracket()}else initMenu()});
$('#bskip').addEventListener('click',()=>{if(!inMatch()||shown)return;audioOn();SKIP=1;let n=0;try{while(!shown&&n<60000){update(.016);n++}}finally{SKIP=0}Pt=[];FX=[];T=[];B=[];HZ=[];TSTOP=null;MAD=null;SFX('ko')});
$('#tnext').addEventListener('click',()=>{audioOn();SFX('click');if(TOUR.rounds[TOUR.r].length==1)showChamp();else showBracket()});
$('#bnext').addEventListener('click',()=>{audioOn();SFX('click');startMatch()});
$('#bquit').addEventListener('click',()=>{SFX('click');TOUR=null;goHome()});
$('#cmenu').addEventListener('click',()=>{SFX('click');TOUR=null;goHome()});
$('#cagain').addEventListener('click',()=>{audioOn();SFX('click');startTour()});
$('#hplay').addEventListener('click',()=>{audioOn();SFX('click');scr('modes')});
$('#hdict').addEventListener('click',()=>{audioOn();SFX('click');scr('dict')});
$('#hset').addEventListener('click',()=>{audioOn();SFX('click');mkSet();scr('set')});
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',()=>{SFX('click');const t2=b.dataset.b;if(t2=='home')goHome();else scr(t2)}));
document.querySelectorAll('.mc').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');const m=b.dataset.m;MENU_T=m=='T'?1:0;MODE=MENU_T?2:+m;ACT=0;$('#mtitle').textContent=MENU_T?'토너먼트 · 참가자 선택':m=='3'?'3인 난투 · 캐릭터 선택':'1대1 · 캐릭터 선택';initMenu()}));
$('#dclose').addEventListener('click',()=>{SFX('click');endDemo()});
mkMenu();mkDict();goHome();loadSnd();
requestAnimationFrame(t=>{last=t;loop(t)});

// ===== 설정: 사운드별 볼륨 =====
const SLB={m:'전체 볼륨',b:'배경음악 전체',s:'효과음 전체',bgm_menu:'메인 화면 음악',bgm_battle:'전투 음악',bgm_tour:'토너먼트 전투 음악',bgm_final:'결승 · 우승 음악',
gun:'총 (풀오토 · 헤드샷 · 매드무비)',throw:'던지기 (카드 · 바나나)',arrow:'가은 화살',skillshot:'병은 Q 스킬샷',knife:'지성 칼',slash:'흉악범 뒤잡기',swing:'가은 의자',beam:'블래스터 · 레일건',
floor1:'7단 콤보 1타',floor2:'7단 콤보 2타',floor3:'7단 콤보 3타',floor4:'7단 콤보 4타',floor5:'7단 콤보 5타',floor6:'7단 콤보 6타',floor7:'7단 콤보 7타 (막타)',
tstop:'지성 시간 정지',hit:'맞는 소리 (보통)',tick:'맞는 소리 (약)',heavy:'맞는 소리 (강)',cast:'스킬 시전',ult:'궁극기 발동',cd:'카운트다운',go:'FIGHT',vs:'VS (시작할 때)',ko:'KO',
slam:'민채 쿵',gulp:'민채 꿀꺽',chew:'민채 씹기',spit:'민채 뱉기',rush:'병은 스탠드 러시',click:'버튼 클릭'};
function setRow(k,isG){const v=isG?VOL[k]:pv(k);const d=document.createElement('div');d.className='vrow';
d.innerHTML='<div class="vl"><b>'+SLB[k]+'</b>'+(isG?'':'<small>'+k+'.mp3</small>')+'</div><input type="range" min="0" max="100" step="1" value="'+Math.round(v*100)+'"><span class="vp">'+Math.round(v*100)+'%</span>'+(isG?'':'<button class="vplay">▶</button>');
const r=d.querySelector('input'),p=d.querySelector('.vp');
r.addEventListener('input',()=>{const x=r.value/100;p.textContent=r.value+'%';if(isG)VOL[k]=x;else VOL.p[k]=x;saveVol()});
if(!isG)d.querySelector('.vplay').addEventListener('click',()=>{audioOn();if(isB(k)){if(PREVB==k){PREVB=0;playBGM('bgm_menu',1)}else{PREVB=k;playBGM(k,1)}}else{SL[k]=0;SFX(k)}});
return d}
function mkSet(){const g2=$('#sgrid');g2.innerHTML='';const H=t=>{const h=document.createElement('div');h.className='vh';h.textContent=t;g2.appendChild(h)};
H('전체');['m','b','s'].forEach(k=>g2.appendChild(setRow(k,1)));
H('배경음악');['bgm_menu','bgm_battle','bgm_tour','bgm_final'].forEach(k=>g2.appendChild(setRow(k)));
H('효과음');SND.forEach(k=>g2.appendChild(setRow(k)));
const rb=document.createElement('button');rb.className='vreset';rb.textContent='기본값으로 되돌리기';rb.addEventListener('click',()=>{VOL={m:1,b:1,s:1,p:{}};saveVol();mkSet()});g2.appendChild(rb)}
