import AttackModel from "../models/Attack.Model";

// 4
export const getTopByAreaOrAny = async (condtion:any): Promise<any> => {
  const { region, limit } = condtion
  try {   
    const matchStage = region ? { region_txt: region } : {};    
    const pipeline: any[] = [
      { $match: matchStage },
      { $match: { gname: { $ne: "Unknown" } } },
      {
        $group: {
          _id: '$gname',
          count: { $sum: 1 }, 
          latitude: { $avg: '$latitude' },
          longitude: { $avg: '$longitude' }
        },
      },
      { $sort: { count: -1 } },
    ];

    
    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit)) {
        pipeline.push({ $limit: parsedLimit });
      }
    }

    
    const results = await AttackModel.aggregate(pipeline);

    return results;
  } catch (err) {
    console.error('Error in getTopByAreaOrAny:', err);
    return 'An error occurred';
  }
};
//5 b
export const getGroupAllyear = async (conditions: any) => {
  const { name, year } = conditions;
  try {
    let results;

    if (name) {
      
      results = await AttackModel.aggregate([
        { $match: { gname: name } }, 
        { $match: { gname: { $ne: "Unknown" } } }, 
        {
          $group: {
            _id: { year: "$iyear", groupName: "$gname" }, 
            count: { $sum: 1 }, 
          },
        },
        {
          $project: {
            year: "$_id.year", 
            count: 1, 
            groupName: "$_id.groupName", 
            _id: 0, 
          },
        },
        { $sort: { year: 1, count: -1 } }, 
      ]);
    } else if (year) {
      // שאילתת חישוב עבור שנה
      results = await AttackModel.aggregate([
        { $match: { iyear: parseInt(year, 10) } }, 
        { $match: { gname: { $ne: "Unknown" } } }, 
        {
          $group: {
            _id: { groupName: "$gname" }, 
            count: { $sum: 1 }, 
          },
        },
        {
          $project: {
            groupName: "$_id.groupName", 
            count: 1, 
            _id: 0, 
          },
        },
        { $sort: { count: -1 } }, 
      ]);
    }

    return results;
  } catch (error) {
    console.error("Error fetching group allyear:", error);
    throw error;
  }
};


// 6 
export const getGroupistop = async (orgname:any) => {
  const name = orgname;
  console.log(name);
  try {
    const results = await AttackModel.aggregate([
      {
        $group: {
          _id: { region: '$region_txt', groupName: '$gname', latitude: '$latitude', longitude: '$longitude' },
          totalCasualties: { $sum: { $add: ['$nkill', '$nwound'] } },
        },
      },
      {
        $sort: { '_id.region': 1, totalCasualties: -1 },
      },
      {
        $group: {
          _id: { region: '$_id.region' },
          maxCasualties: { $first: '$totalCasualties' },
          groupName: { $first: '$_id.groupName' },
          latitude: { $first: '$_id.latitude' },
          longitude: { $first: '$_id.longitude' },
        },
      },
      {
        $match: {
          $and: [
            { groupName: name },
            { groupName: { $ne: "Unknown" } },
          ],
        },
      },
    ]);

    return results;
  } catch (error) {
    console.error('Error fetching groupistop:', error);
    throw error;
  }
};


export const GetAllNames = async () => {
  try {
      const organizations = await AttackModel.distinct('gname', { gname: { $ne: 'Unknown' } });
      return organizations.slice(0, 10); 
  } catch (error) {
      console.error("Error fetching organizations:", error);
      return { message: 'Failed to fetch organizations' };
  }
};

export const getDeadliestRegionsByOrganization = async (organizationName: any) => {
  try {
    const results = await AttackModel.aggregate([
      // שלב 1: קיבוץ לפי אזור וארגון לחישוב סך הנפגעים
      {
        $group: {
          _id: {
            region: "$region_txt",
            city: "$city",
            groupName: "$gname",
            latitude: "$latitude",
            longitude: "$longitude",
          },
          totalCasualties: {
            $sum: {
              $add: [{ $ifNull: ["$nwound", 0] }, { $ifNull: ["$nkill", 0] }],
            },
          },
        },
      },
      // שלב 2: סינון ארגונים "Unknown" ומקרים שבהם מספר הנפגעים שווה ל-0
      {
        $match: {
          $and: [
            { "_id.groupName": { $ne: "Unknown" } },
            { totalCasualties: { $gt: 0 } },
          ],
        },
      },
      // שלב 3: מיון לפי אזור וכמות נפגעים (בסדר יורד)
      {
        $sort: { "_id.region": 1, totalCasualties: -1 },
      },
      // שלב 4: קיבוץ שני כדי לבחור את הארגון הכי קטלני בכל אזור
      {
        $group: {
          _id: {
            region: "$_id.region",
            city: "$_id.city",
          },
          topGroup: { $first: "$_id.groupName" }, // הארגון הכי קטלני
          totalCasualties: { $first: "$totalCasualties" },
          latitude: { $first: "$_id.latitude" },
          longitude: { $first: "$_id.longitude" },
        },
      },
      // שלב 5: סינון כדי להחזיר רק אזורים שבהם הארגון המבוקש הוא הכי קטלני
      {
        $match: {
          topGroup: organizationName,
        },
      },
      // שלב 6: הקרנה של הנתונים הרצויים
      {
        $project: {
          _id: 0,
          region: "$_id.region",
          city: "$_id.city",
          totalCasualties: 1,
          latitude: 1,
          longitude: 1,
        },
      },
    ]);

    return results;
  } catch (error) {
    console.error("Error fetching deadliest regions by organization:", error);
    throw error;
  }
};







        
  