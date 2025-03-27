<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <el-form-item
        class="!mb-4 w-full"
        label="Upload Passport/ID (Front) "
        prop="passport_f"
      >
        <div class="w-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.passport_f = file;
              }
            "
            @remove="() => (ruleForm.passport_f = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 flex flex-col justify-center h-[200px] items-center"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item
        class="!mb-4 w-full"
        label="Upload Passport/ID (Back)"
        prop="passport_b"
      >
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.passport_b = file;
              }
            "
            @remove="() => (ruleForm.passport_b = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 flex flex-col justify-center h-[200px] items-center"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item
        class="!mb-4 w-full"
        label="Medical education diploma with transcript"
        prop="diploma"
      >
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.diploma = file;
              }
            "
            @remove="() => (ruleForm.diploma = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 flex flex-col justify-center h-[200px] items-center"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item
        class="!mb-4 w-full"
        label="Resume (optional)"
        prop="resume"
      >
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.resume = file;
              }
            "
            @remove="() => (ruleForm.resume = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 flex flex-col justify-center h-[200px] items-center"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item class="!mb-4 w-full" label="Personal letter" prop="letter">
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.letter = file;
              }
            "
            @remove="() => (ruleForm.letter = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 flex flex-col justify-center h-[200px] items-center"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item class="!mb-4 w-full" label="Photo 3x4" prop="photo">
        <div class="w-full h-full">
          <ImageCrop v-model="ruleForm.photo">
            <template #default>
              <div
                class="py-4 w-full bg-[#fff] flex flex-col justify-center h-[200px] items-center"
              >
                <img
                  src="../../../assets/icons/upload.svg"
                  class="el-icon--upload mx-auto"
                />
                <div
                  class="el-upload__text flex flex-col justify-center mx-auto !w-full"
                >
                  <p class="text-[#222529] text-xs my-4">
                    Choose or drag & drop file to upload
                  </p>
                  <span
                    class="!border !border-[#F76C02] rounded-[6px] !text-[#F76C02] font-['Manrope', 'san-serif'] w-[93px] flex justify-center mx-auto"
                    >Browse files</span
                  >
                </div>
              </div>
            </template>
          </ImageCrop>
        </div>
      </el-form-item>
      <el-form-item
        class="!mb-4 w-full"
        label="Other documents"
        prop="document"
      >
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.document = file;
              }
            "
            @remove="() => (ruleForm.document = null)"
          >
            <template #default>
              <div>
                <div
                  class="py-4 h-[200px] flex flex-col justify-center mx-auto"
                >
                  <img
                    src="../../../assets/icons/upload.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div
                    class="el-upload__text flex flex-col justify-center mx-auto w-full"
                  >
                    <p class="text-[#222529] text-xs mb-4">
                      Choose or drag & drop file to upload
                    </p>
                    <em
                      class="border border-[#F76C02] rounded-[6px] w-[93px] flex justify-center mx-auto"
                      >Browse files</em
                    >
                  </div>
                </div>
              </div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppUpload from "@/components/common/AppUpload.vue";
import ImageCrop from "@/components/common/ImageCrop.vue";
const ruleForm = defineModel<any>();
</script>
