import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Adds UTM parameters to a URL for tracking traffic source
 * @param url - The base URL to add parameters to
 * @param campaign - The campaign name (e.g., "directory", "hall-of-fame")
 * @param content - The content/link type (e.g., "github", "docs", "title")
 * @returns URL with UTM parameters appended
 */
export function addUtmParams(
  url: string,
  campaign: string,
  content: string
): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("utm_source", "vercel-oss-directory");
    urlObj.searchParams.set("utm_medium", "referral");
    urlObj.searchParams.set("utm_campaign", campaign);
    urlObj.searchParams.set("utm_content", content);
    return urlObj.toString();
  } catch {
    // If URL is invalid, return original
    return url;
  }
}
