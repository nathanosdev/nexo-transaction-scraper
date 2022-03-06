import { FunctionComponent, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { TabPanel } from './components/ui';
import { HomeTab, ExportTab, TransactionsTab } from './components/tabs';

const tabA11yProps = (index: number) => ({
  id: `primary-tab-${index}`,
  'aria-controls': `primary-tabpanel-${index}`,
});

const tabPanelA11yProps = (index: number) => ({
  id: `primary-tabpanel-${index}`,
  ariaLabelledBy: `primary-tab-${index}`,
});

export const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const onTabChanged = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={onTabChanged}
        aria-label="Navigation tabs"
      >
        <Tab label="Home" {...tabA11yProps(0)} />
        <Tab label="Transactions" {...tabA11yProps(1)} />
        <Tab label="Export" {...tabA11yProps(2)} />
      </Tabs>

      <TabPanel currentTab={currentTab} index={0} {...tabPanelA11yProps(0)}>
        <HomeTab />
      </TabPanel>

      <TabPanel currentTab={currentTab} index={1} {...tabPanelA11yProps(0)}>
        <TransactionsTab />
      </TabPanel>

      <TabPanel currentTab={currentTab} index={2} {...tabPanelA11yProps(1)}>
        <ExportTab />
      </TabPanel>
    </>
  );
};
