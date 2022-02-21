<h1 align="center">Welcome to freshworks-api 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/freshworks-api" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/freshworks-api.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Provides a series of methods for interacting with the Freshworks CRM REST api.

> Contributions welcome.

## Install

```sh
yarn install freshworks-api
```

## Use

```sh
const sdk = new FreshWorksCrm({authToken: <your freshworks api token here>, freshworksSubdomain: <your freshworks CRM subdomain here>});

let contacts = sdk.searchForContacts('search query');
let singleContact = sdk.getContact('contact-id');
let newContact = sdk.createContact({});
let updatedContact = sdk.updateContact({});

let accounts = sdk.searchForAccounts('search query');
let newAccount = sdk.createAccount({});
let updatedAccount = sdk.updateAccount({});

let deals = sdk.searchForDeals('search query');
let singleDeal = sdk.getDeal('deal-id');
let newDeal = sdk.createDeal({});
let updatedDeal = sdk.updateDeal({});

let newNote = sdk.createNote({})
```

## Author

👤 **Edmund Munday <edmund@need2know.io>**

* Website: http://need2know.io

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
