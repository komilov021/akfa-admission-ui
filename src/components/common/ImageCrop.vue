<template>
  <div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :limit="1"
      :drag="false"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :auto-upload="false"
      :on-change="openCropper"
      :on-remove="onRemove"
      accept=".png,.jpg,.jpeg"
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
          <div class="el-upload__tip">Only support .jpg, .png</div>
        </slot>
      </template>
    </el-upload>
    <el-dialog
      v-model="isCropperOpen"
      title="Crop the image"
      :style="isDesktop ? { maxWidth: '800px' } : { width: '400px' }"
      height="700px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <Cropper
        ref="cropperRef"
        :src="imageSrc"
        class="cropper"
        :stencil-props="{
          aspectRatio: 3 / 4,
          movable: true,
          resizable: false,
          handlers: {},
        }"
        :stencil-size="{
          width: 300,
          height: 400,
        }"
        :resize-image="true"
      />

      <template #footer>
        <div class="w-full mx-auto gap-2 flex items-center">
          <el-button class="w-full" size="large" @click="onRemove"
            >Cancel</el-button
          >
          <el-button
            type="primary"
            class="w-full"
            size="large"
            @click="saveCroppedImage"
            >Save</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from "@/stores";
import { Plus } from "@element-plus/icons-vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {
  ElMessage,
  type UploadFile,
  type UploadInstance,
  type UploadUserFile,
} from "element-plus";
import { ref, watch } from "vue";
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const fileStore = useFileStore();
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["upload", "remove", "update:modelValue"]);
const modelVal = defineModel<File | null>();
const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadFile[]>(props.modelValue ? [props.modelValue] : []);
const cropperRef = ref();
const isCropperOpen = ref(false);
const imageSrc = ref("");
const onFileChange = (file: UploadFile, _fileList: UploadFile[]) => {
  if ((file.size || 0) / 1024 / 1024 >= 2) {
    alert("File size should be less than 2MB");
    fileList.value = [];
    return;
  }
  const rawFile = file.raw as File;
  const reader = new FileReader();
  reader.onload = (e) => {
    emit("upload", { file: rawFile, preview: e.target?.result as string });
  };
  reader.readAsDataURL(rawFile);
};
const openCropper = (file: any) => {
  imageSrc.value = URL.createObjectURL(file.raw);
  isCropperOpen.value = true;
};
const onRemove = () => {
  isCropperOpen.value = false;
  fileList.value = [];
  emit("update:modelValue", null);
  emit("remove");
};
const saveCroppedImage = async () => {
  if (!cropperRef.value || typeof cropperRef.value.getResult !== "function") {
    console.error(
      "⛔ Cropper instance is not ready or getResult() is undefined"
    );
    return;
  }
  const result = cropperRef.value.getResult();
  if (!result || !result.canvas) {
    console.error("⛔ No canvas found in result");
    return;
  }
  result.canvas.toBlob(async (blob: any) => {
    if (!blob) {
      console.error("⛔ Failed to create blob from canvas");
      return;
    }
    const croppedFile = new File([blob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    try {
      const response = await fileStore.uploadFilePublic(croppedFile);
      emit("update:modelValue", response);
      isCropperOpen.value = false;
    } catch (error) {
      console.error("🚨 Upload failed:", error);
    }
  }, "image/jpeg");
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
  padding: 0;
  border: none !important;
}
.el-upload.el-upload--text {
  width: 100%;
  text-align: center;
  border: 1px dashed #f76c02 !important;
  border-radius: 5px;
}
</style>
