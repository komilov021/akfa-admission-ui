<template>
  <div class="flex flex-col gap-3">
    <div
      class="card !px-4 !py-4 flex justify-between items-center cursor-pointer active:opacity-80"
    >
      <div class="flex items-center gap-4">
        <PaymeIcon />
        <span class="text-[#222529] text-base font-medium leading-normal"
          >Payme</span
        >
      </div>
      <div class="rotate-180">
        <ArrowLeftIcon></ArrowLeftIcon>
      </div>
    </div>
    <div
      class="card !px-4 !py-4 flex justify-between items-center cursor-pointer active:opacity-80"
    >
      <div class="flex items-center gap-4">
        <ClickIcon />
        <span class="text-[#222529] text-base font-medium leading-normal"
          >Click</span
        >
      </div>
      <div class="rotate-180">
        <ArrowLeftIcon></ArrowLeftIcon>
      </div>
    </div>
    <div
      class="card !px-4 !py-4 flex justify-between items-center cursor-pointer active:opacity-80"
    >
      <div class="flex items-center gap-4">
        <UzumIcon />
        <span class="text-[#222529] text-base font-medium leading-normal"
          >Uzum bank</span
        >
      </div>
      <div class="rotate-180">
        <ArrowLeftIcon></ArrowLeftIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  UzumIcon,
  PaymeIcon,
  ClickIcon,
} from "@/components/icons";
</script>

<style scoped></style>
