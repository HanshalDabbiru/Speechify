window.addEventListener("load", function () { // only start when the page has fully loaded
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.9.124/build/pdf.worker.min.mjs";

  const convertedContent = localStorage.getItem("fileContent"); // retrive the file from local storage
  const binaryString = atob(convertedContent); // converr the string to a binary string
  const fileContent = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) { // convert the binary string back
    fileContent[i] = binaryString.charCodeAt(i);
  }

  if (fileContent) {
    var content = [];
    pdfjsLib.getDocument({ data: fileContent }).promise.then(function (pdf) { // once the document is found, call function(pdf)
      pdf.getPage(1).then(function (page) { // once the first page is found, call function(page)
        page.getTextContent().then(function (text) { // once the text is found, call function(text)
          for(let j = 0; j < text.items.length; j++) {
            content.push(text.items[j].str);
          }
        });
      });
    });
    console.log(content);
  } else {
    console.log("file not found");
  }
});
