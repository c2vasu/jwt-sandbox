#jwt-sandbox
JSON Web Token (JWT) implementation using Nodejs.

### Generate keys
PRIVATE and PUBLIC are generated from http://travistidwell.com/jsencrypt/demo/
```
let privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
let publicKEY = fs.readFileSync('./public/public.key', 'utf8');
```

## Usages
Various REST API endpoints.

### getToken
```
curl -X GET http://localhost:3000/genToken
```

### public.key
```
curl -X GET http://localhost:3000/public.key
```

### verify
```
curl -X GET \
  http://localhost:3000/verify \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMSI6IkRhdGEgMSIsImRhdGEyIjoiRGF0YSAyIiwiZGF0YTMiOiJEYXRhIDMiLCJkYXRhNCI6IkRhdGEgNCIsImlhdCI6MTU2NjYxNzExNywiZXhwIjoxNTY2NjE3MjM3LCJhdWQiOiJodHRwOi8vc3Jpbml2YXNhLmluZm8iLCJpc3MiOiJTb2RhbGV0YW0gSW5jb3Jwb3JhdGlvbiIsInN1YiI6InNyaW5pdmFzYUBzb2RhdmFyYW0uY29tIn0.FIYSVqUjVb4n2WGkxLPhiK0SCRvA3jYDS3q7iV38r8gQZEXdsKJyCef8murGe42GoxD0n89sX9dP4w7AmniLaQ'
```

### login
```
curl -X POST \
  http://localhost:3000/login \
  -H 'authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMSI6IkRhdGEgMSIsImRhdGEyIjoiRGF0YSAyIiwiZGF0YTMiOiJEYXRhIDMiLCJkYXRhNCI6IkRhdGEgNCIsImlhdCI6MTU2NjYxNTY5MSwiZXhwIjoxNTY2NjE1ODExLCJhdWQiOiJodHRwOi8vc3Jpbml2YXNhLmluZm8iLCJpc3MiOiJTb2RhdmFyYW0gSW5jb3Jwb3JhdGlvbiIsInN1YiI6InNyaW5pdmFzYUBzb2RhdmFyYW0uY29tIn0.Ks9oPasrkfZrqmYnAo8uFX2T-uYR7e-JgJr8AIXNHGKqPIPZfjU4Nb_nksdrGfRzKooZFK3JNJGleYKnmbhEbg' \
  -H 'content-type: application/json' \
  -d '{
	"username" : "srini",
	"password" : "mypassword"
    }'
```


## API authentication
This is probably the only sensible way to use JWT.

A common scenario is: you sign up for a service and download a JWT from the service dashboard. This is what you will use from now on to authenticate all your requests to the server.
![alt text](jwt-api-authentication.png "API Authentication")
