export let localStorageWorks = true

export function update(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function retrieve(key) {
  try {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
  } catch (e) {
    localStorageWorks = false
    return defaultValue
  }
}
