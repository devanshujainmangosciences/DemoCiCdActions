/**
 * SVG Component that mimics the design of -
 * container with shadow present mainly at
 * bottom, bottom right and bottom left.
 */
import * as React from 'react';
import Svg, {Defs, LinearGradient, Stop, G, Rect} from 'react-native-svg';

const ContainerSvg = ({props}) => {
  return (
    <Svg viewBox="0 0 350 87" preserveAspectRatio="none" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={1} stopColor="#f1f1f1" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 2642" transform="translate(-20 -523)">
        <G
          data-name="Rectangle 144"
          transform="translate(20 523)"
          stroke="#e8e8e8"
          strokeWidth={0.5}
          fill="url(#prefix__a)"
        >
          <Rect width={350} height={87} rx={24} stroke="none" />
          <Rect
            x={0.25}
            y={0.25}
            width={349.5}
            height={86.5}
            rx={23.75}
            fill="none"
          />
        </G>
        <Rect
          data-name="Rectangle 1858"
          width={340}
          height={77}
          rx={21}
          transform="translate(25 528)"
          fill="#fff"
          opacity={0.59}
        />
      </G>
    </Svg>
  );
};

export default ContainerSvg;
