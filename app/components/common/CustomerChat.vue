<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Window -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px]"
      >
        <!-- Header -->
        <div class="bg-slate-900 p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div
                class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl"
              >
                🤖
              </div>
              <div
                class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"
              ></div>
            </div>
            <div>
              <h3 class="font-bold text-white text-sm">Customer Support</h3>
              <p class="text-[10px] text-slate-400 font-medium">
                We typically reply in minutes
              </p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
          <div v-if="messages.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">👋</div>
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Start a conversation</p>
          </div>

          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex flex-col gap-1 max-w-[85%]" 
            :class="msg.sender === 'admin' ? 'self-start items-start' : 'self-end items-end'"
          >
            <div
              class="px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm"
              :class="
                msg.sender === 'admin'
                  ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  : 'bg-primary text-white rounded-tr-none'
              "
            >
              {{ msg.text }}
            </div>
            <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">
              {{ new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </span>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-slate-100">
          <form @submit.prevent="handleSend" class="flex items-center gap-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim()"
              class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Floating Toggle Button -->
    <button
      @click="toggleChat"
      class="w-14 h-14 rounded-full bg-slate-900 text-white shadow-2xl shadow-slate-900/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-2xl relative group overflow-hidden"
    >
      <div 
        class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <span class="relative z-10 block transition-transform duration-300" :class="isOpen ? 'rotate-90 scale-0' : 'scale-100'">💬</span>
      <span class="absolute z-10 text-xl font-bold transition-transform duration-300" :class="isOpen ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'">✕</span>
      
      <!-- Notification Dot -->
      <span v-if="unreadCount > 0 && !isOpen" class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
    </button>
  </div>
</template>

<script setup>
import { useChat } from '~/composables/useChat';

const { messages, isOpen, sendMessage, toggleChat } = useChat();
const newMessage = ref("");
const messagesContainer = ref(null);

// Auto scroll to bottom when new messages arrive
watch(
  messages, 
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
  },
  { deep: true, immediate: true }
);

const handleSend = () => {
  if (!newMessage.value.trim()) return;
  sendMessage(newMessage.value, "customer");
  newMessage.value = "";
};

// Simple unread count for demo purposes (real implementation would track seen status)
const unreadCount = computed(() => {
  // Logic could check messages from admin that are new since last open
  return 0; 
});
</script>
