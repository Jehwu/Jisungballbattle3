// ===== extra10.js : 박지성 • 샌즈 (뼈 · 파란 영혼 · 블래스터) + 박르노 스탠드 그림 =====

// ---------- 그림 슬롯 (images 폴더) ----------
const SLOT={};
function slotLoad(name){if(name in SLOT)return;SLOT[name]=null;const L=[];['images/','','../images/'].forEach(d=>['png','webp','jpg','jpeg'].forEach(e=>L.push(d+name+'.'+e)));
  const go=i=>{if(i>=L.length)return;const im=new Image();im.onload=()=>{try{SLOT[name]=typeof oniCut=='function'?oniCut(im):im}catch(e){SLOT[name]=im}};im.onerror=()=>go(i+1);im.src=L[i]};go(0)}
['sn_blaster','sn_sans','ge_stand','ger_stand'].forEach(slotLoad);

// ======================================================================
// 박르노 박바나 : 항상 뒤에 떠 있는 스탠드 (images/ge_stand · ger_stand)
// ======================================================================
const _afterGE=afterImg;afterImg=function(f){_afterGE(f);if(f.dead||f.hid||phase=='menu'||!f.d||(f.d.k!='ge'&&f.d.k!='ger'))return;const im=f.d.k=='ger'?(SLOT.ger_stand||SLOT.ge_stand):SLOT.ge_stand;if(!im)return;
  const H=f.r*4.2,W=H*im.width/im.height,bob=Math.sin(clock*2.2+f.i)*4,dir=f.dx<0?-1:1;g.save();g.translate(f.x-dir*f.r*.9,f.y-f.r*.6+bob);
  g.save();g.globalCompositeOperation='lighter';glow(f.d.k=='ger'?'#cfe6ff':'#ffcc33',0,-H*.45,H*.55,.3);g.restore();
  g.globalAlpha=.88;if(dir<0)g.scale(-1,1);g.drawImage(im,-W/2,-H*.92,W,H);g.restore()};

// ======================================================================
// 박지성 • 샌즈
// ======================================================================
const NEW20=['sn_bone','sn_warn','sn_sweep','sn_blue','sn_slam','sn_gbc','sn_gbf','sn_text','sn_miss','sn_ult'];
NEW20.forEach(n=>{if(!SND.includes(n))SND.push(n);if(!AUD[n])AUD[n]=new SoundPool('sounds/'+n+'.mp3',n=='sn_text'||n=='sn_bone'||n=='sn_gbf'?6:3)});
Object.assign(SLB,{sn_bone:'샌즈 · 뼈 솟구침',sn_warn:'샌즈 · 경고음',sn_sweep:'샌즈 · 뼈 벽',sn_blue:'샌즈 · 파란 영혼',sn_slam:'샌즈 · 벽에 쾅',sn_gbc:'샌즈 · 블래스터 충전',sn_gbf:'샌즈 · 블래스터 발사',sn_text:'샌즈 · 대사 글자',sn_miss:'샌즈 · 회피',sn_ult:'샌즈 · 궁 시작'});
const SNSK=[
  {n:'뼈 공격',w:.3,cd:7,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snBones(o,t)},
  {n:'파란 영혼',w:.35,cd:10,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snBlue(o,t)},
  {n:'나쁜 시간',w:.6,ult:1,c:(o,t)=>!t.hid&&!t.jump,f:(o,t)=>snUlt(o,t)}];
const SNI=DEF.findIndex(d=>d.name=='박지성');
DEF.push({name:'박지성 • 샌즈',gl:'샌',k:'sans',vof:SNI,r:25,sp:200,col:'#5ab4ff',hi:'#eaf6ff',dk:'#0a1a30',alt:{col:'#ffd23a',hi:'#fff6d0',dk:'#3a2a04'},alt2:{col:'#ff5a8a',hi:'#ffe0ea',dk:'#3a0a1a'},sk:SNSK});
INFO['박지성 • 샌즈']={st:[7,8,6,9,8,10],p:'회피 · 13% 확률로 공격을 슥 피함 (MISS) · 뼈에 맞은 적은 보라색 독이 퍼짐',
  sk:[['3.5+3+독','경고 표시 뒤 바닥에서 뼈가 솟구치고, 이어서 뼈 벽이 경기장을 가로질러 지나감'],['2.2×3','상대의 영혼을 파랗게 바꿔 벽에 내리꽂고, 그 벽에서 뼈가 세 번 솟구침'],['2.2×5+3+6','화면이 까맣게 변하고 대사와 함께 전투 상자에 가둔 뒤 블래스터 다섯 발 · 뼈 벽 · 마지막 일제 사격']]};

