// Copy for the inner pages. Every line here is built from the facts in site.ts
// (Jack's intake, 2026-11-19). Nothing new is claimed: no timings, prices, ratings or
// regulatory status. Items marked TODO(client) need confirming before go-live.

export const pages = {
  nav: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/services", label: "Services" },
    { href: "/who-we-help", label: "Who we help" },
    { href: "/faqs", label: "FAQs" },
    { href: "/guides", label: "Guides" },
  ],
  footer: [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/services", label: "Services" },
    { href: "/who-we-help", label: "Who we help" },
    { href: "/at-the-scene", label: "At the scene" },
    { href: "/faqs", label: "FAQs" },
    { href: "/guides", label: "Guides" },
  ],
} as const;

/* ---------------- Services ---------------- */

export type ServiceDetail = {
  slug: string;
  label: string;
  title: string;
  intro: string;
  points: string[];
  photo: PhotoKey;
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "recovery",
    label: "Vehicle and motorbike recovery",
    title: "From the roadside to somewhere safe.",
    intro:
      "If your car or motorbike can't be driven after the accident, we arrange for it to be recovered from the roadside and taken somewhere safe.",
    points: [
      "Recovery for cars and for motorbikes",
      "Your vehicle taken from the roadside to safety",
      "Arranged from the same phone call as everything else",
    ],
    photo: "recovery",
  },
  {
    slug: "replacement",
    label: "Replacement vehicles",
    title: "A car or bike to keep you moving.",
    intro:
      "Being without your vehicle shouldn't stop your life. While yours is off the road, we arrange a replacement car, or a replacement motorbike if you ride.",
    points: [
      "A replacement car while yours is off the road",
      "A replacement motorbike, so you're still riding while yours is repaired",
      "Built around getting taxi, PCO and delivery drivers back to work",
    ],
    photo: "replacement",
  },
  {
    slug: "repairs",
    label: "Repairs",
    title: "Repairs arranged and managed for you.",
    intro:
      "We arrange the repairs and manage them from start to finish, so you're not left chasing garages or insurers for updates.",
    points: [
      "Repairs arranged for you",
      "Managed start to finish",
      "No chasing garages or insurers",
    ],
    photo: "repairs",
  },
  {
    slug: "injury-claims",
    label: "Injury claims",
    // TODO(client): confirm how injury claims are handled (in-house or via regulated partner solicitors) and FCA status.
    title: "Hurt in the accident? You may be able to claim.",
    intro:
      "If you've been hurt as a driver, rider or passenger, we help you start an injury claim on a no win, no fee basis, and support it until it's settled.",
    points: [
      "No win, no fee: if the claim isn't successful, you don't pay a fee",
      "Any fee on a successful claim is explained before you go ahead",
      "For drivers, riders and passengers",
    ],
    photo: "consult",
  },
  {
    slug: "full-support",
    label: "Full support",
    title: "One number, from first call to settled claim.",
    intro:
      "You don't have to manage the insurers, the garage and the paperwork yourself. One call starts all of it, and we stay with you until your claim is settled.",
    points: [
      "One number to call, start to finish",
      "We deal with the at-fault driver's insurer",
      "Straight answers whenever you call",
    ],
    photo: "phone",
  },
];

/* ---------------- Who we help ---------------- */

export type AudienceDetail = {
  key: "drivers" | "motorcyclists" | "taxi" | "delivery" | "passengers";
  title: string;
  headline: string;
  intro: string;
  helps: string[];
  photo: PhotoKey;
};

export const audienceDetails: AudienceDetail[] = [
  {
    key: "drivers",
    title: "Drivers",
    headline: "Car off the road? We'll handle what comes next.",
    intro:
      "Hit from behind, hit while parked, or hit by someone pulling out: if another road user caused it, we arrange the recovery, the repairs and a replacement car while yours is fixed.",
    helps: ["Vehicle recovery", "A replacement car", "Repairs, managed for you", "Injury claims if you were hurt"],
    photo: "driver",
  },
  {
    key: "motorcyclists",
    title: "Motorcyclists",
    headline: "Knocked off your bike? Keep riding while it's fixed.",
    intro:
      "We cover motorbikes as well as cars. That means motorbike recovery from the roadside, a replacement bike while yours is repaired, and support with any injury claim.",
    helps: ["Motorbike recovery", "A replacement motorbike", "Repairs, managed for you", "Injury claims if you were hurt"],
    photo: "motorbike",
  },
  {
    key: "taxi",
    title: "Taxi and PCO drivers",
    headline: "Off the road means off the clock.",
    intro:
      "We know every day without your vehicle costs you work. From the first call, we focus on getting you moving again as part of your claim.",
    helps: ["A replacement vehicle so you can keep working", "Recovery and repairs arranged", "We deal with the at-fault insurer", "Injury claims if you were hurt"],
    photo: "taxi",
  },
  {
    key: "delivery",
    title: "Delivery riders and drivers",
    headline: "Your vehicle is your income.",
    intro:
      "Whether you ride or drive for work, being off the road hits your earnings. We help arrange recovery, repairs and a replacement so you can get back out there.",
    helps: ["Recovery for cars and motorbikes", "A replacement car or bike", "Repairs, managed for you", "Injury claims if you were hurt"],
    photo: "delivery",
  },
  {
    key: "passengers",
    title: "Passengers",
    headline: "Hurt as a passenger? You may be able to claim.",
    intro:
      "Passengers are very rarely at fault, so if you were hurt you may be able to make an injury claim. Call us and we'll explain your options.",
    helps: ["No win, no fee injury claims", "Your options explained on the first call", "Support until your claim is settled"],
    photo: "passenger",
  },
];

