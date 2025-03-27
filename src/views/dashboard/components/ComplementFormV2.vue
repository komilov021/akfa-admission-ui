<template>
  <div>
    <strong class="flex mx-auto justify-center text-center text-[24px] mb-4"
      >Personal Information</strong
    >
    <div class="grid md:grid-cols-2 gap-x-4">
      <el-form-item
        v-if="user?.is_foreign == false"
        label="Phone Number"
        prop="first_phone_number"
      >
        <el-input
          v-model="ruleForm.first_phone_number"
          type="text"
          v-mask="'+998 ## ###-##-##'"
          autocomplete="off"
          size="large"
          placeholder="Your Phone"
        />
      </el-form-item>
      <el-form-item v-else label="Email" prop="email">
        <el-input
          v-model="ruleForm.email"
          type="email"
          autocomplete="off"
          size="large"
          placeholder="Your email"
        />
      </el-form-item>

      <el-form-item
        v-if="user?.is_foreign == false"
        label="Email"
        prop="delete_email"
      >
        <el-input
          v-model="ruleForm.delete_email"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your Email"
        />
      </el-form-item>
      <el-form-item v-else label="Phone Number" prop="phone_number">
        <el-input
          v-model="ruleForm.first_phone_number"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your Phone"
          @keypress="onlyNumber"
        />
      </el-form-item>
      <el-form-item label="PINFL" prop="pnfl">
        <el-input
          v-model="ruleForm.pnfl"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="PINFL (Personal Identification Number)"
        />
      </el-form-item>
      <el-form-item
        v-if="!user?.is_foreign"
        label="Second Phone Number"
        prop="second_phone_number"
      >
        <el-input
          v-model="ruleForm.second_phone_number"
          type="text"
          autocomplete="off"
          v-mask="'+998 ## ###-##-##'"
          size="large"
          placeholder="Your phone number"
        />
      </el-form-item>
      <el-form-item
        v-else
        label="Second phone number"
        prop="second_phone_number"
      >
        <el-input
          v-model="ruleForm.second_phone_number"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your phone number"
          @keypress="onlyNumber"
        />
      </el-form-item>
      <el-form-item label="Citizenship" prop="country">
        <el-input
          v-model="ruleForm.country"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your Citizenship"
        />
      </el-form-item>
      <el-form-item label="Region" prop="region">
        <el-input
          v-model="ruleForm.region"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your region"
        />
      </el-form-item>
      <el-form-item label="City / Town" prop="city_or_town">
        <el-input
          v-model="ruleForm.city_or_town"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your city"
        />
      </el-form-item>
      <el-form-item label="Street" prop="street">
        <el-input
          v-model="ruleForm.street"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your street"
        />
      </el-form-item>
      <el-form-item label="Apartment" prop="address">
        <el-input
          v-model="ruleForm.address"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your apartment"
        />
      </el-form-item>
    </div>
    <div class="border my-5"></div>
    <strong class="text-[24px] text-center flex mx-auto justify-center"
      >Educational Background</strong
    >
    <h1 class="text-sm font-semibold text-[#757586] text-center">
      Enter details about your previous education.
    </h1>
    <div class="grid md:grid-cols-2 gap-x-4 mt-4">
      <el-form-item
        label="Name of the educational institution"
        prop="university"
      >
        <el-input
          v-model="ruleForm.university"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Name of the university where the degree was obtained"
        />
      </el-form-item>
      <el-form-item label="Faculty" prop="faculty">
        <el-input
          v-model="ruleForm.faculty"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Name of Faculty"
        />
      </el-form-item>
      <el-form-item label="Specialty" prop="specialty">
        <el-input
          v-model="ruleForm.specialty"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Name of Specialty"
        />
      </el-form-item>
      <el-form-item label="GPA" prop="gpa">
        <el-input
          v-model="ruleForm.gpa"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Grade Point Average"
        />
      </el-form-item>
    </div>
    <div class="border my-5"></div>
    <div class="flex flex-col justify-center">
      <strong class="text-[24px] text-center">
        Professional experience (if applicable)
      </strong>
      <h1 class="text-sm font-semibold text-[#757586] text-center">
        Enter details about your work experience.
      </h1>
    </div>
    <div class="grid md:grid-cols-2 gap-x-4 mt-2">
      <el-form-item label="Organization" prop="organization">
        <el-input
          v-model="ruleForm.organization"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Organization"
        />
      </el-form-item>
      <el-form-item label="Job Title" prop="jobtitle">
        <el-input
          v-model="ruleForm.jobtitle"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Job Title"
        />
      </el-form-item>
      <el-form-item label="Work Period" prop="workperiod">
        <el-input
          v-model="ruleForm.workperiod"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Work Period"
        />
      </el-form-item>
      <el-form-item
        label="Key Responsibilities"
        prop="responsibilities"
        class="w-full"
      >
        <el-input
          v-model="ruleForm.responsibilities"
          type="textarea"
          autocomplete="off"
          rows="4"
          maxlength="999"
          show-word-limit
          placeholder="Key Responsibilities"
        />
      </el-form-item>
    </div>
    <div class="border my-5"></div>
    <strong>Residency Program Application</strong>
    <div class="grid md:grid-cols-2">
      <el-form-item
        label="Why do you want to apply for a residency?"
        prop="reason"
        class="w-full"
      >
        <el-input
          v-model="ruleForm.reason"
          type="textarea"
          autocomplete="off"
          rows="4"
          maxlength="999"
          show-word-limit
          placeholder="Why do you want to apply for a residency?"
        />
      </el-form-item>
    </div>
    <div class="border my-5"></div>
    <h1 class="text-sm font-semibold text-[#333]">
      How did you learn about the residency program?
    </h1>
    <div class="grid lg:grid-cols-2">
      <el-checkbox
        v-for="(item, index) in learnAboutResidency"
        :key="index"
        v-model="ruleForm.wonders"
        :label="item"
      >
        <h1 class="text-[11px] sm:text-[14px]">{{ item }}</h1>
      </el-checkbox>
    </div>
    <el-form-item label="Other" class="mt-1 w-full" prop="another_wonder">
      <el-input
        v-model="ruleForm.another_wonder"
        type="text"
        class="!w-full"
        size="large"
        autocomplete="off"
        placeholder="Other..."
      />
    </el-form-item>
    <!-- <h1 class="font-semibold text-[#333] text-2xl">Confirmation</h1> -->
    <el-form-item label="Confirmation">
      <el-checkbox v-model="ruleForm.apply_residency">
        <h1
          class="text-xs sm:text-sm leading-tight whitespace-normal break-words"
        >
          I confirm that the information provided in this application is
          accurate and truthful.
        </h1>
      </el-checkbox>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { IUser } from "@/models/backend";
import type { FormInstance, FormRules } from "element-plus";
const ruleForm = defineModel<any>();
const props = defineProps<{
  user: any;
}>();
const learnAboutResidency = [
  "University website",
  "University representatives or admissions office",
  "Faculty members or academic advisors",
  "Social media (Instagram, Facebook, LinkedIn, etc.)",
  "Online advertisement (Google Ads, YouTube, etc.)",
  "Friends, family, or acquaintances",
  "Professional medical associations or conferences",
  "Educational fairs or open days",
];
const onlyNumber = ($event: any) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    $event.preventDefault();
  }
};
</script>

<style scoped></style>
