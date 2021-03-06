/*jshint esversion: 6 */
"use strict";

/**
 * Main class for the engine
 */
class stumge {

  /**
   * @constructor
   */
  constructor() {

    // Constants
    /** Identifies the key "UP" */
    this.stumge_key_up = 0;
    /** Identifies the key "DOWN" */
    this.stumge_key_down = 1;
    /** Identifies the key "LEFT" */
    this.stumge_key_left = 2;
    /** Identifies the key "RIGHT" */
    this.stumge_key_right = 3;
    /** Identifies the key "BUTTON 1" */
    this.stumge_key_button_1 = 4;
    /** Identifies the key "BUTTON 2" */
    this.stumge_key_button_2 = 5;
    /** Identifies the key "SELECT" */
    this.stumge_key_select = 6;
    /** Identifies the key "START" */
    this.stumge_key_start = 7;

    /** Represents the width of the screen (160 like the GameBoy) */
    this.stumge_width = 160;
    /** Represents the height of the screen (144 like the GameBoy) */
    this.stumge_height = 144;

    document.addEventListener('keydown', this.keyDown.bind(this), false);
    document.addEventListener('keyup', this.keyUp.bind(this), false);
    this.keyboard_state = [
      0, 0, 0, 0,
      0, 0, 0, 0,
    ];
    this.screen = new Array(this.stumge_width * this.stumge_height).fill(3);
    this.engine_canvas = null;
    this.engine_shadow_canvas = null;
    this.engine_context = null;
    this.engine_shadow_context = null;
    this.update_function = null;
    this.scale = null;
    this.frame_count = 0;
    this.palette = [
      { r: 0x0F, g: 0x38, b: 0x0F, a: 0xFF },
      { r: 0x30, g: 0x62, b: 0x30, a: 0xFF },
      { r: 0x8B, g: 0xAC, b: 0x0F, a: 0xFF },
      { r: 0x9B, g: 0xBC, b: 0x0F, a: 0xFF },
    ];
    this.font = {
      'A': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
      ]),
      'B': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, -1],
      ]),
      'C': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      'D': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, -1],
      ]),
      'E': new stumge_sprite([
        [0, 0, 0, 0, 0, 0],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0],
      ]),
      'F': new stumge_sprite([
        [0, 0, 0, 0, 0, 0],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
      ]),
      'G': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, 0, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, 0],
      ]),
      'H': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
      ]),
      'I': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, 0, 0, -1],
      ]),
      'J': new stumge_sprite([
        [-1, -1, 0, 0, 0, 0],
        [-1, -1, -1, 0, 0, -1],
        [-1, -1, -1, 0, 0, -1],
        [0, 0, -1, 0, 0, -1],
        [0, 0, -1, 0, 0, -1],
        [-1, 0, 0, 0, -1, -1],
      ]),
      'K': new stumge_sprite([
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, 0, 0, -1],
        [0, 0, 0, 0, -1, -1],
        [0, 0, 0, 0, -1, -1],
        [0, 0, -1, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
      ]),
      'L': new stumge_sprite([
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, 0],
      ]),
      'M': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, 0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, -1, 0, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
      ]),
      'N': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, 0, -1, 0, 0],
        [0, -1, 0, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, -1, 0, 0],
      ]),
      'O': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      'P': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, -1, -1, -1, -1],
      ]),
      'Q': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, 0],
        [0, 0, -1, -1, -1, 0],
        [0, 0, -1, 0, -1, 0],
        [0, 0, -1, -1, 0, -1],
        [-1, 0, 0, 0, -1, 0],
      ]),
      'R': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, 0, -1, -1],
        [0, 0, -1, -1, 0, 0],
      ]),
      'S': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [-1, 0, 0, 0, 0, -1],
        [-1, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      'T': new stumge_sprite([
        [0, 0, 0, 0, 0, 0],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      'U': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      'V': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [-1, 0, -1, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      'W': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [0, -1, -1, -1, 0, 0],
        [0, -1, 0, -1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, -1, 0, 0, 0],
        [0, -1, -1, -1, 0, 0],
      ]),
      'X': new stumge_sprite([
        [0, -1, -1, -1, 0, 0],
        [-1, 0, -1, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, 0, -1, -1],
        [0, 0, -1, -1, 0, -1],
        [0, -1, -1, -1, -1, 0],
      ]),
      'Y': new stumge_sprite([
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      'Z': new stumge_sprite([
        [0, 0, 0, 0, 0, 0],
        [-1, -1, -1, 0, 0, 0],
        [-1, -1, 0, 0, 0, -1],
        [-1, 0, 0, 0, -1, -1],
        [0, 0, 0, -1, -1, -1],
        [0, 0, 0, 0, 0, 0],
      ]),
      '0': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, 0, 0, 0],
        [0, 0, 0, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '1': new stumge_sprite([
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '2': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [-1, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
        [0, 0, 0, -1, -1, -1],
        [0, 0, 0, 0, 0, 0],
      ]),
      '3': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [-1, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
        [-1, -1, -1, 0, 0, 0],
        [-1, -1, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, -1],
      ]),
      '4': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, 0, 0, -1],
        [0, -1, -1, 0, 0, -1],
        [0, -1, -1, 0, 0, -1],
        [0, 0, 0, 0, 0, 0],
        [-1, -1, -1, 0, 0, -1],
      ]),
      '5': new stumge_sprite([
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, -1],
        [-1, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '6': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, -1, -1],
        [0, 0, 0, 0, 0, -1],
        [0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '7': new stumge_sprite([
        [0, 0, 0, 0, 0, 0],
        [-1, -1, -1, -1, 0, 0],
        [-1, -1, -1, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, 0, -1, -1],
        [-1, 0, 0, 0, -1, -1],
      ]),
      '8': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '9': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [0, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, 0],
        [-1, -1, -1, 0, 0, 0],
        [-1, 0, 0, 0, 0, -1],
      ]),
      '.': new stumge_sprite([
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      ',': new stumge_sprite([
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, -1, 0, -1, -1],
        [-1, -1, 0, -1, -1, -1],
      ]),
      ';': new stumge_sprite([
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, 0, 0, -1, -1, -1],
      ]),
      ':': new stumge_sprite([
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      '\'': new stumge_sprite([
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, -1, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
      ]),
      '!': new stumge_sprite([
        [-1, -1, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, -1],
        [-1, -1, 0, 0, 0, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 0, -1],
      ]),
      '"': new stumge_sprite([
        [0, 0, -1, 0, 0, -1],
        [0, 0, -1, 0, 0, -1],
        [-1, 0, -1, -1, 0, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
      ]),
      '?': new stumge_sprite([
        [-1, 0, 0, 0, 0, -1],
        [0, -1, -1, 0, 0, 0],
        [-1, -1, 0, 0, 0, -1],
        [-1, -1, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, -1, -1],
      ]),
      ' ': new stumge_sprite([
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
      ])
    };
    this.unknown_char = new stumge_sprite([
      [0, 0, 0, 0, 0, 0],
      [0, -1, -1, -1, -1, 0],
      [0, -1, -1, -1, -1, 0],
      [0, -1, -1, -1, -1, 0],
      [0, -1, -1, -1, -1, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
  }

  /**
   * Prints a text on the screen
   * @param text {string} text to print
   * @param x {int} x-position of the top left corner of the bounding box
   * @param y {int} y-position of the top left corner of the bounding box
   */
  putText(text, x, y) {
    text = text.toUpperCase();
    let current_x = x;
    for(let i = 0; i < text.length; i++) {
      let current_char = text.charAt(i);
      if(current_char in this.font) {
        this.font[current_char].x = current_x;
        this.font[current_char].y = y;
        this.setSprite(this.font[current_char]);
        current_x = current_x + this.font[current_char].getWidth() + 1;
      }
      else {
        this.unknown_char.x = current_x;
        this.unknown_char.y = y;
        this.setSprite(this.unknown_char);
        current_x = current_x + this.unknown_char.getWidth() + 1;
      }
    }
  }

  /**
   * Paints all the screen with the same color
   * @param color_idx {int} index of the color to flood the screen with
   */
  floodScreen(color_idx) {
    this.screen.fill(color_idx);
  }

  /**
   * Paints a sprite on the screen
   * @param sprite {stumge_sprite} Sprite to paint
   */
  setSprite(sprite) {
    if(sprite instanceof stumge_sprite) {
      for(let dy = 0; dy < sprite.data.length; dy++) {
        for(let dx = 0; dx < sprite.data[dy].length; dx++) {
          let pixel = sprite.data[dy][dx];
          if(pixel !== -1 && (sprite.x + dx) < this.stumge_width && (sprite.y + dy) < this.stumge_height) {
            this.setPixel(sprite.x + dx, sprite.y + dy, pixel);
          }
        }
      }
    }
  }

  /**
   * Sets a pixel to a specific color
   * @param x {int} x-position of the pixel to paint
   * @param y {int} y-position of the pixel to paint
   * @param color_idx {int} color index of the color to paint
   */
  setPixel(x, y, color_idx) {
    let screen_idx = (this.stumge_width * y) + x;
    this.screen[screen_idx] = color_idx;
  }

  /**
   * Repaints the screen
   */
  repaint() {
    let image_data = this.engine_shadow_context.createImageData(this.stumge_width, this.stumge_height);
    for(let dx = 0; dx < this.stumge_width; dx++) {
      for(let dy = 0; dy < this.stumge_height; dy++) {
        let screen_idx = (this.stumge_width * dy) + dx;
        let data_idx = 4 * screen_idx;
        let color = this.palette[this.screen[screen_idx]];
        image_data.data[data_idx] = color.r;
        image_data.data[data_idx+1] = color.g;
        image_data.data[data_idx+2] = color.b;
        image_data.data[data_idx+3] = color.a;
      }
    }
    this.engine_shadow_context.putImageData(image_data, 0, 0);
    this.engine_context.drawImage(this.engine_shadow_canvas, 0, 0, this.stumge_width * this.scale, this.stumge_height * this.scale);
  }

  /**
   * Manages the execution of a frame, including execution of the update function.
   */
  frame() {
    this.frame_count++;
    if(this.update_function !== null) {
      this.update_function();
    }
    this.repaint();
    requestAnimationFrame(this.frame.bind(this));
  }

  /**
   * Initializes the engine
   * @param updfunc {function} function with no parameters that will be executed
   * once per frame
   * @param options {object} configuration options for the engine
   */
  init(updfunc, options={}) {
    if('scale' in options) {
      this.scale = options.scale;
    }
    else {
      this.scale = 1;
    }
    this.engine_canvas = document.querySelector("canvas#stumge");
    this.engine_context = this.engine_canvas.getContext("2d", { alpha: false });
    this.engine_context.canvas.width = this.stumge_width * this.scale;
    this.engine_context.canvas.height = this.stumge_height * this.scale;
    this.engine_context.imageSmoothingEnabled = false;
    this.engine_shadow_canvas = document.createElement("canvas");
    this.engine_shadow_canvas.width = this.stumge_width;
    this.engine_shadow_canvas.height = this.stumge_height;
    this.engine_shadow_context = this.engine_shadow_canvas.getContext("2d");
    this.update_function = updfunc;
    requestAnimationFrame(this.frame.bind(this));
  }

  changeKeyState(key_code) {
    this.keyboard_state[key_code]++;
  }

  keyDown(event) {
    switch(event.key) {
      case 'Unindentified':
        break;
      case 'ArrowUp':
      case 'Up':
        this.changeKeyState(this.stumge_key_up);
        break;
      case 'ArrowDown':
      case 'Down':
        this.changeKeyState(this.stumge_key_down);
        break;
      case 'ArrowLeft':
      case 'Left':
        this.changeKeyState(this.stumge_key_left);
        break;
      case 'ArrowRight':
      case 'Right':
        this.changeKeyState(this.stumge_key_right);
        break;
      case 'a':
      case 'A':
        this.changeKeyState(this.stumge_key_button_1);
        break;
      case 's':
      case 'S':
        this.changeKeyState(this.stumge_key_button_2);
        break;
      case 'Control':
        this.changeKeyState(this.stumge_key_start);
        break;
      case 'Alt':
        this.changeKeyState(this.stumge_key_select);
        break;
    }
    event.preventDefault();
  }

  keyUp(event) {
    switch(event.key) {
      case 'Unindentified':
        break;
      case 'ArrowUp':
      case 'Up':
        this.keyboard_state[this.stumge_key_up] = 0;
        break;
      case 'ArrowDown':
      case 'Down':
        this.keyboard_state[this.stumge_key_down] = 0;
        break;
      case 'ArrowLeft':
      case 'Left':
        this.keyboard_state[this.stumge_key_left] = 0;
        break;
      case 'ArrowRight':
      case 'Right':
        this.keyboard_state[this.stumge_key_right] = 0;
        break;
      case 'a':
      case 'A':
        this.keyboard_state[this.stumge_key_button_1] = 0;
        break;
      case 's':
      case 'S':
        this.keyboard_state[this.stumge_key_button_2] = 0;
        break;
      case 'Control':
        this.keyboard_state[this.stumge_key_start] = 0;
        break;
      case 'Alt':
        this.keyboard_state[this.stumge_key_select] = 0;
        break;
    }
    event.preventDefault();
  }

  keyPressed(key_code) {
    return this.keyboard_state[key_code] > 0;
  }

  keyPress(key_code) {
    if(this.keyboard_state[key_code] === 1) {
      this.keyboard_state[key_code] = 2;
      return true;
    }
    return false;
  }

}