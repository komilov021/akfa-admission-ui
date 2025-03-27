<template>
  <div>
    <div class="flex items-center justify-between p-4 py-2 sm:p-6">
      <div
        class="flex items-center gap-x-2 sm:gap-x-4"
        @click="$router.push('/personal-information')"
      >
        <div class="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s"
            class="w-full h-full object-cover"
            alt="your img"
          />
        </div>
        <div class="flex flex-col items-start cursor-pointer">
          <h4
            class="text-start text-[#222529] text-sm font-normal tracking-tight sm:tracking-normal line-clamp-1"
          >
            {{ user?.first_name }} {{ user?.last_name }}
          </h4>
          <p
            class="text-right text-neutralGray text-xs font-normal tracking-tight sm:tracking-normal"
          >
            {{ user?.email || (user?.phone ? "+" + user.phone : "No Data") }}
          </p>
        </div>
        <div class="hidden cursor-pointer">
          <el-progress
            type="circle"
            :percentage="100"
            class="circle-progress"
            stroke-linecap="round"
          />
        </div>
      </div>
      <div class="flex items-center gap-x-3">
        <el-popover
          placement="bottom"
          class="popover"
          :width="154"
          trigger="click"
          :show-arrow="false"
        >
          <template #reference>
            <div
              class="px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg border border-neutral-200 backdrop-blur-[35px] justify-start items-center gap-2.5 flex cursor-pointer"
            >
              <el-tooltip content="Get Help" placement="bottom">
                <div class="w-5 h-5 justify-center items-center flex">
                  <img src="../../../assets/icons/message.svg" alt="" />
                </div>
              </el-tooltip>
            </div>
          </template>
          <div class="flex flex-col gap-y-1 sm:gap-y-2">
            <a
              v-if="deviceType == 'tablet' || deviceType == 'mobile'"
              href="tel:+99871-200-05-22"
              class="flex items-center rounded-sm sm:rounded-md hover:bg-gray-50 gap-x-2 sm:px-2 sm:py-1"
            >
              <img
                src="../../../assets/icons/phone.svg"
                class="w-3.5 h-3.5 sm:w-5 sm:h-5"
                alt="Phone"
              />
              <span
                class="text-gray-800 text-xs sm:text-base font-normal sm:leading-[18px]"
                >Call</span
              >
            </a>
            <el-popover
              v-else
              placement="left"
              :width="154"
              trigger="click"
              :show-arrow="false"
            >
              <template #reference>
                <div>
                  <div
                    class="flex items-center rounded-sm sm:rounded-md hover:bg-gray-50 gap-x-2 sm:px-2 sm:py-1"
                  >
                    <img
                      src="../../../assets/icons/phone.svg"
                      class="w-3.5 h-3.5 sm:w-5 sm:h-5"
                      alt="Phone"
                    />
                    <span
                      class="text-gray-800 text-xs sm:text-base font-normal sm:leading-[18px]"
                      >Call</span
                    >
                  </div>
                </div>
              </template>
              <div>
                <h1
                  class="text-gray-800 text-xs sm:text-base font-normal sm:leading-[18px] text-center"
                >
                  Phone
                </h1>
                <p class="">+99871-200-05-22</p>
              </div>
            </el-popover>
            <a
              href="https://t.me/admission_cau_bot"
              target="_blank"
              class="flex items-center gap-x-2 cursor-pointer rounded-sm sm:rounded-md hover:bg-gray-50 sm:px-2 sm:py-1"
            >
              <img
                src="../../../assets/icons/telegram.svg"
                class="w-4 h-4 sm:w-5 sm:h-5"
                alt="Telegram"
              />
              <span
                class="text-gray-800 text-xs sm:text-base font-normal sm:leading-[18px]"
                >Telegram</span
              >
            </a>
          </div>
        </el-popover>
        <div
          @click="showNotification"
          class="flex items-center justify-center cursor-pointer px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg border border-neutral-200 backdrop-blur-[35px"
        >
          <img src="../../../assets/icons/notification.svg" class alt="" />
        </div>
        <!-- <el-popover
          placement="bottom"
          :width="popoverWidth"
          trigger="click"
          :show-arrow="false"
        >
          <template #reference>
            <div
              class="h-11 px-4 py-3 bg-white rounded-lg border border-neutral-200 backdrop-blur-[35px] justify-start items-center gap-2.5 flex cursor-pointer"
            >
              <div class="w-5 h-5 justify-center items-center flex relative">
                <img
                  src="../../../assets/icons/notification.svg"
                  class
                  alt=""
                />
                <div
                  v-if="Array.from({ length: 0 }).length"
                  class="w-2 h-2 bg-[#f76c02] rounded-full border border-white absolute left-[11px] bottom-3"
                ></div>
              </div>
            </div>
          </template>
          <div class="flex flex-col gap-y-3">
            <h2>notification</h2>
          </div>
        </el-popover> -->
        <div
          class="border border-neutral-200 rounded-lg cursor-pointer"
          @click="logout"
        >
          <div class="flex items-center gap-[10px] px-3 sm:px-4 py-2 sm:py-3">
            <LogoutIcon class="h-5 w-5 stroke-danger" />
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="openModal"
      :style="isDesktop ? { maxWidth: '424px' } : { width: '324px' }"
      title="Info"
    >
      <exam-info-form
        v-if="openModal && subjectStatus !== 'residency'"
        :subject-list="subjectList"
        :enterShowInfo="!allPassedSubject"
        :transaction="transaction"
      ></exam-info-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePaymentStore, usesubjectsStore, useUsersStore } from "@/stores";
import { ElMessageBox } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { LogoutIcon } from "@/components/icons";
import ExamInfoForm from "@/views/dashboard/components/ExamInfoForm.vue";

const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const I18n = useI18n();
const route = useRoute();
const paymentStore = usePaymentStore();
const router = useRouter();
const store = useUsersStore();
const storeSubject = usesubjectsStore();
const userStore = useUsersStore();
const openModal = ref(false);
const deviceType = ref("desktop");
const subjectList = computed(() => storeSubject.subjects.data);
const subjectStatus = computed(() => storeSubject.subjects?.status);
const transaction = computed(() => paymentStore.transaction);
const allPassedSubject = computed(() => storeSubject.isAllExamPassed);
const user = computed(() => userStore.user);
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return "tablet";
  }
  if (
    /mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
const showNotification = () => {
  if (subjectStatus.value !== "residency") {
    openModal.value = true;
  }
  return;
};
onMounted(() => {
  deviceType.value = getDeviceType();
});
const logout = () => {
  ElMessageBox.confirm(I18n.t("app.doYouwantLogOut"), I18n.t("app.warning"), {
    confirmButtonText: I18n.t("shared.yes"),
    cancelButtonText: I18n.t("shared.cancel"),
    type: "warning",
  }).then(() => {
    store.resetToken();
    router.push(`/login?redirect=${route.fullPath}`);
  });
};
</script>

<style>
.el-popper.is-light.el-popover {
  padding: 8px !important;
  border-radius: 8px;
}
</style>
