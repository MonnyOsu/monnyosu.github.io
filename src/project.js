export default function projectFactory(name, id) {
  return {
    id: id || Date.now().toString(),
    name,
    tasks: [],
  };
}