// ---------- 패시브 : 회피 · 보라색 독 ----------
const _hurtSN=hurt;hurt=function(t,n,o){if(t&&t.d&&t.d.k=='sans'&&o&&o!=t&&!t.dead&&Math.random()<.13&&n>0){const a=ang(o,t)+Math.PI/2*(Math.random()<.5?1:-1);FX.push({k:'ghost',x:t.x,y:t.y,r:t.r,c:t.d.col,l:.3,m:.3});t.x=clamp(t.x+Math.cos(a)*34,t.r,A-t.r);t.y=clamp(t.y+Math.sin(a)*34,t.r,A-t.r);
  SFXa('sn_miss');T.push({x:t.x,y:t.y-t.r-30,txt:'MISS',col:'#c8c8c8',size:20,l:1});return}return _hurtSN.apply(this,arguments)};
function snPoison(e,o,d){e.snkr=Math.max(e.snkr||0,d);e.snko=o}
const _updSN=update;update=function(dt){_updSN(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD)return;F.forEach(f=>{if(!(f.snkr>0)||f.dead)return;if(CIN&&f!=CIN.o)return;f.snkr-=dt;f.snkt=(f.snkt||0)-dt;if(f.snkt<=0){f.snkt=.5;const s0=f.shield;f.shield=0;_hurtSN(f,.8,f.snko||f,f.x,f.y,0,0);f.shield=s0}})};
const _lowSN=lowHP;lowHP=function(f){_lowSN(f);if(f.snkr>0&&!f.dead&&!f.hid){g.save();g.globalCompositeOperation='lighter';glow('#c040ff',f.x,f.y,f.r*1.8,.35);g.restore()}};

// ---------- 그림 ----------
function snBone(x,y,L,w,a,al,col){g.save();g.translate(x,y);g.rotate(a);g.globalAlpha=al==null?1:al;g.fillStyle=col||'#ffffff';g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1;
  const h=L/2;g.fillRect(-h+w*.5,-w*.32,L-w,w*.64);[-1,1].forEach(sd=>{[-1,1].forEach(k=>{g.beginPath();g.arc(sd*(h-w*.45),k*w*.3,w*.42,0,TAU);g.fill()})});g.restore()}
function snHeart(x,y,s,col,al){g.save();g.translate(x,y+s*3);g.scale(s,s);g.globalAlpha=al==null?1:al;heartPath();g.fillStyle=col;g.fill();g.restore()}
function snBlasterArt(s,open,glw,al){const im=SLOT.sn_blaster;g.save();g.globalAlpha=al==null?1:al;
  if(im){const H=70*s,W=H*im.width/im.height;g.rotate(Math.PI/2);g.drawImage(im,-W/2,-H/2,W,H);g.rotate(-Math.PI/2)}
  else{// 기본 : 뼈 고리 포 (회전하는 뼈 8개 + 가운데 빛)
    g.scale(s,s);for(let i=0;i<8;i++){const a=i*TAU/8+clock*3;snBone(Math.cos(a)*22,Math.sin(a)*22,18,6,a+Math.PI/2,1)}g.fillStyle='#0a0a12';g.beginPath();g.arc(0,0,14+open*4,0,TAU);g.fill();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke()}
  if(glw>0){g.save();g.globalCompositeOperation='lighter';glow('#ffffff',im?28*s:0,0,(14+26*glw)*s,glw);glow('#5ab4ff',im?28*s:0,0,(20+40*glw)*s,.6*glw);g.restore()}g.restore()}
