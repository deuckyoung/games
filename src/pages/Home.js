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
    <Layout header={<Header>미니 게임</Header>}>
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
  height: 100px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 10px;
`;

const GameButtonContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  gap: 1rem;
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
  gap: 1.5rem;

  > img {
    width: 50%;
    height: auto;
  }

  > strong {
    font-size: 1em;
    font-weight: 600;
  }
`;
