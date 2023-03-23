import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListTool } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const ListagemDeEmpregadores: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    if (searchParams.get('search') === '') {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    return searchParams.get('search') || '';
  }, [searchParams]);

  return (
    <BaseLayout
      title='Listagem de Empregadores'
      toolbar={
        <ListTool
          showSearchInput
          newButtonText='Novo'
          searchText={search}
          onSearchTextChange={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    ></BaseLayout>
  );
};
