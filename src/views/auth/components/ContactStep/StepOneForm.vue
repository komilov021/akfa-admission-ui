<template>
  <div>
    <el-form-item label="First Name" prop="name">
      <el-input
        v-model="form.name"
        type="text"
        autocomplete="off"
        class="!h-[44px]"
        placeholder="Enter your first name"
      />
    </el-form-item>
    <el-form-item label="Last Name" prop="surname">
      <el-input
        v-model="form.surname"
        type="text"
        autocomplete="off"
        class="!h-[44px]"
        placeholder="Enter your last name"
      />
    </el-form-item>
    <div class="block md:flex gap-4 w-full">
      <el-form-item label="Select Gender" class="w-full" prop="gender">
        <el-select
          v-model="form.gender"
          size="large"
          class="!h-[44px] !w-full"
          placeholder="Choose gender"
          clearable
        >
          <el-option label="Male" value="male"></el-option>
          <el-option label="Female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Date of Birth" class="w-full" prop="birth_date">
        <template v-if="isMobile">
          <input
            v-model="formattedDate"
            type="date"
            :max="maxDate"
            class="date-input w-full p-2 h-[44px] border rounded-md focus:border-[#F76C02] focus:ring-2 focus:ring-[#F76C02]"
            @input="updateDate"
          />
        </template>
        <template v-else>
          <el-date-picker
            v-model="form.birth_date"
            type="date"
            size="large"
            class="!w-full"
            :default-value="date_format"
            :disabled-date="disabledDate"
            placeholder="Select a date"
          />
        </template>
      </el-form-item>
    </div>
    <el-form-item label="Passport / ID Number" prop="passport_number">
      <el-input
        v-model="form.passport_number"
        :v-mask="props.data?.is_foreign ? '' : 'SS #######'"
        type="text"
        autocomplete="off"
        @input="(value: string) => formatToUppercase(value)"
        class="!h-[44px]"
        placeholder="AA 0000000"
      />
    </el-form-item>
    <div
      class="mt-[30px] md:mt-[40px] mb-[5px] flex items-center gap-2 justify-center"
    >
      <el-button
        class="w-full !h-[44px] !bg-transparent"
        @click="emit('onCancel')"
        >Cancel</el-button
      >
      <el-button
        class="w-full !h-[44px]"
        type="primary"
        @click="emit('onSubmit')"
        :disabled="
          !form.name ||
          !form.surname ||
          !form.gender ||
          (!data?.is_foreign && !form.passport_number) ||
          !form.birth_date
        "
        >Next</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { dayjs } from "element-plus";
import { computed, ref, watch } from "vue";
const isMobile = computed(() => window.innerWidth <= 768);
const form = defineModel<{
  name: string;
  surname: string;
  birth_date: string;
  passport_number: string;
  gender: string;
}>() as any;
const props = defineProps<{
  data: {
    is_foreign: boolean;
  } | null;
}>();
const emit = defineEmits(["onSubmit", "onCancel"]);
const formatToUppercase = (value: string) => {
  form.value.passport_number = value.toUpperCase();
};
const maxDate = computed(() =>
  dayjs().subtract(14, "year").format("YYYY-MM-DD")
);
const date_format = computed(() => dayjs().subtract(14, "year").toDate());
const formattedDate = computed({
  get: () =>
    form.value.birth_date
      ? dayjs(form.value.birth_date).format("YYYY-MM-DD")
      : "",
  set: (value: string) => {
    form.value.birth_date = dayjs(value).format("YYYY-MM-DD");
  },
});
const updateDate = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (!target) return;
  form.value.birth_date = dayjs(target.value).format("YYYY-MM-DD");
};
watch(
  () => form.value.birth_date,
  (newVal) => {
    formattedDate.value = newVal ? dayjs(newVal).format("YYYY-MM-DD") : "";
  }
);
const disabledDate = (current_day: Date) => {
  const min_year = dayjs().subtract(14, "year").toDate();
  return current_day > min_year;
};
</script>

<style scoped>
.date-input:focus {
  border-color: #f76c02;
  outline: none;
  box-shadow: 0 0 1px rgba(247, 108, 2, 0.6);
}
</style>
