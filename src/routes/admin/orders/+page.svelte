<script lang="ts">
  // components
  import Heading from '$components/Heading/Heading.svelte';

  // interfaces
  import type I_Profile from '$interfaces/I_Profile';

  // stores
  import { profile } from '$stores/ProfileStore';

  // supabase
  import supabase from '$config/supabase';

  // api
  import { getOrders } from '$api/order';

  // state
  let isLoading: boolean = true;
  let currentProfile: I_Profile | undefined = undefined;
  let fulfilledOrders: any;
  let unfulfilledOrders: any;

  profile.subscribe(async (value) => {
    isLoading = true;

    if (value && value.is_admin) {
      const _orders: [] | undefined = await getOrders();

      let _fulfilledOrders: [] = [];
      let _unfulfilledOrders: [] = [];

      if (_orders) {
        _orders.forEach(order => {
          if (order.is_fulfilled) {
            _fulfilledOrders.push(order);
          } else {
            _unfulfilledOrders.push(order);
          }
        });

        _fulfilledOrders.sort((a, b) => a.created_at < b.created_at);
        _unfulfilledOrders.sort((a, b) => a.created_at < b.created_at);

        fulfilledOrders = [..._fulfilledOrders];
        unfulfilledOrders = [..._unfulfilledOrders];
      }
    }

    currentProfile = value;

    isLoading = false;
  });

  supabase
  .channel('public:order')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order' }, payload => unfulfilledOrders = [...unfulfilledOrders, payload.new])
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'order' }, payload => {
    let _fulfilledOrders: [] = [];
    let _unfulfilledOrders: [] = [];

    if (payload.new.is_fulfilled) {
      _fulfilledOrders = [...fulfilledOrders, payload.new];
      _unfulfilledOrders = unfulfilledOrders.filter(order => order.id !== payload.new.id);
    } else {
      _fulfilledOrders = fulfilledOrders.filter(order => order.id !== payload.new.id);
      _unfulfilledOrders = [...unfulfilledOrders, payload.new];
    }

    _fulfilledOrders.sort((a, b) => a.created_at < b.created_at);
    _unfulfilledOrders.sort((a, b) => a.created_at < b.created_at);

    fulfilledOrders = [..._fulfilledOrders];
    unfulfilledOrders = [..._unfulfilledOrders];
  })
  .subscribe()
</script>

<svelte:head>
  <title>Admin Orders | Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<Heading customClass="text-center">
  <span>Admin - Orders</span>
</Heading>
{#if isLoading}
  <p class="text-center">Loading...</p>
{:else if !isLoading && currentProfile && currentProfile.is_admin && fulfilledOrders && unfulfilledOrders}
  <div class="flex flex-col gap-8 m-auto">
    <div class="flex flex-col gap-4">
      <h1>New Orders ({unfulfilledOrders.length})</h1>
      {#if unfulfilledOrders.length === 0}
        <p class="text-gray-500">You have no new orders.</p>
      {:else}
        {#each unfulfilledOrders as order}
          <div class="grid md:grid-cols-3 gap-4 p-4 bg-neutral-100 rounded">
            <div class="self-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
            </div>
            <div class="md:self-center">
              <p class="text-neutral-500">No Tracking ID</p>
            </div>
            <div class="grid md:grid-cols-2 md:self-center md:justify-self-end gap-4">
              <a class="text-blue-500 md:justify-self-end" href={`/admin/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500 md:justify-self-end" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          </div>
        {/each}
      {/if}
    </div>
    <div class="flex flex-col gap-4">
      <h1>Shipped Orders ({fulfilledOrders.length})</h1>
      {#if fulfilledOrders.length === 0}
        <p class="text-gray-500">You have no shipped orders.</p>
      {:else}
        {#each fulfilledOrders as order}
          <div class="grid md:grid-cols-3 gap-4 p-4 bg-neutral-100 rounded">
            <div class="self-center">
              <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
            </div>
            <div class="md:self-center">
              <p class="nf-font-bold">{order.tracking_id}</p>
            </div>
            <div class="grid md:grid-cols-2 md:self-center md:justify-self-end gap-4">
              <a class="text-blue-500 md:justify-self-end" href={`/admin/orders/${order.id}`}>View Order</a>
              <a class="text-blue-500 md:justify-self-end" href={order.stripe_receipt_url} target="_blank" rel="noreferrer">View Receipt</a>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
{/if}