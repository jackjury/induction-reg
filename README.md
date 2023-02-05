# inductme.live

## MVP Features

Sign The Register

- [ ] Read Statement
- [ ] Link to Slides

- [ ] Name
- [ ] Company
- [ ] Agreement
- [ ] Capture Date & Time

- [ ] Provides a final screen, now collect band

Projects

- [ ] Link to Google Slide Deck
- [ ] Sign The Register QR Code
- [ ] Export Whole Register

## 1.0 Features

Sign The Register

- [ ] Signature
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
