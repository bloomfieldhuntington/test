# ROUTES
#### There are no public routes!

## COMPANY
* Create C_user
* POST    /api/company/c_users/register
* POST    /api/company/c_users/login
* GET     /api/company/c_users/current

#### Create/Update/View C_profile
* GET     /api/company/c_profile
* GET     /api/company/c_profile/company/:company
* GET     /api/company/c_profile/user/:user_id
* GET     /api/company/c_profile/all

* POST      /api/company/c_profile (create or update)

* DELETE  /api/company/c_profile/ (delete current user & profile)

## POST JOB

#### Create post
* POST    /api/company/posts (Create new post (c_user only))
* POST    /api/company/posts/enroll/:post_id (let solver enroll)
* POST    /api/company/posts/withdraw/:post_id (let solver withdraw) !!NB!! test c_user access more

* GET     /api/company/posts (Get all posts)
* GET     /api/company/posts/:id (Get post by id)

* DELETE /api/company/posts/:id (Delete post by id)

// POSTS SHOULD A DIRECT ROUTE IN FUTURE VERSIONS: "/api/posts/... Not inside /api/company/posts


## SOLVER
#### Create S_user
* POST    /api/solver/s_users/register
* POST    /api/solver/s_users/login
* GET     /api/solver/s_users/current

#### Create/Update/View S_profile
* GET     /api/solver/s_profile
* GET     /api/solver/s_profile/handle/:handle
* GET     /api/solver/s_profile/user/:user_id

* POST    /api/solver/s_profile (create or update)
* POST    /api/solver/s_profile/experience (add experience)
* POST    /api/solver/s_prifile/education (add education)

* DELETE  /api/solver/s_profile/experience/:experience_id
* DELETE  /api/solver/s_profile/education/:education_id
* DELETE  /api/solver/s_profile/ (delete current user & profile)

# ROUTES WISHLIST
##### Write down routes you would like to have here:

# WARNINGS
* Enter: "proxy": "http://localhost:5000", in Client side package.json file under "scripts". Removed after port:5000 crashes.
# TODOs
* Edit <PrivateRoute> so that no auth-user CANT can go from /dahsboard to /dashboardSolver.
* App enters infinite loop if server is reloaded AFTER token has expired. YELLOW FIX