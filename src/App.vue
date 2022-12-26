<script lang="ts">
import Table from "./components/table/Table.vue";
import { defineComponent } from "vue";
import ModalAddProduct from "./components/modal/ModalAddProduct.vue";
export default defineComponent({
  name: "App",
  components: {
    Table,
    ModalAddProduct,
  },
});
</script>

<template>
  <div
    className="justify-evenly w-screen items-center h-screen flex flex-col bg-second dark:bg-gray-900"
  >
    <div>
      <h1
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center"
      >
        NICOMATIC Sp. Z o.o.
      </h1>
      <p
        className="mb-6 text-lg font-normal text-gray-800 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center"
      >
        FRONTEND - Vue.js technical test – CRUD
      </p>
    </div>
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col items-end gap-4 md:w-auto w-full  ">
        <ModalAddProduct />
        <Table />
      </div>
    </div>
  </div>
</template>
