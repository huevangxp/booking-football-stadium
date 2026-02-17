<template>
  <div class="space-y-8 animate-in fade-in duration-700">
    <!-- Dashboard Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
    >
      <div>
        <h1
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Command Center
        </h1>
        <p
          class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          Real-time Performance Overview
        </p>
      </div>
      <div
        class="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm"
      >
        <span class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
          ></span>
        </span>
        <span
          class="text-[10px] font-black text-slate-600 uppercase tracking-widest"
          >System Operational</span
        >
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="relative overflow-hidden bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group"
      >
        <!-- Background Decor -->
        <div
          class="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 transition-transform group-hover:scale-110"
          :class="stat.accentColor"
        ></div>

        <div class="relative z-10">
          <div class="flex justify-between items-start mb-4">
            <div
              class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm bg-white border border-slate-100 ring-1 ring-slate-50"
            >
              {{ stat.icon }}
            </div>
            <div
              class="px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-1"
            >
              <span
                class="text-[10px] font-black"
                :class="stat.trend > 0 ? 'text-emerald-600' : 'text-red-500'"
              >
                {{ stat.trend > 0 ? "+" : "" }}{{ stat.trend }}%
              </span>
              <span
                class="text-[10px] font-bold text-slate-300"
                v-if="stat.trend > 0"
                >↗</span
              >
              <span class="text-[10px] font-bold text-slate-300" v-else>↘</span>
            </div>
          </div>

          <h3 class="text-3xl font-black text-slate-900 tracking-tighter mb-1">
            {{ stat.value }}
          </h3>
          <p
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
          >
            {{ stat.title }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Analytics Chart -->
      <div
        class="xl:col-span-2 bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40 p-8 h-[500px] flex flex-col"
      >
        <div class="flex items-center justify-between mb-8 shrink-0">
          <div>
            <h3
              class="text-xl font-black text-slate-900 uppercase tracking-tight"
            >
              Revenue Analytics
            </h3>
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1"
            >
              Weekly Performance
            </p>
          </div>
          <div class="flex bg-slate-100 p-1 rounded-xl">
            <button
              v-for="p in ['Week', 'Month', 'Year']"
              :key="p"
              class="px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
              :class="
                graphPeriod === p.toLowerCase()
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              "
              @click="graphPeriod = p.toLowerCase()"
            >
              {{ p }}
            </button>
          </div>
        </div>

        <div class="flex-1 w-full relative min-h-0">
          <!-- ChartJS Render -->
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div
        class="bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-900/40 p-8 text-white relative overflow-hidden h-[500px] flex flex-col"
      >
        <!-- Ambient BG -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
        ></div>

        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-8 shrink-0">
            <h3 class="text-xl font-black uppercase tracking-tight">
              Live Feed
            </h3>
            <button
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <span class="text-xs">⋮</span>
            </button>
          </div>

          <div
            class="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2 -mr-2"
          >
            <div
              v-for="booking in recentBookings"
              :key="booking.id"
              class="group flex items-start gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer"
            >
              <div class="relative shrink-0">
                <div
                  class="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                >
                  {{ booking.user.charAt(0) }}
                </div>
                <div
                  class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900"
                  :class="{
                    'bg-emerald-500': booking.status === 'Paid',
                    'bg-amber-500': booking.status === 'Pending',
                    'bg-red-500': booking.status === 'Cancelled',
                  }"
                ></div>
              </div>

              <div class="flex-1 min-w-0 pt-0.5">
                <p class="text-xs font-bold text-slate-200 truncate">
                  <span class="font-black text-white">{{ booking.user }}</span>
                </p>
                <p
                  class="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5 group-hover:text-primary-light transition-colors"
                >
                  {{ booking.court }}
                </p>
              </div>

              <div class="text-right shrink-0">
                <span
                  class="block text-[8px] font-black text-slate-500 uppercase tracking-widest"
                  >{{ booking.time }}</span
                >
              </div>
            </div>
          </div>

          <div class="mt-4 pt-6 border-t border-white/10 shrink-0">
            <NuxtLink
              to="/admin/calendar"
              class="block w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-center uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all"
            >
              View Full Schedule
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
);

definePageMeta({
  layout: "admin",
});

const graphPeriod = ref("week");

const chartData = computed(() => ({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(30, 58, 138, 0.2)");
        gradient.addColorStop(1, "rgba(30, 58, 138, 0)");
        return gradient;
      },
      borderColor: "#1e3a8a",
      borderWidth: 3,
      pointBackgroundColor: "#1e3a8a",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#1e3a8a",
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
      data: [1.2, 1.9, 1.5, 2.1, 2.8, 3.2, 3.8],
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "#0f172a",
      titleFont: { size: 12, weight: "bold", family: "Inter" },
      bodyFont: { size: 11, family: "Inter" },
      padding: 12,
      cornerRadius: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `Revenue: ₭${context.parsed.y}M`,
      },
    },
  },
  scales: {
    y: {
      grid: {
        display: true,
        color: "rgba(226, 232, 240, 0.6)",
        borderDash: [4, 4],
      },
      ticks: {
        font: { size: 10, weight: "600", family: "Inter" },
        color: "#94a3b8",
        callback: (value) => `₭${value}M`,
      },
      border: { display: false },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 10, weight: "600", family: "Inter" },
        color: "#94a3b8",
      },
      border: { display: false },
    },
  },
};

const stats = [
  {
    title: "Daily Bookings",
    value: "24",
    trend: 12,
    icon: "📖",
    accentColor: "bg-blue-500",
  },
  {
    title: "Net Revenue",
    value: "₭1.25M",
    trend: 8,
    icon: "💰",
    accentColor: "bg-emerald-500",
  },
  {
    title: "Occupancy",
    value: "82%",
    trend: -2,
    icon: "🏟️",
    accentColor: "bg-amber-500",
  },
  {
    title: "Members",
    value: "1,204",
    trend: 15,
    icon: "👤",
    accentColor: "bg-indigo-500",
  },
];

const recentBookings = [
  {
    id: 1,
    user: "Somsak K.",
    court: "Football Court 1",
    time: "2m ago",
    status: "Paid",
  },
  {
    id: 2,
    user: "Anousone S.",
    court: "Badminton Hall A",
    time: "15m ago",
    status: "Pending",
  },
  {
    id: 3,
    user: "Keo P.",
    court: "Football Court 2",
    time: "1h ago",
    status: "Paid",
  },
  {
    id: 4,
    user: "Phoutthasone",
    court: "Alpha Sector 01",
    time: "3h ago",
    status: "Cancelled",
  },
  {
    id: 5,
    user: "Vanh L.",
    court: "Badminton Hall B",
    time: "5h ago",
    status: "Paid",
  },
  {
    id: 6,
    user: "Johnathan D.",
    court: "VIP Lounge",
    time: "6h ago",
    status: "Paid",
  },
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
</style>
