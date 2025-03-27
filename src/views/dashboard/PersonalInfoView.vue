<template>
  <div>
    <div class="sm:pt-10 py-20 px-4 sm:px-8 md:px-10 xl:px-16">
      <div class="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6">
        <div class="flex items-center justify-between">
          <h1
            class="text-[#222529] lg:text-[32px] md:text-[24px] sm:text-[20px] leading-5 sm:leading-none text-[20px] font-semibold"
          >
            Personal information
          </h1>
        </div>
        <div class="card mt-4 flex items-center justify-between">
          <div
            class="flex items-center gap-x-2 sm:gap-x-4"
            @click="$router.push('/personal-information')"
          >
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="../../assets/images/user-avatar.png"
                class="w-full h-full object-cover"
                alt="your img"
              />
            </div>
            <div class="flex flex-col items-start">
              <h4
                class="text-start text-[#222529] text-sm font-normal tracking-tight sm:tracking-normal line-clamp-1"
              >
                {{ getTask?.name }} {{ getTask?.surname }}
              </h4>
              <p
                class="text-right text-neutralGray text-xs font-normal tracking-tight sm:tracking-normal"
              >
                {{ getTask?.email }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <!-- <el-tag
              v-for="(item, index) of Array.from({ length: 2 })"
              :key="index"
              class="!text-gray-700 bg-white border border-neutral-200"
              effect="info"
              round
            >
            </el-tag> -->
          </div>
        </div>
        <div>
          <Details
            :accordion="false"
            :initial-data="getTask"
            :is-read-only="true"
          ></Details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import Details from "./components/DetailsForm.vue";
import { useApplicationStore } from "@/stores";
const applicationStore = useApplicationStore();
const getTask = computed(() => applicationStore.taskByUser);
onMounted(() => {
  applicationStore.getTaskByUser();
});
</script>

<style scoped></style>
