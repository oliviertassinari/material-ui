import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import styledEmotion from '@emotion/styled';
import { ThemeProvider as EmotionTheme } from 'emotion-theming';

const materialSystemTheme = createMuiTheme();
const StyledDiv = styledEmotion('div')({
  color: 'red',
  backgroundColor: 'blue',
  fontFamily: 'Roboto',
  fontSize: 16,
  padding: 16,
});

export default function BoxStyledAlternative() {
  return (
    <EmotionTheme theme={materialSystemTheme}>
      {new Array(1000).fill().map(() => (
        <StyledDiv>
          Styled alternatve
        </StyledDiv>
      ))}
    </EmotionTheme>
  );
}
