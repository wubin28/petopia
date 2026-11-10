/* Petopia HTML 原型 · 公共状态栏 + 底部 Tab
   用法：在 .phone 上加 data-tab="home|orders|pets|me" 即自动注入底栏。 */
(function () {
  "use strict";

  var statusBar = [
    '<div class="statusbar">',
    '  <span class="status-time">9:41</span>',
    '  <span class="status-icons">',
    '    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden="true">',
    '      <rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor"/>',
    '      <rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor"/>',
    '      <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor"/>',
    '      <rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor"/>',
    '    </svg>',
    '    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">',
    '      <path d="M1.2 3.6a10.5 10.5 0 0 1 13.6 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '      <path d="M3.6 6.1a7 7 0 0 1 8.8 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '      <path d="M6.1 8.5a3.4 3.4 0 0 1 3.8 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '      <circle cx="8" cy="10.1" r="1" fill="currentColor"/>',
    '    </svg>',
    '    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">',
    '      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" stroke-opacity=".4"/>',
    '      <rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor"/>',
    '      <path d="M23 4.2v3.6c.9-.3 1.4-.9 1.4-1.8s-.5-1.5-1.4-1.8Z" fill="currentColor" fill-opacity=".5"/>',
    '    </svg>',
    '  </span>',
    '</div>'
  ].join("\n");

  var icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 10.6 12 4l8 6.6V20a1 1 0 0 1-1 1h-4.8v-6.2H9.8V21H5a1 1 0 0 1-1-1v-9.4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    orders: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M9 8.5h6M9 12h6M9 15.5h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    pets: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="8" cy="8.5" r="1.7" fill="currentColor"/><circle cx="12" cy="7" r="1.7" fill="currentColor"/><circle cx="16" cy="8.5" r="1.7" fill="currentColor"/><path d="M12 11.5c-2.3 0-4.2 1.7-4.2 3.6 0 1.3 1 2.2 2.3 2.2.7 0 1.4-.3 1.9-.9.5.6 1.2.9 1.9.9 1.3 0 2.3-.9 2.3-2.2 0-1.9-1.9-3.6-4.2-3.6Z" fill="currentColor"/></svg>',
    me: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.2" r="3.3" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 20c.6-3.2 3.2-5 6.5-5s5.9 1.8 6.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  var tabs = [
    { key: "home", label: "首页", href: "c01-home.html" },
    { key: "orders", label: "订单", href: "c07-orders.html" },
    { key: "pets", label: "宠物", href: "c02-pets.html" },
    { key: "me", label: "我的", href: "c09-me.html" }
  ];

  function tabBar(active) {
    var items = tabs.map(function (tab) {
      var isActive = tab.key === active;
      return [
        '<a class="tab-item' + (isActive ? " active" : "") + '" href="' + tab.href + '"' +
          (isActive ? ' aria-current="page"' : "") + '>',
        icons[tab.key],
        '<span>' + tab.label + '</span>',
        '</a>'
      ].join("");
    }).join("");

    return '<nav class="tabbar" aria-label="底部导航">' + items + "</nav>";
  }

  function init() {
    var phones = document.querySelectorAll(".phone");
    Array.prototype.forEach.call(phones, function (phone) {
      if (!phone.querySelector(".statusbar")) {
        phone.insertAdjacentHTML("afterbegin", statusBar);
      }
      var active = phone.getAttribute("data-tab");
      if (active && !phone.querySelector(".tabbar")) {
        phone.insertAdjacentHTML("beforeend", tabBar(active));
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
