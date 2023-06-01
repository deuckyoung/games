/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { Layout } from '../../pages';
import { Observer, useLocalObservable } from 'mobx-react';
import { Fragment, useEffect, useRef } from 'react';
import { transaction } from 'mobx';
import { Button } from '@mui/material';

const cars = [
  { id: 0, color: 'green', position: 0, distance: 0, isMovable: true },
  { id: 1, color: 'orange', position: 0, distance: 0, isMovable: true },
  { id: 2, color: 'yellow', position: 0, distance: 0, isMovable: true },
];

function Race({ name, icon, mode }) {
  const trackRef = useRef(null);

  const store = useLocalObservable(() => ({
    carSize: 50,
    trackWidth: 0,
    cars,
    orders: new Map(),
    tick: 0,

    timer: null,

    setTrackWidth(width) {
      this.trackWidth = width - this.carSize;
    },

    _clear({ resetCars }) {
      transaction(() => {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
          this.tick = 0;
        }

        if (resetCars) {
          this.orders = new Map();
          this.cars = cars;
        }
      });
    },

    start() {
      this._clear({ resetCars: true });

      this.timer = setInterval(() => {
        if (this._isFinished) {
          this._clear({ resetCars: false });
        }

        this._update();
      }, 40);
    },

    reset() {
      this._clear({ resetCars: true });
    },

    getOrder(id) {
      return this.orders.get(id)?.order ?? '';
    },

    get _isFinished() {
      return this.orders.size === this.cars.length;
    },

    _update() {
      transaction(() => {
        for (let i = 0; i < this.cars.length; i++) {
          const car = this.cars[i];
          if (!car.isMovable) continue;
          if (this.tick % 10 === 0)
            car.distance = Math.floor(Math.random() * 10);

          this.tick += 1;
          const newPosition = car.position + car.distance;
          if (newPosition >= this.trackWidth) {
            car.position = this.trackWidth;
            car.isMovable = false;
            this.orders.set(car.id, {
              id: car.id,
              order: this.orders.size + 1,
            });
          } else {
            car.position = newPosition;
          }
        }
      });
    },
  }));

  useEffect(() => {
    if (trackRef?.current) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          store.setTrackWidth(width);
        }
      });
      observer.observe(trackRef.current);

      return () => observer.disconnect();
    }
  }, [trackRef]);

  const handleSetting = () => {};

  const handleStart = () => {
    store.start();
  };

  const handleReset = () => {
    store.reset();
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
      <Track ref={trackRef}>
        <Observer>
          {() =>
            store.cars.map(({ color, position, id, isMovable }) => (
              <Fragment key={id}>
                <Car
                  // isAnimation={isMovable}
                  size={store.carSize}
                  color={color}
                  position={position}
                  id={id}
                >
                  {isMovable ? null : (
                    <strong>{store.getOrder(id) ?? ''}</strong>
                  )}
                </Car>
              </Fragment>
            ))
          }
        </Observer>
      </Track>
      <div>
        <Button variant="contained" onClick={handleStart}>
          시작
        </Button>
        <Button variant="contained" onClick={handleReset}>
          초기화
        </Button>
      </div>
    </Layout>
  );
}

export default Race;

const Track = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: gray;
  justify-content: space-around;
  position: relative;
`;

const Car = styled('div')`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  /* transition: ${({ isAnimation }) =>
    isAnimation ? 'margin 0.2s linear' : 'none'}; */
  margin-left: ${({ position }) => position}px;

  > strong {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
