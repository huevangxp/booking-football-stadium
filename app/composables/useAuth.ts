export const useAuth = () => {
    const user = useCookie<{ username: string } | null>("user", { default: () => null });

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
