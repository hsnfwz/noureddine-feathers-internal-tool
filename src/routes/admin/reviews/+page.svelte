<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading/Heading.svelte';

  // state
  let reviews: [] = [];
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Admin - Reviews</span>
  </Heading>
  <div class="flex flex-col gap-4">
    {#if reviews.length === 0}
      <p class="text-gray-500">You have no reviews.</p>
    {:else}
      {#each reviews as review}
        <div class="flex gap-4 p-4 bg-neutral-100 rounded"></div>
      {/each}
    {/if}
  </div>
</div>