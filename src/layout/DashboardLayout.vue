<template>
  <div class="wrapper full-screen" v-loading="loading">
    <div class="the-header">
      <TheHeader></TheHeader>
    </div>
    <div class="the-sidebar">
      <Sidebar :routes="routers" :subject="haveSubject" />
    </div>
    <div class="content relative">
      <div class="">
        <RouterView />
      </div>
    </div>
    <div class="the-footer">
      <TheFooter :routes="routers" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import TheHeader from "./components/Header/Header.vue";
import TheFooter from "./components/Footer/TheFooter.vue";
import { usesubjectsStore } from "@/stores/subject";
import { allRoutes, initalRoutes, subJectListForNull } from "@/utils/constants";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useApplicationStore, useUsersStore } from "@/stores";

const router = useRouter();
const route = useRoute();
const store = usesubjectsStore();
const taskStore = useApplicationStore();

const userStore = useUsersStore();
const loading = ref(false);
const taskUser = computed(() => taskStore.taskByUser);
const haveSubjectList = computed(() => store.subjects.data?.length);
const haveSubject = computed(() => store.subjects);
onMounted(async () => {
  await store.getSubjects();
  if (!taskStore.taskByUser) {
    await taskStore.getTaskByUser();
  }
  if (!haveSubjectList.value && taskUser.value?.updated_at == null) {
    router.push("/complete-information");
  } else if (
    !haveSubjectList.value &&
    taskUser.value?.updated_at &&
    route.path == "/complete-information"
  ) {
    router.push("/");
  }
});
onBeforeRouteLeave((to: any, from: any, next: any) => {
  if (haveSubjectList.value && to.path == "/contact-info") {
    next(false);
  } else {
    next();
  }
});
const routers = computed(() => {
  return (!haveSubject.value?.data &&
    haveSubject.value?.status == "residency") ||
    haveSubject.value?.data.length === 0
    ? subJectListForNull
    : store.isAllExamPassed
    ? allRoutes
    : initalRoutes;
});
</script>

<style scoped lang="scss"></style>
