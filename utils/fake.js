import PdfPrinter from "pdfmake";
import fs from "fs";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

const docDefinition = {
  content: [
    { image: "../uploads/skct_logo_1.png", width: 50, alignment: "left" },

    {
      text: "Sri Krishna College Of Technology",
      style: "header",
      alignment: "center",
    },
    { image: "../uploads/skct_logo_2.png", width: 50, alignment: "right" },

    {
      margin: [0, 0, 0, 0],
      text: "Alumni Membership Card",
      style: "subTitle",
      alignment: "center",
    },

    { image: "../uploads/default.jpeg", width: 150 },

    {
      text: "Name: Voldermort",
      style: "body",
    },

    {
      text: "Department: Voldermort",
      style: "body",
    },

    {
      text: "Batch: Voldermort",
      style: "body",
    },
    {
      text: "Contact: Voldermort",
      style: "body",
    },

    { qr: "https://www.google.com", fit: 150 },
  ],
  pageOrientation: "landscape",

  styles: {
    header: {
      fontSize: 22,
      bold: true,
    },
    subTitle: {
      fontSize: 20,
      bold: true,
    },
    body: {
      fontSize: 18,
    },
  },
  defaultStyle: {
    font: "Helvetica",
  },
};

const pdf = new PdfPrinter(fonts);

const pdfDoc = pdf.createPdfKitDocument(docDefinition);

pdfDoc.pipe(fs.createWriteStream("document2.pdf"));

pdfDoc.end();
