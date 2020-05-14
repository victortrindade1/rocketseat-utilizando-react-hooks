# Hook useEffect

Ele substitui os métodos:

- componentDidUpdate()
- componentDidMount()
- componentWillUnmount()

`useEffect(funcaoExecutada, quandoExecutar)`

## Substituindo componentDidUpdate()

Basta colocar um _array de dependências_ como segundo argumento do `useEffect`.
Este array pd possuir estados os quais caso sejam alterados, a função do
primeiro argumento roda.

Ex:

```javascript
useEffect(() => {
  localStorage.setItem('tech', JSON.stringify(tech));
}, [tech]);
```

Caso o estado `tech` seja alterado, roda a função de setar no localStorage.

## Substituindo componentDidMount()

Só passar um array de dependências vazio como segundo parâmetro. Assim, sem
existir um "quando executar", irá apenas executar qnd montar o component.

Ex:

```javascript
useEffect(() => {
  const storageTech = localStorage.getItem('tech');

  if (storageTech) {
    setTech(JSON.parse(storageTech));
  }
}, []);
```

Ao montar o component, pega os ítens já gravados na localStorage.

## Substituindo componentWillUnmount()

Só usar um return, e nele colocar uma função. Assim, qnd o component desmontar,
vai rodar aquela função.

Este tipo é muito usado qnd o App usa event listener, e qnd o component
desmonta, é feito um document.removeEventListener().

Ex:

```javascript
useEffect(() => {
  // some code...

  return () => {
    document.removeEventListener();
  };
}, []);
```

## src/App.js

```diff
-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';

function App() {
- const [tech, setTech] = useState(['ReactJS', 'ReactNative', 'Redux']);
+ const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech('');
  }

+  useEffect(() => {
+    const storageTech = localStorage.getItem('tech');
+
+    if (storageTech) {
+      setTech(JSON.parse(storageTech));
+    }
+  }, []);
+
+  useEffect(() => {
+    localStorage.setItem('tech', JSON.stringify(tech));
+  }, [tech]);

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
