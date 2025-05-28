# H2P – Simple service for converting HTML to PDF

H2P is a lightweight service designed to convert HTML content into PDF documents efficiently. It offers a straightforward API, making it ideal for applications that require dynamic PDF generation from HTML templates.


## Installation

To deploy H2P using Helm, follow these steps:

1. **Add the Helm repository**:

   ```bash
   helm repo add h2p https://dacdigital.github.io/h2p/charts
   helm repo update
   ```

2. **Install the H2P chart**:

   ```bash
   helm install h2p h2p/h2p
   ```

   This command deploys H2P into your Kubernetes cluster with default settings.

---

## Configuration

You can customize the deployment by providing your own `values.yaml` file or by setting parameters directly in the command line.

---

## Usage

Once deployed, H2P exposes an endpoint to which you can POST HTML content. It responds with the corresponding PDF.

### Example of the basic post request
```
curl --location --request POST 'http://localhost:3000/print' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "ExampleRoute",
    "html": "<html><body><h1>My first Heading</h1><p>My first paragraph.</p></body></html>"
}'
```

### Example of the basic post request with pdf options
```
curl --location --request POST 'http://localhost:3000/print' \
--header 'Content-Type: application/json' \
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

---

## Source Code

The source code for H2P is available on [GitHub](https://github.com/DACdigital/h2p).

---
