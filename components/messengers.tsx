import { site } from "@/content/site";
import { ghostButtonClass } from "@/components/styles";

const links = [
  { href: site.messengers.viber, label: "Viber" },
  { href: site.messengers.whatsapp, label: "WhatsApp" },
  { href: site.messengers.telegram, label: "Telegram" },
] as const;

export function Messengers({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  if (compact) {
    return (
      <ul className={`flex items-center gap-4 ${className}`}>
        {links.map((item) => (
          <li key={item.label}>
            <a className="text-sm text-muted hover:text-foreground" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((item) => (
        <li key={item.label}>
          <a className={ghostButtonClass} href={item.href}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
