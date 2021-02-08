import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

const benefits = [
  {
    image: '/static/branding/pricing-ssi/Path.svg',
    color: undefined,
    description: 'Faster development process with pre-built elements.',
    order: { xs: 1, sm: 2, lg: 1 },
  },
  {
    image: '/static/branding/pricing-ssi/icons8-web-design.svg',
    color: 'info',
    description: 'Highly customisable components.',
    order: { xs: 2, sm: 1, lg: 2 },
  },
  {
    image: '/static/branding/pricing-ssi/icons8-trust.svg',
    color: undefined,
    description: 'Strong community numbering 1M developers.',
    order: { xs: 3 },
  },
  {
    image: '/static/branding/pricing-ssi/Combined Shape.svg',
    color: 'info',
    description: (
      <React.Fragment>
        {' '}
        Structured support documentation to help you{' '}
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />
        <Link href="/getting-started/usage/"> Get started.</Link>
      </React.Fragment>
    ),
    order: { xs: 4 },
  },
];

function Benefits() {
  return (
    <Container>
      <Typography
        variant="h3"
        component="div"
        sx={{ textAlign: 'center', mt: 8, mb: 6 }}
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
            lg={3}
            sx={{ alignItems: 'center', order: benefit.order }}
            key={benefit.image}
          >
            <Avatar
              sx={{
                mb: 2,
                bgcolor: benefit.color === 'info' ? 'vividBlue' : 'primary.main',
                width: 80,
                height: 80,
              }}
            >
              <img loading="lazy" src={benefit.image} alt="" />
            </Avatar>
            <Typography component="p" sx={{ textAlign: 'center' }}>
              {benefit.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default function Pricing() {
  return (
    <BrandingRoot>
      <Benefits />
    </BrandingRoot>
  );
}
