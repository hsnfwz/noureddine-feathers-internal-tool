import { redirect } from '@sveltejs/kit';

import { getProfileById } from '$api/profile.js';

export async function load({ locals: { getSession } }) {
  const session = await getSession();

  // if (!session) throw redirect(307, '/auth/sign-in');

  // const profile = await getProfileById(session.user.id);

  return { session, profile: undefined };
}