document.getElementById("file-upload").addEventListener("change", function () {
  const success = document.getElementById("successful-upload");
  const fail = document.getElementById("failed-upload");
  const blank = document.getElementById("blank-upload");
  const fileInput = this;
  const file = fileInput.files[0];

  blank.style.display = "none";
  if (file) {
    success.style.display = "block";
    fail.style.display = "none";
  } else {
    fail.style.display = "block";
    success.style.display = "none";
  }
});
