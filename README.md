# inductme.live

## Bug Bash

- [ ] Project statement doesn't save during set up.
- [ ] Disable the submit button on the induction form.
- [ ] Do validation on signitures.
- [ ] Make options work
- [ ] Can't untick the isLive box

## Make it V1

- [ ] Make projects either reg or online induction
  - Online
    - [ ] Choose between videos or google slides for Induction
    - [ ] Implement a delay to make sure they watched it.
      - [ ] Check tab is in foreground and pause if not.
    - [ ] NO QR Code
  - Reg
    - [ ] As is
- [ ] Add in human friendly URLS

## MVP Features

Sign The Register

- [x] Read Statement
- [x] Link to Slides

- [x] Name
- [x] Company
- [x] Agreement
- [x] Capture Date & Time

- [ ] Provides a final screen, now collect band

Projects

- [x] Link to Google Slide Deck
- [x] Sign The Register QR Code
- [x] Export Whole Register
  - [x] CSV
  - [ ] PDF

## 1.0 Features

Sign The Register

- [x] Signature
- [ ] Capture Contact Details (Phone / Email)
- [ ] Geocapture
- [ ] Generate Worker ID and Email it
- [ ] Option to save details in local storage

Projects

- [ ] Version Control On Slides
- [ ] client
- [ ] Project specific statement.
- [ ] Search Register for individual to export
- [ ] Induction Delivered By.
- [ ] Option to Archive

Validate Induction

- [ ] Set Project
- [ ] Scan A Worker ID

## DB Schema

### Tables

- [ ] users
- [x] projects
  - [x] id
  - [x] name
  - [x] client
  - [x] isLive
  - [x] statement
  - [x] user
- [x] clients
  - [x] Name
  - [x] Contact
- [x] signitures
  - [x] name
  - [ ] company
  - [x] email
  - [x] phone
  - [x] project
  - [x] induction
  - [x] signature
- [x] inductions
  - [x] google drive link
  - [x] version number
  - [x] project

## Helpful Libaries

- [ ] Signature Capture - https://www.npmjs.com/package/react-signature-canvas#api
- [ ] QR Code Generator - https://www.npmjs.com/package/qr-code-styling
- [ ] QR Code Reader
- [ ] JWTs
- https://webgazer.cs.brown.edu/
