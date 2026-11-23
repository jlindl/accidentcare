import { getAllGuides } from "@/lib/guides";
import { absolute } from "@/lib/site-url";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T08:00:00Z`).toUTCString();

export function GET() {
  const guides = getAllGuides();
  const items = guides
    .map((g) => {
      const url = absolute(`/guides/${g.slug}`);
      return `    <item>
      <title>${esc(g.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(g.description)}</description>
      <category>${esc(g.category.name)}</category>
      <pubDate>${rfc822(g.date)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Accident Care guides</title>
    <link>${absolute("/guides")}</link>
    <description>Plain-English guides for drivers, riders and passengers after a non-fault road accident in the UK.</description>
    <language>en-gb</language>
    <atom:link href="${absolute("/guides/rss.xml")}" rel="self" type="application/rss+xml" />
${guides[0] ? `    <lastBuildDate>${rfc822(guides[0].updated ?? guides[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
