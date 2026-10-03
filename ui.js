// ===== ui.js : 화면 애니메이션 + 사운드 만들기 우선순위 =====

// ---------- 지금 싸우는 캐릭터 소리를 먼저 만들기 ----------
const SPFX={horror:['h_'],soccer:['kick','juggle','tackle','whistle','goal'],poop:['tv_'],master:['wm_'],radiant:['rd_'],thief:['th_'],bl:['bl_'],krl:['kr_'],chal:['ch_'],ge:['ge_'],ger:['ge_'],wk:['wk_'],pica:['pc_'],wick:['jw_'],oni:['oni_'],rage:['rg_','oni_'],ttd:['tt_'],kmj:['kj_'],sans:['sn_'],hsol:['hs_'],ezr:['ez_'],jett:['jt_'],terr:['tr_']};
function sndPri(ks){if(!window.GENPRI||!window.GENSFX)return;const P=[];ks.forEach(k=>(SPFX[k]||[]).forEach(p=>P.push(p)));if(!P.length)return;GENPRI(GENSFX.filter(n=>P.some(p=>n==p||n.startsWith(p))))}
const _initUI=init;init=function(){const r=_initUI.apply(this,arguments);try{if(F)sndPri(F.map(f=>f.d.k))}catch(e){}return r};

// ---------- 사운드 만드는 중 표시 ----------
(function(){const b=document.createElement('div');b.id='sgen';b.innerHTML='<i></i><span></span>';document.body.appendChild(b);
  const tick=()=>{if(!window.GENSTAT){setTimeout(tick,500);return}const [d,n]=GENSTAT();b.querySelector('span').textContent='사운드 만드는 중 '+d+' / '+n;b.querySelector('i').style.width=(d/n*100)+'%';
    if(d>=n){b.classList.add('done');b.querySelector('span').textContent='사운드 준비 완료';setTimeout(()=>b.remove(),2200);return}b.classList.toggle('show',true);setTimeout(tick,300)};setTimeout(tick,800)})();

// ---------- 차례로 나타나는 애니메이션 (순서값 넣기) ----------
function uiStagger(sel,step){document.querySelectorAll(sel).forEach((el,i)=>{el.style.setProperty('--d',(Math.min(i,24)*(step||.03))+'s');el.classList.remove('uin');void el.offsetWidth;el.classList.add('uin')})}
const _mkMenuUI=mkMenu;mkMenu=function(){_mkMenuUI.apply(this,arguments);uiStagger('#grid .tile',.025)};
const _mkDictUI=mkDict;mkDict=function(){_mkDictUI.apply(this,arguments);uiStagger('#dgrid .tile',.02)};
const _openInfoUI=openInfo;openInfo=function(){_openInfoUI.apply(this,arguments);uiStagger('#dsk .dsk',.06)};
const _scrUI=scr;scr=function(id){_scrUI.apply(this,arguments);
  if(id=='hub')uiStagger('#hub .hb',.08);if(id=='modes')uiStagger('#modes .mc',.08);if(id=='menu')uiStagger('#grid .tile',.02);if(id=='dict')uiStagger('#dgrid .tile',.015);if(id=='set')uiStagger('#sgrid > *',.012)};
// 선택 슬롯 바뀔 때 튀어오르기
const _paintMenuUI=paintMenu;paintMenu=function(){_paintMenuUI.apply(this,arguments);const s=document.querySelector('.slot.on');if(s&&s.dataset.lastName!=s.querySelector('b').textContent){s.dataset.lastName=s.querySelector('b').textContent;s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump')}};

// ---------- 버튼 누르면 물결 ----------
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn,.hb,.mc,.tile,.dsk,.back,#mode button,#vrow button,.ts,#tsize button,.vreset,#dclose');if(!b)return;const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';const d=Math.max(r.width,r.height)*2;
  s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),650)},{passive:true});

// ---------- 경기 시작할 때 HUD 내려오기 ----------
const _updUI=update;let uiPh='';update=function(dt){_updUI(dt);if(phase!=uiPh){if(phase=='cd'||(phase=='play'&&uiPh=='')){const h=$('#hud');if(h){h.classList.remove('drop');void h.offsetWidth;h.classList.add('drop')}}
  if(phase=='end'){}uiPh=phase}};

// ---------- 결과 화면 : 이긴 캐릭터 색 ----------
const _winUI=winTick;winTick=function(dt){_winUI(dt);const m=$('#msg');if(m&&typeof win!='undefined'&&win)m.style.setProperty('--wc',win.d.col)};

