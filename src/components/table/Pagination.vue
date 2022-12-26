<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { store } from "../../data/Data";

export default defineComponent({
  name: "Pagination",
  setup(){
    const pagesStore = store.pages();
    return {
      store,
      pagesStore,
    }
  },
});
</script>

<template>
  <div class="flex items-center justify-between md:w-[600px] w-auto">
    <div class="flex flex-1 justify-between sm:hidden">
      <p
        @click="$emit('onClick', store.currentPage - 1)"
        class="
          cursor-pointer
          relative
          inline-flex
          items-center
          rounded-md
          border border-gray-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-50
        "
      >
        Previous
      </p>
      <p
        @click="$emit('onClick', store.currentPage + 1)"
        class="
          cursor-pointer
          relative
          ml-3
          inline-flex
          items-center
          rounded-md
          border border-gray-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          hover:bg-gray-50
        "
      >
        Next
      </p>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ store.currentPage }}</span>
          of
          <span class="font-medium">{{ pagesStore }}</span>
          pages
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <p
            @click="$emit('onClick', store.currentPage - 1)"
            class="
              relative
              inline-flex
              items-center
              rounded-l-md
              border border-gray-300
              bg-white
              px-2
              py-2
              text-sm
              font-medium
              text-gray-500
              hover:bg-gray-50
              focus:z-20
            "
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: mini/chevron-left -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
          <!-- if pages leng < 7  -->
          <div v-if="pagesStore.leng < 7">
            <div v-for="page in pagesStore" :key="page.value">
              <p
                @click="$emit('onClick', store.page)"
                v-if="page === store.currentPage"
                aria-current="page"
                className="
              cursor-pointer
              relative
              z-10
              inline-flex
              items-center
              border border-second
              bg-indigo-50
              px-4
              py-2
              text-sm
              font-medium
              text-second
              focus:z-20
            "
              >
                {{ page }}
              </p>
              <p
                v-else
                @click="$emit('onClick', page)"
                class="
                  cursor-pointer
                  relative
                  inline-flex
                  items-center
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-500
                  hover:bg-gray-50
                  focus:z-20
                "
              >
                {{ page }}
              </p>
            </div>
          </div>
          <div v-else class="flex">
            <div v-for="page in pagesStore" :key="page.value">
              <p
                @click="$emit('onClick', page)"
                v-if="page === store.currentPage"
                aria-current="page"
                className="
              cursor-pointer
              relative
              z-10
              inline-flex
              items-center
              border border-second
              bg-indigo-50
              px-4
              py-2
              text-sm
              font-medium
              text-second
              focus:z-20
            "
              >
                {{ page }}
              </p>
              <p
                v-else-if="page === store.currentPage - 1 || page === store.currentPage + 1"
                @click="$emit('onClick', page)"
                class="
                  cursor-pointer
                  relative
                  inline-flex
                  items-center
                  border border-gray-300
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-500
                  hover:bg-gray-50
                  focus:z-20
                "
              >
                {{ page }}
              </p>
            </div>
          </div>
          <div
            @click="$emit('onClick', store.currentPage + 1)"
            class="
              relative
              inline-flex
              items-center
              rounded-r-md
              border border-gray-300
              bg-white
              px-2
              py-2
              text-sm
              font-medium
              text-gray-500
              hover:bg-gray-50
              focus:z-20
            "
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: mini/chevron-right -->
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- <div class="flex flex-col items-center">
  Help text
  <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white">{{currentPage}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{pages}}</span> Pages
  </span>
  <div class="inline-flex mt-2 xs:mt-0">
    Buttons
    <button 
    @click="$emit('onClick', currentPage - 1)"
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
        Prev
    </button>
    <button 
    @click="$emit('onClick', currentPage + 1)" 
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <svg aria-hidden="true" class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
</div> -->
  <!-- 
  <nav className="w-full justify-center flex">
    <ul className="inline-flex -space-x-px">
      <li>
        <p
          className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </p>
      </li>
      <li v-for="page in pages" :key="page.value">
        <p
          v-if="page !== currentPage"
          className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="$emit('onClick', page)"
        >
          {{ page }}
        </p>
        <p
          v-else
          aria-current="page"
          className="px-3 py-[6px] text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          {{ page }}
        </p>
      </li>
      <li>
        <p
          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </p>
      </li>
    </ul>
  </nav> -->
</template>
