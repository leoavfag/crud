import { Box, LinearProgress, Paper } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailTool } from '../../shared/components';
import { VCheckbox, VTextField } from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import {
  EmpregadoresService,
  IEmpregador,
} from '../../shared/services/api/empregadores/EmpregadoresService';

type IFormData = Omit<IEmpregador, 'id'>;

export const DetalhesDeEmpregador: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [empregadorData, setempregadorData] = useState({});

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true);
      EmpregadoresService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/empregadores');
        } else {
          setName(result.name);
          console.log(result);
          setempregadorData(result);
          formRef.current?.setData(result);
        }
      });
    }
  }, []);

  const handleSave = (data: IFormData) => {
    setIsLoading(true);

    if (id === 'novo') {
      EmpregadoresService.create(data).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/empregadores/detalhes/${result}`);
        }
      });
    } else {
      EmpregadoresService.updateById(Number(id), {
        ...empregadorData,
        ...data,
        lastModifiedBy: 'kuroki_evom',
        lastModifiedDate: new Date().toISOString(),
        id: Number(id),
      }).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
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
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <VTextField placeholder='Nome do empregador' name='name' />
          <VTextField placeholder='CNPJ' name='cnpj' />
          <VTextField placeholder='Telefone' name='phone' />
          <VTextField placeholder='Tipo de empregador' name='employerType' />
          <VCheckbox
            name='hideEmployeBalance'
            value='hideEmployeBalance'
            label='Esconder saldo do empregador?'
          />
        </Box>
      </Form>
    </BaseLayout>
  );
};
