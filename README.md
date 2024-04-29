# API Documentation
```url: 15.206.145.222:3000```
## Setup

Before running the API server, make sure to follow these setup instructions:

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. cd <project_directory>

npm install
# or
yarn install

cp .env.example .env

Mock data to test api
```
1. open workbench
2. File > Open SQL Script grouple_db.sql from the repository
3. Run the script
4. Done
```

### Signup

**Description:** This API endpoint is used for user registration.

**URL:** `/signup`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
### Login

**Description:** This API endpoint is used for user login.

**URL:** `/login`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```


### New Event
Description: This API endpoint is used to create a new event.

URL: /addEvents

Method: POST

**Request Body:**

```

{
  "title": "Event Title",
  "description": "Event Description",
  "availableSlots": 100,
  "thumbnail": "event_thumbnail_url"
}
```
Response:

Success Response:
Status Code: 200 OK
Body:
json
```
{
  "message": "Event added",
  "event": {
    "title": "Event Title",
    "description": "Event Description",
    "availableSlots": 100,
    "thumbnail": "event_thumbnail_url"
  }
}
```
Error Response:
Status Code: 500 Internal Server Error
Body:

{
  "error": "Internal server error"
}
### Get Events
Description: This API endpoint is used to retrieve a list of events.

URL: /getEvents

Method: GET

Query Parameters:

page (optional): Page number for pagination (default: 1)
Response:

Success Response:
Status Code: 200 OK
Body:
```
{
  "events": [
    {
      "title": "Event Title",
      "description": "Event Description",
      "availableSlots": 100,
      "thumbnail": "event_thumbnail_url"
    },
}
```

### Update Event
Description: This API endpoint is used to update an existing event.

URL: /updateEvent/:id

Method: PUT

Request Body:
```
{
  "title": "Updated Event Title",
  "description": "Updated Event Description",
  "availableSlots": 120,
  "thumbnail": "updated_thumbnail_url"
}

```
Response:

Success Response:
Status Code: 200 OK
Body:
```
{
  "message": "Event updated successfully",
  "event": {
    "title": "Updated Event Title",
    "description": "Updated Event Description",
    "availableSlots": 120,
    "thumbnail": "updated_thumbnail_url"
  }
}
```
### Delete Event
Description: This API endpoint is used to delete an event.

URL: /deleteEvent/:id

Method: DELETE

Response:

Success Response:
Status Code: 200 OK
Body:
```
{
  "message": "Event deleted successfully"
}
```

### Upload to S3

**Description:** This API endpoint is used to upload an image to Amazon S3.

**URL:** `s3/upload`

**Method:** `POST`

**Request Body:**
- `email`: Email of the user
- `name`: Name of the user

**Request File:**
- Image file to be uploaded

**Response:**
- Success Response:
  - Status Code: `200 OK`
  - Body:
    ```json
    {
      "message": "Image uploaded successfully"
    }
    ```

---

### Retrieve from S3

**Description:** This API endpoint is used to retrieve images stored in Amazon S3.

**URL:** `s3/get`

**Method:** `GET`

**Response:**
- Success Response:
  - Status Code: `200 OK`
  - Body:
    ```json
    {
      "data": [
        {
          "item": {
            "imageName": "userImage123456789.jpg",
            "email": "user@example.com",
            "name": "John Doe",
            "createdAt": "2024-04-29T12:00:00Z"
          },
          "signedUrl": "https://s3.amazonaws.com/bucket/userImage123456789.jpg"
        },
        {
          "item": {
            "imageName": "userImage987654321.jpg",
            "email": "another_user@example.com",
            "name": "Jane Doe",
            "createdAt": "2024-04-28T12:00:00Z"
          },
          "signedUrl": "https://s3.amazonaws.com/bucket/userImage987654321.jpg"
        }
      ]
    }
    ```

---


