# How are you feeling?

Live app: https://sushilathreya.com/howareyoufeeling

## Publishing

Run `npm ci` and `npm run build`. Copy the contents of `build/` into
`howareyoufeeling/` in the `sushilathreya/personalwebsite` repository and publish
that repository's `master` branch. Do not copy a CNAME file into this directory.

The app is built with `/howareyoufeeling` as its asset path. The `gh-pages`
branch of this repository contains only a redirect to the live app.

The former `howareyoufeeling.xyz` domain currently points outside GitHub Pages;
redirecting that domain requires control of its registrar or DNS settings.

## Development

Run `npm start`.
