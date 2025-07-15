// فتح القائمة الجانبية
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

// الانتقال إلى صفحة تتبع الطلب
document.querySelector(".track-btn").addEventListener("click", () => {
  window.location.href = "track.html";
});

// فتح النافذة عند الضغط على زر "اشحن الآن"
document.querySelectorAll(".charge-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const gameTitles = ["ببجي", "فري فاير"];
    document.getElementById("popup-game-title").innerText = `شحن ${gameTitles[index]}`;
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup").dataset.game = gameTitles[index];
  });
});

// إغلاق النافذة
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// تنفيذ الطلب والانتقال إلى صفحة الدفع
document.getElementById("confirm-btn").addEventListener("click", () => {
  const game = document.getElementById("popup").dataset.game;
  const pack = document.getElementById("package").value;
  const playerId = document.getElementById("player-id").value.trim();

  if (!playerId) {
    alert("من فضلك أدخل رقم الـ ID");
    return;
  }

  const url = `payment.html?game=${encodeURIComponent(game)}&pack=${pack}&playerId=${playerId}`;
  window.location.href = url;
});

// عرض الإشعارات (آخر الطلبات)
function renderNotifications() {
  const notifBox = document.getElementById("notificationsList");
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (!notifBox) return;

  if (orders.length === 0) {
    notifBox.innerHTML = "<p style='color:#888;'>لا توجد إشعارات حالياً.</p>";
    document.getElementById("notifDot").style.display = "none";
    return;
  }

  notifBox.innerHTML = "";
  const latest = orders.slice(-5).reverse(); // عرض آخر 5 طلبات

  latest.forEach(order => {
    const div = document.createElement("div");
    div.className = "notif-item";
    div.innerHTML = `
      🎮 <strong>${order.game}</strong> – ${order.pack} UC<br>
      🆔 ${order.playerId}<br>
      🧾 ${order.trackCode}<br>
      🔄 <strong>${order.status}</strong>
    `;
    notifBox.appendChild(div);
  });

  // تظهر النقطة الحمراء إذا كان هناك طلب غير منفذ
  const hasPending = orders.some(order => order.status !== "✅ تم التنفيذ");
  document.getElementById("notifDot").style.display = hasPending ? "block" : "none";
}

// تحديث الإشعارات عند فتح الصفحة
renderNotifications();