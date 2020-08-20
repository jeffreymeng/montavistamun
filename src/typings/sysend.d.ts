declare module "sysend" {
	function broadcast(name: string, object: any): void;

	function on(
		name: string,
		callback: (object: any, name: string) => void
	): void;

	function off(
		name: string,
		callback?: (object: any, name: string) => void
	): void;

	function proxy(url: string): void;
}
