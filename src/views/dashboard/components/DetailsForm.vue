<template>
  <div>
    <el-collapse
      v-model="activeCollapse"
      class="collapse-details space-y-4 !border-none"
      :accordion="accordion"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :disabled="isReadOnly"
        label-position="top"
        require-asterisk-position="right"
        v-loading="loading"
      >
        <el-collapse-item
          title="Personal information"
          name="1"
          :loading="loading"
        >
          <PersonalInfoForm v-model="ruleForm"></PersonalInfoForm>
        </el-collapse-item>
        <el-collapse-item
          title="Previuos education"
          name="2"
          :loading="loading"
        >
          <el-form-item
            label="Select school Type"
            :prop="selectedItems.join(',')"
          >
            <el-select
              v-model="selectedItems"
              multiple
              filterable
              collapse-tags
              :max-collapse-tags="3"
              class="w-full"
              size="large"
              placeholder="Select Schools"
              @change="updateRuleForm"
            >
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <div
              v-for="(item, index) in selectedItems"
              :key="item"
              class="flex items-center mt-3 gap-4 w-full"
            >
              <p class="font-medium">{{ index + 1 }}.</p>
              <el-input
                :placeholder="item + ' name'"
                size="large"
                v-model="getEduText(item).value"
                class="w-36"
                @input="updateBackendFormat(item)"
              />
              <el-input
                :placeholder="item + ' number'"
                size="large"
                v-model="getEduNumber(item).value"
                class="w-36"
                @input="updateBackendFormat(item)"
              />
              <el-button
                plain
                :icon="Minus"
                circle
                size="small"
                @click="removeItem(item)"
              />
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Upload Documents" name="3" :loading="loading">
          <UploadDocumentsForm v-model="ruleForm" />
        </el-collapse-item>
        <div class="flex items-center gap-4" v-if="!isReadOnly">
          <el-button class="w-full !h-[44px] !bg-[#fff]" @click="cancelForm"
            >Previous</el-button
          >
          <el-button
            type="primary"
            size="large"
            @click="nextStep(ruleFormRef)"
            :loading="loading"
            class="w-full"
            ><span
              class="text-center text-white text-base font-semibold leading-[18px]"
              >Next</span
            >
          </el-button>
        </div>
      </el-form>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, toRef } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import PersonalInfoForm from "./PersonalInfoForm.vue";
// import PreviuosEducationForm from "./PreviuosEducationForm.vue";
import UploadDocumentsForm from "./UploadDocumentsForm.vue";
import { Minus } from "@element-plus/icons-vue";
const props = defineProps({
  accordion: {
    type: Boolean,
    required: true,
  },
  isReadOnly: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
});
const activeCollapse = ref<string[]>(["1"]);
const emit = defineEmits(["submit", "cancel", "next"]);
const activeName = ref(["1"]);
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  name: "",
  surname: "",
  date_of_birth: "",
  email: "",
  passport_id: "",
  pnfl: "",
  first_phone_number: "",
  second_phone_number: "",
  country: "",
  region: "",
  city_or_town: "",
  street: "",
  house: "",
  address: "",
  mothers_full_name: "",
  fathers_full_name: "",
  school: "",
  college: "",
  university: "",
  lyceum: "",
  gender: "",
  passport_b: null as File | null as any,
  passport_f: null as File | null as any,
  diploma: null as File | null as any,
  extra_document: null as File | null as any,
} as any);
const educationFields = ["school", "college", "university", "lyceum"];
const eduForm = reactive<Record<string, { text: string; number: string }>>({});
const getEduText = (item: string) =>
  computed({
    get: () => eduForm[item]?.text || "",
    set: (val) => {
      if (!eduForm[item]) eduForm[item] = { text: "", number: "" };
      eduForm[item].text = val;
    },
  });
const getEduNumber = (item: string) =>
  computed({
    get: () => eduForm[item]?.number || "",
    set: (val) => {
      if (!eduForm[item]) eduForm[item] = { text: "", number: "" };
      eduForm[item].number = val;
    },
  });
