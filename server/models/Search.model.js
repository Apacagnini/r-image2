const { Schema, model } = require('mongoose');

const searchSchema = new Schema(
    {
        id:{
            type:Number,
            required: true,
            unique: true ,
            index:true
        },
        category:{
            type:[String],
            required: true,
            index:true
        },
        width:{
            type:Number
        },
        height:{
            type:Number
        },
        url:{
            type:String
        },
        photographer:{
            type:String
        },
        photographer_url:{
            type:String
        },
        photographer_id:{
            type:Number
        },
        avg_color:{
            type:String
        },        
        src:{
            type:Object,
            original:{
                type:String
            },
            large2x:{
                type:String
            },
            large:{
                type:String
            },
            medium:{
                type:String
            },
            small:{
                type:String
            },
            portrait:{
                type:String
            },
            landscape:{
                type:String
            },
            tiny:{
                type:String
            }
        },
        liked:{
            type:Boolean
        },
        alt:{
            type:String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

searchSchema.index({ category: 1, id: -1 });

searchModel = model("searchModel", searchSchema);

module.exports = { searchModel };