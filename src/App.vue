<template>
  <div>
    <el-dialog
      v-model="show"
      :title="title"
      :width="width"
      :before-close="hideModal"
    >
      <div id="modal"></div>
    </el-dialog>
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { useModal } from "@/composables";
const { show, hideModal, title, width } = useModal();
</script>
<style lang="scss">
.el-dialog {
  background-color: #f4f5f7 !important;
  border-radius: 16px;

  &__title {
    font-weight: 700;
    font-size: 22px;
    color: #181c25;
  }

  &__close {
    font-size: 22px !important;
  }
  &__body {
    padding-top: 10px !important;
  }
}
</style>
