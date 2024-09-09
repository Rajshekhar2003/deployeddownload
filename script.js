const fileUpload = document.getElementById('file-upload');
const fileListElement = document.getElementById('file-list');
const mergeButton = document.getElementById('merge-pdf');
let selectedFiles = [];

fileUpload.addEventListener('change', (event) => {
    selectedFiles = [...event.target.files];
    displayFileList();
});
// script.js
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');

    // Try to play the audio
    const playAudio = () => {
        audio.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
    };

    // Call the playAudio function to start playing the audio
    playAudio();
});



// script.js
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');

    // Function to unmute the video
    const unmuteVideo = () => {
        video.muted = false;
    };

    // Example: Unmute the video after 3 seconds
    setTimeout(unmuteVideo, 3000); // Adjust the delay as needed
});


// Display selected files
function displayFileList() {
    fileListElement.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.onclick = () => downloadFile(file);
        fileListElement.appendChild(listItem);
    });
}

// Download individual file
function downloadFile(file) {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    link.click();
}

// Merge PDFs and download the merged file
mergeButton.addEventListener('click', async () => {
    if (selectedFiles.length === 0) {
        alert('Please select at least one PDF file.');
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();
    
    for (let file of selectedFiles) {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged.pdf';
    link.click();
});
