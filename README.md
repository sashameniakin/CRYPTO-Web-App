# CRYPTO

<img width="250" alt="Bildschirmfoto 2023-01-06 um 11 11 27" src="https://user-images.githubusercontent.com/110241401/210996313-6ce3a688-7828-4367-92ba-45c5a7da6dae.png"><img width="250" alt="Bildschirmfoto 2023-01-06 um 11 10 26" src="https://user-images.githubusercontent.com/110241401/210996410-498cd3ab-86f7-449a-aad7-89b84795bcd2.png"><img width="250" alt="Bildschirmfoto 2023-01-06 um 11 10 50" src="https://user-images.githubusercontent.com/110241401/210997885-7a757791-5bee-4b2f-ac04-b34692c02b3f.png"><img width="250" alt="Bildschirmfoto 2023-01-06 um 11 11 14" src="https://user-images.githubusercontent.com/110241401/210997976-844fe9fa-b91c-4652-a7dc-99f4d63fcaf5.png">


## Tech Stack


## Styling

We removed the Next.js default styles and added Styled Components support.

You can find an initial [`GobalStyles.js`](/styles/GlobalStyles.js) in the
`/styles` directory. Storybook is already configured to respect styles from
`GlobalStyles.js`

## Mongoose connectivity

We added a mongoose connection helper function in
[`/pages/api/_db/connect-db.js`](/pages/api/_db/connect-db.js).

Please remember to wrap your API route handler functions with the `connectDB()`
helper when exporting:

```
export default connectDB(handler);
```

To use your own DB, create a `.env.local` file and add your connection string as
shown in [`.env.local.example`](/.env.local.example). Please remember to add
your database name at the end of the connection string.

We prepared a demo API route handler
[`pages/api/octopodes.js`](/pages/api/octopodes.js) and some demo data in the
[`/_data`](/_data) folder. Additionally there is a mongoose model for the demo
data in [`/pages/api/_db/models`](/pages/api/_db/models). This is just for
demonstration purposes - create your own data and models following this pattern.




