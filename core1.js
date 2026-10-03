let AC=null,MG=null,NB=null,MUTE=0,SERR='';const SL={};
const SND=['gun','throw','arrow','skillshot','knife','slash','swing','floor1','floor2','floor3','floor4','floor5','floor6','floor7','tstop','hit','tick','heavy','cast','ult','cd','go','vs','ko','slam','gulp','chew','spit','beam','rush','click','h_wheel','h_curse','h_burst','h_ult','h_flicker','h_glass','kick','juggle','tackle','whistle','goal','champ'],BUF={};let BGM=null,BGMn='';
const AUD={};let BGMA=null,AERR=0;
// 볼륨 설정 (설정 화면에서 조절, 폰에 저장)
const DV={bgm_menu:.35,bgm_battle:.12,bgm_tour:.12,bgm_final:.18};
let VOL={m:1,b:1,s:1,p:{}},PREVB=0;try{const v=JSON.parse(localStorage.getItem('jsbb3_vol'));if(v&&v.p)VOL=v}catch(e){}
const isB=n=>n.indexOf('bgm_')==0;
const pv=n=>VOL.p[n]!=null?VOL.p[n]:(DV[n]!=null?DV[n]:.85);
const vol=n=>Math.max(0,Math.min(1,pv(n)*(isB(n)?VOL.b:VOL.s)*VOL.m));
function saveVol(){try{localStorage.setItem('jsbb3_vol',JSON.stringify(VOL))}catch(e){}if(BGMA&&BGMn)BGMA.volume=vol(BGMn)}
// 제미나이 방식 그대로: new Audio('sounds/이름.mp3') 묶음을 만들어두고 play()
class SoundPool{constructor(src,size){this.pool=Array.from({length:size},()=>{const a=new Audio(src);a.preload='auto';a.addEventListener('canplaythrough',()=>{a.ok=1},{once:true});a.addEventListener('error',()=>{if(!a.bad){a.bad=1;AERR++;SERR=src.replace('sounds/','')+' 못 읽음'}},{once:true});return a});this.i=0}play(v){const s=this.pool[this.i];s.volume=v;try{s.currentTime=0}catch(e){}const pr=s.play();if(pr&&pr.catch)pr.catch(()=>{});this.i=(this.i+1)%this.pool.length}get ok(){return this.pool.some(a=>a.ok)}}
const hasS=n=>!!(BUF[n]||AUD[n]);
let LSD=0,UNL=0;function loadSnd(){if(LSD)return;LSD=1;SND.forEach(n=>{AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='hit'||n=='tick'||n=='gun'||n.startsWith('floor')?5:3)});['bgm_menu','bgm_battle','bgm_tour','bgm_final'].forEach(n=>{const a=new Audio('sounds/'+n+'.mp3');a.loop=true;a.preload='auto';a.addEventListener('canplaythrough',()=>{a.ok=1},{once:true});a.addEventListener('error',()=>{AERR++;SERR=n+'.mp3 못 읽음'},{once:true});AUD[n]=a})}
function playBuf(n){const so=AC.createBufferSource(),gn=AC.createGain();so.buffer=BUF[n];so.playbackRate.value=n=='click'||n=='cd'?1:rnd(.94,1.06);gn.gain.value=1;so.connect(gn).connect(MG);so.start()}
function stopBGM(){if(BGM){try{BGM.stop()}catch(e){}BGM=null}if(BGMA){try{BGMA.pause()}catch(e){}BGMA=null}}
function playBGM(n,force){if(!UNL)return;if(!n){BGMn='';stopBGM();return}if(BGMn==n&&!force&&(BGM||BGMA))return;BGMn=n;stopBGM();if(MUTE)return;let aa=AUD[n]||(n!='bgm_menu'?AUD.bgm_battle:null);if(aa){BGMA=aa;try{aa.loop=true;aa.volume=vol(n);try{aa.currentTime=0}catch(e){}const pr=aa.play();if(pr&&pr.catch)pr.catch(()=>{})}catch(e){}return}const bb=BUF[n]||(n!='bgm_menu'?BUF.bgm_battle:null);if(bb&&AC){const so=AC.createBufferSource(),gn=AC.createGain();so.buffer=bb;so.loop=true;gn.gain.value=.35;so.connect(gn).connect(MG);so.start();BGM=so}}
function audioOn(){UNL=1;loadSnd();try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(C){AC=new C();MG=AC.createGain();MG.gain.value=.7;MG.connect(AC.destination)}}if(AC&&AC.state!='running')AC.resume()}catch(e){}if(!BGMA&&!BGM&&BGMn)playBGM(BGMn,1)}
function SFX(n){
  if(MUTE||SKIP||!UNL)return;const tn=performance.now()/1000;if(SL[n]&&tn-SL[n]<.045)return;SL[n]=tn;const t0=AC?AC.currentTime:0;
  if(AUD[n]){try{AUD[n].play(vol(n))}catch(e){}return}
  if(BUF[n]){try{playBuf(n)}catch(e){}return}
  if(!AC)return;
  try{
    const tone=(type,f0,f1,d,v,dl)=>{const o=AC.createOscillator(),gn=AC.createGain(),st=t0+(dl||0);o.type=type;o.frequency.setValueAtTime(f0,st);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),st+d);gn.gain.setValueAtTime(v,st);gn.gain.exponentialRampToValueAtTime(.001,st+d);o.connect(gn).connect(MG);o.start(st);o.stop(st+d+.02)};
    const noise=(d,v,ft,fq,dl)=>{if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const c=NB.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1}const so=AC.createBufferSource(),fl=AC.createBiquadFilter(),gn=AC.createGain(),st=t0+(dl||0);so.buffer=NB;fl.type=ft;fl.frequency.value=fq;gn.gain.setValueAtTime(v,st);gn.gain.exponentialRampToValueAtTime(.001,st+d);so.connect(fl).connect(gn).connect(MG);so.start(st);so.stop(st+d+.02)};
    switch(n){
      case'hit':noise(.09,.35,'bandpass',1800);tone('square',260,90,.09,.12);break;
      case'tick':noise(.04,.12,'highpass',3000);break;
      case'heavy':noise(.3,.55,'lowpass',900);tone('sine',140,40,.32,.5);break;
      case'cast':tone('sine',420,980,.16,.12);break;
      case'ult':tone('sawtooth',90,420,1.3,.1);tone('sine',180,840,1.3,.12);noise(1.2,.12,'bandpass',1200);break;
      case'shoot':tone('triangle',900,320,.12,.1);break;
      case'cd':tone('sine',880,880,.14,.22);tone('sine',1760,1760,.08,.06);break;
      case'go':tone('square',523,1046,.4,.12);tone('sine',262,523,.4,.2);noise(.3,.2,'highpass',2000);break;
      case'vs':noise(.4,.4,'lowpass',600);tone('sine',90,40,.5,.5);break;
      case'ko':noise(.8,.5,'lowpass',700);tone('sine',220,30,1,.5);break;
      case'slam':noise(.45,.7,'lowpass',500);tone('sine',110,28,.55,.7);break;
      case'gulp':tone('sine',380,70,.4,.4);noise(.2,.2,'lowpass',500,.05);break;
      case'chew':noise(.07,.25,'lowpass',700);tone('square',120,80,.06,.08);break;
      case'spit':tone('triangle',220,900,.18,.25);break;
      case'gun':noise(.08,.5,'highpass',1200);tone('square',180,60,.08,.15);break;
      case'throw':noise(.18,.25,'bandpass',900);break;
      case'arrow':tone('triangle',700,300,.15,.15);noise(.12,.15,'highpass',3000);break;
      case'skillshot':tone('sawtooth',300,1200,.18,.1);noise(.15,.15,'bandpass',2000);break;
      case'knife':tone('sine',3200,2800,.25,.08);noise(.05,.15,'highpass',5000);break;
      case'slash':noise(.2,.35,'bandpass',2500);tone('sine',900,200,.18,.1);break;
      case'swing':noise(.3,.35,'bandpass',500);break;
      case'tstop':tone('sine',1400,90,1.1,.28);tone('sawtooth',70,28,1.5,.22);noise(1.1,.3,'lowpass',380);tone('sine',2600,2600,1.2,.07,.25);tone('triangle',1300,1300,1.2,.05,.25);break;
      case'beam':tone('sawtooth',220,110,.5,.12);noise(.5,.25,'highpass',1500);break;
      case'rush':noise(.05,.18,'bandpass',900);break;
      case'click':tone('sine',700,900,.06,.12);break;
    }
  }catch(e){}
}
let $=s=>document.querySelector(s),cv=$('#c'),g=cv.getContext('2d'),A=600,TAU=Math.PI*2;
const rnd=(a,b)=>a+Math.random()*(b-a),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),ang=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
let CIN=null,SLOW=0,zk=0,zx=300,zy=300,TSTOP=null,ACT=0;
const FD="'Russo One','Black Han Sans','Noto Sans KR',sans-serif",FB="'Noto Sans KR',sans-serif";let LDT=.016,MP=[];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),back=x=>{const c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
let W,H,S,ox,oy,k,dpr=1,last=0,clock=0;
let DEMO=null,DI=0,PAUSE=0,SKIP=0,SEL=[0,1,2],MODE=2,KO=null,MENU_T=0,TSIZE=8,TSEL=[],TOUR=null,TOURM=null,TM0=4.4,MAD=null,CF=[],cdN=0,vsd=0,AM=[],CH=[];
let F,B,Pt,T,FX,HZ,cine,bn,phase,tm,fight,shake,hs,ts,lock,win,endT,shown,cz,cfx,cfy;

function rs(){
  dpr=Math.min(devicePixelRatio||1,2.5);W=innerWidth;H=innerHeight;
  cv.width=W*dpr;cv.height=H*dpr;
  const hud=$('#hud'),mw=Math.min(W-20,900);
  hud.style.cssText='left:'+((W-mw)/2)+'px;width:'+mw+'px;top:10px';
  const hh=(hud.offsetHeight||84)+12;
  S=Math.max(200,Math.min(W-24,H-hh-24,1100));ox=(W-S)/2;
  const top=Math.max(10,(H-S-hh)/2);oy=top+hh;
  hud.style.cssText='left:'+((W-mw)/2)+'px;width:'+mw+'px;top:'+top+'px';
  k=S/A;
}
addEventListener('resize',rs);rs();

const ALT=(d,n)=>Object.assign({},d,n>1?d.alt2:d.alt,{name:d.name+' '+(n+1)+'P'});
function pickD(i){const n=SEL.slice(0,i).filter(x=>x==SEL[i]).length,d=DEF[SEL[i]];return n?ALT(d,n):d}
function tgt(f){let b=null,bd=1e9;for(const x of F){if(x==f||x.dead)continue;const d=dist(f,x)+(x.hid?600:0);if(d<bd){bd=d;b=x}}return b}
const DEF=[
{name:'김민채',gl:'채',k:'heavy',heavy:1,r:36,sp:160,col:'#ff6fa8',hi:'#ffd6e7',dk:'#5a1238',alt:{col:'#b05cff',hi:'#ecd4ff',dk:'#3a1460'},alt2:{col:'#ff9a3c',hi:'#ffe2c2',dk:'#5a2a08'},sk:[
  {n:'지진 쿵',w:.8,cd:8,tel:'ring',c:(o,t)=>dist(o,t)<250&&!t.hid,f:(o,t)=>{HZ.push({k:'quake',x:o.x,y:o.y,t:0,o,hit:0});o.sq=1;o.sa=Math.PI/2;shake=Math.max(shake,12);hs=.06;SFX('slam');FX.push({k:'crack',x:o.x,y:o.y,r:70,l:3,m:3});for(let i=0;i<12;i++)rockP(o.x,o.y,rnd(0,TAU),rnd(60,170));for(let i=0;i<8;i++)dustP(o.x,o.y,rnd(60,120))}},
  {n:'170kg 바디프레스',w:.8,cd:11,tel:'land',c:(o,t)=>dist(o,t)<380&&!t.hid,f:(o,t)=>{const r=o.r;o.jump={t:0,dur:.75,sx:o.x,sy:o.y,tx:clamp(t.x+t.dx*t.sp*.75,r,A-r),ty:clamp(t.y+t.dy*t.sp*.75,r,A-r)}}},
  {n:'한입에 꿀꺽',w:1.8,ult:1,c:(o,t)=>dist(o,t)<360&&!t.hid,f:(o,t)=>{t.jump=null;t.rush=0;t.cast=null;o.gulp={t:0,st:0,tg:t,x0:t.x,y0:t.y,n:0,c:0}}}]},
{name:'공병은',gl:'병',k:'gold',r:26,sp:215,col:'#3b74ff',hi:'#ffe08a',dk:'#0d1b4d',alt:{col:'#ff7a1a',hi:'#fff0b0',dk:'#4d1f05'},alt2:{col:'#2fd6a8',hi:'#d2fff1',dk:'#063d30'},sk:[
  {n:'Q 스킬샷',w:.8,cd:5,ind:1,f:(o,t)=>{const d=dist(o,t)/650;shoot(o,Math.atan2(t.y+t.dy*t.sp*d-o.y,t.x+t.dx*t.sp*d-o.x),650,12,'shot',0,9)}},
  {n:'스탠드 러시',w:.7,cd:11,aim:1,c:(o,t)=>dist(o,t)<330&&!t.hid,f:(o,t)=>{o.rush=1.1;o.rt=0;o.gg=0;o.ft2=0}},
  {n:'7단 콤보',w:1.8,ult:1,f:(o,t)=>{HZ.push({k:'floor',o,t:0,dur:4.05,nb:.45,dir:rnd(0,TAU),beats:0,fl:0})}}]},
{name:'박지성',gl:'지',k:'time',r:26,sp:205,col:'#ffc61a',hi:'#fff4b8',dk:'#4a3200',alt:{col:'#36d1a0',hi:'#d4fff0',dk:'#0b3d2e'},alt2:{col:'#ff5a5a',hi:'#ffd5d5',dk:'#4a0d0d'},sk:[
  {n:'킬브릭',w:.7,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>{const px=clamp(t.x+t.dx*t.sp*.7,0,A-1),py=clamp(t.y+t.dy*t.sp*.7,0,A-1),gx=Math.floor(px/60),gy=Math.floor(py/60),cl=[],ty=Math.floor(rnd(0,3));if(ty==0){for(let d=-2;d<=2;d++){cl.push([gx+d,gy]);if(d)cl.push([gx,gy+d])}}else if(ty==1){for(let x=0;x<10;x++)if(x!=Math.floor(rnd(0,10)))cl.push([x,gy])}else{for(let y=0;y<10;y++)if(y!=Math.floor(rnd(0,10)))cl.push([gx,y])}HZ.push({k:'kb',o,t:0,tel:.8,act:.9,hs:[],cells:cl.filter(([x,y])=>x>=0&&x<10&&y>=0&&y<10).map(([x,y])=>[x*60,y*60])});SFX('click')}},
  {n:'해골 블래스터',w:.7,cd:10,c:(o,t)=>!t.hid,f:(o,t)=>{for(let i=0;i<2;i++){const ch=.6+i*.25,px=t.x+t.dx*t.sp*ch,py=t.y+t.dy*t.sp*ch,a=rnd(0,TAU),x=clamp(px+Math.cos(a)*190,30,A-30),y=clamp(py+Math.sin(a)*190,30,A-30);HZ.push({k:'blaster',o,t:0,ch,x,y,a0:Math.atan2(py-y,px-x),fired:0,hit:0})}}},
  {n:'시간 정지',w:1.8,ult:1,f:(o,t)=>{TSTOP={o,t:0,dur:2.6,kn:[],tp:0};o.gcd=3.6;FX.push({k:'tss',x:o.x,y:o.y,l:.8,m:.8});SFX('tstop')}}]},
{name:'김티비',gl:'티',k:'gun',r:26,sp:210,col:'#ff4d6d',hi:'#ffd0d8',dk:'#4a0a16',alt:{col:'#22e5d6',hi:'#d2fffb',dk:'#06403c'},alt2:{col:'#c8ccd8',hi:'#ffffff',dk:'#2a2d36'},sk:[
  {n:'풀오토 사격',w:.6,cd:6,aim:1,c:(o,t)=>dist(o,t)<420&&!t.hid,f:(o,t)=>{o.auto=1.4;o.at=0}},
  {n:'채팅 도배',w:.7,cd:9,c:(o,t)=>!t.hid,f:(o,t)=>{const dx=t.x-o.x,dy=t.y-o.y,ax=Math.abs(dx)>Math.abs(dy)?1:0,sg=(ax?dx:dy)>0?1:-1;HZ.push({k:'wall',o,t:0,ax,sg,x0:sg>0?-40:A+40,pos:sg>0?-40:A+40,hs:[]});SFX('cast')}},
  {n:'풀 버스트',w:1.8,ult:1,f:(o,t)=>{F.filter(x=>x!=o&&!x.dead).forEach(e=>HZ.push({k:'lock',o,e,t:0,ch:1.1,fired:0}))}}]},
{name:'김가은',gl:'가',k:'ink',r:26,sp:205,col:'#7bdc3c',hi:'#eaffd6',dk:'#1d3b0a',alt:{col:'#ff9f1c',hi:'#ffe9c7',dk:'#4a2a00'},alt2:{col:'#a78bfa',hi:'#efe9ff',dk:'#2a1a5a'},sk:[
  {n:'직업 스킬',w:.7,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>JOB(o,t)},
  {n:'잉크 드로잉',w:.7,cd:9,c:(o,t)=>!t.hid,f:(o,t)=>{const px=t.x+t.dx*t.sp*.6,py=t.y+t.dy*t.sp*.6,a=Math.atan2(py-o.y,px-o.x),L=Math.hypot(px-o.x,py-o.y)+170,sd=rnd(-1,1)*60,P0=[o.x+Math.cos(a)*30,o.y+Math.sin(a)*30],P2=[o.x+Math.cos(a)*L,o.y+Math.sin(a)*L],P1=[(P0[0]+P2[0])/2-Math.sin(a)*sd,(P0[1]+P2[1])/2+Math.cos(a)*sd],pts=[];for(let i=0;i<=24;i++){const u=i/24,v=1-u;pts.push([clamp(v*v*P0[0]+2*v*u*P1[0]+u*u*P2[0],5,A-5),clamp(v*v*P0[1]+2*v*u*P1[1]+u*u*P2[1],5,A-5)])}HZ.push({k:'ink',o,t:0,pts,hs:[]});SFX('cast')}},
  {n:'웹툰 컷',w:1.8,ult:1,f:(o,t)=>{HZ.push({k:'toon',o,t:0,step:0})}}]},
{name:'흉악범',gl:'범',k:'rose',r:25,sp:225,col:'#e0245e',hi:'#ffd3e0',dk:'#3d0718',alt:{col:'#d4af37',hi:'#fff3c4',dk:'#3a2a05'},alt2:{col:'#7c5cff',hi:'#e6e0ff',dk:'#1e1250'},sk:[
  {n:'트릭 카드',w:.6,cd:6.5,aim:1,c:(o,t)=>!t.hid,f:(o,t)=>{const a=ang(o,t);for(let i=-2;i<=2;i++)B.push({x:o.x,y:o.y,vx:Math.cos(a+i*.32)*560,vy:Math.sin(a+i*.32)*560,a:a+i*.32,o,dmg:5,k:'card',slow:0,r:15,age:0,D:o.d,boom:1,hs:[]});SFX('throw')}},
  {n:'사라지는 마술',w:.5,cd:9,c:(o,t)=>!t.hid&&!t.jump&&dist(o,t)<420,f:(o,t)=>{HZ.push({k:'decoy',o,x:t.x,y:t.y,tg:t,t:0,dur:.9,boom:0});FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.5,m:.5});for(let i=0;i<14;i++){const b=rnd(0,TAU);petalP(o.x,o.y,Math.cos(b)*130,Math.sin(b)*130)}const a=Math.atan2(t.dy,t.dx);o.x=clamp(t.x-Math.cos(a)*(t.r+o.r+6),o.r,A-o.r);o.y=clamp(t.y-Math.sin(a)*(t.r+o.r+6),o.r,A-o.r);for(let i=0;i<14;i++){const b=rnd(0,TAU);petalP(o.x,o.y,Math.cos(b)*130,Math.sin(b)*130)}FX.push({k:'slash',x:t.x,y:t.y,a:a+Math.PI/2,c:o.d.col,l:.35,m:.35});hurt(t,6,o,t.x,t.y,0,1);ft(t.x,t.y-t.r-40,'뒤를 조심해','#ff5c8a',22);SFX('slash')}},
  {n:'매드무비',w:1.8,ult:1,f:(o,t)=>{MAD={o,t:0,cuts:0,kf:[]};o.gcd=5;SFX('ult')}}]},
{name:'김건우',gl:'건',k:'monkey',r:23,sp:245,master:1,col:'#c07a32',hi:'#ffe7a3',dk:'#3d2108',alt:{col:'#2bb3a0',hi:'#d6fff8',dk:'#063a33'},alt2:{col:'#9aa3b5',hi:'#ffffff',dk:'#242832'},sk:[
  {n:'바나나 트랩',w:.6,cd:8,c:(o,t)=>!t.hid,f:(o,t)=>{for(let i=0;i<3;i++){const dl=.5+i*.35;HZ.push({k:'nana',o,t:0,x0:o.x,y0:o.y,x:clamp(t.x+t.dx*t.sp*dl+rnd(-30,30),20,A-20),y:clamp(t.y+t.dy*t.sp*dl+rnd(-30,30),20,A-20),fl:.35+i*.06,life:6})}SFX('throw')}},
  {n:'연막 원탭',w:.6,cd:10,c:(o,t)=>!t.hid&&dist(o,t)<460,f:(o,t)=>{HZ.push({k:'smoke',o,t:0,x:clamp(t.x,40,A-40),y:clamp(t.y,40,A-40),r:85,dur:3,shot:0})}},
  {n:'몽키 레이드',w:1.8,ult:1,f:(o,t)=>{const EN=F.filter(x=>x!=o&&!x.dead);for(let i=0;i<7;i++){const e=EN[i%EN.length],a=rnd(0,TAU);HZ.push({k:'ape',o,e,t:-i*.2,sx:clamp(e.x+Math.cos(a)*420,-40,A+40),sy:clamp(e.y+Math.sin(a)*420,-40,A+40),dur:.55,hit:0})}}}]},
{name:'김민채 • 각성',gl:'채',k:'magma',heavy:2,vof:0,r:40,sp:130,col:'#ff5a1f',hi:'#ffd27a',dk:'#2a0d05',alt:{col:'#ff2e63',hi:'#ffc2d1',dk:'#2a0510'},alt2:{col:'#7a5cff',hi:'#d9d0ff',dk:'#150a33'},sk:[
  {n:'용암 분출',w:.8,cd:9,tel:'line',c:(o,t)=>!t.hid,f:(o,t)=>{const a=Math.atan2(t.y+t.dy*t.sp*.6-o.y,t.x+t.dx*t.sp*.6-o.x),sp=[];for(let i=0;i<4;i++){const d=o.r+60+i*85;sp.push({x:clamp(o.x+Math.cos(a)*d,30,A-30),y:clamp(o.y+Math.sin(a)*d,30,A-30),dl:.35+i*.18,done:0})}HZ.push({k:'gey',o,t:0,sp,hs:[]});SFX('cast')}},
  {n:'1700kg 운석 낙하',w:.6,cd:14,c:(o,t)=>!t.hid,f:(o,t)=>{o.lp={t:0,tg:t};FX.push({k:'pillar',x:o.x,y:o.y,c:o.d.col,l:.6,m:.6});SFX('slam');shake=Math.max(shake,8)}},
  {n:'지옥의 아가리',w:1.8,ult:1,f:(o,t)=>{F.filter(x=>x!=o&&!x.dead).forEach(e=>HZ.push({k:'maw',o,e,t:0,x:e.x,y:e.y,done:0}))}}]},
{name:'공병은 • 곤지암병은',gl:'곤',k:'horror',vof:1,r:26,sp:210,col:'#8fd6bd',hi:'#effff8',dk:'#06231a',alt:{col:'#d0283e',hi:'#ffd5db',dk:'#2b050b'},alt2:{col:'#9b7bff',hi:'#ece6ff',dk:'#170d3a'},sk:[
  {n:'빈 휠체어',w:.6,cd:6,c:(o,t)=>!t.hid,f:(o,t)=>hWheel(o,t)},
  {n:'저주 표식',w:.6,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>hCurse(o,t)},
  {n:'정전 병동',w:1.8,ult:1,f:(o,t)=>hWard(o,t)}]},
{name:'박지성 • 해버지',gl:'해',k:'soccer',vof:2,r:26,sp:215,col:'#e62635',hi:'#ffe4e6',dk:'#3d0509',alt:{col:'#2d6bff',hi:'#dbe6ff',dk:'#0a1a4a'},alt2:{col:'#1fbf6a',hi:'#d8ffe9',dk:'#06361d'},sk:[
  {n:'중거리 슛',w:.6,cd:5.5,aim:1,c:(o,t)=>!t.hid,f:(o,t)=>fKick(o,t)},
  {n:'산소탱크',w:.5,cd:9,c:(o,t)=>!t.hid&&dist(o,t)<480,f:(o,t)=>fTank(o,t)},
  {n:'해버지 슈퍼골',w:1.8,ult:1,f:(o,t)=>fGoal(o,t)}]}
];
function JOB(o,t){
  const J=['체어맨','메딕','아처','파이어맨'];let j=o.job%4;if(j==1&&o.hp>80)j=2;o.job=j+1;
  FX.push({k:'badge',x:o.x,y:o.y-o.r-46,txt:J[j],c:o.d.col,l:1.6,m:1.6});bn={txt:'직업 · '+J[j],d:o.d,side:o.i,t:0};
  if(j==0){const d=dist(o,t);if(d>110){const a=ang(o,t),L=Math.min(d-70,170);FX.push({k:'ghost',x:o.x,y:o.y,r:o.r,c:o.d.col,l:.4,m:.4});o.x=clamp(o.x+Math.cos(a)*L,o.r,A-o.r);o.y=clamp(o.y+Math.sin(a)*L,o.r,A-o.r)}o.swing={t:0,a:ang(o,t),hit:0};SFX('swing')}
  else if(j==1){const hv=Math.min(18,100-o.hp);o.hp+=hv;ft(o.x,o.y-o.r-10,'+'+Math.round(hv),'#7bff8a',26);ring(o.x,o.y,o.r,o.r+60,'#7bff8a',6,.5);for(let i=0;i<14;i++)Pt.push({x:o.x+rnd(-24,24),y:o.y+rnd(-10,20),vx:rnd(-20,20),vy:rnd(-110,-50),l:rnd(.6,1),m:1,sh:12,col:i%2?'#7bff8a':'#ffffff',r:rnd(4,7),fr:.5});SFX('spit')}
  else if(j==2){const a=ang(o,t);for(let i=-1;i<=1;i++)shoot(o,a+i*.12,650,7,'arrow',0,8)}
  else{o.br=1;o.ba=ang(o,t);o.bt2=0;o.bk='gas'}
}
const INFO={
'김민채':{st:[7,10,3,3,8,8],p:'170kg · 받는 피해 25% 감소 · 부딪히면 상대만 튕겨 나감',sk:[['11','제자리 땅 찍기 · 지진파가 퍼지며 맞으면 기절'],['15','점프해서 상대 위치에 착지 · 범위 피해 + 기절'],['5×3+3','입을 벌려 빨아들이고 삼킨 뒤 세 번 씹고 뱉기']]},
'공병은':{st:[8,5,8,8,5,7],p:'',sk:[['12','롤 스킬샷 · 바닥 범위 표시 후 빠른 화살'],['2×연타','스탠드 소환 · 붙어서 주먹 연타'],['3×6+10','바닥이 미끄러지고 비트마다 피해(7번) · 마지막 DROP']]},
'박지성':{st:[6,5,7,8,8,7],p:'',sk:[['12','바닥 격자 경고 후 빨간 킬브릭이 솟음'],['9','해골포 2개가 조준 후 빔 발사'],['1.5×16','시간 정지 · 칼을 겹겹이 깔고 시간 재개']]},
'김티비':{st:[7,4,7,9,6,8],p:'',sk:[['2×연사','1.4초 동안 예광탄 연사'],['12','채팅 말풍선 벽이 아레나를 휩쓸며 밀어냄'],['24','LOCK 조준 후 레일건 한 방']]},
'김가은':{st:[6,7,6,5,6,8],p:'',sk:[['직업별','체어맨 휘두르기 14 · 메딕 회복 18 · 아처 7×3 · 파이어맨 소화기'],['13','펜으로 붓선을 그은 뒤 선 전체가 터짐'],['7+7+12','만화 세 칸이 차례로 터지며 전체 공격']]},
'흉악범':{st:[6,4,8,7,6,9],p:'',sk:[['5×5장','카드 5장을 부채꼴로 던지고 부메랑처럼 회수'],['6+7','뒤로 순간이동해 베고 상대 몸에 장미 폭탄'],['7×5발','매드무비 · 5발 중 맞힌 만큼 킬 · 5킬이면 ACE']]},
'김건우':{st:[6,5,10,6,5,6],p:'니케 스승 · 김티비 상대로 피해 25% 증가',sk:[['6','바나나 껍질 3개 설치 · 밟으면 미끄러짐'],['14','연막을 깔고 그 안의 상대에게 헤드샷'],['3×7','원숭이 7마리가 사방에서 덮침']]},
'김민채 • 각성':{st:[9,9,2,6,9,8],p:'1700kg · 모든 피해 20% 감소 · 부딪히면 화상',sk:[['10','앞으로 용암 기둥 4개가 차례로 분출'],['10+웅덩이','하늘로 솟구쳤다가 상대 위로 낙하 · 용암 웅덩이 생성'],['17','상대 발밑에서 용암 아가리가 솟아 물어뜯음 · 체력 조금 회복']]},
'공병은 • 곤지암병은':{st:[7,5,7,8,7,8],p:'폐병원의 기운 · 어디선가 삐걱거리는 소리',sk:[['12','주인 없는 휠체어가 혼자 굴러가 쫓아가서 들이받음 · 잠깐 기절'],['14','상대 발밑에 저주 표식이 따라붙고 3초 뒤 터짐 · 둔화'],['3×N+12','형광등이 칸마다 꺼졌다 켜짐 · 꺼진 칸에 서 있으면 계속 피해 · 마지막에 전등이 전부 깨짐']]},
'박지성 • 해버지':{st:[7,6,9,8,5,8],p:'산소탱크 · 두 개의 심장',sk:[['12','벽에 두 번까지 튕기는 중거리 슛'],['10+4','멈추지 않는 질주로 쫓아가 태클 · 맞으면 기절'],['24','공을 띄워 저글링한 뒤 휘어지는 슈퍼골 · 골대까지 날려버림']]}
};
const baseOf=i=>DEF[i]&&DEF[i].vof!=null?DEF[i].vof:i;
const VARS=i=>{const b=baseOf(i);return[b,...DEF.map((d,j)=>j).filter(j=>DEF[j].vof===b)]};
const GL=['炎','氷','雷','龍'];
const ICC={};
function ICON(d,sz){
  const key=d.name+d.col+sz;if(ICC[key])return ICC[key];
  const c=document.createElement('canvas');c.width=c.height=sz*2;const pg=g,ph=phase;g=c.getContext('2d');phase='icon';
  try{g.scale(2,2);g.translate(sz/2,sz/2);g.scale(sz/84,sz/84);ball({d,i:0,x:0,y:-4,r:26,dead:0,hid:0,dash:0,tr:[],jump:null,rush:0,cast:null,flash:0,slow:0,sq:0,sa:0,fat:0,gulp:null,rot:0,shield:0,sf:0},{x:1,y:0})}finally{g=pg;phase=ph}
  return ICC[key]=c;
}
function paintIc(el,d,sz){if(!el||!d)return;el.width=el.height=sz*2;const x=el.getContext('2d');x.clearRect(0,0,sz*2,sz*2);x.drawImage(ICON(d,sz),0,0)}
function buildHUD(){
  document.body.classList.toggle('ten',F.length>3);if(F.length>3){CH=[];rs();return}
  $('#p2').style.display=F.length>2?'':'none';$('#p1').classList.toggle('r',F.length==2);
  CH=F.map((f,i)=>{
    const d=f.d,P=$('#p'+i);P.style.setProperty('--c',d.col);P.style.setProperty('--h',d.hi);P.classList.remove('dead');
    $('#p'+i+' .nm b').textContent=d.name;paintIc($('#p'+i+' .ic'),d,34);
    $('#p'+i+' .sk').innerHTML=d.sk.map((s,j)=>`<div class="chip${s.ult?' u':''}"><s></s><span>${s.ult?'ULT':j+1}</span></div>`).join('');
    return[...document.querySelectorAll('#p'+i+' .chip s')];
  });
  rs();
}
function init(){
  const SP=MODE>3?Array.from({length:MODE},(_,i)=>{const a=i*TAU/MODE-Math.PI/2;return[A/2+Math.cos(a)*A*.37,A/2+Math.sin(a)*A*.37]}):MODE==3?[[300,140],[140,440],[460,440]]:[[150,300],[450,300]];F=SEL.slice(0,MODE).map((di,i)=>{const d=pickD(i),[sx,sy]=SP[i];let a;do{a=rnd(0,TAU)}while(Math.abs(Math.cos(a))<.3||Math.abs(Math.sin(a))<.3||Math.cos(a-Math.atan2(A/2-sy,A/2-sx))>.8);return{d,i,x:sx,y:sy,dx:Math.cos(a),dy:Math.sin(a),hp:100,show:100,r:d.r||26,sp:d.sp||200,cds:d.sk.map(s=>s.ult?rnd(11,14):rnd(1.5,3.5)),gcd:1.5,shield:0,slow:0,dash:0,hit:0,tr:[],flash:0,dead:0,sq:0,sa:0,rot:0,cast:null,sf:0,frz:0,burn:0,bt:0,stn:0,br:0,ba:0,bt2:0,bk:'',auto:0,slide:0,swing:null,lp:null,at:0,job:0,ug:0,rush:0,rt:0,gg:0,jump:null,gulp:null,hid:0}});
  TSTOP=null;MAD=null;KO=null;SLOW=0;zk=0;B=[];Pt=[];T=[];FX=[];HZ=[];cine=0;bn=null;phase='cd';tm=4.4;cdN=0;vsd=0;fight=0;shake=0;hs=0;ts=1;lock=0;win=null;endT=0;shown=0;cz=1;cfx=A/2;cfy=A/2;
  $('#msg').className='';buildHUD();AM=Array.from({length:12},()=>({x:rnd(0,A),y:rnd(0,A),r:rnd(1.5,3.5),s:rnd(10,35),p:rnd(0,TAU),c:Math.random()<.5?0:1}));
}

