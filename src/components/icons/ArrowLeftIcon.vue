<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      :class="classes"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="vuesax/linear/arrow-square-down">
        <g id="arrow-square-down">
          <path
            id="Vector"
            d="M15 6L9 12L15 18"
            stroke="#757586"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArrowLeftIcon",

  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
