var express = require('express');
var router = express.Router();

/*
 * ---------------------------------------------------------------
 *  EDIT YOUR DETAILS HERE. Every page, the navbar and the footer
 *  read from these objects, so you only change your info in one
 *  place. Anything marked TODO is a placeholder to replace.
 * ---------------------------------------------------------------
 */
const profile = {
  name: 'Yusuf Abdurahman',
  // The hero section types through these roles one after another
  roles: ['IT Student', 'Web Developer', 'Tech Management Learner', 'Problem Solver'],
  role: 'Information Technology & Technology Management Student',
  tagline: 'I combine IT skills with a technology management mindset to build web apps that are practical, reliable and easy to use.',
  location: 'Ontario, Canada',
  availability: 'Open to internships and co-op opportunities',
  email: 'yusufabdurahman401@gmail.com',
  github: 'https://github.com/yusufabdurahman',
  linkedin: 'https://www.linkedin.com/in/yusuf-abdurahman-677ab0347/',
  photo: '/images/profile.jpg', // profile picture, served from public/images

  about: [
    'I am an Information Technology and Technology Management student at Ontario Tech University who enjoys turning ideas into working, user-friendly websites. I like understanding how things work under the hood, from the browser all the way to the server, and how technology decisions affect real users and teams.',
    'This portfolio was built for INFR3120 (Web and Scripting Programming) using Node.js, Express, the EJS templating engine, Bootstrap and Font Awesome, and it is deployed on the cloud.'
  ],

  // Animated counters on the home page (TODO: replace with your real numbers)
  stats: [
    { value: 5,  label: 'Projects built',    icon: 'fa-solid fa-code' },
    { value: 12, label: 'Technologies used', icon: 'fa-solid fa-layer-group' },
    { value: 100, suffix: '%', label: 'Curiosity', icon: 'fa-solid fa-lightbulb' },
    { value: 1,  label: 'Cloud deployment',  icon: 'fa-solid fa-cloud' }
  ],

  // "What I do" cards on the home page
  services: [
    { icon: 'fa-solid fa-server',   title: 'Build',  text: 'Server-side apps with Node.js and Express: routes, templates and clean structure.' },
    { icon: 'fa-solid fa-palette',  title: 'Design', text: 'Responsive, accessible interfaces with Bootstrap and custom CSS.' },
    { icon: 'fa-solid fa-rocket',   title: 'Ship',   text: 'Version control with Git and GitHub, then deploying live to the cloud.' }
  ],

  // Skills grouped by area (shown on Home and About)
  skillGroups: [
    { title: 'Front-end', icon: 'fa-solid fa-display',
      items: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Font Awesome'] },
    { title: 'Back-end', icon: 'fa-solid fa-server',
      items: ['Node.js', 'Express', 'EJS', 'REST routes'] },
    { title: 'Tools', icon: 'fa-solid fa-screwdriver-wrench',
      items: ['Git', 'GitHub', 'VS Code', 'Render', 'npm'] }
  ],

  // Things currently being learned (TODO: edit)
  learning: ['MongoDB', 'REST APIs', 'Authentication', 'TypeScript'],

  // Journey timeline on the About page (TODO: edit dates and details)
  timeline: [
    { when: '2023 - Present', title: 'Ontario Tech University', text: 'Studying Information Technology and Technology Management, combining technical skills with a management mindset.', icon: 'fa-solid fa-graduation-cap' },
    { when: 'Assignment 1', title: 'First portfolio', text: 'Built my first personal website using plain HTML and CSS.', icon: 'fa-brands fa-html5' },
    { when: 'Assignment 2', title: 'Express + EJS portfolio', text: 'Rebuilt the site with Express, EJS partials and Bootstrap, then deployed it live.', icon: 'fa-brands fa-node-js' },
    { when: 'Next', title: 'Full-stack projects', text: 'Adding a database and user accounts to my next app.', icon: 'fa-solid fa-database' }
  ],

  // Short personal facts (TODO: make these yours)
  funFacts: [
    { icon: 'fa-solid fa-mug-hot',   text: 'Fuelled by coffee and curiosity' },
    { icon: 'fa-solid fa-gamepad',   text: 'Your hobby here' },
    { icon: 'fa-solid fa-language',  text: 'Languages you speak here' },
    { icon: 'fa-solid fa-book-open', text: 'Currently reading: your book here' }
  ]
};

// TODO: replace these placeholder projects with your real ones.
// "demo" is optional: leave it out if a project has no live link.
const projects = [
  {
    title: 'Express Portfolio (this site)',
    icon: 'fa-brands fa-node-js',
    description: 'A multi-page portfolio using Express routes, EJS partials, Bootstrap and a dark/light theme, deployed to the cloud.',
    tags: ['Node.js', 'Express', 'EJS', 'Bootstrap'],
    repo: profile.github
    // demo: 'https://your-site.onrender.com'
  },
  {
    title: 'Portfolio Website v1',
    icon: 'fa-brands fa-html5',
    description: 'My first portfolio built with plain HTML and CSS for Assignment 1.',
    tags: ['HTML', 'CSS'],
    repo: profile.github
  },
  {
    title: 'Course Project (replace me)',
    icon: 'fa-solid fa-laptop-code',
    description: 'Describe a course project, hackathon build or personal app here: what it does and what you learned.',
    tags: ['JavaScript'],
    repo: profile.github
  },
  {
    title: 'Next Big Idea (replace me)',
    icon: 'fa-solid fa-lightbulb',
    description: 'A place for the project you are most proud of. Add the problem it solves and the tools you used.',
    tags: ['Node.js', 'JavaScript'],
    repo: profile.github
  }
];

// Make "profile" available in every EJS view (navbar, footer and pages)
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
  res.render('contact', { title: 'Contact Me', sent: false, error: null, form: {} });
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
