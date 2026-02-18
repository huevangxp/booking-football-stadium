<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20 selection:text-primary flex flex-col"
  >
    <!-- Landing Navigation -->
    <nav
      class="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-all duration-300"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between"
      >
        <!-- Brand Identity -->
        <NuxtLink
          to="/"
          class="flex items-center gap-2 sm:gap-3 group shrink-0"
        >
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300"
          >
            S
          </div>
          <div>
            <span
              class="block text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none group-hover:text-primary transition-colors"
              >Stadium Pro</span
            >
            <span
              class="block text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-[0.25em] ml-0.5"
              >Booking System</span
            >
          </div>
        </NuxtLink>

        <!-- Desktop Menu (Authenticated) -->
        <div v-if="isAuthenticated" class="hidden md:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span>🏠</span>
            <span>{{ $t("home") }}</span>
          </NuxtLink>
          <NuxtLink
            to="/booking"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span>⚡</span>
            <span>{{ $t("book_now") }}</span>
          </NuxtLink>
          <NuxtLink
            to="/customer/my-bookings"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
            active-class="bg-primary/5 text-primary font-black"
          >
            <span>🎟️</span>
            <span>{{ $t("my_bookings") }}</span>
          </NuxtLink>
          <button
            @click="toggleChat"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest transition-all hover:bg-slate-50 hover:text-primary"
          >
            <span>💬</span>
            <span>Chat</span>
          </button>
        </div>

        <!-- Desktop Right Actions -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Language Switcher Dropdown -->
          <div class="relative group/lang">
            <button
              class="flex items-center gap-2 h-10 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <span class="text-base">{{ langFlag || "🇬🇧" }}</span>
              <span
                class="text-[10px] font-black text-slate-600 uppercase tracking-widest"
                >{{ langName || "English" }}</span
              >
              <span class="text-[8px] text-slate-400">▼</span>
            </button>
            <div
              class="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all transform translate-y-2 group-hover/lang:translate-y-0 z-50"
            >
              <button
                v-for="item in locales"
                :key="item.code"
                @click="setLanguage(item)"
                class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors uppercase tracking-widest"
                :class="
                  locale === item.code
                    ? 'bg-primary/5 text-primary font-black'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                "
              >
                <span class="text-base">{{ item.flag }}</span>
                <span>{{ item.name }}</span>
              </button>
            </div>
          </div>

          <!-- Auth Actions / Profile -->
          <template v-if="!isAuthenticated">
            <div class="h-8 w-px bg-slate-200 mx-1"></div>
            <NuxtLink
              to="/login"
              class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              {{ $t("sign_in") }}
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:bg-primary hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            >
              {{ $t("join_now") }}
            </NuxtLink>
          </template>

          <template v-else>
            <div class="h-8 w-px bg-slate-200 mx-3"></div>

            <div class="flex items-center gap-4">
              <div class="text-right">
                <p
                  class="text-xs font-black text-slate-900 uppercase tracking-tight leading-none mb-1"
                >
                  {{ user?.username || "User" }}
                </p>
                <div class="flex items-center justify-end gap-1">
                  <div
                    class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                  ></div>
                  <p
                    class="text-[9px] font-bold text-slate-400 uppercase tracking-widest"
                  >
                    {{ $t("online") }}
                  </p>
                </div>
              </div>

              <div class="relative group cursor-pointer">
                <div
                  class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-black text-slate-500 overflow-hidden transition-all group-hover:border-primary group-hover:text-primary group-hover:shadow-md"
                >
                  {{ user?.username?.charAt(0).toUpperCase() || "U" }}
                </div>
                <!-- Dropdown -->
                <div
                  class="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50"
                >
                  <button
                    @click="requestLogout"
                    class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-red-500 transition-colors uppercase tracking-widest"
                  >
                    <span>🚪</span> {{ $t("sign_out") }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 border border-slate-200 active:scale-95 transition-all"
        >
          <span class="text-xl">{{ isMobileMenuOpen ? "✕" : "☰" }}</span>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden"
        >
          <div class="px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <!-- Navigation Links (Auth Only) -->
            <div v-if="isAuthenticated" class="space-y-2">
              <p
                class="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
              >
                Menu
              </p>
              <NuxtLink
                to="/"
                @click="isMobileMenuOpen = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                active-class="!bg-primary/5 !text-primary !font-black"
              >
                <span>🏠</span> {{ $t("home") }}
              </NuxtLink>
              <NuxtLink
                to="/booking"
                @click="isMobileMenuOpen = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                active-class="!bg-primary/5 !text-primary !font-black"
              >
                <span>⚡</span> {{ $t("book_now") }}
              </NuxtLink>
              <NuxtLink
                to="/customer/my-bookings"
                @click="isMobileMenuOpen = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                active-class="!bg-primary/5 !text-primary !font-black"
              >
                <span>🎟️</span> {{ $t("my_bookings") }}
              </NuxtLink>
              <button
                @click="
                  isMobileMenuOpen = false;
                  toggleChat();
                "
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <span>💬</span> Chat
              </button>
            </div>

            <!-- Profile / Auth (Mobile) -->
            <div class="space-y-4 pt-4 border-t border-slate-100">
              <template v-if="isAuthenticated">
                <div class="flex items-center gap-4 px-2">
                  <div
                    class="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xl font-black text-slate-500"
                  >
                    {{ user?.username?.charAt(0).toUpperCase() || "U" }}
                  </div>
                  <div>
                    <p
                      class="font-black text-slate-900 text-lg leading-none mb-1"
                    >
                      {{ user?.username || "User" }}
                    </p>
                    <div class="flex items-center gap-1.5">
                      <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <p
                        class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                      >
                        {{ $t("online") }}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  @click="requestLogout"
                  class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest border border-red-100 active:scale-95 transition-all"
                >
                  <span>🚪</span> {{ $t("sign_out") }}
                </button>
              </template>

              <template v-else>
                <div class="grid grid-cols-2 gap-3">
                  <NuxtLink
                    to="/login"
                    @click="isMobileMenuOpen = false"
                    class="flex items-center justify-center px-4 py-3 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 uppercase tracking-widest"
                  >
                    {{ $t("sign_in") }}
                  </NuxtLink>
                  <NuxtLink
                    to="/login"
                    @click="isMobileMenuOpen = false"
                    class="flex items-center justify-center px-4 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
                  >
                    {{ $t("join_now") }}
                  </NuxtLink>
                </div>
              </template>
            </div>

            <!-- Language Switcher (Mobile) -->
            <div class="space-y-2 pt-4 border-t border-slate-100">
              <p
                class="px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"
              >
                Language
              </p>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="item in locales"
                  :key="item.code"
                  @click="
                    setLanguage(item);
                    isMobileMenuOpen = false;
                  "
                  class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border transition-colors uppercase tracking-widest"
                  :class="
                    locale === item.code
                      ? 'bg-primary/5 border-primary/20 text-primary font-black'
                      : 'bg-white border-slate-200 text-slate-500'
                  "
                >
                  <span class="text-base">{{ item.flag }}</span>
                  <span>{{ item.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- Page Content -->
    <main class="flex-1 animate-in fade-in duration-700 w-full relative">
      <slot />
    </main>

    <!-- Enhanced Footer -->
    <!-- Enhanced Footer -->
    <footer
      class="bg-white border-t border-slate-200 pt-16 pb-8 sm:pt-20 sm:pb-10 mt-auto"
    >
      <div
        class="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-x-8 sm:gap-y-12 lg:gap-12"
      >
        <!-- Brand Section -->
        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-slate-900/20"
            >
              S
            </div>
            <div>
              <span
                class="block font-black text-xl tracking-tight text-slate-900 leading-none"
                >Stadium Pro</span
              >
              <span
                class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"
                >Booking System</span
              >
            </div>
          </div>
          <p
            class="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed max-w-xs"
          >
            The ultimate platform for sports venues. simplifying bookings,
            management, and payments for everyone.
          </p>
        </div>

        <!-- Links Column 1 -->
        <div class="space-y-6">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            Platform
          </h4>
          <div class="flex flex-col gap-3">
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >Find Venues</a
            >
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >Tournaments</a
            >
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >Pricing Plans</a
            >
          </div>
        </div>

        <!-- Links Column 2 -->
        <div class="space-y-6">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500/40"></span>
            Company
          </h4>
          <div class="flex flex-col gap-3">
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >About Us</a
            >
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >Careers</a
            >
            <a
              href="#"
              class="text-sm font-bold text-slate-500 hover:text-primary transition-all hover:translate-x-1"
              >Contact Support</a
            >
          </div>
        </div>

        <!-- Links Column 3: Social -->
        <div class="space-y-6">
          <h4
            class="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Connect
          </h4>
          <div class="flex gap-3">
            <a
              href="#"
              class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:border-primary/20 hover:text-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:border-pink-500/20 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:border-blue-400/20 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-400/10 hover:-translate-y-1 transition-all duration-300"
              aria-label="Twitter"
            >
              <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <p
          class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-left"
        >
          © 2026 Stadium Management Systems.
        </p>
        <div class="flex gap-6 sm:gap-8">
          <a
            href="#"
            class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors hover:underline underline-offset-4"
            >{{ $t("privacy_policy") }}</a
          >
          <a
            href="#"
            class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors hover:underline underline-offset-4"
            >{{ $t("terms_of_service") }}</a
          >
        </div>
      </div>
    </footer>

    <CustomerChat />
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
import CustomerChat from "~/components/common/CustomerChat.vue";

const { isAuthenticated, user, logout } = useAuth();
const { toggleChat } = useChat();
const { locales, setLocale, locale } = useI18n();
const langName = useCookie("lang_name");
const langFlag = useCookie("lang_flag");
const showLogoutModal = ref(false);
const isMobileMenuOpen = ref(false);

const setLanguage = (data) => {
  setLocale(data.code);
  langName.value = data.name;
  langFlag.value = data.flag;
};

onMounted(() => {
  if (!langName.value || !langFlag.value) {
    const currentLocale = locales.value.find((l) => l.code === locale.value);
    if (currentLocale) {
      langName.value = currentLocale.name;
      langFlag.value = currentLocale.flag;
    } else {
      langName.value = "English";
      langFlag.value = "🇬🇧";
    }
  }
});

// Watch locale changes to keep cookie synced if changed externally
watch(locale, (newLocale) => {
  const currentLocale = locales.value.find((l) => l.code === newLocale);
  if (currentLocale) {
    langName.value = currentLocale.name;
    langFlag.value = currentLocale.flag;
  }
});

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    isMobileMenuOpen.value = false;
  },
);

const requestLogout = () => {
  if (isMobileMenuOpen.value) isMobileMenuOpen.value = false;
  showLogoutModal.value = true;
};

const executeLogout = () => {
  showLogoutModal.value = false;
  logout();
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
