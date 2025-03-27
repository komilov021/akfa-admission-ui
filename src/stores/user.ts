import type {
  ILoginInfo,
  IUser,
  IAcceptInvite,
  IResetInvite,
  ISigninForm,
  ListData,
  ICountryCodes,
  ISigninVerify,
  IRegister,
  IRegisterApplication,
} from "@/models/backend";
import { defineStore } from "pinia";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setCode,
} from "@/utils/cookies";
import request from "@/utils/request";

interface UserState {
  token?: string;
  user: IUser | null;
  countryCodes: ICountryCodes[] | null;
  users: ListData<IUser[]>;
  registerData: IRegisterApplication | null;
  forgotPsw: IRegisterApplication | null;
}
interface VerifyOtp {
  code: string;
  otp: string;
}

export const useUsersStore = defineStore("users", {
  state: (): UserState => ({
    token: getAccessToken() || "",
    user: null,
    countryCodes: null,
    registerData: null as any,
    users: {
      page: 1,
      limit: 30,
      total: 0,
      data: [],
    },
    forgotPsw: null as any,
  }),

  actions: {
    async login(loginInfo: ILoginInfo) {
      const response = await request.post("/auth/login-applicant", loginInfo);
      this.token = response.access_token;
      setAccessToken(response.access_token);
    },

    async register(data: IRegister) {
      const response = await request.post("/auth/register-applicant-v2", data);
      if (response.token) {
        this.token = response.token.access_token;
        setAccessToken(response.token.access_token);
      }
      this.registerData = response;
    },
    async resendForm(resendData: { code: string }) {
      return request.post("/auth/resend-otp", resendData);
    },
    async verifyOtp(verifyForm: VerifyOtp) {
      const response = await request.post("/auth/verify-otp", verifyForm);
      this.token = response.access_token;
      setAccessToken(response.access_token);
    },
    async forgotPassword(data: any) {
      const response = await request.post(
        "/auth/applicant-forgot-password",
        data
      );
      this.forgotPsw = response;
    },
    async forgotVerifyPassword(data: any) {
      return request.post(
        "/auth/applicant-verify-otp-for-reset-password",
        data
      );
    },
    async countryCode() {
      const countryCode = await request.post("/country/list");
      this.countryCodes = countryCode;
    },

    async getUserInfo() {
      const user = await request.post("/auth/get-user");

      this.user = user;
    },
    async getNewToken(user_id: string) {
      const response = await request.post("/auth/get-token", { user_id });
      this.token = response.access_token;
      setAccessToken(response.access_token);
    },

    resetToken() {
      removeAccessToken();
      removeRefreshToken();
      this.token = "";
      this.user = null;
    },
  },

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
});
