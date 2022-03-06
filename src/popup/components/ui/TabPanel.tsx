import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';

export interface TabPanelProps {
  id: string;
  ariaLabelledBy: string;
  index: number;
  currentTab: number;
}

export const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
  const { children, currentTab: value, index, id, ariaLabelledBy } = props;

  return (
    <Box
      role="tabpanel"
      sx={{ flexGrow: 1 }}
      hidden={value !== index}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      {value === index && children}
    </Box>
  );
};
