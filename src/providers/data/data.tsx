import users from "../auth/users.json"
import patients from "../data/patients.json"
import files from "../data/files.json"
import requests from "../data/requests.json"
import conversations from "../data/conversations.json"

export default {
  "requests": requests,
  "patients": patients,
  "users": users.users,
  "files": files,
  "conversations": conversations
}
