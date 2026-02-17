<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
    <!-- Navigation -->
    <nav
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20"
          >
            S
          </div>
          <span class="text-xl font-black tracking-tight text-primary"
            >Antigravity Sports</span
          >
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a
            href="#"
            class="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
            >Home</a
          >
          <a href="#" class="text-sm font-bold text-primary">Book a Court</a>
          <a
            href="#"
            class="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
            >My Bookings</a
          >
          <button
            @click="logout"
            class="btn btn-outline border-slate-200 text-slate-600 px-6 py-2 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header
      class="relative h-[400px] flex items-center justify-center text-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-slate-900/60 z-10"></div>
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000')] bg-cover bg-center animate-pulse duration-[10s]"
      ></div>
      <div
        class="relative z-20 max-w-3xl px-4 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <h1
          class="text-5xl md:text-6xl font-black text-white tracking-tighter shadow-sm"
        >
          BOOK YOUR COURT <span class="text-primary-light">INSTANTLY</span>
        </h1>
        <p class="text-xl text-slate-200 font-medium">
          Experience the best sports facilities in town. Quick, easy, and
          real-time booking for football and badminton.
        </p>
      </div>
    </header>

    <main
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-20"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Booking Step 1: Selection -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Court Type Selection -->
          <section class="card space-y-6">
            <h2 class="text-2xl font-black flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                >1</span
              >
              Select Sport & Court
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="court in courts"
                :key="court.id"
                @click="selectedCourt = court"
                class="group relative overflow-hidden rounded-2xl border-2 transition-all p-4 cursor-pointer"
                :class="
                  selectedCourt?.id === court.id
                    ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                    : 'border-slate-100 bg-white hover:border-primary/50'
                "
              >
                <div class="flex gap-4">
                  <div
                    class="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                  >
                    {{ court.icon }}
                  </div>
                  <div class="flex-1 space-y-1">
                    <h3
                      class="font-black text-slate-900 group-hover:text-primary transition-colors"
                    >
                      {{ court.name }}
                    </h3>
                    <p
                      class="text-xs font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {{ court.type }}
                    </p>
                    <div class="flex items-center gap-4 mt-2">
                      <span class="text-sm font-black text-primary"
                        >₭{{ court.price.toLocaleString() }}/hr</span
                      >
                      <span class="text-[10px] font-bold text-slate-400"
                        >👤 Up to {{ court.capacity }}</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  v-if="selectedCourt?.id === court.id"
                  class="absolute top-2 right-2 text-primary font-black"
                >
                  ✓
                </div>
              </div>
            </div>
          </section>

          <!-- Date & Time Selection -->
          <section class="card space-y-6" v-if="selectedCourt">
            <h2 class="text-2xl font-black flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                >2</span
              >
              Select Date & Time
            </h2>

            <!-- Simple Date Scroller -->
            <div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              <div
                v-for="date in next7Days"
                :key="date.full"
                @click="selectedDate = date.full"
                class="min-w-[80px] h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all"
                :class="
                  selectedDate === date.full
                    ? 'border-primary bg-primary text-white shadow-lg'
                    : 'border-slate-100 bg-white hover:border-primary/30 text-slate-500'
                "
              >
                <span
                  class="text-[10px] font-bold uppercase tracking-widest"
                  :class="
                    selectedDate === date.full
                      ? 'text-white/70'
                      : 'text-slate-400'
                  "
                  >{{ date.dayName }}</span
                >
                <span class="text-xl font-black">{{ date.dayNumber }}</span>
                <span
                  class="text-[10px] font-bold"
                  :class="
                    selectedDate === date.full
                      ? 'text-white/70'
                      : 'text-slate-400'
                  "
                  >{{ date.month }}</span
                >
              </div>
            </div>

            <!-- Time Slots Grid -->
            <div class="grid grid-cols-3 md:grid-cols-6 gap-3 pt-4">
              <button
                v-for="slot in timeSlots"
                :key="slot.time"
                @click="toggleTimeSlot(slot.time)"
                :disabled="slot.booked"
                class="h-14 rounded-xl border-2 font-black text-sm transition-all relative overflow-hidden"
                :class="[
                  slot.booked
                    ? 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed'
                    : selectedSlots.includes(slot.time)
                      ? 'border-primary bg-primary text-white shadow-lg'
                      : 'border-slate-100 bg-white hover:border-primary/50 text-slate-600',
                ]"
              >
                {{ slot.time }}
                <span
                  v-if="slot.booked"
                  class="absolute inset-0 flex items-center justify-center bg-slate-900/5 rotate-12 text-[8px] font-black uppercase text-slate-400"
                  >Booked</span
                >
              </button>
            </div>
          </section>
        </div>

        <!-- Booking Step 3: Summary Sidebar -->
        <div class="lg:col-span-1">
          <div
            class="card p-0 overflow-hidden sticky top-24 shadow-2xl shadow-primary/5 border-slate-200"
          >
            <div class="p-6 bg-primary text-white">
              <h3 class="text-xl font-black">Booking Summary</h3>
              <p
                class="text-xs font-bold text-white/70 uppercase tracking-widest mt-1"
              >
                Review your session details
              </p>
            </div>

            <div class="p-6 space-y-6">
              <div v-if="!selectedCourt" class="py-10 text-center space-y-3">
                <div class="text-4xl">🏟️</div>
                <p class="text-sm font-bold text-slate-400 italic">
                  Please select a court and session time to continue.
                </p>
              </div>

              <div v-else class="space-y-6">
                <!-- Selected Court Detail -->
                <div class="flex gap-4">
                  <div
                    class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl shadow-inner"
                  >
                    {{ selectedCourt.icon }}
                  </div>
                  <div>
                    <h4 class="font-black text-slate-900 leading-none mb-1">
                      {{ selectedCourt.name }}
                    </h4>
                    <p
                      class="text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {{ selectedCourt.type }}
                    </p>
                  </div>
                </div>

                <!-- Date Info -->
                <div
                  class="flex items-center gap-4 text-sm font-bold text-slate-600"
                >
                  <span class="w-8">📅</span>
                  <span>{{ selectedDateDisplay }}</span>
                </div>

                <!-- Slots List -->
                <div class="space-y-2">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    Selected Sessions
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="slot in selectedSlots"
                      :key="slot"
                      class="px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg border border-primary/20 flex items-center gap-2 group"
                    >
                      {{ slot }}
                      <button
                        @click="toggleTimeSlot(slot)"
                        class="hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                    <p
                      v-if="selectedSlots.length === 0"
                      class="text-xs font-bold text-amber-500 italic"
                    >
                      No time slots selected yet.
                    </p>
                  </div>
                </div>

                <div
                  class="pt-6 border-t border-dashed border-slate-200 space-y-3"
                >
                  <div
                    class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider"
                  >
                    <span>Court Fee ({{ selectedSlots.length }}hr)</span>
                    <span
                      >₭{{
                        (
                          selectedCourt.price * selectedSlots.length
                        ).toLocaleString()
                      }}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider"
                  >
                    <span>Service Fee</span>
                    <span>₭5,000</span>
                  </div>
                  <div class="flex justify-between items-center pt-2">
                    <span class="text-lg font-black text-slate-900 uppercase"
                      >Total</span
                    >
                    <span class="text-3xl font-black text-primary"
                      >₭{{ totalPrice.toLocaleString() }}</span
                    >
                  </div>
                </div>

                <button
                  @click="confirmBooking"
                  :disabled="selectedSlots.length === 0"
                  class="w-full btn btn-primary h-14 text-lg font-black shadow-xl shadow-primary/20 disabled:bg-slate-200 disabled:shadow-none transition-all group overflow-hidden relative"
                >
                  <span class="relative z-10">Confirm Booking</span>
                  <div
                    class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  ></div>
                </button>
                <p
                  class="text-[10px] text-center font-bold text-slate-400 leading-tight uppercase tracking-tighter"
                >
                  By clicking confirm, you agree to our
                  <span class="text-primary underline">terms of service</span>
                  and
                  <span class="text-primary underline">cancellation policy</span
                  >.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const selectedCourt = ref(null);
