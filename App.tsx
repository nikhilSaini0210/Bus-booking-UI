import './global.css';
import React, {FC} from 'react';
import Navigation from './src/navigation/Navigation.tsx';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/service/queryClient.tsx';

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;
