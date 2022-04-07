import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { IProduct } from '../store/modules/cart/types';
import CatalogItem from './CatalogItem';
// import { useSelector } from 'react-redux';

//  const state = useSelector(state => state); access all state frfom store
//  const store = useStore().getState(); to get all state from store 

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => setCatalog(response.data))
  }, [])

  return (
    <main>
      <h1>Catalog</h1>

      {catalog.map(product => (
        <CatalogItem product={product} key={product.id} />
      ))}
    </main>
  )
}

export default Catalog;