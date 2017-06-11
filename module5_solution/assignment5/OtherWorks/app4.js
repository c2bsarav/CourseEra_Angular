//https://github.com//jhu-ep-coursera/restaurant-server


//https://fabraga.github.io/AngularJS/coursera-ychaikin/week5/#/myinfo




//index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>David Chu's China Bistro</title>
    <link href='https://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/restaurant.css">
    <link rel="stylesheet" href="css/common.css">
  </head>
  <body ng-app="restaurant" ng-strict-di>

    <!-- Fixed position loading indicator -->
    <loading class="loading-indicator"></loading>

    <header>
      <nav id="header-nav" class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <a href="index.html" class="pull-left visible-md visible-lg">
              <div id="logo-img" alt="Logo image"></div>
            </a>

            <div class="navbar-brand">
              <a href="index.html"><h1>David Chu's China Bistro</h1></a>
              <p>
              <img src="images/star-k-logo.png" alt="Kosher certification">
              <span>Kosher Certified</span>
              </p>
            </div>

            <button id="navbarToggle" type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapsable-nav" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>

          <div id="collapsable-nav" class="collapse navbar-collapse">
            <ul id="nav-list" class="nav navbar-nav navbar-right">
              <li id="navHomeButton" class="visible-xs">
                <a href="index.html">
                  <span class="glyphicon glyphicon-home"></span> Home</a>
              </li>
              <li id="navMenuButton" ui-sref-active="active">
                <a ui-sref="public.menu">
                  <span class="glyphicon glyphicon-cutlery"></span><br class="hidden-xs"> Menu</a>
              </li>
              <li id="navInfoButton" ui-sref-active="active">
                <a ui-sref="public.myinfo">
                  <span class="glyphicon glyphicon-info-sign"></span><br class="hidden-xs"> My Info</a>
              </li>
              <li id="navSignButton" ui-sref-active="active">
                <a ui-sref="public.signup">
                  <span class="glyphicon glyphicon-envelope"></span><br class="hidden-xs"> Sign Up</a>
              </li>
              <li id="phone" class="hidden-xs">
                <a href="tel:410-602-5008">
                  <span>410-602-5008</span><div>* We Deliver</div></a>
              </li>
            </ul><!-- #nav-list -->
          </div><!-- .collapse .navbar-collapse -->
        </div><!-- .container -->
      </nav><!-- #header-nav -->
    </header>

    <div id="call-btn" class="visible-xs">
      <a class="btn" href="tel:410-602-5008">
        <span class="glyphicon glyphicon-earphone"></span>
        410-602-5008
      </a>
    </div>
    <div id="xs-deliver" class="text-center visible-xs">* We Deliver</div>

    <ui-view>
      <div class="text-center initial-loading">
        <h2>Loading Site...</h2>
      </div>
    </ui-view>

    <footer class="panel-footer">
      <div class="container">
        <div class="row">
          <section id="hours" class="col-sm-4">
            <span>Hours:</span><br>
            Sun-Thurs: 11:15am - 10:00pm<br>
            Fri: 11:15am - 2:30pm<br>
            Saturday Closed
            <hr class="visible-xs">
          </section>
          <section id="address" class="col-sm-4">
            <span>Address:</span><br>
            7105 Reisterstown Road<br>
            Baltimore, MD 21215
            <p>* Delivery area within 3-4 miles, with minimum order of $20 plus $3 charge for all deliveries.</p>
            <hr class="visible-xs">
          </section>
          <section id="testimonials" class="col-sm-4">
            <p>"The best Chinese restaurant I've been to! And that's saying a lot, since I've been to many!"</p>
            <p>"Amazing food! Great service! Couldn't ask for more! I'll be back again and again!"</p>
          </section>
        </div>
        <div class="text-center">
          &copy; Copyright David Chu's China Bistro 2016 |
          <a ui-sref="admin.auth">Admin</a></div>
      </div>
    </footer>

    <!-- Libs -->
    <script src="lib/jquery-2.1.4.min.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="lib/angular.min.js"></script>
    <script src="lib/angular-ui-router.min.js"></script>

    <!-- Main Restaurant Module -->
    <script src="src/restaurant.module.js"></script>

    <!-- Common Module -->
    <script src="src/common/common.module.js"></script>
    <script src="src/common/loading/loading.component.js"></script>
    <script src="src/common/loading/loading.interceptor.js"></script>
    <script src="src/common/menu.service.js"></script>
    <script src="src/common/user.service.js"></script>

    <!-- Public Module -->
    <script src="src/public/public.module.js"></script>
    <script src="src/public/public.routes.js"></script>
    <script src="src/public/menu/menu.controller.js"></script>
    <script src="src/public/menu-category/menu-category.component.js"></script>
    <script src="src/public/menu-items/menu-items.controller.js"></script>
    <script src="src/public/menu-item/menu-item.component.js"></script>

    <script src="src/public/sign-up/sign-up.controller.js"></script>
    <script src="src/public/sign-up/sign-up.component.js"></script>

    <script src="src/public/my-info/my-info.controller.js"></script>

    <!-- ADMIN SITE -->

    <!--Application files -->

  </body>

