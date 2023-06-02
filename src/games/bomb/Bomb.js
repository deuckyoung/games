/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControlLabel,
  TextField,
  styled,
  Checkbox,
  FormControl,
} from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';
import { Duration } from 'luxon';
import { transaction } from 'mobx';
import { Layout } from '../../pages';
import { useEffect } from 'react';
import { Dialog } from '../../components';

const MIN_SECOND = 0;
const MAX_SECOND = 600;

function Bomb({ name, icon, mode }) {
  const store = useLocalObservable(() => ({
    timer: null,
    currentSeconds: MIN_SECOND,
    seconds: MIN_SECOND,
    modalOpen: false,
    timeShow: true,
    isExplode: false,

    get time() {
      return Duration.fromObject({ seconds: this.currentSeconds }).toFormat(
        'mm:ss',
      );
    },

    setSeconds(seconds) {
      transaction(() => {
        let _seconds = +seconds.replace(/[^0-9]/g, '');
        if (_seconds > MAX_SECOND) _seconds = MAX_SECOND;
        this.seconds = _seconds;
        this.currentSeconds = _seconds;
      });
    },

    startTimer() {
      transaction(() => {
        this.isExplode = false;
        this.currentSeconds = this.seconds;
        this.stopTimer();
        this.timer = setInterval(() => {
          this.currentSeconds -= 1;
          if (this.currentSeconds < MIN_SECOND) {
            this.stopTimer();
            this.isExplode = true;
          }
        }, 1000);
      });
    },

    stopTimer() {
      transaction(() => {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
          this.currentSeconds = this.seconds;
        }
      });
    },

    openModal() {
      this.modalOpen = true;
    },

    closeModal() {
      this.modalOpen = false;
    },

    toggleShowTime() {
      this.timeShow = !this.timeShow;
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
    store.startTimer();
    store.closeModal();
  };

  const handleSetting = () => {
    store.openModal();
  };

  const handleShowTime = () => {
    store.toggleShowTime();
  };

  return (
    <Layout
      title={name}
      icon={icon}
      mode={mode}
      direction="column"
      onSetting={handleSetting}
      onRestart={handleStart}
    >
      <Wrapper>
        <Observer>
          {() => (
            <Dialog
              title="설정"
              open={store.modalOpen}
              onClose={store.closeModal}
              onStart={handleStart}
            >
              <FormControlLabel
                label={`시간 설정\n(1 ~ 600)`}
                labelPlacement="start"
                control={
                  <Observer>
                    {() => (
                      <TextField
                        type="text"
                        size="small"
                        value={store.seconds}
                        onChange={handleTimeChange}
                        placeholder="1 ~ 600"
                        sx={{ width: '30%' }}
                      />
                    )}
                  </Observer>
                }
              />

              <FormControlLabel
                label="시간 표시"
                labelPlacement="start"
                control={
                  <Observer>
                    {() => (
                      <Checkbox
                        sx={{
                          color: '#083d77 !important',
                          '.Mui-checked': { color: '#083d77' },
                        }}
                        onChange={handleShowTime}
                        checked={store.timeShow}
                      />
                    )}
                  </Observer>
                }
              />
            </Dialog>
          )}
        </Observer>

        <ImageContainer>
          <Observer>
            {() =>
              store.isExplode ? (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/explosion.png`}
                  alt="bomb"
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/bomb.png`}
                  alt="bomb"
                />
              )
            }
          </Observer>
          <Observer>
            {() =>
              store.timeShow && !store.isExplode ? (
                <Timer>{store.time}</Timer>
              ) : null
            }
          </Observer>
        </ImageContainer>
      </Wrapper>
    </Layout>
  );
}

export default Bomb;

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled('div')`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotate(45deg);
  }
`;

const Timer = styled('span')`
  display: inline-flex;
  width: 30vmin;
  justify-content: center;
  padding: 5px 15px;
  border-radius: 12px;
  background: #083d77;
  color: #ebebd3;
  position: absolute;
  font-size: 8vmin;
  font-weight: 600;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;
