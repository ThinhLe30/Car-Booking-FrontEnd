export class Book {
    constructor(public id : number,public firstName : string, public lastName : string, public pickDestination : string, 
        public dropDestination : string, public phone : string, public dateBooking : Date, public sheet : string, public status : boolean, public note : string, public tripId : number | null){

    }
}