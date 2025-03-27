<template>
  <div
    class="flex flex-col mx-auto items-center justify-center w-full h-full pt-[100px]"
  >
    <div class="flex flex-col gap-4 justify-center">
      <div class="mx-auto flex justify-center items-center">
        <el-steps style="width: 256px" class="" :active="contactStep">
          <el-step
            v-for="(item, index) of Array.from({ length: 3 })"
            :key="index"
          />
        </el-steps>
      </div>
      <div class="flex flex-col gap-8">
        <div class="mx-auto justify-center items-center gap-2">
          <h1
            class="text-center font-bold text-[24px] md:text-[32px] leading-[32px] md:leading-[44px]"
          >
            {{
              contactStep === 1
                ? "Contact information"
                : contactStep === 2
                ? "Select Your Study Program"
                : ruleForm.status == "residency"
                ? "Residency programs"
                : "Undergraduate programs"
            }}
          </h1>
          <p class="text-center text-[#757586] text-base font-normal">
            {{
              contactStep === 1
                ? "Enter your details to complete your account registration"
                : "Choose your wished study direction"
            }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col w-full sm:w-[450px] lg:w-[450px] mx-auto mt-2 md:mt-4"
    >
      <transition name="fade" mode="out-in">
        <div :key="contactStep">
          <el-form
            @keyup.enter="handleEnterKey"
            @submit.prevent="submitForm(ruleFormRef)"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            :hide-required-asterisk="false"
            label-position="top"
            require-asterisk-position="right"
          >
            <div v-if="contactStep === 1">
              <StepOneForm
                v-model="ruleForm"
                @on-submit="goToStep(2)"
                @on-cancel="navigateToLogin"
                :data="current_user || { is_foreign: false }"
              />
            </div>
            <div v-if="contactStep === 2">
              <SelectableCard
                v-for="(item, index) in listKanban"
                :key="index"
                :icon="FileIcon"
                :title="item.name"
                :value="item.id"
                :modelValue="ruleForm.direction"
                @update:modelValue="selectDirection"
                :groupName="item.name"
              />
              <div class="my-[40px] flex items-center gap-2 justify-center">
                <el-button
                  class="w-full !h-[44px] !bg-transparent"
                  @click="goBackStep"
                  >Previous</el-button
                >
                <el-button
                  class="w-full !h-[44px]"
                  type="primary"
                  :disabled="!ruleForm.direction"
                  @click="goToStep(3)"
                  >Confirm</el-button
                >
              </div>
            </div>
            <div v-if="contactStep === 3">
              <div class="grid gap-y-4">
                <!-- <pre>{{ programs[ruleForm.status] }}</pre> -->
                <el-select
                  v-model="ruleForm.school_name"
                  placeholder="Select"
                  size="large"
                  class="w-full"
                  clearable
                  @clear="remove('school')"
                >
                  <el-option
                    v-for="item in programs[ruleForm.status] || []"
                    :key="item.school_title"
                    :label="item.school_title"
                    @click="selectSchool(item)"
                    :value="item.school_title"
                  />
                </el-select>
                <el-select
                  v-model="ruleForm.program"
                  placeholder="Select"
                  size="large"
                  clearable
                  @clear="remove('program')"
                  popper-class="w-[350px] sm:w-[450px] overflow-hidden"
                >
                  <el-option
                    v-for="item in selectedSchool?.programs"
                    class="w-full"
                    :key="item?.id"
                    :label="item.program"
                    :value="item?.program"
                    @click="selectProgram(item?.id)"
                  />
                </el-select>
              </div>
              <div class="my-[40px] flex items-center gap-2 justify-center">
                <el-button
                  class="w-full !h-[44px] !bg-transparent"
                  @click="goBackStep"
                  :disabled="isSubmitting"
                  >Previous</el-button
                >
                <el-button
                  class="w-full !h-[44px]"
                  type="primary"
                  :loading="isSubmitting"
                  :disabled="
                    !ruleForm.program_id ||
                    !ruleForm.school_name ||
                    isSubmitting
                  "
                  @click="submitForm(ruleFormRef)"
                  >Confirm</el-button
                >
              </div>
            </div>
          </el-form>
        </div>
      </transition>
    </div>
    <!-- <el-dialog v-model="showModal" title="Get Info" width="50%">
            <div v-if="showModal">
                <p class="text-center">Here is more information about {{ ruleForm.direction }}.</p>
                <div class="flex justify-center">
                    <el-button @click="closeModal" type="primary">Close</el-button>
                </div>
            </div>
        </el-dialog> -->

    <el-dialog
      v-model="isSubmitting"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      class="!bg-[#fff]"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="flex flex-col justify-center text-center mx-auto">
        <img
          :src="SuccessIcon"
          alt=""
          class="w-[56px] h-[56px] mx-auto flex justify-center items-center mb-2"
        />
        <h2 class="text-[#222529] text-lg font-semibold">
          We are processing your request
        </h2>
        <p class="text-[#757586] text-center font-normal mt-1">
          Please wait a moment. Do not reload the page – the process will be
          completed soon!
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useApplicationStore, useUsersStore } from "@/stores";
import { dayjs, type FormInstance } from "element-plus";
import { FileIcon } from "@/components/icons";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import SelectableCard from "@/components/common/SelectableCard.vue";
import StepOneForm from "./components/ContactStep/StepOneForm.vue";
import SuccessIcon from "@/assets/images/success_icon.svg";
const i18n = useI18n();
const router = useRouter();
const store = useUsersStore();
const applicantStore = useApplicationStore();
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const searchProgram = ref<string>("");
// const listKanban = computed(() => applicantStore.applicantKanbans);
const listKanban = computed(() => {
  const kanbans = applicantStore.applicantKanbans;
  return Array.isArray(kanbans) ? kanbans.filter((item) => item.is_active) : [];
});
// const programSchool = computed(() => applicantStore.applicantProgramSchools);
const current_user = computed(() => store.user);
const data = { kanbanType: "applications" };
const contactStep = ref(1);
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const selectedSchool = ref(null as any);
interface Program {
  id: string;
  program: string;
}
interface School {
  school_title: string;
  programs: Program[];
}
const isSubmitting = ref(false);
const programs = reactive<{ undergraduate: School[]; residency: School[] }>({
  undergraduate: [],
  residency: [],
});
const ruleForm = reactive<{
  name: string;
  surname: string;
  passport_number: string;
  birth_date: string;
  gender: string;
  direction: string;
  program_id: string;
  program: string;
  status: "undergraduate" | "residency";
  school_name: string;
}>({
  name: "",
  surname: "",
  passport_number: "",
  birth_date: "",
  gender: "",
  direction: "",
  program_id: "",
  program: "",
  status: "" as any,
  school_name: "",
});

