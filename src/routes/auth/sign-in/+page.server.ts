// svelte
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || email.length < 3) {
      return fail(400, {
        email,
        message: 'Email must be at least 3 characters.',
        success: false,
      });
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    })

    if (error) {
      return fail(500, {
        email,
        message: 'Server error. Try again later.',
        success: false,
      });
    }

    return {
      email,
      message: 'Please check your email for a magic link to sign in.',
      success: true,
    }
  },
}
