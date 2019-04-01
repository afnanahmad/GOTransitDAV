db.point_slots.aggregate([{
    $lookup: {
      from: "point",
      localField: "POINT_ID",
      foreignField: "POINT_ID",
      as: "descriptive_slots"
    }
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{
          $arrayElemAt: ["$descriptive_slots", 0]
        }, "$$ROOT"]
      }
    }
  },
  {
    $project: {
      descriptive_slots: 0
    }
  },
  {
    $out: "descriptive_slots"
  }
])