import { z } from 'zod'

// ---------------------------- Validation Rules ----------------------------
export const required = (name: string) => z.string().min(1, `${name} is required`)

export const email = (name = 'Email') => required(name).email(`${name} is not valid`)

export const password = (number = 5, name = 'Password') =>
	required(name)
		.min(number, `${name} must be at least ${number} characters`) // Used during development
		// .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
		// .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
		// .regex(new RegExp('.*\\d.*'), 'One number')
		// .regex(
		//   new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
		//   'One special character'
		// )
		.trim()
// --------------------------------------------------------------------------

export const AuthUserSchema = z.object({
	email: email(),
	password: password(6)
})

export const ForgotPasswordSchema = z.object({
	email: email()
})

export const UpdatePasswordSchema = z
	.object({
		password: password(8),
		confirmPassword: password(8, 'Confirm Password')
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password does not match',
				path: ['confirmPassword']
			})
		}
	})

export const UpdateEmailSchema = z
	.object({
		email: email(),
		emailConfirm: email('Confirm Email')
	})
	.superRefine(({ email, emailConfirm }, ctx) => {
		if (email !== emailConfirm) {
			ctx.addIssue({
				code: 'custom',
				message: 'Email Address does not match',
				path: ['emailConfirm']
			})
		}
	})

export const RegisterUserSchema = z.object({
	email: email(),
	password: password(6),
	confirmPassword: z
		.string({ required_error: 'Password confirmation is required' })
		.min(1, { message: 'Password confirmation is required' })
		.trim()
})

export const CreateGameSchema = z.object({
	name: required('Name')
})
