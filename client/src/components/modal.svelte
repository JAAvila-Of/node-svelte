<script lang="ts">
  import { fade } from "svelte/transition";

  export let show = false;

  export const toggle = () => {
    const divBlur = document.getElementById("canblured");

    if (show) {
      show = false;
      setTimeout(() => {
        divBlur.classList.remove("blur-filter-modal");
      }, 350);
    } else {
      divBlur.classList.add("blur-filter-modal");

      show = true;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      toggle();
    }
  };
</script>

{#if show}
  <div
    class="bg-gray-500 modal-wrapper bg-opacity-50 h-screen fixed flex justify-center items-center"
    transition:fade={{ delay: 150, duration: 200 }}
  >
    <div class="bg-gray-200 modal-front  rounded-xl px-4 py-2">
      <div class="float-right cursor-pointer" on:click={toggle}>&times;</div>
      <slot />
    </div>
  </div>
{/if}

<svelte:window on:keydown={handleKeyDown} />

<style>
  .modal-wrapper {
    width: calc(100vw - 1.5rem);
  }

  .modal-front {
    min-width: 450px;
    max-width: 750px;
    width: 50vw;
    height: 170px;
  }
</style>
