import * as yup from 'yup'

export const emailValidation: yup.StringSchema<string> = yup
	.string()
	.required('Pole e-mail jest obowiązkowe')
	.email('Podaj poprawny e-mail')

export const passwordValidation: yup.StringSchema<string> = yup
	.string()
	.required('Pole Hasło jest obowiązkowe')
	.min(8, 'Hasło powinno mieć co najmniej 8 znaków długości.')

export const repeatPasswordValidation: yup.StringSchema<string> = yup
	.string()
	.required('Pole Powtórz hasło jest obowiązkowe')
	.oneOf([yup.ref('password')], 'Hasła muszą być takie same')

export const displayNameValidation: yup.StringSchema<string> = yup
	.string()
	.required('Pole Wyświetlana nazwa  jest obowiązkowe')

export const TextFieldValidation: yup.StringSchema<string> = yup.string().required('Pole "opinia" jest obowiązkowe')

export const photoUrlValidation: yup.StringSchema<string> = yup
	.string()
	.required('Proszę podać adres URL')
	.matches(
		/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
		'Podaj poprawny adres URL!'
	)
	.test('is-image-url', 'Adres URL musi zawierać link do obrazka', value => {
		if (value) {
			const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif']
			const extension = value.substr(value.lastIndexOf('.')).toLowerCase()
			return imageExtensions.includes(extension)
		}
		return true
	})
