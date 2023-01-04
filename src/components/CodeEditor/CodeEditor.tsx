import { useRecoilValue } from "recoil";
import { CodeMirrorProps } from "../../interfaces";
import CodeMirror from "@uiw/react-codemirror";
import { CompletionContext } from "@codemirror/autocomplete";
import { autocompletion } from "@codemirror/autocomplete";
import {
  loadLanguage,
  langNames,
  langs,
} from "@uiw/codemirror-extensions-langs";
import { languageAtom, languagesAtom } from "../../recoil/atom";
import { useEffect, useState } from "react";

const CodeEditor = ({ selectedNode, onChange }: CodeMirrorProps) => {
  const selectedLanguage = useRecoilValue<string>(languageAtom);
  const languages = useRecoilValue<any>(languagesAtom);
  const [extension, setExtension] = useState(langs.javascript());
  // console.log({ extension });

  useEffect(() => {
    setExtension(languages[selectedLanguage]);
  }, [selectedLanguage]);

  function myCompletions(context: CompletionContext) {
    let word = context.matchBefore(/\w*/);

    if (word === null || (word.from == word.to && !context.explicit))
      return null;
    return {
      from: word.from,
      options: [
        { label: "true", type: "keyword" },
        { label: "hello", type: "variable", info: "" },
        { label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro" },
      ],
    };
  }

  return (
    <CodeMirror
      height="550px"
      theme="dark"
      placeholder={`/* type your ${selectedLanguage} code here */`}
      // extensions={[basicSetup, javascript({ jsx: true })]}
      // extensions={[langs.tsx()]}
      value={selectedNode.content}
      onChange={onChange}
      extensions={[autocompletion({ override: [myCompletions] }), extension]}
    />
  );
};

export default CodeEditor;
