gsap.timeline()
  .to("#intro h1", {opacity:1, scale:1, duration:1.2, ease:"power4.out"})
  .to("#intro", {y:"-100%", duration:1, delay:0.5, ease:"power3.inOut", onComplete:()=> document.getElementById('intro').style.display='none'});

const intro = document.getElementById("intro");

for(let i=0;i<30;i++){
  const dot = document.createElement("div");
  dot.classList.add("w-2","h-2","bg-white","rounded-full","absolute");
  dot.style.top = Math.random()*100+"%";
  dot.style.left = Math.random()*100+"%";
  intro.appendChild(dot);

  gsap.to(dot, {
    y: Math.random()*200-100,
    x: Math.random()*200-100,
    opacity:0.2 + Math.random()*0.3,
    duration:1 + Math.random()*1,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
  });
}

// Region Cursor
const canvas = document.getElementById('tentacleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tentakel
const numTentacles = 40; // jumlah tentakel
const tentacles = [];

for(let i=0;i<numTentacles;i++){
  const length = Math.floor(Math.random()*25) + 5; // 5-30 titik per tentakel
  const points = [];
  for(let j=0;j<length;j++){
    points.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height});
  }
  const hue = Math.floor(Math.random()*360);
  tentacles.push({points, hue});
}

let mouse = {x: canvas.width/2, y: canvas.height/2};

window.addEventListener('mousemove', e=> mouse = {x:e.clientX, y:e.clientY});
window.addEventListener('touchmove', e=> {
  const t = e.touches[0];
  mouse = {x:t.clientX, y:t.clientY};
});

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  tentacles.forEach(tent=>{
    // titik pertama mengikuti mouse
    tent.points[0].x += (mouse.x + (Math.random()*40-20) - tent.points[0].x) * 0.1;
    tent.points[0].y += (mouse.y + (Math.random()*40-20) - tent.points[0].y) * 0.1;

    // titik selanjutnya mengikuti titik sebelumnya
    for(let i=1;i<tent.points.length;i++){
      tent.points[i].x += (tent.points[i-1].x - tent.points[i].x) * 0.3;
      tent.points[i].y += (tent.points[i-1].y - tent.points[i].y) * 0.3;
    }

    // gambar garis tentakel dengan tebal mengecil
    for(let i=1;i<tent.points.length;i++){
      const p1 = tent.points[i-1];
      const p2 = tent.points[i];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      // LineWidth dari tebal → tipis
      ctx.lineWidth = 4 * (1 - i/tent.points.length) + Math.random()*1.5;
      ctx.strokeStyle = `hsl(${tent.hue}, 100%, 60%)`;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// endregion

const navbar = document.querySelector('nav');
  const menuLinks = navbar.querySelectorAll('a');
  const burgerIcon = navbar.querySelector('svg');
  const logo = navbar.querySelector('span'); // logo MBTCorp

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      // scroll ke bawah → navbar putih
      navbar.classList.add('bg-white', 'shadow-md');
      navbar.classList.remove('bg-transparent');
      
      menuLinks.forEach(a => a.classList.replace('text-white', 'text-gray-700'));
      burgerIcon.classList.replace('text-white', 'text-gray-700');
      logo.classList.replace('text-white', 'text-blue-600'); // logo biru
    } else {
      // di atas jumbotron → navbar transparan
      navbar.classList.remove('bg-white', 'shadow-md');
      navbar.classList.add('bg-transparent');
      
      menuLinks.forEach(a => a.classList.replace('text-gray-700', 'text-white'));
      burgerIcon.classList.replace('text-gray-700', 'text-white');
      logo.classList.replace('text-blue-600', 'text-white'); // logo putih
    }
  });
 
 const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true' || false;
      btn.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle("hidden");
    });

    gsap.registerPlugin(ScrollTrigger);

    // Reset state awal
    gsap.set(".service-card", {
      opacity: 0,
      y: 50
    });

    gsap.to(".service-card", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        toggleActions: "play none none none", // main sekali saja
      },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out"
    });

     function showComingSoon() {
    Swal.fire({
      title: '🚀 Coming Soon!',
      text: 'Fitur ini sedang dalam pengembangan. Stay tuned!',
      icon: 'info',
      confirmButtonText: 'Oke',
      confirmButtonColor: '#2563eb', // Tailwind blue-600
      backdrop: `
        rgba(0,0,0,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }

  const kontenBtn = document.getElementById("kontenBtn");
    const ucapan = document.getElementById("ucapan");
    const ucapanText = document.getElementById("ucapanText");
    const nextBtn = document.getElementById("nextBtn");

    const messages = [
      "Awas Nanti Baper, Jangan Next!",
      "Setiap detik bersamamu adalah anugerah 💕",
      "Kamu adalah alasan senyumku hari ini ✨",
      "Terima kasih sudah singgah, semoga hari-harimu selalu seindah senyummu 🌸✨"
    ];

    let index = 0;

    kontenBtn.addEventListener("click", () => {
      index = 0;
      showMessage();
      ucapan.classList.remove("hidden");
    });

    nextBtn.addEventListener("click", () => {
      index++;
      if (index < messages.length) {
        showMessage();
      } else {
        closeUcapan();
      }
    });

    function showMessage() {
      ucapanText.textContent = "";
      let msg = messages[index];
      let i = 0;
      let interval = setInterval(() => {
        ucapanText.textContent += msg[i];
        i++;
        if (i === msg.length) clearInterval(interval);
      }, 70);

      // Update tombol jadi "Tutup" kalau sudah pesan terakhir
      if (index === messages.length - 1) {
        nextBtn.textContent = "💖 Tutup";
      } else {
        nextBtn.textContent = "👉 Next";
      }
    }

   function closeUcapan() {
  ucapan.classList.add("hidden");

  // Canvas efek
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = 9999;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const smallParticles = [];
  const colors = ["#ff3c78", "#ffb347", "#fffa65", "#6af2ff", "#c56eff"];
  for (let i = 0; i < 50; i++) {
    smallParticles.push({
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 1.5) * 8,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() < 0.5 ? "heart" : "flower"
    });
  }

  const flower = {
    x: centerX,
    y: centerY,
    radius: 0,
    maxRadius: 60 + Math.random() * 40,
    petals: 6 + Math.floor(Math.random() * 3),
    color: colors[Math.floor(Math.random() * colors.length)]
  };

  let frame = 0;
  const maxFrames = 180;

  function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -size / 2, -size / 2, -size, -size, -size / 2);
    ctx.bezierCurveTo(-size, -size / 4, 0, size / 2, 0, size);
    ctx.bezierCurveTo(0, size / 2, size, -size / 4, size, -size / 2);
    ctx.bezierCurveTo(size, -size, 0, -size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawSmallFlower(x, y, size, color, petals) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    for (let i = 0; i < petals; i++) {
      ctx.beginPath();
      ctx.ellipse(0, size / 2, size / 2, size, i * Math.PI * 2 / petals, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawBigFlower(f) {
    ctx.save();
    ctx.translate(f.x, f.y);
    for (let i = 0; i < f.petals; i++) {
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.ellipse(0, f.radius / 2, f.radius / 2, f.radius, i * Math.PI * 2 / f.petals, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (flower.radius < flower.maxRadius) flower.radius += 1.5;
    drawBigFlower(flower);

    smallParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05; // gravity
      if (p.type === "heart") drawHeart(p.x, p.y, p.size, p.color);
      else drawSmallFlower(p.x, p.y, p.size, p.color, 5);
    });

    frame++;
    if (frame < maxFrames) requestAnimationFrame(animate);
    else document.body.removeChild(canvas);
  }

  animate();
}