/* ---------------- How it works ---------------- */

export const haveReady = [
  { title: "When and where", line: "The date, the time and the place the accident happened." },
  { title: "The other driver", line: "Their name, contact details, registration and insurance details." },
  { title: "Photos", line: "Any photos of the vehicles, the damage and the scene." },
  { title: "Your own details", line: "Your vehicle details and your insurance details." },
] as const;

/* ---------------- FAQs (grouped) ---------------- */

export const faqGroups = [
  {
    key: "claim",
    title: "Your claim",
    items: [
      {
        q: "What counts as a non-fault accident?",
        a: "Generally, one caused by another road user. For example you were hit from behind, hit while parked, or hit by a driver pulling out. If you're not sure, call us and we'll talk it through.",
      },
      {
        q: "I'm not sure the accident was my fault. Should I still call?",
        a: "Yes. Call us and we'll talk it through. We check whether the accident wasn't your fault and explain what you're entitled to. There's no obligation.",
      },
      {
        q: "What should I have ready when I call?",
        a: "Whatever you have: the date and place, the other driver's details and registration, any photos, and your own vehicle and insurance details. Don't worry if you don't have everything.",
      },
      {
        q: "What happens after I call?",
        a: "We check the accident wasn't your fault, then arrange what you need: recovery, a replacement car or bike, and repairs. We deal with the at-fault insurer and support any injury claim until it is settled.",
      },
    ],
  },
  {
    key: "cost",
    title: "Costs",
    items: [
      {
        q: "Will it cost me anything?",
        a: "For a non-fault accident, costs like recovery, a replacement vehicle and repairs are claimed from the at-fault driver's insurer, not from you. Injury claims are no win, no fee: if the claim isn't successful, you don't pay a fee. Any fee on a successful claim is explained to you before you go ahead.",
      },
      {
        q: "Who pays for my replacement vehicle and repairs?",
        a: "In a non-fault claim, those costs are claimed from the at-fault driver's insurer. We deal with the insurers and the paperwork, so you don't have to.",
      },
    ],
  },
  {
    key: "who",
    title: "Who we help",
    items: [
      {
        q: "Can you help taxi, PCO and delivery drivers?",
        a: "Yes. We know being off the road costs you work, so we focus on getting you moving again as part of your claim.",
      },
      {
        q: "Do you help motorcyclists?",
        a: "Yes. We arrange motorbike recovery, a replacement motorbike while yours is repaired, and support with any injury claim.",
      },
      {
        q: "I was a passenger. Can I claim?",
        a: "Passengers are very rarely at fault, so you may be able to make an injury claim. Call us and we'll explain your options.",
      },
      {
        q: "Do you cover my area?",
        a: "Yes. We help with non-fault accidents anywhere in the UK.",
      },
    ],
  },
  {
    key: "contact",
    title: "Getting in touch",
    items: [
      {
        q: "How do I get in touch?",
        a: "Call us on 07864 920248, or message us on WhatsApp on the same number. One number covers everything, from the first conversation to the end of your claim.",
      },
      {
        q: "What should I do at the scene of an accident?",
        a: "Make it safe, call 999 if anyone is hurt or the road is blocked, swap details, take photos, and don't admit fault. Once everyone is safe, call us. Our at-the-scene guide has the full checklist.",
      },
    ],
  },
] as const;

/* ---------------- Photos ---------------- */

export type PhotoKey =
  | "recovery"
  | "repairs"
  | "replacement"
  | "motorbike"
  | "taxi"
  | "delivery"
  | "passenger"
  | "phone"
  | "scene"
  | "road"
  | "consult"
  | "driver"
  | "damage";
