import { Layout } from '../../pages';

function Dalgona({ name }) {
  const handleSetting = () => {};

  const handleStart = () => {};

  return (
    <Layout
      title={name}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      달고나 게임 임
    </Layout>
  );
}

export default Dalgona;
