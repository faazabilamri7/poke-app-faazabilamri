import React from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

interface PlaceholderProps {
  width: number;
  height: number;
}

const Placeholder: React.FC<PlaceholderProps> = ({width, height}) => (
  <ShimmerPlaceholder
    style={{width, height, borderRadius: width / 2}}
    //TODO : fix the TS rules
    autoRun
  />
);

export default Placeholder;
