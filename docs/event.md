
# Events API Spec

## Create Event API

**Endpoint:** `POST /api/events`

**Headers:**  
- ``Authorization: token``

**Request Body:**

```json
{
  "name": "Tech Conference",
  "description": "Annual technology conference",
  "date": "2025-08-01T10:00:00.000Z",
  "location": "Jakarta"
}
```

**Response Body Success:**

```json
{
  "data": {
    "id_event": 1,
    "name": "Tech Conference",
    "description": "Annual technology conference",
    "date": "2025-08-01T10:00:00.000Z",
    "location": "Jakarta",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Event name is required"
}
```

---

## Update Event API

**Endpoint:** `PUT /api/events/:id`

**Headers:**  
- `Authorization: token`

**Request Body:**

```json
{
  "name": "Updated Conference Name",
  "description": "Updated description",
  "date": "2025-08-02T10:00:00.000Z",
  "location": "Bandung"
}
```

**Response Body Success:**

```json
{
  "data": {
    "id_event": 1,
    "name": "Updated Conference Name",
    "description": "Updated description",
    "date": "2025-08-02T10:00:00.000Z",
    "location": "Bandung",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-10T08:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Event not found"
}
```

---

## Get Event API

**Endpoint:** `GET /api/events/:id`

**Headers:**  
- `Authorization: token`

**Response Body Success:**

```json
{
  "data": {
    "id_event": 1,
    "name": "Tech Conference",
    "description": "Annual technology conference",
    "date": "2025-08-01T10:00:00.000Z",
    "location": "Jakarta",
    "createdAt": "2025-05-09T12:00:00.000Z",
    "updatedAt": "2025-05-09T12:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Event not found"
}
```

---

## Search Events API

**Endpoint:** `GET /api/events`

**Headers:**  
- `Authorization: token`

**Query Params:**  
- name: search by name (optional)  
- location: search by location (optional)  
- page: number of page (default: 1)  
- size: size per page (default: 10)

**Response Body Success:**

```json
{
  "data": [
    {
      "id_event": 1,
      "name": "Tech Conference",
      "description": "Annual technology conference",
      "date": "2025-08-01T10:00:00.000Z",
      "location": "Jakarta",
      "createdAt": "2025-05-09T12:00:00.000Z",
      "updatedAt": "2025-05-09T12:00:00.000Z"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 2,
    "total_item": 20
  }
}
```

---

## Delete Event API

**Endpoint:** `DELETE /api/events/:id`

**Headers:**  
- `Authorization: token`

**Response Body Success:**

```json
{
  "data": "OK"
}
```

**Response Body Error:**

```json
{
  "errors": "Event not found"
}
```
