import users from "../auth/users.json"
import patients from "./patients.json"
import files from "./files.json"
import requests from "./requests"
import conversations from "./conversations.json"

export default {
  "requests": requests,
  "patients": patients,
  "users": users.users,
  "files": files,
  "conversations": conversations,
  "tickets": [
    {
      id: 1,
      "conversation_id": 1
    }
  ]
}
