<template>
  <div class="sm:pt-10 py-20 px-4 sm:px-8 md:px-10 xl:px-16">
    <div class="flex items-center justify-between mb-4">
      <h1
        class="text-[#222529] lg:text-[32px] md:text-[24px] sm:text-[20px] leading-5 sm:leading-none text-[20px] font-semibold"
      >
        Contract
      </h1>

      <div
        v-if="getTask?.contract_status == 'success'"
        class="px-2.5 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-3 bg-white rounded-sm sm:rounded-lg cursor-not-allowed flex items-center gap-3"
        :disabled="true"
      >
        <img
          src="../../assets/icons/download.svg"
          class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          alt=""
        />
        <span
          class="text-[#222529] text-[8px] sm:text-sm lg:text-base font-semibold"
          >Review the contract</span
        >
      </div>
    </div>
    <div
      v-if="!getTask?.contract_status"
      class="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6"
    >
      <div
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
        <div
          class="h-[30px] px-3 py-2 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] border border-white justify-center items-center gap-1.5 inline-flex overflow-hidden hover:opacity-80 cursor-pointer"
          @click="showDialog"
        >
          <div
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="getTask?.contract_status == 'success'"
      class="flex flex-col gap-y-4 sm:gap-y-6"
    >
      <div
        class="card flex flex-col gap-y-6"
        v-if="contracts?.status == 'online' || contracts?.status == 'offline'"
      >
        <div class="flex items-center justify-between">
          <h4 class="text-[#222529] text-[20px] font-semibold">
            Request for contract
          </h4>
          <span>{{ todayDate }}</span>
        </div>
        <div
          class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between bg-[#dbecff] rounded-lg px-4 sm:px-6 py-4"
        >
          <div class="flex flex-col text-start gap-y-1">
            <span class="flex items-center gap-2">
              <img src="../../assets/icons/info-circle.svg" alt="" />
              <span class="text-[#007aff] text-sm font-medium leading-tight"
                >🎉 Congratulations! Your documents have been accepted. ✅</span
              >
            </span>
            <span class="text-[#222529] text-sm font-normal leading-tight">
              Please wait for the scheduled date to sign your contract.</span
            >
          </div>
        </div>
      </div>
      <div
        class="card flex flex-col gap-y-6"
        v-if="
          contracts?.status == 'waiting_for_payment' ||
          contracts?.status == 'payed' ||
          contracts?.status == 'enrolled'
        "
      >
        <div>
          <h1
            class="text-[#222529] text-lg sm:text-xl md:text-2xl font-semibold"
          >
            {{ formatCurrency(contracts?.payed) }}
          </h1>
          <div class="flex items-center gap-3 py-2">
            <el-progress
              class="w-1/4"
              :show-text="false"
              :percentage="progress25"
            />
            <el-progress
              class="w-full"
              :show-text="false"
              :percentage="progressTotal"
            />
          </div>
          <div class="flex justify-between">
            <h1 class="text-primary text-sm sm:text-base font-semibold">
              25%
              <span
                class="text-primary text-sm sm:text-base font-semibold ml-2"
                >{{ formatCurrency(contracts?.payment_25) }}</span
              >
            </h1>
            <h1 class="text-[#222529] text-sm sm:text-base font-semibold">
              {{ formatCurrency(contracts?.total_fee) }}
            </h1>
          </div>
          <div class="bg-[#34c759]/10 rounded-lg px-4 sm:px-6 py-4 mt-6">
            <div
              v-if="contracts?.status == 'payed'"
              class="flex items-center gap-2"
            >
              <InfoCircle stroke="#34C759"></InfoCircle>
              <span class="text-[#34c759] text-sm font-medium leading-tight">
                🎉 Congratulations! Your paid {{ paymentPercentage }}% of the
                tuition fee ✅</span
              >
            </div>
            <div
              v-else-if="contracts?.status == 'enrolled'"
              class="flex items-start gap-2"
            >
              <InfoCircle stroke="#34C759"></InfoCircle>
              <span class="text-[#34c759] text-sm font-medium leading-tight">
                🎉 Congratulations! You’re officially a student at Central Asian
                University(CAU) in Tashkent!<br />
                You’ve been admitted to
                {{ contracts?.school }}, {{ contracts.program }}. Wishing you a
                great journey ahead! 🚀
              </span>
            </div>
            <div v-else class="flex flex-col text-start gap-y-1">
              <span class="flex items-center justify-start gap-2">
                <InfoCircle stroke="#34C759"></InfoCircle>
                <span class="text-[#34c759] text-sm font-medium leading-tight">
                  🎉 Congratulations! Your contract has been signed. ✅</span
                >
              </span>
              <span class="text-[#222529] text-sm font-normal leading-tight">
                To proceed with enrollment, please make a payment of at least
                25% of tuition fee.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6">
      <div class="card flex flex-col gap-y-6">
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-y-2">
            <h1 class="text-[#222529] text-xl font-semibold">
              Request for contract
            </h1>
            <p class="text-neutralGray text-base font-normal">
              {{ dayjs(getTask?.created_at).format("DD.MM.YYYY") }}
            </p>
          </div>
          <div>
            <el-tag
              v-if="getTask?.contract_status == 'in_review'"
              type="danger"
              class="!border-[#007AFF] !text-[#007AFF]"
              effect="plain"
              round
              >In review</el-tag
            >
            <el-tag
              v-else
              type="danger"
              class="!border-[#FF3B30] !text-[#FF3B30]"
              effect="plain"
              round
              >Rejected</el-tag
            >
          </div>
        </div>
        <div
          class="h-11 px-5 py-3.5 bg-white rounded-lg shadow-[0px_2px_6px_0px_rgba(16,24,40,0.06)] cursor-pointer active:opacity-60 hover:opacity-80 border border-neutral-200 justify-center items-center gap-2 flex text-center text-[#222529] text-base font-semibold leading-[18px"
          v-if="getTask?.contract_status !== 'in_review'"
          @click="showDialog"
        >
          Resend the request
        </div>
      </div>
    </div>
    <el-dialog
      v-model="showModal"
      class="details"
      :show-close="false"
      :style="isDesktop ? { maxWidth: '836px' } : { width: '356px' }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h1
            class="text-left !text-nowrap text-[#222529] text-md sm:text-lg md:text-2xl font-semibold !line-clamp-[1]"
          >
            {{
              activeStep == 1
                ? "Check your personal details"
                : "Type of contract signing"
            }}
          </h1>
          <div class="md:w-[144px] w-[74px]">
            <el-steps class="details-stepper" :active="activeStep">
              <el-step
                v-for="(item, index) of Array.from({ length: 2 })"
                :key="index"
              />
            </el-steps>
          </div>
        </div>
      </template>
      <div v-if="activeStep == 1">
        <DetailsForm
          :accordion="true"
          :is-read-only="false"
          :initial-data="getTask"
          @cancel="closeDialog"
          @next="handleNextStep"
        />
      </div>
      <div v-else>
        <div>
          <div class="card sm:!py-4 !py-2 flex justify-between items-center">
            <div class="flex items-center sm:gap-4 gap-2">
              <img src="../../assets/icons/word.svg" alt="" />
              <span>Contract sample</span>
            </div>
            <div
              class="h-[35px] px-2 sm:px-4 sm:py-2 py-1 bg-white rounded-lg cursor-not-allowed shadow-[0px_2px_6px_0px_rgba(16,24,40,0.06)] border border-neutral-200 justify-start items-center gap-2.5 flex hover:opacity-70"
            >
              <div class="text-center text-[#222529] text-sm font-semibold">
                Download the sample
              </div>
            </div>
          </div>
          <div class="mt-4">
            <SelectableCard
              v-for="(type, index) in contractTypes"
              :key="index"
              :title="type"
              :value="type"
              :modelValue="contractType"
              @update:modelValue="selectContractType(type)"
            />
          </div>
          <div class="grid sm:grid-cols-2 items-center gap-4">
            <el-button class="w-full !bg-transparent !h-[44px]" @click="prev"
              ><span>Cancel</span></el-button
            >
            <el-button
              class="!h-[44px]"
              @click="submitForm"
              :disabled="!contractType"
              type="primary"
              >Confirm</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <div
      class="absolute top-0 bottom-0 left-0 right-0"
      v-loading="loading"
      v-if="loading"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import DetailsForm from "./components/DetailsForm.vue";
import { useApplicationStore } from "@/stores";
import { dayjs, ElMessage } from "element-plus";
import SelectableCard from "@/components/common/SelectableCard.vue";
import InfoCircle from "@/components/icons/InfoCircle.vue";
const applicationStore = useApplicationStore();
const showModal = ref(false);
const loading = ref(false);
const contracts = computed(() => applicationStore.contract);
const getTask = computed(() => applicationStore.taskByUser);
const contractType = ref<string | null>(null) as any;
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const activeStep = ref(1);
const contractTypes = ["Location CAU"] as any; //"Online",
const todayDate = dayjs().format("DD.MM.YYYY");
const progress25 = computed(() => {
  if (!contracts.value?.payed || !contracts.value?.payment_25) return 0;
  return Math.min(
    (contracts.value.payed / contracts.value.payment_25) * 100,
    100
  );
});
const paymentPercentage = computed(() => {
  if (!contracts.value?.total_fee || contracts.value?.total_fee === 0) return 0;
  return ((contracts.value.payed / contracts.value.total_fee) * 100).toFixed(0);
});
const progressTotal = computed(() => {
  if (progress25.value < 100) return 0;
  const remainingAmount = contracts.value.payed - contracts.value.payment_25;
  const remainingTotal = contracts.value.total_fee - contracts.value.payment_25;
  return Math.min((remainingAmount / remainingTotal) * 100, 100);
});
const prev = () => {
  if (activeStep.value > 1) {
    activeStep.value--;
  } else {
    showModal.value = false;
  }
};
const fetchList = async () => {
  await applicationStore.getTaskByUser();
  if (getTask.value?.contract_status === "success") {
    await applicationStore.getContract();
  }
};
const selectContractType = (type: string) => {
  contractType.value = type;
};
const formatCurrency = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
};
const formatPhoneNumber = (phone: string) =>
  phone?.replaceAll(/\s|\(|\)|\+/g, "");
