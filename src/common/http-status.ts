type IResponseStatusGroup = Record<string, number>;

type IHttpStatus = {
  Info: IResponseStatusGroup;
  Success: IResponseStatusGroup;
  Redirect: IResponseStatusGroup;
  ClientError: IResponseStatusGroup;
  ServerError: IResponseStatusGroup;
};

export const HttpStatus: IHttpStatus = {
  Info: {
    CONTINUE_100: 100,
    SWITCH_PROTOCOL_101: 101,
    PROCESSING_102: 102,
    EARLY_HITS_103: 103
  },
  Success: {
    OK_200: 200,
    CREATED_201: 201,
    ACCEPTED_202: 202,
    NON_AUTH_INFO_203: 203,
    NO_CONTENT_204: 204,
    RESET_CONTENT_205: 205,
    PARTIAL_CONTENT_206: 206,
    MULTI_STATUS_207: 207,
    ALREADY_REPORTED_208: 208,
    IM_USED_226: 226
  },
  Redirect: {
    MULTI_CHOICE_300: 300,
    MOVED_PERMANENTLY: 301,
    FOUND_302: 302,
    SEE_OTHER_303: 303,
    NOT_MODIFIED_304: 304,
    USE_PROXY_305: 305,
    TEMPORARY_REDIRECT_307: 307,
    PERMANENT_REDIRECT_308: 308
  },
  ClientError: {
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    PAYMENT_REQUIRED_402: 402,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    METHOD_NOT_ALLOWED_405: 405,
    NOT_APPLICABLE_406: 406,
    PROXY_AUTH_REQUIRED_407: 407,
    REQUEST_TIMEOUT_408: 408,
    CONFLICT_409: 409,
    GONE_410: 410,
    LENGTH_REQUIRED_411: 411,
    PRECONDITION_FAILED_412: 412,
    PAYLOAD_TOO_LARGE_413: 413,
    URI_TOO_LONG_414: 414,
    UNSUPPORTED_MEDIA_TYPE_415: 415,
    RANGE_NOT_SATISFIABLE_416: 416,
    EXPECTATION_FAILED_417: 417,
    I_AM_TEAPOT_418: 418,
    MISDIRECTED_REQUEST_421: 421,
    UNPROCESSABLE_ENTITY_422: 422,
    LOCKED_423: 423,
    FAILED_DEPENDENCY_424: 424,
    TOO_EARLY_425: 425,
    UPGRADE_REQUIRED_426: 426,
    PRECONDITION_REQUIRED_428: 428,
    TOO_MANY_REQUEST_429: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE_431: 431,
    UNAVAILABLE_LEGAL_REASONS_451: 451
  },
  ServerError: {
    INTERNAL_500: 500,
    NOT_IMPLEMENTED_501: 501,
    BAD_GATEWAY_502: 502,
    SERVICE_UNAVAILABLE_503: 503,
    GATEWAY_TIMEOUT_504: 504,
    BAD_HTTP_VERSION_505: 505,
    VARIANT_ALSO_NEGOTIATES_506: 506,
    INSUFFICIENT_STORAGE_507: 507,
    LOOP_DETECTED_508: 508,
    NOT_EXTENDED_510: 510,
    NETWORK_AUTH_REQUIRED_511: 511
  }
};
