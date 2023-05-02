<script lang="ts">
  import { page } from "$app/stores";
  import { AppShell, AppRail, AppBar } from "@skeletonlabs/skeleton";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar><h1>Topcon Ditch Volume Calculation</h1></AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <a href={`/topcon`}>
      <div class:font-bold={$page.url.pathname == "/topcon"}>
        ➕ New Calculation
      </div>
    </a>
    {#each data.topconRuns as run}
      <a href={`/topcon/${run.id}`}>
        <div class:font-bold={$page.url.pathname.includes(`/topcon/${run.id}`)}>
          {run.KP_rng}
        </div>
      </a>
    {/each}
  </svelte:fragment>
  <slot />
</AppShell>
