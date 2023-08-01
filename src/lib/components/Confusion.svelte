<script>
	import { terminalController } from '$lib/terminal/terminal.store';
</script>

<div class="confusion-container">
	<h2>Huh, now what?</h2>
	<button on:click={terminalController.open}>Open terminal</button>
</div>

<style>
	.confusion-container {
		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: center;
	}

	button {
		margin-top: 0.5rem;
	}
</style>
