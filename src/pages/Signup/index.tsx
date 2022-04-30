import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Form/Input/Input';
import { signUpValidationSchema } from '../../components/Form/schemas/signUpValidationSchema';
import {
  ChangeRouteButton, Container, CustomLink, SignupBox, SignUpError, SubmitButton, Title,
} from './styles';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/modules/global/actions';
import { createUserWIthEmailAndPassword, signInWIthEmailAndPassword } from '../../services/authetication';

export default function SignUpPage() {
  const [hasSignUpFailed, setHasSignUpFailed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUp = useCallback((user: any) => {
    dispatch(loginSuccess(user))
  }, [dispatch])

  async function onSubmit(values: any, { setSubmitting }: any) {
    try {
      await createUserWIthEmailAndPassword(values);
      const {data}  = await signInWIthEmailAndPassword(values.email, values.password);
      signUp(data);
      navigate('/');
    } catch (error) {
      setHasSignUpFailed(true);
    }
    setSubmitting(false);
  }

  return (
    <Container>
      <SignupBox>
        <Formik
          initialValues={{
            name: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            driver_license: (Math.random()*10000).toString()
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Title>
                Sign up
              </Title>
              {hasSignUpFailed && (
                <SignUpError>
                  Failed to sign up
                </SignUpError>
              )}
              <Input
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.name}
                error={errors.name}
                touched={touched.name}
                type="text"
                name="name"
              />
              <Input
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
                error={errors.username}
                touched={touched.username}
                type="text"
                name="username"
              />
              <Input
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                type="email"
                name="email"
              />
              <Input
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.password}
                error={errors.password}
                touched={touched.password}
                type="password"
                name="password"
              />
              <Input
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.passwordConfirmation}
                error={errors.passwordConfirmation}
                touched={touched.passwordConfirmation}
                type="password"
                name="passwordConfirmation"
                label="Password Confirmation"
              />
              <SubmitButton type="submit" disabled={isSubmitting}>
                Register
              </SubmitButton>
            </form>
          )}
        </Formik>
        <ChangeRouteButton type="button">
          Already have an account?
          <CustomLink to="/login">
            Login
          </CustomLink>
        </ChangeRouteButton>
      </SignupBox>
    </Container>
  );
}
