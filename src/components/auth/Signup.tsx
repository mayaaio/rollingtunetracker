import {
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { matchesField, useForm } from "@mantine/form";
import { useAuth } from "../../contexts/AuthContext";

function Signup({ setSignIn }) {
	const { signup } = useAuth();
	async function handleSubmit(e) {
		e.preventDefault();
		const valid = form.validate();
		if (valid.hasErrors) {
			return;
		}

		try {
			const result = await signup(form.values.email, form.values.password);
			console.log(result);
		} catch (err) {
			console.log(err);
			const code = err.code;
			if (code === "auth/weak-password") {
				form.setFieldError(
					"password",
					"Password should contain at least 6 characters"
				);
				form.setFieldError(
					"confirmPassword",
					"Password should contain at least 6 characters"
				);
			} else if (code === "auth/email-already-in-use") {
				form.setFieldError("email", "Email already in use");
			} else {
				const error = "Unable to sign up";
				form.setErrors({
					email: error,
					password: error,
					confirmPassword: error,
				});
			}
		}
	}

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			confirmPassword: matchesField("password", "Passwords are not the same"),
		},
	});
	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing="sm">
				<Title>Sign up</Title>

				<TextInput
					label="Email"
					placeholder="example@email.com"
					{...form.getInputProps("email")}
				/>
				<PasswordInput label="Password" {...form.getInputProps("password")} />
				<PasswordInput
					label="Confirm password"
					{...form.getInputProps("confirmPassword")}
				/>
				<Button type="submit">Sign up</Button>
				<Text onClick={() => setSignIn(true)} size="xs">
					Click to sign in
				</Text>
			</Stack>
		</form>
	);
}

export default Signup;
