<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    <!-- Page Header & Controls -->
    <div
      class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
    >
      <div class="flex flex-wrap items-center gap-4">
        <div
          class="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm ring-1 ring-slate-900/5"
        >
          <button
            @click="navigateDate(-1)"
            class="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all duration-200"
          >
            <span class="text-xl">←</span>
          </button>
          <div class="px-6 flex flex-col items-center min-w-[200px]">
            <h2
              class="font-black text-slate-900 leading-tight uppercase tracking-tight"
            >
              {{ formattedDateDisplay }}
            </h2>
            <p
              class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-0.5"
            >
              Live Schedule
            </p>
          </div>
          <button
            @click="navigateDate(1)"
            class="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all duration-200"
          >
            <span class="text-xl">→</span>
          </button>
        </div>
        <button
          @click="resetToToday"
          class="h-12 px-6 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-600 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
        >
          Today
        </button>
      </div>

      <div class="flex items-center gap-4 w-full lg:w-auto">
        <div
          class="flex bg-slate-200/50 p-1.5 rounded-2xl shadow-inner border border-slate-200"
        >
          <button
            v-for="v in ['day', 'week', 'month']"
            :key="v"
            @click="view = v"
            class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
            :class="
              view === v
                ? 'bg-white text-primary shadow-lg ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-800'
            "
          >
            {{ v }}
          </button>
        </div>
        <button
          class="h-12 flex-1 lg:flex-none px-8 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          @click="showBookingModal = true"
        >
          <span class="text-xl leading-none">+</span> New Reservation
        </button>
      </div>
    </div>

    <!-- Calendar Viewport -->
    <div
      class="card p-0 overflow-hidden border-slate-200 shadow-2xl shadow-slate-200/50 group/calendar"
    >
      <!-- Day View (Current Default) -->
      <div v-if="view === 'day'" class="flex h-[750px] relative">
        <!-- Time Axis -->
        <div
          class="w-24 shrink-0 flex flex-col bg-slate-50/80 backdrop-blur-sm border-r border-slate-200 z-30"
        >
          <div
            class="h-16 flex items-center justify-center border-b border-slate-200"
          >
            <span
              class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]"
              >GMT+7</span
            >
          </div>
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div
              v-for="hour in hours"
              :key="hour"
              class="h-20 flex flex-col items-center justify-center border-b border-slate-100"
            >
              <span class="text-sm font-black text-slate-900 tabular-nums"
                >{{ hour.toString().padStart(2, "0") }}:00</span
              >
              <span class="text-[9px] font-bold text-slate-400 uppercase">{{
                hour < 12 ? "AM" : "PM"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Scrollable Grid Area -->
        <div
          class="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar relative"
        >
          <!-- Calendar Body -->
          <div class="flex min-w-full">
            <div
              v-for="(court, cIdx) in courts"
              :key="court.id"
              class="flex-1 min-w-[240px] border-r border-slate-100 last:border-r-0 relative group/court"
            >
              <!-- Sticky Court Header -->
              <div
                class="sticky top-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex flex-col items-center justify-center z-20 shadow-sm"
              >
                <h3
                  class="font-black text-slate-900 text-sm tracking-tight leading-none mb-1 group-hover/court:text-primary transition-colors uppercase"
                >
                  {{ court.name }}
                </h3>
                <div class="flex gap-1.5">
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="court.id % 2 === 0 ? 'bg-primary' : 'bg-indigo-400'"
                  ></span>
                  <p
                    class="text-[9px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    Available
                  </p>
                </div>
              </div>

              <!-- Time Slots Grid -->
              <div class="relative">
                <div
                  v-for="hour in hours"
                  :key="hour"
                  class="h-20 border-b border-slate-50 relative hover:bg-slate-100/30 transition-colors group/slot"
                  @click="handleSlotClick(court, hour)"
                >
                  <!-- Visual Grid Markers -->
                  <div
                    class="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-200 pointer-events-none"
                  ></div>

                  <!-- Drop Zone Indicator -->
                  <div
                    class="absolute inset-2 rounded-xl border-2 border-dashed border-primary/0 group-hover/slot:border-primary/20 transition-all flex items-center justify-center opacity-0 group-hover/slot:opacity-100 pointer-events-none bg-primary/5"
                  >
                    <span
                      class="text-[10px] font-black text-primary uppercase tracking-widest"
                      >+ Reserve {{ hour }}:00</span
                    >
                  </div>

                  <!-- Render Bookings -->
                  <div
                    v-for="booking in getBookings(court.id, hour)"
                    :key="booking.id"
                    class="absolute inset-x-2 rounded-2xl p-4 z-10 flex flex-col shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:z-20 cursor-pointer overflow-hidden border-2"
                    :class="{
                      'bg-green-600 border-green-700 text-white':
                        booking.status === 'paid',
                      'bg-amber-400 border-amber-500 text-slate-900':
                        booking.status === 'pending',
                      'bg-red-600 border-red-700 text-white':
                        booking.status === 'closed',
                    }"
                    :style="{
                      height: booking.duration * 80 - 8 + 'px',
                      top: (booking.minuteOffset * 80) / 60 + 4 + 'px',
                    }"
                  >
                    <!-- Booking Header -->
                    <div class="flex justify-between items-start mb-2">
                      <span
                        class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                        :class="
                          booking.status === 'paid'
                            ? 'bg-white/20 text-white'
                            : booking.status === 'pending'
                              ? 'bg-black/10 text-slate-900'
                              : 'bg-white/20 text-white'
                        "
                      >
                        {{ booking.status }}
                      </span>
                      <span
                        class="text-[10px] font-black opacity-50 tabular-nums"
                        >#{{ booking.id }}</span
                      >
                    </div>

                    <!-- Booking Info -->
                    <div class="flex-1 overflow-hidden">
                      <p
                        class="text-xs font-black truncate uppercase tracking-tight"
                      >
                        {{ booking.user }}
                      </p>
                      <p class="text-[9px] font-bold opacity-70 mt-0.5">
                        {{ booking.startTime }} - {{ booking.endTime }}
                      </p>
                    </div>

                    <!-- Action Hint -->
                    <div
                      class="flex justify-between items-center mt-3 pt-2 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div class="flex -space-x-2">
                        <div
                          class="w-5 h-5 rounded-full border border-white bg-slate-200 flex items-center justify-center text-[8px]"
                        >
                          👤
                        </div>
                      </div>
                      <button
                        class="text-[9px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-2 py-1 rounded-md transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Week View Placeholder -->
      <div
        v-else-if="view === 'week'"
        class="h-[750px] flex items-center justify-center bg-slate-50"
      >
        <div class="text-center space-y-4">
          <div class="text-6xl">🗓️</div>
          <h3 class="text-2xl font-black text-slate-900 uppercase">
            Weekly View
          </h3>
          <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Visualizing sessions across the next 7 days
          </p>
          <div
            class="p-4 bg-primary/5 rounded-2xl border border-primary/20 text-primary font-black text-xs uppercase tracking-widest"
          >
            This module is being optimized for large screens
          </div>
        </div>
      </div>

      <!-- Month View Placeholder -->
      <div
        v-else-if="view === 'month'"
        class="h-[750px] flex items-center justify-center bg-slate-50"
      >
        <div class="text-center space-y-4">
          <div class="text-6xl">📊</div>
          <h3 class="text-2xl font-black text-slate-900 uppercase">
            Monthly Capacity
          </h3>
          <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">
            High-level availability overview
          </p>
          <div
            class="p-4 bg-primary/5 rounded-2xl border border-primary/20 text-primary font-black text-xs uppercase tracking-widest"
          >
            Full calendar grid integration in progress
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Reservation Modal -->
    <Teleport to="body">
      <div
        v-if="showBookingModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        @click="showBookingModal = false"
      >
        <div
          class="bg-white rounded-[32px] shadow-[0_32px_128px_-16px_rgba(30,58,138,0.3)] w-full max-w-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-slate-100"
          @click.stop
        >
          <!-- Modal Header -->
          <div
            class="relative px-10 py-10 bg-gradient-to-br from-primary to-blue-900 text-white overflow-hidden"
          >
            <div
              class="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute -bottom-16 -left-16 w-48 h-48 bg-primary-light/10 rounded-full blur-2xl"
            ></div>

            <div class="relative z-10 flex justify-between items-start">
              <div>
                <p
                  class="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2"
                >
                  Internal Management
                </p>
                <h3 class="text-3xl font-black tracking-tighter">
                  Quick Reservation
                </h3>
              </div>
              <button
                @click="showBookingModal = false"
                class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <form
            @submit.prevent="saveBooking"
            class="px-10 py-10 space-y-8 bg-white"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Customer Detail -->
              <div class="md:col-span-2 space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >Customer Identification</label
                >
                <div class="relative group">
                  <span
                    class="absolute left-5 top-1/2 -translate-y-1/2 text-lg group-focus-within:scale-110 transition-transform"
                    >👤</span
                  >
                  <input
                    v-model="newBooking.user"
                    type="text"
                    placeholder="Full name or VIP ID"
                    class="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >Contact Phone</label
                >
                <input
                  v-model="newBooking.phone"
                  type="tel"
                  placeholder="020-XXXX-XXXX"
                  class="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner"
                  required
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >Target Field</label
                >
                <select
                  v-model="newBooking.courtId"
                  class="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option
                    v-for="court in courts"
                    :key="court.id"
                    :value="court.id"
                  >
                    {{ court.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >Start Hour (24h)</label
                >
                <input
                  v-model="newBooking.startTime"
                  type="time"
                  class="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner"
                  required
                />
              </div>

              <div class="space-y-2">
                <label
                  class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                  >Session Duration</label
                >
                <div class="relative">
                  <input
                    v-model="newBooking.duration"
                    type="number"
                    step="0.5"
                    min="0.5"
                    class="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner"
                    required
                  />
                  <span
                    class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest"
                    >Hours</span
                  >
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex gap-4 pt-6 border-t border-slate-100">
              <button
                type="button"
                class="flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all font-bold"
                @click="showBookingModal = false"
              >
                Discard
              </button>
              <button
                type="submit"
                class="flex-1 h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all font-bold"
              >
                Establish Booking
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
const currentDate = ref(new Date(2026, 1, 17)); // Feb 17, 2026

const formattedDateDisplay = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
});

const hours = Array.from({ length: 15 }, (_, i) => i + 8);

const courts = [
  { id: 1, name: "Alpha Sector 01" },
  { id: 2, name: "Alpha Sector 02" },
  { id: 3, name: "Bravo Sector 03" },
  { id: 4, name: "Badminton Hall 01" },
  { id: 5, name: "Badminton Hall 02" },
];

const bookings = ref([
  {
    id: 1082,
    courtId: 1,
    user: "SOMSAY KHAMMONE",
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
    user: "ANOUSONE SENEVONG",
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
    user: "MTN CORPORATE MATCH",
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
    user: "FIELD MAINTENANCE",
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

const resetToToday = () => {
  currentDate.value = new Date(2026, 1, 17);
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
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
