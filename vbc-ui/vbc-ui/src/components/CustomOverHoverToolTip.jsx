/*
This component HOC component used to create hover over tool tips.
props=> childern-> child jsx passed to hoc
        placement-> Where we want to place the tool tip
        show and hide are the timers should be given in ms
        toolTipText-> what content we want to display in the tooltip
*/

import {OverlayTrigger, Tooltip} from '@themesberg/react-bootstrap';
import React from 'react';

const CustomOverHoverToolTip = ({
  children,
  placement = 'top',
  show = 250,
  hide = 400,
  toolTipText = 'This is important',
}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button tooltip" {...props}>
      {toolTipText}
    </Tooltip>
  );
  return (
    <OverlayTrigger
      data-testid="overlayTrigger"
      placement={placement}
      delay={{show: show, hide: hide}}
      overlay={renderTooltip}
      toolTipText={toolTipText}>
      {children}
    </OverlayTrigger>
  );
};

export default CustomOverHoverToolTip;
