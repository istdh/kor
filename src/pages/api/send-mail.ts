import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// name: string;
// email: string;
// content: string;
// message: string;
// phone: string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "minh.lv0315@gmail.com",
    pass: "xcjjlesuuyephrqh",
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { name, email, content, message, phone, name_site } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "istdh.websites@gmail.com",
      subject: content,
      html: `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>Contact Form Submission</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
              table {
                border-collapse: collapse;
                margin: 0 auto;
                max-width: 600px;
                width: 100%;
              }
              th,
              td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #dddddd;
              }
            </style>
          </head>
          <body>
            <table>
              <thead>
                <tr>
                  <th colspan="2">${name_site}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>${email}</td>
                </tr>
                <tr>
                  <td>Content:</td>
                  <td>${content}</td>
                </tr>
                <tr>
                  <td>Message:</td>
                  <td>${message}</td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>${phone}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>

      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export default handler;
