# Simple service for converting HTML to PDF

### Configuring generated PDF
To adjust generated pdf to your needs please send proper options inside the body of
your post request. To accomplish this, please follow JSON object format
mentioned in the official puppeteer docs:
https://devdocs.io/puppeteer/index#pagepdfoptions

### Example of the basic post request
```
curl --location --request POST 'http://localhost:3000/print' \
--header 'Content-Type: application/json' \
--output example.pdf \
--data-raw '{
    "title": "ExampleRoute",
    "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
}'
```

### Example of the basic post request with pdf options
```
curl --location --request POST 'http://localhost:3000/print' \
--header 'Content-Type: application/json' \
--output example.pdf \
--data-raw '{
    "title": "ExampleRoute",
    "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>",
    "options":
    {
        "margin":
        {
            "top": "35px",
            "right": "35px",
            "left": "35px"
        }
    }
}'
```
