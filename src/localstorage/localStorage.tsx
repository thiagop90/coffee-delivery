export const setLocalStorageItem = (key: string, value: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
}
