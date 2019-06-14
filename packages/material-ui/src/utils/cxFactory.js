import capitalize from './capitalize';

export default function cxFactory(classes, name) {
  return (key1, key2) => {
    if (classes && classes[key1]) {
      return classes[key1];
    }
    return `${name}-${key1}${key2 ? capitalize(key2) : ''}`;
  };
}
