<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      :class="classes"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <g id="vuesax/linear/document-text">
        <g id="document-text">
          <path
            id="Vector"
            d="M22.5 10V15C22.5 20 20.5 22 15.5 22H9.5C4.5 22 2.5 20 2.5 15V9C2.5 4 4.5 2 9.5 2H14.5"
            stroke="#757586"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M22.5 10H18.5C15.5 10 14.5 9 14.5 6V2L22.5 10Z"
            stroke="#757586"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M7.5 13H13.5"
            stroke="#757586"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_4"
            d="M7.5 17H11.5"
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
  name: "CertificatFileIcon",
  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped></style>
