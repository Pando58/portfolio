import { Lang, langHandler } from "@/lib/langHandler";
import { ReactNode, useEffect, useState } from "react";

function LangComponent(props: Record<Lang, ReactNode>) {
  const [currentLang, setCurrentLang] = useState<Lang>("en");

  useEffect(() => {
    const onChange = (lang: Lang) => {
      setCurrentLang(lang);
    };

    langHandler.onChange(onChange);

    return () => {
      langHandler.clear(onChange);
    };
  }, []);

  return <>{props[currentLang]}</>;
}

export default LangComponent;
