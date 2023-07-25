<script lang="ts">
	export let columns: string[];
	export let data: any[];
	export let caption: string | undefined = undefined;

	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$components/ui/table';
	import CardTitle from './ui/card/CardTitle.svelte';

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

<div>
	{#if caption}<strong>{caption}</strong>{/if}
	<Table>
		<TableHeader class="uppercase">
			<TableRow>
				{#each columns as column}
					<TableHead>{column}</TableHead>
				{/each}
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as row}
				<TableRow>
					{#each columns as column}
						<TableCell class="px-2 py-1 text-sm">
							{displayValue(row[column])}
						</TableCell>
					{/each}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
