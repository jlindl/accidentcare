import { disclaimer, legalNotice, services, site } from "@/content/site";
import { getAllGuides } from "@/lib/guides";
import { absolute } from "@/lib/site-url";

/** llms.txt (llmstxt.org): a plain summary of the site for AI search and assistants. Built from the same content as the pages. */
export function GET() {
  const guides = getAllGuides();
  const body = `# ${site.name}

> Accident claim management for non-fault road traffic accidents, anywhere in the UK. One phone call (${site.phoneDisplay}) arranges recovery, a replacement car or motorbike, repairs and the claim, for drivers, motorcyclists, taxi and PCO drivers, delivery riders and passengers.

${disclaimer}

Important: ${legalNotice}

## Services

${services.map((s) => `- ${s.title}: ${s.line}`).join("\n")}

## Pages

- [How it works](${absolute("/how-it-works")}): the four steps from the first call to a settled claim, and why a non-fault claim costs you nothing
- [Services](${absolute("/services")}): recovery, replacement vehicles, repairs, injury claims and full support
- [Who we help](${absolute("/who-we-help")}): drivers, motorcyclists, taxi and PCO drivers, delivery riders and passengers
- [At the scene](${absolute("/at-the-scene")}): what to do straight after an accident
- [FAQs](${absolute("/faqs")}): costs, claims, who we help and getting in touch

## Guides

${guides.length ? guides.map((g) => `- [${g.title}](${absolute(`/guides/${g.slug}`)}): ${g.description}`).join("\n") : "- New guides are published regularly."}

## Contact

- Phone and WhatsApp: ${site.phoneDisplay}
- Area: the whole of the UK
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
