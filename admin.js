function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}

async function saveSchedule() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image");

    if (!title || !description) {
        alert("Judul dan deskripsi tidak boleh kosong!");
        return;
    }

    let imageBase64 = "";
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            imageBase64 = reader.result;
            addScheduleToTable(title, description, imageBase64);
            saveToJson(title, description, imageBase64);
        };
    } else {
        addScheduleToTable(title, description, imageBase64);
        saveToJson(title, description, imageBase64);
    }
}

function addScheduleToTable(title, description, imageBase64) {
    const scheduleList = document.getElementById("schedule-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class='border p-2'>${title}</td>
        <td class='border p-2'>${description}</td>
        <td class='border p-2'>${imageBase64 ? `<img src="${imageBase64}" width="50">` : "-"}</td>
        <td class='border p-2'><button onclick="deleteSchedule(this)" class="text-red-500">Hapus</button></td>
    `;
    scheduleList.appendChild(row);
}

async function saveToJson(title, description, imageBase64) {
    const response = await fetch("jadwal.json");
    const schedules = await response.json();
    schedules.push({ title, description, image: imageBase64, createdAt: new Date().toISOString() });

    const githubToken = "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"; // Ganti dengan token dari GitHub Secrets
    const repo = "SpaceAx/XI-B";
    const path = "jadwal.json";

    const updateData = {
        message: "Update jadwal.json via GitHub API",
        content: btoa(JSON.stringify(schedules, null, 2)),
        branch: "main"
    };

    const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;

    const responseGitHub = await fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Authorization": `token ${githubToken}`,
            "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify(updateData)
    });

    if (responseGitHub.ok) {
        console.log("jadwal.json berhasil diperbarui di GitHub!");
    } else {
        console.error("Gagal memperbarui jadwal.json:", await responseGitHub.json());
    }
}

function deleteSchedule(button) {
    button.parentElement.parentElement.remove();
}
