<script lang="ts">
  import Search from "./navigation/search.svelte";
  import Logo from "./navigation/logo.svelte";
  import UserPanel from "./navigation/user_panel.svelte";
  import { navigationOpen } from "$lib/stores/shared";
</script>

<nav class="flex flex-col justify-center items-center px-1 py-1 border-b">
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
    class="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-2xl mt-4 max-h-0 motion-safe:transition-all overflow-hidden md:max-h-none"
    class:max-h-lvh={$navigationOpen}
  >
    <div class="w-full md:w-auto flex justify-between items-center gap-3">
      Kategoria 1
    </div>
  </div>
</nav>
