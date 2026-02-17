<template>
  <div
    class="h-[calc(100vh-100px)] flex flex-col space-y-6 animate-in fade-in duration-700"
  >
    <!-- Header Strategy Console -->
    <div
      class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 shrink-0"
    >
      <div>
        <div class="flex items-center gap-3 mb-1">
          <h2
            class="text-4xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Operations Grid
          </h2>
          <span
            class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest animate-pulse"
            >Live</span
          >
        </div>
        <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Master Schedule & Resource Allocation
        </p>
      </div>

      <div
        class="flex items-center gap-4 bg-white p-2 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50"
      >
        <!-- View Toggle -->
        <div class="flex bg-slate-100 p-1 rounded-2xl">
          <button
            v-for="v in ['Day', 'Week', 'Month']"
            :key="v"
            @click="view = v.toLowerCase()"
            class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden"
            :class="
              view === v.toLowerCase()
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-400 hover:text-slate-600'
            "
          >
            {{ v }}
          </button>
        </div>

        <div class="w-px h-8 bg-slate-200"></div>

        <!-- Date Navigation -->
        <div class="flex items-center gap-2">
          <button
            @click="navigateDate(-1)"
            class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors"
          >
            ←
          </button>
          <div class="px-2 text-center min-w-[140px]">
            <span
              class="block text-sm font-black text-slate-900 uppercase tracking-tight leading-none"
              >{{ formattedDateDisplay }}</span
            >
            <span
              class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"
              >Today</span
            >
          </div>
          <button
            @click="navigateDate(1)"
            class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-colors"
          >
            →
          </button>
        </div>

        <div class="w-px h-8 bg-slate-200"></div>

        <button
          @click="showBookingModal = true"
          class="h-11 px-6 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <span class="text-lg">+</span> Reserve
        </button>
      </div>
    </div>

    <!-- Calendar Surface -->
    <div
      class="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40 relative overflow-hidden flex flex-col"
    >
      <!-- Day View -->
      <div v-if="view === 'day'" class="flex-1 flex overflow-hidden">
        <!-- Time Axis -->
        <div
          class="w-20 shrink-0 flex flex-col bg-slate-50 border-r border-slate-200"
        >
          <div
            class="h-20 flex items-center justify-center border-b border-slate-200 bg-slate-100/50"
          >
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >GMT+7</span
            >
          </div>
          <div class="flex-1 overflow-hidden relative">
            <!-- Sync Scroll Container -->
            <div ref="timeAxisDetails" class="absolute inset-0 overflow-hidden">
              <div
                v-for="hour in hours"
                :key="hour"
                class="h-24 flex flex-col items-center justify-start pt-2 border-b border-slate-100"
              >
                <span class="text-xs font-black text-slate-700 tabular-nums"
                  >{{ hour.toString().padStart(2, "0") }}:00</span
                >
                <span
                  class="text-[8px] font-bold text-slate-400 uppercase tracking-wider"
                  >{{ hour < 12 ? "AM" : "PM" }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Grid Surface -->
        <div
          class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar relative"
          ref="gridScrollArea"
          @scroll="syncScroll"
        >
          <div class="flex min-w-full">
            <div
              v-for="court in courts"
              :key="court.id"
              class="flex-1 min-w-[260px] border-r border-slate-100 last:border-r-0 relative bg-white group/court"
            >
              <!-- Sticky Header -->
              <div
                class="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 flex flex-col items-center justify-center shadow-sm"
              >
                <div
                  class="flex items-center gap-2 text-slate-900 group-hover/court:text-primary transition-colors"
                >
                  <span class="text-lg">{{ getIcon(court.name) }}</span>
                  <h3 class="font-black text-sm uppercase tracking-tight">
                    {{ court.name }}
                  </h3>
                </div>
                <div class="flex items-center gap-1.5 mt-1">
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                  ></div>
                  <span
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                    >Active</span
                  >
                </div>
              </div>

              <!-- Slots -->
              <div class="relative">
                <div
                  v-for="hour in hours"
                  :key="hour"
                  class="h-24 border-b border-slate-50 relative group/slot transition-all hover:bg-slate-50 cursor-pointer"
                  @click="handleSlotClick(court, hour)"
                >
                  <!-- Hover Add Indicator -->
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity z-0"
                  >
                    <span
                      class="text-[10px] font-black text-primary/40 uppercase tracking-widest"
                      >+ Book Slot</span
                    >
                  </div>

                  <!-- Bookings -->
                  <div
                    v-for="booking in getBookings(court.id, hour)"
                    :key="booking.id"
                    class="absolute inset-x-2 z-10 rounded-2xl p-4 border shadow-xl flex flex-col cursor-pointer hover:z-20 hover:scale-[1.02] transition-all duration-300 group/card overflow-hidden"
                    :class="{
                      'bg-emerald-500 border-emerald-600 text-white':
                        booking.status === 'paid',
                      'bg-amber-400 border-amber-500 text-slate-900':
                        booking.status === 'pending',
                      'bg-red-500 border-red-600 text-white':
                        booking.status === 'closed',
                    }"
                    :style="{
                      height:
                        booking.duration * 96 - 16 + 'px' /* 96px is h-24 */,
                      top: (booking.minuteOffset / 60) * 96 + 8 + 'px',
                    }"
                  >
                    <!-- Card Header -->
                    <div class="flex justify-between items-start mb-1">
                      <div class="flex items-center gap-1.5">
                        <span
                          class="w-1.5 h-1.5 rounded-full bg-white/50"
                        ></span>
                        <span
                          class="text-[9px] font-black uppercase tracking-widest opacity-90"
                          >{{ booking.status }}</span
                        >
                      </div>
                      <span class="text-[9px] font-bold opacity-60 tabular-nums"
                        >#{{ booking.id }}</span
                      >
                    </div>

                    <!-- Card Body -->
                    <div class="flex-1">
                      <p
                        class="text-xs font-black uppercase tracking-tight truncate leading-tight"
                      >
                        {{ booking.user }}
                      </p>
                      <div class="flex items-center gap-1 mt-1 opacity-80">
                        <span class="text-[10px]">⏰</span>
                        <span class="text-[10px] font-bold tabular-nums"
                          >{{ booking.startTime }} - {{ booking.endTime }}</span
                        >
                      </div>
                    </div>

                    <!-- Card Actions (Hover) -->
                    <div
                      class="absolute bottom-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 rounded-lg px-2 py-1"
                    >
                      <span
                        class="text-[8px] font-black uppercase tracking-wider text-white"
                        >Manage</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Views -->
      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center bg-slate-50/50"
      >
        <div
          class="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-xl mb-6 text-slate-300"
        >
          {{ view === "week" ? "📅" : "📊" }}
        </div>
        <h3
          class="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2"
        >
          {{ view }} View In Development
        </h3>
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
          This module is part of the Phase 2 rollout.
        </p>
      </div>
    </div>

    <!-- Booking Modal -->
    <Teleport to="body">
      <div
        v-if="showBookingModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in"
        @click="showBookingModal = false"
      >
        <div
          class="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="bg-slate-900 p-8 text-white relative overflow-hidden">
            <div
              class="absolute -top-12 -right-12 w-40 h-40 bg-primary rounded-full blur-3xl opacity-50"
            ></div>
            <div class="relative z-10 flex justify-between items-start">
              <div>
                <h3 class="text-2xl font-black uppercase tracking-tight">
                  New Reservation
                </h3>
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1"
                >
                  Manual Entry Protocol
                </p>
              </div>
              <button
                @click="showBookingModal = false"
                class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Modal Body -->
          <form @submit.prevent="saveBooking" class="p-8 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2 space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Client Name</label
                >
                <input
                  v-model="newBooking.user"
                  type="text"
                  class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                  placeholder="e.g. Somchai Fc"
                  required
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Contact</label
                >
                <input
                  v-model="newBooking.phone"
                  type="text"
                  class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                  placeholder="020..."
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Court</label
                >
                <select
                  v-model="newBooking.courtId"
                  class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option v-for="c in courts" :key="c.id" :value="c.id">
                    {{ c.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Start Time</label
                >
                <input
                  v-model="newBooking.startTime"
                  type="time"
                  class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                  >Duration (Hrs)</label
                >
                <input
                  v-model="newBooking.duration"
                  type="number"
                  step="0.5"
                  min="0.5"
                  class="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div class="pt-4 flex gap-3">
              <button
                type="button"
                @click="showBookingModal = false"
                class="flex-1 h-12 rounded-xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-red-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 h-12 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const view = ref("day");
const showBookingModal = ref(false);
const currentDate = ref(new Date());
const timeAxisDetails = ref(null);
const gridScrollArea = ref(null);

const formattedDateDisplay = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
});

