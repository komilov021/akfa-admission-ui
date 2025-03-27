<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between px-6 py-6 pr-2">
      <img
        src="../../../assets/icons/cau-logo.svg"
        class="w-[125.60px] cursor-pointer"
        alt=""
        @click="$router.push('/')"
      />
      <!-- @click="
          !subject?.data || subject?.data?.length === 0
            ? $router.push('/personal-information')
            : $router.push('/')
        " -->
      <!-- <pre>{{ subject?.data }}</pre> -->
      <ArrowLeftIcon classes="cursor-pointer rounded-md hidden" />
    </div>
    <div class="mt-4 flex flex-col gap-y-1">
      <div
        v-for="(path, index) of props.routes"
        :key="index"
        @click="router.push(`${path.route}`)"
      >
        <div
          :class="`${
            route.fullPath.includes(`${path.route}`) ? 'bg-[#fb7c0e]/5' : ''
          }`"
          class="w-[238px] mx-auto h-12 p-3 rounded-lg flex-col justify-center items-start gap-2.5 flex cursor-pointer"
        >
          <div class="justify-center items-center gap-3 inline-flex">
            <div class="w-6 h-6 justify-center items-center flex">
              <component
                :is="
                  route.fullPath.includes(`${path.route}`)
                    ? path.isActiveIcon
                    : path.icon
                "
              ></component>
            </div>
            <div
              :class="
                route.fullPath.includes(`${path.route}`)
                  ? 'text-primary'
                  : 'text-neutralGray'
              "
              class="text-[15px] font-medium"
            >
              {{ path.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { ISidebarItem } from "@/models/frontend";
import { ArrowLeftIcon } from "@/components/icons";
import type { ExamRecord } from "@/models/backend";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  routes: ISidebarItem[];
  subject: any;
}>();
</script>

<style scoped></style>
