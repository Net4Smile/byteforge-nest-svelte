<script lang="ts">
  import Search from "./navigation/search.svelte";
  import Logo from "./navigation/logo.svelte";
  import UserPanel from "./navigation/user_panel.svelte";
  import {
    categoryData,
    isMobile,
    navigationOpen,
  } from "$lib/stores/shared.svelte";
  import Category from "./template/category/template.svelte";
  import XShape from "./svg/x-shape.svelte";
  import BackArrowShape from "./svg/back-arrow-shape.svelte";
</script>

<nav class="flex flex-col justify-center items-center px-1 pt-1 border-b">
  <div class="flex flex-col md:flex-row items-center w-full max-w-screen-2xl">
    <div class="w-full md:w-auto flex justify-between items-center gap-3">
      <Logo />
      <div class="md:hidden">
        <UserPanel />
      </div>
    </div>
    <div class="w-full md:flex-1 mt-4 md:mt-0 md:mx-4">
      <Search />
    </div>
    <div class="hidden md:block">
      <UserPanel />
    </div>
  </div>
  <div
    class="flex flex-col md:flex-row items-center w-full max-w-screen-2xl mt-4 max-h-0 motion-safe:transition-all overflow-hidden md:overflow-visible md:max-h-none"
    class:max-h-dvh={$navigationOpen}
  >
    {#if $isMobile}
      {#if !$categoryData.open}
        <button
          onclick={() => {
            $navigationOpen = false;
          }}
          class="w-full h-10 flex items-center justify-end px-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Close
          <XShape />
        </button>
      {:else}
        <button
          onclick={() => {
            $categoryData.open = !$categoryData.open;
            $categoryData.id = 0;
          }}
          class="w-full h-10 flex items-center justify-start px-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <BackArrowShape />
          Back
        </button>
      {/if}
    {/if}
    <div class="flex flex-col md:flex-row w-full pt-2" class:gap-2={!$isMobile}>
      <Category
        id={1}
        category="Kategoria 1"
        subcategories={["Podkategoria 1", "Podkategoria 2"]}
      />
      <Category
        id={2}
        category="Kategoria 2"
        subcategories={["Podkategoria 1"]}
      />
    </div>
  </div>
</nav>
