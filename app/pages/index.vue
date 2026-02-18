<template>
  <div class="px-6 py-12 max-w-7xl mx-auto space-y-20">
    <!-- Hero Section -->
    <section
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
    >
      <div
        class="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-12 duration-700"
      >
        <div class="flex items-center gap-2">
          <span
            class="px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] sm:text-[10px] uppercase font-black tracking-widest animate-pulse"
            >Now Active</span
          >
          <span
            class="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-widest"
            >Season 2026</span
          >
        </div>
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-tight tracking-tighter shadow-sm"
        >
          Where
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >Legends</span
          ><br />Are Born.
        </h1>
        <p
          class="text-sm sm:text-lg text-slate-500 font-medium leading-relaxed max-w-lg"
        >
          The city's premier sports complex. Book your next match effortlessly,
          join tournaments, and elevate your game.
        </p>

        <div class="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
          <NuxtLink
            :to="isAuthenticated ? '/booking' : '/login'"
            class="btn btn-primary h-12 sm:h-14 px-6 sm:px-10 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 rounded-xl sm:rounded-2xl"
          >
            <span>⚡</span> Start Booking
          </NuxtLink>
          <button
            class="h-12 sm:h-14 px-6 sm:px-8 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl sm:rounded-2xl transition-all border border-transparent hover:border-slate-200"
          >
            Virtual Tour
          </button>
        </div>
      </div>

      <div
        class="relative h-[320px] sm:h-[450px] lg:h-[550px] w-full bg-slate-100 rounded-3xl sm:rounded-[40px] overflow-hidden group shadow-xl sm:shadow-2xl hover:shadow-primary/20 transition-all duration-700 perspective-1000"
      >
        <img
          src="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=2000"
          alt="Venue Hero"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
        ></div>

        <!-- Live Status Card -->
        <div
          class="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-10 flex items-end sm:items-center justify-between"
        >
          <div class="text-white">
            <h3 class="text-2xl sm:text-4xl font-black tracking-tighter mb-1">
              Main Arena
            </h3>
            <div class="flex items-center gap-2 sm:gap-3">
              <span
                class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500"
              ></span>
              <p
                class="text-[10px] sm:text-xs font-bold uppercase tracking-widest"
              >
                8 Slots Available Today
              </p>
            </div>
          </div>

          <div class="hidden md:flex -space-x-3">
            <div
              v-for="i in 4"
              :key="i"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
            >
              {{ String.fromCharCode(64 + i) }}
            </div>
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary/40"
            >
              +12
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Activity (Customer Only) -->
    <section
      v-if="isAuthenticated"
      class="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200"
    >
      <div class="flex items-end justify-between border-b pb-4 mb-6 sm:mb-8">
        <div>
          <h2
            class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase"
          >
            Your Schedule
          </h2>
          <p
            class="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1"
          >
            Don't miss your upcoming games
          </p>
        </div>
        <NuxtLink
          to="/customer/my-bookings"
          class="text-primary font-black uppercase tracking-widest text-[10px] sm:text-xs hover:underline underline-offset-4"
          >View All</NuxtLink
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <!-- Upcoming Match Card -->
        <div
          class="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:shadow-xl hover:border-primary transition-all group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-4">
            <span
              class="px-2.5 py-1 bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full"
              >Confirmed</span
            >
          </div>
          <p
            class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4"
          >
            Tomorrow, 19:00
          </p>
          <h3
            class="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors"
          >
            Friendly Match
          </h3>
          <p
            class="text-xs sm:text-sm font-bold text-slate-500 flex items-center gap-2"
          >
            <span class="text-base sm:text-lg">🏟️</span> Court 1 (5-a-side)
          </p>
          <div
            class="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100 flex items-center justify-between"
          >
            <div class="flex -space-x-2">
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px]"
              >
                👤
              </div>
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px]"
              >
                +3
              </div>
            </div>
            <button
              class="text-primary font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:text-primary-dark"
            >
              Manage
            </button>
          </div>
        </div>

        <!-- Empty State / Promo -->
        <div
          class="bg-slate-50 border border-slate-200 border-dashed rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col items-center justify-center text-center hover:bg-white hover:shadow-lg transition-all group"
        >
          <div
            class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform"
          >
            📅
          </div>
          <h3
            class="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mb-2"
          >
            Plan Ahead
          </h3>
          <p
            class="text-[10px] sm:text-xs font-bold text-slate-400 max-w-[200px] mb-5 sm:mb-6"
          >
            Secure your favorite slot for next week.
          </p>
          <NuxtLink
            to="/booking"
            class="px-5 sm:px-6 py-2 bg-white border border-slate-200 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
            >Book Slot</NuxtLink
          >
        </div>

        <!-- Quick Stats -->
        <div
          class="bg-primary text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
        >
          <div
            class="absolute -right-12 -top-12 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"
          ></div>

          <h3 class="text-3xl sm:text-4xl font-black mb-1">12</h3>
          <p
            class="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 mb-6 sm:mb-8"
          >
            Matches Played
          </p>

          <h3 class="text-lg sm:text-xl font-black mb-1">MVP</h3>
          <p
            class="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold opacity-70"
          >
            Player Rank
          </p>

          <div
            class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-20 text-5xl sm:text-6xl rotate-12"
          >
            🏆
          </div>
        </div>
      </div>
    </section>

    <!-- Product Showcase / Featured Venues -->
    <section
      class="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200"
    >
      <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-3 sm:mb-4"
        >
          Our Premium Venues
        </h2>
        <p
          class="text-sm sm:text-base text-slate-500 font-medium leading-relaxed"
        >
          Experience professional-grade facilities designed for peak
          performance. Whether it's football or badminton, we have the perfect
          ground for you.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="group relative bg-white rounded-3xl sm:rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
        >
          <!-- Image Container -->
          <div class="h-48 sm:h-64 overflow-hidden relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute top-4 left-4 flex gap-2">
              <span
                class="px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm"
                >{{ product.category }}</span
              >
            </div>
            <!-- Price Tag -->
            <div
              class="absolute bottom-4 right-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-900 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg"
            >
              {{ product.price }}
            </div>
          </div>

          <div class="p-6 sm:p-8">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3
                  class="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2"
                >
                  {{ product.name }}
                </h3>
                <div
                  class="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold text-slate-500"
                >
                  <span class="flex items-center gap-1"
                    >📏 {{ product.size }}</span
                  >
                  <span class="flex items-center gap-1"
                    >👥 {{ product.capacity }}</span
                  >
                </div>
              </div>
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl sm:text-2xl group-hover:bg-primary group-hover:text-white transition-colors"
              >
                {{ product.icon }}
              </div>
            </div>

            <p
              class="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 sm:mb-8 border-t border-slate-100 pt-3 sm:pt-4"
            >
              {{ product.description }}
            </p>

            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                v-for="feat in product.features"
                :key="feat"
                class="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {{ feat }}
              </div>
            </div>

            <button
              class="w-full mt-6 sm:mt-8 py-3.5 sm:py-4 bg-slate-900 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-primary/30"
            >
              View Availability
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / Venues -->
    <section
      class="space-y-8 sm:space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300"
    >
      <div class="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
        <h2
          class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Why Choose Us
        </h2>
        <p
          class="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest"
        >
          Designed for professionals, open to everyone.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center space-y-3 sm:space-y-4 group"
        >
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-white border border-slate-200 rounded-[28px] sm:rounded-[32px] flex items-center justify-center text-3xl sm:text-4xl shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
          >
            {{ feature.icon }}
          </div>
          <h3
            class="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight"
          >
            {{ feature.title }}
          </h3>
          <p
            class="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-xs sm:max-w-none"
          >
            {{ feature.desc }}
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

