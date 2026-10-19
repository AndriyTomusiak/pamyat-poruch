import { Messengers } from "@/components/messengers";
import { OrderForm } from "@/components/order-form";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { contactsIntro, scenes, site } from "@/content/site";

export function Contacts() {
  return (
    <Section id="contacts" title="Залишити заявку" intro={contactsIntro}>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
        <div className="space-y-5 text-muted">
          <Photo
            src={scenes.contacts.src}
            alt={scenes.contacts.alt}
            className="h-48 w-full rounded-3xl object-cover"
          />
          <p>
            <span className="block text-sm">Телефон</span>
            <a className="text-lg text-foreground" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </p>
          <p>
            <span className="block text-sm">Години</span>
            <span className="text-lg text-foreground">{site.hoursLabel}</span>
          </p>
          <p>
            <span className="block text-sm">Зона роботи</span>
            <span className="text-lg text-foreground">{site.areaLabel}</span>
          </p>
          <Messengers />
        </div>
        </Reveal>
        <Reveal delay={1}>
          <OrderForm />
        </Reveal>
      </div>
    </Section>
  );
}
