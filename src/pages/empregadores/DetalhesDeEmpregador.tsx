import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import { DetailTool } from '../../shared/components';
import {
  VCheckbox,
  VTextField,
  VForm,
  useVForm,
  IVFormErrors,
} from '../../shared/forms';
import { BaseLayout } from '../../shared/layouts';
import {
  EmpregadoresService,
  IEmpregador,
  EmployerType,
} from '../../shared/services/api/empregadores/EmpregadoresService';

type LabelValuePair = {
  label: string;
  value: string;
};

/**
 * Function createLabelValueArray explanation
 *
 * T extends Array<LabelValuePair> restricts the generic type T to our LabelValuePair type
 *
 * Array<{value: V}> extracts another type V from the LabelValuePair inside the array
 *
 * V extends string actually prevents the compiler from widening our string literals to the string type.
 *
 */
function createLabelValueArray<
  T extends Array<LabelValuePair> & Array<{ value: V }>,
  V extends string
>(...args: T) {
  return args;
}

const selectTypes = createLabelValueArray(
  { label: 'Company', value: 'COMPANY' },
  { label: 'Individual', value: 'INDIVIDUAL' }
);

type SelectType = typeof selectTypes[number]['value'];

interface IFormData {
  cnpj: string;
  employerType: EmployerType;
  hideEmployeeBalance: boolean;
  name: string;
  phone: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  cnpj: yup.string().required('CNPJ ou CPF obrigatórios'), //cpf.isValid(value) || cnpj.isValid(value)),
  phone: yup.string().required(),
  hideEmployeeBalance: yup.boolean().required(),
  employerType: yup
    .mixed<SelectType>()
    .oneOf(selectTypes.map((lv) => lv.value))
    .required(),
});

export const DetalhesDeEmpregador: React.FC = () => {
  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [empregadorData, setempregadorData] = useState<IEmpregador | undefined>(
    undefined
  );

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
    } else {
      formRef.current?.setData({
        name: '',
        cnpj: '',
        phone: '',
        employerType: '',
        hideEmployeeBalance: false,
      });
    }
  }, [id]);

  const handleSave = (data: IFormData) => {
    formValidationSchema
      .validate(data, { abortEarly: false })
      .then((validateData) => {
        if (id === 'novo') {
          const createData = {
            ...validateData,
            createdBy: 'kuroki_evom',
            createdDate: new Date().toISOString(),
            lastModifiedBy: 'kuroki_evom',
            lastModifiedDate: new Date().toISOString(),
            balance: 0,
            incorporationDate: new Date().toISOString(),
            active: true,
          };

          EmpregadoresService.create(createData).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate('/empregadores');
              } else {
                navigate(`/empregadores/detalhes/${result}`);
              }
            }
          });
        } else {
          if (empregadorData) {
            EmpregadoresService.updateById(Number(id), {
              ...empregadorData,
              ...validateData,
              lastModifiedBy: 'kuroki_evom',
              lastModifiedDate: new Date().toISOString(),
              id: Number(id),
            }).then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/empregadores');
                }
              }
            });
          }
        }
        setIsLoading(true);
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
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
          onClickNew={() => navigate('/empregadores/detalhes/novo')}
          onClickSave={save}
          onClickSaveClose={saveAndClose}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome do empregador'
                  name='name'
                  disabled={isLoading}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='CNPJ'
                  name='cnpj'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Telefone'
                  name='phone'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Tipo de empregador'
                  name='employerType'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VCheckbox
                  name='hideEmployeBalance'
                  value='hideEmployeeBalance'
                  label='Esconder saldo?'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </BaseLayout>
  );
};
