# CryptoVue

https://cryptovue-pwa.netlify.app <-- Add to homescreen when prompted by the browser. Designed to be viewed as a native mobile app.

CryptoVue was created for crypto investors who need help tracking their transactions on crypto exchanges for tax purposes and for getting a high-level overview for forming better investment strategies.

## Technical Description

CryptoVue is a progressive web app powered by the Vue.js and ASP.NET Core Web API frameworks. The frontend is hosted on Netlify and the backend is hosted in Azure cloud. Data is stored with Microsoft's Cosmos DB, a No-SQL database.

## User Experience Overview

Users create an account and login. Once authenticated, users are directed to the Add Transaction page. From this page, users can search for coins and submit a form which will save the transaction. Users can view a list of all their transactions in a table below the form and delete transactions as necessary.

Users can log out from the application at any time.

Performance Snapshot page coming soon.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
