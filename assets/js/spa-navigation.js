let currentPageName = "home";

// Lấy phần tử trong DOM
const navItems = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

console.log(navItems, pages);

// Hàm lấy trang từ URL Parameters
function getPageFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("page") || "home";
}

// Hàm hiển thị page
function showPage(pageName) {
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.querySelector(`#${pageName}`);
  if (selectedPage) {
    selectedPage.classList.add("active");
    currentPageName = pageName;
  }
}

// Hàm update class "active" vào nút điều hướng
function updateActiveClass(pageName) {
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  const activeNav = document.querySelector(`[data-page="${pageName}]`);
  if (activeNav) {
    activeNav.classList.add("active");
  }
}

// Hàm cập nhật URL với search parameters
function updateURL(pageName) {
  const url = new URL(window.location);
  console.log(url.toString());
  if (pageName === "home") {
    // Xóa parameter nếu là trang home
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", pageName);
  }

  // Cập nhật URL mà không reload trang
  history.pushState({ page: pageName }, null, url.toString());
}

// Hàm xử lý click nav-menu
function handleMenuClick(e) {
  e.preventDefault();
  const pageName = e.target.dataset.page;

  if (pageName === currentPageName) return;

  // Cập nhật URL với search parameter
  updateURL(pageName);

  // Hiển thị trang và cập nhật active state
  showPage(pageName);
  updateActiveClass(pageName);

  // Cập nhật history length display
  updateHistoryLength();
}

// Hàm khởi tạo khi trang được load
function initializePage() {
  // Lấy trang hiện tại từ URL parameters
  const pageName = getPageFromURL();

  // Kiểm tra trang có hợp lệ không
  const validPages = ["home", "about", "services", "contact"];
  const pageToShow = validPages.includes(pageName) ? pageName : "home";

  // Hiểm trị trang tương ứng với URL parameter
  showPage(pageToShow);
  updateActiveClass(pageToShow);

  // Nếu URL không có parameter hoặc parameter không hợp lệ, cập nhật URL
  if (pageName !== pageToShow) {
    updateURL(pageToShow);
  }
}

// Hàm cập nhật hiểm thị history length
function updateHistoryLength() {
  const historyLength = document.querySelector("#history-length");
  if (historyLength) {
    historyLength.textContent = history.length;
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  // Khởi tạo trang
  initializePage();

  // Xử lý click menu
  navItems.forEach((item) => {
    item.addEventListener("click", handleMenuClick);
  });

  window.addEventListener("popstate", (e) => {
    let pageName = "home";

    if (e.state && e.state.page) {
      pageName = e.state.page;
    } else {
      pageName = getPageFromURL();
    }

    // Kiểm tra trang có hợp lệ không
    const validPages = ["home", "about", "services", "contact"];
    const pageToShow = validPages.includes(pageName) ? pageName : "home";

    showPage(pageToShow);
    updateActiveClass(pageToShow);
    updateHistoryLength();
  });

  // Xử lý nút F5
  window.addEventListener("keydown", (e) => {
    if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
      console.log("Page refresh detected, current page: ", getPageFromURL());
    }
  });

  // Khởi tạo history
  updateHistoryLength();
});

// Xử lý khi trang được load lại (refresh/F5)
window.addEventListener("load", () => {
  const currentPageFromURL = getPageFromURL();
  if (currentPageFromURL !== currentPageName) {
    initializePage();
  }
});
