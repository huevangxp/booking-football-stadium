<template>
  <div class="space-y-6">
    <div class="flex border-b border-slate-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-4 text-sm font-bold transition-all relative"
        :class="
          activeTab === tab.id
            ? 'text-primary'
            : 'text-slate-500 hover:text-slate-700'
        "
      >
        {{ tab.label }}
        <span
          v-if="tab.count"
          class="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded-full"
          >{{ tab.count }}</span
        >
        <div
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        ></div>
      </button>
    </div>

    <div class="card p-0 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              <th class="px-6 py-4">Transaction ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Court / Session</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Date / Time</th>
              <th class="px-6 py-4">Slip</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="payment in filteredPayments"
              :key="payment.id"
              class="hover:bg-slate-50/50 transition-colors"
            >
              <td class="px-6 py-4 text-sm font-bold text-slate-400">
                #{{ payment.id }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-primary"
                  >
                    {{ payment.user.charAt(0) }}
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-slate-900 truncate">
                      {{ payment.user }}
                    </p>
                    <p class="text-[10px] font-medium text-slate-500">
                      {{ payment.phone }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-slate-700">
                  {{ payment.court }}
                </p>
                <p class="text-[10px] font-medium text-slate-500">
                  {{ payment.session }}
                </p>
              </td>
              <td class="px-6 py-4 text-sm font-black text-primary">
                ₭{{ payment.amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 text-[10px] font-bold text-slate-500">
                {{ payment.date }}
              </td>
              <td class="px-6 py-4">
                <button
                  @click="selectedSlip = payment.slip"
                  class="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-2"
                >
                  📷 View
                </button>
              </td>
              <td class="px-6 py-4 text-right">
                <div
                  v-if="payment.status === 'pending'"
                  class="flex justify-end gap-2"
                >
                  <button
                    @click="approvePayment(payment.id)"
                    class="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                  >
                    Approve
                  </button>
                  <button
                    @click="rejectPayment(payment.id)"
                    class="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Reject
                  </button>
                </div>
                <span
                  v-else
                  class="badge"
                  :class="
                    payment.status === 'approved'
                      ? 'badge-success'
                      : 'badge-danger'
                  "
                  >{{ payment.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Slip Modal -->
    <Teleport to="body">
      <div
        v-if="selectedSlip"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        @click="selectedSlip = null"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95"
          @click.stop
        >
          <div
            class="px-6 py-4 border-b border-slate-100 flex justify-between items-center"
          >
            <h3 class="font-bold text-slate-900">Payment Verification</h3>
            <button
              @click="selectedSlip = null"
              class="text-slate-400 text-xl font-bold"
            >
              ×
            </button>
          </div>
          <div class="p-6 bg-slate-50 text-center">
            <div
              class="bg-white p-6 rounded-xl shadow-md space-y-4 text-left border border-slate-100"
            >
              <div
                class="flex justify-between items-center border-b border-slate-100 pb-3"
              >
                <span
                  class="text-xs font-black uppercase text-slate-400 tracking-widest"
                  >Bank Transfer</span
                >
                <span class="text-xs font-bold text-green-600">SUCCESS</span>
              </div>
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-400 font-medium">Amount:</span>
                  <span class="font-black text-slate-900">₭150,000</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-400 font-medium">Date:</span>
                  <span class="font-bold text-slate-900">Feb 17, 2026</span>
                </div>
              </div>
              <div
                class="bg-slate-50 p-3 rounded-lg border border-dashed border-slate-300 text-center"
              >
                <p class="text-[10px] font-black text-slate-400 uppercase">
                  Ref: TXN98234
                </p>
              </div>
            </div>
          </div>
          <div class="p-6 flex gap-3 border-t border-slate-100">
            <button @click="selectedSlip = null" class="btn btn-outline flex-1">
              Close
            </button>
            <button
              @click="selectedSlip = null"
              class="btn btn-primary flex-1 shadow-lg shadow-primary/20"
            >
              Approve Slip
            </button>
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

const tabs = [
  { id: "pending", label: "Verification", count: 3 },
  { id: "approved", label: "Approved", count: 0 },
  { id: "rejected", label: "Rejected", count: 0 },
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
    slip: "s1",
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
    slip: "s2",
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
    slip: "s3",
    status: "pending",
  },
]);

const filteredPayments = computed(() =>
  payments.value.filter((p) => p.status === activeTab.value),
);

const approvePayment = (id) => {
  const p = payments.value.find((p) => p.id === id);
  if (p) p.status = "approved";
};

const rejectPayment = (id) => {
  const p = payments.value.find((p) => p.id === id);
  if (p) p.status = "rejected";
};
</script>
