import express from "express";
const router = express.Router();
const DUMMY_DATA = [{
    id: "u1",
    name: "john Rozzer",
},{
    id: "u1",
    name: "john Rozzer",

}]
router.get("/:uid", (req, res, next) => {
    const uid = req.params.uid;
    // do something with uid
    const user = DUMMY_DATA.find(u => {
        return u.id === uid;
    })
    if (!user) {
        const error=new Error("user not found for provided id");
        error.code=404;
        return next(error);
        }
    
    res.json({
         user,
         success:true
    });
next();
});
export default router;