type Objecttype = Record<string, unknown>;

export function merge<T extends Objecttype, U extends Objecttype>(
	target: T,
	source: U
): T & U {
	for (const key of Object.keys(source)) {
		const targetValue = target[key];
		const sourceValue = source[key];
		if (this.isObject(targetValue) && this.isObject(sourceValue)) {
			Object.assign(sourceValue, this.merge(targetValue, sourceValue));
		}
	}

	return { ...target, ...source };
}
