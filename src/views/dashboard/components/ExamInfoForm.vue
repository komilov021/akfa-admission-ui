<template>
  <div>
    <div v-if="!enterShowInfo">
      <h1 class="text-[#222529] text-base font-bold">
        🎉 Congratulations! You have successfully passed all exams! ✅
      </h1>
      <p class="text-[#222529] text-base font-normal leading-normal">
        To proceed further, please fill in your personal details and upload the
        required documents.
      </p>
      <div class="mt-4">
        <p class="text-[#222529] text-base font-normal leading-normal">
          📌 Important:
        </p>
        <ul
          class="list-disc list-inside text-[#222529] text-base font-normal leading-normal"
        >
          <li>Carefully check your information before submitting.</li>
          <li>
            Your documents will be accepted only if all data is correctly filled
            in. Otherwise, you will be notified about the fields that need to be
            updated.
          </li>
          <li>
            Your personal data is requested for contract processing and future
            payment arrangements.
          </li>
        </ul>
      </div>
    </div>
    <div v-else-if="transaction?.operation_state == 'SUCCESS'">
      <h1 class="text-[#222529] text-base font-bold">
        Congratulations! Your registration and exam payment have been
        successfully completed.
      </h1>
    </div>
    <div v-else>
      <h1 class="text-[#222529] text-base font-bold">
        Exam Registration Instructions
      </h1>
      <h1 class="text-[#222529] text-base font-bold">
        1. Selected Program & Required Exams
      </h1>
      <p class="text-[#222529] text-base font-normal leading-normal">
        Dear Applicant,
      </p>
      <p class="text-[#222529] text-base font-normal leading-normal">
        You have selected the {{ subjectList[0]?.program }} . Based on your
        selection, you are required to take the following exams:
        {{ subjectList.map((item: any) => item?.subject).join(", ") }}
      </p>
      <div class="my-4">
        <p class="text-[#222529] text-base font-normal leading-normal">
          ✅ Exam Registration & Payment
        </p>
        <ul
          class="list-disc list-inside text-[#222529] text-base font-normal leading-normal"
        >
          <li>Each subject exam costs 100,000 UZS.</li>
          <li>Payment can be made via online payment systems.</li>
          <li>
            Upon successful payment, you will be officially registered for the
            exam.
          </li>
        </ul>
        <p class="text-[#222529] text-base font-normal leading-normal">
          ✅ Alternative Option
        </p>
        <ul
          class="list-disc list-inside text-[#222529] text-base font-normal leading-normal"
        >
          <li>
            Instead of taking the exam, you may submit a relevant certificate.
          </li>
          <li>If you submit a valid certificate, no payment is required.</li>
        </ul>
      </div>
      <strong class="text-black">(!)Important:</strong>
      <p class="text-[#222529] text-base font-normal leading-normal">
        📌 Please ensure that you complete the registration and payment process
        to secure your exam slot.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  subjectList?: any;
  enterShowInfo?: boolean;
  transaction?: any;
}>();
</script>

<style scoped></style>
