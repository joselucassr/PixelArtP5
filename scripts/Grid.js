class Grid {
  constructor(_width, _height) {
    this.width = _width;
    this.height = _height;
    this.offsetX = -windowWidth / 2;
    this.offsetY = -windowHeight / 2;
    this.startPanX = 0;
    this.startPanY = 0;
  }

  draw() {
    if (mouseIsPressed) {
      this.offsetX -= mouseX - this.startPanX;
      this.offsetY -= mouseY - this.startPanY;

      this.startPanX = mouseX;
      this.startPanY = mouseY;
    }

    // Horizontal Lines
    for (let y = 0; y <= this.width; y += 1) {
      const sx = 0;
      const sy = y;

      const ex = this.width;
      const ey = y;

      const [pixel_sx, pixel_sy] = this.WorldToScreen(sx, sy);
      const [pixel_ex, pixel_ey] = this.WorldToScreen(ex, ey);

      stroke(255);
      line(pixel_sx, pixel_sy, pixel_ex, pixel_ey);
    }

    // Vertical Lines
    for (let x = 0; x <= this.height; x += 1) {
      const sx = x;
      const sy = 0;

      const ex = x;
      const ey = this.height;

      const [pixel_sx, pixel_sy] = this.WorldToScreen(sx, sy);
      const [pixel_ex, pixel_ey] = this.WorldToScreen(ex, ey);

      stroke(255);
      line(pixel_sx, pixel_sy, pixel_ex, pixel_ey);
    }
  }

  setPanStart(x, y) {
    this.startPanX = x;
    this.startPanY = y;
  }

  WorldToScreen(worldX, worldY) {
    const screenX = parseInt(worldX - this.offsetX);
    const screenY = parseInt(worldY - this.offsetY);
    return [screenX, screenY];
  }

  ScreenToWorld(screenX, screenY) {
    const worldX = parseFloat(screenX + this.offsetX);
    const worldY = parseFloat(screenY + this.offsetY);
    return [worldX, worldY];
  }
}
