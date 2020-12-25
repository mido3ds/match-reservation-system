# API endpoints
All API endpoints should return code=200 whether an error happened or not. 
Except when a requested page/endpoint doesn't exist, then return 404.
Or if an internal server exception happened, then return 500.

If any other error happened, then return code=200 and body={'error': '< describe cause of error >'}.
If not error happened, either no body is returned, or 'error' is not in the body.

The reason not to use standard http codes, because they suck 凸( ` ﾛ ´ )凸.
With err messages in json, you can describe verbosely what happened, and it's less code to deal with in the frontend.

## Users
- POST /api/user
```
{
    'username': 'foo',
    'password': 'pass238h',
    'firstName': 'Mahmoud',
    'lastName': 'Adas',
    'birthDate': '1997-09-11', // yyyy-mm-dd
    'gender': 'male', // or female
    'city': 'Cairo',
    'address': '14 blah blah st.', //optional
    'email': 'adas@example.com'
    'role': 'fan' // or manager, but this needs acceptance from the admin first
}
```
returns:
    + If signed-up as `fan`, and it was a successfull, then return the token {'authToken': 'aoh2hnovsuhvh02ehf'}, it used in any endpoint that requires authentication.
    + If signed-up as `manager`, and it was a valid info, then return {'authToken': null, 'msg': 'Your sign-up request is sent to the admin for review. We will email you later about it.'}
    + If signed-up as `fan`, and it wasn't valid, then return an error that describes why it wasn't valid {'err', 'ಠ_ಠ what the hell?'}

- PUT /api/user/<username>
authToken in cookies, must be either an admin or the account owner
```
{
    // some or all of the following (no username or email)
    'password': 'pass238h',
    'firstName': 'Mahmoud',
    'lastName': 'Adas',
    'birthDate': '1997-09-11', // yyyy-mm-dd
    'gender': 'male', // or female
    'city': 'Cairo',
    'address': '14 blah blah st.',
    'role': 'fan' // or manager, but this needs acceptance from the admin first
}
```

returns:
    + If signed-up as `fan`, and it was a successfull, then return {}
    + If signed-up as `manager`, and it was a valid info, then return {'authToken': null, 'msg': 'Your sign-up request is sent to the admin for review. We will email you later about it.'}
    + If signed-up as `fan`, and it wasn't valid, then return an error that describes why it wasn't valid {'err', 'ಠ_ಠ what the hell?'}
    
- GET /api/users?[page=[int >= 1]]
authToken in cookies, must be admin

returns:
```
[
    {
        'username': ..., 'firstName': ..., .... // it shouldn't return password
    },
    ....
]
```

- DELETE /api/user/<username>
authToken in cookies, must be admin

- POST /api/login
```
{
    'username': 'foo', 'password': 'fjowihef'
}
```
returns:
    + if valid: {'authToken': 'oefowefuowhe'}
    + otherwise: {'err': 'wrong user/password'}

## Admin/Managers
- GET /api/managers/requests[?page=[int >= 1]]
authToken in cookies, must be admin

returns: 
```
[
    {'username': ..., 'firstName': ....},
    ....
]
```

- POST /api/managers/requests/<username>/accept 
authToken in cookies, must be admin

returns:
    + if accepted, {}
    + not found: {'err': 'username not found'}

## Matches
- GET /api/matches?[page={int >= 1}]

returns:
```
[
    {
        'homeTeam': 'adsfasdf',
        'awayTeam': 'woejfe',
        'venue': '<stadium UUID>',
        'dateTime': '2020-12-25_14:30', // yyyy-mm-dd_HH:MM cairo time
        'mainReferee': 'Mahmoud Othman',
        'firstLinesman': 'fasdfaf',
        'secondLinesman': 'asdfawoj'
    },...
]
```

- GET /api/match/<UUID>

returns:
    + if doesn't exist, return {'err': 'invalid id'}
    + otherwise: 
    ```
    {
        'homeTeam': 'adsfasdf',
        'awayTeam': 'woejfe',
        'venue': '<stadium UUID>',
        'dateTime': '2020-12-25_14:30', // yyyy-mm-dd_HH:MM cairo time
        'mainReferee': 'Mahmoud Othman',
        'firstLinesman': 'fasdfaf',
        'secondLinesman': 'asdfawoj'
    }
    ```
    
- POST /api/match
```
{
    'homeTeam': 'adsfasdf',
    'awayTeam': 'woejfe',
    'venue': '<stadium UUID>',
    'dateTime': '2020-12-25_14:30', // yyyy-mm-dd_HH:MM cairo time
    'mainReferee': 'Mahmoud Othman',
    'firstLinesman': 'fasdfaf',
    'secondLinesman': 'asdfawoj'
}
```

returns:
    + if invalid, return {'err': 'err message'}
    + otherwise, return {}

- PUT /api/match/<UUID>
authToken in cookies, only admin/manager
```
{
    // any or all of the following
    'homeTeam': 'adsfasdf',
    'awayTeam': 'woejfe',
    'venue': '<stadium UUID>',
    'dateTime': '2020-12-25_14:30', // yyyy-mm-dd_HH:MM cairo time
    'mainReferee': 'Mahmoud Othman',
    'firstLinesman': 'fasdfaf',
    'secondLinesman': 'asdfawoj'
}
```

## Seats
- GET /api/match/<UUID>/seats
returns:
```
{
    'reserved': ['A1', 'B3', 'F15', 'A4' ... ]
}
```

- POST /api/match/<UUID>/seat/<UUID>/reserve
authToken in cookies
```
{
    'creditCardNumber': '1820sda921',
    'pin': 23140
}
```

returns:
    + if valid: {'ticketNumber': 'ajsdfehjf28ehfjosdfh'}
    + otherwise, err with describtion

- DELETE /api/match/<UUID>/seat/<UUID> or DELETE /api/ticket/<UUID>
authToken in cookies, user must be owner of ticket, match hasn't taken place yet

returns:
    + if no error: {}
    + otherwise: err with describtion

## Stadiums
- GET /api/stadiums?[page={int >= 1}]
returns: 
```
[
    {'name': '..', 'city': '....', 'UUID': 'wjfoh8eh'},
    ....
]
```

- POST /api/stadium
authToken in cookies, and server must check that it's a manager/admin account

```
{
    'name': 'ستاد طوخ طنبشا الدولي لكرة الشراب',
    'city': 'طوخ طنبشا'
}
```
if invalid returns error describing where is the issue

