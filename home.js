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
  const file = uploadForm.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = new Uint8Array(event.target.result);
      const convertedContent = btoa( // convert the Uint8Array into a string for storage
        String.fromCharCode(fileContent)
      );
      localStorage.setItem("fileContent", convertedContent);
      window.location.href = "teleprompter.html"; // move to teleprompter.html
    };
    reader.readAsArrayBuffer(file);
  } else {
    console.log("no file");
  }
}
