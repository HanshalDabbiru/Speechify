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

document.getElementById("presentation-upload").addEventListener("change", function () {
  const success = document.getElementById("successful-upload-p");
  const fail = document.getElementById("failed-upload-p");
  const blank = document.getElementById("blank-upload-p");
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
  const fileUploadForm = document.getElementById("file-upload");
  const speech = fileUploadForm.files[0];

  const presentationUploadForm = document.getElementById("presentation-upload");
  const presentation = presentationUploadForm.files[0];

  if (speech && !presentation) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = new Uint8Array(event.target.result);
      const convertedContent = btoa(
        Array.from(fileContent, (byte) => String.fromCharCode(byte)).join("")
      );
      localStorage.setItem("fileContent", convertedContent);
      window.location.href = "teleprompter.html"; // move to teleprompter.html
    };
    reader.readAsArrayBuffer(speech);
  } else if (speech && presentation) {
    const reader = new FileReader();
    const presentationReader = new FileReader();

    presentationReader.onload = function (event) {
      const fileContent = new Uint8Array(event.target.result);
      const convertedContent = btoa(
        Array.from(fileContent, (byte) => String.fromCharCode(byte)).join("")
      );
      localStorage.setItem("presentationContent", convertedContent);
      window.location.href = "presentation.html"; // move to presentation.html
    };

    reader.onload = function (event) {
      const fileContent = new Uint8Array(event.target.result);
      const convertedContent = btoa(
        Array.from(fileContent, (byte) => String.fromCharCode(byte)).join("")
      );
      localStorage.setItem("fileContent", convertedContent);
      presentationReader.readAsArrayBuffer(presentation);
    };

    reader.readAsArrayBuffer(speech);
  } else {
    console.log("no file");
  }
}
