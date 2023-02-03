import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSession(
  {
    required,
    redirectTo = '/api/auth/signin?error=SessionExpired',
    queryConfig = {},
  } = {
    required: true,
    redirectTo: 'http://localhost:3000',
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  }
) {
  const router = useRouter();
  const query = useQuery(['session'], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return [query.data, query.status === 'loading'];
}
