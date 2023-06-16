# Moru

## API
### ERD Diagram

https://whimsical.com/moru-E26QoQ16eFcxTPR32aPEhg

![image](https://github.com/MornMon-Bangkit-Capstone/moru-backend/assets/82663653/b174f1c0-ea18-43dd-922a-823f0e9eb1ff)

### Endpoint for backend

```https://moru-api-backend-inq7f5uz7q-et.a.run.app/```

### Register

- URL
  - `/auth/register`
- Method
  - `POST`
- Request Body
  - `email` as `string`, must be unique
  - `password` as `string`, must be at least 8 characters
  - `passwordConfirm` as `string`, must be at least 8 characters
- Response

```
{
  "error": false,
  "message": "User Created"
}
```

### Login

- URL
  - `/auth/login`
- Method
  - `POST`
- Request Body
  - `email` as `string`
  - `password` as `string`
- Response

```
{
    "error": false,
    "message": "success",
    "loginResult": {
        "userId": "user-yj5pc_LARC_AgK61",
        "name": "Arif Faizin",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
    }
}
```

### Fill Your Personal Data

- URL
  - `/auth/fill/data`
- Method
  - `POST`
- Parameter:
  - `Authorization: Bearer <token>`
- Request Body
  - `name` as `string`
  - `birthdate` as `Date`(yyyy-mm-dd)
  - `goal` as `string`
  - `favBook` as `string` (Favorite Book Name)
  - `favAuthor` as `string` (Favorite Book Author)
  - `favExercise` as `string` (Favorite Exercise Name, Must be EXACTLY the same as Sports name in database
  - `fillData` as int (0 or 1)
- Response

```
{
    "error": false,
    "message": "success",
}
```
### Fill Profile Image

- URL
  - `/auth/fill/image`
- Method
  - `POST`
- Parameter:
  - `Authorization: Bearer <token>`
- Request Body
  - `image` as `image format`
- Response

```
{
    "error": false,
    "message": "image uploaded successfully"
}
```

### GET Profile

- URL:
  - `/profile`
- Method:
  - `GET`
- Parameter:
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Data fetched successfully",
    "data": {
        "id": 16544,
        "username": "budi",
        "email": "new3@gmail.com",
        "quota": 5,
        "birthDate": null,
        "goal": "to become a hero",
        "profilePicture": null,
        "favBook": "Lolicon Dream",
        "favExercise": "Boxing",
        "fillData": 1
    }
}
```

### Get All Exercises
Get all exercises from database. If user has personal items, those will appear first

- URL
  - `/routine/exercises?page=1&limit=10&key=run`
  - page= What page
  - limit= how much item in a page
  - key= search query (will return coresponding exercise title)
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Exercises fetched successfully",
    "list": [
        {
            "id": 3,
            "Sports": "Ball Crunch",
            "Description": "Stretch with the help of a gym ball.\n",
            "Visual": "",
            "Duration_Min": "1-5",
            "Location": "Indoor",
            "Number_of_people": "1",
            "Equipment": "Yes",
            "Muscle": "lower back muscles, lower abdominals, hip flexors, obliques, rectus abdominis, obliques, transverse abdominis",
            "Category": "Core\r",
            "isPublic": "1"
        },
        {
            "id": 9,
            "Sports": "Crunches",
            "Description": "Position that bend your knees and place your arms across your chest. Contract your abs and inhale. Exhale and lift your upper body, keeping your head and neck relaxed.",
            "Visual": "",
            "Duration_Min": "1-5",
            "Location": "Indoor",
            "Number_of_people": "1",
            "Equipment": "No",
            "Muscle": "rectus abdominis, internal and external obliques, transversus abdominis, hip flexors, obliques, hip flexors, lower back",
            "Category": "Core\r",
            "isPublic": "1"
        }
	]
}
```

### Get Exercise Detail

- URL
  - `/routine/exercises/:id/:isPublic`
  - id= Exercise id
  - isPublic= 0 or 1 for false and true
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Exercises fetched successfully",
    "list": [
        {
            "id": 2,
            "Sports": "Running",
            "Description": "A description of the exercise",
            "Visual": "https://example.com/image.jpg",
            "Duration_Min": "30",
            "Location": "Indoor",
            "Number_of_people": "1",
            "Equipment": "Yes",
            "Muscle": "Legs, Arms",
            "Category": "Cardio",
            "uid": 16527
        }
    ]
}
```

### POST Exercises

- URL
  - `/routine/exercises`
- Method
  - `POST`
- Parameter
  - `Authorization: Bearer <token>`
- Request Body:
  - `title` as `string`
  - `description` as `string`
  - `visual` as `string`
  - `duration` as `int` in minutes
  - `location` as `string` indoor/outdoor
  - `numberOfPeople` as `int` 
  - `equipment` as `string`  yes/no
  - `muscle` as `string`
  - `category` as `string`

sample request:

```
{
  "title": "Running",
  "description": "A description of the exercise",
  "visual": "https://example.com/image.jpg",
  "duration": "30",
  "location": "Indoor",
  "numberOfPeople": "1",
  "equipment": "Yes",
  "muscle": "Legs, Arms",
  "category": "Cardio"
}
```
- Response

```
{
    "error": false,
    "message": "Exercise added successfully"
}
```

### Get All Books
Get all books from database. If user has personal items, those will appear first

- URL
  - `/routine/books?page=1&limit=10&key=harry`
  - page= What page
  - limit= how much item in a page
  - key= search query (will return coresponding book title or author)
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Books fetched successfully",
    "list": [
        {
            "ISBN": 60268654,
            "BookTitle": "Harry the Dirty Dog",
            "BookAuthor": "Gene Zion",
            "YearOfPublication": 1956,
            "Publisher": "HarperCollins",
            "ImageURLL": "http://images.amazon.com/images/P/0060268654.01.LZZZZZZZ.jpg",
            "Author": "",
            "Summary": " The family dog, Harry, disenchanted with taking baths, buries the bathtub scrubber and runs away from home. Harry gets dirty and returns home only to find his family does not recognize him. He attempts to get his family to realize it's him only succeed when he brings back the brush he buried.",
            "AvgRating": 9,
            "CountRating": 1,
            "Genres": "[\"Children's literature\"]",
            "isPublic": "1"
        },
        {
            "ISBN": 140239375,
            "BookTitle": "The Discovery of Heaven",
            "BookAuthor": "Harry Mulisch",
            "YearOfPublication": 1997,
            "Publisher": "Penguin Books",
            "ImageURLL": "http://images.amazon.com/images/P/0140239375.01.LZZZZZZZ.jpg",
            "Author": "Harry Mulisch",
            "Summary": " The Discovery of Heaven tells the story of an angel-like being, who is ordered to return to Heaven the stone tablets containing the Ten Commandments, given to Moses by God, which symbolise in the book the link between Heaven and Earth."
	    "AvgRating": 9,
            "CountRating": 1,
            "Genres": "[\"Children's literature\"]",
            "isPublic": "1"
        }]
}
```
### Get Book Detail

