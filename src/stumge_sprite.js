/*jshint esversion: 6 */
"use strict";

/**
 * Represents a sprite
 */
class stumge_sprite {

  /**
   * @param {int[][]} data bidimensional array of color indexes
   * @param {int} x x-position
   * @param {int} y y-position
   * @constructor
   */
  constructor(data, x = 0, y = 0) {
    this.original_data = Array.from(data);
    /**
     * Bidimensional array of color indexes that represent the sprite
     * @type {int[][]}
     */
    this.data = Array.from(data);
    /**
     * x-position
     * @type {int}
     */
    this.x = x;
    /**
     * y-position
     * @type {int}
     */
    this.y = y;
  }

  /**
   * Rotates the sprite 45 degrees and returns updated data
   * @returns {int[][]} updated data
   * @private
   */
  _rotate_step() {
    const w = this.data.length;
    const h = this.data[0].length;
    let result = new Array(h);
    for (let y=0; y<h; y++) {
      result[y] = new Array(w);
      for (let x=0; x<w; x++) {
        result[y][x] = this.data[w-1-x][y];
      }
    }
    return result;
  }

  /**
   * Rotates the sprite
   * @param {int} position 0 for no rotation, 1 for 90 degrees,
   * 2 for 180 degrees and 3 for 270 degrees
   */
  rotate(position = 0) {
    this.data = Array.from(this.original_data);
    for(let i = 1; i <= position; i++) {
      this.data = this._rotate_step();
    }
  }

  /**
   * Flips the sprite horizontally
   */
  horizontalFlip() {
    const h = this.data.length;
    let result = new Array(h);
    for (let y=0; y<h; y++) {
      let w = this.data[y].length;
      result[y] = new Array(w);
      for (let x=0; x<w; x++) {
        let n = w-1-x;
        result[y][n] = this.data[y][x];
      }
    }
    this.data = Array.from(result);
  }

  /**
   * Flips the sprite vertically
   */
  verticalFlip() {
    const h = this.data.length;
    let result = new Array(h);
    for (let y=0; y<h; y++) {
      let w = this.data[y].length;
      let n = h-1-y;
      result[n] = new Array(w);
      for (let x=0; x<w; x++) {
        result[n][x] = this.data[y][x];
      }
    }
    this.data = Array.from(result);
  }

  /**
   * Creates a copy of the sprite.
   * @returns {stumge_sprite}
   */
  getCopy() {
    return new stumge_sprite(this.data, this.x, this.y);
  }

  /**
   * Gets the width of the sprite
   * @returns {number} width of the sprite
   */
  getWidth() {
    let width = 0;
    for(let i=0; i<this.data.length; i++) {
      if (this.data[i].length > width) {
        width = this.data[i].length;
      }
    }
    return width;
  }

  /**
   * Gets the height of the sprite
   * @returns {number} height of the sprite
   */
  getHeight() {
    return this.data.length;
  }

  /**
   * Checks if the sprite collides with another sprite
   * @param {stumge_sprite} other sprite with which collision is to be checked
   * @returns {boolean} true if there is collision, false
   * otherwise
   */
  collidesWith(other) {
    if(other instanceof stumge_sprite) {
      return (this.x < other.x + other.getWidth() &&
          this.x + this.getWidth() > other.x &&
          this.y < other.y + other.getHeight() &&
          this.getHeight() + this.y > other.y);
    }
    return false;
  }

}