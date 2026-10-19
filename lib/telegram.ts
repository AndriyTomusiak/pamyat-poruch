import { extras, packages, type ExtraId } from "@/content/site";
import { formatUah, plain } from "@/lib/format";
import type { Lead } from "@/lib/lead-schema";
import { quote } from "@/lib/pricing";

export function leadText(lead: Lead): string {
  const selected = packages.find((item) => item.id === lead.packageId);
  const chosen = lead.extras
    .filter((item) => item.qty > 0)
    .map((item) => {
      const service = extras.find((extra) => extra.id === item.id);
      const name = service?.name ?? item.id;
      return lead.mode === "year" ? `${name} × ${item.qty}` : name;
    });
  const total = quote({
    packagePrice: selected?.price ?? 0,
    mode: lead.mode,
    visits: lead.visits,
    extras: lead.extras.map((item) => ({
      price: extras.find((extra) => extra.id === (item.id as ExtraId))?.price ?? 0,
      qty: item.qty,
    })),
  });

  return [
    "Нова заявка",
    `Ім’я: ${plain(lead.name)}`,
    `Телефон: ${plain(lead.phone)}`,
    `Кладовище: ${plain(lead.cemetery)}`,
    `Ділянка або орієнтир: ${plain(lead.plot) || "не вказано"}`,
    `Пакет: ${selected?.name ?? lead.packageId}`,
    `Режим: ${lead.mode === "year" ? "Річний догляд" : "Разовий візит"}`,
    `Кількість візитів: ${lead.mode === "year" ? lead.visits : 1}`,
    `Додаткові послуги: ${chosen.length > 0 ? chosen.join(", ") : "немає"}`,
    `Бажана дата: ${plain(lead.date) || "не вказано"}`,
    `Коментар: ${plain(lead.comment) || "немає"}`,
    `Орієнтовна сума: ${formatUah(total)}`,
  ].join("\n");
}

export async function sendLead(text: string): Promise<"sent" | "skipped" | "failed"> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("lead delivery skipped");
    return "skipped";
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("lead delivery failed", response.status);
      return "failed";
    }
    return "sent";
  } catch {
    console.error("lead delivery failed");
    return "failed";
  }
}