function snBeam(x,y,a,L,w,al){g.save();g.translate(x,y);g.rotate(a);g.globalCompositeOperation='lighter';g.globalAlpha=al;const gr=g.createLinearGradient(0,-w,0,w);gr.addColorStop(0,'rgba(90,180,255,0)');gr.addColorStop(.3,'rgba(200,230,255,.8)');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,'rgba(200,230,255,.8)');gr.addColorStop(1,'rgba(90,180,255,0)');
  g.fillStyle=gr;g.fillRect(0,-w,L,w*2);g.fillStyle='#ffffff';g.fillRect(0,-w*.35,L,w*.7);g.restore()}
function snBox(x,y,s){g.save();g.translate(x,y);g.fillStyle='#000';g.fillRect(-s/2,-s/2,s,s);g.strokeStyle='#ffffff';g.lineWidth=4;g.strokeRect(-s/2,-s/2,s,s);g.restore()}
function snDialog(txt,a){g.save();g.globalAlpha=a;const x=20,y=A-118,w=A-40,h=96;g.fillStyle='#000';g.fillRect(x,y,w,h);g.strokeStyle='#ffffff';g.lineWidth=5;g.strokeRect(x,y,w,h);
  g.font='700 24px monospace';g.fillStyle='#ffffff';g.textBaseline='top';g.textAlign='left';g.fillText('* '+txt,x+20,y+22);g.restore()}

// ---------- 아이콘 (네온 파란 하트 + 뼈 두 개) ----------
EMB.sans=(f,D)=>{g.rotate(-f.rot+Math.sin(clock*2)*.05);
  neon({col:'#ffffff',hi:'#ffffff'},1.4,()=>{g.beginPath();[-1,1].forEach(sd=>{g.save();g.rotate(sd*.75);g.moveTo(-17,0);g.lineTo(17,0);g.moveTo(-17,-3);g.arc(-19,-3,2.4,0,TAU);g.moveTo(-17,3);g.arc(-19,3,2.4,0,TAU);g.moveTo(21,-3);g.arc(19,-3,2.4,0,TAU);g.moveTo(21,3);g.arc(19,3,2.4,0,TAU);g.restore()})});
  g.save();g.scale(1.1,1.1);g.translate(0,3);heartPath();g.fillStyle=D.col;g.fill();g.restore();g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,14,.6);g.restore()};

// ---------- 1) 뼈 공격 ----------
function snBones(o,t){const W=130,H=80;HZ.push({k:'snbone',o,tg:t,t:0,x:t.x,y:t.y,W,H,ph:0,hit:new Set(),sw:null});SFXa('sn_warn')}
HZX.snbone=(h,dt,EN)=>{const o=h.o,e=h.tg;const W0=.45;
  if(h.t<W0*.6&&e&&!e.dead){h.x+=(e.x-h.x)*Math.min(1,dt*8);h.y+=(e.y-h.y)*Math.min(1,dt*8)}
  if(h.t>=W0&&!h.up){h.up=1;SFXa('sn_bone');shake=Math.max(shake,6);EN.forEach(x=>{if(x.hid||x.jump)return;if(Math.abs(x.x-h.x)<h.W/2+x.r*.5&&Math.abs(x.y-h.y)<h.H/2+x.r*.5){hurt(x,3.5,o,x.x,x.y,0,0);snPoison(x,o,1.5);x.stn=Math.max(x.stn,.2)}})}
  if(h.t>=W0+.45&&!h.sw){const fromL=(e&&!e.dead?e.x:h.x)>A/2;h.sw={x:fromL?-20:A+20,d:fromL?1:-1,y:e&&!e.dead?e.y:h.y};SFXa('sn_sweep')}
  if(h.sw){h.sw.x+=h.sw.d*560*dt;EN.forEach(x=>{if(h.hit.has(x)||x.hid||x.jump)return;if(Math.abs(x.x-h.sw.x)<14+x.r&&Math.abs(x.y-h.sw.y)<90+x.r*.3){h.hit.add(x);hurt(x,3,o,x.x,x.y,0,0);snPoison(x,o,1.2)}});if(h.sw.x<-60||h.sw.x>A+60)return false}
  return h.t<3};
