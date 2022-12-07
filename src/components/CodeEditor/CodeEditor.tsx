import { CodeMirrorProps } from "../../interfaces";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = ({ selectedNode, onChange }: CodeMirrorProps) => {
  return (
    <CodeMirror
      value={selectedNode.content}
      height="200px"
      theme="dark"
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