- URL
  - `/routine/books/:id/:isPublic`  
  - id= book id
  - isPublic= 0 or 1 for false and true
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Books fetched successfully",
    "list": [
        {
            "ISBN": 60268654,
            "BookTitle": "Harry the Dirty Dog",
            "BookAuthor": "Gene Zion",
            "YearOfPublication": 1956,
            "Publisher": "HarperCollins",
            "ImageURLL": "http://images.amazon.com/images/P/0060268654.01.LZZZZZZZ.jpg",
            "Author": "",
            "Summary": " The family dog, Harry, disenchanted with taking baths, buries the bathtub scrubber and runs away from home. Harry gets dirty and returns home only to find his family does not recognize him. He attempts to get his family to realize it's him only succeed when he brings back the brush he buried.",
            "AvgRating": 9,
            "CountRating": 1,
            "Genres": "[\"Children's literature\"]"
        }
    ]
}
```

### POST Books

- URL
  - `/routine/books`
- Method
  - `POST`
- Parameter
  - `Authorization: Bearer <token>`
- Request Body:
  - `BookTitle` as `string`
  - `BookAuthor` as `string`
  - `YearOfPublication` as `int`
  - `ImageURLL` as `string`
  - `Summary` as `string`
  - `AvgRating` as `int`
  - `CountRating` as `int`
  - `Genres` as `string`


sample request form:
```
{
  "BookTitle": "Sample Book2",
  "BookAuthor": "John Doe",
  "YearOfPublication": 2023,
  "Publisher": "Sample Publisher",
  "ImageURLL": "https://example.com/book-image.jpg",
  "Summary": "This is a sample book summary.",
  "AvgRating": null,
  "CountRating": null,
  "Genres": "Fiction, Mystery"
}
```
- Response

```
{
    "error": false,
    "message": "Book added Succesfully",
}
```
### POST Book Rating

- URL
  - `/routine/bookrate`
- Method
  - `POST`
- Parameter
  - `Authorization: Bearer <token>`
- Request Body:
  - `ISBN` as `string`
  - `bookRating` as `string`
sample request form:
```
{
    "ISBN":"0060517794",
    "bookRating":"9"
}
```
- Response

```
{
    "error": false,
    "message": "Book rated successfully"
}
```

### Get Books Recommendation

- URL
  - `/recommendation/books`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Books recommendation fetched successfully",
    "list": [
         {
            "ISBN": 380624060,
            "BookTitle": "Dream Children",
            "BookAuthor": "Gail Godwin",
            "YearOfPublication": 1987,
            "Publisher": "Harper Mass Market Paperbacks (Mm)",
            "ImageURLL": "http://images.amazon.com/images/P/0380624060.01.LZZZZZZZ.jpg",
            "Author": "A. N. Wilson",
            "Summary": " Paedophilia is at the heart of the story. Oliver Gold's pure thoughts, and seemingly asexual life contrast with the reality of his desires and deeds. Oliver abuses Bobs over a long period.",
            "AvgRating": 0,
            "CountRating": 0,
            "Genres": "['Fiction', 'Novel']",
            "isPublic": "0"
        },
	{
            "ISBN": 515133078,
            "BookTitle": "Never Dream of Dying",
            "BookAuthor": "Raymond Benson",
            "YearOfPublication": 2002,
            "Publisher": "Jove Books",
            "ImageURLL": "http://images.amazon.com/images/P/0515133078.01.LZZZZZZZ.jpg",
            "Author": "Raymond Benson",
            "Summary": " It begins when a police raid goes horribly wrong, killing innocent men, women, and even children. Bond knows the Union is behind the carnage, and vows to take them down once and for all. His hunt takes him to Paris, into a deadly game of predator and prey, and a fateful meeting with the seductive Tylyn Mignonne, a movie star with a sordid past, who may lead Bond to his final target—or his own violent end... Eventually it leads him to the Union's latest attack on society, which involves Tylyn's husband, Leon Essinger, and his new movie, \"Pirate Island\", which stars Tylyn. (US Paperback) The conclusion to Benson’s Union Trilogy. Locations are Nice, Paris, Cannes, Monte Carlo, Corsica (also Los Angeles, Japan, and Chicago briefly).",
            "AvgRating": 0,
            "CountRating": 0,
            "Genres": "['Spy fiction', 'Fiction']",
            "isPublic": "0"
        },
	...
    ]
}
```

