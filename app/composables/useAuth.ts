export const useAuth = () => {
    const user = useState("user", () => null);

    const login = (username: string) => {
        user.value = { username };
    };

    const logout = () => {
        user.value = null;
    };

    const isAuthenticated = computed(() => !!user.value);

    return {
        user,
        login,
        logout,
        isAuthenticated,
    };
};
