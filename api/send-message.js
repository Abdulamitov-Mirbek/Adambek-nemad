export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, phone, comment, website } = req.body || {};

  const sanitize = (value) => String(value || "").trim();
  const fullNameValue = sanitize(fullName);
  const phoneValue = sanitize(phone);
  const commentValue = sanitize(comment);
  const websiteValue = sanitize(website);

  if (websiteValue) {
    return res.status(200).json({ success: true });
  }

  if (!fullNameValue || !phoneValue) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const blockedPattern = /https?:\/\/|www\./i;
  if (blockedPattern.test(fullNameValue) || blockedPattern.test(phoneValue)) {
    return res.status(400).json({ error: "Invalid input detected" });
  }

  if (fullNameValue.length < 2 || fullNameValue.length > 1000) {
    return res.status(400).json({ error: "Invalid fullName length" });
  }

  if (commentValue && (commentValue.length < 3 || commentValue.length > 1000)) {
    return res.status(400).json({ error: "Invalid comment length" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = [
    process.env.TELEGRAM_CHAT_ID_1,
    process.env.TELEGRAM_CHAT_ID_2,
  ].filter(Boolean);

  if (!TELEGRAM_BOT_TOKEN || chatIds.length === 0) {
    return res
      .status(500)
      .json({ error: "Telegram bot configuration is missing" });
  }

  const message = `📋 Новая заявка\n\n👤 ФИО: ${fullNameValue}\n📞 Телефон: ${phoneValue}\n💬 Комментарий: ${commentValue || "—"}\n⏰ Время: ${new Date().toLocaleString()}`;

  try {
    const promises = chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }),
    );

    const responses = await Promise.allSettled(promises);

    const failed = responses.filter(
      (result) => result.status !== "fulfilled" || !result.value.ok,
    );

    if (failed.length > 0) {
      console.error("Telegram send failed", failed);
      return res
        .status(502)
        .json({ error: "Unable to deliver message to Telegram" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Telegram send error", error);
    return res
      .status(500)
      .json({ error: "Server error while sending message" });
  }
}