### Get Exercises Recommendation

- URL
  - `/recommendation/exercises`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Exercises recommendation fetched successfully",
    "list": [
       {
            "id": 18,
            "Sports": "Gym ",
            "Description": "A gym is a club, building, or large room, usually containing a variety of specialized equipment, where people exercise and get fit.",
            "Visual": "https://storage.googleapis.com/moru-bangkit-exercise-image/55.%20Gym.jpg",
            "Duration_Min": "40-50",
            "Location": "Indoor",
            "Number_of_people": "1",
            "Equipment": "Yes",
            "Muscle": "chest, back, arms, shoulders, legs, calves, hamstrings, triceps, biceps, forearms ",
            "Category": "Whole Body",
            "Video": "https://www.youtube.com/watch?v=YvFWg-oUlG8",
            "isPublic": "0"
        },
        {
            "id": 22,
            "Sports": "Joging",
            "Description": "A form of trotting or running at a slow or leisurely pace and maintaining a steady speed for longer periods of time.",
            "Visual": "https://storage.googleapis.com/moru-bangkit-exercise-image/1.%20Joging.JPG",
            "Duration_Min": "20-30",
            "Location": "Outdoor",
            "Number_of_people": "1",
            "Equipment": "No",
            "Muscle": "hamstrings, quads, calves, glutes, hip flexors, hamstrings, core muscles, calves",
            "Category": "Lower Body",
            "Video": "https://www.youtube.com/watch?v=gDrtnm91vbI",
            "isPublic": "0"
        },
        ...
    ]
}
```

### GET Schedule

- URL
  - `/schedule?key=yyyy-mm-dd`
  - key is optional. If exist return certain date, if not return all schedule
- Method
  - `Get`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Schedule fetched successfully",
    "list": [
        {
            "id": "schedule-0e90ded9-1679-403c-ae93-fb3c8f00ca4e",
            "name": "run",
            "type": "exercise",
            "date": "2022-07-08",
            "start_time": "09:00",
            "end_time": "10:00",
            "description": "20km run like saitama",
            "uid": "b6f9d2a4-8e19-4901-8549-cdb9884ab0d4"
        },
	{
            "id": "schedule-0eerd9-1679-403tae93-fb3c8f00ca4e",
            "name": "Book w",
            "type": "book",
            "date": "2022-07-08",
            "start_time": "09:00",
            "end_time": "10:00",
            "description": "Book about how to control your chakra, some basic jutsu",
            "uid": "b6f9d2a4-8e19-4901-8549-cdb9884ab0d4"
        }
    ]
}
```
### GET Schedule Detail