const selectedDate = ref(null);
const selectedSlots = ref([]);

const courts = [
  {
    id: 1,
    name: "Main Court 1",
    type: "Football 5-a-side",
    price: 150000,
    capacity: "10 Players",
    icon: "⚽",
  },
  {
    id: 2,
    name: "Main Court 2",
    type: "Football 5-a-side",
    price: 150000,
    capacity: "10 Players",
    icon: "⚽",
  },
  {
    id: 3,
    name: "West Court 3",
    type: "Football 7-a-side",
    price: 250000,
    capacity: "14 Players",
    icon: "🏃",
  },
  {
    id: 4,
    name: "Badminton Hall 1",
    type: "Badminton",
    price: 50000,
    capacity: "4 Players",
    icon: "🏸",
  },
  {
    id: 5,
    name: "Badminton Hall 2",
    type: "Badminton",
    price: 50000,
    capacity: "4 Players",
    icon: "🏸",
  },
];

const timeSlots = [
  { time: "08:00", booked: true },
  { time: "09:00", booked: false },
  { time: "10:00", booked: false },
  { time: "11:00", booked: false },
  { time: "12:00", booked: false },
  { time: "13:00", booked: true },
  { time: "14:00", booked: true },
  { time: "15:00", booked: false },
  { time: "16:00", booked: false },
  { time: "17:00", booked: false },
  { time: "18:00", booked: false },
  { time: "19:00", booked: false },
  { time: "20:00", booked: false },
  { time: "21:00", booked: false },
];

// Generate next 7 days for selection
const next7Days = computed(() => {
  const days = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dayName: i === 0 ? "Today" : dayNames[d.getDay()],
      dayNumber: d.getDate(),
      month: months[d.getMonth()],
      full: d.toDateString(),
    });
  }
  return days;
});

// Initialize today as selected date
onMounted(() => {
  selectedDate.value = next7Days.value[0].full;
});

const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return "";
  return selectedDate.value;
});

const totalPrice = computed(() => {
  if (!selectedCourt.value) return 0;
  const courtFee = selectedCourt.value.price * selectedSlots.value.length;
  return courtFee > 0 ? courtFee + 5000 : 0;
});

const toggleTimeSlot = (time) => {
  const index = selectedSlots.value.indexOf(time);
  if (index > -1) {
    selectedSlots.value.splice(index, 1);
  } else {
    selectedSlots.value.push(time);
    selectedSlots.value.sort();
  }
};

const logout = () => {
  navigateTo("/login");
};

const confirmBooking = () => {
  alert(
    `Booking Confirmed for ${selectedCourt.value.name} on ${selectedDate.value} at ${selectedSlots.value.join(", ")}`,
  );
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
</style>
