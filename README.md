# R-IMAGE 
## React based web app to view random images of selected theme
![screenshot](./screenshots/01.png)<br>
### Source of the images
The images and other information are obtained from the [Pexels](https://www.pexels.com/ "") [api](https://www.pexels.com/api/documentation/ "").<br>
### Limits
By default, the pexels API has a limited rate of requests per hour and per month.<br>
R-IMAGE is automatically blocked for a while when this limit is reached.<br>
For more information see [this](https://www.pexels.com/api/documentation/#guidelines, "").<br>
![blocked](./screenshots/07.png)<br>
### Environment Variables
In the project root directory:<br>
```vim .env.local```<br>
```
    REACT_APP_PEXELS_API_KEY=YOUR_PEXELS_TOKEN
    REACT_APP_FORM_SUBMIT_URL=YOUR_URL_FOR_SUBMIT
```
#### Pexels Token
To create the authentication pexels token you can see [this](https://www.pexels.com/api/documentation/#authorization "").<br>
#### Submit URL
For sending contact email [FormsPree](https://formspree.io "") has been tested successfully.<br><br>
![send mail](./screenshots/04.png)<br><br>
![received mail](./screenshots/06.png)<br>