const PAL={magma:['#fff3c4','#ffd27a','#ff8a2c','#ff3d0a','#5a1204'],gas:['#ffffff','#f1f4f8','#d5dbe4','#aab3c2'],heart:['#ffffff','#ffd1e6','#ff8cc2','#ff5fa2','#a0205e'],gold:['#ffffff','#fff3c0','#ffe08a','#5a9bff','#2f6bff'],fire:['#fff6d0','#ffd36b','#ff8a2c','#e4482a','#7a1d12'],drg:['#f2ffe8','#9dffb8','#2fd67e','#138a52','#0b3b25'],ice:['#ffffff','#d6f3ff','#8fd3f5','#3f9bd0'],elec:['#ffffff','#fff3a0','#ffe45c','#b48cff']};
const SPR={};
function spr(c,soft){
  const key=c+(soft?'s':'');if(SPR[key])return SPR[key];
  const o=document.createElement('canvas');o.width=o.height=64;const x=o.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
  if(soft){gr.addColorStop(0,c+'cc');gr.addColorStop(.5,c+'55');gr.addColorStop(1,c+'00')}
  else{gr.addColorStop(0,c+'ff');gr.addColorStop(.3,c+'cc');gr.addColorStop(.62,c+'40');gr.addColorStop(1,c+'00')}
  x.fillStyle=gr;x.fillRect(0,0,64,64);return SPR[key]=o;
}
function glow(c,x,y,r,a){if(r<=0||a<=0)return;g.globalAlpha=a;g.drawImage(spr(c),x-r,y-r,r*2,r*2)}
function emit(rate,dt,fn){let n=rate*dt;while(n>=1){fn();n--}if(Math.random()<n)fn()}
function fireP(x,y,vx,vy,r,l,pal){Pt.push({x,y,vx,vy,l,m:l,gl:1,sh:4,pal:pal||PAL.fire,r,gr:-r*.8/l,gy:-90,fr:.2})}
function smokeP(x,y,r,l){Pt.push({x,y,vx:rnd(-15,15),vy:rnd(-30,-10),l,m:l,sh:3,col:'#26252b',r,gr:22,a0:.42,fr:.3})}
function emberP(x,y,col){const l=rnd(.5,1);Pt.push({x,y,vx:rnd(-70,70),vy:rnd(-150,-40),l,m:l,gl:1,sh:6,col,r:rnd(1.2,2.4),gy:-20,fr:.5})}
function mistP(x,y,r,l){Pt.push({x,y,vx:rnd(-20,20),vy:rnd(-20,20),l,m:l,gl:1,sh:4,pal:PAL.ice,r,gr:18,a0:.35,fr:.2})}
function shardP(x,y,vx,vy,r){const l=rnd(.5,.9);Pt.push({x,y,vx,vy,l,m:l,sh:1,col:['#e3f6ff','#a6dcf5','#5fb8e6'][Math.floor(rnd(0,3))],r,rot:rnd(0,TAU),vr:rnd(-10,10),gy:380,fr:.3})}
function snowP(x,y){const l=rnd(.6,1.2);Pt.push({x,y,vx:rnd(-25,25),vy:rnd(-10,25),l,m:l,sh:6,col:'#ffffff',r:rnd(1.2,2.2),fr:.4})}
function zapP(x,y,a,s){const l=rnd(.15,.3);Pt.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l,m:l,gl:1,sh:5,col:Math.random()<.5?'#ffffff':'#ffe45c',r:2.2,fr:.02})}
function heartPath(){g.beginPath();g.moveTo(0,6);g.bezierCurveTo(-12,-2,-10,-12,-4,-12);g.bezierCurveTo(-1,-12,0,-9,0,-7);g.bezierCurveTo(0,-9,1,-12,4,-12);g.bezierCurveTo(10,-12,12,-2,0,6);g.closePath()}
function heartP(x,y,vx,vy,r,col){const l=rnd(.5,.9);Pt.push({x,y,vx,vy,l,m:l,sh:7,col,r,rot:rnd(-1,1),vr:rnd(-2,2),gy:-30,fr:.3})}
function sparkP(x,y,vx,vy,col,r){const l=rnd(.3,.6);Pt.push({x,y,vx,vy,l,m:l,gl:1,sh:8,col,r,rot:rnd(0,TAU),vr:rnd(-4,4),fr:.3})}
function cubeP(x,y,a,v,col){const l=rnd(1,1.6);Pt.push({x,y,z:rnd(0,10),vz:rnd(200,440),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,cube:1,r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-12,12),col,fr:.5})}
function rockP(x,y,a,v){const l=rnd(1,1.6);Pt.push({x,y,z:rnd(0,10),vz:rnd(180,420),vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,sh:10,r:rnd(3,7),rot:rnd(0,TAU),vr:rnd(-12,12),col:['#3a3f4c','#4a5060','#2b3039'][Math.floor(rnd(0,3))],fr:.5})}
function dustP(x,y,v){const a=rnd(0,TAU),l=rnd(.7,1.3);Pt.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.6,l,m:l,sh:3,col:'#8d8576',r:rnd(10,18),gr:40,a0:.5,fr:.15})}
function neon(D,w,draw){g.save();g.lineCap='round';g.lineJoin='round';g.globalCompositeOperation='lighter';g.strokeStyle=D.col;g.globalAlpha=.5;g.lineWidth=w*2.8;draw();g.stroke();g.restore();g.save();g.lineCap='round';g.lineJoin='round';g.strokeStyle=D.hi;g.lineWidth=w;draw();g.stroke();g.restore()}
function petalP(x,y,vx,vy){const l=rnd(.7,1.2);Pt.push({x,y,vx,vy,l,m:l,sh:13,col:['#e0245e','#b0103a','#ff5c8a'][Math.floor(rnd(0,3))],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-8,8),gy:40,fr:.4})}
function goldG(y0,y1){const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,'#fff6d0');gr.addColorStop(.45,'#f2c94c');gr.addColorStop(.55,'#b8860b');gr.addColorStop(1,'#ffe9a3');return gr}
function poly(pts){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath()}
function jag(x1,y1,x2,y2,n,amp){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,o=[[x1,y1]];for(let i=1;i<n;i++){const q=rnd(-1,1)*amp;o.push([x1+dx*i/n+nx*q,y1+dy*i/n+ny*q])}o.push([x2,y2]);return o}
function segD(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,L=dx*dx+dy*dy||1,u=clamp(((px-ax)*dx+(py-ay)*dy)/L,0,1);return Math.hypot(px-ax-dx*u,py-ay-dy*u)}
function dpos(h,q){const w=Math.sin(q*.028+h.ph)*18;return[h.sx+h.ux*q-h.uy*w,h.sy+h.uy*q+h.ux*w]}
const GROUND=k=>k=='scorch'||k=='frost'||k=='spk'||k=='crack';
function GUST(o,t){
  let rf=0;
  B.forEach(q=>{if(q.o!=o&&dist(q,o)<240){q.o=o;q.rf=1;const a=ang(q,t),v=Math.hypot(q.vx,q.vy)*1.15;q.vx=Math.cos(a)*v;q.vy=Math.sin(a)*v;q.a=a;rf=1;ring(q.x,q.y,4,40,'#b9ffcf',4,.3)}});
  if(dist(o,t)<210&&!t.dead){const a=ang(o,t);t.dx=Math.cos(a);t.dy=Math.sin(a);t.dash=0;hurt(t,6,o,t.x,t.y,0,0)}
  FX.push({k:'gust',x:o.x,y:o.y,a:rnd(0,TAU),l:.55,m:.55});
  for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(200,420),l=rnd(.3,.5);Pt.push({x:o.x+Math.cos(a)*30,y:o.y+Math.sin(a)*30,vx:Math.cos(a+1.2)*v,vy:Math.sin(a+1.2)*v,l,m:l,gl:1,sh:5,col:i%2?'#ffffff':'#b9ffcf',r:2.5,fr:.05})}
  if(rf)ft(o.x,o.y-o.r-26,'반사!','#b9ffcf',18);
}
function trail(q,dt){
  if(TRL[q.k]){TRL[q.k](q,dt);return}
  const bx=-q.vx*.12,by=-q.vy*.12;
  if(q.k=='flame'){
    emit(110,dt,()=>fireP(q.x+rnd(-4,4),q.y+rnd(-4,4),bx+rnd(-35,35),by+rnd(-35,35),rnd(9,15),rnd(.25,.45)));
    emit(14,dt,()=>smokeP(q.x,q.y,rnd(6,10),rnd(.6,1)));emit(18,dt,()=>emberP(q.x,q.y,'#ffd36b'));
  }else if(q.k=='lance'){
    emit(50,dt,()=>mistP(q.x-q.vx*.03+rnd(-3,3),q.y-q.vy*.03+rnd(-3,3),rnd(7,11),rnd(.3,.5)));
    emit(18,dt,()=>shardP(q.x,q.y,bx*.5+rnd(-30,30),by*.5+rnd(-30,30),rnd(1.5,3)));emit(20,dt,()=>snowP(q.x,q.y));
  }else if(q.k=='bolt'){
    emit(60,dt,()=>zapP(q.x,q.y,rnd(0,TAU),rnd(80,220)));
    emit(30,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.18,m:.18,gl:1,sh:4,pal:PAL.elec,r:rnd(10,14)}));
  }else if(q.k=='shot'){
    emit(70,dt,()=>{const l=rnd(.15,.3);Pt.push({x:q.x,y:q.y,vx:-q.vx*.2+rnd(-30,30),vy:-q.vy*.2+rnd(-30,30),l,m:l,gl:1,sh:5,col:Math.random()<.5?q.D.hi:'#ffffff',r:2,fr:.1})});
    emit(40,dt,()=>Pt.push({x:q.x,y:q.y,vx:0,vy:0,l:.22,m:.22,gl:1,sh:4,pal:['#ffffff',q.D.hi,q.D.col],r:rnd(9,13)}));
  }else if(q.k=='heart'){
    emit(30,dt,()=>sparkP(q.x+rnd(-6,6),q.y+rnd(-6,6),rnd(-20,20),rnd(-20,20),'#fff0f7',rnd(1.5,3)));
    emit(10,dt,()=>heartP(q.x,q.y,rnd(-20,20),rnd(-40,-10),rnd(2.5,4),q.D.hi));
  }else if(q.k=='card'){
    emit(16,dt,()=>petalP(q.x,q.y,rnd(-30,30),rnd(-30,30)));
  }else if(q.k=='tracer'||q.k=='chat'||q.k=='hs'){
  }else emit(30,dt,()=>Pt.push({x:q.x,y:q.y,vx:rnd(-20,20),vy:rnd(-20,20),l:.35,m:.35,sh:0,rot:0,vr:0,col:q.D.hi,r:3}));
}
let FL=null;
function floor(){
  if(FL)return FL;FL=document.createElement('canvas');FL.width=FL.height=A*2;const x=FL.getContext('2d');x.scale(2,2);
  x.fillStyle='#10131a';x.fillRect(0,0,A,A);
  const ts=75;
  for(let i=0;i<Math.ceil(A/75);i++)for(let j=0;j<Math.ceil(A/75);j++){
    const v=((i*37+j*91)%7)/7;x.fillStyle='rgb('+Math.round(27+v*8)+','+Math.round(32+v*8)+','+Math.round(42+v*9)+')';x.fillRect(i*ts+2,j*ts+2,ts-4,ts-4);
    x.fillStyle='rgba(255,255,255,.045)';x.fillRect(i*ts+2,j*ts+2,ts-4,3);x.fillRect(i*ts+2,j*ts+2,3,ts-4);
    x.fillStyle='rgba(0,0,0,.35)';x.fillRect(i*ts+2,j*ts+ts-5,ts-4,3);x.fillRect(i*ts+ts-5,j*ts+2,3,ts-4);
    if((i*13+j*7)%5==0){x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=1.5;x.beginPath();let cx=i*ts+12+((i*j*17)%46),cy=j*ts+10;x.moveTo(cx,cy);for(let q=0;q<4;q++){cx+=((i+q*7)%9)-4;cy+=12+((j+q)%4)*3;x.lineTo(cx,cy)}x.stroke()}
  }
  x.strokeStyle='rgba(255,255,255,.06)';x.lineWidth=3;x.beginPath();x.arc(A/2,A/2,92,0,TAU);x.stroke();
  x.lineWidth=1.5;x.beginPath();x.arc(A/2,A/2,80,0,TAU);x.stroke();
  for(let i=0;i<12;i++){const a=i*TAU/12,r2=i%3?88:104;x.beginPath();x.moveTo(A/2+Math.cos(a)*80,A/2+Math.sin(a)*80);x.lineTo(A/2+Math.cos(a)*r2,A/2+Math.sin(a)*r2);x.stroke()}
  const lg=x.createRadialGradient(A/2,A/2,40,A/2,A/2,A*.7);lg.addColorStop(0,'rgba(120,140,190,.10)');lg.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=lg;x.fillRect(0,0,A,A);
  return FL;
}
function shoot(o,a,sp,dmg,kind,slow,r){SFX({shot:'skillshot',tracer:'gun',hs:'gun',arrow:'arrow',chair:'throw',card:'throw'}[kind]||'throw');
  B.push({x:o.x+Math.cos(a)*o.r,y:o.y+Math.sin(a)*o.r,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,a,o,dmg,k:kind,slow,r,age:0,D:o.d});
}
function spark(x,y,kind,n,sp){
  for(let i=0;i<n;i++){
    const a=rnd(0,TAU),v=rnd(.2,1)*sp,vx=Math.cos(a)*v,vy=Math.sin(a)*v;
    if(kind=='fire'||kind=='drg'||kind=='magma'){
      const pal=PAL[kind];fireP(x,y,vx*.7,vy*.7,rnd(8,16),rnd(.3,.6),pal);
      if(i%3==0)smokeP(x+vx*.05,y+vy*.05,rnd(6,11),rnd(.6,1.1));
      if(i%2==0){const l=rnd(.3,.6);Pt.push({x,y,vx:vx*1.3,vy:vy*1.3,l,m:l,gl:1,sh:5,col:pal[1],r:2,fr:.08,gy:60})}
    }else if(kind=='ice'){
      if(i%2==0)shardP(x,y,vx,vy-60,rnd(3,7));else mistP(x+vx*.04,y+vy*.04,rnd(8,15),rnd(.4,.7));
      if(i%3==0)snowP(x,y);
    }else if(kind=='heavy'){
      if(i%2==0)rockP(x,y,a,v*.5);else dustP(x,y,v*.25);
      if(i%4==0)Pt.push({x,y,vx:0,vy:0,l:.3,m:.3,gl:1,sh:4,pal:PAL.heart,r:rnd(10,18)});
    }else if(kind=='heart'){
      if(i%2==0)heartP(x,y,vx*.8,vy*.8-40,rnd(5,9),['#ff5fa2','#ff8cc2','#ffd1e6'][i%3]);else sparkP(x,y,vx,vy,'#fff0f7',rnd(2,4));
      if(i%3==0)Pt.push({x,y,vx:vx*.3,vy:vy*.3,l:.35,m:.35,gl:1,sh:4,pal:PAL.heart,r:rnd(8,14)});
    }else if(kind=='rose'){
      petalP(x,y,vx*.8,vy*.8);if(i%3==0)sparkP(x,y,vx*.3,vy*.3,'#ffd3e0',rnd(2,4));
    }else if(kind=='ink'){
      const l=rnd(.5,.9);Pt.push({x,y,vx:vx*.8,vy:vy*.8,l,m:l,sh:6,col:i%3?'#0c0c10':'#9be36b',r:rnd(2,5),fr:.12});
    }else if(kind=='gold'||kind=='time'||kind=='gun'||kind=='monkey'){
      const l=rnd(.2,.4);Pt.push({x,y,vx:vx*1.5,vy:vy*1.5,l,m:l,gl:1,sh:5,col:i%2?'#ffe08a':'#7fb0ff',r:2.4,fr:.05});
      if(i%3==0)sparkP(x,y,vx*.3,vy*.3,'#fff3c0',rnd(3,5));
      if(i%4==0)Pt.push({x,y,vx:0,vy:0,l:.25,m:.25,gl:1,sh:4,pal:PAL.gold,r:rnd(10,18)});
    }else if(kind=='elec'){
      zapP(x,y,a,v*1.6);if(i%3==0)Pt.push({x,y,vx:vx*.3,vy:vy*.3,l:.25,m:.25,gl:1,sh:4,pal:PAL.elec,r:rnd(8,16)});
    }else{
      const l=rnd(.4,.8);Pt.push({x,y,vx,vy,l,m:l,sh:2,col:'#8b93a6',r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-8,8),gy:200});
      if(i%3==0)smokeP(x,y,rnd(5,9),.6);
    }
  }
  if(Pt.length>900)Pt.splice(0,Pt.length-900);
}
function ring(x,y,r0,r1,col,w,l){FX.push({k:'ring',x,y,r0,r1,col,w,l,m:l})}
function ft(x,y,txt,col,size){T.push({x,y,txt,col,size,l:1})}

