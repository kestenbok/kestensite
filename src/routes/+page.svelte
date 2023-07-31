<script lang="ts">
	import { terminal } from '$lib/terminal/terminal.store';

	import Shortcuts from '$lib/components/Shortcuts.svelte';
	import Terminal from '$lib/components/Terminal.svelte';
	import Confusion from '$lib/components/Confusion.svelte';
</script>

<Shortcuts />

{#if $terminal.isOpen}
	<Terminal />
{:else}
	<Confusion />
{/if}
