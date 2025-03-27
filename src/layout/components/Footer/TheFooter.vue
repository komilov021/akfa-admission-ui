<template>
  <div
    class="app-footer flex items-center gap-2 w-full py-[6px] px-4 border-t-[1px]"
  >
    <div
      v-for="(path, index) of props.routes"
      :key="index"
      @click="router.push(`${path.route}`)"
      class="w-full"
    >
      <div
        class="flex flex-col items-center justify-center gap-y-1 cursor-pointer"
      >
        <component
          :is="
            route.fullPath.includes(`${path.route}`)
              ? path.isActiveIcon
              : path.icon
          "
        ></component>
        <h1
          :class="
            route.fullPath.includes(`${path.route}`)
              ? 'text-primary'
              : 'text-neutralGray'
          "
          class="text-center text-xs font-medium"
        >
          {{ path.title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import type { ISidebarItem } from "@/models/frontend";

const route = useRoute();
const router = useRouter();
const props = defineProps<{
  routes: ISidebarItem[];
}>();
const routetLength = computed(() => props.routes?.length);
</script>

<style scoped lang="scss">
@import "@/assets/styles/colors.scss";
.app-footer {
  background: #fff;
  height: 62px;
}
</style>
