// ======================================
// 1. OBJECT DAN ARRAY
// ======================================

// Array berisi minimal 5 produk
const produk = [

    // Object menggunakan object literal
    {
        id: 1,
        nama: "Laptop",
        harga: 7500000,
        stok: 5
    },

    // Object menggunakan new Object()
    Object.assign(new Object(), {
        id: 2,
        nama: "Mouse",
        harga: 150000,
        stok: 10
    }),

    {
        id: 3,
        nama: "Keyboard",
        harga: 300000,
        stok: 8
    },

    {
        id: 4,
        nama: "Headset",
        harga: 250000,
        stok: 0
    },

    {
        id: 5,
        nama: "Monitor",
        harga: 1800000,
        stok: 4
    }

];

// Array keranjang terpisah
let keranjang = [];


// ======================================
// 2. DOM SELECTION
// ======================================

// Menggunakan getElementById()
const daftarProduk = document.getElementById("daftarProduk");

const daftarKeranjang = document.getElementById("daftarKeranjang");

const ringkasanKeranjang = document.getElementById("ringkasanKeranjang");

// Menggunakan querySelector()
const ringkasanPesanan = document.querySelector("#ringkasanPesanan");

// Menggunakan getElementsByClassName()
const ambilClassProduk = document.getElementsByClassName("produk-card");


// ======================================
// 3. FUNGSI FORMAT RUPIAH
// ======================================

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}


// ======================================
// 4. MENAMPILKAN DAFTAR PRODUK
// ======================================

function tampilkanProduk() {

    daftarProduk.innerHTML = "";

    // Menggunakan perulangan for...of
    for (const item of produk) {

        const card = document.createElement("div");
        card.className = "produk-card";

        const nama = document.createElement("h3");
        nama.appendChild(document.createTextNode(item.nama));

        const harga = document.createElement("p");
        harga.appendChild(
            document.createTextNode("Harga: " + formatRupiah(item.harga))
        );

        const stok = document.createElement("p");
        stok.className = "info-stok";
        stok.appendChild(
            document.createTextNode("Stok: " + item.stok)
        );

        const tombol = document.createElement("button");
        tombol.className = "btn-tambah";
        tombol.dataset.id = item.id;
        tombol.appendChild(
            document.createTextNode("Tambah ke Keranjang")
        );

        if (item.stok === 0) {

            card.classList.add("stok-habis");

            tombol.disabled = true;

            tombol.textContent = "Stok Habis";

        }

        card.appendChild(nama);
        card.appendChild(harga);
        card.appendChild(stok);
        card.appendChild(tombol);

        daftarProduk.appendChild(card);
    }

    // Menggunakan getElementsByClassName()
    const produkHabis = document.getElementsByClassName("stok-habis");

    // Mengubah properti style menggunakan CamelCase
    for (let i = 0; i < produkHabis.length; i++) {

        produkHabis[i].style.backgroundColor = "#ffe0e0";

        produkHabis[i].style.fontSize = "14px";

    }

    // Menggunakan querySelectorAll()
    const semuaTombol = document.querySelectorAll(".btn-tambah");

    semuaTombol.forEach(function(tombol) {

        tombol.addEventListener("click", function() {

            const idProduk = Number(this.dataset.id);

            tambahKeranjang(idProduk);

        });

    });

}


// ======================================
// 5. MENAMBAHKAN PRODUK KE KERANJANG
// ======================================

function tambahKeranjang(id) {

    const item = produk.find(function(p) {
        return p.id === id;
    });

    if (item.stok <= 0) {

        alert("Maaf, stok produk " + item.nama + " sudah habis!");

        return;

    }

    // Menambahkan item menggunakan push()
    keranjang.push({
        id: item.id,
        nama: item.nama,
        harga: item.harga
    });

    // Mengurangi stok setiap produk ditambahkan
    item.stok--;

    alert(item.nama + " berhasil ditambahkan ke keranjang!");

    tampilkanProduk();

    tampilkanKeranjang();

}


// ======================================
// 6. MENAMPILKAN KERANJANG
// ======================================

