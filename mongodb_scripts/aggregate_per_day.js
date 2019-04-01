db.point_slots_by_day.aggregate([{
    '$group': {
        _id: {
            POINT_ID: '$POINT_ID',
            OPD_DATE: '$OPD_DATE'
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
        OPD_DATE: {
            '$first': '$OPD_DATE'
        },
        POINT_ID: {
            '$first': '$POINT_ID'
        }
    }
}, {
    $out: 'point_slot_by_date'
}], {})