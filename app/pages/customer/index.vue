<template>
  <div class="px-6 py-12 max-w-7xl mx-auto space-y-20">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div
        class="space-y-8 animate-in fade-in slide-in-from-left-12 duration-700"
      >
        <h1
          class="text-6xl font-black text-slate-900 leading-tight tracking-tighter shadow-sm"
        >
          Where <span class="text-primary">Champions</span><br />Are Made.
        </h1>
        <p class="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
          Book your next match effortlessly. Experience top-tier facilities and
          join a community of passionate players.
        </p>

        <div class="flex gap-4 pt-4">
          <NuxtLink
            to="/booking"
            class="btn btn-primary h-14 px-8 text-lg font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all"
          >
            Start Booking
          </NuxtLink>
          <button
            class="btn btn-outline h-14 px-8 text-lg font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            Watch Video
          </button>
        </div>
      </div>

      <div
        class="relative h-[500px] w-full bg-slate-100 rounded-[40px] overflow-hidden group shadow-2xl hover:shadow-primary/20 transition-all duration-500"
      >
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0565c6d?q=80&w=2000"
          alt="Venue Hero"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"
        ></div>
        <div class="absolute bottom-8 left-8 text-white z-10">
          <h3 class="text-3xl font-black tracking-tighter">Main Stadium</h3>
          <p
            class="text-sm font-bold opacity-80 uppercase tracking-widest mt-1"
          >
            Available Now • 8 Slots
          </p>
        </div>
      </div>
    </section>

    <!-- Upcoming Activity -->
    <section
      class="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200"
    >
      <div class="flex items-end justify-between border-b pb-4 mb-8">
        <div>
          <h2
            class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Your Schedule
          </h2>
          <p
            class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1"
          >
            Don't miss your upcoming games
          </p>
        </div>
        <NuxtLink
          to="/customer/my-bookings"
          class="text-primary font-black uppercase tracking-widest text-xs hover:underline underline-offset-4"
          >View All</NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Upcoming Match Card -->
        <div
          class="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:border-primary transition-all group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-4">
            <span
              class="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full"
              >Confirmed</span
            >
          </div>
          <p
            class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4"
          >
            Tomorrow, 19:00
          </p>
          <h3
            class="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors"
          >
            Friendly Match
          </h3>
          <p class="text-sm font-bold text-slate-500 flex items-center gap-2">
            <span class="text-lg">🏟️</span> Court 1 (5-a-side)
          </p>
          <div
            class="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between"
          >
            <div class="flex -space-x-2">
              <div
                class="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px]"
              >
                👤
              </div>
              <div
                class="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px]"
              >
                +3
              </div>
            </div>
            <button
              class="text-primary font-black uppercase tracking-widest text-[10px] hover:text-primary-dark"
            >
              Manage
            </button>
          </div>
        </div>

        <!-- Empty State / Promo -->
        <div
          class="bg-slate-50 border border-slate-200 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-lg transition-all group"
        >
          <div
            class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform"
          >
            📅
          </div>
          <h3
            class="text-lg font-black text-slate-900 uppercase tracking-tight mb-2"
          >
            Plan Ahead
          </h3>
          <p class="text-xs font-bold text-slate-400 max-w-[200px] mb-6">
            Secure your favorite slot for next week.
          </p>
          <NuxtLink
            to="/booking"
            class="px-6 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
            >Book Slot</NuxtLink
          >
        </div>

        <!-- Quick Stats -->
        <div
          class="bg-primary text-white rounded-3xl p-8 relative overflow-hidden group"
        >
          <div
            class="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"
          ></div>

          <h3 class="text-4xl font-black mb-1">12</h3>
          <p
            class="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-8"
          >
            Matches Played
          </p>

          <h3 class="text-xl font-black mb-1">MVP</h3>
          <p
            class="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70"
          >
            Player Rank
          </p>

          <div class="absolute bottom-6 right-6 opacity-20 text-6xl rotate-12">
            🏆
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Venues -->
    <section
      class="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300"
    >
      <div class="flex items-end justify-between">
        <div>
          <h2
            class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Premium Courts
          </h2>
          <p
            class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1"
          >
            Select your battleground
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="venue in venues"
          :key="venue.id"
          class="group cursor-pointer"
        >
          <div
            class="relative h-64 rounded-3xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300"
          >
            <img
              :src="venue.image"
              :alt="venue.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm"
            >
              {{ venue.price }}
            </div>
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6"
            >
              <button
                class="w-full py-3 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
          <h3
            class="text-lg font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors"
          >
            {{ venue.name }}
          </h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {{ venue.type }} • {{ venue.capacity }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

const venues = [
  {
    id: 1,
    name: "Main Arena",
    type: "Football 7v7",
    capacity: "14 Players",
    price: "₭250k/hr",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=800",
  },
  {
    id: 2,
    name: "Training Ground",
    type: "Football 5v5",
    capacity: "10 Players",
    price: "₭150k/hr",
    image:
      "https://images.unsplash.com/photo-1516244673891-fb05a5dc67e7?q=80&w=800",
  },
  {
    id: 3,
    name: "Badminton Hall A",
    type: "Indoor Court",
    capacity: "4 Players",
    price: "₭50k/hr",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800",
  },
  {
    id: 4,
    name: "VIP Lounge",
    type: "Private Suite",
    capacity: "20 Players",
    price: "₭500k/hr",
    image:
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=800",
  },
];
</script>
