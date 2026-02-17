<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      <div class="flex items-center gap-3">
        <select
          v-model="timeRange"
          class="h-11 px-4 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <button class="btn btn-outline h-11 px-6 shadow-sm">
          Custom Range
        </button>
      </div>
      <button class="btn btn-primary h-11 px-8 shadow-lg shadow-primary/20">
        <span class="mr-2 italic">📊</span> Export to Excel
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Revenue Breakdown -->
      <div class="card space-y-8 border-slate-200">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-black text-slate-900 tracking-tight">
            Revenue Summary
          </h3>
          <span
            class="text-[10px] font-black uppercase text-slate-400 tracking-widest"
            >{{ timeRange }}</span
          >
        </div>

        <div
          class="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div class="space-y-1">
            <p
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              Total Revenue
            </p>
            <h2 class="text-5xl font-black text-slate-900 leading-tight">
              ₭12.4M
            </h2>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-black shadow-lg shadow-green-500/20"
            >
              <span>↑</span> 14% VS LAST MONTH
            </div>
          </div>

          <div class="w-full lg:w-48 space-y-4">
            <div class="space-y-2">
              <div
                class="flex justify-between items-center text-xs font-bold uppercase tracking-wider"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"
                  ></span>
                  <span class="text-slate-500">Bank:</span>
                </div>
                <span class="text-slate-900">74%</span>
              </div>
              <div
                class="flex justify-between items-center text-xs font-bold uppercase tracking-wider"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"
                  ></span>
                  <span class="text-slate-500">Cash:</span>
                </div>
                <span class="text-slate-900">26%</span>
              </div>
            </div>

            <div
              class="h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner border border-slate-200/50"
            >
              <div
                class="h-full bg-primary transition-all duration-1000"
                style="width: 74%"
              ></div>
              <div
                class="h-full bg-green-500 transition-all duration-1000"
                style="width: 26%"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Peak Hours Analysis -->
      <div class="card space-y-8 border-slate-200">
        <h3 class="text-xl font-black text-slate-900 tracking-tight">
          Peak Hours Analysis
        </h3>

        <div
          class="h-[180px] flex items-end justify-between gap-2 border-b border-slate-100 pb-2"
        >
          <div
            v-for="(val, hour) in peakData"
            :key="hour"
            class="flex-1 flex flex-col items-center gap-3"
          >
            <div
              class="w-full bg-slate-100 rounded-lg group hover:bg-primary transition-all duration-300 relative"
              :class="{ 'bg-primary shadow-lg shadow-primary/20': val > 80 }"
              :style="{ height: val + '%' }"
            >
              <div
                class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {{ val }}%
              </div>
            </div>
            <span
              class="text-[8px] font-black text-slate-400 uppercase tracking-tighter"
              >{{ hour }}</span
            >
          </div>
        </div>

        <div
          class="bg-primary/5 p-4 rounded-xl flex items-center gap-4 border border-primary/10"
        >
          <div
            class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl"
          >
            🕒
          </div>
          <p class="text-sm font-bold text-slate-700">
            Most active time detected:
            <span class="text-primary font-black">17:00 - 20:00</span>
          </p>
        </div>
      </div>

      <!-- Top Customers -->
      <div class="card lg:col-span-2 space-y-8 border-slate-200">
        <h3 class="text-xl font-black text-slate-900 tracking-tight">
          Top Loyal Customers
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="(cust, index) in topCustomers"
            :key="cust.name"
            class="flex items-center gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/30 transition-all"
          >
            <span class="text-3xl font-black text-slate-200 italic">{{
              index + 1
            }}</span>
            <div class="flex-1 min-w-0">
              <p
                class="text-sm font-black text-slate-900 truncate leading-tight"
              >
                {{ cust.name }}
              </p>
              <p
                class="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest"
              >
                {{ cust.bookings }} BOOKINGS
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs font-black text-primary leading-tight">
                ₭{{ (cust.spent / 1000000).toFixed(1) }}M
              </p>
              <p class="text-[8px] font-black text-slate-400 uppercase">
                SPENT
              </p>
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

const timeRange = ref("month");

const peakData = {
  "8am": 10,
  "10am": 20,
  "12pm": 45,
  "2pm": 30,
  "4pm": 60,
  "6pm": 95,
  "8pm": 85,
  "10pm": 40,
};

const topCustomers = [
  { name: "SOMSAK KEO", bookings: 24, spent: 3600000 },
  { name: "KEO PHOMMACHANH", bookings: 18, spent: 2700000 },
  { name: "ANOUSONE S.", bookings: 15, spent: 2250000 },
  { name: "PHOUVONG S.", bookings: 12, spent: 1800000 },
  { name: "VANH LAVANH", bookings: 10, spent: 1500000 },
];
</script>
