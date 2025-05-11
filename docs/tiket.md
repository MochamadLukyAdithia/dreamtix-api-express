# Tikets API Spec

## Create Tiket API

**Endpoint:** `POST /api/events/:id_event/tikets`

**Headers:**

* `Authorization: token`

**Request Body:**

```json
{
  "name": "Regular Pass",
  "price": 50000
}
```

**Response Body Success:**

```json
{
  "data": {
    "id_tiket": 1,
    "name": "Regular Pass",
    "price": 50000,
    "createdAt": "2025-05-11T10:00:00.000Z",
    "updatedAt": "2025-05-11T10:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Tiket name is required"
}
```

---

## Get Tiket API

**Endpoint:** `GET /api/events/:id_event/tikets/:id_tiket`

**Headers:**

* `Authorization: token`

**Response Body Success:**

```json
{
  "data": {
    "id_tiket": 1,
    "name": "Regular Pass",
    "price": 50000,
    "createdAt": "2025-05-11T10:00:00.000Z",
    "updatedAt": "2025-05-11T10:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Tiket not found"
}
```

---

## Update Tiket API

**Endpoint:** `PUT /api/events/:id_event/tikets/:id_tiket`

**Headers:**

* `Authorization: token`

**Request Body:**

```json
{
  "name": "VIP Pass",
  "price": 100000
}
```

**Response Body Success:**

```json
{
  "data": {
    "id_tiket": 1,
    "name": "VIP Pass",
    "price": 100000,
    "createdAt": "2025-05-11T10:00:00.000Z",
    "updatedAt": "2025-05-11T12:00:00.000Z"
  }
}
```

**Response Body Error:**

```json
{
  "errors": "Tiket not found"
}
```

---

## Delete Tiket API

**Endpoint:** `DELETE /api/events/:id_event/tikets/:id_tiket`

**Headers:**

* `Authorization: token`

**Response Body Success:**

```json
{
  "data": "OK"
}
```

**Response Body Error:**

```json
{
  "errors": "Tiket not found"
}
```

---

## List Tikets API

**Endpoint:** `GET /api/events/:id_event/tikets`

**Headers:**

* `Authorization: token`

**Response Body Success:**

```json
{
  "data": [
    {
      "id_tiket": 1,
      "name": "Regular Pass",
      "price": 50000,
      "createdAt": "2025-05-11T10:00:00.000Z",
      "updatedAt": "2025-05-11T10:00:00.000Z"
    },
    {
      "id_tiket": 2,
      "name": "VIP Pass",
      "price": 100000,
      "createdAt": "2025-05-11T10:05:00.000Z",
      "updatedAt": "2025-05-11T10:05:00.000Z"
    }
  ]
}
```

**Response Body Error:**

```json
{
  "errors": "No tikets found"
}
```
