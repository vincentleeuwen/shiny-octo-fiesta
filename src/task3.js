

const updateString = string => `${string} AE`;
const updateNumber = number => number + 1

const updateValue = value => {
  if (typeof(value) === 'string') return updateString(value);
  if (typeof(value) === 'number') return updateNumber(value);
  return value; // arbitrary
}

const transformObject = input => {
  const entries = Object.entries(input);
  return Object.fromEntries(entries.map(([key, value]) => {
    if (Array.isArray(value)) {
      const newArray = value.map(i => updateValue(i));
      return [key, newArray]
    } else {
      return [key, updateValue(value)]
    }
  }));
}

console.log(transformObject({
    a: 123,
    b: 'abc',
    c: [1, 2, 3]
}));