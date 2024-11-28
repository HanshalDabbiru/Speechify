document.getElementById("file-upload").addEventListener("change", function () {
  const success = document.getElementById("successful-upload");
  const fail = document.getElementById("failed-upload");
  const blank = document.getElementById("blank-upload");
  const letsGo = document.getElementById("lets-go");
  const fileInput = this;
  const file = fileInput.files[0];

  blank.style.display = "none";
  if (file) {
    success.style.display = "block";
    fail.style.display = "none";
    letsGo.style.display = "block";
  } else {
    fail.style.display = "block";
    success.style.display = "none";
  }
});

function uploadFile() {
  const uploadForm = document.getElementById("file-upload");
  console.log(uploadForm.files);
  const speech = uploadForm.files[0];

  if (speech) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const speechContent = event.target.result;
      localStorage.setItem("speechContent", speechContent);
      window.location.href = "teleprompter.html";
    };
    reader.readAsText(speech);
    console.log("file");
  }
  console.log("no file");
}
