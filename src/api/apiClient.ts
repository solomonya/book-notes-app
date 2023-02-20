import { IRequestParams } from "./model";
const BASE_URL = "http://localhost:3000/api";

export async function apiClient(params: IRequestParams) {
  const url = `${BASE_URL}/${params.endpoint}`;
  const serializedBody = JSON.stringify(params.body);

  const result = await fetch(url, {
    method: params.method,
    body: serializedBody,
  });

  if (!result.ok) throw new Error(result.statusText);

  const returnedData = await result.json();

  return returnedData;
}
