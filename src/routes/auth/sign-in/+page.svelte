<script lang="ts">
	import { enhance } from '$app/forms';
  import { page } from '$app/stores';
	export let form;

  // components
  import Heading from '$components/Heading/Heading.svelte';
</script>

<svelte:head>
  <title>Sign In | Noureddine Feathers</title>
  <meta name="description" content="Sign In | Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<div class="flex flex-col items-center gap-4">
  <Heading>
    <span>Sign In</span>
  </Heading>
  {#if $page.data.session}
    <p class="text-center">You are signed in!</p>
  {:else}
    {#if form?.success === true}
      <div class="flex flex-col gap-4 w-60">
        <p class="text-center">{form?.message}</p>
      </div>
    {:else}
      <form method="post" use:enhance class="flex flex-col gap-4 w-60 bg-neutral-100 p-4 rounded-lg">
        <div class="flex flex-col gap-2">
          <label for="email" class={`${form?.success === false ? 'text-red-500' : ''}`}>* Email</label>
          <input
            id="email"
            name="email"
            autoComplete="off"
            value={form?.email ?? ''}
            class={`${form?.success === false ? 'border-red-500' : 'border-white'} p-2 box-border border-2 w-full rounded`}
            placeholder="Email"
          />
        </div>
        {#if form?.success === false}
          <p class="text-red-500">{form?.message}</p>
        {/if}
        <button class="rounded px-4 py-2 bg-blue-500 text-white nf-font-bold disabled:opacity-50">
          Sign In
        </button>
        <p>By signing in, you agree to our <a class="text-blue-500" href="/info/terms-of-service">Terms of Service.</a></p>
      </form>
    {/if}
  {/if}
</div>