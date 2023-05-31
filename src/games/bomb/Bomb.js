import { Button, TextField, styled } from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';
import { Duration } from 'luxon';
import { transaction } from 'mobx';
import { Layout } from '../../pages';
import { useEffect } from 'react';

const MIN_SECOND = 1;
const MAX_SECOND = 600;

function Bomb({ name, icon }) {
  const store = useLocalObservable(() => ({
    timer: null,
    currentSeconds: MIN_SECOND,
    seconds: MIN_SECOND,

    get time() {
      return Duration.fromObject({ seconds: this.currentSeconds }).toFormat(
        'mm:ss',
      );
    },

    setSeconds(seconds) {
      transaction(() => {
        let _seconds = +seconds;
        if (_seconds < MIN_SECOND) _seconds = MIN_SECOND;
        else if (_seconds > MAX_SECOND) _seconds = MAX_SECOND;
        this.seconds = _seconds;
        this.currentSeconds = _seconds;
      });
    },

    startTimer(callback) {
      this.currentSeconds = this.seconds;
      this.stopTimer();
      this.timer = setInterval(() => {
        if (this.currentSeconds < MIN_SECOND) {
          this.stopTimer();
          callback();
          return;
        }
        this.currentSeconds -= 1;
      }, 1000);
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.currentSeconds = this.seconds;
      }
    },
  }));

  useEffect(() => {
    return () => {
      store.stopTimer();
    };
  }, []);

  const handleTimeChange = e => {
    store.setSeconds(e.target.value);
  };

  const handleStart = () => {
    store.startTimer(() => {
      alert('boooom');
    });
  };

  const handleSetting = () => {};

  return (
    <Layout
      title={name}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      <Observer>
        {() => (
          <TextField
            type="number"
            value={store.seconds}
            onChange={handleTimeChange}
            label={'시간'}
          />
        )}
      </Observer>

      <Observer>{() => <Timer>{store.time}</Timer>}</Observer>
      <Observer>
        {() => (
          <Button
            variant="contained"
            onClick={handleStart}
            disabled={!!store.timer}
          >
            시작
          </Button>
        )}
      </Observer>
    </Layout>
  );
}

export default Bomb;

const Timer = styled('span')`
  font-size: 50px;
  font-weight: 600;
`;
