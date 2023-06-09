import { Layout } from '../../pages';

function Dalgona({ name, icon, mode }) {
  const handleSetting = () => {};

  const handleStart = () => {};

  return (
    <Layout
      title={name}
      icon={icon}
      mode={mode}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      달고나 게임 임
    </Layout>
  );
}

export default Dalgona;
