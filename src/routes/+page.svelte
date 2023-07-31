<script lang="ts">
	import { output, markInput, write, clear } from '$lib/terminal/output.store';
	import i18n from '$lib/locales/en.json';
	import { COMMANDS } from '$lib/constants/commands';
	import Shortcuts from '$lib/components/Shortcuts.svelte';

	let input = '';
	let inputRef: HTMLInputElement;
	let outputRef: HTMLDivElement;
	let helpTextVisible = true;

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		// default empty commands to 'help'
		const command = (formData.get('command') as string).toLowerCase() || 'help';

		markInput(command);
		input = '';

		switch (command) {
			case COMMANDS.GITHUB:
			case COMMANDS.GITHUB_SHORT:
				window.open('https://github.com/kestenbok', '_blank');
				break;

			case COMMANDS.SOURCE:
			case COMMANDS.SOURCE_SHORT:
				window.open('https://github.com/kestenbok/kestensite', '_blank');
				break;

			case COMMANDS.ABOUT:
				write(i18n.about);
				break;

			case COMMANDS.EXPERIENCE:
				write(i18n.projects);
				break;

			case COMMANDS.CONTACT:
				write(i18n.contact);
				break;

			case COMMANDS.CLEAR:
				clear();
				break;

			case COMMANDS.HELP:
				write('about             Get to know me better');
				write('experience        Learn about my previous job experience');
				write('contact           Get in touch');
				write('github | gh       Open my GitHub account');
				write("source | src      Check out this site's guts");
				write('clear             Clear the prompt (CTRL + L)');
				break;

			default:
				write(i18n.invalid_command);
				break;
		}
	}
</script>

<Shortcuts />

<div class="container">
	<form on:submit={onSubmit}>
		{#if helpTextVisible}
			<legend>Type 'help' for usage information</legend>
		{/if}

		<div class="prompt-wrapper">
			<span class="prompt">~</span>
			<input bind:value={input} bind:this={inputRef} name="command" />
		</div>
	</form>

	<div class="output" bind:this={outputRef} contenteditable="false" bind:innerHTML={$output} />
</div>

<style>
	input {
		all: unset;
		margin: 0.5em 0em;
		padding: 0;
		background-color: transparent;
		padding: 0.2rem;
		width: 100%;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		-webkit-text-fill-color: #ffffff;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px var(--background);
	}

	input:focus-visible {
		border-bottom: 0.1em solid var(--prompt);
	}

	.output {
		white-space: pre-wrap;
		overflow-y: scroll;
		max-height: 50vh;

		scrollbar-width: none;
	}

	.output::-webkit-scrollbar {
		display: none;
	}

	.prompt {
		position: absolute;
		left: -30px;
		top: 5px;

		font-size: 1.5rem;
		color: var(--prompt);
		box-sizing: border-box;
	}

	.prompt-wrapper {
		position: relative;
	}

	.container {
		width: min(90vw, 800px);
	}
</style>
