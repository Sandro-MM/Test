# TaskTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Tests:
1 Form Creation with Default Values
Purpose:This test checks that the component initializes the form correctly with the expected structure and default values. It ensures that each form control is defined and starts with an empty string, indicating the form is ready for user input.

2. Form Population with User Profile Data
Purpose: This test validates that the getData method correctly fetches user profile data from the ProfileService and populates the form fields. The use of fakeAsync and tick simulates the passage of time, allowing asynchronous operations to complete before assertions are made.

3. File Upload Handling
Purpose:This test verifies that the onUpload method sets the newProfilePicture property correctly when a file is uploaded. It ensures that the component can handle file inputs as expected.

4. Button Disabled State Based on Form Validity
Purpose: This test checks whether the submit button is disabled when the form is invalid (e.g., when required fields are empty) and no profile picture is uploaded. It helps ensure that users cannot submit incomplete forms.

5. Profile Update Submission
Purpose:This test ensures that when the form is valid, the onSubmit method calls the updateUserProfile method from the ProfileService. The done callback signals the completion of an asynchronous operation, confirming that the profile update logic works as intended.

Conclusion These tests collectively verify the essential functionalities of the UserProfileInfoEditComponent, ensuring that:

The form is initialized correctly.
User data is fetched and populated properly.
File uploads are handled as expected.
The submit button's enabled/disabled state is managed correctly based on form validity.
Profile updates are submitted when the form is valid.
This approach provides a solid foundation for ensuring that the component behaves correctly under various scenarios, contributing to a robust user experience.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
