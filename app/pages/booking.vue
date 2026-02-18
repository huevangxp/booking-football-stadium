<template>
  <div class="pb-24 sm:pb-0">
    <!-- Added padding-bottom for mobile sticky bar -->
    <!-- Hero Section -->
    <header
      class="relative h-[280px] sm:h-[360px] lg:h-[450px] flex items-center justify-center text-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-slate-900/60 z-10"></div>
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000')] bg-cover bg-center animate-pulse duration-[10s]"
      ></div>
      <div
        class="relative z-20 max-w-3xl px-6 sm:px-8 space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        <span
          class="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2"
        >
          Premium Sports Venues
        </span>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none"
        >
          BOOK YOUR COURT <br /><span
            class="text-primary-light bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-white"
            >INSTANTLY</span
          >
        </h1>
        <p
          class="text-sm sm:text-base lg:text-xl text-slate-200 font-medium max-w-xl mx-auto leading-relaxed"
        >
          Experience the best sports facilities in town. Quick, easy, and
          real-time booking for football and badminton.
        </p>
      </div>
    </header>

    <main
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24 relative z-30 pb-8 sm:pb-12 lg:pb-20"
    >
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        <!-- ═══════════════════════════════════════ -->
        <!-- Booking Steps: Court & Time Selection   -->
        <!-- ═══════════════════════════════════════ -->
        <div class="lg:col-span-2 space-y-6 sm:space-y-8">
          <!-- Step 1: Court Selection -->
          <section
            class="card !p-5 sm:!p-8 space-y-6 shadow-xl shadow-slate-200/50"
          >
            <h2
              class="text-xl sm:text-2xl font-black flex items-center gap-3 text-slate-900"
            >
              <span
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white text-sm sm:text-base shadow-lg shadow-primary/30"
                >1</span
              >
              Select Sport & Court
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="court in courts"
                :key="court.id"
                @click="selectedCourt = court"
                class="group relative overflow-hidden rounded-2xl border-2 transition-all p-4 cursor-pointer active:scale-[0.98]"
                :class="
                  selectedCourt?.id === court.id
                    ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                    : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-md'
                "
              >
                <div class="flex gap-4">
                  <div
                    class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative group-hover:shadow-lg transition-all"
                  >
                    <img
                      v-if="court.image"
                      :src="court.image"
                      :alt="court.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                    >
                      {{ court.icon }}
                    </div>
                  </div>
                  <div
                    class="flex-1 min-w-0 flex flex-col justify-center gap-1"
                  >
                    <h3
                      class="text-base sm:text-lg font-black text-slate-900 group-hover:text-primary transition-colors truncate"
                    >
                      {{ court.name }}
                    </h3>
                    <p
                      class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {{ court.type }}
                    </p>
                    <div class="flex items-center gap-3 mt-1">
                      <span
                        class="text-xs sm:text-sm font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md"
                        >₭{{ court.price.toLocaleString() }}/hr</span
                      >
                      <span
                        class="text-[10px] sm:text-xs font-bold text-slate-400 flex items-center gap-1"
                        >👤 {{ court.capacity }}</span
                      >
                    </div>
                  </div>
                </div>
                <!-- Selected Check -->
                <div
                  v-if="selectedCourt?.id === court.id"
                  class="absolute top-3 right-3 w-6 h-6 sm:w-7 sm:h-7 bg-primary rounded-full flex items-center justify-center shadow-lg transform scale-100 transition-transform"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <!-- Step 2: Date & Time Selection -->
          <section
            class="card !p-5 sm:!p-8 space-y-6 shadow-xl shadow-slate-200/50"
            v-if="selectedCourt"
          >
            <h2
              class="text-xl sm:text-2xl font-black flex items-center gap-3 text-slate-900"
            >
              <span
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white text-sm sm:text-base shadow-lg shadow-primary/30"
                >2</span
              >
              Select Date & Time
            </h2>

            <!-- Date Scroller -->
            <div
              class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2"
            >
              <div
                v-for="date in next7Days"
                :key="date.full"
                @click="selectedDate = date.full"
                class="min-w-[72px] sm:min-w-[84px] h-[84px] sm:h-[96px] rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
                :class="
                  selectedDate === date.full
                    ? 'border-primary bg-primary text-white shadow-xl shadow-primary/30 scale-105'
                    : 'border-slate-100 bg-white hover:border-primary/30 text-slate-500 hover:shadow-md'
                "
              >
                <span
                  class="text-[10px] font-bold uppercase tracking-widest"
                  :class="
                    selectedDate === date.full
                      ? 'text-white/80'
                      : 'text-slate-400'
                  "
                  >{{ date.dayName }}</span
                >
                <span class="text-xl sm:text-2xl font-black">{{
                  date.dayNumber
                }}</span>
                <span
                  class="text-[10px] font-bold"
                  :class="
                    selectedDate === date.full
                      ? 'text-white/80'
                      : 'text-slate-400'
                  "
                  >{{ date.month }}</span
                >
              </div>
            </div>

            <!-- Time Slots Grid -->
            <div>
              <p
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
              >
                Available Slots
              </p>
              <div
                class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3"
              >
                <button
                  v-for="slot in timeSlots"
                  :key="slot.time"
                  @click="toggleTimeSlot(slot.time)"
                  :disabled="slot.booked"
                  class="h-12 sm:h-14 rounded-xl border-2 font-black text-xs sm:text-sm transition-all relative overflow-hidden active:scale-95 flex items-center justify-center"
                  :class="[
                    slot.booked
                      ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                      : selectedSlots.includes(slot.time)
                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                        : 'border-slate-100 bg-white hover:border-primary/50 text-slate-600 hover:shadow-sm',
                  ]"
                >
                  {{ slot.time }}
                  <span
                    v-if="slot.booked"
                    class="absolute inset-0 flex items-center justify-center bg-slate-100/90 text-[8px] font-black uppercase text-slate-400 transform rotate-12"
                    >Booked</span
                  >
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- ═══════════════════════════════════════ -->
        <!-- Booking Summary Sidebar (Desktop)      -->
        <!-- ═══════════════════════════════════════ -->
        <div class="hidden lg:block lg:col-span-1">
          <div
            class="card !p-0 overflow-hidden sticky top-24 shadow-2xl shadow-primary/5 border-slate-200"
          >
            <!-- Header -->
            <div class="p-6 bg-slate-900 text-white relative overflow-hidden">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              ></div>
              <h3 class="text-xl font-black relative z-10">Booking Summary</h3>
              <p
                class="text-xs font-bold text-white/50 uppercase tracking-widest mt-1 relative z-10"
              >
                Review details
              </p>
            </div>

            <!-- Body -->
            <div class="p-6 space-y-6">
              <!-- Empty State -->
              <div v-if="!selectedCourt" class="py-10 text-center space-y-3">
                <div class="text-4xl opacity-30">🏟️</div>
                <p class="text-sm font-bold text-slate-400 italic px-4">
                  Select a court to start booking.
                </p>
              </div>

              <!-- Summary Content -->
              <div v-else class="space-y-6">
                <!-- Selected Court -->
                <div class="flex gap-4">
                  <div
                    class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner shrink-0 border border-slate-100"
                  >
                    {{ selectedCourt.icon }}
                  </div>
                  <div class="min-w-0 pt-0.5">
                    <h4
                      class="text-base font-black text-slate-900 leading-none mb-1 truncate"
                    >
                      {{ selectedCourt.name }}
                    </h4>
                    <p
                      class="text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {{ selectedCourt.type }}
                    </p>
                  </div>
                </div>

                <!-- Date -->
                <div
                  class="flex items-center gap-4 text-sm font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                >
                  <span class="text-lg">📅</span>
                  <span class="truncate">{{ selectedDateDisplay }}</span>
                </div>

                <!-- Selected Slots -->
                <div class="space-y-2">
                  <p
                    class="text-[10px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    Selected Slots
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="slot in selectedSlots"
                      :key="slot"
                      class="px-3 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-lg border border-primary/20 flex items-center gap-2 group hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
                      @click="toggleTimeSlot(slot)"
                    >
                      {{ slot }}
                      <span class="opacity-50 group-hover:opacity-100">×</span>
                    </span>
                    <p
                      v-if="selectedSlots.length === 0"
                      class="text-xs font-bold text-slate-400 italic"
                    >
                      No time selected.
                    </p>
                  </div>
                </div>

                <!-- Pricing -->
                <div
                  class="pt-6 border-t border-dashed border-slate-200 space-y-3"
                >
                  <div
                    class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider"
                  >
                    <span>Subtotal</span>
                    <span
                      >₭{{
                        (
                          selectedCourt.price * selectedSlots.length
                        ).toLocaleString()
                      }}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider"
                  >
                    <span>Service Fee</span>
                    <span>₭5,000</span>
                  </div>
                  <div class="flex justify-between items-center pt-2">
                    <span class="text-lg font-black text-slate-900 uppercase"
                      >Total</span
                    >
                    <span class="text-3xl font-black text-primary"
                      >₭{{ totalPrice.toLocaleString() }}</span
                    >
                  </div>
                </div>

                <!-- Confirm Button -->
                <button
                  @click="confirmBooking"
                  :disabled="selectedSlots.length === 0"
                  class="w-full btn btn-primary h-14 text-lg font-black shadow-xl shadow-primary/20 disabled:bg-slate-100 disabled:shadow-none disabled:text-slate-400 transition-all group overflow-hidden relative active:scale-[0.98]"
                >
                  <span class="relative z-10">Confirm Booking</span>
                  <div
                    class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ═══════════════════════════════════════ -->
    <!-- Mobile Sticky Action Bar               -->
    <!-- ═══════════════════════════════════════ -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="selectedCourt && selectedSlots.length > 0"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.1)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        style="padding-bottom: max(1rem, env(safe-area-inset-bottom))"
      >
        <!-- Fallback pb-4 if env not supported, but calculation handles it -->

        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5"
            >
              Total ({{ selectedSlots.length }} slots)
            </p>
            <p class="text-2xl font-black text-slate-900 leading-none">
              ₭{{ totalPrice.toLocaleString() }}
            </p>
          </div>
          <button
            @click="confirmBooking"
            class="flex-1 max-w-[200px] h-12 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm</span>
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════════════════════ -->
    <!-- Bill / Payment Receipt Dialog                      -->
    <!-- ═══════════════════════════════════════════════════ -->
    <Transition name="modal">
      <div
        v-if="showBillModal"
        class="bill-overlay"
        @keydown.esc="showBillModal = false"
      >
        <!-- Backdrop -->
        <div class="bill-backdrop" @click="showBillModal = false"></div>

        <!-- Dialog Card -->
        <div class="bill-dialog">
          <!-- Close -->
          <button
            @click="showBillModal = false"
            class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Header -->
          <div class="bill-header">
            <div
              class="absolute -top-16 -right-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute -bottom-12 -left-12 w-36 h-36 bg-blue-500/15 rounded-full blur-3xl"
            ></div>
            <div class="relative text-center">
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white/10"
              >
                <span class="text-xl sm:text-2xl">🧾</span>
              </div>
              <h3
                class="text-lg sm:text-xl font-black text-white tracking-tight"
              >
                Payment Receipt
              </h3>
              <p
                class="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 sm:mt-1.5"
              >
                Booking Confirmation
              </p>
              <div
                class="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
              >
                <span
                  class="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                  >ID</span
                >
                <span
                  class="text-xs sm:text-sm font-black text-white font-mono tracking-wider"
                  >{{ bookingId }}</span
                >
              </div>
            </div>
          </div>

          <!-- Scrollable Body -->
          <div class="bill-body">
            <div class="p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5">
              <!-- Court Info Card -->
              <div
                class="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-100"
              >
                <div
                  class="w-11 h-11 sm:w-14 sm:h-14 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-slate-100 shrink-0"
                >
                  {{ selectedCourt?.icon }}
                </div>
                <div class="flex-1 min-w-0">
                  <p
                    class="font-black text-slate-900 text-xs sm:text-sm truncate"
                  >
                    {{ selectedCourt?.name }}
                  </p>
                  <p
                    class="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5"
                  >
                    {{ selectedCourt?.type }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs sm:text-sm font-black text-primary">
                    ₭{{ selectedCourt?.price?.toLocaleString() }}
                  </p>
                  <p
                    class="text-[8px] sm:text-[9px] font-bold text-slate-400 mt-0.5"
                  >
                    per hour
                  </p>
                </div>
              </div>

              <!-- Date & Duration -->
              <div class="grid grid-cols-2 gap-2 sm:gap-3">
                <div
                  class="p-3 sm:p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50/80 rounded-lg sm:rounded-xl border border-blue-100/60"
                >
                  <p
                    class="text-[8px] sm:text-[9px] font-black text-blue-400 uppercase tracking-widest mb-0.5 sm:mb-1"
                  >
                    📅 Date
                  </p>
                  <p class="text-[10px] sm:text-xs font-black text-slate-800">
                    {{ selectedDateDisplay }}
                  </p>
                </div>
                <div
                  class="p-3 sm:p-3.5 bg-gradient-to-br from-violet-50 to-purple-50/80 rounded-lg sm:rounded-xl border border-violet-100/60"
                >
                  <p
                    class="text-[8px] sm:text-[9px] font-black text-violet-400 uppercase tracking-widest mb-0.5 sm:mb-1"
                  >
                    🕐 Duration
                  </p>
                  <p class="text-[10px] sm:text-xs font-black text-slate-800">
                    {{ selectedSlots.length }} hour(s)
                  </p>
                </div>
              </div>

              <!-- Time Slots -->
              <div>
                <p
                  class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2"
                >
                  ⏰ Time Slots
                </p>
                <div class="flex flex-wrap gap-1 sm:gap-1.5">
                  <span
                    v-for="slot in selectedSlots"
                    :key="'bill-' + slot"
                    class="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-900 text-white text-[10px] sm:text-[11px] font-black rounded-md sm:rounded-lg shadow-sm"
                  >
                    {{ slot }}
                  </span>
                </div>
              </div>

              <!-- Receipt Divider -->
              <div class="receipt-divider"></div>

              <!-- Pricing Breakdown -->
              <div class="space-y-2 sm:space-y-2.5">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] sm:text-xs font-bold text-slate-500"
                    >Court Fee × {{ selectedSlots.length }}hr</span
                  >
                  <span class="text-[10px] sm:text-xs font-black text-slate-700"
                    >₭{{
                      (
                        selectedCourt?.price * selectedSlots.length
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[10px] sm:text-xs font-bold text-slate-500"
                    >Service Fee</span
                  >
                  <span class="text-[10px] sm:text-xs font-black text-slate-700"
                    >₭5,000</span
                  >
                </div>
                <div
                  class="flex justify-between items-center pt-2 sm:pt-3 mt-1 border-t border-slate-100"
                >
                  <span
                    class="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide"
                    >Total</span
                  >
                  <span
                    class="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                    >₭{{ totalPrice.toLocaleString() }}</span
                  >
                </div>
              </div>

              <!-- Receipt Divider -->
              <div class="receipt-divider"></div>

              <!-- Upload Payment Slip -->
              <div class="space-y-2.5 sm:space-y-3">
                <div class="flex items-center justify-between">
                  <p
                    class="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest"
                  >
                    📎 Upload Payment Slip
                  </p>
                  <span
                    v-if="paymentSlipPreview"
                    class="text-[8px] sm:text-[9px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1"
                  >
                    <span
                      class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                    ></span>
                    Attached
                  </span>
                </div>

                <!-- Upload Drop Zone -->
                <div
                  v-if="!paymentSlipPreview"
                  @click="$refs.fileInput.click()"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                  class="group relative border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300"
                  :class="
                    isDragging
                      ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10'
                      : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50/80'
                  "
                >
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileSelect"
                  />
                  <div class="space-y-2">
                    <div
                      class="w-11 h-11 sm:w-14 sm:h-14 mx-auto bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300"
                    >
                      🖼️
                    </div>
                    <div>
                      <p class="text-xs sm:text-sm font-black text-slate-600">
                        Click to upload or drag & drop
                      </p>
                      <p
                        class="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 sm:mt-1"
                      >
                        PNG, JPG • Max 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Image Preview -->
                <div
                  v-else
                  class="relative rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-200 bg-white shadow-sm"
                >
                  <img
                    :src="paymentSlipPreview"
                    alt="Payment slip"
                    class="w-full max-h-40 sm:max-h-52 object-contain bg-slate-50"
                  />
                  <div class="absolute top-2 right-2">
                    <button
                      @click="removePaymentSlip"
                      class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-xs flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 active:scale-95 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 sm:w-3.5 sm:h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    class="px-3 py-2 sm:px-3.5 sm:py-2.5 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2"
                  >
                    <div
                      class="w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[7px] sm:text-[8px] shrink-0"
                    >
                      ✓
                    </div>
                    <p
                      class="text-[9px] sm:text-[10px] font-bold text-emerald-700 truncate flex-1"
                    >
                      {{ paymentSlipFile?.name }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Status Messages -->
              <Transition name="fade" mode="out-in">
                <div
                  v-if="isSending"
                  key="sending"
                  class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100"
                >
                  <div
                    class="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0"
                  ></div>
                  <p class="text-[10px] sm:text-xs font-bold text-blue-600">
                    Sending payment slip to admin...
                  </p>
                </div>
                <div
                  v-else-if="isSent"
                  key="sent"
                  class="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100"
                >
                  <div
                    class="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm shadow-sm shrink-0"
                  >
                    ✓
                  </div>
                  <div>
                    <p
                      class="text-[10px] sm:text-xs font-black text-emerald-700"
                    >
                      Payment Slip Sent Successfully!
                    </p>
                    <p
                      class="text-[8px] sm:text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5"
                    >
                      Admin will verify your payment
                    </p>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Sticky Footer Actions -->
          <div class="bill-footer">
            <button
              @click="printBill"
              class="h-10 w-10 sm:h-12 sm:w-12 shrink-0 border border-slate-200 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 active:scale-95 transition-all"
              title="Print Receipt"
            >
              🖨️
            </button>
            <button
              v-if="!isSent"
              @click="sendToAdmin"
              :disabled="!paymentSlipFile || isSending"
              class="flex-1 h-10 sm:h-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:from-slate-800 hover:to-slate-700 active:scale-[0.98] transition-all disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:active:scale-100 flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <span>📤</span> Send to Admin
            </button>
            <button
              v-else
              @click="closeBillAndReset"
              class="flex-1 h-10 sm:h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 sm:gap-2"
            >
              ✅ Done
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "landing",
});

const selectedCourt = ref(null);
const selectedDate = ref(null);
const selectedSlots = ref([]);
const showBillModal = ref(false);
const bookingId = ref("");
const paymentSlipFile = ref(null);
const paymentSlipPreview = ref(null);
const isDragging = ref(false);
const isSending = ref(false);
const isSent = ref(false);

// Lock body scroll when modal is open
watch(showBillModal, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

const courts = [
  {
    id: 1,
    name: "Main Court 1",
    type: "Football 5-a-side",
    price: 150000,
    capacity: "10 Players",
    icon: "⚽",
    image: "/images/court-5v5.png",
  },
  {
    id: 2,
    name: "Main Court 2",
    type: "Football 5-a-side",
    price: 150000,
    capacity: "10 Players",
    icon: "⚽",
    image: "/images/court-5v5.png",
  },
  {
    id: 3,
    name: "West Court 3",
    type: "Football 7-a-side",
    price: 250000,
    capacity: "14 Players",
    icon: "🏃",
  },
  {
    id: 4,
    name: "Badminton Hall 1",
    type: "Badminton",
    price: 50000,
    capacity: "4 Players",
    icon: "🏸",
  },
  {
    id: 5,
    name: "Badminton Hall 2",
    type: "Badminton",
    price: 50000,
    capacity: "4 Players",
    icon: "🏸",
  },
];

const timeSlots = [
  { time: "08:00", booked: true },
  { time: "09:00", booked: false },
  { time: "10:00", booked: false },
  { time: "11:00", booked: false },
  { time: "12:00", booked: false },
  { time: "13:00", booked: true },
  { time: "14:00", booked: true },
  { time: "15:00", booked: false },
  { time: "16:00", booked: false },
  { time: "17:00", booked: false },
  { time: "18:00", booked: false },
  { time: "19:00", booked: false },
  { time: "20:00", booked: false },
  { time: "21:00", booked: false },
];

// Generate next 7 days for selection
const next7Days = computed(() => {
  const days = [];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dayName: i === 0 ? "Today" : dayNames[d.getDay()],
      dayNumber: d.getDate(),
      month: months[d.getMonth()],
      full: d.toDateString(),
    });
  }
  return days;
});

