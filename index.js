document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Blinking cursor animation
  const cursor = document.getElementById("cursor");
  if (cursor) {
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 500);
  }

  // Colorful Pixel Logo
  const pixelLogo = document.getElementById("pixelLogo");
  if (pixelLogo) {
    const colors = [
      "#f87171",
      "#facc15",
      "#4ade80",
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
    ];
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(8, 1fr)";
    grid.style.gridTemplateRows = "repeat(8, 1fr)";
    grid.style.gap = "2px";
    grid.style.width = "100%";
    grid.style.height = "100%";

    for (let i = 0; i < 64; i++) {
      const pixel = document.createElement("div");
      if (
        [0, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 63].includes(
          i
        )
      ) {
        pixel.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
      } else {
        pixel.style.backgroundColor = "transparent";
      }
      grid.appendChild(pixel);
    }

    pixelLogo.appendChild(grid);
  }

  // Floating Pixels
  const floatingPixels = document.getElementById("floatingPixels");
  if (floatingPixels) {
    const pixelCount = 20;
    const pixels = [];

    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement("div");
      pixel.className = "pixel";

      const size = Math.random() * 4 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speed = Math.random() * 0.5 + 0.1;

      pixel.style.width = `${size}px`;
      pixel.style.height = `${size}px`;
      pixel.style.left = `${x}px`;
      pixel.style.top = `${y}px`;

      floatingPixels.appendChild(pixel);

      pixels.push({
        element: pixel,
        x: x,
        y: y,
        speed: speed,
      });
    }

    function animatePixels() {
      pixels.forEach((pixel) => {
        pixel.y -= pixel.speed;
        pixel.x += Math.sin(pixel.y * 0.1) * 0.5;

        if (pixel.y < -10) {
          pixel.y = window.innerHeight + 10;
          pixel.x = Math.random() * window.innerWidth;
        }

        pixel.element.style.left = `${pixel.x}px`;
        pixel.element.style.top = `${pixel.y}px`;
      });

      requestAnimationFrame(animatePixels);
    }

    animatePixels();
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("[data-lucide]");
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      themeIcon.setAttribute("name", "moon");
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.setAttribute("name", "sun");
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);

      if (isDark) {
        themeIcon.setAttribute("name", "moon");
      } else {
        themeIcon.setAttribute("name", "sun");
      }

      lucide.createIcons();
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For this example, we'll just show an alert
      alert(`¡Gracias ${name}! Tu mensaje ha sido enviado.`);
      contactForm.reset();
    });
  }

  // Sound Effect on Click
  document.addEventListener("click", function () {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  });
});
