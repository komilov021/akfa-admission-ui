<template>
  <div class="h-full flex items-center justify-center">
    <div class="max-w-[484px] w-full mx-auto px-0 gap-4">
      <div class="flex flex-col gap-y-2">
        <h1
          class="text-center text-[#222529] text-[24px] md:text-[32px] font-bold leading-[44px]"
        >
          Verification Code
        </h1>
        <div class="text-center">
          <span
            class="text-neutralGray text-xs md:text-base font-normal leading-normal"
            >A verification code has been sent to your 
            {{ phone ? " phone number" : "email" }}
          </span>
          <br />
          <span
            v-if="phone"
            class="text-neutralGray text-xs md:text-base font-semibold leading-normal"
          >
            {{ phone }}
          </span>
          <span
            v-else
            class="text-neutralGray text-xs md:text-base font-semibold leading-normal"
          >
            {{ email }}
          </span>
        </div>
      </div>
      <div class="">
        <div
          class="pt-3 sm:pt-6 md:pt-8 overflow-hidden"
          :class="{ invalid: isInValid, shake: isShaking }"
        >
          <v-otp-input
            ref="otpInput"
            class="flex md:gap-[12px] items-center justify-between md:justify-center"
            input-classes="otp-input"
            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
            inputType="letter-numeric"
            :num-inputs="6"
            pattern="[0-9]*"
            inputmode="numeric"
            v-model:value="bindValue"
            :should-auto-focus="true"
            :should-focus-order="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
            @keypress="onlyNumbers"
          />
        </div>
        <div class="py-3 sm:py-6 md:py-8 text-center">
          <h3
            v-if="isBlockedPhone || isBlockedEmail"
            class="text-red-500 text-xs md:text-base font-semibold"
          >
            Your account is temporarily blocked.<br />
            Unlock time:
            {{ isBlockedPhone ? unlockTimePhone : unlockTimeEmail }}
          </h3>
          <h3
            v-else-if="countdown > 0"
            class="text-center text-neutralGray text-xs md:text-base font-normal"
          >
             Resend code in {{ countdown }} seconds
          </h3>

          <button
            v-else
            @click="resendCode"
            class="text-primary font-semibold text-xs md:text-base"
            :disabled="isBlockedPhone || isBlockedEmail"
          >
            Resend the code
          </button>
        </div>
      </div>
      <div class="flex items-center mt-4">
        <el-button
          class="w-full hover:!bg-transparent !bg-transparent !text-base !font-normal"
          size="large"
          @click="goBack"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          size="large"
          :disabled="!isValid"
          @click="submitForm"
          class="w-full"
          ><span
            class="text-center text-white text-base font-semibold leading-[18px]"
            >Confirm</span
          ></el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores";
import { dayjs } from "element-plus";
import { ref, reactive, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
const store = useUsersStore();
const router = useRouter();
const route = useRoute();
const i18n = useI18n();
const bindValue = ref();
const loading = ref(false);
const email = ref(localStorage.getItem("email") || "");
const phone = ref(
  localStorage.getItem("phone") ? "+998" + localStorage.getItem("phone") : ""
);
const code = ref(localStorage.getItem("code") || "");
const isValid = ref(false);
const isInValid = ref(false);
const isShaking = ref(false);
const inputKey = ref(0);
const countdown = ref(0);
const resendCountPhone = ref(
  Number(localStorage.getItem(`resendCount_${phone.value}`)) || 0
);
const resendCountEmail = ref(
  Number(localStorage.getItem(`resendCount_${email.value}`)) || 0
);
const onlyNumbers = (event: any) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};
const isBlockedPhone = ref(false);
const isBlockedEmail = ref(false);
const unlockTimePhone = ref<string | null>(null);
const unlockTimeEmail = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const otpInput = ref<any>(null);
const isForeign = ref(localStorage.getItem("is_foreign") === "true");
const isEmail = computed(() => !!email.value);
const isLocalAccount = computed(() => !isForeign.value);
const intervalId = ref<ReturnType<typeof setInterval> | undefined>();
const source = route.query.source;

const startCountdown = () => {
  clearInterval(intervalId.value);
  const storedStartTime =
    Number(localStorage.getItem("countdownStartTime")) || 0;
  const now = Date.now();
  const elapsed = Math.floor((now - storedStartTime) / 1000);
  const initialTime = isEmail.value ? 120 : 60;
  countdown.value = Math.max(initialTime - elapsed, 0);

  if (countdown.value > 0) {
    intervalId.value = setInterval(() => {
      countdown.value--;
      localStorage.setItem("countdown", countdown.value.toString());

      if (countdown.value <= 0) {
        stopCountdown();
      }
    }, 1000);
  }
};

const checkBlockStatus = () => {
  const now = Date.now();

  const phoneBlockTime =
    Number(localStorage.getItem(`blockTime_${phone.value}`)) || 0;
  const emailBlockTime =
    Number(localStorage.getItem(`blockTime_${email.value}`)) || 0;

  if (phoneBlockTime > now) {
    isBlockedPhone.value = true;
    unlockTimePhone.value = new Date(phoneBlockTime).toLocaleString();
  } else {
    isBlockedPhone.value = false;
    localStorage.removeItem(`blockTime_${phone.value}`);
  }

  if (emailBlockTime > now) {
    isBlockedEmail.value = true;
    unlockTimeEmail.value = new Date(emailBlockTime).toLocaleString();
  } else {
    isBlockedEmail.value = false;
    localStorage.removeItem(`blockTime_${email.value}`);
  }
};

