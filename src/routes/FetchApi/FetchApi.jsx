export async function fetchCharacters(page) {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await res.json();
  return data;
}

export async function fetchCharacterById(id) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();
  return data;
}
