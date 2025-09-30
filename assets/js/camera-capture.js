const video = document.querySelector("#video"); // Thẻ hiển thị stream
const canvas = document.querySelector("#canvas"); // Thẻ để chụp ảnh
const photo = document.querySelector("#photo"); // Thẻ img hiển thị ảnh
const startCameraBtn = document.querySelector("#startCamera");
const stopCameraBtn = document.querySelector("#stopCamera");
const takePhotoBtn = document.querySelector("#takePhoto");
const downloadPhotoBtn = document.querySelector("#downloadPhoto");
const statusMessage = document.querySelector("#statusMessage");

let stream = null; // Biến lưu trữ MediaStream từ camera

// Hàm hiển thị thông báo với hiệu ứng trượt vào
function showNotification(message, isSuccess) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("hide", "success", "error");
  if (isSuccess) {
    statusMessage.classList.add("show", "success");
  } else {
    statusMessage.classList.remove("show", "error");
  }

  setTimeout(() => {
    hideNotification(); // Gọi hàm ẩn thông báo sau mỗi 3s
  }, 3000);
}

// Hầm ẩn thông báo sau 3s
function hideNotification() {
  statusMessage.classList.remove("show");
  statusMessage.classList.add("hide");
}

// Hàm bật camera
function startCamera() {
  // Kiểm tra xem trình duyệt có hỗ trợ getUserMedia không
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false }) // Yêu cầu quyền truy cập camera
      .then((mediaStream) => {
        stream = mediaStream;
        video.srcObject = stream; // Gán stream để video hiển thị
        startCameraBtn.disabled = true; // Vô hiệu hóa nút start khi đang stream
        stopCameraBtn.disabled = false; // Kích hoạt nút khi đang stream
        takePhotoBtn.disabled = false; // Kích hoạt nút khi đang stream
        showNotification("Camera đã được bật!", true); // Hiển thị thông báo thành công
      })
      .catch((error) => {
        showNotification("Lỗi khi bật camera!", false);
        console.error("Lỗi bật camera: ", error);
      });
  } else {
    showNotification("Trình duyệt đang không hỗ trợ bật camera!", false);
  }
}

// Hàm xử lý tắt camera
function stopCamera() {
  // Nếu đang stream
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    video.srcObject = null;
    stream = null;
    startCameraBtn.disabled = false;
    stopCameraBtn.disabled = true;
    takePhotoBtn.disabled = true;
    downloadPhotoBtn.disabled = true;
    showNotification("Camera đã được tắt!", true);
  } else {
    showNotification("Camera chưa bật!", false);
  }
}

// Hàm xử lý chụp ảnh
function takePhoto() {
  if (!stream) {
    showNotification("Vui lòng bật camera trước!", false);
    return;
  }

  // Đặt khích thức canvas bằng kích thước video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Vẽ frame hiện tại từ video lên canvas
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Hiển thị ảnh chụp trong thẻ img
  photo.src = canvas.toDataURL("image/png");
  photo.style.display = "block"; // Hiện thẻ img
  downloadPhotoBtn.disabled = false; // Kích hoạt nút Download
  showNotification("Chụp ảnh thành công!", true);
}

// Hàm xử lý tải ảnh
function downloadPhoto() {
  if (!photo.src) {
    showNotification("Chưa có ảnh để tải!", false);
    return;
  }

  // Tạo link tải
  const link = document.createElement("a");
  link.download = "photo.png";
  link.href = canvas.toDataURL("image/png");
  link.click(); // Tự động kích hoạt tải
  showNotification("Đã tải ảnh thành công!", true);
}

startCameraBtn.addEventListener("click", startCamera);
stopCameraBtn.addEventListener("click", stopCamera);
takePhotoBtn.addEventListener("click", takePhoto);
downloadPhotoBtn.addEventListener("click", downloadPhoto);
