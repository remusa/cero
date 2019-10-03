# [Cero - A fasting tracker](https://cero.netlify.com/)

Cero is a fasting tracker built in React, Node.js (Express.js), GraphQL and TypeScript.

* [Cero - A fasting tracker](#cero---a-fasting-tracker)
    * [Front-end](#front-end)
    * [Back-end](#back-end)
  * [Development](#development)
  * [Front-end](#front-end-1)
  * [Back-end](#back-end-1)
    * [Deploy the servers](#deploy-the-servers)
      * [1. Deploy Prisma server](#1-deploy-prisma-server)
      * [2. Deploy Yoga server](#2-deploy-yoga-server)
    * [Run development server](#run-development-server)

### Front-end

* TypeScript
* React (with hooks!)
* Apollo Client for GraphQL queries and mutations
* Context API for light/dark themes and authentication
* Styling with styled-components and SASS
* Formik + Yup for easy form management and validation
* React-Spring for animations
* Deploying to Netlify
* Charting done with Chart.js
* Other awesome packages used: date-fns, react-tostify, react-spinners, react-particles-js and nprogress.

### Back-end

* Node.js (JavaScript)
* GraphQL Yoga (Express server)
* Prisma (Database interface)
* Authentication done using JWT (JSON Web Tokens)
  * Users can sign up, login and request password reset via email.
* Authorization via permissions
* Using SendGrid for password resets
* Security features: helmet + CORS
* Password hashing: argon2 (previously used bcrypt)

## Development

## Front-end

```
  cd frontend
  npm install
  npm run dev
```

App will run in `localhost:3000`

## Back-end

### Deploy the servers

1. Prisma server
    * Database
2. Yoga server
    * Mutation and Query resolvers

#### 1. Deploy Prisma server

* Create server in `app.prisma.io`
* Create a new `service`
* Deploy Prisma to production server:

```bash
prisma deploy -- -n
npm run deploy -- -n
```

* Choose name for service: ex: `app-name-prod`
* Choose name for stage: ex: `prod`
* Copy Prisma admin url
* Add an `.env` file:
    * Copy Prisma *endpoint* to `.env`
    * Create `secret`

#### 2. Deploy Yoga server

* Download `heroku-cli`:

```bash
heroku --help
heroku login
```

* Create Heroku app: `heroku apps:create [app-name]-prod`
* Copy yoga server URL and git branch
* Add `heroku-backend` branch: `git remote add heroku-backend [git-branch]`
    * Note: to change url: `git remote set-url [branch] [new-remote-url]`
* Deploy a subfolder in monorepo: `git subtree push --prefix [folder_name] [remote_name] [local_branch_name]`
    * Example: `git subtree push --prefix backend heroku-backend master`
* Check logs:
```bash
heroku logs --tail
heroku logs --tail --app [app-name-prod]
```

* Add environment variables to yoga production server in Heroku.
* In case of errors click *Options -> Restart all dynos* or:
    1. Commit changes
    2. Push changes again to `heroku-backend (subtree)`
    3. `heroku logs --tail --app [app-name-prod]`

### Run development server

```bash
  cd backend
  npm install
  npm run dev
```

* Server will run in `localhost:4444`
