<template>
  <div class="h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6 p-6">
    <!-- Conversation List -->
    <div
      class="w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
    >
      <div
        class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50"
      >
        <h2 class="font-bold text-slate-900">{{ $t("admin.conversations") }}</h2>
        <span
          class="px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary rounded-full"
          >{{ Object.keys(conversations).length }}</span
        >
      </div>

      <div class="flex-1 overflow-y-auto">
        <div
          v-if="Object.keys(conversations).length === 0"
          class="p-8 text-center text-slate-400"
        >
          <p class="text-sm">{{ $t("admin.no_messages") }}</p>
        </div>

        <button
          v-for="(msgs, customerId) in conversations"
          :key="customerId"
          @click="selectedCustomerId = customerId"
          class="w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 text-left"
          :class="{
            'bg-primary/5 border-l-4 border-l-primary':
              selectedCustomerId === customerId,
          }"
        >
          <div
            class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg shrink-0"
          >
            {{ customerId.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold text-sm text-slate-900 truncate pr-2"
                >{{ $t("admin.customer") }} {{ customerId }}</span
              >
              <span class="text-[10px] text-slate-400">{{
                formatTime(msgs[msgs.length - 1].timestamp)
              }}</span>
            </div>
            <p class="text-xs text-slate-500 truncate">
              {{ msgs[msgs.length - 1].text }}
            </p>
          </div>
        </button>
      </div>
    </div>

    <!-- Chat Area -->
    <div
      class="w-full md:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
    >
      <div v-if="selectedCustomerId" class="flex flex-col h-full">
        <!-- Chat Header -->
        <div
          class="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50"
        >
          <div
            class="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg"
          >
            {{ selectedCustomerId.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h3 class="font-bold text-slate-900">
              {{ $t("admin.customer") }} {{ selectedCustomerId }}
            </h3>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span class="text-xs text-slate-500">{{
                $t("admin.online")
              }}</span>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
        >
          <div
            v-for="msg in conversations[selectedCustomerId]"
            :key="msg.id"
            class="flex flex-col gap-1 max-w-[70%]"
            :class="
              msg.sender === 'admin'
                ? 'self-end items-end'
                : 'self-start items-start'
            "
          >
            <div
              class="px-5 py-3 rounded-2xl text-sm font-medium shadow-sm"
              :class="
                msg.sender === 'admin'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              "
            >
              {{ msg.text }}
            </div>
            <span class="text-[10px] text-slate-400 px-1">
              {{ formatTime(msg.timestamp) }}
            </span>
          </div>
        </div>

        <!-- Input -->
        <div class="p-4 bg-white border-t border-slate-100">
          <form @submit.prevent="handleReply" class="flex items-center gap-3">
            <input
              v-model="replyText"
              type="text"
              :placeholder="$t('admin.type_reply')"
              class="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <button
              type="submit"
              :disabled="!replyText.trim()"
              class="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ $t("admin.send_reply") }}
            </button>
          </form>
        </div>
      </div>

      <div
        v-else
        class="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400"
      >
        <div class="text-6xl mb-4">💬</div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">
          {{ $t("admin.select_conversation") }}
        </h3>
        <p class="text-sm max-w-xs">
          {{ $t("admin.select_conversation_desc") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChat } from '~/composables/useChat';

definePageMeta({
  layout: "admin",
});

const { t } = useI18n();
const { messages, sendMessage } = useChat();
const selectedCustomerId = ref(null);
const replyText = ref("");
const chatContainer = ref(null);

// Group messages by customerId
const conversations = computed(() => {
  const groups = {};
  messages.value.forEach((msg) => {
    // Group by customerId, assuming 'admin' messages now have correct customerId
    const id = msg.customerId;
    if (id && id !== "admin") {
      if (!groups[id]) groups[id] = [];
      groups[id].push(msg);
    }
  });
  return groups;
});

const handleReply = () => {
  if (!replyText.value.trim() || !selectedCustomerId.value) return;

  sendMessage(replyText.value, "admin", selectedCustomerId.value);
  replyText.value = "";

  nextTick(() => {
    scrollToBottom();
  });
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

watch(selectedCustomerId, () => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>
