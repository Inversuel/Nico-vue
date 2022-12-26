<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { store } from "../../data/Data.js";

export default defineComponent({
  name: "ModalFilterPrice",
  setup() {
    const valueMin = ref(0);
    const valueMax = ref();

    const showModal = ref(false);
    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    watch(valueMax, () => {
      console.log("valueMax", valueMax.value);
      filterRef();
    });
    watch(valueMin, () => {
      console.log("valueMin", valueMin.value);

      filterRef();
    });

    const filterRef = () => {
      store.data = store.dataCopy;
      store.data = store.data.filter(function (str) {
        if (valueMin.value === undefined || valueMin.value === null) {
          console.log("hitvalueMax");
          return str.price <= valueMax.value;
        }
        if (valueMax.value === undefined || valueMax.value === null) {
          console.log("hitvalueMin");

          return str.price >= valueMin.value;
        } else {
          console.log("hitelse");
          return str.price <= valueMax.value && str.price >= valueMin.value;
        }
      });
      if (
        (valueMin.value === undefined || valueMin.value === null) &&
        (valueMax.value === undefined || valueMax.value === null)
      ) {
        store.data = store.dataCopy;
      }
    };

    return {
      valueMin,
      valueMax,
      showModal,
      toggleModal,
    };
  },
});
</script>


<template>
  <img
    v-if="!valueMin || !valueMax"
    src="../../assets/pin.svg"
    className="w-3 h-3 cursor-pointer text-second"
    alt="change order image"
    @click="toggleModal"
  />
  <img
    v-else-if="valueMin || valueMax"
    src="../../assets/pin-fill.svg"
    className="w-3 h-3 cursor-pointer text-second"
    alt="change order image"
    @click="toggleModal"
  />

  <div
    ref="targetEl"
    id="authentication-modal"
    tabindex="-1"
    aria-hidden="showModal"
    :class="{
      hidden: !showModal,
    }"
    class="
      grid
      place-items-center
      fixed
      text-start
      md:top-0
      top-80
      left-0
      right-0
      z-50
      w-full
      p-4
      overflow-x-hidden overflow-y-auto
      md:inset-0
      h-modal
      md:h-full
    "
  >
    <div class="relative">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="toggleModal"
          type="button"
          class="
            absolute
            top-3
            right-2.5
            text-gray-400
            bg-transparent
            hover:bg-gray-200 hover:text-gray-900
            rounded-lg
            text-sm
            p-1.5
            ml-auto
            inline-flex
            items-center
            dark:hover:bg-gray-800 dark:hover:text-white
          "
          data-modal-toggle="authentication-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Price min</label
          >
          <input
            type="text"
            v-model="valueMin"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-600
              dark:border-gray-500
              dark:placeholder-gray-400
              dark:text-white
            "
          />
        </div>
        <div class="p-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Price max</label
          >
          <input
            type="text"
            v-model="valueMax"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-600
              dark:border-gray-500
              dark:placeholder-gray-400
              dark:text-white
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>