function updateClock() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  dateElement.textContent = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${day}`;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize clock
updateClock();

const { http } = window.__TAURI__;

function loadBingBackground() {
  return http.fetch('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      const imageUrl = `https://www.bing.com${data.images[0].url}`;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    });
}

function selectBackgroundImage() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.body.style.backgroundImage = `url('${e.target.result}')`;
      };
      reader.readAsDataURL(file);
    }
  });

  input.click();
}

// Add event listener to change background button
const changeBgBtn = document.getElementById('change-bg-btn');
changeBgBtn.addEventListener('click', selectBackgroundImage);

loadBingBackground();
