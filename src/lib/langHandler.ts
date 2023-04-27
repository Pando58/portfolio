const langs = ["en", "es"] as const;

export type Lang = typeof langs[number];

export const langHandler = ((): LangHandler => {
  let activeLang: Lang = "en";
  let listeners: ((lang: Lang) => void)[] = [];

  const urlLang = new URLSearchParams(location.search).get("lang");

  if (urlLang) {
    if ((langs as readonly string[]).includes(urlLang)) {
      activeLang = urlLang as Lang;
    }
  }

  return {
    getActiveLang: () => activeLang,
    onChange: (fn: (lang: Lang) => void) => {
      listeners = [...listeners, fn];

      fn(activeLang);
    },
    clear: (fn: (lang: Lang) => void) => {
      if (listeners.includes(fn)) {
        listeners = listeners.filter((i) => i === fn);
      }
    },
    swapLang: () => {
      activeLang = activeLang === "en" ? "es" : "en";

      history.replaceState(
        history.state,
        "",
        `${location.pathname}?lang=${activeLang}`
      );

      for (const fn of listeners) {
        fn(activeLang);
      }
    },
  };
})();

type LangHandler = {
  getActiveLang: () => Lang;
  onChange: (fn: (lang: Lang) => void) => void;
  clear: (fn: (lang: Lang) => void) => void;
  swapLang: () => void;
};
