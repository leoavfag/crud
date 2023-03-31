/* eslint-disable indent */
import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface IDetailTool {
  newButtonText?: string;

  showNewButton?: boolean;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveCloseButton?: boolean;

  showNewButtonLoading?: boolean;
  showSaveButtonLoading?: boolean;
  showDeleteButtonLoading?: boolean;
  showBackButtonLoading?: boolean;
  showSaveCloseButtonLoading?: boolean;

  onClickNew?: () => void;
  onClickSave?: () => void;
  onClickDelete?: () => void;
  onClickBack?: () => void;
  onClickSaveClose?: () => void;
}

export const DetailTool: React.FC<IDetailTool> = ({
  newButtonText = 'Novo',

  showNewButton = true,
  showSaveButton = true,
  showDeleteButton = true,
  showBackButton = true,
  showSaveCloseButton = false,

  showNewButtonLoading = false,
  showSaveButtonLoading = false,
  showDeleteButtonLoading = false,
  showBackButtonLoading = false,
  showSaveCloseButtonLoading = false,

  onClickNew,
  onClickSave,
  onClickDelete,
  onClickBack,
  onClickSaveClose,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSaveButton && !showSaveButtonLoading && (
        <Button
          variant='contained'
          color='primary'
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSave}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showSaveButtonLoading && <Skeleton width={110} height={60} />}

      {showSaveCloseButton &&
        !showSaveCloseButtonLoading &&
        !smDown &&
        !mdDown && (
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={onClickSaveClose}
          >
            <Typography
              variant='button'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
              overflow='hidden'
            >
              Salvar e voltar
            </Typography>
          </Button>
        )}

      {showSaveCloseButtonLoading && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !showDeleteButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDelete}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showDeleteButtonLoading && <Skeleton width={110} height={60} />}

      {showNewButton && !showNewButtonLoading && !smDown && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNew}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {newButtonText}
          </Typography>
        </Button>
      )}

      {showNewButtonLoading && !smDown && <Skeleton width={110} height={60} />}

      {showBackButton &&
        (showNewButton ||
          showDeleteButton ||
          showSaveButton ||
          showSaveCloseButton) && (
          <Divider variant='middle' orientation='vertical' />
        )}

      {showBackButton && !showBackButtonLoading && (
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBack}
        >
          <Typography
            variant='button'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showBackButtonLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};
