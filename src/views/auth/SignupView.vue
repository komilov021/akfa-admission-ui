<template>
  <div
    class="flex flex-col mx-auto items-center justify-center w-full h-full md:pt-0 pt-[32px]"
  >
    <div class="flex flex-col gap-5 md:gap-10 justify-center">
      <div class="mx-auto flex justify-center items-center w-full">
        <el-steps style="width: 144px" class="" :active="step">
          <el-step
            v-for="(item, index) of Array.from({ length: 2 })"
            :key="index"
          />
        </el-steps>
      </div>
      <div class="flex flex-col gap-8">
        <div class="mx-auto justify-center items-center gap-2">
          <h1
            class="text-center font-bold text-[24px] md:text-[32px] leading-[32px] md:leading-[44px]"
          >
            {{ step === 1 ? "Registration" : "Create an Account" }}
          </h1>
          <p class="text-center text-neutralGray text-base font-normal">
            {{
              step === 1
                ? "Please select your student category"
                : "Enter your details below to register your account"
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full sm:w-[450px] lg:w-[450px] mx-auto mt-4">
      <transition name="fade" mode="out-in">
        <div :key="step">
          <el-form
            @submit.prevent="submitForm(ruleFormRef)"
            @focusout.native="updateIsFormValidated"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            :hide-required-asterisk="false"
            label-position="top"
            require-asterisk-position="right"
          >
            <div v-if="step === 1">
              <label
                class="flex items-center justify-between md:p-4 p-2 mb-4 border rounded-lg cursor-pointer"
                @click="setActive('local')"
                :class="
                  isActive === 'local' ? 'border-primary' : 'border-[#E5E5E5]'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                    :class="
                      isActive === 'local'
                        ? 'border border-primary bg-[#FEF0E6]'
                        : 'border-gray-100'
                    "
                  >
                    <el-icon
                      :style="{
                        color: isActive === 'local' ? '#F76C02' : '#757586',
                        fontSize: '20px',
                      }"
                    >
                      <LocationFilled />
                    </el-icon>
                  </div>
                  <div>
                    <p class="text-gray-800 font-bold">Local Resident</p>
                    <p class="text-gray-500 text-sm">
                      Apply as a domestic applicant
                    </p>
                  </div>
                </div>
                <div
                  class="w-6 h-6 flex items-center justify-center rounded-full transition-all"
                  :class="
                    isActive === 'local'
                      ? 'border-2 border-primary'
                      : 'border-2 border-[#E5E5E5]'
                  "
                >
                  <div
                    v-if="isActive === 'local'"
                    class="w-3 h-3 rounded-full bg-primary"
                  ></div>
                </div>
                <input
                  type="radio"
                  name="resident"
                  value="local"
                  class="hidden"
                />
              </label>
              <el-form-item
                v-if="isActive === 'local'"
                label="Select your region"
                prop="regionSelect"
              >
                <el-select
                  v-model="ruleForm.regionSelect"
                  size="large"
                  class="w-full !h-[44px]"
                  placeholder="Tashkent"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="region in regions"
                    :key="region"
                    :label="region"
                    :value="region"
                  ></el-option>
                </el-select>
              </el-form-item>
              <label
                class="flex items-center justify-between p-2 md:p-4 mb-4 border rounded-lg cursor-pointer transition-all"
                @click="setActive('foreign')"
                :class="
                  isActive == 'foreign' ? 'border-primary' : 'border-[#E5E5E5]'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                    :class="
                      isActive == 'foreign'
                        ? 'border border-primary bg-[#FEF0E6]'
                        : 'border-gray-100'
                    "
                  >
                    <EarthIcon
                      :filles="isActive == 'foreign' ? '#F76C02' : '#757586'"
                    />
                  </div>
                  <div>
                    <p class="text-gray-800 font-bold">
                      International Applicant
                    </p>
                    <p class="text-gray-500 text-sm">
                      Apply as an international applicant
                    </p>
                  </div>
                </div>
                <div
                  class="w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#E5E5E5] transition-all"
                  :class="
                    isActive == 'foreign'
                      ? 'border-primary'
                      : 'border-[#E5E5E5]'
                  "
                >
                  <div
                    v-if="isActive == 'foreign'"
                    class="w-3 h-3 rounded-full bg-primary"
                  ></div>
                </div>
                <input
                  type="radio"
                  name="resident"
                  value="foreign"
                  class="hidden"
                />
              </label>
              <el-form-item
                v-if="isActive == 'foreign'"
                label="Select your country"
                prop="countrySelect"
              >
                <el-select
                  v-model="ruleForm.countrySelect"
                  size="large"
                  filterable
                  clearable
                  class="w-full"
                  placeholder="Choose your country"
                >
                  <el-option
                    v-for="country in countryCodes"
                    :key="country.id"
                    :label="country.name"
                    :value="country.id"
                  >
                    <div class="flex items-center space-x-2 w-full">
                      <span>{{ getFlagEmoji(country.code) }}</span>
                      <span>{{ country.name }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-checkbox v-model="check">
                <span
                  @click.prevent="openModal"
                  class="cursor-pointer underline text-primary"
                  >I have read and agree to the Privacy Policy</span
                >
              </el-checkbox>
              <div
                class="my-[20px] md:my-[40px] flex items-center gap-2 justify-center"
              >
                <el-button
                  class="w-full !h-[44px]"
                  type="primary"
                  @click="goToStep(2)"
                  :disabled="
                    !check ||
                    (!ruleForm.countrySelect && !ruleForm.regionSelect)
                  "
                  >Continue</el-button
                >
              </div>
            </div>
            <div v-else-if="step === 2">
              <el-form-item
                label="Email"
                prop="email"
                v-if="ruleForm.countrySelect"
              >
                <el-input
                  v-model="ruleForm.email"
                  autocomplete="off"
                  class="!h-[44px]"
                  placeholder="Your email"
                />
              </el-form-item>
              <el-form-item label="Phone number" prop="phone" v-else>
                <el-input
                  v-model.trim="ruleForm.phone"
                  type="text"
                  autocomplete="off"
                  v-mask="'+998 ## ###-##-##'"
                  placeholder="(00) 000 00 00"
                  class="!h-[44px]"
                  :formatter="(value:string) => `+998 ${value}`"
                  :parser="(value:string) => value.replace(/\+998\s?/g, '')"
                  @blur="validatePhone"
                />
                <div
                  v-if="phoneError"
                  class="text-[#f56c6c] text-[12px] mt-[2px] leading-4"
                >
                  {{ phoneError }}
                </div>
              </el-form-item>
              <el-form-item
                label="Create a password"
                prop="password"
                :class="{ 'is-error': passwordError }"
                class="!mb-[10px]"
              >
                <el-input
                  v-model.trim="ruleForm.password"
                  type="password"
                  :show-password="true"
                  autocomplete="off"
                  class="!h-[44px]"
                  placeholder="Your password"
                />
              </el-form-item>
              <span
                :class="passwordError ? 'text-red-500' : 'text-neutralGray'"
                class="text-[12px] font-normal flex"
              >
                The password must be at least 8 characters long, with no spaces,
                include letters (A-Z, a-z), numbers (0-9), and symbols: ! @ # &
              </span>
              <el-form-item
                label="Confirm Password"
                prop="confirm_password"
                class="pt-2"
              >
                <el-input
                  v-model.trim="ruleForm.confirm_password"
                  :show-password="true"
                  autocomplete="off"
                  class="!h-[44px]"
                  placeholder="Re-enter your password"
                />
              </el-form-item>
              <div
                class="my-[24px] md:my-[28px] flex items-center gap-2 justify-center"
              >
                <el-button
                  class="w-full !h-[44px] !bg-transparent"
                  :disabled="step !== 2"
                  @click="backToStep(1)"
                  >Previous</el-button
                >
                <el-button
                  class="w-full !h-[44px]"
                  type="primary"
                  :loading="loading"
                  @click="submitForm(ruleFormRef)"
                  >Confirm</el-button
                >
              </div>
            </div>

            <div class="text-center">
              <span class="text-neutralGray text-base font-normal"
                >Already have an account? </span
              ><span
                class="text-primary text-base font-bold cursor-pointer"
                @click="goSignIp"
                >Log In</span
              >
            </div>
            <div
              class="text-center mt-2 text-[#f76c02] text-[13px] font-semibold leading-tight hover:cursor-pointer hover:text-[#f76c02]"
              @click="showSecurity = true"
            >
              Security information
            </div>
          </el-form>
        </div>
      </transition>
    </div>
    <el-dialog
      v-model="showModal"
      width="900px"
      :style="isDesktop ? { maxWidth: '900px' } : { width: '324px' }"
      :modal="true"
    >
      <div class="pdf-container" ref="pdfContainer" @scroll="handleScroll">
        <vue-pdf-embed v-if="pdfSrc" :source="pdfSrc" />
      </div>
      <template #footer>
        <el-button type="primary" @click="acceptPolicy" :disabled="!canAccept"
          >I agree</el-button
        >
      </template>
    </el-dialog>
    <el-dialog
      v-model="showSecurity"
      :style="isDesktop ? { maxWidth: '500px' } : { width: '324px' }"
      class="!bg-[#fff]"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <div class="flex items-start gap-2">
        <div class="flex gap-2 items-center">
          <InfoCircle stroke="#007aff" />
        </div>
        <div class="flex flex-col">
          <h4 class="text-[#222529] text-sm font-semibold mb-2">
            Security Information
          </h4>
          <p class="mb-2 text-[13px] text-[#222529]">
            Recently, there has been increasing news about data breaches and
            leaks of personal information. We understand how important the trust
            of our users is, and we want to assure you: security is our top
            priority!
          </p>
          <p class="mb-2 text-[13px] text-[#222529]">
            What we do to protect your data on Admission:
          </p>
          <ul class="info pl-4">
            <li>
              Our website is hosted on a reliable and certified server that
              meets international standards.
            </li>
            <li>
              We promptly install system updates and regularly update server
              software to minimize vulnerabilities.
            </li>
            <li>
              We perform regular backups to ensure your data is always safe.
            </li>
            <li>
              We continuously change and strengthen passwords for all system
              services and administrative accounts.
            </li>
            <li>We use the HTTPS protocol and encrypt all transmitted data.</li>
            <li>
              For secure online payments, we use 3D Secure technology — an
              additional authentication step for transactions. This means that
              even if a card is compromised, a malicious user will not be able
              to make a purchase without confirmation from the cardholder via
              SMS or the bank's mobile app.
            </li>
            <li>We regularly conduct internal security audits and checks.</li>
          </ul>
          <p class="mt-2 text-[13px] font-semibold text-[#222529]">
            Your data is well protected!
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores";
import type { ElMessage, FormInstance, FormRules } from "element-plus";
import { LocationFilled } from "@element-plus/icons-vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import VuePdfEmbed from "vue-pdf-embed";
import "vue-pdf-embed/dist/styles/annotationLayer.css";
import "vue-pdf-embed/dist/styles/textLayer.css";
import sha1 from "sha1";
import { EarthIcon } from "@/components/icons";
import InfoCircle from "@/components/icons/InfoCircle.vue";
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const userStore = useUsersStore();
const countryCodes = computed(() => userStore.countryCodes);
const register = computed(() => userStore.registerData);
const router = useRouter();
const i18n = useI18n();
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const isFormValidated = ref(false);
const isActive = ref<"local" | "foreign">();
const step = ref(1);
const phoneError = ref("");
const check = ref(false);
const showModal = ref(false);
const canAccept = ref(false);
const pdfContainer = ref(null);
const pdfSrc = ref("");
const passwordError = ref(false);
const showSecurity = ref(false);
// const passwordError = computed(() => {
//   const field = ruleFormRef.value?.fields?.find(
//     (f: any) => f.prop === "password"
//   );
//   return field?.validateState === "error";
// });
const openModal = () => {
  showModal.value = true;
  canAccept.value = false;
};

const handleScroll = () => {
  if (!pdfContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = pdfContainer.value;
  const scrollThreshold = isDesktop.value ? 800 : 400;
  if (scrollTop + clientHeight >= scrollHeight - scrollThreshold) {
    canAccept.value = true;
  }
};
const acceptPolicy = () => {
  check.value = true;
  showModal.value = false;
};

const validPrefixes = [
  "90",
  "91",
  "93",
  "94",
  "95",
  "97",
  "98",
  "99",
  "33",
  "50",
  "55",
  "77",
  "88",
  "20",
];
const ruleForm = reactive({
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  regionSelect: "",
  countrySelect: "",
});

const setActive = (active: any) => {
  isActive.value = active;
};
const validatePhone = () => {
  phoneError.value = "";

  const phone = ruleForm.phone.replaceAll(/\D/g, "");
  if (phone.length < 9) return;
  const prefix = phone.substring(0, 2);
  if (!validPrefixes.includes(prefix)) {
    phoneError.value = i18n.t("validation.invalidPrefix");
  }
};
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#&])[A-Za-z\d!@#&]{8,}$/;

// if (!value) {
//   callback(new Error(i18n.t("validation.fillField")));
// } else if (!passwordPattern.test(value)) {
//   callback(
//     new Error(
//       "The password must be at least 8 characters long, with no spaces, include letters (A-Z, a-z), numbers (0-9), and symbols: ! @ # &"
//     )
//   );
// }
const validatePass = (rule: any, value: string, callback: any) => {
  if (!value) {
    passwordError.value = true;
    callback(new Error(i18n.t("validation.fillField")));
  } else if (!passwordPattern.test(value)) {
    passwordError.value = true;
    callback();
  } else {
    passwordError.value = false; // Xatolik bo'lmasa false qilamiz
    callback();
  }
};
// const validatePass = (rule: any, value: string, callback: any) => {
//   if (ruleForm.confirm_password && value !== ruleForm.confirm_password) {
//     callback(new Error(i18n.t("validation.passwordsDontMatch")));
//   } else {
//     if (ruleForm.confirm_password) {
//       ruleFormRef.value?.validateField("confirm_password");
//     }
//     callback();
//   }
// };

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(i18n.t("validation.fillField")));
  } else if (value !== ruleForm.password) {
    callback(new Error(i18n.t("validation.passwordsDontMatch")));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: ["blur"],
    },
    {
      type: "string",
      required: true,
      pattern: /^\d{2}\s\d{3}-\d{2}-\d{2}$/,
      message: i18n.t("validation.pattern"),
      trigger: ["blur"],
    },
  ],
  countrySelect: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  gender: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  regionSelect: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    {
      type: "email",
      message: i18n.t("validation.inputEmail"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    { validator: validatePass, trigger: "blur" },
  ],
  confirm_password: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    { validator: validatePass2, trigger: "blur" },
  ],
});
const goToStep = (newStep: number) => {
  step.value = newStep;
};
const backToStep = (backStep: number) => {
  if (backStep === 1) {
    ruleForm.regionSelect = "";
    ruleForm.countrySelect = "";
    step.value = backStep;
  } else {
    router.push({ name: "login" });
  }
};

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;
    validatePhone();
    if (phoneError.value) return;
    try {
      loading.value = true;
      phoneError.value = "";
      if (ruleForm.email) {
        localStorage.setItem("email", ruleForm.email);
      } else if (ruleForm.phone) {
        localStorage.setItem("phone", ruleForm.phone);
      }
      const data = {
        new_password: sha1(ruleForm.password),
        phone_number:
          isActive.value !== "foreign"
            ? "998" + ruleForm.phone.replace(/\s|-/g, "")
            : undefined,
        email: isActive.value === "foreign" ? ruleForm.email : undefined,
        is_foreign: isActive.value === "foreign",
        country_id: ruleForm.countrySelect || undefined,
        city: ruleForm.countrySelect ? undefined : ruleForm.regionSelect,
      };
      localStorage.setItem(
        "is_foreign",
        isActive.value === "foreign" ? "true" : "false"
      );
      await userStore.register(data);
      if (register.value && register.value.code) {
        localStorage.setItem("code", register.value.code);
      }
      router.push({
        name: "verify",
        query: { source: "register" },
      });
    } catch (error: any) {
      console.error("Xatolik yuz berdi:", error.message);
      loading.value = false;
    }
  });
};

const goSignIp = () => {
  router.push({ name: "login" });
};

const updateIsFormValidated = () => {
  let fields = ruleFormRef.value?.fields || [];
  isFormValidated.value = fields.reduce((acc: any, f: any) => {
    let valid = f.required && f.validateState === "success";
    let notErroring = !f.required && f.validateState !== "error";
    return acc && (valid || notErroring);
  }, true);
};
onMounted(async () => {
  try {
    await userStore.countryCode();
  } catch (error) {
    console.error("Error fetching country codes:", error);
  }
  pdfSrc.value = "/privacy_policy.pdf";
});

const regions = [
  "Tashkent",
  "Andijan",
  "Bukhara",
  "Fergana",
  "Jizzakh",
  "Khorezm",
  "Namangan",
  "Navoi",
  "Kashkadarya",
  "Samarkand",
  "Sirdarya",
  "Surkhandarya",
  "Tashkent Region",
  "Republic of Karakalpakstan",
];
</script>

<style scoped>
label:hover {
  border-color: #f76c02;
}
.pdf-container {
  height: 500px;
  overflow-y: auto;
}
.el-form-item__content {
  line-height: 16px !important;
}
.is-error .el-input__wrapper {
  border: 1px solid red !important;
}
</style>
