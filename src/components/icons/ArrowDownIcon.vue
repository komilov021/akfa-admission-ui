<template>
  <div>
    <svg
      width="24"
      :class="classes"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="#222529"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArrowDownIcon",

  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
