<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
    <!-- Settings Navigation -->
    <div class="md:col-span-1 space-y-2">
      <button
        v-for="s in sections"
        :key="s.id"
        :class="
          activeSection === s.id
            ? 'bg-primary text-white shadow-lg shadow-primary/20 p-4'
            : 'text-slate-500 hover:bg-slate-100 p-4'
        "
        @click="activeSection = s.id"
        class="w-full text-left font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3"
      >
        <span class="text-xl opacity-80">{{ s.icon }}</span>
        <span>{{ s.label }}</span>
      </button>
    </div>

    <!-- Settings Content -->
    <div class="md:col-span-3 card p-8 space-y-10 border-slate-200">
      <div
        v-if="activeSection === 'general'"
        class="space-y-8 animate-in fade-in slide-in-from-right-4"
      >
        <div class="border-b border-slate-100 pb-4">
          <h3
            class="text-2xl font-black text-slate-900 tracking-tight text-primary"
          >
            General Settings
          </h3>
          <p
            class="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest"
          >
            Base configuration for your venue.
          </p>
        </div>

        <div class="max-w-xl space-y-6">
          <div class="space-y-1.5">
            <label
              class="text-xs font-black text-slate-500 uppercase tracking-widest"
              >Stadium Name</label
            >
            <input
              type="text"
              value="Antigravity Sports Complex"
              class="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-1.5">
              <label
                class="text-xs font-black text-slate-500 uppercase tracking-widest"
                >Opening Time</label
              >
              <input
                type="time"
                value="08:00"
                class="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div class="space-y-1.5">
              <label
                class="text-xs font-black text-slate-500 uppercase tracking-widest"
                >Closing Time</label
              >
              <input
                type="time"
                value="22:00"
                class="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeSection === 'rules'"
        class="space-y-8 animate-in fade-in slide-in-from-right-4"
      >
        <div class="border-b border-slate-100 pb-4">
          <h3
            class="text-2xl font-black text-slate-900 tracking-tight text-primary"
          >
            Booking Rules
          </h3>
          <p
            class="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest"
          >
            Define how customers interact with your system.
          </p>
        </div>

        <div class="max-w-xl space-y-8">
          <div class="grid grid-cols-1 gap-8">
            <div class="space-y-2">
              <label
                class="text-xs font-black text-slate-500 uppercase tracking-widest"
                >Minimum Lead Time (Hours)</label
              >
              <input
                type="number"
                value="1"
                class="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
              <p class="text-[10px] font-bold text-slate-400 italic">
                How many hours in advance a customer must book their session.
              </p>
            </div>

            <div class="space-y-2">
              <label
                class="text-xs font-black text-slate-500 uppercase tracking-widest"
                >Cancellation Lead Time (Hours)</label
              >
              <input
                type="number"
                value="24"
                class="w-full h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>

            <div
              class="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between"
            >
              <div class="space-y-1">
                <label
                  class="text-sm font-black text-slate-700 uppercase tracking-tight"
                  >Require Deposit</label
                >
                <p class="text-[10px] font-bold text-slate-400 italic">
                  Ask for payment slip before confirming booking.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activeSection === 'staff'"
        class="space-y-8 animate-in fade-in slide-in-from-right-4"
      >
        <div
          class="flex justify-between items-center border-b border-slate-100 pb-4"
        >
          <div>
            <h3
              class="text-2xl font-black text-slate-900 tracking-tight text-primary"
            >
              Staff Accounts
            </h3>
            <p
              class="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest"
            >
              Manage access for your team members.
            </p>
          </div>
          <button
            class="btn btn-primary btn-small shadow-lg shadow-primary/20 px-6"
          >
            + Add Staff
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="staff in staffList"
            :key="staff.email"
            class="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-primary/30 transition-all"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-lg font-black text-primary"
              >
                {{ staff.name.charAt(0) }}
              </div>
              <div>
                <p class="text-sm font-black text-slate-900 leading-tight">
                  {{ staff.name }}
                </p>
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                >
                  {{ staff.email }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <select
                v-model="staff.role"
                class="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="admin">Owner/Admin</option>
                <option value="staff">Field Staff</option>
              </select>
              <button
                class="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-red-500 hover:bg-red-50 transition-colors shadow-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-100 flex justify-end">
        <button
          class="btn btn-primary px-10 h-12 shadow-xl shadow-primary/30 animate-pulse hover:animate-none"
        >
          Save All Changes
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
  { id: "general", label: "General", icon: "🏟️" },
  { id: "rules", label: "Booking Rules", icon: "📜" },
  { id: "staff", label: "Staff Accounts", icon: "👥" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
];

const staffList = ref([
  { name: "SOMSANITH P.", email: "somsanith@stadium.com", role: "admin" },
  { name: "KEO MANI", email: "keo.m@stadium.com", role: "staff" },
  { name: "PHONEXAY S.", email: "p.xay@stadium.com", role: "staff" },
]);
</script>
