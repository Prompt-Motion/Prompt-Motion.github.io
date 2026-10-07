import Link from "next/link";
import { SITE_HANDLE, SITE_X } from "@/lib/site";
import { SubmitDialog } from "./submit-dialog";
import { XIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm font-medium tracking-tight">
        Prompt Motion
      </Link>
      <div className="flex items-center gap-1">
        <SubmitDialog />
        <a
          href={SITE_X}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md,10px),12px)] px-2.5 text-[0.8rem] text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <XIcon />
          @{SITE_HANDLE}
        </a>
      </div>
    </header>
  );
}
