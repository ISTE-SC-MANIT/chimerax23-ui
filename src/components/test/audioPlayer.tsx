import * as React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
interface AudioProps {
  src: string;
}

const Player: React.FC<AudioProps> = ({ src }) => {
  return (
    <>
      <AudioPlayer
        autoPlay={false}
        src={src}
        onPlay={(e) => console.log('onPlay')}
      />
    </>
  );
};

export default Player;
