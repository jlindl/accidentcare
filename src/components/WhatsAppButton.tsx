import { site } from "@/content/site";

/** WhatsApp glyph (brand mark, single path). */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.44 9.44 0 0 1-4.81-1.32l-.35-.2-3.58.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.77 6.68c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.79.7.69 5.79.69 12.05c0 2 .52 3.95 1.52 5.67L.6 23.6l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03" />
    </svg>
  );
}

/** Floating WhatsApp chat button, bottom right. Sits above the mobile call bar. */
export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label={`WhatsApp us on ${site.phoneDisplay}`}
      className="group fixed bottom-[calc(max(12px,env(safe-area-inset-bottom))+80px)] right-4 z-40 inline-flex h-16 items-center gap-0 rounded-full bg-[#25d366] pl-4 pr-4 sm:h-[72px] sm:pl-[18px] sm:pr-[18px] text-ink shadow-[0_18px_40px_-16px_rgb(11_26_48/0.55)] transition-[gap,padding,background-color,transform] duration-500 ease-[var(--ease-out-soft)] hover:gap-3 hover:bg-[#3ee07b] hover:pr-6 focus-visible:gap-3 focus-visible:pr-6 sm:hover:pr-7 sm:focus-visible:pr-7 active:scale-[0.97] sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-8 shrink-0 sm:size-9" />
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-out-soft)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap text-[1.0625rem] font-medium sm:text-[1.125rem]">WhatsApp us</span>
      </span>
    </a>
  );
}
