const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var models = require('../models');
module.exports = {
  ADD_MESSAGE: async (data) => {
    console.log('ok')
    console.log(data.data)
    const newMess = await models.messagers.create({
      content: data.data.content,
      RoomId: data.data.roomid,
      UserId: data.data.UserId,
      ProductId: data.data.ProductId,
      BillId: data.data.BillId,
      sum: data.data.sum,
      image : data.data.image,
      status : data.data.status,
      isRead : data.data.isRead
    })
    newMess.save()
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