"use client";
// import JSON5 from "json5";

export default function Home() {
  async function callApi() {
    const response = await fetch(`/api/chat`, {
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

    const parsed = JSON.parse(accumulatedText);
    console.log({ parsed });
  }
  return (
    <main className={"p-10"}>
      <h1 className={"pb-4"}>AI API Test</h1>
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
