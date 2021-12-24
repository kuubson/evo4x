# Project "evo4x"

## Technologies

-   HTML, CSS, JS, TS
-   React.js + Redux (Hooks, Styled Components, PWA, Web Push Notifications, PayPal)
-   Node.js + Express (passport.js, JWT, socket.io, multer, cloudinary)
-   MySQL (ORM Sequelize)

## Description

This one is my own vision of an app for a trading community that provides easy start with the market by signals, covers all the psychology stuff which is needed there and direct people towards proper learning path.

Code isn't public because application has potential of being launched to the public in the future.

## Code workflow

### Imports order

-   **Packages from package.json**
-   **hooks**
    -   global hooks (**'hooks'** path)
    -   hooks from other components (**absolute path**)
    -   hooks for certain component (**'.'** or **'../'** or **'../../'** path)
-   **components**
    -   shared components (**'components/Shared'** path)
    -   other components (**absolute path**)
-   **styled components**
    -   shared styled components (**'components/Shared/styled'** path)
    -   Styled*ComponentName* (**'../styled/_ComponentName_'** or **absolute path**)
    -   _ComponentNameDashboard_ (**absolute path**)
    -   Dashboard (**'../'** or **'../../'** path)
-   **composed**
    -   _ComponentNameComposed_ (**absolute path**)
    -   Composed (**'.'** or **'../'** or **'../../'** path)
-   **utils**
    -   global utils (**'utils'** path)
    -   utils from other components (**absolute path**)
    -   utils for certain component (**'.'** or **'../'** or **'../../'** path)
-   **helpers**
    -   global helpers (**'helpers'** path)
    -   helpers from other components (**absolute path**)
    -   helpers for certain component (**'.'** or **'../'** or **'../../'** path)
-   **images**

## Some screenshots

### Home

[![Home.png](https://i.postimg.cc/0NynS9ws/Home.png)](https://postimg.cc/CR9bTT7P)

### Help sidebar

[![Help.png](https://i.postimg.cc/66kGVMn1/Help.png)](https://postimg.cc/5jm0bqPw)

### Login form

[![Login.png](https://i.postimg.cc/xd1kjhVq/Login.png)](https://postimg.cc/K1CcJ9zy)

### Profile

[![Profile.png](https://i.postimg.cc/vHPwFNh0/Profile.png)](https://postimg.cc/TpW4nQZb)

### Chat

[![Chat.png](https://i.postimg.cc/sfwNvZWX/Chat.png)](https://postimg.cc/5jQ3rynd)

### Analysis

[![Analysis.png](https://i.postimg.cc/W3f0PjD2/Analysis.png)](https://postimg.cc/jwPDzpQ9)
