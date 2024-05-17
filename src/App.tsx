import React, { useCallback, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { debounce } from "lodash";

function App() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [splitValue, setSplitValue] = useState<string[]>([]);

  const split = async () => {
    const value = editorRef.current?.innerText;
    // todo 这里split /n 就行
    const res = await invoke("split", { input: value });
    setSplitValue(res as string[]);
  };

  const editHtml = splitValue.map((value, index) => {
    return `<span key=${index}>${value}</span>`
  }).join("");

  const splitDebounce = useCallback(debounce(split, 500), []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    splitDebounce();
  };

  return (
    <div contentEditable suppressContentEditableWarning ref={editorRef} onInput={onChangeHandler} dangerouslySetInnerHTML={{__html: editHtml}}>
    </div>
  );
}

export default App;
