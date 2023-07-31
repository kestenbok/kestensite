import { writable } from 'svelte/store';

export const output = writable('');

export function clear() {
	output.set('');
}

export function write(line: string) {
	output.update((current) => (current += `${line}\n`));
}

export function markInput(input: string) {
	output.update((current) => (current += `\n> ${input}\n\n`));
}
