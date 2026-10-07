import Link from "next/link";
import { getEntries } from "@/lib/entries";
import { SITE_HANDLE, SITE_NAME, SITE_URL, SITE_X } from "@/lib/site";
import { XIcon } from "./icons";

const linkClass = "text-muted-foreground hover:text-foreground";

export function SiteFooter() {
  const count = getEntries().length;
  const year = new Date().getFullYear();
  const host = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <footer className="mx-auto mt-auto w-full max-w-[1400px] px-4 pt-4 pb-16 sm:px-6 lg:px-8">
      <div className="border-t border-border pt-8">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1.5fr)_auto_auto] sm:gap-16">
          <div className="max-w-md">
            <Link href="/" className="text-sm font-medium tracking-tight text-foreground">
              {SITE_NAME}
            </Link>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Prompt Motion is a gallery of AI motion prompts and Claude Opus motion design. {count} films, each with the prompt or skill that made it, and a link back to the creator’s post.
            </p>
          </div>
          <nav aria-label="Explore">
            <p className="text-sm font-medium text-foreground">Explore</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link href="/" className={linkClass}>
                  All videos
                </Link>
              </li>
              <li>
                <Link href="/#faq-heading" className={linkClass}>
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-sm font-medium text-foreground">Follow</p>
            <a
              href={SITE_X}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-2 inline-flex items-center gap-1.5 text-sm ${linkClass}`}
            >
              <XIcon />@{SITE_HANDLE}
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t border-border pt-4 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}
            {host ? ` · ${host}` : ""}
          </p>
          <p>Videos and prompts belong to their creators, linked on each entry.</p>
        </div>
      </div>
    </footer>
  );
}
