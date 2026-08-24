# Visual Archives Project
The Visual Archives Project is a website build with React using a Vite framework with the purpose of displaying data for the visual archives. The data contains information such as the measurements of the archives. 

## Deployment
Deployment Link: https://kylelin23.github.io/visualArchivesProject/

To update the deployment after you push to the repository, run `npm run deploy` and the deployment should be updated. 

## Data Flow
On the data side, a treemap is being used to represent the data for a clean visualization for the user. The treemap is created externally in Plotly and then exported to `chart.html`. On the frontend, the app's entry point is `main.tsx`, which renders `App.tsx`, the main page displaying the treemap and data. `App.tsx` uses an iframe to embed `chart.html` into the page, displaying the treemap. It also includes statistics about the treemap below it. 
