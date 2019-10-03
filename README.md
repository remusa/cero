# [Cero - A fasting tracker](https://cero.netlify.com/)

Cero is a fasting tracker built in React, Node.js (Express.js), GraphQL and TypeScript.

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

```
  cd backend
  npm install
  npm run dev
```

Server will run in `localhost:4444`
