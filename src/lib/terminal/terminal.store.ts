import { writable } from 'svelte/store';

export const terminal = writable({
	output: '',
	isOpen: true
});

export const terminalController = {
	write,
	markInput,
	clear,
	open,
	close
};

function open() {
	terminal.update((current) => ({ ...current, isOpen: true }));
}

function close() {
	clear();
	terminal.update((current) => ({ ...current, isOpen: false }));
}

function clear() {
	terminal.update((current) => ({ ...current, output: '' }));
}

function write(line: string) {
	terminal.update((current) => ({ ...current, output: (current.output += `${line}\n`) }));
}

function markInput(input: string) {
	terminal.update((current) => ({
		...current,
		output: (current.output += `\n> ${input}\n\n`)
	}));
}
