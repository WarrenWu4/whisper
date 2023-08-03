<script>
  import { get, writable } from "svelte/store";

  const secret = writable(false);
  const secretText = writable("");
  const animation = writable("scale-100 opaicty-100 translate-y-0");

  const handleSubmit = async () => {
    // run transition forward (get data in the meantime)
    animation.set("scale-0 opacity-0 translate-y-[14rem]");

    // send secret to database
    // const text =
    //   "Whenever I'm feeling stressed or overwhelmed, I like to escape to my imaginary cloud kingdom, where I'm the ruler of fluffy cumulus clouds and playful blobs! 🌈🌤️ It's my own little world of creativity and magic, where I can let my imagination run wild and find peace amidst the clouds. Shh, don't tell anyone! 😄";
    // const send = await fetch("/api/secret", {
    //   method: "POST",
    //   body: JSON.stringify({ text }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

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

<div class="w-screen h-screen bg-primary p-10 text-white flex flex-col">
  <div class="w-full flex items-center">
    <img src="/logo.svg" alt="logo" />
    <div class="ml-2 font-bold text-[2.5rem] text-blood">whisper</div>
  </div>

  <div class="flex flex-col gap-8 w-full h-full justify-center items-center">
    <div class="font-bold text-[2.5rem] leading-tight">
      <span class={$secret ? "" : "text-blood"}>leave</span> a secret,
      <br />
      <span class={$secret ? "text-blood" : ""}>read</span> a secret
    </div>

    <div
      class="w-[30rem] min-h-[12.5rem] flex flex-col justify-between rounded-xl bg-herring p-4 transition-all duration-[0.8s] {$animation}"
    >
      {#if $secret}
        <div class="w-full min-h-[192px]">
          {$secretText}
        </div>
        <div class="w-full flex justify-end pr-3">
          <button on:click={handleClose} type="button">close</button>
        </div>
      {:else}
        <div class="w-full min-h-[192px]">placeholder</div>
        <div class="w-full flex justify-end pr-3">
          <button on:click={handleSubmit} type="button"> submit </button>
        </div>
      {/if}
    </div>

    <div class="mt-16 w-[288px] h-40 rounded-md bg-box z-10" />
  </div>
</div>
