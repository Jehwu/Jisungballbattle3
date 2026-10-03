function update(dt){
  clock+=dt;AM.forEach(m=>{m.y-=m.s*dt;m.x+=Math.sin(clock+m.p)*8*dt;if(m.y<-5){m.y=A+5;m.x=rnd(0,A)}});
  const sm=SLOW>0?.3:1;if(SLOW>0)SLOW-=dt;zk*=Math.pow(.015,dt);const sdt=hs>0?0:dt*ts*sm,fdt=dt*ts*sm*(hs>0?.2:1);
  if(hs>0)hs-=dt;
  Pt=Pt.filter(p=>{if(p.vz!=null){p.vz-=1100*fdt;p.z+=p.vz*fdt;if(p.z<0){p.z=0;p.vz=-p.vz*.35;if(p.vz<40)p.vz=0;p.vx*=.55;p.vy*=.55;p.vr*=.5}}p.vy+=(p.gy||0)*fdt;if(p.gr)p.r=Math.max(.5,p.r+p.gr*fdt);p.x+=p.vx*fdt;p.y+=p.vy*fdt;p.rot=(p.rot||0)+(p.vr||0)*fdt;const f=Math.pow(p.fr||.04,fdt);p.vx*=f;p.vy*=f;p.l-=fdt;return p.l>0});
  T=T.filter(x=>{if(x.vy!=null){x.vy+=430*fdt;x.vx*=Math.pow(.15,fdt);x.x+=x.vx*fdt;x.y+=x.vy*fdt}else x.y-=40*fdt;x.l-=fdt*1.05;return x.l>0});
  FX=FX.filter(x=>{x.l-=fdt;if(x.l<=0&&x.k=='spk')for(let i=0;i<3;i++)shardP(x.x,x.y-10,rnd(-80,80),rnd(-160,-40),rnd(2,4));return x.l>0});
  if(bn){bn.t+=dt;if(bn.t>1.5)bn=null}
  F.forEach(f=>{f.show+=(f.hp-f.show)*Math.min(1,fdt*3)});
  shake*=Math.pow(.003,dt);
  if(fight>0)fight-=dt;
  if(phase=='menu'&&Math.floor(clock*4)!=Math.floor((clock-dt)*4)){try{const tot=SND.length+4,ok=Object.keys(AUD).filter(k=>AUD[k].ok).length,pr=(typeof location!='undefined'?location.protocol:'?');
    $('#sdbg').textContent=!AC?'화면을 한 번 터치하면 사운드가 켜져요\n실행 주소: '+pr:('사운드 파일 '+ok+'/'+tot+' 불러옴'+(MUTE?' · 음소거 중':'')+(AC.state!='running'?' · 오디오 '+AC.state:'')+'\n실행 주소: '+pr+(AERR?' · 읽기 실패 '+AERR+'개':'')+(SERR?'\n'+SERR.slice(0,60):'')+(AUD.gun?'\n찾는 위치: '+decodeURI(AUD.gun.pool[0].src):''))}catch(e){}}
  if(UNL&&!PREVB){const bg=phase=='menu'||phase=='demo'?'bgm_menu':phase=='tour'?'':phase=='champ'?'bgm_final':TOURM?(TOURM.final?'bgm_final':'bgm_tour'):'bgm_battle';if(BGMn!=bg)playBGM(bg)}
  if(phase=='cd'){
    tm-=dt;cine+=((tm>3?1:0)-cine)*Math.min(1,dt*6);
    if(!vsd&&tm<3.42){vsd=1;SFX('vs');shake=Math.max(shake,16)}
    const n=Math.ceil(tm);if(tm<3&&n>0&&n!=cdN){if(!cdN)SFX('cd');cdN=n;shake=Math.max(shake,9);ring(A/2,A/2,40,300,'#fff',6,.5)}
    if(tm<=0&&TOURM){for(let i=0;i<(TOURM.final?160:70);i++)Pt.push({x:rnd(0,A),y:rnd(-200,0),vx:rnd(-40,40),vy:rnd(60,220),l:rnd(1.5,2.6),m:2.6,sh:2,col:['#f2c94c','#ffe9a3','#b8860b','#ffffff'][i%4],r:rnd(3,6),rot:rnd(0,TAU),vr:rnd(-10,10),gy:60,fr:.6})}
    if(tm<=0){phase='play';SFX('go');fight=.9;shake=18;FX.push({k:'frost',l:.3,m:.3,c:'#fff'});ring(A/2,A/2,20,420,'#ffd24a',16,.6)}
  }
  else if(phase=='menu'){F.forEach(f=>{f.rot+=dt*(f.i?-1.6:1.6)})}
  else if(phase=='play'||phase=='demo'){
    if(phase=='demo'&&DEMO)demoTick(dt);
    step(sdt);
    if(TSTOP){
      const T2=TSTOP,o2=T2.o;T2.t+=dt;T2.tp=T2.tp||0;
      const EN=F.filter(x=>x!=o2&&!x.dead);
      T2.ne=T2.ne||Math.max(1,EN.length);
      if(EN.length&&T2.tp<4*T2.ne&&T2.t>.55+T2.tp*.42/T2.ne){
        const e=EN[T2.tp%EN.length],ba=rnd(0,TAU);FX.push({k:'ghost',x:o2.x,y:o2.y,r:o2.r,c:o2.d.col,l:.7,m:.7});
        o2.x=clamp(e.x+Math.cos(ba)*125,o2.r,A-o2.r);o2.y=clamp(e.y+Math.sin(ba)*125,o2.r,A-o2.r);FX.push({k:'tsr',x:o2.x,y:o2.y,l:.25,m:.25});
        for(let q=0;q<4;q++){const a=ba+Math.PI+(q-1.5)*.5+T2.tp*.4,rr=q%2?102:74;T2.kn.push({x0:o2.x,y0:o2.y,x:e.x+Math.cos(a)*rr,y:e.y+Math.sin(a)*rr,t:-q*.05,tg:e})}
        T2.tp++;SFX('knife');shake=Math.max(shake,4);
      }
      T2.kn.forEach(k=>k.t+=dt);
      if(T2.t>=T2.dur){
        T2.kn.forEach(k=>{const e=k.tg.dead?tgt(o2):k.tg;if(!e)return;const a=Math.atan2(e.y-k.y,e.x-k.x);B.push({x:k.x,y:k.y,vx:Math.cos(a)*900,vy:Math.sin(a)*900,a,o:o2,dmg:1.5,k:'knife',slow:0,r:8,age:0,D:o2.d})});
        TSTOP=null;EN.forEach(e=>ft(e.x,e.y-e.r-40,'시간 재개',o2.d.hi,28));shake=14;FX.push({k:'tsr',x:o2.x,y:o2.y,l:.5,m:.5});FX.push({k:'frost',l:.15,m:.15,c:'#ffffff'});
      }
    }
    if(MAD){
      const M2=MAD,o2=M2.o;M2.t+=dt;M2.sh=M2.sh||0;const EN=F.filter(x=>x!=o2&&!x.dead),tot=5;
      if(EN.length&&M2.sh<tot&&M2.t>.5+M2.sh*.42){
        const e=EN[M2.sh%EN.length],ba=rnd(0,TAU),dd=rnd(120,230);FX.push({k:'ghost',x:o2.x,y:o2.y,r:o2.r,c:o2.d.col,l:.5,m:.5});
        o2.x=clamp(e.x+Math.cos(ba)*dd,o2.r,A-o2.r);o2.y=clamp(e.y+Math.sin(ba)*dd,o2.r,A-o2.r);
        const a=ang(o2,e)+rnd(-.2,.2),ex=o2.x+Math.cos(a)*900,ey=o2.y+Math.sin(a)*900,hit=!e.hid&&segD(e.x,e.y,o2.x,o2.y,ex,ey)<e.r;
        FX.push({k:'muz',x:o2.x+Math.cos(a)*(o2.r+6),y:o2.y+Math.sin(a)*(o2.r+6),a,l:.08,m:.08});
        FX.push({k:'trc',x:o2.x,y:o2.y,x2:hit?e.x:ex,y2:hit?e.y:ey,c:o2.d.col,l:.22,m:.22});M2.sh++;SFX('gun');
        if(hit){M2.cuts++;hurt(e,7,o2,e.x,e.y,0,1);spark(e.x,e.y,'rose',14,260);M2.kf.push({at:M2.t,n:e.d.name,txt:M2.cuts>=5?'ACE':M2.cuts+'K'});zk=1.8;zx=e.x;zy=e.y}
        else ft(e.x,e.y-e.r-30,'MISS','#9aa0ad',22);
      }
      if(M2.sh>=tot&&M2.t>=.5+tot*.42+.7){MAD=null;FX.push({k:'tsr',x:o2.x,y:o2.y,l:.4,m:.4})}
    }
    const U=F.find(f=>f.cast&&f.cast.s.ult);
    cine+=((U?1:0)-cine)*Math.min(1,dt*6);cz+=((U?1.22:1)-cz)*Math.min(1,dt*5);
    cfx+=((U?U.x:A/2)-cfx)*Math.min(1,dt*5);cfy+=((U?U.y:A/2)-cfy)*Math.min(1,dt*5);
  }
  else if(phase=='end'){
    endT+=dt;winTick(dt);F.forEach(f=>f.ghost=0);B=[];HZ=[];cine*=Math.pow(.02,dt);
    if(endT>1.2)ts=Math.min(1,ts+dt*.8);
    cz+=(1.3-cz)*Math.min(1,dt*2);
    const l=KO||F.find(f=>f.dead);cfx+=(l.x-cfx)*Math.min(1,dt*2);
    if(endT>1.9&&!shown){shown=1;
      if(TOURM){const wE=win.i==0?TOURM.a:TOURM.b,rr=TOURM.r,mm=TOURM.m;TOUR.rounds[rr+1][mm]=wE;TOUR.m++;if(TOUR.m>=TOUR.rounds[TOUR.r].length/2){TOUR.r++;TOUR.m=0}
        $('#mt').innerHTML='<small>'+(TOURM.final?'GRAND FINAL':rname(rr)+' · '+(mm+1)+'경기')+'</small>'+win.d.name;$('#mt').style.color='#f2c94c';
        $('#go').style.display=$('#home').style.display='none';$('#tnext').style.display='';$('#tnext').textContent=TOUR.rounds[TOUR.r].length==1?'CHAMPION':'BRACKET';}
      else{$('#mt').innerHTML='<small>WINNER</small>'+win.d.name;$('#mt').style.color=win.d.hi;$('#go').style.display=$('#home').style.display='';$('#tnext').style.display='none'}
      $('#msg').className='on'}
  }
  F.forEach((f,i)=>{
    $('#p'+i+' .bar i').style.width=f.hp+'%';
    $('#p'+i+' .bar u').style.width=f.show+'%';
    $('#n'+i).textContent=Math.ceil(f.hp);$('#p'+i).classList.toggle('dead',!!f.dead);$('#p'+i).classList.toggle('low',!f.dead&&f.hp<=25);$('#p'+i+' .ug i').style.width=f.ug+'%';$('#p'+i+' .ug').classList.toggle('full',f.ug>=100);
    f.d.sk.forEach((s,j)=>{CH[i][j].style.height=(s.ult?100-f.ug:clamp(f.cds[j]/s.cd,0,1)*100)+'%';if(s.ult)CH[i][j].parentNode.classList.toggle('rdy',f.ug>=100)});
  });
}

