<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      :class="classes"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="vuesax/linear/book">
        <g id="book">
          <path
            id="Vector"
            d="M3.5 18V7C3.5 3 4.5 2 8.5 2H15.5C19.5 2 20.5 3 20.5 7V17C20.5 17.14 20.5 17.28 20.49 17.42"
            stroke="#F76C02"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M6.35 15H20.5V18.5C20.5 20.43 18.93 22 17 22H7C5.07 22 3.5 20.43 3.5 18.5V17.85C3.5 16.28 4.78 15 6.35 15Z"
            stroke="#F76C02"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M8 7H16"
            stroke="#F76C02"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_4"
            d="M8 10.5H13"
            stroke="#F76C02"
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
  name: "ActiveBookIcon",
  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
