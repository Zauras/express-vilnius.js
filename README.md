# express-vilnius.js
Meta-framework combining utilities for express.js, axios, class-validator to provide lightweight but classic MVC experience based usage on decorators. 

What if... express.js would have perks of NestJs without DP errors nagging and without unnecessary module boilerplate code..?

[NPM package](https://www.npmjs.com/package/express-vilnius)

Controller usage (receiving requests):
```
import express from "express";
import { registerControllers, HttpStatus,
    DController, DHttpGet, DHttpPost, DValidateBody} from "express-vilnius";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

const app = express();
app.use(express.json());
registerControllers(app, [ExampleController], config={ groupUri: "/api/v1/example-group" });

export class CreateFileDto {
  @IsNotEmpty()
  @Length(2, 100)
  fileName: string;
}

@DController("/example-controller") 
export class ExampleController {
  @DHttpGet("/example-file") 
  // full URL will be: {your-host}/api/v1/example-group/example-controller/example-file
  async getExample(req: IRequest) {
    return {
      data: { name: "test-user" },
      // data, cookies, headers, status - are all optional
    };
  }

  @DHttpPost("/example-file")
  @DValidateBody(CreateFileDto)
  async postExample(req: IRequest): IControllerResp<{ id: string }> {
    return {
      data: { id: "test-file-id" },
      status: 201,
    };
  }
}
```

Client usage (sending requests):
```
import {
  EHttpMethod,
  DClient,
  DSendRequest,
  IReqMethodReturn
} from "express-vilnius"

type ICreateUserInput = {
  name: string;
};

type ICreateUserResult = {
  id: string;
  name: string;
};

@DClient({ baseUri: "/example-user-micro-service" })
export class UserMicroServiceClient {
  @DSendRequest<ICreateUserResult, ICreateUserInput>({
    method: EHttpMethod.Post,
    uri: "/user"
  })
  async createUser(input: ICreateUserInput): IReqMethodReturn<ICreateUserResult, ICreateUserInput> {
    // Prepare the request data and optional headers
    const headers = { "Content-Type": "application/json" };

    return {
      body: input,
      headers,
      responseFn: async ({ id, name }) => ({
        id,
        name,
        processed: true
      })
    };
  }
}
```

If you want to group clients with common settings:
```
import { setupClientsGroup } from "express-vilnius"

setupClientsGroup([UserMicroServiceClient], { uriPrefix: `${user-ms-host}/api/v1` })
```

