import { useCallback, useEffect, useState } from 'react';
import { fetchPhone } from '../api/phoneApi';
import { ErrorBox } from '../components/ErrorBox';
import { Loading } from '../components/Loading';
import type { Phone } from '../types';
import { SelectPhoneApp } from './SelectPhoneApp';

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(() => {
    setError(null);
    setPhone(null);
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchPhone('1', { signal: controller.signal })
      .then((result) => {
        if (!controller.signal.aborted) setPhone(result);
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Không tải được dữ liệu sản phẩm.');
        }
      });
    return () => controller.abort();
  }, [attempt]);

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phone) return <Loading />;
  return <SelectPhoneApp phone={phone} />;
}
