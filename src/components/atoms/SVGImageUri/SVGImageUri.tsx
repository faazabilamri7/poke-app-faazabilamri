import * as React from 'react';
import {ActivityIndicator} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import {customTheme} from '../../../theme/customTheme';

export default function SVGImageUri({
  uri,
  width,
  height,
}: {
  uri: string;
  width: number;
  height: number;
}) {
  const [loading, setLoading] = React.useState(true);
  const onError = (e: Error) => {
    console.log(e.message);
    setLoading(false);
  };
  const onLoad = () => {
    console.log('Svg loaded!');
    setLoading(false);
  };
  return (
    <>
      <SvgCssUri
        width={width}
        height={height}
        uri={uri}
        onError={onError}
        onLoad={onLoad}
      />
      {loading && <ActivityIndicator size="large" color={customTheme.grey} />}
    </>
  );
}
