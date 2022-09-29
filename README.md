# Real-time Assist Demo

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SymblDev/symbl-real-time-assist)

This React App works with Symbl's APIs to showcase an example of real-time assist experience in realtime over a Dual Channel Phone call.

## Configurations

To make this app work with Symbl's API we need to set to the following environment variables before building the source.
Refer to `.env.example` to find a list of all the environment variables to set.

Create a new `.env` file with the below environment variables set to valid values.

### Credentials

Symbl APIs require `appId` and `appSecret` to authenticate the incoming requests. These can be obtained by logging into https://platform.symbl.ai.
Set the following environment variables with the above values obtained from Symbl's Platform home page.

- `REACT_APP_SYMBL_APP_ID` -- Set this to the `appId`
- `REACT_APP_SYMBL_APP_SECRET` -- Set this to the `appSecret`

### Custom Domain

If you access to custom domain configured specifically for your organization you can set the below environment variable for the React App to communicate with it.

- `REACT_APP_SYMBL_CUSTOM_DOMAIN` -- Set this to custom domain

### Summary Email-IDs

Symbl also provides a URL to a `Summary UI` which renders the conversation details with insights and transcription. This URL to render these for a specific conversation can be emailed at the end of a call.
Set the below environment variable with a comma separated list of email addresses to receive the email after a call ends.

- `REACT_APP_SUMMARY_EMAIL_LIST` -- Set this with the comma separated email list

### Default Phone Number

In case you have a default phone number to place calls to you can set the below environment variable with the phone number in the following format:
`+{country_code}{phone_number}`. Avoid any special characters.

- `REACT_APP_DEFAULT_PHONE_NUMBER` -- Set this with the default phone number you wish to call

## Building the App

To start the app for development run the below command in the root directory of the project

    npm run start

To build a production grade deployment for the app run the below command. This will create a `build` directory with the production optimized build which can be served directly.

    npm run build

NOTE: To reload any configuration changes while development restart the development server by re-running the first command.

## Support

If you require any support related to this App or any of the Symbl APIs, please reach out to us at
`support@symbl.ai`
