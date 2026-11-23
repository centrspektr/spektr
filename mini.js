/* СПЕКТР: строгий вид. Главная со своим появлением, кнопка "Кружковая деятельность", радуга-переход.
   Если строгий вид выключен (localStorage spk_view=old), файл только добавляет кнопку возврата в меню стиля. */
(function(){
var R=document.documentElement,B=document.body,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var LS={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function setView(v){LS.set('spk_view',v);location.reload()}

/* прежний вид: только кнопка "Строгий вид" в меню стиля */
if(!R.classList.contains('mn')){
  var skp=$('.skp');if(skp){var b=document.createElement('button');b.type='button';b.className='sko';b.innerHTML='<i></i><span>Строгий вид<small>тёмный, спокойный</small></span>';
    b.addEventListener('click',function(e){e.stopPropagation();setView('new')},true);skp.appendChild(b)}
  return}

var C=['#ff5c6c','#ff9f43','#ffd35c','#3ddc97','#2fd0f0','#5b8cff','#a77bff'];
var RED=matchMedia('(prefers-reduced-motion: reduce)').matches;
var KR_HASH=['#kruzhki','#groupsT','#todayT','#weekT','#dashT','#joinT','#newsT','#linksT','#rate'];

/* ---------- небо ---------- */
var sky=document.createElement('div');sky.className='mnsky';sky.innerHTML='<canvas class="st"></canvas><canvas class="gx"></canvas>';B.insertBefore(sky,B.firstChild);
var top=document.createElement('div');top.className='mntop';B.insertBefore(top,B.firstChild);
function drawSky(){var dpr=Math.min(devicePixelRatio||1,2),st=$('.st',sky),w=st.clientWidth,h=st.clientHeight;st.width=w*dpr;st.height=h*dpr;var x=st.getContext('2d');x.scale(dpr,dpr);
  for(var i=0;i<Math.round(w*h/1500);i++){var r=Math.pow(Math.random(),3)*1.3+.2,a=Math.random()*.7+.15;x.fillStyle='rgba('+(200+Math.random()*55|0)+','+(200+Math.random()*55|0)+',255,'+a+')';x.beginPath();x.arc(Math.random()*w,Math.random()*h,r,0,7);x.fill()}
  var g=$('.gx',sky),S=g.clientWidth;g.width=S*dpr;g.height=S*dpr;var c=g.getContext('2d');c.scale(dpr,dpr);c.translate(S/2,S/2);
  var core=c.createRadialGradient(0,0,0,0,0,S*.12);core.addColorStop(0,'rgba(255,240,220,.55)');core.addColorStop(.4,'rgba(255,200,150,.18)');core.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=core;c.beginPath();c.arc(0,0,S*.12,0,7);c.fill();
  var P=['255,92,108','255,159,67','255,211,92','61,220,151','47,208,240','91,140,255','167,123,255'];
  for(i=0;i<9000;i++){var arm=i%2,t=Math.pow(Math.random(),.7),ang=t*6.2+arm*Math.PI+(Math.random()-.5)*(1.1-t*.5),rad=t*S*.46;
    c.fillStyle='rgba('+P[Math.min(6,Math.floor(t*7))]+','+((1-t)*.55+.1)+')';c.beginPath();c.arc(Math.cos(ang)*rad,Math.sin(ang)*rad*.62,Math.random()*.9+.2,0,7);c.fill()}
  for(i=0;i<18;i++){var e=document.createElement('i');e.className='tw';e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';e.style.animationDelay=(Math.random()*4)+'s';sky.appendChild(e)}}
drawSky();

/* ---------- верх: логотип (удержание = вход по PIN), назад, шестерёнка ---------- */
var bar=document.createElement('div');bar.className='mnbar';
bar.innerHTML='<button class="mnback" type="button" aria-label="На главную Спектра"><i></i><b>Спектр</b></button>'+
 '<div class="mnhold" role="button" aria-label="СПЕКТР. Вход для педагога: удерживай"><div class="bgc"></div><svg viewBox="0 0 78 78"><defs><linearGradient id="mnrbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5c6c"/><stop offset=".33" stop-color="#ffd35c"/><stop offset=".55" stop-color="#3ddc97"/><stop offset=".78" stop-color="#5b8cff"/><stop offset="1" stop-color="#a77bff"/></linearGradient></defs><circle cx="39" cy="39" r="37" fill="none" stroke="rgba(255,255,255,.1)"/><circle class="pr" cx="39" cy="39" r="37"/></svg>'+
 '<div class="sp"><svg viewBox="0 0 78 78"><defs><path id="mnc" d="M39 7a32 32 0 1 1-.01 0"/></defs><text><textPath href="#mnc">РЕСУРСНЫЙ ЦЕНТР · СПЕКТР · </textPath></text></svg></div><img src="logo.webp" alt=""></div>'+
 '<div class="mnr"><button class="mngear" type="button" aria-label="Меню" aria-expanded="false"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg></button></div>';
B.insertBefore(bar,sky.nextSibling);
/* значки педагога (ученики, ошибки) - рядом с шестерёнкой */
['#stBtn','#bgBtn'].forEach(function(s){var e=$(s);if(e)$('.mnr',bar).insertBefore(e,$('.mngear',bar))});
var hold=$('.mnhold',bar),ht=0;
function hstop(){clearTimeout(ht);hold.classList.remove('go')}
hold.addEventListener('contextmenu',function(e){e.preventDefault()});
hold.addEventListener('pointerdown',function(e){if(e.button>0)return;hold.classList.add('go');ht=setTimeout(function(){hstop();try{navigator.vibrate&&navigator.vibrate(25)}catch(_){}
  try{if(typeof SESS!=='undefined'&&SESS)toast('Вы уже вошли');else if(typeof openLogin==='function')openLogin()}catch(_){}},900)});
['pointerup','pointerleave','pointercancel'].forEach(function(n){hold.addEventListener(n,function(e){if(n==='pointercancel'&&e.pointerType!=='mouse')return;hstop()})});
hold.addEventListener('touchend',hstop);

/* ---------- меню ---------- */
var menu=document.createElement('nav');menu.className='mnmenu';menu.setAttribute('aria-label','Меню');
menu.innerHTML='<div class="mh"><a href="#kruzhki" data-go style="--c:var(--m1)"><i></i>Кружковая деятельность</a><a href="https://centrspektr.fun" target="_blank" rel="noopener" style="--c:var(--m5)"><i></i>Сайт центра</a><button class="mi" type="button" data-sup style="--c:var(--m6)"><i></i>Поддержать</button></div>'+
 '<div class="mk"><a href="#groupsT" style="--c:var(--m1)"><i></i>Кружки</a><a href="#todayT" style="--c:var(--m2)"><i></i>Сегодня</a><a href="#weekT" style="--c:var(--m3)"><i></i>Расписание</a><a href="#dashT" data-dash style="--c:var(--m4)"><i></i>Дашборды</a><a href="#linksT" style="--c:var(--m5)"><i></i>Сайт и ссылки</a><button class="mi" type="button" data-sup style="--c:var(--m6)"><i></i>Поддержать</button><hr><button class="mi" type="button" data-home><i></i>На главную Спектра</button></div><hr>'+
 '<button class="mi" type="button" data-share><i></i>Поделиться и QR</button><button class="mi" type="button" data-inst><i></i>Установить на телефон</button><button class="mi" type="button" data-out hidden><i></i>Выйти из правки</button><hr>'+
 '<div class="ms">Вид сайта</div><div class="sw"><button class="on" type="button" data-v="new"><s style="background:var(--mrb)"></s>Строгий</button><button type="button" data-v="old"><s style="background:linear-gradient(90deg,#f472b6,#22d3ee)"></s>Прежний</button></div>'+
 '<div class="hint">Вход для педагога: удерживай логотип.</div>';
B.insertBefore(menu,bar.nextSibling);
var gear=$('.mngear',bar);
function menuOff(){menu.classList.remove('on');gear.classList.remove('on');gear.setAttribute('aria-expanded','false')}
gear.addEventListener('click',function(e){e.stopPropagation();var on=!menu.classList.contains('on');
  var dl=$('#dashT');$('[data-dash]',menu).style.display=dl&&!dl.hidden?'':'none';
  var ib=$('#inBtn');$('[data-inst]',menu).style.display=ib&&getComputedStyle(ib).display!=='none'?'':'none';
  $('[data-out]',menu).hidden=!(typeof SESS!=='undefined'&&SESS);
  menu.classList.toggle('on',on);gear.classList.toggle('on',on);gear.setAttribute('aria-expanded',on?'true':'false')});
document.addEventListener('click',function(e){if(menu.classList.contains('on')&&!menu.contains(e.target))menuOff()});
menu.addEventListener('click',function(e){var a=e.target.closest('a,button');if(!a)return;
  if(a.hasAttribute('data-v')){if(a.dataset.v==='old')setView('old');return}
  menuOff();
  if(a.hasAttribute('data-sup')){e.preventDefault();openSup()}
  else if(a.hasAttribute('data-share')){var s=$('#shBtn');s&&s.click()}
  else if(a.hasAttribute('data-inst')){var i=$('#inBtn');i&&i.click()}
  else if(a.hasAttribute('data-out')){var l=$('#lockBtn');l&&l.click()}});
function openSup(){var f=$('#fSup');if(f)f.click()}

/* ---------- главная ---------- */
var dv=($('#fDev')&&$('#fDev').textContent.split('.')[0])||'Время - главная ценность';
var home=document.createElement('section');home.className='mnhome';home.setAttribute('aria-label','СПЕКТР');
home.innerHTML='<div class="mnnow mnhx"><b class="mnclk">--:--</b><i></i><span class="mncap mndn"></span></div>'+
 '<div class="mncap mnhx">Ресурсный центр</div>'+
 '<div class="mnttlw"><div class="mnlt"><span class="beam"></span><span class="dot"></span></div><h1 class="mnttl">СПЕКТР</h1></div>'+
 '<div class="mnbar2"></div>'+
 '<div class="mncap mnhx">Иртышское поселение · Черлакский район</div>'+
 '<button class="mnkd mnhx" type="button" data-go><b>Кружковая деятельность</b><small>кружки · расписание · что сейчас</small></button>'+
 '<a class="mnpill mnhx" href="#todayT" data-go></a>'+
 '<div class="mnhl mnhx"><a class="mnul" href="https://centrspektr.fun" target="_blank" rel="noopener">Сайт центра</a><button class="mnul" type="button" data-sup>Поддержать</button></div>'+
 '<p class="mndv mnhx"></p>';
$('.mndv',home).textContent=dv+'.';
B.insertBefore(home,menu.nextSibling);

/* ---------- шапка кружковой деятельности ---------- */
var krh=document.createElement('section');krh.className='mnkrh';
krh.innerHTML='<div class="mncap" style="margin-bottom:22px">Ресурсный центр СПЕКТР</div><h1>Кружковая деятельность</h1><div class="mnbar2"></div><div class="mnrot"></div><p class="lead">Кружки, расписание и что идёт прямо сейчас.</p><a class="mnpill" href="#todayT"></a><a class="mnscr mncap" href="#groupsT"><span>Листай</span><i></i></a>';
var mqw=$('.mqw');(mqw?mqw.parentNode:B).insertBefore(krh,mqw||$('main'));
var rot=$('.hero .rot');if(rot)$('.mnrot',krh).replaceWith(rot);else $('.mnrot',krh).remove();

/* ---------- появление СПЕКТРа: луч -> призма -> спектр -> буквы ---------- */
var ttl=$('.mnttl',home);ttl.innerHTML=ttl.textContent.split('').map(function(c,i){return '<span style="color:'+C[i%7]+';transition-delay:'+(i*.08)+'s,'+(i*.08)+'s,'+(1.1+i*.08)+'s">'+c+'</span>'}).join('');
var lt=$('.mnlt',home),A=[-10,-6.5,-3.2,0,3.2,6.5,10];
lt.insertAdjacentHTML('beforeend',A.map(function(a,i){return '<span class="ray" style="--a:'+a+'deg;--i:'+i+';background:linear-gradient(90deg,'+C[i]+',transparent)"></span>'}).join(''));
var intro=0;
function runIntro(){if(intro)return;intro=1;var T=function(f,ms){setTimeout(f,RED?0:ms)};
  T(function(){lt.classList.add('s1')},250);
  T(function(){lt.classList.add('s2')},1100);
  T(function(){$$('span',ttl).forEach(function(s){s.classList.add('in');s.style.color='var(--text)'})},1500);
  T(function(){lt.classList.add('s3');$('.mnbar2',home).classList.add('in')},2400);
  $$('.mnhx',home).forEach(function(e,i){T(function(){e.classList.add('in')},2600+i*140)});
  T(function(){ttl.classList.add('shn')},4200)}

/* ---------- часы и "что сейчас" (берём из уже посчитанных блоков "Сегодня") ---------- */
var DF=['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
function p2(n){return(n<10?'0':'')+n}
function nowInfo(){var on=$('#todayL .lrow.on');
  if(on){var b=$('.nm b',on),dt=$('.dt',on);return{c:dt?dt.style.background:'#fff',em:'Сейчас',t:(b?b.textContent:'')}}
  var nx=$('#nextC');if(!nx)return null;var big=$('.big',nx),nb=$('b',nx),sm=$$('small',nx);if(!big||!nb)return null;
  var when=big.textContent.trim(),tm=sm.length>1?sm[sm.length-1].textContent.trim():'';
  return{c:'var(--m3)',em:/^\d/.test(when)?'Сегодня':when,t:nb.textContent.replace(/^[^\wА-Яа-яЁё"]+/,'')+(tm?' · '+tm:/^\d/.test(when)?' · '+when:'')}}
function tick(){var d=new Date();$('.mnclk',home).textContent=p2(d.getHours())+':'+p2(d.getMinutes());$('.mndn',home).textContent=DF[d.getDay()];
  var n=nowInfo();$$('.mnpill').forEach(function(p){if(!n){p.innerHTML='';return}p.style.setProperty('--c',n.c);p.innerHTML='<i></i><em></em><span></span>';$('em',p).textContent=n.em;$('span',p).textContent=n.t})}
tick();setInterval(tick,20000);setTimeout(tick,2500);setTimeout(tick,6000);

/* ---------- режимы: главная / кружки ---------- */
var rb=document.createElement('div');rb.className='mnrb';rb.innerHTML=C.map(function(_,i){return '<i style="background:'+['#f43f5e','#fb923c','#facc15','#22c55e','#06b6d4','#6366f1','#a855f7'][i]+';--i:'+i+'"></i>'}).join('')+'<img src="logo.webp" alt="">';B.appendChild(rb);
var fade=document.createElement('div');fade.className='mnfade';B.appendChild(fade);
var busy=0;
function refresh(){try{window.ScrollTrigger&&ScrollTrigger.refresh()}catch(e){}$$('main .rv').forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight)e.style.opacity=''})}
function setMode(k){B.classList.toggle('mnk',k);B.classList.toggle('mnh',!k);if(!k)runIntro();setTimeout(refresh,60)}
function goTo(hash){var el=hash&&hash!=='#kruzhki'&&document.getElementById(hash.slice(1));if(el)setTimeout(function(){el.scrollIntoView({behavior:'instant',block:'start'})},120);else scrollTo(0,0)}
function enter(hash,push){if(busy)return;menuOff();if(B.classList.contains('mnk')){goTo(hash);return}busy=1;
  if(push!==false)try{history.pushState({mn:1},'',hash||'#kruzhki')}catch(e){}
  if(RED){setMode(true);goTo(hash);busy=0;return}
  rb.className='mnrb on';requestAnimationFrame(function(){requestAnimationFrame(function(){rb.classList.add('grow')})});
  setTimeout(function(){rb.classList.add('logo')},650);
  setTimeout(function(){setMode(true);goTo(hash);rb.classList.add('out')},1500);
  setTimeout(function(){rb.className='mnrb';busy=0},2500)}
function leave(push){if(busy||B.classList.contains('mnh'))return;busy=1;menuOff();
  if(push!==false)try{history.pushState({},'',location.pathname+location.search)}catch(e){}
  fade.classList.add('on');setTimeout(function(){setMode(false);scrollTo(0,0);fade.classList.remove('on');busy=0},480)}
document.addEventListener('click',function(e){var a=e.target.closest('[data-go],[data-home],[data-sup]');if(!a||!(menu.contains(a)||home.contains(a)||krh.contains(a)))return;
  if(a.hasAttribute('data-go')){e.preventDefault();enter(a.getAttribute('href')==='#todayT'?'#todayT':'#kruzhki')}
  else if(a.hasAttribute('data-home')){e.preventDefault();leave()}
  else if(a.hasAttribute('data-sup')&&home.contains(a)){e.preventDefault();openSup()}});
$('.mnback',bar).addEventListener('click',function(){leave()});
addEventListener('popstate',function(){var h=location.hash;if(KR_HASH.indexOf(h)>=0)enter(h,false);else if(!h)leave(false)});
var h0=location.hash;
if(KR_HASH.indexOf(h0)>=0){setMode(true);goTo(h0)}else setMode(false);

/* ---------- прокрутка: полоса сверху, логотип прячется ---------- */
addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;top.style.transform='scaleX('+(m>0&&B.classList.contains('mnk')?scrollY/m:0)+')';B.classList.toggle('mnsc',scrollY>innerHeight*.5)},{passive:true});
})();