</html>

///////////'/////////////////////////////////////////////////////'''
//<link rel="stylesheet" href="css/bootstrap.min.css">

//<link rel="stylesheet" href="css/restaurant.css">
body {
  font-size: 16px;
  color: #fff;
  background-color: #61122f;
  font-family: 'Oxygen', sans-serif;
}

.initial-loading {
  margin-top: 60px;
}

/** HEADER **/
#header-nav {
  background-color: #f6b319;
  border-radius: 0;
  border: 0;
}

#logo-img {
  background: url('../images/restaurant-logo_large.png') no-repeat;
  width: 150px;
  height: 150px;
  margin: 10px 15px 10px 0;
}

.navbar-brand {
  padding-top: 25px;
}
.navbar-brand h1 { /* Restaurant name */
  font-family: 'Lora', serif;
  color: #557c3e;
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  text-shadow: 1px 1px 1px #222;
  margin-top: 0;
  margin-bottom: 0;
  line-height: .75;
}
.navbar-brand a:hover, .navbar-brand a:focus {
  text-decoration: none;
}
.navbar-brand p { /* Kosher cert */
  color: #000;
  text-transform: uppercase;
  font-size: .7em;
  margin-top: 15px;
}
.navbar-brand p span { /* Star-K */
  vertical-align: middle;
}

#nav-list {
  margin-top: 10px;
}
#nav-list a {
  color: #951C49;
  text-align: center;
}
#nav-list .active a {
  color: #f6b319;
}
#nav-list a:hover {
  background: #a1526f;
  color: #fff;
  border-radius: 8px;
}
#nav-list a span {
  font-size: 1.8em;
}

#phone {
}
#phone a { /* Phone number */
  text-align: right;
  min-height: 82px;
  padding-top: 20px;
}
#phone div { /* We Deliver */
  color: #557c3e;
  text-align: center;
}
#phone div:hover {
  color: #afa;
}

.navbar-header button.navbar-toggle, .navbar-header .icon-bar {
  border: 1px solid #61122f;
}
.navbar-header button.navbar-toggle {
  clear: both;
  margin-top: -30px;
}

.navbar .nav > .active > a,
.navbar .nav > .active > a:hover,
.navbar .nav > .active > a:focus {
  background: #81324f;
  border-radius: 8px;
}

/* END HEADER */

/* FOOTER */
.panel-footer {
  margin-top: 30px;
  padding-top: 35px;
  padding-bottom: 30px;
  background-color: #222;
  border-top: 0;
}
.panel-footer div.row {
  margin-bottom: 35px;
}
#hours, #address {
  line-height: 2;
}
#hours > span, #address > span {
  font-size: 1.3em;
}
#address p {
  color: #557c3e;
  font-size: .8em;
  line-height: 1.8;
}
#testimonials {
  font-style: italic;
}
#testimonials p:nth-child(2) {
  margin-top: 25px;
}
a[ui-sref="admin.auth"] {
  color: #fff;
}
/* END FOOTER */

