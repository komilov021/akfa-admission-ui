<template>
  <div>
    <div
      v-loading="!subjectList"
      class="flex flex-col justify-center items-center absolute h-full w-full"
    >
      <div ref="lottieContainer" class="w-[347px] h-[347px]"></div>
      <div class="flex flex-col gap-4 justify-center max-w-[594px]">
        <h2
          class="justify-center flex items-center text-center font-bold text-xl text-[#222529]"
        >
          Congratulations! <br />
          You have successfully registered. 🎉
        </h2>
        <p class="text-center text-[#757586] text-base">
          The exam dates will be announced soon. As soon as they are available,
          you will receive a notification on your phone or email.   Stay tuned
          for updates, and good luck with your preparation!
        </p>
      </div>
    </div>
    <el-dialog
      v-model="showInfo"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      title="Info"
    >
      <ExamInfoForm
        v-if="showInfo"
        :subject-list="subjectList"
        :enter-show-info="!isAllExamPassed"
      ></ExamInfoForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ExamInfoForm from "./components/ExamInfoForm.vue";
import { onMounted, ref, computed, watch } from "vue";
import lottie from "lottie-web";
import animationData from "@/assets/animation/congratulations.json";
import { usesubjectsStore } from "@/stores";

const store = usesubjectsStore();
const lottieContainer = ref(null);
const showInfo = ref(false);
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const subjectList = computed(() => store.subjects.data);
const isAllExamPassed = computed(() => store.isAllExamPassed);
watch(
  () => subjectList.value,
  (newPath) => {
    if (newPath) {
      showInfo.value = true;
    } else {
      showInfo.value = false;
    }
  }
);
watch(windowWidth, (width) => {
  isDesktop.value = width >= 768;
});

onMounted(() => {
  // if (subjectList.value) {
  //   showInfo.value = true;
  // } else {
  //   showInfo.value = false;
  // }
  if (lottieContainer.value) {
    lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }
});
</script>
