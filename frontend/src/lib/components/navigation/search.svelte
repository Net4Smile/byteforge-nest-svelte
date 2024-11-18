<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import MagnifyingGlass from "../../../assets/magnifying-glass.svg";
  import { navigationOpen } from "$lib/stores/shared";
</script>

<div class="w-full flex flex-row justify-center gap-1">
  <button
    class="md:hidden h-10 w-14 flex justify-center p-1"
    aria-label="Expand categories"
    onclick={() => ($navigationOpen = !$navigationOpen)}
  >
    <span class="hamburger" class:open={$navigationOpen}></span>
  </button>
  <div
    class="w-full md:flex-grow flex flex-col lg:max-w-lg md:flex-row gap-2 md:gap-0 bg-slate-100 rounded-md overflow-clip"
  >
    <Input
      type="search"
      placeholder="Wyszukaj..."
      class="w-full md:rounded-none bg-transparent placeholder:text-gray-600"
    />
    <div class="w-full md:w-auto hidden md:block">
      <Select.Root selected={{ value: "all", label: "Wszędzie" }}>
        <Select.Trigger class="w-full md:w-40 md:rounded-none  bg-transparent">
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">Wszędzie</Select.Item>
          <Select.Item value="dark">Kategoria 1</Select.Item>
          <Select.Item value="system">Kategoria 2</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  </div>
  <Button class="mt-0 md:ml-2">
    <img src={MagnifyingGlass} alt="" class="h-full aspect-auto w-4" />
  </Button>
</div>

<style lang="postcss">
  .hamburger {
    @apply h-1 w-full max-w-10 bg-[#333] rounded-sm relative cursor-pointer self-center block motion-safe:transition-all;
  }

  .hamburger::before,
  .hamburger::after {
    content: "";
    @apply h-1 w-full max-w-10 bg-[#333] rounded-sm absolute top-0 left-0 motion-safe:transition-all;
  }

  .hamburger::after {
    top: 10px;
  }

  .hamburger::before {
    top: -10px;
  }

  .hamburger.open {
    @apply bg-transparent;
  }

  .hamburger.open::before {
    top: 0;
    transform: rotate(45deg);
  }

  .hamburger.open::after {
    top: 0;
    transform: rotate(-45deg);
  }
</style>
