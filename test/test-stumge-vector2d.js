const assert = require('assert')
const almostEqual = require('almost-equal')
const rewire = require('rewire')

const stumge = rewire('../src/stumge_vector2d.js')
const stumge_vector2d = stumge.__get__('stumge_vector2d')

describe('stumge_vector2d', function() {

  it('should store x and y values properly', function() {
    const v = new stumge_vector2d(1.5, 2.5)
    assert.strictEqual(almostEqual(v.x, 1.5), true)
    assert.strictEqual(almostEqual(v.y, 2.5), true)
  })

  it('should properly calculate the magnitude', function() {
    const v = new stumge_vector2d(3, 4)
    const m = v.magnitude()
    assert.strictEqual(almostEqual(m, 5), true)
  })

  it('should normalize appropriately', function() {
    const v1 = new stumge_vector2d(3, 4)
    const v2 = v1.normalize()
    assert.strictEqual(almostEqual(v2.x, 0.6), true)
    assert.strictEqual(almostEqual(v2.y, 0.8), true)
  })

  it('should normalize appropriately with a zero coordinate', function() {
    const v1 = new stumge_vector2d(3, 0)
    const v2 = v1.normalize()
    assert.strictEqual(almostEqual(v2.x, 1), true)
    assert.strictEqual(almostEqual(v2.y, 0), true)
  })

  it('should properly add two vectors', function() {
    const v1 = new stumge_vector2d(1.2, 2.3)
    const v2 = new stumge_vector2d(3, 4)
    const v3 = v1.add(v2)
    assert.strictEqual(almostEqual(v3.x, 4.2), true)
    assert.strictEqual(almostEqual(v3.y, 6.3), true)
  })

  it('should multiply properly by an scalar', function() {
    const v1 = new stumge_vector2d(1.2, 2.3)
    const v2 = v1.scalar_mul(2.5)
    assert.strictEqual(almostEqual(v2.x, 3), true)
    assert.strictEqual(almostEqual(v2.y, 5.75), true)
  })

  it('should properly calculate the dot product', function() {
    const v1 = new stumge_vector2d(1.2, 2.3)
    const v2 = new stumge_vector2d(3, 4)
    const p = v1.dot_mul(v2)
    assert.strictEqual(almostEqual(p, 12.8), true)
  })

  it('should properly calculate the cross product (determinant)', function() {
    const v1 = new stumge_vector2d(1.2, 2.3)
    const v2 = new stumge_vector2d(3, 4)
    const p = v1.cross_mul(v2)
    assert.strictEqual(almostEqual(p, -2.1), true)
  })

});