<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <div class="text-center h-full w-[700px] flex flex-col items-center justify-center gap-5">
        <img :src="NotFound" alt="not-found" class=" mx-auto" />
        <router-link to="/"
          class="text-[#fff] mt-4 bg-[#F76C02] h-[44px] px-4 rounded-lg flex items-center justify-center">Back to
          Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotFound from "@/assets/images/not-found.jpg";
</script>

<style scoped></style>
