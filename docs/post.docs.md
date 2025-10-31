## Test The Routes

### Create Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is awesome!",
    "userId": 17
  }'
```

### Get All Posts
```bash
curl http://localhost:5000/api/posts
```

### Get Post by ID
```bash
curl http://localhost:5000/api/posts/1
```

### Get User's Posts
```bash
curl http://localhost:5000/api/posts/user/17
```

### Search Posts
```bash
curl "http://localhost:5000/api/posts?q=awesome"
```

### Update Post
```bash
curl -X PATCH http://localhost:5000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Delete Post
```bash
curl -X DELETE http://localhost:5000/api/posts/1
```

---

## Response Examples

**Create Post (201):**
```json
{
  "status": "success",
  "statusCode": 201,
  "message": "Post created successfully",
  "data": {
    "id": 1,
    "title": "My First Post",
    "content": "This is awesome!",
    "userId": 17,
    "createdAt": "2025-10-26T00:00:00.000Z",
    "updatedAt": "2025-10-26T00:00:00.000Z"
  }
}
```

**Get Post with Author (200):**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Post retrieved successfully",
  "data": {
    "id": 1,
    "title": "My First Post",
    "content": "This is awesome!",
    "userId": 17,
    "author": {
      "id": 17,
      "name": "Yusuf Mustahan",
      "email": "yumustyology@gmail.com"
    },
    "createdAt": "2025-10-26T00:00:00.000Z",
    "updatedAt": "2025-10-26T00:00:00.000Z"
  }
}
```