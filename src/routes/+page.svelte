<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading/Heading.svelte';
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Admin</span>
  </Heading>
  <div class="flex flex-col items-center gap-4">
    <a href="/admin/orders" class="text-blue-500">Orders</a>
    <a href="/admin/reviews" class="text-blue-500">Reviews</a>
  </div>
</div>