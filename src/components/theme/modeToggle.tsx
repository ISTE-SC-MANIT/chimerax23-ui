import React, { useContext } from 'react';
import { ThemeContext } from '.';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  button: {
    overflow: 'hidden',
    all: 'unset',
    display: 'flex',
    borderRadius: 50,
    borderStyle: 'solid',
    // color: 'white',
    cursor: 'pointer',
  },
  icon: {
    transform: `translateY(-100%)`,
    transition: `transform 500ms`,
    padding: 3,
  },
  visibleIcon: {
    transform: `translateY(0)`,
  },
}));

const ThemeToggleButton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const themeCtx = useContext(ThemeContext);
  return (
    <button
      className={classes.button}
      onClick={() => {
        themeCtx.toggleMode();
        theme.palette.mode === 'light'
          ? localStorage.setItem('theme', JSON.stringify('dark'))
          : localStorage.setItem('theme', JSON.stringify('light'));
      }}
    >
      <WbSunnyIcon
        fontSize='small'
        color='inherit'
        className={clsx(
          classes.icon,
          theme.palette.mode === 'light' && classes.visibleIcon
        )}
      />
      <Brightness2Icon
        fontSize='small'
        color='inherit'
        className={clsx(
          classes.icon,
          theme.palette.mode === 'dark' && classes.visibleIcon
        )}
      />
    </button>
  );
};
export default ThemeToggleButton;
