export enum Status {
  LOADING,
  ERROR,
  SUCCESS,
  IDLE,
}

export const getStep = (
  step: 'REGISTER' | 'CHOOSE_TEAM' | 'PAYMENT' | 'TEST' | undefined
) => {
  switch (step) {
    case 'REGISTER':
      return '/dashboard/register';
      break;
    case 'CHOOSE_TEAM':
      return '/dashboard/team';
      break;
    case 'PAYMENT':
      return '/dashboard/payment';
      break;
    case 'TEST':
      return '/dashboard/test';
      break;
    default:
      return '/login';
  }
};
