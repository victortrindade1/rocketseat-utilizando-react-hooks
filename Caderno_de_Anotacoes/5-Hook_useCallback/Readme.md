# Hook useCallback

Assim como o useMemo, o useCallback veio para melhorar a performance da memória
pra rodar o app mais liso e rápido. Basicamente, o useCallback serve para
executar funções apenas qnd um determinado estado é alterado. Mas... ué, achei
q era exatamente pra isso q servia o useMemo... sim, a diferença é apenas q o
_useMemo retorna um valor, e useCallback retorna uma função!_

> useCallback retorna um callback memoizado
> useMemo retorna um valor memoizado

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## src/App.js

```diff
-import React, { useState, useEffect, useMemo } from 'react';
+import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Primeiro item: estado
  // Segundo item: função para atualizar informações do estado
  const [tech, setTech] = useState([]);
  // newTech é outro estado
  const [newTech, setNewTech] = useState('');

-  function handleAdd() {
+  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
-  }
+  }, [newTech, tech]);

  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
```
