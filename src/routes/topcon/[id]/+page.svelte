<script lang="ts">
  import type { PageData } from "./$types";
  import { Table, tableMapperValues } from "@skeletonlabs/skeleton";
  import type { TableSource } from "@skeletonlabs/skeleton";

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

  const tableSourcePts: TableSource = {
    head: data_pts_head,
    body: tableMapperValues(data.topconRun.data_pts, data_pts_head),
  };

  const tableSourceRng: TableSource = {
    head: data_pts_head,
    body: tableMapperValues(data.topconRun.data_rng, data_rng_head),
  };
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
<h3>Point Data</h3>
<Table source={tableSourcePts} />

<h3>Range Data</h3>
<Table source={tableSourceRng} />
