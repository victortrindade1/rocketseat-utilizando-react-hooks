# Convertendo classes para functions com hooks

Aqui não vamos usar o código atual. Vamos mudar as classes do app anterior, o
rocketshoes react web (o nome está arquitetura-flux). Vou criar um novo app pra
isso, o **arquitetura_flux_com_functions**. Mas vou deixar aqui neste Readme o q
for mudado.

## Eslint com hooks

`yarn add eslint-plugin-react-hooks -D`

### .eslintrc.js

```diff
-  plugins: ['react', 'eslint-plugin-prettier'],
+  plugins: ['react', 'eslint-plugin-prettier', 'react-hooks'],

  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': ['off', 'always'],
    'no-console': ['error', { allow: ['tron'] }],
    'no-param-reassign': 'off',
+    "react-hooks/rules-of-hooks": "error",
+    "react-hooks/exhaustive-deps": "warn",
  },
```

## src/pages/Home/index.js

```diff
-import React, { Component } from 'react';
+import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPriceBRL } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

-class Home extends Component {
+function Home({ amount, addToCartRequest }) {
-  state = {
-    products: [],
-  };
+  const [products, setProducts] = useState([]);

-  async componentDidMount() {
+  useEffect(() => {
+    async function loadProducts() {
      const response = await api.get('products');

      /*
      Formate o preço aqui. Não formate no render(), pois sempre q renderizar
      vai chamar a função.
      Fique atento! Analise bem se precisa usar uma função dentro do render!
      */
      const data = response.data.map((product) => ({
        ...product,
        priceBRL: formatPriceBRL(product.price),
      }));

-     this.setState({ products: data });
-    }
+     setProducts(data);
+    }
+
+    loadProducts();
+  }, []);


-  handleAddProduct = (id) => {
+  function handleAddProduct(id) {
-    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

-  render() {
-    const { products } = this.state;

-    const { amount } = this.props;

    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceBRL}</span>

            <button
              type="button"
              onClick={() => {
-                return this.handleAddProduct(product.id);
+                return handleAddProduct(product.id);
              }}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || ''}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
-  }
}

const mapStateToProps = (state) => ({
  // Quantidade daquele produto selecionado
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  // Actions se tornam props
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
};
```
