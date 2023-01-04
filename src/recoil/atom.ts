import { langs } from "@uiw/codemirror-extensions-langs";
import { atom } from "recoil";

export const languageAtom = atom({
  key: "languageAtom",
  default: "javascript",
});

export const languagesAtom = atom({
  key: "languagesAtom",
  default: {
    c: langs.c(),
    cpp: langs.cpp(),
    css: langs.css(),
    dart: langs.dart(),
    html: langs.html(),
    java: langs.java(),
    javascript: langs.javascript(),
    json: langs.json(),
    jsx: langs.jsx(),
    kotlin: langs.kotlin(),
    markdown: langs.markdown(),
    python: langs.python(),
    sass: langs.sass(),
    tsx: langs.tsx(),
    typescript: langs.typescript(),
  },
});

export const fileExtensionAtom = atom({
  key: "fileExtensionAtom",
  default: {
    c: `c`,
    cpp: `cpp`,
    css: `css`,
    dart: `dart`,
    html: `html`,
    java: `java`,
    javascript: `js`,
    json: `json`,
    jsx: `jsx`,
    kotlin: `kotlin`,
    markdown: `md`,
    python: `py`,
    sass: `sass`,
    tsx: `tsx`,
    typescript: `ts`,
  },
});
