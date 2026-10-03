// ===== extra.js : 박지성 • 박르노 박바나 =====
// CIN : 연출 중에는 주인공 말고 전부 멈춤 (core1 step에서 처리)

// ---------- 공통 : 위치 기록 + 레퀴엠 각성 체크 + 연출 진행 ----------
const _updGE=update;update=function(dt){
  if(F&&(phase=='play'||phase=='demo'))F.forEach(f=>{if(f.dead)return;f.hist=f.hist||[];f.hist.push([f.x,f.y]);if(f.hist.length>100)f.hist.shift();
    if(f.d.k=='ge'&&!f.req&&f.hp<=40&&phase=='play'&&!CIN&&!TSTOP&&!MAD)geAwaken(f)});
  const co=CIN&&CIN.o,cs=co&&co.cds.slice(),cu=co&&co.ug;_updGE(dt);if(co&&CIN&&CIN.o==co&&co.cds.length==cs.length){co.cds=cs;co.ug=cu}
  if(CIN&&F)F.forEach(f=>{if(f!=CIN.o&&f.flash>0)f.flash-=dt});
  if(CIN){if(phase!='play'&&phase!='demo'||CIN.o.dead||!F||F.indexOf(CIN.o)<0){CIN=null}else{CIN.t+=dt;if(CIN.tick(dt)===false)CIN=null}}};
const _bannerGE=banner;banner=function(){if(CIN&&CIN.draw)CIN.draw();_bannerGE()};
const _initGE=init;init=function(){CIN=null;SLOW=0;return _initGE.apply(this,arguments)};
const _winGE=winTick;winTick=function(dt){CIN=null;_winGE(dt)};
function subtitle(txt,a){g.save();g.globalAlpha=a;g.font='700 26px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=7;g.strokeStyle='#000';g.strokeText(txt,A/2,A-46);g.fillStyle='#ffffff';g.fillText(txt,A/2,A-46);g.restore()}

// ---------- 등록 ----------
const NEW11=['ge_life','ge_snake','ge_punch','ge_muda','ge_tree','ge_root','ge_arrow','ge_crack','ge_req','ge_rewind','ge_cosmos','ge_launch','ge_rushv','ge_reqv','ge_shell'];
NEW11.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='ge_punch'?8:3)});
Object.assign(SLB,{ge_life:'박르노 · 생명 부여',ge_snake:'박르노 · 뱀 물기',ge_punch:'박르노 · 러쉬 주먹',ge_muda:'박르노 · 무다아 (막타)',ge_tree:'박르노 · 그랜드 트리',ge_root:'박르노 · 뿌리 폭발',ge_arrow:'박르노 · 화살 꽂힘',ge_crack:'박르노 · 껍질 균열',ge_req:'박르노 · 레퀴엠 변신',ge_rewind:'박르노 · 되감기',ge_cosmos:'박르노 · "골드 E 레퀴엠"',ge_launch:'박르노 · 날려버리기',ge_rushv:'박르노 · 무다무다 (러쉬)',ge_reqv:'박르노 · "이것이 레퀴엠이다"',ge_shell:'박르노 · 껍질 깨짐'});
// 영상에서 잘라낸 소리 (gev1~3.js) : sounds 폴더에 같은 이름 mp3가 있으면 그걸 우선
function geClipUse(){if(!window.GECLIP)return;Object.keys(GECLIP).forEach(n=>{const p=AUD[n];if(p&&p.geClip)return;if(p&&p.ok&&p.pool&&p.pool[0].src.indexOf('/sounds/')>=0)return;const sp=new SoundPool(GECLIP[n],n=='ge_rushv'?3:2);sp.geClip=1;AUD[n]=sp})}
setTimeout(geClipUse,1000);setTimeout(geClipUse,3000);
function sfxStop(n){const p=AUD[n];if(p&&p.pool)p.pool.forEach(a=>{try{a.pause()}catch(e){}})}
const GESK=[
  {n:'생명 부여',w:.5,cd:7,c:(o,t)=>!t.hid,f:(o,t)=>geLife(o,t)},
  {n:'무다무다 러쉬',w:.4,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<340,f:(o,t)=>geRush(o,t,0)},
  {n:'그랜드 트리',w:1.8,ult:1,f:(o,t)=>geTree(o,t)}];
const GERSK=[
  {n:'레퀴엠 러쉬',w:.3,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<380,f:(o,t)=>geRush(o,t,1)},
  {n:'되감기',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump&&t.hist&&t.hist.length>30,f:(o,t)=>geRewind(o,t)},
  {n:'끝나지 않는 죽음',w:1.4,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>geUlt(o,t)}];
DEF.push({name:'박지성 • 박르노 박바나',gl:'르',k:'ge',vof:2,r:26,sp:210,col:'#ffcc33',hi:'#fff4c2',dk:'#4a3300',alt:{col:'#5cd6ff',hi:'#ddf6ff',dk:'#063a4a'},alt2:{col:'#ff6fa8',hi:'#ffdfeb',dk:'#4a0f2a'},sk:GESK});
INFO['박지성 • 박르노 박바나']={st:[8,6,7,7,8,10],p:'체력 40 이하가 되면 스탠드의 화살이 꽂혀 레퀴엠으로 각성 (한 번) · 각성 중 무적 · 궁 게이지 30% · 스킬이 전부 레퀴엠 스킬로 바뀜',
  sk:[['4×3','돌멩이에 생명을 넣어 황금 뱀 3마리로 · 쫓아가서 물고 둔화'],['1.3×10+6','황금 주먹 연타 · 막타에 날아가며 생명 과부하로 느려짐'],['4×3+회복','거대한 생명의 나무가 자라나 뿌리가 적에게 뻗어 세 번 폭발 · 묶음 · 체력 5 회복']]};
const GERINFO=[['1×12+7','우주빛 집중선 속 레퀴엠 주먹 폭풍 · 막타에 벽까지 날려버림'],['6','상대를 지나온 길을 따라 거꾸로 되감음 · 그동안의 일이 없던 일이 되어 모든 쿨타임 +3초 · 궁 게이지 -15'],['4+0.6×16+7','시간이 멈춘 우주 속에서 상대를 되감은 뒤 무다 러쉬 · 하늘 끝까지 날려버림']];