HZD.snbone=h=>{const W0=.45;if(h.t<W0){const bl=Math.floor(h.t*14)%2;g.save();g.translate(h.x,h.y);g.strokeStyle=bl?'#ff3040':'#ffffff';g.lineWidth=3;g.setLineDash([8,6]);g.strokeRect(-h.W/2,-h.H/2,h.W,h.H);g.setLineDash([]);g.fillStyle=bl?'rgba(255,48,64,.15)':'rgba(255,255,255,.08)';g.fillRect(-h.W/2,-h.H/2,h.W,h.H);g.font='700 13px monospace';g.fillStyle='#ffffff';g.textAlign='center';g.fillText('!',0,-h.H/2-8);g.restore()}};
HZP.snbone=h=>{const W0=.45;if(h.up&&h.t<W0+.75){const q=h.t-W0,u=q<.12?q/.12:q<.5?1:clamp(1-(q-.5)/.25,0,1);g.save();g.beginPath();g.rect(h.x-h.W/2-10,h.y-h.H/2-50,h.W+20,h.H+60);g.clip();
    for(let i=0;i<7;i++){const bx=h.x-h.W/2+10+i*(h.W-20)/6,L=(36+((i*37)%3)*10)*u;snBone(bx,h.y+h.H/2-L/2,Math.max(10,L),9,Math.PI/2,1)}g.restore()}
  if(h.sw){for(let k=-3;k<=3;k++){const L=26+((k+3)%2)*12;snBone(h.sw.x,h.sw.y+k*26,L,9,Math.PI/2,1)}g.save();g.globalCompositeOperation='lighter';g.fillStyle='rgba(255,255,255,.12)';g.fillRect(h.sw.x-h.sw.d*60,h.sw.y-95,h.sw.d*60,190);g.restore()}};

// ---------- 2) 파란 영혼 ----------
function snBlue(o,t){HZ.push({k:'snblue',o,tg:t,t:0,ph:0,n:0});SFXa('sn_blue')}
HZX.snblue=(h,dt)=>{const o=h.o,e=h.tg;if(!e||e.dead||e.hid)return false;
  if(h.ph==0){h.ph=1;const d=[[e.x,0],[A-e.x,1],[e.y,2],[A-e.y,3]].sort((a,b)=>a[0]-b[0])[0][1];h.w=d;h.sx=e.x;h.sy=e.y;h.tx=d==0?e.r:d==1?A-e.r:e.x;h.ty=d==2?e.r:d==3?A-e.r:e.y;e.stn=Math.max(e.stn,1.6);e.cast=null}
  if(h.t<.4){const u=clamp((h.t-.15)/.25,0,1),uu=u*u;e.x=h.sx+(h.tx-h.sx)*uu;e.y=h.sy+(h.ty-h.sy)*uu;e.stn=Math.max(e.stn,.3)}
  else{if(!h.sl){h.sl=1;SFXa('sn_slam');shake=Math.max(shake,12);spark(e.x,e.y,'dust',14,220);ring(e.x,e.y,6,70,'#5ab4ff',6,.35);if(typeof wallFlash=='function')wallFlash(e.x,e.y,'#5ab4ff')}e.x=h.tx+(h.w==0||h.w==1?0:e.x-h.tx);e.y=h.ty+(h.w>=2?0:e.y-h.ty);
    if(h.n<3&&h.t>=.6+h.n*.35){h.n++;h.bt=h.t;SFXa('sn_bone');hurt(e,2.2,o,e.x,e.y,0,0);snPoison(e,o,1);shake=Math.max(shake,5)}}
  return h.t<1.9};
