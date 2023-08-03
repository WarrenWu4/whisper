<script>
  import { writable } from "svelte/store";

  const secret = writable(false);
  const secretText = writable("");
  const animation = writable("scale-100 opaicty-100 translate-y-0");
  let textArea;

  const handleSubmit = async () => {
    // get user secret
    const text = textArea.innerHTML;
    if (text === "") {
      alert("please enter a secret :(");
      return;
    }

    // run transition forward (get data in the meantime)
    animation.set("scale-0 opacity-0 translate-y-[14rem]");

    // send secret to database
    await fetch("/api/secret", {
      method: "POST",
      body: JSON.stringify({ text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // get a random secret from database
    const response = await fetch("/api/secret");
    const secretResponse = await response.json();
    secretText.set(secretResponse[0].secret);

    // run transition backward
    // ! might not need setimeout since it takes time for async
    setTimeout(() => {
      animation.set("scale-100 opacity-100 translate-y-0");
      //set secre to true
      secret.set(true);
    }, 800);
  };

  const handleClose = () => {
    // run transition forward
    animation.set("scale-0 opacity-0 translate-y-[14rem]");
    // run transition backward
    setTimeout(() => {
      animation.set("scale-100 opacity-100 translate-y-0");
      //set secret to false
      secret.set(false);
    }, 800);
  };
</script>

<div
  class="w-screen min-h-screen bg-primary px-4 text-white flex flex-col items-center"
>
  <div class="flex mt-10">
    <img src="/logo.svg" alt="logo" />
    <div class="ml-2 font-bold text-[2.5rem] text-blood">whisper</div>
  </div>

  <div
    class="my-16 flex flex-col gap-8 w-full h-full justify-center items-center"
  >
    <div class="font-bold text-[2.5rem] text-center leading-tight">
      <span class={$secret ? "" : "text-blood"}>leave</span> a secret,
      <br />
      <span class={$secret ? "text-blood" : ""}>read</span> a secret
    </div>

    <div
      class="w-[288px] min-h-[180px] flex flex-col justify-between rounded-xl bg-herring p-4 transition-all duration-[0.8s] {$animation}"
    >
      {#if $secret}
        <div class="w-full min-h-[124px] overflow-hidden font-medium text-base">
          {$secretText}
        </div>
        <div class="w-full flex justify-end pr-3">
          <button
            on:click={handleClose}
            type="button"
            class="font-bold text-base flex items-center group"
          >
            close
            <img
              src="./c_btn.svg"
              alt="close icon"
              class="ml-2 group-hover:rotate-180 transition-all duration-[0.4s]"
            />
          </button>
        </div>
      {:else}
        <span
          class="userInput w-full min-h-[124px] bg-transparent resize-none outline-none overflow-hidden font-medium text-base"
          role="textbox"
          contenteditable
          bind:this={textArea}
        />
        <div class="w-full flex justify-end pr-3">
          <button
            on:click={handleSubmit}
            type="button"
            class="font-bold text-base flex items-center group"
          >
            submit
            <img
              src="./close_btn.svg"
              alt="submit icon"
              class="ml-2 group-hover:translate-x-1 transition-all duration-[0.4s]"
            />
          </button>
        </div>
      {/if}
    </div>

    <img src="./box.svg" alt="box" class="z-10" />
  </div>
</div>