function tampilkanKeranjang() {

    // Menghapus tampilan keranjang sebelumnya
    while (daftarKeranjang.firstChild) {

        daftarKeranjang.removeChild(daftarKeranjang.firstChild);

    }

    let totalHarga = 0;

    let jumlahItem = 0;

    // Menggunakan perulangan for
    for (let i = 0; i < keranjang.length; i++) {

        const item = keranjang[i];

        totalHarga += item.harga;

        jumlahItem++;

        const li = document.createElement("li");

        const teks = document.createTextNode(
            item.nama + " - " + formatRupiah(item.harga)
        );

        li.appendChild(teks);

        // Tombol hapus setiap item
        const tombolHapus = document.createElement("button");

        tombolHapus.className = "btn-hapus";

        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener("click", function() {

            if (confirm("Apakah Anda yakin ingin menghapus " + item.nama + "?")) {

                // Mengembalikan stok produk
                const produkDihapus = produk.find(function(p) {
                    return p.id === item.id;
                });

                produkDihapus.stok++;

                // Menghapus item dari array
                keranjang.splice(i, 1);

                // Menghapus elemen menggunakan removeChild()
                daftarKeranjang.removeChild(li);

                tampilkanKeranjang();

                tampilkanProduk();

            }

        });

        li.appendChild(tombolHapus);

        daftarKeranjang.appendChild(li);

    }

    // Menggunakan innerHTML untuk jumlah item dan total harga
    ringkasanKeranjang.innerHTML =
        "<strong>Jumlah Item:</strong> " + jumlahItem +
        "<br><strong>Total Harga:</strong> " + formatRupiah(totalHarga);

}


// ======================================
// 7. MEMBATALKAN ITEM TERAKHIR
// ======================================

document.getElementById("batalkanTerakhir").addEventListener("click", function() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong!");

        return;

    }

    if (confirm("Batalkan item terakhir dari keranjang?")) {

        // Mengambil item terakhir menggunakan pop()
        const itemTerakhir = keranjang.pop();

        // Mengembalikan stok produk
        const produkDibatalkan = produk.find(function(p) {
            return p.id === itemTerakhir.id;
        });

        produkDibatalkan.stok++;

        alert(itemTerakhir.nama + " berhasil dibatalkan.");

        tampilkanKeranjang();

        tampilkanProduk();

    }

});


// ======================================
// 8. MENGOSONGKAN KERANJANG
// ======================================

document.getElementById("kosongkanKeranjang").addEventListener("click", function() {

    if (keranjang.length === 0) {

        alert("Keranjang sudah kosong!");

        return;

    }

    if (confirm("Apakah Anda yakin ingin mengosongkan seluruh keranjang?")) {

        // Mengembalikan stok seluruh produk
        for (const item of keranjang) {

            const produkDibatalkan = produk.find(function(p) {
                return p.id === item.id;
            });

            produkDibatalkan.stok++;

        }

        keranjang = [];

        tampilkanKeranjang();

        tampilkanProduk();

        alert("Keranjang berhasil dikosongkan!");

    }

});


// ======================================
// 9. CHECKOUT DAN RINGKASAN PESANAN
// ======================================

document.getElementById("checkout").addEventListener("click", function() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong. Silakan belanja terlebih dahulu!");

        return;

    }

    // Meminta nama pembeli menggunakan prompt()
    const namaPembeli = prompt("Masukkan nama pembeli:");

    if (namaPembeli === null || namaPembeli.trim() === "") {

        alert("Checkout dibatalkan. Nama pembeli harus diisi!");

        return;

    }

    let total = 0;

    let daftarItem = [];

    // Menghitung total harga dan mengumpulkan nama produk
    for (const item of keranjang) {

        total += item.harga;

        daftarItem.push(item.nama + " (" + formatRupiah(item.harga) + ")");

    }

    // Menggabungkan daftar item menggunakan join()
    const itemPesanan = daftarItem.join("<br>");

    // Mengamankan teks nama pembeli sebelum dimasukkan ke innerHTML
    const namaAman = namaPembeli.replace(/[&<>"']/g, function(karakter) {
        const karakterHTML = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return karakterHTML[karakter];
    });

    // Menampilkan ringkasan pesanan pada halaman
    ringkasanPesanan.innerHTML =

        "<h3>Pesanan Berhasil!</h3>" +

        "<p><strong>Nama Pembeli:</strong> " +
        namaAman + "</p>" +

        "<p><strong>Daftar Item:</strong><br>" +
        itemPesanan + "</p>" +

        "<p><strong>Total Pembayaran:</strong> " +
        formatRupiah(total) + "</p>";

    alert("Terima kasih " + namaPembeli + "! Pesanan berhasil dibuat.");

    // Keranjang dikosongkan setelah checkout berhasil
    keranjang = [];

    tampilkanKeranjang();

    tampilkanProduk();

});


// ======================================
// 10. MENJALANKAN PROGRAM
// ======================================

// Menampilkan produk dan keranjang ketika halaman dibuka
tampilkanProduk();

tampilkanKeranjang();