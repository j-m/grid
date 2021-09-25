let id = 0

export default class Node {
  constructor(x, y) {
    this.id = id++
    this.x = x
    this.y = y
    this.shape = "square"
    this.fill = "black"
    this.outline = "black"
  }
}
