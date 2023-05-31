import {
  IconButton as MuiIconButton,
  Container as MuiContainer,
  styled,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';

function Layout({
  header,
  children,
  footer,
  title,
  icon,
  direction = 'row',
  onRestart,
  onSetting,
}) {
  const navigate = useNavigate();

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

const Container = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #ebebd3;
  color: #083d77;
`;

const Header = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
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
    font-size: 25px;
    transform: translateY(4px);
  }
`;

const Main = styled('main')`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  overflow: auto;
  margin-bottom: 20px;
`;

const Footer = styled('footer')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: auto;
`;

const ButtonContainer = styled('div')`
  display: flex;
  gap: 15px;
`;

const IconButton = styled(MuiIconButton)`
  width: 35px;
  height: 35px;
  background: #083d77;
  color: #ebebd3;
  box-shadow: 0px 3px 0px 1px rgb(161 161 161);

  :hover,
  :active {
    background-color: #083d77;
  }

  :active {
    transform: translateY(1px);
    box-shadow: 0px 2px 0px 1px rgb(161 161 161);
  }

  > svg {
    font-size: 25px;
  }
`;
