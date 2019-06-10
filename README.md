# Location Observation
## About the challenge
We want to show the user a live map of locations that are fetched from a data store. Upon
accessing the page the user should see a map around the given locations and it should get
updates live if the data is modified elsewhere. Each location at a given latitude and longitude
should show the name of the location and a status indicating whether it’s open or not.
The frontend should have at least basic editing capabilities for locations, and any changes on
the backend datastore should be reflected without refreshing.

<insert gif of the working platform>

## Tech Stack
The technologies used are:

**Backend**
- **nodejs** v8.10
- **express** v4.17
- **sqlite3** as database

**Frontend**
- **Vuejs** v2.6
- **Vuetify** v1.5 (Material Design Component Framework)

**Other**
- **Lerna** for monorepo management

## Requeriments / Configuration

1. You need have `lerna` installed globally

   `sudo npm install --global lerna`
2. Create a Token in [mapbox]
3. After cloning the repository, navigate to `pagages/frontend` 
   and copy the `.env.example` to `.env` or just create a new file named `.env`
4. Add your mapbox token as value for `VUE_APP_MAPBOX_TOKEN`
5. you can leave the value of `VUE_APP_API_ADDRESS` if you are running the backend locally, or change as appropiate
6. After cloning the repository, navigate to `pagages/backend` 
   and copy the `.env.example` to `.env` or just create a new file named `.env`
7. Generate a 256-bit string secret and set as `TOKEN_KEY` this will be used to generate and verify JWT tokens for the
   authorization of requests
 

## How to run the project
1. Clone the repository:

    `git clone git@github.com:hevela/location-observation.git`
2. Change to the `location-observation` directory
3. Make sure you have installed `lerna`:
    `sudo npm install --global lerna`
4. Make sure to have done steps 3 to 7 of the **Requeriments / Configuration** section
5. A startup database has been provided for this project, so no need to create or configure a database, 
   but in case it is needed, change your working dir to 'packages/backend/' and run:
   - `npm run db:migrate` to generate the database
   - `npm run db:seed` to populate the database with some data
6. Run the backend changing your working dir to `packages/backend` and run with `npm run start`
7. Run the frontend by opening a second terminal window and changing your working dir to `packages/frontend/`
   and run with `npm run serve`
8. Open a browser window and navigate to `http://localhost:8080`. You should see the map with the initial locations 
   set by the seed command
9. In the frontend, you can navigate to `Sign in` in the sidebar and log in with user `Snoop`, and password `Dog`.
   From there, you can go to the "Manage Locations" sections and add/delete/update locations.
10. You can run the test by running `npm run test` for the backend and `npm run test:unit` for the frontend.

## Implementation design
### Database
Two tables are needed to support the proposed solution.
<insert diagram>

**locations**

