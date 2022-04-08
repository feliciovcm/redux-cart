import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Cart from '../../components/Cart';
import Catalog from '../../components/Catalog';
import { onUserLogout } from '../../store/modules/global/actions';
import {
  Box, Container, CustomButton, Title,
} from './styles';

export default function HomePage() {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(onUserLogout())
  }, [dispatch])
  return (
    <Container>
      <Box>
        <Title>
          Obrigado a todos pela presença!
        </Title>
        <Catalog />
        <Cart />
        <CustomButton type="button" onClick={logout}>
          CLICK TO LOGOUT
        </CustomButton>
      </Box>
    </Container>
  );
}
