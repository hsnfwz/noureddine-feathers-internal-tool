<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading/Heading.svelte';
</script>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Unauthorized</span>
  </Heading>
  <p>You are unauthorized to access this website because you are not an admin.</p>
</div>