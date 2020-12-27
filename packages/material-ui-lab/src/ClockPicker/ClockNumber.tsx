import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { createStyles, WithStyles, withStyles, Theme, alpha } from '@material-ui/core/styles';
import { onSpaceOrEnter } from '../internal/pickers/utils';
import { useCanAutoFocus } from '../internal/pickers/hooks/useCanAutoFocus';
import { PickerSelectionState } from '../internal/pickers/hooks/usePickerState';

export interface ClockNumberProps {
  disabled: boolean;
  getClockNumberText: (currentItemText: string) => string;
  index: number;
  isInner?: boolean;
  label: string;
  onSelect: (isFinish: PickerSelectionState) => void;
  selected: boolean;
}

const CLOCK_WIDTH = 220;
const HOUR_WIDTH = 32;

export const styles = (theme: Theme) => {
  const clockNumberColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary;

  return createStyles({
    root: {
      outline: 0,
      width: HOUR_WIDTH,
      height: HOUR_WIDTH,
      userSelect: 'none',
      position: 'absolute',
      left: `calc((100% - ${HOUR_WIDTH}px) / 2)`,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: clockNumberColor,
      '&:focused': {
        backgroundColor: theme.palette.background.paper,
      },
    },
    clockNumberSelected: {
      color: theme.palette.primary.contrastText,
    },
    clockNumberDisabled: {
      pointerEvents: 'none',
      color: alpha(clockNumberColor, 0.2),
    },
  });
};

export type ClockNumberClassKey = keyof WithStyles<typeof styles>['classes'];

/**
 * @ignore - internal component.
 */
const ClockNumber: React.FC<ClockNumberProps & WithStyles<typeof styles>> = (props) => {
  const {
    disabled,
    getClockNumberText,
    index,
    isInner,
    label,
    onSelect,
    selected,
    classes,
  } = props;

  const canAutoFocus = useCanAutoFocus();
  const ref = React.useRef<HTMLSpanElement>(null);
  const className = clsx(classes.root, {
    [classes.clockNumberSelected]: selected,
    [classes.clockNumberDisabled]: disabled,
  });

  const transformStyle = React.useMemo(() => {
    const angle = ((index % 12) / 12) * Math.PI * 2 - Math.PI / 2;
    const x = ((Math.cos(angle) * (CLOCK_WIDTH - HOUR_WIDTH)) / 2) * (isInner ? 0.65 : 1);
    const y = ((Math.sin(angle) * (CLOCK_WIDTH - HOUR_WIDTH)) / 2) * (isInner ? 0.65 : 1);

    return {
      transform: `translate(${x}px, ${y + (CLOCK_WIDTH - HOUR_WIDTH) / 2}px`,
    };
  }, [index, isInner]);

  React.useEffect(() => {
    if (canAutoFocus && selected && ref.current) {
      ref.current.focus();
    }
  }, [canAutoFocus, selected]);

  return (
    <ButtonBase
      focusRipple
      centerRipple
      ref={ref}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      component="span"
      className={className}
      style={transformStyle}
      aria-label={getClockNumberText(label)}
      onKeyDown={onSpaceOrEnter(() => onSelect('finish'))}
    >
      <Typography variant={isInner ? 'body2' : 'body1'}>{label}</Typography>
    </ButtonBase>
  );
};

export default withStyles(styles, { name: 'MuiClockNumber' })(ClockNumber);