function flame(s,fl){
  g.beginPath();g.moveTo(11*s,0);
  g.bezierCurveTo(11*s,-9*s,2*s,-11*s,-6*s,-8*s);
  g.quadraticCurveTo(-20*s,-6*s+fl*3*s,-34*s,fl*5*s);
  g.quadraticCurveTo(-20*s,6*s+fl*3*s,-6*s,8*s);
  g.bezierCurveTo(2*s,11*s,11*s,9*s,11*s,0);g.fill();
}
function bullet(q){
  if(BUL[q.k]){g.save();g.translate(q.x,q.y);BUL[q.k](q);g.restore();return}
  const D=q.D;
  g.save();g.translate(q.x,q.y);
  if(q.k=='flame'){
    g.save();g.globalCompositeOperation='lighter';glow('#ff6a1c',0,0,46,.55);glow('#ffd36b',0,0,22,.9);g.restore();
    g.rotate(q.a);const fl=Math.sin(q.age*38);
    g.fillStyle='#c2321a';flame(1.25,fl);g.fillStyle='#ff8a2c';flame(.95,-fl);g.fillStyle='#ffd36b';flame(.62,fl);g.fillStyle='#fff6d0';flame(.32,-fl);
  }else if(q.k=='lance'){
    g.save();g.globalCompositeOperation='lighter';g.rotate(q.a);g.scale(1.9,.8);glow('#7fd0ff',0,0,24,.55);g.restore();
    g.rotate(q.a);
    const O=[[30,0],[8,-8],[-22,-5],[-32,0],[-22,5],[8,8]];
    poly(O);g.lineWidth=4;g.strokeStyle='#0d2c44';g.lineJoin='round';g.stroke();
    poly([[30,0],[8,-8],[-22,-5],[-32,0]]);g.fillStyle='#effaff';g.fill();
    poly([[30,0],[8,8],[-22,5],[-32,0]]);g.fillStyle='#6fbfe8';g.fill();
    g.strokeStyle='#ffffff';g.lineWidth=1.5;g.beginPath();g.moveTo(28,0);g.lineTo(-30,0);g.stroke();
    g.strokeStyle='#bfe9ff';g.beginPath();g.moveTo(8,-8);g.lineTo(4,0);g.lineTo(8,8);g.stroke();
    const sx=((q.age*160)%90)-45;
    g.save();poly(O);g.clip();g.fillStyle='#ffffffcc';g.beginPath();g.moveTo(sx,-10);g.lineTo(sx+6,-10);g.lineTo(sx-2,10);g.lineTo(sx-8,10);g.fill();g.restore();
    [[-40,-6,.5],[-46,5,.4]].forEach(([x,y,c])=>{g.save();g.translate(x+Math.sin(q.age*20)*1.5,y);g.scale(c,c);poly([[10,0],[0,-5],[-10,0],[0,5]]);g.fillStyle='#d6f3ff';g.fill();g.restore()});
  }else if(q.k=='bolt'){
    g.save();g.globalCompositeOperation='lighter';glow('#9a63f2',0,0,40,.6);glow('#ffe45c',0,0,22,.9);
    g.globalAlpha=1;g.strokeStyle='#fff6b0';g.lineWidth=2;g.lineJoin='round';
    for(let j=0;j<3;j++){let a=rnd(0,TAU),r=6;g.beginPath();g.moveTo(Math.cos(a)*r,Math.sin(a)*r);for(let z=0;z<4;z++){a+=rnd(-.6,.6);r+=rnd(4,7);g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke()}
    g.restore();
    g.fillStyle='#fff';g.beginPath();g.arc(0,0,6,0,TAU);g.fill();
  }else if(q.k=='shot'){
    g.rotate(q.a);
    g.save();g.globalCompositeOperation='lighter';g.save();g.scale(2.6,.6);glow(D.col,-8,0,26,.7);g.restore();glow(D.hi,4,0,16,.9);g.restore();
    const L=48;g.lineCap='round';
    g.strokeStyle=D.col;g.lineWidth=7;g.beginPath();g.moveTo(-L,0);g.lineTo(10,0);g.stroke();
    g.strokeStyle='#ffffff';g.lineWidth=2.5;g.beginPath();g.moveTo(-L+6,0);g.lineTo(12,0);g.stroke();
    poly([[22,0],[10,-7],[4,0],[10,7]]);g.fillStyle=D.hi;g.fill();g.lineWidth=2;g.strokeStyle=D.dk;g.stroke();
    g.save();g.translate(-14,0);g.scale(.35,1);g.strokeStyle=D.hi;g.lineWidth=2.5;g.beginPath();g.arc(0,0,10+Math.sin(q.age*30)*2,0,TAU);g.stroke();g.restore();
  }else if(q.k=='heart'){
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.6);g.restore();
    g.rotate(Math.sin(q.age*8)*.3);const hs2=1.25+Math.sin(q.age*14)*.12;g.scale(hs2,hs2);
    heartPath();g.lineWidth=5;g.lineJoin='round';g.strokeStyle=D.dk;g.stroke();
    heartPath();const hg=g.createLinearGradient(0,-12,0,6);hg.addColorStop(0,D.hi);hg.addColorStop(1,D.col);g.fillStyle=hg;g.fill();
    g.fillStyle='#ffffffcc';g.beginPath();g.ellipse(-5,-8,2.6,1.6,-.6,0,TAU);g.fill();
  }else if(q.k=='tracer'||q.k=='hs'){
    g.rotate(q.a);g.save();g.globalCompositeOperation='lighter';g.scale(q.k=='hs'?4:2.2,.5);glow(q.k=='hs'?'#ff4655':D.col,-6,0,12,.9);g.restore();
    g.strokeStyle=q.k=='hs'?'#ffffff':'#fff6d0';g.lineWidth=2.4;g.lineCap='round';g.beginPath();g.moveTo(-22,0);g.lineTo(6,0);g.stroke();
  }else if(q.k=='chat'){
    const w=Math.max(34,q.txt.length*13+16),h2=24,sc2=back(clamp((q.age+.6)/.25,0,1));g.scale(sc2,sc2);
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,30,.4);g.restore();
    g.fillStyle='#ffffff';g.strokeStyle=D.col;g.lineWidth=2.5;g.lineJoin='round';
    g.beginPath();g.moveTo(-w/2+6,-h2/2);g.lineTo(w/2-6,-h2/2);g.quadraticCurveTo(w/2,-h2/2,w/2,-h2/2+6);g.lineTo(w/2,h2/2-6);g.quadraticCurveTo(w/2,h2/2,w/2-6,h2/2);g.lineTo(-w/2+16,h2/2);g.lineTo(-w/2+6,h2/2+8);g.lineTo(-w/2+8,h2/2);g.lineTo(-w/2+6,h2/2);g.quadraticCurveTo(-w/2,h2/2,-w/2,h2/2-6);g.lineTo(-w/2,-h2/2+6);g.quadraticCurveTo(-w/2,-h2/2,-w/2+6,-h2/2);g.closePath();g.fill();g.stroke();
    g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';g.font='700 13px '+FB;g.fillText(q.txt,0,1);
  }else if(q.k=='chair'){
    g.rotate(q.age*14);drawChair();
  }else if(q.k=='arrow'){
    g.rotate(q.a);g.strokeStyle='#d8c9a6';g.lineWidth=2.5;g.beginPath();g.moveTo(-22,0);g.lineTo(14,0);g.stroke();
    poly([[22,0],[12,-5],[14,0],[12,5]]);g.fillStyle='#cfd6e0';g.fill();g.strokeStyle='#2a2f3a';g.lineWidth=1.2;g.stroke();
    g.fillStyle=D.col;poly([[-22,0],[-29,-6],[-18,-1]]);g.fill();poly([[-22,0],[-29,6],[-18,1]]);g.fill();
  }else if(q.k=='card'){
    g.rotate(q.age*18);g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,22,.5);g.restore();
    g.fillStyle='#fffaf5';g.strokeStyle='#1a0a10';g.lineWidth=1.5;g.beginPath();g.moveTo(-7,-10);g.lineTo(7,-10);g.lineTo(7,10);g.lineTo(-7,10);g.closePath();g.fill();g.stroke();
    g.strokeStyle=D.col;g.lineWidth=1.2;g.strokeRect(-5,-8,10,16);g.fillStyle=D.col;g.beginPath();g.ellipse(0,0,3.4,4.4,0,0,TAU);g.fill();g.fillStyle='#2f7a3a';g.fillRect(-.6,3.5,1.2,4);
  }else if(q.k=='knife'){
    g.rotate(q.a);g.scale(1.3,1.3);drawKnife(D);
  }else{
    g.fillStyle=D.hi;g.beginPath();g.arc(0,0,q.r,0,TAU);g.fill();
  }
  g.restore();
}

function hex(r){g.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath()}

function ball(f,t){
  if(f.dead||f.hid)return;if(f.ghost&&HZ.some(h=>h.k=='dark'&&h.o==f&&!h.done))return;
  const D=f.d;
  let sc=1;
  if(phase=='cd'){const sp=clamp((3-tm-.2-.35*f.i)/.5,0,1);if(sp<=0)return;sc=back(sp)}
  if(f.dash>0&&f.tr.length>1){
    g.lineCap='round';g.lineJoin='round';
    [[D.col,2],[D.hi,1.1]].forEach(([c,wd])=>{
      g.strokeStyle=c;
      for(let i=1;i<f.tr.length;i++){
        g.lineWidth=f.r*wd*i/f.tr.length;g.beginPath();g.moveTo(f.tr[i-1][0],f.tr[i-1][1]);g.lineTo(f.tr[i][0],f.tr[i][1]);g.stroke();
      }
    });
  }
  const jh=f.jump?Math.sin(Math.PI*Math.min(1,f.jump.t/f.jump.dur))*120:0;
  g.fillStyle='#0006';g.beginPath();g.ellipse(f.x+5,f.y+f.r*.9,f.r*.95*sc*(1-jh/250),f.r*.42*sc*(1-jh/250),0,0,TAU);g.fill();
  if(f.rush>0&&t){
    const a=ang(f,t),jt=Math.sin(clock*40)*1.2;g.save();g.translate(f.x-Math.cos(a)*8+jt,f.y-Math.sin(a)*8-36);
    g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-8,95,.6);glow('#b48cff',0,-30,50,.35);g.restore();
    g.globalAlpha=.88;g.lineJoin='round';
    const tg2=g.createLinearGradient(0,-30,0,30);tg2.addColorStop(0,D.col);tg2.addColorStop(1,D.dk);
    [-1,1].forEach(sd=>{const ph=Math.sin(clock*45+sd*1.6),ex=Math.cos(a)*(30+ph*14)+sd*12,ey=Math.sin(a)*(30+ph*14)+6;
      g.strokeStyle=D.dk;g.lineWidth=11;g.lineCap='round';g.beginPath();g.moveTo(sd*28,-18);g.lineTo(ex,ey);g.stroke();
      g.strokeStyle=D.hi;g.lineWidth=2;g.stroke()});
    poly([[-32,-24],[32,-24],[18,28],[-18,28]]);g.fillStyle=tg2;g.fill();g.strokeStyle=D.hi;g.lineWidth=3;g.stroke();
    g.fillStyle=D.dk;g.beginPath();g.arc(-30,-20,11,0,TAU);g.arc(30,-20,11,0,TAU);g.fill();g.stroke();
    g.strokeStyle=D.hi;g.globalAlpha=.55;g.lineWidth=2;g.beginPath();g.moveTo(-14,-10);g.lineTo(14,-10);g.moveTo(0,-22);g.lineTo(0,22);g.moveTo(-12,6);g.lineTo(12,6);g.stroke();
    g.globalAlpha=.9;g.fillStyle=D.dk;g.beginPath();g.arc(0,-42,15,0,TAU);g.fill();g.strokeStyle=D.hi;g.lineWidth=3;g.stroke();
    g.beginPath();g.moveTo(-15,-46);g.lineTo(0,-62);g.lineTo(15,-46);g.stroke();
    g.save();g.globalCompositeOperation='lighter';glow(D.hi,-5,-43,6,1);glow(D.hi,5,-43,6,1);g.restore();
    g.restore();
  }
  g.save();g.translate(f.x,f.y-jh);if(jh)g.scale(1+jh/400,1+jh/400);
  const p=f.cast?f.cast.t/f.cast.s.w:0;
  if(f.cast)g.translate(rnd(-1,1)*p*2,rnd(-1,1)*p*2);
  const fz=1+.38*Math.max(0,f.fat||0)+(f.gulp&&f.gulp.st==1?.05*Math.sin(clock*22):0);g.scale(sc*fz*(1+.025*Math.sin(clock*5+f.i)),sc*fz*(1+.025*Math.sin(clock*5+f.i)));
  g.rotate(f.sa);g.scale((1-.3*f.sq)*(1+.12*p),(1+.22*f.sq)*(1+.12*p));g.rotate(-f.sa);
  const R=f.r;
  g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,R*1.9,.3);g.restore();
  const bg=g.createRadialGradient(-R*.35,-R*.45,R*.08,0,0,R);bg.addColorStop(0,'#3b4153');bg.addColorStop(.55,'#161922');bg.addColorStop(1,'#07080c');
  g.beginPath();g.arc(0,0,R,0,TAU);g.fillStyle=bg;g.fill();
  g.save();g.beginPath();g.arc(0,0,R,0,TAU);g.clip();
  const rg=g.createRadialGradient(0,0,R*.5,0,0,R*1.02);rg.addColorStop(0,D.col+'00');rg.addColorStop(1,D.col+'b0');g.fillStyle=rg;g.fillRect(-R,-R,R*2,R*2);
  g.rotate(f.rot*.5);g.strokeStyle=D.col;g.globalAlpha=.6;g.lineWidth=1.6;g.beginPath();g.arc(0,0,R*.82,0,1.2);g.stroke();g.beginPath();g.arc(0,0,R*.82,Math.PI,Math.PI+1.2);g.stroke();
  g.restore();
  g.lineWidth=2.5;g.strokeStyle=D.col;g.beginPath();g.arc(0,0,R-1.2,0,TAU);g.stroke();
  g.lineWidth=1.2;g.strokeStyle=D.hi;g.globalAlpha=.7;g.beginPath();g.arc(0,0,R-4.5,-2.7,-.7);g.stroke();g.globalAlpha=1;
  g.fillStyle='rgba(255,255,255,.2)';g.beginPath();g.ellipse(-R*.38,-R*.5,R*.3,R*.13,-.6,0,TAU);g.fill();
  if(f.flash>0){g.globalAlpha=.85;g.fillStyle='#fff';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.globalAlpha=1}
  if(f.slow>0){g.globalAlpha=.35;g.fillStyle='#bfe9ff';g.beginPath();g.arc(0,0,R,0,TAU);g.fill();g.globalAlpha=1}
  g.save();g.rotate(f.rot);g.scale(f.r/26,f.r/26);
  if(f.flash<=0){
    if(EMB[D.k])EMB[D.k](f,D);
    else if(D.k=='fire'){g.rotate(-Math.PI/2);g.fillStyle=D.dk;g.translate(6,0);flame(.9,Math.sin(clock*12));g.fillStyle=D.hi;flame(.5,Math.sin(clock*12))}
    else if(D.k=='elec'){g.fillStyle='#ffe45c';g.strokeStyle=D.dk;g.lineWidth=2.5;g.beginPath();g.moveTo(5,-14);g.lineTo(-7,2);g.lineTo(-1,2);g.lineTo(-5,14);g.lineTo(8,-3);g.lineTo(2,-3);g.closePath();g.fill();g.stroke()}
    else if(D.k=='magma'){g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#ff8a2c';g.lineWidth=1.8;g.lineCap='round';g.globalAlpha=.7+.3*Math.sin(clock*4);g.beginPath();g.moveTo(-24,-6);g.lineTo(-14,-2);g.lineTo(-18,8);g.moveTo(22,-10);g.lineTo(13,-4);g.lineTo(18,6);g.lineTo(10,14);g.moveTo(-8,21);g.lineTo(0,15);g.lineTo(8,22);g.stroke();g.restore();
      g.rotate(-f.rot+Math.sin(clock*3)*.04);
      [-9,0,9].forEach((x,i)=>{g.save();g.translate(x,-20-(i==1?3:0));g.rotate(-Math.PI/2);g.fillStyle='#ff5a1f';flame(.38,Math.sin(clock*12+i));g.fillStyle='#ffd27a';flame(.2,Math.sin(clock*12+i));g.restore()});
      neon(D,2.2,()=>{g.beginPath();g.moveTo(-15,-8);g.lineTo(-19,-20);g.lineTo(-8,-14);g.moveTo(15,-8);g.lineTo(19,-20);g.lineTo(8,-14);g.moveTo(-12,-8);g.lineTo(-4,-4);g.moveTo(12,-8);g.lineTo(4,-4);g.moveTo(9,6);g.ellipse(0,6,9,6.5,0,0,TAU);g.moveTo(-8,11);g.quadraticCurveTo(-14,10,-15,2);g.moveTo(8,11);g.quadraticCurveTo(14,10,15,2)});
      g.save();g.globalCompositeOperation='lighter';glow('#ff3d0a',-7,-1,7,1);glow('#ff3d0a',7,-1,7,1);g.restore();
      g.fillStyle='#fff3c4';g.beginPath();g.arc(-7,-1,1.6,0,TAU);g.arc(7,-1,1.6,0,TAU);g.fill()}
    else if(D.k=='dummy'){g.rotate(-f.rot);g.strokeStyle=D.hi;g.lineWidth=2.5;g.beginPath();g.arc(0,0,15,0,TAU);g.stroke();g.beginPath();g.arc(0,0,8,0,TAU);g.stroke();g.fillStyle='#ff4655';g.beginPath();g.arc(0,0,3,0,TAU);g.fill()}
    else if(D.k=='heavy'){g.rotate(-f.rot+Math.sin(clock*3)*.04);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(-15,-8);g.lineTo(-19,-20);g.lineTo(-8,-14);g.moveTo(15,-8);g.lineTo(19,-20);g.lineTo(8,-14);g.moveTo(-12,-8);g.lineTo(-4,-4);g.moveTo(12,-8);g.lineTo(4,-4);g.moveTo(9,6);g.ellipse(0,6,9,6.5,0,0,TAU);g.moveTo(-8,11);g.quadraticCurveTo(-14,10,-15,2);g.moveTo(8,11);g.quadraticCurveTo(14,10,15,2)});
      g.fillStyle=D.hi;g.beginPath();g.ellipse(-3.3,6,1.6,2.4,0,0,TAU);g.ellipse(3.3,6,1.6,2.4,0,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow(D.col,-7,-1,6,1);glow(D.col,7,-1,6,1);g.restore();
      g.fillStyle='#fff';g.beginPath();g.arc(-7,-1,1.5,0,TAU);g.arc(7,-1,1.5,0,TAU);g.fill()}
    else if(D.k=='time'){g.rotate(-f.rot+Math.sin(clock*3)*.04);
      const PX=['..#####..','.#######.','#########','##..#..##','##..#..##','#########','.###.###.','..#.#.#..','..#####..'],u=3.1;
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,0,24,.45);g.restore();
      g.fillStyle=D.hi;PX.forEach((row,y)=>[...row].forEach((c,x)=>{if(c=='#')g.fillRect((x-4.5)*u,(y-4.5)*u,u+.35,u+.35)}));
      g.save();g.globalCompositeOperation='lighter';glow(D.col,-6.2,-1.5,5,1);glow(D.col,6.2,-1.5,5,1);g.restore()}
    else if(D.k=='gold'){g.rotate(-f.rot+Math.sin(clock*4)*.04);
      neon(D,2.4,()=>{g.beginPath();g.arc(0,-1,17,Math.PI*1.05,Math.PI*1.95);g.moveTo(-17,-3);g.lineTo(-17,9);g.moveTo(17,-3);g.lineTo(17,9);g.moveTo(-17,8);g.quadraticCurveTo(-14,15,-5,14)});
      g.fillStyle=D.hi;g.fillRect(-21,-4,6,14);g.fillRect(15,-4,6,14);
      g.save();g.globalCompositeOperation='lighter';g.fillStyle=D.col;g.fillRect(-10,-3,20,4);glow(D.hi,0,-1,12,.7);g.restore();
      g.fillStyle='#fff';g.fillRect(-10,-2,20,1.4);g.fillStyle=D.hi;g.beginPath();g.arc(-4,14,2,0,TAU);g.fill()}
    else if(D.k=='gun'){g.rotate(-f.rot);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(11,0);g.arc(0,0,11,0,TAU);g.moveTo(0,-19);g.lineTo(0,-6);g.moveTo(0,6);g.lineTo(0,19);g.moveTo(-19,0);g.lineTo(-6,0);g.moveTo(6,0);g.lineTo(19,0)});
      g.fillStyle=D.hi;g.beginPath();g.arc(0,0,2.2,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow('#ff2d4a',14,-14,7,.6+.4*Math.sin(clock*6));g.restore();g.fillStyle='#ff2d4a';g.beginPath();g.arc(14,-14,2.6,0,TAU);g.fill()}
    else if(D.k=='ink'){g.rotate(-f.rot+.55);
      neon(D,2.2,()=>{g.beginPath();g.moveTo(0,-19);g.lineTo(9,-3);g.lineTo(5,11);g.lineTo(-5,11);g.lineTo(-9,-3);g.closePath();g.moveTo(0,-19);g.lineTo(0,1);g.moveTo(-6,16);g.lineTo(6,16)});
      g.fillStyle=D.hi;g.beginPath();g.arc(0,3,2.4,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-19,7,.9);g.restore()}
    else if(D.k=='monkey'){g.rotate(-f.rot);
      neon(D,2.1,()=>{g.beginPath();g.moveTo(-12,-1);g.arc(-17,-1,5,0,TAU);g.moveTo(22,-1);g.arc(17,-1,5,0,TAU);g.moveTo(0,-6);g.bezierCurveTo(-4,-14,-14,-12,-12,-2);g.bezierCurveTo(-14,8,-6,14,0,14);g.bezierCurveTo(6,14,14,8,12,-2);g.bezierCurveTo(14,-12,4,-14,0,-6);g.moveTo(-4,8);g.quadraticCurveTo(0,11,4,8)});
      g.fillStyle=D.hi;g.beginPath();g.arc(-5,-3,1.9,0,TAU);g.arc(5,-3,1.9,0,TAU);g.fill();
      g.save();g.globalCompositeOperation='lighter';g.fillStyle='#ff4655';poly([[-6,-22],[0,-16],[6,-22],[3,-22],[0,-19],[-3,-22]]);g.fill();glow('#ff4655',0,-19,6,.6);g.restore()}
    else if(D.k=='rose'){g.rotate(-f.rot+Math.sin(clock*2)*.05);
      neon(D,2,()=>{g.beginPath();g.moveTo(3.5,-4);g.arc(0,-4,3.5,0,TAU*.85);g.moveTo(-7,-6);g.quadraticCurveTo(-8,-15,0,-14);g.quadraticCurveTo(8,-15,7,-6);g.quadraticCurveTo(6,3,0,4);g.quadraticCurveTo(-6,3,-7,-6);g.moveTo(-11,-9);g.quadraticCurveTo(-13,4,0,7);g.quadraticCurveTo(13,4,11,-9);g.moveTo(0,7);g.lineTo(0,19);g.moveTo(0,13);g.quadraticCurveTo(-8,9,-11,13);g.moveTo(0,15);g.quadraticCurveTo(8,11,10,15)});
      g.save();g.globalCompositeOperation='lighter';glow(D.col,0,-5,10,.8);g.restore()}
    else if(D.k=='drg'){g.strokeStyle=D.dk;g.lineWidth=3.5;g.lineCap='round';for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-11,i*8-6);g.quadraticCurveTo(0,i*8+4,11,i*8-2);g.stroke()}}
    else{g.strokeStyle=D.dk;g.lineWidth=3;g.lineCap='round';for(let i=0;i<6;i++){g.save();g.rotate(i*TAU/6);g.beginPath();g.moveTo(0,0);g.lineTo(13,0);g.moveTo(8,0);g.lineTo(11,-3.5);g.moveTo(8,0);g.lineTo(11,3.5);g.stroke();g.restore()}}
  }
  g.restore();
  if(f.slow>0){g.fillStyle='#e3f6ff';g.strokeStyle=D.dk;g.lineWidth=2;for(let i=0;i<3;i++){const a=i*TAU/3+clock;g.save();g.translate(Math.cos(a)*f.r,Math.sin(a)*f.r);g.rotate(a);g.beginPath();g.moveTo(8,0);g.lineTo(-3,-4);g.lineTo(-3,4);g.closePath();g.fill();g.stroke();g.restore()}}
  g.restore();
  if(f.cast){
    g.save();g.translate(f.x,f.y);
    g.strokeStyle=D.hi;g.globalAlpha=.4+.6*p;g.lineWidth=3;
    g.beginPath();g.arc(0,0,f.r+8+36*(1-p),0,TAU);g.setLineDash([10,8]);g.lineDashOffset=-clock*40;g.stroke();g.setLineDash([]);
    g.rotate(clock*4);for(let i=0;i<4;i++){g.rotate(TAU/4);g.beginPath();g.moveTo(f.r+14+36*(1-p),0);g.lineTo(f.r+24+36*(1-p),0);g.stroke()}
    g.restore();
    if(f.cast.s.tel=='line'){const a=Math.atan2(t.y+t.dy*t.sp*.6-f.y,t.x+t.dx*t.sp*.6-f.x);g.save();g.strokeStyle=D.col;g.globalAlpha=.75;g.lineWidth=2.5;g.setLineDash([8,6]);for(let i=0;i<4;i++){const d=f.r+60+i*85;g.beginPath();g.arc(f.x+Math.cos(a)*d,f.y+Math.sin(a)*d,46*Math.min(1,p*1.3),0,TAU);g.stroke()}g.restore()}
    if(f.cast.s.tel=='ring'){g.save();g.translate(f.x,f.y);g.strokeStyle=D.col;g.globalAlpha=.65;g.lineWidth=3;g.setLineDash([12,8]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,330,0,TAU);g.stroke();g.setLineDash([]);g.globalAlpha=.16;g.fillStyle=D.col;g.beginPath();g.arc(0,0,330*p,0,TAU);g.fill();g.restore()}
    if(f.cast.s.tel=='land'){const lx=clamp(t.x+t.dx*t.sp*.75,f.r,A-f.r),ly=clamp(t.y+t.dy*t.sp*.75,f.r,A-f.r);g.save();g.translate(lx,ly);g.strokeStyle=D.col;g.globalAlpha=.75;g.lineWidth=3;g.beginPath();g.arc(0,0,95,0,TAU);g.stroke();g.globalAlpha=.2;g.fillStyle=D.col;g.beginPath();g.arc(0,0,95*p,0,TAU);g.fill();g.globalAlpha=.8;g.lineWidth=2;g.beginPath();g.moveTo(-14,0);g.lineTo(14,0);g.moveTo(0,-14);g.lineTo(0,14);g.stroke();g.restore()}
    if(f.cast.s.ind){
      const d=dist(f,t)/650,ia=Math.atan2(t.y+t.dy*t.sp*d-f.y,t.x+t.dx*t.sp*d-f.x);
      g.save();g.translate(f.x,f.y);g.rotate(ia);
      g.globalAlpha=.18+.2*p;g.fillStyle=D.col;g.fillRect(f.r,-13,620,26);
      g.globalAlpha=.45;g.fillStyle=D.hi;g.fillRect(f.r,-13,620*p,26);
      g.globalAlpha=.95;g.strokeStyle=D.hi;g.lineWidth=2;g.strokeRect(f.r,-13,620,26);
      g.globalAlpha=.7;g.lineWidth=3;for(let q=0;q<6;q++){const x=f.r+30+((q*100+clock*300)%600);g.beginPath();g.moveTo(x,-7);g.lineTo(x+8,0);g.lineTo(x,7);g.stroke()}
      g.restore();
    }
    if(f.cast.s.aim){
      g.save();g.strokeStyle=D.hi;g.globalAlpha=.35*p;g.lineWidth=3;g.setLineDash([10,10]);g.lineDashOffset=-clock*80;
      g.beginPath();g.moveTo(f.x,f.y);g.lineTo(t.x,t.y);g.stroke();g.restore();
    }
  }
  if(f.shield>0){
    const ap=clamp(f.shield/.35,0,1),fm=back(clamp((1.8-f.shield)/.25,0,1));
    g.save();g.translate(f.x,f.y);g.rotate(clock*.8);g.scale(fm,fm);g.globalAlpha=ap;
    hex(f.r+14);g.fillStyle='#e3f6ff26';g.fill();
    g.lineWidth=5;g.strokeStyle=f.sf>0?'#fff':D.dk;g.stroke();
    g.lineWidth=2.5;g.strokeStyle=f.sf>0?'#fff':D.hi;g.stroke();
    g.globalAlpha=ap*.35;g.lineWidth=1.5;g.strokeStyle=D.hi;
    for(let i=0;i<6;i++){g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(i*TAU/6)*(f.r+14),Math.sin(i*TAU/6)*(f.r+14));g.stroke()}
    hex(f.r*.5);g.stroke();
    g.restore();
  }
}

