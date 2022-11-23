export const useLocalStorage = (name: string): Function[] => {
    const getLocalStorage = () => {
        const local = localStorage.getItem(name);
        if (local !== null && local !== "undefined") {
            return JSON.parse(local);
        }
        return null;
    };

    const setLocalStorage = (item: Object) => {
        localStorage.setItem(name, JSON.stringify(item));
    };

    const removeLocalStorage = () => {
        return localStorage.removeItem(name);
    };

    return [getLocalStorage, setLocalStorage, removeLocalStorage];
}
