# R-IMAGE 
## MERN based Web App to view random images<br>
![screenshot](./screenshots/01.png)<br>
### PURPOSE
It allows you to enjoy viewing random images from the category you select with infinite scrolling without repeating images at least until the available unique images are exhausted.<br> 
### Structure
It consists of a frontend made in react that connects through an api with a backend made in node and express which uses a mongoDB database that stores the information of the images. When the images for a category in the database are not enough to satisfy the client's demand, the backend resorts to an external api and adds the new non-duplicate images to the stock.<br>
### Source of the images
The images and other information are obtained from the [Pexels](https://www.pexels.com/ "") [api](https://www.pexels.com/api/documentation/ "").<br>
### Pexels Limits
By default, the pexels API has a limited rate of requests per hour and per month.<br>
For more information see [this](https://www.pexels.com/api/documentation/#guidelines, "").<br>
![blocked](./screenshots/07.png)<br>
### Environment Variables
In the project client root directory:<br>
```vim .env.local```<br>
```
    REACT_APP_API_URL=YOUR_URL_TO_CONNECT_TO_THE_SERVER
    REACT_APP_API_TOKEN=YOUR_AUTH_TOKEN_TO_CONNECT
```

In the project server root directory:<br>
```vim .env```<br>
```
    MONGODB_URI=YOUR_URL_TO_CONNECT_TO_MONGODB
    PEXELS_API_KEY=YOUR_PEXELS_TOKEN
    CORS=1
    VERCEL=0
    SEARCH=SEARCH_OPTION
    PORT=YOUR_PORT
    API_TOKEN=YOUR_AUTH_TOKEN_TO_CONNECT
    SENDSYSTEM=SELECTED_EMAIL_SYSTEM
```
##### SEARCH OPTION
Allows you to select between two different methods to search for new images. According to the database service available:<br>
If you use the MongoDB Atlas shared plan, you should set
```
    SEARCH=AtlasFree
```
If you use other MongoDB Atlas plan or mongodb on localhost, you should set:<br>
```
    SEARCH=mongodb
```
##### CORS OPTION
```
    CORS=1 #Disable cors
```
```
    CORS=0 #Enable cors
```
##### API TOKEN
Adds another layer of security whereby the backend only allows connections that include a token in the headers.
The token in client and server must be the same and not including it in the server disables this option.
```
    REACT_APP_API_TOKEN=YOUR_AUTH_TOKEN_TO_CONNECT #Client
```
```
    API_TOKEN=YOUR_AUTH_TOKEN_TO_CONNECT #Server
```
##### STORAGE LIMIT
Allows you to set a maximum limit in Kilobytes to the size of the database.<br>
If this variable is not established or its value is 0, this feature is disabled.<br>
```
    STORAGE_LIMIT=YOUR_LIMIT_IN_KB #Server
```
##### VERCEL
In the vercel deploy it automatically sets the variables PORT and VERCEL<br>
#### Pexels Token
To create the authentication pexels token you can see [this](https://www.pexels.com/api/documentation/#authorization "").<br>
#### Submit Contact Email
![send mail](./screenshots/04.png)<br><br>
[FormsPree](https://formspree.io "") has been tested successfully.<br><br>
![received mail](./screenshots/06.png)<br>
To use it, you need to set the following environment variables on the server:
```
    SENDSYSTEM=Formspree
    FORMSPREE_SUBMIT_URL=YOUR_URL_FOR_SUBMIT
```
<br><br>
[Ethereal](https://ethereal.email "") has been tested successfully.<br><br>
![received mail](./screenshots/08.png)<br>
To use it, you need to set the following environment variables on the server:
```
    SENDSYSTEM=Nodemailer
    NODEMAILER_TRANSPORTER_USER=LINKED_EMAIL_ACCOUNT
    NODEMAILER_TRANSPORTER_PASS=LINKED_EMAIL_ACCOUNT_PASSWORD
    NODEMAILER_MAILOPTIONS_ADDRESSEE=EMAIL_RECEIVER
```
### Deploy Locally
```
git clone https://github.com/Apacagnini/r-image2.git
```
```
    cd r-image/client
    vim .env.local # add environment variables
    npm start
```
```
    cd r-image/server
    vim .env # add environment variables
    npm run dev
```