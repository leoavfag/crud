import { LinearProgress } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTool } from '../../shared/components';
import { VCheckbox, VTextField } from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import { EmpregadoresService } from '../../shared/services/api/empregadores/EmpregadoresService';

interface IFormData {
  name: string;
  cnpj: string;
  phone: string;
  employerType: string;
  hideEmployeBalance: boolean;
}

export const DetalhesDeEmpregador: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      EmpregadoresService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/empregadores');
        } else {
          setName(result.name);
          console.log(result);
        }
      });
    }
  }, []);

  const handleSave = (data: IFormData) => {
    console.log(data);
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      EmpregadoresService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro deletado!');
          navigate('/empregadores');
        }
      });
    }
  };

  return (
    <BaseLayout
      title={id === 'novo' ? 'Novo empregador' : name}
      toolbar={
        <DetailTool
          newButtonText='Novo'
          showNewButton={id !== 'novo'}
          showDeleteButton={id !== 'novo'}
          showSaveCloseButton
          onClickBack={() => navigate('/empregadores')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNew={() => navigate('/empregadores/novo')}
          onClickSave={() => formRef.current?.submitForm()}
          onClickSaveClose={() => formRef.current?.submitForm()}
        />
      }
    >
      {/* {isLoading && <LinearProgress variant='indeterminate' />}
      <p>Detalhes {id}</p> */}
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder='Nome do empregador' name='name' />
        <VTextField placeholder='CNPJ' name='cnpj' />
        <VTextField placeholder='Telefone' name='phone' />
        <VTextField placeholder='Tipo de empregador' name='employerType' />
        <VCheckbox
          name='hideEmployeBalance'
          value='hideEmployeBalance'
          label='Esconder saldo do empregador?'
        />
      </Form>
    </BaseLayout>
  );
};
