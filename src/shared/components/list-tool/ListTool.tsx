import { Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IListToolProps {
  searchText?: string;
  showSearchInput?: boolean;
  onSearchTextChange?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onNewButtonClick?: () => void;
}

export const ListTool: React.FC<IListToolProps> = ({
  searchText = '',
  showSearchInput = false,
  onSearchTextChange,
  newButtonText = 'Novo',
  showNewButton = true,
  onNewButtonClick,
}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSearchInput && (
        <TextField
          size="small"
          placeholder="Pesquisar..."
          value={searchText}
          onChange={(e) => onSearchTextChange?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onNewButtonClick}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
