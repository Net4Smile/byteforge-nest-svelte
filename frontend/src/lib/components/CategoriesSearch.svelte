<script lang="ts">
  let queryParams = $derived(
    Object.fromEntries(new URLSearchParams(location.search))
  );
</script>

{console.log({ params, location })}

<p>{JSON.stringify({ params, location })}</p>
