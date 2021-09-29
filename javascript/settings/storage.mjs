export let localStorageWorks = true

export function update(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function retrieve(key, defaultValue) {
  try {
    const data = localStorage.getItem('style')
    if (data === null) {
      update(key, defaultValue)
      return defaultValue
    }
    return JSON.parse(data)
  } catch (e) {
    localStorageWorks = false
    return defaultValue
  }
}
