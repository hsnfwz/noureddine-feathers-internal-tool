import { redirect } from '@sveltejs/kit';

import { getProfileById } from '$api/profile.js';

export async function load({ locals: { getSession } }) {
  const session = await getSession();

  if (!session) throw redirect(303, '/auth/sign-in');

  let profile;

  if (session) {
    profile = await getProfileById(session.user.id);

    if (!profile?.is_admin) throw redirect(303, '/unauthorized');
  }

  return { session, profile };
}