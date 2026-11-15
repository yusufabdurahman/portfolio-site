var express = require('express');
var router = express.Router();

/*
 * ---------------------------------------------------------------
 *  EDIT YOUR DETAILS HERE. Every page and the footer read from
 *  these objects, so you only change your info in one place.
 * ---------------------------------------------------------------
 */
const profile = {
  name: 'Yusuf Abdurahman',
  role: 'Computer Science Student',
  tagline: 'I build clean, responsive web apps with Node.js, Express and JavaScript.',
  location: 'Ontario, Canada',
  email: 'your-email@example.com',             // TODO: replace
  github: 'https://github.com/your-username',   // TODO: replace
  linkedin: 'https://www.linkedin.com/in/your-profile/', // TODO: replace
  about: [
    'I am a student at Ontario Tech University studying software and web development. I enjoy turning ideas into working, user-friendly websites.',
    'This portfolio was built for INFR3120 using Node.js, Express, the EJS templating engine, Bootstrap and Font Awesome.'
  ],
  skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'EJS', 'Bootstrap', 'Git & GitHub'],
  education: [
    { school: 'Ontario Tech University', detail: 'Bachelor of Information Technology (in progress)', years: '2023 - Present' } // TODO: edit
  ]
};

// TODO: replace these placeholder projects with your real ones
const projects = [
  {
    title: 'Portfolio Website (Assignment 1)',
    icon: 'fa-solid fa-globe',
    description: 'My first portfolio, built with plain HTML and CSS.',
    tags: ['HTML', 'CSS'],
    link: profile.github
  },
  {
    title: 'Express Portfolio (this site)',
    icon: 'fa-brands fa-node-js',
    description: 'A multi-page site using Express routes, EJS partials and Bootstrap, deployed to the cloud.',
    tags: ['Node.js', 'Express', 'EJS', 'Bootstrap'],
    link: profile.github
  },
  {
    title: 'Your Next Project',
    icon: 'fa-solid fa-code',
    description: 'Describe a course project, hackathon build or personal app here.',
    tags: ['JavaScript'],
    link: profile.github
  }
];

// Make "profile" available in every EJS view (header, footer and pages)
router.use(function (req, res, next) {
  res.locals.profile = profile;
  res.locals.currentPath = req.path;
  next();
});

/* GET Home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home', projects: projects.slice(0, 3) });
});

/* GET About Me page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects', projects: projects });
});

/* GET Contact Me page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact Me', sent: false, form: {} });
});

/* POST Contact form: validates input and re-renders the page with a thank-you message.
   (Messages are not stored or emailed; this is a demo of handling form data in Express.) */
router.post('/contact', function (req, res, next) {
  const form = {
    name: (req.body.name || '').trim(),
    email: (req.body.email || '').trim(),
    message: (req.body.message || '').trim()
  };
  const valid = form.name && /^\S+@\S+\.\S+$/.test(form.email) && form.message;

  res.render('contact', {
    title: 'Contact Me',
    sent: Boolean(valid),
    error: valid ? null : 'Please fill in your name, a valid email and a message.',
    form: valid ? {} : form
  });
});

module.exports = router;