HZP.snblue=h=>{const e=h.tg;if(!e||e.dead)return;const a=clamp((1.9-h.t)/.3,0,1);
  // 중력 방향 표시
  if(h.t<.45){g.save();g.globalAlpha=.6;g.strokeStyle='#5ab4ff';g.lineWidth=3;const dx=h.w==0?-1:h.w==1?1:0,dy=h.w==2?-1:h.w==3?1:0;for(let k=0;k<3;k++){const o2=((clock*200+k*30)%90);g.beginPath();g.moveTo(e.x+dx*(o2-20)-dy*12,e.y+dy*(o2-20)-dx*12);g.lineTo(e.x+dx*o2,e.y+dy*o2);g.lineTo(e.x+dx*(o2-20)+dy*12,e.y+dy*(o2-20)+dx*12);g.stroke()}g.restore()}
  snHeart(e.x,e.y,1.1+.08*Math.sin(clock*10),'#2a7bff',a);
  // 벽에서 솟는 뼈
  if(h.bt!=null&&h.t-h.bt<.3){const q=(h.t-h.bt)/.3,L=60*Math.sin(Math.PI*q),ang0=h.w==0?0:h.w==1?Math.PI:h.w==2?Math.PI/2:-Math.PI/2;for(let k=-2;k<=2;k++){const px=(h.w>=2?e.x+k*18:h.tx),py=(h.w<2?e.y+k*18:h.ty),bx=px+Math.cos(ang0)*(L/2-e.r),by=py+Math.sin(ang0)*(L/2-e.r);snBone(bx,by,Math.max(8,L+Math.abs(k)*-6),8,ang0,1)}}};

