<template>
  <div
    class="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans"
  >
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-24 -left-24 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute -bottom-24 -right-24 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse capitalize"
        style="animation-delay: 2s"
      ></div>
    </div>

    <div
      class="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl sm:rounded-[40px] shadow-2xl overflow-hidden relative z-10 border border-slate-100"
    >
      <!-- Left Side: Branding & Info (Desktop Only) -->
      <div
        class="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden"
      >
        <img
          src="/login_bg.jpg"
          alt="Stadium Background"
          class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-12">
            <div
              class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary font-black text-2xl shadow-xl"
            >
              S
            </div>
            <span class="text-2xl font-black uppercase tracking-tighter"
              >Stadium Pro</span
            >
          </div>

          <h1 class="text-5xl font-black leading-[1.1] mb-6 tracking-tighter">
            Manage your venue <br />
            <span class="text-primary-light">with intelligence.</span>
          </h1>
          <p class="text-blue-100 text-lg font-medium leading-relaxed max-w-md">
            The all-in-one platform for stadium owners and sports enthusiasts to
            connect, book, and thrive.
          </p>
        </div>

        <div class="relative z-10 space-y-6">
          <div
            class="flex items-center gap-4 bg-white/10 p-4 rounded-3xl border border-white/10 backdrop-blur-md"
          >
            <div
              class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl"
            >
              🚀
            </div>
            <div>
              <p class="font-black text-sm uppercase tracking-widest">
                Fast Performance
              </p>
              <p class="text-xs text-blue-200 uppercase font-bold">
                Optimized for scale
              </p>
            </div>
          </div>
          <p
            class="text-[10px] font-black uppercase tracking-[0.4em] opacity-50"
          >
            © 2026 Sports Architecture v4.0
          </p>
        </div>
      </div>

      <!-- Right Side: Login Form -->
      <div
        class="p-6 sm:p-12 lg:p-20 flex flex-col justify-center bg-white min-h-[500px] lg:min-h-0"
      >
        <!-- Mobile Branding -->
        <div class="lg:hidden flex justify-center mb-8">
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20"
            >
              S
            </div>
            <div>
              <span
                class="block text-lg font-black tracking-tight text-slate-900 leading-none"
                >Stadium Pro</span
              >
              <span
                class="block text-[8px] font-bold text-slate-400 uppercase tracking-[0.25em]"
                >Booking System</span
              >
            </div>
          </div>
        </div>

        <div class="mb-8 sm:mb-10 text-center lg:text-left">
          <h2
            class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2"
          >
            Welcome Back
          </h2>
          <p
            class="text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]"
          >
            Identify yourself to continue
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
          <div class="space-y-1.5 sm:space-y-2">
            <label
              class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
              >Username / Email</label
            >
            <div class="relative group">
              <span
                class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-sm sm:text-base"
                >👤</span
              >
              <input
                v-model="loginForm.username"
                type="text"
                placeholder="admin or customer"
                class="w-full h-12 sm:h-14 pl-12 sm:pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="space-y-1.5 sm:space-y-2">
            <label
              class="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1"
              >Secret Key</label
            >
            <div class="relative group">
              <span
                class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-sm sm:text-base"
                >🔑</span
              >
              <input
                v-model="loginForm.password"
                type="password"
                placeholder="••••••••"
                class="w-full h-12 sm:h-14 pl-12 sm:pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-inner placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between px-1">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                class="w-4 h-4 sm:w-5 sm:h-5 rounded border-slate-200 text-primary focus:ring-primary cursor-pointer"
              />
              <span
                class="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors"
                >Remember</span
              >
            </label>
            <button
              type="button"
              class="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-widest hover:underline underline-offset-4"
            >
              Forgot key?
            </button>
          </div>

          <div class="pt-2 sm:pt-4">
            <button
              type="submit"
              class="w-full h-12 sm:h-16 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-xl sm:shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group"
            >
              <div
                class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              ></div>
              <span class="relative z-10">Access Dashboard</span>
              <span class="relative z-10 text-lg sm:text-xl">→</span>
            </button>
          </div>
        </form>

        <div class="mt-8 sm:mt-12 text-center">
          <p
            class="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4"
          >
            Quick demo switcher
          </p>
          <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <button
              @click="quickLogin('admin')"
              class="px-4 sm:px-6 py-2 bg-slate-100 hover:bg-primary/5 hover:text-primary rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-slate-200 transition-all active:scale-95"
            >
              Role: Admin
            </button>
            <button
              @click="quickLogin('customer')"
              class="px-4 sm:px-6 py-2 bg-slate-100 hover:bg-primary/5 hover:text-primary rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest border border-slate-200 transition-all active:scale-95"
            >
              Role: Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

const loginForm = ref({
  username: "",
  password: "",
});

const { login } = useAuth();

const handleLogin = () => {
  if (loginForm.value.username === "admin") {
    login("admin");
    navigateTo("/admin/dashboard");
  } else if (loginForm.value.username === "customer") {
    login("customer");
    navigateTo("/");
  } else {
    alert('Please enter "admin" or "customer" to test the roles.');
  }
};

const quickLogin = (role) => {
  loginForm.value.username = role;
  loginForm.value.password = "password";
  handleLogin();
};
</script>
