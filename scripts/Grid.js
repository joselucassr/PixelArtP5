class Grid {
  constructor(_width, _height) {
    this.width = _width;
    this.height = _height;
    this.scaleX = 60;
    this.scaleY = 60;
    this.offsetX = -windowWidth / 2 / this.scaleX + this.scaleX / this.height;
    this.offsetY = -windowHeight / 2 / this.scaleY + this.scaleY / this.width;
    this.startPanX = 0;
    this.startPanY = 0;
  }

  draw() {
    // console.log('this.offsetX', this.offsetX);
    // console.log('this.offsetY', this.offsetY);
    if (mouseIsPressed && mouseButton === CENTER) {
      this.offsetX -= (mouseX - this.startPanX) / this.scaleX;
      this.offsetY -= (mouseY - this.startPanY) / this.scaleY;

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

  setScale(delta) {
    const [mouseWorldX_beforeZoom, mouseWorldY_beforeZoom] = this.ScreenToWorld(
      mouseX,
      mouseY,
    );

    if (delta < 0) {
      this.scaleX *= 1.1;
      this.scaleY *= 1.1;
    }

    if (delta > 0) {
      this.scaleX *= 0.9;
      this.scaleY *= 0.9;
    }

    const [mouseWorldX_afterZoom, mouseWorldY_afterZoom] = this.ScreenToWorld(
      mouseX,
      mouseY,
    );

    this.offsetX += mouseWorldX_beforeZoom - mouseWorldX_afterZoom;
    this.offsetY += mouseWorldY_beforeZoom - mouseWorldY_afterZoom;
  }

  setPanStart(x, y) {
    this.startPanX = x;
    this.startPanY = y;
  }

  WorldToScreen(worldX, worldY) {
    const screenX = parseInt((worldX - this.offsetX) * this.scaleX);
    const screenY = parseInt((worldY - this.offsetY) * this.scaleY);
    return [screenX, screenY];
  }

  ScreenToWorld(screenX, screenY) {
    const worldX = parseFloat(screenX) / this.scaleX + this.offsetX;
    const worldY = parseFloat(screenY) / this.scaleY + this.offsetY;
    return [worldX, worldY];
  }
}
