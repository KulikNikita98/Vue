export default function numberFomat(value) {
  return new Intl.NumberFormat().format(value);
}
