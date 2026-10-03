// sfxgen.js : 새 효과음들을 게임이 켜질 때 직접 만들어 씀 (mp3 파일 필요 없음)
// sounds 폴더에 같은 이름의 mp3가 있으면 그 파일을 우선 사용
(function(){
const SR=22050,PI2=Math.PI*2;
let seed=7;const R=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296},U=(a,b)=>a+(b-a)*R();
const N=d=>Math.floor(SR*d),Z=d=>new Float32Array(N(d));
const T=(d,f)=>{const x=Z(d);for(let i=0;i<x.length;i++)x[i]=f(i/SR);return x};
const mul=(x,f)=>{for(let i=0;i<x.length;i++)x[i]*=f(i/SR);return x};
const noise=d=>T(d,()=>R()*2-1);
const ed=(x,k)=>mul(x,t=>Math.exp(-t*k));
function biq(x,ty,f,q){q=q||.707;f=Math.min(f,SR*.45);const w=PI2*f/SR,c=Math.cos(w),s=Math.sin(w),al=s/(2*q);let b0,b1,b2;
  if(ty=='lp'){b0=(1-c)/2;b1=1-c;b2=b0}else{b0=(1+c)/2;b1=-(1+c);b2=b0}
  const a0=1+al,a1=-2*c,a2=1-al,y=new Float32Array(x.length);let x1=0,x2=0,y1=0,y2=0;
  for(let i=0;i<x.length;i++){const v=(b0*x[i]+b1*x1+b2*x2-a1*y1-a2*y2)/a0;x2=x1;x1=x[i];y2=y1;y1=v;y[i]=v}return y}
const lp=(x,f)=>biq(biq(x,'lp',f),'lp',f),hp=(x,f)=>biq(biq(x,'hp',f),'hp',f),bp=(x,lo,hi)=>lp(hp(x,lo),hi);
function sweep(f0,f1,d){let ph=0;return T(d,t=>{ph+=PI2*f0*Math.pow(f1/f0,t/d)/SR;return Math.sin(ph)})}
const sine=(f,d)=>T(d,t=>Math.sin(PI2*f*t));
function place(buf,x,at,g){g=g==null?1:g;const n=Math.min(x.length,N(.008)),i0=Math.floor(at*SR);for(let i=0;i<x.length&&i0+i<buf.length;i++){let v=x[i];if(i>x.length-n)v*=(x.length-i)/n;buf[i0+i]+=v*g}}
function add(a,b,g){for(let i=0;i<a.length&&i<b.length;i++)a[i]+=b[i]*(g==null?1:g);return a}
function fade(x,fi,fo){const n1=N(fi),n2=N(fo);for(let i=0;i<n1&&i<x.length;i++)x[i]*=i/n1;for(let i=0;i<n2&&i<x.length;i++)x[x.length-1-i]*=i/n2;return x}
function peak(x){let m=0;for(const v of x)m=Math.max(m,Math.abs(v));return m||1}
// 리버브 (Freeverb 방식)
function verb(x,dur,mix,bright){
  fade(x,0,.03);const L=x.length+N(dur),inp=new Float32Array(L);inp.set(x);const wet=new Float32Array(L);
  const fb=Math.min(.94,.72+dur*.11),dp=1-Math.min(.85,bright/9000);
  [1116,1188,1277,1356,1422,1491,1557,1617].forEach(n=>{n=Math.floor(n*SR/44100);const b=new Float32Array(n);let k=0,fs=0;for(let i=0;i<L;i++){const y=b[k];fs=y*(1-dp)+fs*dp;b[k]=inp[i]+fs*fb;wet[i]+=y;k=(k+1)%n}});
  [556,441,341,225].forEach(n=>{n=Math.floor(n*SR/44100);const b=new Float32Array(n);let k=0;for(let i=0;i<L;i++){const bo=b[k],v=wet[i];wet[i]=-v+bo;b[k]=v+bo*.5;k=(k+1)%n}});
  const s=peak(x)/peak(wet)*.9;for(let i=0;i<L;i++)inp[i]=inp[i]*(1-mix)+wet[i]*s*mix;return inp}
function saw(f,d,nh,vib){const x=Z(d);for(let k=1;k<=nh;k++){if(f*k>SR/2.2)break;for(let i=0;i<x.length;i++){const t=i/SR;x[i]+=Math.sin(PI2*f*k*t*(vib?vib(t):1))/k}}return x}

const G={};
G.h_wheel=()=>{const d=1.8,buf=Z(d);add(buf,mul(lp(noise(d),260),t=>.9*(.6+.4*Math.sin(PI2*3.1*t))));
  for(let k=.05;k<d;k+=.21)place(buf,ed(bp(noise(.03),300,1400),120),k,.9);
  [.12,.55,.98,1.38].forEach((at,k)=>{const sd=.24+U(0,.08),fo=U(-80,80);let ph=0;const sq=T(sd,t=>{ph+=PI2*(1150+380*Math.sin(PI2*(2.2+k*.3)*t)+fo)/SR;return(Math.tanh(Math.sin(ph)*3.5)+.35*Math.sin(ph*2.01))*Math.pow(Math.sin(Math.PI*t/sd),1.5)*(1+.5*Math.sin(PI2*33*t))});place(buf,bp(sq,700,4200),at,.55)});
  return verb(buf,1,.35,3500)};
G.h_curse=()=>{const d=1.4,dr=T(d,t=>Math.sin(PI2*98*t)+Math.sin(PI2*103.5*t)+.7*Math.sin(PI2*138.6*t)+.4*Math.sin(PI2*196*t+Math.sin(PI2*.7*t))),wh=Z(d);
  [700,1150,2400,3300].forEach(c=>{const r=U(3,7);add(wh,mul(bp(noise(d),Math.max(200,c*.8),c*1.25),t=>.5+.5*Math.sin(PI2*r*t)))});
  const x=T(d,t=>0);for(let i=0;i<x.length;i++){const t=i/SR;x[i]=(dr[i]*.35+wh[i]*.9)*Math.pow(Math.min(1,t/.9),2)*Math.min(1,(d-t)/.25)}return verb(x,1.6,.45,3000)};
G.h_burst=()=>{const buf=Z(1.2);place(buf,mul(bp(noise(.35),400,3000),t=>Math.pow(t/.35,3)),0,.6);place(buf,ed(sweep(140,38,.9),4.5),.33,1);place(buf,ed(bp(noise(.25),150,2500),14),.33,.8);
  place(buf,ed(T(.8,t=>Math.sin(PI2*233*t)+Math.sin(PI2*329.6*t)),5),.33,.25);return verb(buf,1.4,.35,2500)};
G.h_ult=()=>{const d=2.4,buf=Z(d);place(buf,add(ed(hp(noise(.02),1500),250),ed(sine(90,.02),120)),0,1);
  let ph=0;const hum=Z(d),sq=Z(d);for(let i=0;i<hum.length;i++){const t=i/SR;ph+=PI2*60*(.2+.8*Math.exp(-t*1.4))/SR;let s=0;for(let k=1;k<=8;k++)s+=Math.sin(ph*k)/Math.pow(k,.6);hum[i]=s;sq[i]=Math.sign(Math.sin(ph*2))*.4}
  const bz=bp(sq,150,3000);for(let i=0;i<hum.length;i++){const t=i/SR;hum[i]=(hum[i]*.6+bz[i]*.5)*Math.exp(-t*1.3)*(1-Math.exp(-t*60))}
  [.25,.42,.5,.71].forEach(k=>{for(let i=N(k);i<N(k+.04);i++)hum[i]*=.1});add(buf,hum);place(buf,ed(sweep(70,28,1.6),2.5),.05,.6);return verb(buf,1.8,.4,2500)};
G.h_flicker=()=>{const d=.7;let z=T(d,t=>Math.sign(Math.sin(PI2*120*t))*.5+Math.sin(PI2*240*t)*.4+(R()*2-1)*.15);z=bp(z,180,5000);
  let gate=Z(d),i=0;while(i<gate.length){const L=N(U(.015,.08)),v=R()<.6?1:.05;for(let j=i;j<i+L&&j<gate.length;j++)gate[j]=v;i+=L}gate=biq(gate,'lp',120);
  for(let j=0;j<z.length;j++)z[j]*=gate[j]*Math.min(1,(d-j/SR)/.15);for(let k=0;k<5;k++)place(z,ed(hp(noise(.006),3000),600),U(0,.6),.6);return verb(z,.6,.2,6000)};
G.h_glass=()=>{const buf=Z(1.9);for(let k=0;k<5;k++){const at=k*.11+U(0,.04);place(buf,ed(hp(noise(.5),2500),9),at,.7);place(buf,ed(sine(U(70,110),.12),30),at,.4)}
  for(let k=0;k<90;k++){const at=Math.pow(U(.05,1.3),1.3),dd=U(.03,.12);place(buf,ed(sine(U(2500,9000),dd),U(40,90)),at,U(.08,.3))}return verb(buf,1,.3,9000)};
G.kick=()=>{const buf=Z(.45);place(buf,ed(sweep(180,55,.25),16),0,1);place(buf,ed(bp(noise(.05),700,4000),70),0,.9);place(buf,ed(sine(310,.18),22),.003,.35);
  place(buf,mul(ed(bp(noise(.3),1500,7000),9),t=>Math.sqrt(.2+.8*t/.3)),.02,.25);return verb(buf,.5,.12,6000)};
G.juggle=()=>{const buf=Z(.25);place(buf,ed(sweep(260,150,.15),28),0,1);place(buf,ed(bp(noise(.02),1200,5000),160),0,.6);place(buf,ed(sine(480,.1),40),0,.25);return buf};
G.tackle=()=>{const buf=Z(.7);place(buf,mul(bp(noise(.38),800,6000),t=>Math.pow(Math.max(0,Math.sin(Math.PI*t/.38)),.7)),0,.55);place(buf,ed(sweep(120,45,.35),10),.28,1);place(buf,ed(bp(noise(.12),200,2500),30),.28,.9);return verb(buf,.5,.15,5000)};
G.whistle=()=>{const buf=Z(1.05);const blow=dd=>{let ph=0;const n=bp(noise(dd),2000,4500);return T(dd,t=>{ph+=PI2*2850*(1+.03*Math.sin(PI2*34*t))/SR;return((Math.sin(ph)+.25*Math.sin(ph*2))*(.75+.25*Math.sin(PI2*34*t))+n[Math.min(n.length-1,Math.floor(t*SR))]*.25)*Math.min(1,t/.02)*Math.min(1,(dd-t)/.04)})};
  place(buf,blow(.16),0,1);place(buf,blow(.62),.26,1);return verb(buf,.6,.15,8000)};
G.goal=()=>{const d=3.2,crowd=Z(d),voices=Z(d);
  [350,600,900,1400,2200,3200].forEach(c=>{const r=U(.5,2),p=U(0,6);add(crowd,mul(bp(noise(d),c*.75,c*1.3),t=>.7+.3*Math.sin(PI2*r*t+p)))});
  for(let v=0;v<60;v++){const f0=U(150,420),vr=U(4,7),vp=U(0,6),st=U(0,.4),gn=U(.3,1);let ph=0;for(let i=0;i<voices.length;i++){const t=i/SR;ph+=f0*(1+.04*Math.sin(PI2*vr*t+vp))/SR;voices[i]+=(2*(ph%1)-1)*Math.min(1,Math.max(0,(t-st)/.2))*gn}}
  const vo=add(add(mul(bp(voices,600,1100),()=>1.4),bp(voices,1000,1500),.9),bp(voices,2400,3000),.4);
  const x=Z(d);for(let i=0;i<x.length;i++){const t=i/SR,env=Math.pow(Math.min(1,t/.35),1.5)*(t<1.6?1:Math.exp(-(t-1.6)*1.4));x[i]=(crowd[i]*.5+vo[i]*.07)*env}
  const cl=Z(d);for(let k=0;k<220;k++)place(cl,ed(bp(noise(.015),900,5000),300),U(.3,3),U(.1,.35));for(let i=0;i<x.length;i++){const t=i/SR;x[i]+=cl[i]*(t>.3?1:0)*Math.exp(-Math.max(0,t-1.8)*1.2)}
  return verb(x,1.6,.35,6000)};
G.champ=()=>{const brass=(f,dd,vel)=>{const s=add(saw(f,dd,30,t=>1+.006*Math.sin(PI2*5.5*t)*Math.min(1,t/.3)),saw(f*1.003,dd,30),.5);return mul(lp(s,Math.min(8000,f*7)),t=>Math.min(1,t/.03)*Math.exp(-t*.6)*Math.min(1,(dd-t)/.08)*(vel||1))};
  const buf=Z(3.6),G4=392,C5=523.25,E5=659.25,G5=783.99,C6=1046.5;
  [[0,G4,.14],[.15,C5,.14],[.3,E5,.14],[.45,G5,.42],[.9,E5,.14],[1.05,G5,.9]].forEach(([at,f,dd])=>place(buf,brass(f,dd),at,.5));
  [C5,E5,G5,C6].forEach(f=>place(buf,brass(f,1.7,.6),1.05,.35));[130.81,196].forEach(f=>place(buf,brass(f,1.8,.8),1.05,.4));
  const roll=Z(1);for(let k=0;k<1;k+=.045)place(roll,ed(sine(95,.12),25),k,.4+.6*k);place(buf,roll,.05,.5);
  place(buf,add(ed(sine(90,.8),5),ed(lp(noise(.8),300),8)),1.05,.9);place(buf,ed(hp(noise(1.6),5000),2.5),1.05,.15);return verb(buf,1.8,.3,7000)};

// ----- 김티비 • 똥먹방 / 김가은 • 웹툰마스터 -----
const bell=(f,dd,dec)=>T(dd,t=>(Math.sin(PI2*f*t)+(f*2.76<SR/2?.4*Math.sin(PI2*f*2.76*t)*Math.exp(-t*6):0)+(f*5.4<SR/2?.2*Math.sin(PI2*f*5.4*t)*Math.exp(-t*10):0))*Math.exp(-t*(dec||4)));
const nsaw=(fn,d)=>{let ph=0;return T(d,t=>{ph+=fn(t)/SR;return 2*(ph%1)-1})};
G.tv_throw=()=>{const d=.42,x=mul(add(bp(noise(d),500,1500),bp(noise(d),1500,3500),.6),t=>Math.pow(Math.sin(Math.PI*t/d),1.6)*(t<d*.5?.6:1));return verb(x,.35,.15,5000)};
G.tv_splat=()=>{const buf=Z(.55);place(buf,ed(sweep(160,60,.14),28),0,1);
  place(buf,mul(ed(bp(noise(.32),300,1800),9),t=>Math.pow(.5+.5*Math.sin(PI2*28*t),2)),.01,.9);
  for(let k=0;k<4;k++)place(buf,ed(sweep(U(300,500),U(110,190),.08),38),U(.03,.26),.45);return verb(buf,.4,.15,3000)};
G.tv_neigh=()=>{const d=1.3,f=t=>(t<.15?600+400*t/.15:t<.95?1000-500*(t-.15)/.8:500-200*Math.min(1,(t-.95)/.3))*(1+.08*Math.sin(PI2*11*t)*Math.min(1,t/.2));
  const v=nsaw(f,d),env=t=>Math.max(0,Math.min(1,t/.05)*Math.min(1,(1.22-t)/.15))*(.75+.25*Math.sin(PI2*11*t));
  const x=add(add(bp(v,650,1350),bp(v,2100,3300),.5),bp(noise(d),1000,4000),.12);mul(x,env);
  place(x,ed(bp(noise(.16),300,1500),15),1.12,.6);return verb(x,.7,.2,5000)};
G.tv_gallop=()=>{const buf=Z(1.55);for(let s=.05;s<1.4;s+=.3)[[0,.9],[.07,.7],[.14,1]].forEach(([o,gn])=>{const hit=add(add(mul(ed(bp(noise(.03),1500,4500),120),()=>.6),ed(sine(U(380,520),.05),60),.8),ed(sine(90,.08),40),.6);place(buf,hit,s+o,gn*U(.85,1))});
  mul(buf,t=>Math.min(1,t/.2)*Math.min(1,(1.55-t)/.35));return verb(buf,.4,.15,4000)};
G.tv_chomp=()=>{const buf=Z(.4);place(buf,mul(ed(hp(noise(.14),1500),20),()=>R()<.3?1:.12),0,.7);place(buf,ed(sweep(220,90,.18),14),.02,.6);
  place(buf,mul(ed(bp(noise(.2),400,1500),12),t=>Math.pow(.5+.5*Math.sin(PI2*35*t),2)),.05,.5);return verb(buf,.3,.1,4000)};
G.tv_live=()=>{const buf=Z(1.4);[[0,1318.5],[.12,1661.2],[.24,1975.5],[.36,2637]].forEach(([at,f])=>place(buf,bell(f,.9,4),at,.4));place(buf,ed(hp(noise(.8),6000),5),.05,.08);return verb(buf,1,.3,8000)};
G.wm_panel=()=>{const buf=Z(.65);place(buf,mul(bp(noise(.2),800,3000),t=>(.5+.5*Math.sin(PI2*25*t))*(t/.2)),0,.4);place(buf,ed(sweep(150,50,.28),14),.2,1);
  place(buf,ed(hp(noise(.04),1500),80),.2,.9);place(buf,ed(bp(noise(.2),2000,6000),15),.22,.3);return verb(buf,.5,.15,5000)};
G.wm_punch=()=>{const buf=Z(.75);place(buf,mul(bp(noise(.15),600,4000),t=>Math.pow(t/.15,2)),0,.5);place(buf,ed(sweep(220,45,.4),9),.15,1);
  place(buf,ed(bp(noise(.08),300,4000),40),.15,1);place(buf,ed(sine(55,.5),6),.15,.5);return verb(buf,.6,.15,4000)};
G.wm_tierup=()=>{const buf=Z(1.3),C=[1046.5,1318.5,1568,2093];C.forEach((f,i)=>place(buf,bell(f,.9,5),i*.08,.45));C.forEach(f=>place(buf,bell(f,1,3),.32,.25));
  place(buf,mul(ed(hp(noise(1),6000),3),t=>.5+.5*Math.sin(PI2*14*t)),.2,.12);return verb(buf,1.2,.3,9000)};
G.wm_gem=()=>{const buf=Z(.5);place(buf,bell(2349,.45,9),0,1);place(buf,bell(3136,.3,12),.01,.5);place(buf,ed(hp(noise(.01),4000),300),0,.5);return verb(buf,.5,.25,9000)};
G.wm_ult=()=>{const d=1.8,buf=Z(d);[261.6,329.6,392,523.2].forEach(f=>place(buf,mul(lp(nsaw(t=>f*(1+.5*t/d),d),2200),t=>Math.min(1,t/1.2)*Math.min(1,(d-t)/.3)),0,.25));
  place(buf,mul(sweep(400,2400,1.5),t=>Math.sin(Math.PI*t/1.5)),0,.3);place(buf,mul(hp(noise(d),5000),t=>Math.pow(t/d,2)),0,.15);return verb(buf,1.6,.4,7000)};
G.wm_crash=()=>{const buf=Z(1.6);place(buf,ed(sweep(110,35,1),3.5),0,1);place(buf,ed(hp(noise(.3),1500),12),0,.8);
  for(let k=0;k<50;k++){const dd=U(.04,.14);place(buf,ed(sine(U(2000,8000),dd),U(40,90)),Math.pow(U(0,.8),1.4),U(.08,.25))}
  [523.25,659.25,783.99].forEach(f=>place(buf,bell(f,1.2,3),0,.3));return verb(buf,1.2,.35,9000)};

// ----- 김건우 • 레디언트 / 흉악범 • 절도범 -----
G.rd_flick=()=>{const buf=Z(.5);place(buf,ed(hp(noise(.03),2000),90),0,1);place(buf,ed(sweep(900,120,.06),50),0,.8);place(buf,ed(sine(120,.1),30),0,.7);place(buf,ed(bp(noise(.25),3000,7000),14),.02,.2);return verb(buf,.5,.15,8000)};
G.rd_head=()=>{const buf=Z(.5);place(buf,bell(3500,.5,8),0,1);place(buf,bell(4700,.3,12),.005,.4);place(buf,ed(hp(noise(.008),4000),400),0,.6);return verb(buf,.4,.2,9000)};
G.rd_flash=()=>{const buf=Z(1.4);place(buf,bell(2600,.12,30),0,.3);place(buf,bell(2600,.12,30),.07,.25);place(buf,ed(hp(noise(.14),800),28),.15,1);place(buf,ed(sweep(300,80,.16),20),.15,.9);
  place(buf,mul(sine(3800,1.1),t=>Math.min(1,t/.05)*Math.exp(-t*1.6)),.17,.18);return verb(buf,.6,.2,8000)};
G.rd_dash=()=>{const d=.35;return verb(mul(add(bp(noise(d),800,5000),bp(noise(d),300,900),.5),t=>Math.pow(Math.sin(Math.PI*t/d),1.4)*(.5+t/d)),.3,.12,6000)};
G.rd_plant=()=>{const buf=Z(1);[0,.12,.24,.36].forEach((at,k)=>{place(buf,ed(bp(noise(.02),1500,6000),180),at,.7);place(buf,ed(sine(900+k*120,.05),60),at,.3)});
  place(buf,mul(sweep(300,900,.4),t=>.4*Math.sin(Math.PI*t/.4)),.42,1);place(buf,bell(1760,.5,6),.85,.4);place(buf,bell(2349,.5,6),.85,.25);return verb(buf,.5,.15,7000)};
G.rd_beep=()=>{const buf=Z(.12);place(buf,mul(T(.1,t=>Math.sign(Math.sin(PI2*1950*t))*.4+Math.sin(PI2*3900*t)*.2),t=>Math.min(1,t/.004)*Math.exp(-t*25)),0,1);return lp(buf,7000)};
G.rd_boom=()=>{const buf=Z(2.2);place(buf,mul(sweep(200,1200,.35),t=>.35*Math.pow(t/.35,2)),0,1);place(buf,mul(hp(noise(.35),2000),t=>.3*Math.pow(t/.35,3)),0,1);
  place(buf,ed(hp(noise(.08),800),40),.36,1);place(buf,ed(sweep(130,28,1.6),2.2),.36,1);place(buf,ed(lp(noise(1.6),500),2.5),.36,.9);place(buf,ed(bp(noise(1),1500,6000),5),.38,.25);return verb(buf,1.8,.35,3500)};
G.th_snatch=()=>{const d=.3,buf=Z(d);place(buf,mul(bp(noise(d),1500,6000),t=>Math.pow(Math.sin(Math.PI*t/d),2)),0,.8);place(buf,mul(ed(bp(noise(.18),2000,5000),10),()=>R()<.25?1:.1),.05,.6);return verb(buf,.3,.12,7000)};
G.th_coin=()=>{const buf=Z(.6);for(let k=0;k<6;k++){const at=U(0,.3),f=U(3000,5200);place(buf,bell(f,.25,U(14,22)),at,U(.3,.6))}return verb(buf,.4,.2,9000)};
G.th_hook=()=>{const buf=Z(.55);place(buf,mul(bp(noise(.25),700,4000),t=>Math.sin(Math.PI*t/.25)),0,.7);place(buf,bell(1200,.12,30),.26,.6);place(buf,ed(bp(noise(.03),1500,6000),120),.26,.8);return verb(buf,.3,.12,6000)};
G.th_steal=()=>{const buf=Z(.6);[[0,880],[.08,660],[.16,440]].forEach(([at,f])=>place(buf,mul(T(.12,t=>Math.sin(PI2*f*t)+.3*Math.sin(PI2*f*3*t)),t=>Math.exp(-t*14)),at,.6));place(buf,ed(hp(noise(.3),5000),8),.05,.1);return verb(buf,.4,.15,8000)};
G.th_ult=()=>{const d=1.6,buf=Z(d);[0,.45].forEach(at=>place(buf,ed(sweep(70,45,.4),6),at,.9));place(buf,mul(bp(noise(.5),600,4000),t=>Math.sin(Math.PI*t/.5)),.05,.4);
  place(buf,mul(T(1.3,t=>Math.sin(PI2*622*t)+Math.sin(PI2*659*t)*.7),t=>.12*Math.min(1,t/.6)*Math.min(1,(1.3-t)/.3)),.25,1);return verb(buf,1.2,.35,5000)};
G.th_cash=()=>{const buf=Z(1.1);place(buf,ed(bp(noise(.04),800,5000),90),0,.9);place(buf,ed(sine(180,.06),50),0,.5);place(buf,bell(2000,.9,4),.07,.6);place(buf,bell(2660,.9,4),.07,.45);
  for(let k=0;k<6;k++)place(buf,bell(U(3200,5000),.2,20),U(.15,.45),U(.2,.4));return verb(buf,.6,.2,9000)};

function wav(x,pk){fade(x,.003,.05);const s=(pk||.89)/peak(x),n=x.length,b=new ArrayBuffer(44+n*2),v=new DataView(b),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,SR,true);v.setUint32(28,SR*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++)v.setInt16(44+i*2,Math.max(-1,Math.min(1,x[i]*s))*32767,true);return b}
function dataURI(buf){const u=new Uint8Array(buf);let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return 'data:audio/wav;base64,'+btoa(s)}
const PK={h_flicker:.75,juggle:.7,whistle:.7,tv_gallop:.8,wm_gem:.75,rd_head:.7,rd_beep:.6,th_coin:.7};
function use(n,buf){
  if(AUD[n]&&AUD[n].ok)return;            // sounds 폴더에 진짜 파일이 있으면 그걸 사용
  let url;try{url=URL.createObjectURL(new Blob([buf],{type:'audio/wav'}))}catch(e){url=dataURI(buf)}
  const pool=new SoundPool(url,3);pool.pool.forEach(a=>a.addEventListener('error',()=>{if(a.src.indexOf('data:')!=0){a.src=dataURI(buf);a.bad=0;a.load()}},{once:true}));AUD[n]=pool;
}
window.GENSFX=Object.keys(G);
function run(){const L=Object.keys(G);let i=0;const nx=()=>{if(i>=L.length)return;const n=L[i++];try{if(!(AUD[n]&&AUD[n].ok)){seed=7+i*101;use(n,wav(G[n](),PK[n]))}}catch(e){SERR='효과음 생성 실패: '+n}setTimeout(nx,30)};nx()}
setTimeout(run,2500);
})();
