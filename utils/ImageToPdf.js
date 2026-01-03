import jsPDF from "jspdf";

/**
 * Convert an array of image files to a single PDF and trigger download
 * @param {File[]} files - Array of image files
 * @param {string} outputFileName - Name of the generated PDF
 */

export function convertImagesToPdf(files, outputFileName = "output.pdf") {
  if (!files || files.length === 0) return;

  const pdf = new jsPDF();

  const promises = Array.from(files).map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  });

  Promise.all(promises).then((imagesData) => {
    imagesData.forEach((imgData, index) => {
      const image = new Image();
      image.src = imgData;
      image.onload = () => {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (image.height * pdfWidth) / image.width;

        if (index > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        // If last image, save the PDF
        if (index === imagesData.length - 1) {
          pdf.save(outputFileName);
        }
      };
    });
  });
}
