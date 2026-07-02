import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let transporter;

function sanitizeInput(value) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

function json(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function parseBool(value) {
  return String(value).toLowerCase() === "true";
}

function getTransporter(config) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }
  return transporter;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
    const { name, email, subject, message } = body;

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanSubject = sanitizeInput(subject || "General Inquiry");
    const cleanMessage = String(message ?? "")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim();

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return json(res, 400, { error: "Missing required fields" });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return json(res, 400, { error: "Invalid email" });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpSecure = parseBool(process.env.SMTP_SECURE);
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !recipient) {
      return json(res, 500, { error: "Email service is not configured" });
    }

    const mailer = getTransporter({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      password: smtpPassword,
    });

    const emailBody = [
      "--------------------------------",
      "",
      "Name:",
      cleanName,
      "Email:",
      cleanEmail,
      "Subject:",
      cleanSubject,
      "",
      "Message:",
      cleanMessage,
      "",
      "--------------------------------",
    ].join("\n");

    await mailer.sendMail({
      from: smtpUser,
      to: recipient,
      subject: `New Website Inquiry - ${cleanSubject}`,
      text: emailBody,
      replyTo: cleanEmail,
    });

    return json(res, 200, { success: true });
  } catch {
    return json(res, 500, { error: "Internal server error" });
  }
}