function drawFX(x){
  if(FXD[x.k]){FXD[x.k](x);return}
  if(x.k=='pillar'){const p=1-x.l/x.m,w=(1-p)*34+6,hgt=280*(p<.3?p/.3:1);g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,x.y-hgt,0,x.y);gr.addColorStop(0,'rgba(255,90,31,0)');gr.addColorStop(1,'rgba(255,210,122,'+(1-p)+')');g.fillStyle=gr;g.fillRect(x.x-w/2,x.y-hgt,w,hgt);glow('#ff8a2c',x.x,x.y,60*(1-p)+10,1-p);g.restore();return}
  if(x.k=='trc'){const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=7*(1-p)+1;g.beginPath();g.moveTo(x.x,x.y);g.lineTo(x.x2,x.y2);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=2;g.stroke();glow(x.c,x.x2,x.y2,36*(1-p),1-p);g.restore();return}
  if(x.k=='slash'){const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';g.lineCap='round';g.globalAlpha=1-p;g.strokeStyle=x.c;g.lineWidth=14*(1-p)+2;g.beginPath();g.arc(0,0,48,-1.1+p*.4,1.1+p*.4);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=4*(1-p)+1;g.beginPath();g.arc(0,0,48,-.8+p*.4,.8+p*.4);g.stroke();g.restore();return}
  if(x.k=='muz'){g.save();g.translate(x.x,x.y);g.rotate(x.a);g.globalCompositeOperation='lighter';glow('#ffd36b',6,0,16,1);g.fillStyle='#fff6d0';poly([[24,0],[4,-5],[0,0],[4,5]]);g.fill();g.restore();return}
  if(x.k=='rail'){const p=1-x.l/x.m,w=(1-p)*26;g.save();g.globalCompositeOperation='lighter';g.lineCap='round';g.strokeStyle=x.c;g.globalAlpha=.75;g.lineWidth=w*1.8+1;g.beginPath();g.moveTo(x.x,x.y);g.lineTo(x.x2,x.y2);g.stroke();g.strokeStyle='#ffffff';g.globalAlpha=1;g.lineWidth=w*.6+1;g.stroke();glow(x.c,x.x2,x.y2,100*(1-p),1-p);glow('#ffffff',x.x2,x.y2,40*(1-p),1-p);g.restore();return}
  if(x.k=='badge'){const p=1-x.l/x.m,s2=back(clamp(p/.15,0,1)),w=x.txt.length*26+40;g.save();g.translate(x.x,x.y-p*14);g.scale(s2,s2);g.globalAlpha=clamp(x.l/.3,0,1);g.save();g.globalCompositeOperation='lighter';glow(x.c,0,0,w*.7,.45);g.restore();poly([[-w/2+10,-19],[w/2,-19],[w/2-10,19],[-w/2,19]]);g.fillStyle=x.c;g.fill();g.lineWidth=3.5;g.strokeStyle='#07080c';g.stroke();g.font='26px '+FD;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#07080c';g.fillText(x.txt,0,1);g.restore();return}
  if(x.k=='ghost'){const p=1-x.l/x.m;g.save();g.globalAlpha=(1-p)*.7;g.strokeStyle=x.c;g.lineWidth=3;g.beginPath();g.arc(x.x,x.y,x.r*(1+p*.35),0,TAU);g.stroke();g.globalAlpha=(1-p)*.22;g.fillStyle=x.c;g.fill();g.restore();return}
  if(x.k=='tss'){const p=1-x.l/x.m,r=(p<.55?p/.55:1-(p-.55)/.45)*900;g.save();g.globalCompositeOperation='difference';g.fillStyle='#ffffff';g.beginPath();g.arc(x.x,x.y,Math.max(1,r),0,TAU);g.fill();g.restore();return}
  if(x.k=='tsr'){const p=1-x.l/x.m;g.save();g.globalAlpha=1-p;g.strokeStyle='#ffffff';g.lineWidth=8*(1-p)+1;g.beginPath();g.arc(x.x,x.y,20+p*700,0,TAU);g.stroke();g.restore();return}
  if(x.k=='burst'){
    const p=1-x.l/x.m;g.save();g.translate(x.x,x.y);g.globalCompositeOperation='lighter';g.strokeStyle=x.c;g.globalAlpha=1-p;g.lineCap='round';
    for(let i=0;i<12;i++){const a=i*TAU/12+x.a,r0=18+p*60,r1=r0+28*(1-p)+10;g.lineWidth=4*(1-p)+1;g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1);g.stroke()}
    g.restore();return;
  }
  if(x.k=='fist'){
    const p=1-x.l/x.m,e=Math.sin(p*Math.PI),cx=x.x+Math.cos(x.a)*(22+x.d*e),cy=x.y+Math.sin(x.a)*(22+x.d*e);
    g.save();g.translate(cx,cy);g.rotate(x.a);
    g.save();g.globalCompositeOperation='lighter';glow(x.c2,0,0,22,.6);g.restore();
    g.globalAlpha=.9;g.strokeStyle=x.c;g.lineWidth=2;g.lineCap='round';
    for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(-14,i*6);g.lineTo(-30-12*e,i*6);g.stroke()}
    g.fillStyle=x.c2;g.strokeStyle='#0b0d12';g.lineWidth=2.5;g.beginPath();g.moveTo(-9,-9);g.lineTo(5,-9);g.quadraticCurveTo(9,-9,9,-5);g.lineTo(9,5);g.quadraticCurveTo(9,9,5,9);g.lineTo(-9,9);g.closePath();g.fill();g.stroke();
    g.lineWidth=1.5;for(let i=-1;i<=1;i++){g.beginPath();g.moveTo(4,i*5);g.lineTo(9,i*5);g.stroke()}
    g.restore();return;
  }
  if(x.k=='crack'){
    const a=Math.min(1,x.l)*.8;g.save();g.translate(x.x,x.y);g.globalAlpha=a*.5;g.fillStyle='#07080c';g.beginPath();g.ellipse(0,0,x.r*.45,x.r*.3,0,0,TAU);g.fill();
    g.globalAlpha=a;g.strokeStyle='#07080c';g.lineWidth=3;g.lineCap='round';g.lineJoin='round';
    for(let i=0;i<9;i++){const an=i*TAU/9+x.x*.01;g.beginPath();g.moveTo(0,0);for(let q=1;q<=3;q++){const aa=an+(((i*q*7)%5)-2)*.09;g.lineTo(Math.cos(aa)*x.r*q/3,Math.sin(aa)*x.r*q/3*.75)}g.stroke()}
    g.restore();return;
  }
  if(x.k=='bolt'||x.k=='zap'){
    const p=1-x.l/x.m,bl=x.k=='bolt',x1=x.x,y1=bl?x.y-720:x.y,x2=bl?x.x:x.x2,y2=bl?x.y:x.y2;
    if(!x.pts){x.pts=jag(x1,y1,x2,y2,bl?16:10,bl?26:14);x.br=[];for(let b=0;b<(bl?4:2);b++){const i=Math.floor(rnd(2,x.pts.length-2)),[sx,sy]=x.pts[i],a=Math.atan2(y2-y1,x2-x1)+rnd(-1,1)*1.1,L=rnd(40,110);x.br.push(jag(sx,sy,sx+Math.cos(a)*L,sy+Math.sin(a)*L,5,12))}}
    g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
    const fl=Math.random()<.3?.6:1,path=pts=>{g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b))};
    [['#7b4bd6',22,.35],['#ffe45c',9,.9],['#ffffff',3.5,1]].forEach(([c,w,a])=>{g.strokeStyle=c;g.globalAlpha=a*(1-p)*fl;g.lineWidth=w*(1-p*.5);path(x.pts);g.stroke();g.lineWidth=w*.5*(1-p*.5);x.br.forEach(b=>{path(b);g.stroke()})});
    glow('#ffe45c',x2,y2,90*(1-p*.5),.8*(1-p));glow('#ffffff',x2,y2,36,1-p);
    g.restore();return;
  }
  if(x.k=='boom'){
    const p=1-x.l/x.m;g.save();g.globalCompositeOperation='lighter';
    glow(x.pal[Math.min(x.pal.length-1,Math.floor(p*x.pal.length))],x.x,x.y,x.r*(.4+.8*Math.sqrt(p)),1-p);
    glow('#ffffff',x.x,x.y,x.r*.5*(1-p),1-p);
    g.restore();return;
  }
  if(x.k=='gust'){
    const p=1-x.l/x.m,e=1-Math.pow(1-p,3);g.save();g.translate(x.x,x.y);g.globalCompositeOperation='lighter';g.lineCap='round';
    for(let i=0;i<3;i++){g.rotate(x.a+i*2.1+e*1.2);g.globalAlpha=(1-p)*.85;g.strokeStyle=i?'#b9ffcf':'#ffffff';g.lineWidth=(10-i*2)*(1-p)+1;g.beginPath();g.arc(0,0,30+e*(200-i*30),0,2.2);g.stroke()}
    g.restore();return;
  }
  if(x.k=='spk'){
    const p=1-x.l/x.m,gw=back(clamp(p/.15,0,1)),fade=clamp(x.l/.3,0,1);
    g.save();g.translate(x.x,x.y);g.scale(x.s*gw,x.s*gw);g.globalAlpha=fade;g.lineJoin='round';
    [[0,-32,7],[-9,-19,5],[9,-21,5]].forEach(([dx,h,w])=>{
      g.save();g.translate(dx,0);g.rotate(x.a+dx*.04);
      poly([[0,h],[w,-2],[0,4],[-w,-2]]);g.fillStyle='#0d2c44';g.fill();g.lineWidth=3;g.strokeStyle='#0d2c44';g.stroke();
      poly([[0,h],[w,-2],[0,3]]);g.fillStyle='#7cc6ea';g.fill();
      poly([[0,h],[-w,-2],[0,3]]);g.fillStyle='#effaff';g.fill();
      g.restore();
    });
    g.restore();return;
  }
  if(x.k=='scorch'||x.k=='frost'){
    const p=1-x.l/x.m;g.save();
    if(x.k=='frost'){g.globalAlpha=.3*Math.sin(Math.min(1,p*1.6)*Math.PI/2)*(1-p);g.fillStyle=x.c||'#a8dcf5';g.fillRect(-300,-300,A+600,A+600)}
    else{
      g.globalAlpha=Math.min(1,x.l/1.5)*.7;g.translate(x.x,x.y);g.fillStyle='#07080c';
      g.beginPath();g.ellipse(0,0,x.r*.9,x.r*.55,0,0,TAU);g.fill();
      g.strokeStyle=x.c||'#e4572e';g.lineWidth=3;
      for(let i=0;i<7;i++){const a=i*TAU/7+x.x;g.beginPath();g.moveTo(Math.cos(a)*x.r*.2,Math.sin(a)*x.r*.12);g.lineTo(Math.cos(a)*x.r*.8,Math.sin(a)*x.r*.5);g.stroke()}
      g.globalCompositeOperation='lighter';glow(x.c||'#ff6a1c',0,0,x.r*.9,Math.max(0,(x.l-2.5)/1.5)*.6);
    }
    g.restore();return;
  }
  drawFXold(x);
}
function drawFXold(x){
  const p=1-x.l/x.m;
  g.save();
  if(x.k=='ring'){
    g.globalAlpha=1-p;g.strokeStyle=x.col;g.lineWidth=x.w*(1-p)+1;
    g.beginPath();g.arc(x.x,x.y,x.r0+(x.r1-x.r0)*(1-Math.pow(1-p,3)),0,TAU);g.stroke();
  }else{
    g.translate(x.x,x.y);g.rotate(.6);g.globalAlpha=1-p;g.strokeStyle=x.col;g.lineCap='round';
    const L=14+46*(1-Math.pow(1-p,3));g.lineWidth=7*(1-p)+1;
    g.beginPath();g.moveTo(-L,0);g.lineTo(L,0);g.moveTo(0,-L);g.lineTo(0,L);g.stroke();
  }
  g.restore();
}

