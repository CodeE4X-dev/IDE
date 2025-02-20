// fileSystem.js

// Data penyimpanan sementara untuk file dan folder
let fileStructure = {
    root: {
        type: "folder",
        children: {},
    },
};

// Simpan file structure ke localStorage
function saveFileStructure() {
    localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
}

// Muat file structure dari localStorage
function loadFileStructure() {
    const savedStructure = localStorage.getItem("fileStructure");
    if (savedStructure) {
        fileStructure = JSON.parse(savedStructure);
    }
}

// Fungsi untuk menampilkan file structure di file explorer
function renderFileExplorer() {
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    renderFolder(fileStructure.root, fileList, "root");
}

// Fungsi rekursif untuk menampilkan folder dan file
function renderFolder(folder, parentElement, path) {
    Object.entries(folder.children).forEach(([name, item]) => {
        const listItem = document.createElement("li");
        listItem.classList.add("flex", "items-center", "gap-2");

        const icon = document.createElement("img");
        icon.classList.add("file-icon");

        if (item.type === "folder") {
            icon.src = "icons/folder.png"; // Ikon folder
        } else {
            icon.src = `icons/${item.extension}.png` || "icons/file.png"; // Ikon file berdasarkan ekstensi
        }

        const text = document.createElement("span");
        text.textContent = name;

        listItem.appendChild(icon);
        listItem.appendChild(text);
        parentElement.appendChild(listItem);

        // Event klik untuk membuka file/folder
        listItem.addEventListener("click", () => {
            if (item.type === "folder") {
                const newFolder = document.createElement("ul");
                newFolder.classList.add("ml-4", "space-y-1");
                renderFolder(item, newFolder, `${path}/${name}`);
                parentElement.appendChild(newFolder);
            } else {
                openFile(path, name);
            }
        });

        // Event klik kanan untuk menghapus file/folder
        listItem.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (confirm(`Are you sure you want to delete "${name}"?`)) {
                delete fileStructure.root.children[name];
                saveFileStructure();
                renderFileExplorer();
            }
        });
    });
}

// Fungsi untuk membuat file baru
function createNewFile() {
    const fileName = prompt("Enter file name (e.g., script.js):");
    if (!fileName) return;

    const extension = fileName.split(".").pop();
    fileStructure.root.children[fileName] = {
        type: "file",
        extension,
        content: "",
    };
    saveFileStructure();
    renderFileExplorer();
}

// Fungsi untuk membuka file di editor
function openFile(path, name) {
    const file = fileStructure.root.children[name];
    if (file && file.type === "file") {
        const editor = document.getElementById("editor");
        editor.value = file.content || "";
        editor.dataset.currentFile = name;

        // Tampilkan tombol run jika file HTML
        const runButton = document.getElementById("runButton");
        if (file.extension === "html") {
            runButton.classList.remove("hidden");
            runButton.onclick = () => runHtml(file.content);
        } else {
            runButton.classList.add("hidden");
        }
    }
}

// Fungsi untuk menyimpan konten file
function saveCurrentFile() {
    const editor = document.getElementById("editor");
    const fileName = editor.dataset.currentFile;
    if (fileName) {
        const file = fileStructure.root.children[fileName];
        if (file) {
            file.content = editor.value;
            saveFileStructure();
            alert("File saved successfully!");
        }
    } else {
        alert("No file is open!");
    }
}

// Fungsi untuk membuat folder baru
function createNewFolder() {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    fileStructure.root.children[folderName] = {
        type: "folder",
        children: {},
    };
    saveFileStructure();
    renderFileExplorer();
}

// Fungsi untuk menjalankan file HTML
function runHtml(content) {
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.document.close();
}

// Event listeners untuk tombol
document.getElementById("newFile").addEventListener("click", createNewFile);
document.getElementById("saveFile").addEventListener("click", saveCurrentFile);
document.getElementById("newFolder").addEventListener("click", createNewFolder);

// Inisialisasi
loadFileStructure();
renderFileExplorer();
