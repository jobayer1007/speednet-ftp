import React from 'react';
import Player from 'qier-player';

const VideoPlayer2 = ({ item }) => {
  const player = new Player({
    src: item.file_path,
  });
  return (
    <>
      {/* <video width='100%' controls>
      <source src={item.file_path} type='video/x-matroska' />
      Your browser does not support the video tag.
    </video> */}
      {/* <video width='100%' controls src={item.file_path}></video> */}(
      {/* {player} */}
      );
    </>
  );
};

export default VideoPlayer2;
