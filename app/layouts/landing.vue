<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20 selection:text-primary flex flex-col"
  >
    <!-- Landing Navigation -->
    <nav
      class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all duration-300"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
      >
        <!-- Brand Identity -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
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
              >Booking System</span
            >
          </div>
        </NuxtLink>

        <!-- Auth Actions -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/login"
            class="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            Sign In
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:bg-primary hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
          >
            Join Now
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="flex-1 animate-in fade-in duration-700">
      <slot />
    </main>

    <!-- Enhanced Footer -->
    <footer class="bg-white border-t border-slate-200 py-16 mt-auto">
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
            The ultimate platform for sports enthusiasts. Find venues, book
            courts, and play your game.
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
              >Venues</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Tournaments</a
            >
            <a
              href="#"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors hover:pl-1"
              >Pricing</a
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
              >About</a
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
            Connect
          </h4>
          <div class="flex gap-2">
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
              >Fb</a
            >
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
              >Ig</a
            >
            <a
              href="#"
              class="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
              >Tw</a
            >
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
            >Privacy Policy</a
          >
          <a
            href="#"
            class="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
            >Terms of Service</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No script needed for this simple layout
</script>

<style scoped>
/* Ensure backdrop blur works across browsers */
nav {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
</style>
