// auth.js

const CLIENT_ID = "1342105322369585194"; // Ganti dengan Client ID dari Discord
const REDIRECT_URI = "https://ide-starx.vercel.app";  // Ganti dengan URL aplikasi Anda
const AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
)}&response_type=token&scope=identify`;

let currentUser = null;

// Fungsi untuk menangani login dengan Discord OAuth
function loginWithDiscord() {
    window.location.href = AUTH_URL;
}

// Fungsi untuk mendapatkan data pengguna setelah login
function getUserData(token) {
    fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            currentUser = data;
            showUser(data);
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
}

// Menampilkan informasi pengguna setelah login berhasil
function showUser(user) {
    const loginButton = document.getElementById("loginDiscord");
    loginButton.textContent = `Logged in as ${user.username}`;
    loginButton.disabled = true;
}

// Mengecek token OAuth di URL setelah redirect
function checkOAuthToken() {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.slice(1));
        const token = params.get("access_token");

        // Simpan token di localStorage untuk sesi pengguna
        localStorage.setItem("discord_token", token);

        // Hapus hash dari URL
        window.history.replaceState(null, null, window.location.pathname);

        // Dapatkan data pengguna
        getUserData(token);
    } else {
        const token = localStorage.getItem("discord_token");
        if (token) {
            getUserData(token);
        }
    }
}

// Event Listener untuk tombol login
document.getElementById("loginDiscord").addEventListener("click", loginWithDiscord);

// Mengecek token OAuth saat halaman dimuat
checkOAuthToken();
