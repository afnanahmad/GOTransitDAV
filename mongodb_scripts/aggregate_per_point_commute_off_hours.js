db.point_flow_by_slot.aggregate([{
    $match: {
        TIME_SLOT: {
            $nin: [12, 13, 14, 15, 16, 17, 18, 19, 32, 33, 34, 35, 36, 37, 38, 39]
        }
    }
}, {
    '$group': {
        _id: '$POINT_ID',
        PASSENGER_OUT: {
            '$sum': '$PASSENGER_OUT'
        },
        PASSENGER_IN: {
            '$sum': '$PASSENGER_IN'
        },
        WHEELCHAIR_COUNT: {
            '$sum': '$WHEELCHAIR_COUNT'
        },
        POINT_ID: {
            '$first': '$POINT_ID'
        },
    }
},{$out: 'point_flow_by_commmute_off'}], {})