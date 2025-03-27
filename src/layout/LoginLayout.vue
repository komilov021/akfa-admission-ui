<template>
  <div class="min-h-screen grid lg:grid-cols-2">
    <div class="h-screen">
      <div class="flex flex-col h-full relative w-full">
        <div
          class="flex items-center fixed sm:static md:bg-inherit top-0 left-0 right-0 z-[99] justify-between py-5 h-[84px] sm:px-6 px-4 bg-[#fff]"
        >
          <img
            src="../assets/icons/cau-logo.svg"
            class="w-[143px] md:w-[188.40px]"
            alt=""
          />
          <div class="flex items-center">
            <el-dropdown class="float-right p-[17px] z-[999] !hidden">
              <button
                class="text-[#222529] text-xs sm:text-base border border-neutral-200 font-semibold flex items-center uppercase gap-2 !px-2 py-[5px] sm:!px-4 sm:py-[9px] rounded-md"
              >
                <span class="flex">{{ $i18n.locale || "EN" }}</span>
                <ArrowDownIcon />
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="locale in $i18n.availableLocales"
                    :key="locale"
                    @click="localeSet(locale)"
                    class="uppercase"
                    >{{ locale }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div></div>
            <el-popover
              placement="bottom"
              :width="154"
              trigger="click"
              :show-arrow="false"
            >
              <template #reference>
                <div
                  class="border border-neutral-200 rounded-lg cursor-pointer"
                >
                  <el-tooltip content="Get Help" placement="bottom">
                    <div class="flex items-center gap-[10px] px-4 py-2 sm:py-3">
                      <HelpIcon size="20"></HelpIcon>
                      <h1
                        class="text-[#222529] text-sm hidden sm:flex font-semibold leading-3 text-nowrap"
                      >
                        Help center
                      </h1>
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
                    src="../assets/icons/phone.svg"
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
                          src="../assets/icons/phone.svg"
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
                    src="../assets/icons/telegram.svg"
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
          </div>
        </div>
        <div class="flex-1 px-5">
          <RouterView />
        </div>
        <div class="flex items-center justify-between py-5 px-6">
          <h1
            class="text-center text-neutralGray text-sm font-normal leading-tight"
          >
            © Central Asian University 2025
          </h1>
          <div class="flex items-center gap-2">
            <img :src="Visa" alt="card" />
            <img :src="Master" alt="card" />
            <img :src="Uzcard" alt="card" />
            <img :src="Humo" alt="card" />
          </div>
        </div>
      </div>
    </div>
    <div class="p-5 hidden lg:flex h-screen">
      <img
        src="../assets/images/main-cau.png"
        class="h-full w-full lg:rounded-lg 2xl:rounded-xl"
        alt="Main Image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { setLocale } from "@/i18n";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { LogoMainIcon, HelpIcon, ArrowDownIcon } from "@/components/icons";
import Uzcard from "@/assets/icons/uzcard.svg";
import Master from "@/assets/icons/mastercard.svg";
import Humo from "@/assets/icons/humo.svg";
import Visa from "@/assets/icons/visa.svg";
const router = useRouter();
const localeSet = (new_locale: string) => {
  setLocale(new_locale);
  router.replace({ params: { locale: new_locale } });
};
const deviceType = ref("desktop");

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
onMounted(() => {
  deviceType.value = getDeviceType();
});
</script>
<style scoped lang="scss">
.wrapper {
  height: 100vh;
}
</style>
