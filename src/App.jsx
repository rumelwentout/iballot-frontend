import { Suspense } from 'react';
import './App.css';
import Router from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <Suspense fallback={<h1>Loading</h1>}>
        <Router />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
