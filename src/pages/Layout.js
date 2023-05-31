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
  direction = 'row',
  onRestart,
  onSetting,
}) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" fixed>
      {header ?? (
        <Header>
          <strong>{title}</strong>

          <ButtonContainer>
            <IconButton onClick={() => navigate('/home')}>
              <HomeIcon />
            </IconButton>
            <IconButton onClick={onSetting}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={onRestart}>
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
  flex: 0 0 100px;
  font-size: 50px;
  font-weight: bold;
  margin-top: 20px;
`;

const Main = styled('main')`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  overflow: auto;
  margin: 20px 0;
`;

const Footer = styled('footer')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100px;
  border: 1px solid;
  margin-bottom: 10px;
  margin-top: auto;
`;

const ButtonContainer = styled('div')`
  display: flex;
  gap: 15px;
`;

const IconButton = styled(MuiIconButton)`
  background: #083d77;
  color: #f4d35e;

  &:hover {
    background-color: #083d77;
    opacity: 0.7;
  }
`;
