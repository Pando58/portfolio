export const langHandler = ((): LangHandler => {
  let activeLang: Lang = "en";
  let listeners: ((lang: Lang) => void)[] = [];

  const urlLang = new URLSearchParams(location.search).get("lang");

  if (urlLang) {
    if (["en", "es"].includes(urlLang)) {
      activeLang = urlLang as Lang;
    }
  }

  return {
    getActiveLang: () => activeLang,
    onChange: (fn: (lang: Lang) => void) => {
      listeners = [...listeners, fn];
    },
    clear: (fn: (lang: Lang) => void) => {
      if (listeners.includes(fn)) {
        listeners = listeners.filter((i) => i === fn);
      }
    },
    changeLang: () => {
      activeLang = activeLang === "en" ? "es" : "en";

      for (const fn of listeners) {
        fn(activeLang);
      }
    },
  };
})();

export type Lang = "en" | "es";

type LangHandler = {
  getActiveLang: () => Lang;
  onChange: (fn: (lang: Lang) => void) => void;
  clear: (fn: (lang: Lang) => void) => void;
  changeLang: () => void;
};
