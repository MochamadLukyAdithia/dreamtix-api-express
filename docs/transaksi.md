# Transaksi Api Spec
## Create Transaksi Api
## Get Event API

**Endpoint:** `GET /api/transaksi/:id`

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