const { isAuthenticated } = useAuth();

const featuredProducts = [
  {
    id: 1,
    name: "Alpha Sector",
    category: "Football 7v7",
    size: "40m x 20m",
    capacity: "Max 14 Players",
    price: "₭250,000 / hr",
    icon: "⚽",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1000",
    description:
      "Our premier 7-a-side pitch features latest generation FIFA-approved artificial turf. Perfect for competitive leagues and serious training sessions. Includes covered seating for spectators.",
    features: [
      "FIFA Turf",
      "LED Floodlights",
      "Spectator Stand",
      "Changing Rooms",
    ],
  },
  {
    id: 2,
    name: "Beta Ground",
    category: "Football 5v5",
    size: "25m x 15m",
    capacity: "Max 10 Players",
    price: "₭150,000 / hr",
    icon: "🥅",
    image: "/images/court-5v5.png",
    description:
      "A fast-paced 5-a-side pitch designed for high-intensity matches. Features shock-absorbing underlay for joint protection and high-visibility fencing.",
    features: [
      "Shock Absorption",
      "High Fencing",
      "Training Goals",
      "Water Station",
    ],
  },
  {
    id: 3,
    name: "Pro Court Arena",
    category: "Badminton",
    size: "Standard BWF",
    capacity: "Max 4 Players",
    price: "₭80,000 / hr",
    icon: "🏸",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000",
    description:
      "Professional grade indoor badminton courts with non-slip synthetic flooring and anti-glare lighting. Fully air-conditioned environment ensures peak performance in any weather.",
    features: [
      "BWF Flooring",
      "Anti-glare Lights",
      "Air Conditioned",
      "Pro Nets",
    ],
  },
  {
    id: 4,
    name: "VIP Lounge Suite",
    category: "Private",
    size: "Exclusive Area",
    capacity: "Max 20 Guests",
    price: "₭500,000 / hr",
    icon: "👑",
    image:
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=1000",
    description:
      "The ultimate viewing experience. Private air-conditioned suite overlooking the Main Arena with dedicated service, comfortable seating, and entertainment systems.",
    features: [
      "Private View",
      "Catering Service",
      "Lounge Seating",
      "HD Screens",
    ],
  },
];

const features = [
  {
    title: "Premium Turf",
    desc: "FIFA-standard artificial grass for optimal ball control and safety.",
    icon: "🌱",
  },
  {
    title: "Pro Lighting",
    desc: "Stadium-grade LED floodlights for perfect visibility day and night.",
    icon: "💡",
  },
  {
    title: "Digital Booking",
    desc: "Instant reservation system with real-time availability tracking.",
    icon: "📱",
  },
];
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
