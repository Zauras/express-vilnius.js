type IDClientArgs = {
  baseUri?: string;
};

type IClientClass = {
  new (...args: any[]): any; // Constructor signature
  prototype: IDClientArgs;
  instance?: any; // Optional static property to hold the singleton instance
};

export type { IClientClass, IDClientArgs };