// ---------- 아이콘 ----------
EMB.ge=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*3)*.05);
  neon(D,1.8,()=>{g.beginPath();g.moveTo(0,-4);g.bezierCurveTo(7,2,7,10,0,16);g.bezierCurveTo(-7,10,-7,2,0,-4);
    g.moveTo(-3,14);g.bezierCurveTo(-12,14,-20,6,-21,-6);g.bezierCurveTo(-14,-2,-8,4,-4,8);g.moveTo(3,14);g.bezierCurveTo(12,14,20,6,21,-6);g.bezierCurveTo(14,-2,8,4,4,8);
    [-8,0,8].forEach((x,i)=>{const y=i==1?-17:-13;g.moveTo(x+4,y);g.arc(x,y,4,0,TAU)})});
  const gg=g.createLinearGradient(0,-4,0,16);gg.addColorStop(0,'#ffffff');gg.addColorStop(1,'#3fd67e');g.fillStyle=gg;g.globalAlpha=.85;g.beginPath();g.moveTo(0,0);g.bezierCurveTo(4,4,4,9,0,13);g.bezierCurveTo(-4,9,-4,4,0,0);g.fill();g.globalAlpha=1;
  g.save();g.globalCompositeOperation='lighter';glow('#3fd67e',0,7,10,.7);glow(D.col,0,-14,12,.5);g.restore()};
EMB.ger=(f,D)=>{g.rotate(-f.rot*.2+Math.sin(clock*2)*.05);const W={col:'#cfe6ff',hi:'#ffffff'};
  g.save();g.globalCompositeOperation='lighter';glow('#ffffff',0,0,24,.45);glow('#9fd0ff',0,-8,16,.5);g.restore();
  neon(W,1.6,()=>{g.beginPath();g.ellipse(0,0,20,7,.5,0,TAU);g.moveTo(20,0);g.ellipse(0,0,20,7,-.5,0,TAU)});
  neon(D,1.9,()=>{g.beginPath();g.moveTo(-14,-6);g.lineTo(-11,-18);g.lineTo(-6,-10);g.lineTo(0,-21);g.lineTo(6,-10);g.lineTo(11,-18);g.lineTo(14,-6);
    g.moveTo(0,-8);g.lineTo(5,0);g.lineTo(2,0);g.lineTo(2,16);g.lineTo(-2,16);g.lineTo(-2,0);g.lineTo(-5,0);g.closePath()});
  g.fillStyle='#ffffff';const s=2.5+Math.sin(clock*6);g.save();g.translate(0,-21);g.beginPath();g.moveTo(0,-s*2);g.quadraticCurveTo(0,0,s*2,0);g.quadraticCurveTo(0,0,0,s*2);g.quadraticCurveTo(0,0,-s*2,0);g.quadraticCurveTo(0,0,0,-s*2);g.fill();g.restore()};

// ---------- 레퀴엠 상시 오라 (전기 + 후광) ----------
function arcLine(x1,y1,x2,y2,n,amp){g.beginPath();g.moveTo(x1,y1);for(let i=1;i<n;i++){const u=i/n,q=rnd(-amp,amp);g.lineTo(x1+(x2-x1)*u-(y2-y1)/Math.hypot(x2-x1,y2-y1||1)*q,y1+(y2-y1)*u+(x2-x1)/Math.hypot(x2-x1,y2-y1||1)*q)}g.lineTo(x2,y2);g.stroke()}
function reqAura(f,s){g.save();g.translate(f.x,f.y);g.scale(s,s);g.globalCompositeOperation='lighter';glow('#ffffff',0,0,f.r*2.2,.25+.1*Math.sin(clock*5));glow('#7fbfff',0,0,f.r*3,.15);
  g.lineCap='round';for(let k=0;k<3;k++){if(Math.random()<.45)continue;const a=rnd(0,TAU),a2=a+rnd(.6,1.4),r1=f.r+rnd(2,8),r2=f.r+rnd(10,22);g.strokeStyle=k?'#9fd0ff':'#ffffff';g.lineWidth=k?1.4:2.2;g.globalAlpha=rnd(.5,1);arcLine(Math.cos(a)*r1,Math.sin(a)*r1,Math.cos(a2)*r2,Math.sin(a2)*r2,6,5)}
  g.restore()}
const _lowGE=lowHP;lowHP=function(f){_lowGE(f);if(f.d.k=='ger'&&!f.dead&&!f.hid)reqAura(f,1)};

// ---------- 1) 생명 부여 : 황금 뱀 ----------
function geLife(o,t){const EN=F.filter(x=>x!=o&&!x.dead);HZ.push({k:'gesnake',o,t:0,sn:[0,1,2].map(i=>{const a=ang(o,t)+(i-1)*.7;return{x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,a,tg:EN[i%EN.length]||t,tr:[],t0:i*.12,hit:0}})});SFXa('ge_life');
  for(let i=0;i<18;i++)sparkP(o.x,o.y,rnd(-180,180),rnd(-180,180),i%2?'#fff4c2':'#3fd67e',rnd(2,3.5));for(let i=0;i<6;i++)FX.push({k:'geflower',x:o.x+rnd(-40,40),y:o.y+rnd(-30,30),s:rnd(.6,1),l:1.4,m:1.4})}
HZX.gesnake=(h,dt)=>{let alive=0;h.sn.forEach(s=>{if(s.hit){s.ht=(s.ht||0)+dt;return}alive++;if(h.t<s.t0)return;const e=s.tg&&!s.tg.dead?s.tg:tgt(h.o);if(!e||e==h.o){s.hit=1;return}
  let da=Math.atan2(e.y-s.y,e.x-s.x)-s.a;da=Math.atan2(Math.sin(da),Math.cos(da));s.a+=clamp(da,-4*dt,4*dt);const v=330+(h.t-s.t0)*120;s.x+=Math.cos(s.a)*v*dt;s.y+=Math.sin(s.a)*v*dt;s.tr.push([s.x,s.y]);if(s.tr.length>16)s.tr.shift();
  if(!e.hid&&!e.jump&&Math.hypot(e.x-s.x,e.y-s.y)<e.r+12){s.hit=1;hurt(e,4,h.o,e.x,e.y,0,0);e.slow=Math.max(e.slow,.8);SFXa('ge_snake')}});
  return h.t<3.5&&(alive>0||h.sn.some(s=>s.ht<.3))};
HZD.gesnake=h=>{h.sn.forEach(s=>{if(s.hit||h.t<s.t0||s.tr.length<2)return;g.save();g.lineCap='round';g.lineJoin='round';const P=s.tr.map(([x,y],i)=>{const n=s.tr.length,w=Math.sin(i*1.1+h.t*20)*5*(i/n),dx=-Math.sin(s.a),dy=Math.cos(s.a);return[x+dx*w,y+dy*w]});
  [['#1a1206',10],['#e8b72e',7],['#fff4c2',2]].forEach(([c,w])=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();P.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke()});
  const [hx,hy]=P[P.length-1];g.translate(hx,hy);g.rotate(s.a);g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,22,.5);g.restore();g.fillStyle='#e8b72e';g.strokeStyle='#1a1206';g.lineWidth=2;g.beginPath();g.ellipse(3,0,8,6,0,0,TAU);g.fill();g.stroke();
  g.fillStyle='#3fd67e';g.beginPath();g.arc(6,-3,1.6,0,TAU);g.fill();g.beginPath();g.arc(6,3,1.6,0,TAU);g.fill();g.strokeStyle='#ff4655';g.lineWidth=1.2;g.beginPath();g.moveTo(11,0);g.lineTo(16,0);g.lineTo(18,-2);g.moveTo(16,0);g.lineTo(18,2);g.stroke();g.restore()})};
