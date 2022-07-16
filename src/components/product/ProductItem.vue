<script setup></script>

<template>
  <div class="group relative">
    <div
      class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
    >
      <img
        src="https://placekitten.com/240/320"
        alt="Front of men&#039;s Basic Tee in black."
        class="w-full h-full object-center object-cover lg:w-full lg:h-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            <span aria-hidden="true" class="inset-0"></span>
            Product name
          </a>
        </h3>
      </div>
      <p class="text-sm font-medium text-gray-900">฿35</p>
    </div>
    <div class="flex space-x-2 justify-center mt-2">
      <button
        class="px-6 py-1 transition ease-in duration-200 w-full rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>
