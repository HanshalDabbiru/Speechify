let currentpage = 1;
let numPages = 0;
let presentationContent = null;
let content = "";
let currentIndex = 0;
let interval;
let isPaused = true;
const SEGMENT_SIZE = 10;
let scrollSpeed = parseInt(document.getElementById("speed-control").value); // Initial speed
let defaultInterval = 2000;

window.addEventListener("load", function () {
  // only start when the page has fully loaded
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.124/build/pdf.worker.min.mjs";

  presentationContent = retrieveAndConvert();
  let fileContent = retrieveAndConvertFile();
  if (presentationContent) {
    renderPage(1);
    parseContent(fileContent);
  }
  else document.getElementById("currentContent").innerText = "File not found.";
});

function retrieveAndConvert() {
  const convertedContent = localStorage.getItem("presentationContent"); // retrieve the file from local storage
  const binaryString = atob(convertedContent); // convert the string to a binary string
  const fileContent = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++)
    fileContent[i] = binaryString.charCodeAt(i); // convert the binary string back

  return fileContent;
}
function retrieveAndConvertFile() {
    const convertedContent = localStorage.getItem("fileContent"); // retrieve the file from local storage
    const binaryString = atob(convertedContent); // convert the string to a binary string
    const fileContent = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++)
      fileContent[i] = binaryString.charCodeAt(i); // convert the binary string back
  
    return fileContent;
  }

function renderPage(pageNum) {
  let canvas = document.getElementById("pdf-canvas");
  const context = canvas.getContext("2d");
  pdfjsLib
    .getDocument({ data: new Uint8Array(presentationContent) })
    .promise.then(function (pdf) {
      numPages = pdf.numPages;
      pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: 1.25 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
        document.getElementById("loading").style.display = "none";
      });
    });
}

function nextPage() {
  if (currentpage < numPages) {
    renderPage(currentpage + 1);
    currentpage += 1;
    console.log(numPages);
    console.log(currentpage);
  }
}

function prevPage() {
  if (currentpage > 1) {
    renderPage(currentpage - 1);
    currentpage -= 1;
  }
}

function parseContent(fileContent) {
  pdfjsLib.getDocument({ data: fileContent }).promise.then(function (pdf) {
    // once the document is found, call function(pdf)
    for (let i = 1; i <= pdf.numPages; i++) {
      pdf.getPage(i).then(function (page) {
        // once the first page is found, call function(page)
        page.getTextContent().then(function (text) {
          // once the text is found, call function(text)
          for (let j = 0; j < text.items.length; j++)
            content += text.items[j].str + " ";
          if (i == pdf.numPages) {
            showNextSet();
          }
        });
      });
    }
  });
}

function showNextSet() {
  var words = content.split(" ");
  var prevSet = "";
  if (currentIndex - SEGMENT_SIZE >= 0) {
    prevSet = words.slice(currentIndex - SEGMENT_SIZE, currentIndex).join(" ");
  }
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
  document.getElementById("prevContent").innerText = prevSet;
  document.getElementById("currentContent").innerText = currentSet;
  document.getElementById("nextContent").innerText = nextSet;
}

function calculateInterval(speed) {
  return 5675 - 675 * speed;
}

// Play/Pause functionality
function playPause() {
  if (isPaused) {
    isPaused = false;
    // Start or resume the interval with the current speed
    interval = setInterval(showNextSet, calculateInterval(scrollSpeed)); // Adjust interval based on speed
    document.getElementById("play-pause").innerText = "Pause";
  } else {
    isPaused = true;
    clearInterval(interval); // Stop the interval
    document.getElementById("play-pause").innerText = "Play";
  }
}

// Update speed dynamically based on slider value
document.getElementById("speed-control").addEventListener("input", function () {
  scrollSpeed = parseInt(this.value); // Update speed value

  // Update the display
  document.getElementById("speed-display").textContent = this.value;

  if (!isPaused) {
    // If the teleprompter is playing, update the interval with the new speed
    clearInterval(interval);
    interval = setInterval(showNextSet, calculateInterval(scrollSpeed)); // Adjust interval based on new speed
  }
});
