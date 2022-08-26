import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  // console.log(adv);
  return (
    <div className='player-wrapper'>
      <>
        <ReactPlayer
          className='react-player'
          playing={true}
          loop={true}
          controls
          // url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          url={url}
          width='100%'
          height='100%'

          // playIcon
          // type='video/x-matroska'
        />
      </>
    </div>
  );
};

export default VideoPlayer;
