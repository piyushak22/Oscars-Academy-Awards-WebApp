# Academy Awards Data Query Tool

## Project Overview

This project provides a web-based application that allows users to query and explore data related to Academy Award (Oscar) nominations from 1960 to 2010. The application leverages a JSON dataset (`oscars.json`) that includes detailed information about each nomination, such as the year, category, nominee, related info, and whether the nominee won. Users can interact with the application through a well-defined web interface to retrieve specific data based on various criteria.

## Implementation Details

### Web Interface (`iwt-cw.html`)

The web interface is built with HTML and includes a form allowing users to input their query parameters, such as the year, category, nominee, info, and specific queries related to winning. The form includes buttons to fetch nominations or nominees, clear input fields, and clear output results. The results, based on user queries, are dynamically displayed in tables below the form, providing a clear and interactive way to explore the data.

### Client-side Scripting (`client.js`)

The client-side JavaScript handles user interactions with the web form. It constructs query URLs based on input values and sends requests to the Node.js server using the fetch API. Once the data is received, the script dynamically generates tables to display the results within the web interface. It also includes logic to prevent conflicting inputs and ensures a user-friendly experience.

### Server-side Processing (`server.js`)

The Node.js server, implemented using Express.js, listens on port 8080 and responds to HTTP requests from the client. It reads query parameters from the incoming requests and filters the `oscars.json` dataset accordingly. The filtered data, in JSON format, is then sent back to the client for display. The server includes CORS headers to allow cross-origin requests, enabling the client hosted on a different server to communicate with the Node.js server.

## Features

1. **Data Querying:** Users can query the dataset based on specific years, categories, nominees, or additional info. The application can return all nominations or focus on winners or non-winners, depending on the user's choice.
2. **Dynamic Results Display:** The query results are dynamically rendered in tables under the form, providing immediate feedback to the user.
3. **Input Validation:** The application includes logic to prevent invalid or conflicting inputs, guiding the user to provide appropriate query parameters.
4. **Clear Functions:** Users can easily clear their inputs or the displayed results, enhancing the application's usability.

## Usage Instructions

1. Open the `iwt-cw.html` file in a web browser to access the application's interface.
2. Enter your query parameters in the provided input fields. You can query by year, category, nominee, and info. For broader queries, use the Nominee/Info field.
3. Choose whether to retrieve all nominations, only winners, or only non-winners using the "Won" dropdown.
4. Click the "Get Nominations" button to retrieve nomination data or "Get Nominees" to fetch nominee data based on the number of times nominated or won.
5. To reset the form or clear the displayed results, use the "Clear Input" or "Clear Output" buttons, respectively.

## Technical Details

- The HTML, CSS, and JavaScript files are structured to work together seamlessly, providing a responsive and intuitive user experience.
- The Node.js server is designed to handle requests efficiently, applying filters to the JSON dataset and returning relevant data quickly.
- The application is designed with extensibility in mind, allowing for future enhancements or integration with additional datasets.

By offering a detailed yet user-friendly interface to query the Oscars dataset, this project serves as a valuable tool for anyone interested in exploring Academy Award nominations and outcomes through the years.

[GitHub Link for Oscars Academy Awards] (https://github.com/ViplaviWade/Oscars-Academy-Awards-WebApp)