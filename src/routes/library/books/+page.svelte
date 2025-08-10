<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";

  let { data } = $props();
</script>

<div class="container mx-auto py-10">
  <h1 class="text-2xl font-bold mb-6">Library Books</h1>
  <DataTable data={data.books} {columns} />
</div>
