import React, { useState } from 'react';

function App() {
  // Primeiro item: estado
  // Segundo item: função para atualizar informações do estado
  const [tech, setTech] = useState(['ReactJS', 'ReactNative', 'Redux']);
  const [newTech, setNewTech] = useState('');

  // Funções passadas como se fossem métodos de classes não podem ser arrow functions
  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
