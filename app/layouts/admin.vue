<template>
  <div class="flex min-h-screen bg-slate-50 font-sans">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-slate-100 transition-all duration-200 ease-in-out"
      :class="isCollapsed ? 'w-20' : 'w-64'"
    >
      <div class="flex items-center justify-between p-6">
        <div class="flex items-center gap-3 font-bold text-xl overflow-hidden">
          <div
            class="min-w-[32px] h-8 bg-primary rounded-lg flex items-center justify-center text-white"
          >
            S
          </div>
          <span
            v-if="!isCollapsed"
            class="whitespace-nowrap transition-opacity duration-200"
            >StadiumAdmin</span
          >
        </div>
        <button
          @click="isCollapsed = !isCollapsed"
          class="text-slate-400 hover:text-white transition-colors"
        >
          <span v-if="isCollapsed">→</span>
          <span v-else>←</span>
        </button>
      </div>

      <nav class="flex-1 px-3 py-4 space-y-1">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
          :class="
            route.path.startsWith(item.path)
              ? 'bg-primary text-white shadow-lg'
              : 'text-slate-400 hover:bg-white/10 hover:text-white'
          "
        >
          <span class="text-xl min-w-[24px]" v-html="item.icon"></span>
          <span v-if="!isCollapsed" class="font-medium whitespace-nowrap">{{
            item.name
          }}</span>
        </NuxtLink>
      </nav>

      <div class="p-6 border-t border-white/10">
        <div class="flex items-center gap-3 mb-4" v-if="!isCollapsed">
          <div
            class="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-sm font-semibold"
          >
            JS
          </div>
          <div class="overflow-hidden">
            <p class="text-sm font-semibold truncate text-white">
              John Stadium
            </p>
            <p class="text-xs text-slate-400">Owner</p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full text-left p-2 text-slate-400 hover:text-white flex items-center gap-3 transition-colors"
        >
          <span>🚪</span>
          <span v-if="!isCollapsed">Log out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-1 flex flex-col transition-all duration-200 ease-in-out"
      :class="isCollapsed ? 'ml-20' : 'ml-64'"
    >
      <header
        class="sticky top-0 z-40 h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-8"
      >
        <h1 class="text-2xl font-bold text-slate-900">
          {{ currentPageTitle }}
        </h1>

        <div class="flex items-center gap-6">
          <div class="relative">
            <input
              type="text"
              placeholder="Search anything..."
              class="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64 transition-all"
            />
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              >🔍</span
            >
          </div>

          <div class="relative cursor-pointer group">
            <span class="text-xl">🔔</span>
            <span
              class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white"
              >3</span
            >
          </div>
        </div>
      </header>

      <div class="p-8 flex-1">
        <slot />
      </div>

      <footer class="bg-primary text-white px-8 py-4">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium"
        >
          <p>📞 ໂທ: 020 7884 9378 | 📧 ອີເມວ: huevang933@gmail.com</p>
          <p class="opacity-70 text-xs">© 2026 Sports Venue Booking System</p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
const isCollapsed = ref(false);
const route = useRoute();

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { name: "Calendar", path: "/admin/calendar", icon: "📅" },
  { name: "Payments", path: "/admin/payments", icon: "💳" },
  { name: "Venues", path: "/admin/venues", icon: "🏟️" },
  { name: "Members", path: "/admin/members", icon: "👥" },
  { name: "Reports", path: "/admin/reports", icon: "📈" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" },
];

const currentPageTitle = computed(() => {
  const currentItem = menuItems.find((item) =>
    route.path.startsWith(item.path),
  );
  return currentItem ? currentItem.name : "Dashboard";
});

const logout = () => {
  navigateTo("/login");
};
</script>
