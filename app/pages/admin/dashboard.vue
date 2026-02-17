<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="card flex items-center gap-5 p-5"
      >
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
          :style="{ backgroundColor: stat.bgColor }"
        >
          {{ stat.icon }}
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium text-slate-500">{{ stat.title }}</p>
          <h3 class="text-2xl font-bold text-slate-900">{{ stat.value }}</h3>
          <p
            class="text-xs font-semibold flex items-center gap-1"
            :class="stat.trend > 0 ? 'text-green-600' : 'text-red-600'"
          >
            <span v-if="stat.trend > 0">↑</span>
            <span v-else>↓</span>
            {{ Math.abs(stat.trend) }}%
            <span class="text-slate-400 font-normal">from yesterday</span>
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Booking Graph -->
      <div class="card lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Booking Trends</h3>
          <select
            v-model="graphPeriod"
            class="text-sm border-slate-200 rounded-lg focus:ring-primary focus:border-primary outline-none py-1.5 px-3 bg-slate-50"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div class="h-[280px] w-full mt-4">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="card space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900">Recent Bookings</h3>
          <NuxtLink
            to="/admin/calendar"
            class="text-sm font-semibold text-primary hover:underline"
            >View All</NuxtLink
          >
        </div>

        <div class="space-y-5">
          <div
            v-for="booking in recentBookings"
            :key="booking.id"
            class="flex items-center gap-4 group"
          >
            <div
              class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200"
            >
              {{ booking.user.charAt(0) }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 truncate">
                <span class="font-bold">{{ booking.user }}</span> booked
                <span class="text-slate-500 font-normal">{{
                  booking.court
                }}</span>
              </p>
              <p class="text-[10px] font-medium text-slate-400">
                {{ booking.time }}
              </p>
            </div>
            <span class="badge" :class="`badge-${booking.statusType}`">{{
              booking.status
            }}</span>
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
      label: "Bookings",
      backgroundColor: "rgba(30, 58, 138, 0.1)",
      borderColor: "#1e3a8a",
      pointBackgroundColor: "#1e3a8a",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#1e3a8a",
      fill: true,
      tension: 0.4,
      data: [40, 39, 50, 40, 70, 80, 90],
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
      titleFont: { size: 12, weight: "bold" },
      bodyFont: { size: 12 },
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    y: {
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        font: { size: 10, weight: "600" },
        color: "#64748b",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: { size: 10, weight: "600" },
        color: "#64748b",
      },
    },
  },
};

const stats = [
  {
    title: "Today's Bookings",
    value: "24",
    trend: 12,
    icon: "📖",
    bgColor: "rgba(30, 58, 138, 0.1)",
  },
  {
    title: "Today's Revenue",
    value: "₭1,250,000",
    trend: 8,
    icon: "💰",
    bgColor: "rgba(34, 197, 94, 0.1)",
  },
  {
    title: "Active Courts",
    value: "5/8",
    trend: -2,
    icon: "🏟️",
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  {
    title: "New Members",
    value: "12",
    trend: 15,
    icon: "👤",
    bgColor: "rgba(30, 58, 138, 0.1)",
  },
];

const recentBookings = [
  {
    id: 1,
    user: "Somsak K.",
    court: "Football Court 1",
    time: "2 mins ago",
    status: "Paid",
    statusType: "success",
  },
  {
    id: 2,
    user: "Anousone S.",
    court: "Badminton 2",
    time: "15 mins ago",
    status: "Pending",
    statusType: "warning",
  },
  {
    id: 3,
    user: "Keo P.",
    court: "Football Court 2",
    time: "1 hour ago",
    status: "Paid",
    statusType: "success",
  },
  {
    id: 4,
    user: "Phoutthasone M.",
    court: "Football Court 1",
    time: "3 hours ago",
    status: "Cancelled",
    statusType: "danger",
  },
  {
    id: 5,
    user: "Vanh L.",
    court: "Badminton 1",
    time: "5 hours ago",
    status: "Paid",
    statusType: "success",
  },
];
</script>