- URL
  - `/schedule/:id`
- Method
  - `Get`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Schedule fetched successfully",
    "schedule": [
        {
            "id": "schedule-0e90ded9-1679-403c-ae93-fb3c8f00ca4e",
            "name": "run",
            "type": "exercise",
            "date": "2022-07-08",
            "start_time": "09:00",
            "end_time": "10:00",
            "description": "20km run like saitama",
            "uid": "b6f9d2a4-8e19-4901-8549-cdb9884ab0d4"
        }
    ]
}
```

### POST schedule

- URL
  - `/schedule`
- Method
  - `POST`
- Parameter
  - `Authorization: Bearer <token>`
- Request Body:
  - `type` as `string`
  - `title` as `string`
  - `date` as `string`
  - `startTime` as `string`
  - `endTime` as `string`
  - `description` as `string`


sample request form:
```
{
    "type": "exercise",
    "name": "Do Pull Up 10x2",
    "date": "13-05-2023",
    "startTime": "07.00",
    "endTime": "08.00",
    "description": "Lorem Ipsum"
}
```

- Response

```
{
    "error": false,
    "message": "Schedule Created Succesfully",
}
```
### PUT schedule

- URL
  - `/schedule/:id`
- Method
  - `PUT`
- Parameter
  - `Authorization: Bearer <token>`
- Request Body:
{Optional, fill only needed}
  - `type` as `string`
  - `title` as `string`
  - `date` as `string`
  - `startTime` as `string`
  - `endTime` as `string`
  - `description` as `string`
  - `status` as `string` ex: ```STARTED```, default is ```NOT_STARTED```
- Response

```
{
    "error": false,
    "message": "Schedule updated successfully'
}
```
### DELETE schedule

- URL
  - `/schedule/:id`
- Method
  - `DELETE`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Schedule deleted successfully'
}
```

# Install

For installation use `npm install`
Run with `npm run start`

# Lint

Google Style, Ignore line break

# .env

Please create .env file before try. Don't forget to install dotenv with npm. Env format look like this:

```
ACCESS_TOKEN_SECRET=65b...//Random token
REFRESH_SECRET_TOKEN=a4b9d...//Random token
DATABASE_HOST= db_host
DATABASE_USER= root
DATABASE_PASSWORD= db_pass
DATABASE= db_name
TOKEN_EXPIRES_IN= expire_time
API_KEY=AIza...//API key
```
