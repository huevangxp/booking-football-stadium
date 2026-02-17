<template>
  <div
    class="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-8 animate-in fade-in duration-700"
  >
    <!-- Settings Navigation Sidebar -->
    <div class="w-full md:w-80 shrink-0 space-y-8">
      <div>
        <h2
          class="text-3xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Configuration
        </h2>
        <p
          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          System Preferences & Access
        </p>
      </div>

      <div
        class="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-4 space-y-2"
      >
        <button
          v-for="s in sections"
          :key="s.id"
          @click="activeSection = s.id"
          class="w-full relative overflow-hidden group p-4 rounded-2xl flex items-center gap-4 transition-all duration-300"
          :class="
            activeSection === s.id
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'hover:bg-slate-50 text-slate-500'
          "
        >
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
            :class="
              activeSection === s.id
                ? 'bg-white/10 text-white'
                : 'bg-slate-100 text-slate-900'
            "
          >
            {{ s.icon }}
          </div>
          <div class="text-left">
            <p
              class="text-xs font-black uppercase tracking-widest leading-none mb-1"
            >
              {{ s.label }}
            </p>
            <p class="text-[9px] font-bold opacity-60">{{ s.desc }}</p>
          </div>

          <!-- Active Indicator -->
          <div
            v-if="activeSection === s.id"
            class="absolute right-4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
          ></div>
        </button>
      </div>

      <!-- System Info -->
      <div
        class="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden"
      >
        <div
          class="absolute -top-12 -right-12 w-32 h-32 bg-primary rounded-full blur-3xl opacity-50"
        ></div>
        <p
          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4"
        >
          System Status
        </p>
        <div class="flex items-center gap-3 mb-6">
          <div class="relative flex h-3 w-3">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
            ></span>
          </div>
          <span class="text-xs font-black uppercase tracking-widest"
            >v2.4.0 Stable</span
          >
        </div>
        <button
          class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Check Updates
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div
      class="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40 p-10 relative overflow-hidden flex flex-col"
    >
      <!-- General Settings -->
      <div
        v-if="activeSection === 'general'"
        class="max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500"
      >
        <div class="border-b border-slate-100 pb-6">
          <h3 class="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Venue Profile
          </h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Core Information & Branding
          </p>
        </div>

        <div class="space-y-8">
          <div class="space-y-3">
            <label
              class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
              >Venue Identity</label
            >
            <input
              type="text"
              value="Antigravity Sports Complex"
              class="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
            />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                >Opening Time</label
              >
              <input
                type="time"
                value="08:00"
                class="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
              />
            </div>
            <div class="space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                >Closing Time</label
              >
              <input
                type="time"
                value="22:00"
                class="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          <div
            class="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6"
          >
            <div
              class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-200"
            >
              🏟️
            </div>
            <div>
              <h4
                class="text-sm font-black text-slate-900 uppercase tracking-tight mb-1"
              >
                Venue Logo
              </h4>
              <p
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                Recommended 512x512px PNG
              </p>
            </div>
            <button
              class="ml-auto px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              Upload New
            </button>
          </div>
        </div>
      </div>

      <!-- Booking Rules -->
      <div
        v-if="activeSection === 'rules'"
        class="max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500"
      >
        <div class="border-b border-slate-100 pb-6">
          <h3 class="text-2xl font-black text-slate-900 tracking-tight mb-2">
            Booking Logic
          </h3>
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Constraints & Automated Rules
          </p>
        </div>

        <div class="space-y-8">
          <div class="grid grid-cols-2 gap-8">
            <div class="space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                >Min Lead Time (Hrs)</label
              >
              <div class="relative group">
                <input
                  type="number"
                  value="1"
                  class="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
                />
                <div
                  class="absolute right-6 top-1/2 -translate-y-1/2 text-xl opacity-20 pointer-events-none"
                >
                  ⏳
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <label
                class="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
                >Cancel Window (Hrs)</label
              >
              <div class="relative group">
                <input
                  type="number"
                  value="24"
                  class="w-full h-16 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-lg font-black text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
                />
                <div
                  class="absolute right-6 top-1/2 -translate-y-1/2 text-xl opacity-20 pointer-events-none"
                >
                  🚫
                </div>
              </div>
            </div>
          </div>

          <!-- Toggle Card -->
          <div
            class="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div class="flex items-center gap-5">
              <div
                class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform"
              >
                💰
              </div>
              <div>
                <h4
                  class="text-sm font-black text-slate-900 uppercase tracking-tight mb-1"
                >
                  Require Deposit Slip
                </h4>
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Enforce payment verification before confirmation
                </p>
              </div>
            </div>
            <div class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer" />
              <div
                class="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500 shadow-inner transition-colors duration-300"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Staff Management -->
      <div
        v-if="activeSection === 'staff'"
        class="max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-500"
      >
        <div
          class="flex justify-between items-end border-b border-slate-100 pb-6"
        >
          <div>
            <h3 class="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Team Access
            </h3>
            <p
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              Roles & Permissions
            </p>
          </div>
          <button
            class="h-12 px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            + Invite Member
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="staff in staffList"
            :key="staff.email"
            class="p-5 bg-white border border-slate-200 rounded-3xl flex items-center justify-between hover:border-primary/30 hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-5">
              <div
                class="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-xl font-black text-slate-500 shadow-inner group-hover:from-primary group-hover:to-blue-600 group-hover:text-white transition-all duration-500"
              >
                {{ staff.name.charAt(0) }}
              </div>
              <div>
                <h4
                  class="text-sm font-black text-slate-900 uppercase tracking-tight mb-1"
                >
                  {{ staff.name }}
                </h4>
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  {{ staff.email }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span
                class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                :class="
                  staff.role === 'admin'
                    ? 'bg-purple-50 text-purple-600 border-purple-100'
                    : 'bg-blue-50 text-blue-600 border-blue-100'
                "
              >
                {{ staff.role === "admin" ? "Owner" : "Staff" }}
              </span>
              <button
                class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sticky Action Bar -->
      <div
        class="absolute bottom-0 left-0 right-0 p-8 bg-white/90 backdrop-blur-md border-t border-slate-100 flex justify-end gap-4"
      >
        <button
          class="h-14 px-8 rounded-2xl border border-slate-200 text-slate-500 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
        >
          Discard
        </button>
        <button
          class="h-14 px-10 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const activeSection = ref("general");

const sections = [
  {
    id: "general",
    label: "Venue Profile",
    desc: "Identity & Operating Hours",
    icon: "🏟️",
  },
  {
    id: "rules",
    label: "Booking Rules",
    desc: "Logic & Constraints",
    icon: "📜",
  },
  {
    id: "staff",
    label: "Team Access",
    desc: "Roles & Permissions",
    icon: "👥",
  },
  {
    id: "notifications",
    label: "Notifications",
    desc: "Alerts & Messaging",
    icon: "🔔",
  },
];

const staffList = ref([
  { name: "SOMSANITH P.", email: "somsanith@stadium.com", role: "admin" },
  { name: "KEO MANI", email: "keo.m@stadium.com", role: "staff" },
  { name: "PHONEXAY S.", email: "p.xay@stadium.com", role: "staff" },
]);
</script>
