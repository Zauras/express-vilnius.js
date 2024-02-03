import { NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { IReqExpress, IRespExpress } from "#/common/types";

/*
 * Note express need to use json
 * app.use(express.json());
 */
function DValidateBody(type: any): MethodDecorator {
  return function (target: Object, propertyName: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: IReqExpress, res: IRespExpress, next: NextFunction) {
      const input = plainToInstance(type, req.body);
      const errors = await validate(input);
      if (errors.length > 0) {
        res
          .status(400)
          .json({ message: "Validation failed", errors: errors.map(error => error.constraints) });
        return;
      }

      // Proceed with the original method if there are no errors
      return originalMethod.apply(this, [req, res, next]);
    };
  };
}

export { DValidateBody };
