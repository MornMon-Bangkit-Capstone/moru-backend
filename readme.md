# Moru
## ERD Diagram
ERD Diagram:[https://whimsical.com/nyZEPfpbgkESM6NrAkGNx](https://whimsical.com/nyZEPfpbgkESM6NrAkGNx)

Password: morui

![image](https://github.com/MornMon-Bangkit-Capstone/moru-backend/assets/82663653/94beb311-b5cc-4b21-96b2-bcd85fe03b4e)

## API
### Endpoint
{url-endpoint}

### Register
* URL
  * ```/register```
* Method
  * ```POST```
* Request Body
  * ```name``` as ```string```
  * ```email``` as ```string```, must be unique
  * ```password``` as ```string```, must be at least 8 characters
* Response
```
{
  "error": false,
  "message": "User Created"
}
```
### Login
* URL
  * ```/login```
* Method
  * ```POST```
* Request Body
  * ```email``` as ```string```
  * ```password``` as ```string```
* Response
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
### GET User
* URl:
  * ```/user```
* Method:
  * ```Get```
* Parameter:
  * ```user_id``` as ```integer```
  * ```Authorization: Bearer <token>```
* Response
```
{
	   "error": false,
	   "message":"succes"
	   "profileResult":{
		      "profPicture": "https://drive.google.com/uc?id=1SMHO7F8qw7rXiDX2Xf4mncbYEe8rU7IN"
		      "name": "Zainudin Ahmad"
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
	   }
}
```
### Get All Recommendation
* URL
  * ```/recommendation```
* Method
  * ```GET```
* Parameter
  * ```Authorization: Bearer <token>```
* Response
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
* URL
  * ```/recommendation/books```
* Method
  * ```GET```
* Parameter
  * ```Authorization: Bearer <token>```
* Response
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
* URL
  * ```/recommendation/exercises```
* Method
  * ```GET```
* Parameter
  * ```Authorization: Bearer <token>```
* Response
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
### Get Book Detail
* URL
  * ```/recommendation/books/:id```
* Method
  * ```GET```
* Parameter
  * ```Authorization: Bearer <token>```
* Response
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
### Get Exercise Detail
* URL
  * ```/recommendation/exercises/:id```
* Method
  * ```GET```
* Parameter
  * ```Authorization: Bearer <token>```
* Response
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
### GET Schedule
* URL
  *```/schedule```
* Method
  *```Get```
* Parameter
  *```user_id as integer```
  *```tanggal as date```
* Response (exercise)
```
{
    "error": false,
	   "messages": "schedule found succesfully"
	   "listSchedule":{
		      "user_id":"123"
		      "date_schedule":"18-05-2023"
		      "routine_type":"exercise"
		      "activity":"Pull Up"
		      "time": "date"
	    }
}
```
Response (book)
```
{
    "error": false,
	   "messages": "schedule found succesfully"
	   "listSchedule":{
		      "user_id":"123"
		      "date_schedule":"18-05-2023"
		      "routine_type":"book"
		      "tittle":"Dunia Sophie"
		      "url":"https://my-bucket/documents/example.txt"
	    }
}
```
### POST schedule
* URL
  *```/schedule```
* Method
  *```POST```
* Request Body:
  *```category``` as ```string```
  *```activity``` as ```string```
  *```date``` as ```date```
* Response
```
{
	   "error": false,
    "message":"succes",
    "scheduleResult":{
        "category":"exercise"
		      "activity":"Do Pull Up"
		      "date":"13-05-2023"
	    }
}
```
