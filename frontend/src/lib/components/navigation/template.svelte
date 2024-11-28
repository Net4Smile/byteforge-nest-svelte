<script lang="ts">
  import Search from "./components/search.svelte";
  import Logo from "./components/logo.svelte";
  import UserPanel from "./components/user_panel.svelte";
  import { categoryData, navigationOpen } from "$lib/stores/shared.svelte";
  import Category from "../category";
  import type { NavigationProps } from "./index";
  import { cn } from "$lib/utils/utils";
  import { BackButton, CloseButton } from "./components/buttons";

  let { ...props }: NavigationProps = $props();
</script>

<nav
  class="flex flex-col justify-center items-center px-1 pt-1 border-b z-[9999] sticky top-0"
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
      <Category
        id={1}
        category="Category 1"
        subcategories={[
          "Subcategory 1",
          "Subcategory 2",
          "Subcategory 3",
          "Subcategory 4",
        ]}
      />
      <Category
        id={2}
        category="Category 2"
        subcategories={["Subcategory 1"]}
      />
    </div>
  </div>
</nav>
