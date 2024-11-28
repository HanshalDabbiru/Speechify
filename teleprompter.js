const fileContent = localStorage.getItem('speechContent');
if (fileContent) {
    document.getElementById('speech').textContent = fileContent;
}