const selectedItems = ref<string[]>([]);
const updateRuleForm = () => {
  selectedItems.value.forEach((item) => {
    if (!(item in eduForm)) {
      eduForm[item] = { text: "", number: "" };
    }
  });
};
const updateBackendFormat = (key: string) => {
  ruleForm.value[key] = `${eduForm[key].text},${eduForm[key].number}`;
};
const removeItem = (item: string) => {
  if (educationFields.includes(item)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== item);
    delete ruleForm.value[item];
    delete eduForm[item];
    ElMessage.info(`${item} removed`);
  }
};
const validateFile = (rule: any, value: File | null, callback: any) => {
  if (!value) {
    callback(new Error("This field is required"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Name is required", trigger: "blur" },
    {
      min: 2,
      max: 50,
      message: "Name must be between 2 and 50 characters",
      trigger: "blur",
    },
  ],
  surname: [
    { required: true, message: "Surname is required", trigger: "blur" },
    {
      min: 2,
      max: 50,
      message: "Surname must be between 2 and 50 characters",
      trigger: "blur",
    },
  ],
  date_of_birth: [
    { required: true, message: "Date of birth is required", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  passport_id: [
    { required: true, message: "Passport/ID is required", trigger: "blur" },
  ],
  pnfl: [{ required: true, message: "PNFL is required", trigger: "blur" }],
  first_phone_number: [
    { required: true, message: "Phone number is required", trigger: "blur" },
  ],
  second_phone_number: [
    {
      required: true,
      message: "Second phone number is required",
      trigger: "blur",
    },
  ],
  country: [
    { required: true, message: "Country is required", trigger: "blur" },
  ],
  gender: [
    { required: true, message: "Gender is required", trigger: "change" },
  ],
  region: [{ required: true, message: "Region is required", trigger: "blur" }],
  city_or_town: [
    { required: true, message: "City/Town is required", trigger: "blur" },
  ],
  street: [{ required: true, message: "Street is required", trigger: "blur" }],
  house: [{ required: true, message: "House is required", trigger: "blur" }],
  address: [
    { required: true, message: "Address is required", trigger: "blur" },
  ],
  mothers_full_name: [
    {
      required: true,
      message: "Mother's full name is required",
      trigger: "blur",
    },
  ],
  fathers_full_name: [
    {
      required: true,
      message: "Father's full name is required",
      trigger: "blur",
    },
  ],
  school: [{ required: true, message: "School is required", trigger: "blur" }],
  college: [
    { required: false, message: "College is required", trigger: "blur" },
  ],
  university: [
    { required: false, message: "University is required", trigger: "blur" },
  ],
  lyceum: [{ required: false, message: "Lyceum is required", trigger: "blur" }],
  passport_f: [{ validator: validateFile, trigger: "change" }],
  passport_b: [{ validator: validateFile, trigger: "change" }],
  diploma: [{ validator: validateFile, trigger: "change" }],
  extra_document: [{ validator: validateFile, trigger: "change" }],
});
const isFormValid = computed(() => {
  if (!ruleFormRef.value) return false;
  let valid = false;
  ruleFormRef.value.validate((v: any) => (valid = v));
  return valid;
});

const nextStep = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        loading.value = true;
        emit("next", ruleForm.value);
        loading.value = false;
      } catch (error: any) {
        loading.value = false;
        ElMessage.error("An error occurred! Please try again.");
      }
    } else {
      const errorFields = Object.keys(fields || {});
      const fieldToCollapseMap: Record<string, string> = {
        name: "1",
        surname: "1",
        date_of_birth: "1",
        email: "1",
        passport_id: "1",
        pnfl: "1",
        first_phone_number: "1",
        second_phone_number: "1",
        country: "1",
        region: "1",
        city_or_town: "1",
        street: "1",
        house: "1",
        address: "1",
        gender: "1",
        mothers_full_name: "1",
        fathers_full_name: "1",
        school: "2",
        college: "2",
        university: "2",
        lyceum: "2",
        passport_b: "3",
        passport_f: "3",
        diploma: "3",
        extra_document: "3",
      };
      activeCollapse.value = [
        ...new Set(errorFields.map((field) => fieldToCollapseMap[field])),
      ];
    }
  });
};
const cancelForm = () => {
  emit("cancel");
};
watch(
  () => props?.initialData,
  (newData) => {
    if (newData) {
      const filteredData = Object.keys(newData)
        .filter((key) => key in ruleForm.value)
        .reduce((obj, key) => {
          obj[key] = newData[key];
          return obj;
        }, {} as any);
      Object.assign(ruleForm.value, filteredData);
    }
  },
  { immediate: true, deep: true }
);
watch(
  () => props?.initialData,
  (newData) => {
    if (newData) {
      educationFields.forEach((key) => {
        if (newData[key]) {
          const [text = "", number = ""] = newData[key]?.split(",") || ["", ""];
          eduForm[key] = { text, number };
          if (!selectedItems.value.includes(key)) {
            selectedItems.value.push(key);
          }
        }
      });
    }
  },
  { immediate: true, deep: true }
);
const options = [
  { label: "School", value: "school" },
  { label: "College", value: "college" },
  { label: "University", value: "university" },
  { label: "Lyceum", value: "lyceum" },
];
</script>

<style scoped>
.el-collapse-item {
  margin-bottom: 24px;
}
</style>