const selectSchool = (school: School) => {
  selectedSchool.value = school;
  searchProgram.value = "";
};

const selectProgram = (programId: string) => {
  ruleForm.program_id = programId;
};

const selectDirection = (id: string) => {
  const selected = listKanban.value.find((item) => item.id === id);
  if (selected) {
    ruleForm.direction = selected.id;
    ruleForm.status = selected.status;
  }
};
const rules = ref({
  name: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: ["blur"],
    },
  ],
  surname: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: ["blur"],
    },
  ],
  birth_date: [
    {
      required: true,
      message: "Please enter your birth date",
      trigger: ["blur", "change"],
    },
  ],
  gender: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: ["change"],
    },
  ],
  passport_number: current_user.value?.is_foreign
    ? []
    : [
        {
          required: true,
          message: "Please input your passport number",
          trigger: "blur",
        },
        {
          pattern: /^[A-Z]{2}\d{7}$/,
          message:
            "Passport number must follow the format AA 9999999 (2 uppercase letters followed by digits)",
          trigger: "blur",
        },
      ],
});
function navigateToLogin() {
  store.resetToken();
  router.push("/login");
}
const handleEnterKey = () => {
  if (contactStep.value === 1) {
    if (
      ruleForm.name &&
      ruleForm.surname &&
      (current_user.value?.is_foreign || ruleForm.passport_number) &&
      ruleForm.birth_date
    ) {
      goToStep(2);
    }
  } else if (contactStep.value === 2) {
    if (ruleForm.direction) {
      goToStep(3);
    }
  } else if (contactStep.value === 3) {
    submitForm(ruleFormRef.value);
  }
};

