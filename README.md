# WEB103 Project 4 - Bolt Bucket

Submitted by: Samir Hassan

About this web app: The web app is a car customization tool that allows users to create and manage their own CustomCar configurations. Built with React and connected to a PostgreSQL database, the app offers users various options for customizing aspects like the car's interior, exterior, wheels, and roof. Each choice updates a visual representation of the car, similar to what you'd see on an actual car website, allowing users to see their selections come to life. When users are satisfied with their choices, they can submit their customizations, which are saved to a list of created cars stored in the database. Users can also view, edit, or delete their saved configurations directly from the app. If a user attempts to save an invalid combination of features, they’ll receive an error message explaining the issue. The app also dynamically calculates and displays the total price of the selected options, making it easy for users to track the cost of their customizations.

Time spent: 6 hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomCar` table**
  - [X] **NOTE: Your GIF must include a view of your Railway database that shows the contents of the table used by your app**
- [X] **The web app uses React to display data from the API**
- [X] **Users can view a list of options they can select for different aspects of a `CustomCar`**
- [X] **On selecting each option, the displayed visual icon for the `CustomCar` updates to match the option the user chose**
- [X] **The user can submit their choices to save the car to the list of created `CustomCar`**
- [X] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database**
- [X] **The app displays the total price of all features**
- [X] **Users can view a list of all submitted `CustomCar`**
- [X] **Users can edit or delete a submitted `CustomCar` from the list view of submitted `CustomCar`**
- [X] **Users can update or delete `CustomCar` that have been created from the detail page**

The following **optional** features are implemented:

- [X] Selecting particular options prevents incompatible options from being selected even before form submission

## How to run


## Video Walkthrough

Here's a walkthrough of implemented required features:

https://drive.google.com/file/d/1Qzuc2x5yd29X3Y_RNh4s7RT45MVIuxqv/view?usp=drive_link

GIF created with Kap

## Notes

- I should've planned out the routes better prior to doing the frontend application. I thought I had them planned out pretty well till I started coding more on the frontend. I was constantly updating routes to support the needs of my frontend CRUD functions. Certain routes needed extra details while other routes weren't used at all. If I had planned better while considering user stories (i.e. the information requested and responded with each time a user wanted to execute an action), then this app would be a lot easier to code.
- I enjoyed the power of routing and links. It helps the React app tremendously. I can set up the Path in my App.jsx and then from anywhere in the files I can call Link and send it to the link.

## License

Copyright 2024 Samir Hassan

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
