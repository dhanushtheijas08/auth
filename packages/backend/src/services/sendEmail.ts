import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to?: string;
  subject: string;
  html: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
      user: "resend",
      pass: process.env.EMAIL_API_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: "onboarding@resend.dev",
    to: to || "delivered@resend.dev",
    subject,
    html,
  });

  return info;
};
