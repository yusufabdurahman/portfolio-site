# Express Portfolio Site (INFR3120 Assignment 2)

Personal portfolio built with **Node.js**, **Express** and the **EJS** templating engine.

- Live site: `TODO: paste your Render URL`
- Repository: `TODO: paste your GitHub URL`

## Pages and routes

All routes are defined in `routes/index.js` and each one calls `res.render(...)`.

| Route | View | Purpose |
|-------|------|---------|
| `GET /` | `views/index.ejs` | Home page |
| `GET /about` | `views/about.ejs` | About Me |
| `GET /projects` | `views/projects.ejs` | Projects |
| `GET /contact` | `views/contact.ejs` | Contact Me form |
| `POST /contact` | `views/contact.ejs` | Validates the form and shows a thank-you message |

## Features

- Dark / light theme switch (saved in `localStorage`)
- Typing-effect hero and a "code window" built from the profile data
- Animated stat counters and scroll-reveal animations
- Skills, journey timeline and quick facts on the About page
- Project filter buttons (by technology) on the Projects page
- Contact form with server-side validation and a copy-email button
- Reusable EJS partials: `header`, `footer`, `skills`, `project-card`
- Custom error page showing the real status code

All content (name, links, projects, timeline) comes from the objects at the top of `routes/index.js`.

## Project structure

```
app.js                  Express app setup (view engine, static files, routers, error handler)
bin/www                 HTTP server entry point (reads PORT from the environment)
routes/index.js         All page routes + the profile/project data shown in the views
routes/users.js         Default file created by express-generator
views/partials/         header.ejs (navbar), footer.ejs (GitHub + LinkedIn links), skills.ejs, project-card.ejs
views/*.ejs             Page templates; each includes the header and footer partials
public/stylesheets/     Custom CSS (style.css)
public/javascripts/     Client-side JS (main.js)
public/images/          Image assets
```

## How it was set up

1. Generated with the Express Generator using EJS: `npx express-generator --view=ejs`
2. Installed dependencies: `npm install`
3. Moved the site into the generated structure (`routes/`, `views/`, `public/`).
4. Added Bootstrap 5 and Font Awesome through CDN links in `views/partials/header.ejs`.
5. Created a shared layout using EJS partials (`header.ejs` and `footer.ejs`).
6. Pushed to GitHub and deployed on Render.

## Run locally

```
npm install
npm start
```

Then open http://localhost:3000

## Deploying on Render

1. Push this repository to GitHub (public).
2. On Render, choose **New > Web Service** and connect the repository.
3. Build command: `npm install`  Start command: `npm start`
4. Deploy and copy the live URL into this README.

## External code and citations

| Source | Author | Where it is used |
|--------|--------|------------------|
| [Express Generator](https://expressjs.com/en/starter/generator.html) | Express / OpenJS Foundation | Base structure: `app.js`, `bin/www`, `routes/users.js` |
| [Bootstrap 5.3.3](https://getbootstrap.com) | Bootstrap authors | Layout, navbar, cards, forms (CDN link in `header.ejs`) |
| [Font Awesome 6.5.2 Free](https://fontawesome.com) | Fonticons, Inc. | Icons (CDN link in `header.ejs`) |
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) fonts | Florian Karsten / JetBrains (via Google Fonts) | Page typography (link in `header.ejs`) |
| Course lecture material | INFR3120 instructor | Express/EJS routing and partial patterns |

All other code (routes, views, CSS, JS, SVG avatar) was written for this assignment.
