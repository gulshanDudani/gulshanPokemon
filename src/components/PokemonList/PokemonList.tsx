import React, { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);
  const navigate = useNavigate(); 

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pkmn) =>
      pkmn.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, pokemons]);

  if (loading) return <div className={classes.status}>Loading...</div>;
  if (error) return <div className={classes.status}>Error loading Pokémon!</div>;

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={classes.searchBox}
        aria-label="Search Pokemon"
      />

      <div className={classes.list}>
        {filteredPokemons.map((pkmn) => (
          <div key={pkmn.id} className={classes.card} tabIndex={0}
          onClick={() => navigate(`/pokemon/${pkmn.id}`)}>
            <img src={pkmn.image} alt={pkmn.name} className={classes.image} />
            <div className={classes.info}>
              <h3>{pkmn.name}</h3>
              <p>#{pkmn.number}</p>
              <p>{pkmn.types.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const useStyles = createUseStyles(
  {
    container: {
      padding: '32px',
      boxSizing: 'border-box',
      textAlign: 'center',
    },
    searchBox: {
      padding: '10px 16px',
      fontSize: '1rem',
      borderRadius: 8,
      border: '1px solid #ccc',
      marginBottom: '24px',
      width: '100%',
      maxWidth: 400,
      outline: 'none',
      color: '#111', 
      backgroundColor: '#fff',
    
      '&::placeholder': {
        color: '#888',
      },
    
      '&:focus': {
        borderColor: '#007acc',
        boxShadow: '0 0 0 3px rgba(0, 122, 204, 0.2)',
      },
    },
    
    status: {
      textAlign: 'center',
      fontSize: '1.2rem',
      marginTop: '50px',
      color: '#333',
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    card: {
      width: '180px',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
      transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f0f8ff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      },
      '&:focus-visible': {
        outline: '3px solid #005fcc',
        outlineOffset: '2px',
      },
    },
    image: {
      width: 100,
      height: 100,
      objectFit: 'contain',
      marginBottom: 12,
    },
    info: {
      color: '#222',
      '& h3': {
        margin: '8px 0 4px',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#111',
      },
      '& p': {
        margin: '4px 0',
        fontSize: '0.95rem',
        color: '#333',
      },
    },
  },
  { name: 'PokemonList' }
);

