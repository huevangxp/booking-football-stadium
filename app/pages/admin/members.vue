<template>
  <div class="space-y-10 animate-in fade-in duration-700">
    <!-- Top Stats Bar -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-slate-50 rounded-bl-[100px] z-0 opacity-50 transition-opacity group-hover:opacity-100"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center justify-between mb-6">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ring-1 ring-inset ring-slate-900/5 transition-transform group-hover:scale-110 group-hover:rotate-6"
              :class="stat.colorClass"
            >
              {{ stat.icon }}
            </div>
            <div class="flex flex-col items-end">
              <span
                class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
                >Trend</span
              >
              <span
                class="text-xs font-bold text-green-500 flex items-center gap-1"
              >
                ↑ {{ stat.growth }}
              </span>
            </div>
          </div>
          <h4 class="text-4xl font-black text-slate-900 tracking-tighter mb-1">
            {{ stat.value }}
          </h4>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
      <!-- Customer Directory -->
      <div class="xl:col-span-8 space-y-6">
        <!-- Header & Filters -->
        <div
          class="flex flex-col xl:flex-row justify-between items-center gap-6"
        >
          <div>
            <h3
              class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
            >
              Customer Hub
            </h3>
            <p
              class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-2"
            >
              Directory & Loyalty Management
            </p>
          </div>

          <div
            class="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div class="relative group">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                >🔍</span
              >
              <input
                type="text"
                placeholder="Search..."
                class="w-64 h-11 pl-10 pr-4 bg-transparent text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
            <div class="h-6 w-px bg-slate-200"></div>
            <button
              class="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
            >
              <span class="text-lg">⚡</span>
            </button>
            <button
              class="px-5 h-11 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors shadow-lg"
            >
              Add New
            </button>
          </div>
        </div>

        <!-- Floating Rows Table -->
        <div class="space-y-4">
          <!-- Table Header -->
          <div
            class="grid grid-cols-12 gap-4 px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]"
          >
            <div class="col-span-4">Identity</div>
            <div class="col-span-4">Engagement</div>
            <div class="col-span-3">Status</div>
            <div class="col-span-1 text-right">Action</div>
          </div>

          <!-- Rows -->
          <div
            v-for="user in users"
            :key="user.id"
            class="group bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div
              class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <!-- Identity -->
              <div class="md:col-span-4 flex items-center gap-5">
                <span
                  class="text-slate-200 font-black text-xl italic tabular-nums w-8"
                  >#{{ user.id }}</span
                >
                <div class="relative">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner transition-transform group-hover:scale-105"
                    :style="{
                      backgroundColor: user.color,
                      color: user.vip ? '#1e3a8a' : '#64748b',
                    }"
                  >
                    {{ user.name.charAt(0) }}
                  </div>
                  <div
                    v-if="user.vip"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center shadow-md animate-bounce-slow"
                  >
                    <span class="text-[10px]">👑</span>
                  </div>
                </div>
                <div>
                  <h4
                    class="text-sm font-black text-slate-900 uppercase tracking-tight mb-1"
                  >
                    {{ user.name }}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-500 border border-slate-200 tabular-nums"
                      >{{ user.phone }}</span
                    >
                  </div>
                </div>
              </div>

              <!-- Engagement -->
              <div class="md:col-span-4">
                <div class="flex items-center gap-8">
                  <div>
                    <p
                      class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1"
                    >
                      Bookings
                    </p>
                    <p class="text-lg font-black text-slate-900 tabular-nums">
                      {{ user.totalBookings }}
                    </p>
                  </div>
                  <div class="h-8 w-px bg-slate-100"></div>
                  <div>
                    <p
                      class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1"
                    >
                      Reliability
                    </p>
                    <div
                      v-if="user.noShows > 0"
                      class="flex items-center gap-1.5 text-red-600"
                    >
                      <span
                        class="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                      ></span>
                      <span class="text-xs font-black uppercase tracking-tight"
                        >Warning</span
                      >
                    </div>
                    <div
                      v-else
                      class="flex items-center gap-1.5 text-green-600"
                    >
                      <span class="w-2 h-2 rounded-full bg-green-500"></span>
                      <span class="text-xs font-black uppercase tracking-tight"
                        >Excellent</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div class="md:col-span-3">
                <span
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  :class="
                    user.vip
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                      : 'bg-white border border-slate-200 text-slate-500'
                  "
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="user.vip ? 'bg-yellow-400' : 'bg-slate-300'"
                  ></span>
                  {{ user.vip ? "VIP Member" : "Standard" }}
                </span>
              </div>

              <!-- Actions -->
              <div class="md:col-span-1 text-right">
                <button
                  class="w-10 h-10 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-slate-200 flex items-center justify-center transition-all text-slate-400 hover:text-primary"
                >
                  ⋯
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <button
            class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all"
          >
            ←
          </button>
          <span
            class="text-[10px] font-black text-slate-900 uppercase tracking-widest"
            >Page 1 of 12</span
          >
          <button
            class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all"
          >
            →
          </button>
        </div>
      </div>

      <!-- Matchmaking Monitor Sidebar -->
      <div class="xl:col-span-4 space-y-8">
        <div
          class="bg-slate-900 rounded-[40px] p-8 shadow-2xl shadow-slate-900/40 relative overflow-hidden"
        >
          <!-- Ambient Background -->
          <div
            class="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-10"
          ></div>

          <div class="relative z-20">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3
                  class="text-2xl font-black text-white tracking-tighter uppercase"
                >
                  Live Matches
                </h3>
                <p
                  class="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1 pl-0.5"
                >
                  Real-time Formation
                </p>
              </div>
              <div
                class="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <span class="text-lg animate-pulse">📡</span>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-for="match in matches"
                :key="match.id"
                class="bg-white/5 border border-white/5 rounded-3xl p-5 hover:bg-white/10 transition-all cursor-pointer group hover:border-primary/50"
              >
                <div class="flex justify-between items-start mb-4">
                  <span
                    class="px-2 py-1 rounded bg-white/10 text-[8px] font-black text-white uppercase tracking-widest border border-white/5"
                    >{{ match.court }}</span
                  >
                  <span
                    class="text-[10px] font-bold text-primary-light uppercase tracking-wider"
                    >{{ match.time }}</span
                  >
                </div>

                <h4 class="text-lg font-black text-white leading-tight mb-1">
                  {{ match.type }}
                </h4>
                <p class="text-xs font-medium text-slate-400 mb-4">
                  Hosted by {{ match.creator }}
                </p>

                <div class="space-y-2">
                  <div
                    class="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500"
                  >
                    <span>Capacity</span>
                    <span class="text-white"
                      >{{ match.joined }}/{{ match.needed }}</span
                    >
                  </div>
                  <div class="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                      :style="{
                        width: (match.joined / match.needed) * 100 + '%',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-6 py-4 bg-primary hover:bg-primary-light text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              + Create Match
            </button>
          </div>
        </div>

        <!-- System Status -->
        <div
          class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/50"
        >
          <h4
            class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6"
          >
            System Health
          </h4>
          <div class="space-y-5">
            <div
              v-for="item in ['Server Latency', 'Database', 'API Gateway']"
              :key="item"
              class="flex items-center justify-between"
            >
              <span class="text-xs font-bold text-slate-500">{{ item }}</span>
              <div class="flex items-center gap-2">
                <div class="flex gap-0.5">
                  <span class="w-1 h-3 rounded-full bg-emerald-500"></span>
                  <span class="w-1 h-3 rounded-full bg-emerald-500"></span>
                  <span
                    class="w-1 h-3 rounded-full bg-emerald-500 opacity-30"
                  ></span>
                </div>
                <span
                  class="text-[10px] font-black text-emerald-600 uppercase tracking-wider"
                  >Good</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const stats = [
  {
    label: "Active Members",
    value: "1,284",
    icon: "👥",
    colorClass: "bg-blue-50 text-blue-600",
    growth: "12%",
  },
  {
    label: "VIP Loyalists",
    value: "342",
    icon: "👑",
    colorClass: "bg-amber-50 text-amber-600",
    growth: "5%",
  },
  {
    label: "Success Rate",
    value: "98.2%",
    icon: "📈",
    colorClass: "bg-emerald-50 text-emerald-600",
    growth: "0.4%",
  },
  {
    label: "New This Month",
    value: "+124",
    icon: "✨",
    colorClass: "bg-purple-50 text-purple-600",
    growth: "18%",
  },
];

const users = [
  {
    id: 1,
    name: "SOMSAK KEO-VICHIT",
    phone: "020 5519 8822",
    totalBookings: 24,
    noShows: 0,
    vip: true,
    color: "rgba(30, 58, 138, 0.1)",
  },
  {
    id: 2,
    name: "ANOUSONE SENEVONG",
    phone: "020 9982 1102",
    totalBookings: 12,
    noShows: 1,
    vip: false,
    color: "rgba(34, 197, 94, 0.1)",
  },
  {
    id: 3,
    name: "VANH LAVANH DARA",
    phone: "020 7712 5599",
    totalBookings: 8,
    noShows: 0,
    vip: false,
    color: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: 4,
    name: "KEO PHOMMACHANH",
    phone: "020 2200 1199",
    totalBookings: 45,
    noShows: 0,
    vip: true,
    color: "rgba(99, 102, 241, 0.1)",
  },
];

const matches = [
  {
    id: 1,
    court: "ALPHA 01",
    type: "Friendly 5v5",
    date: "TODAY",
    time: "19:00",
    creator: "Bouavone",
    joined: 8,
    needed: 10,
  },
  {
    id: 2,
    court: "BRAVO 03",
    type: "Competitive 7v7",
    date: "TOMORROW",
    time: "18:00",
    creator: "Kitthana",
    joined: 4,
    needed: 14,
  },
  {
    id: 3,
    court: "COURT 02",
    type: "Doubles Blitz",
    date: "TODAY",
    time: "20:00",
    creator: "Manichanh",
    joined: 3,
    needed: 4,
  },
];
</script>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
