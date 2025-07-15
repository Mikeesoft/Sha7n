// فتح القائمة الجانبية
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

// توجيه لتتبع الطلب
document.querySelector(".track-btn").addEventListener("click", () => {
  window.location.href = "track.html";
});

// فتح النافذة المنبثقة عند الضغط على زر "اشحن الآن"
document.querySelectorAll(".charge-btn").forEach((btn, index) => {
  const gameTitles = ["ببجي", "فري فاير"];
  btn.addEventListener("click", () => {
    document.getElementById("popup-game-title").innerText = `شحن ${gameTitles[index]}`;
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup").dataset.game = gameTitles[index];
  });
});

// إغلاق النافذة
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// تنفيذ الطلب
document.getElementById("confirm-btn").addEventListener("click", () => {
  const game = document.getElementById("popup").dataset.game;
  const pack = document.getElementById("package").value;
  const playerId = document.getElementById("player-id").value.trim();
  const method = document.getElementById("payment-method").value;
  
  if (!playerId) {
    alert("من فضلك أدخل رقم الـ ID");
    return;
  }
  
  const url = `payment.html?game=${encodeURIComponent(game)}&pack=${pack}&playerId=${playerId}&method=${method}`;
  window.location.href = url;
});

// عرض الإشعارات
function renderNotifications() {
  const notifBox = document.getElementById("notificationsList");
  if (!notifBox) return;
  
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  
  if (orders.length === 0) {
    notifBox.innerHTML = "<p style='color:#888;'>لا توجد إشعارات حالياً.</p>";
    return;
  }
  
  notifBox.innerHTML = "";
  
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "🗑️ مسح الكل";
  clearBtn.className = "clear-btn";
  clearBtn.onclick = () => {
    localStorage.removeItem("orders");
    renderNotifications();
    showToast("🧹 تم مسح الإشعارات");
  };
  notifBox.appendChild(clearBtn);
  
  const latest = orders.slice(-5).reverse();
  latest.forEach(order => {
    const div = document.createElement("div");
    div.className = "notif-item";
    div.innerHTML = `
      🎮 <strong>${order.game}</strong> – ${order.pack} UC<br>
      🆔 ${order.playerId}<br>
      💳 ${order.method || "غير محددة"}<br>
      🧾 ${order.trackCode}<br>
      🔄 ${order.status}
    `;
    notifBox.appendChild(div);
  });
  
  document.getElementById("notifDot").style.display = "block";
}

// إشعار مؤقت (Toast)
function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.right = "30px";
  toast.style.background = "#28a745";
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  toast.style.zIndex = "10000";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// عرض الإشعارات عند التحميل
renderNotifications();