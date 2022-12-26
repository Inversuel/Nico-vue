<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import {store} from "../../data/Data.js";

export default defineComponent({
  name: "ModalEditProduct",
  emits: ["parentMethod"],
  props: {
    refProp: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const showModal = ref(false);
    const nameForm = ref("");
    const cityForm = ref("");
    const priceForm = ref(0);
    const refForm = ref(0);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const onSubmit = () => {
      if (!nameForm.value || !cityForm.value || !priceForm.value) return;
      store.update({
        ref: refForm.value,
        name: nameForm.value,
        city: cityForm.value,
        price: priceForm.value,
      });

      nameForm.value = "";
      cityForm.value = "";
      priceForm.value = 0;
      toggleModal();
    };

    const getRef = () => {
      const dataFilter = store.data.find((item) => item.ref === props.refProp);
      if(!dataFilter) return;
      nameForm.value = dataFilter.name;
      cityForm.value = dataFilter.city;
      priceForm.value = dataFilter.price;
      refForm.value = props.refProp;
      toggleModal();
    };

    return {
      showModal,
      toggleModal,
      onSubmit,
      nameForm,
      cityForm,
      priceForm,
      getRef,
    };
  },
});
</script>


<template>
  <p
    @click="getRef"
    className="font-medium text-second dark:text-blue-500 hover:underline cursor-pointer"
  >
    Edit
  </p>
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
      top-0
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
    <div class="relative w-full h-full max-w-md md:h-auto">
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
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Edit new product
          </h3>
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label
                for="name"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Name</label
              >
              <input
                type="text"
                v-model="nameForm"
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
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label
                for="city"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >City</label
              >
              <input
                type="text"
                v-model="cityForm"
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
                placeholder="Enter city name"
                required
              />
            </div>
            <div>
              <label
                for="priceForm"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Price</label
              >
              <input
                type="number"
                v-model="priceForm"
                min="0"
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
                placeholder="Enter price"
                required
              />
            </div>
            <button
              type="submit"
              class="
                w-full
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Edit product
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
