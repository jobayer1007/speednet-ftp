import React, { useState, useEffect, useRef } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import VideoPlayer2 from '../../components/VideoPlayer/VideoPlayer2';

const LocalVideoPlayBox = ({ item }) => {
  return (
    <>
      <VideoPlayer url={item.file_path} />
      {/* <VideoPlayer2 item={item} /> */}
    </>
  );
};

export default LocalVideoPlayBox;
