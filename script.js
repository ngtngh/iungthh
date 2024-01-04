setTimeout(function () {
    $(".content").hide();
    enterPassword();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 700);

function enterPassword() {
    Swal.fire({
        title: "Nhập mật khẩu trái tim ❤️",
        html: "<input type='password' id='password' class='passwordInput' placeholder='Mật khẩu'>",
        background: '#fff url("img/iput-bg.jpg")',
        confirmButtonText: "Xác nhận",
        confirmButtonColor: "#3085d6",
    }).then(function () {
        var password = document.getElementById("password").value;
        if (password=="561344") {
            firstQuestion();
        } else {
            Swal.fire({
                icon: "error",
                title: "Mật khẩu chưa chính xác",
                text: "Vui lòng nhập lại",
                color: "#fff",
                background: '#fff url("img/iput-bg.jpg")',
                confirmButtonText: "Nhập lại",
                confirmButtonColor: "#3085d6",             
            }).then(function () {
                enterPassword();
            })
        }
    })
}

function firstQuestion() {
    Swal.fire({
        title: "He luu cậu!",
        text: "Không biết \"bức thư\" của tớ có làm cậu cảm động không nhỉ? Hi vọng đó sẽ là một điều ý nghĩa tuyệt vời cho sinh nhật tuổi 20 của cậu 🙆‍♂️ Và tớ có một điều này muốn hỏi nhỏ, cậu nhớ phải trả lời thật lòng nhaaa.",
        color: "#fff",
        imageUrl: "img/cuteCat.jpg",
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("img/iput-bg.jpg")',
        imageAlt: "Custom image",
        confirmButtonText: "Ogee ^^",
        confirmButtonColor: "#3085d6",
    }).then(function () {
        $(".content").show(200);
        var audio = new Audio("sound/first-date.mp3");
        audio.volume = 0.2;
        audio.play();
    });
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
    var audio = new Audio("sound/tink.mp3");
    audio.play();

    Swal.fire({
        // title: "Yêu cậu nhìu nhìu 😗",
        text: "👉👈 Tớ biết cậu cũng yêu tớ mà, vì sao thế nhỉ, hay có muốn gửi gắm gì đến tớ khum?",
        color: "#fff",
        // html: true,
        width: 900,
        // padding: "3em",
        html: "<p>👉👈 Tớ biết cậu cũng yêu tớ mà, vì sao thế nhỉ, hay có muốn gửi gắm gì đến tớ khum?</p><textarea id='loveMessage' class='messageInput' placeholder='Gửi tâm tư của cậu vào đây nhaa...' rows='4' cols='40' style='resize: none;'>",
        background: '#fff url("img/iput-bg.jpg")',
        backdrop: `
                    rgba(0,0,0,0.45)
                    url("img/giphy2.gif")
                    top right
                    no-repeat
                  `,
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#d33",
        // confirmButtonColor: "#fe8a71",
        // cancelButtonColor: "#f6cd61",
        confirmButtonText: "Gửi cho tớ 🫶",
    }).then((result) => {
        sendMessage();
        if (result.value) {
        Swal.fire({
            title: "Yêu cậu nhìu nhìu 😗",
            text: "🎉 Chúc mừng sinh nhật bạn nhỏ của tớ nha 🎂 Hôm nào tớ lại đón cậu đi chơi nhớ ^^ Còn giờ thì nhắn tin xúc động các thứ với tui đi nhee 🫶",
            color: "#fff",
            imageUrl: "img/ntn&nth1.jpg",
            imageWidth: 475,
            imageAlt: "Custom image",
            // width: 900,
            background: '#fff url("img/iput-bg.jpg")',
            confirmButtonText: "Okii lunn 💙",
            confirmButtonColor: "#fe8a71",
            // confirmButtonColor: "#83d0c9",
        }).then(function () {
            var facebookPageID = 'ngtngh.04';
            window.open('https://m.me/' + facebookPageID, '_self');
        });
        }
    });
}

// document.getElementById("loveMessage").addEventListener("keydown", function(event) {
//     if (event.key === "Enter") {
//         sendMessage();
//     }
// });

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
    document.getElementById("loveMessage").value = "";
}