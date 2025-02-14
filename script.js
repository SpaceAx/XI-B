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
            message.className = "success";
        } else {
            message.textContent = "Akun tidak tersedia!";
            message.className = "error";
        }
        message.classList.remove("hidden");
    } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
    }
}
