<template>
  <div class="space-y-10 animate-in fade-in duration-700">
    <!-- Header Controls -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
    >
      <div>
        <h2
          class="text-4xl font-black text-slate-900 tracking-tighter uppercase"
        >
          Financial Hub
        </h2>
        <p
          class="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2"
        >
          Manage transactions & verify slips
        </p>
      </div>

      <div
        class="flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300"
          :class="
            activeTab === tab.id
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
              : 'text-slate-500 hover:text-slate-900'
          "
        >
          {{ tab.label }}
          <span
            v-if="tab.id === 'pending' && pendingCount > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white shadow-sm ring-2 ring-white"
          >
            {{ pendingCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Payments List -->
    <div
      class="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
    >
      <!-- Table Header -->
      <div
        class="hidden md:grid grid-cols-12 gap-6 px-10 py-6 bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
      >
        <div class="col-span-3">Transaction Info</div>
        <div class="col-span-3">Customer</div>
        <div class="col-span-2">Booking Info</div>
        <div class="col-span-2 text-center">Reference</div>
        <div class="col-span-2 text-right">Verification</div>
      </div>

      <div
        v-if="filteredPayments.length === 0"
        class="p-20 flex flex-col items-center justify-center text-center opacity-50"
      >
        <div class="text-6xl mb-4">💸</div>
        <p class="text-sm font-black text-slate-900 uppercase tracking-widest">
          No {{ activeTab }} transactions
        </p>
      </div>

      <div class="divide-y divide-slate-50">
        <div
          v-for="payment in filteredPayments"
          :key="payment.id"
          class="group relative md:grid grid-cols-12 gap-6 px-10 py-8 hover:bg-slate-50/80 transition-all duration-300 items-center"
        >
          <div
            class="absolute left-0 top-0 bottom-0 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            :class="getStatusColor(payment.status)"
          ></div>

          <!-- Transaction Info -->
          <div class="col-span-3">
            <div class="flex items-center gap-3 mb-1">
              <div
                class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg shadow-inner font-black text-slate-400"
              >
                #
              </div>
              <div>
                <p
                  class="text-lg font-black text-slate-900 leading-none tracking-tight"
                >
                  ₭{{ payment.amount.toLocaleString() }}
                </p>
                <p
                  class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1"
                >
                  {{ payment.date }}
                </p>
              </div>
            </div>
          </div>

          <!-- Customer -->
          <div class="col-span-3 flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20"
            >
              {{ payment.user.charAt(0) }}
            </div>
            <div>
              <p
                class="text-sm font-black text-slate-900 uppercase tracking-tight"
              >
                {{ payment.user }}
              </p>
              <p class="text-[10px] font-bold text-slate-400 tabular-nums">
                {{ payment.phone }}
              </p>
            </div>
          </div>

          <!-- Booking Info -->
          <div class="col-span-2">
            <span
              class="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-black text-slate-600 uppercase tracking-wider block w-fit mb-1"
              >{{ payment.court }}</span
            >
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-wide"
            >
              {{ payment.session }}
            </p>
          </div>

          <!-- Reference / Slip -->
          <div class="col-span-2 flex justify-center">
            <button
              @click="openSlip(payment)"
              class="group/btn relative px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all w-full text-center"
            >
              <span
                class="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/btn:text-primary transition-colors"
                >View Slip 🧾</span
              >
              <div
                class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"
                v-if="payment.status === 'pending'"
              ></div>
            </button>
          </div>

          <!-- Actions -->
          <div class="col-span-2 flex justify-end gap-2">
            <div v-if="payment.status === 'pending'" class="flex gap-2">
              <button
                @click="approvePayment(payment.id)"
                class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-emerald-500/30"
              >
                ✓
              </button>
              <button
                @click="rejectPayment(payment.id)"
                class="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm hover:shadow-red-500/30"
              >
                ✕
              </button>
            </div>
            <span
              v-else
              class="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border"
              :class="
                payment.status === 'approved'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                  : 'bg-red-50 border-red-100 text-red-600'
              "
            >
              {{ payment.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Slip Modal -->
    <Teleport to="body">
      <div
        v-if="selectedSlip"
        class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
        @click="selectedSlip = null"
      >
        <div
          class="bg-white rounded-[32px] overflow-hidden w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-300"
          @click.stop
        >
          <!-- Slip Header -->
          <div
            class="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center"
          >
            <div>
              <h3 class="font-black text-slate-900 uppercase tracking-tight">
                Proof of Payment
              </h3>
              <p
                class="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                Transaction Verification
              </p>
            </div>
            <button
              @click="selectedSlip = null"
              class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
            >
              ✕
            </button>
          </div>

          <!-- Slip Content -->
          <div class="p-8 flex flex-col items-center">
            <div
              class="w-full aspect-[3/4] bg-slate-100 rounded-2xl mb-6 relative overflow-hidden group border border-slate-200 shadow-inner"
            >
              <!-- Placeholder for slip image -->
              <div
                class="absolute inset-0 flex flex-col items-center justify-center text-slate-300"
              >
                <span class="text-4xl mb-2">📷</span>
                <span class="text-[10px] font-black uppercase tracking-widest"
                  >Slip Image Preview</span
                >
              </div>
              <!-- Value Overlay -->
              <div
                class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm"
              >
                <div class="flex justify-between items-center">
                  <span
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                    >Amount</span
                  >
                  <span class="text-sm font-black text-primary"
                    >₭{{ selectedPayment?.amount.toLocaleString() }}</span
                  >
                </div>
              </div>
            </div>

            <div
              class="grid grid-cols-2 gap-3 w-full"
              v-if="selectedPayment?.status === 'pending'"
            >
              <button
                @click="
                  rejectPayment(selectedPayment.id);
                  selectedSlip = null;
                "
                class="py-3 rounded-xl border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all"
              >
                Reject
              </button>
              <button
                @click="
                  approvePayment(selectedPayment.id);
                  selectedSlip = null;
                "
                class="py-3 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Approve - Verified
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const activeTab = ref("pending");
const selectedSlip = ref(null);
const selectedPayment = ref(null);

const tabs = [
  { id: "pending", label: "Verification" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const payments = ref([
  {
    id: "9827",
    user: "KEOTA V.",
    phone: "020 5512 8823",
    court: "Court 1",
    session: "17:00 - 18:00",
    amount: 150000,
    date: "17/02/26 13:45",
    status: "pending",
  },
  {
    id: "9828",
    user: "PHOUVONG S.",
    phone: "020 9982 7712",
    court: "Court 2",
    session: "18:00 - 19:00",
    amount: 150000,
    date: "17/02/26 14:10",
    status: "pending",
  },
  {
    id: "9829",
    user: "SENGDEUAN M.",
    phone: "020 7712 3344",
    court: "Badminton 1",
    session: "17:00 - 19:00",
    amount: 100000,
    date: "17/02/26 15:20",
    status: "pending",
  },
]);

const pendingCount = computed(
  () => payments.value.filter((p) => p.status === "pending").length,
);

const filteredPayments = computed(() =>
  payments.value.filter((p) => p.status === activeTab.value),
);

const openSlip = (payment) => {
  selectedPayment.value = payment;
  selectedSlip.value = true;
};

const getStatusColor = (status) => {
  if (status === "approved") return "bg-emerald-500";
  if (status === "rejected") return "bg-red-500";
  return "bg-amber-500";
};

const approvePayment = (id) => {
  const p = payments.value.find((p) => p.id === id);
  if (p) p.status = "approved";
};

const rejectPayment = (id) => {
  const p = payments.value.find((p) => p.id === id);
  if (p) p.status = "rejected";
};
</script>
