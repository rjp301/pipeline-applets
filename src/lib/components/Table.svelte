<script lang="ts">
	export let columns: string[];
	export let data: any[];
	export let caption: string | undefined = undefined;

	const countDecimals = (num: number) => {
		if (Math.floor(num) === num) return 0;
		return num.toString().split('.')[1].length;
	};

	const displayNumber = (num: number, cutoff: number) => {
		if (countDecimals(num) <= cutoff) return num.toString();
		return num.toFixed(cutoff);
	};

	const displayValue = (value: number | string | null) => {
		if (value === null) return '';
		if (typeof value === 'string') return value;
		return displayNumber(value, 2);
	};
</script>

<div class="table-container rounded-none">
	<table class="table table-compact table-hover rounded-none">
		{#if caption}
			<caption class="text-left font-bold mb-2">{caption}</caption>
		{/if}
		<thead class="uppercase">
			{#each columns as column}
				<th scope="col">{column}</th>
			{/each}
		</thead>
		<tbody class="text-sm">
			{#each data as row}
				<tr class="border-t">
					{#each columns as column}
						<td class="px-2 py-1 text-sm text-center">
							{displayValue(row[column])}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
