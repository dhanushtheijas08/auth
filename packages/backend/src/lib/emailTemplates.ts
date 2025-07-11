import { OtpType } from "../types/authTypes";

export const getEmailTemplate = (verificationType: OtpType, code: string) => {
  switch (verificationType) {
    case "EMAIL_VERIFICATION":
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Email Verification</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 560px;
        margin: 0 auto;
        padding: 20px 0 48px;
      }
      .logo {
        width: 42px;
        height: 42px;
        border-radius: 21px;
      }
      .code {
        font-family: monospace;
        font-weight: 700;
        padding: 1px 4px;
        background-color: #dfe1e4;
        letter-spacing: -0.3px;
        font-size: 21px;
        border-radius: 4px;
        color: #3c4149;
      }
      .button {
        display: inline-block;
        background-color: #5e6ad2;
        color: white;
        font-weight: 600;
        font-size: 15px;
        padding: 11px 23px;
        border-radius: 3px;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div style="display: none; max-height: 0; opacity: 0;">
      Your OTP for email verification is ${code}
    </div>
    <table class="container" cellpadding="0" cellspacing="0" role="presentation" align="center">
      <tr>
        <td>
          <img
            src="https://react-email-demo-ed2e9vja9-resend.vercel.app/static/linear-logo.png"
            alt="App Logo"
            class="logo"
          />
          <h1 style="font-size: 24px; color: #484848; font-weight: 400; padding-top: 17px;">
            Verify your email address
          </h1>
          <p style="font-size: 15px; color: #3c4149; line-height: 1.4;">
            Please use the following OTP code to verify your email. It’s valid for 15 minutes.
          </p>
          <p style="margin-top: 20px;">
            <span class="code">${code}</span>
          </p>
          <p style="font-size: 14px; color: #3c4149; margin-top: 30px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #dfe1e4;" />
          <p style="font-size: 13px; color: #b4becc;">
            &copy; ${new Date().getFullYear()} YourAppName
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
      break;
  }
};
