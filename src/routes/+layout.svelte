<script lang="ts">
  // styles
  import './styles.css';

  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  let { supabase, session, profile } = data;
  $: ({ supabase, session, profile } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<main class="bg-white min-h-screen">
  <div class="flex flex-col gap-4 m-4">
    <slot />
  </div>
</main>