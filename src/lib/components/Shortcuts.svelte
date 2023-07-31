<script lang="ts">
	import { clear } from '$lib/terminal/output.store';

	function handleShortcuts(event: KeyboardEvent) {
		if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
			event.preventDefault();
			clear();
		}
	}
</script>

<svelte:window on:keydown={handleShortcuts} />
