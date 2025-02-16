async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("users.json");
        const users = await response.json();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            message.textContent = `Login berhasil!`;
            message.className = "mt-4 text-green-600 text-center font-semibold";
            
            // Simpan user role di localStorage
            localStorage.setItem("role", user.role);
            localStorage.setItem("username", user.username);

            // Redirect ke panel sesuai role
            setTimeout(() => {
                if (user.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "user.html";
                }
            }, 1000);
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