const goToStep = (step: number) => {
  if (step === 2) {
    if (
      ruleForm.name &&
      ruleForm.surname &&
      (current_user.value?.is_foreign || ruleForm.passport_number) &&
      ruleForm.birth_date
    ) {
      contactStep.value = step;
    }
  }
  if (step === 3) {
    if (ruleForm.direction) {
      contactStep.value = step;
    }
  }
};
const goBackStep = () => {
  if (contactStep.value > 1) {
    contactStep.value--;
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        isSubmitting.value = true;
        const data = {
          name: ruleForm.name,
          surname: ruleForm.surname,
          passport_id: ruleForm.passport_number,
          date_of_birth: dayjs(ruleForm.birth_date).format("YYYY-MM-DD"),
          gender: ruleForm.gender,
          kanban_id: ruleForm.direction,
          program_id: ruleForm.program_id,
        };
        await applicantStore.createApplecantKanban(data);
        await store.getNewToken(current_user.value?.id as string);
        await store.getUserInfo();
        router.push("/dashboard");
      } catch (error: any) {
        console.log("error", error.message);
        isSubmitting.value = false;
        loading.value = false;
      }
    }
  });
};

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", preventRefresh);
});

const preventRefresh = (event: BeforeUnloadEvent) => {
  if (isSubmitting.value) {
    event.preventDefault();
    event.returnValue =
      "Please wait a moment. Do not reload the page the process will be completed soon !";
  }
};
// const fetchPrograms = async () => {
//   if (contactStep.value === 3 && ruleForm.status) {
//     await applicantStore.listApplecantProgramSchool({
//       type: ruleForm.status,
//     });
//   }
// };

// for remove choose data from select
const remove = (type: string) => {
  if (type == "school") {
    selectedSchool.value = null;
  } else {
    ruleForm.program = "";
    ruleForm.program_id = "";
  }
};
onMounted(async () => {
  applicantStore
    .listApplecantProgramSchool({
      type: "residency",
    })
    .then((data) => (programs.residency = data));
  applicantStore
    .listApplecantProgramSchool({
      type: "undergraduate",
    })
    .then((data) => (programs.undergraduate = data));
  window.addEventListener("beforeunload", preventRefresh);
  applicantStore.listApplecantKanban(data);
  if (current_user.value?.first_name && current_user.value?.last_name) {
    Object.assign(ruleForm, {
      name: current_user.value.first_name,
      surname: current_user.value.last_name,
    });
  }
});
watch(
  () => ruleForm.status,
  (newStatus) => {
    if (newStatus === "undergraduate") {
      selectedSchool.value = programs.undergraduate.find(
        (school) => school.school_title === "Medical school"
      );
    } else if (newStatus === "residency") {
      selectedSchool.value = programs.residency.find(
        (school) => school.school_title === "Surgery"
      );
    } else {
      selectedSchool.value = null;
    }
    ruleForm.school_name = selectedSchool.value?.school_title || "";
    ruleForm.program = "";
    ruleForm.program_id = "";
  }
);

watch(
  () => ruleForm.school_name,
  () => {
    ruleForm.program = "";
    ruleForm.program_id = "";
  }
);

// watch(() => [contactStep.value, ruleForm.status], fetchPrograms);
</script>

<style scoped>
.scroll-container {
  max-height: 420px;
  overflow-y: auto;
  padding-right: 12px;
  position: relative;
}

.scroll-container::-webkit-scrollbar {
  width: 4px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f2f2f7;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #757586;
}

.scroll-container:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 4px;
  /* background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1)); */
  display: block;
  pointer-events: none;
}
</style>
