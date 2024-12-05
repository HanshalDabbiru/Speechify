// var { pdfjsLib } = globalThis
const fileContent = localStorage.getItem("speechContent");
console.log(fileContent);
if (fileContent) {
  // document.getElementById('speech').textContent = fileContent;
  console.log(pdfjsDist);
  // pdfjsLib.getDocument(fileContent).promise.then(function(pdf) {
  //     pdf.getPage(1).then(function(page) {
  //         page.gettextContent().then(function(text) {
  //             console.log(textContent.items);
  //         });
  //     });
  // });
}
