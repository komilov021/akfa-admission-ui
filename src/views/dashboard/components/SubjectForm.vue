<template>
  <div class="card flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-[#222529] sm:text-2xl font-semibold">
        {{ props.subjectData.subject }}
      </h1>
      <div id="for-status" class="flex items-center gap-x-[2px] sm:gap-1">
        <el-tag
          v-if="exam_type_visiblity"
          type="info"
          class="!border-[#E5E5E5] !text-gray-700"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none">
            {{ subjectData.exam_type }}
          </span>
        </el-tag>
        <el-tag
          v-if="!subjectData.certificate_status && !subjectData.status"
          type="info"
          class="!border-[#E5E5E5] !text-gray-700"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none">
            Not participated yet
          </span>
        </el-tag>
        <el-tag
          v-if="
            subjectData.certificate_status == 'pending' &&
            subjectData.status !== 'passed' &&
            subjectData.status !== 'failed'
          "
          type="info"
          class="!border-[#007AFF] !text-[#007AFF]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none"> In review </span>
        </el-tag>
        <el-tag
          v-if="
            subjectData.certificate_status == 'approved' &&
            subjectData.certificate
          "
          type="info"
          class="!border-[#34c759] !text-[#34c759]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none">
            Certificate Credited
          </span>
        </el-tag>
        <el-tag
          v-if="
            subjectData.certificate_status == 'missed' ||
            subjectData.status == 'missed'
          "
          type="info"
          class="!border-[#f76c02] !text-[#f76c02]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none"> Missed </span>
        </el-tag>
        <el-tag
          v-if="
            subjectData.certificate_status == 'rejected' &&
            subjectData.status !== 'passed'
          "
          type="info"
          class="!border-[#FF3B30] !text-[#FF3B30]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none"> Rejected </span>
        </el-tag>
        <el-tag
          v-if="subjectData.status == 'passed'"
          type="info"
          class="!border-[#34c759] !text-[#34c759]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none"> Passed </span>
        </el-tag>
        <el-tag
          v-if="subjectData.status == 'failed'"
          type="info"
          class="!border-[#FF3B30] !text-[#FF3B30]"
          effect="plain"
          round
          ><span class="sm:text-sm font-medium leading-none"> Failed </span>
        </el-tag>
      </div>
    </div>
    <div v-if="isViewDateForExam" class="flex flex-col gap-y-2">
      <div class="flex justify-between">
        <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">Date</h1>
        <h1 class="text-[#222529] text-xs sm:text-base font-medium">
          {{ dayjs(subjectData.exam_at).format("DD.MM.YYYY") }}
        </h1>
      </div>
      <div class="flex justify-between">
        <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">Time</h1>
        <h1 class="text-[#222529] text-xs sm:text-base font-medium">
          {{ dayjs(subjectData?.exam_at).utc().format("HH:mm") }}
        </h1>
      </div>
      <div class="flex justify-between">
        <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">Address</h1>
        <h1 class="text-[#222529] text-xs sm:text-base font-medium">
          {{ subjectData.location ? subjectData.location : "No Data" }}
        </h1>
      </div>
    </div>
    <el-form
      v-if="isElFormVisiblity"
      ref="ruleFormRef"
      :model="ruleForm"
      label-position="top"
      require-asterisk-position="right"
    >
      <div class="flex sm:flex-row flex-col sm:gap-6 gap-y-[0]">
        <el-form-item
          prop="exam_type"
          class="w-full sm:w-1/3"
          v-if="!props.subjectData.exam_type && !props.subjectData.certificate"
          :rules="{
            required: ruleForm.certificate ? false : true,
            message: $t('validation.fillField'),
            trigger: 'blur',
          }"
        >
          <el-select
            placeholder="Choose the type of exam"
            size="large"
            class="w-full"
            v-model="ruleForm.exam_type"
            clearable
            :disabled="!ruleForm.certificate ? false : true"
            @change="changeForButton"
          >
            <el-option
              v-for="type of [
                { value: 'online', label: 'Online', disabled: true },
                { value: 'offline', label: 'Offline' },
              ]"
              :key="type.value"
              :label="type.label"
              :disabled="type.disabled"
              :value="type.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="exam_date_id"
          class="w-full"
          v-if="!subjectData.exam_date_id && !props.subjectData.certificate"
          :rules="{
            required: ruleForm.certificate ? false : true,
            message: $t('validation.fillField'),
            trigger: 'blur',
          }"
        >
          <el-select
            placeholder="Choose the date, time, and city"
            size="large"
            clearable
            class="w-full"
            v-model="ruleForm.exam_date_id"
            :disabled="!ruleForm.certificate ? false : true"
            @change="changeForButton"
          >
            <el-option
              v-for="exam in examDates[ruleForm.exam_type] || []"
              :key="exam.id"
              :value="exam.id"
              :label="`${getDateUtc(exam.exam_at)}, ${getTimeUtc(
                exam.exam_at
              )}, ${exam.location}`"
            >
              <div class="grid grid-cols-3 items-center gap-x-1 sm:gap-x-3">
                <h1
                  class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                >
                  <span class="text-[#6b6b6b]">Date:</span>
                  <span>{{ getDateUtc(exam.exam_at) }}</span>
                </h1>
                <h1
                  class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                >
                  <span class="text-[#6b6b6b]">Time:</span>
                  <span>{{ getTimeUtc(exam.exam_at) }}</span>
                </h1>
                <h1
                  class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                >
                  <span class="text-[#6b6b6b]">Address:</span>
                  <span class="">{{
                    exam.location ? exam.location : "No Data"
                  }}</span>
                </h1>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div
        v-if="!subjectData.certificate && !props.subjectData.exam_date_id"
        class="relative"
      >
        <div
          v-if="isCertificateDisabled"
          class="absolute top-0 bottom-0 w-full cursor-not-allowed bg-gray-100/70 z-40 rounded-md"
        ></div>
        <AppUpload
          :drag="true"
          v-model="ruleForm.certificate"
          @upload="uploadFile"
          @remove="() => ((ruleForm.certificate = null), changeForButton())"
        >
          <template #default>
            <div
              class="flex items-center justify-center gap-x-1.5 sm:gap-x-3 sm:p-4 p-2 rounded-md cursor-pointer"
            >
              <div>
                <CertificatFileIcon></CertificatFileIcon>
              </div>
              <h1 class="text-sm sm:text-base font-medium leading-normal">
                {{ _certificate_subject }}
              </h1>
            </div>
          </template>
          <template #tip><div></div> </template>
        </AppUpload>
      </div>
      <h1
        class="text-[#757586] sm:text-sm text-xs relative -top-2 font-medium leading-normal"
        v-if="
          props.subjectData.subject == 'English' && !props.subjectData.subject
        "
      >
        IELTS, Duolingo, CEFR, TOEFL
      </h1>
      <div v-if="subjectData.certificate && subjectData.status !== 'passed'">
        <div
          class="flex justify-between md:flex-row flex-col gap-y-4 md:items-center items-start gap-x-1.5 sm:gap-x-3 border sm:p-4 p-2 rounded-md border-dashed border-neutral-200"
        >
          <div class="flex items-center gap-x-3">
            <div>
              <CertificatFileIcon></CertificatFileIcon>
            </div>
            <h1
              class="text-sm sm:text-base font-medium leading-normal line-clamp-2"
            >
              {{ subjectData.certificate?.name }}
            </h1>
          </div>
          <el-tag round class="!bg-[#007aff]/20 !border-none"
            ><span
              class="sm:text-sm text-xs md:font-medium text-[#007aff] tracking-tight md:tracking-normal leading-none"
            >
              ✅ Submitted: Your certificate is under review.
            </span>
          </el-tag>
        </div>
      </div>
    </el-form>
    <div
      class="flex items-center"
      v-if="isVisibkeButton && subjectData.status !== 'failed'"
    >
      <el-button @click="clear" class="w-full sm:!h-[44px] !bg-transparent"
        >Cancel</el-button
      >
      <el-button
        @click="updateSubject(ruleFormRef, false)"
        class="w-full sm:!h-[44px]"
        type="primary"
        >Save</el-button
      >
    </div>
    <div
      class="bg-[#34c759]/10 rounded-lg px-4 sm:px-6 py-4"
      v-if="
        subjectData.certificate_status == 'approved' &&
        subjectData.status != 'passed'
      "
    >
      <div class="flex flex-col text-start gap-y-1">
        <span class="flex items-center gap-2">
          <InfoCircle stroke="#34C759"></InfoCircle>
          <span class="text-[#34c759] text-sm font-medium leading-tight">
            🎉 Your certificate has been successfully verified.</span
          >
        </span>
        <span class="text-[#222529] text-sm font-normal leading-tight">
          Congratulations! ✅ You have passed this subject.</span
        >
      </div>
    </div>
    <!-- for payment -->
    <!-- <div
      v-if="subjectData.status == 'failed' && !subjectData.certificate?.id"
      class="bg-[#ff3b30]/10 rounded-lg px-4 sm:px-6 py-4"
    >
      <div
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#ff3b30"></InfoCircle>
            <span class="text-[#ff3b30] text-sm font-medium leading-tight">
              You are failed.</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            To participate in the exam, please complete the payment of 100 000
            UZS.</span
          >
        </div>
        <div @click="openRetakeModal(ruleForm)" class="notification_btn">
          <h1
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          ></h1>
          Retake
        </div>
      </div>
    </div> -->
    <div
      class="bg-[#ff3b30]/10 rounded-lg px-4 sm:px-6 py-4"
      v-if="
        subjectData.certificate_status == 'rejected' &&
        subjectData.reject_reason &&
        !['passed'].includes(subjectData.status)
      "
    >
      <div
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#ff3b30"></InfoCircle>
            <span class="text-[#ff3b30] text-sm font-medium leading-tight">
              You are
              {{
                subjectData.certificate_status == "rejected"
                  ? "rejected"
                  : "failed"
              }}.</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            {{ subjectData?.reject_reason || "No Reason" }}
          </span>
        </div>

        <div @click="openRetakeModal(ruleForm)" class="notification_btn">
          <h1
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          ></h1>
          Retake
        </div>
      </div>
    </div>
    <div
      class="bg-[#ff3b30]/10 rounded-lg px-4 sm:px-6 py-4"
      v-if="subjectData?.status == 'failed' && subjectData.grade < 40"
    >
      <div
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#ff3b30"></InfoCircle>
            <span class="text-[#ff3b30] text-sm font-medium leading-tight">
              You scored [{{ props.subjectData?.grade || "X" }}] points on the
              exam.</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            Unfortunately, you did not pass. To proceed, you must either retake
            the exam or upload a relevant certificate.
          </span>
        </div>

        <div @click="openRetakeModal(ruleForm)" class="notification_btn">
          <h1
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          ></h1>
          Retake
        </div>
      </div>
    </div>
    <div
      class="bg-[#ff3b30]/10 rounded-lg px-4 sm:px-6 py-4"
      v-if="
        subjectData?.certificate_status == 'rejected' &&
        !subjectData?.reject_reason
      "
    >
      <div
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#ff3b30"></InfoCircle>
            <span class="text-[#ff3b30] text-sm font-medium leading-tight">
              Your certificate was not verified.</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            Please upload a new certificate or select a date and location to
            take the exam.
          </span>
        </div>

        <div @click="openRetakeModal(ruleForm)" class="notification_btn">
          <h1
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          ></h1>
          Retake
        </div>
      </div>
    </div>
    <div
      v-if="
        (props.subjectData.status == 'passed' && props.subjectData?.grade) ||
        (props.subjectData?.certificate_status == 'approved' &&
          props.subjectData?.grade)
      "
      class="bg-[#34c759]/10 rounded-lg px-4 sm:px-6 py-4"
    >
      <div class="flex flex-col text-start gap-y-1">
        <span class="flex items-center gap-2">
          <InfoCircle stroke="#34C759"></InfoCircle>
          <span class="text-[#34c759] text-sm font-medium leading-tight">
            🎉 Congratulations!</span
          >
        </span>
        <span class="text-[#222529] text-sm font-normal leading-tight">
          You have successfully passed the exam with a score of [{{
            props.subjectData?.grade || "X"
          }}] points. ✅</span
        >
      </div>
    </div>
    <div
      v-if="
        props.subjectData.certificate_status == 'approved' &&
        !props.subjectData?.grade
      "
      class="bg-[#34c759]/10 rounded-lg px-4 sm:px-6 py-4"
    >
      <div class="flex flex-col text-start gap-y-1">
        <span class="flex items-center gap-2">
          <InfoCircle stroke="#34C759"></InfoCircle>
          <span class="text-[#34c759] text-sm font-medium leading-tight">
            🎉 Congratulations!</span
          >
        </span>
        <span class="text-[#222529] text-sm font-normal leading-tight">
          The certificate you provided has been successfully credited!</span
        >
      </div>
    </div>
    <div
      v-if="
        props.subjectData?.status == 'missed' ||
        props.subjectData?.certificate_status == 'missed'
      "
      class="bg-[#f76c02]/10 rounded-lg px-4 sm:px-6 py-4"
    >
      <div
        class="flex md:flex-row flex-col gap-y-4 md:items-center items-start justify-between"
      >
        <div class="flex flex-col text-start gap-y-1">
          <span class="flex items-center gap-2">
            <InfoCircle stroke="#f76c02"></InfoCircle>
            <span class="text-[#f76c02] text-sm font-medium leading-tight">
              You are missed the exam</span
            >
          </span>
          <span class="text-[#222529] text-sm font-normal leading-tight">
            To participate in the exam, please choose date, time and
            location.</span
          >
        </div>
        <div @click="openRetakeModal(ruleForm)" class="notification_btn">
          <h1
            class="text-center text-[#222529] text-xs font-medium leading-[14px]"
          ></h1>
          Retake
        </div>
      </div>
    </div>

    <el-dialog
      v-model="openRetake"
      :style="isDesktop ? { maxWidth: '490px' } : { width: '356px' }"
      :title="`${ruleForm?.subject} Exam`"
    >
      <div v-if="openRetake">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          label-position="top"
          require-asterisk-position="right"
        >
          <div class="flex flex-col gap-y-1">
            <el-form-item
              prop="exam_type"
              :rules="{
                required: ruleForm.certificate ? false : true,
                message: $t('validation.fillField'),
                trigger: 'blur',
              }"
            >
              <el-select
                placeholder="Choose the type of exam"
                size="large"
                class="w-full"
                v-model="ruleForm.exam_type"
                clearable
                :disabled="!ruleForm.certificate ? false : true"
              >
                <el-option
                  v-for="type of [
                    { value: 'online', label: 'Online', disabled: true },
                    { value: 'offline', label: 'Offline' },
                  ]"
                  :key="type.value"
                  :label="type.label"
                  :disabled="type.disabled"
                  :value="type.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="exam_date_id"
              :rules="{
                required: ruleForm.certificate ? false : true,
                message: $t('validation.fillField'),
                trigger: 'blur',
              }"
            >
              <el-select
                placeholder="Choose the date, time, and city"
                size="large"
                class="w-full"
                clearable
                v-model="ruleForm.exam_date_id"
                :disabled="!ruleForm.certificate ? false : true"
              >
                <el-option
                  v-for="exam in examDates[ruleForm.exam_type] || []"
                  :key="exam.id"
                  :value="exam.id"
                  :label="`${getDateUtc(exam.exam_at)}, ${getTimeUtc(
                    exam.exam_at
                  )}, ${exam.location}`"
                >
                  <div class="grid grid-cols-3 items-center gap-x-1 sm:gap-x-3">
                    <h1
                      class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                    >
                      <span>Date</span>
                      <span>{{ getDateUtc(exam.exam_at) }}</span>
                    </h1>
                    <h1
                      class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                    >
                      <span>Time</span>
                      <span>{{ getTimeUtc(exam.exam_at) }}</span>
                    </h1>
                    <h1
                      class="flex justify-between text-[12px] sm:text-[14px] font-normal"
                    >
                      <span>Address</span>
                      <span class="">{{ exam.location }}</span>
                    </h1>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <div class="relative">
              <div
                v-if="isCertificateDisabled"
                class="absolute top-0 left-0 h-[calc(100%-10px)] w-full cursor-not-allowed bg-gray-100/70 z-40 rounded-md"
              ></div>
              <AppUpload
                :drag="true"
                v-model="ruleForm.certificate"
                @upload="uploadFile"
                @remove="
                  () => ((ruleForm.certificate = null), changeForButton())
                "
              >
                <template #default>
                  <div
                    class="flex items-center justify-center gap-x-1.5 sm:gap-x-2 sm:p-2.5 p-1 rounded-md cursor-pointer"
                  >
                    <div>
                      <CertificatFileIcon></CertificatFileIcon>
                    </div>
                    <h1 class="text-sm sm:text-base font-medium leading-normal">
                      {{ _certificate_subject }}
                    </h1>
                  </div>
                </template>
                <template #tip>
                  <div></div>
                </template>
              </AppUpload>
            </div>
            <!-- <div class="flex flex-col gap-y-2 mb-3 hidden">
            <div class="flex justify-between">
              <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">
                Date
              </h1>
              <h1 class="text-[#222529] text-xs sm:text-base font-medium">
                {{ dayjs(retake.exam_at).format("DD.MM.YYYY") }}
              </h1>
            </div>
            <div class="flex justify-between">
              <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">
                Time
              </h1>

              <h1 class="text-[#222529] text-xs sm:text-base font-medium">
                {{ dayjs(retake?.exam_at).utc().format("HH:mm") }}
              </h1>
            </div>
            <div class="flex justify-between">
              <h1 class="text-[#6b6b6b] text-xs sm:text-base font-normal">
                Address
              </h1>
              <h1 class="text-[#222529] text-xs sm:text-base font-medium">
                {{ retake?.location }}
              </h1>
            </div>
          </div> -->
            <div class="flex">
              <el-button @click="clear" class="w-full !bg-transparent"
                >Cancel</el-button
              >
              <el-button
                @click="updateSubject(ruleFormRef, true)"
                class="w-full"
                type="primary"
                >Confirm</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import AppUpload from "@/components/common/AppUpload.vue";
import type { ElMessage, FormInstance, FormRules } from "element-plus";
import { dayjs } from "element-plus";
import { InfoCircle } from "@/components/icons";
import { reactive, watch, ref, computed } from "vue";
import utc from "dayjs/plugin/utc";
import { CertificatFileIcon } from "@/components/icons";
dayjs.extend(utc as any);

const props = defineProps<{
  subjectData?: any;
  examDates: { offline: any[]; online: any[] };
}>();

const retake = ref();
const windowWidth = ref(window.innerWidth);
const isDesktop = ref(windowWidth.value >= 768);
const openRetake = ref(false);
const emit = defineEmits(["submit", "cancel"]);
const isVisibkeButton = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<{
  id: string | null;
  subject_id: string | null;
  subject: string | null;
  exam_type: "offline" | "online";
  exam_date_id: string | null | any;
  certificate: File | null;
}>({
  id: props.subjectData.id,
  exam_type: props.subjectData.exam_type,
  subject_id: props.subjectData.subject_id,
  subject: props.subjectData.subject,
  certificate: props.subjectData.certificate,
  exam_date_id: props.subjectData.exam_date_id,
});
const isElFormVisiblity = computed(() => {
  return (
    props.subjectData.status !== "passed" &&
    props.subjectData.status !== "failed" &&
    props.subjectData.certificate_status != "approved" &&
    props.subjectData.certificate_status !== "rejected"
  );
});
const _certificate_subject = computed(() => {
  if (props.subjectData.subject === "English") {
    return "Upload English Proficiency certificate";
  } else if (props.subjectData?.subject === "Math") {
    return "Upload SAT Certificate";
  } else {
    return "Upload a certificate";
  }
});
const exam_type_visiblity = computed(() => {
  return (
    props.subjectData.exam_type &&
    props.subjectData.status !== "passed" &&
    props.subjectData.certificate_status != "approved" &&
    props.subjectData.status !== "missed" &&
    props.subjectData.certificate_status !== "missed" &&
    props.subjectData.status !== "failed"
  );
});
const isViewDateForExam = computed(() => {
  const { exam_date_id, status, certificate_status, certificate } =
    props.subjectData;

  return (
    exam_date_id &&
    !["failed", "passed"].includes(status) &&
    !["approved", "rejected"].includes(certificate_status) &&
    !certificate
  );
});
const isCertificateDisabled = computed(() => {
  return (
    (ruleForm.subject !== "Math" && props.subjectData.subject !== "English") ||
    ruleForm.exam_date_id ||
    ruleForm.exam_type
  );
});
const clear = () => {
  isVisibkeButton.value = false;
  const isHasFormValue =
    ruleForm.exam_date_id || ruleForm.certificate || ruleForm.exam_type;
  if (isHasFormValue) {
    ruleForm.exam_date_id = null;
    ruleForm.certificate = null;
    ruleForm.exam_type = null as any;
  } else {
    openRetake.value = false;
  }
};
const uploadFile = (file: any) => {
  ruleForm.certificate = file;
  changeForButton();
};
const changeForButton = () => {
  isVisibkeButton.value = true;
};

// for utc get
const getTimeUtc = (_date: Date) => {
  return dayjs(_date).utc(false).utcOffset(5, true).format("HH:mm");
};
const getDateUtc = (_date: Date) => {
  return dayjs(_date).utc(false).utcOffset(5, true).format("DD.MM.YYYY");
};

watch(
  () => props.subjectData,
  () => {
    Object.assign(
      ruleForm,
      {
        id: props.subjectData.id,
        exam_type: props.subjectData.exam_type,
        subject_id: props.subjectData.subject_id,
        subject: props.subjectData.subject,
        certificate: props.subjectData.certificate,
        exam_date_id: props.subjectData.exam_date_id,
      },
      { deep: true }
    );
  }
);
watch(windowWidth, (width) => {
  isDesktop.value = width >= 768;
});
watch(
  () => ruleForm.exam_type,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      ruleForm.exam_date_id = null;
    }
  }
);
const openRetakeModal = (data: any) => {
  retake.value = data;
  ruleForm.certificate = null;
  ruleForm.exam_date_id = null;
  ruleForm.exam_type = undefined as any;
  openRetake.value = true;
};

const updateSubject = async (
  formEl: FormInstance | undefined,
  updateStatus: boolean
) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      emit("submit", { updateStatus, ...ruleForm });
      isVisibkeButton.value = false;
      openRetake.value = false;
      ruleForm.certificate = null;
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped></style>
