<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import type { PageData } from "./$types";
  import { goto, invalidateAll, invalidate } from "$app/navigation";

  export let data: PageData;
</script>

<div class="flex justify-between items-center">
  <div>
    <h2>Ditch Volume Calculation - {data.topconRun.KP_rng}</h2>
    <p>{new Date(data.topconRun.createdAt)}</p>
  </div>

  <div class="flex gap-2">
    <form method="POST" action="?/delete">
      <button class="bg-gray-500 px-8 py-2 text-white rounded shadow font-bold">
        Delete
      </button>
    </form>
    <a
      href={data.topconRunDownloadUrl}
      class="bg-red-500 px-8 py-2 text-white rounded shadow font-bold"
      download
    >
      Download Excel
    </a>
  </div>
</div>
<br />
<div class="text-lg font-bold text-red-500">
  Total Volume: {Math.round(data.topconRun.total_volume)} m<sup>3</sup>
</div>
<div>Width Bottom: {data.topconRun.width_bot}m</div>
<div>Slope: {data.topconRun.slope}:1</div>
<details>
  <summary> Point Data</summary>
  <Table
    columns={[
      "num",
      "x",
      "y",
      "z",
      "desc",
      "chainage",
      "slope",
      "width_bot",
      "width_top",
      "area",
    ]}
    data={data.topconRun.data_pts}
  />
</details>

<details>
  <summary>Range Data</summary>
  <Table
    columns={[
      "KP_beg",
      "KP_end",
      "area_beg",
      "area_end",
      "area_avg",
      "length",
      "volume",
    ]}
    data={data.topconRun.data_rng}
  />
</details>
