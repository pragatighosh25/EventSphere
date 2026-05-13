import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendRegistrationEmail =
  async (
    email: string,
    eventTitle: string
  ) => {
    try {
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Registration Confirmed for ${eventTitle}`,
        html: `
        <div style="font-family:sans-serif">
          <h1>Registration Confirmed 🎉</h1>

          <p>
            You have successfully registered for:
          </p>

          <h2>${eventTitle}</h2>

          <p>
            See you at the event 🚀
          </p>
        </div>
        `,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };