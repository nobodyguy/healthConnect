import { I18nProvider, resolveBrowserLocale } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import czechMessages from "@nobodyguy/ra-language-czech";
import englishMessages from "ra-language-english";

// domain translations
import domainMessages from "./translations.json";

const messages: { [key: string]: any } = {
  cs: { ...czechMessages, ...domainMessages.cs },
  en: { ...englishMessages, ...domainMessages.en },
};

const i18nProvider: I18nProvider = polyglotI18nProvider(
  (locale: string) => (messages[locale] ? messages[locale] : messages.en),
  resolveBrowserLocale(),
  [
    { locale: "cs", name: "Česky" },
    { locale: "en", name: "English" },
  ],
);

export default i18nProvider;
