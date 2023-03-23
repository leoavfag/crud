import { DetailTool } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <BaseLayout
      title='Pagina Principal'
      toolbar={<DetailTool showSaveCloseButton />}
    >
      Teste
    </BaseLayout>
  );
};
