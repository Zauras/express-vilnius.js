import axios from "axios";

import { EHttpMethod } from "../../utils";

function DRequest(config: { method: EHttpMethod; path: string }) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const url = `${this.baseUri}${config.path}`;
      try {
        const result = await axios[config.method](url, ...args);
        return originalMethod.apply(this, [result.data]);
      } catch (error) {
        console.error(`Error making ${config.method.toUpperCase()} request to ${url}:`, error);
        throw error; // or handle error as needed
      }
    };
  };
}

export { DRequest };
