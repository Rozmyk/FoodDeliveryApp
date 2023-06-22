import { OptionsObject } from 'notistack'

const setUpErrorMessage = (error: string, enqueueSnackbar: (message: string, options?: OptionsObject) => void) => {
  let errorMessage = '';

  switch (error) {
    case 'Firebase: Error (auth/user-not-found).':
      errorMessage = 'Nie istnieje użytkownik o podanym adresie e-mail.';
      break;
    case 'Firebase: Error (auth/wrong-password).':
      errorMessage = 'Niepoprawne hasło.';
      break;
    case 'Firebase: Error(auth/user-disabled)':
      errorMessage = 'Konto użytkownika zostało wyłączone przez administratora.';
      break;
    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
      errorMessage =
        'Logowanie do tego konta zostało tymczasowo wyłączone ze względu na zbyt wiele nieudanych prób logowania, spróbuj ponownie później.';
      break;
    case 'Firebase: Error(auth/network-request-failed)':
      errorMessage = 'Wystąpił problem z połączeniem sieciowym podczas próby logowania.';
      break;
    case 'Firebase: Error (auth/email-already-in-use).':
      errorMessage = 'Podany adres e-mail jest już przypisany do istniejącego konta.';
      break;
    default:
      errorMessage = 'Wystąpił błąd, przepraszamy.';
      break;
  }

  enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 5000 });
};

export default setUpErrorMessage;
