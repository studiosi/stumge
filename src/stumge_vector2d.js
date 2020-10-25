/*jshint esversion: 6 */
"use strict";

/**
 * Represents a 2D vector
 */
class stumge_vector2d {

  /**
   * Creates an integer vector
   * @param x {number} x-coordinate
   * @param y {number} y-coordinate
   * @constructor
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Returs the magnitude of the vector
   * @return {number}
   */
  magnitude() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  /**
   * Returns a new vector which is the current one, normalized.
   * @returns {stumge_vector2d} the new normalized vector
   */
  normalize() {
    const m = this.magnitude()
    return new stumge_vector2d(this.x / m, this.y / m)
  }

  /**
   * Returns the sum of the current vector with another one
   * @param other {stumge_vector2d} the vector to add
   * @returns {stumge_vector2d} the sum vector
   */
  add(other) {
    return new stumge_vector2d(this.x + other.x, this.y + other.y)
  }

  /**
   * Returns the current vector multiplied by an scalar
   * @param n {number} the scalar multiplier
   */
  scalar_mul(n) {
    return new stumge_vector2d(this.x * n, this.y * n)
  }

  /**
   * Returns the dot product of the current vector and another one
   * @param other {stumge_vector2d}
   */
  dot_mul(other) {
    return (this.x * other.x) + (this.y * other.y)
  }

  /**
   * Returns the cross multiplication of the current vector and another
   * one.
   * @param other {stumge_vector2d}
   */
  cross_mul(other) {
    return (this.x * other.y) - (this.y * other.x)
  }

}