import {
  DController,
  DHttpPost,
  DValidateBody,
  HttpStatus,
  IReqExpress,
  IRespExpress
} from "../../src";
import { CreateUserDto } from "./dto";

@DController("/example-folder")
export class ExampleController {
  @DHttpPost("/example-file")
  @DValidateBody(CreateUserDto)
  postExample(_req: IReqExpress, _resp: IRespExpress) {
    return {
      status: HttpStatus.Success.CREATED_201
    };
  }
}
