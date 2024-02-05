import React, {useState} from 'react';
import {Image, ImageStyle, View} from 'react-native';
import {SvgCssUri} from 'react-native-svg';
import {Placeholder} from '../..';

interface ImageLoaderProps {
  uri?: string | number | {uri: string} | null;
  width: number;
  height: number;
  isSvg: boolean;
  imageStyle?: ImageStyle;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  uri,
  width,
  height,
  isSvg,
  imageStyle,
}) => {
  const [loading, setLoading] = useState(true);

  const onError = (e: Error) => {
    console.log(e.message);
    setLoading(false);
  };

  const onLoad = () => {
    setLoading(false);
  };

  return (
    <View>
      {loading && <Placeholder width={width} height={height} />}
      {uri ? (
        <>
          {typeof uri === 'number' ? (
            <Image
              source={uri}
              style={{width, height, borderRadius: width / 2, ...imageStyle}}
              onLoad={onLoad}
              //TODO: fix the TS rules
              // @ts-ignore
              onError={onError}
            />
          ) : typeof uri === 'string' ? (
            isSvg ? (
              <SvgCssUri
                width={width}
                height={height}
                uri={uri}
                onError={onError}
                onLoad={onLoad}
              />
            ) : (
              <Image
                source={{uri}}
                style={{width, height, ...imageStyle}}
                //TODO: fix the TS rules
                // @ts-ignore
                onError={onError}
                onLoad={onLoad}
              />
            )
          ) : uri?.uri ? (
            <Image
              source={{uri: uri.uri}}
              style={{width, height, ...imageStyle}}
              //TODO: fix the TS rules
              // @ts-ignore
              onError={onError}
              onLoad={onLoad}
            />
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default ImageLoader;
