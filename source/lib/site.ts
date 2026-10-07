export const SITE_HANDLE = "AiMotionSiteS";
export const SITE_NAME = "Prompt Motion";
export const SITE_X = `https://x.com/${SITE_HANDLE}`;

/** Public origin. Override with NEXT_PUBLIC_SITE_URL if the host changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://promptmotion.org").replace(/\/$/, "");
