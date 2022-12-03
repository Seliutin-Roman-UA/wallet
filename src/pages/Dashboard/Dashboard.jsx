import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Balance } from 'components/Balance/Balance';
// import { Currency } from 'components/Currency/Currency';
import { Header } from 'components/Header/Header';
import { Loader } from 'components/Loader/Loader';
import { Navigation } from 'components/Navigation/Navigation';
import { ButtonAddTransactions } from 'components/ButtonAddTransaction/ButtonAddTransaction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesThunk } from 'redux/categories/categories-operations';
import { IsDesktopOrTablet } from 'components/Container/Tablet';
import { Box, AppBarBox, NavBox } from './Dashboard.styled';
import { Container } from './Dashboard.styled';
import { getToken } from 'redux/auth/auth-selector';
import Login from '../Login';
const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  useEffect(() => {
    dispatch(getAllCategoriesThunk());
  }, [dispatch]);

  return token ? (
    <Container>
      <Header name="Name" />
      <Box>
        <AppBarBox>
          <NavBox>
            <Navigation />
            <IsDesktopOrTablet>
              <Balance />
            </IsDesktopOrTablet>
          </NavBox>
          <IsDesktopOrTablet>
            {/* <Currency /> */}
          </IsDesktopOrTablet>
        </AppBarBox>
        <div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
        <ButtonAddTransactions />
      </Box>
    </Container>
  ) : (
    <Login />
  );
};

export default Dashboard;
