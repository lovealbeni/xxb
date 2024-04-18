import React, { useCallback, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { debounce } from "lodash";

function App() {
  const [splitValue, setSplitValue] = useState<string[]>([]);
  const [_, setInputValue] = useState<string>("");

  const split = async (value: string) => {
    const res = await invoke("split", { input: value });
    setSplitValue(res as string[]);
  };

  const splitDebounce = useCallback(debounce(split, 500), []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    splitDebounce(e.currentTarget.value);
  };

  return (
    <div className="container">
      <input onChange={onChangeHandler}></input>
      <div>retust</div>
      {splitValue.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
}

export default App;
