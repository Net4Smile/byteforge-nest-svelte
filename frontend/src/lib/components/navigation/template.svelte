<script lang="ts">
  import Search from "./components/search.svelte";
  import Logo from "./components/logo.svelte";
  import UserPanel from "./components/user_panel.svelte";
  import { categoryData, navigationOpen } from "$lib/stores/shared.svelte";
  import Category from "../category";
  import type { NavigationProps } from "./index";
  import { cn } from "$lib/utils/utils";
  import { BackButton, CloseButton } from "./components/buttons";

  let { categories, ...props }: NavigationProps = $props();
</script>

<nav
  class="flex flex-col justify-center items-center px-1 pt-1 border-b z-[9999] sticky top-0 bg-white"
>
  <div class="flex flex-col md:flex-row items-center w-full max-w-screen-2xl">
    <div
      class="w-full md:w-auto flex justify-between md:justify-start items-center gap-3"
    >
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
    class={cn(
      "flex flex-col md:flex-row items-center w-full max-w-screen-2xl mt-4 md:mt-0 overflow-hidden",
      "md:overflow-visible md:max-h-none transition-[max-height]",
      { "max-h-0 md:max-h-dvh": !$navigationOpen, "max-h-dvh": $navigationOpen }
    )}
  >
    <div class="md:hidden w-full">
      {#if !$categoryData.open}
        <CloseButton />
      {:else}
        <BackButton />
      {/if}
    </div>
    <div class="flex flex-col md:flex-row w-full pt-2 gap-2">
      {#each categories as category}
        <Category id={category.id} {category} />
      {/each}
    </div>
  </div>
</nav>
