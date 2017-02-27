# **SamePage** #
### Use the SamePage chrome extension to chat with other users that are currently visiting the same web page ###

## **Table of Contents** 
 - [About] (#about)
 - [Link to presentation video] (#link-to-presentation-video)
 - [Installation] (#installation) 
 - [Features] (#features)
 - [Contributors] (#contributors)

##  About
 - SamePage is a great way to interact in real time with users that are viewing the same content.
 - Chat with other users about an interesting article, get advice on a recipe, or ask for assistance understanding a library or framework's documentation
  
![Landing page] (http://i.imgur.com/55zSSczl.png)

## Link to presentation video
[![Alt text] (http://i.imgur.com/w1K7mHPl.png)](https://www.youtube.com/watch?v=2_RqDmflhjQ)

## Installation
1. Clone the repository
2. Run `npm install`
3. Ensure three files are exporting `localhost:1337`. `app/background/httpServer`, `app/content/react/httpServer`, `app/popup/react/httpServer`
4. Start application with `npm start` (should start on port 1337)
5. Create bundled files with `npm run build-watch`
6. Navigate to chrome://extensions/
7. Check 'Developer Mode'
8. Select 'Load unpacked extension'
9. Select the 'public' folder in project directory

## Features
 - We wanted users to be able to sub-divide themselves into groups (circles) to keep chats private from the main page chat room.
 - At this time, circles are hard coded for presentation purposes.
 - A future version will allow users to create and join circles.
 
## Contributors
 - Ryan Driscoll <a  target="_blank" href="https://github.com/RyanDriscoll/">Github</a> | <a target="_blank" href="https://linkedin.com/in/rpdriscoll/">LinkedIn</a>
 - Alan Herman <a  target="_blank" href="https://github.com/TheHerm/">Github</a> | <a target="_blank" href="https://linkedin.com/in/alan-herman/">LinkedIn</a>
 - KD Gandhi <a  target="_blank" href="https://github.com/KdawgG">Github</a>  | <a target="_blank" href="https://linkedin.com/in/kgandhi2/">LinkedIn</a>
 - Tom Redis <a target="_blank" href="https://github.com/Tredis/">Github</a>  | <a target="_blank" href="https://linkedin.com/in/thomas-redis-3892647/">LinkedIn</a>
