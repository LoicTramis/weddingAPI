# WeddingGuests API
The WeddingGuestAPI stores and sends a list of guests.

## Route
- "/" *GET Request*: Get all guests, receives data in a JSON format
- "/" *POST Request*: Set all guests, data needs to be in a JSON format.

## Storage

The database used is MongoDB, since it stores data in a JSON format.
- **Download** and **install**:
```bash
npm install mongo@6.1
```
- **Deploy** with MongoDB Atlas:
  - Add my IP address in Altas
  - Connect with connection string

- **Retreive** all guests:
- **Store** all guests:

## Deployment

The API is deployed with Heroku

### **Server deployment with Heroku**  
[Heroku CLI](https://devcenter.heroku.com/articles/deploying-nodejs)
```bash
git add .
git commit -m "Message"
heroku login
git push heroku master
```

GitHub

### Problems encounter
- *POST*: Anyone can send a post requst  
**Solution**: Send the *POST* request with a private key in the header, store the key in a .env file.

- *STORAGE*: [Uploaded files are deleted after a while.](https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted-from-the-application)  
**Solution**: Use a database to store persistent data [(MongoDB)](https://www.mongodb.com/developer/products/atlas/use-atlas-on-heroku/)
