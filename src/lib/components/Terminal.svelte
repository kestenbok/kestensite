<script lang="ts">
	import { COMMANDS } from '$lib/constants/commands';
	import { terminalController, terminal } from '$lib/terminal/terminal.store';
	import i18n from '$lib/locales/en.json';

	let input = '';

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		// default empty commands to 'help'
		const command = (formData.get('command') as string).toLowerCase() || 'help';

		terminalController.markInput(command);
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
				terminalController.write(i18n.about);
				break;

			case COMMANDS.EXPERIENCE:
				terminalController.write(i18n.experience);
				break;

			case COMMANDS.CONTACT:
				terminalController.write(i18n.contact);
				break;

			case COMMANDS.CLEAR:
				terminalController.clear();
				break;

			case COMMANDS.WHAT_IM_LOOKING_FOR:
				terminalController.write(i18n.wilf);
				break;

			case COMMANDS.EXIT:
				terminalController.close();
				break;

			case COMMANDS.HELP:
				terminalController.write('about             Get to know me better');
				terminalController.write('experience        Learn about my previous job experience');
				terminalController.write('wilf              ???');
				terminalController.write('contact           Get in touch');
				terminalController.write('github | gh       Open my GitHub account');
				terminalController.write("source | src      Check out this site's guts");
				terminalController.write('clear             Clear the prompt (CTRL + L)');
				break;

			default:
				terminalController.write(i18n.invalid_command);
				break;
		}
	}
</script>

<div class="terminal-container">
	<form on:submit={onSubmit}>
		<legend>Type 'help' for usage information</legend>

		<div class="prompt-wrapper">
			<span class="prompt">~</span>
			<input bind:value={input} name="command" />
		</div>
	</form>

	<div class="output" contenteditable="false" bind:innerHTML={$terminal.output} />
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
		padding: 0 0.5rem;
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

	.terminal-container {
		width: min(90vw, 800px);
	}
</style>
