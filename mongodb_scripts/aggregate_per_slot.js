db.point_slots_by_day.aggregate([{
        '$group': {
            _id: {
                POINT_ID: '$POINT_ID',
                TIME_SLOT: '$TIME_SLOT'
            },
            PASSENGER_OUT: {
                '$sum': '$PASSENGER_OUT'
            },
            PASSENGER_IN: {
                '$sum': '$PASSENGER_IN'
            },
            WHEELCHAIR_COUNT: {
                '$sum': '$WHEELCHAIR_COUNT'
            },
            TIME_SLOT: {
                '$first': '$TIME_SLOT'
            },
            POINT_ID: {
                '$first': '$POINT_ID'
            }
        }
    },
    {
        $sort: {
            POINT_ID: 1
        }
    },
    {
     	$out: 'point_flow_by_slot'   
    }
], {})