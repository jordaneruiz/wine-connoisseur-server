# WINE CONNOISSEUR 

## Description 
This app allows Wine collectors and lovers to buy very rare and exceptional bottles of wine. On the other side, people who own wine but do not appreciate it can sell it. 

## User Stories 
- **Signup:** User can Sign up in the platform to sell or buy a bottle
- **Login:** User can Sign in in the platform to sell or buy a bottle
- **Logout:** User can logout from the platform so his sells are safe / no one can purchase under his name 
- **Add a bottle for sale:** user can add a new bottle for sale
- **Delete bottle:** User can delete any bottle he was selling
- **User Profile:** both seller and buyer have a profile with a biography, a picture and previous sells or previous purchases. Each one of them can check other sellers / buyers’ profile
- **Payment:** as soon as a user clicks “buy it”, he can enter his payment information details 
- **Search & filter:** to improve the user’s research he can filter the wine per name and sorti it by year and price

## Backlog 
- Message or comments section: allows user and buyers to discuss about the wine specificity 
- Sophisticated payment system
- More filter option: grape variety


# Client / Frontend
## React Router Routes (React App)

**/**
- **Component:** Home - Search - Filter - All Wines List	
- public <Route>	
- Behavior: Home page


**/signup**	
- **Component:** Signup	
- public <Route>	
- Signup form with option to signin if already a user. 
- Redicrect to homepage after signin


**/login**	
- **Component:** Login	
- public <Route>	
- Login form, with option to signup, 
- Redirect to homepage after signin


**/logout**
- **Component:** n/a	
- user only <PrivateRoute>	
- Session Expired. 
- Redirect to homepage.


**/add-bottle**	
- **Component:** NavBar
- **Component:** AddWineForm	
- user only <PrivateRoute>	
- Allow user to add a new bottle for sell


**/bottle/:bottleId**
- **Component:** NavBar - WineDetail	
- user only <PrivateRoute>	
- Allow user to check wine details


**/bottle/:bottleId/edit**	
- **Component:** NavBar - WineEditForm	
- user only <PrivateRoute>	
- Allow user to edit the bottle’s information


**/profile/:userID**	
- **Component:** NavBar - ProfileForm	
- user only <PrivateRoute>	
- Allow any user to check his own profile or other user’s profile
- If seller : CurrentSales
- If buyer : PastSales


**/profile/:userID/edit**	
- **Component:** NavBar - ProfileEditForm	
- user only <PrivateRoute>	
- Allow user to edit his own information


**/buy/:bottleId**	
- **Component:** NavBar - PaymentForm	
- user only <PrivateRoute>	
- Allow a user to buy a bottle 


**/messages**	
- **Component:** NavBar - MessagesPage	
- user only <PrivateRoute>	
- Allow a user to have an overview of his past conversations

**/messages/send/:id"**			
/messages/:id			


          
## Components
- SignIn
- SignUp
- NavBar
- Search
- Filter
- AddWineForm
- WineDetail
- WineEditForm
- ProfileForm
- CurrentSales
- PastSales
- ProfileEditForm
- PaymentForm
- MessagesPage

# Server / Backend
<br>
## Models

## User model 
```javascript
name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String
    }, 
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String
    }, 
  }
```


## Wine model 
```javascript
name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    description: {
      type: String
    }, 
    pays: {
      type: String,
      required: true,
    },
region: {
      type: String,
      required: true,
    },
    grapeVariety: {
      type: String,
      required: true,
    },
    color: {
      type: String
    }, 
user: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User"
    },
  }
```

## Message Model 
```javascript
sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  },
  previous: Schema.Types.ObjectId
},
```


# API Endpoints (backend routes)

## HTTP Method	URL	Description

**POST**	
- /auth/signup	
- Checks if form fields are not empty (422) 
- Checks if user not exists (409), 
- Create user with encrypted password, 
- Store user in session

**POST**	
- /auth/login	Checks if fields not empty (422), 
- Checks if user exists (404), 
- Checks if password matches (404), 
- Stores user in session

**POST**	
- /auth/ logout	
- Logs out the user

**POST**	
- /add-bottle	
- Creates a new bottle for sale 
- Bottle will be display in both Home page and User profile

**GET**
- /bottlel/:bottleId	
- Shows detailed bottles information 

**PATCH**	
- /bottle/:bottleId/edit	
- Allows the user to edit the product he his selling

**DELETE**	
- /bottle/:bottleId/delete	
- Allows user to delete one of his bottles

**GET**	
- /profile/:userID	
- Allows any user so see his own profile or someone else profile

**PATCH**	
- profile/:userID/edit	
- Allows user to edit his own profile

**POST**	
- /buy/:bottleId	
- Allows user to buy a bottle and proceed to payment

**GET**	
- /message	
- Access to messages box

**GET** 	
- /message/sent/:id"	
- Read a message we sent

**POST**	
- /message/send/:id"	
- Send a new message to a user

**GET**	
- /message/received/:id	
- Read a message we received


# Links

## Trello
[Link trello board](https://trello.com/b/4olQdapz/project-3-wine-connoisseur) 

## Git 
[Client repository Link](https://github.com/jordaneruiz/wine-connoisseur-client)

[Server repository Link](https://github.com/jordaneruiz/wine-connoisseur-server)

[Deployed App Link](https://wine-connoisseur.herokuapp.com/)

## Slides
[Slides Link](https://drive.google.com/file/d/11P0sXuTTZA3o8f6S9R1QFd8ayqfrM2aw/view?usp=sharing)