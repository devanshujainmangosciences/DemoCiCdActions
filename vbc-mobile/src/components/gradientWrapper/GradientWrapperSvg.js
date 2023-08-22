/**
 * Gradient wrapper svg file
 * react component
 */
import React from 'react';
import Svg, {Defs, RadialGradient, Stop, Path} from 'react-native-svg';

const GradientWrapperSvg = (props) => {
  return (
    <Svg
      data-name="Group 1720"
      viewBox={`0 0 400 800`}
      preserveAspectRatio="none"
      {...props}
    >
      <Defs>
        <RadialGradient
          id="a"
          cx={0.068}
          cy={0.072}
          r={0.712}
          gradientTransform="matrix(.982 -.188 .108 .563 -.003 .029)"
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#ddeaff" />
          <Stop offset={1} stopColor="#eff0f2" />
        </RadialGradient>
        <RadialGradient id="b" cx={1} cy={1} r={0.712}>
          <Stop offset={0} stopColor="#ffd4c9" />
          <Stop offset={1} stopColor="#eff0f2" stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Path data-name="Rectangle 136" fill="url(#a)" d="M0 0H400V800H0z" />
      <Path data-name="Rectangle 148" fill="url(#b)" d="M0 0H400V800H0z" />
    </Svg>
  );
};

export default GradientWrapperSvg;
