const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/submit",(req,res)=>{
  var name=req.query.name
  var address=req.query.address
  var message=req.query.message
  var sql="INSERT INTO self_project_msg (uid,name,address,message) VALUES (NULL,?,?,?)";
  pool.query(sql,[name,address,message],(err,result)=>{
      if(err) console.log(err)
      //res.send(result)
      res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
      })
      res.write(JSON.stringify({
        ok:1,
        msg:"提交成功！",
      }))
      res.end()
  })
})


module.exports=router;