
export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try{
      window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }

  const getItem = () => {
    try{
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  }
  const removeItem = () => {
    try{
      window.localStorage.removeItem(key);
    }
    catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }
  return { setItem, getItem, removeItem };
}