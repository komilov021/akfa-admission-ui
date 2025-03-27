import { defineStore } from "pinia";

import request from "@/utils/request";

interface IPaymentState {
  pay: any;
  transaction: any;
}

export const usePaymentStore = defineStore("payment", {
  state: (): IPaymentState => ({
    pay: null as any,
    transaction: null as any,
  }),
  actions: {
    async payForSubject(data: any) {
      const response = await request.post("/tasks/pay-for-subjects", data);
      this.pay = response;
    },
    async getTransaction() {
      const response = await request.get("/tasks/get-transaction-by-user");
      this.transaction = response;
    },
  },
});
