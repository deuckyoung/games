import { styled } from '@mui/material';
import { games } from './../games';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

function GameButton({ path, name, icon, onClick }) {
  const handleClick = () => {
    onClick(path);
  };

  return (
    <GameButtonWrapper onClick={handleClick}>
      <img src={icon} alt={path} />
      <strong>{name}</strong>
    </GameButtonWrapper>
  );
}

function Home() {
  const navigate = useNavigate();

  const handleRoute = path => {
    console.log(path);
    navigate(`/${path}`);
  };

  return (
    <Layout header={<Header>내기 게임</Header>}>
      <GameButtonContainer>
        {games.map(info => (
          <GameButton {...info} key={info.path} onClick={handleRoute} />
        ))}
      </GameButtonContainer>
    </Layout>
  );
}

export default Home;

const Header = styled('header')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 100px;
  font-size: 60px;
  font-weight: bold;
`;

const GameButtonContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const GameButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  padding: 10px;
  background: #f4d35e;
  gap: 4vw;

  > img {
    width: 13vw;
    height: auto;
  }

  > strong {
    font-size: 4vw;
    font-weight: 600;
  }
`;
