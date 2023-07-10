<script lang="ts">
  import { page } from '$app/stores';

  // components
  import Heading from '$components/Heading/Heading.svelte';

  // api
  import { updateOrder } from '$api/order';
  import { getOrders } from '$api/order';
  import { getOrderProducts } from '$api/order-product';

  // helpers
  import { formatPackage } from '$helpers/helpers';

  // supabase
  import supabase from '$config/supabase';

  // state
  let isLoading: boolean = true;
  let order: any;
  let orderProducts: any;
  let trackingId: string = '';

  page.subscribe(async (value) => {
    isLoading = true;

    if (value && value.is_admin) {
      const _orders: [] | undefined = await getOrders({ id: $page.params.id });
      const _orderProducts: any = await getOrderProducts({ order_id: $page.params.id });

      order = _orders[0];
      orderProducts = [..._orderProducts];
    }

    isLoading = false;
  });

  supabase
  .channel('public:order')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'order' }, payload => order = payload.new)
  .subscribe()
</script>

<svelte:head>
  <title>Admin Order | Noureddine Feathers</title>
  <meta name="description" content="Noureddine Feathers - Shop premium ostrich feather dusters, premium extendable lambswool dusters, premium lambswool dusters, ostrich feathers, and ostrich eggshells - handmade from 100% natural farm-raised ostrich feathers and eggshells" />
</svelte:head>

<Heading customClass="text-center">
  <span>Admin - Order</span>
</Heading>
{#if isLoading}
  <p class="text-center">Loading...</p>
{:else if !isLoading && $page.data.profile && $page.data.profile.is_admin && order && orderProducts}
  <div class="flex flex-col gap-8 m-auto">
    <div class="flex flex-col gap-4">
      <div>
        <p class="nf-font-bold">Date</p>
        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(order.created_at))}</p>
      </div>
      <div>
        <p class="nf-font-bold">Shipping Address</p>
        <p>{order.shipping_address_line1}</p>
        {#if order.shipping_address_line2}
          <p>{order.shipping_address_line2}</p>
        {/if}
        <p>{order.shipping_address_city}, {order.shipping_address_state}, {order.shipping_address_country} {order.shipping_address_postal_code}</p>
      </div>
      <div>
        <p class="nf-font-bold">Receipt</p>
        <a href={order.stripe_receipt_url} class="text-blue-500" target="_blank" rel="noreferrer">View Receipt</a>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <p class="nf-font-bold">Products ({orderProducts.length})</p>
      {#each orderProducts as orderProduct}
        <div class="bg-neutral-100 rounded p-4 flex flex-col gap-4">
          <div>
            <p class="nf-font-bold">Category</p>
            <p>{orderProduct.stripe_product_id.name}</p>
          </div>
          <div>
            <p class="nf-font-bold">Color</p>
            <p>{orderProduct.stripe_product_id.color}</p>
          </div>
          {#if orderProduct.stripe_product_id.size}
            <div>
              <p class="nf-font-bold">Size</p>
              <p>{orderProduct.stripe_product_id.size} {orderProduct.stripe_product_id.size_unit}</p>
            </div>
          {/if}
          <div>
            <p class="nf-font-bold">Package</p>
            <p>{formatPackage(orderProduct.stripe_price_id.quantity)}</p>
          </div>
          <div>
            <p class="nf-font-bold">Quantity</p>
            <p>{orderProduct.quantity}</p>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <p class="nf-font-bold">Shipped By</p>
        <p>Canada Post</p>
      </div>
      <div>
        <p class="nf-font-bold">Shipping Service</p>
        <p>Registered Mail</p>
      </div>
      {#if order.is_fulfilled}
        <div>
          <p class="nf-font-bold">Tracking ID</p>
          <p>{order.tracking_id}</p>
        </div>
      {:else}
        <div class="flex flex-col gap-2 bg-neutral-100 rounded p-4">
          <label for="tracking-id">* Tracking ID</label>
          <input
            id="tracking-id"
            type="text"
            autoComplete="off"
            bind:value={trackingId}
            class={`p-2 box-border w-full rounded`}
            placeholder="Tracking ID"
          />
        </div>
      {/if}
      {#if !order.is_fulfilled}
        <button
          class="px-4 py-2 bg-green-500 text-white rounded nf-font-bold disabled:opacity-50"
          type="button"
          on:click={async () => await updateOrder(order.id, { is_fulfilled: true, tracking_id: trackingId })}
          disabled={trackingId === ''}
        >
          Complete Order
        </button>
      {/if}
      <!-- {#if order.is_fulfilled}
        <button
          class="px-4 py-2 bg-red-500 text-white rounded nf-font-bold"
          type="button"
          on:click={async () => await updateOrder(order.id, { is_fulfilled: !order.is_fulfilled })}
        >
          Unfulfill
        </button>
      {:else}
        <button
          class="px-4 py-2 bg-green-500 text-white rounded nf-font-bold"
          type="button"
          on:click={async () => await updateOrder(order.id, { is_fulfilled: !order.is_fulfilled })}
        >
          Fulfill
        </button>
      {/if} -->
    </div>
  </div>
{:else}
  <Heading customClass="text-center">
    <span>404 Not Found</span>
  </Heading>
  <p class="text-center">Woops! We could not find what you were looking for.</p>
{/if}