FXD.geflower=x=>{const p=1-x.l/x.m,s=back(clamp(p/.2,0,1))*x.s*(1-clamp((p-.7)/.3,0,1));g.save();g.translate(x.x,x.y);g.scale(s,s);g.rotate(p*2);for(let i=0;i<5;i++){g.rotate(TAU/5);g.fillStyle='#fff4c2';g.beginPath();g.ellipse(6,0,6,3.2,0,0,TAU);g.fill()}g.fillStyle='#ffcc33';g.beginPath();g.arc(0,0,3,0,TAU);g.fill();g.restore()};

// ---------- 주먹 그림 ----------
function geFist(x,y,a,s,req,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;
  g.save();g.globalCompositeOperation='lighter';glow(req?'#bfe0ff':'#ffcc33',0,0,24,.55);g.restore();
  g.strokeStyle=req?'rgba(220,240,255,.8)':'rgba(255,230,160,.8)';g.lineWidth=2;g.lineCap='round';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-14,i*5);g.lineTo(-34-Math.abs(i)*8,i*5);g.stroke()}
  const fg=g.createLinearGradient(0,-10,0,10);fg.addColorStop(0,req?'#ffffff':'#fff0b0');fg.addColorStop(1,req?'#c9d6e8':'#d49a12');g.fillStyle=fg;g.strokeStyle='#1a1206';g.lineWidth=2.2;
  g.beginPath();g.moveTo(-10,-9);g.lineTo(5,-10);g.quadraticCurveTo(11,-10,11,-5);g.lineTo(11,5);g.quadraticCurveTo(11,10,5,10);g.lineTo(-10,9);g.closePath();g.fill();g.stroke();
  g.lineWidth=1.4;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(5,i*5.5);g.lineTo(11,i*5.5);g.stroke()}g.fillStyle=req?'#9fd0ff':'#3fd67e';g.beginPath();g.arc(-4,0,2,0,TAU);g.fill();g.restore()}
function mudaText(x,y,s,rot,req,al){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.globalAlpha=al;g.font='900 30px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=9;g.strokeStyle='#1a0a04';g.strokeText('무다',0,0);
  const tg=g.createLinearGradient(0,-15,0,15);tg.addColorStop(0,req?'#ffffff':'#fff3a0');tg.addColorStop(1,req?'#9fd0ff':'#ff8a1c');g.fillStyle=tg;g.fillText('무다',0,0);g.restore()}
function speedLines(cx,cy,R,a,col){g.save();g.globalCompositeOperation='lighter';g.translate(cx,cy);for(let i=0;i<40;i++){const an=i*TAU/40+((i*37)%7)*.05+clock*.3,r0=R*(.35+((i*13)%5)*.05),w=.012+((i*7)%4)*.006;g.globalAlpha=a*(.25+.35*Math.random());g.fillStyle=i%3?col:'#ffffff';
  g.beginPath();g.moveTo(Math.cos(an)*r0,Math.sin(an)*r0);g.lineTo(Math.cos(an-w)*R*2,Math.sin(an-w)*R*2);g.lineTo(Math.cos(an+w)*R*2,Math.sin(an+w)*R*2);g.closePath();g.fill()}g.restore()}

// ---------- 2) 무다무다 러쉬 (기본 : 주먹만) / 레퀴엠 러쉬 ----------
function geRush(o,t,req){HZ.push({k:'gerush',o,tg:t,t:0,n:0,req,nt:0,N:req?12:10,fin:0,fs:[],ms:[]})}
function rushHit(h,o,e,dmg){const a=ang(o,e),d=dist(o,e);hurt(e,dmg,o,e.x-Math.cos(a)*e.r,e.y-Math.sin(a)*e.r,0,0);if(!(AUD.ge_rushv&&AUD.ge_rushv.ok)||Math.random()<.35)SFXa('ge_punch');e.x=clamp(e.x+Math.cos(a)*3,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*3,e.r,A-e.r);
  for(let k=0;k<(h.req?4:3);k++)h.fs.push({a:a+rnd(-.45,.45),off:rnd(-22,22),d:Math.max(24,Math.min(d-4,96)),t:0,s:h.req?rnd(1.9,2.5):rnd(1.5,1.9)});
  if(Math.random()<.6)h.ms.push({x:e.x+rnd(-60,60),y:e.y-e.r-20+rnd(-30,20),t:0,r:rnd(-.35,.35),s:h.req?rnd(1.1,1.6):rnd(.8,1.1)});
  if(h.req&&Math.random()<.5)spark(e.x,e.y,'elec',3,200)}
function rushFinal(h,o,e,dmg,launch){const a=ang(o,e);hurt(e,dmg,o,e.x,e.y,0,1);sfxStop('ge_rushv');SFXa('ge_muda');shake=Math.max(shake,launch?24:14);hs=launch?.16:.08;e.slow=Math.max(e.slow,1.5);
  e.flyA=a;e.flyT=launch?.45:.25;e.flyV=launch?1400:700;FX.push({k:'burst',x:e.x,y:e.y,c:o.d.hi,a:0,l:.4,m:.4});ring(e.x,e.y,8,launch?160:90,o.d.col,launch?12:8,.45);
  if(launch){FX.push({k:'frost',l:.15,m:.15,c:'#ffffff'});SFXa('ge_launch')}ft(e.x,e.y-e.r-50,h.req?'무다아!!':'무다!!',h.req?'#ffffff':'#ffcc33',36)}
// 날아가기 (막타)
const _updFly=update;update=function(dt){_updFly(dt);if(F)F.forEach(e=>{if(e.flyT>0&&!e.dead){e.flyT-=dt;const v=e.flyV*dt;e.x=clamp(e.x+Math.cos(e.flyA)*v,e.r,A-e.r);e.y=clamp(e.y+Math.sin(e.flyA)*v,e.r,A-e.r);e.dx=Math.cos(e.flyA);e.dy=Math.sin(e.flyA);
  emit(80,dt,()=>Pt.push({x:e.x,y:e.y,vx:0,vy:0,l:.3,m:.3,sh:6,col:e.d.col,r:e.r*.7,a0:.3}));if(e.x<=e.r+1||e.x>=A-e.r-1||e.y<=e.r+1||e.y>=A-e.r-1){e.flyT=0;shake=Math.max(shake,12);spark(e.x,e.y,'dust',16,260);ring(e.x,e.y,6,70,'#ffffff',6,.4)}}})};
