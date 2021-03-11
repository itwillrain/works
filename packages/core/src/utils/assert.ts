export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected 'value' to be defined, but received ${value}`);
  }
}

export function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError(`Expected value to be Number type, but received ${typeof value} type`);
  }
}

export function assertIsString(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError(`Expected value to be String type, but received ${typeof value} type`);
  }
}
