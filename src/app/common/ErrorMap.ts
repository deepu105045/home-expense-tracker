export class ExpenseErrors{
  static errorObj = {
    'auth/user-not-found': 'User does not exist, please register.',
    'auth/wrong-password': 'Invalid user name or password.',
    'auth/invalid-email' : 'Incorrect Username format.',
    'auth/too-many-requests' : 'Account has been disabled.Please contact admin.',
    'auth/email-already-in-use': 'The email address is already in use by another account.',
    'auth/network-request-failed': 'Network error.Please try again.'
  };

}