HZX.gerush=(h,dt)=>{
  const o=h.o,e=h.tg;if(o.dead||!e||e.dead)return false;o.gcd=Math.max(o.gcd,.3);const d=dist(o,e),a=ang(o,e);
  h.fs.forEach(q=>q.t+=dt);h.fs=h.fs.filter(q=>q.t<.14);h.ms.forEach(q=>q.t+=dt);h.ms=h.ms.filter(q=>q.t<.5);
  if(d>o.r+e.r+60&&!h.fin){o.x=clamp(o.x+Math.cos(a)*320*dt,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*320*dt,o.r,A-o.r)}
  h.nt-=dt;if(h.n<h.N&&h.nt<=0&&d<o.r+e.r+90&&!e.hid){h.nt=h.req?.07:.085;if(!h.n){h.t0=h.t;SFXa('ge_rushv');if(h.req){SLOW=Math.max(SLOW,.15);zk=1.2;zx=e.x;zy=e.y}}h.n++;rushHit(h,o,e,h.req?1:1.3)}
  if(h.n>=h.N&&!h.fin){h.fin=1;h.ft=h.t;rushFinal(h,o,e,h.req?7:6,h.req)}
  return !h.fin?h.t<2.4:h.t<h.ft+.5};
HZD.gerush=h=>{if(!h.req||!h.n||h.fin&&h.t>h.ft+.3)return;const e=h.tg;if(!e)return;const a=h.fin?clamp(1-(h.t-h.ft)/.3,0,1):Math.min(1,(h.t-h.t0)/.1);speedLines(e.x,e.y,170,a*.9,'#9fd0ff')};
HZP.gerush=h=>{const o=h.o,e=h.tg;if(o.dead||!e)return;const a=ang(o,e);
  h.fs.forEach(q=>{const p=q.t/.14,r=Math.sin(p*Math.PI),cx=o.x+Math.cos(q.a)*(18+q.d*r)-Math.sin(q.a)*q.off,cy=o.y-6+Math.sin(q.a)*(18+q.d*r)+Math.cos(q.a)*q.off;geFist(cx,cy,q.a,q.s,h.req,1-p*.3)});
  h.ms.forEach(q=>{const p=q.t/.5;mudaText(q.x,q.y-p*20,q.s*back(clamp(p/.2,0,1)),q.r,h.req,clamp((.5-q.t)/.2,0,1))});
  if(h.req&&h.n&&!h.fin){g.save();g.globalAlpha=.85;reqAura(o,1.4);g.restore()}};

// ---------- 3) ULT 그랜드 트리 ----------
function treeBuild(seed){let s=seed;const R=()=>{s=(s*16807)%2147483647;return s/2147483647};const seg=[],lv=[];
  function br(x,y,an,len,w,dep,t0){const x2=x+Math.cos(an)*len,y2=y+Math.sin(an)*len,dur=.18+.04*dep,t1=t0+dur;seg.push({x1:x,y1:y,x2,y2,w,dep,t0,t1});
    if(dep>=6||len<10){lv.push({x:x2,y:y2,r:22+R()*16,t:t1,d:R()});return}
    const n=dep<2?3:2+(R()<.4?1:0);for(let i=0;i<n;i++){const sp=(n==3?(i-1)*.55:(i-.5)*.8)+(R()-.5)*.3;br(x2,y2,an+sp,len*(.7+R()*.12),w*.66,dep+1,t1-.03)}
    if(dep>=3&&R()<.6)lv.push({x:(x+x2)/2,y:(y+y2)/2,r:16+R()*12,t:t1,d:R()})}
  br(0,0,-Math.PI/2,92,30,0,0);return{seg,lv}}
function geTree(o,t){const EN=F.filter(x=>x!=o&&!x.dead);let x=A/2,y=A/2;if(EN.length){x=EN.reduce((s,e)=>s+e.x,0)/EN.length;y=EN.reduce((s,e)=>s+e.y,0)/EN.length}
  HZ.push({k:'getree',o,t:0,x:clamp(x,120,A-120),y:clamp(y+70,240,A-30),n:0,heal:0,T:treeBuild(Math.floor(rnd(1,99999))),roots:EN.map(e=>({e,pts:[]}))});SFXa('ge_tree');shake=Math.max(shake,8)}
HZX.getree=(h,dt,EN)=>{const o=h.o;
  if(h.t<1.2&&Math.random()<dt*20)shake=Math.max(shake,4);
  if(!h.heal&&h.t>=.6&&!o.dead){h.heal=1;SFXa('ge_life');const hv=Math.min(5,100-o.hp);if(hv>0){o.hp+=hv;ft(o.x,o.y-o.r-12,'+'+hv,'#7bff8a',24)}}
  h.roots.forEach(R=>{const e=R.e;if(e.dead)return;const L=R.pts.length;if(h.t>.3&&L<24){const u=(L+1)/24,x=h.x+(e.x-h.x)*u+Math.sin(u*9+L)*14*(1-u),y=h.y+(e.y-h.y)*u+Math.cos(u*7)*10*(1-u);R.pts.push([x,y])}else if(L>=24){R.pts[L-1]=[e.x,e.y]}});
  if(h.n<3&&h.t>=1+h.n*.45){h.n++;SFXa('ge_root');shake=Math.max(shake,10);EN.forEach(e=>{if(e.hid||e.jump)return;FX.push({k:'geroot',x:e.x,y:e.y,l:.6,m:.6});hurt(e,4,o,e.x,e.y,0,1);e.stn=Math.max(e.stn,.4);e.cast=null;for(let i=0;i<8;i++)rockP(e.x,e.y,rnd(0,TAU),rnd(60,180))})}
  if(h.t>.9)emit(16,dt,()=>{const lf=h.T.lv[Math.floor(rnd(0,h.T.lv.length))];if(!lf)return;Pt.push({x:h.x+lf.x*h.sc,y:h.y+lf.y*h.sc,vx:rnd(-30,30),vy:rnd(20,60),l:rnd(1.2,1.8),m:1.8,sh:13,col:['#ffcc33','#7dd56f','#fff4c2','#3fae4a'][Math.floor(rnd(0,4))],r:rnd(3,5),rot:rnd(0,TAU),vr:rnd(-4,4),gy:15,fr:.6})});
  if(h.t>.6&&h.t<2.6)emit(6,dt,()=>FX.push({k:'geflower',x:h.x+rnd(-110,110),y:h.y+rnd(-20,25),s:rnd(.5,.9),l:1.6,m:1.6}));
  return h.t<3.4};
