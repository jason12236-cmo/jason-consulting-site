/* ===== 網站設定：拿到後填這裡即可 ===== */
var SITE = {
  ga4Id: "",        // GA4 評估 ID，例如 "G-XXXXXXXXXX"；留空則不載入追蹤
  bookingUrl: ""    // 預約表單網址（Google 表單或 Calendly）；留空則按鈕改為寫信
};
/* ===================================== */

(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* GA4 */
  function track(name, params) {
    if (typeof window.gtag === "function") window.gtag("event", name, params || {});
  }
  if (SITE.ga4Id) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(SITE.ga4Id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", SITE.ga4Id, { anonymize_ip: true });
  }

  /* 預約按鈕：有表單就連表單，沒有就捲到聯絡區或寫信 */
  var bookBtn = document.getElementById("bookBtn");
  if (SITE.bookingUrl) {
    bookBtn.textContent = "預約諮詢";
    bookBtn.href = SITE.bookingUrl;
    bookBtn.target = "_blank";
    bookBtn.rel = "noopener";
  }
  document.querySelectorAll("[data-booking]").forEach(function (a) {
    a.addEventListener("click", function () {
      track("click_booking", { placement: a.getAttribute("data-booking") });
    });
  });
  document.querySelectorAll("[data-social]").forEach(function (a) {
    a.addEventListener("click", function () {
      track("click_social", { network: a.getAttribute("data-social") });
    });
  });

  /* 手機選單 */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var links = document.getElementById("navlinks");
  nav.classList.add("js");
  function setMenu(open) {
    links.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
  }
  burger.addEventListener("click", function () {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* 成就數字跑數（數字預設就顯示完成值，跑數只是加分） */
  var counts = document.querySelectorAll(".count");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, to = +el.getAttribute("data-to"), t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1600, 1), v = Math.round(to * (1 - Math.pow(1 - p, 3)));
          el.textContent = v.toLocaleString("en-US");
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    /* 先歸零再等滑到時往上跑，避免一開始閃過完成值 */
    counts.forEach(function (c) { c.textContent = "0"; io.observe(c); });
  }

})();
