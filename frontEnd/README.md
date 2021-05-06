# AcudeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Table of contents
* [Components](#Components)
* [Services](#Services)
* [Modules](#Modules)


## Components
* **MainComponent**: main view of the web app. It includes the search form, the results of the search and a filter by categories.
* **NavbarComponent**: shared navbar for all components. It includes the link to add animal and get assitance.
* **FooterComponent**: shared footer for all components. It includes links to social networks.
* **AnimalComponent**: view of each animal. It includes a modal image and different color clasification for the animal conservation status.
* **FormComponent**: view with a form to create a new animal. First the user must fill in the data about the animal. After that they can upload an image.
* **AssistanceComponent**: view for supporting an animal in danger. It includes information about how to proceed in the most common situations and where to find the nearest rescue center basing on the user's geolocation.
* **SuccessComponent**: view showed after a form was successfully submitted.
* **ErrorComponent**: view for non existing paths or general errors.

## Services
* **AnimalService**: contains all references to backend in order to get or send the data from/to the database.
* **CentersService**: contains the information about the rescue centers.

## Modules
* **RouterModule**: used to specify application states, manage state transitions while taking care of the URL, and load bundles on demand.
* **HttpClientModule**: allows to perform HTTP requests and easily manipulate those requests and their responses.
* **FormsModule**: exports the required providers and directives for template-driven forms. 