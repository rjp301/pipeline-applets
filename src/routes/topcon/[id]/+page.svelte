<script lang="ts">
  import type { PageData } from "./$types";
  import Table from "$lib/components/Table.svelte";

  export let data: PageData;

  const data_pts_head = [
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
  ];

  const data_rng_head = [
    "KP_beg",
    "KP_end",
    "area_beg",
    "area_end",
    "area_avg",
    "length",
    "volume",
  ];

  const countDecimals = (num: number) => {
    if (Math.floor(num) === num) return 0;
    return num.toString().split(".")[1].length;
  };

  const displayNumber = (num: number, cutoff: number) => {
    if (countDecimals(num) <= cutoff) return num.toString();
    return num.toFixed(cutoff);
  };

  const displayValue = (value: number | string | null) => {
    if (value === null) return "";
    if (typeof value === "string") return value;
    return displayNumber(value, 2);
  };

</script>

<main class="p-4">
  <div class="flex justify-between items-center">
    <div>
      <h2>{data.topconRun.KP_rng}</h2>
      <span>{new Date(data.topconRun.createdAt)}</span>
    </div>

    <div class="flex gap-2">
      <form method="POST" action="?/delete">
        <button class="btn variant-filled"> Delete </button>
      </form>
      <a
        href={data.topconRunDownloadUrl}
        class="btn variant-filled-primary"
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
  <h3>Point Data</h3>
  <Table columns={data_pts_head} data={data.topconRun.data_pts} />

  <h3>Range Data</h3>
  <Table columns={data_rng_head} data={data.topconRun.data_rng} />
</main>
