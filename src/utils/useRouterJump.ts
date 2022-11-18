import userRouter from 'routes/router';

export function redirectToWelcome(): void {
  userRouter.push('/welcome');
}

export function redirectToHome(): void {
  const token = localStorage.getItem('token');
  userRouter.push('/home');

  if (token) {
    userRouter.push('/home');
  } else {
    userRouter.push('/login');
  }
}
