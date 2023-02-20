import { apiClient } from "@/api/apiClient";
import { useState } from "react";
import { IRequestParams } from "./model";

interface IMutationState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: null | unknown;
}

type TMutationReturn = [(params: IRequestParams) => Promise<any>, IMutationState];

const initialMutationState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
};

export const useMutation = (): TMutationReturn => {
  const [mutationState, setMutationState] = useState<IMutationState>(initialMutationState);

  const mutationCall = async (params: IRequestParams) => {
    try {
      setMutationState((oldState) => ({ ...oldState, isLoading: true }));
      await apiClient(params);
    } catch (e) {
      setMutationState((oldState) => ({ ...oldState, error: e, isError: true }));
    } finally {
      setMutationState((oldState) => ({ ...oldState, isLoading: false }));
    }
  };

  return [mutationCall, mutationState];
};