const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 08:00 to 22:00

const courts = [
  { id: 1, name: "Alpha 01" },
  { id: 2, name: "Alpha 02" },
  { id: 3, name: "Bravo 03" },
  { id: 4, name: "Badminton A" },
  { id: 5, name: "Badminton B" },
];

const bookings = ref([
  {
    id: 1082,
    courtId: 1,
    user: "SOMSAY K.",
    status: "paid",
    startTime: "09:00",
    endTime: "10:00",
    hour: 9,
    duration: 1,
    minuteOffset: 0,
  },
  {
    id: 1083,
    courtId: 2,
    user: "ANOUSONE S.",
    status: "pending",
    startTime: "10:30",
    endTime: "12:00",
    hour: 10,
    duration: 1.5,
    minuteOffset: 30,
  },
  {
    id: 1102,
    courtId: 3,
    user: "MTN MATCH",
    status: "paid",
    startTime: "17:00",
    endTime: "19:00",
    hour: 17,
    duration: 2,
    minuteOffset: 0,
  },
  {
    id: 9999,
    courtId: 1,
    user: "MAINTENANCE",
    status: "closed",
    startTime: "13:00",
    endTime: "15:00",
    hour: 13,
    duration: 2,
    minuteOffset: 0,
  },
]);

const newBooking = ref({
  user: "",
  phone: "",
  courtId: 1,
  startTime: "17:00",
  duration: 1,
});

