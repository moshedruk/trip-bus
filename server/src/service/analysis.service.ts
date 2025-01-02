import AttackModel from "../models/Attack.Model";



export const getDeadliestAttackTypes = async () => {
  return await AttackModel.aggregate([
    { $group: { _id: "$attacktype1_txt", totalCasualties: { $sum:{$add:["$nkill","$nwound"]} } } },
    { $sort: { totalCasualties: -1 } }
  ]);
};
// 2
export const getAttackTypesstystik = async () => {           
    try { 
        const results = await AttackModel.aggregate([
            {
                $group: {
                    _id: '$region_txt',
                    totalCasualties: { $sum: { $add: ['$nkill', '$nwound'] } },
                    totalIncidents: { $count: {} },
                    latitude: { $first: '$latitude' },
                    longitude: { $first: '$longitude' }
                }
            },
            {
                $project: {
                    region: '$_id',
                    averageCasualties: { $divide: ['$totalCasualties', '$totalIncidents'] },
                    latitude: 1,
                    longitude: 1,
                    _id: 0
                }
            },
            {
                $sort: { averageCasualties: -1 }
            },              
        ]);        
        console.log(results)
        return results;
    } catch (err) {
        console.error(err);
        return ('Internal Server Error');
    }
};
// 3 ,5 a
export const getGroupedData = async (conditions: any) => {
  const { year, startYear, endYear, lastYears } = conditions;

  try {
    const currentYear = 2017 

    let matchStage = {};

    
    if (year) {
      const yearNom = parseInt(year, 10);
      if (!isNaN(yearNom)) {
        matchStage = { iyear: yearNom };
      }
    }
    
    else if (startYear && endYear) {
      matchStage = { iyear: { $gte: parseInt(startYear, 10), $lte: parseInt(endYear, 10) } };
    }
    
    else if (startYear) {
      matchStage = { iyear: { $gte: parseInt(startYear, 10), $lte: currentYear } };
    }
    
    else if (lastYears) {
      const yearsBack = parseInt(lastYears, 10);
      if (!isNaN(yearsBack)) {
        matchStage = { iyear: { $gte: currentYear - yearsBack, $lte: currentYear } };
      }
    }

    
    const results = await AttackModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { year: "$iyear", month: "$imonth", groupName: "$gname" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          year: "$_id.year",
          month: "$_id.month",
          count: 1,
          groupName: "$_id.groupName",
          _id: 0,
        },
      },
      { $sort: { year: 1, month: 1, count: -1 } },
    ]);

    return results;
  } catch (err) {
    console.error("Error in getGroupedData:", err);
    throw new Error("Failed to fetch data");
  }
};



