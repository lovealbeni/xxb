import React, { useCallback, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { debounce } from "lodash";

function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  const split = async () => {
    debugger
    const value = editorRef.current?.innerText;
    const res = await invoke("split", { input: value });
  };

  const splitDebounce = useCallback(debounce(split, 500), []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    splitDebounce();
  };

  return (
    <div contentEditable suppressContentEditableWarning ref={editorRef} onInput={onChangeHandler}>
    </div>
  );
}

export default App;