/********** Medium devices only **********/
@media (min-width: 992px) and (max-width: 1199px) {
  /* Header */
  #logo-img {
    background: url('../images/restaurant-logo_medium.png') no-repeat;
    width: 100px;
    height: 100px;
    margin: 5px 5px 5px 0;
  }
  /* End Header */
}

/********** Small devices only **********/
@media (max-width: 991px) {
  #nav-list a:hover {
    border-radius: 8px 8px 0 0;
  }
  .navbar .nav > .active > a,
  .navbar .nav > .active > a:hover,
  .navbar .nav > .active > a:focus {
      border-radius: 8px 8px 0 0;
  }
}

/********** Extra small devices only **********/
@media (max-width: 767px) {
  /* Header */
  #nav-list a:hover {
    border-radius: 0;
  }
  .navbar .nav > .active > a,
  .navbar .nav > .active > a:hover,
  .navbar .nav > .active > a:focus {
      border-radius: 0;
  }
  .navbar-brand {
    padding-top: 10px;
    height: 80px;
  }
  .navbar-brand h1 { /* Restaurant name */
    padding-top: 10px;
    font-size: 5vw; /* 1vw = 1% of viewport width */
  }
  .navbar-brand p { /* Kosher cert */
    font-size: .6em;
    margin-top: 12px;
  }
  .navbar-brand p img { /* Star-K */
    height: 20px;
  }

  #collapsable-nav a { /* Collapsed nav menu text */
    font-size: 1.2em;
  }
  #collapsable-nav a span { /* Collapsed nav menu glyph */
    font-size: 1em;
    margin-right: 5px;
  }

  #call-btn > a {
    font-size: 1.5em;
    display: block;
    margin: 0 20px;
    padding: 10px;
    border: 2px solid #fff;
    background-color: #f6b319;
    color: #951c49;
  }
  #xs-deliver {
    margin-top: 5px;
    font-size: .7em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  /* End Header */

  /* Footer */
  .panel-footer section {
    margin-bottom: 30px;
    text-align: center;
  }
  .panel-footer section:nth-child(3) {
    margin-bottom: 0; /* margin already exists on the whole row */
  }
  .panel-footer section hr {
    width: 50%;
  }
  /* End Footer */
}


/********** Super extra small devices Only :-) (e.g., iPhone 4) **********/
@media (max-width: 479px) {
  /* Header */
  .navbar-brand h1 { /* Restaurant name */
    padding-top: 5px;
    font-size: 6vw;
  }
  /* End Header */
}

//<link rel="stylesheet" href="css/common.css">

.loading-indicator {
    display: block;
    width: 70px;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 40%;
    z-index: 100;
    background-color: #FFF;
}

.loading-indicator img {
    width: 70px;
    background-color: #FFF;
}

.ui-view-placeholder {
    margin-top: 60px;
}


// <script src="src/restaurant.module.js"></script>

// <!-- Common Module -->
// <script src="src/common/common.module.js"></script>
// <script src="src/common/loading/loading.component.js"></script>
// <script src="src/common/loading/loading.interceptor.js"></script>
// <script src="src/common/menu.service.js"></script>
// <script src="src/common/user.service.js"></script>
//
// <!-- Public Module -->
// <script src="src/public/public.module.js"></script>
// <script src="src/public/public.routes.js"></script>
// <script src="src/public/menu/menu.controller.js"></script>
// <script src="src/public/menu-category/menu-category.component.js"></script>
// <script src="src/public/menu-items/menu-items.controller.js"></script>
// <script src="src/public/menu-item/menu-item.component.js"></script>
//
// <script src="src/public/sign-up/sign-up.controller.js"></script>
// <script src="src/public/sign-up/sign-up.component.js"></script>
//
// <script src="src/public/my-info/my-info.controller.js"></script>
