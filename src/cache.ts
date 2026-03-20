// src/cache.ts
export class SimpleCache<T> {
	private store = new Map<string, T>()

	set(id: string, value: T): void {
		this.store.set(id, value)
	}

	get(id: string): T | undefined {
		return this.store.get(id)
	}

	has(id: string): boolean {
		return this.store.has(id)
	}

	delete(id: string): boolean {
		return this.store.delete(id)
	}

	clear(): void {
		this.store.clear()
	}
}
