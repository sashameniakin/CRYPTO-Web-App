# Capstone-Project-Template for Octopodes

- Next.js project created with `create-next-app`
- [Default Styling (with CSS Modules) has been removed](#styling)
- [Styled Components support added](#styling)
- [Mongoose connectivity support added](#mongoose-connectivity)
- [Storybook support added](#storybook)
- [ESLint config added](#eslint)
- [React Testing Library & Jest support added](#testing)
- [Prettier config added](#prettier)

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

Run Storybook:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to inspect your components
with Storybook.

Run tests:

```bash
npm run test
# or
npm run test:watch
```

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

## Storybook

We created a demo component
[`/components/OctopusCard.js`](/components/OctopusCard.js) and corresponding
stories. Create your own stories following this pattern.

## ESLint

You can run ESLint from the terminal by typing

```bash
npm run lint
```

Please make sure that there are no linter errors before pushing to Github. Your
pull requests will report failed code quality checks otherwise.

## Testing

Please write your tests in the [`/__tests__`](/__tests__/) folder instead of
placing them next to your components. Next.js does not allow test files in its
`/pages` directory.

We prepared a demo test that tests if the Homepage renders a 🐙.

Please make sure that all tests pass before pushing to Github. Your pull
requests will report failed test runs otherwise.

## Prettier

We added a [Prettier configuration file](/.prettierrc) with basic formatting
rules. Feel free to edit these rules to your taste.

You can check the formatting of your files with `npm run prettier`

You can auto format all files in the project by calling
`npm run prettier:write`.

Please make sure that your code passes the prettier check before pushing to
Github. Your pull requests will report failed code quality checks otherwise.
