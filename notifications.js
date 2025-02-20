// notifications.js

// Fungsi untuk membuat dan menampilkan notifikasi
function showNotification(message, type = "info") {
    const notificationContainer = document.getElementById("notificationContainer");
    const notification = document.createElement("div");

    // Tambahkan kelas styling berdasarkan tipe notifikasi
    notification.className = `notification ${type} p-4 rounded-lg shadow-lg mb-2`;
    notification.textContent = message;

    // Tambahkan animasi masuk
    notification.style.opacity = 0;
    notification.style.transition = "opacity 0.3s ease-in-out";
    setTimeout(() => (notification.style.opacity = 1), 10);

    // Tambahkan notifikasi ke container
    notificationContainer.appendChild(notification);

    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Tambahkan container notifikasi ke DOM
function initNotifications() {
    const container = document.createElement("div");
    container.id = "notificationContainer";
    container.className = "fixed top-4 right-4 z-50 flex flex-col space-y-2";
    document.body.appendChild(container);
}

// Inisialisasi sistem notifikasi saat halaman dimuat
window.addEventListener("load", initNotifications);
