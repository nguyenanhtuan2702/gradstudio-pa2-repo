/**
 * page2.js — Vanilla JS tối thiểu cho giao diện tương tác Màn 2.
 * Chỉ xử lý tương tác giao diện không thiết yếu (progressive enhancement).
 * Toàn bộ nội dung chính đã có sẵn trong HTML khi JS tắt.
 */

(function () {
  'use strict';

  /* ---- Trạng thái ---- */
  var proposed = false;
  var agreed   = false;
  var created  = false;

  /* ---- Helpers ---- */
  function show(id)  { var el = document.getElementById(id); if (el) el.hidden = false; }
  function hide(id)  { var el = document.getElementById(id); if (el) el.hidden = true;  }
  function announce(msg) {
    var el = document.getElementById('live-announce');
    if (el) { el.textContent = ''; setTimeout(function(){ el.textContent = msg; }, 50); }
  }

  function appendChatLine(side, text) {
    var log = document.querySelector('.admin-chat-log');
    if (!log) return;
    var row  = document.createElement('div');
    row.className = 'chat-line chat-line--' + side;
    var bubble = document.createElement('div');
    bubble.className = 'gs-bubble gs-bubble--' + side;
    bubble.textContent = text;
    row.appendChild(bubble);
    log.appendChild(row);
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---- Chọn giờ từ cột phải ---- */
  var btnChoose = document.getElementById('btn-choose-1400');
  if (btnChoose) {
    btnChoose.addEventListener('click', function () {
      if (proposed || agreed) return;
      proposed = true;
      show('msg-propose');
      show('response-box');
      show('see-booking-btn');
      document.getElementById('msg-propose').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---- Phản hồi của Linh: Chốt ---- */
  var btnAgree = document.getElementById('btn-agree');
  if (btnAgree) {
    btnAgree.addEventListener('click', function () {
      if (!proposed || agreed) return;
      agreed = true;
      show('msg-agree');
      hide('response-box');
      // Cập nhật badge hội thoại
      var statusBadge = document.getElementById('status-badge');
      if (statusBadge) {
        statusBadge.textContent = 'Đã chốt lịch';
        statusBadge.className = 'gs-badge gs-badge--success';
      }
      // Mở khoá nút Tạo booking
      var btnCreate = document.getElementById('btn-create-booking');
      if (btnCreate) {
        btnCreate.disabled = false;
        btnCreate.removeAttribute('aria-disabled');
      }
      hide('booking-warning');
      announce('Linh đã đồng ý. Có thể tạo booking.');
      // Cuộn tới form booking
      setTimeout(function () {
        var bf = document.getElementById('booking-form');
        if (bf) bf.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });
  }

  /* ---- Phản hồi của Linh: Từ chối ---- */
  var btnReject = document.getElementById('btn-reject');
  if (btnReject) {
    btnReject.addEventListener('click', function () {
      if (!proposed) return;
      hide('response-box');
      show('msg-reject');
      proposed = false;
      announce('Linh từ chối khung giờ 14:00.');
    });
  }

  /* ---- Gửi báo giá vào chat ---- */
  var btnQuote = document.getElementById('btn-quote');
  if (btnQuote) {
    btnQuote.addEventListener('click', function () {
      appendChatLine('out', 'Báo giá: Gói Tốt nghiệp Premium · 2 giờ · 30 ảnh chỉnh — 1.800.000đ');
    });
  }

  /* ---- Gửi tin nhắn admin ---- */
  var adminForm = document.getElementById('admin-chat-form');
  if (adminForm) {
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('admin-msg-input');
      if (!input) return;
      var text = input.value.trim();
      if (!text) return;
      appendChatLine('out', text);
      input.value = '';
    });
  }

  /* ---- Tạo booking ---- */
  var btnCreate = document.getElementById('btn-create-booking');
  if (btnCreate) {
    btnCreate.addEventListener('click', function () {
      if (!agreed || created) return;
      created = true;
      btnCreate.hidden = true;
      show('booking-created-badge');
      show('msg-booking-created');
      announce('Đã tạo GS-1024. Sẽ chuyển sang Lịch chụp của Linh sau 2 giây.');
      // Chuyển sang Màn 3 sau 2 giây
      setTimeout(function () {
        window.location.href = 'page3.html';
      }, 2000);
    });
  }

  /* ---- Đặt lại demo ---- */
  var btnReset = document.getElementById('btn-reset-demo');
  if (btnReset) {
    btnReset.addEventListener('click', function () {
      proposed = false;
      agreed   = false;
      created  = false;

      // Ẩn các tin nhắn thêm vào
      ['msg-propose','msg-agree','msg-reject','msg-booking-created'].forEach(hide);
      hide('response-box');
      hide('see-booking-btn');
      hide('booking-created-badge');

      // Khôi phục badge
      var statusBadge = document.getElementById('status-badge');
      if (statusBadge) {
        statusBadge.textContent = 'Đang tư vấn';
        statusBadge.className = 'gs-badge gs-badge--warning';
      }

      // Khoá lại nút Tạo booking
      var btnC = document.getElementById('btn-create-booking');
      if (btnC) {
        btnC.hidden = false;
        btnC.disabled = true;
        btnC.setAttribute('aria-disabled', 'true');
      }

      // Hiện lại cảnh báo
      show('booking-warning');

      // Xoá các tin nhắn append động
      var log = document.querySelector('.admin-chat-log');
      if (log) {
        var dynamics = log.querySelectorAll('.chat-line.dynamic');
        dynamics.forEach(function(el){ el.remove(); });
      }

      announce('Demo đã được đặt lại.');
    });
  }

  /* ---- Panel switcher (mobile/tablet) ---- */
  var tabs = document.querySelectorAll('.admin-panel-switcher [role="tab"]');
  var panels = {
    'tab-conversations': 'pane-conversations',
    'tab-chat': 'pane-chat',
    'tab-resources': 'pane-resources'
  };

  function activatePanel(tabId) {
    tabs.forEach(function (tab) {
      var active = tab.id === tabId;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    Object.keys(panels).forEach(function (tid) {
      var pane = document.getElementById(panels[tid]);
      if (!pane) return;
      if (tid === tabId) {
        pane.classList.add('admin-pane--mobile-active');
      } else {
        pane.classList.remove('admin-pane--mobile-active');
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activatePanel(tab.id);
    });
  });

  /* ---- Khởi tạo trạng thái panel ---- */
  activatePanel('tab-chat');

})();

