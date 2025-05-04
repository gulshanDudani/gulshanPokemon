import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useGetPokemonById } from '../../hooks/useGetPokemonById';

export const PokemonDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  // Ensure that id is defined (type guard)
  const pokemonId = id || ''; // if id is undefined, set to empty string

  const { pokemon, loading, error } = useGetPokemonById(pokemonId);

  const handleClose = () => navigate('/pokemon');

  if (!pokemonId) return null;

  return (
    <div className={classes.backdrop} onClick={handleClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={classes.closeBtn} onClick={handleClose}>×</button>

        {loading && <p>Loading...</p>}
        {error && <p>Error loading Pokémon data.</p>}

        {pokemon && (
          <>
            <h2 className={classes.heading}>{pokemon.name} #{pokemon.number}</h2>
            <img src={pokemon.image} alt={pokemon.name} className={classes.image} />

            <div className={classes.infoRow}>
              <span className={classes.label}>Classification:</span>
              <span className={classes.value}>{pokemon.classification}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Type:</span>
              <span className={classes.value}>{pokemon.types.join(', ')}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Height:</span>
              <span className={classes.value}>{pokemon.height.minimum} – {pokemon.height.maximum}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Weight:</span>
              <span className={classes.value}>{pokemon.weight.minimum} – {pokemon.weight.maximum}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Max CP:</span>
              <span className={classes.value}>{pokemon.maxCP}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Max HP:</span>
              <span className={classes.value}>{pokemon.maxHP}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Resistant:</span>
              <span className={classes.value}>{pokemon.resistant.join(', ')}</span>
            </div>
            <div className={classes.infoRow}>
              <span className={classes.label}>Weaknesses:</span>
              <span className={classes.value}>{pokemon.weaknesses.join(', ')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
    backdrop: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    dialog: {
      background: '#222',
      color: '#fff',
      padding: 20,
      borderRadius: 8,
      width: '90%',
      maxWidth: 450,
      position: 'relative',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      fontFamily: 'sans-serif',
    },
    closeBtn: {
      position: 'absolute',
      top: 10,
      right: 14,
      fontSize: 24,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#ccc',
      '&:hover': {
        color: '#fff'
      }
    },
    heading: {
      marginTop: 0,
      fontSize: 22,
      textAlign: 'center',
    },
    image: {
      width: '100%',
      maxWidth: 250,
      display: 'block',
      margin: '0 auto 16px',
    },
    infoRow: {
      marginBottom: 8,
    },
    label: {
      fontWeight: 600,
      marginRight: 4,
      color: '#bbb',
    },
    value: {
      color: '#fff',
    }
  });
