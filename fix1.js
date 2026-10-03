// ===== fix1.js : 구석 갇힘 · 모서리 연속 튕김 방지 =====
// 밀어낼 때 벽에 처박히지 않게 : 벽 쪽으로 밀리면 그 방향 성분을 반대로
function safePush(e,a,d){let vx=Math.cos(a)*d,vy=Math.sin(a)*d;const m=e.r+40;
  if((e.x+vx<m&&vx<0)||(e.x+vx>A-m&&vx>0))vx=-vx*.6;if((e.y+vy<m&&vy<0)||(e.y+vy>A-m&&vy>0))vy=-vy*.6;
  e.x=clamp(e.x+vx,e.r,A-e.r);e.y=clamp(e.y+vy,e.r,A-e.r)}
// 구석에 오래 있으면 가운데로 빠져나옴
const _updFX1=update;update=function(dt){_updFX1(dt);if(!F||(phase!='play'&&phase!='demo')||TSTOP||MAD)return;
  F.forEach(f=>{if(f.dead||f.hid||f.jump)return;if(CIN&&(f==CIN.o||CIN.e==f))return;const m=f.r+38,cx=f.x<m||f.x>A-m,cy=f.y<m||f.y>A-m;
    f.cnr=(cx&&cy)?(f.cnr||0)+dt:Math.max(0,(f.cnr||0)-dt*2);
    if(f.cnr>.7){const a=Math.atan2(A/2-f.y,A/2-f.x)+rnd(-.35,.35);f.dx=Math.cos(a);f.dy=Math.sin(a);f.x=clamp(f.x+Math.cos(a)*170*dt,f.r,A-f.r);f.y=clamp(f.y+Math.sin(a)*170*dt,f.r,A-f.r);if(f.cnr>1.1)f.cnr=0}
    // 한쪽 벽에 계속 붙어 있으면 벽에서 떨어지는 방향으로
    const wx=f.x<=f.r+1?1:f.x>=A-f.r-1?-1:0,wy=f.y<=f.r+1?1:f.y>=A-f.r-1?-1:0;f.wst=(wx||wy)?(f.wst||0)+dt:0;
    if(f.wst>1){if(wx&&Math.sign(f.dx)!=wx)f.dx=wx*Math.max(.5,Math.abs(f.dx));if(wy&&Math.sign(f.dy)!=wy)f.dy=wy*Math.max(.5,Math.abs(f.dy));const l=Math.hypot(f.dx,f.dy)||1;f.dx/=l;f.dy/=l}});};
// 겁먹고 도망칠 때 벽 · 구석으로 처박히지 않게 (가운데 쪽으로 섞어서 도망)
if(typeof onFear=='function'){const _updFX2=update;update=function(dt){_updFX2(dt);if(!F||(phase!='play'&&phase!='demo'))return;F.forEach(f=>{if(!(f.fear>0)||f.dead)return;const m=f.r+70;let px=0,py=0;
  if(f.x<m)px=(m-f.x)/m;else if(f.x>A-m)px=-(f.x-(A-m))/m;if(f.y<m)py=(m-f.y)/m;else if(f.y>A-m)py=-(f.y-(A-m))/m;if(px||py){let vx=f.dx+px*2.2,vy=f.dy+py*2.2;const l=Math.hypot(vx,vy)||1;f.dx=vx/l;f.dy=vy/l}})}}
