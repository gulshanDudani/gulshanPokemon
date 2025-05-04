import { gql, useQuery } from '@apollo/client';

export const GET_POKEMON_BY_ID = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonById = (id: string) => {
  const { data, loading, error } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id },
    skip: !id,
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
};
