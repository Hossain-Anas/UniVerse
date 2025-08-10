import type { LayoutServerLoad } from './$types';
import { requireAuth } from '$lib/server/auth';

export const load: LayoutServerLoad = async (event) => {
  const session = await requireAuth(event);

  event.setHeaders({
    'cache-control': 'no-store, max-age=0, must-revalidate',
    'pragma': 'no-cache'
  });

  return { session };
};


