db.aggregate_vehicle_point.aggregate([{
    $group: {
        _id: {
            VEHICLE_ID: "$VEHICLE_ID",
        },
        count: {
            '$sum': 1
        },
        VEHICLE_ID: {
            '$first': '$VEHICLE_ID'
        }
    }
}, {
    $sort: {
        count: 1
    }
}])