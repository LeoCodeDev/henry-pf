//* https://www.npmjs.com/package/score-js

//* API REQUEST:

/*

? GET /getUserScoreboard: 
	params: username by query
	return: Object => player scoreboard

	!Example:

	*Request:
	/getUserScores?username=LeoCodeDev

	*Response:

	{
    "username": "LeoCodeDev",
    "level": "1",
    "lvlName": "Noob",
    "quote": "You're just a little newbie...",
    "currentExp": 0,
    "totalExp": 0,
    "nextlvlExp": 50,
    "progress": "0.00",
    "achievement": [],
    "prestige": 0
}

? GET /testUserScoreboard
	params = {user_id, exp, type} . All query params
	user_id: id of a user
	exp: amount of experience
	type: if type is "increase", score will be increased, else, will be decreased.

	return player object
	!Example:

	*Request
	/testUserScore?exp=1250&id_user=14&type=increase

	*Response
	{
    "username": "LeoCodeDev",
    "level": "7",
    "lvlName": "Advanced Exerciser",
    "quote": "The busiest player i've ever seen",
    "currentExp": 50,
    "totalExp": 1250,
    "nextlvlExp": 600,
    "progress": "8.33",
    "achievement": [],
    "prestige": 0
}
*/