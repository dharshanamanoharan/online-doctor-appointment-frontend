export const BOOK_SLOT=(x)=>{
    const obj1=x[0];
    const obj2=JSON.stringify(obj1);
   //alert(JSON.stringify(obj1));
   //alert(obj1.bookTime);
 
    return {
        type:"BOOK",
        payload:{
            slotTime:obj1.bookTime,
            slotDate:obj1.bookDate,
            userId:obj1.userId,
            doctorId:obj1.doctorId
        }
    }
}