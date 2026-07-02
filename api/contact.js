const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body ?? {};

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

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || "shanu1998end@gmail.com";
    const sender = process.env.CONTACT_FROM || "onboarding@resend.dev";

    if (!resendApiKey) {
      return json(res, 500, { error: "Email service is not configured" });
    }

    const emailBody = [
      "--------------------------------",
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Subject: ${cleanSubject}`,
      "",
      "Message:",
      cleanMessage,
      "--------------------------------",
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: `New Website Inquiry - ${cleanSubject}`,
        text: emailBody,
        reply_to: cleanEmail,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return json(res, 502, { error: "Email provider error", details: errorText });
    }

    return json(res, 200, { success: true });
  } catch {
    return json(res, 500, { error: "Internal server error" });
  }
}
