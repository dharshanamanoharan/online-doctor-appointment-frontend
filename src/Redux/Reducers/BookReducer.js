const BookReducer=(state={},action)=>{
    switch(action.type)
    {
        case "BOOK":
            return state={
                bookTime:action.payload.slotTime,
                bookDate:action.payload.slotDate,
                userId:action.payload.userId,
                doctorId:action.payload.doctorId
            };
            
        default:return state;
    }
}
export default BookReducer;