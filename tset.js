const excludedFields =["sort","page","limit"];

const excludedQuery={
    ...req.query,
};

excludedFields.forEach((filed)=>{
    delete excludedQuery[filed];
});

const courses=await Course.find(excludedQuery);



const courses = await Course.find(excludedQuery).sort(req.query.sort);
// const excludedFields = ["sort", "page", "limit"];

// const excludedQuery = {
//   ...req.query,
// };

// excludedFields.forEach((field) => {
//   delete excludedQuery[field];
// });

// const courses = await Course.find(excludedQuery);