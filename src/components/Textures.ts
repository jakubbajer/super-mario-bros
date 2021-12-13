type marioTextureType = "standing" | "running" | "jumping" | "dying";

class Textures {
  static getMario(type: marioTextureType, frame?: number): [number, number, number, number] {
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
  }
}

export default Textures;