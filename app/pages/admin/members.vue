<template>
  <div class="space-y-10 animate-in fade-in duration-700">
    <!-- Top Stats Bar -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner transition-transform group-hover:scale-110"
            :class="stat.colorClass"
          >
            {{ stat.icon }}
          </div>
          <span
            class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"
            >Total Status</span
          >
        </div>
        <h4 class="text-3xl font-black text-slate-900 tracking-tighter">
          {{ stat.value }}
        </h4>
        <p
          class="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1"
        >
          {{ stat.label }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
      <!-- Customer Directory -->
      <div class="xl:col-span-8 space-y-6">
        <div
          class="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
        >
          <div
            class="p-10 border-b border-slate-50 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 bg-gradient-to-r from-white to-slate-50/50"
          >
            <div>
              <h3
                class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
              >
                Customer Hub
              </h3>
              <p
                class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-1"
              >
                Directory & Loyalty Management
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-4 w-full xl:w-auto">
              <div class="relative flex-1 xl:w-80 group">
                <span
                  class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  >🔍</span
                >
                <input
                  type="text"
                  placeholder="ID, Name or Phone..."
                  class="w-full h-14 pl-14 pr-6 bg-slate-100/50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-primary/5 focus:bg-white focus:border-primary outline-none transition-all shadow-inner"
                />
              </div>
              <button
                class="w-14 h-14 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-primary hover:border-primary transition-all shadow-sm"
              >
                <span class="text-xl">Filter</span>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-50"
                >
                  <th class="px-10 py-6">Identity</th>
                  <th class="px-10 py-6">Engagement</th>
                  <th class="px-10 py-6">Club Status</th>
                  <th class="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="group hover:bg-slate-50/80 transition-all duration-300"
                >
                  <td class="px-10 py-8">
                    <div class="flex items-center gap-5">
                      <div class="relative">
                        <div
                          class="w-14 h-14 rounded-[20px] flex items-center justify-center font-black text-lg shadow-2xl transition-transform group-hover:scale-110"
                          :style="{
                            backgroundColor: user.color,
                            color: user.vip ? '#1e3a8a' : '#64748b',
                          }"
                        >
                          {{ user.name.charAt(0) }}
                        </div>
                        <div
                          v-if="user.vip"
                          class="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span class="text-[8px]">👑</span>
                        </div>
                      </div>
                      <div>
                        <p
                          class="text-base font-black text-slate-900 leading-none mb-1.5 uppercase tracking-tight"
                        >
                          {{ user.name }}
                        </p>
                        <p
                          class="text-[10px] font-bold text-slate-400 tracking-widest tabular-nums uppercase"
                        >
                          {{ user.phone }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-10 py-8">
                    <div class="space-y-1.5">
                      <p class="text-sm font-black text-slate-700 tabular-nums">
                        {{ user.totalBookings }}
                        <span
                          class="text-[10px] text-slate-400 uppercase tracking-widest ml-1"
                          >Sessions</span
                        >
                      </p>
                      <div
                        v-if="user.noShows > 0"
                        class="flex items-center gap-1.5 opacity-80"
                      >
                        <span
                          class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"
                        ></span>
                        <p
                          class="text-[9px] font-black text-red-600 uppercase tracking-[0.15em]"
                        >
                          {{ user.noShows }} Incident Reports
                        </p>
                      </div>
                      <div v-else class="flex items-center gap-1.5">
                        <span
                          class="w-1.5 h-1.5 bg-green-500 rounded-full"
                        ></span>
                        <p
                          class="text-[9px] font-black text-green-600 uppercase tracking-[0.15em]"
                        >
                          Exemplary Record
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-10 py-8">
                    <span
                      class="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                      :class="
                        user.vip
                          ? 'bg-primary text-white shadow-xl shadow-primary/30 ring-4 ring-primary/5'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      "
                    >
                      {{ user.vip ? "VIP Black Card" : "Standard Tier" }}
                    </span>
                  </td>
                  <td class="px-10 py-8 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        class="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                      >
                        ✎
                      </button>
                      <button
                        class="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-400 transition-all shadow-sm"
                      >
                        ⋯
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between"
          >
            <p
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
            >
              Showing 4 of 1,280 Members
            </p>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all"
              >
                Previous
              </button>
              <button
                class="px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Matchmaking Monitor -->
      <div class="xl:col-span-4 space-y-8">
        <div
          class="bg-slate-900 rounded-[40px] p-10 shadow-2xl shadow-slate-900/40 relative overflow-hidden"
        >
          <div
            class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3
                  class="text-2xl font-black text-white tracking-tighter uppercase"
                >
                  Match Flux
                </h3>
                <p
                  class="text-[10px] font-black text-primary-light uppercase tracking-[0.3em] mt-1"
                >
                  Live Venue Tracker
                </p>
              </div>
              <div class="flex flex-col items-end">
                <span
                  class="px-3 py-1 bg-amber-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest animate-pulse shadow-lg shadow-amber-500/30"
                >
                  {{ matches.length }} Pending
                </span>
                <span
                  class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2"
                  >v2.4 Live</span
                >
              </div>
            </div>

            <div class="space-y-6">
              <div
                v-for="match in matches"
                :key="match.id"
                class="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 group"
              >
                <div class="flex gap-5">
                  <div
                    class="flex flex-col items-center justify-center bg-white/10 w-16 h-16 rounded-2xl group-hover:bg-primary-light/20 transition-all border border-white/5"
                  >
                    <span
                      class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]"
                      >{{ match.date }}</span
                    >
                    <span
                      class="text-sm font-black text-white leading-tight tabular-nums"
                      >{{ match.time }}</span
                    >
                  </div>

                  <div class="flex-1 space-y-3">
                    <div>
                      <h4
                        class="text-sm font-black text-white uppercase tracking-tight group-hover:text-primary-light transition-colors"
                      >
                        {{ match.court }} — {{ match.type }}
                      </h4>
                      <div class="flex items-center gap-2 mt-1">
                        <div
                          class="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[8px]"
                        >
                          👤
                        </div>
                        <p
                          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                        >
                          Host:
                          <span class="text-white">{{ match.creator }}</span>
                        </p>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <div
                        class="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]"
                      >
                        <span class="text-primary-light"
                          >{{ match.joined }} Established</span
                        >
                        <span class="text-slate-500"
                          >{{ match.needed - match.joined }} Vacant</span
                        >
                      </div>
                      <div
                        class="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner"
                      >
                        <div
                          class="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(30,58,138,0.5)]"
                          :style="{
                            width: (match.joined / match.needed) * 100 + '%',
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex gap-3">
                  <button
                    class="flex-1 h-11 bg-white/[0.08] border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white/20 transition-all"
                  >
                    Broadcast
                  </button>
                  <button
                    class="w-11 h-11 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl hover:scale-110 active:scale-90 transition-all"
                  >
                    ✓
                  </button>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-10 py-5 bg-white/5 border border-dashed border-white/20 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
            >
              Initialize New Match Thread
            </button>
          </div>
        </div>

        <!-- Venue Insights Mini-Card -->
        <div
          class="bg-gradient-to-br from-indigo-600 to-primary rounded-[40px] p-8 text-white shadow-2xl shadow-primary/30 group"
        >
          <div class="flex justify-between items-start mb-6">
            <div
              class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl group-hover:rotate-12 transition-transform"
            >
              💡
            </div>
            <span
              class="text-[9px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full"
              >Pro Tip</span
            >
          </div>
          <h5 class="text-xl font-black tracking-tight mb-2">
            Boost Engagement
          </h5>
          <p
            class="text-xs font-medium text-white/70 leading-relaxed uppercase tracking-widest"
          >
            VIP members are 4x more likely to accept matchmaking invites during
            peak weekend hours.
          </p>
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
  },
  {
    label: "VIP Loyalists",
    value: "342",
    icon: "👑",
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Success Rate",
    value: "98.2%",
    icon: "📈",
    colorClass: "bg-green-50 text-green-600",
  },
  {
    label: "New This Month",
    value: "+124",
    icon: "✨",
    colorClass: "bg-purple-50 text-purple-600",
  },
];