// ---------- 3) ULT 나쁜 시간 (연출 : 다른 사람은 멈춤) ----------
const SN_L=['와! 샌즈! 아시는구나!','이런 날엔, 너 같은 녀석은…','지옥에서 불타야 해.'];
function snUlt(o,t){SFXa('sn_ult');
  CIN={o,e:t,t:0,bx:clamp(t.x,110,A-110),by:clamp(t.y,140,A-170),gb:[],bw:[],n:0,ln:0,ch:0,ox:o.x,oy:o.y,
  tick(dt){const o=this.o;let e=this.e;if(!e||e.dead)return this.t<(this.endT||(this.endT=this.t+.5));const t=this.t,S=150;o.gcd=Math.max(o.gcd,.5);
    // 박지성은 상자 위로
    const tx=this.bx,ty=this.by-S/2-60;o.x+=(tx-o.x)*Math.min(1,dt*5);o.y+=(ty-o.y)*Math.min(1,dt*5);
    // 상대를 상자 안으로
    if(t>.9){e.x+=(this.bx-e.x)*Math.min(1,dt*6);e.y+=(this.by-e.y)*Math.min(1,dt*6)}
    // 대사
    const LT=[0,1.15,3.3];for(let i=0;i<3;i++)if(t>=LT[i])this.ln=i;const lt=t-LT[this.ln],nc=Math.min(SN_L[this.ln].length,Math.floor(lt*16));if(nc!=this.ch){if(nc>this.ch&&nc%2==0)SFXa('sn_text');this.ch=nc}
    // 블래스터 다섯
    const G0=1.3,GS=.38;if(this.n<5&&t>=G0+this.n*GS){const a=this.n*2.2+rnd(-.3,.3),R=150;this.gb.push({x:this.bx+Math.cos(a)*R,y:this.by+Math.sin(a)*R,a:a+Math.PI,t0:t,f:0,big:0});this.n++;SFXa('sn_gbc')}
    this.gb.forEach(b=>{const k=t-b.t0;if(!b.f&&k>=(b.big?.5:.45)){b.f=1;b.ft=t;SFXa('sn_gbf');shake=Math.max(shake,b.big?18:9);if(!e.dead){const px=e.x-b.x,py=e.y-b.y,al=px*Math.cos(b.a)+py*Math.sin(b.a),pe=Math.abs(-px*Math.sin(b.a)+py*Math.cos(b.a));if(al>0&&pe<(b.big?40:26)+e.r){hurt(e,b.big?1:2.2,o,e.x,e.y,0,b.big?1:0);snPoison(e,o,.8)}}}});
    // 뼈 벽 두 번
    [2.0,2.7].forEach((tw,i)=>{if(t>=tw&&!this.bw[i]){this.bw[i]={x:i%2?this.bx+S/2+20:this.bx-S/2-20,d:i%2?-1:1,hit:0};SFXa('sn_sweep')}});
    this.bw.forEach(w=>{if(!w)return;w.x+=w.d*380*dt;if(!w.hit&&Math.abs(w.x-e.x)<12+e.r){w.hit=1;hurt(e,1.5,o,e.x,e.y,0,0);snPoison(e,o,.8)}});
    // 마지막 : 일제 사격
    if(t>=3.6&&!this.fin){this.fin=1;for(let i=0;i<6;i++){const a=i*TAU/6+.3;this.gb.push({x:this.bx+Math.cos(a)*170,y:this.by+Math.sin(a)*170,a:a+Math.PI,t0:t,f:0,big:1})}SFXa('sn_gbc')}
    if(this.fin&&t>4.9)return false;return t<7},
  draw(){const o=this.o,e=this.e,t=this.t,S=150,a=Math.min(1,t/.4)*(this.fin?clamp(1-(t-4.6)/.3,0,1):1);
    g.save();g.globalAlpha=a;g.fillStyle='#000';g.fillRect(-300,-300,A+600,A+600);g.restore();
    if(t>.9){const s=Math.min(1,(t-.9)/.2);g.save();g.globalAlpha=a;snBox(this.bx,this.by,S*s);g.restore()}
    // 샌즈 그림 또는 박지성 공
    const si=SLOT.sn_sans;if(si){const H=110,W=H*si.width/si.height;g.save();g.globalAlpha=a;g.drawImage(si,o.x-W/2,o.y-H*.8+Math.sin(clock*2)*2,W,H);g.restore()}else if(!o.dead){g.save();g.globalAlpha=a;ball(o,e);g.restore()}
    // 영혼 (하트)
    if(e&&!e.dead){if(t>.9)snHeart(e.x,e.y,1.3,'#ff2030',a);else{g.save();g.globalAlpha=a;ball(e,o);g.restore()}}
    // 뼈 벽
    this.bw.forEach(w=>{if(!w)return;g.save();g.beginPath();g.rect(this.bx-S/2+3,this.by-S/2+3,S-6,S-6);g.clip();for(let k=-2;k<=2;k++)snBone(w.x,this.by+k*28,k%2?40:56,9,Math.PI/2,a);g.restore()});
    // 블래스터
    this.gb.forEach(b=>{const k=t-b.t0,sc=(b.big?1.25:1)*back(clamp(k/.2,0,1));if(b.f&&t-b.ft>.45)return;const fa=b.f?clamp(1-(t-b.ft-.25)/.2,0,1):1;
      if(b.f){const bw=(b.big?30:20)*(1-Math.max(0,t-b.ft-.2)/.25);if(bw>0)snBeam(b.x,b.y,b.a,700,bw,a*fa)}
      g.save();g.translate(b.x-(b.f?Math.cos(b.a)*20*Math.min(1,(t-b.ft)/.1):0),b.y-(b.f?Math.sin(b.a)*20*Math.min(1,(t-b.ft)/.1):0));g.rotate(b.a);snBlasterArt(sc,b.f?1:clamp(k/.45,0,1),b.f?0:clamp((k-.2)/.25,0,1),a*fa);g.restore()});
    // 대사 상자
    const txt=SN_L[this.ln].slice(0,this.ch);snDialog(txt,a)}};
  ft(o.x,o.y-o.r-40,'...','#ffffff',22)}

// ---------- 배지/아이콘 갱신 ----------
document.querySelectorAll('#grid .tile').forEach(t=>{const i=+t.dataset.i,vc=DEF.filter(x=>x.vof===i).length;let em=t.querySelector('.vb');if(vc){if(!em){em=document.createElement('em');em.className='vb';t.appendChild(em)}em.textContent='+'+vc}});
Object.keys(ICC).forEach(k=>delete ICC[k]);mkDict();