function ultTitle(){
  const D=bn.d,t=bn.t,inT=Math.min(1,t/.18),out=t>1.2?clamp((t-1.2)/.3,0,1):0,sy=inT*(1-out),y=A*.5-55,h=110*sy;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();
  g.fillStyle='#0b0d12';g.fillRect(-300,y-8*sy,A+600,h+16*sy);
  g.fillStyle=D.col;g.fillRect(-300,y,A+600,h);
  g.fillStyle=D.hi+'55';
  for(let i=0;i<10;i++){const x=((i*90+t*500)%(A+200))-100;g.beginPath();g.moveTo(x,y);g.lineTo(x+40,y);g.lineTo(x-10,y+h);g.lineTo(x-50,y+h);g.fill()}
  const e=1-Math.pow(1-Math.min(1,t/.35),3),tx=A/2+(bn.side?1:-1)*(1-e)*A*.8+(bn.side?-1:1)*out*A;
  g.font='20px '+FD;g.textAlign='center';g.textBaseline='middle';
  g.lineWidth=5;g.lineJoin='round';g.strokeStyle='#0b0d12';g.strokeText('궁 극 기',tx,y+h*.2);g.fillStyle=D.hi;g.fillText('궁 극 기',tx,y+h*.2);
  g.font='58px '+FD;g.lineWidth=10;
  g.strokeText(bn.txt,tx,y+h*.62);g.fillStyle='#fff';g.fillText(bn.txt,tx,y+h*.62);
  {const isz=150*sy,ix=bn.side?A-isz-6+(1-e)*220:6-(1-e)*220;if(isz>1)g.drawImage(ICON(D,150),ix,y+h/2-isz/2-6,isz,isz)}
  g.restore();
}
function frozen(f){
  if(f.dead||f.hid)return;
  if(phase=='play'&&!f.cast&&f.ug>=100){g.save();g.translate(f.x,f.y);g.strokeStyle=f.d.hi;g.globalAlpha=.5+.4*Math.sin(clock*8);g.lineWidth=3;g.setLineDash([6,6]);g.lineDashOffset=-clock*30;g.beginPath();g.arc(0,0,f.r+7+2*Math.sin(clock*8),0,TAU);g.stroke();g.restore()}
  if(f.slide>0){g.save();g.translate(f.x,f.y-f.r-8);for(let i=0;i<3;i++){const a=clock*9+i*TAU/3;g.fillStyle='#ffd43b';g.save();g.translate(Math.cos(a)*16,Math.sin(a)*6);g.rotate(a);poly([[0,-5],[1.5,-1.5],[5,0],[1.5,1.5],[0,5],[-1.5,1.5],[-5,0],[-1.5,-1.5]]);g.fill();g.restore()}g.restore()}
  if(f.stn>0){g.save();g.translate(f.x,f.y);g.strokeStyle='#ffe45c';g.lineWidth=2.5;g.lineCap='round';for(let i=0;i<3;i++){const a=i*TAU/3+clock*9;g.beginPath();g.moveTo(Math.cos(a)*f.r,Math.sin(a)*f.r);for(let j=1;j<4;j++){const aa=a+j*.22,rr=f.r+(j%2?10:2);g.lineTo(Math.cos(aa)*rr,Math.sin(aa)*rr)}g.stroke()}g.restore()}
  if(!(f.frz>0))return;
  const a=Math.min(1,f.frz/.3),s=back(clamp((1.4-f.frz)/.2,0,1));
  g.save();g.translate(f.x,f.y);g.scale(s,s);g.globalAlpha=.85*a;
  g.beginPath();g.moveTo(0,-f.r-22);g.lineTo(f.r+12,-f.r*.5);g.lineTo(f.r+16,f.r*.6);g.lineTo(0,f.r+20);g.lineTo(-f.r-16,f.r*.6);g.lineTo(-f.r-12,-f.r*.5);g.closePath();
  g.fillStyle='#bfe6f7';g.fill();g.lineWidth=4;g.strokeStyle='#12405e';g.stroke();
  g.strokeStyle='#fff';g.lineWidth=2.5;g.beginPath();g.moveTo(-10,-f.r-6);g.lineTo(-f.r-2,-f.r*.3);g.moveTo(8,-f.r+2);g.lineTo(f.r-2,-f.r*.2);g.stroke();
  g.restore();
}
function drawDragon(h){
  const D=h.o.d,hs=h.t*h.sp,N=20,gap=15;
  for(let i=N;i>=1;i--){
    const q=hs-i*gap;if(q<0)continue;
    const [x,y]=dpos(h,q),[x2,y2]=dpos(h,q+4),a=Math.atan2(y2-y,x2-x),r=5+(1-i/N)*17;
    g.save();g.translate(x,y);g.rotate(a);
    g.fillStyle='#ffd36b';g.strokeStyle='#3a2a05';g.lineWidth=2;g.beginPath();g.moveTo(-r*.6,-r*.7);g.lineTo(-r*1.3,-r*1.6);g.lineTo(r*.3,-r*.8);g.closePath();g.fill();g.stroke();
    g.beginPath();g.ellipse(0,0,r*1.15,r,0,0,TAU);g.fillStyle=D.dk;g.fill();
    g.beginPath();g.ellipse(-1,-1.5,r,r*.85,0,0,TAU);g.fillStyle=D.col;g.fill();
    g.beginPath();g.ellipse(0,r*.45,r*.8,r*.35,0,0,TAU);g.fillStyle='#d9f7c0';g.fill();
    g.strokeStyle=D.dk;g.lineWidth=1.5;g.beginPath();g.arc(-r*.2,-r*.1,r*.5,-1,1);g.stroke();
    g.restore();
  }
  const [hx,hy]=dpos(h,hs),[px,py]=dpos(h,hs-6),a=Math.atan2(hy-py,hx-px);
  g.save();g.translate(hx,hy);g.rotate(a);
  g.strokeStyle='#ffd36b';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(-4,-12);g.quadraticCurveTo(-20,-22,-34,-14);g.moveTo(-4,12);g.quadraticCurveTo(-20,22,-34,14);g.stroke();
  const jo=4+Math.sin(clock*18)*3;
  g.fillStyle=D.dk;g.beginPath();g.moveTo(-14,4);g.lineTo(30,6+jo);g.lineTo(26,14+jo);g.lineTo(-10,16);g.closePath();g.fill();
  g.beginPath();g.moveTo(-18,-16);g.quadraticCurveTo(10,-20,38,-4);g.lineTo(40,4);g.quadraticCurveTo(10,8,-18,14);g.closePath();g.fillStyle=D.col;g.fill();g.lineWidth=3;g.strokeStyle=D.dk;g.stroke();
  g.strokeStyle=D.hi;g.lineWidth=2;g.beginPath();g.moveTo(30,4);g.quadraticCurveTo(10,30+Math.sin(clock*8)*8,-30,26);g.moveTo(28,-6);g.quadraticCurveTo(8,-30-Math.sin(clock*8)*8,-30,-26);g.stroke();
  g.save();g.globalCompositeOperation='lighter';glow('#ffe45c',6,-8,14,1);glow('#2fd67e',40,8,30,.8);g.restore();
  g.fillStyle='#fff8c0';g.beginPath();g.ellipse(6,-8,5,2.5,-.2,0,TAU);g.fill();
  g.restore();
}
function drawFloor(h){
  const D=h.o.d,fa=Math.min(1,h.t/.3)*clamp((h.dur-h.t)/.4,0,1),ts=75,off=h.t*150,cols=[D.col,D.hi,'#ff5fa2','#7fd6ff'],fl=h.fl||0;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalCompositeOperation='lighter';
  const ox2=((Math.cos(h.dir)*off)%ts+ts)%ts,oy2=((Math.sin(h.dir)*off)%ts+ts)%ts;
  for(let i=-1;i<9;i++)for(let j=-1;j<9;j++){g.globalAlpha=fa*(((i+j)&1)?.08:.2)+fl*.22*fa;g.fillStyle=cols[(((i+j+h.beats)%4)+4)%4];g.fillRect(i*ts+ox2+3,j*ts+oy2+3,ts-6,ts-6)}
  g.save();g.translate(A/2,A/2);g.rotate(h.dir);g.strokeStyle=D.hi;g.lineWidth=7;g.lineCap='round';g.lineJoin='round';g.globalAlpha=fa*.35;
  for(let r=-4;r<=4;r++)for(let m=0;m<7;m++){const x=((m*140+off*1.2)%980)-490,y=r*95;g.beginPath();g.moveTo(x-14,y-18);g.lineTo(x+6,y);g.lineTo(x-14,y+18);g.stroke()}
  g.restore();
  for(let q=0;q<20;q++){const hh=(10+50*fl+22*Math.abs(Math.sin(clock*9+q*1.7)))*fa,bw=A/20;g.globalAlpha=fa*.55;g.fillStyle=cols[q%4];g.fillRect(q*bw+3,A-hh,bw-6,hh);g.fillRect(q*bw+3,0,bw-6,hh*.7)}
  for(let q=0;q<3;q++){
    const a=clock*1.3+q*2.1,x0=[0,A,A/2][q],y0=q==2?A:0,ex=A/2+Math.cos(a)*240,ey=A/2+Math.sin(a)*240,nx=-(ey-y0),ny=ex-x0,L=Math.hypot(nx,ny)||1;
    g.globalAlpha=fa*.16;g.fillStyle=cols[q];g.beginPath();g.moveTo(x0,y0);g.lineTo(ex+nx/L*60,ey+ny/L*60);g.lineTo(ex-nx/L*60,ey-ny/L*60);g.closePath();g.fill();
  }
  g.restore();
}
function drawQuake(h){
  const rr=h.t*520,p=Math.min(1,rr/340),N=56;
  g.save();g.beginPath();g.rect(0,0,A,A);g.clip();g.globalAlpha=1-p*.7;g.lineJoin='round';
  g.beginPath();for(let i=0;i<=N;i++){const a=i*TAU/N,r1=rr+((i*37)%7)/7*12;const x=h.x+Math.cos(a)*r1,y=h.y+Math.sin(a)*r1;i?g.lineTo(x,y):g.moveTo(x,y)}
  g.lineWidth=20*(1-p)+4;g.strokeStyle='#22262f';g.stroke();g.lineWidth=7*(1-p)+2;g.strokeStyle='#9a917f';g.stroke();
  g.globalCompositeOperation='lighter';g.lineWidth=4;g.strokeStyle=h.o.d.col;g.globalAlpha=(1-p)*.8;g.beginPath();g.arc(h.x,h.y,Math.max(1,rr-14),0,TAU);g.stroke();
  g.restore();
}
function drawKB(h){
  const p=h.t;g.save();
  h.cells.forEach(([x,y])=>{
    if(p<h.tel){
      const u=p/h.tel,bl=Math.sin(u*u*44)>0;
      g.globalAlpha=(.1+.25*u)*(bl?1:.45);g.fillStyle='#ff3b30';g.fillRect(x+3,y+3,54,54);
      g.globalAlpha=.85;g.strokeStyle='#ff3b30';g.lineWidth=2;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.strokeRect(x+4,y+4,52,52);g.setLineDash([]);
    }else{
      const q=p-h.tel,rise=back(clamp(q/.18,0,1)),down=clamp((p-h.tel-h.act)/.25,0,1),hh=16*rise*(1-down),fl=.8+.2*Math.sin(clock*30+x);
      g.globalAlpha=1-down;
      g.save();g.globalCompositeOperation='lighter';glow('#ff3b30',x+30,y+30-hh,52,.4*fl);g.restore();g.globalAlpha=1-down;
      g.fillStyle='#7a120c';g.fillRect(x+2,y+58-hh,56,hh+2);
      const tg2=g.createLinearGradient(0,y-hh,0,y+58-hh);tg2.addColorStop(0,'#ff5a4e');tg2.addColorStop(1,'#d8261b');
      g.fillStyle=tg2;g.fillRect(x+2,y+2-hh,56,56);g.strokeStyle='#4d0904';g.lineWidth=2;g.strokeRect(x+2,y+2-hh,56,56+hh);
      [[16,16],[44,16],[16,44],[44,44]].forEach(([sx,sy])=>{g.fillStyle='#a31a12';g.beginPath();g.ellipse(x+sx,y+sy-hh+2,8,7,0,0,TAU);g.fill();g.fillStyle='#ff6f63';g.beginPath();g.ellipse(x+sx,y+sy-hh,8,7,0,0,TAU);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(x+sx-2.5,y+sy-hh-2.5,3,2,-.6,0,TAU);g.fill()});
      g.fillStyle='rgba(255,255,255,.18)';g.fillRect(x+4,y+4-hh,52,3);
    }
  });
  g.restore();g.globalAlpha=1;
}
function drawBrick(h){
  const p=clamp(h.t/h.dl,0,1),q=p*p,P=h.pc;
  g.save();g.translate(h.x,h.y);g.globalAlpha=.3+.5*p;g.strokeStyle=P[2];g.lineWidth=3;g.setLineDash([8,6]);g.lineDashOffset=-clock*40;g.beginPath();g.arc(0,0,h.r,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.2+.35*p;g.fillStyle='#000';g.beginPath();g.ellipse(0,4,h.r*(.4+.5*p),h.r*.4*(.4+.5*p),0,0,TAU);g.fill();g.restore();
  const yo=-(1-q)*440,w=62,hh=26,dp=16;
  g.save();g.translate(h.x,h.y+yo-12);g.lineJoin='round';g.lineWidth=2.5;g.strokeStyle=P[1];
  g.fillStyle=P[0];g.fillRect(-w/2,-hh/2,w,hh);g.strokeRect(-w/2,-hh/2,w,hh);
  g.fillStyle=P[2];g.fillRect(-w/2,-hh/2-dp,w,dp);g.strokeRect(-w/2,-hh/2-dp,w,dp);
  [-w/4,w/4].forEach(x=>{g.fillStyle=P[0];g.fillRect(x-8,-hh/2-dp/2-5,16,5);g.beginPath();g.ellipse(x,-hh/2-dp/2-5,8,4,0,0,TAU);g.fillStyle=P[2];g.fill();g.stroke()});
  g.fillStyle='#ffffff30';g.fillRect(-w/2+3,-hh/2+3,w-6,4);
  g.restore();
}
function drawBlaster(h){
  const D=h.o.d,ap=back(clamp(h.t/.25,0,1)),fade=h.fired?clamp((h.ch+.55-h.t)/.2,0,1):1,ca=Math.cos(h.a0),sa=Math.sin(h.a0);
  if(!h.fired){const p=h.t/h.ch;g.save();g.globalCompositeOperation='lighter';glow(D.col,h.x+ca*34,h.y+sa*34,10+34*p,.9*p);glow('#ffffff',h.x+ca*34,h.y+sa*34,4+10*p,p);g.restore();g.save();g.globalAlpha=.25+.55*p;g.strokeStyle=D.hi;g.lineWidth=1+4*p;g.setLineDash([10,8]);g.lineDashOffset=-clock*80;g.beginPath();g.moveTo(h.x,h.y);g.lineTo(h.x+ca*900,h.y+sa*900);g.stroke();g.restore()}
  else if(h.t<h.ch+.4){const bt=h.t-h.ch,w=(bt<.06?bt/.06:1)*(1-clamp((bt-.25)/.15,0,1))*30;g.save();g.translate(h.x,h.y);g.rotate(h.a0);g.globalCompositeOperation='lighter';g.globalAlpha=.6;g.fillStyle=D.col;g.fillRect(20,-w*.9,900,w*1.8);g.globalAlpha=1;g.fillStyle='#ffffff';g.fillRect(20,-w*.5,900,w);g.strokeStyle='#ffffff';g.lineWidth=2;g.globalAlpha=.7;for(let r=0;r<5;r++){const rx=((clock*1100+r*180)%900)+30;g.beginPath();g.ellipse(rx,0,5,w*1.15+2,0,0,TAU);g.stroke()}g.restore()}
  g.save();g.translate(h.x,h.y);g.rotate(h.a0);g.scale(ap*fade*1.2,ap*fade*1.2*(ca<0?-1:1));
  const jaw=h.fired?.55:Math.min(1,h.t/h.ch)*.25;g.lineJoin='round';
  g.fillStyle='#f4f4f0';g.strokeStyle='#1a1a22';g.lineWidth=3;
  g.beginPath();g.moveTo(-26,-20);g.quadraticCurveTo(10,-28,28,-10);g.lineTo(30,-2);g.lineTo(-10,-4);g.lineTo(-26,4);g.closePath();g.fill();g.stroke();
  g.save();g.translate(-14,4);g.rotate(jaw);g.beginPath();g.moveTo(-4,0);g.lineTo(42,0);g.lineTo(38,10);g.lineTo(0,12);g.closePath();g.fill();g.stroke();
  g.fillStyle='#1a1a22';for(let i=0;i<4;i++)g.fillRect(8+i*8,0,2,5);g.restore();
  g.fillStyle='#1a1a22';g.beginPath();g.ellipse(-2,-12,7,6,0,0,TAU);g.fill();
  g.save();g.globalCompositeOperation='lighter';glow(D.col,-2,-12,14,1);glow('#ffffff',-2,-12,5,1);g.restore();
  g.strokeStyle='#1a1a22';g.beginPath();g.moveTo(-22,-14);g.lineTo(-36,-26);g.moveTo(-22,0);g.lineTo(-38,4);g.stroke();
  g.restore();
}
function drawKnife(D){
  poly([[18,0],[2,-4],[-6,-3],[-6,3],[2,4]]);g.fillStyle='#e8edf5';g.fill();g.strokeStyle='#2a2f3a';g.lineWidth=1.5;g.stroke();
  g.fillStyle=D.col;g.fillRect(-8,-7,3,14);g.fillStyle='#2a2f3a';g.fillRect(-17,-2.5,9,5);
  g.strokeStyle='#ffffff';g.lineWidth=1;g.beginPath();g.moveTo(15,0);g.lineTo(0,0);g.stroke();
}
function drawMad(){
  const M2=MAD,a=Math.min(1,M2.t/.3);g.save();
  g.globalAlpha=a*.28;g.globalCompositeOperation='color';g.fillStyle='#b0103a';g.fillRect(-300,-300,A+600,A+600);g.globalCompositeOperation='source-over';
  g.globalAlpha=a*.14;g.fillStyle='#ffffff';for(let i=0;i<140;i++)g.fillRect(rnd(0,A),rnd(0,A),1.6,1.6);
  g.globalAlpha=a;g.fillStyle='#000';g.fillRect(-300,-300,A+600,352);g.fillRect(-300,A-52,A+600,352);
  g.font='14px '+FD;g.textBaseline='middle';g.textAlign='left';g.fillStyle='#ff2d55';if(Math.sin(clock*8)>0){g.beginPath();g.arc(22,26,5,0,TAU);g.fill()}
  g.fillStyle='#ffffff';g.fillText('REC  00:0'+Math.floor(M2.t)+':'+String(Math.floor((M2.t%1)*24)).padStart(2,'0'),34,27);
  g.textAlign='right';g.fillStyle='#ffd3e0';g.fillText('MAD MOVIE · '+M2.o.d.name,A-16,27);
  M2.kf.slice(-4).forEach((k,i)=>{const y=74+i*26,w=170;g.globalAlpha=a*.85;g.fillStyle='rgba(10,4,8,.75)';g.fillRect(A-14-w,y-11,w,22);g.fillStyle=M2.o.d.col;g.fillRect(A-14-w,y-11,3,22);g.globalAlpha=a;g.font='12px '+FD;g.textAlign='right';g.fillStyle='#ffffff';g.fillText(M2.o.d.name+'  ✦  '+k.n,A-22,y+1)});
  const last=M2.kf[M2.kf.length-1];
  if(last){const q=M2.t-last.at,sc=back(clamp(q/.12,0,1))*(last.txt=='ACE'?1.5:1);g.save();g.globalAlpha=a*clamp((.9-q)/.3,0,1);g.translate(A/2,A-110);g.scale(sc,sc);g.font='64px '+FD;g.textAlign='center';g.lineJoin='round';g.lineWidth=12;g.strokeStyle='#000';g.strokeText(last.txt,0,0);g.fillStyle=last.txt=='ACE'?goldG(-30,30):'#ffffff';g.fillText(last.txt,0,0);g.restore()}
  g.restore();
  ball(M2.o,tgt(M2.o)||M2.o);
}
function drawStop(){
  const T2=TSTOP,o=T2.o,tg=tgt(o)||o,ap=Math.min(1,T2.t/.4)*clamp((T2.dur-T2.t)/.3,0,1);
  g.save();g.globalAlpha=ap;g.globalCompositeOperation='saturation';g.fillStyle='#808080';g.fillRect(-300,-300,A+600,A+600);g.restore();
  g.save();g.globalAlpha=ap*.25;g.fillStyle='#2a1f4a';g.fillRect(-300,-300,A+600,A+600);g.restore();
  g.save();g.translate(A/2,A/2);g.globalAlpha=ap*.35;g.strokeStyle=o.d.hi;g.lineCap='round';g.lineWidth=4;g.beginPath();g.arc(0,0,210,0,TAU);g.stroke();g.lineWidth=2;g.beginPath();g.arc(0,0,195,0,TAU);g.stroke();
  for(let i=0;i<12;i++){g.save();g.rotate(i*TAU/12);g.lineWidth=i%3?3:6;g.beginPath();g.moveTo(0,-195);g.lineTo(0,i%3?-182:-170);g.stroke();g.restore()}
  const sh=Math.floor(T2.t*2)*TAU/60;g.lineWidth=6;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(1.1)*110,-Math.cos(1.1)*110);g.stroke();g.lineWidth=2.5;g.beginPath();g.moveTo(0,0);g.lineTo(Math.sin(sh)*170,-Math.cos(sh)*170);g.stroke();
  g.restore();
  ball(o,tg);
  T2.kn.forEach(k=>{if(k.t<0)return;const u=Math.min(1,k.t/.18),e=1-Math.pow(1-u,3),x=k.x0+(k.x-k.x0)*e,y=k.y0+(k.y-k.y0)*e,a=Math.atan2(k.tg.y-k.y,k.tg.x-k.x)+(1-e)*5;
    g.save();g.translate(x,y);g.rotate(a);g.save();g.globalCompositeOperation='lighter';glow(o.d.col,0,0,18,.6);if(u<1){g.globalAlpha=.6;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(-10,0);g.lineTo(-60*(1-u),0);g.stroke()}g.restore();
    g.scale(1.45,1.45);drawKnife(o.d);if(u>=1){const sh=(clock*1.6+k.x*.013)%1;g.globalAlpha=.85*(1-sh);g.strokeStyle='#fff';g.lineWidth=1.3;g.beginPath();g.moveTo(16-sh*24,-3);g.lineTo(12-sh*24,3);g.stroke()}g.restore()});
}
