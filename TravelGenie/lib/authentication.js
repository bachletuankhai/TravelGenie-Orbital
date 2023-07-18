import { Auth } from 'aws-amplify';

// sign up
export async function signUp({ email, password }) {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
      autoSignIn: { // enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(user);
    return { user };
  } catch (error) {
    console.log('error signing up:', error);
    throw error;
  }
}

// confirm sign up with code
export async function confirmSignUp({ email, code }) {
  try {
    await Auth.confirmSignUp(email, code, { forceAliasCreation: false });
  } catch (error) {
    console.log('error confirming sign up', error);
    throw error;
  }
}

// resend confirmation code
export async function resendConfirmationCode({ email }) {
  try {
    await Auth.resendSignUp(email);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
    throw err;
  }
}

// sign out
export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
    throw error;
  }
}

// sign in
export async function signIn({ email, password }) {
  try {
    const user = await Auth.signIn(email, password);
    return { user };
  } catch (error) {
    console.log('error signing in', error);
    throw error;
  }
}

// change password
export async function changePassword({ oldPassword, newPassword }) {
  const user = await Auth.currentAuthenticatedUser();
  return await Auth.changePassword(user, oldPassword, newPassword);
}
