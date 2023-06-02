import { createTheme, css } from '@mui/material';

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: css`
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #ebebd3;
          color: #083d77;
        `,
      },
    },

    MuiButton: {
      styleOverrides: {
        contained: css`
          background-color: #083d77;
          color: #ebebd3;
          font-weight: 700;

          :hover {
            background-color: #083d77;
            color: #ebebd3;
          }
        `,
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: css`
          width: 30px;
          height: 30px;
          background: #083d77;
          color: #ebebd3;
          box-shadow: 0px 3px 0px 1px rgb(161 161 161);

          :hover,
          :active {
            background-color: #083d77;
          }

          :active {
            transform: translateY(1px);
            box-shadow: 0px 2px 0px 1px rgb(161 161 161);
          }

          > svg {
            font-size: 20px;
          }
        `,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: css`
          width: 100%;
        `,
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: css`
          display: flex;
          align-items: end;
          font-size: 25px;
          justify-content: space-between;
          border-bottom: 1px solid #dddddd;
          line-height: 1;
          font-weight: 700;
        `,
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: css`
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
          border-bottom: 1px solid #dddddd;
        `,
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: css`
          justify-content: center;
          font-size: 25px;
        `,
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: css`
          input {
            height: 25px;
            font-size: 15px;
          }
        `,
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: css`
          gap: 20px;
          justify-content: flex-end;
        `,
        label: css`
          font-size: 15px;
          white-space: pre;
        `,
      },
    },
  },
});

export default theme;
