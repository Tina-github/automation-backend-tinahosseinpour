import * as clientHelpers from '../helpers/clientHelpers'

import * as roomHelpers from '../helpers/roomHelpers'


describe('testing auth', function(){
    it('Create a new client', function(){
       clientHelpers.createClientRequest(cy)
    })

    it('Get all clients', function(){
        clientHelpers.getAllClientsRequest(cy)
     })
     
     it('Create a new room', function(){
      roomHelpers.createRoomRequest(cy)
   })



   it('Get all rooms', function(){
       roomHelpers.getAllRoomsRequest(cy)
    })
    it('Edit a  room', function(){
      roomHelpers.editRoomRequest(cy)
   })
   it('Create a room and delete', function(){
      roomHelpers.createRoomRequestAndDelete(cy)
   })

     

})