This table holds the location data i.e. name, latitude, longitude and status (if it's open or closed)

**users**

This table holds the information of the users authorized to make changes in the data. The data this tables holds 
are username and password, the later is encrypted before being saved.

### Architecture diagram
<insert diagram>

The architecture of the implemented solution consists in a backend server powered by nodejs/express and sqlite3 as database
The backend server offers an API and a websocket service implemented with [socket.io]

The frontend consumes the API to display a map of locations. This map is provided by [MapboxGL]. The frontend also
uses the API to manage the locations (create, edit, delete).
<insert component diagram>

### Authentication
Although the challenge description did not specified that the request needed to be authenticated, it seemed logical 
that any operation that mutates the data needs to be from an authorized user.

To achieve that, the backend implements an authentication endpoint. This endpoint receives the username and password
of the user and returns a JWT token. This pattern is widely used to authenticate RESTFUL API requests

<insert authentication flow>
<insert authorization flow>

### API
#### Authenticate a user
**POST** `<Backend URL>/auth/signin/`

Request headers: `Content-Type: application/json`

Request Payload:
```
{
	"username": "Snoop",
	"password": "Dog"
}
```

Response Payload:
```
{
    "data": {
        "token": "<JWT Token>"
    }
}
```

#### Get all locations
Gets a list of all the locations. All properties for the locations are included in the payload.

**GET** `<Backend URL>/locations/`

Request headers: `none`

Request Payload: `none`

Response Payload:
```
{
    "data": {
        "locations": [
            {
                "id": 1,
                "name": "Best Buy Ciudadela",
                "latitude": 20.6447319,
                "longitude": -103.4180417,
                "open": 1,
                "createdAt": null,
                "updatedAt": "2019-06-09T04:51:54.085Z"
            },
            ...
            {
                "id": 4,
                "name": "Sam's Club Mariano Otero",
                "latitude": 20.7485967,
                "longitude": -103.4252563,
                "open": 0,
                "createdAt": "2019-06-06T19:05:44.438Z",
                "updatedAt": "2019-06-09T23:38:25.978Z"
            }
        ]
    }
}
```

#### Get a single location
Gets a location object with all its properties. Returns a `404` response in case the location is not found.

**GET** `<Backend URL>/locations/{id}/`

Path Parameters: `id` -  The id of the location to get

Request headers: `none`

Request Payload: `none`

Response Payload:
```
{
    "data": {
        "id": 4,
        "name": "Sam's Club Mariano Otero",
        "latitude": 20.7485967,
        "longitude": -103.4252563,
        "open": 0,
        "createdAt": "2019-06-06T19:05:44.438Z",
        "updatedAt": "2019-06-09T23:38:25.978Z"
    }
}
```

#### Update a location
Updates a location. A partial object can be used. Only the provided fields will be updated.
In case the request is successful, the API will return a response with status `200`.

If the request is not authorized, an error `401` will be served.

A basic validation is performed to validate the request payload.
In case this validation fails, an error `400` will be served.

Returns a `404` response in case the location is not found. 

**PUT** `<Backend URL>/locations/{id}/`

Path Parameters: `id` -  The id of the location to update

Request headers:
```
Authorization: Bearer <JWT Token>
Content-Type: application/json
```

Request Payload:
```
{
	"open": 1
}
```

Response Payload:
```
{
    "data": {
        "id": 4,
        "name": "Sam's Club Mariano Otero",
        "latitude": 20.7485967,
        "longitude": -103.4252563,
        "open": 1,
        "createdAt": "2019-06-06T19:05:44.438Z",
        "updatedAt": "2019-06-10T02:49:12.198Z"
    }
}
```

#### Delete a location
In case the request is successful, the API will return a response with status `204`.

If the request is not authorized, an error `401` will be served.

Returns a `404` response in case the location is not found. 

**DELETE** `<Backend URL>/locations/{id}/`

Path Parameters: `id` -  The id of the location to delete

Request headers:
```
Authorization: Bearer <JWT Token>
Content-Type: application/json
```

Request Payload: `none`

Response Payload: `none`

### Socket.io Events
When a location is modified (updated or deleted) or when a location is created, a websocket message is emmited from the
backend and received and processed by the frontend.

The channel is called `message` and the content of the message changes depending of the operation performed.

#### Create location message
```
{ 
  event: 'CREATED', 
  location: {
              "id": 4,
              "name": "Sam's Club Mariano Otero",
              "latitude": 20.7485967,
              "longitude": -103.4252563,
              "open": 1,
              "createdAt": "2019-06-06T19:05:44.438Z",
              "updatedAt": "2019-06-10T02:49:12.198Z"
            } 
}
``` 

#### Update location message
```
{ 
  event: 'UPDATED', 
  location: {
              "id": 4,
              "name": "Sam's Club Mariano Otero",
              "latitude": 20.7485967,
              "longitude": -103.4252563,
              "open": 1,
              "createdAt": "2019-06-06T19:05:44.438Z",
              "updatedAt": "2019-06-10T02:49:12.198Z"
            } 
}
``` 

#### Delete location message
```
{ 
  event: 'DELETED', 
  locationId: 4
}
``` 

### Folder structure
#### Backend
The backend is located in `location-observation/packages/backend/`
The main folders and files are:

##### .env
This file holds some important data, such as the secret key to generate and validate the JWT Token
and the port in which to run the backend server.

This file could be omitted by saving the variables into the system env vars.

##### index.js
The entry point of the backend

##### app_modules/
This folder holds the application modules(router and controller) and a `common` module that
can be used to share logic between modules.

The modules have two files:

**router**

Handles the incoming requests and specify which controller function will process it.

**controller**
Process the request and returns the adequate response

###### common/
The only file in this folder holds some methods to return a response to the API client.
These methods are used to return a consistent format of payloads.

##### config/
Holds database configuration for `sequelize`

##### constants/
Defines constants used in the controllers, such as response codes and event names.

##### migrations/
Holds migrations scripts for `sequelize`

##### models/
Defines `sequelize` models. These are used for the database schema creation. The models can hold some hooks to 
attach some functionality when an event happens and instance methods for the retrieved objects.

##### seeders/
Holds seeding data for `sequelize`

##### tests/
contains the unit tests for the API

#### Frontend
The backend is located in `location-observation/packages/frontend/`
The main folders and files are:

##### .env 
This file holds some important data, such as the URL of the backend server and the mapbox token.
This file could be omitted by saving the variables into the system env vars.

##### src/
Holds all frontend

###### views/
Contains the main views of the project, `AdminLocations.vue` is the main page for the location management in the frontend.
`SignIn.vue` contains the log in form. `Home.vue` contains the location map

###### components/
Holds the individual components used in the views

###### services/
Contains the functions that perform requests to the API

###### store/
Contain the files that handles the logic and data management for the frontend. It is mainly used to share 
data between components and views

##### tests/
contains the unit tests for the frontend

## Known Issues
- The database is included in the repository to facilitate the review of this challenge
- The validation of the requests can be improved by checking the shape of the received object in the backend
- Error Handling in the frontend can be improved. The current implementation displays the error message of 
  the cached exception. It could display the error that comes from the backend as is more descriptive
- The UI/UX can be improved
- Testing can be improved. Not every component in the frontend or controller in the backend was tested.
- Vuetify has a weird bug when using in conjunction with vue-test-utils. Currently has been reported 
  a couple of times in both of the repositories (vuetify and vue-test-utils) issues section. The issue is that 
  sometimes a test fails with the error: `"TypeError: Cannot read property '_transitionClasses' of undefined"`.
  For the scope of the unit testings of this project, a test for the sign in form (`calls an action on submit`)
  fails if the test suite is ran, but will pass if only this test is executed in isolation.
- websocket events were not tested
- In the frontend some store optimizations could be used, for example to avoid extra requests to the API when 
  switching between admin and map views
- A factory patter could be used to minimize the similar code to handle requests status (in progress, success, failure)  

[mapbox]: http://mapbox.com
[MapboxGL]: http://mapbox.com
[socket.io]: https://socket.io/