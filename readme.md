# Moru

## ERD Diagram

ERD Diagram:[https://whimsical.com/nyZEPfpbgkESM6NrAkGNx](https://whimsical.com/nyZEPfpbgkESM6NrAkGNx)

Password: morui

![image](https://github.com/MornMon-Bangkit-Capstone/moru-backend/assets/82663653/94beb311-b5cc-4b21-96b2-bcd85fe03b4e)

## API

### Endpoint

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
- Request Body
  - `name` as `string`
  - `birthdate` as `Date`(yyyy-mm-dd)
  - `goal` as `string`
  - `profilePicture` as `string` (link to image)
- Response

```
{
    "error": false,
    "message": "success",
}
```

### GET Profile

- URL:
  - `/profile/:id`
- Method:
  - `GET`
- Parameter:
  - `user_id` as `integer`
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "succes"
    "profData":{
        "profPicture": "https://drive.google.com/uc?id=1SMHO7F8qw7rXiDX2Xf4mncbYEe8rU7IN"
	"Name": "Zainudin Ahmad"
	"Date of Birth": "12 June 1999"
	"Goals": "Live like larry"
	"Favorite Book Category": "Pschicology"
	"Favorite Book": "Dunia Sophie"
	"Favorite Author": "Jostein Gaarder"
	"Favorite Exercise Author": "Chest"
	"Favorite Exercise": "Push Up"
	"Exercise Experience": "Hardcore"
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

### Get All Recommendation

- URL
  - `/recommendation`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Recommendations fetched successfully",
    "listRecommendations": [
        {
            "id": "book-FvU4u0Vp2S3PMsFg",
            "title": "Psychology of Money",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Moral, Psychology",
            "description": "Lorem Ipsum",
        },
        {
            "id": "exrcise-Fqe4u0Vp2SwaesFg",
            "title": "Push Up 200 kali",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Hardcore",
            "description": "Lorem Ipsum",
        }
    ]
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
    "listRecommendations": [
        {
            "id": "book-FvU4u0Vp2S3PMsFg",
            "title": "Psychology of Money",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Moral, Psychology",
            "description": "Lorem Ipsum",
        },
        {
            "id": "book-FvU4u0Vp2S3PMsFg",
            "title": "48 Laws of Power",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Moral, Psychology",
            "description": "Lorem Ipsum",
        },
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
    "listRecommendations": [
        {
            "id": "exrcise-Fqe4u0Vp2SwaesFg",
            "title": "Push Up 200 kali",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Hardcore",
            "description": "Lorem Ipsum",
        }
        {
            "id": "exrcise-Fqe4u0Vp2SwaesFg",
            "title": "Lari 10km",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Hardcore",
            "description": "Lorem Ipsum",
        }
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

For installation use `npm install ci`

# Lint

Google Style, Ignore line break

# .env

Please create .env file before try. Don't forget to install dotenv with npm. Env format look like this:

```
ACCESS_TOKEN_SECRET=65b9053da1596d2d7a6fbf8ed08cf77e8d2d79b31ffb4ffb095c4aa9361f1cf6bd52dc836d966763ebb6fcf10368acf53181119f508471338a3d280e1be341ca //Random token
REFRESH_SECRET_TOKEN=a4b9d23dd5ca5787f9ff5183feeb643d90b518a77d1e2abb502be4fddd921c61f6861eb19cfa8c5804aaee2f93d156bc7ad325f7780323509dda0884632fe2ca //Random token
DATABASE_HOST= db_host
DATABASE_USER= root
DATABASE_PASSWORD= db_pass
DATABASE= db_name
TOKEN_EXPIRES_IN= 100
```
