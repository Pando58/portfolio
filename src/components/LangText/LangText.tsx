import { Lang } from "@/lib/langHandler";
import LangComponent from "./LangComponent";

function LangText(props: Record<Lang, string>) {
  return (
    <LangComponent
      en={props.en} //
      es={props.es}
    />
  );
}

export default LangText;
