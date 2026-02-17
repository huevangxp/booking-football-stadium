<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      @click="cancel"
    >
      <!-- Modal Content -->
      <div
        class="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        @click.stop
      >
        <div class="p-8 text-center space-y-6">
          <div
            class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <span class="text-4xl animate-bounce">👋</span>
          </div>
          <div>
            <h3 class="text-2xl font-black text-slate-900 leading-tight mb-2">
              Leaving so soon?
            </h3>
            <p class="text-sm font-medium text-slate-500 leading-relaxed">
              Are you sure you want to log out of your session?
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <button
              @click="cancel"
              class="h-12 rounded-xl border border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirm"
              class="h-12 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/30 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close", "confirm"]);

const cancel = () => {
  emit("close");
};

const confirm = () => {
  emit("confirm");
};
</script>
