import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListagemDeEmpregadores } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página Inicial',
      },
      {
        icon: 'badge',
        path: '/empregadores',
        label: 'Empregadores',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />

      <Route path='/empregadores' element={<ListagemDeEmpregadores />} />

      <Route path='*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
