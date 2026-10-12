const ACCOUNT_URL = "https://kasiaihub.com/account";

/**
 * The auth email provider may omit redirect_to in some generated links. Add the
 * customer account as a fallback, but never override a redirect requested by
 * the page that initiated the sign-in (for example /admin staff sign-in).
 */
export function withAccountRedirect(actionUrl: string): string {
  try {
    const url = new URL(actionUrl);
    if (url.searchParams.has("redirect_to")) {
      return url.toString();
    }
    url.searchParams.set("redirect_to", ACCOUNT_URL);
    return url.toString();
  } catch {
    return actionUrl;
  }
}