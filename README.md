# xgen-coding-challenge
## Requirements
* Write a script using the index.js file that will:
    * Take the provided HTML template and use it to display 4 products in the `#XgenElement` div
    * Replace any `{{...}}` fields with the information from the products
        * EX: `{{prod_name}}` should be replaced with `Top 2`
    * Only display Tops, every other type of product should be excluded
    * Exclude any product that is `"is_in_stock": "0"`
* This should be done programmatically and nothing should be hard coded
    * If you were to add a new HTML template with new `{{...}}` fields it should still work
    * If you mix up the order of the products or add new ones, the correct products should still be displayed
    * Using indices like `products[3]` to filter out products does not count
* Products are stored in the global variable `products`
* The HTML template is stored in the global variable `htmlTemplate`
* Use style.css to make the products presentable, but it doesn't have to look fancy

## Bonus Points
* Create your own HTML template with the provided products
* Show product sale prices if a product is on sale
* Style the page to look pretty