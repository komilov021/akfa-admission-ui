<template>
  <div>
    <div class="grid md:grid-cols-2 gap-x-4 mb-4">
      <el-form-item label="First name" prop="name">
        <el-input
          v-model="chileRuleForm.name"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your name"
        />
      </el-form-item>
      <el-form-item label="Last name" prop="surname">
        <el-input
          v-model="chileRuleForm.surname"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your last name"
        />
      </el-form-item>
      <el-form-item label="Date of birth" prop="date_of_birth">
        <el-date-picker
          v-model="chileRuleForm.date_of_birth"
          type="date"
          autocomplete="off"
          class="!w-full"
          placeholder="Your birthday"
          size="large"
        />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="chileRuleForm.email"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Your email"
        />
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select
          v-model="chileRuleForm.gender"
          size="large"
          class="w-full !h-[44px]"
          placeholder="Select gender"
          clearable
        >
          <el-option label="Male" value="male"></el-option>
          <el-option label="Female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Passport/ID series and number" prop="passport_id">
        <el-input
          v-model="chileRuleForm.passport_id"
          :v-mask="userInfo?.is_foreign ? '' : 'SS #######'"
          type="text"
          autocomplete="off"
          @input="(value: string) => formatToUppercase(value)"
          class="!h-[44px]"
          placeholder="Your Passport/ID series and number"
        />
      </el-form-item>
      <el-form-item v-if="!userInfo?.is_foreign" label="PINFL" prop="pnfl">
        <el-input
          v-model="chileRuleForm.pnfl"
          type="text"
          autocomplete="off"
          size="large"
          v-mask="'##############'"
          placeholder="Enter your PINFL"
        />
      </el-form-item>
      <el-form-item v-else label="PINFL" prop="">
        <el-input
          v-model="chileRuleForm.pnfl"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Enter your PINFL"
        />
      </el-form-item>
      <el-form-item
        v-if="!userInfo?.is_foreign"
        label="First phone number"
        prop="first_phone_number"
      >
        <el-input
          v-model.trim="chileRuleForm.first_phone_number"
          type="text"
          autocomplete="off"
          v-mask="'+998 (##) ### ## ##'"
          placeholder="(00) 000 00 00"
          class="!h-[44px]"
        />
      </el-form-item>
      <el-form-item label="First phone number" prop="" v-else>
        <el-input
          v-model.trim="chileRuleForm.first_phone_number"
          type="text"
          @keypress="onlyNumber"
          autocomplete="off"
          placeholder="Your first phone number"
          class="!h-[44px]"
        />
      </el-form-item>
      <el-form-item
        v-if="!userInfo?.is_foreign"
        label="Second phone number"
        prop=""
      >
        <el-input
          v-model.trim="chileRuleForm.second_phone_number"
          type="text"
          autocomplete="off"
          v-mask="'+998(##) ### ## ##'"
          placeholder="(00) 000 00 00"
          class="!h-[44px]"
        />
      </el-form-item>
      <el-form-item v-else label="Second phone number" prop="">
        <el-input
          v-model.trim="chileRuleForm.second_phone_number"
          type="text"
          autocomplete="off"
          @keypress="onlyNumber"
          placeholder="Your second phone number"
          class="!h-[44px]"
        />
      </el-form-item>
      <el-form-item label="Country" prop="country">
        <el-input
          v-model="chileRuleForm.country"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Country"
        />
      </el-form-item>
      <el-form-item label="Region" prop="region">
        <el-input
          v-model="chileRuleForm.region"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Region"
        />
      </el-form-item>
      <el-form-item label="City / Town" prop="city_or_town">
        <el-input
          v-model="chileRuleForm.city_or_town"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="City / Town"
        />
      </el-form-item>
      <el-form-item label="Street" prop="street">
        <el-input
          v-model="chileRuleForm.street"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Street"
        />
      </el-form-item>
      <el-form-item label="House" prop="house">
        <el-input
          v-model="chileRuleForm.house"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="House"
        />
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input
          v-model="chileRuleForm.address"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Address"
        />
      </el-form-item>
      <el-form-item label="Mother’s full name" prop="mothers_full_name">
        <el-input
          v-model="chileRuleForm.mothers_full_name"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Mother’s full name"
        />
      </el-form-item>
      <el-form-item label="Father’s full name" prop="fathers_full_name">
        <el-input
          v-model="chileRuleForm.fathers_full_name"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Father’s full name"
        />
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores";
import { ref, computed, onMounted } from "vue";
import { onlyNumber } from "@/utils/constants";
const userStore = useUsersStore();
const userInfo = computed(() => userStore.getUser);

const chileRuleForm = defineModel<any>();

const formatToUppercase = (value: string) => {
  chileRuleForm.value.passport_id = value.toUpperCase();
};
</script>

<style scoped></style>
