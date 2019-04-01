db.point_flow_by_slot.aggregate([{
    $match: {
        TIME_SLOT: {
            $nin: [ISODate("2017-07-01T00:00:00.000+0000"),
                ISODate("2017-07-02T00:00:00.000+0000"),
                ISODate("2017-07-08T00:00:00.000+0000"),
                ISODate("2017-07-09T00:00:00.000+0000"),
                ISODate("2017-07-15T00:00:00.000+0000"),
                ISODate("2017-07-16T00:00:00.000+0000"),
                ISODate("2017-07-22T00:00:00.000+0000"),
                ISODate("2017-07-23T00:00:00.000+0000"),
                ISODate("2017-07-29T00:00:00.000+0000"),
                ISODate("2017-07-30T00:00:00.000+0000"),
            ]
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
}, {
    $out: 'point_flow_by_weekdays'
}], {})