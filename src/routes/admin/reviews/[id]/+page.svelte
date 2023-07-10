<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // state
  let isLoading: boolean = true;
  let currentProfile: I_Profile | undefined = undefined;

  profile.subscribe(async (value) => {
    isLoading = true;
    
    currentProfile = value;

    isLoading = false;
  });
</script>

<svelte:head>
  <title>Admin Review | Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

{#if isLoading}
  <p class="text-center">Loading...</p>
{:else if !isLoading && currentProfile && currentProfile.is_admin}
  <div class="flex flex-col items-center gap-4">
    <Heading>
      <span>Admin - Review</span>
    </Heading>
    <div class="flex flex-col gap-4"></div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
{/if}