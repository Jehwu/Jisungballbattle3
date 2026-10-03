// ===== extra14.js : 흉악범 • 테러리스트 (밀리터리) =====

const NEW24=['tr_burst','tr_sand','tr_c4','tr_beep','tr_boom','tr_heli','tr_strafe','tr_rope','tr_radio','tr_land'];
NEW24.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='tr_burst'||n=='tr_beep'||n=='tr_boom'?6:3)});
Object.assign(SLB,{tr_burst:'테러리스트 · 소총 점사',tr_sand:'테러리스트 · 모래주머니',tr_c4:'테러리스트 · C4 부착',tr_beep:'테러리스트 · C4 삑삑',tr_boom:'테러리스트 · 폭발',tr_heli:'테러리스트 · 헬기 접근',tr_strafe:'테러리스트 · 기총 소사',tr_rope:'테러리스트 · 레펠 강하',tr_radio:'테러리스트 · 무전',tr_land:'테러리스트 · 착지'});
const TRSK=[
  {n:'엄폐 사격',w:.3,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<560,f:(o,t)=>trCover(o,t)},
  {n:'C4 부착',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<480,f:(o,t)=>trC4(o,t)},
  {n:'헬기 강하',w:.6,ult:1,c:(o,t)=>!t.hid,f:(o,t)=>trHeli(o,t)}];
const TRI=DEF.findIndex(d=>d.name=='흉악범');
DEF.push({name:'흉악범 • 테러리스트',gl:'테',k:'terr',vof:TRI,r:26,sp:205,col:'#a8b44a',hi:'#eef2c8',dk:'#262a0a',alt:{col:'#c89a5a',hi:'#f6e6cc',dk:'#3a2410'},alt2:{col:'#7a8a9a',hi:'#e2e8ee',dk:'#141c24'},sk:TRSK});
INFO['흉악범 • 테러리스트']={st:[9,8,5,8,7,10],p:'방탄조끼 · 처음 세 번 맞는 공격은 피해 35% 감소 (조끼 판이 하나씩 깨짐)',
  sk:[['1.5×9','모래주머니 엄폐물을 쌓고 그 뒤에서 소총 3점사 · 엄폐물은 날아오는 공격을 막아줌'],['3 + 11','상대 몸에 C4를 붙임 · 삑삑 소리가 빨라지다가 2.5초 뒤 대폭발 · 근처 적도 휘말림'],['2×?+8','헬기가 날아와 붉은 선을 따라 기총 소사 두 번 · 이어서 상대 머리 위로 레펠 강하해 착지 충격']]};

// ---------- 패시브 : 방탄조끼 ----------
const _hurtTR=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='terr'&&o&&o!=t&&n>0){t.vest=t.vest==null?3:t.vest;if(t.vest>0){t.vest--;const a=[...arguments];a[1]=Math.round(n*.65*10)/10;spark(t.x,t.y,'dust',6,160);ft(t.x,t.y-t.r-22,'조끼 '+t.vest,'#eef2c8',16);return _hurtTR.apply(this,a)}}return _hurtTR.apply(this,arguments)};
const _lowTR=lowHP;lowHP=function(f){_lowTR(f);if(f.d.k=='terr'&&!f.dead&&!f.hid&&phase!='menu'){const v=f.vest==null?3:f.vest;g.save();g.translate(f.x-9,f.y+f.r+6);for(let i=0;i<3;i++){g.fillStyle=i<v?'#a8b44a':'#2a2a2a';g.strokeStyle='#000';g.lineWidth=1;g.fillRect(i*7,0,5,4);g.strokeRect(i*7,0,5,4)}g.restore()}};

// ---------- 그림 ----------
function trRifle(s,fl){g.save();g.scale(s,s);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-12,3,40,3);
  g.fillStyle='#6a4a28';g.beginPath();g.moveTo(-16,-2);g.lineTo(-6,-2);g.lineTo(-6,3);g.lineTo(-15,5);g.closePath();g.fill();
  g.fillStyle='#22241e';g.fillRect(-6,-3,18,5);g.fillStyle='#3a3c34';g.fillRect(-4,-4.5,10,1.5);
  g.fillStyle='#6a4a28';g.fillRect(8,-2.5,8,4);g.fillStyle='#22241e';g.fillRect(16,-1.2,12,2.4);g.fillRect(26,-2,2,4);
  g.fillStyle='#2a2c26';g.beginPath();g.moveTo(2,2);g.lineTo(6,2);g.quadraticCurveTo(7,8,3,10);g.lineTo(1,9);g.quadraticCurveTo(3,6,2,2);g.fill();
  if(fl>0){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',31,0,16*fl,.9);g.fillStyle='rgba(255,236,170,'+fl+')';g.beginPath();g.moveTo(29,0);g.lineTo(42*fl+29,-4);g.lineTo(36*fl+29,0);g.lineTo(42*fl+29,4);g.closePath();g.fill();g.restore()}g.restore()}
function trSandbag(x,y,a,hp){g.save();g.translate(x,y);g.rotate(a);for(let row=0;row<2;row++)for(let i=-2;i<=2;i++){if(row==1&&i==2)continue;const bx=i*15+(row?7.5:0),by=-row*7;g.fillStyle='rgba(0,0,0,.3)';g.beginPath();g.ellipse(bx+2,by+3,8.5,5.5,0,0,TAU);g.fill();
  const gr=g.createLinearGradient(0,by-5,0,by+5);gr.addColorStop(0,'#cdb88a');gr.addColorStop(1,'#8a7448');g.fillStyle=gr;g.strokeStyle='#4a3c22';g.lineWidth=1.2;g.beginPath();g.ellipse(bx,by,8.5,5.5,0,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(74,60,34,.5)';g.beginPath();g.moveTo(bx-4,by-4);g.lineTo(bx-4,by+4);g.stroke()}g.restore()}
function trC4Art(s,blink){g.save();g.scale(s,s);g.fillStyle='#d8cfb0';g.strokeStyle='#3a3424';g.lineWidth=1;g.fillRect(-9,-6,18,12);g.strokeRect(-9,-6,18,12);g.strokeStyle='#5a5038';g.beginPath();g.moveTo(-3,-6);g.lineTo(-3,6);g.moveTo(3,-6);g.lineTo(3,6);g.stroke();
  g.fillStyle='#1a1a1a';g.fillRect(-6,-3,8,5);g.fillStyle=blink?'#ff2020':'#5a0a0a';g.fillRect(-5,-2,3,3);if(blink){g.save();g.globalCompositeOperation='lighter';glow('#ff2020',-3.5,-.5,10,.9);g.restore()}
  g.strokeStyle='#e83030';g.lineWidth=1.2;g.beginPath();g.moveTo(5,-6);g.quadraticCurveTo(10,-12,7,-14);g.stroke();g.strokeStyle='#3060e8';g.beginPath();g.moveTo(6,-6);g.quadraticCurveTo(12,-10,10,-14);g.stroke();g.restore()}
function trHeliArt(s,rot,tilt){g.save();g.scale(s,s);g.rotate(tilt||0);
  g.fillStyle='#6a7840';g.strokeStyle='#0a0c06';g.lineWidth=2;g.beginPath();g.moveTo(-40,-3);g.lineTo(-78,-2);g.lineTo(-80,2);g.lineTo(-40,4);g.closePath();g.fill();g.stroke();
  g.fillRect(-84,-9,6,18);g.strokeRect(-84,-9,6,18);
  const bg=g.createLinearGradient(0,-16,0,16);bg.addColorStop(0,'#9aa860');bg.addColorStop(.5,'#6a7840');bg.addColorStop(1,'#3a4424');g.fillStyle=bg;g.beginPath();g.ellipse(0,0,42,17,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#8ab0c8';g.beginPath();g.ellipse(26,0,12,10,0,-1.2,1.2);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(28,-3,5,3,0,0,TAU);g.fill();
  g.fillStyle='#1a1e12';[-1,1].forEach(sd=>{g.fillRect(-20,sd*19-2,44,3);g.fillRect(-12,sd*15,3,sd*4);g.fillRect(14,sd*15,3,sd*4)});
  g.fillStyle='#2a3018';g.fillRect(-14,-17,22,5);g.fillRect(-14,12,22,5);
  // 회전 날개
  g.save();g.rotate(rot);g.fillStyle='rgba(20,24,12,.18)';g.beginPath();g.arc(0,0,74,0,TAU);g.fill();g.fillStyle='rgba(20,24,12,.85)';for(let k=0;k<4;k++){g.rotate(TAU/4);g.fillRect(0,-3,74,6)}g.restore();
  g.fillStyle='#14180a';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();g.save();g.translate(-81,0);g.rotate(rot*2);g.fillStyle='rgba(20,24,12,.7)';g.fillRect(-1,-12,2,24);g.restore();
  g.fillStyle=Math.floor(clock*4)%2?'#ff2020':'#400';g.beginPath();g.arc(-80,-9,1.8,0,TAU);g.fill();g.restore()}
function trBoom(x,y,R,o){SFXa('tr_boom');shake=Math.max(shake,R>90?20:12);FX.push({k:'burst',x,y,c:'#ffd27a',a:rnd(0,1),l:.35,m:.35});FX.push({k:'crack',x,y,r:R*.55,l:1.6,m:1.6});ring(x,y,8,R,'#ffb040',10,.4);ring(x,y,8,R*.7,'#ffffff',4,.3);
  for(let i=0;i<22;i++){const a=rnd(0,TAU),v=rnd(60,R*3);fireP(x,y,Math.cos(a)*v*.6,Math.sin(a)*v*.6,rnd(10,20),rnd(.35,.7),PAL.fire)}for(let i=0;i<10;i++)smokeP(x+rnd(-R*.4,R*.4),y+rnd(-R*.4,R*.4),rnd(14,24),rnd(.8,1.4));for(let i=0;i<10;i++)rockP(x,y,rnd(0,TAU),rnd(80,240))}

// ---------- 아이콘 (네온 방탄모 + 조준선) ----------
EMB.terr=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.04);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(-17,4);g.quadraticCurveTo(-17,-16,0,-17);g.quadraticCurveTo(17,-16,17,4);g.lineTo(21,6);g.lineTo(-21,6);g.closePath();g.moveTo(-10,-4);g.lineTo(10,-4)});
  neon({col:'#ff3030',hi:'#ffd0d0'},1.3,()=>{g.beginPath();g.arc(0,13,4.5,0,TAU);g.moveTo(-8,13);g.lineTo(-5,13);g.moveTo(5,13);g.lineTo(8,13)})};

// ---------- 1) 엄폐 사격 ----------
function trCover(o,t){const a=ang(o,t);HZ.push({k:'trcov',o,tg:t,t:0,x:o.x+Math.cos(a)*(o.r+26),y:o.y+Math.sin(a)*(o.r+26),a,ox:o.x,oy:o.y,n:0,trs:[],fl:0,blk:0});SFXa('tr_sand');o.trCov=1}
HZX.trcov=(h,dt,EN)=>{const o=h.o;if(o.dead){o.trCov=0;return false}const D=3.6;h.fl=Math.max(0,h.fl-dt);h.trs.forEach(q=>q.t+=dt);h.trs=h.trs.filter(q=>q.t<.08);
  if(h.t<D){o.x+=(h.ox-o.x)*Math.min(1,dt*10);o.y+=(h.oy-o.y)*Math.min(1,dt*10);o.gcd=Math.max(o.gcd,.3);o.cast=null;
    // 날아오는 공격 막기
    B=B.filter(q=>{if(q.o==o)return true;const dx=q.x-h.x,dy=q.y-h.y,al=dx*Math.cos(h.a)+dy*Math.sin(h.a),pe=-dx*Math.sin(h.a)+dy*Math.cos(h.a);if(Math.abs(al)<12&&Math.abs(pe)<42){h.blk++;spark(q.x,q.y,'dust',8,160);SFXa('tr_sand');return false}return true});
    let e=h.tg;if(!e||e.dead){e=tgt(o);h.tg=e}if(e)h.aim=Math.atan2(e.y-o.y,e.x-o.x);
    const bi=Math.floor((h.t-.4)/.42),sh=Math.floor(((h.t-.4)%.42)/.07);if(h.t>.4&&bi<3&&sh<3&&h.n<bi*3+sh+1){h.n++;if(sh==0)SFXa('tr_burst');h.fl=.06;if(e&&!e.dead&&!e.hid){const a=h.aim+rnd(-.05,.05),mx=o.x+Math.cos(a)*(o.r+34),my=o.y+Math.sin(a)*(o.r+34);h.trs.push({x1:mx,y1:my,x2:e.x+rnd(-5,5),y2:e.y+rnd(-5,5),t:0});
      hurt(e,1.5,o,e.x,e.y,0,0);const pa=a+Math.PI/2*(Math.random()<.5?1:-1);Pt.push({x:o.x,y:o.y,vx:Math.cos(pa)*120,vy:Math.sin(pa)*120-60,l:.6,m:.6,sh:2,col:'#e2b04a',r:2.4,rot:rnd(0,TAU),vr:rnd(-20,20),gy:420,fr:.3})}}}
  else if(!h.end){h.end=1;h.et=h.t;o.trCov=0}
  return !h.end||h.t<h.et+.4};
HZD.trcov=h=>{const fa=h.end?clamp(1-(h.t-h.et)/.4,0,1):1,s=back(clamp(h.t/.25,0,1));g.save();g.globalAlpha=fa;g.translate(h.x,h.y);g.scale(s,s);trSandbag(0,0,h.a+Math.PI/2,1);g.restore()};
HZP.trcov=h=>{const o=h.o;if(o.dead||h.end)return;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';h.trs.forEach(q=>{g.strokeStyle='rgba(255,230,160,'+(1-q.t/.08)+')';g.lineWidth=2;g.beginPath();g.moveTo(q.x1,q.y1);g.lineTo(q.x2,q.y2);g.stroke()});g.restore();
  if(h.aim!=null){g.save();g.translate(o.x+Math.cos(h.aim)*o.r*.5,o.y+Math.sin(h.aim)*o.r*.5);g.rotate(h.aim);if(Math.cos(h.aim)<0)g.scale(1,-1);trRifle(1.3,h.fl/.06);g.restore()}
  if(h.blk){g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';g.strokeText('막음 '+h.blk,h.x,h.y-24);g.fillStyle='#eef2c8';g.fillText('막음 '+h.blk,h.x,h.y-24);g.restore()}};

// ---------- 2) C4 부착 ----------
function trC4(o,t){HZ.push({k:'trc4',o,tg:t,t:0,sx:o.x,sy:o.y,ph:0,bp:0});SFXa('tr_c4')}
HZX.trc4=(h,dt,EN)=>{const o=h.o,e=h.tg;
  if(h.ph==0){const u=Math.min(1,h.t/.32);if(!e||e.dead)return false;h.x=h.sx+(e.x-h.sx)*u;h.y=h.sy+(e.y-h.sy)*u-Math.sin(u*Math.PI)*70;if(u>=1){h.ph=1;h.st=h.t;h.ox=rnd(-.5,.5);if(!e.hid&&!e.jump){hurt(e,3,o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.4);ft(e.x,e.y-e.r-40,'C4 부착!','#ff4040',22)}else return false}}
  if(h.ph==1){const q=h.t-h.st,F2=2.5;if(e&&!e.dead){h.x=e.x+Math.cos(h.ox)*e.r*.6;h.y=e.y+Math.sin(h.ox)*e.r*.6}const iv=Math.max(.08,.5-q*.17);h.bp-=dt;if(h.bp<=0){h.bp=iv;h.bl=.06;SFXa('tr_beep')}h.bl=Math.max(0,(h.bl||0)-dt);
    if(q>=F2){h.ph=2;h.et=h.t;trBoom(h.x,h.y,110,o);EN.forEach(x=>{if(x.hid||x.jump)return;const d=Math.hypot(x.x-h.x,x.y-h.y);if(d<110+x.r){hurt(x,x==e?11:6,o,x.x,x.y,0,1);const a=Math.atan2(x.y-h.y,x.x-h.x);x.flyA=a;x.flyT=.25;x.flyV=700}})}}
  return h.ph<2||h.t<h.et+.3};
HZP.trc4=h=>{if(h.ph==2)return;g.save();g.translate(h.x,h.y);if(h.ph==0)g.rotate(h.t*14);trC4Art(1.2,h.ph==1&&h.bl>0);g.restore();
  if(h.ph==1){const q=h.t-h.st,r=3-q;g.save();g.font='700 13px '+FB;g.textAlign='center';g.lineJoin='round';g.lineWidth=4;g.strokeStyle='#000';const tx=Math.max(0,2.5-q).toFixed(1);g.strokeText(tx,h.x,h.y-18);g.fillStyle='#ff4040';g.fillText(tx,h.x,h.y-18);
    g.strokeStyle='rgba(255,40,40,'+(.3+.4*Math.sin(clock*20))+')';g.lineWidth=2;g.setLineDash([5,5]);g.beginPath();g.arc(h.x,h.y,110,0,TAU);g.stroke();g.setLineDash([]);g.restore()}};

// ---------- 3) ULT 헬기 강하 ----------
function trHeli(o,t){HZ.push({k:'trheli',o,tg:t,t:0,runs:[],imp:[],ph:0,hx:-120,hy:60,rot:0});SFXa('tr_radio');SFXa('tr_heli');o.onc=1;o.hid=1;FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.4,m:.4})}
HZX.trheli=(h,dt,EN)=>{const o=h.o;if(o.dead){o.onc=0;o.hid=0;return false}o.gcd=Math.max(o.gcd,.4);o.cast=null;h.rot+=dt*30;
  const R0=.5,RL=1.15;
  // 기총 소사 두 번 (경고선 → 지나가며 땅에 총알이 줄지어 꽂힘)
  [0,1].forEach(k=>{const st=R0+k*(RL+.25);if(h.t>=st&&!h.runs[k]){const e=EN.filter(x=>!x.hid)[k%Math.max(1,EN.filter(x=>!x.hid).length)]||h.tg;const ty=e?e.y:A/2,tx=e?e.x:A/2,an=k?Math.PI/2+rnd(-.35,.35):rnd(-.35,.35);
      const L=A*.75;h.runs[k]={x1:tx-Math.cos(an)*L,y1:ty-Math.sin(an)*L,x2:tx+Math.cos(an)*L,y2:ty+Math.sin(an)*L,t0:h.t,n:0,hit:new Set()}}});
  h.runs.forEach(r=>{if(!r)return;const q=h.t-r.t0,W=.35;if(q<W)return;if(!r.snd){r.snd=1;SFXa('tr_strafe')}const u=clamp((q-W)/(RL-W),0,1);h.hx=r.x1+(r.x2-r.x1)*(u*1.1-.05);h.hy=r.y1+(r.y2-r.y1)*(u*1.1-.05);h.ha=Math.atan2(r.y2-r.y1,r.x2-r.x1);
    const want=Math.floor(u*26);while(r.n<want){r.n++;const v=r.n/26,ix=r.x1+(r.x2-r.x1)*v+rnd(-12,12),iy=r.y1+(r.y2-r.y1)*v+rnd(-12,12);h.imp.push({x:ix,y:iy,t:h.t});dustP(ix,iy,rnd(40,90));if(Math.random()<.5)spark(ix,iy,'dust',3,120);
      EN.forEach(e=>{if(r.hit.has(e)||e.hid||e.jump)return;if(segD(e.x,e.y,r.x1,r.y1,ix,iy)<e.r+18&&Math.hypot(e.x-ix,e.y-iy)<60){r.hit.add(e);hurt(e,2,o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.5)}})}
    if(u>=.6&&r.hit.size&&!r.h2){r.h2=1;r.hit.clear()}});
  h.imp=h.imp.filter(q=>h.t-q.t<.6);
  // 레펠 강하
  const D0=R0+2*(RL+.25)+.1;if(h.t>=D0&&h.ph==0){h.ph=1;h.dt=h.t;const e=EN.filter(x=>!x.hid).sort((p,q)=>p.hp-q.hp)[0]||h.tg;h.dx=e?e.x:A/2;h.dy=e?e.y:A/2;h.de=e;SFXa('tr_rope')}
  if(h.ph==1){const q=h.t-h.dt;h.hx+=(h.dx-h.hx)*Math.min(1,dt*6);h.hy+=(h.dy-60-h.hy)*Math.min(1,dt*6);h.ha=(h.ha||0)*.9;if(h.de&&!h.de.dead&&q<.5){h.dx+=(h.de.x-h.dx)*Math.min(1,dt*4);h.dy+=(h.de.y-h.dy)*Math.min(1,dt*4)}
    if(q>=.75&&!h.landed){h.landed=1;SFXa('tr_land');o.onc=0;o.hid=0;o.x=clamp(h.dx,o.r,A-o.r);o.y=clamp(h.dy,o.r,A-o.r);trBoom(o.x,o.y,95,o);EN.forEach(e=>{if(e.hid||e.jump)return;if(Math.hypot(e.x-o.x,e.y-o.y)<95+e.r){hurt(e,8,o,e.x,e.y,0,1);const a=Math.atan2(e.y-o.y,e.x-o.x);e.flyA=a;e.flyT=.22;e.flyV=650;e.stn=Math.max(e.stn,.4)}})}
    if(q>=.75){h.hx+=(-200-h.hx)*dt*1.5;h.hy+=(-150-h.hy)*dt*1.5}if(q>1.8)return false}
  if(!h.ph&&!h.runs.some(r=>r&&h.t-r.t0>=.35)){h.hx+=((A/2)-h.hx)*dt*2;h.hy+=(90-h.hy)*dt*2}
  return true};
HZD.trheli=h=>{h.runs.forEach(r=>{if(!r)return;const q=h.t-r.t0;if(q>1.2)return;const a=q<.35?(Math.floor(q*16)%2?1:.4):clamp(1-(q-.35)/.85,0,1)*.6;g.save();g.globalAlpha=a;g.strokeStyle='#ff2020';g.lineWidth=3;g.setLineDash([14,10]);g.lineDashOffset=-clock*120;g.beginPath();g.moveTo(r.x1,r.y1);g.lineTo(r.x2,r.y2);g.stroke();g.setLineDash([]);g.restore()});
  h.imp.forEach(q=>{const k=(h.t-q.t)/.6;g.save();g.globalAlpha=1-k;g.fillStyle='rgba(20,16,10,.7)';g.beginPath();g.arc(q.x,q.y,4,0,TAU);g.fill();if(k<.25){g.globalCompositeOperation='lighter';glow('#ffcf6a',q.x,q.y,14*(1-k*4),.9)}g.restore()});
  // 헬기 그림자
  g.save();g.globalAlpha=.3;g.fillStyle='#000';g.translate(h.hx+40,h.hy+70);g.rotate(h.ha||0);g.beginPath();g.ellipse(0,0,46,18,0,0,TAU);g.fill();g.fillRect(-84,-3,44,6);g.restore()};
HZP.trheli=h=>{const o=h.o;
  // 밧줄 + 강하하는 대원
  if(h.ph==1&&!h.landed){const q=h.t-h.dt,u=clamp(q/.75,0,1);g.save();g.strokeStyle='#2a2418';g.lineWidth=3;g.beginPath();g.moveTo(h.hx,h.hy);g.lineTo(h.hx,h.hy+(h.dy-h.hy)*u);g.stroke();g.strokeStyle='#8a7448';g.lineWidth=1.2;g.stroke();g.restore();
    const y=h.hy+(h.dy-h.hy)*u*u,s=1.4-.4*u;g.save();g.translate(h.hx,y);g.scale(s,s);g.drawImage(ICON(o.d,52),-o.r,-o.r,o.r*2,o.r*2);g.restore();
    g.save();g.globalAlpha=.25+.5*u;g.strokeStyle='#ff2020';g.lineWidth=2;g.beginPath();g.arc(h.dx,h.dy,30+20*(1-u),0,TAU);g.moveTo(h.dx-44,h.dy);g.lineTo(h.dx+44,h.dy);g.moveTo(h.dx,h.dy-44);g.lineTo(h.dx,h.dy+44);g.stroke();g.restore()}
  // 기총 섬광
  const strafing=h.runs.some(r=>r&&h.t-r.t0>=.35&&h.t-r.t0<1.15);
  g.save();g.globalCompositeOperation='lighter';glow('#fff6d0',h.hx+30,h.hy+90,90,.18);g.restore();
  g.save();g.translate(h.hx,h.hy);g.rotate(h.ha||0);if(strafing&&Math.floor(clock*30)%2){g.save();g.globalCompositeOperation='lighter';glow('#ffcf6a',38,16,22,.9);g.restore()}trHeliArt(1.45,h.rot,0);g.restore();
  // 회전 바람 먼지
  if(Math.random()<.5)dustP(h.hx+40+rnd(-60,60),h.hy+70+rnd(-30,30),rnd(30,80))};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
