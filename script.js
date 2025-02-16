async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    // Ambil data dari JSON
    try {
        const response = await fetch("users.json");
        const users = await response.json();

        // Cek apakah username dan password cocok
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
