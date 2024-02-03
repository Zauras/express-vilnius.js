// Updated registerControllers function to support method-specific decorators
import { Application, RequestHandler } from "express";

/**
 * Usage:
 *       const app = express();
 *       app.use(express.json());
 *       registerControllers(app, [ExampleController]);
 */
export function registerControllers(app: Application, controllers: any[]) {
  controllers.forEach(Controller => {
    const instance = new Controller();
    const basePath: string = Reflect.getMetadata("path", Controller) || "";

    const routes: Array<{ method: string; path: string; handlerName: string | symbol }> =
      Reflect.getMetadata("routes", Controller) || [];

    routes.forEach(route => {
      const fullPath = basePath + route.path;

      (app as any)[route.method](
        fullPath,
        (instance[route.handlerName] as RequestHandler).bind(instance)
      );

      console.log(`Registered route: ${route.method.toUpperCase()} ${fullPath}`);
    });
  });
}
