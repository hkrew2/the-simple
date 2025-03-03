class ShoppingCart {
  constructor() {
    this.cartItems = []; // تخزين المنتجات في السلة
    this.cartSidebar = document.getElementById("cartSidebar");
    this.cartList = document.getElementById("cartList");

    this.init();
  }

  // بدء الوظائف
  init() {
    this.setupEventListeners();
  }

  // تفعيل الأحداث
  setupEventListeners() {
    // حدث فتح السلة
    document.getElementById("openCart").addEventListener("click", () => {
      this.openCart();
    });

    // حدث إغلاق السلة
    document.getElementById("closeCart").addEventListener("click", () => {
      this.closeCart();
    });

    // حدث إضافة أو إزالة المنتجات للسلة
    const addToCartButtons = document.querySelectorAll(".addToCart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productName = button.dataset.product; // اسم المنتج
        const productImage = button.dataset.image; // صورة المنتج
        this.toggleCart({ name: productName, image: productImage }, button);
      });
    });
  }

  // فتح السلة
  openCart() {
    this.cartSidebar.classList.add("open");
  }

  // إغلاق السلة
  closeCart() {
    this.cartSidebar.classList.remove("open");
  }

  // إضافة أو إزالة منتج من السلة
  toggleCart(product, button) {
    const itemIndex = this.cartItems.findIndex(item => item.name === product.name);
    if (itemIndex > -1) {
      // إزالة المنتج من السلة
      this.cartItems.splice(itemIndex, 1);
      button.style.color = "#fff"; // إعادة اللون إلى الأسود
    } else {
      // إضافة المنتج إلى السلة
      this.cartItems.push(product);
      button.style.color = "red"; // تغيير اللون إلى الأحمر
    }
    this.renderCart();
  }

  // عرض محتويات السلة
  renderCart() {
    this.cartList.innerHTML = ""; // تفريغ القائمة أولاً
    if (this.cartItems.length > 0) {
      this.cartItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.style.display = "flex"; // ترتيب العناصر عمودياً
        listItem.style.alignItems = "center";
        listItem.style.justifyContent = "space-between";
        listItem.style.marginBottom = "10px";
        listItem.style.border = "1px solid #ddd";
        listItem.style.padding = "10px"; // تصميم مخصص للمنتج داخل السلة

        // إضافة صورة المنتج
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.style.width = "150px"; // تحديد الحجم
        img.style.height = "auto"; // الحفاظ على النسبة بين العرض والطول
        img.style.marginRight = "20px";

        // اسم المنتج
        const text = document.createElement("span");
        text.textContent = item.name;

        // زر الحذف داخل السلة
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.classList.add("deleteBtn");
        deleteButton.addEventListener("click", () => this.removeItem(item.name));

        // إضافة العناصر داخل العنصر الكامل
        listItem.appendChild(img); // إضافة الصورة
        listItem.appendChild(text); // إضافة الاسم
        listItem.appendChild(deleteButton); // إضافة زر الحذف

        // إضافة العنصر الكامل إلى القائمة
        this.cartList.appendChild(listItem);
      });
    } else {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "السلة فارغة";
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.color = "#777";
      this.cartList.appendChild(emptyMessage);
    }
  }

  // إزالة منتج معين من السلة
  removeItem(productName) {
    this.cartItems = this.cartItems.filter(item => item.name !== productName);

    // إعادة اللون الأسود عند إزالة العنصر من السلة
    const addToCartButtons = document.querySelectorAll(".addToCart");
    addToCartButtons.forEach((button) => {
      if (button.dataset.product === productName) {
        button.style.color = "black";
      }
    });

    this.renderCart();
  }
}

// إنشاء الكلاس عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  new ShoppingCart();
});
