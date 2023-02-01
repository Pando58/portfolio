import { useEffect, useState } from "react";
import { Lang, langHandler } from "../language/langHandler";

function LangText(props: { en: string; es: string }) {
  const [text, setText] = useState<string>(props[langHandler.getActiveLang()]);

  useEffect(() => {
    const onChange = (lang: Lang) => {
      setText(props[lang]);
    };

    langHandler.onChange(onChange);

    return () => {
      langHandler.clear(onChange);
    };
  }, []);

  return <>{text}</>;
}

export default LangText;
