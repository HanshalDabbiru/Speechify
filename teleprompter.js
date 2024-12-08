let content = "";
let currentIndex = 0;
let interval;
let isPaused = false;
const SEGMENT_SIZE = 10;

window.addEventListener("load", function () {
  // only start when the page has fully loaded
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.124/build/pdf.worker.min.mjs";

  const fileContent = retriveAndConvert();
  if (fileContent) {
    parseContent(fileContent);
  } else {
    console.log("file not found");
  }
});

function retriveAndConvert() {
  const convertedContent = localStorage.getItem("fileContent"); // retrive the file from local storage
  const binaryString = atob(convertedContent); // convert the string to a binary string
  const fileContent = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    // convert the binary string back
    fileContent[i] = binaryString.charCodeAt(i);
  }
  return fileContent;
}

function parseContent(fileContent) {
  pdfjsLib.getDocument({ data: fileContent }).promise.then(function (pdf) {
    // once the document is found, call function(pdf)
    pdf.getPage(1).then(function (page) {
      // once the first page is found, call function(page)
      page.getTextContent().then(function (text) {
        // once the text is found, call function(text)
        for (let j = 0; j < text.items.length; j++) {
          content += text.items[j].str + " ";
        }
        document.getElementById("loading").style.display = "none";
        showNextSet();
        interval = setInterval(showNextSet, 2000);
      });
    });
  });
}

function showNextSet() {
  var words = content.split(" ");
  var currentSet = words
    .slice(currentIndex, currentIndex + SEGMENT_SIZE)
    .join(" ");
  var nextSet = words
    .slice(currentIndex + SEGMENT_SIZE, currentIndex + SEGMENT_SIZE * 2)
    .join(" ");

  currentIndex += SEGMENT_SIZE;
  if (currentIndex > words.length) {
    currentIndex = words.length;
    clearInterval(interval);
  }

  document.getElementById("currentContent").innerText = currentSet;
  document.getElementById("nextContent").innerText = nextSet;
}

function playPause() {
  if (isPaused) {
    isPaused = false;
    interval = setInterval(showNextSet, 2000);
    document.getElementById("play-pause").innerText = "Pause";
  } else {
    isPaused = true;
    clearInterval(interval);
    document.getElementById("play-pause").innerText = "Play";
  }
}
