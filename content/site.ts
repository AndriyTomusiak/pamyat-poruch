/**
 * Усі факти з позначкою ЧЕРНЕТКА власник замінює перед публікацією.
 * Інших джерел контактів, цін і адрес у проєкті немає.
 */

export const packageIds = ["basic", "complex", "premium"] as const;
export const extraIds = ["waste", "fence", "gravel", "flowers", "overgrown"] as const;

export type PackageId = (typeof packageIds)[number];
export type ExtraId = (typeof extraIds)[number];
export type CareMode = "once" | "year";

export type Package = {
  id: PackageId;
  name: string;
  price: number;
  summary: string;
  includes: string[];
};

export type ExtraService = {
  id: ExtraId;
  name: string;
  price: number;
  description: string;
};

export type Cemetery = {
  id: string;
  name: string;
  note: string;
  group: "city" | "community";
  /** ЧЕРНЕТКА: посилання на карту додавати лише після підтвердження адреси. */
  mapUrl?: string;
};

export type Review = {
  id: string;
  author: string;
  text: string;
  verified: boolean;
};

export const site = {
  // ЧЕРНЕТКА: назва бренду перед запуском.
  brand: "Пам’ять поруч",
  // ЧЕРНЕТКА: замінити на бойовий абсолютний URL.
  siteUrl: "https://pamyat-poruch.example",
  city: "Хмельницький",
  areaLabel: "Хмельницький і громада",
  areaServed: "Хмельницький",
  // ЧЕРНЕТКА: телефон і месенджери. Вулицю офісу не вигадуємо.
  phone: "+380000000000",
  phoneDisplay: "+380 00 000 00 00",
  phoneHref: "tel:+380000000000",
  messengers: {
    viber: "viber://chat?number=%2B380000000000",
    whatsapp: "https://wa.me/380000000000",
    telegram: "https://t.me/+380000000000",
  },
  // ЧЕРНЕТКА: графік роботи.
  hoursLabel: "Щодня 09:00–18:00",
  openingHours: "Mo-Su 09:00-18:00",
  seo: {
    title: "Прибирання могил у Хмельницькому | Пам’ять поруч",
    description:
      "Догляд за місцем поховання у Хмельницькому: прибирання, миття пам’ятника, благоустрій, фотозвіт і річний графік. Замовлення з іншого міста.",
  },
} as const;

export const nav = [
  { href: "#packages", label: "Пакети" },
  { href: "#services", label: "Послуги" },
  { href: "#works", label: "Роботи" },
  { href: "#process", label: "Як це працює" },
  { href: "#cemeteries", label: "Кладовища" },
  { href: "#faq", label: "Питання" },
  { href: "#contacts", label: "Контакти" },
] as const;

export const hero = {
  title: "Прибирання могил і догляд за місцем поховання у Хмельницькому",
  subtitle:
    "Разовий візит або догляд за графіком, фотозвіт після роботи. Можна замовити дистанційно.",
  facts: [
    { label: "Звіт", value: "Фото до і після" },
    { label: "Територія", value: "Кладовища міста і громади" },
  ],
} as const;

// ЧЕРНЕТКА: ціни пакетів замінити перед запуском.
export const packages: Package[] = [
  {
    id: "basic",
    name: "Базове",
    price: 2400,
    summary: "Разове прибирання ділянки і миття пам’ятника.",
    includes: [
      "Прибирання листя, сухої трави і сміття",
      "Миття пам’ятника",
      "Фото до початку роботи і після неї",
    ],
  },
  {
    id: "complex",
    name: "Комплексне",
    price: 4600,
    summary: "Догляд ділянки разом із огорожею і підсипкою.",
    includes: [
      "Усе з базового пакета",
      "Миття огорожі",
      "Підсипка декоративного щебеню за потреби",
      "Акуратний доглянутий вигляд місця",
    ],
  },
  {
    id: "premium",
    name: "Преміум",
    price: 6800,
    summary: "Повний візит, сезонні квіти і короткий відеозвіт.",
    includes: [
      "Усе з комплексного пакета",
      "Сезонна висадка квітів",
      "Коротке відео разом із фото",
    ],
  },
];

