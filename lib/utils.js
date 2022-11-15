function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function loop(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}

function compose(...func) {
  return (...args) => func.reduceRight((a, f) => f(a), args)
}

function combine(func1, func2) {
  return function (args) {
    const value = func1(args[0])
    return func2(value, args[1])
  }
}
/**
 * @function
 * @name externalPackage
 * @description
 * Any external package should be passed through this function.
 * @param obj
 * @param func
 * @return {function(...[*]): *}
 */
function externalPackage(obj, func) {
  return function(...args) {
    return func(obj, ...args)
  }
}
/**
 * @function
 * @name ternary
 * @param exit
 * @param func
 * @param arg
 * @return {exit | any}
 */
function ternary(exit, func, arg, ...args) {
    const value = func(arg, ...args)
    return value
      ? value
      : exit()
}
const ternaryCurried = curry(ternary)

module.exports = { externalPackage, combine, compose, ternaryCurried }