import { Layout } from '../../pages';

function Roulette({ name }) {
  const handleSetting = () => {};

  const handleStart = () => {};

  return (
    <Layout
      title={name}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      룰렛
    </Layout>
  );
}

export default Roulette;
