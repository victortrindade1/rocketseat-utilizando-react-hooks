# Configurando estrutura

Foram feitas as etapas `1-Criando_Projeto_do_Zero` e `2-Eslint_Prettier_EditorConfig` do repositório `rocketseat-primeiro-projeto-reactjs` (https://github.com/victortrindade1/rocketseat-primeiro-projeto-reactjs).

## Para o Eslint aceitar os hooks:

`yarn add eslint-plugin-react-hooks -D`

### .eslintrc.js

```diff
- plugins: ["react", "eslint-plugin-prettier"],
+ plugins: ["react", "eslint-plugin-prettier", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
    "import/prefer-default-export": "off",
    "react/state-in-constructor": ["off", "always"],
    "no-console": ["error", { allow: ["tron"] }],
+   "react-hooks/rules-of-hooks": "error",
+   "react-hooks/exhaustive-deps": "warn",
  },
```
