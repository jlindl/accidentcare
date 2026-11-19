// Single source of truth for every fact on the site.
// Sources: Jack's intake (2026-11-19) and the client's supplied logo artwork.
// Nothing here is invented. Items marked TODO need confirming with the client before go-live.

export const site = {
  name: "Accident Care",
  descriptor: "Accident claim management",
  tagline: "Get back on the road, stress free.",
  phoneDisplay: "07864 920248",
  phoneHref: "tel:+447864920248",
  // Jack confirmed WhatsApp on the same number (2026-11-19).
  whatsappHref: "https://wa.me/447864920248",
  area: "Whole of the UK",
  // Demo build: keep out of search until Jack says the site is going live.
  noindex: true,
};

export const audiences = [
  {
    key: "drivers",
    title: "Drivers",
    line: "Car off the road? We arrange the recovery, the repairs and a replacement while yours is fixed.",
  },
  {
    key: "motorcyclists",
    title: "Motorcyclists",
    line: "Motorbike recovery and a replacement bike, so you're riding again while yours is repaired.",
  },
  {
    key: "taxi",
    title: "Taxi and PCO drivers",
    line: "Off the road means off the clock. We focus on getting you back to work.",
  },
  {
    key: "delivery",
    title: "Delivery riders",
    line: "Your vehicle is your income. We help arrange recovery, repairs and a replacement.",
  },
  {
    key: "passengers",
    title: "Passengers",
    line: "Hurt as a passenger? You may be able to claim. We'll explain your options.",
  },
] as const;

export const services = [
  {
    title: "Vehicle recovery",
    line: "Your car recovered from the roadside and taken somewhere safe.",
  },
  {
    title: "Motorbike recovery",
    line: "Recovery for motorbikes as well as cars, from the roadside to safety.",
  },
  {
    title: "Replacement vehicles",
    line: "A replacement car while yours is off the road, so life doesn't stop.",
  },
  {
    title: "Motorbike replacement",
    line: "A replacement bike, so you're still riding while yours is repaired.",
  },
  {
    title: "Repairs",
    line: "Repairs arranged and managed for you. No chasing garages or insurers.",
  },
  {
    title: "Injury claims",
    // TODO(client): confirm how injury claims are handled (in-house or via regulated partner solicitors) and FCA status.
    line: "If you've been hurt, we help you start an injury claim, no win, no fee.",
  },
  {
    title: "Full support",
    line: "One number to call, from the first conversation to the end of your claim.",
  },
] as const;

export const steps = [
  {
    title: "You call us",
    line: "Tell us what happened. We check the accident wasn't your fault and explain what you're entitled to.",
  },
  {
    title: "We get you moving",
    line: "Recovery if you need it, and a replacement car or bike while yours is off the road.",
  },
  {
    title: "We sort the repairs",
    line: "We arrange and manage the repairs, so you're not left chasing anyone.",
  },
  {
    title: "We handle the claim",
    line: "We deal with the at-fault insurer and support any injury claim until it is settled.",
  },
] as const;

export const costPoints = [
  {
    title: "The at-fault side pays",
    line: "In a non-fault claim, costs like your replacement vehicle and repairs are claimed from the at-fault driver's insurer.",
  },
  {
    title: "No win, no fee",
    line: "If your claim isn't successful, you don't pay us a fee.",
  },
  {
    title: "We do the chasing",
    line: "We deal with the insurers and the paperwork, so you don't have to.",
  },
] as const;

export const sceneChecklist = [
  { title: "Make it safe", line: "Hazard lights on, engine off. Get everyone somewhere safe, away from traffic." },
  { title: "Call 999 if needed", line: "If anyone is hurt or the road is blocked, call the emergency services first." },
  { title: "Swap details", line: "Names, addresses, phone numbers, registrations and insurance details of everyone involved." },
  { title: "Take photos", line: "The vehicles, the damage, the road and the scene. Note any witnesses and their numbers." },
  { title: "Don't admit fault", line: "Stay calm and polite, but don't accept blame or agree a settlement at the scene." },
  { title: "Call Accident Care", line: "Once everyone is safe, call us. We'll take it from there." },
] as const;

export const faqs = [
  {
    q: "What counts as a non-fault accident?",
    a: "Generally, one caused by another road user. For example you were hit from behind, hit while parked, or hit by a driver pulling out. If you're not sure, call us and we'll talk it through.",
  },
  {
    q: "Will it cost me anything?",
    a: "For a non-fault accident, costs like recovery, a replacement vehicle and repairs are claimed from the at-fault driver's insurer, not from you. Injury claims are no win, no fee: if the claim isn't successful, you don't pay a fee. Any fee on a successful claim is explained to you before you go ahead.",
  },
  {
    q: "Can you help taxi, PCO and delivery drivers?",
    a: "Yes. We know being off the road costs you work, so we focus on getting you moving again as part of your claim.",
  },
  {
    q: "Do you cover my area?",
    a: "Yes. We help with non-fault accidents anywhere in the UK.",
  },
  {
    q: "I was a passenger. Can I claim?",
    a: "Passengers are very rarely at fault, so you may be able to make an injury claim. Call us and we'll explain your options.",
  },
  {
    q: "What should I have ready when I call?",
    a: "Whatever you have: the date and place, the other driver's details and registration, any photos, and your own vehicle and insurance details. Don't worry if you don't have everything.",
  },
] as const;

export const disclaimer =
  "Accident Care provides accident claim management for non-fault road traffic accidents in the UK. Eligibility depends on the circumstances of each accident. Information on this website is general guidance, not legal advice.";

// ---------- Reviews ----------
// Real reviews only. Paste them exactly as written, with the reviewer's permission
// (or from a public Google/Trustpilot listing). Until this list has entries, the
// Reviews section does not render in production. The dev server shows labelled
// placeholders so the layout can be judged.
export type Review = {
  quote: string;
  name: string; // e.g. "Amir K." (first name + initial)
  detail?: string; // e.g. "PCO driver, Luton"
  rating?: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "Trustpilot" | "Facebook" | "Direct" | "Example";
  /** Dummy review for the demo. Never rendered once site.noindex is false (live). */
  sample?: true;
  date?: string; // e.g. "October 2026"
};

// DEMO ONLY (Jack, 2026-11-19): dummy reviews so the prospect can see the section.
// Replace with real reviews before go-live. These are blocked from rendering on a live site.
export const reviews: Review[] = [
  {
    sample: true,
    quote: "Someone pulled out on me at a roundabout. One call and my car was recovered, I had a replacement the same week, and they dealt with the other driver's insurer. I didn't have to chase a thing.",
    name: "Daniel R.",
    detail: "Driver, Birmingham",
    rating: 5,
    source: "Example",
  },
  {
    sample: true,
    quote: "I was knocked off my bike at a junction. They sorted the recovery, got me on a replacement bike and handled the claim. Straight answers every time I called.",
    name: "Sofia M.",
    detail: "Motorcyclist, Leeds",
    rating: 5,
    source: "Example",
  },
  {
    sample: true,
    quote: "As a PCO driver every day off the road costs me. They understood that from the first call and focused on getting me working again while my car was repaired.",
    name: "Imran H.",
    detail: "PCO driver, London",
    rating: 5,
    source: "Example",
  },
];

// Overall rating badge, e.g. { rating: 4.9, count: 37, source: "Google", url: "https://..." }.
export const reviewSummary: { rating: number; count: number; source: string; url: string } | null = null;
