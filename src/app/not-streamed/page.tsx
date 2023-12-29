"use client";

export default function Home() {
  async function callApi() {
    const response = await fetch(`/not-streamed/api/chat1`, {
      method: "POST",
    });
    console.log({ response });

    const json = await response.json();
    console.log({ json });
  }

  return (
    <main className={"p-10"}>
      <h1 className={"pb-4"}>OpenAI Test - not streamed</h1>
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
