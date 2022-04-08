import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IState } from '../../store';
import { loginRequest } from '../../store/modules/global/actions';

export function ProtectedRoute({ redirectPath = '/login', children }: any) {
  const currentUser = useSelector((state: IState) => state.authetication.user)
  const location = useLocation();
  const dispatch = useDispatch();

  const checkUserLogged = useCallback(() => {
    dispatch(loginRequest())
  }, [dispatch])

  useEffect(() => {
    checkUserLogged();
  }, [currentUser])

  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return (
    children || <Outlet />
  );
}