function hurt(t,n,o,x,y,slow,heavy){
  if(t.dead)return;
  if(t.d.heavy>1)n=Math.round(n*.8*10)/10;else if(t.d.heavy&&n>2)n=Math.round(n*.75);
  if(o&&o.d.master&&t.d.name.indexOf('김티비')==0){n=Math.round(n*1.25+.2);if(!o.mt){o.mt=1;ft(o.x,o.y-o.r-36,'스승의 손맛','#ff4655',22)}}
  if(t.shield>0){t.shield=0;t.sf=.25;spark(x,y,'ice',22,340);ring(x,y,6,60,'#e3f6ff',5,.4);ring(t.x,t.y,t.r,t.r+50,'#e3f6ff',3,.5);ft(t.x,t.y-t.r-26,'방어!','#e3f6ff',18);shake=Math.max(shake,5);hs=.05;return}
  t.hp=Math.max(0,t.hp-n);t.flash=.12;SFX(heavy?'heavy':n>2?'hit':'tick');if(slow)t.slow=1.5;if(!F.some(x=>x.cast&&x.cast.s.ult)&&!TSTOP&&!MAD){o.ug=Math.min(100,(o.ug||0)+n*1.2);t.ug=Math.min(100,(t.ug||0)+n*.8)}
  spark(x,y,o.d.k,n>2?14:3,260);if(n>2)ring(x,y,6,heavy?60:38,o.d.hi,4,.35);
  if(heavy){SLOW=Math.max(SLOW,.22);zk=1;zx=x;zy=y;FX.push({k:'x',x,y,col:o.d.hi,l:.35,m:.35});FX.push({k:'burst',x,y,c:o.d.hi,a:rnd(0,1),l:.3,m:.3})}
  dmgT(t,n,heavy);if(heavy&&n>=10)FX.push({k:'imp',x,y,c:o.d.hi,l:.2,m:.2});
  if(n>2){shake=Math.max(shake,heavy?12:6);hs=heavy?.1:.06}
  if(n>2){t.sq=1;t.sa=ang(o,t)}
  const bar=$('#p'+t.i+' .bar');if(bar&&F.length<4){bar.classList.remove('hit');void bar.offsetWidth;bar.classList.add('hit')}
  if(t.hp<=0&&phase=='play'&&!t.dead){
    t.dead=1;KO=t;SFX('ko');t.cast=null;F.forEach(x=>{if(x.gulp&&x.gulp.tg==t)x.gulp=null});if(TSTOP&&TSTOP.o==t)TSTOP=null;if(MAD&&MAD.o==t)MAD=null;
    const al=F.filter(x=>!x.dead);
    if(al.length<=1){phase='end';win=al[0]||o;TSTOP=null;MAD=null;endT=0;ts=.25;bn=null}else{ft(t.x,t.y-t.r-30,'K.O.','#ffffff',44);SLOW=.5;zk=1.5;zx=t.x;zy=t.y}
    spark(t.x,t.y,t.d.k,40,480);spark(t.x,t.y,'dust',20,300);shatter(t);
    ring(t.x,t.y,10,160,'#fff',6,.6);ring(t.x,t.y,10,110,t.d.col,10,.8);shake=22;cfx=t.x;cfy=t.y;
  }
}

