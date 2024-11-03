import users from "../auth/users.json"

export default [
  {
    "id": 1,
    "patient_id": 1,
    "user_id": 2,
    "author": users.users.filter(u => u.id == 2)[0],
    "message": "Něco mě trápí a nevím, jestli je to vážné",
    "avatar": "./parent_avatar.svg",
    "date": "2024-11-02T08:07:52.429Z",
    "request_id": 1
  },
  {
    "id": 2,
    "patient_id": 1,
    "user_id": 3,
    "author": users.users.filter(u => u.id == 3)[0],
    "message": "Pošlete prosím fotku",
    "avatar": "./doctor_avatar.svg",
    "date": "2024-11-02T08:08:52.429Z",
    "request_id": 1
  },
  {
    "id": 3,
    "patient_id": 1,
    "user_id": 2,
    "author": users.users.filter(u => u.id == 2)[0],
    "message": "Přikládám fotku",
    "avatar": "./parent_avatar.svg",
    "date": "2024-11-02T08:08:59.429Z",
    "request_id": 1
  },
  {
    "id": 4,
    "patient_id": 1,
    "user_id": 2,
    "author": users.users.filter(u => u.id == 2)[0],
    "image_name": "photo.png",
    "image_url": "./fever.png",
    "avatar": "./parent_avatar.svg",
    "date": "2024-11-02T08:08:59.429Z",
    "request_id": 1
  }
]