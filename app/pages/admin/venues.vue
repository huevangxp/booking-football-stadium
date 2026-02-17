<template>
  <div class="space-y-10 animate-in fade-in duration-700">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
    >
      <div>
        <h2
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Venue Console
        </h2>
        <p
          class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          Manage courts, pricing & facilities
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative group">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
            >🔍</span
          >
          <input
            type="text"
            placeholder="Search venues..."
            class="w-64 h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm"
          />
        </div>
        <button
          class="h-12 px-8 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span class="text-xl leading-none">+</span> Add Court
        </button>
      </div>
    </div>

    <!-- Venue List -->
    <div
      class="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
    >
      <!-- Table Header -->
      <div
        class="hidden md:grid grid-cols-12 gap-6 px-10 py-6 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
      >
        <div class="col-span-4">Court Details</div>
        <div class="col-span-3">Pricing Structure</div>
        <div class="col-span-3">Facilities & Specs</div>
        <div class="col-span-2 text-right">Status & Action</div>
      </div>

      <div class="divide-y divide-slate-50">
        <div
          v-for="venue in venues"
          :key="venue.id"
          class="group relative md:grid grid-cols-12 gap-6 px-10 py-8 hover:bg-slate-50/80 transition-all duration-300"
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>

          <!-- Court Details -->
          <div class="col-span-4 flex items-center gap-6">
            <div
              class="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-500 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"
              ></div>
              <span>{{ getIcon(venue.type) }}</span>
            </div>
            <div>
              <h3
                class="text-lg font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-primary transition-colors"
              >
                {{ venue.name }}
              </h3>
              <span
                class="px-2 py-1 bg-slate-100 border border-slate-200 rounded-md text-[9px] font-bold text-slate-500 uppercase tracking-wider"
                >{{ venue.type }}</span
              >
            </div>
          </div>

          <!-- Pricing -->
          <div class="col-span-3 flex flex-col justify-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 rounded-full bg-slate-300"></div>
              <span
                class="text-xs font-bold text-slate-500 uppercase tracking-wide w-16"
                >Standard</span
              >
              <span class="text-sm font-black text-slate-900 tabular-nums"
                >₭{{ venue.priceNormal.toLocaleString() }}</span
              >
            </div>
            <div class="flex items-center gap-3">
              <div
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
              ></div>
              <span
                class="text-xs font-bold text-green-600 uppercase tracking-wide w-16"
                >Peak/Happy</span
              >
              <span class="text-sm font-black text-green-600 tabular-nums"
                >₭{{ venue.priceHappy.toLocaleString() }}</span
              >
            </div>
          </div>

          <!-- Facilities -->
          <div class="col-span-3 flex flex-col justify-center">
            <p
              class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3"
            >
              Amenities Included
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="f in venue.facilities"
                :key="f"
                class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[9px] font-bold text-slate-600 uppercase tracking-wider shadow-sm group-hover:border-primary/20 transition-colors"
              >
                {{ f }}
              </span>
            </div>
          </div>

          <!-- Status & Actions -->
          <div class="col-span-2 flex flex-col items-end justify-center gap-4">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                :checked="venue.active"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner"
              ></div>
              <span
                class="ml-3 text-[9px] font-black uppercase tracking-widest"
                :class="venue.active ? 'text-green-600' : 'text-slate-400'"
                >{{ venue.active ? "Online" : "Offline" }}</span
              >
            </label>

            <div class="flex gap-2">
              <button
                class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary hover:bg-slate-50 transition-all"
              >
                ✎
              </button>
              <button
                class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Footer -->
      <div
        class="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between"
      >
        <p
          class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
        >
          Displaying 4 Venues
        </p>
        <button
          class="text-[10px] font-black text-primary uppercase tracking-widest hover:underline underline-offset-4"
        >
          Download Report
        </button>
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
    name: "Main Court 1",
    type: "Football 5-a-side",
    priceNormal: 150000,
    priceHappy: 100000,
    active: true,
    facilities: ["Parking", "Water", "Locker"],
  },
  {
    id: 2,
    name: "Main Court 2",
    type: "Football 5-a-side",
    priceNormal: 150000,
    priceHappy: 100000,
    active: true,
    facilities: ["Parking", "Water"],
  },
  {
    id: 3,
    name: "West Court 3",
    type: "Football 7-a-side",
    priceNormal: 250000,
    priceHappy: 200000,
    active: false,
    facilities: ["Parking", "Shower"],
  },
  {
    id: 4,
    name: "Badminton Hall 1",
    type: "Badminton",
    priceNormal: 50000,
    priceHappy: 35000,
    active: true,
    facilities: ["AC", "Wifi"],
  },
]);

const getIcon = (type) => {
  if (type.includes("Football")) return "⚽";
  if (type.includes("Badminton")) return "🏸";
  return "🏟️";
};
</script>
