import QRCode from "qrcode";
import PDFDocument from "pdfkit";

import fs from "fs";
import path from "path";

export const generateTicket = async (
  registrationId: string,
  eventTitle: string,
  userEmail: string
) => {
  try {
    // QR DATA
    const qrData = JSON.stringify({
      registrationId,
      eventTitle,
      userEmail,
    });

    // Generate QR as Data URL
    const qrImage = await QRCode.toDataURL(
      qrData
    );

    // Create PDF
    const doc = new PDFDocument();

    const filePath = path.join(
      "tickets",
      `${registrationId}.pdf`
    );

    const stream =
      fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Ticket Content
    doc.fontSize(24).text(
      "Event Ticket 🎟️",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.fontSize(18).text(
      `Event: ${eventTitle}`
    );

    doc.text(`Email: ${userEmail}`);

    doc.moveDown();

    // Add QR Image
    doc.image(qrImage, {
      fit: [200, 200],
      align: "center",
    });

    doc.end();

    return filePath;
  } catch (error) {
    console.log(error);
  }
};