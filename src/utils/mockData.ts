export type SuperConnectorItem = {
  id: string;
  name: string;
  icon: HTMLImageElement;
  slogan: string;
};

export const MOCK_CONNECTOR_LIST = [
  {
    id: '1',
    name: 'Reddit',
    icon: require('../../assets/icons/reddit-icon.png'),
    slogan: 'Dive into anything',
  },
] as SuperConnectorItem[];
