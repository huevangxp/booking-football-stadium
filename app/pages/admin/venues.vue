<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-black text-slate-900 tracking-tight">
        Court Management
      </h2>
      <button class="btn btn-primary shadow-lg shadow-primary/20 h-11 px-6">
        <span class="text-xl mr-2">+</span> Add New Court
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        v-for="venue in venues"
        :key="venue.id"
        class="card p-0 overflow-hidden group"
      >
        <div
          class="h-48 bg-slate-200 relative flex items-center justify-center overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-all duration-300"
          ></div>
          <span
            class="text-slate-400 font-black uppercase tracking-widest text-xs z-10"
            >{{ venue.type }}</span
          >
          <span
            class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg"
            :class="
              venue.active ? 'bg-green-500 shadow-green-500/20' : 'bg-slate-400'
            "
          >
            {{ venue.active ? "Active" : "Offline" }}
          </span>
        </div>

        <div class="p-6 space-y-5">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-black text-slate-900 leading-tight">
                {{ venue.name }}
              </h3>
              <p
                class="text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                {{ venue.type }}
              </p>
            </div>
            <button
              class="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm text-sm"
            >
              ✏️
            </button>
          </div>

          <div
            class="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100"
          >
            <div class="flex justify-between items-center">
              <span
                class="text-xs font-bold text-slate-500 uppercase tracking-wider"
                >Normal</span
              >
              <span class="text-sm font-black text-slate-900"
                >₭{{ venue.priceNormal.toLocaleString() }}/hr</span
              >
            </div>
            <div
              class="flex justify-between items-center bg-green-500/5 -mx-2 px-2 py-1 rounded-lg"
            >
              <span
                class="text-xs font-bold text-green-600 uppercase tracking-wider"
                >Happy Hour</span
              >
              <span class="text-sm font-black text-green-600"
                >₭{{ venue.priceHappy.toLocaleString() }}/hr</span
              >
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="f in venue.facilities"
              :key="f"
              class="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase border border-slate-200/50"
              >{{ f }}</span
            >
          </div>

          <div
            class="pt-4 border-t border-slate-100 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  :checked="venue.active"
                  class="sr-only peer"
                />
                <div
                  class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
              <span class="text-xs font-bold text-slate-600 uppercase"
                >Accept Bookings</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const venues = ref([
  {
    id: 1,
    name: "MAIN COURT 1",
    type: "Football 5-a-side",
    priceNormal: 150000,
    priceHappy: 100000,
    active: true,
    facilities: ["Parking", "Water", "Locker"],
  },
  {
    id: 2,
    name: "MAIN COURT 2",
    type: "Football 5-a-side",
    priceNormal: 150000,
    priceHappy: 100000,
    active: true,
    facilities: ["Parking", "Water"],
  },
  {
    id: 3,
    name: "WEST COURT 3",
    type: "Football 7-a-side",
    priceNormal: 250000,
    priceHappy: 200000,
    active: false,
    facilities: ["Parking", "Shower"],
  },
  {
    id: 4,
    name: "BADMINTON HALL 1",
    type: "Badminton",
    priceNormal: 50000,
    priceHappy: 35000,
    active: true,
    facilities: ["AC", "Wifi"],
  },
]);
</script>
