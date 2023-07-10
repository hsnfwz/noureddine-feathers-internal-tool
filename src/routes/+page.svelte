<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading/Heading.svelte';
</script>

{#if $page.data.profile && $page.data.profile.is_admin}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Admin</span>
    </Heading>
    <div class="flex flex-col items-center gap-4">
      <a href="/admin/orders" class="text-blue-500">Orders</a>
      <a href="/admin/reviews" class="text-blue-500">Reviews</a>
    </div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>403 Forbidden</span>
  </Heading>
{/if}