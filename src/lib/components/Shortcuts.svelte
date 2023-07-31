<script lang="ts">
	import { terminalController } from '$lib/terminal/terminal.store';

	function handleShortcuts(event: KeyboardEvent) {
		if (keyIs(event.key, 'l') && event.ctrlKey) {
			event.preventDefault();
			terminalController.clear();
		}

		if (keyIs(event.key, 't') && event.ctrlKey) {
			event.preventDefault();
			terminalController.open();
		}

		if (keyIs(event.key, 'q') && event.ctrlKey) {
			event.preventDefault();
			terminalController.close();
		}
	}

	function keyIs(key: string, is: string) {
		return key.toLowerCase() === is;
	}
</script>

<svelte:window on:keydown={handleShortcuts} />
