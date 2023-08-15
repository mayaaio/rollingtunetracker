import {
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../../contexts/AuthContext";

function SignIn({ setSignIn }) {
	const { login } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();
		const valid = form.validate();
		if (valid.hasErrors) {
			return;
		}

		try {
			await login(form.values.email, form.values.password);
		} catch (err) {
			console.log(err);
			const errMessage = err.error;
			//TODO - Are there user not found/wrong password specific errors in mongodb?
			if (errMessage === "invalid username/password") {
				form.setFieldError("email", "invalid username/password");
			} else {
				form.setFieldError("password", "Unable to log in");
			}
		}
	}

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	return (
		<form onSubmit={handleSubmit}>
			<Stack spacing="sm">
				<Title>Sign in</Title>

				<TextInput
					label="Email"
					placeholder="example@email.com"
					{...form.getInputProps("email")}
				/>
				<PasswordInput label="Password" {...form.getInputProps("password")} />
				<Button type="submit">Sign in</Button>
				<Text onClick={() => setSignIn(false)} size="xs">
					Click to sign up
				</Text>
			</Stack>
		</form>
	);
}

export default SignIn;
