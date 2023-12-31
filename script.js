// Hiển thị popup khi trang web được tải
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("welcomePopup").style.display = "block";
});

// Đóng pop-up "He luu"
function closeWelcomePopup() {
    document.getElementById("welcomePopup").style.display = "none";
    // Hiển thị tiêu đề và nút "Yes", "No"
    document.getElementById("header").style.display = "block";
    document.getElementById("header2").style.display = "block";
    document.getElementById("yesButton").style.display = "block";
    document.getElementById("noButton").style.display = "block";
    var audio = new Audio("sound/first-date.mp3");
    audio.play();
}

var isInitialSwap = true;

function moveNoButton() {
    if (isInitialSwap) {
        swapButtons();
        isInitialSwap = false;
    } else {
        moveButtonRandomly();
    }
}

function swapButtons() {
    var yesButton = document.getElementById('yesButton');
    var noButton = document.getElementById('noButton');
    var yesButtonRect = yesButton.getBoundingClientRect();
    var noButtonRect = noButton.getBoundingClientRect();

    yesButton.classList.add('swap-animation');
    noButton.classList.add('swap-animation');

    yesButton.style.transform = 'translateX(' + (noButtonRect.width + 50) + 'px)';
    noButton.style.transform = 'translateX(-' + (yesButtonRect.width + 50) + 'px)';

    setTimeout(function () {
        yesButton.parentNode.insertBefore(noButton, yesButton);
        yesButton.style.transform = 'none';
        noButton.style.transform = 'none';
        yesButton.classList.remove('swap-animation');
        noButton.classList.remove('swap-animation');
    }, 500);

    var audio = new Audio("sound/duck.mp3");
    audio.play();
}

function moveButtonRandomly() {
    var noButton = document.getElementById('noButton');
    var containerWidth = document.querySelector('.button-container').offsetWidth;
    var containerHeight = document.querySelector('.button-container').offsetHeight;

    // Lưu vị trí hiện tại của nút "No"
    var currentX = noButton.offsetLeft;
    var currentY = noButton.offsetTop;

    // Tính toán vị trí mới sao cho nó không trùng với vị trí cũ
    var newX, newY;
    do {
        newX = Math.floor(Math.random() * (containerWidth/2 - noButton.offsetWidth));
        newY = Math.floor(Math.random() * (containerHeight - noButton.offsetHeight));
    } while (newX === currentX && newY === currentY);

    noButton.classList.add('move-animation');
    var m = Math.floor(Math.random() * 2);
    var n = Math.floor(Math.random() * 2);
    if (m == 0 && n == 0) {
        noButton.style.transform = 'translate(-' + newX + 'px, -' + newY + 'px)';
    } else if (m == 0 && n == 1) {
        noButton.style.transform = 'translate(-' + newX + 'px, ' + newY + 'px)';
    } else if (m == 1 && n == 0) {
        noButton.style.transform = 'translate(' + newX + 'px, -' + newY + 'px)';
    } else if (m == 1 && n == 1) {
        noButton.style.transform = 'translate(' + newX + 'px, ' + newY + 'px)';
    }

    setTimeout(function () {
        noButton.classList.remove('move-animation');
    }, 1000);

    var audio = new Audio("sound/swish.mp3");
    audio.play();
}
function showPopup() {
    document.getElementById("popup").style.display = "block";
    var audio = new Audio("sound/tink.mp3");
    audio.play();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("loveMessage").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    var answer = document.getElementById("loveMessage").value;

    // Gửi dữ liệu lên server
    fetch('https://formspree.io/f/moqgqjew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: answer }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Xóa nội dung khung nhập
    // document.getElementById("loveMessage").value = "";

    closePopup();
}