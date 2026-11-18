/**
 * Polyfills for older iOS Safari WebKit (iPhone 8 / iPhone X / iPhone XS Max running iOS 12 - 16.7)
 * Ensures modern ES2022-ES2024 methods used by dependencies (such as pdfjs-dist or Array helpers) never throw runtime errors.
 */

// 1. Promise.withResolvers (ES2024 - added in Safari 17.4, missing on iOS 16 and earlier such as iPhone 8 & iPhone X)
if (typeof (Promise as any).withResolvers !== 'function') {
  (Promise as any).withResolvers = function withResolvers<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

// 2. Array.prototype.at & String.prototype.at (added in Safari 15.4)
if (typeof Array.prototype.at !== 'function') {
  Object.defineProperty(Array.prototype, 'at', {
    value: function at(index: number) {
      const len = this.length;
      const relativeIndex = Math.trunc(index) || 0;
      const k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
      if (k < 0 || k >= len) return undefined;
      return this[k];
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

if (typeof String.prototype.at !== 'function') {
  Object.defineProperty(String.prototype, 'at', {
    value: function at(index: number) {
      const len = this.length;
      const relativeIndex = Math.trunc(index) || 0;
      const k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
      if (k < 0 || k >= len) return undefined;
      return this.charAt(k);
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// 3. Array.prototype.findLast (added in Safari 15.4)
if (typeof (Array.prototype as any).findLast !== 'function') {
  Object.defineProperty(Array.prototype, 'findLast', {
    value: function findLast(predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any) {
      for (let i = this.length - 1; i >= 0; i--) {
        const val = this[i];
        if (predicate.call(thisArg, val, i, this)) {
          return val;
        }
      }
      return undefined;
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// 4. Array.prototype.toSorted (added in Safari 16.0)
if (typeof (Array.prototype as any).toSorted !== 'function') {
  Object.defineProperty(Array.prototype, 'toSorted', {
    value: function toSorted(compareFn?: (a: any, b: any) => number) {
      return [...this].sort(compareFn);
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// 5. Object.hasOwn (added in Safari 15.4)
if (typeof (Object as any).hasOwn !== 'function') {
  (Object as any).hasOwn = function hasOwn(obj: object, prop: PropertyKey) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

// 6. String.prototype.replaceAll (added in Safari 13.4)
if (typeof String.prototype.replaceAll !== 'function') {
  Object.defineProperty(String.prototype, 'replaceAll', {
    value: function replaceAll(searchValue: string | RegExp, replaceValue: any) {
      if (searchValue instanceof RegExp) {
        if (!searchValue.global) {
          throw new TypeError('replaceAll must be called with a global RegExp');
        }
        return this.replace(searchValue, replaceValue);
      }
      return this.split(searchValue).join(typeof replaceValue === 'function' ? replaceValue(searchValue) : replaceValue);
    },
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

// 7. structuredClone fallback (added in Safari 15.4)
if (typeof (globalThis as any).structuredClone !== 'function') {
  (globalThis as any).structuredClone = function structuredCloneFallback(val: any) {
    if (val === null || typeof val !== 'object') return val;
    if (val instanceof Uint8Array) return new Uint8Array(val);
    if (ArrayBuffer.isView(val)) {
      const ctor = val.constructor as any;
      return new ctor(val.buffer.slice(val.byteOffset, val.byteOffset + val.byteLength));
    }
    if (val instanceof ArrayBuffer) return val.slice(0);
    return JSON.parse(JSON.stringify(val));
  };
}

// 8. crypto.randomUUID fallback (added in Safari 15.4 & requires secure context)
if (typeof crypto !== 'undefined' && typeof crypto.randomUUID !== 'function') {
  (crypto as any).randomUUID = function randomUUIDFallback() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

export {};
