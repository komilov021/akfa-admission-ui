import { defineStore } from "pinia";

import request from "@/utils/request";

interface ExamDatesState {
  examType: {
    exam_at: string;
    exam_type: string;
    id: string;
    location: string;
  }[];
}

export const useExamDatesStore = defineStore("exam-dates", {
  state: (): ExamDatesState => ({
    examType: null as any,
  }),

  actions: {
    async examDateList(exam_type: string,year_id:string) {
      const response = await request.post("/exam/date/list", { exam_type ,year_id});
      this.examType = response;
      return response;
    },
  },

  getters: {
    getExamType: (state): any[] =>
      state.examType?.map((type: any) => ({
        value: type.id,
        label: type.exam_type,
      })),
  },
});
