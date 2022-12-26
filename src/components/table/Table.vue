<script lang="ts">
import Pagination from "./Pagination.vue";
import ModalEditProduct from "../modal/ModalEditProduct.vue";
import ModalDelteProduct from "../modal/ModalDelteProduct.vue";
import ModalFilterRef from "../modal/ModalFilterRef.vue";
import ModalFilterName from "../modal/ModalFilterName.vue";
import ModalFilterCity from "../modal/ModalFilterCity.vue";
import ModalFilterPrice from "../modal/ModalFilterPrice.vue";
import { store } from "../../data/Data.js";
import { ref, defineComponent, watch } from "vue";

export default defineComponent({
  name: "Table",
  components: {
    Pagination,
    ModalEditProduct,
    ModalDelteProduct,
    ModalFilterRef,
    ModalFilterName,
    ModalFilterCity,
    ModalFilterPrice,
  },
  setup() {
    
    const items = ref(store.dataForCurrentPage());
      watch([store.currentPage, store.data, store], () => {
        items.value = store.dataForCurrentPage();
      });
    const onClick = (page: number) => {
      if (page < 1) {
        return store.changeCurrentPage(1);
      }
      if (page > store.pages()) {
        return store.changeCurrentPage(store.pages());
      }
      return store.changeCurrentPage(page);
    };

    const ascDesc = ref(true);
    const sort = (key: string) => {
      if (ascDesc.value) {
        store.data.sort((a: any, b: any) => {
          if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > b[key]) {
            return 1;
          }
          return 0;
        });
        ascDesc.value = false;
      } else {
        store.data.sort((a: any, b: any) => {
          if (a[key] > b[key]) {
            return -1;
          }
          if (a[key] < b[key]) {
            return 1;
          }
          return 0;
        });
        ascDesc.value = true;
      }
    };

    return {
      items,
      onClick,
      sort,
      store,
    };
  },
});
</script>

<template>
  <div
    class="
      overflow-x-auto
      relative
      shadow-md
      sm:rounded-lg
      max-w-full
      md:min-w-[641px]
      min-w-0 min-h-[300px]
      bg-gray-50
      dark:bg-gray-700 dark:text-gray-400
    "
  >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" className="py-3 px-6">
            <div className="flex items-center">
              Ref
              <img
                src="../../assets/order-arrow.svg"
                className="w-3 h-3 cursor-pointer"
                alt="change order image"
                @click="sort('ref')"
              />
              <ModalFilterRef />
            </div>
          </th>
          <th scope="col" className="py-3 px-6">
            <div className="flex items-center">
              Name
              <img
                src="../../assets/order-arrow.svg"
                className="w-3 h-3 cursor-pointer"
                alt="change order image"
                @click="sort('name')"
              />
              <ModalFilterName />
            </div>
          </th>
          <th scope="col" className="py-3 px-6">
            <div className="flex items-center">
              City
              <img
                src="../../assets/order-arrow.svg"
                className="w-3 h-3 cursor-pointer"
                alt="change order image"
                @click="sort('city')"
              />
              <ModalFilterCity />
            </div>
          </th>
          <th scope="col" className="py-3 px-6">
            <div className="flex items-center">
              Price
              <img
                src="../../assets/order-arrow.svg"
                className="w-3 h-3 cursor-pointer text-second"
                alt="change order image"
                @click="sort('price')"
              />
              <ModalFilterPrice />
            </div>
          </th>
          <th scope="col" className="py-3 px-6"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ item.ref + 1 }}
          </th>
          <td className="py-4 px-6">{{ item.name }}</td>
          <td className="py-4 px-6">{{ item.city }}</td>
          <td className="py-4 px-6">${{ item.price }}</td>
          <td className="py-4 px-6 text-right">
            <ModalEditProduct :refProp="item.ref" />
            <ModalDelteProduct
              :refProp="item.ref"
              @click-submit="() => store.delete(item.ref)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination @on-click="(n) => onClick(n)" />
</template>
