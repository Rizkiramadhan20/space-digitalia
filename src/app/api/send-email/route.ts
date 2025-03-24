import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

interface EmailPayload {
    to: string;
    subject: string;
    message: string;
    originalMessage: {
        fullName: string;
        email: string;
        phoneNumber: string;
        message: string;
        createdAt: string;
    };
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

export async function POST(request: NextRequest) {
    try {
        await transporter.verify();
        console.log("SMTP connection verified");

        const { to, subject, message, originalMessage }: EmailPayload = await request.json();

        const mailOptions = {
            from: `"Space Digitalia" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            text: `${message}\n\n-------------------\nDetail Pesan:\nNama: ${originalMessage.fullName}\nEmail: ${originalMessage.email}\nNo. Telepon: ${originalMessage.phoneNumber}\nPesan: ${originalMessage.message}\nDikirim pada: ${new Date(originalMessage.createdAt).toLocaleString('id-ID')}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p style="margin-bottom: 20px;">${message.replace(/\n/g, "<br>")}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <div style="color: #666;">
            <p><strong>Detail Pesan:</strong></p>
            <table style="margin-top: 10px;">
              <tr>
                <td style="padding: 5px 10px 5px 0;"><strong>Nama:</strong></td>
                <td>${originalMessage.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 5px 10px 5px 0;"><strong>Email:</strong></td>
                <td>${originalMessage.email}</td>
              </tr>
              <tr>
                <td style="padding: 5px 10px 5px 0;"><strong>No. Telepon:</strong></td>
                <td>${originalMessage.phoneNumber}</td>
              </tr>
              <tr>
                <td style="padding: 5px 10px 5px 0;"><strong>Pesan:</strong></td>
                <td>${originalMessage.message.replace(/\n/g, "<br>")}</td>
              </tr>
              <tr>
                <td style="padding: 5px 10px 5px 0;"><strong>Dikirim pada:</strong></td>
                <td>${new Date(originalMessage.createdAt).toLocaleString('id-ID')}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info.messageId);

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error: unknown) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send email",
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}