// svelte
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email')

    const { error } = await supabase.auth.signOut();

    if (error) {
      return fail(500, {
        message: 'Server error. Try again later.',
        success: false,
        email
      });
    }

    return {
      message: 'You have been signed out.',
      success: true,
    }
  },
}