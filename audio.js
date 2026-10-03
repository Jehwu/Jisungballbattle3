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