function step(dt){
  lock-=dt;const U=F.find(x=>x.cast&&x.cast.s.ult);
  F.slice().sort(()=>Math.random()-.5).forEach(f=>{const i=f.i;
    if(f.dead)return;const t=tgt(f);if(!t)return;
    if((U&&f!=U&&F.length<4)||(TSTOP&&f!=TSTOP.o)||(MAD&&f!=MAD.o)||(CIN&&f!=CIN.o))return;
    ['shield','slow','dash','flash','gcd','sf','frz','burn','stn','bc','fat','slide'].forEach(q=>{if(f[q]>0)f[q]-=dt});
    if(f.burn>0){f.bt+=dt;if(f.bt>=.5){f.bt=0;const s0=f.shield;f.shield=0;hurt(f,2,(tgt(f)||f),f.x,f.y-f.r*.5,0,0);f.shield=s0;spark(f.x,f.y,(tgt(f)||f).d.k,3,120)}}
    if(f.frz>0||f.stn>0){f.cast=null;f.br=0;f.rush=0;f.auto=0;f.swing=null}
    f.cds=f.cds.map(c=>c-dt);f.ug=Math.min(100,(f.ug||0)+dt*2.2);f.sq=Math.max(0,f.sq-dt*4);
    const m=(f.dash>0?2.7:1)*(f.slow>0?.65:1)*(f.cast?.35:1)*(f.frz>0||f.stn>0?0:1)*(f.br>0?.45:1)*(f.auto>0?.35:1)*(f.swing||f.lp?0:1)*(f.slide>0?2.3:1)*(f.jump||f.gulp?0:1)*(f.rush>0?(dist(f,t)>f.r+t.r+30?1.9:.1):1);
    f.x+=f.dx*f.sp*m*dt;f.y+=f.dy*f.sp*m*dt;
    f.rot+=f.sp*m*dt/f.r*(f.dx>=0?1:-1);
    let w=-1;
    if(f.x<f.r){f.x=f.r;f.dx=Math.abs(f.dx);w=0}
    if(f.x>A-f.r){f.x=A-f.r;f.dx=-Math.abs(f.dx);w=0}
    if(f.y<f.r){f.y=f.r;f.dy=Math.abs(f.dy);w=1}
    if(f.y>A-f.r){f.y=A-f.r;f.dy=-Math.abs(f.dy);w=1}
    if(f.wcd>0)f.wcd-=dt;if(w>=0&&!(f.wcd>0)){f.wcd=.3;f.sq=1;f.sa=w?Math.PI/2:0;spark(f.x,f.y,'dust',4,110);wallHit(f)}
    f.tr.push([f.x,f.y]);
    const mx=f.dash>0?14:0;while(f.tr.length>mx)f.tr.shift();
    if(f.slow>0&&Math.random()<dt*20)Pt.push({x:f.x+rnd(-20,20),y:f.y+rnd(-20,20),vx:0,vy:-30,l:.5,m:.5,sh:1,rot:0,vr:3,col:'#e3f6ff',r:4});
    if(f.br>0){
      f.br-=dt;let da=ang(f,t)-f.ba;da=Math.atan2(Math.sin(da),Math.cos(da));f.ba+=da*Math.min(1,dt*2.5);
      const mx=f.x+Math.cos(f.ba)*f.r,my=f.y+Math.sin(f.ba)*f.r;
      emit(170,dt,()=>{const a=f.ba+rnd(-.32,.32),v=rnd(380,470),l=rnd(.45,.65);Pt.push({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l,m:l,gl:1,sh:4,pal:f.bk=='gas'?PAL.gas:PAL.drg,r:rnd(9,14),gr:30,fr:.6})});
      if(f.bk=='gas')emit(45,dt,()=>{const d=rnd(40,210);Pt.push({x:mx+Math.cos(f.ba)*d+rnd(-16,16),y:my+Math.sin(f.ba)*d+rnd(-16,16),vx:Math.cos(f.ba)*70,vy:Math.sin(f.ba)*70,l:rnd(.7,1.1),m:1.1,sh:3,col:'#e6ebf2',r:rnd(12,22),gr:34,a0:.5,fr:.3})});
      if(f.bk!='gas')emit(22,dt,()=>smokeP(mx+Math.cos(f.ba)*rnd(60,180),my+Math.sin(f.ba)*rnd(60,180),rnd(8,14),rnd(.6,1)));
      f.bt2+=dt;if(f.bt2>=.1){f.bt2=0;let d2=ang(f,t)-f.ba;d2=Math.atan2(Math.sin(d2),Math.cos(d2));if(!t.dead&&dist(f,t)<230&&Math.abs(d2)<.4){hurt(t,2,f,t.x,t.y,0,0);if(f.bk=='gas'){t.slow=.8;const pa=ang(f,t);t.x=clamp(t.x+Math.cos(pa)*7,t.r,A-t.r);t.y=clamp(t.y+Math.sin(pa)*7,t.r,A-t.r)}}}
    }
    if(f.jump){
      const j=f.jump;j.t+=dt;const u=Math.min(1,j.t/j.dur);f.x=j.sx+(j.tx-j.sx)*u;f.y=j.sy+(j.ty-j.sy)*u;
      if(u>=1){
        f.jump=null;shake=Math.max(shake,16);hs=.08;SFX('slam');
        ring(f.x,f.y,10,140,f.d.hi,10,.5);ring(f.x,f.y,10,100,f.d.col,18,.4);for(let i=0;i<22;i++)rockP(f.x,f.y,rnd(0,TAU),rnd(80,280));for(let i=0;i<14;i++)dustP(f.x,f.y,rnd(80,200));FX.push({k:'burst',x:f.x,y:f.y,c:f.d.hi,a:rnd(0,1),l:.35,m:.35});FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});
        FX.push({k:'crack',x:f.x,y:f.y,r:95,l:3,m:3});
        F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;if(dist(f,e)<95+e.r*.5){hurt(e,15,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.3}})
      }
    }
    if(f.rush>0){
      f.rush-=dt;const d0=dist(f,t),a0=ang(f,t);
      if(!t.hid){f.dx=Math.cos(a0);f.dy=Math.sin(a0)}
      f.rt+=dt;
      f.ft2+=dt;while(f.ft2>=.03){f.ft2-=.03;FX.push({k:'fist',x:f.x+rnd(-14,14),y:f.y-26+rnd(-14,14),a:a0+rnd(-.45,.45),d:Math.max(20,Math.min(d0-10,95)),l:.13,m:.13,c:f.d.hi,c2:f.d.col})}
      if(f.rt>=.08){f.rt=0;
        if(d0<f.r+t.r+40&&!t.dead&&!t.hid&&!t.jump){hurt(t,2,f,t.x-Math.cos(a0)*t.r,t.y-Math.sin(a0)*t.r,0,0);SFX('rush');t.x=clamp(t.x+Math.cos(a0)*4,t.r,A-t.r);t.y=clamp(t.y+Math.sin(a0)*4,t.r,A-t.r)}
        if(d0<f.r+t.r+40&&!t.hid)FX.push({k:'burst',x:t.x,y:t.y,c:f.d.hi,a:rnd(0,1),l:.15,m:.15});
      }
      f.gg-=dt;if(f.gg<=0){f.gg=.3;ft(f.x+rnd(-40,40),f.y-f.r-46+rnd(-12,12),'ゴゴゴ','#b48cff',24)}
    }
    if(f.gulp){
      const G=f.gulp,tg=G.tg;G.t+=dt;
      if(G.st==0){
        const u=Math.min(1,G.t/.7),e=u*u;tg.x=G.x0+(f.x-G.x0)*e;tg.y=G.y0+(f.y-G.y0)*e;tg.stn=Math.max(tg.stn,.2);tg.sq=.9;tg.sa=Math.atan2(f.y-tg.y,f.x-tg.x);
        emit(110,dt,()=>{const a=rnd(0,TAU),r=rnd(70,170),sa=a+.7;Pt.push({x:f.x+Math.cos(a)*r,y:f.y+Math.sin(a)*r,vx:-Math.cos(sa)*r*2.4,vy:-Math.sin(sa)*r*2.4,l:.4,m:.4,gl:1,sh:5,col:Math.random()<.5?f.d.hi:'#ffffff',r:2.4,fr:.6})});
        emit(25,dt,()=>{const a=rnd(0,TAU),r=rnd(80,160);Pt.push({x:f.x+Math.cos(a)*r,y:f.y+Math.sin(a)*r,vx:-Math.cos(a)*r*1.6,vy:-Math.sin(a)*r*1.6,l:.5,m:.5,sh:3,col:'#8d8576',r:rnd(8,13),a0:.4,fr:.6})});
        if(Math.random()<dt*10)shake=Math.max(shake,4);
        if(u>=1){G.st=1;G.t=0;tg.hid=1;tg.cast=null;f.sq=1;f.sa=0;ft(f.x,f.y-f.r-30,'꿀꺽!',f.d.hi,34);shake=Math.max(shake,14);spark(f.x,f.y,'heart',20,260);SFX('gulp')}
      }else{
        tg.x=f.x;tg.y=f.y;tg.stn=Math.max(tg.stn,.2);G.c+=dt;f.fat=1;
        if(G.c>=.3){G.c=0;G.n++;hurt(tg,5,f,f.x,f.y-f.r*.3,0,0);f.sq=1;f.sa=Math.PI/2;ft(f.x+rnd(-20,20),f.y-f.r-20,'냠',f.d.hi,22);SFX('chew')}
        if(tg.dead)f.gulp=null;
        else if(G.n>=3){
          const a=rnd(0,TAU);tg.hid=0;tg.x=clamp(f.x+Math.cos(a)*(f.r+tg.r+6),tg.r,A-tg.r);tg.y=clamp(f.y+Math.sin(a)*(f.r+tg.r+6),tg.r,A-tg.r);
          tg.dx=Math.cos(a);tg.dy=Math.sin(a);tg.stn=.6;tg.dash=0;ft(f.x,f.y-f.r-34,'꺼억!',f.d.hi,36);for(let i=0;i<14;i++)dustP(f.x,f.y,rnd(80,200));spark(tg.x,tg.y,'heavy',16,320);ring(f.x,f.y,10,140,f.d.col,10,.5);hurt(tg,3,f,tg.x,tg.y,0,1);f.gulp=null;SFX('spit');
        }
      }
    }
    if(f.auto>0){f.auto-=dt;f.at+=dt;if(f.at>=.08&&!t.hid){f.at=0;const a=ang(f,t)+rnd(-.1,.1);shoot(f,a,720,2,'tracer',0,5);FX.push({k:'muz',x:f.x+Math.cos(a)*(f.r+6),y:f.y+Math.sin(a)*(f.r+6),a,l:.06,m:.06});Pt.push({x:f.x,y:f.y,z:8,vz:rnd(120,220),vx:Math.cos(a+1.8)*rnd(60,120),vy:Math.sin(a+1.8)*rnd(60,120),l:1,m:1,sh:10,cube:1,r:1.8,rot:rnd(0,TAU),vr:rnd(-20,20),col:'#e2b84a',fr:.4})}}
    if(f.swing){
      const S2=f.swing;S2.t+=dt;const u=S2.t/.34;
      if(!S2.hit&&u>=.45){S2.hit=1;SFX('heavy');F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;let da=ang(f,e)-S2.a;da=Math.atan2(Math.sin(da),Math.cos(da));if(dist(f,e)<f.r+e.r+62&&Math.abs(da)<1.9){hurt(e,14,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.3;e.x=clamp(e.x+Math.cos(a)*30,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*30,e.r,A-e.r)}})}
      if(u>=1)f.swing=null;
    }
    if(f.slide>0)emit(14,dt,()=>dustP(f.x,f.y+f.r*.6,30));
    if(f.lp){
      const L=f.lp;L.t+=dt;
      if(L.t>=.35&&L.t<1.25){f.hid=1;const e=L.tg&&!L.tg.dead?L.tg:tgt(f);if(e){const k2=Math.min(1,dt*3.5);f.x=clamp(f.x+(e.x-f.x)*k2,f.r,A-f.r);f.y=clamp(f.y+(e.y-f.y)*k2,f.r,A-f.r)}}
      else if(L.t>=1.25&&L.t<1.5){f.hid=1;const v=(L.t-1.25)/.25;emit(90,dt,()=>fireP(f.x+rnd(-20,20),f.y-(1-v*v)*520+rnd(-20,20),rnd(-40,40),rnd(-200,-80),rnd(12,20),rnd(.3,.5),PAL.magma))}
      else if(L.t>=1.5){
        f.hid=0;f.lp=null;shake=Math.max(shake,18);hs=.1;SFX('slam');ring(f.x,f.y,10,160,f.d.hi,12,.5);ring(f.x,f.y,10,110,f.d.col,20,.45);
        for(let i=0;i<26;i++)rockP(f.x,f.y,rnd(0,TAU),rnd(100,320));for(let i=0;i<24;i++)fireP(f.x,f.y,rnd(-260,260),rnd(-260,260),rnd(10,20),rnd(.4,.8),PAL.magma);
        FX.push({k:'crack',x:f.x,y:f.y,r:110,l:3,m:3});FX.push({k:'frost',l:.12,m:.12,c:'#ffd27a'});HZ.push({k:'pool',o:f,x:f.x,y:f.y,r:80,t:0,dur:2.4,tk:0});
        F.forEach(e=>{if(e==f||e.dead||e.hid||e.jump)return;if(dist(f,e)<105+e.r*.5){hurt(e,10,f,e.x,e.y,0,1);const a=ang(f,e);e.dx=Math.cos(a);e.dy=Math.sin(a);e.stn=.35;e.x=clamp(e.x+Math.cos(a)*40,e.r,A-e.r);e.y=clamp(e.y+Math.sin(a)*40,e.r,A-e.r)}});
      }
    }
    const ek=f.d.k;
    if(ek=='fire')emit(10,dt,()=>fireP(f.x+rnd(-12,12),f.y-rnd(0,14),rnd(-10,10),rnd(-60,-30),rnd(5,9),rnd(.3,.5)));
    else if(ek=='ice')emit(6,dt,()=>snowP(f.x+rnd(-24,24),f.y+rnd(-24,24)));
    else if(ek=='elec')emit(8,dt,()=>zapP(f.x+rnd(-20,20),f.y+rnd(-20,20),rnd(0,TAU),rnd(60,140)));
    else if(ek=='magma'){if(!f.hid)emit(6,dt,()=>emberP(f.x+rnd(-f.r*.7,f.r*.7),f.y+rnd(-f.r*.5,f.r*.5),'#ff8a2c'))}
    else if(ek=='heavy'){if(!f.hid&&!f.jump)emit(2,dt,()=>dustP(f.x+rnd(-f.r*.6,f.r*.6),f.y+f.r*.7,22))}
    else if(ek=='gold')emit(2,dt,()=>sparkP(f.x+rnd(-22,22),f.y+rnd(-22,22),0,-20,f.d.hi,rnd(1.5,2.5)));
    else emit(8,dt,()=>emberP(f.x+rnd(-15,15),f.y+rnd(-15,15),'#9dffb8'));
    if(f.burn>0)emit(30,dt,()=>fireP(f.x+rnd(-18,18),f.y+rnd(-14,10),rnd(-10,10),rnd(-90,-50),rnd(7,12),rnd(.3,.5),PAL[(tgt(f)||f).d.k=='drg'?'drg':'fire']));
    if(f.cast){
      const c=f.cast;c.t+=dt;if(c.s.ult&&Math.random()<dt*100)Pt.push({x:f.x+rnd(-40,40),y:f.y+30,vx:rnd(-20,20),vy:-rnd(200,420),fr:.5,l:.8,m:.8,sh:f.d.k=='ice'?1:0,rot:0,vr:6,col:f.d.hi,r:rnd(3,6)});
      if(Math.random()<dt*50){const a=rnd(0,TAU);Pt.push({x:f.x+Math.cos(a)*56,y:f.y+Math.sin(a)*56,vx:-Math.cos(a)*170,vy:-Math.sin(a)*170,fr:.5,l:.3,m:.3,sh:0,rot:0,vr:0,col:f.d.hi,r:3})}
      if(c.t>=c.s.w){
        c.s.f(f,t);f.cds[c.j]=c.s.cd||0;f.gcd=F.length>3?2.2:3.2;f.cast=null;lock=F.length>3?.25:2.4;if(c.s.ult){f.ug=0;SLOW=.4;zk=1.4;zx=f.x;zy=f.y;FX.push({k:'frost',l:.2,m:.2,c:'#ffffff'})}
        ring(f.x,f.y,f.r,f.r+54,f.d.hi,5,.4);f.sq=1;f.sa=ang(f,t);shake=Math.max(shake,c.s.ult?14:4);if(c.s.ult){ring(f.x,f.y,10,300,f.d.hi,14,.7);ring(f.x,f.y,10,200,f.d.col,22,.5);hs=.12}
      }
    }else if(f.gcd<=0&&f.frz<=0&&f.stn<=0&&!f.jump&&!f.gulp&&!(f.rush>0)&&!(f.auto>0)&&!f.swing&&!f.lp&&!(f.slide>0)&&!f.hid){
      for(let j=f.d.sk.length-1;j>=0;j--){
        const s=f.d.sk[j];
        if((s.ult?f.ug<100:f.cds[j]>0)||(s.c&&!s.c(f,t)))continue;
        if(!s.u&&(lock>0||F.filter(x=>x.cast).length>=(F.length>3?3:1)))continue;
        f.cast={j,t:0,s};SFX(s.ult?'ult':'cast');bn={txt:s.n,d:f.d,side:i,t:0,ult:s.ult};break;
      }
    }
  });

  if((U&&F.length<4)||TSTOP||MAD||CIN)return;
  HZ=HZ.filter(h=>{
    h.t+=dt;const EN=F.filter(x=>x!=h.o&&!x.dead),t=tgt(h.o)||h.o;if(HZX[h.k])return HZX[h.k](h,dt,EN,t);
    if(h.k=='gey'){
      let last=0;h.sp.forEach(q=>{last=Math.max(last,q.dl);if(!q.done&&h.t>=q.dl){q.done=1;SFX('slam');shake=Math.max(shake,7);
        for(let i=0;i<16;i++)fireP(q.x+rnd(-12,12),q.y,rnd(-60,60),rnd(-420,-200),rnd(10,18),rnd(.5,.9),PAL.magma);for(let i=0;i<8;i++)rockP(q.x,q.y,rnd(0,TAU),rnd(60,160));
        FX.push({k:'pillar',x:q.x,y:q.y,c:h.o.d.col,l:.55,m:.55});FX.push({k:'scorch',x:q.x,y:q.y,r:44,l:2.5,m:2.5,c:'#ff5a1f'});
        EN.forEach(e=>{if(e.hid||e.jump||h.hs.includes(e))return;if(Math.hypot(e.x-q.x,e.y-q.y)<46+e.r*.5){h.hs.push(e);hurt(e,10,h.o,e.x,e.y,0,1)}})}});
      return h.t<last+.3;
    }
    if(h.k=='pool'){
      h.tk+=dt;emit(10,dt,()=>fireP(h.x+rnd(-h.r*.7,h.r*.7),h.y+rnd(-h.r*.5,h.r*.5),0,rnd(-60,-20),rnd(5,9),rnd(.4,.7),PAL.magma));
      if(h.tk>=.6){h.tk=0;EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<h.r){hurt(e,2,h.o,e.x,e.y,0,0);e.slow=.5}})}
      return h.t<h.dur;
    }
    if(h.k=='maw'){
      const e=h.e;if(e.dead)return false;
      if(h.t<.7){h.x=e.x;h.y=e.y;emit(30,dt,()=>fireP(h.x+rnd(-50,50),h.y+rnd(-30,30),0,rnd(-80,-30),rnd(6,10),rnd(.3,.5),PAL.magma));if(Math.random()<dt*10)shake=Math.max(shake,4)}
      else if(!h.done&&h.t>=.95){h.done=1;SFX('gulp');shake=Math.max(shake,20);hs=.12;
        if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<85){hurt(e,17,h.o,e.x,e.y,0,1);e.stn=.6;e.burn=1;const hv=Math.min(4,100-h.o.hp);if(hv>0){h.o.hp+=hv;ft(h.o.x,h.o.y-h.o.r-10,'+'+Math.round(hv),'#ffd27a',24)}ft(e.x,e.y-e.r-40,'와작!',h.o.d.hi,34)}
        for(let i=0;i<30;i++)fireP(h.x,h.y,rnd(-300,300),rnd(-300,100),rnd(10,20),rnd(.4,.8),PAL.magma);for(let i=0;i<14;i++)rockP(h.x,h.y,rnd(0,TAU),rnd(100,260))}
      return h.t<1.6;
    }
    if(h.k=='decoy'){
      if(h.tg&&!h.tg.dead&&!h.tg.hid){h.x=h.tg.x;h.y=h.tg.y}
      if(h.t>=h.dur&&!h.boom){h.boom=1;for(let i=0;i<26;i++){const a=rnd(0,TAU),v=rnd(80,260);petalP(h.x,h.y,Math.cos(a)*v,Math.sin(a)*v)}ring(h.x,h.y,8,90,h.o.d.col,8,.4);SFX('slam');EN.forEach(e=>{if(!e.hid&&!e.jump&&Math.hypot(e.x-h.x,e.y-h.y)<90)hurt(e,7,h.o,e.x,e.y,0,1)})}
      return !h.boom;
    }
    if(h.k=='wall'){
      const pos=h.x0+h.sg*h.t*420;h.pos=pos;
      EN.forEach(e=>{if(e.hid||e.jump)return;const inb=h.ax?Math.abs(e.x-pos)<34+e.r:Math.abs(e.y-pos)<34+e.r;if(!inb)return;if(!h.hs.includes(e)){h.hs.push(e);hurt(e,12,h.o,e.x,e.y,0,1);ft(e.x,e.y-e.r-30,'도배!',h.o.d.hi,26)}if(h.ax)e.x=clamp(e.x+h.sg*420*dt,e.r,A-e.r);else e.y=clamp(e.y+h.sg*420*dt,e.r,A-e.r)});
      return h.t<(A+80)/420;
    }
    if(h.k=='nana'){
      if(h.t<h.fl)return true;if(!h.dn){h.dn=1;spark(h.x,h.y,'dust',4,80)}
      for(const e of EN){if(e.hid||e.jump)continue;if(Math.hypot(e.x-h.x,e.y-h.y)<e.r+14){hurt(e,6,h.o,e.x,e.y,0,0);e.slide=.9;e.cast=null;e.gcd=Math.max(e.gcd,.9);e.rush=0;e.auto=0;e.br=0;const a=Math.atan2(e.dy,e.dx)+rnd(-.7,.7);e.dx=Math.cos(a);e.dy=Math.sin(a);ft(e.x,e.y-e.r-30,'미끄덩!','#ffd43b',26);SFX('spit');return false}}
      return h.t<h.life;
    }
    if(h.k=='smoke'){
      EN.forEach(e=>{if(!e.hid&&Math.hypot(e.x-h.x,e.y-h.y)<h.r){e.slow=Math.max(e.slow,.15);e.gcd=Math.max(e.gcd,.15)}});
      emit(16,dt,()=>{const a=rnd(0,TAU),r=rnd(0,h.r*.8);Pt.push({x:h.x+Math.cos(a)*r,y:h.y+Math.sin(a)*r,vx:rnd(-12,12),vy:rnd(-12,12),l:rnd(.8,1.3),m:1.3,sh:3,col:'#9aa0ad',r:rnd(18,28),gr:10,a0:.45,fr:.5})});
      if(!h.shot&&h.t>=.7){h.shot=1;const e=tgt(h.o);if(e&&!e.hid){const a=ang(h.o,e);shoot(h.o,a,1400,14,'hs',0,6);FX.push({k:'muz',x:h.o.x+Math.cos(a)*(h.o.r+6),y:h.o.y+Math.sin(a)*(h.o.r+6),a,l:.08,m:.08});}}
      return h.t<h.dur;
    }
    if(h.k=='ape'){
      const e=h.e;if(h.t<0)return true;if(e.dead)return false;
      if(h.t>=h.dur&&!h.hit){h.hit=1;if(!e.hid&&!e.jump){hurt(e,3,h.o,e.x,e.y,0,0);ft(e.x+rnd(-20,20),e.y-e.r-24,'우끼!',h.o.d.hi,22)}spark(e.x,e.y,'dust',6,160);shake=Math.max(shake,5);SFX('slam')}
      return h.t<h.dur+.25;
    }
    if(h.k=='lock'){
      const e=h.e;if(e.dead)return false;
      if(h.t>=h.ch&&!h.fired){h.fired=1;FX.push({k:'rail',x:h.o.x,y:h.o.y,x2:e.x,y2:e.y,c:h.o.d.col,l:.4,m:.4});FX.push({k:'frost',l:.12,m:.12,c:'#ffffff'});SFX('beam');shake=Math.max(shake,16);if(!e.hid)hurt(e,24,h.o,e.x,e.y,0,1)}
      return h.t<h.ch+.3;
    }
    if(h.k=='ink'){
      const dr=.45;
      if(h.t>=dr&&!h.on){h.on=1;SFX('slam');shake=Math.max(shake,7);h.pts.forEach((q,i)=>{if(i%3==0)spark(q[0],q[1],'ink',4,170)})}
      if(h.on&&h.t<dr+.3)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;for(let i=1;i<h.pts.length;i++){if(segD(e.x,e.y,h.pts[i-1][0],h.pts[i-1][1],h.pts[i][0],h.pts[i][1])<e.r+14){h.hs.push(e);hurt(e,13,h.o,e.x,e.y,0,1);break}}});
      return h.t<1.5;
    }
    if(h.k=='toon'){
      for(let i=0;i<3;i++){const ht=.5+i*.5;if(h.t>=ht&&h.step<=i){h.step=i+1;SFX(i==2?'slam':'heavy');shake=Math.max(shake,i==2?18:10);EN.forEach(e=>{if(!e.hid)hurt(e,i==2?12:7,h.o,e.x,e.y,0,i==2)})}}
      return h.t<2.2;
    }
    if(h.k=='kb'){
      if(!h.up&&h.t>=h.tel){h.up=1;SFX('slam');shake=Math.max(shake,9);h.cells.forEach(([x,y])=>{for(let i=0;i<2;i++)cubeP(x+30,y+30,rnd(0,TAU),rnd(40,120),'#ff3b30')})}
      if(h.up&&h.t<h.tel+h.act)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;if(h.cells.some(([x,y])=>e.x>x-e.r*.4&&e.x<x+60+e.r*.4&&e.y>y-e.r*.4&&e.y<y+60+e.r*.4)){h.hs.push(e);hurt(e,12,h.o,e.x,e.y,0,1);for(let i=0;i<14;i++)cubeP(e.x,e.y,rnd(0,TAU),rnd(120,300),[e.d.col,e.d.hi,e.d.dk][i%3]);ft(e.x,e.y-e.r-30,'KILLBRICK','#ff3b30',24)}});
      if(h.t>=h.tel+h.act&&!h.down){h.down=1;h.cells.forEach(([x,y])=>{for(let i=0;i<4;i++)cubeP(x+30,y+30,rnd(0,TAU),rnd(60,180),i%2?'#ff3b30':'#9c1a14')})}
      return h.t<h.tel+h.act+.25;
    }
    if(h.k=='brick'){
      if(h.t<h.dl)return true;
      shake=Math.max(shake,10);SFX('slam');ring(h.x,h.y,6,h.r+30,h.pc[2],8,.4);
      for(let i=0;i<12;i++)cubeP(h.x,h.y,rnd(0,TAU),rnd(80,240),h.pc[i%3]);for(let i=0;i<5;i++)dustP(h.x,h.y,rnd(50,110));
      FX.push({k:'crack',x:h.x,y:h.y,r:45,l:2,m:2});
      if(!t.dead&&!t.hid&&!t.jump&&Math.hypot(t.x-h.x,t.y-h.y)<h.r+t.r*.4)hurt(t,5,h.o,t.x,t.y,0,1);
      return false;
    }
    if(h.k=='blaster'){
      if(h.t>=h.ch&&!h.fired){h.fired=1;SFX('beam');shake=Math.max(shake,8)}
      h.hs=h.hs||[];if(h.fired&&h.t<h.ch+.35)EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;if(segD(e.x,e.y,h.x,h.y,h.x+Math.cos(h.a0)*900,h.y+Math.sin(h.a0)*900)<e.r+16){h.hs.push(e);hurt(e,9,h.o,e.x,e.y,0,1)}});
      return h.t<h.ch+.55;
    }
    if(h.k=='quake'){
      const rr=h.t*520;
      emit(70,dt,()=>{const a=rnd(0,TAU),x=h.x+Math.cos(a)*rr,y=h.y+Math.sin(a)*rr;if(x>10&&x<A-10&&y>10&&y<A-10){if(Math.random()<.5)rockP(x,y,a,rnd(30,90));else dustP(x,y,40)}});
      h.hs=h.hs||[];EN.forEach(e=>{if(h.hs.includes(e)||e.hid||e.jump)return;const d=dist(h,e);if(d<=rr+e.r&&d<330){h.hs.push(e);hurt(e,11,h.o,e.x,e.y,0,1);e.stn=.45;const a=Math.atan2(e.y-h.y,e.x-h.x);e.dx=Math.cos(a);e.dy=Math.sin(a)}});
      return rr<340;
    }
    if(h.k=='floor'){
      h.fl=Math.max(0,h.fl-dt*3);
      EN.forEach(e=>{if(!e.hid){e.x=clamp(e.x+Math.cos(h.dir)*150*dt,e.r,A-e.r);e.y=clamp(e.y+Math.sin(h.dir)*150*dt,e.r,A-e.r)}});
      h.nb-=dt;
      if(h.nb<=0&&h.beats<7){
        h.nb=.55;h.beats++;h.fl=1;h.dir+=rnd(1.8,3.6);shake=Math.max(shake,8);ring(A/2,A/2,40,420,h.o.d.hi,6,.45);{const fn='floor'+(h.beats);if(hasS(fn))SFX(fn)}
        const last=h.beats==7;
        if(last){FX.push({k:'frost',l:.18,m:.18,c:'#ffffff'});shake=20;hs=.1;ring(A/2,A/2,20,520,'#ffffff',14,.6)}
        EN.forEach(e=>{if(e.hid||e.dead)return;hurt(e,last?10:3,h.o,e.x,e.y,0,last);ring(e.x,e.y,6,last?150:90,h.o.d.col,last?14:8,.4);ft(e.x,e.y-e.r-34,['BOOM','BAP','BOOM','BAP','BOOM','BAP','DROP!'][h.beats-1],h.o.d.hi,last?44:26)});
        for(let i=0;i<6;i++)Pt.push({x:rnd(40,A-40),y:rnd(40,A-40),vx:0,vy:-60,l:.8,m:.8,sh:9,col:['#ffe08a','#ff5fa2','#7fd6ff'][i%3],r:22,txt:Math.random()<.5?'♪':'♫'});
      }
      return h.t<h.dur;
    }
    if(h.k=='dragon'){
      const hs=h.t*h.sp,[hx,hy]=dpos(h,hs),[tx2,ty2]=dpos(h,Math.max(0,hs-260));
      emit(160,dt,()=>{const q=hs-rnd(0,280);if(q<0)return;const [x,y]=dpos(h,q);fireP(x+rnd(-8,8),y+rnd(-8,8),rnd(-30,30),rnd(-30,30),rnd(8,15),rnd(.35,.6),PAL.drg)});
      emit(60,dt,()=>fireP(hx+h.ux*36,hy+h.uy*36,h.ux*260+rnd(-60,60),h.uy*260+rnd(-60,60),rnd(10,16),rnd(.25,.4),PAL.drg));
      if(!h.hit&&!t.dead&&segD(t.x,t.y,tx2,ty2,hx,hy)<62){h.hit=1;const sh=t.shield>0;hurt(t,18,h.o,t.x,t.y,0,1);FX.push({k:'boom',x:t.x,y:t.y,r:110,pal:PAL.drg,l:.5,m:.5});if(!sh&&!t.dead){t.dx=h.ux;t.dy=h.uy;t.burn=2;t.cast=null;t.br=0}}
      if(Math.random()<dt*6)shake=Math.max(shake,5);
      return hs<h.len+340;
    }
    if(h.k=='nova'){
      const rr=h.t*620;
      if(!h.done&&!t.dead&&rr>=Math.hypot(t.x-h.x,t.y-h.y)){
        h.done=1;const sh=t.shield>0;hurt(t,22,h.o,t.x,t.y,1,1);
        if(!sh&&!t.dead){t.frz=1.4;t.cast=null;t.dash=0;spark(t.x,t.y,'ice',34,380);ring(t.x,t.y,t.r,t.r+70,'#e3f6ff',8,.6)}
      }
      if(rr<760){
        emit(70,dt,()=>{const a=rnd(0,TAU),sx=h.x+Math.cos(a)*rr,sy=h.y+Math.sin(a)*rr;if(sx>15&&sx<A-15&&sy>15&&sy<A-15)FX.push({k:'spk',x:sx,y:sy,s:rnd(.55,1.1),a:rnd(-.35,.35),l:1.3,m:1.3})});
        emit(50,dt,()=>{const a=rnd(0,TAU);mistP(h.x+Math.cos(a)*rr,h.y+Math.sin(a)*rr,rnd(12,20),rnd(.4,.7))});
      }
      return rr<900;
    }
    if(h.k=='met'&&!h.v){const q=(h.t/h.dl)**2,mx=h.x+(1-q)*180,my=h.y-(1-q)*480;emit(90,dt,()=>fireP(mx+rnd(-10,10),my+rnd(-10,10),rnd(-40,40)+60,rnd(-40,40)-150,rnd(14,24),rnd(.3,.5)));emit(20,dt,()=>smokeP(mx,my,rnd(10,16),rnd(.8,1.2)))}
    if(h.t<h.dl)return true;
    ring(h.x,h.y,10,h.r+34,h.o.d.hi,9,.5);ring(h.x,h.y,6,h.r,h.o.d.col,16,.4);
    spark(h.x,h.y,h.v?'elec':'fire',28,440);spark(h.x,h.y,'dust',8,260);shake=Math.max(shake,13);FX.push({k:'boom',x:h.x,y:h.y,r:h.r*2.2,pal:h.v?PAL.elec:PAL.fire,l:.45,m:.45});for(let i=0;i<12;i++)emberP(h.x,h.y,h.v?'#fff3a0':'#ffd36b');
    FX.push({k:'scorch',x:h.x,y:h.y,r:h.r,l:4,m:4,c:h.v?'#ffe45c':'#ff6a1c'});if(h.v){FX.push({k:'bolt',x:h.x,y:h.y,l:.35,m:.35});FX.push({k:'frost',l:.25,m:.25,c:'#fff'})}
    if(!t.dead&&Math.hypot(t.x-h.x,t.y-h.y)<h.r+t.r*.5){const sh=t.shield>0;hurt(t,h.dmg,h.o,t.x,t.y,0,1);if(!sh&&!t.dead){if(h.v)t.stn=.7;else t.burn=1.5}}
    return false;
  });
  for(let ii=0;ii<F.length;ii++)for(let jj=ii+1;jj<F.length;jj++){const a=F[ii],b=F[jj];if(a.dead||b.dead)continue;
  const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
  if(d<a.r+b.r&&!a.hid&&!b.hid&&!a.jump&&!b.jump){
    const nx=dx/d,ny=dy/d,ov=a.r+b.r-d;
    const wa=b.d.heavy&&!a.d.heavy?.85:a.d.heavy&&!b.d.heavy?.15:.5;
    a.x-=nx*ov*wa;a.y-=ny*ov*wa;b.x+=nx*ov*(1-wa);b.y+=ny*ov*(1-wa);
    const hv=a.d.heavy&&!b.d.heavy?a:b.d.heavy&&!a.d.heavy?b:null;
    if(hv&&!(hv.bc>0)){const lt=hv==a?b:a,ba=ang(hv,lt);hv.bc=1.2;if(hv.d.heavy>1)lt.burn=.6;lt.dx=Math.cos(ba);lt.dy=Math.sin(ba);hurt(lt,2,hv,(a.x+b.x)/2,(a.y+b.y)/2,0,0);ft(lt.x,lt.y-lt.r-30,'쿵!',hv.d.hi,22);ring(lt.x,lt.y,6,60,hv.d.col,6,.3)}
    const da=a.dx*nx+a.dy*ny;if(da>0){a.dx-=2*da*nx;a.dy-=2*da*ny}
    const db=b.dx*nx+b.dy*ny;if(db<0){b.dx-=2*db*nx;b.dy-=2*db*ny}
    const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    spark(mx,my,'dust',8,200);ring(mx,my,4,24,'#cfd5e2',3,.25);shake=Math.max(shake,4);
    a.sq=b.sq=1;a.sa=b.sa=Math.atan2(ny,nx);
    [[a,b],[b,a]].forEach(([x,y])=>{if(x.dash>0&&!x.hit){x.hit=1;x.dash=.1;const br=y.shield>0;if(br){y.shield=0;spark(mx,my,'ice',20,360);ring(y.x,y.y,y.r,y.r+60,'#e3f6ff',5,.5)}hurt(y,br?6:10,x,mx,my,0,1)}});
  }}

  B=B.filter(q=>{
    if(q.boom){if(q.age>.6&&!q.back){q.back=1;q.hs=[]}if(q.back){if(q.o.dead)return false;const a=Math.atan2(q.o.y-q.y,q.o.x-q.x);q.vx=Math.cos(a)*600;q.vy=Math.sin(a)*600;q.a=a;if(Math.hypot(q.o.y-q.y,q.o.x-q.x)<q.o.r)return false}}
    if(q.home&&tgt(q.o)){const t2=tgt(q.o);let da=Math.atan2(t2.y-q.y,t2.x-q.x)-q.a;da=Math.atan2(Math.sin(da),Math.cos(da));q.a+=clamp(da,-1.5*dt,1.5*dt);const v=Math.hypot(q.vx,q.vy);q.vx=Math.cos(q.a)*v;q.vy=Math.sin(q.a)*v}
    if(q.k=='chat'){const v=Math.hypot(q.vx,q.vy)||1,nv=Math.min(380,v+420*dt);q.vx*=nv/v;q.vy*=nv/v}
    q.age+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;
    trail(q,dt);
    for(const t of F){if(t==q.o||t.dead||t.hid||t.jump)continue;if(Math.hypot(q.x-t.x,q.y-t.y)<t.r+q.r){if(q.boom){if(!q.hs.includes(t)){q.hs.push(t);hurt(t,q.dmg,q.o,q.x,q.y,0,0)}continue}hurt(t,q.dmg,q.o,q.x,q.y,q.slow,0);if(q.k=='hs'){ft(t.x,t.y-t.r-44,'HEADSHOT','#ff4655',30);FX.push({k:'burst',x:t.x,y:t.y,c:'#ff4655',a:0,l:.3,m:.3})}return false}}
    if(q.bnc>0)bounceB(q);
    if(!q.boom&&(q.x<0||q.x>A||q.y<0||q.y>A)){spark(clamp(q.x,0,A),clamp(q.y,0,A),q.o.d.k,5,140);return false}
    return true;
  });
}

