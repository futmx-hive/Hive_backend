export interface imageGen {
	generateImage<T = any>(prompt: string): Promise<any>;
}
