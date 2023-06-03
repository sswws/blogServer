/*
 * @Description: 说说路由
 * @Author: M
 * @Date: 2023-04-06 19:46:27
 * @LastEditTime: 2023-04-18 22:39:11
 * @LastEditors: M
 */

const Router = require("koa-router")
const router = new Router({ prefix: "/talk" })

const { auth, adminAuth } = require("../middleware/auth/index")
const { publishTalk, updateTalk, deleteTalkById, togglePublic, toggleTop, revertTalk, getTalkList, getTalkById, blogGetTalkList } = require("../controller/talk/index")

// 发布说说
router.post("/publishTalk",auth, adminAuth, publishTalk)

// 修改说说
router.put("/updateTalk", auth, adminAuth,updateTalk)

// 删除说说
router.delete("/deleteTalkById/:id/:status",auth, adminAuth, deleteTalkById)

// 修改说说公开私密状态 1 公开 2 私密
router.put("/togglePublic/:id/:status", auth, adminAuth,togglePublic)

// 修改说说公开置顶状态 1 置顶 2 不置顶
router.put("/toggleTop/:id/:is_top",auth, adminAuth, toggleTop)

// 恢复说说 从3回收站恢复到1
router.put("/revertTalk/:id",auth, adminAuth, revertTalk)

// 分页获取说说
router.post("/getTalkList", getTalkList)

// 获取说说详情
router.get("/getTalkById/:id", getTalkById)

// 前台获取说说
router.post("/blogGetTalkList", blogGetTalkList)

module.exports = router
