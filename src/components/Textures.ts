type marioTexture = "standing" | "running" | "jumping" | "dying";
type blockTexture = "Block" | "Brick" | "Stone" | "Floor" | "Pipe" | "Empty";

class Textures {
  static getMario(type: marioTexture, size: number, frame?: number): [number, number, number, number] {
    if (size == 1) {
      switch (type) {
        case "standing":
          return [1, 9, 16, 16];
        case "running":
          if (frame)
            return [43 + (frame - 1) * 17, 9, 16, 16];
        case "jumping":
          return [119, 9, 16, 16];
        case "dying":
          return [22, 9, 16, 16];
      }
    } else if (size == 2) {
      switch (type) {
        case "standing":
          return [1, 26, 16, 32];
        case "running":
          if (frame)
            return [43 + (frame - 1) * 17, 26, 16, 32];
        case "jumping":
          return [119, 26, 16, 32];
        case "dying":
          return [22, 26, 16, 32];
      }
    } else return [22, 9, 16, 16];
  }

  static getBlocks(type: blockTexture, pipeTop?: boolean, pipeLeft?: boolean): [number, number] {
    switch (type) {
      case "Empty":
        return [349, 78];
      case "Block":
        return [298, 78];
      case "Brick":
        return [17, 16];
      case "Floor":
        return [0, 16];
      case "Stone":
        return [0, 33];
      case "Pipe":
        if (pipeLeft)
          if (pipeTop) return [119, 196];
          else return [119, 213];
        else
          if (pipeTop) return [136, 196];
          else return [136, 213];

      default:
        return [366, 16];
    }
  }
}

export default Textures;