export const annual = {
  title: "Річний догляд",
  text: "Річний догляд — це погоджений графік, договір, пріоритетний запис і фотозвіт після кожного візиту. Сума складається з ціни пакета і кількості візитів: один, два або три рази на рік. Окремої знижки немає.",
} as const;

// ЧЕРНЕТКА: ціни додаткових послуг замінити перед запуском.
export const extras: ExtraService[] = [
  {
    id: "waste",
    name: "Вивіз рослинного сміття",
    price: 500,
    description: "Забираємо листя, гілки і скошену траву з ділянки.",
  },
  {
    id: "fence",
    name: "Миття огорожі",
    price: 700,
    description: "Промиваємо огорожу, якщо вона є на ділянці.",
  },
  {
    id: "gravel",
    name: "Підсипка декоративного щебеню",
    price: 900,
    description: "Підсипаємо щебінь, щоб місце виглядало рівно.",
  },
  {
    id: "flowers",
    name: "Сезонна висадка квітів",
    price: 850,
    description: "Висаджуємо сезонні квіти за попередньою домовленістю.",
  },
  {
    id: "overgrown",
    name: "Прибирання сильно зарослої ділянки",
    price: 1600,
    description: "Окремий обсяг, якщо місце давно не доглядали.",
  },
];

export const seoCopy = {
  title: "Догляд за могилою у Хмельницькому",
  paragraphs: [
    "Прибирання могил у Хмельницькому потрібне, коли ділянка заростає, пам’ятник тьмяніє, а приїхати на кладовище немає змоги. Ми прибираємо місце поховання, миємо пам’ятник і залишаємо фотозвіт, щоб результат було видно навіть з іншого міста.",
    "Догляд за могилою може бути разовим або за річним графіком. Річний догляд фіксує кількість візитів і склад робіт: після кожного приїзду ви отримуєте фото. Працюємо на кладовищах Хмельницького і Хмельницької міської громади.",
  ],
} as const;

export const scenes = {
  hero: {
    src: "/gallery/hero-grave.jpg",
    alt: "Прибрана могила з чистим гранітним пам’ятником і хризантемами",
  },
  seo: {
    src: "/gallery/tidy-grave.jpg",
    alt: "Доглянута могила з підстриженою травою і квітником",
  },
  contacts: {
    src: "/gallery/flowers-after.jpg",
    alt: "Букет хризантем біля помитого гранітного пам’ятника",
  },
  band: [
    { src: "/gallery/sweep-grave.jpg", alt: "Змітання сухого листя з бетонної огорожі могили" },
    { src: "/gallery/wash-monument.jpg", alt: "Миття гранітного пам’ятника водою і губкою" },
    { src: "/gallery/gravel-grave.jpg", alt: "Могила зі щебенем, огорожею і квітами" },
    { src: "/gallery/overgrown-grave.jpg", alt: "Заросла могила до прибирання" },
  ],
} as const;

