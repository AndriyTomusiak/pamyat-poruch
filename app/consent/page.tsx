import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell } from "@/components/legal-shell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Згода на обробку даних",
  description: "Чернетка згоди на обробку персональних даних сервісу Пам’ять поруч.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/consent" },
};

export default function ConsentPage() {
  return (
    <LegalShell title="Згода на обробку даних">
      <p>
        Надсилаючи заявку на сайті «{site.brand}», я погоджуюсь, що мої ім’я, телефон і деталі
        замовлення буде використано, щоб зв’язатися зі мною і домовитися про догляд за місцем
        поховання у Хмельницькому або громаді.
      </p>
      <p>
        Я розумію, що заявка надійде власнику повідомленням у Telegram, файли через форму не
        передаються, а згоду можна відкликати, звернувшись на {site.phoneDisplay}.
      </p>
      <p>
        Повний опис обробки — у{" "}
        <Link className="text-gold underline underline-offset-4" href="/privacy">
          політиці конфіденційності
        </Link>
        .
      </p>
    </LegalShell>
  );
}
