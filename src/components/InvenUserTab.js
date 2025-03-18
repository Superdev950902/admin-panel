import { useState, useEffect } from 'react';
import '../assets/css/style.css';

const InvenUserTab = ({ selectedTabs, handleUpdateTabs }) => {
  const [activeTabs, setActiveTabs] = useState(selectedTabs);

  const tabs = [
    'all',
    'cmt',
    'tenant',
    'landlord',
    'service provider',
  ];

  const handleClickTab = (tab) => {
    if (tab === 'all') {
      setActiveTabs(['all']);
    }
    else {
      setActiveTabs(prevTabs => {
        if (prevTabs.includes(tab)) {
          if (prevTabs.length === 1) {
            return ['all'];
          }
          else {
            const actTabs = prevTabs.filter(t => t !== 'all');
            return actTabs.filter(t => t !== tab);
          }
        } else {
          const actTabs = prevTabs.filter(t => t !== 'all');
          return [...actTabs, tab];
        }
      });
    }
    handleUpdateTabs(activeTabs);
  }

  useEffect(() => {
    handleUpdateTabs(activeTabs);
  }, [activeTabs]);

  return (
    <div className="filter-menu">
      <ul>
        {
          tabs.map((tab, index) => (
            <li key={index} className={activeTabs && activeTabs.includes(tab) ? 'active' : ''} onClick={() => { handleClickTab(tab) }}>{tab.toUpperCase()}</li>
          ))
        }
      </ul>
    </div>
  );
};
export default InvenUserTab;