export const directions = [
  {
    title: "Прибирання",
    text: "Знімаємо листя, суху траву і сміття, щоб ділянка знову була охайною.",
    image: { src: "/gallery/sweep-grave.jpg", alt: "Змітання сухого листя з бетонної огорожі могили" },
  },
  {
    title: "Миття пам’ятника",
    text: "Обережно промиваємо камінь і табличку, без агресивних засобів.",
    image: { src: "/gallery/wash-monument.jpg", alt: "Миття гранітного пам’ятника водою і губкою" },
  },
  {
    title: "Благоустрій",
    text: "Миття огорожі, підсипка декоративного щебеню і квіти — за домовленістю.",
    image: { src: "/gallery/gravel-grave.jpg", alt: "Могила зі щебенем, огорожею і квітами" },
  },
  {
    title: "Регулярний догляд",
    text: "Кілька візитів на рік за графіком, який узгоджуємо заздалегідь.",
    image: { src: "/gallery/tidy-grave.jpg", alt: "Доглянута могила з підстриженою травою і квітником" },
  },
  {
    title: "Дистанційне замовлення",
    text: "Заявку можна залишити з іншого міста: узгодимо роботи і надішлемо звіт.",
    image: { src: "/gallery/phone-report.jpg", alt: "Телефон зі знімком прибраної могили для фотозвіту" },
  },
  {
    title: "Занедбані ділянки",
    text: "Якщо місце сильно заросло, рахуємо це окремою послугою до візиту.",
    image: { src: "/gallery/overgrown-grave.jpg", alt: "Заросла могила до прибирання" },
  },
] as const;

export const gallery = [
  {
    id: "granite",
    before: {
      src: "/gallery/granite-before.jpg",
      alt: "Запилений гранітний пам’ятник до миття",
    },
    after: {
      src: "/gallery/granite-after.jpg",
      alt: "Помитий темний гранітний пам’ятник",
    },
  },
  {
    id: "green",
    before: {
      src: "/gallery/green-before.jpg",
      alt: "Могила, заросла високою травою, до прибирання",
    },
    after: {
      src: "/gallery/green-after.jpg",
      alt: "Могила з підстриженою травою після прибирання",
    },
  },
  {
    id: "flowers",
    before: {
      src: "/gallery/flowers-before.jpg",
      alt: "Прибрана могила без квітів",
    },
    after: {
      src: "/gallery/flowers-after.jpg",
      alt: "Букет хризантем біля помитого гранітного пам’ятника",
    },
  },
] as const;

export const galleryNote =
  "Поки збираємо власні фотозвіти, тут приклади прибирання: миття пам’ятника, трава і квіти. Без імен і портретів.";

export const remoteSteps = [
  {
    title: "Заявка",
    text: "Напишіть кладовище, орієнтир ділянки і який пакет потрібен.",
    image: { src: "/gallery/overgrown-grave.jpg", alt: "Заросла могила до прибирання" },
  },
  {
    title: "Узгодження",
    text: "Підтвердимо склад робіт, вартість і зручний день візиту.",
    image: { src: "/gallery/gravel-grave.jpg", alt: "Могила зі щебенем, огорожею і квітами" },
  },
  {
    title: "Фотозвіт",
    text: "Після роботи надішлемо світлини у месенджер, яким вам зручно.",
    image: { src: "/gallery/phone-report.jpg", alt: "Телефон зі знімком прибраної могили для фотозвіту" },
  },
] as const;

export const processSteps = [
  {
    title: "Заявка",
    text: "Залишаєте контакти, місце і обраний обсяг робіт.",
  },
  {
    title: "Узгодження",
    text: "Уточнюємо деталі, дату або графік і фіксуємо вартість.",
  },
  {
    title: "Робота і фотозвіт",
    text: "Виконуємо догляд і надсилаємо фото після візиту.",
  },
] as const;

export const contractItems = [
  { title: "Пакет", text: "Базове, комплексне або преміум." },
  { title: "Послуги", text: "Додаткові роботи, якщо вони потрібні." },
  { title: "Вартість", text: "Сума до виїзду, без прихованих позицій." },
  { title: "Дата або графік", text: "Один візит або кілька дат на рік." },
  { title: "Кладовище", text: "Де саме виконується догляд." },
  { title: "Формат звіту", text: "Фото, а в преміумі ще й коротке відео." },
] as const;

const cemeteryNote = "догляд існуючих поховань";

