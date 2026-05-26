"use server";

import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  name: string,
  email: string,
  message: string
) {
  try {
    const { data, error } = await resend.emails.send({
      // Resend provides onboarding@resend.dev for testing purposes, but you can change this
      // to a verified domain email later (e.g. hello@yourdomain.com)
      from: "Portfolio Contact <onboarding@resend.dev>", 
      to: process.env.MY_EMAIL as string,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px 20px; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);">
            <div style="padding: 32px; background-color: #09090b; color: #ffffff;">
              <h2 style="margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">New Portfolio Inquiry</h2>
              <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 15px;">You have received a new message from your website.</p>
            </div>
            <div style="padding: 32px;">
              <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Sender Details</h3>
              <div style="margin-bottom: 32px; background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 16px;">
                <p style="margin: 0 0 12px; font-size: 15px; color: #27272a;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0; font-size: 15px; color: #27272a;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
              </div>
              
              <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 14px; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Message</h3>
              <div style="background-color: #fafafa; border: 1px solid #e4e4e7; padding: 20px; border-radius: 8px; font-size: 15px; color: #27272a; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="padding: 24px; background-color: #fafafa; border-top: 1px solid #e4e4e7; font-size: 13px; color: #a1a1aa; text-align: center;">
              Sent securely via your Next.js Portfolio & Resend
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to send email" };
  }
}