HZD.getree=h=>{const gt=h.t*1.05,fa=clamp((3.4-h.t)/.5,0,1),sc=h.sc=Math.min(1.75,(A-60)/260);g.save();g.globalAlpha=fa;
  // 땅 : 빛나는 원 + 뿌리
  g.save();g.translate(h.x,h.y);g.scale(1,.42);const gr=g.createRadialGradient(0,0,0,0,0,170);gr.addColorStop(0,'rgba(255,220,120,.45)');gr.addColorStop(1,'rgba(255,200,80,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,170*Math.min(1,gt*2),0,TAU);g.fill();g.restore();
  g.lineCap='round';g.lineJoin='round';h.roots.forEach(R=>{if(R.pts.length<2)return;[['#1a0f05',10],['#7a5220',6],['rgba(255,220,120,.9)',1.6]].forEach(([c,w])=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(h.x,h.y);R.pts.forEach(([x,y])=>g.lineTo(x,y));g.stroke()})});
  g.translate(h.x,h.y);g.scale(sc,sc);
  g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(0,4,60,14,0,0,TAU);g.fill();
  // 뿌리 밑동
  [[-1,.5],[1,.45],[-1,.9],[1,.95]].forEach(([sd,k])=>{const u=clamp(gt*2,0,1);g.strokeStyle='#1a0f05';g.lineWidth=12;g.beginPath();g.moveTo(sd*6,-6);g.quadraticCurveTo(sd*22*k,-2,sd*44*k*u,8);g.stroke();g.strokeStyle='#6b4a1e';g.lineWidth=7;g.stroke()});
  // 가지
  const segs=h.T.seg;for(const s of segs){if(gt<s.t0)continue;const u=Math.min(1,(gt-s.t0)/(s.t1-s.t0)),x2=s.x1+(s.x2-s.x1)*u,y2=s.y1+(s.y2-s.y1)*u,w=s.w*(.5+.5*u);
    g.strokeStyle='#140b03';g.lineWidth=w+4;g.beginPath();g.moveTo(s.x1,s.y1);g.lineTo(x2,y2);g.stroke();g.strokeStyle='#6b4a1e';g.lineWidth=w;g.stroke();
    g.strokeStyle='#a87a34';g.lineWidth=Math.max(1,w*.3);g.beginPath();g.moveTo(s.x1-w*.18,s.y1);g.lineTo(x2-w*.18,y2);g.stroke()}
  g.save();g.globalCompositeOperation='lighter';g.lineCap='round';for(const s of segs){if(s.dep>2||gt<s.t0)continue;const u=Math.min(1,(gt-s.t0)/(s.t1-s.t0));g.strokeStyle='#ffd27a';g.globalAlpha=fa*(.35+.35*Math.sin(clock*4+s.dep*2));g.lineWidth=2;g.beginPath();g.moveTo(s.x1+2,s.y1);g.lineTo(s.x1+2+(s.x2-s.x1)*u,s.y1+(s.y2-s.y1)*u);g.stroke()}g.restore();g.globalAlpha=fa;
  // 잎 덩어리
  const lv=h.T.lv;for(let pass=0;pass<2;pass++)for(const L of lv){if(gt<L.t)continue;const u=back(clamp((gt-L.t)/.35,0,1)),r=L.r*u*(1+.04*Math.sin(clock*2+L.d*9));if(r<=1)continue;
    if(pass==0){g.fillStyle='#1d5a2c';g.beginPath();g.arc(L.x+3,L.y+4,r*1.08,0,TAU);g.fill()}else{const lg=g.createRadialGradient(L.x-r*.35,L.y-r*.4,r*.1,L.x,L.y,r);lg.addColorStop(0,L.d>.6?'#fff4c2':'#d8ff9c');lg.addColorStop(.45,L.d>.5?'#ffcc33':'#7dd56f');lg.addColorStop(1,'#2a7a3c');g.fillStyle=lg;g.beginPath();g.arc(L.x,L.y,r,0,TAU);g.fill()}}
  // 빛 : 수관 반짝이 + 갓 레이
  g.save();g.globalCompositeOperation='lighter';const cy=-190;if(gt>.9){const ra=clamp((gt-.9)/.5,0,1);for(let i=0;i<5;i++){const x=(i-2)*45+Math.sin(clock*.6+i)*10;g.globalAlpha=fa*ra*.1;g.fillStyle='#fff4c2';g.beginPath();g.moveTo(x-12,cy);g.lineTo(x+12,cy);g.lineTo(x*1.6+40,20);g.lineTo(x*1.6-40,20);g.closePath();g.fill()}
    g.globalAlpha=fa;glow('#ffcc33',0,cy,160*ra,.28);for(let i=0;i<16;i++){const L=lv[(i*7)%lv.length];if(!L)break;glow('#fff4c2',L.x+Math.sin(clock*2+i)*6,L.y+Math.cos(clock*1.7+i)*6,6+3*Math.sin(clock*5+i),.8)}}g.restore();
  g.restore();g.globalAlpha=1};
FXD.geroot=x=>{const p=1-x.l/x.m,up=back(clamp(p/.22,0,1)),dn=clamp((p-.6)/.4,0,1),hh=56*up*(1-dn);g.save();g.translate(x.x,x.y);g.lineCap='round';
  g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,60*(1-p),.6*(1-p));g.restore();
  for(let i=0;i<6;i++){const a=i*TAU/6+x.x,ox=Math.cos(a)*24,oy=Math.sin(a)*13;g.strokeStyle='#140b03';g.lineWidth=11;g.beginPath();g.moveTo(ox,oy);g.quadraticCurveTo(ox*.4,oy-hh*.5,ox*.15,oy-hh);g.stroke();g.strokeStyle='#7a5220';g.lineWidth=6;g.stroke();g.strokeStyle='#ffd27a';g.lineWidth=1.5;g.stroke();
    g.fillStyle='#7dd56f';g.beginPath();g.ellipse(ox*.15+4,oy-hh+2,6,3,.6,0,TAU);g.fill()}g.restore()};

// ---------- 레퀴엠 각성 연출 ----------
function nebula(){if(nebula.c&&nebula.A==A)return nebula.c;const c=document.createElement('canvas');c.width=c.height=A;const x=c.getContext('2d');x.fillStyle='#0a0418';x.fillRect(0,0,A,A);
  const blobs=[['#6a1b9a',.55],['#c2185b',.45],['#283593',.5],['#00838f',.3],['#ad1457',.4],['#4a148c',.5]];for(let i=0;i<26;i++){const [c2,a]=blobs[i%blobs.length],px=Math.random()*A,py=Math.random()*A,r=60+Math.random()*180,gr=x.createRadialGradient(px,py,0,px,py,r);gr.addColorStop(0,c2);gr.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a*.6;x.fillStyle=gr;x.fillRect(px-r,py-r,r*2,r*2)}
  x.globalAlpha=1;for(let i=0;i<260;i++){x.fillStyle=Math.random()<.2?'#ffd6f0':'#ffffff';x.globalAlpha=Math.random()*.9;const r=Math.random()<.95?Math.random()*1.3:2.2;x.beginPath();x.arc(Math.random()*A,Math.random()*A,r,0,TAU);x.fill()}
  nebula.c=c;nebula.A=A;return c}
