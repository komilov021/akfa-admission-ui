<template>
  <div>
    <!-- <div class="grid grid-flow-col md:grid-rows-3 grid-rows-4 gap-x-4 mb-4">
      <el-form-item label="School" class="!mb-4" prop="school">
        <el-input
          v-model="ruleForm.school"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="School"
        />
      </el-form-item>
      <el-form-item label="College" class="!mb-4" prop="college">
        <el-input
          v-model="ruleForm.college"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="College"
        />
      </el-form-item>
      <el-form-item class="!mb-4" label="University" prop="university">
        <el-input
          v-model="ruleForm.university"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="University"
        />
      </el-form-item>
      <el-form-item class="!mb-4" label="Lyceum" prop="lyceum">
        <el-input
          v-model="ruleForm.lyceum"
          type="text"
          autocomplete="off"
          size="large"
          placeholder="Lyceum"
        />
      </el-form-item>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Minus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const ruleForm = defineModel<any>();
const options = [
  { label: "School", value: "school" },
  { label: "College", value: "college" },
  { label: "University", value: "university" },
  { label: "Lyceum", value: "lyceum" },
];

const selectedItems = ref([]);

const removeItem = (item: any) => {
  selectedItems.value = selectedItems.value.filter((i) => i !== item);
  ElMessage.info(`${item} removed`);
};

const updateRuleForm = () => {
  selectedItems.value.forEach((item) => {
    if (!ruleForm.value[item]) {
      ruleForm.value[item] = "";
    }
  });
};
</script>

<style scoped></style>
