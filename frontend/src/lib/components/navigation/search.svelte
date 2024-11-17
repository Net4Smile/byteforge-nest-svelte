<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import MagnifyingGlass from "../../../assets/magnifying-glass.svg";
  // TODO: search functionality
</script>

<div class="w-full flex flex-col md:flex-row justify-center">
  <div
    class="w-full md:flex-grow flex flex-col lg:max-w-lg md:flex-row gap-2 md:gap-0"
  >
    <Input
      type="search"
      placeholder="Wyszukaj..."
      class="w-full md:rounded-r-none"
    />
    <div class="w-full md:w-auto">
      <Select.Root selected={{ value: "all", label: "Wszędzie" }}>
        <Select.Trigger class="w-full md:w-40 md:rounded-l-none">
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
  <Button class="mt-2 md:mt-0 md:ml-2">
    <img src={MagnifyingGlass} alt="" class="h-full aspect-auto w-4" />
  </Button>
</div>
