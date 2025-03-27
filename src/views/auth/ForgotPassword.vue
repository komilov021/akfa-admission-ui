<template>
  <div class="h-full flex items-center justify-center pt-[80px]">
    <div class="sm:w-[424px] w-full mx-auto">
      <div class="flex flex-col gap-y-2">
        <h1
          class="text-center text-[#222529] text-[24px] md:text-[32px] font-bold leading-[32px] md:leading-[44px]"
        >
          Forgot Password?
        </h1>
        <h3 class="text-center text-neutralGray text-base font-normal">
          Update your password
        </h3>
      </div>
      <div class="mt-4 md:mt-8">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          @keyup.enter="submitForm(ruleFormRef)"
          label-position="top"
          require-asterisk-position="right"
          v-loading="loading"
        >
          <el-form-item label="Choose type" prop="choose_type">
            <el-select
              v-model="ruleForm.choose_type"
              placeholder="Select type"
              class="w-full"
              size="large"
            >
              <el-option label="Local" value="local" />
              <el-option label="Foreign" value="foreign" />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.choose_type == 'foreign'"
            label="Email"
            prop="email"
          >
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
              size="large"
              placeholder="Your email"
            />
          </el-form-item>
          <el-form-item v-else label="Phone number" prop="phone_number">
            <el-input
              v-model="ruleForm.phone_number"
              v-mask="'+998 ## ###-##-##'"
              autocomplete="off"
              size="large"
              placeholder="Your phone number"
              :formatter="(value:string) => `+998 ${value}`"
              :parser="(value:string) => value.replace(/\+998\s?/g, '')"
            />
          </el-form-item>
          <el-form-item label="New password" prop="password" class="!mb-5">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :show-password="true"
              autocomplete="off"
              size="large"
              placeholder="Your password"
            />
          </el-form-item>
          <el-form-item
            label="Confirm password"
            prop="confirm_password"
            class="pt-2"
          >
            <el-input
              v-model.trim="ruleForm.confirm_password"
              :show-password="true"
              autocomplete="off"
              class="!h-[44px]"
              placeholder="Your password"
            />
          </el-form-item>
          <div class="flex items-center">
            <el-button @click="goBack" class="w-full !h-[44px] !bg-transparent"
              >Cancel</el-button
            >
            <el-button
              class="w-full !h-[44px] sm:my-5 my-6"
              @click="submitForm(ruleFormRef)"
              type="primary"
            >
              Confirm
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores";
import type { FormInstance, FormRules } from "element-plus";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import sha1 from "sha1";
interface IForgotPassword {
  email?: string;
  phone_number?: string;
  password: string;
  confirm_password: string;
  choose_type: string;
}
const i18n = useI18n();
const store = useUsersStore();
const router = useRouter();
const loading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();
const forgotPsw = computed(() => store.forgotPsw);
const ruleForm = reactive<IForgotPassword>({
  phone_number: "",
  email: "",
  password: "",
  confirm_password: "",
  choose_type: "",
});
const phoneError = ref("");
const passwordError = computed(() => {
  return ruleFormRef.value?.fields?.some(
    (field: any) => field.prop === "password" && field.validateState === "error"
  );
});
const goBack = () => {
  router.push({ name: "login" });
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

const validatePhone = () => {
  // phoneError.value = "";
  // if (!ruleForm.phone_number) {
  // phoneError.value = i18n.t("validation.invalidPhoneLength");
  //   return;
  // }
  // const phone = ruleForm.phone_number.replace(/\D/g, "");
  // if (phone.length < 9) {
  // phoneError.value = i18n.t("validation.invalidPhoneLength");
  //   return;
  // }
  // const prefix = phone.substring(0, 2);
  // if (!validPrefixes.includes(prefix)) {
  //   phoneError.value = i18n.t("validation.invalidPrefix");
  //   return;
  // }
};
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#&])[A-Za-z\d!@#&]{8,}$/;

const validatePass = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(i18n.t("validation.fillField")));
  } else if (!passwordPattern.test(value)) {
    callback(
      new Error(
        "The password must be at least 8 characters long, with no spaces, include letters (A-Z, a-z), numbers (0-9), and symbols: ! @ # &"
      )
    );
  } else if (ruleForm.confirm_password && value !== ruleForm.confirm_password) {
    callback(new Error(i18n.t("validation.passwordsDontMatch")));
  } else {
    if (ruleForm.confirm_password) {
      ruleFormRef.value?.validateField("confirm_password");
    }
    callback();
  }
};

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
  phone_number: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
      trigger: "blur",
    },
    {
      type: "string",
      required: true,
      pattern: /^\d{2}\s\d{3}-\d{2}-\d{2}$/,
      message: i18n.t("validation.pattern"),
      trigger: ["blur"],
    },
    {
      validator: (rule, value, callback) => {
        const user_phone_number = value.replace(/\D/g, "");
        if (user_phone_number.length < 9) {
          return callback(new Error("Invalid phone number length"));
        }
        const prefix = user_phone_number.substring(0, 2);
        if (!validPrefixes.includes(prefix)) {
          return callback(
            new Error("This phone number prefix is not supported.")
          );
        }

        callback();
      },
      trigger: ["blur"],
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
  choose_type: [
    {
      required: true,
      message: i18n.t("validation.fillField"),
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (!valid) return;

    if (ruleForm.choose_type !== "foreign") {
      // validatePhone();
      // if (phoneError.value) return;
    }
    try {
      loading.value = true;
      phoneError.value = "";
      if (ruleForm.email) {
        localStorage.setItem("email", ruleForm.email);
      } else if (ruleForm.phone_number) {
        localStorage.setItem("phone", ruleForm.phone_number);
      }
      const data = {
        new_password: sha1(ruleForm.password),
        confirm_password: sha1(ruleForm.confirm_password),
        phone_number:
          ruleForm.choose_type !== "foreign" && ruleForm.phone_number
            ? "998" + ruleForm.phone_number.replace(/\s|-/g, "")
            : undefined,
        email: ruleForm.choose_type === "foreign" ? ruleForm.email : undefined,
        is_foreign: ruleForm.choose_type === "foreign",
      };
      localStorage.setItem("forgotPasswordData", JSON.stringify(data));
      await store.forgotPassword({
        is_foreign: ruleForm.choose_type === "foreign",
        phone_number:
          ruleForm.choose_type !== "foreign" && ruleForm.phone_number
            ? "998" + ruleForm.phone_number.replace(/\s|-/g, "")
            : undefined,
        email: ruleForm.choose_type === "foreign" ? ruleForm.email : undefined,
      });
      if (forgotPsw.value && forgotPsw.value.code) {
        localStorage.setItem("code", forgotPsw.value.code);
      }
      router.push({
        name: "verify",
        query: { source: "forgot-password" },
      });
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      loading.value = false;
    }
  });
};

watch(
  () => ruleForm.choose_type,
  () => {
    ruleForm.email =
      ruleForm.choose_type === "email" ? ruleForm.email : undefined;
    ruleForm.phone_number =
      ruleForm.choose_type === "phone" ? ruleForm.phone_number : undefined;
  }
);
</script>
