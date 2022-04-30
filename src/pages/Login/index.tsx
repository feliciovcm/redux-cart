import { useCallback, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Form/Input/Input';
import { loginValidationSchema } from '../../components/Form/schemas/loginValidationSchema';
import {
  ChangeRouteButton, Container, SubmitButton, LoginBox, Title, CustomLink, LoginError,
} from './styles';
import { loginSuccess } from '../../store/modules/global/actions';
import { useDispatch } from 'react-redux';
import { signInWIthEmailAndPassword } from '../../services/authetication';

interface IValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const login = useCallback(async (user: any) => {
    dispatch(loginSuccess(user))
  }, [dispatch])

  async function onSubmit(values: IValues, { setSubmitting }: any) {
    try {
      const { data } = await signInWIthEmailAndPassword(values.email, values.password)
      await login(data);
      navigate('/');
    } catch (error) {
      setHasLoginFailed(true);
    }
    setSubmitting(false);
  }

  return (
    <Container>
      <LoginBox>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
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
                Sign in
              </Title>
              {hasLoginFailed && (
                <LoginError>
                  Failed to sign in
                </LoginError>
              )}
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
              <SubmitButton type="submit" disabled={isSubmitting}>
                Login
              </SubmitButton>
            </form>
          )}
        </Formik>
        <ChangeRouteButton type="button">
          Need an account?
          <CustomLink to="/signup">
            Sign up
          </CustomLink>
        </ChangeRouteButton>
      </LoginBox>
    </Container>
  );
}
