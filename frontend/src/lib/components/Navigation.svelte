<script>
  import Search from "./navigation/search.svelte";
  import Logo from "./navigation/logo.svelte";
  import UserPanel from "./navigation/user_panel.svelte";
</script>

<nav class="flex justify-center items-center px-1 py-1 border-b">
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
</nav>
