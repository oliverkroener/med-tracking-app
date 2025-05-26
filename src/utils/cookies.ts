import Cookies from 'js-cookie';

export const COOKIE_CONSENT_KEY = 'CookieConsent';

export const hasAcceptedCookies = () => {
  return Cookies.get(COOKIE_CONSENT_KEY) === 'true';
};

export const acceptCookies = () => {
  Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: 365 });
};

export const declineCookies = () => {
  Cookies.set(COOKIE_CONSENT_KEY, 'false', { expires: 365 });
};