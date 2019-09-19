# Split Check
## Slogan:		“A web app that makes going out to eat with your friends easier”
## Description:
This is a web app (with a mobile app interface) with 2 main features. One feature is that it allows users to easily, synchronously split and pay for checks at restaurants. Upon receiving your check at the restaurant, you can take a picture of it and the web app will automatically split the check, and send Venmo requests to people within your group (based on your preferences). You may do things like evenly split the check, or group items together for certain people to pay.
	Another functionality is the ability to suggest places for certain friend groups to go. Upon creating your group of friends on the web app, you can request it to give you a suggestion on where to eat. It pulls data from Venmo (places you’ve eaten, things you’ve eaten, amount you’ve paid) and suggests places dependant on location, menu, and cost by inputting this information into Yelp.
How to use the app:
Make a group of friends on the web app
Pull transaction information from Venmo (specifically food based on description) for each group member and figure out approximately how much each person spends →
Yelp will provide a list of food options that are within the average spending amount for all group members
Function:  Upload a photo of receipt at the end of the meal and the Google Vision API will parse through the receipt and figure out how much each person needs to pay → automatically send Venmo requests based on the total price and calculated tip (either from Yelp reviews or user preference)

# Trip Planner
## Slogan:		“A web app that makes (almost) all the decisions in trip-planning for you”
## Description: 
This is a web app that is designed to make planning trips with a group of friends easier, by handling hotel booking and compiling events for the trip. This app will consider budget to make sure that all group members can participate in scheduled events. This app places a strong emphasis on polling, which gives users more control over their preferences.
How to use the app:
Make a group of friends on the web app (friends can be found by linking to Facebook)
Input a location for the trip → a hotel booking API will send out a poll of options within a given price range
All members of the group will be required to answer the poll, or the hotel will not be booked
Weather API along with the location data will be used in the events API, which will create a list of events based on weather conditions and accessibility, again a poll will be sent for each event
Once each event has closed its poll, the app will  create a calendar with the voted events listed on it
