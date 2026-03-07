/**
 * HOOK — useApiStatus
 * Verifica periodicamente se a API está online.
 */

import { useState, useEffect } from 'react';
import { checkApiHealth } from '../api/client';

export function useApiStatus(intervalMs = 10_000) {
  const [online, setOnline] = useState(null); // null = desconhecido

  useEffect(() => {
    const check = async () => setOnline(await checkApiHealth());
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return online;
}
