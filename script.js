var isInitialSwap = true;

function handleMouseOver() {
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

    yesButton.classList.add('swap-animation');
    noButton.classList.add('swap-animation');

    yesButton.style.transform = 'translateX(' + (yesButtonRect.width + 13) + 'px)';
    noButton.style.transform = 'translateX(-' + (yesButtonRect.width + 20) + 'px)';

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
        newY = Math.floor(Math.random() * (containerHeight/2 - noButton.offsetHeight));
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
