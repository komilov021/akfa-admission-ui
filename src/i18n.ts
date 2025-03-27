import { createI18n } from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";
const numberFormats: any = {
  "ru-RU": {
    currency: {
      style: "currency",
      currency: "USD",
      notation: "standard",
    },
    decimal: {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
    percent: {
      style: "percent",
      useGrouping: false,
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  messages,
  numberFormats,
});

export async function setLocale(locale: string) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);
    if (messages === undefined) {
      return;
    }
    i18n.global.setLocaleMessage(locale, messages);
  }
  i18n.global.locale.value = locale;
}
export default async function routeMiddleware(to: any, _from: any, next: any) {
  const paramLocale = to.params.locale;
  if (paramLocale.includes("en")) {
    // if (paramLocale.includes('uz ru en')) {
    return next(paramLocale);
  }
  i18n.global.locale.value = paramLocale;
  return next();
}
function loadLocale(locale: string) {
  return fetch(`./assets/locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}
