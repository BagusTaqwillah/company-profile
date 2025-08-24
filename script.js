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
      "Awas Nanti Baper Jangan Next!",
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
    }