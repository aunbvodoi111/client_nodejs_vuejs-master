const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');
module.exports = {
  ADD_MESSAGE: async (data) => {
    console.log('ok')
    console.log(data.data)
    var image 
    if( data.data.status == 1 ){
      image = data.data.imageProduct
    }else if( data.data.status == 2 ){
      image = data.data.imageBill
    }else if( data.data.status == 3 ){
      image = data.data.image
    }
    const newMess = await models.messagers.create({
      content: data.data.content,
      RoomId: data.data.roomid,
      UserId: data.data.UserId,
      ProductId: data.data.ProductId,
      BillId: data.data.BillId,
      sum: data.data.sum,
      image : image,
      status : data.data.status,
      isRead : data.data.isRead
    })
    newMess.save()
    var message = await models.messagers.findOne({
      where:{ id : newMess.id },
      include:[{
        model : models.products,
        as:'product'
      },{
        model : models.bills,
        as:'bill',
        include: [{
            model: models.bill_details,
            as: 'bill_details',
        }]
      },{
        model : models.users,
      }]
    })
    var room = await models.rooms.findOne({
      where:{ id : data.data.roomid },
    })

    var updated = room.updated
    await room.update({
      updated : updated + 1
    })
    return message
    // var room = await Room.findOne({ _id: data.data.roomid })
    // console.log(room)
    // if (room) {

    //   console.log('1111')
    //   room.messages.push({
    //     content: data.data.content,
    //     nameuser: data.data.nameuser,
    //     isRead: false
    //   });
    //   room.save();


    // }
    // return newMess
  },
  GET_MESSAGES: async data => {
    return await Message.find({ room: data.room._id }).populate('user');
  },
}