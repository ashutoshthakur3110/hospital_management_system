export const getRoleHomeRoute = (user) => {
  if (user.role === 'patient') return '/patient';
  if (user.role === 'doctor') return '/doctor';

  if (user.role === 'staff') {
    return ['reception', 'billing'].includes(user.staffRole)
      ? '/hospital'
      : '/medical';
  }

  return '/login';
};
