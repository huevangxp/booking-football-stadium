<template>
  <div
    class="px-5 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 max-w-7xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12"
  >
    <!-- ═══════════════ Header ═══════════════ -->
    <div class="animate-in fade-in slide-in-from-top-8 duration-700">
      <!-- Title + Subtitle -->
      <div
        class="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase"
          >
            My Bookings
          </h1>
          <p
            class="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
          >
            Manage your past and upcoming sessions
          </p>
        </div>
      </div>

      <!-- Tab Switcher (Scrollable on mobile) -->
      <div class="-mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
        <div
          class="flex bg-slate-100 p-1.5 rounded-xl w-max sm:w-auto sm:inline-flex min-w-full sm:min-w-0"
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-2.5 rounded-lg text-xs sm:text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            :class="
              activeTab === tab.key
                ? 'bg-white text-primary shadow-sm ring-1 ring-black/5'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
            "
          >
            <span class="text-base sm:text-sm">{{ tab.icon }}</span>
            {{ tab.key }}
            <span
              v-if="getTabCount(tab.key) > 0"
              class="ml-1 min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[9px] font-black transition-colors"
              :class="
                activeTab === tab.key
                  ? 'bg-primary/10 text-primary'
                  : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'
              "
            >
              {{ getTabCount(tab.key) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Bottom border -->
      <div class="border-b border-slate-200 mt-6 sm:mt-8 hidden sm:block"></div>
    </div>

    <!-- ═══════════════ Booking List ═══════════════ -->
    <div class="animate-in fade-in duration-700 delay-100 min-h-[400px]">
      <!-- Empty State -->
      <div
        v-if="filteredBookings.length === 0"
        class="py-16 sm:py-24 px-6 text-center bg-slate-50/50 border-2 border-slate-100 border-dashed rounded-[32px] sm:rounded-[40px] flex flex-col items-center"
      >
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center text-4xl sm:text-5xl mb-6 sm:mb-8 animate-bounce-slow"
        >
          🎫
        </div>
        <h3
          class="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2"
        >
          No {{ activeTab }} Bookings
        </h3>
        <p
          class="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 max-w-xs mx-auto"
        >
          Your schedule is clear. ready to play?
        </p>
        <NuxtLink
          to="/booking"
          class="btn btn-primary h-12 sm:h-14 px-8 sm:px-10 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          <span>⚡</span> Find a Match
        </NuxtLink>
      </div>

      <!-- Booking Cards -->
      <div v-else class="grid gap-5 sm:gap-6 lg:gap-8">
        <TransitionGroup name="list">
          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="booking-card group"
          >
            <!-- ── Mobile Layout ── -->
            <div class="block md:hidden">
              <!-- Top Row: Date + Court -->
              <div class="flex items-start gap-4 mb-5">
                <div class="date-block w-16 h-16 shrink-0 rounded-2xl">
                  <span
                    class="text-xl font-black tracking-tighter leading-none"
                    >{{ booking.day }}</span
                  >
                  <span
                    class="text-[9px] font-black uppercase tracking-widest opacity-60 mt-0.5"
                    >{{ booking.month }}</span
                  >
                </div>
                <div class="flex-1 min-w-0 pt-0.5">
                  <div class="flex justify-between items-start gap-2">
                    <h3
                      class="text-lg font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2"
                    >
                      {{ booking.court }}
                    </h3>
                    <span
                      class="status-badge shrink-0 mt-0.5"
                      :class="statusClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-1.5 mt-2 text-xs font-bold text-slate-500"
                  >
                    <span>⏰ {{ booking.time }}</span>
                    <span class="text-slate-300">•</span>
                    <span>{{ booking.duration }}hr</span>
                  </div>
                </div>
              </div>

              <!-- Content Grid -->
              <div
                class="grid grid-cols-2 gap-3 mb-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100"
              >
                <div>
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1"
                  >
                    Total Price
                  </p>
                  <p class="text-sm font-black text-slate-900">
                    {{ booking.price }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1"
                  >
                    Booking ID
                  </p>
                  <p
                    class="text-sm font-black text-slate-900 font-mono tracking-tight"
                  >
                    #BK-{{ booking.id }}
                  </p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  v-if="booking.status !== 'Cancelled'"
                  class="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95 shadow-sm"
                  title="Cancel Booking"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  class="flex-1 h-12 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:bg-primary active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <!-- Ticket Icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <span>View Ticket</span>
                </button>
              </div>
            </div>

            <!-- ── Desktop Layout ── -->
            <div class="hidden md:flex gap-6 lg:gap-8 items-center">
              <!-- Date Block -->
              <div
                class="date-block w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-2xl lg:rounded-3xl"
              >
                <span
                  class="text-2xl lg:text-3xl font-black tracking-tighter leading-none"
                  >{{ booking.day }}</span
                >
                <span
                  class="text-[9px] lg:text-[10px] font-black uppercase tracking-widest opacity-60 mt-0.5"
                  >{{ booking.month }}</span
                >
              </div>

              <!-- Details -->
              <div class="flex-1 min-w-0 space-y-3">
                <div class="flex items-center gap-4">
                  <h3
                    class="text-xl lg:text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors truncate"
                  >
                    {{ booking.court }}
                  </h3>
                  <span
                    class="status-badge"
                    :class="statusClass(booking.status)"
                  >
                    <span
                      class="status-dot"
                      :class="statusDotClass(booking.status)"
                    ></span>
                    {{ booking.status }}
                  </span>
                </div>

                <div class="flex items-center gap-4 lg:gap-6">
                  <div
                    class="flex items-center gap-2 text-xs lg:text-sm font-bold text-slate-500"
                  >
                    <span
                      class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-lg"
                      >⏰</span
                    >
                    {{ booking.time }}
                  </div>
                  <div class="w-px h-8 bg-slate-100"></div>
                  <div
                    class="flex items-center gap-2 text-xs lg:text-sm font-bold text-slate-500"
                  >
                    <span
                      class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-lg"
                      >⏱️</span
                    >
                    {{ booking.duration }}hr
                  </div>
                  <div class="w-px h-8 bg-slate-100"></div>
                  <div
                    class="flex items-center gap-2 text-xs lg:text-sm font-black text-slate-900"
                  >
                    <span
                      class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-lg"
                      >🏷️</span
                    >
                    {{ booking.price }}
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 shrink-0">
                <button
                  v-if="booking.status !== 'Cancelled'"
                  class="h-12 w-12 flex items-center justify-center rounded-xl bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all active:scale-95"
                  title="Cancel Booking"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <button
                  class="h-12 px-6 lg:px-8 bg-slate-900 text-white rounded-xl font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-xl hover:bg-primary active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  <span>View Ticket</span>
                </button>
              </div>
            </div>

            <!-- Progress Bar for ongoing -->
            <div
              v-if="booking.isOngoing"
              class="absolute bottom-0 left-0 h-1 sm:h-1.5 bg-primary/15 w-full"
            >
              <div
                class="h-full bg-primary w-1/3 animate-pulse rounded-full"
              ></div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

const activeTab = ref("Upcoming");

const tabs = [
  { key: "Upcoming", icon: "📅" },
  { key: "History", icon: "✅" },
  { key: "Cancelled", icon: "❌" },
];

const bookings = [
  {
    id: 101,
    court: "Main Arena (7v7)",
    day: "18",
    month: "FEB",
    time: "19:00 - 20:00",
    duration: 1,
    price: "₭250,000",
    status: "Paid",
    isOngoing: false,
    type: "Upcoming",
  },
  {
    id: 102,
    court: "Training Ground A",
    day: "20",
    month: "FEB",
    time: "17:00 - 18:30",
    duration: 1.5,
    price: "₭225,000",
    status: "Pending",
    isOngoing: false,
    type: "Upcoming",
  },
  {
    id: 99,
    court: "Badminton Hall 1",
    day: "14",
    month: "FEB",
    time: "18:00 - 19:00",
    duration: 1,
    price: "₭50,000",
    status: "Paid",
    isOngoing: false,
    type: "History",
  },
  {
    id: 98,
    court: "Main Arena (7v7)",
    day: "10",
    month: "JAN",
    time: "20:00 - 22:00",
    duration: 2,
    price: "₭500,000",
    status: "Cancelled",
    isOngoing: false,
    type: "Cancelled",
  },
];

const filteredBookings = computed(() => {
  return bookings.filter((b) => b.type === activeTab.value);
});

const getTabCount = (tabKey) => {
  return bookings.filter((b) => b.type === tabKey).length;
};

const statusClass = (status) => {
  return {
    "bg-emerald-50 text-emerald-700 border-emerald-200": status === "Paid",
    "bg-amber-50 text-amber-700 border-amber-200": status === "Pending",
    "bg-red-50 text-red-600 border-red-200": status === "Cancelled",
  };
};

const statusDotClass = (status) => {
  return {
    "bg-emerald-500": status === "Paid",
    "bg-amber-500 animate-pulse": status === "Pending",
    "bg-red-400": status === "Cancelled",
  };
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.booking-card {
  position: relative;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1.5rem;
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

@media (min-width: 640px) {
  .booking-card {
    padding: 1.5rem;
    border-radius: 2rem;
  }
}

@media (min-width: 1024px) {
  .booking-card {
    padding: 2rem;
  }
}

.booking-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 20px 40px -12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(var(--color-primary-rgb, 59, 130, 246), 0.12);
  border-color: rgba(var(--color-primary-rgb, 59, 130, 246), 0.3);
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.group:hover .date-block {
  background: var(--color-primary, #3b82f6);
  border-color: var(--color-primary, #3b82f6);
  color: #fff;
  box-shadow: 0 8px 16px -4px rgba(var(--color-primary-rgb, 59, 130, 246), 0.3);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 8px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid;
  white-space: nowrap;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-active {
  position: absolute;
}
</style>
