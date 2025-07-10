import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from 'react-error-boundary';

function fallbackRender({ error }: { error: unknown }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>
        {error instanceof Error && error.message}
      </pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallbackRender={fallbackRender}>
    <App />
  </ErrorBoundary>
);
