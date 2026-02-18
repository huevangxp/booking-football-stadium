// Define types for better type safety
export interface Message {
    id: number;
    text: string;
    sender: "customer" | "admin";
    timestamp: string;
    customerId: string;
}

export interface User {
    id: string;
    username: string;
    [key: string]: any;
}

export const useChat = () => {
    const messages = useState<Message[]>("chat_messages", () => []);
    const isOpen = useState<boolean>("chat_open", () => false);
    const currentUser = useCookie<User | null>("user"); // simple user id tracking for demo

    // Sync with localStorage
    onMounted(() => {
        if (import.meta.client) {
            const stored = localStorage.getItem("chat_local_storage");
            if (stored) {
                messages.value = JSON.parse(stored);
            }

            window.addEventListener("storage", (event) => {
                if (event.key === "chat_local_storage" && event.newValue) {
                    messages.value = JSON.parse(event.newValue);
                }
            });
        }
    });

    // Watch for changes and save to local storage
    watch(
        messages,
        (newMessages) => {
            if (import.meta.client) {
                localStorage.setItem("chat_local_storage", JSON.stringify(newMessages));
            }
        },
        { deep: true }
    );

    const sendMessage = (
        text: string,
        sender: "customer" | "admin",
        recipientId: string | null = null
    ) => {
        // Basic message structure
        const newMessage: Message = {
            id: Date.now(),
            text,
            sender, // 'customer' or 'admin'
            timestamp: new Date().toISOString(),
            customerId:
                recipientId ||
                (sender === "customer" ? currentUser.value?.id || "guest" : "admin"),
        };

        // Update local state, which triggers watch -> localStorage -> other tabs
        messages.value.push(newMessage);
    };

    const toggleChat = () => {
        isOpen.value = !isOpen.value;
    };

    return {
        messages,
        isOpen,
        sendMessage,
        toggleChat,
    };
};
