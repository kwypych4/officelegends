import { App } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { Router } from 'router';
import { GlobalStyles } from 'styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  // TODO: add dependency if dev
  <QueryClientProvider client={queryClient}>
    <App>
      <GlobalStyles />
      <RouterProvider router={Router} />
    </App>
  </QueryClientProvider>

  // </React.StrictMode>
);
