const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'
const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_PUT_ROOM = 'http://localhost:3000/api/room/'
const ENDPOINT_GET_ROOM = 'http://localhost:3000/api/room/'
const faker = require('faker')

function createRoomPayload(){
    const fakeid = faker.random.number({min:2000 , max:1000000})

    const payload = 
    {"id":fakeid,
        "features":["balcony"],
    "category":"single",
    "number":"4",
    "floor":"2",
    "available":true,
    "price":"1000"}

    return payload
}
 
function editRoomPayload(){
    const fakeid = faker.random.number({min:2000 , max:1000000})

    const payload = 

    {"id":fakeid,
        "features":["balcony"],
    "category":"single",
    "number":"5",
    "floor":"5",
    "available":true,
    "price":"1000"}

    return payload
}

function getRequestAllRoomsWithAssertion(cy,features, category, number, floor , available , price){
    // GET request to fetch all rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        expect(responseAsString).to.have.string(features)
        expect(responseAsString).to.have.string(category)
        expect(responseAsString).to.have.string(number)
        expect(responseAsString).to.have.string(floor)
        expect(responseAsString).to.have.string(available)
        expect(responseAsString).to.have.string(price)

        cy.log(response.body[response.body.length -1].id)
       cy.log(response.body.length)

    }))
}

function getAllRoomsRequest(cy){
    cy.authenticateSession().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
           
        }))
    }))
}
function deleteRequestAfterGet(cy){
    // GET request to fetch all rooms
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        let lastId = response.body[response.body.length -1].id
       
       cy.request({
           method: "DELETE",
           url: ENDPOINT_GET_ROOM+lastId,
           headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },


       }).then((response =>{               
        const responseAsString = JSON.stringify(response.body)
        cy.log(responseAsString)
        expect(responseAsString).to.have.string('true')

    }))
}))
}
function createRoomRequest(cy){
    cy.authenticateSession().then((response =>{
        let RoomPayload = createRoomPayload() 
        
        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:RoomPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(RoomPayload.number)
        }))

        getRequestAllRoomsWithAssertion(cy,RoomPayload.features, RoomPayload.category, RoomPayload.number ,RoomPayload.floor , RoomPayload.available , RoomPayload.price )
    }))
}

function editRoomRequest(cy){
cy.authenticateSession().then((response =>{
        let RoomPayload = editRoomPayload() 
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_ROOMS,
        headers:{
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response)
        let lastId = response.body[response.body.length -1].id
    
        
        // post request to edit a room
        cy.request({
            method: "PUT",
            url: ENDPOINT_PUT_ROOM+lastId,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:RoomPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(RoomPayload.number)
        }))

        getRequestAllRoomsWithAssertion(cy,RoomPayload.features, RoomPayload.category, RoomPayload.number ,RoomPayload.floor , RoomPayload.available , RoomPayload.price )
    }))
}))
}
function createRoomRequestAndDelete(cy){
    cy.authenticateSession().then((response =>{
        let RoomPayload = createRoomPayload() 
        
        // post request to create a room
        cy.request({
            method: "POST",
            url: ENDPOINT_POST_ROOM,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:RoomPayload 
        }).then((response =>{               
           const responseAsString = JSON.stringify(response)
           expect(responseAsString).to.have.string(RoomPayload.number)
        }))
        // Delete a room

        deleteRequestAfterGet(cy)
    }))
}


module.exports = {
    createRoomPayload, 
    createRoomRequest, 
    getAllRoomsRequest,
    editRoomPayload,
    editRoomRequest,
    createRoomRequestAndDelete
}

