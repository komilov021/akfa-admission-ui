<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <el-form-item class="!mb-4 w-full" label="" prop="passport_f">
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file:any) => {
                ruleForm.passport_f = file;
              }
            "
            @remove="
              () => {
                ruleForm.passport_f = null;
              }
            "
          >
            <template #default>
              <div>
                <div v-if="ruleForm.passport_f">
                  <template
                    v-if="ruleForm.passport_f.type !== 'application/pdf'"
                  >
                    <img
                      :src="`https://test-lms.eduplus.uz/public/static/${
                        ruleForm.passport_f?.id
                      }.${ruleForm?.passport_f?.type.split('/')[1]}`"
                      class="el-icon--upload mx-auto !mb-0 max-h-[300px] object-cover"
                      alt="Uploaded File"
                    />
                  </template>
                  <template v-else>
                    <div class="py-4">
                      <img
                        src="../../../assets/icons/document.svg"
                        class="el-icon--upload mx-auto"
                      />
                      <div class="el-upload__text flex flex-col justify-center">
                        {{ ruleForm.passport_f?.name }}
                      </div>
                    </div>
                  </template>
                </div>
                <div v-else class="py-4">
                  <img
                    src="../../../assets/icons/document.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div class="el-upload__text flex flex-col justify-center">
                    Upload Passport/ID (Front)
                  </div>
                </div>
              </div>
            </template>
            <template #tip>
              <div></div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item class="!mb-4 w-full" label="" prop="passport_b">
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.passport_b = file;
              }
            "
            @remove="
              () => {
                ruleForm.passport_b = null;
              }
            "
          >
            <template #default>
              <div>
                <div v-if="ruleForm.passport_b">
                  <template
                    v-if="ruleForm.passport_b.type !== 'application/pdf'"
                  >
                    <img
                      :src="`https://test-lms.eduplus.uz/public/static/${
                        ruleForm.passport_b?.id
                      }.${ruleForm?.passport_b?.type.split('/')[1]}`"
                      class="el-icon--upload mx-auto !mb-0 max-h-[300px] object-cover"
                      alt="Uploaded File"
                    />
                  </template>
                  <template v-else>
                    <div class="py-4">
                      <img
                        src="../../../assets/icons/document.svg"
                        class="el-icon--upload mx-auto"
                      />
                      <div class="el-upload__text flex flex-col justify-center">
                        {{ ruleForm.passport_b?.name }}
                      </div>
                    </div>
                  </template>
                </div>
                <div v-else class="py-4">
                  <img
                    src="../../../assets/icons/document.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div class="el-upload__text flex flex-col justify-center">
                    Upload Passport/ID (Back)
                  </div>
                </div>
              </div>
            </template>
            <template #tip>
              <div></div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item class="!mb-4 w-full" label="" prop="diploma">
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
                <div v-if="ruleForm.diploma">
                  <template v-if="ruleForm.diploma.type !== 'application/pdf'">
                    <img
                      :src="`https://test-lms.eduplus.uz/public/static/${
                        ruleForm.diploma?.id
                      }.${ruleForm.diploma.type.split('/')[1]}`"
                      class="el-icon--upload mx-auto !mb-0 max-h-[300px] object-cover"
                    />
                  </template>
                  <template v-else>
                    <div class="py-4">
                      <img
                        src="../../../assets/icons/document.svg"
                        class="el-icon--upload mx-auto"
                      />
                      <div class="el-upload__text flex flex-col justify-center">
                        {{ ruleForm.diploma?.name }}
                      </div>
                    </div>
                  </template>
                </div>
                <div v-else class="py-4">
                  <img
                    src="../../../assets/icons/document.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div class="el-upload__text flex flex-col justify-center">
                    Upload Attestate/Diploma
                  </div>
                </div>
              </div>
            </template>
            <template #tip>
              <div></div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
      <el-form-item class="!mb-4 w-full" label="" prop="">
        <div class="w-full h-full">
          <AppUpload
            :drag="true"
            @upload="
              (file) => {
                ruleForm.extra_document = file;
              }
            "
            @remove="() => (ruleForm.extra_document = null)"
          >
            <template #default>
              <div>
                <div v-if="ruleForm.extra_document">
                  <template
                    v-if="ruleForm.extra_document.type !== 'application/pdf'"
                  >
                    <img
                      :src="`https://test-lms.eduplus.uz/public/static/${
                        ruleForm?.extra_document?.id
                      }.${ruleForm?.extra_document?.type.split('/')[1]}`"
                      class="el-icon--upload mx-auto !mb-0 max-h-[300px] object-cover"
                    />
                  </template>
                  <template v-else>
                    <div class="py-4">
                      <img
                        src="../../../assets/icons/document.svg"
                        class="el-icon--upload mx-auto"
                      />
                      <div class="el-upload__text flex flex-col justify-center">
                        {{ ruleForm.extra_document?.name }}
                      </div>
                    </div>
                  </template>
                </div>
                <div v-else class="py-4">
                  <img
                    src="../../../assets/icons/document.svg"
                    class="el-icon--upload mx-auto"
                  />
                  <div class="el-upload__text flex flex-col justify-center">
                    Upload Other Documents
                  </div>
                </div>
              </div>
            </template>
            <template #tip>
              <div></div>
            </template>
          </AppUpload>
        </div>
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppUpload from "@/components/common/AppUpload.vue";
const ruleForm = defineModel<any>();
</script>

<style scoped></style>
