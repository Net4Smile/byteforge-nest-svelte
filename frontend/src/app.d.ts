// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface String {
		/**
		 * Capitalizes the first letter of a string
		 * @returns The string with the first letter capitalized
		 */
		capitalize(): string;
	}
}

export { };
