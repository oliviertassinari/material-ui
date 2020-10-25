import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { expect } from 'chai';
import { spy, useFakeTimers, SinonSpy, SinonFakeTimers } from 'sinon';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@material-ui/lab/DesktopDateTimePicker';
import StaticDateTimePicker from '@material-ui/lab/StaticDateTimePicker';
import DayJsAdapter from '../dateAdapter/dayjs';
import { adapterToUse, getByMuiTest, createPickerRender } from '../internal/pickers/test-utils';

describe('<DateTimePicker />', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers(new Date('2018-01-01T00:00:00.000').getTime());
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createPickerRender({ strict: false });

  it('opens dialog on textField click for Mobile mode', () => {
    render(
      <MobileDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(props) => <TextField autoFocus {...props} />}
      />,
    );

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('opens dialog on calendar button click for Mobile mode', () => {
    render(
      <DesktopDateTimePicker
        value={null}
        onChange={() => {}}
        renderInput={(props) => <TextField autoFocus {...props} />}
      />,
    );

    fireEvent.click(screen.getByLabelText(/choose date/i));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('allows to select full date end-to-end', () => {
    let onChangeMock: SinonSpy<any> = spy();
    const clockTouchEvent = {
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    };

    function DateTimePickerWithState() {
      const [date, setDate] = React.useState<Date | null>(null);
      onChangeMock = spy(setDate);

      return (
        <MobileDateTimePicker
          value={date}
          toolbarPlaceholder="Enter Date"
          onChange={(newDate) => onChangeMock(newDate)}
          renderInput={(props) => <TextField autoFocus {...props} />}
        />
      );
    }

    render(<DateTimePickerWithState />);
    fireEvent.click(screen.getByLabelText(/choose date/i));

    expect(getByMuiTest('datetimepicker-toolbar-date')).to.have.text('Enter Date');
    expect(getByMuiTest('hours')).to.have.text('--');
    expect(getByMuiTest('minutes')).to.have.text('--');

    // 1. Year view
    fireEvent.click(screen.getByLabelText(/switch to year view/));
    fireEvent.click(screen.getByText('2010', { selector: 'button' }));

    expect(getByMuiTest('datetimepicker-toolbar-year')).to.have.text('2010');

    // 2. Date
    fireEvent.click(screen.getByLabelText('Jan 15, 2010'));

    expect(getByMuiTest('datetimepicker-toolbar-date')).to.have.text('Jan 15');

    // 3. Hours
    fireEvent.touchMove(getByMuiTest('clock'), clockTouchEvent);
    fireEvent.touchEnd(getByMuiTest('clock'), clockTouchEvent);

    expect(getByMuiTest('hours')).to.have.text('11');

    // 4. Minutes
    fireEvent.touchMove(getByMuiTest('clock'), clockTouchEvent);
    fireEvent.touchEnd(getByMuiTest('clock'), clockTouchEvent);

    expect(getByMuiTest('minutes')).to.have.text('53');

    fireEvent.click(screen.getByText(/ok/i));
    expect(onChangeMock.calledWith(new Date('2010-01-15T11:53:00.000'))).to.be.equal(true);
  });

  it('prop: open – overrides open state', () => {
    render(
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        open
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
      />,
    );

    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('prop: onCloseMock – dispatches on close request', () => {
    const onCloseMock = spy();
    render(
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        open
        onClose={onCloseMock}
        onChange={() => {}}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock.callCount).to.equal(1);
  });

  it('prop: dateAdapter – allows to override date adapter with prop', () => {
    render(
      <DesktopDateTimePicker
        open
        renderInput={(props) => <TextField {...props} />}
        onChange={() => {}}
        dateAdapter={new DayJsAdapter({ locale: 'ru' })}
        disableMaskedInput
        value={dayjs('2018-01-15T00:00:00.000Z')}
      />,
    );

    expect(screen.getByText('январь')).toBeVisible();
  });

  it('prop: mask – should take the mask prop into account', () => {
    render(
      <DesktopDateTimePicker
        renderInput={(props) => <TextField autoFocus {...props} />}
        ampm={false}
        inputFormat="mm.dd.yyyy hh:mm"
        mask="__.__.____ __:__"
        onChange={() => {}}
        value={null}
      />,
    );

    const textbox = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(textbox, {
      target: {
        value: '12',
      },
    });

    expect(textbox.value).to.equal('12.');
  });

  it('prop: maxDateTime – minutes is disabled by date part', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="minutes"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={adapterToUse.date('2018-01-01T12:00:00.000Z')}
        minDateTime={adapterToUse.date('2018-01-01T12:30:00.000Z')}
      />,
    );

    await waitFor(() => screen.getByRole('dialog'));

    expect(screen.getByLabelText('25 minutes')).to.have.attribute('aria-disabled', 'true');
    expect(screen.getByLabelText('35 minutes')).to.have.attribute('aria-disabled', 'false');
  });

  it('prop: minDateTime – hours is disabled by date part', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        ampm={false}
        renderInput={(props) => <TextField {...props} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
        minDateTime={adapterToUse.date('2018-01-01T12:30:00.000Z')}
      />,
    );

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByLabelText('11 hours')).to.have.attribute('aria-disabled', 'true');
  });

  it('shows ArrowSwitcher on ClockView disabled and not allows to return back to the date', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
      />,
    );

    await waitFor(() => screen.getByRole('dialog'));
    expect(screen.getByLabelText('open previous view')).to.have.attribute('disabled');
  });

  it('allows to switch using ArrowSwitcher on ClockView', async () => {
    render(
      <DesktopDateTimePicker
        open
        openTo="hours"
        onChange={() => {}}
        renderInput={(props) => <TextField {...props} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
      />,
    );

    await waitFor(() => screen.getByRole('dialog'));

    fireEvent.click(screen.getByLabelText('open next view'));
    expect(screen.getByLabelText('open next view')).to.have.attribute('disabled');
  });

  it('allows to select the same day and move to the next view', () => {
    const onChangeMock = spy();
    render(
      <StaticDateTimePicker
        onChange={onChangeMock}
        renderInput={(props) => <TextField {...props} />}
        value={adapterToUse.date('2018-01-01T00:00:00.000Z')}
      />,
    );

    fireEvent.click(screen.getByLabelText('Jan 1, 2018'));
    expect(onChangeMock.callCount).to.equal(1);

    expect(screen.getByLabelText(/Selected time/)).toBeVisible();
  });
});