const stopCountdown = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = undefined;
  }
  countdown.value = 0;
  localStorage.removeItem("countdown");
  localStorage.removeItem("countdownStartTime");
};
const clearLocalStorageItems = (keys: any) => {
  keys.forEach((key: any) => localStorage.removeItem(key));
};
const clearLocalStorageAndRedirect = () => {
  clearLocalStorageItems([
    "email",
    "phone",
    "otp",
    "code",
    "resendCount",
    "countdown",
  ]);
  localStorage.removeItem("countdownStartTime");
  localStorage.removeItem("countdown");
  if (source == "forgot-password") {
    router.push({ name: "login" });
  } else {
    router.push("/sign-up");
  }
};
const resetCountdownOnRouteChange = () => {
  localStorage.removeItem("countdownStartTime");
  localStorage.removeItem("countdown");
  startCountdown();
};

const goBack = () => {
  clearLocalStorageAndRedirect();
  resetCountdownOnRouteChange();
};
const resetResendState = () => {
  const now = Date.now();
  localStorage.setItem("countdownStartTime", now.toString());

  if (isEmail.value) {
    resendCountEmail.value++;
    localStorage.setItem(
      `resendCount_${email.value}`,
      resendCountEmail.value.toString()
    );
    localStorage.setItem("countdown", "120");
  } else {
    resendCountPhone.value++;
    localStorage.setItem(
      `resendCount_${phone.value}`,
      resendCountPhone.value.toString()
    );
    localStorage.setItem("countdown", "60");
  }

  otpInput.value?.clearInput();
  bindValue.value = "";
  startCountdown();
};
const blockAccount = (type: "phone" | "email") => {
  const now = dayjs();
  const unlockTime = now.add(30, "minute").format("HH:mm DD-MM-YYYY");
  if (type === "phone") {
    localStorage.setItem(`blockTime_${phone.value}`, now.format());
    isBlockedPhone.value = true;
    unlockTimePhone.value = unlockTime;
  } else {
    localStorage.setItem(`blockTime_${email.value}`, now.format());
    isBlockedEmail.value = true;
    unlockTimeEmail.value = unlockTime;
  }
};
const resendCode = async () => {
  if (isBlockedPhone.value || isBlockedEmail.value) return;

  if (isLocalAccount.value && resendCountPhone.value >= 3) {
    blockAccount("phone");
    return;
  }
  if (isEmail.value && resendCountEmail.value >= 4) {
    blockAccount("email");
    return;
  }

  try {
    loading.value = true;
    const data = { code: localStorage.getItem("code") || "" };
    const response = await store.resendForm(data);
    if (response && response.code) {
      localStorage.setItem("code", response.code);
    }
    resetResendState();
    loading.value = false;
  } catch (error) {
    console.log("error", error);
    loading.value = false;
    errorMessage.value = "An error occurred while resending the code.";
  }
};

const submitForm = async () => {
  if (isValid.value) {
    try {
      loading.value = true;
      const currentCode = localStorage.getItem("code") || "";
      if (source === "register") {
        await store.verifyOtp({
          otp: bindValue.value as string,
          code: currentCode,
        });
        localStorage.setItem("otp", bindValue.value);
        router.push({ name: "contact-info" });
      } else {
        const storedData = localStorage.getItem("forgotPasswordData");
        if (storedData) {
          const forgotPasswordData = JSON.parse(storedData);
          await store.forgotVerifyPassword({
            ...forgotPasswordData,
            otp: bindValue.value as string,
            code: currentCode,
          });
        }
        localStorage.setItem("showSuccessModal", "true");
        router.push({ name: "login" });
      }
      localStorage.removeItem("forgotPasswordData");
      localStorage.removeItem("phone_number");
      localStorage.removeItem("email");
      localStorage.removeItem("code");
      loading.value = false;
    } catch (error: any) {
      console.log("error", error.message);
      isInValid.value = true;
      isShaking.value = true;
      setTimeout(() => {
        isShaking.value = false;
        bindValue.value = "";
        inputKey.value += 1;
      }, 1000);
      stopCountdown();
      loading.value = false;
    }
  }
};
const handleOnComplete = (value: string) => {
  isValid.value = true;
  submitForm();
};

const handleOnChange = (value: string) => {
  isValid.value = value.length === 6;
};
const checkPhoneChange = () => {
  const storedPhone = localStorage.getItem("phone");
  if (storedPhone !== phone.value) {
    localStorage.removeItem(`resendCount_${storedPhone}`);
    resendCountPhone.value = 0;
  }
};
onMounted(() => {
  if (!localStorage.getItem("countdownStartTime")) {
    localStorage.setItem("countdownStartTime", Date.now().toString());
    localStorage.setItem("countdown", (isEmail.value ? 120 : 60).toString());
  }
  resendCountPhone.value =
    Number(localStorage.getItem(`resendCount_${phone.value}`)) || 0;
  resendCountEmail.value =
    Number(localStorage.getItem(`resendCount_${email.value}`)) || 0;
  checkPhoneChange();
  checkBlockStatus();
  startCountdown();
});
</script>

<style>
.otp-input {
  width: 68px;
  height: 68px;
  padding: 5px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  text-align: center;
}

@media screen and (max-width: 700px) {
  .otp-input {
    max-width: 48px;
    max-height: 48px;
    font-size: 16px;
  }
}

.otp-input:focus {
  border-color: #f76c02;
  outline: none;
}

.otp-input.is-complete {
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@keyframes shake {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation: shake 0.6s;
}

/* input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
} */
</style>
