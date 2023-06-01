import { Layout } from '../../pages';

function Roulette({ name, icon, mode }) {
  const handleSetting = () => {};

  const handleStart = () => {};

  return (
    <Layout
      title={name}
      icon={icon}
      moded={mode}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      룰렛
    </Layout>
  );
}

export default Roulette;
