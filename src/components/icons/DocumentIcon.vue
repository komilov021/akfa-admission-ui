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
      <g id="vuesax/linear/document-text">
        <g id="document-text">
          <path
            id="Vector"
            d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
            stroke="#757586"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
            stroke="#757586"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_3"
            d="M8 13H12"
            stroke="#757586"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_4"
            d="M8 17H16"
            stroke="#757586"
            stroke-width="1.5"
            stroke-miterlimit="10"
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
  name: "DocumentIcon",
  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
