<template>
    <label
        class="flex items-center justify-between p-2 md:p-4 mb-4 border rounded-lg cursor-pointer transition-all flex-nowrap"
        @click="setActive" :class="isActive ? 'border-primary' : 'border-[#E5E5E5]'">
        <div class="flex items-center gap-4 min-w-0">
            <div v-if="props.icon" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shrink-0"
                :class="isActive ? 'border border-primary bg-[#FEF0E6]' : 'border-gray-100'">
                <component :is="props.icon" :fillStyle="isActive ? '#F76C02' : '#757586'" />
            </div>
            <div>
                <p class="text-gray-800 font-bold">{{ title }}</p>
                <p v-if="description" class="text-gray-500 text-sm">{{ description }}</p>
            </div>
        </div>
        <div class="!w-[24px] !h-6 flex items-center justify-center rounded-full border-2 transition-all shrink-0"
            :class="isActive ? 'border-primary' : 'border-[#E5E5E5]'">
            <div v-if="isActive" class="!w-3 !h-3 rounded-full bg-primary"></div>
        </div>
        <input type="radio" :name="groupName" :value="value" class="hidden" />
    </label>
</template>


<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    icon: { type: Object, required: false },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    value: { type: [String, Number], required: true },
    modelValue: { type: [String, Number], required: true },
    groupName: { type: String, default: "random" },
});

const emit = defineEmits(["update:modelValue"]);

const isActive = computed(() => props.modelValue === props.value);

const setActive = () => {
    emit("update:modelValue", props.value);
};



</script>