async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("users.json");
        const users = await response.json();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            message.textContent = `Login berhasil! Selamat datang, ${user.role}.`;
            message.className = "mt-4 text-green-600 text-center font-semibold";
        } else {
            message.textContent = "Akun tidak tersedia!";
            message.className = "mt-4 text-red-500 text-center font-semibold";
        }
        message.classList.remove("hidden");
    } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        message.textContent = "Terjadi kesalahan, coba lagi.";
        message.className = "mt-4 text-red-500 text-center font-semibold";
        message.classList.remove("hidden");
    }
}

// Fungsi untuk menampilkan dan menyembunyikan password
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
});