function geAwaken(f){f.req=1;f.cast=null;f.inv=1;SFXa('ge_arrow');
  CIN={o:f,t:0,sx:f.x-380,sy:f.y-560,hit:0,crack:[],done:0,px:f.x,py:f.y,
  tick(dt){const o=this.o;o.x=this.px;o.y=this.py;o.gcd=Math.max(o.gcd,.5);
    if(!this.hit&&this.t>=.6){this.hit=1;SFXa('ge_crack');shake=18;hs=.1;FX.push({k:'burst',x:o.x,y:o.y,c:'#ffcc33',a:0,l:.4,m:.4});ring(o.x,o.y,6,100,'#ffcc33',8,.4)}
    if(!this.sh&&this.t>=.65){this.sh=1;SFXa('ge_shell')}
    if(this.hit&&this.t<1.5&&Math.random()<dt*30){const a=rnd(0,TAU);this.crack.push({a,l:rnd(.4,1),t:this.t});shake=Math.max(shake,3+this.t*3)}
    if(this.t>=1.45&&!this.pil){this.pil=1}if(this.t>=1.75&&!this.rq){this.rq=1;SFXa('ge_req')}if(this.t>=2.25&&!this.rv){this.rv=1;SFXa('ge_reqv')}
    if(this.t>=2.05&&!this.done){this.done=1;shake=28;hs=.18;FX.push({k:'frost',l:.35,m:.35,c:'#ffffff'});
      o.d=Object.assign({},o.d,{name:o.d.name+' (레퀴엠)',k:'ger',sk:GERSK});o.cds=GERSK.map(()=>.6);o.ug=Math.max(o.ug||0,30);
      if(F.length<4){const i=o.i,el=$('#p'+i+' .nm b');if(el){el.textContent=o.d.name;paintIc($('#p'+i+' .ic'),o.d,34)}}
      for(let i=0;i<60;i++){const a=rnd(0,TAU),v=rnd(200,520),l=rnd(.6,1.2);Pt.push({x:o.x,y:o.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:5,col:i%3?'#ffffff':'#9fd0ff',r:2.6,fr:.1})}
      F.forEach(e=>{if(e!=o&&!e.dead){const a=ang(o,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.flyA=a;e.flyT=.25;e.flyV=600}})}
    if(this.t>=4.3){o.inv=0;return false}},
  draw(){const o=this.o,t=this.t,dark=t<2.05?Math.min(1,t/.4):clamp(1-(t-2.05)/.6,0,1);
    // 어두운 화면 (주인공만 스포트라이트)
    g.save();const sg=g.createRadialGradient(o.x,o.y,o.r*1.2,o.x,o.y,A*.9);sg.addColorStop(0,'rgba(0,0,0,0)');sg.addColorStop(.25,'rgba(0,0,0,'+(.75*dark)+')');sg.addColorStop(1,'rgba(0,0,0,'+(.92*dark)+')');g.fillStyle=sg;g.fillRect(-300,-300,A+600,A+600);g.restore();
    // 우주 플래시
    if(t>1.9&&t<2.6){g.save();g.globalAlpha=clamp(1-Math.abs(t-2.15)/.4,0,1)*.9;g.drawImage(nebula(),0,0,A,A);g.restore()}
    // 화살
    if(!this.hit){const u=t/.6,q=u*u,x=this.sx+(o.x-this.sx)*q,y=this.sy+(o.y-this.sy)*q,a=Math.atan2(o.y-this.sy,o.x-this.sx);geArrow(x,y,a,1.7,1)}
    else if(t<1.45){const a=Math.atan2(o.y-this.sy,o.x-this.sx),sink=clamp((t-.6)/.8,0,1);g.save();g.beginPath();g.rect(-300,-300,A+600,A+600);g.arc(o.x,o.y,o.r*.9,0,TAU,true);g.clip('evenodd');geArrow(o.x-Math.cos(a)*(10+sink*30),o.y-Math.sin(a)*(10+sink*30),a,1.7,1-sink);g.restore()}
    // 균열 (빛이 새어 나옴)
    if(this.hit&&t<2.1){g.save();g.translate(o.x,o.y);g.globalCompositeOperation='lighter';const lk=clamp((t-.6)/1.4,0,1);glow('#fff4c2',0,0,o.r*(1.5+lk*2),.3+.6*lk);g.lineCap='round';
      this.crack.forEach(c=>{const L=o.r*(c.l+.4)*Math.min(1,(t-c.t)/.15);g.strokeStyle='#ffffff';g.lineWidth=2.4;g.globalAlpha=.6+.4*lk;g.beginPath();g.moveTo(0,0);let x=0,y=0;for(let k=1;k<=4;k++){const aa=c.a+((k*31+c.l*97)%5-2)*.18;x=Math.cos(aa)*L*k/4;y=Math.sin(aa)*L*k/4;g.lineTo(x,y)}g.stroke()});g.restore()}
    // 하늘에서 내려오는 빛 기둥
    if(t>1.45&&t<2.9){const u=clamp((t-1.45)/.3,0,1),out=clamp((t-2.3)/.6,0,1),w=(30+60*u)*(1-out*.7);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(1-out)*.85;
      const pg=g.createLinearGradient(o.x-w,0,o.x+w,0);pg.addColorStop(0,'rgba(160,210,255,0)');pg.addColorStop(.35,'rgba(200,230,255,.6)');pg.addColorStop(.5,'rgba(255,255,255,1)');pg.addColorStop(.65,'rgba(200,230,255,.6)');pg.addColorStop(1,'rgba(160,210,255,0)');g.fillStyle=pg;g.fillRect(o.x-w,-300,w*2,o.y+300);
      glow('#ffffff',o.x,o.y,w*2.4,1);for(let i=0;i<14;i++){const yy=((clock*500+i*90)%(o.y+300))-300;g.fillStyle='#ffffff';g.globalAlpha=(1-out)*.8;g.beginPath();g.arc(o.x+Math.sin(i*2.1+clock*4)*w*.7,yy,2,0,TAU);g.fill()}
      for(let k=0;k<3;k++){const pk=((t-1.45)*1.6+k/3)%1;g.globalAlpha=(1-pk)*(1-out)*.8;g.strokeStyle='#cfe6ff';g.lineWidth=3;g.beginPath();g.ellipse(o.x,o.y+o.r*.6,20+pk*120,(20+pk*120)*.3,0,0,TAU);g.stroke()}g.restore()}
    // 각성 후 : 전기 + 제목
    if(t>2.05){const q=t-2.05,a=clamp(1-(q-1.7)/.5,0,1),s=back(clamp(q/.15,0,1));reqAura(o,1.6+(1-a));
      g.save();g.globalAlpha=a;g.translate(A/2,A*.28);g.scale(s,s);g.font='900 52px '+FB;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#05030c';g.strokeText('레퀴엠',0,0);
      const tg=g.createLinearGradient(0,-26,0,26);tg.addColorStop(0,'#ffffff');tg.addColorStop(.6,'#cfe6ff');tg.addColorStop(1,'#ffcc33');g.fillStyle=tg;g.fillText('레퀴엠',0,0);g.font='700 16px '+FB;g.lineWidth=5;g.strokeText('GOLD · EXPERIENCE · REQUIEM',0,40);g.fillStyle='#ffe9a8';g.fillText('GOLD · EXPERIENCE · REQUIEM',0,40);g.restore();
      subtitle('이것이 「레퀴엠」이다',a)}
    else if(t>.6)subtitle(t<1.45?'화살이…!':'',clamp((t-.7)/.3,0,1))}};
  ft(f.x,f.y-f.r-40,'스탠드의 화살','#ffcc33',22)}
function geArrow(x,y,a,s,al){g.save();g.translate(x,y);g.rotate(a);g.scale(s,s);g.globalAlpha=al;g.save();g.globalCompositeOperation='lighter';glow('#ffcc33',0,0,34,.8);g.strokeStyle='#fff4c2';g.globalAlpha=al*.6;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-150,0);g.lineTo(-10,0);g.stroke();g.restore();
  g.strokeStyle='#3a2408';g.lineWidth=3.5;g.beginPath();g.moveTo(-64,0);g.lineTo(-6,0);g.stroke();g.strokeStyle='#c9962e';g.lineWidth=1.5;g.stroke();
  const ag=g.createLinearGradient(0,-10,0,10);ag.addColorStop(0,'#fff4c2');ag.addColorStop(.5,'#ffcc33');ag.addColorStop(1,'#8a5a0c');g.fillStyle=ag;g.strokeStyle='#1a1206';g.lineWidth=1.4;
  g.beginPath();g.moveTo(18,0);g.lineTo(2,-6);g.lineTo(-2,-11);g.lineTo(-4,-5);g.lineTo(-10,-8);g.lineTo(-7,0);g.lineTo(-10,8);g.lineTo(-4,5);g.lineTo(-2,11);g.lineTo(2,6);g.closePath();g.fill();g.stroke();
  g.strokeStyle='#8a5a0c';g.lineWidth=1;g.beginPath();g.moveTo(16,0);g.lineTo(-6,0);g.stroke();g.fillStyle='#3fd67e';g.beginPath();g.arc(-3,0,2.2,0,TAU);g.fill();
  g.fillStyle='#c9962e';g.beginPath();g.moveTo(-60,0);g.lineTo(-70,-6);g.lineTo(-66,0);g.lineTo(-70,6);g.closePath();g.fill();g.restore()}

