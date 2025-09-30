// Chờ DOM được tải hoàn toàn trước khi thực thi mã
document.addEventListener("DOMContentLoaded", () => {
  // Lấy các phần tử cần xử lý trong DOM
  const btnCopy = document.querySelector("#btnCopy");
  const btnPaste = document.querySelector("#btnPaste");
  const textInput = document.querySelector("#textInput");
  const textOutput = document.querySelector("#textOutput");
  const statusMessage = document.querySelector("#statusMessage");

  // Hàm hiển thị thông báo với hiệu ứng trượt vào
  function showNotification(message, isSuccess) {
    statusMessage.textContent = message;
    statusMessage.classList.remove("hide", "success", "error");
    statusMessage.classList.add("show", isSuccess ? "success" : "error");

    // Ẩn thông báo sau 3s
    setTimeout(() => {
      hideNotification();
    }, 3000);
  }

  // Hàm ẩn thông báo
  function hideNotification() {
    statusMessage.classList.remove("show");
    statusMessage.classList.add("hide");
  }

  // Hàm xử lý hành động sao chép nội dung
  function handleCopy() {
    const text = textInput.value;

    if (!text) {
      showNotification("Vui lòng nhập nội dung để sao chép!", false);
      return;
    }

    // Sao chép nội dung vào clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Đã sao chép thành công!", true);
      })
      .catch((error) => {
        showNotification("Lỗi khi sao chép!", false);
        console.error("Lỗi sao chép: ", error);
      });
  }

  // Hàm xử lý hành động dán nội dung
  function handlePaste() {
    navigator.clipboard
      .readText()
      .then((text) => {
        textOutput.value = text;
        showNotification("Đã dán nội dung thành công!", true);
      })
      .catch((error) => {
        showNotification("Dán nội dung thất bại!", false);
        console.error("Lối dán: ", error);
      });
  }

  btnCopy.addEventListener("click", handleCopy);
  btnPaste.addEventListener("click", handlePaste);
});
