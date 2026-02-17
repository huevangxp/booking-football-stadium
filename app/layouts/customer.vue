<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20 selection:text-primary"
  >
    <!-- Premium Navigation -->
    <nav
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-all duration-300"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
      >
        <!-- Brand Identity -->
        <NuxtLink to="/customer" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300"
          >
            S
          </div>
          <div>
            <span
              class="block text-lg font-black tracking-tight text-slate-900 leading-none group-hover:text-primary transition-colors"
              >Stadium Pro</span
            >
            <span
              class="block text-[8px] font-bold text-slate-400 uppercase tracking-[0.25em] ml-0.5"
              >Member Portal</span
            >
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            to="/customer"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span class="text-lg">🏠</span>
            <span>Home</span>
          </NuxtLink>
          <NuxtLink
            to="/booking"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span class="text-lg">⚡</span>
            <span>Book Now</span>
          </NuxtLink>
          <NuxtLink
            to="/customer/my-bookings"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span class="text-lg">🎟️</span>
            <span>My Bookings</span>
          </NuxtLink>
        </div>

        <!-- User Profile & Actions -->
        <div class="flex items-center gap-6">
          <div class="h-8 w-px bg-slate-200 hidden md:block"></div>

          <div class="flex items-center gap-4">
            <div class="text-right hidden lg:block">
              <p
                class="text-xs font-black text-slate-900 uppercase tracking-tight leading-none mb-1"
              >
                John Doe
              </p>
              <div class="flex items-center justify-end gap-1">
                <div
                  class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                ></div>
                <p
                  class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  Online
                </p>
              </div>
            </div>

            <div class="relative group cursor-pointer">
              <div
                class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-black text-slate-500 overflow-hidden transition-all group-hover:border-primary group-hover:text-primary group-hover:shadow-md"
              >
                JD
              </div>
              <!-- Dropdown (Visual only for now) -->
              <div
                class="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50"
              >
                <button
                  @click="requestLogout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="animate-in fade-in duration-700">
      <slot />
    </main>

    <!-- Modern Footer -->
    <footer class="bg-white border-t border-slate-200 py-16 mt-24">
      <div
        class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12"
      >
        <div class="space-y-6">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-sm"
            >
              S
            </div>
            <span class="font-black text-lg tracking-tight">Stadium Pro</span>
          </div>
          <p
            class="text-xs font-medium text-slate-400 leading-relaxed max-w-xs"
          >
            Premium sports facility management for the modern athlete. Book,
            play, and track your performance.
          </p>
        </div>

        <div class="space-y-4">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest"
          >
            Platform
          </h4>
          <div class="flex flex-col gap-2">
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Experience</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Pricing</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Tournaments</a
            >
          </div>
        </div>

        <div class="space-y-4">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest"
          >
            Company
          </h4>
          <div class="flex flex-col gap-2">
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >About Us</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Careers</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Contact</a
            >
          </div>
        </div>

        <div class="space-y-4">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest"
          >
            Newsletter
          </h4>
          <div class="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-primary transition-colors"
            />
            <button
              class="bg-primary text-white rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest hover:bg-primary-dark transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div
        class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p
          class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
        >
          © 2026 Stadium Management Systems.
        </p>
        <div class="flex gap-6">
          <a
            href="#"
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
            >Privacy</a
          >
          <a
            href="#"
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
            >Terms</a
          >
        </div>
      </div>
    </footer>

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

const showLogoutModal = ref(false);

const requestLogout = () => {
  showLogoutModal.value = true;
};

const executeLogout = () => {
  showLogoutModal.value = false;
  navigateTo("/login");
};
</script>

<style scoped>
/* Ensure backdrop blur works across browsers */
nav {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
</style>
