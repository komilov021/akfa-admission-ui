import { defineStore } from "pinia";

import request from "@/utils/request";
import type { ExamRecord } from "@/models/backend";

interface SubjectsState {
  subjects: any;
}
export const usesubjectsStore = defineStore("user-subjects", {
  state: (): SubjectsState => ({
    subjects: null as any,
  }),

  actions: {
    async getSubjects() {
      const response = await request.get("/subjects/user-subjects");
      this.subjects = response;
    },
    async updateSubjects(data: any, id: string) {
      await request.post(`/subjects/update-subject-data/${id}`, data);
    },
  },
  getters: {
    isAllExamPassed: (state) =>
      state.subjects?.data?.length > 0 &&
      state.subjects.data?.every((sub: any) => sub.status === "passed"),
  },
});
