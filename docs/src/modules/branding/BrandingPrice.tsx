import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  link: {
    textDecoration: 'none',
    borderBottom: '2px solid #001E3C',
  },
});

const benefits = [
  {
    image: '/static/branding/pricing-ssi/Path.svg',
    color: undefined,
    description: 'Faster development process with pre-built elements.',
    order: { xs: 1, sm: 2, lg: 1 }
  },
  {
    image: '/static/branding/pricing-ssi/icons8-web-design.svg',
    color: 'info',
    description: 'Highly customisable components.',
    order: { xs: 2, sm: 1, lg: 2 }
  },
  {
    image: '/static/branding/pricing-ssi/icons8-trust.svg',
    color: undefined,
    description: 'Strong community numbering 1M developers.',
    order: { xs: 3 }
  },
  {
    image: '/static/branding/pricing-ssi/Combined Shape.svg',
    color: 'info',
    description: (
      <React.Fragment>
        {' '}
        Structured support documentation to help you{' '}
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />
        <Link href="#" underline="always">
          {' '}
          Get started.{' '}
        </Link>
      </React.Fragment>
    ),
    order: { xs: 4 }
  },
];
function BrandingPrice(props) {
  const { classes } = props;
  return (
    <Box>
      <Container>
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: '#001E3C',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '1.111',
            fontSize: '28px',
            letterSpacing: '-1px',
            maxWidth: '570px',
            margin: '80px auto 48px',
          }}
        >
          Benefits included with{' '}
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />
          all the plans
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit) => (
            <Grid
              item
              container
              direction="column"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              sx={{ alignItems: 'center', order: benefit.order }}
            >
              <Avatar
                sx={{
                  mb: 3,
                  bgcolor: benefit.color === 'info' ? 'vividBlue' : 'primary.main',
                  width: 80,
                  height: 80,
                }}
              >
                <img loading="lazy" src={benefit.image} alt="" />
              </Avatar>
              <Typography
                component="p"
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '18px',
                  lineHeight: '24px',
                  textAlign: 'center',
                  color: '#001E3C',
                  margin: '0 auto',
                }}
              >
                {benefit.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
BrandingPrice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandingPrice);
