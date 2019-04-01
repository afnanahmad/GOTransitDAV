db.descriptive_slots.aggregate([{
        $group: {
            _id: "$POINT_ID",
            POINTS: {
                $sum: 1
            },
            PASSENGER_OUT: {
                $sum: "$PASSENGER_OUT"
            },
            PASSENGER_IN: {
                $sum: "$PASSENGER_IN"
            },
            POINT_ID: {
                $first: "$POINT_ID"
            },
            STOP_CODE: {
                $first: "$STOP_CODE"
            },
            SHORT_NAME: {
                $first: "$SHORT_NAME"
            },
            LONG_NAME: {
                $first: "$LONG_NAME"
            },
            STOP_ID: {
                $first: "$STOP_ID"
            },
            POS_NO: {
                $first: "$POS_NO"
            },
            POINT_ROLE: {
                $first: "$POINT_ROLE"
            },
            GPS_LONGITUDE: {
                $first: "$GPS_LONGITUDE"
            },
            GPS_LATITUDE: {
                $first: "$GPS_LATITUDE"
            },
            DISTRICT_ID: {
                $first: "$DISTRICT_ID"
            },
            VALID_FROM: {
                $first: "$VALID_FROM"
            },
            VALID_UNTIL: {
                $first: "$VALID_UNTIL"
            },

        }
    },
    {
        $sort: {
            POINTS: -1
        }
    },
    {
    	$out: "aggregated_points"   
    }
])