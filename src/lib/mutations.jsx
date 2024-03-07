import { useMutation } from "@tanstack/react-query";
import { privateLoginApi } from "./loginApi";

export const useLogin = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateLoginApi
        .post(`/v1/auth/login`, payload)
        .then(({ data }) => data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("success");
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateLoginApi
        .post(`/v1/auth/password-reset`, payload)
        .then(({ data }) => data);
    },
    onError: (error) => {
      console.log(error
      );
    },
    onSuccess: () => {
      console.log("success");
    },
  });

export const useAddPassword = () =>
  useMutation({
    mutationFn: (payload) => {
      return privateLoginApi
        .post(`/v1/auth/password-set`, payload)
        .then(({ data }) => data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("success");
    },
  });
