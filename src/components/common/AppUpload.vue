<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :limit="2"
    :drag="false"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :auto-upload="false"
    :on-change="onFileChange"
    :on-remove="onRemove"
    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
    v-model:file-list="fileList"
  >
    <template #default>
      <slot name="default">
        <el-button :icon="Plus" type="primary" size="large">
          {{ $t("dashboard.upload_photo") }}
        </el-button>
      </slot>
    </template>
    <template #tip>
      <slot name="tip">
        <div class="el-upload__tip">{{ $t("dashboard.photo_size") }}</div>
      </slot>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { useFileStore } from "@/stores";
import { Plus } from "@element-plus/icons-vue";
import {
  ElMessage,
  type UploadFile,
  type UploadInstance,
  type UploadUserFile,
} from "element-plus";
import { ref, watch } from "vue";

const emit = defineEmits(["upload", "remove"]);
const fileList = ref<UploadUserFile[]>([]);
const modelVal = defineModel<File | null>();
const uploadRef = ref<UploadInstance>();
const fileStore = useFileStore();

const onFileChange = async (file: UploadFile, _fileList: UploadFile[]) => {
  if ((file.size || 0) / 1024 / 1024 >= 2) {
    ElMessage({
      message: "File size should be less than 2mb",
      type: "error",
    });
    fileList.value = [];
    return;
  }

  if (_fileList.length > 1) {
    uploadRef.value?.handleRemove(_fileList[0]);
  }

  const result = await fileStore.uploadFilePublic(file.raw as File);
  fileList.value = [file];
  emit("upload", result);
};
const onRemove = () => {
  fileList.value = [];
  emit("remove");
};

const validate = (file: File): boolean => {
  if ((file.size || 0) / 1024 / 1024 >= 2) {
    ElMessage({
      message: "File size should be less than 2mb",
      type: "error",
    });
    fileList.value = [];
    return false;
  }
  return true;
};
watch(modelVal, (img) => {
  if (!img) {
    fileList.value = [];
    return;
  }
});
</script>

<style>
.el-upload-dragger {
  border: 1px dashed #e5e5e5 !important;
  padding: 0;
}
</style>
