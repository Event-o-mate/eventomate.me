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

| method | route                    | req data   | res data        | res errors       |
| ------ | ------------------------ | ---------- | --------------- | ---------------- |
| get    | /user/:id/event          | -          | user events     | -                |
| get    | /event/:id/attendee      | -          | event attendees | -                |
| put    | /user/:id/event          | event data | -               | 1002             |
| put    | /event/:id/attendee      | user_id    | event attendee  | -                |
| get    | /:model (abstract)       | -          | -               | 1001, 1008       |
| get    | /:model/:id (abstract)   | -          | -               | 1001, 1008       |
| put    | /:model (abstract)       | -          | -               | 1002, 1008       |
| post   | /:model/?:id? (abstract) | -          | -               | 1001, 1003, 1008 |
| delete | /:model/:id (abstract)   | -          | -               | 1001, 1004, 1008 |

### `/api/sections`

| method | route | req data                       | res data     | res errors |
| ------ | ----- | ------------------------------ | ------------ | ---------- |
| get    | /     | -                              | all sections | 1001       |
| get    | /:id  | -                              | section      | 1001       |
| post   | /     | event_id, widget_type          | section      | 1001, 1002 |
| put    | /:id  | event_id, widget_type, enabled | -            | 1001, 1003 |
| delete | /:id  | -                              | -            | 1001       |

### `/api/users`

| method | route                       | req data                                                                 | res data         | res errors |
| ------ | --------------------------- | ------------------------------------------------------------------------ | ---------------- | ---------- |
| get    | /                           | -                                                                        | all users        | 1001       |
| get    | /:id                        | -                                                                        | user             | 1001       |
| post   | /                           | email, password, token                                                   | user             | 1002       |
| put    | /:id                        | email, password, token                                                   | user             | 1001, 1003 |
| delete | /:id                        | -                                                                        | -                | 1001       |
| get    | /:id/account                | -                                                                        | user.account     | -          |
| post   | /:id/account                | name, email                                                              | -                | 1001, 1002 |
| get    | /:id/events                 | -                                                                        | all user events  | 1001       |
| get    | /:id/events/:event_id       | -                                                                        | user event       | 1001       |
| post   | /:id/events                 | sections, title, address, lat, lng, start_date, finish_date, description | user event       | 1001, 1002 |
| get    | /:id/comments               | -                                                                        | user comments    | 1001       |
| get    | /:id/comments/:comment_id   | -                                                                        | user comments    | 1001       |
| get    | /:id/attendees              | -                                                                        | attending events | 1001       |
| get    | /:id/attendees/:attendee_id | -                                                                        | attending event  | 1001       |

### `/api/widgets`

| method | route | req data | res data    | res errors |
| ------ | ----- | -------- | ----------- | ---------- |
| get    | /     | -        | all widgets | 1001       |
| get    | /:id  | -        | widget      | 1001       |
| post   | /     | type     | widget      | 1001       |
| put    | /:id  | type     | widget      | 1001, 1003 |

## Respose errors:

1001, "Invalid data request, or data missing."  
1002, "Record not created, invalid data request, or sent data invalid."  
1003, "Record not saved, invalid data request, or sent data invalid."  
1004, "Record not deleted, data missing, or invalid data request."  
1005, "Provided email is in use by another user."  
1006, "Invalid email and password combination."  
1007, "There is no user with provided email in our records."  
1008, "Invalid model request."  
1009, "Invalid recovery code."
