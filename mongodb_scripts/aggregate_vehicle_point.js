db.regular_trip_stop.aggregate([{
    $match: {
        VEHICLE_ID: 8021,
    }
}, {
    $group: {
        _id: {
            VEHICLE_ID: "$VEHICLE_ID",
            POINT_ID: "$POINT_ID"
        },
        PASSENGER_OUT: {
            '$sum': '$PASSENGER_OUT'
        },
        PASSENGER_IN: {
            '$sum': '$PASSENGER_IN'
        },
        VEHICLE_ID: {
         '$first':	'$VEHICLE_ID'
        },
        POINT_ID: {
         '$first':	'$POINT_ID'
        }
    }
}, {
    $sort: {
        ACT_ARR_TIME: 1
    }
}])