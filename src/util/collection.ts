
export class Collection {
	// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_groupby
	public static groupBy<T>(
		src: Iterable<T>, keyFn: (val: T, index: number) => string | number
	) {
		return [...src].reduce<Record<string, T[]>>((r, v, i) => {
			const k = keyFn(v, i);
			return ((r[k] || (r[k] = [])).push(v), r)
		}, {});
	}
	
	public static* chunk<T>(src: T[], chunk: number) {
		for (let i = 0; i < src.length; i += chunk) {
			const chunked = src.slice(i, i + chunk);
			yield chunked;
		}
	}
}
