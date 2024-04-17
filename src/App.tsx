import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [value,setValue] = useState<string>("我们中出了一个叛徒")

  const showValue = split(value);

  async function split(input:string):Promise<string[]> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setSplitStr(await invoke("split", { input }));
    const res = await invoke("split", { input });
    return res as Promise<string[]>;
  }

  return (
    <div className="container">
      <input onChange={(e) => setValue(e.target.value)} value={value}></input>
      <div>retust</div>
      {
        showValue.map((item,index)=>{
          return <div key={index}>{item}</div>
        })
      }
    </div>
  );
}

export default App;
