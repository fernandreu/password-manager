# Password Manager

[![Build Status](https://travis-ci.com/fernandreu/password-manager.svg?branch=master)](https://travis-ci.com/fernandreu/password-manager)

Manage your own passwords on any device, with the confidence that only you have access to them.

The passwords are stored in Dropbox (with more cloud services to come), encrypted by a master password.


# Try it

Check the version hosted on GitHub Pages:

https://fernandreu.github.io/password-manager/


# Build your own

This project is a primarily serverless web app developed in Angular 7. To roll your own version, there is little 
that needs to be done in terms of setup / deployment:

1. Fork / clone this repository
2. Create your own apps in the developer page of each cloud service (only Dropbox so far)
3. Back in your repository, update the hard-coded app IDs / secrets of each cloud service
4. Make sure you have a suitable version of Node.js installed in your local machine. The CI pipeline uses version 8, but
   the latest version should work well too
5. Configure Travis-CI to automatically build / test the app when commits get pushed (just as this repository does in 
   the `gh-pages` branch)
