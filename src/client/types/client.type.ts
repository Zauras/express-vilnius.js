type IClientClass = {
  new (...args: any[]): any; // Constructor signature
  prototype: {
    baseUri?: string; // baseUri might be optional on the prototype
  };
  instance?: any; // Optional static property to hold the singleton instance
};

export type { IClientClass };
