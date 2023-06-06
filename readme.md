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
  - `/routine/exercises`
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

### Get Exercise Detail

- URL
  - `/routine/exercises/:id`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Exercises recommendation fetched successfully",
    "book": {
            "id": "exercise-FvU4u0Vp2S3PMsFg",
            "title": "Saitama Morning Routine",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Hardcore",
            "duration": "36000",
            "description": "Lorem Ipsum",
        }
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
  - `imgUrl` as `string`
  - `type` as `string`
  - `description` as `string`
sample request form:
{
    "title":"Book of Death",
    "imgUrl":"https://i.ibb.co/LSscmwk/Google-G-Logo-svg.png",
    "type": "hardcore",
    "description": "500 push up, 500 sit up, 5 hour plank, 15km run"
}
- Response

```
{
    "error": false,
    "message": "Book added Succesfully",
}
```

### Get All Books
Get all books from database. If user has personal items, those will appear first

- URL
  - `/routine/books`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Book fetched successfully",
    "list": [
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
### Get Book Detail

- URL
  - `/routine/books/:id`
- Method
  - `GET`
- Parameter
  - `Authorization: Bearer <token>`
- Response

```
{
    "error": false,
    "message": "Books recommendation fetched successfully",
    "book": {
            "id": "book-FvU4u0Vp2S3PMsFg",
            "title": "Psychology of Money",
            "img-url": "https://my-bucket/documents/example.jpg",
            "type": "Moral, Psychology",
            "pages": "542",
            "rating": "8",
            "description": "Lorem Ipsum",
        }
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
  - `title` as `string`
  - `imgUrl` as `string`
  - `pdfUrl` as `string`
  - `type` as `string`
  - `description` as `string`
sample request form:
{
    "title":"Book of Death",
    "imgUrl":"https://i.ibb.co/LSscmwk/Google-G-Logo-svg.png",
    "pdfUrl":"https://i.ibb.co/LSscmwk/Google-G-Logo-svg.png",
    "type": "hardcore",
    "description": "500 push up, 500 sit up, 5 hour plank, 15km run"
}
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
  - `/schedule`
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
- Response

```
{
    "error": false,
    "message": "Schedule Created Succesfully",
    "scheduleResult": {
            "type": "exercise",
            "title": "Do Pull Up 10x2",
            "date": "13-05-2023",
            "start_hour": "07.00",
            "end_hour": "08.00",
            "description": "Lorem Ipsum",
        }
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
