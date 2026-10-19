import type { Metadata } from "next";

import { LegalShell } from "@/components/legal-shell";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description: "Чернетка політики конфіденційності сервісу Пам’ять поруч.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Політика конфіденційності">
      <section>
        <h2 className="font-display text-3xl text-foreground">Хто обробляє дані</h2>
        <p className="mt-3">
          Заявки сервісу «{site.brand}» приймає власник послуги догляду за місцями поховання у
          зоні «{site.areaLabel}». Контактний телефон: {site.phoneDisplay}. Окремої поштової адреси
          офісу на сайті немає.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Які дані збирає форма</h2>
        <p className="mt-3">
          Ім’я, номер телефону, кладовище, ділянка або орієнтир, обраний пакет, режим догляду,
          кількість візитів, додаткові послуги, бажана дата і коментар. Форма не приймає файли.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Навіщо</h2>
        <p className="mt-3">
          Дані потрібні, щоб зв’язатися з вами, узгодити роботи і виконати замовлення. Інших цілей,
          зокрема рекламних розсилок, форма не передбачає.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Кому передаються</h2>
        <p className="mt-3">
          Текст заявки надсилається власнику в Telegram. Повідомлення містить лише поля форми.
          Сторонню аналітику сайт не підключає.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Скільки зберігаються</h2>
        <p className="mt-3">
          Заявка зберігається у переписці, доки звернення не завершене і не минув строк, потрібний
          для обліку домовленості. Після цього її можна видалити на ваш запит.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Технічне cookie</h2>
        <p className="mt-3">
          Сайт ставить одне службове cookie з часом відкриття сторінки. Воно потрібне, щоб відсікати
          миттєві автоматичні відправки, недоступне скриптам сторінки і живе не довше ніж пів години.
        </p>
      </section>
      <section>
        <h2 className="font-display text-3xl text-foreground">Ваші права</h2>
        <p className="mt-3">
          Ви можете попросити повідомити, які дані заявки збережені, виправити їх або видалити.
          Для цього зателефонуйте на {site.phoneDisplay} або напишіть у Viber, WhatsApp чи Telegram.
        </p>
      </section>
    </LegalShell>
  );
}
