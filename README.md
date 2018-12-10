# Snowservations Backend

## Quickstart

```
  yarn install
  yarn run dev
```

## Available Commands

1. `yarn run start` - starts the production server

2. `yarn run dev` - starts the development server with hot reloading enabled

3. `yarn run test` - start the test runner

4. `yarn run lint` - runs linter to check for lint errors

5. `yarn run build:server` - bundles the code and starts the production server


## How to Deploy

1. Make sure you remove all variables from the file `devConfig.js`. You can set them all to blank strings.
2. In order to deploy to QA, checkout QA branch and merge dev changes. In order to deploy to Prod, first merge dev changes to QA then merge QA change to Prod. Never merge dev with prod, it should always go dev > QA > Prod.
3. Once you are properly merged and on the correct branch, commit any changes with the comment `Merge dev` or `Merge QA`.
4. Run `yarn run build:server` in order to build the `dist` folder which will be used to deploy on Elastic Beanstalk.
5. After the build is complete, add and commit changes using comment `Build`.
6. Run `eb deploy` in order to deploy the new backend to AWS Elastic Beanstalk. The file `.elasticbeanstalk/config.yml` is how the code knows where to deploy the file. You can also see the two environments, prod and qa, in Elastic Beanstalk. Make sure you are in the us-east-1 region, or you will not be able to see them.
7. Once the deploy is complete, your backend changes are live!

