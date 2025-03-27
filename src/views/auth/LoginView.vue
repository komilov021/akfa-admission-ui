<template>
  <div class="h-full flex items-center justify-center pt-4">
    <div class="sm:w-[424px] w-full mx-auto">
      <div class="flex flex-col gap-y-2">
        <h1
          class="text-center text-[#222529] text-[32px] font-bold leading-[44px]"
        >
          Get Started
        </h1>
        <h3 class="text-center text-neutralGray text-base font-normal">
          Welcome to CAU Admission
        </h3>
      </div>
      <div
        class="h-10 p-1 bg-[#f2f2f7] rounded-xl flex items-center gap-1 sm:my-8 my-6"
      >
        <div
          class="h-8 px-5 py-2 flex-1 flex justify-center items-center gap-2 overflow-hidden cursor-pointer"
          :class="
            isActiv == 'local'
              ? 'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] rounded-lg bg-white !text-[#222529]'
              : 'text-neutralGray'
          "
          @click="setForeignOrLocal('local')"
        >
          <span class="text-center text-sm font-medium leading-none">
            Local
          </span>
        </div>
        <div
          class="h-8 px-5 py-2 flex-1 rounded-lg flex justify-center items-center gap-2 overflow-hidden cursor-pointer"
          :class="
            isActiv == 'foreign'
              ? 'shadow-[0px_1px_2px_0px_rgba(16,24,40,0.04)] rounded-lg bg-white !text-[#222529]'
              : 'text-[#757586]'
          "
          @click="setForeignOrLocal('foreign')"
        >
          <span class="text-center text-sm font-medium leading-none">
            Foreign
          </span>
        </div>
      </div>
      <div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          @keyup.enter="submitForm(ruleFormRef)"
          label-position="top"
          require-asterisk-position="right"
          v-loading="loading"
        >
          <el-form-item v-if="isActiv == 'foreign'" label="Email" prop="email">
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
              size="large"
              placeholder="Your email"
            />
          </el-form-item>
          <el-form-item v-else label="Phone number" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              v-mask="'+998 ## ###-##-##'"
              autocomplete="off"
              size="large"
              placeholder="Your phone number"
              :formatter="(value:string) => `+998 ${value}`"
              :parser="(value:string) => value.replace(/\+998\s?/g, '')"
            />
          </el-form-item>
          <el-form-item label="Password" prop="password" class="!mb-5">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :show-password="true"
              autocomplete="off"
              size="large"
              placeholder="Your password"
            />
          </el-form-item>
          <div
            class="text-[#f76c02] text-[13px] font-semibold -mt-2 leading-tight"
          >
            <span class="cursor-pointer" @click="goForgetPassword(isActiv)"
              >Forgot password?</span
            >
          </div>
          <div class="flex items-center gap-2 justify-center">
            <el-button
              class="w-full !h-[44px] !bg-transparent"
              @click="backToStep"
              >Previous</el-button
            >
            <el-button
              class="w-full !h-[44px] sm:my-5 my-6"
              @click="submitForm(ruleFormRef)"
              type="primary"
              ><span class="">Log In</span></el-button
            >
          </div>
          <div class="text-center">
            <span class="text-neutralGray text-base font-normal"
              >Don’t have an account? </span
            ><span
              class="text-[#fb7c0e] text-base font-bold cursor-pointer"
              @click="goSignUp"
              >Registration</span
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
    </div>
    <el-dialog
      v-model="successModal"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      class="!bg-[#fff]"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="handleClose"
    >
      <div class="flex flex-col justify-center text-center mx-auto">
        <img
          :src="SuccessIcon"
          alt=""
          class="w-[56px] h-[56px] mx-auto flex justify-center items-center mb-2"
        />
        <h2 class="text-[#222529] text-lg font-semibold">Success! 🎉</h2>
        <p class="text-[#757586] text-center font-normal mt-3">
          Your password has been changed successfully. You can now log in with
          your new password.
        </p>
        <el-button
          class="w-full mt-6 flex items-center justify-center bg-[#F2F2F7] !h-[44px] text-[#222529] text-base"
          @click="handleClose"
        >
          Great!
        </el-button>
      </div>
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
import { ref, reactive, computed, onMounted } from "vue";
import type {
  ElMessage,
  FormInstance,
  FormRules,
  UploadFile,
} from "element-plus";
import { LoginType } from "@/models/backend";
import { useRouter, useRoute } from "vue-router";
import { useUsersStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import sha1 from "sha1";
import SuccessIcon from "@/assets/images/success_icon.svg";
import InfoCircle from "@/components/icons/InfoCircle.vue";
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
interface ILoginInfo {
  email?: string;
  phone_number?: string;
  password: string;
  is_foreign: boolean;
}
const i18n = useI18n();
const store = useUsersStore();
const router = useRouter();
const loading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();
const successModal = ref(false);
const showSecurity = ref(false);
const isActiv = ref<LoginType>(LoginType.LOCAL);

const ruleForm = reactive({
  phone: "",
  email: "",
  password: "",
});
const rules = reactive<FormRules>({
  phone: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    // {
    //   min: 9,
    //   message: i18n.t("validation.minimumLength", { value: 9 }),
    //   trigger: "blur",
    // },
    // {
    //   max: 20,
    //   message: i18n.t("validation.maximumLength", { value: 20 }),
    //   trigger: "blur",
    // },
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
    {
      min: 8,
      message: i18n.t("validation.minimumLength", { value: 8 }),
      trigger: "blur",
    },
  ],
});
const handleClose = () => {
  successModal.value = false;
  localStorage.removeItem("showSuccessModal");
};
const backToStep = () => {
  router.push({ name: "sign-up" });
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        await formEl.validate();
        loading.value = true;
        const isForeign = isActiv.value === LoginType.FOREIGN;
        const data: ILoginInfo = {
          is_foreign: isForeign,
          ...(isForeign
            ? { email: ruleForm.email }
            : { phone_number: "998" + ruleForm.phone.replace(/\D/g, "") }),
          password: sha1(ruleForm.password),
        };
        await store.login(data);
        await router.push("/");
        loading.value = false;
      } catch (error: any) {
        console.log("error", error.message);
        loading.value = false;
      }
    }
  });
};
const formatPhone = () => {
  if (!ruleForm.phone.startsWith("+998 ")) {
    ruleForm.phone = "+998 ";
  }
};
const setForeignOrLocal = (active: any) => {
  isActiv.value = active;
  localStorage.setItem("foreignOrLocalPreference", active);
};
const goForgetPassword = (path: any) => {
  router.push("/forgot-password");
};
const goSignUp = () => {
  router.push("/sign-up");
};
onMounted(() => {
  const storeGetForeignOrLocal = localStorage.getItem(
    "foreignOrLocalPreference"
  ) as "local" | "foreign" | null;
  isActiv.value = storeGetForeignOrLocal ?? (LoginType.LOCAL as any);
  localStorage.removeItem("email");
  localStorage.removeItem("phone");
  localStorage.removeItem("countdown");
  if (localStorage.getItem("showSuccessModal") === "true") {
    setTimeout(() => {
      successModal.value = true;
      localStorage.removeItem("showSuccessModal");
    }, 1000);
  }
});
</script>

<style scoped>
.info {
  li {
    font-size: 12px;
    font-weight: 400;
    color: #222529;
    list-style: disc;
  }
}
</style>