// ЧЕРНЕТКА: назви кладовищ звірити з власником перед публікацією. Вулиці й будинки не додавати.
export const cemeteries: Cemetery[] = [
  { id: "rakove", name: "Ракове", note: cemeteryNote, group: "city" },
  { id: "ruzhychna", name: "Ружична", note: cemeteryNote, group: "city" },
  { id: "lezneve", name: "Лезневе", note: cemeteryNote, group: "city" },
  { id: "knyzhkivtsi", name: "Книжківці", note: cemeteryNote, group: "city" },
  { id: "hrechany", name: "Гречани", note: cemeteryNote, group: "city" },
  { id: "sharovechka", name: "Шаровечка", note: cemeteryNote, group: "city" },
  {
    id: "kamianetska",
    name: "Старе кладовище на вулиці Кам’янецькій",
    note: cemeteryNote,
    group: "city",
  },
  {
    id: "bandery",
    name: "Кладовища на вулиці Степана Бандери",
    note: cemeteryNote,
    group: "city",
  },
  {
    id: "rufa",
    name: "Кладовище на вулиці Юрія Руфа",
    note: cemeteryNote,
    group: "city",
  },
  { id: "military", name: "Військове кладовище", note: cemeteryNote, group: "city" },
  { id: "ivankivtsi", name: "Іванківці", note: cemeteryNote, group: "community" },
  { id: "vodychky", name: "Водички", note: cemeteryNote, group: "community" },
  { id: "oleshyn", name: "Олешин", note: cemeteryNote, group: "community" },
  { id: "cherepivka", name: "Черепівка", note: cemeteryNote, group: "community" },
  { id: "matskivtsi", name: "Мацьківці", note: cemeteryNote, group: "community" },
  { id: "malashivtsi", name: "Малашівці", note: cemeteryNote, group: "community" },
  { id: "volytsia", name: "Волиця", note: cemeteryNote, group: "community" },
  { id: "cherepova", name: "Черепова", note: cemeteryNote, group: "community" },
  { id: "kalynivka", name: "Велика Калинівка", note: cemeteryNote, group: "community" },
  { id: "klymkivtsi", name: "Климківці", note: cemeteryNote, group: "community" },
];

export const reviewsEmpty =
  "Відгуки публікуємо після виконаних замовлень, коли робота вже зроблена.";

// ЧЕРНЕТКА: не додавати вигадані відгуки. Секція показує лише verified: true.
export const reviews: Review[] = [];

export const faq = [
  {
    question: "Чи можна замовити догляд, якщо мене немає в Хмельницькому?",
    answer:
      "Так. Дистанційне замовлення починається із заявки: кладовище, орієнтир, пакет і зручний спосіб зв’язку. Після роботи надсилаємо фотозвіт.",
  },
  {
    question: "Що буде у фотозвіті?",
    answer:
      "Фото ділянки до прибирання і після нього. У преміум-пакеті до фото додається коротке відео.",
  },
  {
    question: "Чим річний догляд відрізняється від разового візиту?",
    answer:
      "Річний догляд — це погоджений графік на один, два або три візити, договір, пріоритетний запис і фотозвіт після кожного візиту. Це не знижка: сума складається з ціни пакета і кількості візитів.",
  },
  {
    question: "Чи беретеся за сильно зарослу ділянку?",
    answer:
      "Так, як окрему додаткову послугу. Якщо обсяг більший, ніж видно з опису, перед початком узгодимо вартість.",
  },
  {
    question: "Як узгоджується вартість?",
    answer:
      "У заявці вже є обраний пакет, режим і додаткові послуги. Перед виїздом підтверджуємо підсумок, дату або графік і що саме входить у роботу.",
  },
  {
    question: "На яких кладовищах працюєте?",
    answer:
      "На кладовищах Хмельницького і сільських кладовищах Хмельницької міської громади зі списку на цій сторінці. Доглядаємо наявні поховання.",
  },
] as const;

export const contactsIntro =
  "Залиште заявку — передзвонимо або напишемо у месенджер і узгодимо візит. Офіс за адресою не вказаний: працюємо на кладовищах Хмельницького і громади.";
