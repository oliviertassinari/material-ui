import * as React from 'react';
import clsx from 'clsx';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { ClockViewType } from '../internal/pickers/constants/ClockType';

export const styles = (theme: Theme) =>
  createStyles({
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px',
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height']),
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: `14px solid ${theme.palette.primary.main}`,
      boxSizing: 'content-box',
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main,
    },
  });

export type ClockPointerClassKey = keyof WithStyles<typeof styles>['classes'];

export interface ClockPointerProps
  extends React.HTMLProps<HTMLDivElement>,
    WithStyles<typeof styles> {
  value: number;
  hasSelected: boolean;
  isInner: boolean;
  type: ClockViewType;
}

/**
 * @ignore - internal component.
 */
class ClockPointer extends React.Component<ClockPointerProps> {
  static getDerivedStateFromProps = (
    nextProps: ClockPointerProps,
    state: ClockPointer['state'],
  ) => {
    if (nextProps.type !== state.previousType) {
      return {
        toAnimateTransform: true,
        previousType: nextProps.type,
      };
    }

    return {
      toAnimateTransform: false,
      previousType: nextProps.type,
    };
  };

  state = {
    toAnimateTransform: false,
    // eslint-disable-next-line react/no-unused-state
    previousType: undefined,
  };

  render() {
    const { classes, hasSelected, isInner, type, value, ...other } = this.props;

    const getAngleStyle = () => {
      const max = type === 'hours' ? 12 : 60;
      let angle = (360 / max) * value;

      if (type === 'hours' && value > 12) {
        angle -= 360; // round up angle to max 360 degrees
      }

      return {
        height: isInner ? '26%' : '40%',
        transform: `rotateZ(${angle}deg)`,
      };
    };

    return (
      <div
        style={getAngleStyle()}
        className={clsx(classes.pointer, {
          [classes.animateTransform]: this.state.toAnimateTransform,
        })}
        {...other}
      >
        <div
          className={clsx(classes.thumb, {
            [classes.noPoint]: hasSelected,
          })}
        />
      </div>
    );
  }
}

export default withStyles(styles, {
  name: 'MuiClockPointer',
})(ClockPointer);
