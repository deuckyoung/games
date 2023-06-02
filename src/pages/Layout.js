import { IconButton, Container, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Layout({
  header,
  children,
  footer,
  title,
  icon,
  mode,
  direction = 'row',
  onRestart,
  onSetting,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    window?.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'changeOrientation',
        mode,
      }),
    );
  }, [mode]);

  return (
    <Container maxWidth="md">
      {header ?? (
        <Header>
          <TitleContainer>
            <img src={icon} alt={title} />
            <strong>{title}</strong>
          </TitleContainer>

          <ButtonContainer>
            <IconButton onClick={() => navigate('/home')}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={onSetting} TouchRippleProps={{ color: 'red' }}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={onRestart} disableFocusRipple>
              <ReplayIcon />
            </IconButton>
          </ButtonContainer>
        </Header>
      )}
      <Main direction={direction}>{children}</Main>
      {footer ?? <Footer>광고를 넣자</Footer>}
    </Container>
  );
}

export default Layout;

const Header = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 100px;
`;

const TitleContainer = styled('div')`
  display: flex;
  align-items: center;
  border-radius: 20px;
  gap: 10px;

  > img {
    width: auto;
    height: 25px;
  }

  > strong {
    font-size: 30px;
  }
`;

const Main = styled('main')`
  display: flex;
  flex: 1;
  flex-direction: ${({ direction }) => direction};
  overflow: auto;
  margin-bottom: 20px;
`;

const Footer = styled('footer')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 60px;
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: auto;
`;

const ButtonContainer = styled('div')`
  display: flex;
  gap: 15px;
`;