// ======================================================================
// 언더테일 느낌 : 영혼 하트 커서 · 대사창 · 전투 시작 하트 · 별 배경
// ======================================================================
const UT_HEART='<svg viewBox="0 0 9 8" shape-rendering="crispEdges"><path fill="#ff0000" d="M1 0h2v1h1v1h1V1h1V0h2v1h1v3H8v1H7v1H6v1H5v1H4V7H3V6H2V5H1V4H0V1h1z"/></svg>';
(function(){const s=document.createElement('div');s.id='soul';s.innerHTML=UT_HEART;document.body.appendChild(s);
  const f=document.createElement('div');f.id='utflash';f.innerHTML=UT_HEART;document.body.appendChild(f);
  const box=document.createElement('div');box.id='utbox';const hb=document.querySelector('#hub .hbtns');if(hb)hb.after(box)})();
let soulEl=null;
function soulTo(el){const s=$('#soul');if(!s)return;if(!el||!document.body.classList.contains('m')||el.offsetParent===null){s.classList.remove('on');soulEl=null;return}soulEl=el;
  document.querySelectorAll('.sel').forEach(x=>{if(x!=el)x.classList.remove('sel')});el.classList.add('sel');const r=el.getBoundingClientRect(),inTile=el.classList.contains('tile');
  const x=inTile?r.left+4:r.left+14,y=inTile?r.top+4:r.top+r.height/2-8;s.style.transform=`translate(${x}px,${y}px)`;s.classList.add('on')}
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.hb,.mc,.dsk,.tile,.btn');if(b)setTimeout(()=>soulTo(b),10)},{passive:true});
// 화면이 바뀌면 첫 버튼으로
const _scrUT=scr;scr=function(id){_scrUT.apply(this,arguments);setTimeout(()=>{const first={hub:'#hub .hb',modes:'#modes .mc',dinfo:'#dsk .dsk',menu:'#grid .tile.act',dict:'#dgrid .tile'}[id];soulTo(first?document.querySelector(first):null)},380);if(id=='hub')utType()};
addEventListener('resize',()=>{if(soulEl)soulTo(soulEl)});
setInterval(()=>{if(soulEl&&!document.body.classList.contains('m'))soulTo(null);else if(soulEl)soulTo(soulEl)},400);
// 대사창 (한 글자씩)
const UT_LINES=['* 공들이 싸울 준비를 하고 있다.','* 결의로 가득 찼다.','* 김민채가 무언가를 먹고 있다.','* 박지성이 수상하게 웃는다.','* 어디선가 "어쩌라고"가 들려온다.','* 오늘도 김티비는 L을 가져갔다.','* 김건우가 바람처럼 지나갔다.','* 평화로운 하루다... 아마도.'];
let utI=0,utT=null;function utType(){const b=$('#utbox');if(!b)return;clearTimeout(utT);const L=UT_LINES[utI++%UT_LINES.length];let k=0;b.textContent='';
  const st=()=>{if(!$('#hub').classList.contains('on'))return;b.textContent=L.slice(0,++k);if(k%2==0&&typeof SFXa=='function')SFXa('sn_text');if(k<L.length)utT=setTimeout(st,55);else utT=setTimeout(utType,2600)};st()}
setTimeout(()=>{if($('#hub')&&$('#hub').classList.contains('on'))utType()},600);
// 전투 시작 : 하트 깜빡 연출
function utFlash(){const f=$('#utflash');if(!f)return;f.classList.remove('on');void f.offsetWidth;f.classList.add('on');soulTo(null);try{SFXa('sn_blue')}catch(e){}setTimeout(()=>f.classList.remove('on'),950)}
['#start','#go','#bnext','#cagain'].forEach(s=>{const b=$(s);if(b)b.addEventListener('click',utFlash,true)});
// 메뉴 배경 : 까만 우주 + 깜빡이는 별
const UTS=Array.from({length:70},()=>({x:Math.random(),y:Math.random(),s:Math.random()<.85?2:3,p:Math.random()*6,v:.2+Math.random()*.8}));
drawMenu=function(){g.fillStyle='#000';g.fillRect(0,0,W,H);const n=F?F.length:0;
  g.save();g.globalCompositeOperation='lighter';if(F)F.forEach((f,i)=>glow(f.d.col,W*(n==3?[.1,.5,.9][i]:[.08,.92][i]),H*.32,Math.max(W,H)*.45,.09));g.restore();
  UTS.forEach(q=>{const a=.25+.75*Math.max(0,Math.sin(clock*q.v*2+q.p));g.globalAlpha=a;g.fillStyle='#fff';const x=Math.floor(q.x*W),y=Math.floor((q.y*H+clock*q.v*6)%H);g.fillRect(x,y,q.s,q.s)});
  g.globalAlpha=1;g.fillStyle='rgba(255,255,255,.05)';for(let y=0;y<H;y+=4)g.fillRect(0,y,W,1)};
setTimeout(()=>{const h=$('#hub');if(h&&h.classList.contains('on'))soulTo(document.querySelector('#hub .hb'))},900);
