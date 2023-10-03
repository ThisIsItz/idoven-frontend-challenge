# ECG Frontend Challenge for Idoven.ai

This project aims to visualize an Electrocardiogram (ECG) in a graphical interface, using data stored in the `data` directory. The primary challenge was to create a user-friendly display for a long ECG recording, enabling users to navigate both backward and forward, zoom in and out, and select specific areas for zooming.

## Summary

This project represents the completion of a coding challenge for Idoven, where the objective was to develop a web application for visualizing an Electrocardiogram (ECG) from a data file. The main features of the project include:

- Reading and processing an ECG signal from a file in the `data` directory.
- Displaying the ECG signal in a user-friendly graphical interface.
- Allowing users to navigate the signal backward and forward.
- Enabling zoom in and out functionality, with the ability to select specific areas for zooming.

To achieve these goals, the following technologies and libraries were utilized:

- [React](https://reactjs.org/): The project is built using React for creating the user interface.
- [TypeScript](https://www.typescriptlang.org/): TypeScript was used to add static types to JavaScript, improving code safety and efficiency.
- [Vite](https://vitejs.dev/): Vite was employed as the development environment for a faster development experience.
- [Material-UI](https://material-ui.com/): Material-UI was used for styling the application and providing a modern look.
- [Chart.js](https://www.chartjs.org/): Chart.js was used for the visual representation of the ECG signal, offering flexibility and interactivity.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Unit tests were written using React Testing Library and Jest to ensure the correctness and reliability of the application's codebase.

I invite you to explore the codebase and assess my skills in frontend development. If you have any questions or need further information, please don't hesitate to reach out.

## Getting Started

To run this project, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone <repository_url>

   ```

2. Navigate to the project directory:

   ```shell
   cd ecg-frontend-challenge

   ```

3. Install project dependencies using npm:

   ```shell
   npm install
   ```

4. Ensure you have Node.js version 18.18.0 installed. You can check your Node.js version using the following command:

```shell
  node -v
```

## Running the Project

To start the project and view the ECG visualization, use the following command:

```shell
npm run dev
```

The application should now be running locally and accessible in your web browser at http://localhost:5173.

## Interacting with the ECG

To interact with the ECG graph:

- To zoom in and out, simply use your mouse's scroll wheel.
- To move around the ECG, click and drag the graph.
- To navigate backward and forward in the ECG data, click the respective buttons below to view more data or previous data.

## Running Tests

To execute the unit tests for this project, you can use the following command:

```bash
npm test
```
