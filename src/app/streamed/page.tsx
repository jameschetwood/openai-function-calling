"use client";
// import JSON5 from "json5";
import { jsonrepair } from "jsonrepair";

export default function Home() {
  async function callApi() {
    const response = await fetch(`streamed/api/chat2`, {
      method: "POST",
    });
    console.log({ response });

    if (!response.body) throw new Error("no body from response");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";
    while (true) {
      const readValues = await reader.read();
      const { value, done } = readValues;
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      accumulatedText += text;
    }
    console.log({ accumulatedText });

    const repairedJSON = jsonrepair(accumulatedText);

    const parsed = JSON.parse(repairedJSON);
    console.log({ parsed });
  }
  return (
    <main className={"p-10"}>
      <h1 className={"pb-4"}>OpenAI Test - streamed</h1>
      <button
        className={"bg-orange-400 rounded px-4 py-2"}
        onClick={callApi}
        type={"button"}
      >
        Test
      </button>
    </main>
  );
}
