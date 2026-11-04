/**
 * PORTOFOLIO PROFESIONAL - JAVASCRIPT
 * Mengatur interaktivitas: Dark/Light Mode, Mobile Menu, Typing Effect,
 * Filter Proyek, Modal Preview, Counter Animasi, Validasi Form & Notifikasi.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. PENGATURAN TEMA (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Baca preferensi tema dari localStorage atau preferensi sistem browser
  const savedTheme = localStorage.getItem("portfolio_theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
  } else if (!systemPrefersDark) {
    htmlElement.setAttribute("data-theme", "light");
  } else {
    htmlElement.setAttribute("data-theme", "dark");
  }

  // Event listener tombol ganti tema
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio_theme", newTheme);
    });
  }

  // ==========================================
  // 2. NAVIGASI MOBILE (HAMBURGER MENU)
  // ==========================================
  const menuToggleBtn = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggleBtn.classList.toggle("active", isOpen);
      menuToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Tutup menu saat salah satu link diklik (khusus di mobile)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          menuToggleBtn.classList.remove("active");
          menuToggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Tutup menu saat pengguna mengklik di luar area menu
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !menuToggleBtn.contains(e.target)
      ) {
        navMenu.classList.remove("open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==========================================
  // 3. STICKY NAVBAR & ACTIVE SCROLL SPY
  // ==========================================
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll spy: sorot link navigasi yang sesuai dengan posisi scroll
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetNavLink) {
          navLinks.forEach((link) => link.classList.remove("active"));
          targetNavLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", handleNavbarScroll);

  // ==========================================
  // 4. ANIMASI TEKS KETIK (TYPING EFFECT)
  // ==========================================
  const typingTextElement = document.getElementById("typing-text");
  const roles = [
    "Full-Stack Web Developer",
    "Frontend Engineer",
    "UI/UX Enthusiast",
    "Creative Problem Solver"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1600;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // ==========================================
  // 5. ANIMASI STATISTIK COUNTER & SKILL BARS
  // ==========================================
  // Animasi Skill Bars ketika masuk viewport
  const skillCategories = document.querySelectorAll(".skill-category");
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  skillCategories.forEach((cat) => skillObserver.observe(cat));

  // Animasi Angka Statistik Counter
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsCounted = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1800; // ms
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      // Memeriksa jika memiliki suffix simbol '%' atau '+'
      const suffix = el.textContent.includes("%") ? "%" : "+";
      el.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach((num) => countUp(num));
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  }

  // ==========================================
  // 6. FILTER KATEGORI PORTOFOLIO / PROYEK
  // ==========================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Ubah status tombol aktif
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hide");
          card.classList.add("fade-in");
        } else {
          card.classList.add("hide");
          card.classList.remove("fade-in");
        }
      });
    });
  });

  // ==========================================
  // 7. MODAL DETAIL PROYEK
  // ==========================================
  // Data detail untuk setiap proyek
  const projectDetails = {
    "modal-project-1": {
      title: "Toko Online Modern (E-Commerce)",
      category: "Web Application & E-Commerce",
      gradient: "gradient-1",
      icon: "fa-solid fa-cart-shopping",
      desc: "Platform toko online responsif dengan fitur keranjang belanja real-time, penyaringan katalog berbasis kategori dan harga, integrasi checkout, dan performa tinggi di semua ukuran layar.",
      features: [
        "Keranjang belanja interaktif dengan penyimpanan LocalStorage",
        "Pencarian instan dan penyaringan produk multi-kategori",
        "Desain mobile-first yang nyaman digunakan dengan satu tangan",
        "Integrasi antarmuka pembayaran simulasi (payment gateway ready)"
      ],
      demoUrl: "https://example.com/demo-ecommerce",
      githubUrl: "https://github.com"
    },
    "modal-project-2": {
      title: "Dashboard Analitik Penjualan",
      category: "Web Application & Dashboard",
      gradient: "gradient-2",
      icon: "fa-solid fa-chart-line",
      desc: "Dashboard visualisasi analitik penjualan dan performa bisnis. Dirancang untuk memudahkan pimpinan bisnis membaca data metrik penting secara cepat dan akurat.",
      features: [
        "Grafik garis dan batang interaktif dengan animasi halus",
        "Penyaringan rentang waktu (Harian, Mingguan, Bulanan, Tahunan)",
        "Mode gelap & terang bawaan",
        "Fitur ekspor data ringkasan ke format CSV & PDF"
      ],
      demoUrl: "https://example.com/demo-analytics",
      githubUrl: "https://github.com"
    },
    "modal-project-3": {
      title: "Landing Page Perusahaan Startup",
      category: "Responsive & Corporate Website",
      gradient: "gradient-3",
      icon: "fa-solid fa-building",
      desc: "Landing page profil korporat startup teknologi dengan tata letak modern, tipografi bersih, serta animasi scroll interaktif yang meningkatkan tingkat konversi pelanggan.",
      features: [
        "Animasi micro-interactions CSS yang sangat halus",
        "Skor Google Lighthouse 98+ untuk aksesibilitas dan SEO",
        "Formulir kontak terhubung dengan auto-responder",
        "Responsif optimal dari layar handphone 360px hingga monitor 4K"
      ],
      demoUrl: "https://example.com/demo-company",
      githubUrl: "https://github.com"
    },
    "modal-project-4": {
      title: "Manajemen Tugas Kanban (Taskify)",
      category: "Productivity Web App",
      gradient: "gradient-4",
      icon: "fa-solid fa-list-check",
      desc: "Aplikasi produktivitas kerja dengan papan Kanban drag-and-drop. Membantu pengguna mengatur to-do list, tugas in-progress, dan tugas yang sudah selesai dengan visual rapi.",
      features: [
        "Interaksi drag and drop kartu tugas tanpa lag",
        "Penyimpanan otomatis di memori browser (offline ready)",
        "Label kategori warna, tanggal tenggat (deadline), dan prioritas",
        "Fitur pencarian dan arsip tugas yang selesai"
      ],
      demoUrl: "https://example.com/demo-kanban",
      githubUrl: "https://github.com"
    },
    "modal-project-5": {
      title: "UI/UX Aplikasi Wisata & Tiket",
      category: "UI/UX Design & Prototyping",
      gradient: "gradient-5",
      icon: "fa-solid fa-plane-departure",
      desc: "Studi kasus desain antarmuka dan pengalaman pengguna untuk aplikasi pemesanan tiket liburan dan pemandu wisata lokal. Berfokus pada kemudahan navigasi bagi pengguna baru.",
      features: [
        "Riset pengguna, pembuatan persona, dan user flow",
        "Desain sistem konsisten: palet warna, tipografi, dan icon set",
        "Prototipe interaktif dengan animasi transisi halaman di Figma",
        "Pemberian skor kegunaan (SUS Score) tinggi pada tahap uji coba"
      ],
      demoUrl: "https://figma.com",
      githubUrl: "https://figma.com"
    },
    "modal-project-6": {
      title: "Aplikasi Cuaca Cepat & Akurat",
      category: "Mobile Web App & Weather API",
      gradient: "gradient-6",
      icon: "fa-solid fa-cloud-sun-rain",
      desc: "Aplikasi cuaca web yang mengambil data cuaca langsung via OpenWeatherMap API dengan deteksi lokasi otomatis atau pencarian nama kota di seluruh dunia.",
      features: [
        "Deteksi lokasi otomatis via Geolocation API",
        "Prakiraan cuaca 7 hari ke depan dengan grafik suhu",
        "Indikator indeks UV, kecepatan angin, kelembaban, dan waktu matahari terbit",
        "Tema dinamis yang menyesuaikan cuaca (Cerah, Berawan, Hujan, Badai)"
      ],
      demoUrl: "https://example.com/demo-weather",
      githubUrl: "https://github.com"
    }
  };

  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalContent = document.getElementById("modal-content");
  const modalCloseBtn = document.getElementById("modal-close");
  const previewBtns = document.querySelectorAll(".btn-preview");

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-img-placeholder ${data.gradient}">
        <i class="${data.icon}"></i>
      </div>
      <span class="modal-category">${data.category}</span>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.desc}</p>
      
      <div class="modal-features-title">Fitur & Keunggulan Utama:</div>
      <ul class="modal-features-list">
        ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("")}
      </ul>

      <div class="modal-actions">
        <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo Langsung
        </a>
        <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <i class="fa-brands fa-github"></i> Kode GitHub
        </a>
      </div>
    `;

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden"; // Mencegah scrolling halaman latar
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  previewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const modalId = btn.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Tutup modal dengan menekan tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });

  // ==========================================
  // 8. VALIDASI FORMULIR KONTAK & TOAST NOTIFIKASI
  // ==========================================
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const btnSubmit = document.getElementById("btn-submit");
  const btnSubmitText = document.getElementById("btn-submit-text");
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");

  function showToast(message, isError = false) {
    if (!toast) return;
    toastMsg.textContent = message;
    if (isError) {
      toast.style.borderColor = "var(--danger)";
    } else {
      toast.style.borderColor = "var(--border-highlight)";
    }
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      // Validasi Nama
      if (!nameInput.value.trim()) {
        nameInput.parentElement.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        nameInput.parentElement.parentElement.classList.remove("has-error");
      }

      // Validasi Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.parentElement.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        emailInput.parentElement.parentElement.classList.remove("has-error");
      }

      // Validasi Pesan
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.parentElement.parentElement.classList.add("has-error");
        isValid = false;
      } else {
        messageInput.parentElement.parentElement.classList.remove("has-error");
      }

      if (!isValid) {
        showToast("Mohon periksa dan lengkapi formulir dengan benar.", true);
        return;
      }

      // Simulasi proses pengiriman pesan (Loading state)
      const originalText = btnSubmitText.textContent;
      btnSubmit.disabled = true;
      btnSubmitText.textContent = "Mengirim...";

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmitText.textContent = originalText;
        contactForm.reset();

        showToast("Terima kasih! Pesan Anda telah terkirim. Saya akan segera membalas.");
      }, 1200);
    });

    // Hapus pesan error saat input mulai diketik
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", () => {
          input.parentElement.parentElement.classList.remove("has-error");
        });
      }
    });
  }

  // ==========================================
  // 9. FLOATING TOMBOL KEMBALI KE ATAS
  // ==========================================
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // 10. TAHUN HAK CIPTA DINAMIS & TOMBOL CV
  // ==========================================
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const downloadCvBtn = document.getElementById("download-cv");
  if (downloadCvBtn) {
    const cvHref = downloadCvBtn.getAttribute("href");
    // Hanya tampilkan peringatan simulasi jika href kosong atau masih berupa anchor '#'
    if (!cvHref || cvHref === "#" || cvHref === "#resume") {
      downloadCvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Fitur Unduh CV: Anda dapat menaruh file 'cv-daffa.pdf' ke dalam folder proyek dan mengganti atribut href pada tombol ini.");
      });
    }
  }
});

