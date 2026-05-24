import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { MitigationsPage } from './pages/MitigationsPage';
import { SimulationDashboard } from './pages/SimulationDashboard';
import { ThreatModelPage } from './pages/ThreatModelPage';
import { WalkthroughPage } from './pages/WalkthroughPage';

const BASE_PATH = '/signalghost-wildcard-postmessage-token-heist';

function normalizePath(pathname: string): string {
  if (pathname.startsWith(BASE_PATH)) {
    const trimmed = pathname.slice(BASE_PATH.length) || '/';
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }
  return pathname || '/';
}

export default function App() {
  const [path, setPath] = useState<string>(normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath: string) => {
    const target = `${BASE_PATH}${nextPath === '/' ? '' : nextPath}`;
    window.history.pushState({}, '', target);
    setPath(nextPath);
  };

  let content;
  if (path === '/threat-model') {
    content = <ThreatModelPage />;
  } else if (path === '/walkthrough') {
    content = <WalkthroughPage />;
  } else if (path === '/mitigations') {
    content = <MitigationsPage />;
  } else {
    content = <SimulationDashboard />;
  }

  return (
    <AppShell activePath={path} onNavigate={navigate}>
      {content}
    </AppShell>
  );
}