const users = [
  {
    id: 1,
    name: "SOMSAK KEO-VICHIT",
    phone: "020 55XX XXXX",
    totalBookings: 24,
    noShows: 0,
    vip: true,
    color: "rgba(30, 58, 138, 0.1)",
  },
  {
    id: 2,
    name: "ANOUSONE SENEVONG",
    phone: "020 99XX XXXX",
    totalBookings: 12,
    noShows: 1,
    vip: false,
    color: "rgba(34, 197, 94, 0.1)",
  },
  {
    id: 3,
    name: "VANH LAVANH DARA",
    phone: "020 77XX XXXX",
    totalBookings: 8,
    noShows: 0,
    vip: false,
    color: "rgba(245, 158, 11, 0.1)",
  },
  {
    id: 4,
    name: "KEO PHOMMACHANH",
    phone: "020 22XX XXXX",
    totalBookings: 45,
    noShows: 0,
    vip: true,
    color: "rgba(99, 102, 241, 0.1)",
  },
];

const matches = [
  {
    id: 1,
    court: "ALPHA SECTOR 01",
    type: "Friendly 5v5",
    date: "TODAY",
    time: "19:00",
    creator: "Bouavone",
    joined: 8,
    needed: 10,
  },
  {
    id: 2,
    court: "BRAVO SECTOR 03",
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
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