const formData = ref({} as any);
const handleNextStep = (data: any) => {
  formData.value = { ...data };
  activeStep.value = 2;
};

const submitForm = async () => {
  if (!contractType.value) {
    alert("Please select a contract type.");
    return;
  }
  const data = {
    ...formData.value,
    date_of_birth: dayjs(formData.value.date_of_birth).format("YYYY-MM-DD"),
    first_phone_number:
      "998" + formatPhoneNumber(formData.value.first_phone_number),
    second_phone_number:
      "998" + formatPhoneNumber(formData.value.second_phone_number),
    contract_type: contractType.value,
  };
  try {
    await applicationStore.createApplecantForm(data);
    ElMessage.success("Form submitted successfully!");
    fetchList();
    showModal.value = false;
  } catch (error) {
    console.error("Error submitting form:", error);
    ElMessage.error("Failed to submit form.");
  }
};
const showDialog = () => {
  showModal.value = true;
};
const closeDialog = () => {
  showModal.value = false;
};

onMounted(async () => {
  await fetchList();
  checkContractStatus();
});
const checkContractStatus = () => {
  if (getTask.value?.contract_status == null) {
    showModal.value = true;
  } else {
    showModal.value = false;
  }
};
watch(windowWidth, (width) => {
  isDesktop.value = width >= 768;
});
watch(
  () => getTask.value?.contract_status,
  () => checkContractStatus()
);
</script>

<style scoped></style>
