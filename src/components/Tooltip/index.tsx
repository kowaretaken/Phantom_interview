import React from 'react';
import '../../theme/theme.css';
import './tooltip.css';
import TooltipS from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

interface TooltipProps {
  title?: string;
  children?: any;
}

export const Tooltip = ({ title = 'Tooltip text', children }: TooltipProps) => {
  return (
    <div className="tooltip">
      <TooltipS
        componentsProps={{
          tooltip: {
            sx: {
              minWidth: '261px',
              borderRadius: '12px',
              opacity: 1,
              border: 1,
              borderColor: 'borderColor',
            },
          },
        }}
        title={<div className="tableAssetsTooltip">{title}</div>}
      >
        <InfoIcon
          sx={{
            width: '0.6em',
            height: 'auto',
            margin: 'auto',
            paddingTop: '0.1em',
          }}
        />
      </TooltipS>
    </div>
  );
};
