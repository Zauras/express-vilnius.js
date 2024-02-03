export function DSingleton<TClass extends { new (...args: any[]): {} }>(
  constructor: TClass
): TClass {
  let instance: any;

  // Create a new constructor function that wraps the original constructor.
  const NewConstructor: any = function (...args: any[]) {
    if (!instance) {
      instance = new constructor(...args);
      // Optionally, store the instance on the constructor to allow global access
      NewConstructor._instance = instance;
    }
    return instance as TClass;
  };

  // Copy prototype so instanceof operator still works
  NewConstructor.prototype = constructor.prototype;

  // Return the new constructor function, which now acts as a singleton
  return NewConstructor as TClass;
}
