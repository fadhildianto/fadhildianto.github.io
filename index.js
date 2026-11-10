/* ===================================
   Fadhildianto Portfolio — Vue.js App
   =================================== */

const { createApp, ref, reactive, onMounted, onUnmounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // --- Navigation ---
    const navItems = [
      { id: 'work', label: 'Proyek' },
      { id: 'about', label: 'Tentang' },
      { id: 'skills', label: 'Keahlian' },
      { id: 'experience', label: 'Pengalaman' },
      { id: 'education', label: 'Pendidikan' },
      { id: 'certificates', label: 'Sertifikat' },
      { id: 'contact', label: 'Kontak' },
    ];

    const profileLinks = {
      github: 'https://github.com/fadhildianto',
      linkedin: 'https://www.linkedin.com/in/fadhil-dianto-8b2b3b277',
      instagram: 'https://www.instagram.com/fadhildianto/',
    };

    const activeSection = ref('top');
    const mobileMenuOpen = ref(false);
    const navScrolled = ref(false);

    // --- Scroll State ---
    const scrollProgress = ref(0);
    const showBackToTop = ref(false);

    // --- Cursor Glow ---
    const cursorX = ref(-500);
    const cursorY = ref(-500);

    // --- Typing Effect ---
    const typedText = ref('');
    const showCursor = ref(true);
    const fullName = 'Fadhildianto.';
    let typeTimeout = null;

    function typeWriter(index) {
      if (index <= fullName.length) {
        typedText.value = fullName.substring(0, index);
        typeTimeout = setTimeout(() => typeWriter(index + 1), 110);
      }
    }

    // --- Classified Tech & Skills ---
    const skillIntro = 'Sebagai lulusan Sistem Informasi, fokus saya ada pada analisis sistem, pengelolaan informasi, dan implementasi solusi digital. Keahlian utama saya meliputi:';

    const classifiedSkills = [
      {
        category: 'Analisis Sistem',
        items: 'Analisis kebutuhan, alur kerja, dan perancangan proses sistem.',
      },
      {
        category: 'Pengelolaan Informasi',
        items: 'Strukturisasi data, pengelolaan basis data, dan dokumentasi informasi.',
      },
      {
        category: 'Implementasi Sistem',
        items: 'Implementasi sistem informasi berbasis web sesuai kebutuhan pengguna.',
      },
      {
        category: 'Visualisasi & Antarmuka',
        items: 'Penyajian informasi melalui antarmuka dan visualisasi geografis.',
      },
      {
        category: 'Pengujian',
        items: 'Pengujian fungsional dan evaluasi usability.',
      },
    ];

    const techStack = [
      'Laravel', 'PHP', 'MySQL', 'Leaflet.js', 'HTML', 'CSS',
      'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Git', 'GitHub', 'Microsoft Office',
    ];

    // --- Experience Data ---
    const experiences = [
      {
        period: 'Agustus 2025 — September 2025',
        title: 'Magang / Internship',
        company: 'Balai Bahasa Provinsi Riau',
        location: 'Pekanbaru, Riau',
        items: [
          { label: 'Analisis proses', desc: 'memahami alur kerja Tim Pembinaan sebagai dasar pengembangan sistem.' },
          { label: 'Implementasi sistem', desc: 'mengembangkan modul Usulan, Agenda, Kegiatan, Peserta, Arsip, Evaluasi, dan Peta.' },
          { label: 'Pengelolaan informasi', desc: 'menstrukturkan data kegiatan dan lokasi untuk mendukung penyajikan digital.' },
          { label: 'Visualisasi', desc: 'menerapkan peta interaktif menggunakan Leaflet.js untuk menampilkan sebaran kegiatan.' },
          { label: 'Dokumentasi', desc: 'mendokumentasikan proses kerja dan mendukung kebutuhan operasional unit kerja.' },
        ],
      },
      {
        period: 'September 2021 — Desember 2021',
        title: 'Magang',
        company: 'Alpha-M Komputer',
        location: 'Rengat, Riau',
        items: [
          { label: 'Instalasi jaringan', desc: 'melakukan konfigurasi dan instalasi jaringan komputer untuk mendukung kebutuhan operasional.' },
          { label: 'Infrastruktur SKD CPNS', desc: 'menyiapkan dan mengelola infrastruktur jaringan serta komputer untuk pelaksanaan ujian SKD CPNS Kabupaten Indragiri Hulu 2021.' },
          { label: 'Maintenance', desc: 'melakukan maintenance dan troubleshooting perangkat komputer secara berkala.' },
        ],
        proofs: [
          {
            src: './assets/images/internships/alpha-m-komputer/skd-cpns-setup-01.jpg',
            alt: 'Perangkat komputer untuk pelaksanaan SKD CPNS Kabupaten Indragiri Hulu 2021',
            caption: 'Penyiapan perangkat untuk pelaksanaan SKD CPNS 2021.',
          },
          {
            src: './assets/images/internships/alpha-m-komputer/skd-cpns-network-02.jpg',
            alt: 'Penataan kabel jaringan saat magang di Alpha-M Komputer',
            caption: 'Penataan kabel jaringan untuk mendukung kebutuhan operasional.',
          },
          {
            src: './assets/images/internships/alpha-m-komputer/skd-cpns-setup-03.jpg',
            alt: 'Ruang perangkat SKD CPNS Kabupaten Indragiri Hulu 2021',
            caption: 'Dokumentasi infrastruktur komputer SKD CPNS 2021.',
          },
        ],
      },
    ];

    const selectedExperienceProof = ref(null);

    function openExperienceProof(proof) {
      selectedExperienceProof.value = proof;
    }

    function closeExperienceProof() {
      selectedExperienceProof.value = null;
    }

    // --- Education Data ---
    const educationList = [
      {
        period: '2022 — 2026',
        title: 'S1 Sistem Informasi',
        school: 'Universitas Sains dan Teknologi Indonesia · Pekanbaru, Riau',
        degree: 'Sarjana',
      },
      {
        period: '2019 — 2022',
        title: 'SMK — Teknik Komputer dan Jaringan',
        school: 'SMKN 1 Rengat · Indragiri Hulu, Riau',
        degree: 'Sekolah Menengah Kejuruan',
      },
    ];

    // --- Certificates Data ---
    const certificates = [
      {
        id: 'bnsp-tkj-2022',
        title: 'Sertifikat Kompetensi Keahlian Teknik Komputer dan Jaringan',
        issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
        issuedAt: 'Agustus 2022',
        skills: ['Teknik Komputer', 'Jaringan'],
        thumbnail: './assets/images/certificates/sertifikat-kompetensi-tkj-bnsp.jpeg',
        alt: 'Sertifikat Kompetensi Keahlian Teknik Komputer dan Jaringan dari BNSP atas nama Fadhildianto',
      },
    ];

    const selectedCertificate = ref(null);

    function openCertificate(certificate) {
      selectedCertificate.value = certificate;
    }

    function closeCertificate() {
      selectedCertificate.value = null;
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        if (selectedCertificate.value) closeCertificate();
        if (selectedProject.value) closeProject();
        if (selectedExperienceProof.value) closeExperienceProof();
      }
    }

    // --- Projects Data ---
    const projects = [
      {
        label: 'PROYEK UTAMA · BALAI BAHASA PROVINSI RIAU',
        title: 'Sistem Informasi Terpadu pada Tim Pembinaan Balai Bahasa Provinsi Riau',
        desc: 'Sistem informasi berbasis web untuk mengelola rangkaian proses kegiatan Tim Pembinaan dan Bahasa Hukum BalaI Bahasa Provinsi Riau, mulai dari usulan hingga evaluasi. Setiap tahapan terhubung dalam satu platform, termasuk pengelolaan kegiatan, dokumentasi, dan visualisasi lokasi.',
        summary: 'Platform terintegrasi untuk mengelola rangkaian kegiatan Tim Pembinaan.',
        contribution: 'Mengembangkan modul dan alur sistem untuk kebutuhan Tim Pembinaan.',
        projectDetail: 'Saya mengembangkan sistem informasi untuk Tim Pembinaan Balai Bahasa Provinsi Riau agar rangkaian kegiatan dapat dikelola dalam satu platform. Website ini digunakan untuk mencatat usulan, agenda, kegiatan, peserta, arsip, dan evaluasi, sekaligus menampilkan lokasi kegiatan melalui peta. Hasilnya, informasi kegiatan dan dokumentasi dapat dikelola secara lebih terpusat.',
        outcome: 'Alur informasi kegiatan dapat dikelola secara lebih terpusat, termasuk dokumentasi dan visualisasi lokasi.',
        evidenceNote: 'Proyek institusi — demo publik tidak tersedia.',
        image: './assets/images/Admin.png',
        imageAlt: 'Pratinjau Sistem Informasi Terpadu Balai Bahasa',
        urlDomain: 'balai-bahasa-riau.go.id / dashboard',
        details: [
          { label: 'Fokus', value: 'Analisis proses kerja dan implementasi sistem' },
          { label: 'Modul', value: 'Usulan · Agenda · Kegiatan · Peserta · Arsip · Evaluasi · Peta' },
          { label: 'Teknologi', value: 'Laravel · MySQL · Leaflet.js' },
        ],
        linkText: null,
        linkUrl: null,
        status: 'Proyek institusi',
      },
      {
        label: 'MODUL UTAMA · PETA PEMBINAAN BAHASA',
        title: 'Peta Pembinaan Bahasa',
        desc: 'Peta interaktif untuk memvisualisasikan sebaran kegiatan penyuluhan bahasa dan pembinaan lembaga di wilayah Provinsi Riau. Peta menampilkan lokasi kegiatan berdasarkan kabupaten/kota serta memberikan informasi terkait kegiatan pada setiap lokasi.',
        summary: 'Peta publik untuk melihat sebaran kegiatan pembinaan bahasa di Riau.',
        contribution: 'Merancang dan mengembangkan peta interaktif untuk penyajian lokasi kegiatan.',
        projectDetail: 'Saya merancang dan mengembangkan peta interaktif untuk menampilkan sebaran kegiatan penyuluhan bahasa dan pembinaan lembaga di Provinsi Riau. Website ini digunakan untuk melihat lokasi berdasarkan kabupaten atau kota serta informasi kegiatan pada setiap titik peta. Hasilnya, sebaran kegiatan dapat ditelusuri publik melalui tampilan peta yang lebih mudah dipahami.',
        outcome: 'Sebaran kegiatan dapat ditelusuri melalui peta interaktif yang tersedia untuk publik.',
        evidenceNote: null,
        image: './assets/images/Peta.png',
        imageAlt: 'Pratinjau Peta Pembinaan Bahasa',
        urlDomain: 'petari.kemendikdasmen.go.id',
        details: [
          { label: 'Kontribusi', value: 'Implementasi peta dan penyajikan informasi lokasi' },
          { label: 'Teknologi', value: 'Leaflet.js' },
          { label: 'Keahlian', value: 'Strukturisasi data dan visualisasi informasi' },
        ],
        linkText: 'Kunjungi proyek',
        linkUrl: 'https://petari.kemendikdasmen.go.id/',
        status: null,
      },
      {
        label: 'PROYEK · WEBSITE INFORMASI',
        title: 'Website Profil & Katalog Putra Printing',
        desc: 'Website informasi untuk memperkenalkan Putra Printing melalui profil usaha, layanan, dan katalog produk secara digital. Website disusun untuk memudahkan pengunjung memperoleh informasi mengenai produk dan layanan yang tersedia.',
        summary: 'Website profil usaha dan katalog produk Putra Printing.',
        contribution: 'Merancang halaman, menyesuaikan tampilan, dan mengorganisasi informasi katalog.',
        projectDetail: 'Saya merancang halaman, menyesuaikan tampilan, dan mengorganisasi informasi katalog untuk Putra Printing. Website ini digunakan untuk memperkenalkan profil usaha, layanan, serta produk kepada calon pelanggan. Hasilnya, informasi usaha dan katalog tersedia dalam satu website publik yang mudah dinavigasi.',
        outcome: 'Profil, layanan, dan katalog dapat diakses dalam website publik.',
        evidenceNote: null,
        image: './assets/images/PutraPrinting1.png',
        images: [
          './assets/images/PutraPrinting1.png',
          './assets/images/PutraPrinting2.png',
        ],
        imageAlt: 'Pratinjau Website Profil Putra Printing',
        urlDomain: 'fadhildianto.github.io/PutraPrinting.github.io/',
        details: [
          { label: 'Kontribusi', value: 'Penyesuaian tampilan, penyusunan halaman, dan pengorganisasian informasi' },
          { label: 'Teknologi', value: 'HTML · CSS · Bootstrap · JavaScript' },
          { label: 'Keahlian', value: 'Perancangan antarmuka · Strukturisasi informasi · Implementasi website' },
        ],
        linkText: 'Kunjungi proyek',
        linkUrl: 'https://fadhildianto.github.io/PutraPrinting.github.io/',
        status: null,
      },
      {
        label: 'PROYEK · INTERAKSI MANUSIA & KOMPUTER',
        title: 'Website YLO Festival 2024',
        desc: 'Website informasi festival yang menyajikan informasi acara, talent, dan alur pengguna menuju proses pembelian tiket. Proyek ini berfokus pada penyusunan tampilan dan navigasi agar informasi acara dapat disampaikan dengan jelas kepada pengguna.',
        summary: 'Website informasi festival dengan navigasi menuju proses pembelian tiket.',
        contribution: 'Merancang halaman informasi dan alur navigasi menuju pembelian tiket.',
        projectDetail: 'Saya merancang halaman informasi dan alur navigasi untuk YLO Festival 2024. Website ini digunakan untuk menyampaikan informasi acara dan talent kepada calon pengunjung, serta mengarahkan mereka ke proses pembelian tiket. Hasilnya, informasi utama acara dapat ditemukan melalui struktur halaman dan navigasi yang jelas.',
        outcome: 'Informasi acara, talent, dan alur tiket tersaji dalam struktur halaman yang jelas.',
        evidenceNote: 'Proyek akademik — demo publik tidak tersedia.',
        image: './assets/images/YLO.png',
        imageAlt: 'Pratinjau Website YLO Festival 2024',
        urlDomain: 'ylofestival2024.com',
        details: [
          { label: 'Kontribusi', value: 'Penyusunan halaman, struktur navigasi, dan implementasi antarmuka' },
          { label: 'Teknologi', value: 'HTML · CSS · Bootstrap · JavaScript' },
          { label: 'Keahlian', value: 'Perancangan antarmuka · User flow · Struktur navigasi · Penyajian informasi' },
        ],
        linkText: null,
        linkUrl: null,
        status: null,
      },
    ];

    // --- Image Carousel State ---
    const activeImageIndices = reactive({});

    const selectedProject = ref(null);

    function openProject(project) {
      selectedProject.value = project;
    }

    function closeProject() {
      selectedProject.value = null;
    }

    function getImageIndex(title) {
      return activeImageIndices[title] || 0;
    }

    function setImageIndex(title, idx) {
      activeImageIndices[title] = idx;
    }

    let carouselInterval = null;

    function startImageCarousels() {
      carouselInterval = setInterval(() => {
        projects.forEach((p) => {
          if (p.images && p.images.length > 1) {
            const current = activeImageIndices[p.title] || 0;
            activeImageIndices[p.title] = (current + 1) % p.images.length;
          }
        });
      }, 3500);
    }

    // --- Methods ---
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      showBackToTop.value = scrollTop > 500;
      navScrolled.value = scrollTop > 60;
    }

    function updateCursor(e) {
      cursorX.value = e.clientX;
      cursorY.value = e.clientY;
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleTilt(e) {
      if (window.innerWidth < 1024) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 30;
      const rotateY = (x - centerX) / 30;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetTilt(e) {
      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    // --- Intersection Observer for Active Section ---
    let sectionObserver = null;

    function setupSectionObserver() {
      const sectionIds = ['top', 'work', 'about', 'skills', 'experience', 'education', 'certificates', 'contact'];
      const options = {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      };

      sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        });
      }, options);

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }

    // --- Lifecycle ---
    onMounted(() => {
      // Start typing after a short delay
      setTimeout(() => typeWriter(0), 800);

      // Start auto image carousel
      startImageCarousels();

      // Scroll listener
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('keydown', handleKeydown);
      onScroll();

      // Section observer
      nextTick(() => {
        setupSectionObserver();
      });

      // Year
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', handleKeydown);
      if (sectionObserver) sectionObserver.disconnect();
      if (typeTimeout) clearTimeout(typeTimeout);
      if (carouselInterval) clearInterval(carouselInterval);
    });

    return {
      // Navigation
      navItems,
      profileLinks,
      activeSection,
      mobileMenuOpen,
      navScrolled,
      // Scroll
      scrollProgress,
      showBackToTop,
      // Cursor
      cursorX,
      cursorY,
      updateCursor,
      // Typing
      typedText,
      showCursor,
      // Data
      skillIntro,
      classifiedSkills,
      techStack,
      experiences,
      selectedExperienceProof,
      openExperienceProof,
      closeExperienceProof,
      educationList,
      certificates,
      projects,
      selectedCertificate,
      openCertificate,
      closeCertificate,
      selectedProject,
      openProject,
      closeProject,
      // Carousel
      getImageIndex,
      setImageIndex,
      // Methods
      scrollToTop,
      handleTilt,
      resetTilt,
    };
  },
});

// --- Custom Directive: v-reveal ---
app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal-base');
    const delay = binding.value?.delay || 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
  },
});

app.mount('#app');
