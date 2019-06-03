// @flow
import * as React from 'react';
import cn from 'classnames';
import './App.css';
import {Header} from './Header';
import {Sidebar} from './Sidebar';
import {ProductGrid} from './ProductGrid';
import {FilterItem} from './components/FilterItem';
import {useProductResults} from './hooks/useProductResults';
import {AppProvider, useAppContext} from './state';

function App() {
  const {
    categories,
    categoryId,
    setCategoryId,
    searchText,
    setSearchText,
  } = useAppContext();
  const {products, loading} = useProductResults({categoryId, searchText});

  const {name: categoryName} = categories.find(({id}) => id === categoryId) || {
    name: 'Loading...',
  };

  return (
    <div>
      <Header
        title="Amazing Store"
        searchText={searchText}
        submitSearchText={value => setSearchText(value)}
      />

      <div className="container container--primary">
        <Sidebar
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <div className={cn('primary-content', loading && 'loading')}>
          {searchText && (
            <FilterItem resetFilter={() => setSearchText('')}>
              "{searchText}"
            </FilterItem>
          )}
          <h2 className="screen-title">{categoryName}</h2>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
