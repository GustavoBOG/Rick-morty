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


export async function searchCharactersByName(name) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error buscando personajes:", error);
    return { results: [] };
  }
}