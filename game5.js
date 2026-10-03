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
