import { defineStore } from "pinia";

import request from "@/utils/request";
import type {
  IApplicantKanbans,
  IapplicantProgramSchools,
  IContractInfo,
  ICreateApplecantForm,
  ICreateApplecantKanban,
  IGetTaskByUser,
} from "@/models/backend";

interface ApplicationState {
  applicantKanbans: IApplicantKanbans;
  applicantProgramSchools: IapplicantProgramSchools[];
  contract: IContractInfo;
  taskByUser: IGetTaskByUser;
}

export const useApplicationStore = defineStore("application", {
  state: (): ApplicationState => ({
    applicantKanbans: null as any,
    applicantProgramSchools: null as any,
    contract: {
      id: "",
      program: "",
      payed: 0,
      total_fee: 0,
      payment_25: 0,
      status: "",
      school: "",
    },
    taskByUser: null as any,
  }),

  actions: {
    async listApplecantKanban(data: { kanbanType: string }) {
      const response = await request.post("/kanban/applicant-kanbans", data);
      this.applicantKanbans = response;
    },
    async listApplecantProgramSchool(data: any) {
      const response = await request.post(
        "/program/list-with-schools-and-programs-v2",
        data
      );
      this.applicantProgramSchools = response;
      return response;
    },
    async createApplecantKanban(data: ICreateApplecantKanban) {
      return request.post("/tasks/update-create-task-kanban-name", data);
    },
    async getContract() {
      const response = await request.get("/tasks/get-contract");
      this.contract = response;
    },
    async createApplecantForm(data: any) {
      return request.post("/tasks/update-task-by-user", data);
    },
    async getTaskByUser() {
      const response = await request.get("/tasks/get-task-by-user");
      this.taskByUser = response;
    },
  },
});
