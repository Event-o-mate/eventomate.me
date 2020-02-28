### Hello, I'm your mate, Evento Mate.

## Endpoints:

### `/api/accounts`

| method | route | req data                              | res data     | res errors |
| ------ | ----- | ------------------------------------- | ------------ | ---------- |
| get    | /     | -                                     | all accounts | 1001       |
| get    | /:id  | -                                     | account      | 1001       |
| post   | /     | name, email                           | account      | 1001, 1002 |
| put    | /:id  | name, email, verified, receive_emails | account      | 1001, 1003 |
| delete | /:id  | -                                     | -            | 1001       |

### `/api/attendees`

| method | route | req data          | res data      | res errors |
| ------ | ----- | ----------------- | ------------- | ---------- |
| get    | /     | -                 | all attendees | -          |
| get    | /:id  | -                 | attendee      | -          |
| post   | /     | user_id, event_id | attendee      | 1002       |
| delete | /:id  | -                 | -             | 1001       |

### `/api/authenticate`

| method | route             | req data                      | res data                                             | res errors |
| ------ | ----------------- | ----------------------------- | ---------------------------------------------------- | ---------- |
| post   | /register         | email, password, name         | {emai, password, token, account.name, account.email} | 1002, 1005 |
| post   | /login            | email, password               | {logged_in, token, id, email}                        | 1006       |
| post   | /recover/password | email                         | {email_sent}                                         | 1007       |
| post   | /recover/account  | code                          | {valid_user, user}                                   | 1009       |
| post   | /change/password  | email, password, new_password | {password_changed}                                   | 1006       |
| put    | /logout/:id       | -                             | {loged_out}                                          | 1001       |

### `/api/comments`

| method | route | req data                   | res data        | res errors |
| ------ | ----- | -------------------------- | --------------- | ---------- |
| get    | /     | -                          | all comments    | 1001       |
| get    | /:id  | -                          | comment         | 1001       |
| post   | /     | event_id, user_id, content | {content, user} | 1001, 1002 |
| put    | /:id  | user_id, content           | comment         | 1001, 1003 |
| delete | /:id  | -                          | -               | 1001       |

### `/api/events`

| method | route                       | req data                                                                | res data                                  | res errors |
| ------ | --------------------------- | ----------------------------------------------------------------------- | ----------------------------------------- | ---------- |
| get    | /                           | -                                                                       | all events                                | 1001       |
| get    | /:id                        | -                                                                       | event                                     | 1001       |
| post   | /                           | user_id, title, address, lat, lng, start_date, finish_date, description | {event.attributes}                        | 1001, 1002 |
| put    | /:id                        | -                                                                       | {event.attributes, event.user}            | 1001, 1003 |
| delete | /:id                        | -                                                                       | -                                         | -          |
| get    | /:id/attendees              | -                                                                       | all attendees                             | 1001       |
| get    | /:id/attendees/:attendee_id | -                                                                       | attendee                                  | 1001       |
| post   | /:id/attendees              | user_id                                                                 | attended + attendee.user                  | 1001, 1002 |
| delete | /:id/attendees/:user_id     | -                                                                       | -                                         | 1001       |
| get    | /:id/comments               | -                                                                       | all comments                              | 1001       |
| get    | /:id/comments/:comment_id   | -                                                                       | comment                                   | 1001       |
| post   | /:id/comments               | -                                                                       | {comment.content, comment.user}           | 1001, 1002 |
| get    | /:id/sections               | -                                                                       | all widget                                | 1001       |
| get    | /:id/sections/:section_id   | -                                                                       | widget                                    | 1001       |
| post   | /:id/sections               | widget_type                                                             | section + section.enable + section.widget | 1001, 1002 |

### `/api/records`

| method | route               | req data | res data | res errors |
| ------ | ------------------- | -------- | -------- | ---------- |
| get    | /user/:id/event     | -        | -        | -          |
| get    | /event/:id/attendee | -        | -        | -          |
| put    | /user/:id/event     | -        | -        | -          |
| put    | /event/:id/attendee | -        | -        | -          |
| get    | /:model             | -        | -        | -          |
| get    | /:model/:id         | -        | -        | -          |
| put    | /:model             | -        | -        | -          |
| post   | /:model/?:id?       | -        | -        | -          |
| delete | /:model/:id         | -        | -        | -          |

### `/api/sections`

| method | route | req data | res data | res errors |
| ------ | ----- | -------- | -------- | ---------- |
| get    | /     | -        | -        | -          |
| post   | /     | -        | -        | -          |
| put    | /     | -        | -        | -          |
| delete | /     | -        | -        | -          |

### `/api/users`

| method | route | req data | res data | res errors |
| ------ | ----- | -------- | -------- | ---------- |
| get    | /     | -        | -        | -          |
| post   | /     | -        | -        | -          |
| put    | /     | -        | -        | -          |
| delete | /     | -        | -        | -          |

### `/api/widge`

| method | route | req data | res data | res errors |
| ------ | ----- | -------- | -------- | ---------- |
| get    | /     | -        | -        | -          |
| post   | /     | -        | -        | -          |
| put    | /     | -        | -        | -          |
| delete | /     | -        | -        | -          |

## Respose errors:

1001, "Invalid data request, or data missing."  
-1002, "Record not created, invalid data request, or sent data invalid."  
-, "Record not saved, invalid data request, or sent data invalid."  
1004, "Record not deleted, data missing, or invalid data request."  
1005, "Provided email is in use by another user."  
1006, "Invalid email and password combination."  
1007, "There is no user with provided email in our records."  
1008, "Invalid model request."  
1009, "Invalid recovery code."
