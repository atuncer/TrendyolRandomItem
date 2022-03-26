# Trendyol Random Item
[![Trendyol Rastgele](./public/images/logo.png)](https://trendyol-rastgele.herokuapp.com/)

A webapp that finds random items from Trendyol.

[Check the website](https://trendyol-rastgele.herokuapp.com/)

## :ledger: Index

- [About](#beginner-about)
- [How it Works](#zap-how-it-works)
- [Usage](#flashlight-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [Deployment](#rocket-deployment)  
- [Contribution](#fire-contribution)

##  :beginner: About
A Node.js project that built with Express js. The Express js server has RESTful APIs that returns a random item according to the selected category e.g. [Women Category](https://trendyol-rastgele.herokuapp.com/category/1). Frontend is built with Vue.js.

## :zap: How it Works
Python web scraper scrapes all the existing sub-categories and their corresponding API urls. Express js server selects a random sub-category for the selected category, calls the public API of Trendyol, and returns a random item.

##  :flashlight: Usage
###  :electric_plug: Installation
```
$ npm install
```

###  :package: Commands
- To start the project.
```
$ npm run devStart
```
   and open http://127.0.0.1:3000 on your browser.

- To run the scraper and scrape the latest categories from Trendyol.
```
$ python(3) scraper.py 
```

##  :wrench: Development

### :notebook: Pre-Requisites
- Node.js
- Python 3

###  :nut_and_bolt: Development Environment
Clone, install, and run.


### :rocket: Deployment
I am hosting the [website](https://trendyol-rastgele.herokuapp.com/) on Heroku. I preferred DigitalOcean before because they offer free $100 credit for students. However my free trial has ended so I deployed it to Heroku.

This project does not require CI/CD or any complicated deployment strategies. I push to the repo from my development environment and deply it manually on Heroku's website.

Cron job used to run the scraper daily on the DigitalOcean server, So the REST API can cover 100% of the items even if a new category is created. However I cannot run it on Heroku.


##  :fire: Contribution

Your contributions are always welcome and appreciated. Following are the things you can do to contribute to this project.

 1. **Report a bug** <br>
 If you think you have encountered a bug, and I should know about it, feel free to report it [here](https://github.com/atuncer/TrendyolRandomItem/issues/new) and I will take care of it.

 2. **Request a feature** <br>
 You can also request for a feature [here](https://github.com/atuncer/TrendyolRandomItem/issues/new), and if it is viable, it will be picked for development.  

 3. **Create a pull request** <br>
 It can't get better then this, your pull request will be appreciated. You can get started by picking up any open issues from [here](https://github.com/atuncer/TrendyolRandomItem/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and make a pull request.

 > If you are new to open-source, make sure to check read more about it [here](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) and learn more about creating a pull request [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).
