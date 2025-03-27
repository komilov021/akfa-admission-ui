<template>
  <div>
    <div class="max-w-screen-lg mx-auto py-20 px-8 md:px-16 lg:px-10 sm:py-6">
      <div class="flex justify-center mx-auto max-w-[300px] pb-6">
        <el-steps class="w-full" :active="activeStep" align-center>
          <el-step></el-step>
          <el-step></el-step>
        </el-steps>
      </div>
      <div class="flex flex-col gap-2 mb-[20px] sm:mb-[40px]">
        <h1 class="text-center justify-start text-[#222529] text-2xl font-bold">
          Residency Application Form
        </h1>
        <p
          class="text-center justify-start text-[#757586] text-sm font-normal leading-[21px]"
        >
          Provide your personal details to continue with your registration.
          Ensure all required fields are accurately filled in. Your information
          will be securely stored and used only for verification purposes
        </p>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        require-asterisk-position="right"
        v-loading="loading"
      >
        <ComplementForm
          v-if="activeStep == 1"
          v-model="ruleForm"
          :user="user"
        />
        <UploadFiles v-else v-model="ruleForm" />
        <div class="w-full !mt-6 flex">
          <el-button
            v-if="activeStep !== 1"
            @click="prev"
            class="w-full"
            size="large"
            >Cancel</el-button
          >
          <div v-else class="w-full"></div>
          <el-button
            class="w-full"
            size="large"
            :disabled="checkConfirm"
            type="primary"
            @click="handleNext"
          >
            {{ activeStep == 1 ? "Next" : "Confirm" }}</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import ComplementForm from "./components/ComplementFormV2.vue";
import UploadFiles from "./components/UploadFiles.vue";
import type { FormInstance, FormRules } from "element-plus";
import { dayjs, ElMessage } from "element-plus";
import { useApplicationStore, useUsersStore } from "@/stores";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const activeStep = ref(1);
const router = useRouter();
const currentUser = useUsersStore();
const userStore = useApplicationStore();

const user = computed(() => currentUser.user);
const taskByUser = computed(() => userStore.taskByUser);
const ruleForm = reactive({
  pnfl: "",
  first_phone_number: "",
  second_phone_number: "",
  country: "",
  region: "",
  city_or_town: "",
  street: "",
  address: "",
  mothers_full_name: "",
  fathers_full_name: "",
  university: "",
  email: "",
  passport_b: null as File | null as any,
  passport_f: null as File | null as any,
  diploma: null as File | null as any,
  photo: null as File | null as any,
  resume: null as File | null as any,
  letter: null as File | null as any,
  document: null as File | null as any,
  wonders: [],
  apply_residency: false,
  responsibilities: "",
  specialty: "",
  faculty: "",
  jobtitle: "",
  workperiod: "",
  organization: "",
  gpa: "",
  phone_number: "",
  delete_email: "",
  reason: "",
  another_wonder: "",
});
const checkConfirm = computed(() => !ruleForm.apply_residency);
const validateFile = (rule: any, value: File | null, callback: any) => {
  if (!value) {
    callback(new Error("This field is required"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],

  pnfl: [{ required: false, message: "PNFL is required", trigger: "blur" }],
  first_phone_number: [
    { required: true, message: "Phone number is required", trigger: "blur" },
  ],
  second_phone_number: [
    {
      required: false,
      message: "Second phone number is required",
      trigger: "blur",
    },
  ],
  country: [
    { required: true, message: "Country is required", trigger: "blur" },
  ],
  region: [{ required: true, message: "Region is required", trigger: "blur" }],
  city_or_town: [
    { required: true, message: "City/Town is required", trigger: "blur" },
  ],
  street: [{ required: true, message: "Street is required", trigger: "blur" }],
  house: [{ required: true, message: "House is required", trigger: "blur" }],
  address: [
    { required: true, message: "Apartment is required", trigger: "blur" },
  ],

  school: [{ required: true, message: "School is required", trigger: "blur" }],
  faculty: [
    { required: true, message: "Please fill in this field", trigger: "blur" },
  ],
  reason: [
    { required: true, message: "Please fill in this field", trigger: "blur" },
  ],
  gpa: [
    { required: true, message: "Please fill in this field", trigger: "blur" },
  ],
  specialty: [
    { required: true, message: "Please fill in this field", trigger: "blur" },
  ],
  college: [
    { required: false, message: "College is required", trigger: "blur" },
  ],
  university: [
    { required: true, message: "University is required", trigger: "blur" },
  ],
  lyceum: [{ required: false, message: "Lyceum is required", trigger: "blur" }],
  passport_f: [
    { required: true, message: "This field is required", trigger: "change" },
  ],
  passport_b: [
    { required: true, message: "This field is required", trigger: "change" },
  ],
  diploma: [
    { required: true, message: "This field is required", trigger: "change" },
  ],
  document: [
    { required: false, message: "This field is required", trigger: "change" },
  ],
  resume: [{ required: false }],
  letter: [{ required: true, validator: validateFile, trigger: "change" }],
  photo: [{ required: true, validator: validateFile, trigger: "change" }],
});

onMounted(async () => {
  await userStore.getTaskByUser();
  if (userStore.taskByUser) {
    Object.assign(ruleForm, {
      email: taskByUser.value.email,
      pnfl: taskByUser.value.pnfl,
      mothers_full_name: taskByUser.value.mothers_full_name
        ? taskByUser.value.mothers_full_name
        : null,
      fathers_full_name: taskByUser.value.fathers_full_name
        ? taskByUser.value.fathers_full_name
        : null,
      first_phone_number: taskByUser.value.first_phone_number,
      second_phone_number: taskByUser.value.second_phone_number
        ? taskByUser.value.second_phone_number
        : null,
      country: taskByUser.value.country ? taskByUser.value.country : null,
      region: taskByUser.value.region ? taskByUser.value.region : null,
      city_or_town: taskByUser.value.city_or_town
        ? taskByUser.value.city_or_town
        : null,
      street: taskByUser.value.street ? taskByUser.value.street : null,
      address: taskByUser.value.address ? taskByUser.value.address : null,
    });
  }
});

const validateForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      activeStep.value++;
    }
  });
};
const formatPhoneNumber = (phone: string) =>
  phone.replaceAll(/\s|\(|\)|\+/g, "");
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        const { phone_number, delete_email, another_wonder, ...data } =
          ruleForm;
        await userStore.createApplecantForm(data);
        await userStore.getTaskByUser();
        router.push("/");
        ElMessage.success("Form submitted successfully!");
        loading.value = false;
      } catch (error: any) {
        console.log("error", error.message);
        loading.value = false;
      }
    }
  });
}
const prev = () => {
  if (activeStep.value > 1) {
    activeStep.value -= 1;
  } else {
    ruleFormRef.value?.resetFields();
    return;
  }
};
const handleNext = () => {
  if (activeStep.value === 1) {
    validateForm();
  } else {
    submitForm(ruleFormRef.value);
  }
};
onBeforeRouteLeave((to, from, next) => {
  if (to.name === "login") {
    next();
  } else if (
    from.name === "complete-personal-information" &&
    !taskByUser.value.updated_at
  ) {
    next(false);
  } else {
    next();
  }
});
</script>

<style scoped></style>
