# Hook useMemo

Cada vez q um estado muda, o return da function executa. O q ocorre na prática é
q o return re-renderiza o app muitas vezes. Por isso, deve-se evitar ao máximo
colocar uma função pra rodar dentro do return, pois vai executar todas as vezes
q o return renderizar. Pra q isso não ocorra, existe o useMemo. O ideal não é
refazer uma função qnd o component renderiza se não for alterado nenhum valor
dela. O ideal seria executar só qnd necessário. Ou seja, o useMemo é usado pra
manipularmos e retornarmos valores a partir dos valores do estado. Vc não usa
pra alterar estado, vc usa pra printar algo q está no estado, mas q talvez vc
queira manipular antes.

O useMemo retorna um valor único.

```javascript
const foobarSize = useMemo(() => foobar.lenght, [foobarState]);
```

## Jeito errado sem useMemo:

```diff
import React, { useState, useEffect } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    ...
  }

  useEffect(() => {
    ...
  }, []);

  useEffect(() => {
    ...
  }, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
+     <strong>Você tem {tech.length} tecnologias</strong>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
```

## Jeito certo com useMemo

```diff
-import React, { useState, useEffect } from 'react';
+import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    ...
  }

  useEffect(() => {
    ...
  }, []);

  useEffect(() => {
    ...
  }, [tech]);

+ const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
-     <strong>Você tem {tech.length} tecnologias</strong>
+     <strong>Você tem {techSize} tecnologias</strong>
      <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
```

> O useMemo faz com q execute a função length apenas qnd tech é mudado
