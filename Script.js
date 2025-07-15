// فتح القائمة الجانبية
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("active");
});

// نقطة الإشعارات
const hasNotifications = false;
if (hasNotifications) {
  document.getElementById("notifDot").style.display = "block";
}
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

// عند الضغط على "تنفيذ الطلب"
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