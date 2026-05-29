const CONFIG = {

  // ปี, เดือน-1, วัน, ชั่วโมง, นาที
  BIRTHDAY: new Date(2026, 4, 30, 0, 0, 0),

  PHOTOS: [
    // ใส่รูปตรงนี้
    "20260518_182248.webp",
    // "img/2.jpg",
  ],

  SECRET_MESSAGE:
`ฉันรักอ้วนๆมากที่สุด 💖

ขอบคุณที่เข้ามาในชีวิตกันนะอยู่ด้วยกันไปนานๆนะครับ
รักอ้วนๆมากๆเลยนะครับ ❤️อันไหนเค้าที่เค้าทำผิดไปก็ขอโทษด้วยนะครับ 
เค้าจะพยายามเป็นคนที่ดีขึ้นเพื่ออ้วนๆนะครับ

Happy Birthday Na kub  🎂`
};

/* =========================
   COUNTDOWN
========================= */

function pad(n){
  return String(Math.floor(n))
    .padStart(2,'0');
}

function updateCountdown(){

  const now = new Date();

  const diff =
    CONFIG.BIRTHDAY - now;

  if(diff <= 0){
    showBirthdayPage();
    return;
  }

  const days =
    diff / (1000*60*60*24);

  const hours =
    (diff % (1000*60*60*24)) /
    (1000*60*60);

  const minutes =
    (diff % (1000*60*60)) /
    (1000*60);

  const seconds =
    (diff % (1000*60)) /
    1000;

  document.getElementById('days')
    .textContent = pad(days);

  document.getElementById('hours')
    .textContent = pad(hours);

  document.getElementById('minutes')
    .textContent = pad(minutes);

  document.getElementById('seconds')
    .textContent = pad(seconds);
}

/* =========================
   SHOW PAGE
========================= */

function showBirthdayPage(){

  clearInterval(countdownInterval);

  document
    .getElementById('countdown-page')
    .classList.add('hidden');

  document
    .getElementById('birthday-page')
    .classList.remove('hidden');

  loadPhotos();

  launchConfetti();

  audioPlayer.src = 'Happy Birthday To You - THE KIBOOMERS Birthday Party Song for Kids.mp3';
  audioPlayer.loop = false;
  audioPlayer.play();
}

/* =========================
   PHOTOS
========================= */

function loadPhotos(){

  if(CONFIG.PHOTOS.length <= 0)
    return;

  const inner =
    document.getElementById(
      'slideshowInner'
    );

  document
    .getElementById('photoPlaceholder')
    ?.remove();

  CONFIG.PHOTOS.forEach((url,i)=>{

    const img =
      document.createElement('img');

    img.src = url;

    img.className =
      'slide-img' +
      (i===0 ? ' active' : '');

    inner.appendChild(img);
  });

  startSlideshow();
}

function startSlideshow(){

  const imgs =
    document.querySelectorAll('.slide-img');

  let current = 0;

  setInterval(()=>{

    imgs[current]
      .classList.remove('active');

    current =
      (current+1)%imgs.length;

    imgs[current]
      .classList.add('active');

  },3000);
}

/* =========================
   SECRET MESSAGE
========================= */

const secretBtn =
  document.getElementById(
    'secretBtn'
  );

const modal =
  document.getElementById(
    'secretModal'
  );

const modalClose =
  document.getElementById(
    'modalClose'
  );

const typingText =
  document.getElementById(
    'typingText'
  );

secretBtn.addEventListener(
  'click',
  ()=>{

    modal.classList.add('open');

    typingText.innerHTML =
      CONFIG.SECRET_MESSAGE
        .replace(/\n/g,'<br>');
  }
);

modalClose.addEventListener(
  'click',
  ()=>{
    modal.classList.remove('open');
  }
);

modal.addEventListener(
  'click',
  e=>{
    if(e.target===modal){
      modal.classList.remove('open');
    }
  }
);

/* =========================
   PARTICLES
========================= */

const particles =
  document.getElementById(
    'particles'
  );

const symbols =
[
  '💖',
  '✨',
  '💕',
  '🌸',
  '⭐'
];

function createParticle(){

  const el =
    document.createElement('div');

  el.className='particle';

  el.innerHTML =
    symbols[
      Math.floor(
        Math.random()*symbols.length
      )
    ];

  el.style.left =
    Math.random()*100+'vw';

  el.style.fontSize =
    Math.random()*20+12+'px';

  el.style.animationDuration =
    Math.random()*5+5+'s';

  particles.appendChild(el);

  setTimeout(()=>{
    el.remove();
  },10000);
}

setInterval(createParticle,500);

/* =========================
   STARS
========================= */

const canvas =
  document.getElementById(
    'starsCanvas'
  );

const ctx =
  canvas.getContext('2d');

let stars=[];

function resizeCanvas(){

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;
}

window.addEventListener(
  'resize',
  resizeCanvas
);

resizeCanvas();

for(let i=0;i<150;i++){

  stars.push({

    x:Math.random()*canvas.width,

    y:Math.random()*canvas.height,

    r:Math.random()*2
  });
}

function drawStars(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle='white';

  stars.forEach(star=>{

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.r,
      0,
      Math.PI*2
    );

    ctx.fill();
  });

  requestAnimationFrame(
    drawStars
  );
}

drawStars();

/* =========================
   CONFETTI
========================= */

function launchConfetti(){

  for(let i=0;i<60;i++){

    const confetti =
      document.createElement('div');

    confetti.style.position='fixed';

    confetti.style.left =
      Math.random()*100+'vw';

    confetti.style.top='-20px';

    confetti.style.width='10px';

    confetti.style.height='10px';

    confetti.style.background=
      `hsl(${Math.random()*360},
      100%,70%)`;

    confetti.style.zIndex='999';

    confetti.style.borderRadius='50%';

    confetti.style.transition='4s linear';

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.style.transform=
        `translateY(110vh)
         rotate(720deg)`;

      confetti.style.opacity='0';

    },50);

    setTimeout(()=>{
      confetti.remove();
    },4500);
  }
}

/* =========================
   MUSIC
========================= */

const musicBtn =
  document.getElementById(
    'musicBtn'
  );

let audioCtx = null;
let audioFile = null;

const audioPlayer =
  document.getElementById('audioPlayer');

// ตั้งเพลงเริ่มต้น
audioPlayer.src = 'คชวต - COCKTAILOfficial MV (Cut Version).mp3';
audioPlayer.loop = true;

musicBtn.addEventListener(
  'click',
  ()=>{
    if(audioPlayer.paused){
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }
);

/* =========================
   START
========================= */

if(new Date() >= CONFIG.BIRTHDAY){

  showBirthdayPage();

}else{

  updateCountdown();
}

const countdownInterval =
  setInterval(
    updateCountdown,
    1000
  );