import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export type EmployerType = 'COMPANY' | 'INDIVIDUAL';

export interface IEmpregador {
  active: boolean;
  balance: number;
  cnpj: string;
  createdBy: string;
  createdDate: string;
  employerType: EmployerType;
  hideEmployeeBalance: boolean;
  id: number;
  incorporationDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  name: string;
  phone: string;
}

type IEmpregadoresWithTotalCount = {
  data: IEmpregador[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ''
): Promise<IEmpregadoresWithTotalCount | Error> => {
  try {
    const relativeUrl = `/empregadores?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`;

    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']) ?? Environment.LINE_LIMIT,
      };
    }
    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros.'
    );
  }
};

const getById = async (id: number): Promise<IEmpregador | Error> => {
  try {
    const { data } = await Api.get(`/empregadores/${id}`);

    if (data) {
      return data;
    }
    return new Error('Erro ao listar o registro.');
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao listar o registro.'
    );
  }
};

const create = async (
  dados: Omit<IEmpregador, 'id'>
): Promise<number | Error> => {
  try {
    const newData = {
      ...dados,
      createdBy: 'kuroki_evom',
      createdDate: new Date().toISOString(),
      lastModifiedBy: 'kuroki_evom',
      lastModifiedDate: new Date().toISOString(),
      balance: 0,
      incorporationDate: new Date().toISOString(),
      active: true,
    };
    const { data } = await Api.post<IEmpregador>('/empregadores', newData);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro.');
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro.'
    );
  }
};

const updateById = async (
  id: number,
  dados: IEmpregador
): Promise<void | Error> => {
  try {
    await Api.put(`/empregadores/${id}`, dados);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao alterar o registro.'
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/empregadores/${id}`);
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro.'
    );
  }
};

export const EmpregadoresService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