// Initialize today as selected date
onMounted(() => {
  selectedDate.value = next7Days.value[0].full;
});

const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return "";
  return selectedDate.value;
});

const totalPrice = computed(() => {
  if (!selectedCourt.value) return 0;
  const courtFee = selectedCourt.value.price * selectedSlots.value.length;
  return courtFee > 0 ? courtFee + 5000 : 0;
});

const toggleTimeSlot = (time) => {
  const index = selectedSlots.value.indexOf(time);
  if (index > -1) {
    selectedSlots.value.splice(index, 1);
  } else {
    selectedSlots.value.push(time);
    selectedSlots.value.sort();
  }
};

const logout = () => {
  navigateTo("/login");
};

const generateBookingId = () => {
  const prefix = "BK";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const confirmBooking = () => {
  bookingId.value = generateBookingId();
  paymentSlipFile.value = null;
  paymentSlipPreview.value = null;
  isSending.value = false;
  isSent.value = false;
  showBillModal.value = true;
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    paymentSlipFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      paymentSlipPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    paymentSlipFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      paymentSlipPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePaymentSlip = () => {
  paymentSlipFile.value = null;
  paymentSlipPreview.value = null;
};

const sendToAdmin = async () => {
  if (!paymentSlipFile.value) return;
  isSending.value = true;
  // Simulate sending to admin (replace with real API call)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isSending.value = false;
  isSent.value = true;
};

const printBill = () => {
  window.print();
};

const closeBillAndReset = () => {
  showBillModal.value = false;
  selectedCourt.value = null;
  selectedSlots.value = [];
  selectedDate.value = next7Days.value[0].full;
  paymentSlipFile.value = null;
  paymentSlipPreview.value = null;
  isSending.value = false;
  isSent.value = false;
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ═══════════════════════════════════════════ */
/* Bill Dialog System                         */
/* ═══════════════════════════════════════════ */

.bill-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}

.bill-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.bill-dialog {
  position: relative;
  width: 100%;
  max-height: 95vh;
  background: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow:
    0 -4px 24px -4px rgba(0, 0, 0, 0.12),
    0 -16px 48px -8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.bill-header {
  position: relative;
  padding: 1.75rem 1.25rem 1.5rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  overflow: hidden;
  flex-shrink: 0;
}

.bill-body {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

/* Custom thin scrollbar */
.bill-body::-webkit-scrollbar {
  width: 3px;
}
.bill-body::-webkit-scrollbar-track {
  background: transparent;
}
.bill-body::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}
.bill-body::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

.bill-footer {
  flex-shrink: 0;
  padding: 0.875rem 1rem;
  padding-bottom: calc(0.875rem + env(safe-area-inset-bottom, 0px));
  background: #fff;
  border-top: 1px solid #f1f5f9;
  display: flex;
  gap: 0.5rem;
}

/* Receipt-style dotted divider with punch holes */
.receipt-divider {
  position: relative;
  border-top: 2px dashed #e2e8f0;
  margin-left: -1rem;
  margin-right: -1rem;
}
.receipt-divider::before,
.receipt-divider::after {
  content: "";
  position: absolute;
  top: -10px;
  width: 20px;
  height: 20px;
  background: #f8fafc;
  border-radius: 50%;
}
.receipt-divider::before {
  left: -10px;
}
.receipt-divider::after {
  right: -10px;
}

/* ═══════════════════════════════════════════ */
/* Modal Transitions                          */
/* ═══════════════════════════════════════════ */

.modal-enter-active,
.modal-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .bill-dialog {
  animation: dialogSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.modal-leave-active .bill-dialog {
  animation: dialogSlideDown 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes dialogSlideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes dialogSlideDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(60%);
  }
}

/* Fade for status messages */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ═══════════════════════════════════════════ */
/* Tablet+ (sm: 640px)                        */
/* ═══════════════════════════════════════════ */

@media (min-width: 640px) {
  .bill-overlay {
    align-items: center;
    padding: 1.5rem;
  }
  .bill-dialog {
    max-width: 480px;
    max-height: 90vh;
    border-radius: 24px;
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.03),
      0 24px 48px -8px rgba(0, 0, 0, 0.18),
      0 48px 80px -16px rgba(0, 0, 0, 0.12);
  }
  .bill-header {
    padding: 2.5rem 2rem 2rem;
  }
  .bill-footer {
    padding: 1.25rem 1.5rem;
    padding-bottom: 1.25rem;
    gap: 0.75rem;
  }
  .receipt-divider {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }

  /* Switch from slide-up to scale animation on tablet+ */
  .modal-enter-active .bill-dialog {
    animation: dialogIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .modal-leave-active .bill-dialog {
    animation: dialogOut 0.25s cubic-bezier(0.4, 0, 1, 1) forwards;
  }
}

@keyframes dialogIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes dialogOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}

/* ═══════════════════════════════════════════ */
/* Desktop (md: 768px+)                       */
/* ═══════════════════════════════════════════ */

@media (min-width: 768px) {
  .bill-dialog {
    max-width: 520px;
  }
  .bill-header {
    padding: 2.5rem 2.5rem 2rem;
  }
  .bill-footer {
    padding: 1.25rem 1.75rem;
  }
  .receipt-divider {
    margin-left: -1.75rem;
    margin-right: -1.75rem;
  }
}
</style>
