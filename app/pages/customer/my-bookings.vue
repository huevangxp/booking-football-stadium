<template>
  <div class="px-6 py-12 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div
      class="flex items-end justify-between border-b pb-6 animate-in fade-in slide-in-from-top-8 duration-700"
    >
      <div>
        <h1
          class="text-4xl font-black text-slate-900 leading-tight tracking-tighter uppercase"
        >
          My Bookings
        </h1>
        <p
          class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          Manage your past and upcoming sessions
        </p>
      </div>

      <div class="flex bg-slate-100 p-1 rounded-xl">
        <button
          v-for="tab in ['Upcoming', 'History', 'Cancelled']"
          :key="tab"
          @click="activeTab = tab"
          class="px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          :class="
            activeTab === tab
              ? 'bg-white text-primary shadow-sm'
              : 'text-slate-400 hover:text-slate-600'
          "
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Booking List -->
    <div class="space-y-6 animate-in fade-in duration-700 delay-100">
      <div
        v-if="filteredBookings.length === 0"
        class="py-20 text-center bg-slate-50 border border-slate-200 border-dashed rounded-[40px]"
      >
        <div class="text-6xl mb-6 opacity-20">🎫</div>
        <h3
          class="text-xl font-black text-slate-900 uppercase tracking-tight mb-2"
        >
          No {{ activeTab }} Bookings
        </h3>
        <p
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8"
        >
          It's quiet in here...
        </p>
        <NuxtLink
          to="/booking"
          class="btn btn-primary px-8 py-3 shadow-xl shadow-primary/20"
          >Find a Match</NuxtLink
        >
      </div>

      <div v-else class="grid gap-6">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden"
        >
          <!-- Status Badge -->
          <div class="absolute top-0 right-0 p-6">
            <span
              class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm"
              :class="{
                'bg-green-100 text-green-700': booking.status === 'Paid',
                'bg-amber-100 text-amber-700': booking.status === 'Pending',
                'bg-red-100 text-red-700': booking.status === 'Cancelled',
              }"
            >
              {{ booking.status }}
            </span>
          </div>

          <div
            class="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
            <!-- Date Block -->
            <div
              class="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 w-24 h-24 rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300"
            >
              <span class="text-3xl font-black tracking-tighter">{{
                booking.day
              }}</span>
              <span
                class="text-[10px] font-black uppercase tracking-widest opacity-60"
                >{{ booking.month }}</span
              >
            </div>

            <!-- Details -->
            <div class="flex-1 space-y-2">
              <h3
                class="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors"
              >
                {{ booking.court }}
              </h3>
              <div
                class="flex flex-wrap gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest"
              >
                <span class="flex items-center gap-2"
                  ><span class="text-lg">⏰</span> {{ booking.time }}</span
                >
                <span class="flex items-center gap-2"
                  ><span class="text-lg">⏱️</span>
                  {{ booking.duration }}hr</span
                >
                <span class="flex items-center gap-2"
                  ><span class="text-lg">🏷️</span> {{ booking.price }}</span
                >
              </div>
            </div>

            <!-- Branding / Actions -->
            <div class="flex gap-3">
              <button
                v-if="booking.status !== 'Cancelled'"
                class="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all text-xl"
              >
                ×
              </button>
              <button
                class="h-12 px-6 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-primary transition-colors"
              >
                View Ticket
              </button>
            </div>
          </div>

          <!-- Progress Bar for ongoing -->
          <div
            v-if="booking.isOngoing"
            class="absolute bottom-0 left-0 h-1 bg-primary/20 w-full"
          >
            <div class="h-full bg-primary w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "customer",
});

const activeTab = ref("Upcoming");

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
</script>
