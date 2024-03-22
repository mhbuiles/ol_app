# How to run the project:

- Clone the repository.
- Move to src directory.
- Install dependencies: `yarn install`.
- Install json-server globally, start the server and make sure to choose port 3030.
- Add a .env file with the variable below:

  ### VITE_API_URL=http://localhost:3030

- Run command `yarn dev` in your terminal.
- Open `localhost:5173` in your browser.

# Additional notes:

-All data that is displayed in all pages (notifications, dashboard, users and projects) come from the API, there's nothing mocked.

- Styling was not a priority for this app. Good practices were followed and the app is easy to use and understand, but it does not have the best styles. Decision was made to focus on code quality and project structure. Chose Material UI as a component library to save time, but their components are wrapped into custom components, which are the ones used in other components, views and files.
- For users and projects views, tables are responsive and have horizontal scroll and pagination, to make it easier to read the information.
- The app is responsive, it works and looks good on both desktop and mobile devices.
- The API does not return a token, so a mocked token is being "created" at login, which is a combination of user and id.
- Used Vite so the server starts quickly and the app runs with latest technology.
- At all API calls, all response objects' keys are being parsed from snake_case to camelCase, using response interceptors.
- A component library was created, so those components are easily reusable where needed all across the app.
- Tanstack query is being used to handle http queries and server state, this reduces the number of API calls and the data transfer, also improving performance.
- The app is divided into authenticated app and unauthenticated app, and uses code splitting for optimization.
- There are reusable functions and hooks that were extracted to avoid re-writing code.
- Added code formatter (Prettier) and linter (ESLint).
- Due to limited time, it was not possible to implement edition and deletion of records.
- The burger menu deploys a list of links in order to navigate between the app's pages.
- The burger menu also includes a logout button, which was not requested, but it's considered importat for security reasons.
- The header also includes a beel icon, this is a button that redirects to the notifications page, where the user can see the details, time and date, and also the type of notification.
- The header includes a button with the user's initial, so this changes depending on the logged user, as the API does not return names, it shows A if it's and admin user or D if it's a dev.
- Some functions and utils include descriptions, but most of them are written in a way that's easy to understand what they do without the need of too many comments.
