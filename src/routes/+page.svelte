<script>
  import { writable } from "svelte/store";

  const secret = writable(false);
</script>

<div class="w-full min-h-full bg-primary p-10 text-white">
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
      class="w-[30rem] min-h-[12.5rem] flex flex-col rounded-xl bg-herring p-4"
    >
      <span
        class="textarea w-full overflow-hidden resize outline-none appearance-none"
        role="textbox"
        contenteditable="true"
      />
      <button> submit </button>
    </div>
    <div class="w-[288px] h-40 rounded-md bg-box" />
  </div>
</div>
