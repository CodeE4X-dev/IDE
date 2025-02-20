// particles.js

// Pengaturan partikel
const particleConfig = {
    count: 50, // Jumlah partikel
    speed: 2, // Kecepatan partikel
    size: { min: 4, max: 10 }, // Ukuran partikel
    colors: ["#cba6f7", "#89b4fa", "#f38ba8"], // Warna partikel
};

const particlesContainer = document.getElementById("particles");
const particles = [];

// Membuat elemen partikel
function createParticle() {
    const particle = document.createElement("div");
    particle.style.width = `${random(particleConfig.size.min, particleConfig.size.max)}px`;
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = randomColor(particleConfig.colors);
    particle.style.position = "absolute";
    particle.style.borderRadius = "50%";
    particle.style.top = `${random(0, particlesContainer.offsetHeight)}px`;
    particle.style.left = `${random(0, particlesContainer.offsetWidth)}px`;
    particle.style.opacity = Math.random() * 0.7 + 0.3;
    particlesContainer.appendChild(particle);
    particles.push({ element: particle, speedX: random(-1, 1), speedY: random(-1, 1) });
}

// Fungsi random untuk angka dan warna
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Menggerakkan partikel
function animateParticles() {
    particles.forEach((particle) => {
        const rect = particle.element.getBoundingClientRect();
        const parentRect = particlesContainer.getBoundingClientRect();

        // Update posisi partikel
        let newX = rect.left + particle.speedX * particleConfig.speed;
        let newY = rect.top + particle.speedY * particleConfig.speed;

        // Pantulan partikel jika menyentuh batas
        if (newX <= parentRect.left || newX + rect.width >= parentRect.right) {
            particle.speedX *= -1;
        }
        if (newY <= parentRect.top || newY + rect.height >= parentRect.bottom) {
            particle.speedY *= -1;
        }

        // Set posisi baru
        particle.element.style.transform = `translate(${newX - parentRect.left}px, ${
            newY - parentRect.top
        }px)`;
    });

    requestAnimationFrame(animateParticles);
}

// Inisialisasi partikel
function initParticles() {
    for (let i = 0; i < particleConfig.count; i++) {
        createParticle();
    }
    animateParticles();
}

// Jalankan partikel setelah DOM siap
window.addEventListener("load", initParticles);