const getBookings = (courtId, hour) => {
  return bookings.value.filter((b) => b.courtId === courtId && b.hour === hour);
};

const getIcon = (name) => {
  if (name.includes("Badminton")) return "🏸";
  return "⚽";
};

const handleSlotClick = (court, hour) => {
  newBooking.value.courtId = court.id;
  newBooking.value.startTime = `${hour.toString().padStart(2, "0")}:00`;
  showBookingModal.value = true;
};

const navigateDate = (count) => {
  const newDate = new Date(currentDate.value);
  newDate.setDate(newDate.getDate() + count);
  currentDate.value = newDate;
};

const syncScroll = () => {
  if (gridScrollArea.value && timeAxisDetails.value) {
    timeAxisDetails.value.scrollTop = gridScrollArea.value.scrollTop;
  }
};

const saveBooking = () => {
  const hour = parseInt(newBooking.value.startTime.split(":")[0]);
  const minutes = parseInt(newBooking.value.startTime.split(":")[1]);

  // Basic calculation for end time
  let endHour = hour + Math.floor(newBooking.value.duration);
  let endMin = minutes + (newBooking.value.duration % 1) * 60;
  if (endMin >= 60) {
    endHour += 1;
    endMin -= 60;
  }

  const endTimeStr = `${endHour.toString().padStart(2, "0")}:${endMin.toString().padStart(2, "0")}`;

  bookings.value.push({
    id: Math.floor(Math.random() * 9000) + 1000,
    courtId: newBooking.value.courtId,
    user: newBooking.value.user.toUpperCase(),
    status: "pending",
    startTime: newBooking.value.startTime,
    endTime: endTimeStr,
    hour: hour,
    duration: parseFloat(newBooking.value.duration),
    minuteOffset: minutes,
  });

  // Reset form
  newBooking.value = {
    user: "",
    phone: "",
    courtId: 1,
    startTime: "17:00",
    duration: 1,
  };
  showBookingModal.value = false;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
