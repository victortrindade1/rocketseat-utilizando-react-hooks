# Hook useState

- Para funções terem state dentro do component. Antes, só podia ter state nas
  classes. Agora, tb as functions.
- Controla apenas um estado.
- Cada estado tem um useState separado.
- Apenas um estado é alterado, em vez de alterar todo o estado, como faz o
  setState.
- O return faz papel de render(). A cada alteração do estado, renderiza o
  return.
- O useState recebe desde arrays, a objetos, números, strings...

```javascript
// foobar: estado
// foobarFunction: função q atualiza foobar
const [foobar, foobarFunction] = useState(['foo', 'bar']);
```

## src/App.js

```javascript
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
```