// ---------- 레퀴엠 2) 되감기 ----------
function ghostAt(e,x,y,a,s){g.save();g.globalAlpha=a;const sz=e.r*2.2*s;g.drawImage(ICON(e.d,52),x-sz/2,y-sz/2-2,sz,sz);g.restore()}
function geRewind(o,t){const hs=(t.hist||[]).slice();HZ.push({k:'gerew',o,e:t,t:0,path:hs.reverse(),done:0});SFXa('ge_rewind');ft(t.x,t.y-t.r-40,'되감기',o.d.hi,24)}
HZX.gerew=(h,dt)=>{const e=h.e;if(!e||e.dead)return false;const D=.75,u=clamp(h.t/D,0,1),P=h.path,n=P.length;
  if(!h.done){const i=Math.min(n-1,Math.floor(u*(n-1)));if(n){e.x=P[i][0];e.y=P[i][1]}e.stn=Math.max(e.stn,.12);e.cast=null;e.rush=0;e.auto=0;e.br=0;
    if(u>=1){h.done=1;h.dt=h.t;e.cds=e.cds.map((c,j)=>e.d.sk[j].ult?c:Math.max(c,0)+3);e.ug=Math.max(0,(e.ug||0)-15);hurt(e,6,h.o,e.x,e.y,0,1);e.hist=[[e.x,e.y]];shake=Math.max(shake,10);ft(e.x,e.y-e.r-44,'없던 일로','#ffffff',26);ring(e.x,e.y,6,90,'#cfe6ff',6,.4)}}
  return !h.done||h.t<h.dt+.6};
HZP.gerew=h=>{const e=h.e;if(!e||e.dead)return;const P=h.path,n=P.length,D=.75,u=clamp(h.t/D,0,1),fa=h.done?clamp(1-(h.t-h.dt)/.6,0,1):1;if(!n)return;
  g.save();g.globalAlpha=fa*.25;g.globalCompositeOperation='saturation';g.fillStyle='#888';g.beginPath();g.arc(e.x,e.y,160,0,TAU);g.fill();g.restore();
  const cur=Math.floor(u*(n-1));for(let k=0;k<12;k++){const i=Math.min(n-1,cur+k*Math.max(2,Math.floor(n/14)));if(i>=n)break;ghostAt(e,P[i][0],P[i][1],fa*(.5-k*.035),1-k*.03)}
  g.save();g.globalAlpha=fa;g.strokeStyle='rgba(220,240,255,.8)';g.lineWidth=2;g.setLineDash([6,8]);g.lineDashOffset=clock*90;g.beginPath();for(let i=cur;i<n;i+=3)i==cur?g.moveTo(P[i][0],P[i][1]):g.lineTo(P[i][0],P[i][1]);g.stroke();g.setLineDash([]);
  g.translate(e.x,e.y-e.r-62);g.strokeStyle='#ffffff';g.lineWidth=2.5;g.beginPath();g.arc(0,0,15,0,TAU);g.stroke();g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(-clock*14)*11,Math.sin(-clock*14)*11);g.moveTo(0,0);g.lineTo(Math.cos(-clock*3)*7,Math.sin(-clock*3)*7);g.stroke();g.restore()};

