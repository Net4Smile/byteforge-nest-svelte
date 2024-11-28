<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar";
  import * as Avatar from "$lib/components/ui/avatar";
  import HeartFavorite from "$assets/heart-favorite.svg";
  import ShoppingCart from "$assets/shopping-cart.svg";
</script>

<Menubar.Root class="h-full w-full flex items-center border-0">
  <Menubar.Menu>
    <Menubar.Trigger class="h-full">
      <Avatar.Root class="max-lg:h-7 max-lg:w-7 h-8 w-8">
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>SC</Avatar.Fallback>
      </Avatar.Root>
    </Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>New Tab</Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger class="h-full">
      <div class="relative flex max-lg:h-6 max-lg:w-6 h-7 w-7">
        <img src={HeartFavorite} alt="" class="w-full h-full" />
      </div>
    </Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>New Tab</Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger class="h-full">
      <div class="relative flex max-lg:h-6 max-lg:w-6 h-7 w-7">
        <img src={ShoppingCart} alt="" class="w-full h-full" />
      </div>
    </Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>New Tab</Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
