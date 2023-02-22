import React from 'react';
import { Typography, Divider } from '@mui/material';
import moment from 'moment';
import { GetQuizStartTimeQuery } from '../../__generated__/GetQuizStartTimeQuery';
import axios from 'axios';

interface Props {
  startTime: GetQuizStartTimeQuery | undefined;
  onTimeUp: () => void;
}

const Timer: React.FC<Props> = ({ startTime, onTimeUp }) => {

  const [findCurrentTime, setFindCurrentTime] = React.useState<Date>(new Date());
  const currTime = async () => {
    try {
      await axios.get('https://worldtimeapi.org/api/timezone/Asia/Kolkata').then((response) => {
        setFindCurrentTime(response.data.datetime)
        // console.log(response.data)
      })

    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    currTime()
  }, [])


  const currentTime = moment(findCurrentTime);
  const quizStartTime = moment(startTime?.getQuizDetails.quizStartTime);
  const minutesDiff = currentTime.diff(quizStartTime, 'minutes');
  const secondDiff = currentTime.diff(quizStartTime, 'second');
  // console.log(minutesDiff);
  const [time, setTime] = React.useState(
    !Boolean(isNaN(minutesDiff))
      ? { minute: 29 - minutesDiff, seconds: 60 - (secondDiff % 60) }
      : { minute: 30, seconds: 0 }
  );
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (time.seconds > 0) {
        setTime({ ...time, seconds: time.seconds - 1 });
      }
      if (time.seconds === 0) {
        if (time.minute <= 0) {
          onTimeUp();
          clearInterval(timer);
        } else {
          setTime({ minute: time.minute - 1, seconds: 59 });
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <>
      {' '}
      <Typography component='h1' variant='h5'>
        {time.minute === 0 && time.seconds === 0 ? (
          <>Time&apos;s Up!</>
        ) : (
          <>
            Time Remaining: {time.minute}:
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
          </>
        )}
      </Typography>
    </>
  );
};

export default Timer;
