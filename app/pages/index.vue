<template>
  <div class="px-6 py-12 max-w-7xl mx-auto space-y-20">
    <!-- Hero Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div
        class="space-y-8 animate-in fade-in slide-in-from-left-12 duration-700"
      >
        <div class="flex items-center gap-2">
          <span
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] uppercase font-black tracking-widest animate-pulse"
            >Now Active</span
          >
          <span
            class="text-sm font-bold text-slate-400 uppercase tracking-widest"
            >Season 2026</span
          >
        </div>
        <h1
          class="text-6xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tighter shadow-sm"
        >
          Where
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >Legends</span
          ><br />Are Born.
        </h1>
        <p class="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
          The city's premier sports complex. Book your next match effortlessly,
          join tournaments, and elevate your game.
        </p>

        <div class="flex gap-4 pt-4">
          <NuxtLink
            to="/login"
            class="btn btn-primary h-14 px-10 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 rounded-2xl"
          >
            <span>⚡</span> Start Booking
          </NuxtLink>
          <button
            class="h-14 px-8 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all border border-transparent hover:border-slate-200"
          >
            Virtual Tour
          </button>
        </div>
      </div>

      <div
        class="relative h-[550px] w-full bg-slate-100 rounded-[40px] overflow-hidden group shadow-2xl hover:shadow-primary/20 transition-all duration-700 perspective-1000"
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
          class="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-between"
        >
          <div class="text-white">
            <h3 class="text-4xl font-black tracking-tighter mb-1">
              Main Arena
            </h3>
            <div class="flex items-center gap-3">
              <span
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500"
              ></span>
              <p class="text-xs font-bold uppercase tracking-widest">
                8 Slots Available Today
              </p>
            </div>
          </div>

          <div class="hidden md:flex -space-x-3">
            <div
              v-for="i in 4"
              :key="i"
              class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs font-bold"
            >
              {{ String.fromCharCode(64 + i) }}
            </div>
            <div
              class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary/40"
            >
              +12
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Showcase / Featured Venues -->
    <section
      class="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200"
    >
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4"
        >
          Our Premium Venues
        </h2>
        <p class="text-slate-500 font-medium leading-relaxed">
          Experience professional-grade facilities designed for peak
          performance. Whether it's football or badminton, we have the perfect
          ground for you.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="group relative bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
        >
          <!-- Image Container -->
          <div class="h-64 overflow-hidden relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute top-4 left-4 flex gap-2">
              <span
                class="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm"
                >{{ product.category }}</span
              >
            </div>
            <!-- Price Tag -->
            <div
              class="absolute bottom-4 right-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
            >
              {{ product.price }}
            </div>
          </div>

          <div class="p-8">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3
                  class="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2"
                >
                  {{ product.name }}
                </h3>
                <div
                  class="flex items-center gap-4 text-xs font-bold text-slate-500"
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
                class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors"
              >
                {{ product.icon }}
              </div>
            </div>

            <p
              class="text-sm text-slate-500 leading-relaxed mb-8 border-t border-slate-100 pt-4"
            >
              {{ product.description }}
            </p>

            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="feat in product.features"
                :key="feat"
                class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {{ feat }}
              </div>
            </div>

            <button
              class="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-primary/30"
            >
              View Availability
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / Venues -->
    <section
      class="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300"
    >
      <div class="text-center max-w-2xl mx-auto space-y-4">
        <h2
          class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Why Choose Us
        </h2>
        <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Designed for professionals, open to everyone.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex flex-col items-center text-center space-y-4 group"
        >
          <div
            class="w-20 h-20 bg-gradient-to-br from-slate-100 to-white border border-slate-200 rounded-[32px] flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
          >
            {{ feature.icon }}
          </div>
          <h3
            class="text-lg font-black text-slate-900 uppercase tracking-tight"
          >
            {{ feature.title }}
          </h3>
          <p class="text-sm font-medium text-slate-500 leading-relaxed">
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
    image:
      "https://images.unsplash.com/photo-1516244673891-fb05a5dc67e7?q=80&w=1000",
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