// ---------- 레퀴엠 3) ULT 끝나지 않는 죽음 ----------
function geUlt(o,t){SFXa('ge_cosmos');const path=(t.hist||[]).slice().reverse(),dir=o.x>A/2?-1:1;
  CIN={o,e:t,t:0,R0:.9,R1:3,P1:3.2,px:o.x,py:o.y,x0:o.x,y0:o.y,tx:A/2-dir*A*.2,ty:A*.62,la:dir>0?-.3:Math.PI+.3,path,ph:0,n:0,nt:0,fs:[],ms:[],
  tick(dt){const o=this.o,e=this.e,k=clamp(this.t/.55,0,1),ek=k*k*(3-2*k);this.px=this.x0+(this.tx-this.x0)*ek;this.py=this.y0+(this.ty-this.y0)*ek;o.x=this.px;o.y=this.py;o.gcd=Math.max(o.gcd,.5);if(e.dead)return this.t<this.endT||(this.endT=this.t+.6,true);
    this.fs.forEach(q=>q.t+=dt);this.fs=this.fs.filter(q=>q.t<.14);this.ms.forEach(q=>q.t+=dt);this.ms=this.ms.filter(q=>q.t<.5);
    const t=this.t,P=this.path,n=P.length;
    if(t>=this.R0&&t<this.R1+.05&&n){const u=clamp((t-this.R0)/(this.R1-this.R0),0,1),i=Math.min(n-1,Math.floor(u*(n-1)));e.x=P[i][0];e.y=P[i][1];if(u>=1&&!this.rw){this.rw=1;hurt(e,4,o,e.x,e.y,0,1);shake=12;SFXa('ge_rewind')}}
    if(t>=this.P1&&this.ph==0){this.ph=1;SFXa('ge_rushv');const d=o.r+e.r+34;e.x=clamp(o.x+Math.cos(this.la)*d,e.r,A-e.r);e.y=clamp(o.y+Math.sin(this.la)*d,e.r,A-e.r);ring(e.x,e.y,6,90,'#cfe6ff',6,.35);SLOW=Math.max(SLOW,.2);zk=1.4;zx=e.x;zy=e.y}
    if(this.ph==1){if(!this.fin){const d=o.r+e.r+34;e.x=clamp(o.x+Math.cos(this.la)*d,e.r,A-e.r);e.y=clamp(o.y+Math.sin(this.la)*d,e.r,A-e.r)}this.nt-=dt;if(this.n<16&&this.nt<=0){this.nt=.1;this.n++;const fake={req:1,fs:this.fs,ms:this.ms};rushHit(fake,o,e,.6)}
      if(this.n>=16&&!this.fin){this.fin=1;this.ft=t;rushFinal({req:1},o,e,7,1);e.flyT=.7;e.flyV=1600}}
    if(this.fin&&t>this.ft+1.1)return false;return t<6},
  draw(){const o=this.o,e=this.e,t=this.t,inA=Math.min(1,t/.5),outA=this.fin?clamp(1-(t-this.ft-.5)/.6,0,1):1,a=inA*outA;
    g.save();g.globalAlpha=a*.92;g.drawImage(nebula(),0,0,A,A);g.globalAlpha=a*.5;g.globalCompositeOperation='lighter';for(let i=0;i<30;i++){const x=(i*173+clock*20*(1+i%3))%A,y=(i*97)%A;g.fillStyle='#ffffff';g.fillRect(x,y,1.5,1.5)}g.restore();
    // 레퀴엠 스탠드 (뒤에 크게)
    // 주인공 + 상대 다시 그리기 (우주 위에)
    if(!o.dead)ball(o,e);if(!e.dead)ball(e,o);reqAura(o,1.5);
    // 되감기 잔상
    const P=this.path,n=P.length;if(t>this.R0&&t<this.R1+.2&&n){const u=clamp((t-this.R0)/(this.R1-this.R0),0,1),cur=Math.floor(u*(n-1)),fa=t<this.R1?1:clamp(1-(t-this.R1)/.2,0,1);for(let k=1;k<14;k++){const i=Math.min(n-1,cur+k*Math.max(2,Math.floor(n/16)));ghostAt(e,P[i][0],P[i][1],fa*a*(.6-k*.04),1-k*.025)}}
    // 러쉬
    if(this.ph==1){const sa=this.fin?clamp(1-(t-this.ft)/.4,0,1):1;if(this.n&&(!this.fin||t<this.ft+.4))speedLines(e.x,e.y,220,a*sa,'#9fd0ff');
      this.fs.forEach(q=>{const p=q.t/.14,r=Math.sin(p*Math.PI),cx=o.x+Math.cos(q.a)*(18+q.d*r)-Math.sin(q.a)*q.off,cy=o.y-6+Math.sin(q.a)*(18+q.d*r)+Math.cos(q.a)*q.off;geFist(cx,cy,q.a,q.s,1,1-p*.3)});
      if(!e.dead&&!this.fin){g.save();g.translate(rnd(-3,3),rnd(-3,3));ball(e,o);g.restore()}this.ms.forEach(q=>{const p=q.t/.5;mudaText(q.x,q.y-p*20,q.s*1.2*back(clamp(p/.2,0,1)),q.r,1,clamp((.5-q.t)/.2,0,1))})}
    const sub=t<.2?'':t<this.P1?'이게 「골드 · E · 레퀴엠」':this.fin?(t<this.ft+1.1?'끝나지 않는 죽음':''):'무다무다무다무다무다';if(sub)subtitle(sub,a)}}}

const _hurtInv=hurt;hurt=function(t){if(t&&t.inv)return;return _hurtInv.apply(this,arguments)};
// ---------- 사전 : 레퀴엠 기술도 보기 ----------
const _openInfoGE=openInfo;openInfo=function(i){_openInfoGE(i);const d=DEF[i];if(d.k!='ge')return;const box=$('#dsk');
  box.insertAdjacentHTML('beforeend',`<div class="dsk np" style="border-color:#cfe6ff55"><i style="color:#cfe6ff">R</i><div><b>레퀴엠 각성</b><small>체력 40 이하 · 스탠드의 화살이 꽂혀 각성 (미리보기)</small></div><em></em></div>`+
    GERSK.map((s,j)=>`<button class="dsk${s.ult?' u':''}" data-rj="${j}" style="border-color:#cfe6ff55"><i style="color:#cfe6ff">${s.ult?'R·ULT':'R'+(j+1)}</i><div><b>${s.n}</b><small>${GERINFO[j][1]}</small></div><em>${GERINFO[j][0]} DMG<br>${s.ult?'게이지':s.cd+'s'}</em></button>`).join(''));
  const aw=box.querySelector('.np[style]');aw.style.cursor='pointer';aw.addEventListener('click',()=>{audioOn();SFX('click');startDemo(DI,0);DEMO.next=99;$('#demon').textContent='레퀴엠 각성';$('#demod').textContent='스탠드의 화살이 꽂혀 레퀴엠으로 각성';setTimeout(()=>{if(DEMO&&F[0])geAwaken(F[0])},500)});
  box.querySelectorAll('[data-rj]').forEach(b=>b.addEventListener('click',()=>{audioOn();SFX('click');const j=+b.dataset.rj;startDemo(DI,0);const f=F[0];f.req=1;f.d=Object.assign({},f.d,{name:f.d.name+' (레퀴엠)',k:'ger',sk:GERSK});f.cds=GERSK.map(()=>0);DEMO.j=j;DEMO.next=1.2;
    $('#demot').textContent=f.d.name+(GERSK[j].ult?' · R·ULT':' · R'+(j+1));$('#demon').textContent=GERSK[j].n;$('#demod').textContent=GERINFO[j][1]}))};

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
