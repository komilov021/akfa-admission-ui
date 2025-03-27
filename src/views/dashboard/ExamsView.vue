<template>
  <div
    class="sm:pt-10 py-20 px-4 sm:px-8 md:px-10 xl:px-16"
    v-loading="loading"
  >
    <div
      class="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6"
      v-if="subjectList?.length"
    >
      <div class="flex items-center justify-between">
        <h1
          class="text-[#222529] lg:text-[26px] md:text-[20px] sm:text-[16px] leading-5 sm:leading-[30px] text-[14px] font-semibold sm:line-clamp-1 line-clamp-2"
        >
          {{ subjectList[0].program }}
        </h1>
        <!-- <div 
          class="px-2.5 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 bg-white cursor-pointer hidden rounded-sm sm:rounded-lg"
        >
          <div class="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            <span
              class="text-[#34c759] text-xs sm:text-xs lg:text-sm font-semibold"
            >
              126.6
            </span>
            <span
              class="text-[#222529] text-[8px] sm:text-sm lg:text-base font-semibold leading-3"
            >
              Download the result
            </span>
            <img
              src="../../assets/icons/download.svg"
              class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              alt="Download"
            />
          </div>
        </div> -->
      </div>
      <div
        v-if="transaction?.operation_state === 'SUCCESS'"
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between bg-[#34c759]/10 rounded-lg px-4 sm:px-6 py-4"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#34C759"></InfoCircle>
            <span class="text-[#34c759] text-sm font-medium leading-tight">
              🎉 Congratulations! Your registration and exam payment have been
              successfully completed.</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            We look forward to seeing you on
            {{ formattedExamDate }} at Central Asian University at
            {{ formattedExamTime }}.
          </span>
        </div>
        <div
          class="text-center text-[#222529] cursor-pointer bg-[#fff] px-2 py-2 rounded-md text-xs font-medium sm:font-semibold leading-[14px]"
          @click="checkSubmit"
        >
          Payment receipt
        </div>
      </div>
      <div
        v-if="isAllExamPassed"
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between bg-[#dbecff] rounded-lg px-4 sm:px-6 py-4"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <img src="../../assets/icons/info-circle.svg" alt="" />
            <span class="text-[#007aff] text-sm font-medium leading-tight"
              >Action Required: Get Your Contract First</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            To proceed with the tuition fee payment, you need to first obtain a
            contract.</span
          >
        </div>
        <div class="flex gap-2">
          <div @click="openDialog" class="notification_btn">
            <div
              class="text-center text-[#222529] text-xs font-medium sm:font-semibold leading-[14px]"
            >
              Info
            </div>
          </div>
          <div class="notification_btn">
            <div
              @click="$router.push('contract')"
              class="text-center text-[#222529] text-xs font-medium sm:font-semibold leading-[14px]"
            >
              Submit
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="shouldShowPay"
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between bg-[#ffdcda] rounded-lg px-4 sm:px-6 py-4"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#ff3b30"></InfoCircle>
            <span class="text-[#ff3b30] text-sm font-medium leading-tight"
              >Exam Payment Needed</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            To participate in the exam, please complete the payment of
            {{ formatNumber(amount * 100000) }} UZS.</span
          >
        </div>
        <div class="flex items-center gap-2">
          <div @click="paySubmit" class="notification_btn">
            <h1
              class="text-center text-[#222529] text-xs font-medium leading-[14px]"
            >
              Pay Now
            </h1>
          </div>
        </div>
      </div>

      <subject-form
        v-for="(subject, sub) of subjectList"
        :key="sub"
        :exam-dates="examDates"
        :subjectData="subject"
        @submit="updateForm($event)"
      ></subject-form>
    </div>
    <el-dialog
      v-model="showInfo"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      title="Info"
    >
      <exam-info-form v-if="showInfo"></exam-info-form>
    </el-dialog>
    <el-dialog
      v-model="enterShowInfo"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      title="Info"
    >
      <exam-info-form
        v-if="enterShowInfo"
        :subject-list="subjectList"
        :enterShowInfo="enterShowInfo"
      ></exam-info-form>
    </el-dialog>
    <el-dialog
      v-model="havePaymentStatus"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      title=""
      :show-close="false"
      v-if="
        route.path.slice(1) == 'dashboard/success' ||
        route.path.slice(1) == 'dashboard/failed'
      "
      :before-close="handleClose"
    >
      <div
        v-if="
          route.path.slice(1) == 'dashboard/success' &&
          transaction.operation_state == 'SUCCESS'
        "
        class="flex flex-col justify-center text-center mx-auto"
      >
        <img
          :src="SuccessIcon"
          alt=""
          class="w-[56px] h-[56px] mx-auto flex justify-center items-center mb-2"
        />
        <h2 class="text-[#222529] text-lg font-semibold">Success! 🎉</h2>
        <p class="text-[#757586] text-center font-normal mt-3">
          The payment has been successfully processed!
        </p>
        <el-button
          @click="handleClose"
          class="w-full mt-6 flex items-center justify-center bg-[#F2F2F7] !h-[44px] text-[#222529] text-base"
        >
          Great!
        </el-button>
      </div>
      <div
        v-else-if="
          route.path.slice(1) == 'dashboard/failed' &&
          transaction.operation_state == 'FAILED'
        "
        class="flex flex-col justify-center text-center mx-auto"
      >
        <img
          src="../../assets/images/failedPayment.png"
          width="45"
          class="mx-auto flex justify-center items-center"
          alt=""
        />
        <h2 class="text-[#222529] text-lg font-semibold">Failed!</h2>
        <p class="text-[#757586] text-center font-normal mt-3">
          The payment was not processed, please try again
        </p>
        <el-button
          class="w-2/3 mt-6 mx-auto flex items-center justify-center bg-[#F2F2F7] !h-[44px] text-[#222529] text-base"
          @click="handleClose"
        >
          Continue
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { InfoCircle } from "@/components/icons";
import ExamInfoForm from "./components/ExamInfoForm.vue";
import SubjectForm from "./components/SubjectForm.vue";
import PaymentForm from "./components/PaymentForm.vue";
import SuccessIcon from "@/assets/images/success_icon.svg";
import { useExamDatesStore, usePaymentStore, useUsersStore } from "@/stores";
import { usesubjectsStore } from "@/stores/subject";
import { ref, reactive, computed, onMounted, watch, watchEffect } from "vue";
import { getShowInfo, setShowInfo } from "@/utils/cookies";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { dayjs } from "element-plus";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const route = useRoute();
const router = useRouter();
const store = usesubjectsStore();
const examStore = useExamDatesStore();
const userStore = useUsersStore();
const havePaymentStatus = ref(false);
const paymentStore = usePaymentStore();
const urlPay = computed(() => paymentStore.pay?.paymentRedirectUrl || "");
const transaction = computed(() => paymentStore.transaction);
const loading = ref(false);
const showInfo = ref(false);
const enterShowInfo = ref(false);
const successModal = ref(false);
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const amount = ref(0);
const subjectList = computed(() => store.subjects?.data);
const subjects = computed(() => store.subjects);
const isAllExamPassed = computed(() => store.isAllExamPassed);
const checkNullData = computed(() =>
  store.subjects?.data.every(
    (subject: any) =>
      subject.certificate === null &&
      subject.exam_date_id === null &&
      subject.exam_type == null
  )
);

const examDates = reactive<{ offline: any[]; online: any[] }>({
  offline: [],
  online: [],
});
const subjectWithExamDate = computed(() => {
  return (
    subjectList.value?.find((subject: any) => subject.exam_date_id) || null
  );
});
const formattedExamDate = computed(() => {
  return subjectWithExamDate.value?.exam_at
    ? dayjs.utc(subjectWithExamDate.value.exam_at).local().format("DD.MM.YYYY")
    : "";
});
const formattedExamTime = computed(() => {
  return subjectWithExamDate.value?.exam_at
    ? dayjs.utc(subjectWithExamDate.value.exam_at).format("HH:mm")
    : "";
});
const formatNumber = (value: any) =>
  new Intl.NumberFormat("ru-RU").format(value);

const shouldShowPay = computed(() => {
  if (!subjectList.value || subjectList.value?.length === 0) return false;
  if (transaction.value?.operation_state === "SUCCESS") return false;
  const allHaveExamDate = subjectList.value?.every(
    (subject: any) => !!subject.exam_date_id
  );
  const atLeastOneHasExamDate = subjectList.value?.some(
    (subject: any) => !!subject.exam_date_id
  );
  const atLeastOneApproved = subjectList.value?.some(
    (subject: any) => subject.certificate_status === "approved"
  );
  return allHaveExamDate || (atLeastOneHasExamDate && atLeastOneApproved);
});

const checkSubmit = () => {
  if (transaction.value?.data?.receiptUrl) {
    window.location.href = transaction.value.data.receiptUrl;
  } else {
    console.error("Receipt URL not found!");
  }
};

watch(windowWidth, (width) => {
  isDesktop.value = width >= 768;
});

watch(
  () => checkNullData.value,
  (newPath) => {
    if (
      newPath &&
      subjects.value.status !== "residency" &&
      route.path !== "/dashboard/success" &&
      route.path !== "/dashboard/failed" &&
      transaction.value?.status !== "PAYED"
    ) {
      enterShowInfo.value = true;
    } else {
      enterShowInfo.value = false;
    }
  }
);
watch(
  () => isAllExamPassed.value,
  (newPath) => {
    if (newPath) {
      const hasShownInfo = getShowInfo();
      if (isAllExamPassed.value && !hasShownInfo) {
        showInfo.value = true;
        setShowInfo("is_show_info_true");
      } else {
        showInfo.value = false;
      }
    }
  }
);
const handleClose = () => {
  successModal.value = false;
  router.push("/");
  localStorage.removeItem("hasShownSuccessModal");
};
const showPaymentModal = () => {
  const hasShownModal = localStorage.getItem("hasShownSuccessModal");
  if (
    transaction.value?.operation_state == "SUCCESS" &&
    route.path.slice(1) == "dashboard/success" &&
    !hasShownModal
  ) {
    havePaymentStatus.value = true;
    localStorage.setItem("hasShownSuccessModal", "true");
  } else if (
    route.path.slice(1) == "dashboard/failed" &&
    transaction.value?.operation_state == "SUCCESS"
  ) {
    havePaymentStatus.value = true;
  } else {
    havePaymentStatus.value = false;
    return;
  }
};
onMounted(async () => {
  const currentYear = dayjs().year();
  const nextYear = currentYear + 1;
  examStore
    .examDateList("offline", `${currentYear}-${nextYear}`)
    .then((data) => (examDates.offline = data));
  // examStore.examDateList("online").then((data) => (examDates.online = data));
  const hasShownInfo = getShowInfo();
  await paymentStore.getTransaction();
  if (isAllExamPassed.value && !hasShownInfo) {
    showInfo.value = true;
    setShowInfo("is_show_info_true");
  } else {
    showInfo.value = false;
  }
  showPaymentModal();
  if (
    checkNullData.value &&
    subjects.value.status !== "residency" &&
    route.path !== "/dashboard/success" &&
    route.path !== "/dashboard/failed" &&
    transaction.value?.operation_state !== "SUCCESS" &&
    transaction.value?.operation_state !== "FAILED"
  ) {
    enterShowInfo.value = true;
  } else {
    enterShowInfo.value = false;
  }
});
const paySubmit = async () => {
  if (!amount.value || amount.value === 0) {
    return;
  }
  try {
    loading.value = true;
    await paymentStore.payForSubject({
      amount: amount.value,
      operationType: "EXAM",
    });
    if (urlPay.value) {
      window.location.href = urlPay.value;
    }
    loading.value = false;
  } catch (error) {
    console.error("Pay for subject error:", error);
    loading.value = false;
  }
};

const updateForm = async (data: any) => {
  try {
    loading.value = true;
    let paylod: any = {
      exam_date_id: data.exam_date_id ? data.exam_date_id : undefined,
      certificate: data.certificate ? data.certificate : undefined,
    };
    if (data.updateStatus) {
      paylod.status = null;
    }
    await store.updateSubjects(paylod, data.id);
    await store.getSubjects();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
const openDialog = () => {
  showInfo.value = true;
};
watchEffect(() => {
  if (subjectList.value?.length === 0) {
    amount.value = 0;
    return;
  }
  const hasAtLeastOneExamDate = subjectList.value?.some(
    (subject: any) => subject.exam_date_id
  );
  const hasApprovedCertificate = subjectList.value?.some(
    (subject: any) => subject.certificate_status === "approved"
  );
  if (hasAtLeastOneExamDate && hasApprovedCertificate) {
    amount.value = 1;
    return;
  }
  const countExamDateIds = subjectList.value?.filter(
    (subject: any) => subject.exam_date_id
  ).length;
  const allHaveExamDate = countExamDateIds === subjectList.value?.length;
  amount.value = allHaveExamDate ? countExamDateIds : 0;
});
watch(transaction, (newTransaction) => {
  const hasShownModal = localStorage.getItem("hasShownSuccessModal");
  if (newTransaction?.operation_state === "SUCCESS" && !hasShownModal) {
    successModal.value = true;
    localStorage.setItem("hasShownSuccessModal", "true");
  }
});
</script>
