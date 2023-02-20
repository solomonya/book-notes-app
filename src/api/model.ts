const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export interface IRequestParams {
  method: keyof typeof HttpMethods;
  body: Record<string, any>;
  headers?: Record<string, string>;
  endpoint: string;
}
