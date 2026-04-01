import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : [true , 'Subscription name is required'],
        minLength : 2,
        maxLength : 50,     
        trim : true
    },
    price : { 
        type : Number,
        required : [true , 'Subscription price is required'],
        min : [0 , 'Price must be a greater than zero']
    },
    currency : {
        type : String,
        enum : ['USD' , 'EUR' , 'INR' , 'JPY' , 'AUD' , 'CAD' , 'CHF' , 'CNY' , 'SEK' , 'NZD'],
        default : 'INR'
    },
    frequency : {
        type : String,
        enum : ['daily' , 'weekly' , 'monthly' , 'yearly'], 
    },
    category : {
        type : String,
        enum : ['entertainment' , 'utilities' , 'education' , 'health' , 'other']      
    },
    paymentMethod : {
        type : String,
        required : [true , 'Payment method is required'],
        trim : true
    },
    status : {
        type : String,
        enum : ['active' , 'inactive' , 'cancelled'],
        default : 'active'
    },
    startDate : {
        type : Date,
        required : [true , 'Start date is required'],
        validator : {
            validate : function(value){
                return value <= new Date();
            },
            message : 'Start date cannot be in the future'
        }
    },
    renewalDate : {
        type : Date,
        validator : {
            validate : function(value){
                return value >= this.startDate;
            },
            message : 'Renewal date must be after start date'
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true , 'User reference is required'],
        index : true
    }

}, { timestamps : true });

subscriptionSchema.pre('save' , function(next){
    if(!this.renewalDate){
        const renewPeriods = {
            daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewPeriods[this.frequency]);
        
    }
    if(this.renewalDate <= new Date()){
        this.status = 'expiry';
    }
    next();
});
        


const Subscription = mongoose.model('Subscription' , subscriptionSchema);

export default Subscription;