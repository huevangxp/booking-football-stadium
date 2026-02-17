<template>
  <div class="space-y-10 animate-in fade-in duration-700">
    <!-- Analytics Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
    >
      <div>
        <h2
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Business Intelligence
        </h2>
        <p
          class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          Deep dive into performance metrics
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <div
          class="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-sm"
        >
          <button
            v-for="range in ['Day', 'Week', 'Month', 'Year']"
            :key="range"
            @click="timeRange = range.toLowerCase()"
            class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="
              timeRange === range.toLowerCase()
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                : 'text-slate-400 hover:text-slate-900'
            "
          >
            {{ range }}
          </button>
        </div>
        <button
          class="h-10 w-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm"
        >
          📅
        </button>
        <button
          class="h-10 px-6 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
        >
          <span>↓</span> Export
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Revenue Breakdown -->
      <div
        class="lg:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/40 p-10 relative overflow-hidden group"
      >
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-slate-50 rounded-full z-0 group-hover:scale-110 transition-transform duration-700"
        ></div>

        <div
          class="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-10"
        >
          <div>
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2"
            >
              Total Generated Revenue
            </p>
            <div class="flex items-baseline gap-4">
              <h3 class="text-6xl font-black text-slate-900 tracking-tighter">
                ₭12.4M
              </h3>
              <div
                class="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1"
              >
                <span>↑</span> 14.2% Growth
              </div>
            </div>
            <p
              class="text-xs font-bold text-slate-400 mt-4 max-w-xs leading-relaxed"
            >
              Significant increase compared to last {{ timeRange }}, driven by
              weekend tournaments.
            </p>
          </div>

          <div
            class="w-full md:w-64 space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-100"
          >
            <h4
              class="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-4"
            >
              Payment Methods
            </h4>

            <div class="space-y-4">
              <div v-for="method in paymentMethods" :key="method.name">
                <div
                  class="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider mb-2"
                >
                  <span class="text-slate-500 flex items-center gap-2">
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="method.color"
                    ></span>
                    {{ method.name }}
                  </span>
                  <span class="text-slate-900">{{ method.percent }}%</span>
                </div>
                <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-1000"
                    :class="method.color"
                    :style="{ width: method.percent + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Peak Hours -->
      <div
        class="bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-900/40 p-10 text-white relative overflow-hidden flex flex-col"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"
        ></div>

        <div class="relative z-10 mb-8">
          <h3 class="text-xl font-black uppercase tracking-tight">
            Peak Activity
          </h3>
          <p
            class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1"
          >
            Utilization Heatmap
          </p>
        </div>

        <div class="flex-1 flex items-end justify-between gap-3 min-h-[200px]">
          <div
            v-for="(val, label) in peakData"
            :key="label"
            class="flex-1 flex flex-col items-center gap-3 group"
          >
            <div
              class="w-full bg-white/10 rounded-t-xl relative transition-all duration-500 hover:bg-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              :style="{ height: val + '%' }"
            >
              <!-- Tooltip -->
              <div
                class="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {{ val }}% Load
              </div>
            </div>
            <span
              class="text-[8px] font-bold text-slate-500 uppercase tracking-wider -rotate-45 origin-center mt-2"
              >{{ label }}</span
            >
          </div>
        </div>
      </div>

      <!-- Top Customers -->
      <div
        class="lg:col-span-3 bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/30 p-10"
      >
        <div class="flex justify-between items-end mb-8">
          <div>
            <h3
              class="text-2xl font-black text-slate-900 tracking-tight uppercase"
            >
              Loyalty Leaderboard
            </h3>
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1"
            >
              Top spending clients for this period
            </p>
          </div>
          <button
            class="text-[10px] font-black text-primary uppercase tracking-widest hover:underline underline-offset-4"
          >
            View Full Report →
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <div
            v-for="(cust, index) in topCustomers"
            :key="cust.name"
            class="p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer"
          >
            <div
              class="absolute top-0 right-0 p-4 text-4xl font-black text-slate-200 italic opacity-50 group-hover:opacity-20 transition-opacity"
            >
              #{{ index + 1 }}
            </div>

            <div class="relative z-10">
              <div
                class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm mb-4 border border-slate-100 group-hover:scale-110 transition-transform origin-left"
              >
                🏆
              </div>
              <h4
                class="text-sm font-black text-slate-900 uppercase tracking-tight truncate mb-1"
              >
                {{ cust.name }}
              </h4>
              <p
                class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4"
              >
                {{ cust.bookings }} Sessions Completed
              </p>

              <div
                class="pt-4 border-t border-slate-200/50 flex justify-between items-center"
              >
                <span
                  class="text-[8px] font-black text-slate-400 uppercase tracking-widest"
                  >Lifetime Value</span
                >
                <span class="text-xs font-black text-primary"
                  >₭{{ (cust.spent / 1000000).toFixed(1) }}M</span
                >
              </div>
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

const paymentMethods = [
  { name: "Bank Transfer", percent: 74, color: "bg-indigo-600" },
  { name: "Cash Payment", percent: 26, color: "bg-emerald-500" },
];

const peakData = {
  "08:00": 15,
  "10:00": 35,
  "12:00": 60,
  "14:00": 45,
  "16:00": 85,
  "18:00": 98,
  "20:00": 90,
  "22:00": 55,
};

const topCustomers = [
  { name: "SOMSAK KEO", bookings: 24, spent: 3600000 },
  { name: "KEO PHOMMACHANH", bookings: 18, spent: 2700000 },
  { name: "ANOUSONE S.", bookings: 15, spent: 2250000 },
  { name: "PHOUVONG S.", bookings: 12, spent: 1800000 },
  { name: "VANH LAVANH", bookings: 10, spent: 1500000 },
];
</script>
