<template>
  <div class="flex h-screen bg-slate-50 font-sans overflow-hidden">
    <!-- Premium Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-all duration-300 ease-spring flex flex-col border-r border-slate-800 shadow-2xl"
      :class="isCollapsed ? 'w-[88px]' : 'w-72'"
    >
      <!-- Brand Header -->
      <div
        class="h-24 flex items-center px-6 border-b border-slate-800/50 shrink-0 relative group/brand"
      >
        <div class="flex items-center gap-4 w-full overflow-hidden">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 shrink-0"
          >
            S
          </div>
          <div
            class="flex flex-col opacity-100 transition-opacity duration-300"
            :class="{ 'opacity-0 w-0': isCollapsed }"
          >
            <span
              class="text-lg font-black tracking-tight text-white leading-none"
              >Stadium</span
            >
            <span
              class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em]"
              >Admin Console</span
            >
          </div>
        </div>

        <!-- Collapse Toggle -->
        <button
          @click="isCollapsed = !isCollapsed"
          class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all shadow-sm z-50 opacity-0 group-hover/brand:opacity-100"
        >
          <span class="text-xs">{{ isCollapsed ? "→" : "←" }}</span>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav
        class="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-1.5"
      >
        <div v-for="section in menuGroups" :key="section.title" class="mb-6">
          <p
            v-if="!isCollapsed"
            class="px-4 mb-2 text-[9px] font-black text-slate-500 uppercase tracking-widest animate-in fade-in duration-300"
          >
            {{ section.title }}
          </p>
          <div v-if="isCollapsed" class="h-4"></div>
          <!-- Spacer for collapsed mode -->

          <NuxtLink
            v-for="item in section.items"
            :key="item.path"
            :to="item.path"
            class="relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group nav-item overflow-hidden"
            :class="
              route.path === item.path
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            "
          >
            <span
              class="text-xl shrink-0 group-hover:scale-110 transition-transform duration-300"
              >{{ item.icon }}</span
            >
            <span
              class="text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300"
              :class="{
                'opacity-0 w-0 translate-x-4': isCollapsed,
                'opacity-100 translate-x-0': !isCollapsed,
              }"
            >
              {{ item.name }}
            </span>

            <!-- Active Indicator Dot -->
            <div
              v-if="route.path === item.path && !isCollapsed"
              class="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse"
            ></div>
          </NuxtLink>
        </div>
      </nav>

      <!-- User Profile Footer -->
      <div class="p-6 border-t border-slate-800/50 bg-slate-900 shrink-0">
        <div
          class="flex items-center gap-4 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer group relative overflow-hidden"
        >
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-sm shadow-inner shrink-0"
          >
            JS
          </div>
          <div
            class="overflow-hidden transition-all duration-300"
            :class="{ 'w-0 opacity-0': isCollapsed }"
          >
            <p class="text-xs font-black text-white truncate">John Stadium</p>
            <p
              class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Super Admin
            </p>
          </div>

          <!-- Quick Logout Hover Overlay -->
          <div
            class="absolute inset-0 bg-red-500/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            @click="requestLogout"
          >
            <span
              class="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
            >
              <span>🚪</span> Sign Out
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main
      class="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ease-spring bg-slate-50 relative"
      :class="isCollapsed ? 'ml-[88px]' : 'ml-72'"
    >
      <!-- Topbar -->
      <header
        class="h-24 px-10 flex items-center justify-between shrink-0 z-40"
      >
        <div>
          <h1
            class="text-2xl font-black text-slate-900 tracking-tight uppercase"
          >
            {{ currentPageTitle }}
          </h1>
          <p
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1"
          >
            {{ currentDate }} • Administration
          </p>
        </div>

        <div class="flex items-center gap-6">
          <!-- Global Search -->
          <div class="relative group hidden md:block">
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
              >🔍</span
            >
            <input
              type="text"
              placeholder="Search system..."
              class="w-80 h-12 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
            />
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-400 border border-slate-200"
            >
              ⌘K
            </div>
          </div>

          <!-- Notifications -->
          <button
            class="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center relative hover:bg-slate-50 transition-all group"
          >
            <span class="text-xl group-hover:scale-110 transition-transform"
              >🔔</span
            >
            <span
              class="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"
            ></span>
          </button>
        </div>
      </header>

      <!-- Scrollable Content Viewport -->
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-10 pt-0"
      >
        <slot />

        <!-- Footer -->
        <div
          class="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div
            class="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <span
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            ></span>
            <p
              class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
            >
              System Operational
            </p>
          </div>
          <p
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
          >
            © 2026 Admin Console v2.0
          </p>
        </div>
      </div>
    </main>

    <!-- Logout Confirmation Modal -->
    <LogoutConfirmationModal
      :is-open="showLogoutModal"
      @close="showLogoutModal = false"
      @confirm="executeLogout"
    />
  </div>
</template>

<script setup>
import LogoutConfirmationModal from "~/components/common/LogoutConfirmationModal.vue";

const isCollapsed = ref(false);
const showLogoutModal = ref(false);
const route = useRoute();

const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const menuGroups = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
      { name: "Reports", path: "/admin/reports", icon: "📈" },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Calendar", path: "/admin/calendar", icon: "📅" },
      { name: "Payments", path: "/admin/payments", icon: "💳" },
      { name: "Members", path: "/admin/members", icon: "👥" },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Venues", path: "/admin/venues", icon: "🏟️" },
      { name: "Settings", path: "/admin/settings", icon: "⚙️" },
    ],
  },
];

const currentPageTitle = computed(() => {
  for (const group of menuGroups) {
    const found = group.items.find((item) => route.path.startsWith(item.path));
    if (found) return found.name;
  }
  return "Overview";
});

const requestLogout = () => {
  showLogoutModal.value = true;
};

const executeLogout = () => {
  showLogoutModal.value = false;
  navigateTo("/login");
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
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

.ease-spring {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
