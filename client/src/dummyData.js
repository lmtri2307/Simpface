console.log("dummyData")
export const Users = [
    {
        id: 1,
        profilePicture: "assets/person/1.jpeg",
        username: "Safak Kocaoglu",
    },
    {
        id: 2,
        profilePicture: "assets/person/2.jpeg",
        username: "Janell Shrum",
    },
    {
        id: 3,
        profilePicture: "assets/person/3.jpeg",
        username: "Alex Durden",
    },
    {
        id: 4,
        profilePicture: "assets/person/4.jpeg",
        username: "Dora Hawks",
    },
    {
        id: 5,
        profilePicture: "assets/person/5.jpeg",
        username: "Thomas Holden",
    },
    {
        id: 6,
        profilePicture: "assets/person/6.jpeg",
        username: "Shirley Beauchamp",
    },
    {
        id: 7,
        profilePicture: "assets/person/7.jpeg",
        username: "Travis Bennett",
    },
    {
        id: 8,
        profilePicture: "assets/person/8.jpeg",
        username: "Kristen Thomas",
    },
    {
        id: 9,
        profilePicture: "assets/person/9.jpeg",
        username: "Gary Duty",
    },
    {
        id: 10,
        profilePicture: "assets/person/10.jpeg",
        username: "Safak Kocaoglu",
    },
];

export const Posts = [
    {
        id: 1,
        desc: "Love For All, Hatred For None.",
        photo: "assets/post/1.jpeg",
        date: "5 mins ago",
        userId: 1,
        like: 32,
        comment: 9,
    },
    {
        id: 2,
        photo: "assets/post/2.jpeg",
        date: "15 mins ago",
        userId: 2,
        like: 2,
        comment: 1,
    },
    {
        id: 3,
        desc: "Every moment is a fresh beginning.",
        photo: "assets/post/3.jpeg",
        date: "1 hour ago",
        userId: 3,
        like: 61,
        comment: 2,
    },
    {
        id: 4,
        photo: "assets/post/4.jpeg",
        date: "4 hours ago",
        userId: 4,
        like: 7,
        comment: 3,
    },
    {
        id: 5,
        photo: "assets/post/5.jpeg",
        date: "5 hours ago",
        userId: 5,
        like: 23,
        comment: 5,
    },
    {
        id: 6,
        photo: "assets/post/6.jpeg",
        date: "1 day ago",
        userId: 6,
        like: 44,
        comment: 6,
    },
    {
        id: 7,
        desc: "Never regret anything that made you smile.",
        photo: "assets/post/7.jpeg",
        date: "2 days ago",
        userId: 7,
        like: 52,
        comment: 3,
    },
    {
        id: 8,
        photo: "assets/post/8.jpeg",
        date: "3 days ago",
        userId: 8,
        like: 15,
        comment: 1,
    },
    {
        id: 9,
        desc: "Change the world by being yourself.",
        photo: "assets/post/9.jpeg",
        date: "5 days ago",
        userId: 9,
        like: 11,
        comment: 2,
    },
    {
        id: 10,
        photo: "assets/post/10.jpeg",
        date: "1 week ago",
        userId: 10,
        like: 104,
        comment: 12,
    },
];

export const blankMessage = {
    message: { 
        "_id": { "$oid": "64622ab3d90bbcfe28d72945" }, 
        "conversationId": { "$oid": "6460c19023425052bebeb907" }, 
        "sender": { "$oid": "643a807a8e9e284ff438ebdc" }, 
        "text": "qwe", 
        "createdAt": { "$date": { "$numberLong": "1684155059725" } }, 
        "updatedAt": { "$date": { "$numberLong": "1684155059725" } }, 
        "__v": { "$numberInt": "0" } },
    sender: {
        "_id":{"$oid":"64390625adc982119e10fde1"},
        "username":"tommy",
        "email":"tommy@gmail.com",
        "password":"$2b$10$L1HUiqAtFa7ac.sow/aM1eLCdv4CP6pYP4d5n/H0B62UPPzgBLCUy",
        "profilePicture":"",
        "coverPicture":"",
        "followers":[],
        "followings":[],
        "isAdmin":false,
        "createdAt":{"$date":{"$numberLong":"1681458725358"}},
        "updatedAt":{"$date":{"$numberLong":"1681458725358"}},
        "__v":{"$numberInt":"0"}}
}