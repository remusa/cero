# Deployment notes

## Deploy 3 servers

1. Prisma server
    * Database
2. Yoga server
    * Mutation and Query resolvers
3. React app
    * Next.js

## 1. Deploy Prisma server

Create server in app.prisma.io
Create service

Deploy Prisma to production server
    prisma deploy -- -n
    npm run deploy -- -n

Choose name for service: [app-name-prod]
Choose name for stage: prod

Copy Prisma admin url

Modify .env file
    Copy Prisma endpoint to .env
    Uncomment secret

## 2. Deploy Yoga server

Download heroku-cli

heroku --help
heroku login

Create Heroku app:
    heroku apps:create [app-name]-prod

Copy yoga server URL and git branch

Add 'heroku-backend' branch:
    git remote add heroku-backend [git-branch]

    Note: to change url:
        git remote set-url [branch] [new-remote-url]

Deploy a subfolder in monorepo:
    git subtree push --prefix [folder_name] [remote_name] [local_branch_name]
    git subtree push --prefix backend heroku-backend master

Check logs
    heroku logs --tail
    heroku logs --tail --app [app-name-prod]

Add environment variables to Yoga production server

In case of errors 'Restart all dynos' or:
    1. Commit changes
    2. Push changes again to heroku-backend (subtree)
    3. heroku logs --tail --app [app-name-prod]
