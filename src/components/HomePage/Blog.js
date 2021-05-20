import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Book Beds', url: '#' },
  { title: 'Scan Centers', url: '#' },
  { title: 'Vaccine Centers', url: '#' },
  { title: 'Quarantine Centers', url: '#' },
  { title: 'Relief Centers', url: '#' },
  { title: 'Fact Check', url: '#' },
  { title: 'Health Care', url: '#' },
  { title: 'About COVID', url: '#' },
];

const mainFeaturedPost = {
  title: 'COVID - 19',
  description:
    "Finding beds for COVID has never been easier before. In this application you can find all the vacant beds near you",
  image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=cdc-w9KEokhajKw-unsplash.jpg',
  imgText: 'main image description',
  linkText: 'Book Beds',
};

const featuredPosts = [
  {
    title: 'How COVID spreads ?',
    date: 'Nov 12',
    description:
      'This article gives clear picture on how COVID spreads and what measures to avoid the spread!',
    image: 'https://www.acepnow.com/wp-content/uploads/2020/03/coronavirus-shutterstock_1643947495_WEB-1.jpg',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'http://hosana-medica.com/wp-content/uploads/2020/03/CORONA-HD.jpg',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Helping patients infected with COVID-19 find vacent beds in hospitals.',
  archives: [
    { title: 'March 2021', url: '#' },
    { title: 'February 2021', url: '#' },
    { title: 'January 2021', url: '#' },
    { title: 'December 2020', url: '#' },
    { title: 'November 2020', url: '#' },
    { title: 'October 2020', url: '#' },
    { title: 'September 2020', url: '#' },
    { title: 'August 2020', url: '#' },
    { title: 'July 2020', url: '#' },
    { title: 'June 2020', url: '#' },
    { title: 'May 2020', url: '#' },
    { title: 'April 2020', url: '#' },
  ],
  social: [
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Quarantine Me" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="COVID Tracker" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Quarantine Me" description="Let's save Lives!" />
    </React.Fragment>
  );
}
