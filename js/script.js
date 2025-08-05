// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

//Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
// Fungsi utama untuk menangani klik pada window
window.onclick = function (event) {
  const itemDetailModal = document.querySelector("#item-detail-modal");
  const itemDetailButtons = document.querySelectorAll(".item-detail-button");

  // Event listener untuk setiap tombol detail item
  itemDetailButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation(); // Hentikan propagasi peristiwa

      const productCard = button.closest(".product-card");

      // Ambil data dari elemen product-card
      const productId = productCard.getAttribute("data-id");
      const productName =
        productCard.getAttribute("data-name") || "Nama tidak tersedia";
      const productImg = productCard.getAttribute("data-img") || "default.jpg"; // Perbaikan typo
      const productPrice =
        parseFloat(productCard.getAttribute("data-price")) || 0;
      const productDescription =
        productCard.getAttribute("data-description") ||
        "Deskripsi tidak tersedia";

      // Pastikan harga valid
      if (isNaN(productPrice)) {
        console.error("Harga produk tidak valid:", productPrice);
        return;
      }

      // Update konten modal
      itemDetailModal.querySelector("img").src = `img/products/${productImg}`;
      itemDetailModal.querySelector("h3").textContent = productName;
      itemDetailModal.querySelector(
        ".product-price"
      ).textContent = `IDR ${productPrice}`;
      itemDetailModal.querySelector("p").textContent = productDescription;

      // Tampilkan modal
      itemDetailModal.style.display = "flex";

      // Periksa apakah elemen "add to cart" ada di dalam modal
      const addToCartButton =
        itemDetailModal.querySelector(".add-to-cart-modal");
      if (addToCartButton) {
        // Event listener untuk tombol "add to cart" dalam modal
        addToCartButton.onclick = function (event) {
          event.preventDefault(); // Hentikan tindakan default dari tombol
          event.stopPropagation(); // Hentikan propagasi peristiwa

          // Panggil fungsi add dari Alpine.js store untuk menambahkan produk ke keranjang
          Alpine.store("cart").add({
            id: productId,
            name: productName,
            img: productImg,
            price: productPrice,
            description: productDescription,
          });
          itemDetailModal.style.display = "none"; // Tutup modal setelah menambahkan ke keranjang
        };
      } else {
        console.error(
          "Tidak ditemukan tombol 'add-to-cart-modal' dalam modal."
        );
      }
    });
  });

  // Tombol hapus pesanan side bar!!!!
  // function clearCart() {
  //   const cartItems = document.querySelectorAll(".cart-item");
  //   cartItems.forEach((item) => item.remove());
  //   updateTotalPrice();
  // }

  // function updateTotalPrice() {
  //   document.getElementById("total-price").innerText = "Total: Rp 0";
  // }

  // Klik tombol close modal
  document.querySelector(".modal .close-icon").onclick = (e) => {
    itemDetailModal.style.display = "none";
    e.preventDefault();
  };

  // Klik di luar modal
  if (event.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};

// Kontak
document
  .querySelector("#contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah tindakan default form

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;

    const message = `Nama: ${name}\nEmail: ${email}\nNo WhatsApp: ${phone}`;

    // Buat URL WhatsApp dengan pesan yang diisi sebelumnya
    const url = `https://wa.me/6281247768431?text=${encodeURIComponent(
      message
    )}`;

    // Buka URL WhatsApp di tab baru
    window.open(url, "_blank");
  });
